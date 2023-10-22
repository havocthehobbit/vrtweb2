import { useState,useEffect,useRef,useContext ,Context} from "react"
import $gl from "../../../../common/globallib"
import { $cn } from "../../../../common/libNative"


let feach=$cn.each
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb
let cl=$cn.l

export const UploadButton=(props)=>{ // params.fetch : true/false ;  params.cb((files.current, file1Before)=>{})  ; params.cbText((text, files.current, file1Before)=>{}) //  params.cbBin()=>{})
    let paramsDef={
        fetch : true,
    }
    
    let [api,setApi]=useState("")
    let [host,setHost]=useState($gl.host)   
    let [port,setPort]=useState($gl.port)   
    let [data,setData]=useState({})
    let [filename,setFilename]=useState("")
    let [params,setParams]=useState(paramsDef)    
    let upRef=useRef()
    let files=useRef();
    

    useEffect(()=>{
        if (props.params!==undefined){
            setParams(props.params)
        }
    },[props.params])

    useEffect(()=>{
        if (props.api!==undefined){
            setApi(props.api)
        }
    },[props.api])

    useEffect(()=>{
        if (props.host!==undefined){
            setHost(props.host)
        }
    },[props.host])

    useEffect(()=>{
        if (props.port!==undefined){
            setPort(props.port)
        }
    },[props.port])

    useEffect(()=>{
        if (props.data!==undefined){
            setData(props.data)
        }
    },[props.data])

    useEffect(()=>{
        if (props.filename!==undefined){
            setFilename(props.filename)
        }
    },[props.filename])

    let uploadLocal=(e)=>{
        let filesl= e.target.files && e.target.files[0];
        files.current=filesl;
        let file1Before

	    e.target.value = null;

        if (filesl.length>1){ // multiple files
            const data = new FormData();
            filesl.forEach((file, i) => {
                data.append(`file-${i}`, file, file.name);
            });
            filesl=data            
        }else{ // single file
            const formData = new FormData()
            formData.append('file', filesl)
            
            for (let p in data){
                let v=data[p]
                let newData=v
                let addData=true
                
                if (typeof(v)==="object"){
                    newData=JSON.stringify(v)
                }
                
                if (v===undefined){addData=false}

                if (addData){
                    formData.append(p,newData)
                }
                

            }
            file1Before=filesl
            filesl=formData            
        }        

        files.current=filesl    
        if (params.fetch){
            if (params.cb){
                uploadFetchAPI((rd)=>{ params.cb(rd,files.current,file1Before ) })
            }else{
                uploadFetchAPI()
            }
            
        }else{
            if (params.cb){
                params.cb(files.current, file1Before)
            }
            if (params.cbText){
                let reader = new FileReader();
                reader.onload = function() {
                    let text = reader.result;                                                                
                    params.cbText(text, files.current, file1Before)
                    
                };
                reader.readAsText(file1Before);
            }
            if (params.cbBin){
                let reader = new FileReader();
                reader.onload = function() {
                    let b1 = reader.result;   
                    let b64encodedhash = b1.split(',')[1];
                    let mimetype = b1.split(',')[0].split(':')[1].split(';')[0];
                    let data = atob(b64encodedhash);
                    let blob
                    let ab = new ArrayBuffer(data.length);
                    let ia = new Uint8Array(ab);
                    for(var i = 0;i<data.length;i++){
                        ia[i] = data.charCodeAt(i);
                    }
                    blob = new Blob([ia],{ "type": mimetype});
                    let filenamenew="somefile.ext"
                    if (filename!==""){
                        filenamenew=filename
                    }
                    let file = new File([blob], filenamenew);

                    params.cbBin(file, { file : file, blob : blob }, files.current, file1Before)                    
                };
                reader.readAsDataURL(file1Before);
            }
        }
        
        return        
    }

    let uploadBrowseInputButtonActivate=(e)=>{
        upRef.current.click()    
    }

    let uploadFetchAPI=(...args)=>{
        let cb=()=>{}
        let params={}

        if (args.length === 1){
            cb=args[0]
        }
        if (args.length > 1){
            params=args[0]
            cb=args[1]
        }

        let apil=api                   
        
        let hostl=host//"localhost"        
        let portl=port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors();
        
        delete  fparams.headers['Content-Type']; 
        delete  fparams.headers['content-type']; 
        
        fparams.body=files.current //JSON.stringify(data)
        let url=protocall + "//" + hostl + ":" + portl + "/" + apil;             
        
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })

    }

    let style={
        background : "lightgreen",
        borderRadius : 4,
        padding : 5,
    }

    if (props.style!==undefined){
        style=props.style
    }

    return (
        
            <button
                className={props.className}
                style={style}

                onClick={(e)=>{
                    uploadBrowseInputButtonActivate(e);        
                }}
            >upload
                <input
                    ref={upRef}
                    style={{display : "none"}}
                    type={"file"}
                    accept={"*" /* "image/star" for images filtered   */ }
                    onChange={(e)=>{
                        uploadLocal(e)
                    }}
                />            
            </button>
       
    )
}