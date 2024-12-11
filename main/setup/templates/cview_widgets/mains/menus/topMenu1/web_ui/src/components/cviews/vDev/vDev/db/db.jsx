import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';

let tof=$cn.tof

export const Db=(props)=>{
    let initC=useRef(true);
    let [mainNoteText, setMainNoteText]=useState("");

    let [databases,setDatabase]=useState([]);
    let [databasesDetails,setDatabaseDetails]=useState({});
    let [tables,setTables]=useState([]);
    let [createTableName,setCreateTableName]=useState("");
    let [currentGetRecsName,setCurrentGetRecsName]=useState("");
    let [currentGetRecs,setCurrentGetRecs]=useState([]);

    let [insertRecsData,setInsertRecsData]=useState([]);
    let insertRecsTemplateRef=useRef({});

    

    useEffect(()=>{
        if (initC.current){
            initC.current=false;
            listDb();
            listTables()
        }
        
    },[])

    // ----------------------------------

    let listDbBE=(...args)=>{
        let cb=()=>{};
        let params={};

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0];
            }
            
            cb=args[1];
        }

        let api="vDev"
        let data={ 
            "type" : "getDBS",            
        };

        if ( params.filename){
            //data.filename=params.filename
        }

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })

    }

    let listTablesBE=(...args)=>{
        let cb=()=>{}
        let params={}

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0]    
            }
            
            cb=args[1]
        }

        let api="vDev"
        let data={ 
            "type" : "getTables",            
        };

        if ( params.filename){
            //data.filename=params.filename
        }

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })

    }

    let createTablesBE=(...args)=>{
        let cb=()=>{}
        let params={}

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0]    
            }
            
            cb=args[1]
        }

        let api="vDev"
        let data={ 
            "type" : "createTable",            
        };

        let tmp=""

        tmp="name"
        if ( params[tmp]){
            data[tmp]=params[tmp];
        }else{
            alert ("error . table name empty")
            return 
        }

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })

    }


    let getRecsBE=(...args)=>{
        let cb=()=>{}
        let params={}

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0]    
            }
            
            cb=args[1]
        }

        let api="vDev"
        let data={ 
            "type" : "getRecs",            
        };

        let tmp=""

        tmp="name"
        if ( params[tmp]){
            data[tmp]=params[tmp];
        }else{
            alert ("error . table name empty")
            return 
        }

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })

    }

    let insertRecBE=(...args)=>{
        let cb=()=>{}
        let params={}

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0]    
            }
            
            cb=args[1]
        }

        let api="vDev"
        let data={ 
            "type" : "insertRec",            
        };

        let tmp=""

        tmp="name"
        if ( params[tmp]){
            data[tmp]=params[tmp];
        }else{
            alert ("error . table name empty")
            return 
        }
        if (params[tmp]==="" || params[tmp]===" "){
            alert ("error . table name empty")
            return 
        }

        tmp="data"
        if ( params[tmp]){
            data[tmp]=params[tmp];
        }else{
            alert ("error . table name empty")
            return 
        }
        

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })

    }

    let deleteRecBE=(...args)=>{
        let cb=()=>{}
        let params={}

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0]    
            }
            
            cb=args[1]
        }

        let api="vDev"
        let data={ 
            "type" : "deleteRec",            
        };

        let tmp=""

        tmp="_id"
        if ( params[tmp]){
            data[tmp]=params[tmp];
        }else{
            alert ("error . table name undefined")
            return 
        }
        if (params[tmp]==="" || params[tmp]===" "){
            alert ("error . table name empty")
            return 
        }

        tmp="name"
        if ( params[tmp]){
            data[tmp]=params[tmp];
        }else{
            alert ("error . table name undefined")
            return 
        }
        if (params[tmp]==="" || params[tmp]===" "){
            alert ("error . table name empty")
            return 
        }
       
        

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })

    }
    
    let updateRecBE=(...args)=>{
        let cb=()=>{}
        let params={}

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0]    
            }
            
            cb=args[1]
        }

        let api="vDev"
        let data={ 
            "type" : "updateRec",            
        };

        let tmp=""

        tmp="_id"
        if ( params[tmp]){
            data[tmp]=params[tmp];
        }else{
            alert ("error . table _id undefined")
            return 
        }
        if (params[tmp]==="" || params[tmp]===" "){
            alert ("error . table _id empty")
            return 
        }

        tmp="name"
        if ( params[tmp]){
            data[tmp]=params[tmp];
        }else{
            alert ("error . table name undefined")
            return 
        }
        if (params[tmp]==="" || params[tmp]===" "){
            alert ("error . table name empty")
            return 
        }

        tmp="data"
        if ( params[tmp]){
            data[tmp]=params[tmp];
        }else{
            alert ("error . data name undefined")
            return 
        }
       
       
        

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })

    }
    


    // ----------------------------------

    let listDb=()=>{

        listDbBE({},(dt)=>{
            let data=dt.data;
            //let dtStr=JSON.stringify(dt,null,2); // alert(dtStr);
            
            setDatabase(data.all)
            setDatabaseDetails(data)
        })
    }

    let listTables=()=>{

        listTablesBE({},(dt)=>{
            let data=dt.data;
            //let dtStr=JSON.stringify(dt,null,2); alert(dtStr);
            
            setTables(data.all)
        })
    }


    let getRecs=(...args)=>{

        getRecsBE(args[0],(dt)=>{
            let data=dt.data;
            //let dtStr=JSON.stringify(dt,null,2); alert(dtStr);            
            setCurrentGetRecs(data.all)
            if (typeof(args[1])==="function"){
                args[1](dt)
            }
        })
    }


    let insertRec=(...args)=>{

        insertRecBE(args[0],(dt)=>{
            //let data=dt.data;
            //let dtStr=JSON.stringify(dt,null,2); alert(dtStr);
            if (typeof(args[1])==="function"){
                args[1](dt)
            }
            getRecs({"name" : currentGetRecsName})
            
        })
    }

    let deleteRec=(...args)=>{

        deleteRecBE(args[0],(dt)=>{
            //let data=dt.data;
            //let dtStr=JSON.stringify(dt,null,2); alert(dtStr);
            if (typeof(args[1])==="function"){
                args[1](dt)
            }
            getRecs({"name" : currentGetRecsName})
            
        })
    }

    let updateRec=(...args)=>{

        updateRecBE(args[0],(dt)=>{
            //let data=dt.data;
            //let dtStr=JSON.stringify(dt,null,2); alert(dtStr);
            if (typeof(args[1])==="function"){
                args[1](dt)
            }
            getRecs({"name" : currentGetRecsName})
            
        })
    }


    
    


    let listDbE=(()=>{
        let arrE=[];


        let style={
            position : "relative",
            border : "solid thin grey",
            width : 140,
            height : 200,
            overflow : "hidden",
            margin : 4,
            padding : 4,

        };

        let styleInner={
            position : "relative",
            
            width : 130,
            height : 190,
            overflow : "auto",
            textAlign : "left"
        };

        let styleEach={
            position : "relative",
            width : 200,
            overflow : "hidden",

        };

        if (props.params){
            if (props.params.allActive){
                style.height=500;
                styleInner.height=500;
            }
        }


        databases.forEach((r,i)=>{
            let styleEachInst={...styleEach};
            
            if (databasesDetails.current===r.name){
                styleEachInst.background="yellow";
            }
            
            let sizeBytes=0;
            if (typeof r.sizeBytes=== 'number'){
                sizeBytes=r.sizeBytes/1000000;
                sizeBytes=sizeBytes.toFixed(3);
            }

            arrE.push(
                <div
                    key={i}
                    style={styleEachInst}
                >
                   <label style={{ fontSize : 15}} > {r.name}</label> 
                   <label style={{ fontSize : 15}} > </label>
                   <label style={{ fontSize : 12}} >( {sizeBytes}Mb ) </label>
                </div>
            )
        })

        return (
            <div
                style={style}
            >
                <div
                    style={styleInner}
                >   
                    Databases<br/>
                    ------------
                    {arrE}
                </div>
                
            </div>
        )
    })();


    let listTablesE=(()=>{
        let arrE=[];

        let style={
            position : "relative",
            border : "solid thin grey",
            width : 180,
            height : 200,
            overflow : "hidden",
            margin : 4,
            padding : 4,

        };

        let styleInner={
            position : "relative",
            
            width : 170,
            height : 190,
            overflow : "auto",
            textAlign : "left"
        };

        let styleEach={
            cursor : "pointer",
            padding  :2 ,
            margin  : 1,
            borderRadius : 4,
            border : "solid thin black",
            background  : "lightblue",
            overflow : "hidden"

        };

        if (props.params){
            if (props.params.allActive){
                style.height=500;
                styleInner.height=500;
            }
        }

        tables.forEach((r,i)=>{
            arrE.push(
                <div
                    key={i}
                    tablename={r.name}
                    style={styleEach}
                    onClick={(e)=>{
                        let val=e.target.getAttribute("tablename")
                        getRecs({name : val},(dt)=>{
                            //setCurrentGetRecs
                            
                        })
                        setCurrentGetRecsName(val)
                    }}
                >
                    {r.name}
                </div>
            )
        })

        return (
            <div
                style={style}
            >
                <div
                    style={styleInner}
                >   
                    Tables<br/>
                    ------------
                    {arrE}
                </div>
                
            </div>
        )
    })();

    let createTableE=(()=>{
        let arrE=[]

        
        return (
            <div
                style={{
                    position : "relative",
                    border : "solid thin grey",
                    width : 200,
                    height : 95,
                    overflow : "hidden",
                    margin : 4,
                    padding : 4,

                }}
            >
                <div
                    style={{
                        position : "relative",
                        
                        width : 200,
                        height : 100,
                        overflow : "auto",
                        textAlign : "left"
                    }}
                >   
                    create table<br/>
                    ------------
                    <input 
                        value={createTableName}
                        onChange={(e)=>{
                            let val=e.target.value;
                            setCreateTableName(val);
                        }}
                    />
                    <button
                        onClick={()=>{
                            createTablesBE({ name : createTableName } ,(dt)=>{                                
                                listTables()
                            })
                        }}
                    >create</button>
                </div>
                
            </div>
        )
    })();


    let getRecsE=(()=>{
        let arrE=[];

        let theaderArrE=[];

        let style={
            position : "relative",
            border : "solid thin grey",
            width : 800,
            height : 200,
            overflow : "hidden",
            margin : 4,
            padding : 4,

        };
        let styleInner={
            position : "relative",
            
            width : 790,
            height : 190,
            overflow : "auto",
            textAlign : "left"
        };
        let styleEach={};


        if (props.params){
            if (props.params.allActive){
                style.height=382;
                styleInner.height=400;
            }
        }
        
        let cMax=0;
        currentGetRecs.forEach((r,i)=>{
            let arrTmpE=[]
            let arrTmpArr=[]
            let arrTmpHeaderE=[]
            
            let c=0;
            if (true){ 
                for (let p in r){
                    arrTmpHeaderE.push(
                        <th
                            key={"th_" + p + "_" + c}
                        >
                            {p}
                        </th>
                    );
                    arrTmpArr.push(p)

                    let val=r[p] ;

                    if (typeof(val)==="object"){
                        val=JSON.stringify(val)
                    }

                    arrTmpE.push(
                        <td
                            recmongoid={r._id}
                            key={ "td_" + p + "_" + c  }
                            style={{
                                position : "relative",
                                border :"solid thin lightgrey",
                            }}
                            onClick={()=>{
                                let data={...r}
                                if (data._id){
                                    delete data._id
                                }
                                setInsertRecsData(JSON.stringify(data,null,2))
                            }}
                        >
                            {val}
                        </td>
                    )
                    c++;
                }
                if (c>cMax){ // max columns in all records
                    cMax=c
                    theaderArrE=arrTmpHeaderE;
                    insertRecsTemplateRef.current=(()=>{
                        let tmpR={}
                        arrTmpArr.forEach((r2,i2)=>{
                            if (r2==="_id"){return}
                            tmpR[r2]=""
                        })
                        return tmpR
                    })()
                }
            }

            arrE.push(
                <tr
                    key={i}
                    recmongoid={r._id}
                    style={{
                        fontSize : 11,
                    }}
                >
                    
                    {arrTmpE}
                    
                    <td
                        recmongoid={r._id}
                        style={{
                            fontSize : 11,
                        }}
                    >
                        <button     
                            recmongoid={r._id}
                            onClick={(e)=>{
                                let val=e.target.getAttribute("recmongoid")
                                
                                deleteRec({ name : currentGetRecsName ,  "_id" : val})
                            }}
                        >del</button>

                        <button 
                            recmongoid={r._id}
                            onClick={(e)=>{
                                let val=e.target.getAttribute("recmongoid")

                                let data={}
                                try {
                                    data=JSON.parse(insertRecsData)
                                } catch (error) {
                                    alert("parse Error",error)
                                    return 
                                }
                                
                                updateRec({ name : currentGetRecsName ,  "_id" : val , data : data})
                            }}
                        >update</button>
                    </td>
                </tr>
            )

            
            
        })

        

        let tableInsertE=(
            <div
                style={{}}
            >
                <button
                    style={{}}
                    onClick={()=>{
                        let data={}
                        try {
                            data=JSON.parse(insertRecsData)
                        } catch (error) {
                            alert("parse Error",error)
                            return 
                        }
                        insertRec({ name : currentGetRecsName, data : data },()=>{

                        })
                    }}
                >insert</button>
                <button
                    style={{}}
                    onClick={()=>{

                    }}
                >update</button>
                <button
                    style={{}}
                    onClick={()=>{                        
                        setInsertRecsData(JSON.stringify(insertRecsTemplateRef.current,null,2))
                    }}
                >reset</button>
                
                <textarea
                    value={insertRecsData}
                    onChange={(e)=>{
                        let val=e.target.value;
                        setInsertRecsData(val)
                    }}
                />
            </div>
        )

        let tableE=(
            <table
                style={{

                }}
            >
                <thead>
                    <tr>
                    {theaderArrE}
                    </tr>
                </thead>
                <tbody
                >
                    {arrE}
                </tbody>

            </table>
        )

        return (
            <div
                style={style}
            >
                <div
                    style={styleInner}
                >   
                    Records - {currentGetRecsName}<br/>
                    ------------
                    {tableInsertE}
                    {tableE}
                </div>
                
            </div>
        )
    })();
    
    
    let style={
        position  : "relative",
        background : "white",
        width : 600,
        height : 300, 
        borderRadius : 8 ,
        overflow : "hidden",
        margin : 4,

    }
    if (props.style){
        style={...style,...props.style}
    }

    let styleSubMain={
    }

    let styleSubMainFrame={

    }

    if (props.params){
        if (props.params.allActive){
            style.height=800;
            style.width=1200;            

            styleSubMain.height=780;
            styleSubMain.overflow="auto";

            styleSubMainFrame.width="99%";
            styleSubMainFrame.height=785;
            styleSubMainFrame.borderRadius=5;
            styleSubMainFrame.overflow="hidden";
            styleSubMainFrame.border="solid thin lightgrey";
            styleSubMainFrame.margin=6;

        }
    }




    return (
        <div
            style={style}
        >
            Db
            <br/>
            <div
                style={{
                    position :"relative",
                    width : style.width - 15,
                    height : style.height - 15,
                    overflow : "auto"
                }}
            >
                <div
                    style={{
                        float : "left",
                    }}
                >
                    {listDbE}
                </div>
                <div
                    style={{
                        float : "left",
                    }}
                >
                    {listTablesE}
                </div>
                <div
                    style={{
                        float : "left",
                    }}
                >
                    <div
                        style={{
                            display : "inline-block",
                            // position : "relative",
                            // width : 200,
                        }}
                    >
                        {createTableE}
                    </div>                    
                    <div
                        style={{
                            display : "inline-block",
                            // position : "relative",
                            // width : 200,
                        }}
                    >
                        {
                           // createTableE
                        }
                    </div>                    
                    <div
                        style={{
                            display : "inline-block",
                            // position : "relative",
                            // width : 200,
                        }}
                    >
                        {
                            // createTableE
                        }
                    </div>
                </div>
                <div
                    style={{
                        float : "left",
                    }}
                >
                    {getRecsE}
                </div>
                
                

                


                <div style={{clear : "left"}} />
            </div>
            
            
        </div>
    )

}


