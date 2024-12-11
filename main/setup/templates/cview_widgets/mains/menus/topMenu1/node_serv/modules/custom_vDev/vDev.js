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

                        corestuff.mds.vrtw.login.verifyLoginAPI({ req : req , userAuthCust : userAuthCustom},async function(vd){
                                        
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
                                        let dbAdmin=corestuff.mds.vrtw.dbAdmin ; // set db                                         

                                        let data={}

                                        let dbListCollection=async ()=>{ // getAll collection to dynamically use                                           
                                            
                                            let dbrs=[];
                                            if (true){                                                
                                                dbrs = await db.listCollections({}, { nameOnly: true }).toArray();                                           
                                            }

                                             
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
                                            
                                            let collection=await db.collection(name) ; // current driver version 
                                            let cursor=collection.find(params.criteria, params.option_aggregation)
                                            
                                            let dtn=[];
                                            if (true){
                                                dtn=await cursor.toArray()
                                                //console.log(dtn)
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
                                        let db=corestuff.mds.vrtw.db ; // set dbAdmin

                                        let data={}

                                        let dbName="";

                                   
                                        
                                        
                                        
                                        //dbAdmin
                                        let totalSizeMb=0;
                                        let totalSizeBytes=0;
                                        let totalSizeeMbCurr=0;
                                        let totalSizeBytesCurr=0;

                                        //let dbrs=await db.dbName();
                                        //let dbrs=dbA.command( { dbName: 1 } );
                                        
                                        dbName=db.databaseName;

                                        //let dbrs=await dbA.command( { listDatabases: 1 } ); console.log("dbrs : " ,dbrs); // working , same thing  
                                        dbA.listDatabases()
                                            .then((dbrs)=>{
                                                let dbExists=false;
                                                let dtn=[]
                                                
                                                totalSizeMb=dbrs.totalSizeMb;
                                                totalSizeBytes=dbrs.totalSize;

                                                dbrs.databases.forEach((r,i) => {
                                                    let nr={}    
                                                    nr.name=r.name;                                                    
                                                    nr.sizeBytes=r.sizeOnDisk;
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
                                            
                                            res.jsonp({ data : { all : dtn , current : dbName, currDBSize : { totalSizeMb : totalSizeMb , totalSizeMb : totalSizeBytes } , allDbSize : { totalSizeMb : totalSizeMb , totalSizeMb : totalSizeBytes }} , status : "success" ,bStatus : true});
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
                                            let collection=db.collection(name) ; // current driver version                                             
                                            let result=await collection.updateOne(params.filter ,params.set,params.options)                                            
                                                
                                            let dtn=[];                                            

                                            res.jsonp({ data : result , status : "success" ,bStatus : true});
                                        }                                        
                                        
                                        updateOne( name,{ filter : { "$expr": { "$eq": ["$_id", { "$toObjectId": id  }] } } , set : { "$set" : data }, options : {} }); // filter based on ID and update                                        
                                       
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
                                            //console.log("del .data" , params.data)
                                            let collection=db.collection(name) ; // current driver version 
                                            let result=await collection.deleteOne(params.data)
                                            //console.log("del .data" , params.data)
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

                                case "saveSchema":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "schema";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""


                                        if (!fs.existsSync(pathr)){
                                            fs.mkdirSync(pathr)
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            fs.mkdirSync(pathrSub)
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project
                                                if (!fs.existsSync(pathrSub + "/" + project)){
                                                    fs.mkdirSync(pathrSub + "/" + project);
                                                }
                                            }
                                        }
                                        
                                        if (!fs.existsSync(pathrSub + project  )){
                                            fs.mkdirSync(pathrSub +  project)                                            
                                        }                                        
                                        
                                        name=name.trim();
                                        let fileExt=".json";
                                        if (name.endsWith(".json")){
                                            fileExt="";
                                        }
                                        pathrSub=path.resolve(pathrSub +  project +"/" + name + fileExt);                                        
                                       
                                        pathrSub=pathrSub.replace(/\.json/g, ".json");

                                        let dataStr=""

                                        try {
                                            dataStr=JSON.stringify(bd.schema, null, 2)
                                        } catch (error) {
                                            console.log("parse error", error );
                                        }

                                        fs.writeFile(pathrSub,dataStr,(err)=>{
                                            if (err){
                                                console.log("save err : ",err)
                                            }
                                            res.jsonp({ data : {} , status : "success" ,bStatus : true});                                
                                        })
                                        
                                    }

                                    return
                                break;
                                case "loadSchema":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "schema";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""


                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            error_status=true
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            error_status=true
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project                                                
                                            }
                                        }

                                        pathrSub=path.resolve(pathrSub + project )
                                        if (!fs.existsSync(pathrSub )){                                            
                                            error_status=true
                                        }else{
                                            error_status=false
                                        }

                                        let fileExt="json";
                                        if (name.endsWith(".json")){
                                            fileExt="";
                                        }
                                        pathrSub=path.resolve(pathrSub +"/" + name + fileExt);
                                        
                                        

                                        if (error_status===false){
                                            fs.readFile( pathrSub, function(err, data){
                                                if (err){                                                
                                                    res.jsonp({ data : data , status : "error" ,bStatus : false,error : err});                                
                                                    return;
                                                }

                                                
                                                try {                                                    
                                                    data=JSON.parse(data)
                                                } catch (error) {
                                                    console.log("readfile : " ,error)
                                                }

                                                res.jsonp({ data : data , status : "success" ,bStatus : true});                                

                                            });
                                        }else{
                                            res.jsonp({ data : data , status : "success" ,bStatus : true});                                
                                        }                                        
                                    }

                                    return
                                break;                                
                                case "listSchema":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "schema";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""
                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            error_status=true
                                            //console.log("error_status 0.1 : ", error_status , pathr);
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            error_status=true
                                            //console.log("error_status 0.2: ", error_status , pathrSub);
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project;
                                                if (!fs.existsSync(path.resolve(pathr + "/" + project))){
                                                    error_status=true
                                                    //console.log("error_status 0.3: ", error_status , (path.resolve(pathr + "/" + project)));
                                                }
                                            }
                                        }

                                        pathrSub=path.resolve(pathrSub +  project);
                                        
                                        if (fs.existsSync( pathrSub)===false){                                            
                                            error_status=true
                                            console.log("error_status 1 : ", error_status, pathrSub);
                                        }else{
                                            error_status=false
                                        }                         

                                        let files=[]

                                        if (error_status===false){
                                            readdir(pathrSub,
                                                (...args)=>{                                                    
                                                    let rr=args[0];
                                                    //if (rr.isDir===false){
                                                        let nr={ name : rr.name , path : rr.path, isDir : rr.isDir}
                                                        files.push(nr)
                                                    //}
                                                },
                                                (...args)=>{
                                                    
                                                }
                                            );
                                        }

                                        res.jsonp({ data : { all : files } , status : "success" ,bStatus : true});
                                        
                                    }

                                    return
                                break;
                                case "deleteSchema":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        
                                        let error_status="";
                                        let status="success";
                                        let bStatus=true;
                                        
                                        

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "schema";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project="";
                                                                           

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project                                               
                                            }
                                        }
                                                                        

                                        let fileExt="json";
                                        if (name.endsWith(".json")){
                                            fileExt="";
                                        }
                                        
                                        pathrSub=path.resolve(pathrSub +  project +"/" + name + fileExt);

                                        //pathrSub=path.resolve(pathrSub +"/" + name + fileExt);
                                        
                                        
                                        if (fs.existsSync(pathrSub  )){
                                            let fstat=fs.lstatSync(pathrSub);
                                            if (fstat.isFile()){

                                            }else{
                                                bStatus=false;
                                                error_status="err not a file: " + pathrSub ;
                                                console.log(error_status)
                                                  
                                            }
                                        }else{
                                            error_status="err no such path: " + pathrSub ;
                                            bStatus=false;
                                            console.log(error_status)
                                        }

                                        let dataStr=""
                                       
                                        
                                        if ( name.trim()===""){
                                            bStatus=false;
                                        }

                                        console.log(" del : " , bd , bStatus, error_status)
                                        if (bStatus){
                                            fs.unlink(pathrSub,(err)=>{
                                                if (err){
                                                    console.log("save err : ",err.message)
                                                    error_status="save err : " + err.message;
                                                    bStatus=false;
                                                }else{
                                                    res.jsonp({ data : {} , status : status ,bStatus :bStatus, err : error_status });  
                                                    return;                              
                                                }
                                            });
                                        }
                                        if (bStatus===false){
                                            res.jsonp({ data : {} , status : status ,bStatus :bStatus , err :  error_status });  
                                            return;    
                                        }
                                    }

                                    return;
                                break;

                                case "saveCmptDataGen":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "cmptDataGen";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""


                                        if (!fs.existsSync(pathr)){
                                            fs.mkdirSync(pathr)
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            fs.mkdirSync(pathrSub)
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project
                                                if (!fs.existsSync(pathrSub + "/" + project)){
                                                    fs.mkdirSync(pathrSub + "/" + project)
                                                }
                                            }
                                        }

                                        
                                        if (!fs.existsSync(pathrSub + project  )){
                                            fs.mkdirSync(pathrSub +  project)
                                            
                                        }
                                        pathrSub=pathrSub +  project +"/" + name + ".json";
                                       
                                        let dataStr=""

                                        try {
                                            dataStr=JSON.stringify(bd.data, null, 2)
                                        } catch (error) {
                                            console.log("parse error", error );
                                        }

                                        fs.writeFile(pathrSub,dataStr,(err)=>{
                                            if (err){
                                                console.log("save err : ",err)
                                            }
                                            res.jsonp({ data : {} , status : "success" ,bStatus : true});                                
                                        })
                                        
                                    }

                                    return
                                break;
                                case "loadCmptDataGen":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "cmptDataGen";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""


                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            error_status=true
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            error_status=true
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project                                                
                                            }
                                        }

                                        
                                        if (!fs.existsSync(pathrSub + project  )){                                            
                                            error_status=true
                                        }
                                        pathrSub=path.resolve(pathrSub +  project +"/" + name + ".json");
                                        
                                        

                                        if (error_status===false){
                                            fs.readFile( pathrSub, function(err, data){
                                                if (err){                                                
                                                    res.jsonp({ data : data , status : "error" ,bStatus : false,error : err});                                
                                                    return;
                                                }

                                                
                                                try {                                                    
                                                    data=JSON.parse(data)
                                                } catch (error) {
                                                    console.log("readfile : " ,error)
                                                }

                                                res.jsonp({ data : data , status : "success" ,bStatus : true});                                

                                            });
                                        }else{
                                            res.jsonp({ data : data , status : "success" ,bStatus : true});                                
                                        }                                        
                                    }

                                    return
                                break;                                
                                case "listCmptDataGen":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "cmptDataGen";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""
                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            error_status=true
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            error_status=true
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project
                                                if (!fs.existsSync(pathrSub + "/" + project)){
                                                    error_status=true
                                                }
                                            }
                                        }

                                        
                                        if (!fs.existsSync(pathrSub + project  )){                                            
                                            error_status=true
                                        }
                                        pathrSub=pathrSub +  project ;
                                                                                    
                                        let files=[]

                                        if (error_status===false){
                                            readdir(pathrSub,
                                                (...args)=>{                                                    
                                                    let rr=args[0];
                                                    //if (rr.isDir===false){
                                                        let nr={ name : rr.name , path : rr.path, isDir : rr.isDir}
                                                        files.push(nr)
                                                    //}
                                                },
                                                (...args)=>{
                                                    
                                                }
                                            );
                                        }

                                        res.jsonp({ data : { all : files } , status : "success" ,bStatus : true});
                                        
                                    }

                                    return
                                break;

                                case "saveViews":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "views";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""


                                        if (!fs.existsSync(pathr)){
                                            fs.mkdirSync(pathr)
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            fs.mkdirSync(pathrSub)
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project
                                                if (!fs.existsSync(pathrSub + "/" + project)){
                                                    fs.mkdirSync(pathrSub + "/" + project)
                                                }
                                            }
                                        }

                                        
                                        if (!fs.existsSync(pathrSub + project  )){
                                            fs.mkdirSync(pathrSub +  project)
                                            
                                        }
                                        pathrSub=pathrSub +  project +"/" + name + ".json";
                                       
                                        let dataStr=""

                                        try {
                                            dataStr=JSON.stringify(bd.data, null, 2)
                                        } catch (error) {
                                            console.log("parse error", error );
                                        }

                                        fs.writeFile(pathrSub,dataStr,(err)=>{
                                            if (err){
                                                console.log("save err : ",err)
                                            }
                                            res.jsonp({ data : {} , status : "success" ,bStatus : true});                                
                                        })
                                        
                                    }

                                    return
                                break;
                                case "loadViews":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "views";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""


                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            error_status=true
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            error_status=true
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project                                                
                                            }
                                        }

                                        
                                        if (!fs.existsSync(pathrSub + project  )){                                            
                                            error_status=true
                                        }
                                        pathrSub=path.resolve(pathrSub +  project +"/" + name + ".json");
                                        
                                        

                                        if (error_status===false){
                                            fs.readFile( pathrSub, function(err, data){
                                                if (err){                                                
                                                    res.jsonp({ data : data , status : "error" ,bStatus : false,error : err});                                
                                                    return;
                                                }

                                                
                                                try {                                                    
                                                    data=JSON.parse(data)
                                                } catch (error) {
                                                    console.log("readfile : " ,error)
                                                }

                                                res.jsonp({ data : data , status : "success" ,bStatus : true});                                

                                            });
                                        }else{
                                            res.jsonp({ data : data , status : "success" ,bStatus : true});                                
                                        }                                        
                                    }

                                    return
                                break;                                
                                case "listViews":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "views";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""
                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            error_status=true
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            error_status=true
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project
                                                if (!fs.existsSync(pathrSub + "/" + project)){
                                                    error_status=true
                                                }
                                            }
                                        }

                                        
                                        if (!fs.existsSync(pathrSub + project  )){                                            
                                            error_status=true
                                        }
                                        pathrSub=pathrSub +  project ;
                                                                                    
                                        let files=[]

                                        if (error_status===false){
                                            readdir(pathrSub,
                                                (...args)=>{                                                    
                                                    let rr=args[0];
                                                    //if (rr.isDir===false){
                                                        let nr={ name : rr.name , path : rr.path, isDir : rr.isDir}
                                                        files.push(nr)
                                                    //}
                                                },
                                                (...args)=>{
                                                    
                                                }
                                            );
                                        }

                                        res.jsonp({ data : { all : files } , status : "success" ,bStatus : true});
                                        
                                    }

                                    return
                                break;
                            
                                case "saveSettingsTmplt":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "settingTmplt";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""


                                        if (!fs.existsSync(pathr)){
                                            fs.mkdirSync(pathr)
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            fs.mkdirSync(pathrSub)
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project
                                                if (!fs.existsSync(pathrSub + "/" + project)){
                                                    fs.mkdirSync(pathrSub + "/" + project)
                                                }
                                            }
                                        }

                                        
                                        if (!fs.existsSync(pathrSub + project  )){
                                            fs.mkdirSync(pathrSub +  project)
                                            
                                        }
                                        pathrSub=pathrSub +  project +"/" + name + ".json";
                                    
                                        let dataStr=""

                                        try {
                                            dataStr=JSON.stringify(bd.data, null, 2)
                                        } catch (error) {
                                            console.log("parse error", error );
                                        }

                                        fs.writeFile(pathrSub,dataStr,(err)=>{
                                            if (err){
                                                console.log("save err : ",err)
                                            }
                                            res.jsonp({ data : {} , status : "success" ,bStatus : true});                                
                                        })
                                        
                                    }

                                    return
                                break;
                                case "loadSettingsTmplt":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "settingTmplt";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""


                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            error_status=true
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            error_status=true
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project                                                
                                            }
                                        }

                                        
                                        if (!fs.existsSync(pathrSub + project  )){                                            
                                            error_status=true
                                        }
                                        pathrSub=path.resolve(pathrSub +  project +"/" + name + ".json");
                                        
                                        

                                        if (error_status===false){
                                            fs.readFile( pathrSub, function(err, data){
                                                if (err){                                                
                                                    res.jsonp({ data : data , status : "error" ,bStatus : false,error : err});                                
                                                    return;
                                                }

                                                
                                                try {                                                    
                                                    data=JSON.parse(data)
                                                } catch (error) {
                                                    console.log("readfile : " ,error)
                                                }

                                                res.jsonp({ data : data , status : "success" ,bStatus : true});                                

                                            });
                                        }else{
                                            res.jsonp({ data : data , status : "success" ,bStatus : true});                                
                                        }                                        
                                    }

                                    return
                                break;                                
                                case "listSettingsTmplt":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data/dbs_vDev";
                                        let npathSub= "settingTmplt";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub=path.join(pathr,  npathSub );

                                        let name=bd.name;

                                        let project=""
                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            error_status=true
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            error_status=true
                                        }

                                        if (bd.project){
                                            if (bd.project!==""){                                            
                                                project="/" + bd.project
                                                if (!fs.existsSync(pathrSub + "/" + project)){
                                                    error_status=true
                                                }
                                            }
                                        }

                                        
                                        if (!fs.existsSync(pathrSub + project  )){                                            
                                            error_status=true
                                        }
                                        pathrSub=pathrSub +  project ;
                                                                                    
                                        let files=[]

                                        if (error_status===false){
                                            readdir(pathrSub,
                                                (...args)=>{                                                    
                                                    let rr=args[0];
                                                    //if (rr.isDir===false){
                                                        let nr={ name : rr.name , path : rr.path, isDir : rr.isDir}
                                                        files.push(nr)
                                                    //}
                                                },
                                                (...args)=>{
                                                    
                                                }
                                            );
                                        }

                                        res.jsonp({ data : { all : files } , status : "success" ,bStatus : true});
                                        
                                    }

                                    return
                                break;
                                
                                case "saveSettingsMain":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data";
                                        let npathSub= "";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub                                        
                                        if (npathSub!==""){
                                            pathrSub=path.join(pathr,  npathSub );
                                        }else{
                                            pathrSub=pathr
                                        }

                                        let name="settings";

                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            fs.mkdirSync(pathr)
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            fs.mkdirSync(pathrSub)
                                        }
                                                                                
                                        pathrSub=path.resolve(pathrSub + "/" + name + ".json");
                                    
                                        let dataStr=""

                                        try {
                                            dataStr=JSON.stringify(bd.data, null, 2)
                                        } catch (error) {
                                            console.log("parse error", error );
                                        }

                                        if (error_status===false){
                                            fs.writeFile(pathrSub,dataStr,(err)=>{
                                                if (err){
                                                    console.log("save err : ",err)
                                                }
                                                    res.jsonp({ data : {} , status : "success" ,bStatus : true});                                
                                                })
                                        }else{
                                            res.jsonp({ data : data , status : "failed" ,bStatus : false, error : error_txt});                                
                                        }    
                                        
                                        
                                    }

                                    return
                                break;
                                case "loadSettingsMain":                                     
                                    if (true){                                        
                                        if (allowedCheckUserAndGroupFn(allowedC)===false){
                                            console.log(new Date(), allowedC.allowedSuccessMsg);
                                            res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                            return
                                        }
                                        let data={}

                                        let npath= "../../../data";
                                        let npathSub= "";
                                        let pathr=path.join(__dirname,  npath );
                                        let pathrSub                                        
                                        if (npathSub!==""){
                                            pathrSub=path.join(pathr,  npathSub );
                                        }else{
                                            pathrSub=pathr
                                        }

                                        let name="settings";

                                        let error_status=false
                                        let error_txt=""

                                        if (!fs.existsSync(pathr)){
                                            error_status=true
                                        }

                                        if (!fs.existsSync(pathrSub)){
                                            error_status=true
                                        }                                        
                                        
                                        pathrSub=path.resolve(pathrSub + "/" + name + ".json");                                        

                                        if (error_status===false){
                                            fs.readFile( pathrSub, function(err, data){
                                                if (err){                                                
                                                    res.jsonp({ data : data , status : "error" ,bStatus : false,error : err});                                
                                                    return;
                                                }

                                                
                                                try {                                                    
                                                    data=JSON.parse(data)
                                                } catch (error) {
                                                    console.log("readfile : " ,error)
                                                }

                                                res.jsonp({ data : data , status : "success" ,bStatus : true});                                

                                            });
                                        }else{
                                            res.jsonp({ data : data , status : "success" ,bStatus : true , error : error_txt});                                
                                        }                                        
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
                {   // projectsVdev
                    name  : "projectsVdev",
                    route : "/projectsVdev", // if route not included it will defualt to to name
                    type : "post", // get or post
                    cb : function(req, res, corestuff){ // or fn or callback
                        var bd=req.body; // get data sent from front end
                        let gdb=corestuff.mds.vrtw.gdb;
                        
                        let mainsubFN=()=>{            
                            let apiName="projectsVdev"
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
                                                    status : "list" + "projectsVdev" ,bStatus : true
                                        })
                                        return true
                                    });
                                    
                                    return true;
                                    break;                            
                                case "new":  
                                    if (true){
                                        let nr2={                                                                                                                                  
                                            "name" : bd.name,
                                            "namefile" : bd.namefile,
                                            "nameproject" : bd.nameproject,
                                            "owner" : bd.Owner,
                                            "groups" : bd.groups,
                                            "filepaths" : bd.filepaths ,
                                            "notes" : bd.notes ,
                                        };
                                        
                                        gdb[apiName].new(nr2, (dt)=>{                                    
                                            let ret={ status : "new" + "projectsVdev", bStatus : true}
                                            ret[apiName + "ID"]=dt[apiName + "ID"]
                                            
                                            res.jsonp(ret)
                                            return true
                                        });
                                                                                                    
                                        return;
                                    }
                                    break;
                                case "save":                                             
                                    let nr3={ 
                                        "name" : bd.name,
                                        "namefile" : bd.namefile,
                                        "nameproject" : bd.nameproject,
                                        "owner" : bd.Owner,
                                        "groups" : bd.groups,
                                        "filepaths" : bd.filepaths ,
                                        "notes" : bd.notes ,
                                    };
                                    
                                    nr3[apiName + "ID"]=bd[apiName + "ID"]                    
                                    
                                    gdb[apiName].save(nr3, (dt)=>{                        
                                        let ret={ status : "save" + apiName, bStatus : true}
                                        ret[apiName + "ID"]=dt[apiName + "ID"]                                    
                                        res.jsonp(ret)                                        
                                        return true
                                    });                  
                                                                    
                                    return true;
                                    break;
                                case "get":                                
                                    if (bd[apiName + "ID"] ){
                                        let nr4={} 
                                        nr4[apiName + "ID"]=bd[apiName + "ID"] 
                                        //console.log( " ",nr4[apiName + "ID"] , nr4 )
                                        gdb[apiName].get(nr4, (dt)=>{
                                            //cl(dt)
                                            // #todo - return id for note to be used in future 
                                        
                                            let nd={}
                
                                            if (dt.length > 0){
                                                nd=dt[0]
                                            }
                                            //console.log( "nd ",nd  ,nr4[apiName + "ID"] , nr4 )
                                            res.jsonp({ data : nd ,
                                                status : "get" + apiName ,bStatus : true
                                            })
                                            return true
                                        });
                                    }else{
                                        res.jsonp({ 
                                            data : [],
                                            status : "get" + apiName + ": no " + apiName + "ID" ,bStatus : false
                                        });
                                        return true
                                    }
                                                                        
                                    return true;
                                    break;  
                                case "delete":   
                                    if  (true){
                                        if (bd[apiName + "ID"] ){
                                            let nr4={} 
                                            nr4[apiName + "ID"]=bd[apiName + "ID"] 
                                            //console.log( " ",nr4[apiName + "ID"] , nr4 )
                                            gdb[apiName].delete(nr4, (dt)=>{
                                                //cl(dt)
                                                // #todo - return id for note to be used in future 
                                            
                                                let nd={}
                    
                                                if (dt.length > 0){
                                                    nd=dt[0]
                                                }
                                                //console.log( "nd ",nd  ,nr4[apiName + "ID"] , nr4 )
                                                res.jsonp({ data : nd ,
                                                            status : "delete" + apiName ,bStatus : true
                                                })
                                                return true
                                            });
                                        }else{
                                            res.jsonp({ 
                                                data : [],
                                                status : "get" + apiName + ": no " + apiName + "ID" ,bStatus : false
                                            });
                                            return true
                                        }
                                    }                              
                                    return true;
                                    break; 
                                    
                                case "archive":   
                                    if  (true){                             
                                        if (bd[apiName + "ID"] ){
                                            let nr4={} 
                                            nr4[apiName + "ID"]=bd[apiName + "ID"] 
                                            //console.log( " ",nr4[apiName + "ID"] , nr4 )
                                            gdb[apiName].archive(nr4, (dt)=>{
                                                //cl(dt)
                                                // #todo - return id for note to be used in future 
                                            
                                                let nd={}
                    
                                                if (dt.length > 0){
                                                    nd=dt[0]
                                                }
                                                //console.log( "nd ",nd  ,nr4[apiName + "ID"] , nr4 )
                                                res.jsonp({ data : nd ,
                                                            status : "archive" + apiName ,bStatus : true
                                                });
                                                return true;
                                            });
                                        }else{
                                            res.jsonp({ 
                                                data : [],
                                                status : "get" + apiName + ": no " + apiName + "ID" ,bStatus : false
                                            });
                                            return true;

                                        }
                                    }                                 
                                    return true;
                                    break; 
                                default:
                                    //res.jsonp({ status : "notype" + apiName,bStatus : false})
                            }
                
                            
                
                        }  
                        
                        let generalFnsubFN=()=>{            
                            let apiName="projectsVdev"

                            switch(bd.type) { // if for example type var string was sent in body data then can run a selection                             
                                case "getFolderPaths": 
                                    if  (true){ 
                                        let nr={} 
                                        
                                        let error=false;
                                        let err="";

                                        let nd=getVPaths();
                                        

                                        if (error){

                                            return false
                                        }
                                        
                                        
                                        
                                        res.jsonp({ data : nd , 
                                                    status : "getFolderPaths" + "_" + "projectsVdev" ,bStatus : true
                                        });
                                        return true;
                                    }   
                                    return true;
                                    break; 
                                case "generateFileData": 
                                    // copy a source ( must be file) to a destination ( must be folder) , ,must be a valid path in our project list
                                    if  (true){ 
                                        let nr={
                                            name : "",
                                            type : "",
                                            subtype : "",
                                            nameproject : "",
                                            namefile : "",
                                            project : "",
                                            src : "",                                            
                                            dst : "",
                                            fileouput : "",
                                        } 
                                        let debug=true;

                                        let error=false;
                                        let err="";

                                        let nd={}

                                        let vpaths=getVPaths();
                                        


                                        if (bd.data){
                                            if (bd.data.name){
                                                nr.name=bd.data.name
                                            }
                                            if (bd.data.type){
                                                nr.type=bd.data.type
                                            }
                                            if (bd.data.subtype){
                                                nr.subtype=bd.data.subtype
                                            }
                                            if (bd.data.namefile){
                                                nr.namefile=bd.data.namefile
                                            }
                                            if (bd.data.nameproject){
                                                nr.nameproject=bd.data.nameproject
                                            }                                                                                
                                            if (bd.data.src){
                                                nr.src=bd.data.src
                                            }
                                            if (bd.data.dst){
                                                nr.dst=bd.data.dst
                                            }
                                            if (bd.data.fileouput){
                                                nr.fileouput=bd.data.fileouput
                                            }
                                            if (bd.data.forceOverwrite){
                                                nr.forceOverwrite=bd.data.fforceOverwrite
                                            }
                                        }

                                        let srcFilename="";
                                        let destFilename="";
                                        let destFilenamePath="";
                                        let srcpath="";
                                        let dstpath="";
                                        let subtype="";                                        
                                        if (nr.type.trim()!==""){                                        
                                            if (nr.src.trim()!==""){
                                                
                                                
                                                let ext=".json";
                                                if (nr.src.includes(ext)){
                                                    ext="";
                                                }
                                                srcpath=path.resolve(nr.src + ext) 
                                                if (fs.existsSync(srcpath)){
                                                    var stat=fs.lstatSync( srcpath) 
                                                    if (stat.isFile()) {
                                                        srcFilename=path.basename(srcpath)

                                                        let isValidPath=false;
                                                        vpaths.listIdxArr.forEach((r,i)=>{
                                                            if (srcpath.includes(r.path)){
                                                                isValidPath=true;
                                                            }
                                                        });
                                                        if (isValidPath===false){
                                                            err="source file not valid " + " : " + srcpath;
                                                            if (debug===true){
                                                                console.log(err)
                                                            }
                                                            error=true;    
                                                        }
                                                    }else{                                                        
                                                        err="source file not a file " + " : " + srcpath;
                                                        if (debug===true){
                                                            console.log(err)
                                                        }
                                                        error=true;   
                                                    }
                                                }else{
                                                    err="source file does not exist " + " : " + srcpath;
                                                    if (debug===true){
                                                        console.log(err)
                                                    }
                                                    error=true;  
                                                }



                                            }else{
                                                err="type is empty " + nr.type;
                                                if (debug===true){
                                                    console.log(err)
                                                }
                                                error=true;  
                                            }

                                            if (nr.subtype!==undefined){
                                                subtype=nr.subtype;
                                            }

                                            if (nr.dst.trim()!==""){                                               
                                              
                                                dstpath=path.resolve( nr.dst ) 
                                                if (fs.existsSync(dstpath)){
                                                    var stat=fs.lstatSync( dstpath) 
                                                    if (stat.isDirectory()) {
                                                        let isValidPath=false;
                                                        vpaths.listIdxArr.forEach((r,i)=>{                                                            
                                                            if (dstpath.includes(r.path)){
                                                                isValidPath=true;
                                                                destFilenamePath=path.resolve(dstpath + "/" + srcFilename);
                                                                destFilename=srcFilename;
                                                            }
                                                        });
                                                        if (isValidPath===false){
                                                            err="destination folder not valid" + " : " + dstpath;
                                                            if (debug===true){
                                                                console.log(err)
                                                            }
                                                            error=true;  
                                                        }
                                                    }else{                                                        
                                                        err="destination folder is not a directory" + " : " + dstpath;
                                                            if (debug===true){
                                                                console.log(err)
                                                            }
                                                            error=true;  
                                                    }
                                                }else{
                                                    err="destination does not exist " + " : " + dstpath;
                                                    if (debug===true){
                                                        console.log(err)
                                                    }
                                                    error=true;  
                                                }

                                            }else{
                                                err="destination folder is blank ";
                                                if (debug===true){
                                                    console.log(err)
                                                }
                                                error=true;  
                                            }

                                            if (nr.fileouput!==""){

                                            }


                                            if (nr.type==="schema"){

                                            }
                                            if (nr.type==="cmpt"){
                                                
                                            }
                                            if (nr.type==="view"){
                                                
                                            }

                                        }else{
                                            error=true;
                                        }

                                        
                                    
                                        if (error){

                                            return false
                                        }
                                        
                            
                                        if (nr.type==="schema"){
                                        
                                            //nr.src + nr.dst
                                            if (debug){
                                                console.log("copying : ",srcpath, dstpath);
                                            }
                                            
                                            fs.cp(srcpath, destFilenamePath, (err) => {
                                                //fs.copyFile(srcpath, dstpath, (err) => {
                                                if (err){
                                                    res.jsonp({ data : nd , 
                                                        status : "copy" + "projectsVdev" ,bStatus : error, err : err.message
                                                    });
                                                    return true
                                                }
                                                res.jsonp({ data : nd , 
                                                            status : "copy" + "projectsVdev" ,bStatus : true
                                                });
                                            });
                                            return true;
                                        }

                                        if (nr.type==="cmpt"){                                            
                                            let cpDataToFiles=(params, cb)=>{
                                                let ret={ status : true , data : {} , err : "" }
                                                let text="";
                                                let foundFile=true;
                                                try {
                                                    text=fs.readFileSync(params.srcpath,"utf8");
                                                }catch(e){
                                                    foundFile=false;
                                                    ret.status=false;       
                                                    err="err : " + e.message;                                     
                                                    console.log("err : ",err);
                                                }

                                                let json1={}
                                                let jsonparsed=true;
                                                if (foundFile){

                                                    try {
                                                        //json1=JSON.stringify(text,null,2);
                                                        json1=JSON.parse(text);
                                                    }catch(e){
                                                        jsonparsed=false;
                                                        ret.status=false;
                                                        err="err : " + e.message;                                     
                                                        console.log("err : ",err);
                                                    }

                                                }

                                                if (jsonparsed){

                                                    
                                                    let name="";
                                                    let customHookUseHook="";
                                                    let customHookGenerated="";                                                    
                                                    let customAPIGenerated="";
                                                    let customDbAPIGenerated="";                                                    

                                                    //console.log("json1 : " ,json1.data ) ;

                                                    json1.name=name;
                                                    if (json1.data){
                                                        if (json1.data.customHookUseHook){
                                                            customHookUseHook=json1.data.customHookUseHook;
                                                        }
                                                        if (json1.data.customHookGenerated){
                                                            customHookGenerated=json1.data.customHookGenerated;
                                                        }                                                        
                                                        if (json1.data.customAPIGenerated){
                                                            customAPIGenerated=json1.data.customAPIGenerated;
                                                        }
                                                        if (json1.data.customDbAPIGenerated){
                                                            customDbAPIGenerated=json1.data.customDbAPIGenerated;
                                                        }
                                                    }

                                                    let rec={
                                                        name : json1.name,
                                                        customHookUseHook : customHookUseHook,
                                                        customHookGenerated : customHookGenerated,
                                                        customAPIGenerated : customAPIGenerated,
                                                        customDbAPIGenerated : customDbAPIGenerated,
                                                    }

                                                    ret.data=rec;
                                                    
                                                    if (typeof(cb)==="function"){
                                                        cb(ret,{ret})
                                                    }
                                                }else{

                                                }
                                                return ret
                                            };
                                             
                                            let rv=cpDataToFiles({ srcpath : srcpath , dstpath : destFilenamePath });
                                            if (rv.status){
                                                if (true){
                                                    let nfp="";
                                                    nfp=path.resolve( nfp + "/"+ "" );                                                           
                                                    let customHookUseHook=rv.data.customHookUseHook;
                                                    let customHookGenerated=rv.data.customHookGenerated;
                                                    let customAPIGenerated=rv.data.customAPIGenerated;
                                                    let customDbAPIGenerated=rv.data.customDbAPIGenerated;

                                                    //console.log(rv);

                                                    let customHookUseHookPath=path.resolve(  dstpath + "/" + "useHook" + ".jsx_"  );
                                                    let customHookGeneratedPath=path.resolve(  dstpath + "/" + "useFetchGenCodeBE" + ".js_"  );
                                                    let customAPIGeneratedPath=path.resolve(  dstpath + "/" + "backendAPI" + ".js_"  );
                                                    let customDbAPIGeneratedPath=path.resolve(  dstpath + "/" + "backendDB" + ".js_"  );

                                                    if (debug){                                                        
                                                        //console.log( "err : " + "rv.data : ", rv.data);
                                                        //console.log( "err : " + "writing hook to : ",srcpath , destFilenamePath, txt);
                                                    }

                                                    
                                                    
                                                    
                                                    
                                                    if (subtype==="useHook" || subtype.trim()===""){
                                                        try{
                                                            fs.writeFileSync( customHookUseHookPath, customHookUseHook);                                                        
                                                        }catch(e){                                                       
                                                            let err="err customHookUseHookPath : " + e.message + ", " + customHookUseHook;                                     
                                                            console.log("err : ",err);
                                                            return 
                                                        }
                                                    }
                                                    if (subtype==="frontendFE" || subtype.trim()===""){
                                                        try{                                                        
                                                            fs.writeFileSync( customHookGeneratedPath, customHookGenerated);                                                        
                                                        }catch(e){                                                       
                                                            let err="err customHookGenerated : " + e.message + ", " + customHookGenerated;                                     
                                                            console.log("err : ",err);
                                                            return 
                                                        }
                                                    }
                                                    if (subtype==="apiBE" || subtype.trim()===""){
                                                        try{                                                        
                                                            fs.writeFileSync( customAPIGeneratedPath, customAPIGenerated);                                                        
                                                        }catch(e){                                                       
                                                            let err="err customAPIGenerated : " + e.message + ", " + customAPIGenerated;                                     
                                                            console.log("err : ",err);
                                                            return 
                                                        }
                                                    }                                                    
                                                    if (subtype==="dbBE" || subtype.trim()===""){
                                                        try{                                                      
                                                            fs.writeFileSync( customDbAPIGeneratedPath, customDbAPIGenerated);
                                                        }catch(e){                                                       
                                                            let err="err customDbAPIGenerated : " + e.message + ", " + customDbAPIGenerated;                                     
                                                            console.log("err : ",err);
                                                            return 
                                                        }
                                                    }

                                                    return true;
                                                }
                                                
                                            }else{
                                                return
                                            }

                                        }

                                        if (nr.type==="view"){
                                                
                                        }
                                        if (nr.type===""){
                                            return
                                        }

                                    }   
                                    return true;
                                    break; 
                                case "generateFileDataAll": 
                                    if  (true){ 

                                    }   
                                    return true;
                                    break; 
                                default:
                                    //res.jsonp({ status : "notype" + apiName,bStatus : false})
                            }
                        }  
                        
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

                            if (allowedCheckUserAndGroupFn(allowedC)===false){
                                console.log(new Date(), allowedC.allowedSuccessMsg);
                                res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : allowedC.allowedSuccessMsg + "...user does have permmision to run this request, request access from service admins"});
                                return
                            }
                            
                            let taskHasRun=false;
                            taskHasRun=mainsubFN();
                            taskHasRun=generalFnsubFN();

                            if (taskHasRun===false){
                                res.jsonp({ data : { all : []} , status : "failed"  ,bStatus : false, error : "no tasks run"});
                            }

                        })
                
                        return                        
                    }  
                },
                
                             
                
            ],
            apiExtra : {
                api : {
                
                }
            }
            
}

