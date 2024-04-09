import React,{ useEffect , useState,useRef, useContext } from 'react'
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
import { v4 as uuidv4 } from 'uuid';
import { saveSchemaBE,listSchemaBE,loadSchemaBE } from './libs/backend';



//let feach=$cn.each
let tof=$cn.tof;
//let isUn=$cn.isUn
let isOb=$cn.isOb
//let cl=$cn.l

let schemaValRec={
    "name" : "",
    "type" : "",
    "desc" : "",
    "subSchemaName" : "",
    "schemaPath" : [],
    "schemaPathStr" : "",
    "rules" : [],
    "keys" : [],
    "exampleVal" : "",
    "recalc" : true,
    "uuid" : "",
}

let schemaDef={ "name" :"" ,"version" : "0","schema" : {} ,"type" : " " , "type" : [], "subSchema" : {} , "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}" }
let schemaSubDef={ "name" :"" ,"schema" : {}  ,"type" : " " , "type" : [], "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}","linked" : false, "link" : { "path"  : "" , "name" : "" } }
    

export const SchemasListLoad=(props)=>{ 
    let initC=useRef(true)

    let [schemaName,setSchemaName]=useState("");
    let [project,setProject]=useState("");
    let [exampleTxt,setExampleTxt]=useState("{}");
    let [exampleJsn,setExampleJsn]=useState({});
    let [exampleTxtSubSchema,setExampleTxtSubSchema]=useState("{}");
    let [exampleJsnSubSchema,setExampleJsnSubSchema]=useState({});

    let [schemaSubSchema,setSchemaSubSchema]=useState({...schemaSubDef});
    let [schemaTxtSubSchema,setSchemaTxtSubSchema]=useState(JSON.stringify(schemaSubDef,null,2));

    let [schema,setSchema]=useState({...schemaDef});
    let [schemaTxt,setSchemaTxt]=useState(JSON.stringify(schemaDef,null,2));


    let [descTxt,setDescTxt]=useState("");
    let [notesTxt,setNotesTxt]=useState("");

    // list
    let [listSchemaData,setListSchemaData]=useState([]); 
    
    //
    let [errorMain,setErrorMain]=useState("");
    let [errorMainSubSchema,setErrorMainSubSchema]=useState("");



    let [currentProp,setCurrentProp]=useState("");
    let [currentSchemaSub,setCurrentSchemaSub]=useState("__vw__main");
    let [currentSchemaSubTxt,setCurrentSchemaSubTxt]=useState("__vw__main");

    //let [currentSchemaSubPrev,setCurrentSchemaSubPrev]=useState("");
    let currentSchemaSubPrevRef=useRef("");

    useEffect(()=>{
        if (initC.current){
            initC.current=false;

            listSchema() 
        }        
    },[]);

    useEffect(()=>{
            
        if (currentSchemaSub==="__vw__main" || currentSchemaSub===""){

        }else{
            
        }
        

    },[currentSchemaSub]);

    // ---------------------------

        let onClick=()=>{}
        if (props.onClick){
            onClick=props.onClick;
        }

        let showinput=true;
        let showinputCssDisplay="block"
        if (showinput){
            showinputCssDisplay="none"            
        }

    // ---------------------------

   

    let listSchema=(...args)=>{
            
        listSchemaBE(args[0],(dt)=>{
           
            
            let ndt=[]
            if (dt.data){
                if (dt.data.all){
                    ndt=dt.data.all;
                }
            }

            if (args.length===1 || args.length===0 ){
                setListSchemaData(ndt);
                
            }
            if (args.length===2){
                args[1](dt)
            }
        });            
            
    }

    
    let loadSchema=(...args)=>{
        loadSchemaBE(args[0],(dt)=>{

            
            
            let ndt={}
            if (dt.data){
                if (dt.data){
                    ndt=dt.data;
                }
            }

            if (args.length===1 || args.length===0 ){
                
            }
            if (args.length===2){
                args[1](dt)
            }
        });            
    }


    let loadedSchemaDataSetState=(...args)=>{
        let data={...schema}

        if (args[0]){
            if (args[0].data){
                data={...data,...args[0].data}
            }
        }
       

        setSchema(data);
        
        setSchemaName(data.name);
       
        setExampleTxt(data.example);
        setExampleJsn(JSON.parse(data.example));
        setSchemaTxt(JSON.stringify(data,null,2));

        setDescTxt(data.desc);
        setNotesTxt(data.notes);
        
    }

    // ---------------------------

    let listSchemaE=(()=>{
        let arrE=[]

        let styledef={
            background : "lightblue",
            cursor : "pointer",
            margin : 1,
            padding : 2,
            borderRadius : 4,
            border : "solid thin black"
        }

        let ni1=0;
        // up/back dir
        arrE.push(
            <div
                key={ni1}
                
                style={{...styledef,...{ padding :  0,color : "grey",overflow : "hidden"}}}
                onClick={(e)=>{
                    setProject("");                        
                    setTimeout(listSchema({project : project}),1500 );
                }}
            >
                <div
                    style={{
                        position :"relative",
                        height : 15,
                    }}
                >
                    <div
                        style={{
                            position :"absolute",                                
                            top : -5,
                            left : 100
                            
                        }}
                    >{"..  <--"}</div>
                    
                </div>
                

            </div>
        )
        ni1++;

        listSchemaData.forEach((r,i)=>{
            let name=r.name.replace(".json", "")
            let desc=`${name}`;

            let style={...styledef}

            let isDir="false";
            if (r.isDir){
                isDir="true";
                desc=`${name}.proj`;
                style.background="DarkCyan";
            }          
            
            
            
            let ni2=i + ni1;
            arrE.push(
                <div
                    key={ni2}
                    rname={name}
                    isdir={isDir}
                    style={style}
                    onClick={(e)=>{
                        let rname=e.target.getAttribute("rname");
                        let isDir=e.target.getAttribute("isdir");

                        if (isDir==="false"){
                            loadSchema({ name : rname ,project : project },(dt)=>{                                    
                                loadedSchemaDataSetState(dt)
                                onClick(dt)
                            })
                        }else{
                            setProject(rname)
                            setTimeout(listSchema({project : project}),1500 )
                        }
                    }}
                >
                    {desc}

                </div>
            )

        })

        return (
            <div
                style={{
                    position : "relative",
                    border :"black solid thin",
                    borderRadius : 6,
                    margin : 2,
                    padding : 2,
                    width : 300,
                    height : 100,
                    overflow : "hidden",
                }}
            >
                Schemas
                <div
                    style={{
                        position : "relative",
                        border :"black solid thin",
                        borderRadius : 4,
                        width : 285,
                        height : 85,
                        overflow : "auto",
                    }}
                >
                    {arrE}
                </div>
                
            </div>
        )
    })()


    let style={
        position  : "relative",
        background : "white",
        width : 1200,
        height : 300, 
        borderRadius : 8 ,
        overflow : "hidden",

    }


    if (props.style){
        style={...style,...props.style}
    }

    return (
        <div
            style={style}
        >
            <br/>

            <input 
                placeholder='schemaName'
                value={schemaName}
                style={{display : showinputCssDisplay}}
                onChange={(e)=>{
                    let val=e.target.value;

                    setSchemaName(val)
                }}
            />

            <input 
                style={{display : showinputCssDisplay}}
                placeholder='projectName'
                value={project}
                onChange={(e)=>{
                    let val=e.target.value;

                    setProject(val)
                }}
                onBlur={()=>{
                    listSchema({project : project})
                }}
            />

            <br/>
            {listSchemaE}
        </div>
    )
}


