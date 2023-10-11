let path = require("path");
let fs = require("fs");
let crypto = require('crypto');
let progargs=require("../l_node_modules/execRunParams.js").args
let $cn=require("../l_node_modules/libNative").$cn
let $cnn=require("../l_node_modules/libNativeNode").$cnn
let cl=$cn.l
let tof=$cn.tof
let feach=$cn.each
let isUn=$cn.isUn
let isOb=$cn.isOb

let generalDbFns={
    name : "generalproj",
    db : undefined,
    users : {
        getUser : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db 
            let temp=""
            let details={}
            let view=undefined  
            
            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }
            
            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}
            temp="searchBy"
            if (tof(params[temp])!=="undefined"){
                searchBy=params[temp]
            }    
            
            temp="userid"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }             

            let coll=db.collection("users")
            coll.findOne(searchBy)
            .then((dt)=>{                
                cb(dt)
            })
            .catch((err)=>{              
                cb([], err)
            })
        },
 
        getUsers : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db
            let temp=""
            let details=undefined
            let view=undefined
            
            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}    
            temp="searchBy"
            if (tof(params[temp])!=="undefined"){
                searchBy=params[temp]
            }    
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
        
        setUserPass : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db 
            let temp=""
            let details=undefined       
            let view=undefined       
            let newRec={}

            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}
            temp="searchBy"
            if (tof(params[temp])!=="undefined"){
                searchBy=params[temp]
            }
            temp="userid"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
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
        
        addUser : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db
            let temp=""
            let details={}
            
            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }
            
            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            temp="userid"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                cb([], { "error" : "no userid"})
            }

            temp="password"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]="123"
            }

            temp="email"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]="...@....com"
            }
            
            temp="group"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]="users"
            }

            temp="groups"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=[]
            }

            temp="roles"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=[]
            }
            
            temp="active"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=true
            }

            temp="resetOnPassLogin"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=false
            }
            
            details["uuid"]=crypto.randomUUID()
            details["dateCreated"]=new Date()
            
            let users=db.collection("users")
            users.find({ userid : details.userid}).toArray()
                        .then((dt)=>{ 
                            if (dt.length===0){ 
                                users.updateOne( { "userid" : details.userid } ,{ "$set" : details},{upsert : true })
                                .then((dt)=>{
                                    cb(dt)
                                })
                                .catch((err)=>{ 
                                    cl("err : ", dt) 
                                })
                            }
                        })
                        .catch((err)=>{  cb([], err) 
                        })
        },

        addGroup : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db
            let temp=""
            let details={}

            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            temp="groupid"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                cb([], { "error" : "no groupid"})
            }

            temp="type"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=""
            }

            temp="sub_groups"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=[]
            }

            temp="roles"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=[]
            }

            temp="active"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=true
            }

            
            details["uuid"]=crypto.randomUUID()
            details["dateCreated"]=new Date()
            
            let coll=db.collection("groups")
            coll.find({ userid : details.userid}).toArray()
                        .then((dt)=>{ 
                            if (dt.length===0){ 
                                coll.updateOne( { "groupid" : details.groupid } ,{ "$set" : details},{upsert : true })
                                .then((dt)=>{
                                    cb(dt)
                                })
                                .catch((err)=>{ 
                                    cl("err : ", dt) 
                                })
                            }
                        })
                        .catch((err)=>{  cb([], err) 
                        })
        },

        getGroup : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db 
            let temp=""
            let details={}
            let view=undefined       
            
            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}
            temp="groupid"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }               

            searchBy={}
            temp="searchBy"
            if (tof(params[temp])!=="undefined"){
                searchBy=params[temp]
            }
            temp="uuid"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }

            let coll=db.collection("groups")
            coll.findOne(searchBy)
            .then((dt)=>{
                cb(dt)
            })
            .catch((err)=>{
                cb([], err)
            })
        },
 
        getGroups : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db
            let temp=""
            let details=undefined
            let view=undefined
            
            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}        
            temp="searchBy"
            if (tof(params[temp])!=="undefined"){
                searchBy=params[temp]
            }
            temp="type"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }
            temp="active"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }

            let coll=db.collection("groups")
            coll.find(searchBy).toArray()
            .then((dt)=>{
                cb(dt)
            })
            .catch((err)=>{
                cb([], err)
            })
        },

        addRoles : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db
            let temp=""
            let details={}

            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            temp="roleid"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                cb([], { "error" : "no roleid"})
            }

            temp="type"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=""
            }

            temp="sub_roles"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=[]
            }

            temp="active"
            if (tof(params[temp])!=="undefined"){
                details[temp]=params[temp]
            }else{
                details[temp]=true
            }

            
            details["uuid"]=crypto.randomUUID()
            details["dateCreated"]=new Date()
            
            let coll=db.collection("roles")
            coll.find({ userid : details.userid}).toArray()
                        .then((dt)=>{ 
                            if (dt.length===0){ 
                                coll.updateOne( { "roleid" : details.roleid } ,{ "$set" : details},{upsert : true })
                                .then((dt)=>{
                                    cb(dt)
                                })
                                .catch((err)=>{ 
                                    cl("err : ", dt) 
                                })
                            }
                        })
                        .catch((err)=>{  cb([], err) 
                        })
        },

        getRoles : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db 
            let temp=""
            let details={}
            let view=undefined       
            
            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}
            searchBy={}
            temp="searchBy"
            if (tof(params[temp])!=="undefined"){
                searchBy=params[temp]
            }
            temp="roleid"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }               

            temp="uuid"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }

            let coll=db.collection("roles")
            coll.findOne(searchBy)
            .then((dt)=>{
                cb(dt)
            })
            .catch((err)=>{
                cb([], err)
            })
        },
 
        getRoles : (franeworkData, params, cbp)=>{
            let db=generalDbFns.db
            let temp=""
            let details=undefined
            let view=undefined
            
            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }
            
            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }

            searchBy={}        
            temp="searchBy"
            if (tof(params[temp])!=="undefined"){
                searchBy=params[temp]
            }
            temp="type"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }
            temp="active"
            if (tof(params[temp])!=="undefined"){
                searchBy[temp]=params[temp]
            }

            let coll=db.collection("roles")
            coll.find(searchBy).toArray()
            .then((dt)=>{
                cb(dt)
            })
            .catch((err)=>{
                cb([], err)
            })
        },

        
    },
    loginAuth : {         
        checkCanPass : (franeworkData, params, cbp)=>{
            // params : { bd , data , ret_data}
            let db=generalDbFns.db 
            let temp=""
            let details={}
            let view=undefined  
            
            if (franeworkData.generalDbFns){}else{ // no custom dbs
                cbp=params
                params=franeworkData
            }
            
            console.log( "checkCanPass",franeworkData, params, cbp)

            let cb=()=>{}
            if (typeof(cbp)==="function"){
                cb=cbp
            }            
            
            let ret={
                login_confirmed : false,            
            }            

            // customisable logic 
            if (params.data.password===params.bd.password){
                ret.login_confirmed=true;                
            }

            cb(ret)
        }
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

        addUsersProgParamResetPass: (params, cbp)=>{
            let tt=generalDbFns
            //console.log("params",franeworkData)
            progargs.params(function (val, index, array) {     
                if (val==="--adduser" || val==="-adduser" || val==="--useradd" || val==="-useradd" || val==="--newuser" || val==="-newuser"){
                    params.useHttpServer=false
                    setTimeout(
                        ()=>{
                            cl("\n\n================")                            
                                let detailsS=array[index + 1] 
                                if (typeof(detailsS)==="undefined"){
                                    cl('error user ...eg:')
                                    cl('...eg: WinOS : "{ \\"userid\\" : \\"username\\" ,\\"group\\" : \\"users\\", \\"password\\" : \\"pass123\\"  }"')                        
                                    cl('...eg: LinOS : \'{ "userid" : "username" ,"group" : "users", "password" : \\"pass123\\"  }\'')                        
                                    process.exit()
                                }
                                
                                let details
                                try {
                                    console.log("detailsS :",detailsS)
                                    details=JSON.parse(detailsS)
                                } catch (error) {
                                    cl("error parsing user object ...")                        
                                    cl('...eg: WinOS : "{ \\"userid\\" : \\"username\\" ,\\"group\\" : \\"users\\", \\"password\\" : \\"pass123\\"  }"')                        
                                    cl('...eg: LinOS : \'{ "userid" : "username" ,"group" : "users", "password" : \\"pass123\\"  }\'')                        
                                    process.exit()
                                }

                                //console.log(array[index] + 1 )                                
                                tt.users.addUser(details,(dt0,err)=>{
                                    if (tof(err)!=="undefined"){cl(err)}
                                    //tt.users.getUser({userid : "admin"},(dt)=>{    
                                        cl("adding user completed successfully...")                        
                                        process.exit()
                                    //})                        
                                })
                                
                            
                        }
                        ,
                        3000
                    )
                    
                    
                }        
            });
        },

        setUserPassProgParamResetPass: (params, cbp)=>{
            let tt=generalDbFns
            //console.log("params",franeworkData)
            progargs.params(function (val, index, array) {     
                if (val==="--resetuser" || val==="-resetuser" || val==="--userreset" || val==="-userreset" || val==="--userresetpass" || val==="-userresetpass"
                || val==="--resetuserpass" || val==="-resetuserpass" || val==="--resetuserpasswords" || val==="-resetuserpassword"
                || val==="--passwordsreset" || val==="-passwordsreset"
                ){
                    params.useHttpServer=false
                    setTimeout(
                        ()=>{
                            cl("\n\n================")                            
                                let detailsS=array[index + 1] 
                                if (typeof(detailsS)==="undefined"){
                                    cl("error user completed successfully...")                        
                                    process.exit()
                                }
                                
                                let details
                                try {
                                    console.log("detailsS :",detailsS)
                                    details=JSON.parse(detailsS)
                                } catch (error) {
                                    cl("error parsing user object completed successfully...")                        
                                    process.exit()
                                }

                                //console.log(array[index] + 1 )                                
                                tt.users.setUserPass(details,(dt0,err)=>{
                                    if (tof(err)!=="undefined"){cl(err)}
                                    //tt.users.getUser({userid : "admin"},(dt)=>{    
                                        cl("adding user completed successfully...")                        
                                        process.exit()
                                    //})                        
                                })
                                
                            
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

/////
let autoLoadModules=function (fpath) {    
    var mds={};
    var skip_exp_name=false;
    var params={}
    if ( !isUn(arguments[1]) ){
        if (isOb(arguments[1])){
            params=arguments[1]
        }else{
            skip_exp_name=arguments[1]
        }
        
    }

    if ( !isUn(arguments[2]) ){
        if (isOb(arguments[2])){
            params=arguments[2]
        }
        
    }

    var stat=fs.lstatSync(fpath);
    if (stat.isDirectory()) {
        // we have a directory: do a tree walk
        var files=fs.readdirSync(fpath);
        var f, l = files.length;
        for (var i = 0; i < l; i++) {
            f = path.join(fpath, files[i]);
            if (f.endsWith(".js")){ 
                //console.log("require( " , f , " )")
                var temp=require(f)
                //mds[f.replace("\.js", "")]=
                if (skip_exp_name ){ // dont use export name , just use export library values id object has been exported 
                    if ( isOb(temp)){
                        feach(temp, function(val,prop){                
                            feach(val, function(val2,prop2){
                                mds[prop2]=val2
                            })
                        })
                        
                    }else{
                        feach(temp, function(val,prop){                
                            mds[prop]=val                    
                        })
                    }
                    
                }else{
                    feach(temp, function(val,prop){                
                        mds[prop]=val
                        //console.log(prop)
                        if (!isUn(mds[prop]["auto_run"] )){
                            mds[prop]["auto_run"](params)
                        };
                    })
                }
            
            
    
            }
        }
    }
    return mds;
}

// need to do a auto fetch maindb object *vdb and add function/vars to  schema and generalDbFns
let auto_mod_folders=[]        
let filespath=path.join(__dirname, "../modules");        

// todo
// check if path exists

var files=fs.readdirSync(filespath);

feach( files  , function(f,i){                    
    var stat=fs.lstatSync(filespath + "/" + f) 
    if (stat.isDirectory()) {
        if (f.startsWith("customdb_") ){
            auto_mod_folders.push(f)          
        }
    }
})

// runs js code in custom_ and run initial main.auto_run if it exists
let mds={}
feach(auto_mod_folders , function(file,i){ // if starts with  l_node_modules_auto_ then auto load file in                       
        //console.log(files, i )
        var temp_DIR = path.join(filespath, file);
        //mdsc=$gl.autoLoadModules(temp_DIR,{ vserv : $vserv});
        mds=autoLoadModules(temp_DIR,{ });    
})
feach( mds, (r,p)=>{    
    
    if (r.db){
        feach( r.db, (r2,p2)=>{
            generalDbFns[p2]={ ...generalDbFns[p2],...r2}
            let typeCatoredFor=false
            feach( generalDbFns[p2], (r3,p3)=>{
                typeCatoredFor=true
                if (typeof(generalDbFns[p2][p3])==="function"){

                    
                    let nf=generalDbFns[p2][p3]
                    generalDbFns[p2][p3]=(...args)=>{ // pre run this function so we can pass some standard values through it to use
                        let nr={
                            generalDbFns   : generalDbFns,
                            schemas : schemas,
                        }
                        //nf.apply(this,[nr])
                        nf(nr,...args)
                    }
                }
              
                

                
            })
        })
    }
    if (r.schemas){
        feach( r.schemas, (r2,p2)=>{
            schemas[p2]={ ...schemas[p2],...r2}
        })
    }    
})


/*
    setTimeout(()=>{
        console.log( "generalDbFns", generalDbFns)
    }, 2500)
    setTimeout(()=>{
        console.log( "schemas", schemas)
    }, 2500)
*/



exports.generalDbFns=generalDbFns
exports.schemas=schemas