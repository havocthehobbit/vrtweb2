import { useState,useEffect,useRef,useContext ,Context , lazy,Component, Suspense } from "react"
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';

import { MermaidCmpt } from "../../../common/charts/mermaidGraph";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
//import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption }  from "gantt-task-react";
import { ExcaliDraw } from "./excalidraw";
import { PopupBox } from "../../tools/reps/SQL/sqlbuilder";
import { render } from "react-dom"
import "@silevis/reactgrid/styles.css";
import "./style.css"
import { v4 as uuidv4 } from 'uuid';

import { VGrid } from "./vgrid";

import { VGant } from "./vgant"; // #vgant_plugin-0
//import { ExDraw } from "./excalidraw";

//import { Excalidraw ,useHandleLibrary } from "@excalidraw/excalidraw";

/*
(async () => {
    // Dynamically imported module (runtime)
    Excalidraw={}
      Excalidraw.Excalidraw = await import('@excalidraw/excalidraw');
      console.log(Excalidraw)
  })();
  */
import IndexPage from "./exd";

/*

    * todo
        * tags , filter and select by 
        * css template selections
        * css inputs 
        * reset css button
        * layout note 
        * filter and search note by seq , name , uniq
        * fetch data and send data to other notes 
        * calculate data based on other notes 
        * save adnd load scratchoad 
        * fetch specific notes 
        * slidwshow notes 
        * on event link
        * * button notes ( can be used with on event action)
        * export 
        * import
        * 
        * DBtype : save ,list, new  : beDataprops : { DBtype : { type : [DB/disk] } defualts :  { DiskMainPath : "/dfd/dfdf/fdf.json",}
        

*/


export const noteDataDef={
    uuid : "",
    seq : -1,
    name : "new note",
    data : {},
    type : "text",
    calcs : { all : [] },
    tags : [],
    styles : {
        main : {},
        styleC : {},
        name : {},
    },
};


