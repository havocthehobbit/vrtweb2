import React,{ useEffect , useState,useRef, useContext } from 'react'
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
import { v4 as uuidv4 } from 'uuid';

let tof=$cn.tof;
let isOb=$cn.isOb

export const Plugins=(props)=>{ 
    let initC=useRef(true)

    let [allPlugins,setAllPlugins]=useState([]);
    let [allPluginsEparams,setAllPluginsEparams]=useState({});

    let [allPluginsCurr,setAllPluginsCurr]=useState("");
    let [jsonPackageRec,setJsonPackageRec]=useState({});
    let [jsonPackageRecShow,setJsonPackageRecShow]=useState(false);

    let [installedPlugins,setInstalledPlugins]=useState([]);

    let [selectedID,setSelectedID]=useState("");
    


    useEffect(()=>{
        if (initC.current){
            initC.current=false;
            
            listPlugins();
            listInstalled();
        }

    },[]);

    let fetchBE=(...args)=>{
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

        let api="plugins"
        let data={ 
            "type" : "listAll",         
            //"searchTxt" : searchBox,  
            
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

    let listInstalledFetchBE=(...args)=>{
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

        let api="plugins"
        let data={ 
            "type" : "listInstalled",         
            //"searchTxt" : searchBox,  
            
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

    let installFetchBE=(...args)=>{
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

        let api="plugins"
        let data={ 
            "type" : "install",
            "code"  : allPluginsCurr
            //"searchTxt" : searchBox,  
            
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

    let archiveFetchBE=(...args)=>{
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

        let api="plugins"
        let data={ 
            "type" : "archive",
            "code"  : allPluginsCurr
            //"searchTxt" : searchBox,  
            
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

    let listArchiveFetchBE=(...args)=>{
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

        let api="plugins"
        let data={ 
            "type" : "listArchived",            
            //"searchTxt" : searchBox,              
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

    let restoreArchivedFetchBE=(...args)=>{
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

        let api="plugins"
        let data={ 
            "type" : "restoreArchived",
            "id"  : selectedID
            //"searchTxt" : searchBox,  
            
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

    let removeFetchBE=(...args)=>{
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

        let api="plugins"
        let data={ 
            "type" : "remove",
            "id"  : selectedID
            //"searchTxt" : searchBox,  
            
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

    

    let listPlugins=(...args)=>{

        fetchBE(args[0],(dt)=>{
            if (dt){
                if (dt.data){
                    if (dt.data.all){
                        let data=dt.data

                        if (dt.err!==""){
                            //console.log("alert" , JSON.stringify(data,null,2))
                            alert( JSON.stringify(dt,null,2));
                        }else{
                            
                            setAllPlugins(data.all);

                        }              



                    }
                }
            }

        });
    }

    let listInstalled=(...args)=>{
        listInstalledFetchBE(args[0],(dt)=>{
            if (dt){
                if (dt.data){
                    if (dt.data.installed){
                        let data=dt.data

                        if (dt.err!==""){
                            //console.log("alert" , JSON.stringify(data,null,2))
                            alert( JSON.stringify(dt,null,2));
                        }else{
                            
                            setInstalledPlugins(data.installed);

                        }              



                    }
                }
            }

        });
    }


    let refresh=()=>{
        listPlugins();
        listInstalled();
    }

    let jsonPackageE
    if (jsonPackageRecShow){
        jsonPackageE=(
            <div
                style={{

                }}
            >
                <textarea 
                    style={{
                        position : "relative",
                        width : "100%",
                        height : 400,
                        
                    }}
                    value={JSON.stringify(jsonPackageRec,null,2)} 
                    onChange={()=>{}}
                />
            </div>
        )
    }

    if (false){
        let installedPluginsE=(()=>{
            installedPlugins.forEach(()=>{

            });
        })();
    };

    let allpluginsE=(()=>{
        let E
        let arrE=[]

        

        allPlugins.forEach((r,i)=>{ 

            let name=r.name;
            let code=r.data.code;
            let files=[]
            let data={}
            let base_main_path=""
            if (r.data){
                data=r.data;
                code=r.data.code;
                if (r.data.files){
                    if (r.data.files.base_main_path){
                        base_main_path=r.data.files.base_main_path;
                    }
                    if (r.data.files.all){
                        files=r.data.files.all
                    }
                }
            

            }

            let isInstalled=false;
            let version_installed=0;
            let version_package=0;
            installedPlugins.forEach((r2,i2)=>{                
                if (r2.code===code){
                    //console.log(r.code);
                    if (r2.installed){
                        isInstalled=true;
                    }
                    if (r2.version_installed){
                        version_installed=r2.version_installed;
                    }
                    if (r2.version_package){
                        version_package=r2.version_package;
                    }
                }
            });
            
            let installedtext="not installed"
            let installedCss={
                position : "absolute",
                display : "inline-block",
                left : 0, top : 0,
                fontSize : 10,
                width : 120 ,
                margin : 2.5,

                border : "solid thin grey"
            }
            if (isInstalled){
                installedtext="installed";
                installedCss.background="lightgreen";
            }

            let version_installedCss={
                display : "inline-block",
                marginLeft : 3,
                fontSize : 10,
            }
            let version_packageCss={
                display : "inline-block",
                marginLeft : 3,
                fontSize : 10,
            }
            
            if (version_installed < version_package ){
                installedCss.background="orange"
            }
            if (isInstalled===false){
                installedCss.background="lightgrey"
            }

            
            let installedE=(
                <div
                    style={installedCss}
                >
                    {installedtext}  
                    <div
                        style={version_installedCss}
                    >
                       v{version_installed}
                    </div>  
                    <div
                        style={version_packageCss}
                    >
                      / v{version_package}
                    </div>                 
                </div>
            )

            let filesArrE=[]
            let filesE

            let isExpanded=false;
            if (allPluginsEparams[code]){
                if (allPluginsEparams[code].expanded){
                    isExpanded=true;
                }
            }
            if (isExpanded){
                if (files){                                
                    files.forEach((r2 , i2)=>{
                            let src_path=base_main_path + r2.src;
                            let dst_path=base_main_path + r2.dest;
                        
                            filesArrE.push(
                                <div
                                    key={i2}
                                    style={{

                                    }}
                                >
                                    <pre>src : {src_path}</pre>
                                    <pre>dst : {dst_path}</pre>                                
                                </div>
                            );
                    });

                };

                filesE=(
                    <div
                        style={{

                        }}
                    >
                        <label> files</label>
                        <br/>
                        {filesArrE}
                    </div>
                )
            }

            let bg="lightblue";
            if (allPluginsCurr===code){
                bg="lightyellow"
            }

            arrE.push(
                <div
                    key={i}
                    style={{

                    }}
                >
                    <div
                        style={{
                            position :"relative",
                            background : bg
                        }}
                        onClick={()=>{
                            setJsonPackageRec({...r});
                            setAllPluginsCurr(code);
                            //alert(JSON.stringify(installedPlugins));
                        }}
                    >
                       {name}
                        <div
                        
                        >
                            {installedE}
                        </div>

                       <div
                             style={{
                                position :"absolute",
                                display :"block",
                                background : "white",
                                border : "solid thin black",
                                overflow : "hidden",

                                width : 20,
                                height : 15,
                                
                                right : 0,
                                top : 0,

                            }}
                            onClick={()=>{
                                let nv={...allPluginsEparams};
                                if (nv[code]){
                                    nv[code].expanded=!nv[code].expanded;
                                }else{  
                                    nv[code]={
                                        expanded : true
                                    }
                                }                                

                                setAllPluginsEparams(nv)
                            }}

                       >+-</div>


                    </div>
                       
                    <div
                        
                    >                        
                        {filesE}                 
                    </div>
                    


                    {/*  
                        {JSON.stringify(r)};
                    */}
                </div>
            );
            


            
        });


        

        E=(
            <div
                
                style={{

                }}
            >

                <div
                    style={{
                        position : "relative",
                        display : "inline-block",
                    }}
                >
                    <div
                        style={{
                            position : "relative",
                            display : "inline-block",
                            width : 400,
                            height : 400,
                            border : "solid thin black",
                            overflow : "hidden",

                        }}
                    >
                        {arrE}
                    </div>
                    {
                        (()=>{
                            if (jsonPackageRecShow){

                            return (
                                    <div
                                        style={{
                                            position : "relative",
                                            display : "inline-block",
                                            width : 400,
                                            height : 400,
                                            border : "solid thin black",
                                            overflow : "hidden",
                                        }}
                                    >
                                        {jsonPackageE}
                                    </div>
                                );
                            }
                        

                        })()
                    }
                    
                </div>
            </div>
        );

        return E;
    })();


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

    
    if (props.params){
        if (props.params.allActive){
            style.height=600


        }
    }

    return (
        <div
            style={style}
        
        >
            <h3>Plugings</h3>
          
            <div
                style={{}}
            >

                <button
                    onClick={()=>{
                        refresh();
                        
                    }}
                >refresh</button>
                <button
                    onClick={()=>{
                        let nv=!jsonPackageRecShow
                        setJsonPackageRecShow(nv);
                    }}
                >json rec</button>
                {allpluginsE}
            </div>
        </div>
    )

}