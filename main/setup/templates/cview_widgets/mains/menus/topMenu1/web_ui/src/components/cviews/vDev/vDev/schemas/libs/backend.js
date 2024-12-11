import $gl from "../../../../../common/globallib"
import { $cn } from "../../../../../common/libNative"

let tof=$cn.tof;

export const loadSchemaBE=(...args)=>{
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
        "type" : "loadSchema",            
    };

    let tmp=""   
    
    tmp="name"
    if ( params[tmp]){
        data[tmp]=params[tmp];
    }else{
        alert ("error . name undefined")
        return 
    }

    tmp="project"
    if ( params[tmp]){
        data[tmp]=params[tmp];
    }else{
        params[tmp]="";
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


export const  listSchemaBE=(...args)=>{
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
        "type" : "listSchema",            
    };

    let tmp=""   

    
    tmp="project"
    if ( params[tmp]){
        data[tmp]=params[tmp];
    }else{
        params[tmp]="";
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


export const  saveSchemaBE=(...args)=>{
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
        "type" : "saveSchema",            
    };

    let tmp=""   

    tmp="name"
    if ( params[tmp]){
        data[tmp]=params[tmp];
    }else{
        alert ("error . name undefined")
        return 
    }

    tmp="project"
    if ( params[tmp]){
        data[tmp]=params[tmp];
    }else{
        params[tmp]="";
    }

    tmp="schema"
    if ( params[tmp]){
        data[tmp]=params[tmp];
    }else{
        alert ("error . schema name undefined")
        return 
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

export const  deleteSchemaBE=(...args)=>{
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
        "type" : "deleteSchema",            
    };

    let tmp=""   

    tmp="name"
    if ( params[tmp]){
        data[tmp]=params[tmp];
    }else{
        alert ("error . name undefined")
        return 
    }

    tmp="project"
    if ( params[tmp]){
        data[tmp]=params[tmp];
    }else{
        params[tmp]="";
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


