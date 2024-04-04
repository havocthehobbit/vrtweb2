import React,{ useEffect , useState,useRef, useContext } from 'react'
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { saveSchemaBE,listSchemaBE,loadSchemaBE } from './libs/backend';


//let feach=$cn.each
let tof=$cn.tof;
//let isUn=$cn.isUn
let isOb=$cn.isOb
//let cl=$cn.l



export const Schemas=(props)=>{ 

    let initC=useRef(true)

    let [schemaName,setSchemaName]=useState("");
    let [project,setProject]=useState("");
    let [exampleTxt,setExampleTxt]=useState("{}");
    let [exampleJsn,setExampleJsn]=useState({});

    let schemaDef={ name :"" ,version : "0",main : {} , subs : {} , desc : "" , notes : "" , keys : {} ,idx : {}  }
    let [schema,setSchema]=useState({...schemaDef});
    let [schemaTxt,setSchemaTxt]=useState(JSON.stringify(schemaDef,null,2));

    let [descTxt,setDescTxt]=useState("");
    let [notesTxt,setNotesTxt]=useState("");

    // list
    let [listSchemaData,setListSchemaData]=useState([]);
    
    //
    let [errorMain,setErrorMain]=useState("");

    
    
    
    // -----------------------------------------
        useEffect(()=>{
            if (initC.current){
                initC.current=false;

                listSchema() 
            }        
        },[]);

        useEffect(()=>{
            
            let tmp=parseExampleTxt(exampleJsn)
            
            //let schemtmp={...schema}
            

            setSchema(tmp);
            setSchemaTxt(JSON.stringify(tmp,null,2));

        },[exampleJsn]);
    
    // -----------------------------------------

        let schemaValRec={
            "name" : "",
            "type" : "",
            "desc" : "",
            "subSchema" : "",
            "rules" : [],
            "keys" : [],
            "exampleVal" : "",
            "recalc" : true,
        }

    // -----------------------------------------


        let parseExampleTxt=(inp)=>{
            let recTmp=()=>{

            }
            let main={}
            let subs={}

            let schematmp=JSON.parse(JSON.stringify(schema))

            for (let p in inp){
                let nr={...schemaValRec}


                main[p]=nr;

                nr.name=p;

                //let schemaExistsVar=false;
                //if (schema[p]){ // should be schema.main[p]
                //    schemaExistsVar=true;
                //}

                let foundType=false
                if (typeof(inp[p])==="string"){
                    foundType=true
                    nr.exampleVal=inp[p];
                    nr.type="string";
                }

                if (typeof(inp[p])==="number"){
                    foundType=true
                    nr.exampleVal=inp[p];
                    nr.type="number";
                }

                if (typeof(inp[p])==="object"){
                    foundType=true
                    nr.exampleVal=JSON.stringify(inp[p]);

                    if (Array.isArray(inp[p])){
                        nr.type="array";
                    }else{
                        nr.type="object";
                    }

                }


                if (foundType===false){
                    nr.exampleVal=inp[p];
                }

            }


            schematmp.name=schemaName;
            schematmp.main=main;
            schematmp.subs=subs;
            schematmp.example=exampleTxt;
            schematmp.defaultRec={};
            schematmp.desc=descTxt;
            schematmp.notes=notesTxt;
            schematmp.keys={};
            schematmp.idx={};

            
            

            return schematmp
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

        let listSchemaE=(()=>{
            let arrE=[]

            listSchemaData.forEach((r,i)=>{
                let name=r.name.replace(".json", "")
                arrE.push(
                    <div
                        key={i}
                        rname={name}
                        style={{
                            cursor : "pointer",
                        }}
                        onClick={(e)=>{
                            let val=e.target.getAttribute("rname");
                            loadSchema({ name : val ,project : project },(dt)=>{
                                
                                loadedSchemaDataSetState(dt)
                            })
                        }}
                    >
                        {name}

                    </div>
                )

            })

            return (
                <div
                    style={{
                        position : "relative",
                        
                        width : 300,
                        height : 100,
                        overflow : "hidden",
                    }}
                >
                    <div
                        style={{
                            position : "relative",
                            border :"black solid thin",
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
                <h1
                    style={{
                        color : "black"
                    }}
                >Schemas</h1>


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
                
                
                
                                
                <br/>

                {listSchemaE}

                <div
                    style={{
                        float : "left",
                    }}
                >
                    <label>example{"1"}</label>
                    <br/>
                    <textarea 
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


                <div style={{ clear : "left" }} />




                <div style={{ clear : "left" }} />
            </div>
        </div>
    )

}