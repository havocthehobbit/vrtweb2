let mod_name="vDevDB"
let $cn=require("../../l_node_modules/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let feach=$cn.each
let isUn=$cn.isUn
let isOb=$cn.isOb
let crypto = require('crypto');

var main={
    "auto_run" : ()=>{
        console.log("db lib : vDev customDB")
    },
    db : {         
        projectsVdev : {
            apiName : "projectsVdev",
            tableName1 : "projectsVdev",
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
        
                let apiName=main.db.projectsVdev.apiName;
                let table1=main.db.projectsVdev.tableName1;         
                
                                 
                searchBy={}
                        
                newRec={...searchBy,...newRec}                                     
                if (true){        
                                        
                    newRec.lastUpdate=new Date();
        
                                            
        
                    temp=apiName + "ID"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }else{
                        newRec[ apiName + "ID"]=crypto.randomUUID()
                    }

                    temp="name"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }

                    temp="data"
                    if (tof(params[temp])!=="undefined"){
                        newRec[temp]=params[temp]
                    }
                                            
                }       
                                              
                    
                let coll=db.collection(apiName)
                
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
        
                
                let apiName=main.db.projectsVdev.apiName
                let table1=main.db.projectsVdev.tableName1
        
                                 
                        searchBy={}
                        
                              
                        newRec={...searchBy,...newRec}                     
        
                        if (true){        
                                              
                
                            temp=apiName + "ID"
                            if (tof(params[temp])!=="undefined"){
                                searchBy[temp]=params[temp]
                            }else{
                                newRec[ apiName + "ID"]=crypto.randomUUID()
                            }
                            
                            temp="name"
                            if (tof(params[temp])!=="undefined"){
                                newRec[temp]=params[temp]
                            }

                            temp="data"
                            if (tof(params[temp])!=="undefined"){
                                newRec[temp]=params[temp]
                            }
                                                  
                        }       
                        
                    
                let coll=db.collection(apiName)
                //coll.updateOne(searchBy, {$set: newRec})
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
        
                let cb=()=>{}
                if (typeof(cbp)==="function"){
                    cb=cbp
                }
        
                let apiName=main.db.projectsVdev.apiName
                let table1=main.db.projectsVdev.tableName1
        
                                 
                        searchBy={}
                              
                        newRec={...searchBy,...newRec}                     
        
                        if (true){        
                                              
                
                            temp=apiName + "ID"
                            if (tof(params[temp])!=="undefined"){
                                searchBy[temp]=params[temp]
                            } 
                                                  
                        }       
                        
            
                let users=db.collection(apiName)
                users.find(searchBy).toArray()
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
        
                let apiName=main.db.projectsVdev.apiName
                let table1=main.db.projectsVdev.tableName1
        
                                 
                        searchBy={};        
                        
                
                let users=db.collection(apiName)
                users.find(searchBy).toArray()
                .then((dt)=>{
                    
                    cb(dt)
                })
                .catch((err)=>{
                    
                    cb([], err)
                })
            },
         },
        
         
    },
    
}



 
module.exports[mod_name]=main;