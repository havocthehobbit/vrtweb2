import React,{ useEffect , useState,useRef, useContext } from 'react'
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
import { v4 as uuidv4 } from 'uuid';
import { saveSchemaBE,listSchemaBE,loadSchemaBE , deleteSchemaBE } from './libs/backend';
import { SchemasOld , SchemasListLoadOld} from './schemaold.jsx';
import { validations } from './libs/validations.js';
import { parse as csvparseSync } from "csv-parse/browser/esm/sync";
import { parse as csvparse } from "csv-parse/browser/esm";


//let feach=$cn.each
let tof=$cn.tof;
//let isUn=$cn.isUn
let isOb=$cn.isOb
//let cl=$cn.l



let parseExampleTxt=(inp,paramsInp)=>{
    let recTmp=()=>{
        
    }

    //let subSchema={...schemaSubDef}

    let defaultRec={}

    let schemaRecLocal={}

    if (paramsInp.schemaRec){
        schemaRecLocal=paramsInp.schemaRec
    }
    

    let schematmp=JSON.parse(JSON.stringify(schemaRecLocal))

    let params={                
        subSchema : "",
        addprops : false,
    }

    if (paramsInp){
        params={...params,...paramsInp}    
    }

    

    let subName="__vw__main"

    let schematmprec={}
    if (params["subSchema"]==="" || params["subSchema"]==="__vw__main"){                
        subName="__vw__main"
        schematmprec={...schematmp};        
    }else{                
        //schematmprec={...schematmp["subSchema"][params["subSchema"]] }
        schematmprec=JSON.parse(JSON.stringify(schematmp["subSchema"][params["subSchema"]]))
        subName=params["subSchema"]
    }
    let schemaName=schematmp.name ;
                

    if (params.addprops){
        defaultRec={...schematmprec.defaultRec};
    }else{
        defaultRec={};
        let newdefaultRec={...schematmprec.defaultRec};
        for (let p1 in newdefaultRec){
            let exists=false;
            for (let p in inp){
                if ( p===p1){
                    exists=true;
                };
            }
            if (exists===false){
                delete newdefaultRec[p1];
            }
        }
        defaultRec=newdefaultRec;
    }


    let newschematmprec={}
    if (params.addprops){
        newschematmprec=schematmprec;
    }else{
        newschematmprec=schematmprec;
        for (let p1 in newschematmprec.schema){
            let exists=false;
            for (let p in inp){
                if ( p===p1){
                    exists=true;
                };
            }
            if (exists===false){
                delete newschematmprec.schema[p1];
            }
        }
    }

    for (let p in inp){
        let nr={...schemaValRec}

        let updateVar=true;                
        let foundType=false

        let schemaExistsVar=false;
        if (newschematmprec.schema[p]){ 
            schemaExistsVar=true;
        }
        
        if (schemaExistsVar===true){
            updateVar=false;
        }else{

        }                
        

        if (updateVar){
            newschematmprec.schema[p]=nr;

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
            //retSchema.example=exampleTxt;
            retSchema.example=JSON.stringify(inp,null,2); //exampleBoxTxt;                
            //retSchema.desc=descTxt;
            //retSchema.notes=notesTxt;

    }else{
        retSchema=schematmp["subSchema"][subName] ;               
    }

    retSchema.schema=newschematmprec.schema;
    retSchema.defaultRec=defaultRec;                        
    retSchema.keys={};
    retSchema.idx={};

    //if (params.isMain===true){}            
      
    

    return  retSchema
}

let updateSchemaRec=(...args)=>{ // schema , name , useMain ,schemaSub , hasSchemaSub }
    let error="";
    let useMain=false;
    let name="";
    let schemaTxt="";
    let subschemaTxt="";
    let cb;
    let retSchema={};
    let retSchemaSub={};
    let hasRetSchemaSub=false;
    let addprops=false;
    
    let schemaRecLocal={}
    
    if (args.length){
        let has_name_and_jsonExample=false;
        let has_name=false;
        let has_jsonExample=false;

        if ( typeof(args[0])==="object" ){
            
            if (args[0]["name"]){
                name=args[0]["name"];
                has_name=true;
            }            
            if (args[0]["subSchemaTxt"]){
                subschemaTxt=args[0]["subSchemaTxt"];
                has_jsonExample=true;
            }
            if (args[0]["schemaTxt"]){
                schemaTxt=args[0]["schemaTxt"];                
            }

            if (args[0]["addprops"]){ // add any props as new props to old ones or replace all with new ones 
                addprops=args[0]["addprops"];                
            }

            addprops

            if (args[0].schemaRec){
                schemaRecLocal=args[0].schemaRec
            }

            if ( has_name && has_jsonExample){
                has_name_and_jsonExample=true;
            }
        }
        if ( typeof(args[0])==="function" ){
            cb=args[0];
        }

        if (args.length>1){
            if ( typeof(args[1])==="function" ){
                cb=args[1];
            }
            
        }

        if (has_name_and_jsonExample){
            useMain=false;
        }else{
            useMain=true
        }

    }
    /*
    else{
        
        if (currentSchemaSub==="__vw__main" || currentSchemaSub==="" ){
            useMain=true;
        }else{
            name=currentSchemaSub;
            subschemaTxt=schemaBoxTxtSub;
        }
    }
    */

    
    
    let tmp={}    
    if (useMain){
        //tmp=parseExampleTxt(exampleJsn)
        try {                
            tmp=parseExampleTxt(JSON.parse(schemaTxt), { schemaRec : schemaRecLocal  , addprops : addprops});
            retSchema=tmp;
        }catch(err){
             error="error updating schema rec : " + err.message;   
        }
    }else{
        tmp={...schemaRecLocal}
        let tmp2={}

        try{
            //tmp2=parseExampleTxt(exampleJsnSubSchema,{ subSchema : currentSchemaSub })
            tmp2=parseExampleTxt(JSON.parse(subschemaTxt), { subSchema : name , schemaRec : schemaRecLocal, addprops : addprops  });
            
            tmp["subSchema"][name]=tmp2;

            retSchema=tmp;
            retSchemaSub=tmp2;
            hasRetSchemaSub=true;
        }catch(err){
            error="error updating sub schema rec : " + err.message;   
        }
        
        
    }
    
    let retRec={  
        schema : tmp , name : name,   useMain : useMain,
        schemaSub : retSchemaSub, hasSchemaSub : hasRetSchemaSub, err : error, error : error 
    };        
    
    if (typeof(cb)==="function" ){
        cb(retRec)
    }

    return retRec

}

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
    "validateor" : ""
}

