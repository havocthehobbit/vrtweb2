let progargs=require("../l_node_modules/execRunParams.js").args
let $cn=require("../l_node_modules/libNative").$cn
let $cnn=require("../l_node_modules/libNativeNode").$cnn
let cl=$cn.l
let tof=$cn.tof

let generalDbFns={
    name : "generalproj",
    db : undefined,
    users : {
        getUser : (params, cbp)=>{
            let db=generalDbFns.db 
            let temp=""
            let details=undefined       
            let view=undefined       

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}
            temp="userid"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }        
            temp="id"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }                
            temp="email"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }        
            temp="details"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }        
            temp="view"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }

            let users=db.collection("users")
            users.findOne(searchBy)
            .then((dt)=>{
                cb(dt)
            })
            .catch((err)=>{
                cb([], err)
            })
        },
 
        getUsers : (params, cbp)=>{
            let db=generalDbFns.db
            let temp=""
            let details=undefined
            let view=undefined
            
            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}        
            temp="type"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }
            temp="active"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }
            temp="details"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }
            temp="view"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }
        
            let users=db.collection("users")
            users.find(searchBy).toArray()
            .then((dt)=>{
                cb(dt)
            })
            .catch((err)=>{
                cb([], err)
            })
        },

        
        
        setUserPass : (params, cbp)=>{
            let db=generalDbFns.db 
            let temp=""
            let details=undefined       
            let view=undefined       
            let newRec={}

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}
            temp="userid"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }        
            temp="id"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }

            temp="pass"
            if (tof(params[temp])!=="undefined"){
                newRec["password"]=params[temp]
            }  
            temp="password"
            if (tof(params[temp])!=="undefined"){
                newRec["password"]=params[temp]
            }  
            temp="updatedBy"
            if (tof(params[temp])!=="undefined"){
                newRec[temp]=params[temp]
            } 
            
            if (tof(newRec["password"])==="undefined"){
                cb([], "error : no password supplied")
                return
            }

            newRec.lastupdateFN="resetPassword"
            newRec.lastupdate=new Date()

            let users=db.collection("users")
            users.updateOne(searchBy, {$set: newRec})
            .then((dt)=>{
                cb(dt)
            })
            .catch((err)=>{
                cb([], err)
            })
        },

        getOrder : (params, cbp)=>{
            let db=generalDbFns.db 
            let temp=""
            let details=undefined 
            let view=undefined      

            let cb=()=>{}
            if (typeof(cbp)==="function"){cb=cbp}

            searchBy={}
            temp="id"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }
            temp="title"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }     

            temp="details"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }
            temp="view"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }

            let users=db.collection("orders")
            users.findOne(searchBy)
            .then((dt)=>{
                cb(dt)
            })
            .catch((err)=>{
                cb([], err)
            })
        },
        getOrders : (params, cbp)=>{
            let db=generalDbFns.db
            let temp=""
            let details=undefined
            let view=undefined
            
            let cb=()=>{}
            if (typeof(cbp)==="function"){cb=cbp}

            searchBy={}
            temp="type"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }
            temp="active"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }
            temp="details"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }
            temp="view"
            if (tof(params[temp])!=="undefined"){
                details=params[temp]
            }
        
            let users=db.collection("orders")
            users.find(searchBy).toArray()
            .then((dt)=>{
                cb(dt)
            })
            .catch((err)=>{
                cb([], err)
            })
        },

        
    },

    progParams : {
        adminProgParamResetPass: (params, cbp)=>{
            let tt=generalDbFns
            progargs.params(function (val, index, array) {     
                if (val==="--adminpass" || val==="-adminpass" || val==="--resetadmin" || val==="-resetadmin" || val==="--adminreset" || val==="-adminreset"
                    || val==="--adminpasswordreset" || val==="-adminpasswordreset" || val==="--adminpassreset" || val==="-adminpassreset"
                ){
                    params.useHttpServer=false
                    setTimeout(
                        ()=>{
                            cl("\n\n================")
                            $cnn.shellprompt("type in new admin password ? " ,(answer)=>{
                                cl("reseting adming password...")
                                tt.users.setUserPass({ admin : answer, password : answer,updatedBy : "ServerOSConsole" },(dt0,err)=>{
                                    if (tof(err)!=="undefined"){cl(err)}
                                    tt.users.getUser({userid : "admin"},(dt)=>{    
                                        cl("reset completed successfully...")                        
                                        process.exit()
                                    })                        
                                })
                                
                            })
                        }
                        ,
                        3000
                    )
                    
                    
                }        
            });
        },
        
        adminProgParamListUsers: (params, cbp)=>{
            let tt=generalDbFns
            progargs.params(function (val, index, array) {     
                if (val.toLowerCase()==="--listusers" || val.toLowerCase()==="-listusers"  ){
                    params.useHttpServer=false
                    setTimeout(
                        ()=>{
                            cl("\n\n================")
                            //$cnn.shellprompt("type in new admin password ? " ,(answer)=>{                                
                                tt.users.getUsers({},(dt,err)=>{
                                    if (tof(err)!=="undefined"){cl(err)}                             
                                    let ret=[]
                                    let strret=""
                                    dt.forEach((r,i)=>{
                                        let nr={}
                                        nr.userid=r.userid
                                        ret.push(nr)

                                        strret+=`${nr.userid}\n`
                                    });
                                    //console.log(JSON.stringify(ret,null,2))
                                    cl(strret)
                                    process.exit()
                              
                                })                                
                            //})
                        }
                        ,
                        3000
                    )
                    
                    
                }        
            });
        },

    }

}

let schemas={
    users : {
        template : {
            userid : "",
            password : "",
            email : "",
            uid : "",
            updatedBy : "",
            lastupdateFN : "",
            lastupdate : "",
        },
        templates : {},
        schema : {},
        initData : {
            install : {     
                data : []           
            }
        },
    },
    users_details : {
        template : {
            name : "",
            surname : "",
            names : [],            
            email : "", 
            emails : [],           
            user_uid : "",
            updatedBy : "",
            lastupdateFN : "",
            lastupdate : "",
        },
        templates : {},
        schema : {},
        initData : {
            install : {     
                data : []           
            }
        },
    },
    groups : {
        template : {
            groupid : "",                        
            uid : "",
            updatedBy : "",
            lastupdateFN : "",
            lastupdate : "",
        },
        templates : {},
        schema : {},
        initData : {
            install : {     
                data : []           
            }
        },
    },

}


exports.generalDbFns=generalDbFns
exports.schemas=schemas