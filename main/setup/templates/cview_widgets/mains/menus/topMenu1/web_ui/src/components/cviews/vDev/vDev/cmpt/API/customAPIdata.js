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

ret.customAPIboilerplateSub1Name=``;
ret.customAPIboilerplateSub1=``;

ret.customAPIboilerplate=`
let fs=require('fs')
let path = require('path'); // this contanes some extra modules and standard library function that can be made to make life easier , please see help under nodejsVRTwebStdLib
let ssh2 = require('ssh2');
let csvparse = require('csv-parse') // csv-parser promisses offspin
//import fastXML from "fast-xml-parser";
let fastXML=require('fast-xml-parser')
let multer=require('multer')

let modName="${ret.customAPIboilerplateSub1Name}"

let $cn=require("../../l_node_modules/libNative").$cn
let cl=$cn.l
let feach=$cn.each
let isOb=$cn.isOb
let isUn=$cn.isUn 

let main={
    type  : "apiJS",
    auto_run : function(){ 
        console.log("auto_running " + modName)
    },
    run_after_init : function(params){
        console.log("run_after_init " + modName)
    },
    __app : [ // must be named __app to create a route
        ${ret.customAPIboilerplateSub1}
    ]
}



 
module.exports[modName]=main;
`

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
                    if (true){
                        let nr={};
                        gdb[apiName].list(nr, (dt)=>{
                            let nd

                            if (dt.length > 0){
                                nd=dt
                            }else{
                                nd=[]
                            }
                            
                            res.jsonp({ data : nd ,
                                        status : "list" + "${nameAPI}" ,bStatus : true
                            })
                            return true;
                        });
                        
                        return true;;
                    }
                    break;                            
                case "new":
                    if (true){
                        let nr={};                                                                                       
                                            
                        gdb[apiName].new(nr, (dt)=>{                                    
                            let ret={ status : "new" + "${nameAPI}", bStatus : true}
                            ret[apiName + "ID"]=dt[apiName + "ID"]
                            
                            res.jsonp(ret)
                            return true;
                        });
                                                                                    
                        return true;;
                    }
                    break;
                case "save":
                    if (true){
                        let nr={};                                              
                                            
                        nr[apiName + "ID"]=bd[apiName + "ID"]                    

                        gdb[apiName].save(nr, (dt)=>{                        
                            let ret={ status : "save" + apiName, bStatus : true}
                            ret[apiName + "ID"]=dt[apiName + "ID"]                                    
                            res.jsonp(ret)                                        
                            return true;
                        });                  
                                                        
                        return true;;
                    }
                    break ;
                case "get":
                    if (true){
                        if (bd[apiName + "ID"] ){
                            let nr={} 
                            nr[apiName + "ID"]=bd[apiName + "ID"] 

                            gdb[apiName].get(nr, (dt)=>{                            
                                let nd={}

                                if (dt.length > 0){
                                    nd=dt[0]
                                }
                                
                                res.jsonp({ data : nd ,
                                    status : "get" + apiName ,bStatus : true
                                })
                                return true;
                                
                            });
                        }else{
                            res.jsonp({ 
                                data : [],
                                status : "get" + apiName + ": no " + apiName + "ID" ,bStatus : false
                            })
                            return true;
                        }
                                                            
                        
                    }
                    break;        
                case "delete":
                    if (true){
                        if (bd[apiName + "ID"] ){
                            let nr={} 
                            nr[apiName + "ID"]=bd[apiName + "ID"] 

                            gdb[apiName].delete(nr, (dt)=>{                            
                                let nd={}

                                if (dt.length > 0){
                                    nd=dt[0]
                                }
                                
                                res.jsonp({ data : nd ,
                                    status : "get" + apiName ,bStatus : true
                                })
                                return true;
                                
                            });
                        }else{
                            res.jsonp({ 
                                data : [],
                                status : "delete" + apiName + ": no " + apiName + "ID" ,bStatus : false
                            })
                            return true;
                        }
                                                            
                        
                    }
                    break;        
                case "archive":
                    if (true){
                        if (bd[apiName + "ID"] ){
                            let nr={} 
                            nr[apiName + "ID"]=bd[apiName + "ID"] 

                            gdb[apiName].archive(nr, (dt)=>{                            
                                let nd={}

                                if (dt.length > 0){
                                    nd=dt[0]
                                }
                                
                                res.jsonp({ data : nd ,
                                    status : "get" + apiName ,bStatus : true
                                })
                                return true;
                                
                            });
                        }else{
                            res.jsonp({ 
                                data : [],
                                status : "archive" + apiName + ": no " + apiName + "ID" ,bStatus : false
                            })
                            return true;
                        }
                                                            
                        
                    }
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