export const Schemas=(props)=>{ 

    let initC=useRef(true)

    let [schemaName,setSchemaName]=useState("");
    let [project,setProject]=useState("");
    let [exampleTxt,setExampleTxt]=useState("{}");
    let [exampleJsn,setExampleJsn]=useState({});
    let [exampleTxtSubSchema,setExampleTxtSubSchema]=useState("{}");
    let [exampleJsnSubSchema,setExampleJsnSubSchema]=useState({});

     let [schemaSubSchema,setSchemaSubSchema]=useState({...schemaSubDef});
    let [schemaTxtSubSchema,setSchemaTxtSubSchema]=useState(JSON.stringify(schemaSubDef,null,2));

    let [schema,setSchema]=useState({...schemaDef});
    let [schemaTxt,setSchemaTxt]=useState(JSON.stringify(schemaDef,null,2));


    let [descTxt,setDescTxt]=useState("");
    let [notesTxt,setNotesTxt]=useState("");

    // list
    let [listSchemaData,setListSchemaData]=useState([]); 
    
    //
    let [errorMain,setErrorMain]=useState("");
    let [errorMainSubSchema,setErrorMainSubSchema]=useState("");



    let [currentProp,setCurrentProp]=useState("");
    let [currentSchemaSub,setCurrentSchemaSub]=useState("__vw__main");
    let [currentSchemaSubTxt,setCurrentSchemaSubTxt]=useState("__vw__main");

    //let [currentSchemaSubPrev,setCurrentSchemaSubPrev]=useState("");
    let currentSchemaSubPrevRef=useRef("");
    
    
    // -----------------------------------------
        useEffect(()=>{
            if (initC.current){
                initC.current=false;

                listSchema() 
            }        
        },[]);

        useEffect(()=>{
            
            if (currentSchemaSub==="__vw__main" || currentSchemaSub===""){

            }else{
                
            }
            

        },[currentSchemaSub]);

        useEffect(()=>{
            
            updateSchemaRec()

        },[exampleJsn,exampleJsnSubSchema]);
    
    // -----------------------------------------


        let parseExampleTxt=(inp,paramsInp)=>{
            let recTmp=()=>{
                
            }

            let subSchema={...schemaSubDef}

            let defaultRec={}

            let schematmp=JSON.parse(JSON.stringify(schema))

            let params={                
                subSchema : "",
            }

            if (paramsInp){
                params={...params,...paramsInp}    
            }

            let subName="__vw__main"

            let schematmprec={}
            if (params["subSchema"]==="" || params["subSchema"]==="__vw__main"){                
                subName="__vw__main"
                schematmprec={...schematmp}
            }else{                
                //schematmprec={...schematmp["subSchema"][params["subSchema"]] }
                schematmprec=JSON.parse(JSON.stringify(schematmp["subSchema"][params["subSchema"]]))
                subName=params["subSchema"]
            }

                        
            defaultRec={...schematmprec.defaultRec};

            for (let p in inp){
                let nr={...schemaValRec}

                let updateVar=true;                
                let foundType=false

                let schemaExistsVar=false;
                if (schematmprec.schema[p]){ 
                    schemaExistsVar=true;
                }
                
                if (schemaExistsVar===true){
                    updateVar=false;
                }else{

                }                
                
                if (updateVar){
                    schematmprec.schema[p]=nr;

                    nr.name=p;

                    if (schemaExistsVar===false){
                        nr.uuid=uuidv4()
                    }

                    if (typeof(inp[p])==="string"){
                        foundType=true
                        nr.exampleVal=inp[p];
                        nr.type="string";

                        defaultRec[p]=""
                    }

                    if (typeof(inp[p])==="number"){
                        foundType=true
                        nr.exampleVal=inp[p];
                        nr.type="number";

                        defaultRec[p]=0
                    }

                    if (typeof(inp[p])==="object"){
                        foundType=true
                        nr.exampleVal=JSON.stringify(inp[p]);

                        if (Array.isArray(inp[p])){
                            nr.type="array";
                            defaultRec[p]=[]
                        }else{
                            nr.type="object";
                            defaultRec[p]={}
                        }

                    }


                    if (foundType===false){
                        nr.exampleVal=inp[p];
                    }
                }

            }


            let retSchema={}
            if (params["subSchema"]==="" || params["subSchema"]==="__vw__main"){
                    retSchema=schematmp
                    retSchema.name=schemaName;
                    retSchema.example=exampleTxt;
                    retSchema.desc=descTxt;
                    retSchema.notes=notesTxt;

            }else{
                retSchema=schematmp["subSchema"][subName]                
            }

            retSchema.schema=schematmprec.schema;
            retSchema.defaultRec=defaultRec;                        
            retSchema.keys={};
            retSchema.idx={};

            //if (params.isMain===true){}            
              
            

            return  retSchema
        }

    // -----------------------------------------
    

        let listSchema=(...args)=>{
            
            listSchemaBE(args[0],(dt)=>{
               
                
                let ndt=[]
                if (dt.data){
                    if (dt.data.all){
                        ndt=dt.data.all;
                    }
                }

                if (args.length===1 || args.length===0 ){
                    setListSchemaData(ndt);
                    
                }
                if (args.length===2){
                    args[1](dt)
                }
            });            
                
        }

        
        let loadSchema=(...args)=>{
            loadSchemaBE(args[0],(dt)=>{

                
                
                let ndt={}
                if (dt.data){
                    if (dt.data){
                        ndt=dt.data;
                    }
                }

                if (args.length===1 || args.length===0 ){
                    
                }
                if (args.length===2){
                    args[1](dt)
                }
            });            
        }
   
        let newSchema=(...args)=>{

            setSchema({...schemaDef})
            
            setSchemaName("");
            setProject("");
            setExampleTxt("{}");
            setExampleJsn({});
            setSchemaTxt(JSON.stringify(schemaDef,null,2));

            setDescTxt("");
            setNotesTxt("");
        }

        let loadedSchemaDataSetState=(...args)=>{
            let data={...schema}

            if (args[0]){
                if (args[0].data){
                    data={...data,...args[0].data}
                }
            }
           

            setSchema(data);
            
            setSchemaName(data.name);
           
            setExampleTxt(data.example);
            setExampleJsn(JSON.parse(data.example));
            setSchemaTxt(JSON.stringify(data,null,2));

            setDescTxt(data.desc);
            setNotesTxt(data.notes);
            
        }

    // -------------------------------------
    
        let updateSchemaRec=(...args)=>{
            

            let tmp={}
            if (currentSchemaSub==="__vw__main" || currentSchemaSub==="" ){
                tmp=parseExampleTxt(exampleJsn)
            }else{
                tmp={...schema}
                let tmp2={}
                tmp2=parseExampleTxt(exampleJsnSubSchema,{ subSchema : currentSchemaSub })
                tmp["subSchema"][currentSchemaSub]=tmp2;
            }
            //let schemtmp={...schema}
            
            
            setSchema(tmp);
            setSchemaTxt(JSON.stringify(tmp,null,2));
            

        }

    // -------------------------------------
        let listSchemaE=(()=>{
            let arrE=[]

            let styledef={
                background : "lightblue",
                cursor : "pointer",
                margin : 1,
                padding : 2,
                borderRadius : 4,
                border : "solid thin black"
            }

            let ni1=0;
            // up/back dir
            arrE.push(
                <div
                    key={ni1}
                    
                    style={{...styledef,...{ padding :  0,color : "grey",overflow : "hidden"}}}
                    onClick={(e)=>{
                        setProject("");                        
                        setTimeout(listSchema({project : project}),1500 );
                    }}
                >
                    <div
                        style={{
                            position :"relative",
                            height : 15,
                        }}
                    >
                        <div
                            style={{
                                position :"absolute",                                
                                top : -5,
                                left : 100
                                
                            }}
                        >{"..  <--"}</div>
                        
                    </div>
                    

                </div>
            )
            ni1++;

            listSchemaData.forEach((r,i)=>{
                let name=r.name.replace(".json", "")
                let desc=`${name}`;

                let style={...styledef}

                let isDir="false";
                if (r.isDir){
                    isDir="true";
                    desc=`${name}.proj`;
                    style.background="DarkCyan";
                }                
                
                let ni2=i+ni1;
                arrE.push(
                    <div
                        key={ni2}
                        rname={name}
                        isdir={isDir}
                        style={style}
                        onClick={(e)=>{
                            let rname=e.target.getAttribute("rname");
                            let isDir=e.target.getAttribute("isdir");

                            if (isDir==="false"){
                                loadSchema({ name : rname ,project : project },(dt)=>{                                    
                                    loadedSchemaDataSetState(dt)                                    
                                })
                            }else{
                                setProject(rname)
                                setTimeout(listSchema({project : project}),1500 )
                            }
                        }}
                    >
                        {desc}

                    </div>
                )

            })

            return (
                <div
                    style={{
                        position : "relative",
                        border :"black solid thin",
                        borderRadius : 6,
                        margin : 2,
                        padding : 2,
                        width : 300,
                        height : 100,
                        overflow : "hidden",
                    }}
                >
                    Schemas
                    <div
                        style={{
                            position : "relative",
                            border :"black solid thin",
                            borderRadius : 4,
                            width : 285,
                            height : 85,
                            overflow : "auto",
                        }}
                    >
                        {arrE}
                    </div>
                    
                </div>
            )
        })()

        let propEditorE=(()=>{
            let arrE=[]

            let curr={}

            let schematmp={}
            if (currentSchemaSub==="__vw__main" || currentSchemaSub==="" ){
                schematmp=schema.schema
            }else{
                schematmp=schema["subSchema"][currentSchemaSub].schema
            }

            if (schematmp){
            //if (schema.schema){
                //for (let p in schema.schema){
                for (let p in schematmp){
                    if (schematmp[p].uuid===currentProp){
                        curr=schematmp[p]

                    }
                }                
            }

            return (
                <div
                    style={{
                        position : "relative",
                        background : "lightgrey",
                        width : 200,
                        height : 200,
                        border : "solid thin black",
                        margin : 1,

                    }}
                >
                    <div
                        style={{

                            textAlign : "left",
                            padding : 6,
                        }}
                    >
                        <div
                            style={{}}
                        >
                        <label>name : </label> {curr.name}
                        </div>
                        <div
                            style={{}}
                        >
                            <label>type : </label>{curr.type}
                        </div>
                        
                        <div
                            style={{}}
                        >
                            <label>desc : </label>{curr.desc}
                        </div>
                        
                        <div
                            style={{}}
                        >
                            <label>default : </label>{curr.default}
                        </div>
                        
                        <div
                            style={{}}
                        >
                            <label>subSchemaName : </label>{curr.subSchemaName}
                        </div>
                        
                    </div>
                    
                </div>
            )
        })()


        let propsListE=(()=>{
            let arrE=[];

            let schematmp={}
            if (currentSchemaSub==="__vw__main" || currentSchemaSub==="" ){
                schematmp=schema
            }else{
                schematmp=schema["subSchema"][currentSchemaSub];
            }

            if (typeof(schematmp)==="object"){}else{return}

            
            

            for (let p in schematmp.schema){
                let uuid=""
                if (schematmp.schema[p]){
                    if (schematmp.schema[p].uuid){
                        uuid=schematmp.schema[p].uuid
                    }
                }
                arrE.push(
                    <div
                        key={p}
                        propname={p}
                        uuid={uuid}
                        style={{
                            position : "relative",
                            border : "solid thin black",
                            borderRadius : 4,
                            background : "blue",
                            margin : 1,
                            padding : 2,
                            color : "white",
                            cursor : "pointer"
                        }}
                        onClick={(e)=>{
                            let uuid=e.target.getAttribute("uuid")
                            let propname=e.target.getAttribute("propname")
                            if (uuid===""){
                                uuid=uuidv4();                                
                            }
                            setSchema((st)=>{
                                let nst={...schema}
                                if (currentSchemaSub==="__vw__main" || currentSchemaSub==="" ){
                                    nst["schema"][propname].uuid=uuid;
                                }else{
                                    nst["subSchema"][currentSchemaSub].schema[propname].uuid=uuid;
                                }
                                
                                return nst
                            })
                            setCurrentProp(uuid)

                        }}

                    >
                        {p}
                    </div>
                )

            }

            return (
                <div
                    style={{
                        position : "relative",
                        //background : "blue",
                        border : "solid thin black",
                        width : 250,
                        height : 200,
                        overflow : "hidden",
                        margin : 1,
                    }}
                >
                    <div
                        style={{
                            position : "relative",                            
                            width : 245,
                            height : 100,
                            overflow : "auto",

                        }}
                    >
                        {arrE}
                    </div>
                    <div
                        style={{
                            position : "relative",                            
                            width : 245,
                            height : 130,
                            overflow : "auto",

                        }}
                    >
                        <label>default rec</label>
                        <textarea 
                            style={{
                                width : "100%",
                                height : 150
                            }}
                            value={JSON.stringify(schematmp.defaultRec,null,2)}
                            onChange={()=>{

                            }}
                        />

                    </div>
                    
                </div>
            )
        })()


        let subSchemaListE=(()=>{
            let arrE=[];
            if (typeof(schema)==="object"){}else{return}
            let i=0

            let styleDef={
                position : "relative",
                border : "solid thin black",
                borderRadius : 4,
                background : "blue",
                margin : 1,
                padding : 2,
                color : "white",
                cursor : "pointer"
            }

            let style1={...styleDef}

            let selectedColor="orange"
            
            if (currentSchemaSub==="__vw__main"){
                style1.background=selectedColor
            }

            arrE.push(
                <div
                    key={i}
                    propname={"__vw__main"}                        
                    style={style1}
                    onClick={(e)=>{
                        let name=e.target.getAttribute("propname")
                        let subSchemaNametmp=name
                        
                        if (subSchemaNametmp==="__vw__main" || subSchemaNametmp===""){                                
                        }else{
                            currentSchemaSubPrevRef.current=subSchemaNametmp;
                        }
                        setCurrentSchemaSub(subSchemaNametmp)

                    }}

                >
                    {"MAIN Schema"}
                </div>
            )

            i++;
            for (let p in schema.subSchema){                      
                let style2={...styleDef}

                if (currentSchemaSub===p){
                    style2.background=selectedColor;
                }

                arrE.push(
                    <div
                        key={i}
                        propname={p}                        
                        style={style2}
                        onClick={(e)=>{
                            let name=e.target.getAttribute("propname")
                            let subSchemaNametmp=name
                            if (subSchemaNametmp==="__vw__main" || subSchemaNametmp===""){                                
                            }else{
                                currentSchemaSubPrevRef.current=subSchemaNametmp;
                            }

                            setCurrentSchemaSub(subSchemaNametmp);
                            setExampleTxtSubSchema( schema.subSchema[subSchemaNametmp].example);
                            setSchemaTxtSubSchema( JSON.stringify(schema.subSchema[subSchemaNametmp].schema,null ,2));
                            
                        }}

                    >
                        {p}
                    </div>
                )


                i++;
            }   

            return (
                <div
                    style={{
                        position : "relative",
                        border : "solid thin black",
                        borderRadius : 4,                        
                        margin : 1,
                        padding : 2,                        
                        cursor : "pointer"
                    }}
                >
                    sub schemas
                    <br/>
                    <input  
                        value={currentSchemaSubTxt}
                        onChange={(e)=>{
                            let val=e.target.value;
                            setCurrentSchemaSubTxt(val)  
                        }}
                        onBlur={(e)=>{
                            let val=e.target.value;
                            if (schema.subSchema[val]){
                                if (val==="__vw__main" || val===""){                                
                                }else{
                                    currentSchemaSubPrevRef.current=val;
                                }
                                setCurrentSchemaSub(val);                                
                            }                            
                        }}
                    />
                    <button 

                        onClick={()=>{
                            if ( currentSchemaSub.trim()!==""){
                                let tmp={...schemaSubDef}
                                tmp.name=currentSchemaSubTxt
                                if (schema.subSchema[currentSchemaSubTxt]){
                                    alert("sub schema already exists ")
                                    return
                                }
                                setSchema((st)=>{
                                    let nst={...st}

                                    nst.subSchema[currentSchemaSubTxt]=tmp;

                                    return nst;
                                })
                                setTimeout(()=>{
                                    updateSchemaRec() 
                                },2000)
                            }
                        }}
                    >add</button>
                    <div
                        style={{
                            position : "relative",                            
                            width : 200,
                            height : 170,
                            overflow : "auto",

                        }}
                    >
                        {arrE}
                    </div>
                    
                </div>
            )
        })()

    // -----------------------------------------

    let style={
        position  : "relative",
        background : "white",
        width : 1200,
        height : 300, 
        borderRadius : 8 ,
        overflow : "hidden",

    }
    if (props.style){
        style={...style,...props.style}
    }

    return (
        <div
             style={style}
        >     
            <div
                style={{
                    height : style.height -15,
                    overflow : "auto",
                }}
            >  
                <h3
                    style={{
                        color : "black",
                        padding : 0,margin : 0,
                    }}
                >Schemas</h3>

                <div style={{ clear : "left" }} />

                <div
                    style={{
                       position : "relative",
                       width : 700,
                    }}
                >
                    <div
                        style={{
                            float : "left",
                        }}
                    >
                        {listSchemaE}
                    </div>

                    <div
                        style={{
                            float : "left",
                        }}
                    >
                        <button
                            style={{

                            }}
                            onClick={()=>{
                                newSchema()
                            }}
                        >
                            new
                        </button>

                        <button
                            style={{

                            }}
                            onClick={()=>{
                                let nd=parseExampleTxt(exampleJsn)                        
                                nd.name=schemaName.replace(/ / ,"");
                                saveSchemaBE( { name : nd.name , schema :  schema , project : project.replace(/ / ,"")  } , ()=>{
                                    // listProjects
                                })
                            }}
                        >
                            save
                        </button>
                        
                        
                        <br/>

                        <input 
                            placeholder='schemaName'
                            value={schemaName}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setSchemaName(val)
                            }}
                        />

                        <input 
                            placeholder='projectName'
                            value={project}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setProject(val)
                            }}
                            onBlur={()=>{
                                listSchema({project : project})
                            }}
                        />

                        <br/>

                        <textarea 
                            placeholder='descTxt'
                            value={descTxt}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setDescTxt(val)
                            }}
                        />

                        <textarea 
                            placeholder='notesTxt'
                            value={notesTxt}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setNotesTxt(val)
                            }}
                        />
                    
                    
                    </div>
                </div>
                                
                
                

                <div style={{ clear : "left" }} />

                <div
                    style={{
                        float : "left",
                    }}
                >
                    <label>example{"1"}</label>
                    <br/>
                    <textarea 
                        style={{
                            width : 400,
                            height : 200,
                        }}
                        value={exampleTxt}
                        onChange={(e)=>{
                            let val=e.target.value;
                            setExampleTxt(val)
                        }}
                        onBlur={(e)=>{
                            let val=e.target.value;
                            
                            let json={...exampleJsn}
                            try {
                                json=JSON.parse(exampleTxt);
                                setExampleJsn( json );
                                setErrorMain("");
                            } catch (error) {
                                setErrorMain(error)
                            }

                            //setSchema 
                            
                        }}
                        onClick={(e)=>{                           
                            setCurrentSchemaSub("__vw__main");
                        }}
                        
                        
                    />
                </div>



                <div
                    style={{
                        float : "left",
                    }}
                >
                    <label>schema{"1"}</label>
                    <br/>
                    <textarea 
                        value={schemaTxt}
                        onChange={(e)=>{
                            let val=e.target.value;
                            setSchemaTxt(val)
                        }}
                        onBlur={(e)=>{
                            let val=e.target.value;                           
                            
                            let json={...schema}
                            try {
                                json=JSON.parse(val);
                                setSchema( json );
                                setErrorMain("")
                            } catch (error) {
                                setErrorMain(error)
                            }
                            
                        }}
                        style={{
                            width : 400,
                            height : 200,
                        }}
                    />
                </div>

                <div
                    style={{
                        float : "left",
                    }}
                >
                    <label>error{"1"}</label>
                    <br/>
                    <textarea 
                        value={errorMain}
                        onChange={(e)=>{
                            
                        }}
                    />
                </div>

                <div
                    style={{
                        float : "left",
                    }}
                >

                </div>


                <div style={{ clear : "left" }} />

                
                <div
                    style={{
                        float : "left",
                    }}
                >
                    
                    {subSchemaListE}
                    
                    
                </div>
                <div
                    style={{
                        float : "left",
                    }}
                >
                    {propsListE}

                </div>
                <div
                    style={{
                        float : "left",
                    }}
                >
                    {propEditorE}
                </div>
                


                <div style={{ clear : "left" }} />


                <div
                    style={{
                        float : "left",
                    }}
                >
                    <label>example {"Sub Schema"}</label>
                    <br/>
                    <textarea 
                        style={{
                            width : 400,
                            height : 200,
                        }}
                        value={exampleTxtSubSchema}
                        
                        onChange={(e)=>{
                            let val=e.target.value;
                            setExampleTxtSubSchema(val)
                        }}  
                        onBlur={(e)=>{
                            let val=e.target.value;
                            
                            if (currentSchemaSub==="__vw__main" || currentSchemaSub==="" ){
                                return;
                            }

                            let json={...exampleJsnSubSchema}
                            try {
                                json=JSON.parse(exampleTxtSubSchema);
                                setSchema((st)=>{
                                    let nst={...st}
                                    nst.subSchema[currentSchemaSub].example=val
                                    return nst
                                }) 
                                setExampleJsnSubSchema( json );
                                setErrorMainSubSchema("");
                                setTimeout(()=>{                                    
                                    setSchemaTxtSubSchema( JSON.stringify(schema.subSchema[currentSchemaSub].schema,null ,2));
                                },2500)
                                
                            } catch (error) {
                                setErrorMainSubSchema(error)
                            }

                            //setSchema 
                            
                        }}
                        onClick={()=>{
                            let i=0;
                            let last=""
                            for (let p in schema.subSchema){
                                last=p;
                                i++
                            }
                            if (i>0){
                                if (currentSchemaSubPrevRef.current===""){
                                    setCurrentSchemaSub(last);
                                }else{                                        
                                    setCurrentSchemaSub(currentSchemaSubPrevRef.current);
                                }
                                
                            }
                            
                        }}
                        
                    />
                </div>

                <div
                    style={{
                        float : "left",
                    }}
                >
                    {"Sub Schema"}<br/>
                    <textarea 
                        style={{
                            width : 400,
                            height : 200,
                        }}
                        value={schemaTxtSubSchema}
                        onChange={(e)=>{
                             let val=e.target.value;
                             setSchemaTxtSubSchema(val)
                        }}
                        onBlur={(e)=>{
                            let val=e.target.value;      
                            
                            if (currentSchemaSub==="__vw__main" || currentSchemaSub==="" ){
                                return;
                            }

                            
                            let json={...schemaSubSchema}
                            try {
                                json=JSON.parse(val);                                
                                setSchemaSubSchema( json );
                                setSchema((st)=>{
                                    let nst={...st}

                                    nst.subSchema[currentSchemaSub].schema=json;

                                    return nst;
                                })
                                setErrorMainSubSchema("")

                                setTimeout(()=>{                                    
                                    //updateSchemaRec();
                                },2500)
                            } catch (error) {
                                setErrorMainSubSchema(error)
                            }
                            
                        }}
                        onClick={()=>{
                            let i=0;
                            let last=""
                            for (let p in schema.subSchema){
                                last=p;
                                i++
                            }
                            if (i>0){
                                if (currentSchemaSubPrevRef.current===""){
                                    setCurrentSchemaSub(last);
                                }else{                                        
                                    setCurrentSchemaSub(currentSchemaSubPrevRef.current);
                                }
                                
                            }
                            
                        }}
                        
                    />
                </div>

                <div
                    style={{
                        float : "left",
                    }}
                >
                    <label>error {"Sub Schema"}</label>
                    <br/>
                    <textarea 
                        value={errorMainSubSchema}
                        onChange={(e)=>{
                            
                        }}
                    />
                </div>
                    

                <div style={{ clear : "left" }} />
            </div>
        </div>
    )

}