let schemaDef={ "name" :"" ,"version" : "0","schema" : {} ,"types" : [] , "type" : "", "subSchema" : {} , "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}" ,"defaultRec" : {}, "variations" : {} }
let schemaSubDef={ "name" :"" ,"schema" : {}  ,"type" : "" , "types" : [], "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}","linked" : false, "link" : { "path"  : "" , "name" : "" } , "defaultRec" : {}, "variations" : {} }
   

export const listSchema=(...args)=>{
            
    listSchemaBE(args[0],(dt)=>{
       
        
        let ndt=[]
        if (dt.data){
            if (dt.data.all){
                ndt=dt.data.all;
            }
        }

        if ( args.length===0){
            
        }
        if ( args.length> 0 ){                            
            if (typeof(args[0])==="function"){
                args[0](dt)
            }                  
           
            if (args.length===2){

                if (typeof(args[1])==="function"){
                    args[1](dt)
                }
                
            }
        }
    });            
        
}

export const loadSchema=(...args)=>{
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


export const SchemasListLoad=(props)=>{ // onLoad , onClick ,onChangeProjectName , onChangeSchemaName
    
    let initC=useRef(true)

    let [schemaName,setSchemaName]=useState("");
    let [projectName,setProjectName]=useState("");
    let [currName,setCurrName]=useState("");
    let [currRec ,setCurrRec ]=useState({});
    let [currPathRec ,setCurrPathRec ]=useState({});
    

    
    let [listSchemaData,setListSchemaData]=useState([]);

    let defUpdateProjectList=new Date();
    if (props.updateProjectList){
        defUpdateProjectList=props.updateProjectList;
    }
    //let [updateProjectList ,setUpdateProjectList]=useState(defUpdateProjectList);
    
    useEffect(()=>{
        if (initC.current===false){            
            listSchema({project : projectName},(dt)=>{});
        }
    },[props.updateProjectList]);


    

    
    useEffect(()=>{
        if (initC.current){
            initC.current=false;

            listSchema({},(dt)=>{});
            // {"name":"acd.json","path":"C:\\nodeproj\\vrtweb2\\main\\data\\dbs_vDev\\schema/acd.json","isDir":false}
            // {"name":"ssss","path":"C:\\nodeproj\\vrtweb2\\main\\data\\dbs_vDev\\schema/ssss","isDir":true}

        }
        
    })

    // ---------------------

    useEffect(()=>{
        if (schemaName!==props.schemaName){            
                onChangeSchemaName(schemaName)            
        }
    },[schemaName])
        
    useEffect(()=>{
        if (projectName!==props.projectName){            
                onChangeProjectName(projectName)            
        }
    },[projectName])

    let onClick=()=>{};
    if (typeof(props.onClick)==="function"){
        onClick=props.onClick;
    };
    
    
    let onChangeProjectName=()=>{};
    if (typeof(props.onChangeProjectName)==="function"){
        onChangeProjectName=props.onChangeProjectName;
    };
    let onChangeSchemaName=()=>{};
    if (typeof(props.onChangeSchemaName)==="function"){
        onChangeSchemaName=props.onChangeSchemaName;
    };

    let onLoad=()=>{};
    if (typeof(props.onLoad)==="function"){
        onLoad=props.onLoad;
    };
    


    // ---------------------

    let listSchema=(...args)=>{
            
        listSchemaBE(args[0],(dt)=>{
           
            
            let ndt=[]
            if (dt.data){
                if (dt.data.all){
                    ndt=dt.data.all;
                }
            }

            if ( args.length===0){
                setListSchemaData(ndt);
            }
            if ( args.length> 0 ){                
               
                setListSchemaData(ndt);
                if (typeof(args[0])==="function"){
                    args[0](dt)
                }                  
               
                if (args.length===2){

                    if (typeof(args[1])==="function"){
                        args[1](dt)
                    }
                    
                }
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

    //deleteSchema

    // -------------------------------------------------

    let schemalistArrE=[]
    let schemalistE
    listSchemaData.forEach((r,i)=>{
        
        let bg="lightblue";
        if ( r.isDir===false){
            bg="cyan";
        }

        schemalistArrE.push(
            <div
                key={i}
                style={{

                }}
                onClick={()=>{
                    
                    if (r.isDir===false){
                        setCurrName(r.name);
                        setCurrPathRec({...r});

                        loadSchema({ name : r.name ,project : projectName },(dt)=>{                                    
                            //alert(JSON.stringify( dt ) );
                            setCurrRec(dt.data)
                            onClick({...r},{projectName : projectName, schemaName : r.name });
                            onLoad(dt.data,{projectName : projectName, schemaName : r.name },{...r});
                        })
                        
                        
                    }else{                    
                        setProjectName(r.name);
                        setCurrPathRec({...r});
                        listSchema({project : r.name},(dt)=>{
                            //alert(JSON.stringify( dt ) );                            
                            
                        })
                        onClick({...r},{projectName : r.name});
                        
                    }
                }}
            >
                {/* JSON.stringify(r) */}
                <div
                    style={{
                        background : bg,
                        borderBottom : "solid thin grey",
                        cursor : "pointer",
                    }}
                >
                    {r.name}
                </div>
            </div>
        );

    });
    schemalistE=(
        <div
            style={{

            }}            
        >
            <div
                style={{
                    cursor : "pointer"
                }}
                onClick={()=>{
                    listSchema({},(dt)=>{});
                    setProjectName("");
                    onClick({type : "upFolder"},{projectName : ""})
                }}
            >
                {" <-- ../"}
            </div>
            {schemalistArrE}
        </div>
    )


    
    let style={
        display : "inline-block",
        position  : "relative",
        background : "lightyellow",
        width : 350,
        height : 100, 
        //borderRadius : 8 ,
        overflow : "hidden",

        border : "solid thin black",
        borderRadius : 4,
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
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >
                <label
                    style={{
    
                    }}
                >schemas</label>               

            </div>  
    
            <div
                style={{
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                    overflow : "hidden"
                }}
            >            
                <div
                    style={{
                        width : 350,           
                        height : 68,           
                         overflow : "hidden"
                    }}
                >
                    <div
                        style={{
                            width : 350,           
                            height : 70,           
                            overflow : "auto"
                        }}
                    >
                        {schemalistE}

                    </div>
                    

                </div>

            </div>  


        </div>
    )

}

export const SchemasManageProject=(props)=>{ 
    let initC=useRef(true)

    //let [schemaName,setSchemaName]=useState("");
    //let [project,setProject]=useState("");

    
    let valueProjectName=""    
    if (props.valueProjectName){
        valueProjectName=props.valueProjectName
    }
    let valueSchemaName=""    
    if (props.valueSchemaName){
        valueSchemaName=props.valueSchemaName
    }

    let showParams={
        new : false,
        save : false,
        delete : false,
        desc : false,
        notes : false,
    }
    if (props.showParams){
        if (typeof(showParams)==="object"){
            if (Array.isArray(showParams)===false){
                showParams={...showParams,...props.showParams};
            }
        }
    }

    let onClickNew=()=>{}
    if ( typeof(props.onClickNew)==="function"){
        onClickNew=props.onClickNew
    }

    let onClickSave=()=>{}
    if ( typeof(props.onClickSave)==="function"){
        onClickSave=props.onClickSave
    }

    let onClickDelete=()=>{}
    if ( typeof(props.onClickDelete)==="function"){
        onClickDelete=props.onClickDelete
    }

    

    let onChangeSchemaName=()=>{}
    if ( typeof(props.onChangeSchemaName)==="function"){ 
        onChangeSchemaName=props.onChangeSchemaName
    }
    let onChangeProjectName=()=>{}
    if ( typeof(props.onChangeProjectName)==="function"){ 
        onChangeProjectName=props.onChangeProjectName
    }
    let onBlurSchemaName=()=>{}
    if ( typeof(props.onBlurSchemaName)==="function"){ 
        onBlurSchemaName=props.onBlurSchemaName
    }
    let onBlurProjectName=()=>{}
    if ( typeof(props.onBlurProjectName)==="function"){ 
        onBlurProjectName=props.onBlurProjectName
    }


    let valueDesc=""    
    if (props.valueDesc){
        valueDesc=props.valueDesc
    }
    let valueNotes=""    
    if (props.valueSchemaName){
        valueNotes=props.valueNotes
    }
    let onChangeDesc=()=>{}
    if ( typeof(props.onChangeDesc)==="function"){ 
        onChangeDesc=props.onChangeDesc
    }
    let onChangeNotes=()=>{}
    if ( typeof(props.onChangeNotes)==="function"){ 
        onChangeNotes=props.onChangeNotes
    }
    let onBlurDesc=()=>{}
    if ( typeof(props.onBlurDesc)==="function"){ 
        onBlurDesc=props.onBlurDesc
    }
    let onBlurNotes=()=>{}
    if ( typeof(props.onBlurNotes)==="function"){ 
        onBlurNotes=props.onBlurNotes
    }
    
    


    let style={
        display : "inline-block",
        position  : "relative",
        background : "lightyellow",
        width : 350,
        height : 100, 
        //borderRadius : 8 ,
        overflow : "hidden",

        border : "solid thin black",
        borderRadius : 4,
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
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >
                <label
                    style={{
    
                    }}
                >manage</label>

                <div
                    style={{
                        

                    }}
                >                    

                </div>

            </div>  
    
            <div
                style={{
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >            
                <div
                    style={{
                        height : 65,           
                        margin : 2,
                    }}
                >
                    
                    {(()=>{
                        if (showParams.new){
                            return (
                                <button
                                    style={{
                                        borderRadius : 4,
                                        marginLeft : 2,  
                                        height : 15,
                                        fontSize : 12,
                                    }}
            
                                    onClick={onClickNew}
                                >new</button>
                            );
                        }
                    })()}
                    
                    {(()=>{
                        if (showParams.save){
                            return (
                                <button
                                    style={{
                                        borderRadius : 4,
                                        marginLeft : 5,
                                        height : 15,
                                        fontSize : 12,
                                    }}
                                    
                                    onClick={onClickSave}
                                >save</button>
                            );
                        }
                    })()}
                    
                    {(()=>{
                        if (showParams.delete){
                            return (
                                <button
                                    style={{
                                        borderRadius : 4,
                                        marginLeft : 5,
                                        height : 15,
                                        fontSize : 12,
                                    }}
                                    
                                    onClick={onClickDelete}
                                >delete</button>
                            );
                        }
                    })()}


                    <br/>

                    {(()=>{
                        if (true){
                            return (
                                <input
                                    value={valueSchemaName}
                                    placeholder={"schema name"}
                                    style={{
                                        width : 150,
                                        height : 10,
                                        marginTop : 2,
                                        marginLeft : 5,
                                        fontSize : 12,
                                    }}
                                    
                                    onChange={onChangeSchemaName}
                                    onBlur={onBlurSchemaName}
                                />
                            );
                        }
                    })()}
                    
                    {(()=>{
                        if (true){
                            return (
                                <input
                                    value={valueProjectName}
                                    placeholder={"project name"}
                                    style={{
                                        width : 150,
                                        height : 10,
                                        marginTop : 2,
                                        marginLeft : 5,
                                        fontSize : 12,
                                    }}
                                    
                                    onChange={onChangeProjectName}
                                    onBlur={onBlurProjectName}
                                />
                            );
                        }
                    })()}

                    <br/>
                    {(()=>{
                        if (showParams.desc){
                            return (
                                <textarea
                                    value={valueDesc}
                                    placeholder={"description"}
                                    style={{
                                        width : 150,
                                        height : 20,
                                        marginTop : 2,
                                        marginLeft : 5,
                                        fontSize : 12,
                                    }}
                                    
                                    onChange={onChangeDesc}
                                    onBlur={onBlurDesc}
                                    
                                />
                            );
                        }
                    })()}
                    
                    {(()=>{
                        if (showParams.notes){
                            return (
                                <textarea
                                    value={valueNotes}
                                    placeholder={"notes"}
                                    style={{
                                        width : 150,
                                        height : 20,
                                        marginTop : 2,
                                        marginLeft : 5,
                                        fontSize : 12,
                                    }}
                                    
                                    onChange={onChangeNotes}
                                    onBlur={onBlurNotes}
                                />
                            );                            
                        }
                    })()}
                    

                </div>

            </div>  


        </div>
    )

}

export const ErrorCmpt=(props)=>{ 
    let initC=useRef(true)

    let [value,setValue]=useState("");



    useEffect(()=>{
        if (value!==props.value){
            if (props.value!==undefined){
                setValue(props.value);
            }
        }
    },[props.value]);

    useEffect(()=>{
        
    },[value]);

    if (value!==props.value){
        if (props.getValue){
            if ( typeof(props.getValue)==="function"){                
                props.getValue(value);
            }
        }
    }

    
    let style={
        display : "inline-block",
        position  : "relative",
        background : "lightyellow",
        width : 350,
        height : 100, 
        //borderRadius : 8 ,
        overflow : "hidden",
        verticalAlign : "top",
        border : "solid thin black",
        borderRadius : 4,
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
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >
                <label
                    style={{
    
                    }}
                >error</label>


            </div>  
    
            <div
                style={{
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >            
                <div
                    style={{
                        height : 65,           

                    }}
                >
                    {value}

                </div>

            </div>  


        </div>
    )

}


export const SchemaJsonTxtCmpt=(props)=>{ 
    //export const ExampleCmpt=(props)=>{ 
    let initC=useRef(true)
    
    let defValue=""
    if (props.value){
        defValue=props.value;
    }
    let [value,setValue]=useState(defValue);

    useEffect((nv , nv2)=>{        
        if (value!==props.value){
            if (props.value!==undefined){
                onChange({ target : { value : value }});
            }
        }
    },[value]);

    useEffect(()=>{
        if (value!==props.value){
            if (props.value!==undefined){
                setValue(props.value);
            }
        }
    },[props.value]);

    

    let onChange=()=>{}    
    if (props.onChange){
        if ( typeof(props.onChange)==="function"){                             
            onChange=props.onChange
        }
    }
    let onBlur=()=>{}    
    if (props.onBlur){
        if ( typeof(props.onBlur)==="function"){                            
            onBlur=props.onBlur
        }
    }
    

    /*
        if (value!==props.value){
            if (props.onChange){
                if ( typeof(props.onChange)==="function"){                
                    props.onChange(value);                    
                }
            }
        }
    */
    
    let title="Example";
    if (props.title){
        title=props.title;
    }
    

    
    let style={
        display : "inline-block",
        position  : "relative",
        background : "lightyellow",
        width : 400,
        height : 250, 
        //borderRadius : 8 ,
        overflow : "hidden",

        border : "solid thin black",
        borderRadius : 4,
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
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >
                <label
                    style={{
    
                    }}
                >{title}</label>

                <div
                    style={{
                        

                    }}
                >


                </div>

            </div>  
    
            <div
                style={{
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >            
                <div
                    style={{
                        height : 215,           
                        overflow : "hidden"
                    }}
                >
                    <textarea
                        value={value}
                        style={{
                            width : "100%",
                            height : "100%",

                            border: "none",
                            outline: "none",
                        }}

                        onChange={(e)=>{                                                                                    
                            setValue(e.target.value);                            
                        }}
                        onBlur={onBlur}
                    >

                    </textarea>

                </div>

            </div>  


        </div>
    )

}

export const ImportCmpt=(props)=>{ 
    //export const ExampleCmpt=(props)=>{ 
    let initC=useRef(true)
    
    let defValue=""
    if (props.value){
        defValue=props.value;
    }

    let csvTxtStateDef=""
    if (props.csvTxtState){
        csvTxtStateDef=props.csvTxtState;
    }
    
    let [csvTxtState,setCsvTxtState]=useState(csvTxtStateDef);
    let [value,setValue]=useState(defValue);
    let [convertToType,setConvertToType]=useState(defValue);
    let [csvTitleState,setCsvTitleState]=useState([]);
    


    let [csvJsnState,setCsvJsnState]=useState({});

    useEffect((nv , nv2)=>{        
        if (value!==props.value){
            if (props.value!==undefined){
                onChange({ target : { value : value }});
            }
        }
    },[value]);

    useEffect(()=>{
        if (value!==props.value){
            if (props.value!==undefined){
                setValue(props.value);
            }
        }
    },[props.value]);

    

    let onChange=()=>{}    
    if (props.onChange){
        if ( typeof(props.onChange)==="function"){                             
            onChange=props.onChange
        }
    }
    let onBlur=()=>{}    
    if (props.onBlur){
        if ( typeof(props.onBlur)==="function"){                            
            onBlur=props.onBlur
        }
    }
    

    let example1="{}"
    if (typeof(csvJsnState)==="object"){
        if (Array.isArray(csvJsnState)){
            let tmpO={};
            if (csvJsnState.length){
                if (Array.isArray(csvJsnState[0])){
                    

                    if (csvJsnState.length>1){
                        csvJsnState[0].forEach((p,i)=>{
                            tmpO[p]=csvJsnState[i];
                        })
                    }else{
                        csvJsnState[0].forEach((p,i)=>{
                            tmpO[p]="";
                        })
                    }
                    example1=JSON.stringify( tmpO , null,2);
                    

                }else{
                    example1=JSON.stringify( csvJsnState[0] , null,2);
                }

                
            }else{
                if (csvTitleState.length){
                    csvTitleState.forEach((p,i)=>{
                        tmpO[p]="";
                    })
                    example1=JSON.stringify( tmpO , null,2);
                }
            }           
        }else{
            example1=JSON.stringify( csvJsnState , null,2);
        }
    }


    /*
        if (value!==props.value){
            if (props.onChange){
                if ( typeof(props.onChange)==="function"){                
                    props.onChange(value);                    
                }
            }
        }
    */
    
    let title="Example";
    if (props.title){
        title=props.title;
    }
    

    
    let style={
        display : "inline-block",
        position  : "relative",
        background : "lightyellow",
        width : 1000,
        height : 260, 
        //borderRadius : 8 ,
        overflow : "hidden",

        border : "solid thin black",
        borderRadius : 4,
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
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >
                <label
                    style={{
    
                    }}
                >{title}</label>            
            </div>  
    
            <div
                style={{
                    display : "inline-block",
                    position : "relative",
                    margin : 4,
                    width : "19%",
                    background : "green",                    
                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >            
                <div
                    style={{
                        position : "relative",
                        height : 215,           
                        overflow : "hidden",
                        borderRadius : 4,
                    }}
                >
                    <textarea
                        value={csvTxtState}
                        style={{
                            position : "relative",
                            width : "100%",
                            height : "100%",

                            border: "none",
                            outline: "none",
                        }}

                        onChange={(e)=>{                                                                                   
                            setCsvTxtState(e.target.value);  
                            
                        
                        }}
                        onBlur={(e)=>{
                            let val=e.target.value;
                            /*
                                "abc","def"
                                1,3
                                4,5
                            */                           
                            //let records=val
                            //const dataRec = csvparseSync(val ,{ delimiter: ',' });                           
                            //console.log( "csvparseSync : ",dataRec);
                            //console.log( "csvparse : ",csvparse);

                            
                            let csvOptions={
                                delimiter: ',',
                                columns: true,  // json output
                                //columns: false, // changes between json output or column of arrarys
                                skip_empty_lines: true ,
                            }

                            if (convertToType==="tsv"){
                                csvOptions.delimiter="\t";
                            }

                            csvparse(val ,csvOptions ,(err, data) => {
                                if (err){
                                    //alert(err.message);
                                    return;
                                }
                                

                                setCsvJsnState(data);
                                onBlur(e);
                            });


                            let csvOptionsTitle={
                                delimiter: ',',
                                //columns: true,  // json output
                                columns: false, // changes between json output or column of arrarys
                                skip_empty_lines: true ,
                            }
                            if (convertToType==="tsv"){
                                csvOptionsTitle.delimiter="\t";
                            }
                            csvparse(val ,csvOptionsTitle ,(err, data) => {
                                if (err){
                                    alert(err.message);
                                    return;
                                }                                
                                if (data.length){

                                    setCsvTitleState(data[0]);
                                }
                                
                            });
                            
                        }
                            
                        }
                    >

                    </textarea>

                </div>

            </div>  


            <div
                style={{
                    display : "inline-block",
                    position : "relative",
                    margin : 4,
                    width : "19%",
                    background : "lightblue",                    
                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >            
                <div
                    style={{
                        position : "relative",
                        height : 215,           
                        overflow : "hidden",
                        borderRadius : 4,
                    }}
                >
                    <pre
                        style={{
                            textAlign : "left",
                        }}
                    >
                        {JSON.stringify(csvTitleState,null,2)}

                        {JSON.stringify(csvJsnState,null,2)}
                        
                    </pre>
                </div>

            </div> 


            <div
                style={{
                    display : "inline-block",
                    position : "relative",
                    width : 100,
                    background : "white",  
                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >
                 <div
                    style={{
                        position : "relative",
                        height : 215,           
                        overflow : "hidden",
                        borderRadius : 4,
                    }}
                >
                    <label>from</label>
                    <select
                        onChange={(e)=>{
                            setConvertToType(e.target.value)
                        }}
                        value={convertToType}
                    >
                        <option
                            value={"csv"}
                        >
                            {"CSV"}
                        </option>
                        <option
                            value={"tsv"}
                        >
                            {"TSV"}
                        </option>
                        <option
                            value={"schema"}
                        >
                            {"schema"}
                        </option>
                    </select>

                    

                </div>

            </div> 



            <div
                style={{
                    display : "inline-block",
                    position : "relative",
                    margin : 4,
                    width : "19%",
                    background : "lightgreen",                    
                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >            
                <div
                    style={{
                        position : "relative",
                        height : 215,           
                        overflow : "hidden",
                        borderRadius : 4,
                    }}
                >
                    <pre
                        style={{
                            textAlign : "left"
                        }}
                    >
                        {example1}
                    </pre>

                </div>

            </div>  
            
            <div
                style={{
                    display : "inline-block",
                    position : "relative",
                    margin : 4,
                    width : "19%",
                    background : "green",                    
                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >            
                <div
                    style={{
                        position : "relative",
                        height : 215,           
                        overflow : "hidden",
                        borderRadius : 4,
                    }}
                >
                    <textarea
                        value={value}
                        style={{
                            position : "relative",
                            width : "100%",
                            height : "100%",

                            border: "none",
                            outline: "none",
                        }}

                        onChange={(e)=>{                                                                                    
                            setValue(e.target.value);                            
                        }}
                        onBlur={onBlur}
                    >

                    </textarea>

                </div>

            </div>  



        </div>
    )

}


export const SubSchemasList=(props)=>{ 
    let initC=useRef(true)

    let defSchema={
        subSchema : {}
    }
    if (props.schema){
        defSchema={...props.schema}
    }

    let [value,setValue]=useState("");    
    
    let [schema,setSchema]=useState(defSchema);
    let [currSchema,setCurrSchema]=useState("");


    let [nameTxt,setNameTxt]=useState("__vw__main");




    useEffect(()=>{
        if (JSON.stringify(schema)!==JSON.stringify(props.schema)){
            if (props.schema!==undefined){
                setSchema(props.schema);
            }
        }
    },[props.schema]);

    //schema
    //onClick

    useEffect(()=>{
        if (value!==props.value){
            if (props.value!==undefined){
                setValue(props.value);
            }
        }
    },[props.value]);

    useEffect(()=>{
        
    },[value]);

    if (value!==props.value){
        if (props.getValue){
            if ( typeof(props.getValue)==="function"){                
                props.getValue(value);
            }
        }
    }

    let onClick=()=>{}
    if (props.onClick){
        if (typeof(props.onClick)==="function"){
            onClick=props.onClick
        }
    }
    let onChange=()=>{}
    if (props.onChange){
        if (typeof(props.onChange)==="function"){
            onChange=props.onChange
        }
    }

    let onClickDelete=()=>{}
    if (props.onClickDelete){
        if (typeof(props.onClickDelete)==="function"){
            onClickDelete=props.onClickDelete
        }
    }
    // ---------------------------------

    let nameTxtBoxE;
    nameTxtBoxE=(()=>{
        let E

        return (
            <div
                style={{
                    //width : 200, 
                    //display : "inline-block"
                    padding : 4
                }}
            >
                <input
                    style={{
                        width : 130
                    }}
                    value={nameTxt}
                    onChange={(e)=>{
                        setNameTxt(e.target.value);
                    }}
                />
                <button
                    style={{
                            
                    }}
                    onClick={()=>{
                        setNameTxt("")
                    }}
                >clear</button>
            </div>
        )
    })();

    let newSchema
    newSchema=(()=>{
        let E

        return (
            <button
                onClick={()=>{
                    let nr={...schemaSubDef};
                    nr.name=nameTxt.trim();
                    let useme=true;
                    if (schema.subSchema[nr.name]===undefined){
                        useme=true;
                    }else{
                        useme=false;
                    }

                    if (nameTxt==="__vw__main"){
                        useme=false;
                    }
                    if (nameTxt===""){
                        useme=false;
                    }



                    if (useme){                      
                        let nr2={...schema.subSchema}  
                        nr2[nr.name]=nr;
                        let tmp_schema={...schema};
                        tmp_schema.subSchema=nr2;
                        setSchema(tmp_schema);
                        onChange( { type : "newrec" , name : nr.name , rec : nr2[nr.name],  subSchema : tmp_schema.subSchema });
                    }
                }}
            >
                new
            </button>
        )
    })();

    let delSchema
    delSchema=(()=>{
        let E

        return (
            <button
                onClick={()=>{
                    let tmpSchema={...schema};
                    let updateme=false;
                    let name=currSchema;
                    let deletedRec={}
                    for (let p in tmpSchema.subSchema){
                        if ( p!=="__vw__main" ){
                            if (p===currSchema){
                                deletedRec=JSON.parse(JSON.stringify(tmpSchema.subSchema[p]))
                                delete tmpSchema.subSchema[p];
                                updateme=true;
                            }
                        }
                    }

                    if (updateme){
                        setSchema(tmpSchema)
                        onClickDelete({ type : "delrec" , name : name , subSchema : tmpSchema.subSchema , updateme : updateme  , deletedRec : deletedRec});
                    }

                }}
            >
                del
            </button>
        )
    })();

    


    let schemaListE
    schemaListE=(()=>{
        let E
        let arrE=[]

        let tmpOnClick=(p)=>{
            setCurrSchema(p);
            setNameTxt(p);
            onClick({name : p});
        }

        let listStyle={
            borderBottom : "thin solid grey",
            cursor : "pointer",
        }

        let p="__vw__main";

        let nliststyle={...listStyle}        
        if (p===currSchema){
            nliststyle.background="yellow";
        }

        arrE.push(
           
            <div
                key={p}
                style={nliststyle}
                onClick={()=>{
                
                    tmpOnClick(p);
               }}
            >
                {p}
            </div>
        );

        if (schema.subSchema){
            for (let p in schema.subSchema){
                let nliststyle={...listStyle}
                if (p===currSchema){
                    nliststyle.background="yellow";
                }

                let r=schema.subSchema[p];
                arrE.push(
                    <div
                       key={p}
                       style={nliststyle}
                       onClick={()=>{
                            tmpOnClick(p);
                       }}
                    >
                         {r.name}
                    </div>
                )
            }
        }

        E=(
                <div
                    style={{
                        background : "lightblue",
                        //width : 100,
                        //height : 100,
                        height : "100%",
                        
                    }}
                    onClick={()=>{
                        //alert(JSON.stringify(schema.subSchema, null ,2))
                    }}
                >
                    {arrE}
                </div>

        )

        return E;
    })();

    // ---------------------------------

    
    let style={
        display : "inline-block",
        position  : "relative",
        background : "lightyellow",
        width : 200,
        height : 200, 
        //borderRadius : 8 ,
        overflow : "hidden",
        verticalAlign : "top",
        border : "solid thin black",
        borderRadius : 4,
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
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >
                <label
                    style={{
    
                    }}
                >Sub Schemas</label>
            </div>  
    
            <div
                style={{
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >            
                <div
                    style={{
                        height : 165,           
                        overflow : "hidden",
                    }}
                >
                    {nameTxtBoxE}
                    <div
                    
                    >
                        {newSchema}
                        {delSchema}
                    </div>
                    {schemaListE}
                </div>

            </div>  


        </div>
    )

}

export const DefaultRecord=(props)=>{ 
    let initC=useRef(true)

    let valueDef=""
    if (props.value){
        valueDef=props.value;
    }
    let [value,setValue]=useState(valueDef);

    

    useEffect(()=>{
        if (value!==props.value){
            if (props.value!==undefined){
                setValue(props.value);
            }
        }
    },[props.value]);

    useEffect(()=>{
        
    },[value]);

    if (value!==props.value){
        if (props.getValue){
            if ( typeof(props.getValue)==="function"){                
                props.getValue(value);
            }
        }
    }

    
    let style={
        display : "inline-block",
        position  : "relative",
        background : "lightyellow",
        width : 200,
        height : 200, 
        //borderRadius : 8 ,
        overflow : "hidden",
        verticalAlign : "top",
        border : "solid thin black",
        borderRadius : 4,
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
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >
                <label
                    style={{
    
                    }}
                >Default Record</label>
            </div>  
    
            <div
                style={{
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                    overflow : "hidden",
                    height : 165,          
                }}
            >            
                <div
                    style={{
                        height : 162,           
                        padding : 10,
                        overflow : "auto",
                    }}
                >
                    <pre
                        style={{
                            textAlign : "left",
                        }}
                    >
                        {value}
                    </pre>

                </div>

            </div>  


        </div>
    )

}
export const DetailsCmpt=(props)=>{ 
    let initC=useRef(true)

    let [value,setValue]=useState("");

    let currentSubSchema=""
    if (props.current){
        currentSubSchema=props.current;
    }

    useEffect(()=>{
        if (value!==props.value){
            if (props.value!==undefined){
                setValue(props.value);
            }
        }
    },[props.value]);

    useEffect(()=>{
        
    },[value]);

    if (value!==props.value){
        if (props.getValue){
            if ( typeof(props.getValue)==="function"){                
                props.getValue(value);
            }
        }
    }




    
    let style={
        display : "inline-block",
        position  : "relative",
        background : "lightyellow",
        width : 200,
        height : 200, 
        //borderRadius : 8 ,
        overflow : "hidden",
        verticalAlign : "top",
        border : "solid thin black",
        borderRadius : 4,
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
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >
                <label
                    style={{
    
                    }}
                >Details</label>


            </div>  
    
            <div
                style={{
                    margin : 4,
                    background : "white",

                    border : "solid thin black",
                    borderRadius : 4,
                }}
            >            
                <div
                    style={{
                        height : 165,           

                    }}
                >
                    curr : {currentSubSchema}

                </div>

            </div>  


        </div>
    )

}


export const Schemas=(props)=>{ 
    let initC=useRef(true)

    let [schemaName,setSchemaName]=useState("");
    let [projectName,setProjectName]=useState("");
    let [descTxt,setDescTxt]=useState("");
    let [notesTxt,setNotesTxt]=useState("");
    


    let [schemaRec,setSchemaRec]=useState({...schemaDef});
    let [schemaSubRec,setSchemaSubRec]=useState({...schemaSubDef});

    let [exampleBoxTxt,setExampleBoxTxt]=useState("{\n\n}");
    let [schemaBoxTxt,setSchemaBoxTxt]=useState(JSON.stringify(schemaDef,null,2));

    let [exampleBoxTxtSub,setExampleBoxTxtSub]=useState("{\n\n}");
    let [schemaBoxTxtSub,setSchemaBoxTxtSub]=useState(JSON.stringify(schemaSubDef,null,2));

    let [currentSchemaSub,setCurrentSchemaSub]=useState("__vw__main");
    
    let [errorMain,setErrorMain]=useState("");
    let [errorMain2,setErrorMain2]=useState("");

    
    let [defaultRecTxt,setDefaultRecTxt]=useState("");



    
    let [updateProjectList,setUpdateProjectList]=useState(new Date());

    
    //let [listSchemaData,setListSchemaData]=useState([]);
    let currentSchemaSubPrevRef=useRef("");


    
    // ---------------------
        let forceSetUpdateProjectList=()=>{
            setUpdateProjectList(new Date());
        }
    // --------------------

    let newSchema=(...args)=>{

        setSchemaRec({...schemaDef})
        setSchemaSubRec({...schemaSubDef});
        
        setSchemaName("");
        setProjectName("");
        setDescTxt("");
        setNotesTxt("");

        setExampleBoxTxt("{\n\n}");
        setSchemaBoxTxt(JSON.stringify(schemaDef,null,2));         

        setExampleBoxTxtSub("{\n\n}");
        setSchemaBoxTxtSub(JSON.stringify(schemaSubDef,null,2));
        
        setCurrentSchemaSub("__vw__main");
    }

    // -------------------------------------------------

    

    let updateSchemaRecSetState=(...args)=>{ // same updateSchemaRec, except we setState with this one while the other is general and reusable 
        let retRec=updateSchemaRec.apply(this,args);
        let cb

        if (args.length){

            if ( typeof(args[0])==="function" ){
                cb=args[0];
            }

            if (args.length>1){
                if ( typeof(args[1])==="function" ){
                    cb=args[1];
                }
                
            }            
        }

        if (typeof(cb)==="function"){
            cb(retRec);
        }

        if (retRec.error!==""){
            setErrorMain(retRec.error)
        }else{
            setSchemaRec(retRec.schema);
            setSchemaBoxTxt(JSON.stringify(retRec.schema,null,2));
            let tmpDefaultRecTxt=""
            if (retRec.name){
                if (retRec.name!==""){
                    let name=retRec.name
                    if (schemaRec.subSchema){
                        if (schemaRec.subSchema[name]){
                            let tmpSubScehmaRec=schemaRec.subSchema[name];
                            tmpDefaultRecTxt=JSON.stringify(tmpSubScehmaRec.defaultRec,null,2);
                        }else{
                            if (name==="__vw__main"){
                                //tmpSubScehmaRec=schemaRec.schema;

                                tmpDefaultRecTxt=JSON.stringify(retRec.schema.defaultRec,null,2);

                            }
                        }
                    }
                }
            }else{
                tmpDefaultRecTxt=JSON.stringify(retRec.schema.defaultRec,null,2);
            }
            setDefaultRecTxt(tmpDefaultRecTxt);

        }
        

        

        return retRec;

    }


    let updateErrorMain1=(message, params)=>{
        setErrorMain(message);
    }
    let updateErrorMain2=(message, params)=>{
        setErrorMain2(message);
    }

    // -------------------------------------------------

    let style={
        // display : "block",
        position  : "relative",
        background : "white",
        width : 1200,
        height : 300, 
        borderRadius : 8 ,
        overflow : "hidden",
        padding : 5,

    }
    if (props.style){
        style={...style,...props.style}
    }

    let styleSubMain={
        border : "solid thin lightgrey",
        margin : 6,
        borderRadius : 5,
        //overflow : "hidden",
        
        overflow : "auto",
    }

    let styleSubMainFrame={
        
        width : "99%",
        borderRadius : 5,
        overflow : "hidden",
        borderRadius : 5, 
    }
    
    if (typeof(style.height)==="number"){
        styleSubMain.height = style.height - 10;
    }
    if (typeof(style.width)==="number"){
        styleSubMain.width = style.width - 10;
    }


    if (props.params){
        if (props.params.allActive){
            style.height=800;

            styleSubMain.height=780;
            //styleSubMain.overflow="auto";

            //styleSubMainFrame.width="99%";

            styleSubMainFrame.height=785;
            
            styleSubMainFrame.borderRadius=5;
            //styleSubMainFrame.overflow="hidden";
            
            //styleSubMainFrame.border="solid thin lightgrey";
            //styleSubMainFrame.margin=6;

        }
    }

    return (
        <div
             style={style}
        > 

            <div
                 style={styleSubMainFrame}
            > 
                <div
                    style={styleSubMain}
                > 

                    <SchemasListLoad
                        updateProjectList={updateProjectList}
                        onClick={(dt)=>{
                            //alert(JSON.stringify(dt))
                        }}
                        onLoad={(dt, extra)=>{
                            //alert(JSON.stringify(dt))
                            
                            if (typeof(dt)!=="object"){
                                alert("schema parse error");
                                return;
                            };

                            let name=extra.schemaName.replace( /\.json/ ,"" )
                            setSchemaName(name);
                            setProjectName(extra.projectName);
                            setSchemaRec(dt);
                            setSchemaBoxTxt(JSON.stringify(dt,null,2));
                            setExampleBoxTxt(dt.example);
                            //alert(JSON.stringify(extra));
                            
                            
                        }}
                        onChangeProjectName={(dt)=>{
                            //alert(JSON.stringify(dt))
                        }}
                    />
                    <SchemasManageProject  
                        valueSchemaName={schemaName}
                        valueProjectName={projectName}

                        showParams={{
                            new : true,
                            save : true,
                            delete : true,
                            desc : true,
                            notes : true,
                        }}

                        onChangeSchemaName={(e)=>{
                            setSchemaName(e.target.value)
                        }}

                        onChangeProjectName={(e)=>{
                            setProjectName(e.target.value)
                        }}

                        onClickSave={()=>{
                            let nd=schemaRec //parseExampleTxt(exampleBoxTxt);
                            nd.name=schemaName.replace(/ / ,"");
                            saveSchemaBE( { name : nd.name , schema :  schemaRec , project : projectName.replace(/ / ,"")  } , ()=>{
                                //listSchema()
                                forceSetUpdateProjectList();
                                    
                            });
                        }}

                        onClickDelete={()=>{                                                        
                            deleteSchemaBE( { name : schemaName , project : projectName } , ()=>{
                                //listSchema()
                                forceSetUpdateProjectList();
                                    
                            });
                        }}

                        onClickNew={()=>{
                            newSchema();
                        }}
                    />
                    <div
                        style={{
                            //background : "lightgrey",
                            //padding : 20,
                        }}
                    >
                        <SchemaJsonTxtCmpt
                            key={"Example"}
                            title={"Example"}
                            value={exampleBoxTxt}

                            onFocus={()=>{
                                setCurrentSchemaSub("__vw__main");
                                
                            }}

                            onChange={(e)=>{ 
                                setExampleBoxTxt(e.target.value)
                            }}
                            onBlur={(e)=>{
                                let updateme=false;
                                let newRec={}
                                try{
                                    newRec=JSON.parse(e.target.value);
                                    updateme=true;
                                    updateErrorMain1("");
                                }catch(e){
                                    //alert(e);
                                    updateErrorMain1(e.message);
                                } 
                                if (updateme){
                                    //updateSchemaRec(newRec);
                                    //updateSchemaRec();
                                    updateSchemaRecSetState({schemaTxt : exampleBoxTxt, schemaRec : schemaRec})
                                }
                            }}
                        />
                        
                        <SchemaJsonTxtCmpt
                            key={"Schema-Json"}
                            title={"Schema Json"}
                            value={schemaBoxTxt}

                            onFocus={()=>{
                                setCurrentSchemaSub("__vw__main");
                                
                            }}

                            onChange={(e)=>{
                                if (e.target.value!==schemaBoxTxt){
                                    setSchemaBoxTxt(e.target.value);
                                }
                            }}
                            onBlur={(e)=>{
                                let newJson={}
                                let useme=true;
                                try{
                                    newJson=JSON.parse(e.target.value);
                                }catch(err){
                                    setErrorMain(err.message);
                                    useme=false;
                                }
                                if (useme){
                                    if (JSON.stringify(schemaRec)!==JSON.stringify(newJson)){ // only update if they are different
                                        let example=newJson.example;
                                        let newExampleJson={}
                                        if (newJson.schema){ // truing to update backwords into example text however updating schema json text to cross update the example text , is  cyclic, so need to figure out another way , maybe keeping a cross link reference as a 3rd hidden table/db.                                         
                                            //for (let p in newJson.schema){
                                                //newExampleJson[p]=newJson.schema[p].exampleVal;

                                            //}
                                            
                                            //example=JSON.stringify(newExampleJson,null,2);
                                        }
                                        setSchemaRec(newJson)                                        
                                        setExampleBoxTxt(example);
                                    }
                                }
                            }}
                        />

                        <ErrorCmpt 
                            value={errorMain}
                        />

                        <br/>
                        <SubSchemasList
                            schema={schemaRec}
                            onClick={(rec)=>{
                                let name=rec.name;
                                let tmpSubScehmaRec={}
                                let tmpDefaultRecTxt=""
                                //let getSchemaSub(name);
                                if (schemaRec.subSchema){
                                    if (schemaRec.subSchema[name]){
                                        tmpSubScehmaRec=schemaRec.subSchema[name];
                                        tmpDefaultRecTxt=JSON.stringify(tmpSubScehmaRec.defaultRec,null,2)
                                    }else{
                                        if (name==="__vw__main"){
                                            //tmpSubScehmaRec=schemaRec.schema;

                                            tmpDefaultRecTxt=JSON.stringify(schemaRec.defaultRec,null,2)

                                        }
                                    }
                                }

                                setCurrentSchemaSub(name);
                                setSchemaBoxTxtSub(JSON.stringify(tmpSubScehmaRec,null,2));
                                setDefaultRecTxt(tmpDefaultRecTxt);
                            }}
                            onChange={(rec)=>{
                                if (rec.type==="newrec"){
                                    let name=rec.name;
                                    let tmpSchema={...schemaRec}
                                    tmpSchema.subSchema[name]={...rec.rec};
                                    
                                    //updateSchemaRec({ name : name , subSchemaTxt : rec.rec.example});
                                    setSchemaBoxTxt(JSON.stringify(tmpSchema,null,2));
                                    setSchemaRec(tmpSchema);                                    
                                }
                                
                                
                            }}

                            onClickDelete={(rec)=>{
                                if (rec.type==="delrec"){
                                    if (rec.updateme){
                                        let schemaRecTmp={...schemaRec};
                                        schemaRecTmp.subSchema=rec.subSchema
                                        setSchemaRec(schemaRecTmp);
                                        setSchemaBoxTxt(JSON.stringify(schemaRecTmp,null,2));
                                    }
                                }
                            }}
                        
                        />
                        <DefaultRecord
                            value={defaultRecTxt}
                        />
                        <DetailsCmpt
                            current={currentSchemaSub}
                        
                        />

                        <br/>
                        <SchemaJsonTxtCmpt
                            
                            title={"Sub-Example"}
                            value={exampleBoxTxtSub}

                            onFocus={()=>{
                                let name=JSON.parse(schemaBoxTxtSub).name;
                                if (name!==""){
                                    setCurrentSchemaSub(name );
                                }
                                
                            }}

                            onChange={(e)=>{ 
                                setExampleBoxTxtSub(e.target.value)
                            }}
                            onBlur={(e)=>{
                                let updateme=false;
                                try{
                                    JSON.parse(e.target.value);
                                    updateme=true;
                                    updateErrorMain2("");
                                }catch(e){
                                    //alert(e);
                                    updateErrorMain2(e.message);
                                } 
                                if (updateme){
                                    //updateSchemaRec( { });
                                    let name=JSON.parse(schemaBoxTxtSub).name;
                                    if (name!==""){
                                        //updateSchemaRec({ name : name , subSchemaTxt : e.target.value});
                                        updateSchemaRecSetState({ name : name , subSchemaTxt : e.target.value ,schemaRec : schemaRec},(nrec)=>{
                                            if (nrec.hasSchemaSub){
                                                setSchemaBoxTxtSub( JSON.stringify(nrec.schemaSub,null,2) );
                                            }
                                        });
                                    }else{
                                        updateErrorMain2("no sub schema name select");
                                    }
                                }
                            }}

                        />
                        
                        <SchemaJsonTxtCmpt
                            title={"Sub-Schema Json"}
                            value={schemaBoxTxtSub}

                            onFocus={()=>{
                                let name=JSON.parse(schemaBoxTxtSub).name;
                                if (name!==""){
                                    setCurrentSchemaSub(name );
                                }
                                
                            }}


                            onChange={(e)=>{
                                setSchemaBoxTxtSub(e.target.value)
                            }}
                            
                        />

                        <ErrorCmpt 
                            value={errorMain2}
                        />

                        <br/>
                        
                        <ImportCmpt
                            title={"Imports"}
                        
                         />

                    </div>           

                    {/* --------------------------------------------------------------------------  */}

                    {/*
                        <div
                            style={{
                                background : "lightgrey",
                                padding : 20,
                            }}
                        >
                            <h4>old</h4>
                            <SchemasOld/>
                        </div>
                    */}
                </div>
                
            </div>

        </div>
    )

}


