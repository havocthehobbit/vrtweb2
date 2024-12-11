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

    let dbCalls={
        "use_newRecStr" : true,
        "newRecStr_hasGenID" : true,
        "newRecStr_lastupdate" : true,
        
        "use_newRecsStr" : true,

        "use_saveRecStr" : true,
        "saveRecStr_hasSearchID" : true,

        "use_saveRecsStr" : true,

        "use_getRecStr" : true,
        "getRecStr_hasSearchID" : true,
        
        "use_getRecsStr" : true,

        "use_deleteRecStr" : true,
        "deleteRecStr_hasSearchID" : true,

        "use_deleteRecsStr" : true,

        "use_archiveRecStr" : true,
        "archiveRecStr_hasSearchID" : true,

        "use_archiveRecsStr" : true,

        "use_listRecsStr" : true,
        

    };
    
    let tempStr0=`
  

            temp="abc"
            if (tof(params[temp])!=="undefined"){
                if (params[temp].trim()!==""){
                    newRec[temp]=params[temp]                        
                }else{newRec[temp]="..."}
            }else{
                newRec[temp]="..."
            }             
            params.cols=[{ name : "data" }, { name : "status" }, { name : "note" }, { name : "owner" }, { name : "groups" }, { name : "tags" }, { name : "note" }, { name : "private" }, { name : "createdBy" }, { name : "createDate" }, { name : "updatedBy" }, { name : "ownedBy", { name : "ownedByGroup" }];        
                     
`   ;

    if (true){
        dbCalls["newRecStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "newRecStr"]){
                
                retStr+=`                 
                searchBy={}
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;

                if (dbCalls["newRecStr" + "_lastupdate"]){
                    retStr+=`                      
                    newRec.lastUpdate=new Date();
        
                    `;
                }

                if (dbCalls["newRecStr" + "_hasGenID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }
                    `;
                }

                colsDBC.forEach((r,i)=>{
                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }`;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;

            }
            return retStr;
        })()
        dbCalls["newRecsStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "newRecsStr"]){
 
                retStr+=`                 
                searchBy={}
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;

                if (dbCalls["newRecStr" + "_lastupdate"]){
                    retStr+=`                      
                    newRec.lastUpdate=new Date();
        
                    `;
                }

                if (dbCalls["newRecStr" + "_hasGenID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }
                    `;
                }

                colsDBC.forEach((r,i)=>{
                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }`;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;
                
                
            }
            return retStr;
        })()
        dbCalls["saveRecStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "saveRecStr"]){
                 
                retStr+=`                 
                searchBy={}
                
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;
                
                if (dbCalls["saveRecStr" + "_hasSearchID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    } 
                    `;
                }
                colsDBCsearch.forEach((r,i)=>{                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    } 
                   `;
                    retStr+=`

                    `;

                });

                if (dbCalls["saveRecStr" + "_lastupdate"]){
                    retStr+=`                      
                    newRec.lastUpdate=new Date();
        
                    `;
                }

                if (dbCalls["saveRecStr" + "_hasGenID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }
                    `;
                }

                colsDBC.forEach((r,i)=>{
                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }`;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;
                
                
            }
            return retStr;        
        })()
        dbCalls["saveRecsStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "saveRecsStr"]){
 
                retStr+=`                 
                searchBy={}
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;

                if (dbCalls["saveRecsStr" + "_hasSearchID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }
                    `;
                }

                colsDBCsearch.forEach((r,i)=>{                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    } 
                   `;
                    retStr+=`

                    `;

                });

                if (dbCalls["saveRecsStr" + "_lastupdate"]){
                    retStr+=`                      
                    newRec.lastUpdate=new Date();
        
                    `;
                }

                if (dbCalls["saveRecsStr" + "_hasGenID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }
                    `;
                }

                colsDBC.forEach((r,i)=>{
                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }`;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;
                
                
            }
            return retStr;        
        })()
        dbCalls["getRecStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "getRecStr"]){
 
                retStr+=`                 
                searchBy={}
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;

                if (dbCalls["getRecStr" + "_hasSearchID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    } 
                    `;
                }

                colsDBCsearch.forEach((r,i)=>{                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    } 
                   `;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;
                
                
            }
            return retStr;        
        })()
        dbCalls["getRecsStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "getRecsStr"]){
 
                retStr+=`                 
                searchBy={}
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;

                if (dbCalls["newRecStr" + "_lastupdate"]){
                    retStr+=`                      
                    newRec.lastUpdate=new Date();
        
                    `;
                }

                if (dbCalls["newRecStr" + "_hasGenID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }
                    `;
                }

                colsDBC.forEach((r,i)=>{
                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }`;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;
                
                
            }
            return retStr;        
        })()
        dbCalls["deleteRecStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "deleteRecStr"]){
 
                retStr+=`                 
                searchBy={}
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;

                colsDBCsearch.forEach((r,i)=>{                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    } 
                   `;
                    retStr+=`

                    `;

                });

                if (dbCalls["deleteRecStr" + "_lastupdate"]){
                    retStr+=`                      
                    newRec.lastUpdate=new Date();
        
                    `;
                }

                if (dbCalls["deleteRecStr" + "_hasGenID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }
                    `;
                }

                colsDBC.forEach((r,i)=>{
                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }`;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;
                
                
            }
            return retStr;        
        })()
        dbCalls["deleteRecsStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "deleteRecsStr"]){
 
                retStr+=`                 
                searchBy={}
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;
                colsDBCsearch.forEach((r,i)=>{                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    } 
                   `;
                    retStr+=`

                    `;

                });

                if (dbCalls["deleteRecsStr" + "_lastupdate"]){
                    retStr+=`                      
                    newRec.lastUpdate=new Date();
        
                    `;
                }

                if (dbCalls["deleteRecsStr" + "_hasGenID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }
                    `;
                }

                colsDBC.forEach((r,i)=>{
                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }`;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;
                
                
            }
            return retStr;        
        })()
        dbCalls["archiveRecStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "archiveRecStr"]){

   
                retStr+=`                 
                searchBy={}
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;
                colsDBCsearch.forEach((r,i)=>{                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    } 
                   `;
                    retStr+=`

                    `;

                });

                if (dbCalls["archiveRecStr" + "_lastupdate"]){
                    retStr+=`                      
                    newRec.lastUpdate=new Date();
        
                    `;
                }

                if (dbCalls["archiveRecStr" + "_hasGenID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }
                    `;
                }

                colsDBC.forEach((r,i)=>{
                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }`;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;              
                
            }
            return retStr;        
        })()
        dbCalls["archiveRecsStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "archiveRecsStr"]){

   
                retStr+=`                 
                searchBy={}
                      
                newRec={...searchBy,...newRec}                     

                if (true){        
                `;
                colsDBCsearch.forEach((r,i)=>{                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        searchBy[temp]=params[temp]
                    } 
                   `;
                    retStr+=`

                    `;

                });

                if (dbCalls["archiveRecsStr" + "_lastupdate"]){
                    retStr+=`                      
                    newRec.lastUpdate=new Date();
        
                    `;
                }

                if (dbCalls["archiveRecsStr" + "_hasGenID"]){
                    retStr+=`                      
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }
                    `;
                }

                colsDBC.forEach((r,i)=>{
                
               
                    retStr+=`

                    `;
                    retStr+=`
                    temp="${r.name}"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }`;
                    retStr+=`

                    `;

                });

                retStr+=`                      
                }       
                `;              
                
            }
            return retStr;        
        })()
        dbCalls["listRecsStr"]=(()=>{
            let retStr=""
            if (dbCalls["use_" + "listRecsStr"]){
  
                retStr+=`                 
                searchBy={};        
                `;             
                
            }
            return retStr;        
        })()
}

let boilerplateSub1=``;
let boilerplateSub2modname=``;
ret.boilerplate=`
let mod_name="${boilerplateSub2modname}"
let $cn=require("../../l_node_modules/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let feach=$cn.each
let isUn=$cn.isUn
let isOb=$cn.isOb
let crypto = require('crypto');

var main={
    type  : "dbJS",
    "auto_run" : ()=>{
        console.log("db lib : " , mod_name)
    },
    db : {
        ${ boilerplateSub1 }
    },
    schemas : { // TODO
        
    }
}

module.exports[mod_name]=main;
`;

ret.customDB=`${nameAPI} : {
    apiName : "${nameAPI}",
    tableName1 : "${nameAPI}",
    new : (frameworkdata ,params, cbp)=>{
        let db=frameworkdata.generalDbFns.db;
        let temp="";
        let details=undefined;      
        let view=undefined;  
        let newRec={};
        
        let cb=()=>{}
        if (typeof(cbp)==="function"){
            cb=cbp;
        }

        let apiName=main.db.${nameAPI}.apiName;
        let table1=main.db.${nameAPI}.tableName1;         
        
        ${dbCalls["newRecStr"]}                      
            
        let coll=db.collection(table1)
        
        coll.insertOne( newRec)
        .then((dt)=>{
            dt[apiName + "ID"]=newRec[apiName + "ID"]
            cb(dt)
        })
        .catch((err)=>{
            cb([], err)
        })
    }, 
    save : (frameworkdata ,params, cbp)=>{
        let db=frameworkdata.generalDbFns.db 
        let temp=""
        let details=undefined       
        let view=undefined       
        let newRec={}

        let devTestL=true

        let cb=()=>{}
        if (typeof(cbp)==="function"){
            cb=cbp
        }

        
        let apiName=main.db.${nameAPI}.apiName
        let table1=main.db.${nameAPI}.tableName1

        ${dbCalls["saveRecStr"]}
            
        let coll=db.collection(table1)        
        coll.updateOne(searchBy, {$set: newRec}, { upsert: true })
        .then((dt)=>{
            dt[apiName + "ID"]=newRec[apiName + "ID"]
            
            cb(dt)
        })
        .catch((err)=>{
            //console.log("3 err ", err)
            cb([], err)
        })
    }, 
    get : (frameworkdata ,params, cbp)=>{

        let db=frameworkdata.generalDbFns.db
        let temp=""
        let details=undefined
        let view=undefined
        let newRec={}

        let cb=()=>{}
        if (typeof(cbp)==="function"){
            cb=cbp
        }

        let apiName=main.db.${nameAPI}.apiName
        let table1=main.db.${nameAPI}.tableName1

        ${dbCalls["getRecStr"]}
    
        let coll=db.collection(table1)
        coll.find(searchBy).toArray()
        .then((dt)=>{
            cb(dt)
        })
        .catch((err)=>{
            cb([], err)
        })
    },            
    list : (frameworkdata ,params, cbp)=>{

        let db=frameworkdata.generalDbFns.db
        let temp=""
        let details=undefined
        let view=undefined

        let cb=()=>{}
        if (typeof(cbp)==="function"){
            cb=cbp
        }

        let apiName=main.db.${nameAPI}.apiName
        let table1=main.db.${nameAPI}.tableName1

        ${dbCalls["listRecsStr"]}
        
        let coll=db.collection(table1)
        coll.find(searchBy).toArray()
        .then((dt)=>{
            
            cb(dt)
        })
        .catch((err)=>{
            
            cb([], err)
        })
    },
    delete : (frameworkdata ,params, cbp)=>{

        let db=frameworkdata.generalDbFns.db
        let temp=""
        let details=undefined
        let view=undefined
        let newRec={}

        let cb=()=>{}
        if (typeof(cbp)==="function"){
            cb=cbp
        }

        let apiName=main.db.${nameAPI}.apiName
        let table1=main.db.${nameAPI}.tableName1

        ${dbCalls["getRecStr"]}
    
        let coll=db.collection(table1)
        coll.deleteOne(searchBy)
        .then((dt)=>{
            cb(dt)
        })
        .catch((err)=>{
            cb([], err)
        })
    }, 
    archive : (frameworkdata ,params, cbp)=>{

        let db=frameworkdata.generalDbFns.db
        let temp=""
        let details=undefined
        let view=undefined
        let newRec={}

        let cb=()=>{}
        if (typeof(cbp)==="function"){
            cb=cbp
        }

        let apiName=main.db.${nameAPI}.apiName
        let table1=main.db.${nameAPI}.tableName1

        ${dbCalls["getRecStr"]}
    
        let coll=db.collection(table1)
        coll.find(searchBy).toArray()
        .then((dt)=>{
            let coll2=db.collection(table1 + "__Archive")
            coll2.insertOne( dt[0])
            .then((dt)=>{
                dt[apiName + "ID"]=newRec[apiName + "ID"]
                
                cb(dt)
            })
            .catch((err)=>{
                //console.log("3 err ", err)
                cb([], err)
            })
        })
        .catch((err)=>{
            cb([], err)
        })
    }, 
 },
`;

    return ret
}






export const customDBdata=exData