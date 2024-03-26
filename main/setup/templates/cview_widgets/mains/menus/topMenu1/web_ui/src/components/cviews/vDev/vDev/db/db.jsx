import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';

let tof=$cn.tof

export const Db=(props)=>{
    let [mainNoteText, setMainNoteText]=useState("");

    let [databases,setDatabase]=useState([])
    let [tables,setTables]=useState([])
    let initC=useRef(true);

    useEffect(()=>{
        if (initC.current){
            initC.current=false;
            listDb();
            listTables()
        }
        
    },[])

    // ----------------------------------

    let listDbBE=(...args)=>{
        let cb=()=>{}
        let params={}

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0]    
            }
            
            cb=args[1]
        }

        let api="vDev"
        let data={ 
            "type" : "getDBS",            
        };

        if ( params.filename){
            //data.filename=params.filename
        }

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
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

    let listTablesBE=(...args)=>{
        let cb=()=>{}
        let params={}

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0]    
            }
            
            cb=args[1]
        }

        let api="vDev"
        let data={ 
            "type" : "getTables",            
        };

        if ( params.filename){
            //data.filename=params.filename
        }

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
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


    // ----------------------------------

    let listDb=()=>{

        listDbBE({},(dt)=>{
            let data=dt.data;
            //let dtStr=JSON.stringify(dt,null,2); // alert(dtStr);
            
            setDatabase(data.all)
        })
    }

    let listTables=()=>{

        listTablesBE({},(dt)=>{
            let data=dt.data;
            //let dtStr=JSON.stringify(dt,null,2); alert(dtStr);
            
            setTables(data.all)
        })
    }


    let listDbE=(()=>{
        let arrE=[]

        databases.forEach((r,i)=>{
            arrE.push(
                <div
                    style={{
                        
                    }}
                >
                    {r.name}
                </div>
            )
        })

        return (
            <div
                style={{
                    position : "relative",
                    border : "solid thin grey",
                    width : 140,
                    height : 200,
                    overflow : "hidden",
                    margin : 4,
                    padding : 4,

                }}
            >
                <div
                    style={{
                        position : "relative",
                        
                        width : 130,
                        height : 190,
                        overflow : "auto",
                        textAlign : "left"
                    }}
                >   
                    Databases<br/>
                    ------------
                    {arrE}
                </div>
                
            </div>
        )
    })();


    let listTablesE=(()=>{
        let arrE=[]

        tables.forEach((r,i)=>{
            arrE.push(
                <div
                    style={{
                        
                    }}
                >
                    {r.name}
                </div>
            )
        })

        return (
            <div
                style={{
                    position : "relative",
                    border : "solid thin grey",
                    width : 140,
                    height : 200,
                    overflow : "hidden",
                    margin : 4,
                    padding : 4,

                }}
            >
                <div
                    style={{
                        position : "relative",
                        
                        width : 130,
                        height : 190,
                        overflow : "auto",
                        textAlign : "left"
                    }}
                >   
                    Tables<br/>
                    ------------
                    {arrE}
                </div>
                
            </div>
        )
    })();

    
    
    let style={
        position  : "relative",
        background : "white",
        width : 600,
        height : 300, 
        borderRadius : 8 ,
        overflow : "hidden",
        margin : 4,

    }
    if (props.style){
        style={...style,...props.style}
    }

    return (
        <div
            style={style}
        >
            Db
            <br/>
            <div
                style={{
                    
                }}
            >
                <div
                    style={{
                        float : "left",
                    }}
                >
                    {listDbE}
                </div>
                <div
                    style={{
                        float : "left",
                    }}
                >
                    {listTablesE}
                </div>


                <div style={{clear : "left"}} />
            </div>
            
            
        </div>
    )

}


