let exData={};
// usage customHookdata.useHook()
//  return  hook;string ,cmpt;string }


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exData.Obj=(...args)=>{
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

    let nameSpace=params.nameSpace;
    let nameAPI=params.name;
    let namesAPI=params.name + "s";



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
        names + "GetRec",
        names + "GetRecs",
        names + "ListRecs",
        names + "Add",
        names + "Update",
        names + "Remove",

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

    let colsDBC=[];
    let colsDBCsearch=[];

    if (params.cols){
        params.cols.forEach((r,i)=>{
            colsDBC.push(r);
        
        });
    }

    let colDef={
        "name" : "",
        "type" : "",
        "has_override" : false,
        "override" : "",
        "has_default" : false,
        "default_val" : "",
        "has_default_override" : false,
        "default_override" : "",
    }

    let colTypesFn=()=>{

    }

ret.customAPI=`{   // ${nameAPI}
    name  : "${nameSpace}",
    route : "/${nameAPI}", // if route not included it will defualt to to name
    type : "post", // get or post
    cb : function(req, res, corestuff){ // or fn or callback
        var bd=req.body; // get data sent from front end
        let gdb=corestuff.mds.vrtw.gdb;

        let mainsubFN=()=>{            
            let apiName="${nameAPI}"
            switch(bd._type){ // if for example type var string was sent in body data then can run a selection                             
                case "list":  
                    let nr1={};
                    gdb[apiName].list(nr1, (dt)=>{
                        let nd

                        if (dt.length > 0){
                            nd=dt
                        }else{
                            nd=[]
                        }
                        
                        res.jsonp({ data : nd ,
                                    status : "list" + "${nameAPI}" ,bStatus : true
                        })
                        return
                    });
                    
                    return;
                    break;                            
                case "new":                                                                                       
                    let nr2={                                                                                                                                  
                        
                    };
                    
                    gdb[apiName].new(nr2, (dt)=>{                                    
                        let ret={ status : "new" + "${nameAPI}", bStatus : true}
                        ret[apiName + "ID"]=dt[apiName + "ID"]
                        
                        res.jsonp(ret)
                        return
                    });
                                                                                
                    return;
                    break;
                case "save":                                             
                    let nr3={ 
                        "owner" : bd.Owner,
                        "groups" : bd.groups,
                    };
                    
                    nr3[apiName + "ID"]=bd[apiName + "ID"]                    

                    gdb[apiName].save(nr3, (dt)=>{                        
                        let ret={ status : "save" + apiName, bStatus : true}
                        ret[apiName + "ID"]=dt[apiName + "ID"]                                    
                        res.jsonp(ret)                                        
                        return
                    });                  
                                                    
                    return;
                    break;
                case "get":                                
                    if (bd[apiName + "ID"] ){
                        let nr4={} 
                        nr4[apiName + "ID"]=bd[apiName + "ID"] 

                        gdb[apiName].get(nr4, (dt)=>{
                            //cl(dt)
                            // #todo - return id for note to be used in future 
                        
                            let nd={}

                            if (dt.length > 0){
                                nd=dt[0]
                            }
                            
                            res.jsonp({ data : nd ,
                                        status : "get" + apiName ,bStatus : true
                            })
                            return
                        });
                    }else{
                        res.jsonp({ 
                            data : [],
                            status : "get" + apiName + ": no " + apiName + "ID" ,bStatus : false
                        })
                    }
                                                        
                    return;
                    break;   
            
            }

            res.jsonp({ status : "notype" + apiName,bStatus : false})

        }        

        mainsubFN()

        return                        
    }  
},

`;

    return ret
}



export const customAPIdata=exData