export const Note=(props)=>{
    let initC=useRef(true);
    let PropDatainitC=useRef(true);

    let debug=false;

    

    let typeDef="";
    if (typeof(props.type)==="string"){
        if (props.type.trim()!==""){
            typeDef=props.type;
        }
    }

    let uuidDef="";
    if (typeof(props.uuid)==="string"){
        if (props.uuid.trim()!==""){
            uuidDef=props.uuid;
        }
    }else{
        uuidDef=uuidv4();        
    }

    let dataDef={...noteDataDef}
    if (props.data){        
        dataDef=JSON.parse(JSON.stringify(props.data));//{...props.data};  
        if (props.data.uuid){
            if (props.data.uuid!==""){
                dataDef.uuid=props.data.uuid;
            }
        }
    }else{
        if (typeof(props.uuid)==="string"){

        }else{
            dataDef.uuid=uuidDef;
        }
    }
    
    let displayModeDef=false;
    if (props.displayMode!==undefined){    
        displayModeDef=props.displayMode
     }


    
    let [type,setType]=useState(typeDef);
    let [uuid,setUuid]=useState(uuidDef);

    let [data,setData]=useState(JSON.parse(JSON.stringify(dataDef)));
    


    let [nameTxt,setNameTxt]=useState(dataDef.name);
    let [styleCTxt,setStyleCTxt]=useState("{}");
    let [styleCTxtJSON,setStyleCTxtJSON]=useState({});
    let [styleMainTxt,setStyleMainTxt]=useState("{}");
    let [styleMainTxtJSON,setStyleMainTxtJSON]=useState({});
    
    let [value,setValue]=useState("");

    let [displayMode,setDisplayMode]=useState(displayModeDef);


    let [popupShowHide,setPopupShowHide]=useState(false);

    







    // ---------------------------

        if (type==="excalidraw"){
            if (window.ExcaliDrawAPI===undefined){
                window.ExcaliDrawAPI={ notesUdpate : {} };                            
            }
        }

        useEffect(()=>{
            if (initC.current){
                initC.current=false;



            }
        },[]);

        /*
        useEffect(()=>{
            if (type!==data.type){
                setData((cst)=>{
                    let nst={...cst};
                    if (type==="excalidraw"){
                        if (window.ExcaliDrawAPI===undefined){
                            window.ExcaliDrawAPI={ notesUdpate : {} };                            
                        }
                        if (nst.data.data){

                        }else{

                        }
                    }
                    
                    return nst;
                })

            }
        },[type]);
        */
        

        useEffect(()=>{
            if (props.data){
                if (typeof(props.onChangeData)==="function"){
                    let propsDataStr=JSON.stringify(props.data) 
                    let DataStr=JSON.stringify(data) 
                    if (DataStr!==propsDataStr){
                        
                        props.onChangeData({ data : data });
                    }
                }
            }
        },[data]);

        useEffect(()=>{
            let propsDataStr=JSON.stringify(props.data) ;
            let DataStr=JSON.stringify(data) ;
            let propsData=JSON.parse(propsDataStr);


            
            

            if (DataStr!==propsDataStr || PropDatainitC.current){
                PropDatainitC.current=false;

                
                let valueTmp=value;
                let typeTmp=type;
                let styleMainTxtJSONTMP=styleMainTxtJSON;
                let styleCTmp=styleC;
                if (propsData){

                    if (propsData.type){
                        typeTmp=propsData.type;
                    }
                    if (propsData.data){
                        if (propsData.data.value!==undefined){
                            valueTmp=propsData.data.value;
                        }
                    }

                    if (propsData.styles){
                        if (propsData.styles.main){
                            styleMainTxtJSONTMP={...propsData.styles.main};

                        }
                        if (propsData.styles.styleC){
                            styleCTmp={...propsData.styles.styleC};
                        }
                    }
                   

                }
               
                setData(propsData);
                setValue(valueTmp);
                setType(typeTmp);
                setStyleMainTxt(JSON.stringify(styleMainTxtJSONTMP));
                setStyleMainTxtJSON(styleMainTxtJSONTMP);
                setStyleCTxt(JSON.stringify(styleCTmp));
                setStyleCTxtJSON(styleCTmp);
            }
        }
        ,[props.data]);

        useEffect(()=>{
            setDisplayMode(props.displayMode);
        },[props.displayMode]);
        

    // ---------------------------

    let types=[
        { name : "layout", id : "layout"},
        { name : "slideshow", id : "slideshow"},

        { name : "text", id : "text"},
        { name : "input", id : "input"},

        { name : "excalidraw", id : "excalidraw"},

        { name : "markdown", id : "markdown"},
        { name : "markdownEdit", id : "markdownEdit"},

        { name : "mermaid", id : "mermaid"},

        { name : "vgrid", id : "vgrid"},
        { name : "table", id : "table"},

        { name : "api", id : "api"},

        { name : "image", id : "image"},

        { name : "workflow", id : "workflow"},

        { name : "gant", id : "gant"},
        
        { name : "templateText", id : "templateText"},

        { name : "calendar", id : "calendar"},

        { name : "globals", id : "globals"}, // global variables , with types , limitations and events/actions for values

    ];

    if (props.types){
        props.types.forEach((r,i)=>{
            type.push({name : r.name , id : r.id })
        })
    };

    let typesE=(()=>{
        let E;
        let arrE=[];

        types.forEach((r,i)=>{
            arrE.push(
                <option key={i} value={r.id}>{r.name}</option>
            )

        });

        E=(
            <select
                style={{

                }}
                onChange={(e)=>{
                    let val=e.target.value;
                    setType(val);
                    setData((cst)=>{
                        let nst={...cst};

                        nst.type=val;

                        return nst
                    })
                }}
            >
                {arrE}
            </select>
        )


        return E

    })();
    

    let noteE
    let noteEargs={}
    let styleComponent={}

    let styleC={}

    if (styleComponent){
        styleC={...styleC,...styleComponent}
    }

    if (data.styles){
        if (data.styles.style){
            styleC={...styleC,...data.styles.style}
        }
        if (data.styles.styleOverride){
            styleC=data.styles.styleOverride;
        }
    }
    
    
    
    styleC={...styleC,...styleCTxtJSON}
    
    

    if (type==="text" || type===""){      
        
        noteEargs.value=value;
        
        
        noteEargs.onChange=(e)=>{
            let val=e.target.value;
            setValue(val);
        }

        noteEargs.onBlur=(e)=>{
            let val=e.target.value;
            setData((cst)=>{
                let nst={...cst}
                nst.data.value=val;
                return nst;
            })
        }

        noteE=(
            <textarea  
                style={styleC}
                {...noteEargs}
            
            />
        )

    }

    if (type==="input"){
        noteEargs.value=value;
        
        
        noteEargs.onChange=(e)=>{
            let val=e.target.value;
            setValue(val);
        }

        noteEargs.onBlur=(e)=>{
            let val=e.target.value;
            setData((cst)=>{
                let nst={...cst}
                nst.data.value=val;
                return nst;
            })
        }
        
        noteE=(
            <input  
                style={styleC}
                {...noteEargs}
                
            />
        )
    }

    if (type==="excalidraw"){
        

        if (displayMode===true){
            //noteEargs.options={};            
            noteEargs.optionsOverride={};            
            //noteEargs.options.zenModeEnabled=false;
            //noteEargs.options.viewModeEnabled=true;
            noteEargs.optionsOverride.viewModeEnabled=true;
            noteEargs.viewModeEnabled=true;

            noteEargs.propsC={ UIOptions : {
                canvasActions: {
                    loadScene: false, // Hide "Load Scene"
                    saveScene: false, // Hide "Save Scene"
                    saveAsImage: false, // Hide "Save as Image"
                    export: false, // Hide "Export"
                    undo: false, // Hide "Undo"
                    redo: false, // Hide "Redo"
                    clearCanvas: false, // Hide "Clear Canvas"
                    toggleTheme: false, // Hide "Toggle Theme"
                },
            } };
            noteEargs.propsC.renderTopRightUI=undefined ;
            
        }
        

        noteE=(
            <div
                style={styleC}
            >
            {(()=>{
                if (displayMode===false){
                    return (
                        <button
                            onClick={(e)=>{
                                let exApiRef=window.ExcaliDrawAPI.notesUdpate[uuid].api;
                                let excExtras=window.ExcaliDrawAPI.notesUdpate[uuid].extras;

                                let scdt=exApiRef.getSceneElements();                    
                                let exFiles=exApiRef.getFiles();
                                let exAppState=exApiRef.getAppState();
                                
                                    //console.log( "excalidrawAPIRef - Save : ", ns.data);
                                
                                    //console.log( "excalidrawAPIRef - ExApiRef : ", exApiRef);
                                //console.log( "excalidrawAPIRef - getAppState : ", exAppState);
                                //console.log( "excalidrawAPIRef - getFiles : ",exFiles );

                                let excData={ 
                                    elements : [...scdt],
                                    appState: {...exAppState},
                                    files : exFiles,
                                }


                                //let excSaveFile=excExtras.serializeAsJSON(
                                //    props.data.sceneElements,
                                //    exApiRef.getAppState() ,
                                //    exFiles
                                //    /*
                                //    {
                                //        elements: props.data.sceneElements,
                                //            //appState: exApiRef.getAppState() ,
                                //            //files : exApiRef.getFiles(),
                                //        files : scdt.files,
                                //        
                                //    }
                                //    */
                                //);
                                //console.log("excSaveFile : ", excSaveFile);

                                /*
                                setValue((st)=>{
                                    let ns
                                    if (Array.isArray()===false){
                                        ns=[]
                                    }else{
                                        ns=[...st]
                                    }
                                    
                                    //console.log("VGant:",ns)
                                    ns=[...scdt]//[...dt.rows];

                                    return ns
                                });
                                */

                                //console.log("excData : " , excData);

                                setData((st)=>{
                                    let ns={...st}                        
                                    ns.data={...excData}
                                    if (debug){                            
                                        //console.log( "excalidrawAPIRef - getFiles : ", exApiRef.getFiles() );                            
                                    }

                                    return ns
                                })


                            }}
                        >save</button>
                    )
                }
            })()}

            <ExcaliDraw  
                data={data.data}

                extras={(dt)=>{                   
                    if (window.ExcaliDrawAPI.notesUdpate[uuid] ){
                        window.ExcaliDrawAPI.notesUdpate[uuid].extras=dt;
                    }else{
                        window.ExcaliDrawAPI.notesUdpate[uuid]={ extras : dt };
                    }
                }}

                refFN={(...args)=>{                     
                    if (window.ExcaliDrawAPI.notesUdpate[uuid] ){
                        window.ExcaliDrawAPI.notesUdpate[uuid].api=args[0];
                    }else{
                        window.ExcaliDrawAPI.notesUdpate[uuid]={ api :args[0] , extras : {} };
                    }

                    if (debug){
                        console.log( "excalidrawAPIRef - noteUpdate : ", args)
                    }

                    /*
                        args[0]
                        ... https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/props/excalidraw-api
                        addFiles  :  event => {…}
                        getAppState  :  () => this.state
                        getFiles  :  () => this.files
                        getSceneElements  :  () => {…}
                        getSceneElementsIncludingDeleted :  () => {…}
                        history: {clear: ƒ}
                        id : "WQVSkzTIp7ri9Y7Nk15RJ"
                        onChange :  cb => this.onChangeEmitter.on(cb)
                        onPointerDown :  cb => this.onPointerDownEmitter.on(cb)
                        onPointerUp : cb => this.onPointerUpEmitter.on(cb)
                        refresh : () => {…}
                        resetCursor:  () => {…}
                        resetScene :  event => {…}
                        scrollToContent: (target = this.scene.getNonDeletedElements(), opts) => {…}
                        setActiveTool: tool => {…}
                        setCursor: cursor => {…}
                        setToast: toast => {…}
                        toggleSidebar: ({ name, tab, force }) => {…}
                        updateFrameRenderin:  opts => {…}
                        updateLibrary: ({ libraryItems, prompt = false, merge = false, openLibraryMenu = false, defaultStatus = "unpublished" }) => {…}
                        updateScene
                    */
                }}

                {...noteEargs}
            
            />
            </div>
        )
    }


    if (type==="markdown"){
        noteEargs.source={value}

        noteE=(
            <div
                style={styleC}

            >
                <textarea
                    value={""}
                    onClick={(e)=>{
                        let val=e.target.value;

                    }}
                />
                <MarkdownPreview  
                    
                    {...noteEargs}
                
                />
            </div>
        )
    }

    if (type==="markdownEdit"){
        //{...{height : 300},...note.style3}

        noteEargs.onChange=(eValue, viewUpdate)=>{
            let val=eValue;
            setValue(val);
        }

        noteEargs.onBlur=(eValue, viewUpdate)=>{
            //let val=eValue;
            setData((cst)=>{
                let nst={...cst}
                nst.data.value=value;
                return nst;
            })
        }

        noteE=(

            <div
                style={{
                    display : "inline-block",              
                    position : "relative",                    
                }}

            >
                
                <MarkdownEditor
                    value={value}
                    {...noteEargs}
                    style={styleC}
                    
                    //value={value}
                    //onChange={(value, viewUpdate) => {                                    
                    //    setTxt(value)
                    //}}
                    //onBlur={() => {                                                
                    //    setNote((st)=>{
                    //        let nsr={...st}
                    //        nsr.text=txt
                    //        return nsr                          
                    //    })
                    //}}
                />   
            </div>
        )
    }

    if (type==="mermaid"){

        //noteEargs.value=value;     

        noteEargs.hasTextBox=true;
        noteEargs.hasExamples=true;
        noteEargs.hasDownload=true;

        
        if (data.data){
            if (data.data.hasExamples){
                noteEargs.hasExamples=data.data.hasExamples;
            }
       
            if (data.data.hasTextBox){                
                noteEargs.hasTextBox=data.data.hasTextBox;                
            }
     
            if (data.data.hasDownload){                
                noteEargs.hasDownload=data.data.hasDownload;
            }
        
            if (data.data.value){
                //noteEargs.value=data.data.value;
                noteEargs.text=data.data.value;
            }
        }
        
        /*
        noteEargs.onChange=(e)=>{
            let val=e.target.value;
            setValue(val);
        }
        */

        if (displayMode!==false){
            noteEargs.hasTextBox=false;
            noteEargs.hasExamples=false;
        }


        noteEargs.onChange=(dt)=>{
            let val="";
            if (typeof(dt)==="object"){
                if (dt.value){
                    val=dt.value
                }
            }
            setValue(val);
            
            setData((cst)=>{
                let nst={...cst}
                nst.data.value=val;
                return nst;
            })
        }
        

        noteE=(
            <MermaidCmpt  
                style={styleC}
                {...noteEargs}
            
            />
        )
    }

    if (type==="vgrid"){
        
    }

    if (type==="table"){
        
    }

    if (type==="image"){
        noteEargs.value=value;
        
        
        noteEargs.onChange=(e)=>{
            let val=e.target.value;
            setValue(val);
        }

        noteEargs.onBlur=(e)=>{
            let val=e.target.value;
            setData((cst)=>{
                let nst={...cst}
                nst.data.value=val;
                return nst;
            })
        }
        
        noteE=(
            <div  
                //style={styleC}
                {...noteEargs}
                
            >
                
                <input  
                   // {...stdProps}
                    
                    value={value}
                    onChange={(e) => {       
                        let val=e.target.value  
                        setValue(val)
                    }}
                    onBlur={(e) => {                                                
                        let val=e.target.value
                        setData((st)=>{
                            let nsr={...st}
                            nsr.value=val
                            return nsr                          
                        })
                    }}
                /> 

                <img 
                    src={value} 
                    style={styleC}  
                />      

            </div>
        )
    }

    // custom types 
    if (props.types){
        props.types.forEach((r,i)=>{
            if (type===r.type){
                if (typeof(r.fn)==="function"){
                    let ret=fn( {data : data});

                    if (ret.E){
                        noteE=ret.E;
                    }
                    
                    if (ret.noteEargs){
                        noteEargs=ret.noteEargs;
                    }                    
                }
            }
        })
    }



    // ---------------------------

    let cssDisplayTool="inline-block";
    if (displayMode){
        cssDisplayTool="none";
    }

    let E=(
        <div
            style={{
                display : "inline-block",
                position : "relative",
                
            }}
        >

            <div
                style={{
                    background : "lightgrey",
                    padding : 2,
                    borderRadius : 4,
                    display : cssDisplayTool,// "inline-block",
                    position : "relative",
                    height : 50,
                    fontSize : 12,
                    overflow : "hidden",
                }}
            > 
                <div
                    style={{
                        position : "relative",
                        height : 50,
                        overflow : "auto",
                    }}
                >
                    <input 
                        value={nameTxt}
                        onChange={(e)=>{
                            let val=e.target.value;
                            setNameTxt(val)
                        }}
                        onBlur={(e)=>{
                            let val=e.target.value;
                            setData((cst)=>{
                                let nst={...cst};

                                nst.name=val;

                                return nst
                            })
                        }}
                    />
                    {typesE}

                    {data.name} - {data.seq}
                    <textarea 
                        value={styleMainTxt}
                        placeholder="Style Main Container"
                        onChange={(e)=>{ 
                            let val=e.target.value
                            setStyleMainTxt(val)
                        }}
                        onBlur={(e)=>{ 
                            let val=e.target.value
                            setStyleMainTxt(val)
                            try{
                                let tmpJSON=JSON.parse(val);
                                setStyleMainTxtJSON(tmpJSON);
                                setData((cst)=>{
                                    let nst={...cst}
                                    nst.styles.main=tmpJSON;
                                    return nst;
                                })
                                
                            
                            }catch(e){
                        
                            }
                        }}
                    />
                    <button
                        style={{
                            fontSize : 8,
                            width : 8,
                        }}
                        onClick={()=>{
                            setPopupShowHide(true)
                        }}
                    >...</button>

                    <textarea 
                        value={styleCTxt}
                        placeholder="Style Note Component"
                        onChange={(e)=>{ 
                            let val=e.target.value
                            setStyleCTxt(val)
                        }}
                        onBlur={(e)=>{ 
                            let val=e.target.value
                            setStyleCTxt(val)
                            try{
                                let tmpJSON=JSON.parse(val);
                                setStyleCTxtJSON(tmpJSON);
                                setData((cst)=>{
                                    let nst={...cst}
                                    nst.styles.styleC=tmpJSON;
                                    return nst;
                                })
                            
                            }catch(e){
                        
                            }
                        }}
                    />
                    <button
                        style={{
                            fontSize : 8,
                            width : 8,
                        }}
                        onClick={()=>{
                            setPopupShowHide(true)
                        }}
                    >...</button>

                    <button
                        onClick={()=>{
                            let tmpr={...styleCTxtJSON}
                            if (tmpr.display==="none"){
                                tmpr.display="inline-block";
                            }else{
                                tmpr.display="none";
                            }
                            


                            setStyleCTxt(JSON.stringify(tmpr));
                            setStyleCTxtJSON(tmpr);
                            setData((cst)=>{
                                let nst={...cst}
                                nst.styles.styleC=tmpr;
                                return nst;
                            })
                        }}
                    >
                        show-hide
                    </button>
                </div>
            </div>


            <div
                style={{
                    position : "relative",
                    width : "100%",
                    //height : 200,
                    overflow : "hidden",
                }}
            >
                <div
                    style={{
                        position : "relative",
                        width : "100%",
                        height : "100%",
                        overflow : "auto",
                    }}
                >
                 {noteE}
                </div>
            </div>
            {
            //    JSON.stringify(data)
            }



        </div>
    )


    // --------------------------------

    let popupE
    if (popupShowHide){
        popupE=(()=>{
            return (
                <div
                    style={{
                        position : "absolute",
                        width : 380,
                        height : 500,
                        background : "white",
                        zIndex : 9999
                    }}
                >
                    <div
                        style={{
                            right : 0,
                            display : "inline-block",
                            background : "red",
                            position : "absolute",
                            zIndex : 9999,
                            //width : 
                        }}
                        onClick={()=>{
                            setPopupShowHide(false);
                        }}
                    >
                        X
                    </div>

                    <div
                        style={{
                            border : "solid thin lightgrey",
                            cursor : "pointer",
                            fontSize : 10,
                        }}
                        onClick={()=>{
                            let val='{ "width" : 500 , "height" : 500  }'
                            setStyleMainTxt(val)
                            setStyleMainTxtJSON(JSON.parse(val));
                            setData((cst)=>{
                                let nst={...cst}
                                nst.styles.main=JSON.parse(val);
                                return nst;
                            })
                        }}
                    >
                        container 500x500 : {"style={ \"width\" : 500 , \"height\" : 500  }"}
                    </div>
                    <div
                        style={{
                            border : "solid thin lightgrey",
                            cursor : "pointer",
                            fontSize : 10,
                        }}
                        onClick={()=>{
                            let val='{ "width" : 1200 , "height" : 800  }'
                            setStyleMainTxt(val)
                            setStyleMainTxtJSON(JSON.parse(val));
                            setData((cst)=>{
                                let nst={...cst}
                                nst.styles.main=JSON.parse(val);
                                return nst;
                            })
                        }}
                    >
                        container 1200x800 : {"style={ \"width\" : 1200 , \"height\" : 800 }"}
                    </div>

                    <div
                        style={{
                            border : "solid thin lightgrey",
                            cursor : "pointer",
                            fontSize : 10,
                        }}
                        onClick={()=>{
                            let val='{ "width" : 500 , "height" : 500  }'
                            setStyleCTxt(val)
                            setStyleCTxtJSON(JSON.parse(val));
                            setData((cst)=>{
                                let nst={...cst}
                                nst.styles.styleC=JSON.parse(val);
                                return nst;
                            })
                        }}
                    >
                        component 500x500 : {"style={ \"width\" : 500 , \"height\" : 500  }"}
                    </div>

                    <div
                        style={{
                            border : "solid thin lightgrey",
                            cursor : "pointer",
                            fontSize : 10,
                        }}
                        onClick={()=>{
                            let val='{ "width" : 1200 , "height" : 800  }'
                            setStyleCTxt(val)
                            setStyleCTxtJSON(JSON.parse(val));
                            setData((cst)=>{
                                let nst={...cst}
                                nst.styles.styleC=JSON.parse(val);
                                return nst;
                            })
                        }}
                    >
                        component 1200x800 : {"style={ \"width\" : 1200 , \"height\" : 800  }"}
                    </div>

                    <div
                        style={{
                            border : "solid thin lightgrey",
                            cursor : "pointer",
                            fontSize : 10,
                        }}
                        onClick={()=>{
                            let val='{ "width" : 1400 , "height" : 500  }'
                            setStyleMainTxt(val)
                            setStyleMainTxtJSON(JSON.parse(val));
                            setData((cst)=>{
                                let nst={...cst}
                                nst.styles.main=JSON.parse(val);
                                return nst;
                            })
                        }}
                    >
                        container 1400x500 : {"style={ \"width\" : 1400 , \"height\" : 500  }"}
                    </div>

                    <div
                        style={{
                            border : "solid thin lightgrey",
                            cursor : "pointer",
                            fontSize : 10,
                        }}
                        onClick={()=>{
                            let val='{ "width" : 1400 , "height" : 500  }'
                            setStyleCTxt(val)
                            setStyleCTxtJSON(JSON.parse(val));
                            setData((cst)=>{
                                let nst={...cst}
                                nst.styles.styleC=JSON.parse(val);
                                return nst;
                            })
                        }}
                    >
                        component 1400x500 : {"style={ \"width\" : 1400 , \"height\" : 500  }"}
                    </div>

                </div>
            )
        })();
    }


    // ---------------------------


        let style={
            display  : "inline-block",
            position  : "relative",
            background : "white",
            width : 400,
            height : 300, 
            borderRadius : 8 ,
            overflow : "hidden",

        }
        if (props.style){
            style={...style,...props.style}
        }
        style={...style,...styleMainTxtJSON}


        let styleSubMain={
            border : "solid thin lightgrey",
            margin : 6,
            borderRadius : 5,        
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

                styleSubMainFrame.height=785;            
                styleSubMainFrame.borderRadius=5;;

            }
        }
        
    // ---------------------------

    
    

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
                        {popupE}

                        {E}

                    </div>


                </div>
            </div>
        </div>
            
    );

}


