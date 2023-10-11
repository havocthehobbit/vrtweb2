const fs=require('fs')
let progargs=require("./l_node_modules/execRunParams.js").args
progargs.proc_params_init()

//let installApp=require("./l_node_modules/install.js").install.init()
let $cnn=require("./l_node_modules/libNativeNode.js").$cnn
let $cn=require("./l_node_modules/libNative.js").$cn

let settingsMod=require('./l_node_modules/settings.js').settingsMod
let settings=new settingsMod({}).settings
console.log("starting : ", settings.name , " ," , new Date())

let ApiInst=require('./l_node_modules/apiInit.js').ApiInst

let gdb=require("./modules/generalDbFns.js").generalDbFns
let lgsO=require("./l_node_modules/logs.js").logs
let lgs=new lgsO("../logs/log.txt")

let cl=$cn.l
let tof=$cn.tof
let isOb=$cn.isOb
let isUn=$cn.isUn

lgs.add(`start ${settings.name} ${settings.host}`)

let DnMain={ db : undefined}
// init DB and set global db client 
if (settings.dbtype==="mongodb" ){
    let MongoInst=require('./l_node_modules/mongodb.js').MongoInst
    MongoInst.initAdmin({ "host" : settings.dbHost, "dbname" : settings.dbName , consolelogdebug : false},()=>{
        let dbName=settings.dbName
        if (MongoInst.statusAdmin===true ){ 
            let dbA=MongoInst.dbAdmin
                    
            dbA.listDatabases()
            .then((dbrs)=>{
                let dbExists=false
                dbrs.databases.forEach((r,i) => {
                    if (r.name===dbName){
                        dbExists=true
                    }
                });
                
                MongoInst.init({ "host" : settings.dbHost, "dbname" : settings.dbName , consolelogdebug : true},()=>{
                    if (MongoInst.status===true){
                        let db=MongoInst.db                       
                        gdb.db=db
                        DnMain.db=db

                        var users = db.collection('users')

                        users.find({ userid : "admin"}).toArray()
                        .then((dt)=>{ 
                            if (dt.length===0){ 
                                users.updateOne( { "userid" : "admin" , "group" : "admin" , "password" : "admin123"} ,{ "$set" : { "email" : "...@....com"}}, {upsert : true })
                                .then((dt)=>{
                                    console.log("\n\admin user inserted") 
                                })
                                .catch((err)=>{ cl("err : ", dt) })
                                }
                        })
                        .catch((err)=>{ cl("err : ", dt) })
                    }
                })
                
                //MongoInst.client.close();
                //MongoInst.clientAdmin.close();
                
            }).catch((err)=>{
                console.log( "list db error", err)
            });
        }
    })
}

let httpAppParams= { useHttpServer : true}

gdb.progParams.adminProgParamResetPass( httpAppParams , ()=>{})
gdb.progParams.adminProgParamListUsers( httpAppParams , ()=>{})
gdb.progParams.addUsersProgParamResetPass( httpAppParams , ()=>{})
gdb.progParams.setUserPassProgParamResetPass( httpAppParams , ()=>{})

let app

