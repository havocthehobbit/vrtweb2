let fs=require('fs')
let path = require('path'); // this contanes some extra modules and standard library function that can be made to make life easier , please see help under nodejsVRTwebStdLib
let ssh2 = require('ssh2');

let modName="api"

let $cn=require("../../l_node_modules/libNative").$cn
let cl=$cn.l
let feach=$cn.each
let isOb=$cn.isOb
let isUn=$cn.isUn

let main={
            auto_run : function(){ 
                console.log("auto_running " + modName)
            },
            run_after_init : function(params){ // params : { http: http , io : io} // io = socket.io 
                //console.log("after init params : " , params)

                // create a public path for images and pub files etc
                /*
                var pubpath=__dirname + "/" + ".." + "/" +  "web_ui" + "/"  + "pub_files" +"/" + "testmodule"
                var pub=path.resolve( pubpath );                
                params.app.use( "/testmodule" , params.express.static(pub ) ); // http://testmodule/WhatEverIsInThisPathOfSecondParameter
                */

                // socket io example
                var interval
                params.io.on("connection", (socket) => {
                    console.log("New socket.IO 2client connected");
                    if (interval) {
                        clearInterval(interval);
                    }
                    interval = setInterval(() => getApiAndEmit(socket), 60000);
                    socket.on("disconnect", () => {
                    console.log("socket.IO 2cClient disconnected");
                        clearInterval(interval);
                    });
                });

                const getApiAndEmit = socket => {
                    const response = {date : new Date(), "res2" : "res2" };
                    // Emitting a new message. Will be consumed by the client
                    socket.emit("FromAPI", response);
                };

               // console.log("!!!!!!!!!!!\n\n!!!!!!!!!!!!",this);;

            },
            __app : [ // must be named __app to create a route
                {   
                    name  : "test123",
                    route : "/test123", // if route not included it will defualt to to name
                    type : "get", // get or post
                    cb : function(req, res, corestuff){ // or fn or callback that will run once route is called , // corestuff ,gives you some extra modules , parameters and values to use  // eg : { app : app,express : express,mds :mds , mdsfn : mdsfn , vserv : $vserv, pub : pub ,debug_0 ,http : http , io : io}
                        res.send("testing test3")
                    } 


                }, // add as many routes as you want in this array, and change name and route string values to your liking
                {   
                    name  : "test123",
                    route : "/test123", // if route not included it will defualt to to name
                    type : "post", // get or post
                    cb : function(req, res, corestuff){ // or fn or callback 
                        res.send("testing test3 POST")
                    } 


                },
                { // secure example using JWT web token validation
                    name  : "getStuff",
                    route : "/getStuff", // if route not included it will defualt to to name
                    type : "post", // get or post
                    cb : function(req, res, corestuff){ //  // corestuff ,gives you some extra modules , parameters and values to use  // eg : { app : app,express : express,mds :mds , mdsfn : mdsfn , vserv : $vserv, pub : pub ,debug_0 ,http : http , io : io}
                        var bd=req.body // get data sent from front end
                        
                        //console.log(corestuff)
                        console.log("test")

                        res.jsonp({ status : "test" ,bStatus : true})

                        return
                        corestuff.mds.users.verifyLoginAPI({ req : req},function(vd){ // validate user token is allowed to run options
                            if (vd.allowed){ // 
                                switch(bd.type) { // if for example type var string was sent in body data then can run a selection 
                                    case "getData":
                                      // code block
                                      // somefunction( bd.someFEdata , (data)=>{ res.jsonp({ data : data , status ; "success", ,bStatus : true}) })
                                      break;
                                    case "getAllData":
                                        // code block
                                        break;
                                    case "addData":
                                      // code block
                                      break;
                                    case "updateData":
                                        // code block
                                        break;
                                    case "delData":
                                        // code block
                                        break;
                                    default:
                                      // code block unspecified type
                                }
                           
                            }else{
                                res.jsonp({ status : "failed" ,bStatus : false})
                            }
                        })
                    }
                },
                {   // api
                    name  : "api",
                    route : "/api", // if route not included it will defualt to to name
                    type : "post", // get or post
                    cb : async function(req, res, corestuff){ // or fn or callback 
                        var bd=req.body // get data sent from front end
                        
                        //console.log(corestuff)
                        // console.log("test123")

                        let userAuthCustom=(i1,cb1)=>{
                            // l1 --> allowed , userid , status                            
                            let group

                            if (i1.allowed){
                                corestuff.mds.vrtw.gdb.users.getUser({ userid : i1.userid },(dt)=>{
                                    //console.log(dt)

                                    if (dt.group===undefined){
                                        group="guest"                            
                                    }else{
                                        group=dt.group
                                    }

                                    if (dt.group==="users"){
                                        group=dt.group
                                    } 
                                    if (dt.group==="admin"){
                                        group=dt.group
                                    }                                    

                                    let other={}
                                    other.group=group

                                    //cb1({ allowed : false})
                                    cb1({ other : other})
                                })
                            }                            
                        }

                        switch(bd.type) { // if for example type var string was sent in body data then can run a selection                             
                            case "getmainmenus": 
                                //console.log("corestuff.login.verifyJWTObj",  corestuff.mds.vrtw.login.verifyLoginAPI)
                                corestuff.mds.vrtw.login.verifyLoginAPI({ req : req , userAuthCust : userAuthCustom},function(vd){
                                    
                                    if (vd.allowed){                     
                                        //console.log("corestuff.login.verifyJWTObj.allowed" , vd.allowed )
                                    }else{
                                        //console.log("corestuff.login.verifyJWTObj.allowed", vd.allowed )
                                    }

                                    let data={}

                                    data.group=vd.other.group
                                    data.groups=vd.other.groups

                                    let groups=[
                                        {
                                            "id" : "users",
                                            "name" : "users",
                                            "views" : [                                           
                                                // "home",            
                                            ]
                                        },                                                                            
                                        {
                                            "id" : "admin",
                                            "name" : "admin",
                                            "views" : [
                                                // "home",
                                                //"adminSettings",                                               
                                                "vDev",                                                
                                            ]
                                        }

                                    ]
                                    
                                    let views=[
                                        
                                        { 
                                            "id" : "home",
                                            "name" : "home",
                                            "title": "home",
                                            "showMenu" : true,
                                            "pathname" : "/home",
                                            "e" : "home",
                                        },
                                        { 
                                            "id" : "adminSettings",
                                            "name" : "adminSettings",
                                            "title": "adminSettings",
                                            "showMenu" : true,
                                            "pathname" : "/adminSettings",
                                            "e" : "AdminSettings",
                                        },                                      
                                        { 
                                            "id" : "vDev",
                                            "name" : "vDev",
                                            "title": "vDev",
                                            "pathname" : "/vDev", 
                                            "showMenu" : true, 
                                            "e" : "vDev",                                        
                                        },                                        
                                    ]

                                    let viewsObj={}
                                    let viewsArr=[]
                                    groups.forEach((r,i)=>{
                                        if ( r.id===data.group){
                                            r.views.forEach((r1,i1)=>{
                                                views.forEach ((r2,i2)=>{
                                                    if ( r1===r2.id){
                                                        viewsObj[r2.id]=r2
                                                    }
                                                }) 
                                            })
                                        }                                    
                                    })

                                    
                                    for ( let i in viewsObj){
                                        viewsArr.push(viewsObj[i])
                                    }
                                    data.views=viewsArr


                                    res.jsonp({ data , status : "success" ,bStatus : true})
                                
                                    
                                
                                
                                })

                                return
                            break;

                            default:
                        }

                        res.jsonp({ status : "apiNoParamsError" ,bStatus : true})

                        return
                        
                    } 
                },                
                {   // vDev
                    name  : "vDev",
                    route : "/vDev", // if route not included it will defualt to to name
                    type : "post", // get or post
                    cb : async function(req, res, corestuff){ // or fn or callback 
                        var bd=req.body // get data sent from front end
                        
                        //console.log(corestuff)
                       // console.log("test123")

                        let userAuthCustom=(i1,cb1)=>{
                            // l1 --> allowed , userid , status                            
                            let group

                            if (i1.allowed){
                                corestuff.mds.vrtw.gdb.users.getUser({ userid : i1.userid },(dt)=>{
                                    //console.log(dt)

                                    if (dt.group===undefined){
                                        group="guest"                            
                                    }else{
                                        group=dt.group
                                    }

                                    if (dt.group==="users"){
                                        group=dt.group
                                    } 
                                    if (dt.group==="admin"){
                                        group=dt.group
                                    }

                                    let other={}
                                    other.group=group

                                    if (dt.group==="admin"){
                                        
                                    }else{

                                    }
                                    //cb1({ allowed : false})
                                    cb1({ other : other})
                                })
                            }                            
                        }

                        switch(bd.type) { // if for example type var string was sent in body data then can run a selection                             
                            case "getUsers": 
                                //console.log("corestuff.login.verifyJWTObj",  corestuff.mds.vrtw.login.verifyLoginAPI)
                                corestuff.mds.vrtw.login.verifyLoginAPI({ req : req , userAuthCust : userAuthCustom},function(vd){
                                    
                                    if (vd.allowed){                     
                                        //console.log("corestuff.login.verifyJWTObj.allowed" , vd.allowed )
                                    }else{
                                        //console.log("corestuff.login.verifyJWTObj.allowed", vd.allowed )
                                    }

                                    let data={}

                                    //data.group=vd.other.group
                                    //data.groups=vd.other.groups
                                    corestuff.mds.vrtw.gdb.users.getUsers({},(dt)=>{
                                        let dtn=[]
                                        dt.forEach((r,i)=>{
                                            let nr={...r}
                                            delete nr.password;
                                            delete nr._id;
                                            dtn.push(nr)
                                        })
                                        
                                        res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});                                

                                    })
                                })

                                return;
                            break;              
                            case "getTables": 
                                //console.log("corestuff.login.verifyJWTObj",  corestuff.mds.vrtw.login.verifyLoginAPI)
                                corestuff.mds.vrtw.login.verifyLoginAPI({ req : req , userAuthCust : userAuthCustom},function(vd){
                                    
                                    if (vd.allowed){                     
                                        //console.log("corestuff.login.verifyJWTObj.allowed" , vd.allowed )
                                    }else{
                                        //console.log("corestuff.login.verifyJWTObj.allowed", vd.allowed )
                                    }

                                    let data={}

                                    //data.group=vd.other.group
                                    //data.groups=vd.other.groups
                                    corestuff.mds.vrtw.gdb.users.getUsers({},(dt)=>{
                                        let dtn=[]
                                        dt.forEach((r,i)=>{
                                            let nr={...r}
                                            delete nr.password;
                                            delete nr._id;
                                            dtn.push(nr)
                                        })
                                        
                                        res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});                                

                                    })
                                    


                                    
                                })

                                return
                            break;
                            case "getDBS": 
                                //console.log("corestuff.login.verifyJWTObj",  corestuff.mds.vrtw.login.verifyLoginAPI)
                                corestuff.mds.vrtw.login.verifyLoginAPI({ req : req , userAuthCust : userAuthCustom},function(vd){
                                    
                                    if (vd.allowed){                     
                                        //console.log("corestuff.login.verifyJWTObj.allowed" , vd.allowed )
                                    }else{
                                        //console.log("corestuff.login.verifyJWTObj.allowed", vd.allowed )
                                    }

                                    let data={}

                                    //data.group=vd.other.group
                                    //data.groups=vd.other.groups
                                    corestuff.mds.vrtw.gdb.users.getUsers({},(dt)=>{
                                        let dtn=[]
                                        dt.forEach((r,i)=>{
                                            let nr={...r}
                                            delete nr.password;
                                            delete nr._id;
                                            dtn.push(nr)
                                        })
                                        
                                        res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});                                

                                    })
                                    


                                    
                                })

                                return
                            break;
                            case "insertTableData": 
                                //console.log("corestuff.login.verifyJWTObj",  corestuff.mds.vrtw.login.verifyLoginAPI)
                                corestuff.mds.vrtw.login.verifyLoginAPI({ req : req , userAuthCust : userAuthCustom},function(vd){
                                    
                                    if (vd.allowed && vd.group==="admin"){                     
                                        //console.log("corestuff.login.verifyJWTObj.allowed" , vd.allowed )
                                   
                                        console.log("insertTableData : inserting table data ")
                                        let data={}

                                        //data.group=vd.other.group
                                        //data.groups=vd.other.groups
                                        corestuff.mds.vrtw.gdb.users.getUsers({},(dt)=>{
                                            let dtn=[]
                                            dt.forEach((r,i)=>{
                                                let nr={...r}
                                                delete nr.password;
                                                delete nr._id;
                                                dtn.push(nr)
                                            })
                                            
                                            res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});                                

                                        })
                                    
                                    }else{
                                        //console.log("corestuff.login.verifyJWTObj.allowed", vd.allowed )
                                    }

                                    
                                })

                                return
                            break;
                            case "insertTableDataBatch": 
                                //console.log("corestuff.login.verifyJWTObj",  corestuff.mds.vrtw.login.verifyLoginAPI)
                                corestuff.mds.vrtw.login.verifyLoginAPI({ req : req , userAuthCust : userAuthCustom},function(vd){
                                    
                                    if (vd.allowed){                     
                                        //console.log("corestuff.login.verifyJWTObj.allowed" , vd.allowed )
                                    }else{
                                        //console.log("corestuff.login.verifyJWTObj.allowed", vd.allowed )
                                    }

                                    let data={}

                                    //data.group=vd.other.group
                                    //data.groups=vd.other.groups
                                    corestuff.mds.vrtw.gdb.users.getUsers({},(dt)=>{
                                        let dtn=[]
                                        dt.forEach((r,i)=>{
                                            let nr={...r}
                                            delete nr.password;
                                            delete nr._id;
                                            dtn.push(nr)
                                        })
                                        
                                        res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});                                

                                    })
                                    


                                    
                                })

                                return
                            break;
                            
                            default:
                        }

                        res.jsonp({ status : "apiNoParamsError" ,bStatus : true})

                        return
                        
                    } 


                },                
                
            ],
            apiExtra : {
                api : {
                
                }
            }
            
}
 
module.exports[modName]=main;