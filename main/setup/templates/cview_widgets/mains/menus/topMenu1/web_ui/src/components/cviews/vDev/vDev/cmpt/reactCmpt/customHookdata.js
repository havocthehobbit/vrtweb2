let exData={};
// usage customHookdata.useHook()
//  return  hook;string ,cmpt;string }


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exData.useHook=(...args)=>{
let ret={}
let params={
    name : "Component",
    useGetRecsInit  : false, 
    useGetRecsListInit : false,
    useProps: [],
};

if (args[0]){
    params={...params,...args[0] };
}
if (args[1]){
    

}

let name=params.name;
let names=params.name + "s";


let tmpusePropsArrRet=(()=>{
    let ret1="";
    let len=parseInt(parseInt(params.useProps.length) - 1 );
    params.useProps.forEach((r,i)=>{        
        ret1+=r;
        if (i > 0 || i < len){
            ret1+=", ";
        }
        
    })
    return ret1;
})();
let varUseNames=[ 
    name + "", name + "Def",
    names + "", names + "List",
    "set" + capitalizeFirstLetter(name) + "",
    "set" + capitalizeFirstLetter(names) + "",
    "set" + capitalizeFirstLetter(names) + "List",
    name + "GetRec",
    name + "GetRecs",
    name + "ListRecs",
    name + "Add",
    name + "Update",
    name + "Remove",

];

let varUseNamesArrRet=(()=>{
    let ret1="";
    let len=parseInt(parseInt(varUseNames.length) - 1 );
    varUseNames.forEach((r,i)=>{        
        ret1+=r;
        if (i > 0 || i < len){
            ret1+=", ";
        }
        
    })
    return ret1;
})();
ret.hook=`let {${varUseNamesArrRet}}=use${name}(${tmpusePropsArrRet})`;

ret.cmpt=`import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react";
import $gl from "../../../../common/globallib";
import { $cn } from "../../../../common/libNative";

//let feach=$cn.each
let tof=$cn.tof
//let isUn=$cn.isUn
let isOb=$cn.isOb
//let cl=$cn.l

export const use${name}=(props)=>{
    let recName1="${name}";
    let recsName1=recName1 + "s";
    let apiNameSpace1="${name}" ;
    
    let apiNameGetRecs="${name}" , useGetRecsInit=false ;
    let apiNameGetRecsList="list" , useGetRecsListInit=true ;    

    let recDef={
        
    }

    let [recs, setRecs]=useState([])
    let [rec, setRec]=useState(recDef)
    let [recsList, setRecsList]=useState([])
    let initC=useRef(true);

    useEffect(()=>{
        if (initC.current){
            initC=false;
            if (useGetRecsInit){
                fetchRecsBE({},(dt)=>{
                    //alert(JSON.stringify(dt,null,2))
                    if (dt.data){
                        setRecs(dt.data.all)
                    }
                    
                })
            }
            if (useGetRecsListInit){
                fetchRecsListBE({},(dt)=>{
                    //alert(JSON.stringify(dt,null,2))
                    if (dt.data){
                        setRecs(dt.data.all)
                    }
                    
                })
            }

        }
    },[])

    if (props){

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
    
        let api="KCSadmin"
        let data={ 
            "type" : "getK8devServers",         
            //"searchTxt" : searchBox,  
            //userid : user.userid,
        };
    
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
    
        let api="KCSadmin"
        let data={ 
            "type" : "getK8devServers",         
            //"searchTxt" : searchBox,  
            //userid : user.userid,
        };
    
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
            cb(dt)    
        })

        
    }


    let addRec=(...args)=>{

    }

    let updateRec=(...args)=>{

    }

    let removeRec=(...args)=>{

    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let retData={         
    }

    let rdtmp={};
    rdtmp[recName1]=rec;
    rdtmp[recName1 + "Def"]=recDef;
    rdtmp[recsName1]=recs;
    rdtmp[recsName1]=recsList;
    
    rdtmp["set" + capitalizeFirstLetter(recName1)]=setRec;
    rdtmp["set" + capitalizeFirstLetter(recsName1)]=setRecs;
    rdtmp["set" + capitalizeFirstLetter(recsName1) + "List"]=setRecsList;

    rdtmp[recName1 + "GetRec"]=getRec;
    rdtmp[recName1 + "GetRecs"]=getRecs;
    rdtmp[recName1 + "ListRecs"]=listRecs;
    rdtmp[recName1 + "Add"]=addRec;
    rdtmp[recName1 + "Update"]=updateRec;
    rdtmp[recName1 + "Remove"]=removeRec;


    
    for (let p in rdtmp) {
        retData[p]=rdtmp[p];
    }

    return retData

}

`;

    return ret
}

export const customHookdata=exData