let getVPaths=()=>{
    let nd={ 
        data : "",
        base : "",
        main : "",
        frontend : {
            react : {

            },
        },
        backend : {
            node : {

            },
        },                                             
        data : {
            vDev : {}
        },
        general : {

        },
        listIdx : {},
        listIdxArr : [],

    }

    let mainPath=path.resolve( "../" );   
    //nd.main_path=main_path;
    if (fs.existsSync(mainPath)){
        nd.base=mainPath;
        nd.listIdxArr.push({ name : "base", path : mainPath, recursive : false  });

        nd.listIdx.base=mainPath;
        nd.main=mainPath;
        nd.listIdx.main=mainPath;
        nd.listIdxArr.push({ name : "main", path : mainPath, recursive : false , recuriveLevel : 3 , exclusions : [ "node_modules" , "backup_before" ] });
    }

    let dataPath=path.resolve(mainPath + "/data");
    if (fs.existsSync(dataPath)){
        nd.data=dataPath;
        nd.listIdx.data=dataPath;
        nd.listIdxArr.push({ name : "data", path : dataPath , recursive : false , recuriveLevel : 1});
    }


    let vDevDataPath=path.resolve(mainPath + "/data/dbs_vDev");
    if (fs.existsSync(vDevDataPath)){
        nd.data.vDevData=vDevDataPath;
        nd.listIdx.vDevData=vDevDataPath;
        nd.listIdxArr.push({ name : "vDevData", path : vDevDataPath , recursive : true});
    }


    let schemaPath=path.resolve(vDevDataPath + "/schema");
    if (fs.existsSync(schemaPath)){
        nd.data.vDevSchema=schemaPath;
        nd.listIdx.vDevSchema=schemaPath;
        nd.listIdxArr.push({ name : "vDevSchema", path : schemaPath, recursive : true });
    }

    let cmptDataGenPath=path.resolve(vDevDataPath + "/cmptDataGen");
    if (fs.existsSync(cmptDataGenPath)){
        nd.data.vDevCmpt=cmptDataGenPath;
        nd.listIdx.vDevCmpt=cmptDataGenPath;
        nd.listIdxArr.push({ name : "vDevCmpt", path : cmptDataGenPath, recursive : true });
    }

    

    let viewsPath=path.resolve(vDevDataPath + "/views");
    if (fs.existsSync(viewsPath)){
        nd.data.vDevViews=viewsPath;
        nd.listIdx.vDevViews=viewsPath;        
        nd.listIdxArr.push({ name : "vDevViews", path : viewsPath, recursive : true });
    }
    
    let cviewsPath=path.resolve(mainPath + "/web_ui/src/components/cviews");
    if (fs.existsSync(cviewsPath)){
        nd.frontend.react.cviews=cviewsPath;
        nd.listIdx.cviews=cviewsPath;
        nd.listIdxArr.push({ name : "cviews", path : cviewsPath, recursive : true });
    }

    let modulesNodeServPath=path.resolve(mainPath + "/node_serv/modules");
    if (fs.existsSync(modulesNodeServPath)){
        nd.backend.node.modules=modulesNodeServPath;
        nd.listIdx.modules=modulesNodeServPath;
        nd.listIdxArr.push({ name : "modules", path : modulesNodeServPath, recursive : true });
    }

    // readdirRec
    let listIdxArrRecDirs={} 
    let allpaths={}
    nd.listIdxArr.forEach((r,i)=>{
        if (r.recursive){
            if (listIdxArrRecDirs[r.name]){

            }else{
                listIdxArrRecDirs[r.name]=[];
            }
            
            readdirRec(r.path ,(dtrec)=>{
                let tmppath=path.resolve(dtrec.path);
                allpaths[tmppath]=true;
                listIdxArrRecDirs[r.name].push( { name : dtrec.name , path : tmppath } );
            } )
        }
        if (true){
            if (r.recursive===false){
                if (r.recuriveLevel){
                    let nparams={
                        exclusions : r.exclusions,
                        recuriveLevel : r.recuriveLevel,
                    }
                    readdirRec(r.path ,(dtrec)=>{
                        let tmppath=path.resolve(dtrec.path);
                        if (allpaths[tmppath]){
                            // already exists
                            return ;
                        }
                        allpaths[tmppath]=true;

                        if (listIdxArrRecDirs[r.name]){
                            
                        }else{
                            listIdxArrRecDirs[r.name]=[];
                        }
                        //console.log("dtrec.lvl" , dtrec.lvl , " , name : " , r.name, ", path : ", tmppath)
                        
                        if (dtrec.lvl){
                            if (dtrec.lvl <= r.recuriveLevel){
                                let nrec={ name : dtrec.name , path : tmppath }
                                //console.log("dtrec.lvl" , dtrec.lvl , nrec)
                                listIdxArrRecDirs[r.name].push(nrec  );
                            }
                        }
                    },()=>{} ,nparams);
                }
            }
        }
    })

    nd.listIdxArrRecDirs=listIdxArrRecDirs;
    //console.log(listIdxArrRecDirs)

    return nd;
}

