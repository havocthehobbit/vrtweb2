let fs=require('fs')
let path = require('path'); // this contanes some extra modules and standard library function that can be made to make life easier , please see help under nodejsVRTwebStdLib
let ssh2 = require('ssh2');

let modName="vDev"

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
                if (false){
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
                }

               // console.log("!!!!!!!!!!!\n\n!!!!!!!!!!!!",this);;

            },
            __app : [ // must be named __app to create a route                           
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

                        corestuff.mds.vrtw.login.verifyLoginAPI({ req : req , userAuthCust : userAuthCustom},function(vd){
                                        
                            let allowedC={}
                            allowedC.check=true;
                            allowedC.allowed=false;
                            allowedC.vd=vd;
                            allowedC.allowedUsers=["admin"];
                            allowedC.allowedUsersCheck=true;
                            allowedC.allowedGroups=["admin"];
                            allowedC.allowedGroupsCheck=true;
                            allowedC.allowedSuccessMsg=""

                            let allowedCheckUserAndGroupFn=(allowedC)=>{
                                let vd=allowedC.vd
                                if (allowedC.check){ // validation
                                    if (vd.allowed ){                                         
                                        if (allowedC.allowed===false){
                                            if (allowedC.allowedGroupsCheck){
                                                if (vd.other){ // group allowed
                                                    if (vd.other.group){
                                                        allowedC.allowedGroups.forEach((r,i)=>{
                                                            if (vd.other.group===r){
                                                                allowedC.allowed=true;
                                                                allowedC.allowedSuccessMsg=`group ${vd.other.group} is allowed\n`;
                                                            }
                                                        })

                                                    }
                                                }
                                            }
                                            if (allowedC.allowed===false){
                                                allowedC.llowedSuccessMsg=`group ${vd.other.group} is not allowed\n`;
                                            }
                                        }
                                        if (allowedC.allowed===false){ // userid allowed
                                            if (allowedC.allowedUsersCheck){
                                                allowedC.allowedUsers.forEach((r,i)=>{
                                                    if (vd.userid===r){
                                                        allowedC.allowed=true;
                                                    }
                                                })
                                                if (allowedC.allowed===false){
                                                    allowedC.allowedSuccessMsg+=`user ${vd.other.group} is not allowed\n`;
                                                }
                                            }
                                        }
                                        
                                    }
                                    if (allowedC.allowed===false){
                                        return false
                                    }
                                    return true
                                }
                            }

                            
                            

                            switch(bd.type) { // if for example type var string was sent in body data then can run a selection                             
                                case "getUsers": 
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }

                                        let data={}
                                        
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
                                    
                                    }

                                    return;
                                break;              
                                case "getTables": 
                                    if (true){
                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }                                        
                                        
                                        let db=corestuff.mds.vrtw.db ; // set db

                                        let data={}

                                        let dbListCollection=async ()=>{ // getAll collection to dynamically use
                                            const dbrs = await db.listCollections({}, { nameOnly: true }).toArray();
                                            
                                            let dtn=[];                                    
                                            
                                            dbrs.forEach((r,i) => {
                                                let nr={} ;
                                                nr.name=r.name;
                                                dtn.push(nr)
                                            
                                            });                                        

                                            res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});
                                        }

                                        dbListCollection();                                        
                                            
                                    }

                                    return
                                break;
                                case "getTablesRecs":                                    
                                    if (true){
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                            
                                        let db=corestuff.mds.vrtw.db ; // set db

                                        let data={}

                                        let dbListCollection=async ()=>{ // getAll collection to dynamically use
                                            const dbrs = await db.listCollections({}, { nameOnly: true }).toArray();
                                            
                                            let dtn=[];
                                            
                                            dbrs.forEach((r,i) => {
                                                let nr={} ;
                                                nr.name=r.name;
                                                dtn.push(nr)
                                            
                                            });                                        

                                            res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});
                                        }

                                        dbListCollection();                                        
                                            
                                    }

                                    return
                                break;
                                case "createTable":                                     
                                    if (true){                                                                                                
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }

                                        let status=true;
                                        let db=corestuff.mds.vrtw.db ; // set dbAdmin

                                        let data={}

                                        let name=bd.name;                                        
                                        if (typeof(name)!=='string'){
                                            status=false;
                                        }
                                        if (name==="" || name===" "){ // db will give error for blanks but quick precheck, need to convert this to regex muli space " +|s+";
                                            status=false;
                                        }

                                        let createCollection=async (name)=>{ // getAll collection to dynamically use
                                            const dbrs = await db.createCollection(name) // retturns collection so you can still do stuff after
                                            
                                            let dtn=[];                                                                               

                                            res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});
                                        }

                                        createCollection(name);                                          
                                        
                                    }

                                    return
                                break;
                                case "getRecs":                                    
                                    if (true){
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                            
                                        let db=corestuff.mds.vrtw.db ; // set db

                                        let data={}

                                        let name=bd.name;                                        
                                        if (typeof(name)!=='string'){
                                            status=false;
                                        }
                                        if (name==="" || name===" "){ // db will give error for blanks but quick precheck, need to convert this to regex muli space " +|s+";
                                            status=false;
                                        }

                                        let findRecs=async ( name,params)=>{ // getAll collection to dynamically use
                                            
                                            
                                            //const dbrs = await db.collection.find(params); // future version of driver
                                            //const dbrs = await db[name].find(params.criteria, params.aggregation);   // future version of driver
                                            // //console.log("db." + name + ".find( " + JSON.stringify(params.criteria) +" , " + JSON.stringify(params.aggregation) + " )" );
                                            //const dbrs = db[name].find(params.criteria, params.aggregation);
                                            
                                            let collection=db.collection(name) ; // current driver version 
                                            let cursor=collection.find(params.criteria, params.option_aggregation)

                                            let dtn=[];
                                            if (true){
                                                dtn=await cursor.toArray()
                                                console.log(dtn)
                                            }else{
                                                let tmpd=await cursor.toArray()
                                                tmpd.forEach((r,i) => {
                                                    let nr={} ;
                                                    nr.name=r.name;
                                                    dtn.push(nr)
                                                
                                                });   
                                            }                                     

                                            res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});
                                        }

                                        findRecs( name,{ criteria :{}, option_aggregation : {}, cursors : [] });                                        
                                            
                                    }

                                    return
                                break;
                                case "getDBS":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }

                                        let dbA=corestuff.mds.vrtw.dbA ; // set dbAdmin

                                        let data={}

                                        dbA.listDatabases()
                                            .then((dbrs)=>{
                                                let dbExists=false;
                                                let dtn=[]

                                                dbrs.databases.forEach((r,i) => {
                                                    let nr={}    
                                                    nr.name=r.name;
                                                    dtn.push(nr)
                                                });
                                            
                                                /*
                                                    dt.forEach((r,i)=>{
                                                        let nr={...r}
                                                        delete nr.password;
                                                        delete nr._id;
                                                        dtn.push(nr)
                                                    })
                                                */
                                            
                                            res.jsonp({ data : { all : dtn} , status : "success" ,bStatus : true});
                                            })
                                        
                                    }

                                    return
                                break;
                                case "insertRec":                                    
                                    if (true){
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let status=true    
                                        let statusError=""
                                        let db=corestuff.mds.vrtw.db ; // set db


                                        let data={}
                                        if (typeof(bd.data)==="object"){
                                            data=bd.data
                                            if (data._id){
                                                delete  data._id;
                                            }
                                        }else{
                                            statusError="'data' input param error "
                                            status=false;
                                        }

                                        let name=bd.name;                                        
                                        if (typeof(name)!=='string'){
                                            statusError="name error"
                                            status=false;
                                        }
                                        if (name==="" || name===" "){ // db will give error for blanks but quick precheck, need to convert this to regex muli space " +|s+";
                                            statusError="name error"
                                            status=false;
                                        }

                                        if (status===false){
                                            res.jsonp({ data : {} , status : "failed" ,bStatus : false, error : statusError});
                                            return
                                        }

                                        let insertOne=async ( name,params)=>{ // getAll collection to dynamically use
                                            
                                            
                                            //const dbrs = await db.collection.find(params); // future version of driver
                                            //const dbrs = await db[name].find(params.criteria, params.aggregation);   // future version of driver
                                            // //console.log("db." + name + ".find( " + JSON.stringify(params.criteria) +" , " + JSON.stringify(params.aggregation) + " )" );
                                            //const dbrs = db[name].find(params.criteria, params.aggregation);
                                            
                                            let collection=db.collection(name) ; // current driver version 
                                            let result=await collection.insertOne(params.data)

                                            let dtn=[];
                                            if (true){
                                                //dtn=await cursor.toArray()
                                                //console.log(dtn)
                                            }else{
                                                
                                            }                                     

                                            res.jsonp({ data : result , status : "success" ,bStatus : true});
                                        }

                                        insertOne( name,{ data  : data});                                        
                                            
                                    }

                                    return
                                break;
                                case "updateRec":                                    
                                    if (true){
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let status=true    
                                        let statusError=""
                                        let db=corestuff.mds.vrtw.db ; // set db
                                    

                                        let name=bd.name;                                        
                                        if (typeof(name)!=='string'){
                                            statusError="name error"
                                            status=false;
                                        }
                                        if (name==="" || name===" "){ // db will give error for blanks but quick precheck, need to convert this to regex muli space " +|s+";
                                            statusError="name error"
                                            status=false;
                                        }
                                        
                                        let data={}
                                        if (typeof(bd.data)==="object"){
                                            data=bd.data
                                            if (data._id){
                                                delete  data._id;
                                            }
                                        }else{
                                            statusError="'data' input param error "
                                            status=false;
                                        }

                                        let id=bd._id;                                        
                                        if (typeof(id)!=='string'){
                                            statusError="_id parameter error"
                                            status=false;
                                        }

                                        //todo , implement fetch user id from _id and check if admin 
                                        

                                        if (status===false){
                                            res.jsonp({ data : {} , status : "failed" ,bStatus : false, error : statusError});
                                            return
                                        }

                                        let updateOne=async ( name,params)=>{ // getAll collection to dynamically use
                                            
                                            
                                            //const dbrs = await db.collection.find(params); // future version of driver
                                            //const dbrs = await db[name].find(params.criteria, params.aggregation);   // future version of driver
                                            // //console.log("db." + name + ".find( " + JSON.stringify(params.criteria) +" , " + JSON.stringify(params.aggregation) + " )" );
                                            //const dbrs = db[name].find(params.criteria, params.aggregation);
                                            
                                            let collection=db.collection(name) ; // current driver version 
                                            let result=await collection.updateOne(params.filter ,params.set,params.options)
                                            //let result=await collection.updateOne( { "_id": "660388493593e62b948fec0f"},params.set,params.options)
                                                console.log({filter : params.filter ,set: params.set,options : params.options })
                                                console.log("result : ", name , result );
                                            let dtn=[];
                                            if (true){
                                                //dtn=await cursor.toArray()
                                                //console.log(dtn)
                                            }else{
                                                
                                            }                                     

                                            res.jsonp({ data : result , status : "success" ,bStatus : true});
                                        }

                                        updateOne( name,{ filter : { "_id"  : id } , set : { "$set" : data }, options : {} });                                        
                                            
                                    }

                                    return
                                break;
                                case "deleteRec":                                    
                                    if (true){
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let status=true    
                                        let statusError=""
                                        let db=corestuff.mds.vrtw.db ; // set db


                                        let data={}

                                        let name=bd.name;                                        
                                        if (typeof(name)!=='string'){
                                            statusError="name error"
                                            status=false;
                                        }
                                        if (name==="" || name===" "){ // db will give error for blanks but quick precheck, need to convert this to regex muli space " +|s+";
                                            statusError="name error"
                                            status=false;
                                        }

                                        let id=bd._id;                                        
                                        if (typeof(id)!=='string'){
                                            statusError="_id parameter error"
                                            status=false;
                                        }

                                        //todo , implement fetch user id from _id and check if admin 
                                        

                                        if (status===false){
                                            res.jsonp({ data : {} , status : "failed" ,bStatus : false, error : statusError});
                                            return
                                        }

                                        let deleteOne=async ( name,params)=>{ // getAll collection to dynamically use
                                            
                                            
                                            //const dbrs = await db.collection.find(params); // future version of driver
                                            //const dbrs = await db[name].find(params.criteria, params.aggregation);   // future version of driver
                                            // //console.log("db." + name + ".find( " + JSON.stringify(params.criteria) +" , " + JSON.stringify(params.aggregation) + " )" );
                                            //const dbrs = db[name].find(params.criteria, params.aggregation);
                                            console.log("del .data" , params.data)
                                            let collection=db.collection(name) ; // current driver version 
                                            let result=await collection.deleteOne(params.data)
                                            console.log("del .data" , params.data)
                                            let dtn=[];
                                            if (true){
                                                //dtn=await cursor.toArray()
                                                //console.log(dtn)
                                            }else{
                                                
                                            }                                     

                                            res.jsonp({ data : result , status : "success" ,bStatus : true});
                                        }

                                        deleteOne( name,{ _id  : id});                                        
                                            
                                    }

                                    return
                                break;                            
                                case "insertTableData":                                     
                                    if (true){
                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        
                                        console.log("insertTableData : inserting table data ")
                                        let data={}
                                        
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
                                        
                                    }

                                    return
                                break;
                                case "insertTableDataBatch":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

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
                                        


                                        
                                    }

                                    return
                                break;
                                
                                default:
                            }

                            res.jsonp({ status : "apiNoParamsError" ,bStatus : true})
                        
                            return
                        })
                    } 


                },                
                
            ],
            apiExtra : {
                api : {
                
                }
            }
            
}
 
module.exports[modName]=main;