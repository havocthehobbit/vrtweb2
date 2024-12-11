import React,{ useEffect , useState,useRef, useContext } from 'react'
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';

import { SchemasListLoad } from '../schemas/schema'

let tof=$cn.tof

import { useProjectsVdev } from './projects/useProjectsVdev';



export  const runGenerateFileData=(...args)=>{
    let useFakeFetch=false;// for temp Testing and local Dev Frist env
    let useFakeFetchReturnData=[];// for temp Testing and local Dev Frist env
    let useFakeFetchReturnError=[];// for temp Testing and local Dev Frist env    
    let useFakeFetchReturnErr=false;// for temp Testing and local Dev Frist env
    
    

    let cb=()=>{}
    let params={}
    
    let rdtmp={}
    
    if (args.length === 1){
        cb=args[0];        
    }

    
    if (args.length > 1){
        if (args[0]!==undefined){
            params=args[0]    
        }
        
        cb=args[1]
    }

    let api="projectsVdev";
    let data={ 
        "type" : "generateFileData",         
        //"searchTxt" : searchBox,  
        
    };

    if ( params._data){
        data={...data,...params._data}
    }

    if ( params.data){
        if (data.data){
            data.data={...data.data,...params.data}

        }else{
            data.data=params.data
        }        
    }

    if ( params.filename){
        //data.filename=params.filename
    }

    if (useFakeFetch){
        setTimeout(()=>{
            if (useFakeFetchReturnErr===false){
                cb.apply(this,useFakeFetchReturnData)
            }else{
                cb.apply(this,useFakeFetchReturnError)
            }
            
        },500)
    }
    if (useFakeFetch){ return; };

    // ========================================================================

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



export  const getFolderPathsBE=(...args)=>{
    let useFakeFetch=false;// for temp Testing and local Dev Frist env
    let useFakeFetchReturnData=[];// for temp Testing and local Dev Frist env
    let useFakeFetchReturnError=[];// for temp Testing and local Dev Frist env    
    let useFakeFetchReturnErr=false;// for temp Testing and local Dev Frist env
    
    

    let cb=()=>{}
    let params={}
    
    let rdtmp={}
    
    if (args.length === 1){
        cb=args[0];        
    }

    
    if (args.length > 1){
        if (args[0]!==undefined){
            params=args[0]    
        }
        
        cb=args[1]
    }

    let api="projectsVdev";
    let data={ 
        "type" : "getFolderPaths",         
        //"searchTxt" : searchBox,  
        
    };

    if ( params._data){
        data={...data,...params._data}
    }

    if ( params.data){
        if (data.data){
            data.data={...data.data,...params.data}

        }else{
            data.data=params.data
        }        
    }

    if ( params.filename){
        //data.filename=params.filename
    }

    if (useFakeFetch){
        setTimeout(()=>{
            if (useFakeFetchReturnErr===false){
                cb.apply(this,useFakeFetchReturnData)
            }else{
                cb.apply(this,useFakeFetchReturnError)
            }
            
        },500)
    }
    if (useFakeFetch){ return; };

    // ========================================================================

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

export const Projects=(props)=>{ 
    let initC=useRef(true);

    let projNameCurrDef="";
    if (typeof(props.projName)==="string"){
        if (props.projName.trim()!==""){
            projNameCurrDef=props.projName;
        }
    }

    let projectDef={}

    let fpTypeDef="schema";

    let [project,setProject]=useState({...projectDef});
    let [projNameCurr,setProjNameCurr]=useState(projNameCurrDef);
    let [projNameCurrTxt,setProjNameCurrTxt]=useState(projNameCurrDef);

    let filepathsStateDef=[];
    let [filepathsState,setFilepathsState]=useState([...filepathsStateDef]);    
    //let [fp,setFp]=useState("");
    let [fpName,setFpName]=useState("");
    let [fpNameFile,setFpNameFile]=useState("");
    let [fpType,setFpType]=useState(fpTypeDef);
    let [fpSubType,setFpSubType]=useState("");
    let [fpProject,setFpProject]=useState("");
    let [fpSrc,setFpSrc]=useState("");
    let [fpDst,setFpDst]=useState("");

    let [fpNameTxt,setFpNameTxt]=useState("");    
    let [fpNameFileTxt,setFpNameFileTxt]=useState("");
    let [fpProjectTxt,setFpProjectTxt]=useState("");
    let [fpSrcTxt,setFpSrcTxt]=useState("");
    let [fpDstTxt,setFpDstTxt]=useState("");

    let [fpNameDst,setFpNameDst]=useState("");
    let [fpNameDstTxt,setFpNameDstTxt]=useState("");
    let [fpVariant,setFpVariant]=useState("");
    let [fpVariantTxt,setFpVariantTxt]=useState("");
    

    let [folderPaths,setFolderPaths]=useState({});
    let [folderPathsSel,setFolderPathsSel]=useState("");
    let [folderPathsRecCurr,setFolderPathsRecCurr]=useState([]);
    let [folderPathsRecCurrSel,setFolderPathsRecCurrSel]=useState("");

    let [selSrcDstFocus,setSelSrcDstFocus]=useState("src");
    
    let [filterFolderpaths,setFilterFolderpaths]=useState("");
    let [filterSubFolderpaths,setFilterSubFolderpaths]=useState("");
    
    
    
    

    let recChangeCB=(dt)=>{
        //alert(JSON.stringify(dt));
        if (dt.data){
            if (Array.isArray(dt.data.filepaths)){
                setFilepathsState(dt.data.filepaths);
            }else{
                setFilepathsState([...filepathsStateDef]);
            }
        }
    }

    let {projectsVdev, projectsVdevDef, projectsVdevs, projectsVdevsList, setProjectsVdev, 
        setProjectsVdevs, setProjectsVdevsList, projectsVdevGetRec, projectsVdevGetRecs, 
        projectsVdevListRecs, projectsVdevAdd, projectsVdevUpdate, projectsVdevRemove, }=useProjectsVdev({recChangeCB : recChangeCB });
    
    
    

    let saveProjectFn=()=>{
        
    }

    // --------------------------------------

        useEffect(()=>{
            if (initC.current){
                initC.current=false;


                getFolderPathsBE((dt)=>{
                    if (dt){
                        if (dt.data){
                            setFolderPaths(dt.data)
                        }
                    }
                    
                })
            }
        },[])


        useEffect(()=>{

            if (props.onChangeName){
                if (typeof(props.onChangeName)==="function"){
                    if (projNameCurr!==props.projName){

                        props.onChangeName( { name  : projNameCurr , data : project });

                    }
                }
            }


        },[projNameCurr]);

    // ---------------------------------------

        let runFilepathRec=(rec,params)=>{
            runGenerateFileData( { data : rec }, (dt)=>{
                alert(JSON.stringify(dt))
            })

        }

    // ---------------------------------------


    let projectsE
    if (true){
        projectsE=(()=>{
            let arrE=[];

            
            if (!Array.isArray(projectsVdevs)){
                return;
            }

            //projects.forEach((r,i)=>{
            projectsVdevs.forEach((r,i)=>{
                
                let tmpR
                tmpR=JSON.stringify(r); // JSON.stringify(r,null,2);
                arrE.push(
                    <div
                        style={{

                        }}
                    >
                        {tmpR}
                    </div>
                )

            })


        })()
    }


    let projectListE;
    if (projectsVdevsList.data){
        let arrE=[];
        projectsVdevsList.data.forEach((r,i)=>{

            // r.projectsVdevID
            // r.lastUpdate

            arrE.push(
                <div
                    key={i}
                    style={{
                        borderBottom : "solid thin grey",
                        cursor : "pointer",
                    }}

                    onClick={()=>{
                        
                        setProjNameCurrTxt(r.name);

                        projectsVdevGetRec({ projectsVdevID : r.projectsVdevID},(dt)=>{
                            
                            setProject(dt)
                            setProjNameCurr(r.name);
                            
                        })
                    }}
                >
                    {r.name}
                </div>
            )

        });

        projectListE=(
            <div
                style={{
                    display : "inline-block",
                    position : "relatiev",
                    width  : 200,

                    background : "lightblue",
                    
                }}
            >
                {arrE}
            </div>
        )

    }


    let schemaTypeE;
    if (true){
        schemaTypeE=(()=>{
            let E

            let showTypeSelectionE
            if (fpType==="schema"){
                showTypeSelectionE=(
                    <SchemasListLoad 
                        //onChangeName
                        
                        onLoad={(dt, extra)=>{
                            //alert(JSON.stringify(dt))
                            
                            if (typeof(dt)!=="object"){
                                alert("schema parse error");
                                return;
                            };
                            let name=extra.schemaName.replace( /\.json/ ,"" )

                            setFpNameFile(name);
                            setFpNameFileTxt(name);
                            setFpProject(extra.projectName);
                            setFpProjectTxt(extra.projectName);


                            let startpath="";
                            let tmpSrcPath="";
                            let tmp_projname="";

                            if (fpType==="schema"){
                                if (folderPaths){
                                    if (folderPaths.listIdxArr){
                                        if (folderPaths.listIdx["vDevSchema"]){
                                            startpath=folderPaths.listIdx["vDevSchema"] + "/";
                                        }                                        
                                    }
                                }
                            }       
                            if (fpType==="cmpt"){
                                if (folderPaths){
                                    if (folderPaths.listIdxArr){
                                        if (folderPaths.listIdx["vDevCmpt"]){
                                            startpath=folderPaths.listIdx["vDevCmpt"] + "/";
                                        }                                        
                                    }
                                }
                            }       

                            if (fpType==="cmpt"){
                                if (folderPaths){
                                    if (folderPaths.listIdxArr){
                                        if (folderPaths.listIdx["vDevViews"]){
                                            startpath=folderPaths.listIdx["vDevViews"] + "/";
                                        }                                        
                                    }
                                }
                            }                         
                            
                            if (extra.projectName!==""){
                                tmp_projname=extra.projectName + "/";
                            }
                            let endpath=tmp_projname  + extra.schemaName ;

                            if (extra.schemaName.trim()!=="" && startpath!==""){
                                tmpSrcPath=startpath + endpath ;
                                setFpSrc(tmpSrcPath);
                                setFpSrcTxt(tmpSrcPath);
                            }

                            // setSchemaName(extra.schemaName);
                            // setProjectName(extra.projectName);
                            // setSchemaRec(dt);
                            // setSchemaBoxTxt(JSON.stringify(dt,null,2));
                            // setExampleBoxTxt(dt.example);                            
                        }}
                    />
                )
            }

            E=(
                <div
                    style={{
                        display : "inline-block",
                        verticalAlign : "top",
                    }}
                >            
                    {showTypeSelectionE}
                </div>  
            
                    
            )


            return E;
        })();
    }

    let projectFilesE;
    if (true){
        projectFilesE=(()=>{            
            let E
            let filepaths=[]
            let filepathsE=[]
            
            filepathsState.forEach((r,i)=>{

                    
                filepathsE.push(
                    <div
                        key={i}
                        style={{
                            border : "solid thin grey",
                            borderRadius : 4,
                            margin : 5
                        }}
                    >
                        <div
                            style={{
                                display : "inline-block",
                                margin : 2,
                            }}
                        > 
                            name  : {r.name}
                        </div>
                        <div
                            style={{
                                display : "inline-block",
                                margin : 2,
                            }}
                        > 
                            file name  : {r.namefile}
                        </div>
                        {(()=>{
                            if (fpType==="schema"){
                                //fpProject
                                //fpProjectTxt
                                return (
                                    <div
                                        style={{
                                            display : "inline-block",
                                            margin : 2,
                                        }}
                                    > 
                                        file project  : {r.nameproject}
                                    </div>
                                )
                            }
                        })()}
                        <div
                            style={{
                                display : "inline-block",
                                margin : 2,
                            }}
                        > 
                            type : {r.type}
                        </div>
                        <div
                            style={{
                                display : "inline-block",
                                margin : 2,
                            }}
                        > 
                            subtype  : {r.subtype}
                        </div>
                        <div
                            style={{
                                display : "inline-block",
                                margin : 2,
                            }}
                        > 
                            src : {r.src}
                        </div>
                        <div
                            style={{
                                display : "inline-block",
                                margin : 2,
                            }}
                        > 
                            dst : {r.dst}
                        </div>
                        <div
                            style={{
                                display : "inline-block",
                                margin : 2,
                            }}
                        > 
                            <button
                                onClick={()=>{
                                    runFilepathRec(filepathsState[i]);
                                }}
                            >run</button>
                            <button
                                onClick={()=>{
                                    let narr=[...filepathsState];
                                    narr.splice(i,1);
                                    setFilepathsState(narr)
                                }}
                            >del</button>
                        </div>
                        
                        

                    </div>
                )
            })
           
            E=(
                <div
                    style={{
                         
                    }}
                >
                    <label>Files</label>
                    <div
                        style={{
                            background : "orange",
                            border : "solid thin grey",
                            borderRadius : 4,
                            margin : 5,
                        }}
                    
                    >   
                        <div
                            style={{
                                background : "white",
                                border : "solid thin grey",
                                borderRadius : 4,
                                margin : 5,
                                padding : 5,
                            }}
                        
                        >   
                            <label>New</label>
                            <br/>
                            <input 
                                value={fpNameTxt}
                                placeholder='name'
                                style={{
                                    
                                }}
                                
                                onChange={(e)=>{
                                    let val=e.target.value;
                                    setFpNameTxt(val);
                                }}
                                onBlur={(e)=>{
                                    let val=e.target.value
                                    setFpName(val);
                                }}
                            />
                            <input 
                                value={fpNameFileTxt}
                                placeholder='file name'
                                style={{
                                    
                                }}
                                
                                onChange={(e)=>{
                                    let val=e.target.value;
                                    setFpNameFileTxt(val);
                                }}
                                onBlur={(e)=>{
                                    let val=e.target.value
                                    setFpNameFile(val);
                                }}
                            />
                            {(()=>{
                                if (true){
                                    //if (fpType==="schema"){
                                    //fpProject
                                    //fpProjectTxt
                                    return (
                                            <input 
                                                value={fpProjectTxt}
                                                placeholder='file project'
                                                style={{
                                                    
                                                }}
                                                
                                                onChange={(e)=>{
                                                    let val=e.target.value;
                                                    setFpProjectTxt(val);
                                                }}
                                                onBlur={(e)=>{
                                                    let val=e.target.value
                                                    setFpProject(val);
                                                }}
                                            />
                                    )
                                }
                            })()}
                            <select 
                                value={fpType}
                                placeholder='type'
                                //defaultValue={fpTypeDef}
                                style={{
                                    
                                }}

                                onChange={(e)=>{
                                    let val=e.target.value;
                                    setFpType(val);
                                }}                            
                            >
                                <option value={"schema"} >schema</option>
                                <option value={"view"} >view</option>
                                <option value={"cmpt"} >cmpt</option>

                            </select>
                            <select 
                                value={fpSubType}
                                placeholder='sub type'
                                //defaultValue={fpTypeDef}
                                style={{
                                    
                                }}

                                onChange={(e)=>{
                                    let val=e.target.value;
                                    setFpSubType(val);
                                }}                            
                            >
                                <option  placeholder={'subtype'} >subtype</option>
                                <option value={"useHook"} >useHook</option>
                                <option value={"frontendFE"} >frontendFE</option>
                                <option value={"apiBE"} >apiBE</option>
                                <option value={"dbBE"} >dbBE</option>

                            </select>
                            <br/>
                            <input 
                                value={fpSrcTxt}
                                placeholder='src'

                                style={{
                                    width : 600,
                                }}
                                onChange={(e)=>{
                                    let val=e.target.value;
                                    setFpSrcTxt(val);
                                }}
                                onBlur={(e)=>{
                                    let val=e.target.value
                                    setFpSrc(val);
                                }}
                                onFocus={()=>{
                                    setSelSrcDstFocus("src")
                                }}
                                onClick={()=>{
                                    setSelSrcDstFocus("src");
                                }}
                            />
                            <br/>
                            <input 
                                value={fpDstTxt}
                                placeholder='dest'

                                style={{
                                    width : 600,
                                }}
                                onChange={(e)=>{
                                    let val=e.target.value;
                                    setFpDstTxt(val);
                                }}
                                onBlur={(e)=>{
                                    let val=e.target.value
                                    setFpDst(val);
                                    
                                }}
                                onFocus={()=>{
                                    setSelSrcDstFocus("dst")
                                }}
                                onClick={()=>{
                                    setSelSrcDstFocus("dst");
                                }}
                            />
                            <br/>
                            <button
                                 style={{
                                    width : 600,
                                }}
                                onClick={()=>{
                                    let nar=[...filepathsState]
                                    let nr={
                                        name : fpName,
                                        namefile : fpNameFile,
                                        nameproject : fpProject,
                                        type : fpType,
                                        subtype : fpSubType,
                                        src : fpSrc,
                                        dst : fpDst,
                                    }
                                    nar.push(nr);
                                    setFilepathsState(nar);
                                }}
                            >add</button>
                            <br/>
                            {schemaTypeE}
                            {(()=>{
                                let arrE=[]
                                if (folderPaths){
                                    if (folderPaths.listIdxArr){
                                        folderPaths.listIdxArr.forEach((r2,i2)=>{
                                            let r2name=r2.name;
                                            let r2path=r2.path;

                                            let bg
                                            if (r2.recursive){
                                                bg="lightyellow";
                                            }

                                            if (folderPathsSel===r2.name + "_" + i2){
                                                bg="lightgreen"
                                            }

                                            let userec=false;
                                            if (filterFolderpaths.trim()===""){
                                                userec=true
                                            }else{
                                                if (r2path.toLowerCase().includes(filterFolderpaths.toLowerCase()) || r2name.toLowerCase().includes(filterFolderpaths.toLowerCase())){
                                                    userec=true;
                                                }
                                            }

                                            if (userec){
                                                arrE.push(
                                                    <div
                                                        key={i2}
                                                        style={{
                                                            cursor : "pointer",
                                                            borderBottom : "solid thin grey",
                                                            background : bg
                                                        }}
                                                        onClick={()=>{
                                                            if (folderPaths){
                                                                if (folderPaths.listIdxArrRecDirs){
                                                                    // folderPaths.listIdxArrRecDirs
                                                                    setFolderPathsSel(r2.name + "_" + i2);                                                                
                                                                    if (selSrcDstFocus==="src"){
                                                                        let name=fpNameFile.replace( /\.json/ ,"" )

                                                                        let startpath=r2path;
                                                                        let tmpSrcPath="";
                                                                        let tmp_projname="";

                                                                        startpath=startpath + "/";                       
                                                                        
                                                                        if (fpProject!==""){
                                                                            tmp_projname=fpProject + "/";
                                                                        }
                                                                        let endpath=tmp_projname  + fpNameFile ;

                                                                        //if (fpNameFile.trim()!=="" && startpath!==""){
                                                                            tmpSrcPath=startpath + endpath ;                                                                            
                                                                        //}


                                                                        setFpSrc(tmpSrcPath);
                                                                        setFpSrcTxt(tmpSrcPath);                                                                    
                                                                    }
                                                                    if (selSrcDstFocus==="dst"){
                                                                        setFpDst(r2path);
                                                                        setFpDstTxt(r2path);                                                                    
                                                                    }
                                                                    if (Array.isArray(folderPaths.listIdxArrRecDirs[r2name])){
                                                                        let nrec=[...folderPaths.listIdxArrRecDirs[r2name]];
                                                                        nrec.forEach((r3,i3)=>{
                                                                            r3.nameMainSub=r3.name;
                                                                        })
                                                                        
                                                                        setFolderPathsRecCurr(nrec);
                                                                    }   
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        {r2name} - {r2path}
                                                    </div>
                                                );
                                            }
                                        });
                                    }
                                }

                                let arrErec=[]
                                folderPathsRecCurr.forEach((r1,i1)=>{
                                    let r1name=r1.name;
                                    let r1path=r1.path;
                                    let nameMainSub=r1.nameMainSub;
                                    
                                    let bg
                                    if (folderPathsRecCurrSel===r1.name + "_" + i1){
                                        bg="lightgreen"
                                    }
                                    let userec=false;
                                            if (filterSubFolderpaths.trim()===""){
                                                userec=true
                                            }else{
                                                if (r1path.toLowerCase().includes(filterSubFolderpaths.toLowerCase()) || r1name.toLowerCase().includes(filterSubFolderpaths.toLowerCase())){
                                                    userec=true;
                                                }
                                            }

                                            if (userec){
                                        arrErec.push(
                                            <div
                                                key={i1}
                                                style={{
                                                    cursor : "pointer",
                                                    borderBottom : "solid thin grey",
                                                    background : bg
                                                }}

                                                onClick={()=>{
                                                    
                                                    setFolderPathsRecCurrSel(r1.name + "_" + i1);
                                                    if (selSrcDstFocus==="src"){
                                                        let name=fpNameFile.replace( /\.json/ ,"" )

                                                        let startpath=r1path;
                                                        let tmpSrcPath="";
                                                        let tmp_projname="";

                                                        startpath=startpath + "/";                       
                                                        
                                                        if (fpProject!==""){
                                                            tmp_projname=fpProject + "/";
                                                        }
                                                        let endpath=tmp_projname  + fpNameFile ;

                                                        //if (fpNameFile.trim()!=="" && startpath!==""){
                                                            tmpSrcPath=startpath + endpath ;                                                                            
                                                        //}

                                                        setFpSrc(tmpSrcPath);
                                                        setFpSrcTxt(tmpSrcPath);                                                                    
                                                    }
                                                    if (selSrcDstFocus==="dst"){
                                                        setFpDst(r1path);
                                                        setFpDstTxt(r1path);                                                                    
                                                    }
                                                }}
                                            >
                                                {r1name} - {r1path}
                                            </div>
                                        );
                                    }

                                })
                                return (
                                    <div
                                        style={{
                                            display : "inline-block",
                                            width : 820,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display : "inline-block",
                                                width : 400,
                                                height : 100,
                                                border : "solid thin grey",
                                                borderRadius : 4,
                                                verticalAlign : "top",
                                                overflow : "hidden",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width : 400,
                                                    height : 90,
                                                    overflow : "hidden",
                                                    border : "solid thin grey",
                                                    borderRadius : 4,
                                                    margin : 4,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding : 5,
                                                        textAlign : "left",
                                                        width : 410,
                                                        height : 80,
                                                        overflow : "auto",
                                                        fontSize : 11,
                                                    }}
                                                >
                                                    <input                                                         
                                                        value={filterFolderpaths}
                                                        placeholder='filter'
                                                        onChange={(e)=>{
                                                            let val=e.target.value;
                                                            setFilterFolderpaths(val)
                                                        }}
                                                    />
                                                    {arrE} 
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                display : "inline-block",
                                                width : 400,
                                                height : 100,
                                                border : "solid thin grey",
                                                borderRadius : 4,
                                                verticalAlign : "top",
                                                overflow : "hidden",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width : 400,
                                                    height : 90,
                                                    overflow : "hidden",
                                                    border : "solid thin grey",
                                                    borderRadius : 4,
                                                    margin : 4,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding : 5,
                                                        textAlign : "left",
                                                        width : 410,
                                                        height : 80,
                                                        overflow : "auto",
                                                        fontSize : 11,
                                                    }}
                                                >
                                                    <input                                                         
                                                        value={filterSubFolderpaths}
                                                        placeholder='filter'
                                                        onChange={(e)=>{
                                                            let val=e.target.value;
                                                            setFilterSubFolderpaths(val)
                                                        }}
                                                    />
                                                    {arrErec} 
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })()}

                        </div>
                    </div>

                    <br/>
                    <div
                        style={{
                            background : "lightgreen",
                            border : "solid thin grey",
                            borderRadius : 4,
                            margin : 5,
                        }}
                    
                    >   
                        <div
                            style={{
                                background : "white",
                                border : "solid thin grey",
                                borderRadius : 4,
                                margin : 5,
                                padding : 5,
                            }}
                        
                        >  
                            {filepathsE}
                        </div>
                    </div>
                </div>
            )

            return E;

        })();
    }


    // 

    


    //projectsVdevListRecs

    // --------------------------------------



    let style={
        position  : "relative",
        background : "white",
        width : 1200,
        height : 300, 
        borderRadius : 8 ,
        overflow : "hidden",

    }
    if (props.style){
        style={...style,...props.style}
    }

    let styleSubMain={
        border : "solid thin lightgrey",
        margin : 6,
        borderRadius : 5,        
        overflow : "auto",
        
    }

    let styleSubMainFrame={
        width : "99%",
        borderRadius : 5,
        overflow : "hidden",
        borderRadius : 5, 
    }

    if (typeof(style.height)==="number"){
        styleSubMain.height = style.height - 10;
    }
    if (typeof(style.width)==="number"){
        styleSubMain.width = style.width - 10;

    }

    if (props.params){
        if (props.params.allActive){
            style.height=800;

            styleSubMain.height=780;

            styleSubMainFrame.height=785;            
            styleSubMainFrame.borderRadius=5;;

        }
    }

    return (
        <div
             style={style}
        >       
             <div
                 style={styleSubMainFrame}
            > 
                <div
                    style={styleSubMain}
                > 
                    <h1
                        style={{
                            color : "black"
                        }}
                    >Projects</h1>
            
            
                    <input 
                        placeholder={'Project Name...'}
                        value={projNameCurrTxt}
                        onChange={(e)=>{
                            let val=e.target.value;
                            setProjNameCurrTxt(val);
                        }}
                        onBlur={(e)=>{
                            let val=e.target.value;
                            let exists=false;
                            let foundRec
                            if (projectsVdevsList.data){
                                projectsVdevsList.data.forEach((r,i)=>{
                                    if (r.name===val){
                                        exists=true;
                                        foundRec=r.projectsVdevID;
                                    }
                                })
                            }

                            if (exists){
                                
                                projectsVdevGetRec({ projectsVdevID :foundRec},(dt)=>{
                                    
                                    setProject(dt)
                                    setProjNameCurr(val);
                                    
                                })
                            }
                        }}
                    />
                    <br/>
                    <button
                        onClick={()=>{
                            if (projNameCurrTxt.trim()===""){
                                alert(" requires nprojectame");
                                return ;
                            }
                            projectsVdevAdd({                       
                                name : projNameCurrTxt,                        
                            },()=>{
                                projectsVdevListRecs({},()=>{})

                                if (false){
                                    setProject({...projectDef});                            
                                }
                                    setFilepathsState([...filepathsStateDef]); 
                                    setFpNameFile("");
                                    setFpName("");
                                    setFpType("");
                                    setFpSrc("");
                                    setFpDst("")
                                    setFpNameTxt("");
                                    setFpSrcTxt("");
                                    setFpDstTxt("");
                            });
                        }}
                    >
                        new
                    </button>

                    
                    

                    <br/>
                    <button
                        onClick={()=>{
                            //projectsVdevAdd({   
                            let iDloaded=false
                            if (project.data){
                                    if (project.data.projectsVdevID){
                                        if (project.data.projectsVdevID.trim()!==""){
                                            iDloaded=true;
                                        }
                                }
                            }
                            if (iDloaded){
                                projectsVdevUpdate({                          
                                    name : projNameCurrTxt,
                                    projectsVdevID : project.data.projectsVdevID,
                                    filepaths : [...filepathsState]
                                },()=>{
                                    projectsVdevListRecs({},()=>{})
                                })
                            }else{
                                alert("no project ID Loaded")
                            }
                        }}
                    >
                        save
                    </button>

                    {/*
                        <button
                            style={{

                            }}
                            onClick={()=>{

                            }}
                        >
                            archive
                        </button>
                    */}

                    <button
                        onClick={()=>{
                            let iDloaded=false
                            if (project.data){
                                if (project.data.projectsVdevID){
                                    if (project.data.projectsVdevID.trim()!==""){
                                        iDloaded=true;
                                    }
                                }
                            }
                            if (iDloaded){
                                projectsVdevRemove({                       
                                    projectsVdevID : project.data.projectsVdevID,             
                                },()=>{
                                    projectsVdevListRecs({},()=>{})
                                })
                            }else{
                                alert("no project ID Loaded")
                            }
                        }}
                        
                    >
                        delete
                    </button>


                    <button
                        style={{

                        }}
                        onClick={()=>{

                        }}
                    >
                        export
                    </button>

                    <br/>

                    <div
                        style={{}}
                    >
                        <label>projects</label>
                        {projectsE}

                    </div>

                    <div
                        style={{

                        }}
                    >
                        {projectListE}
                    </div>
                    
                    <div
                    >
                        {projectFilesE}
                    </div>
                </div>
            </div>

        </div>
    )

}