let readdir=(files_path, cb ,cbfinal)=>{
        
    var files=fs.readdirSync(files_path);
    
    var recs={ tc :0 , fc : 0 ,  dc : 0 , files : files}
    $cn.each( files  , function(f,i){
        //console.log( "fa " , f )
        recs.tc++
        var fp=files_path + "/" + f
        var stat=fs.lstatSync(  fp) 
        if (stat.isDirectory()) {
            recs.dc++
            cb( { name : f, f : f , fp : fp ,path :fp, isDir : true , stat : stat})
                            
        }else{
            recs.fc++
            cb( { name : f, f : f , fp : fp ,path :fp  , isDir : false , stat : stat })
        }
    })
    if (cbfinal){
        cbfinal(recs)
    }
    
}

let readdirRec=(files_path, cb ,cbfinal, params)=>{
    if (params){}else{
        params={}
    }
    if (params.lvl===undefined){
        params.lvl=0;
    }
    let exclusions=[]
    let filters=[]
    if (Array.isArray(params.exclusions)){
        exclusions=params.exclusions
    }
    if (Array.isArray(params.filters)){
        filters=params.filters
    }
    var files=fs.readdirSync(files_path);
    
    var recs={ tc :0 , fc : 0 ,  dc : 0 , files : files, lvl : params.lvl } ;
    $cn.each( files  , function(f,i){
        //console.log( "fa " , f )
        recs.tc++
        var fp=files_path + "/" + f
        var stat=fs.lstatSync(  fp) 
        if (stat.isDirectory()) {
            recs.dc++
            cb( { name : f, f : f , fp : fp ,path :fp, isDir : true , stat : stat , lvl : params.lvl})
            let newlevel=params.lvl+1;
            let newparams={...params,...{lvl : newlevel }} ;
            let usePath=true;

            if (filters.length){
                usePath=false;
                filters.forEach((r2,i2)=>{
                    if (fp.includes(r2)){
                        //if (r2===fp){
                        usePath=true;
                    }
                })
            }
            if (exclusions.lenght){
                exclusions.forEach((r2,i2)=>{
                    if (fp.includes(r2)){
                        //if (r2===fp){
                        usePath=false;
                    }
                })
            }

            

            if (usePath){
                if (params.recuriveLevel!==undefined){
                    if ( params.lvl <= params.recuriveLevel){                
                        readdirRec( fp , cb, cbfinal,newparams)
                        //console.log("params.lvl" , params.lvl , "limit"  ,params.recuriveLevel )
                    }
                }else{
                    readdirRec( fp , cb, cbfinal,newparams)
                }
            }
                            
        }else{
            //recs.fc++
            //cb( { name : f, f : f , fp : fp ,path :fp  , isDir : false , stat : stat })
        }
    })
    if (params.lvl===0){
        if (typeof(cbfinal)==="function"){
            cbfinal(recs)
        }
    }
    
}



 
module.exports[modName]=main;