setTimeout(()=>{
    if (httpAppParams.useHttpServer===true){ // prevent starting https server if a prog parameter requires something , like prompt input
        // initlise http server       

        ApiInst.init({ db : gdb.db, gdb : gdb, lgs : lgs, "$cnn" : $cnn ,progargs : progargs }, ()=>{
            // initialisation of listener complete        
        })
        app=ApiInst.app
    }else{
        app={
                get:()=>{},
                post:()=>{}
            }
    }

    //==============================================================================================================
    //==============================================================================================================

    //app.get("/test" ,function(req , res){    
    //        res.send( "testing get" )    
    //})

    app.post("/logout",function(req,res){
        var ret_data={
            data : { loggedin : false  , auth : false },
            status : 0,
            error : ""
        }

        res.cookie('token',"",{ 
            maxAge : 0 , 
            httpOnly: true , 
        })

        ret_data.status=true

        res.jsonp(ret_data)
    })

    app.post("/login" ,function(req , res){    
        loginUser( req.body , {req : req , res : res} , function(ret_data){
            res.jsonp(ret_data)

        } )
    })

    var loginUser=function( params ){
        let cb=function(){}
        var fn1 = function(){}
        var reqres={}

        if (arguments.length >2 ){
            fn1=arguments[2]
        }
        if (arguments.length >1 ){
            reqres=arguments[1]
        }

        if (!$cn.isUndefined(fn1)){
            cb=fn1
        }

        var data={
            data : {},
            status : 0,
            error : ""
        }

        var data2=data;

        var ret_data={
            data : { loggedin : false  , auth : false },
            status : 0,
            error : "",
            sent_resposne : false
        }

        var bd=params; 
        var login_confirmed=false;
        var found_userid=false
        
        gdb.users.getUser({userid : bd.userid}, function(data){             
            if ($cn.isUndefined(data)){
                data=data2;
            }
            

            if (typeof(bd.userid)!==undefined){            
                if (typeof(bd.password)!==undefined){ 
                    gdb.loginAuth.checkCanPass({ bd , data , ret_data }, (loginresp)=>{                             
                        if (data.userid===bd.userid){
                            found_userid=true
                            
                            
                                //if (data.password===bd.password){
                                if (loginresp.login_confirmed){
                                    login_confirmed=true;
                                    ret_data.data.loggedin=true;
                                    ret_data.status=true
                                
                                    ApiInst.jwt.sign({ userid : bd.userid } , settings.jwtSecret, ApiInst.jwtoptions  , function(err , newtoken){
                                        var curr_date=new Date()
                                        if (err){
                                            console.log("error registoring user token " , err )
                                        }else{
                                            var token=newtoken;
                                        }
                                        ret_data.data.auth=true
                                        ret_data.data.token=token
                                        const oneDayToSeconds = 24 * 60 * 60;

                                        const expires=new Date(Number(new Date()) + ApiInst.cookieExpires) //10 * 365 * 24 * 60 * 60 * 1000 === 315360000000, or 10 years in milliseconds                                
                                        
                                        reqres.res.cookie('token', token, { 
                                                    //maxAge : oneDayToSeconds ,  // was ignoring this for some reason and expiring withing 5 minuts 
                                                    expires : expires,
                                                    httpOnly: true , 
                                        })
                                        // sessionUserUpdate in DB

                                        ret_data.sent_resposne=true

                                        cb(ret_data)
                                        
                                        return; 
                                    })
                                }else{
                                    if (!ret_data.sent_resposne){
                                        ret_data.sent_resposne=true
                                        ret_data.error="bad userid or password"
                                        cb(ret_data)
                                    }
                                }
                            
                        }
                        if (!login_confirmed){
                            if (!ret_data.sent_resposne){
                                ret_data.sent_resposne=true
                                cb(ret_data) 
                            }
                            return
                        }
                        if (!found_userid){
                            if (!ret_data.sent_resposne){
                                ret_data.sent_resposne=true
                                ret_data.error="bad userid or password"
                                cb(ret_data) 
                            }
                            return
                        }
                    })
                }else{
                    if (!ret_data.sent_resposne){
                        ret_data.sent_resposne=true
                        ret_data.error="password not entered"
                    cb(ret_data)
                    }
                }
            }else{
                if (!ret_data.sent_resposne){
                    ret_data.sent_resposne=true
                    ret_data.error="userid not entered"
                    cb(ret_data)
                }
            }
        })
    }

    let verifyJWTroute=function(req,res,next ){
        let token = req.headers["x-auth-token"] // no longer using x-auth-token so this can be ignored, its just "token" now , set by res.cookie('token' ...
        
        let envMainJwtTokenKey=settings.jwtSecret

        res.locals.rt_jwt_isAuth=false;
        
        if (!token || $cn.isUndefined(token)){
            token=req.cookies.token
        }
        if (!token || $cn.isUndefined(token)){        
            res.locals.decodedID= ""
            res.locals.rt_jwt_isAuth=false;
            res.locals.token=token
            next()
        }else{
            ApiInst.jwt.verify(token , envMainJwtTokenKey , function(err , decoded){
                if ( err){
                    next()
                }else{
                    res.locals.decodedID= decoded.id
                    res.locals.decoded= decoded
                    res.locals.rt_jwt_isAuth=true;
                    res.locals.token=token                
                    next()
                }
            })
        }
    }

    
    app.post("/isAuth", verifyJWTroute ,function(req,res){
        let ret_data={
            data : { loggedin : false  , auth : false },
            status : 0,
            error : ""
        }

        let auth=false;    
                    
        if ( res.locals.rt_jwt_isAuth ){
            if (res.locals.decoded.userid===req.body.userid){            
                auth=true;
            }
            
        }

        if (auth){
            ret_data.data.loggedin=true ;
            ret_data.data.auth=true ;
            ret_data.status=true ;
        }

        res.jsonp( ret_data )

    })

},2000)


