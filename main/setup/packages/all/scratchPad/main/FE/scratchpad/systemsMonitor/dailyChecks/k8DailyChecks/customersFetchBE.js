import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react";
import $gl from "../../../../../common/globallib";
import { $cn } from "../../../../../common/libNative";

let tof=$cn.tof;
let isOb=$cn.isOb;

export const useKCSDCcustomers=(props)=>{ // { recname, apiNameSpace , ..rec..IDmain , ..rec..ChangeCB }
    let recName1="KCSDCcustomers";
    if (props){
        if (props.recname){
            recName1=props.recname;
        }
    }
    let recsName1=recName1 + "s";
    let apiNameSpace1="KCSDCcustomers" ;
    
    let apiNameGetRecs="KCSDCcustomers" , useGetRecsInit=false ;
    let apiNameGetRecsList="list" , useGetRecsListInit=true ;    
    let apiNameGetRecAdd="new" ;    
    let apiNameGetRecSave="save" ;    
    let apiNameGetRecGet="get" ;    
    let apiNameGetRecDel="delete" ;    
    let apiNameGetRecArchive="archive" ;    

    let initCb=()=>{}
    let recDef={}
    let recIDmainDef={}
    if (props){
        if (props.IDmain){
            recIDmainDef=props.IDmain
        }else{
            recIDmainDef={ }
            recIDmainDef[recName1 + "ID"]=""
        }

        if (props.apiNameSpace){
            apiNameSpace1=props.apiNameSpace;
        }

        if (props.initCb){
            initCb=props.initCb;
        }
        
    }else{
        recIDmainDef={ }
        recIDmainDef[recName1 + "ID"]=""
    }

    

    let [recsIDmain, setRecsIDmain]=useState(recIDmainDef)
    let [recs, setRecs]=useState([])
    let [rec, setRec]=useState(recDef)
    let [recsList, setRecsList]=useState([])
    let initC=useRef(true);
    let prevID=useRef({});
    let prevRec=useRef({});

    let idCount=0;
    for (let p in recsIDmain){
        idCount++
    }

    useEffect(()=>{
        if (initC.current){
            initC=false;
            

            if (useGetRecsInit){
                getRecs({},(dt)=>{
                    //alert(JSON.stringify(dt,null,2))
                    if (dt.data){
                        setRecs(dt.data.all)
                    }
                    
                })
            }
            if (useGetRecsListInit){
                listRecs({},(dt)=>{
                    //alert(JSON.stringify(dt,null,2))
                    if (dt.data){
                        setRecs(dt.data.all)
                    }
                    
                })
            }

            initCb()

        }
    },[])
    
        
    let recChangeCB=()=>{} 
    if (props){
        if (props.recChangeCB){
            recChangeCB=props.recChangeCB
        }
        if (props[recName1 + "ChangeCB"]){
            recChangeCB=props[recName1 + "ChangeCB"]
        }
    }

    useEffect(()=>{
        if (JSON.stringify(prevRec.current) !== JSON.stringify(rec)){
            let newRecIDmain={}
            for (let p in recsIDmain){
                if (rec.data){
                    newRecIDmain[p]=rec.data[p];
                }                
            }
            setRecsIDmain(newRecIDmain);
        }   

        
            
        let data={}
        if (rec.data){
            data=rec.data
        }
        let prevData={}
        if (prevRec.current.data){
            prevData=prevRec.current.data
        }
        recChangeCB(rec,data,prevRec.current,prevData)
            
        prevRec.current=JSON.parse(JSON.stringify(rec));
    },[rec])

    let newRecIDmainCB=()=>{}
    if (props){
        if (props.newRecIDmainCB){
            newRecIDmainCB=props.newRecIDmainCB
        }
    }
    useEffect(()=>{
        if (JSON.stringify(recsIDmain) !== JSON.stringify(prevID.current)){
            newRecIDmainCB(recsIDmain ,idCount,JSON.parse(JSON.stringify(prevID.current))) // maybe need to deep copy // JSON.parse(JSON.stringigy(recsIDmain))
        }

        // ---- anything that needs to ref prevous val needs to run before this or outside of useEffect
        prevID.current=JSON.parse(JSON.stringify(recsIDmain)) // maybe need to deep copy  // JSON.parse(JSON.stringigy(recsIDmain))
    },[recsIDmain])

    
    
    
    //apiNameGetRecGet
    let fetchRecBE=(...args)=>{
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
    
        let api=apiNameSpace1
        let data={ 
            "_type" : apiNameGetRecGet,         
            //"searchTxt" : searchBox,  
            
        };

        if ( params._data){
            data={...data,...params._data}
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

    let fetchRecsBE=(...args)=>{
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
    
        let api=apiNameSpace1
        let data={ 
            "_type" : apiNameGetRecs,         
            //"searchTxt" : searchBox,  
            
        };

        if ( params._data){
            data={...data,...params._data}
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
    
    let fetchRecsListBE=(...args)=>{
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
    
        let api=apiNameSpace1
        let data={ 
            "_type" : apiNameGetRecsList,         
            //"searchTxt" : searchBox,  
            
        };

        if ( params._data){
            data={...data,...params._data}
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

    let addRecBE=(...args)=>{
        let useFakeFetch=false;// for temp Testing and local Dev Frist env
        let useFakeFetchReturnData=[];// for temp Testing and local Dev Frist env
        let useFakeFetchReturnError=[];// for temp Testing and local Dev Frist env    
        let useFakeFetchReturnErr=false;// for temp Testing and local Dev Frist env
    
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


        
        let api=apiNameSpace1
        let data={ 
            "_type" : apiNameGetRecAdd,         
            //"searchTxt" : searchBox,  
            //userid : user.userid,
        };
    
        if ( params._data){
            data={...data,...params._data}
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

    let updatRecBE=(...args)=>{
        let useFakeFetch=false;// for temp Testing and local Dev Frist env
        let useFakeFetchReturnData=[];// for temp Testing and local Dev Frist env
        let useFakeFetchReturnError=[];// for temp Testing and local Dev Frist env    
        let useFakeFetchReturnErr=false;// for temp Testing and local Dev Frist env
    
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
        
        

        let api=apiNameSpace1
        let data={ 
            "_type" : apiNameGetRecSave,         
            //"searchTxt" : searchBox,  
            //userid : user.userid,
        };

        
        if ( params._data){
            data={...data,...params._data}
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

    let delRecBE=(...args)=>{
        let useFakeFetch=false;// for temp Testing and local Dev Frist env
        let useFakeFetchReturnData=[];// for temp Testing and local Dev Frist env
        let useFakeFetchReturnError=[];// for temp Testing and local Dev Frist env    
        let useFakeFetchReturnErr=false;// for temp Testing and local Dev Frist env
    
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
        
        

        let api=apiNameSpace1
        let data={ 
            "_type" : apiNameGetRecDel,         
            //"searchTxt" : searchBox,  
            //userid : user.userid,
        };

        
        if ( params._data){
            data={...data,...params._data}
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

    let archiveRecBE=(...args)=>{
        let useFakeFetch=false;// for temp Testing and local Dev Frist env
        let useFakeFetchReturnData=[];// for temp Testing and local Dev Frist env
        let useFakeFetchReturnError=[];// for temp Testing and local Dev Frist env    
        let useFakeFetchReturnErr=false;// for temp Testing and local Dev Frist env
    
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
        
        

        let api=apiNameSpace1
        let data={ 
            "_type" : apiNameGetRecArchive,         
            //"searchTxt" : searchBox,  
            //userid : user.userid,
        };

        
        if ( params._data){
            data={...data,...params._data}
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

    let getRec=(...args)=>{
        let cb=()=>{}
        let params={}
        if (args.length>1){
            if (args[0]){
                if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                    params={...params,...args[0]}
                }
            }
            if (args[1]){
                cb=args[1]
            }
        }
        if (args.length===1){
            if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                params={...params,...args[0]}
            }
        }
        
        fetchRecBE({ _data : params },(dt)=>{
            setRec(dt)
            cb(dt)    
        })

    }

    let getRecs=(...args)=>{
        let cb=()=>{}
        let params={}
        if (args.length>1){
            if (args[0]){
                if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                    params={...params,...args[0]}
                }
            }
            if (args[1]){
                cb=args[1]
            }
        }
        if (args.length===1){
            if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                params={...params,...args[0]}
            }
        }
        
        fetchRecsBE({ _data : params },(dt)=>{
            setRecs(dt)
            cb(dt)    
        })

        
    }

    let listRecs=(...args)=>{
        let cb=()=>{}
        let params={}
        if (args.length>1){
            if (args[0]){
                if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                    params={...params,...args[0]}
                }
            }
            if (args[1]){
                cb=args[1]
            }
        }
        if (args.length===1){
            if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                params={...params,...args[0]}
            }
        }
        
        fetchRecsListBE({ _data : params },(dt)=>{
            setRecsList(dt)
            cb(dt)    
        })

        
    }
    


    let addRec=(...args)=>{
        // addRecBE
        let cb=()=>{}
        let params={}
        if (args.length>1){
            if (args[0]){
                if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                    params={...params,...args[0]}
                }
            }
            if (args[1]){
                cb=args[1]
            }
        }
        if (args.length===1){
            if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                params={...params,...args[0]}
            }
        }
        
        addRecBE({ _data : params },(dt)=>{
            cb(dt)    
        })
    }

    let updateRec=(...args)=>{
        let cb=()=>{}
        let params={}
        if (args.length>1){
            if (args[0]){
                if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                    params={...params,...args[0]}
                }
            }
            if (args[1]){
                cb=args[1]
            }
        }
        if (args.length===1){
            if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                params={...params,...args[0]}
            }
        }
        
        updatRecBE({ _data : params },(dt)=>{
            cb(dt)    
        })
    }

    let removeRec=(...args)=>{
        let cb=()=>{}
        let params={}
        if (args.length>1){
            if (args[0]){
                if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                    params={...params,...args[0]}
                }
            }
            if (args[1]){
                cb=args[1]
            }
        }
        if (args.length===1){
            if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                params={...params,...args[0]}
            }
        }
        
        delRecBE({ _data : params },(dt)=>{
            cb(dt)    
        })
    }
    
    let archiveRec=(...args)=>{
        let cb=()=>{}
        let params={}
        if (args.length>1){
            if (args[0]){
                if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                    params={...params,...args[0]}
                }
            }
            if (args[1]){
                cb=args[1]
            }
        }
        if (args.length===1){
            if (typeof(args[0])==="object" && Array.isArray(args[0])===false){
                params={...params,...args[0]}
            }
        }
        
        delRecBE({ _data : params },(dt)=>{
            cb(dt)    
        })
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let retData={ 
        //devServers : recs,setDevServers : setRecs,
        //devServer : rec, setDevServer : setRec, devServerDef : recDef,
        //devServerAdd : addRec, devServerUpdate : updateRec,
    }
    let rdtmp={};
    rdtmp[recName1]=rec;
    rdtmp[recName1 + "Def"]=recDef;
    rdtmp[recsName1]=recs;
    rdtmp[recsName1 + "List"]=recsList;

    rdtmp[recName1 + "IDmain"]=recsIDmain;

    

    rdtmp["set" + capitalizeFirstLetter(recName1)]=setRec;
    rdtmp["set" + capitalizeFirstLetter(recsName1)]=setRecs;
    rdtmp["set" + capitalizeFirstLetter(recsName1) + "List"]=setRecsList;
    rdtmp["set" + capitalizeFirstLetter(recName1) + "IDmain"]=setRecsIDmain;

    rdtmp[recName1 + "GetRec"]=getRec;
    rdtmp[recName1 + "GetRecs"]=getRecs;
    rdtmp[recName1 + "ListRecs"]=listRecs;
    rdtmp[recName1 + "Add"]=addRec;
    rdtmp[recName1 + "Update"]=updateRec;
    rdtmp[recName1 + "Remove"]=removeRec;
    rdtmp[recName1 + "Archive"]=archiveRec;
    


    
    for (let p in rdtmp) {
        retData[p]=rdtmp[p];
    }

    return retData

}
        
        
    

    
        
    

