import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { CustomHook } from "./reactCmpt/customHook";
import { CustomAPI } from "./API/customAPI";
import { CustomDbAPI } from "./API/customDB";

import { SchemasListLoad } from "../schemas/schema";

import { saveCmptDataGenBE,listCmptDataGenBE,loadCmptDataGenBE } from './libs/backend';


// useHook : ret- hook;string ,cmpt;string 

export const Cmpt=(props)=>{
    let initC=useRef(true)
    

    let [customHookShowHide, setCustomHookShowHide]=useState(false)
    let [customAPIShowHide, setCustomAPIShowHide]=useState(false)
    let [customDBShowHide, setCustomDBShowHide]=useState(false)

    // ---------------------------------  

    let [currentSchemaData, setCurrentSchemaData]=useState({})

    

    // ---------------------------------   
    let [cmptDataGenName, setCmptDataGenName]=useState("")
    let [cmptDataGenNameTxt, setCmptDataGenNameTxt]=useState("")
    
    let [project,setProject]=useState("");

    let cmptDataGenDef={ "name" :"" ,"version" : "0","data" : {} ,"type" : " " , "types" : [], "subSchema" : {} , "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}" }
    let cmptDataGenSubDef={ "name" :"" ,"data" : {}  ,"types" : " " , "type" : [], "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}","linked" : false, "link" : { "path"  : "" , "name" : "" } }
    
    let [descTxt,setDescTxt]=useState("");
    let [notesTxt,setNotesTxt]=useState("");

    let [cmptDataGen,setCmptDataGen]=useState({...cmptDataGenDef});
    let [cmptDataGenTxt,setCmptDataGenTxt]=useState(JSON.stringify(cmptDataGenDef,null,2));
    
    let [schemaSubCmptDataGen,setCmptDataGenSubCmptDataGen]=useState({...cmptDataGenSubDef});
    let [schemaTxtSubCmptDataGen,setSchemaTxtSubCmptDataGen]=useState(JSON.stringify(cmptDataGenSubDef,null,2));

    
    let [cmptDataGenJsn,setCmptDataGenJsn]=useState({});


    let [errorMain,setErrorMain]=useState("");
    let [errorMainSubCmptDataGen,setErrorMainSubCmptDataGen]=useState("");

    let [listCmptDataGenData,setListCmptDataGenData]=useState([]); 

    let [currentProp,setCurrentProp]=useState("");
    let [currentCmptDataGenSub,setCurrentSchemaSub]=useState("__vw__main");
    let [currentCmptDataGenSubTxt,setCurrentSchemaSubTxt]=useState("__vw__main");

    
    let currentCmptDataGenSubPrevRef=useRef("");


    // --------------------------------
    
    useEffect(()=>{
        if (initC.current){
            initC.current=false;

            listCmptDataGen() 
        }        
    },[]);



    // --------------------------------

    let listCmptDataGen=(...args)=>{
            
        listCmptDataGenBE(args[0],(dt)=>{
           
            
            let ndt=[]
            if (dt.data){
                if (dt.data.all){
                    ndt=dt.data.all;
                }
            }

            if (args.length===1 || args.length===0 ){
                setListCmptDataGenData(ndt);
                
            }
            if (args.length===2){
                args[1](dt)
            }
        });            
            
    }

    
    let loadCmptDataGen=(...args)=>{
        loadCmptDataGenBE(args[0],(dt)=>{

            
            
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

    let newCmptDataGen=(...args)=>{

        setCmptDataGen({...cmptDataGenDef})
        
        setCmptDataGenName("");
        setProject("");
       
        setCmptDataGenTxt(JSON.stringify(cmptDataGenDef,null,2));

        setDescTxt("");
        setNotesTxt("");
    }


    let loadedCmptDataGenDataSetState=(...args)=>{
        let data={...cmptDataGen}

        if (args[0]){
            if (args[0].data){
                data={...data,...args[0].data}
            }
        }
       

        setCmptDataGen(data);
        
        setCmptDataGenName(data.name);
       
        //setExampleTxt(data.example);
        //setExampleJsn(JSON.parse(data.example));
        setCmptDataGenTxt(JSON.stringify(data,null,2));

        setDescTxt(data.desc);
        setNotesTxt(data.notes);
        
    }



    // --------------------------------

    let listCmptDataGenE=(()=>{
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
                    setTimeout(listCmptDataGen({project : project}),1500 );
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

        listCmptDataGenData.forEach((r,i)=>{
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
                            loadCmptDataGen({ name : rname ,project : project },(dt)=>{                                    
                                loadedCmptDataGenDataSetState(dt)                                    
                            })
                        }else{
                            setProject(rname)
                            setTimeout(listCmptDataGen({project : project}),1500 )
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
                load
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


    // --------------------------------


    let style={
        position  : "relative",
        background : "white",
        width : 1200,
        height : 600, 
        borderRadius : 8 ,
        overflow : "hidden",

    }
    if (props.style){
        style={...style,...props.style}
    }

    let customHookShowHideContCss={position : "relative",}
    let customHookShowHideButtonCss={}
    let customHookShowHideCSS={ display : "none"}
    if (customHookShowHide){        
        customHookShowHideButtonCss.background="darkgrey";
        customHookShowHideCSS.display="block";
    }
    
    let customAPIShowHideContCss={position : "relative",}
    let customAPIShowHideButtonCss={}
    let customAPIShowHideCSS={ display : "none"}
    if (customAPIShowHide){
        customAPIShowHideButtonCss.background="darkgrey";
        customAPIShowHideCSS.display="block"
    }
    
    let customDBShowHideContCss={position : "relative",}
    let customDBShowHideButtonCss={}
    let customDBShowHideCSS={ display : "none"}
    if (customDBShowHide){
        customDBShowHideButtonCss.background="darkgrey";
        customDBShowHideCSS.display="block"
    }
    

    return (
        <div
            style={style}
        >

            <div
                style={{}}
            >
                Component Data generator
                <br/>
                <button 
                    style={customHookShowHideButtonCss}
                    onClick={()=>{
                        setCustomHookShowHide(!customHookShowHide);
                    }}
                >show/hide CustomHook</button>
                <button 
                    style={customAPIShowHideButtonCss}
                    onClick={()=>{
                        setCustomAPIShowHide(!customAPIShowHide);
                    }}
                >show/hide CustomAPI</button>  
                <button 
                    style={customDBShowHideButtonCss}

                    onClick={()=>{
                        setCustomDBShowHide(!customDBShowHide);
                    }}
                >show/hide CustomDbAPI</button>  
                    
                <div
                    style={{
                        position : "relative",
                        
                    }}
                >
                    <label>schema</label>
                    <SchemasListLoad 
                        style={{
                            //margin : 0,
                            height : undefined,
                            width : undefined,
                            display : "inline-block",
                        }}
                        params={{ showInputs : false}}
                        onClick={(dt)=>{
                            //alert(JSON.stringify(dt));
                            // data. { "name" :"" ,"version" : "0","schema" : {} ,"type" : " " , "type" : [], "subSchema" : {} , "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}" }
                            // schemaSubDef={ "name" :"" ,"schema" : {}  ,"type" : " " , "type" : [], "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}","linked" : false, "link" : { "path"  : "" , "name" : "" } }
                            if (dt.data){
                                if (typeof(dt.data)==="object"){
                                    setCurrentSchemaData(dt.data)
                                }
                            }

                        }}
                    />
                    <div
                        style={{
                            //margin : 0,
                            height : undefined,
                            width : undefined,
                            display : "inline-block",
                            width : 400,
                        }}
                    >
                        <textarea
                            style={{ height : 100 , width : "100%" }}
                            value={JSON.stringify(currentSchemaData,null,2)}
                            onChange={()=>{

                            }}
                        />
                    </div>
                </div>
            </div>


            <div
                style={{
                    position : "relative",
                    
                 }}

            >
                <div
                    style={{
                        position : "relative",
                        //width : 700,
                     }}
                >
                    <div style={{ clear : "left" }} />


                    <div
                        style={{
                            float : "left",
                        }}
                    >
                        {listCmptDataGenE}
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
                                newCmptDataGen()
                            }}
                        >
                            new
                        </button>

                        <button
                            style={{

                            }}
                            onClick={()=>{
                                let nd={...cmptDataGenJsn}
                                nd.name=cmptDataGenName.replace(/ / ,"");
                                saveCmptDataGenBE( { name : nd.name , data :  nd , project : project.replace(/ / ,"")  } , ()=>{
                                    listCmptDataGen()
                                })
                            }}
                        >
                            save
                        </button>
                        
                        
                        <br/>

                        <input 
                            placeholder='CmptDataGen Name'
                            value={cmptDataGenName}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setCmptDataGenName(val)
                            }}
                        />

                        <input 
                            placeholder='Project'
                            value={project}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setProject(val)
                            }}
                            onBlur={()=>{
                                listCmptDataGen({project : project})
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



                    <div style={{ clear : "left" }} />
                </div>

            </div>

            <div
                style={{
                    position  : "relative",
                    width : 1000,
                    //height : 300,                    
                    height : style.height - 225,                    
                    overflow : "auto"
                }}  
            >
                

               
                <div
                    style={{...{
                        position  : "relative",
                        //
                        overflow : "auto",
                        background : "green",
                        marginTop : 10,
                        padding : 1, 
                        border : "solid thin grey"
                    },...customHookShowHideContCss}}  
                >
                    
                        <div>CustomHook</div>
                        <div
                            style={customHookShowHideCSS} 
                        >
                            <CustomHook />
                        </div>
                </div>

                
                <div
                    style={{...{
                        position  : "relative",
                        //height : 200,
                        overflow : "auto",
                        background : "blue",
                        marginTop : 10,
                        padding : 1, 
                        border : "solid thin grey"
                    },...customAPIShowHideContCss}}   
                >

                    <div>CustomAPI</div>
                    <div
                         style={customAPIShowHideCSS} 
                    >
                        <CustomAPI />                    
                    </div>
                </div>

                
                <div
                    style={{...{
                        position  : "relative",
                       // height : 200,
                        overflow : "auto",
                        background : "yellow",
                        marginTop : 10,
                        padding : 1, 
                        border : "solid thin grey"
                    },...customDBShowHideContCss}}  
                >
                    <div>CustomDbAPI</div>
                    <div
                         style={customDBShowHideCSS} 
                    >
                        <CustomDbAPI />
                    </div>
                </div>
            </div>

        </div>
    )

}


