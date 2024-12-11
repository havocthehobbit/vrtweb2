import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
import { ContextStore as commonVLContext } from '../../../../common/contextStore';

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


import { apiBaseTemplateGenerate } from "./API/CustomAPIBaseTemplate";
import {dbBaseTemplateGenerate } from "./API/CustomDBBaseTemplate";


import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';


// useHook : ret- hook;string ,cmpt;string 

export const listCmpt=(...args)=>{
            
    listCmptDataGenBE(args[0],(dt)=>{
       
        
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

export const loadCmpt=(...args)=>{
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

export const CmptListLoad=(props)=>{ // onLoad , onClick ,onChangeProjectName , onChangeSchemaName
    
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
            listCmpt({project : projectName},(dt)=>{});
        }
    },[props.updateProjectList]);


    

    
    useEffect(()=>{
        if (initC.current){
            initC.current=false;

            listCmpt({},(dt)=>{});
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

    let listCmpt=(...args)=>{
            
        listCmptDataGenBE(args[0],(dt)=>{
           
            
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

    let loadCmpt=(...args)=>{
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

                        loadCmpt({ name : r.name ,project : projectName },(dt)=>{                                    
                            //alert(JSON.stringify( dt ) );
                            //setCurrRec(dt.data)
                            setCurrRec(dt);
                            onClick({...r},{projectName : projectName, name : r.name });
                            //onLoad(dt.data,{projectName : projectName, schemaName : r.name },{...r});
                            onLoad(dt,{projectName : projectName, name : r.name },{...r});
                        })
                        
                        
                    }else{                    
                        setProjectName(r.name);
                        setCurrPathRec({...r});
                        listCmpt({project : r.name},(dt)=>{
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
                    listCmpt({},(dt)=>{});
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
                >Cmpt load</label>               

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

export const Cmpt=(props)=>{
    let ctxStdL=useContext(commonVLContext)


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

    let cmptDataGenDef={ "name" :"" ,"version" : "0","data" : {} ,"type" : "" , "types" : [], "subSchema" : {} , "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}" }
    let cmptDataGenSubDef={ "name" :"" ,"data" : {}  ,"type" : "" , "types" : [], "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}","linked" : false, "link" : { "path"  : "" , "name" : "" } }
    
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


  
    let [customHookUseHook,setCustomHookUseHook]=useState("");
    let [customHookGenerated,setCustomHookGenerated]=useState("");
    let [customAPIGenerated,setCustomAPIGenerated]=useState("");
    let [customDbAPIGenerated,setCustomDbAPIGenerated]=useState("");


    
    let currentCmptDataGenSubPrevRef=useRef("");

    let [updateProjectList,setUpdateProjectList]=useState(new Date());

    // ---------------------
        let forceSetUpdateProjectList=()=>{
            setUpdateProjectList(new Date());
        }
        
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

    let wWidth=ctxStdL.windowSize.width
    let wHeight=ctxStdL.windowSize.height 

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
            style.width="100%";
            style.height=800;

            styleSubMain.height=770;
            //styleSubMain.overflow="auto";

            //styleSubMainFrame.width="99%";

            styleSubMainFrame.height=785;
            
            styleSubMainFrame.borderRadius=5;
            //styleSubMainFrame.overflow="hidden";
            
            //styleSubMainFrame.border="solid thin lightgrey";
            //styleSubMainFrame.margin=6;
            if (true){
                if (typeof(style.height)==="number"){
                    styleSubMain.height = style.height - 15;
                }

                if (typeof(style.width)==="number"){
                    styleSubMain.width = style.width - 10;
                }else{
                    if (typeof(style.width)==="string"){
                        if (style.width.includes("%")){
                            let tmp=Number(style.width.replace("%", ""));
                            let tmp2=( tmp - 1 ) ;
                            styleSubMain.width = tmp2 + "%" ;
                        }

                        

                    }

                }
            }
                


        }
    }

    // ===========================================
    let totlal3show=0;
    let defaultshow="inline-block" // "none"
    let customHookShowHideContCss={position : "relative",display :defaultshow}
    let customHookShowHideButtonCss={}
    let customHookShowHideCSS={ display : "block"}
    if (customHookShowHide){        
        customHookShowHideButtonCss.background="darkgrey";
        customHookShowHideContCss.display="inline-block"
        customHookShowHideCSS.display="block";
        totlal3show+=1
    }    
    
    let customAPIShowHideContCss={position : "relative",display : defaultshow}
    let customAPIShowHideButtonCss={}
    let customAPIShowHideCSS={ display : "none"}
    if (customAPIShowHide){
        customAPIShowHideButtonCss.background="darkgrey";
        customAPIShowHideContCss.display="inline-block"
        customAPIShowHideCSS.display="block"
        totlal3show+=1;
    }
    
    let customDBShowHideContCss={position : "relative",display : defaultshow}
    let customDBShowHideButtonCss={}
    let customDBShowHideCSS={ display : "none"}
    if (customDBShowHide){
        customDBShowHideButtonCss.background="darkgrey";
        customDBShowHideContCss.display="inline-block"
        customDBShowHideCSS.display="block"        
        totlal3show+=1
    }
    if (wWidth < 1200){
       // customDBShowHideCSS.width=700;
    }
    //console.log("width : "  , wWidth);

    if (totlal3show ===1){
        customHookShowHideContCss.width="100%";
        customAPIShowHideContCss.width="100%";
        customDBShowHideContCss.width="100%";
    }
    if (totlal3show===2){
        customHookShowHideContCss.width="40%";
        customAPIShowHideContCss.width="40%";
        customDBShowHideContCss.width="40%";
    }
    if (totlal3show===3){
        customHookShowHideContCss.width="25%";
        customAPIShowHideContCss.width="25%";
        customDBShowHideContCss.width="25%";
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



                    <div
                        style={{
                            
                        }}
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
                            <CmptListLoad  
                                updateProjectList={updateProjectList}
                                params={{ showInputs : false}}
                                //onClick={(dt)=>{
                                onLoad={(dt, extra)=>{
                                    if (typeof(dt)!=="object"){
                                        console.log("cmpt. CmptListLoad : " , dt ,extra );
                                        alert("data parse error");                                
                                        return;
                                    };

                                    if (dt){  
                                            let data=dt;                             
                                            let name=extra.name.replace( /\.json/ ,"" )

                                            setCurrentSchemaData(dt);
                                            setCmptDataGenTxt(JSON.stringify(data,null,2)); 
                                            setDescTxt(data.desc);
                                            setNotesTxt(data.notes);
                                            setProject(extra.projectName);                                    
                                            setCmptDataGenName(name);
                                            setCmptDataGenTxt(name);

                                            //setCmptDataGen(data);        
                                            //setCmptDataGenName(data.name);                                
                                            //setCmptDataGenTxt(JSON.stringify(data,null,2));                            
                                            //setDescTxt(data.desc);
                                            //setNotesTxt(data.notes);
                                    }

                                }}
                            />
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
                            {/*  
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
                            */}


                            <div
                                style={{
                                    //float : "left",
                                    background : "orange",
                                    display : "inline-block",
                                    verticalAlign : "top",
                                    border : "solid thin grey",
                                    borderRadius : 4,
                                    height : 95,
                                    padding : 3,
                                    overflow : "hidden",
                                    // padding : 5
                                }}
                            >

                                <div
                                    style={{
                                        //float : "left",
                                        background : "white",
                                        display : "inline-block",
                                        verticalAlign : "top",
                                        border : "solid thin grey",
                                        borderRadius : 4,                                        
                                        overflow : "hidden",
                                        // padding : 5
                                    }}
                                >

                                    <div
                                        style={{                                            
                                            //float : "left",
                                            display : "inline-block",
                                            verticalAlign : "top",
                                            overflow : "auto",
                                            padding : 3,
                                            
                                            // padding : 5
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

                                                if (nd.data===undefined){ nd.data={} };

                                                nd.data.name=cmptDataGenName.replace(/ / ,"");
                                                nd.data.customHookUseHook=customHookUseHook;
                                                nd.data.customHookGenerated=customHookGenerated;
                                                nd.data.customAPIGenerated=customAPIGenerated;
                                                nd.data.customDbAPIGenerated=customDbAPIGenerated;

                                                saveCmptDataGenBE( { name : nd.name , data :  nd , project : project.replace(/ / ,"")  } , ()=>{
                                                    listCmptDataGen()
                                                    forceSetUpdateProjectList();
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
                                </div>
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

                            {/*
                            <div
                                style={{
                                    float : "left",
                                }}
                            >
                                {listCmptDataGenE}
                            </div>
                            */}
                            



                            <div style={{ clear : "left" }} />
                        </div>

                        

                    </div>
                    

                    <div
                        style={{
                            position  : "relative",
                            //width : 1600,
                            width : "100%",
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
                                border : "solid thin grey",

                                display : "inline-block",
                                //width : 500,
                                width : "30%",
                            },...customHookShowHideContCss}}  
                        >                    
                                <div>CustomHook</div>
                                <div
                                    style={customHookShowHideCSS} 
                                >
                                    <CustomHook
                                        componentName={cmptDataGenName}
                                        onChangeHook={(rec)=>{                                    
                                            setCustomHookUseHook(rec.value);
                                        }}
                                        onChange={(rec)=>{                                    
                                            setCustomHookGenerated(rec.value);
                                        }}
                                    />
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
                                border : "solid thin grey",

                                display : "inline-block",
                                //width : 500,
                                width : "30%",
                            },...customAPIShowHideContCss}}   
                        >

                            <div>CustomAPI</div>
                            <div
                                style={customAPIShowHideCSS} 
                            >
                                <CustomAPI 
                                    componentName={cmptDataGenName}
                                    nameSpaceAPI={cmptDataGenName}
                                    nameAPI={cmptDataGenName}
                                    onChange={(rec)=>{
                                        //alert(rec.value);    
                                        setCustomAPIGenerated(rec.value);
                                        
                                    }}
                                    setCustomAPIGenerated
                                    
                                />                    
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
                                border : "solid thin grey",

                                display : "inline-block",
                                //width : 500,
                                width : "30%",
                            },...customDBShowHideContCss}}  
                        >
                            <div>CustomDbAPI</div>
                            <div
                                style={customDBShowHideCSS} 
                            >
                                <CustomDbAPI 
                                    componentName={cmptDataGenName}
                                    onChange={(rec)=>{
                                        //alert(rec.value);    
                                        setCustomDbAPIGenerated(rec.value);
                                        //alert(rec.value)
                                    }}
                                    
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                display : "inline-block",
                                background : "lightgreen",
                                position : "relative",
                                width : 700,
                                height : 600,    
                                padding : 2,
                                margin : 2,             
                            }}
                        >
                            <label> API file </label>                
                            <br/>
                            <CodeMirror 
                                style={{
                                    textAlign : "left",
                                    fontSize : 12,
                                }}
                                value={apiBaseTemplateGenerate(cmptDataGenName, customAPIGenerated )} 
                                //height="200px"
                                
                                extensions={[javascript({})]} 
                                //theme={githubDark}
                                theme={vscodeDark}
                                
                                onChange={(val)=>{
                                    //let val=e.target.value;
                                    //setCmptNameTxt(val)
                                }} 
                                onBlur={(val)=>{
                                    //let val=e.target.value;
                                    //setCmptName(val)
                                }}
                            />             
                        </div>

                        <div
                            style={{
                                display : "inline-block",
                                background : "pink",
                                position : "relative",
                                width : 700,
                                height : 600,
                                padding : 2,
                                margin : 2,                    
                            }}
                        >
                            <label> API DB file </label>                
                            <br/>
                            <CodeMirror 
                                style={{
                                    textAlign : "left",
                                    fontSize : 12,
                                }}
                                value={dbBaseTemplateGenerate(cmptDataGenName, customDbAPIGenerated )} 
                                //height="200px"
                                
                                extensions={[javascript({})]} 
                                //theme={githubDark}
                                theme={vscodeDark}
                                
                                onChange={(val)=>{
                                    //let val=e.target.value;
                                    //setCmptNameTxt(val)
                                }} 
                                onBlur={(val)=>{
                                    //let val=e.target.value;
                                    //setCmptName(val)
                                }}
                            />             
                        </div>



                    </div>
                    
                </div>
                
            </div>

           
        </div>
    )

}


