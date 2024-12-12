import { useState,useEffect,useRef,useContext ,Context} from "react"
//import MarkdownEditor from '@uiw/react-markdown-editor';
//import MarkdownPreview from '@uiw/react-markdown-preview';

//import { Excalidraw ,useHandleLibrary } from "@excalidraw/excalidraw";

//import {ExcaliDraw  } from "../notesUpdate/excalidraw";
//import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import { render } from "react-dom"

//import "@silevis/reactgrid/styles.css";
import "./style.css"
import { v4 as uuidv4 } from 'uuid';

import { PopupBox } from "../../tools/reps/SQL/sqlbuilder";
import $gl from '../../../common/globallib'

import { Note } from "../notesUpdate/notesUpdate";

import { noteDataDef } from "../notesUpdate/notesUpdate";

import { useScratchpadBE } from "../fnBE/scratchpadFE";

let $cn=require("../../../common/libNative").$cn

//let cl=$cn.l
//let tof=$cn.tof

//const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;


/*

* single view mode 
* tags , tag groups 
    * search by 
    * sort by ( enabling us to greating views that clickable by group next steping in order )
    * alpha or numerical per a layer 
    * show hide mark my group



*/


export const ScratchPad=(props)=>{
    let initC=useRef(true);

    let namespace="scratchpad";



    let mainProjID="scratchpadBEID";

    let notesDef=[];
    let nameDef="";

    let paramsDef={
        showListLoadBox : true,
        showList : true,
        showLoad : true,
        showSave : true,        
        showNew : true,        
        showDelete : true,

        showNewNote : true,        
        showDeleteNote : true,

        showManager : true,

        showManagerBar : true,

    };
    if (props.params){        
        paramsDef=props.params;        
    }

    let notesPropsDef={
        show : true,
        displayMode : false,
    }
    let dataDef={
        nextSeq : 0,
        notes : [],
        notesProps : {},
        mainPadOverrideCss : {},
        mainPadOverrideCssReplace : {}
    };
    if (props.data){        
        dataDef=props.data;        
    }

    let projectDef={};

    
    let scratchpadMainTitleContainerCss={};
    if (props.scratchpadMainTitleContainerCss){
        scratchpadMainTitleContainerCss=props.scratchpadMainTitleContainerCss
    }
    let scratchpadMainTitle="Scratch Pad";
    if (props.scratchpadMainTitle){
        scratchpadMainTitle=props.scratchpadMainTitle
    }   
    
    let scratchpadMainTitleCss={ margin : 4 };
    if (props.scratchpadMainTitleCss){
        scratchpadMainTitleCss=props.scratchpadMainTitleCss
    }
    

    if (props.namespace){        
        namespace=props.namespace;
    }
    
    
    let [project,setProject]=useState({...projectDef});
    let [projectNameCurr,setProjNameCurr]=useState("");    
    let [projNameCurrTxt,setProjNameCurrTxt]=useState("");    
    

    let [name,setName]=useState(nameDef);
    let [notes,setNotes]=useState([...notesDef]);
    let [notesTxt,setNotesTxt]=useState(JSON.stringify(notesDef,null,2));

    let [data,setData]=useState(JSON.parse(JSON.stringify(dataDef)));
    let [dataTxt,setDataTxt]=useState(JSON.stringify(dataDef,null,2));

    let [noteData,setNoteData]=useState(JSON.parse(JSON.stringify(noteDataDef)));
    

    let [params,setParams]=useState(JSON.parse(JSON.stringify(paramsDef)));


    let [jsonProjChildrenshowHide, setJsonProjChildrenshowHide]=useState(false);
    let [loadListChildrenShowHide, setLoadListChildrenShowHide]=useState(true);


    let [widthCycle , setWidthCycle]=useState(0);


    let width;

    let inpwidth
    if (props.style){
        if (props.style.width){
           inpwidth=props.style.width
        }
    }
    let widths=[ inpwidth ,500 , 800, 1000 , 1200,1600,1900, "90%" , "97%" , "100%" ];

    width=widths[widthCycle]

    let widthCycleFN=()=>{
        if (widthCycle ===(widths.length -1) ){
            setWidthCycle(0)
            return
        }
        setWidthCycle( widthCycle + 1)
        
    }
    let widthCycleBackFN=()=>{
        if (widthCycle ===(widths.length -1) ){
            setWidthCycle(0)
            return
        }
        setWidthCycle( widthCycle - 1)
        
    }


    let generalEachCss={
        margin : 2,
        verticalAlign : "top",
    }


    let newNoteFn=()=>{
                                
        let newNote=JSON.parse(JSON.stringify(noteDataDef));
        newNote.seq=data.nextSeq;
        newNote.uuid=uuidv4();


        let nstNotes=[...notes];
        nstNotes.push(newNote);
        let nstData={...data};
        nstData.nextSeq++;
        nstData.notes=nstNotes;

        setNotes((cst)=>{
            return nstNotes;
        });
        setNotesTxt(JSON.stringify(nstNotes,null,2));
        setData((cst)=>{                                
            return nstData
        });
        setDataTxt(JSON.stringify(nstData,null,2));
    };
    

    let recChangeCB=(dt)=>{
        //alert(JSON.stringify(dt));
        if (dt.data){
            if (dt.data){
                //setFilepathsState(dt.data.filepaths);
                setName(dt.data.name)
                
                if (dt.data.data){
                    // init first
                    //setData(JSON.parse(JSON.stringify(dataDef)));
                    //setNotes([...notesDef]);

                    setData(dt.data.data);
                    setNotes(dt.data.data.notes);
                    setNotesTxt(JSON.stringify(dt.data.data.notes,null,2));
                    setDataTxt(JSON.stringify(dt.data.data,null,2));


                    //console.log(dt)
                }    
            }else{
                //setFilepathsState([...filepathsStateDef]);
            }
        }
    }
    let {scratchpadBE, scratchpadBEDef, scratchpadBEs, scratchpadBEsList, 
         setScratchpadBE, setScratchpadBEs, setScratchpadBEsList, 
         scratchpadBEGetRec, scratchpadBEGetRecs, scratchpadBEListRecs, 
         scratchpadBEAdd, scratchpadBEUpdate, scratchpadBERemove, }=useScratchpadBE({recChangeCB : recChangeCB,scratchpadBEsList : { sendProps : { namespace : namespace, } }   }); // scratchpadBEAdd  : { sendProps : { namespace : namespace, } }
    

    // ---------------------------

        useEffect(()=>{
            if (initC.current){
                initC.current=false;

            
            }
            
        },[]);

        useEffect(()=>{
            if (props.data){
                if (typeof(props.onChangeData)==="function"){
                    if (JSON.stringify(data)!==JSON.stringify(props.data) ){
                        
                        props.onChangeData({ data : data });
                    }
                }
            }
        },[data]);

    // ---------------------------
    
 


    // ---------------------------

    let managerE
    let Manager
    if (params.showManager){
        Manager=()=>{
            let E;

            // 
            let listE=(()=>{
                let arrE=[]
                notes.forEach((r,i)=>{
                    let bgSH="lightgrey";
                    let bgDM="lightyellow";

                    if (data.notesProps[r.uuid]){
                        if (data.notesProps[r.uuid].show===false){
                            bgSH="grey";

                        }
                        if (data.notesProps[r.uuid].displayMode===true){
                            bgDM="orange";
                        }
                        
                    }

                    arrE.push(
                        <div
                            key={i}
                            style={{
                                //background : "green",
                                width : 200,
                                //height : 15,

                                borderBottom : "solid thin grey",

                                fontSize : 12,

                                cursor : "pointer",
                            }}
                        >
                            {r.name} 
                            <button
                                style={{
                                    background : bgSH,
                                    fontSize : 10,
                                    padding : 0,
                                }}
                                onClick={()=>{
                                    // r.uuid
                                    setData((cst)=>{
                                        let nst={...cst}
                                        
                                        if (nst.notesProps){}else{ nst.notesProps={} };
                                        if (nst.notesProps[r.uuid]){}else{ nst.notesProps[r.uuid]={...notesPropsDef} };

                                        nst.notesProps[r.uuid].show=!nst.notesProps[r.uuid].show;


                                        return nst;
                                    })
                                }}
                            >s/h</button>
                            <button
                                style={{
                                    background : bgDM,
                                    fontSize : 10,
                                    padding : 0,
                                }}
                                onClick={()=>{
                                    // r.uuid
                                    setData((cst)=>{
                                        let nst={...cst}
                                        
                                        if (nst.notesProps){}else{ nst.notesProps={} };
                                        if (nst.notesProps[r.uuid]){}else{ nst.notesProps[r.uuid]={...notesPropsDef} };

                                        nst.notesProps[r.uuid].displayMode=!nst.notesProps[r.uuid].displayMode;


                                        return nst;
                                    })
                                }}
                            >dm</button>
                        </div>
                    )
                })

                return arrE;
            })();

            let style={
                background : "lightgreen",
                display : "inline-block",
                overflow : "hidden",

                //borderBottom : "solid thin grey",
                borderRadius : 4,
                padding : 5,
            };

            style={...generalEachCss,...style};

            E=(
                <div
                    style={style}
                >
                    <label
                        style={{
                            fontSize : 16
                        }}
                    ><u>Notes Mananger</u></label>
                    <br/>
                    <button    
                        style={{
                            fontSize : 10,

                            background : "green",
                            color : "white",                            
                            padding : 4,
                            borderRadius : 3,
                            border : "none",
                            margin : 1,
                        }}                
                        onClick={newNoteFn}
                    >new</button>
                    <button
                        style={{
                            fontSize : 8,

                            background : "purple",
                            color : "white",                            
                            padding : 4,
                            borderRadius : 3,
                            border : "none",
                            margin : 1,
                        }}
                        onClick={()=>{
                            widthCycleBackFN();
                        }}
                    >sizeX -</button>
                    <button
                        style={{
                            fontSize : 8,
                            
                            background : "blue",
                            color : "white",                            
                            padding : 4,
                            borderRadius : 3,
                            border : "none",
                            margin : 1,
                        }}
                        onClick={()=>{
                            widthCycleFN();
                        }}
                    >sizeX +</button>
                    {listE}
                </div>
            );

            return E;
        }
        managerE=(Manager)();
    }

    let scratchpadBEsListE;
    if (true){
        let arrE=[];
        let styleEach={
            borderBottom : "solid thin grey",
            cursor : "pointer",
        };

        let currID="";
        if (project.data){
            if (project.data[mainProjID]){
                currID=project.data[mainProjID]
            }
        }
        if (scratchpadBEsList.data){

            scratchpadBEsList.data.forEach((r,i)=>{
                let styleEachInst={...styleEach};
                if (currID===r[mainProjID]){
                    styleEachInst.background="lightyellow";
                }

                arrE.push(
                    <div
                        key={i}
                        style={styleEachInst}

                        onClick={()=>{
                            let tmpRec={};
                            tmpRec[mainProjID]=r[mainProjID];



                            setProjNameCurrTxt(r.name);
                            

                            //setTimeout(()=>{
                                scratchpadBEGetRec(tmpRec,(dt)=>{
                                    
                                    setProject(dt)
                                    setProjNameCurr(r.name);
                                    
                                    
                                });
                        // },1500);
                        }}
                    >         
                        {r.name}           
                        {
                            //JSON.stringify(r)
                        }
                    </div>
                )

            });
        }



        
       
        let scratchpadBEsListECss={
            display : "inline-block",
            position : "relative",
            width  : 200,
            height  : 300,

            border : "",
            borderRadius : 4,

            background : "lightblue",
            verticalAlign : "top",

            overflow : "hidden",

            padding : 5,
            
        };

        let scratchpadBEsListELoadContainer={
            display : "inline-block",
            position : "relative",
            width  : 190,
            height  : 190,

            margin : 5,

            border : "",
            borderRadius : 4,

            background : "white",
            verticalAlign : "top",

            overflow : "hidden",
        }

        let loadListChildrenShowHideCss={
            position : "relative",
            height : 180,
            overflow : "auto",
            fontSize : 10,
        }
        if (loadListChildrenShowHide){
            loadListChildrenShowHideCss.display= "block";
        }else{
            loadListChildrenShowHideCss.display="none";
            loadListChildrenShowHideCss.height=0;

            scratchpadBEsListECss.height=70;
            scratchpadBEsListELoadContainer.height=16;

        }

        let scratchpadHeaderE

        if (params.showListLoadBox){
            scratchpadHeaderE=(()=>{
                    let E

                    E=(
                        <div
                            style={{
                                position : "relative",
                                display : "inline-block",                        

                                width : 200,
                                height : 50,

                                verticalAlign : "top",
                            }}
                        >

                            <input 
                                value={projNameCurrTxt}
                                placeholder="scratchpad name"
                                onChange={(e)=>{
                                    let val=e.target.value;
                                    setProjNameCurrTxt(val);
                                }}
                                onBlur={(e)=>{
                                    let val=e.target.value;                            
                                    
                                    let exists=false;
                                    let foundRec
                                    //if (scr.data){                                
                                        scratchpadBEsList.data.forEach((r,i)=>{
                                            if (r.name===val){
                                                exists=true;
                                                foundRec=r[mainProjID];
                                            }
                                        });
                                    //}

                                    if (exists){                                
                                        if (false){
                                            // load project
                                            let tmpRec={};
                                            tmpRec[mainProjID]=foundRec;
                                            scratchpadBEGetRec(tmpRec,(dt)=>{
                                                
                                                setProject(dt)
                                                setProjNameCurr(val);
                                                
                                            })
                                        }
                                    }
                                    
                                }}
                            />

                            <button
                                onClick={()=>{
                                    let iDloaded=false;
                                    let currID="";     

                                    let exists=false;
                                    let foundRec
                                

                                    if (project.data){
                                        if (project.data[mainProjID]){
                                            if (project.data[mainProjID].trim()!==""){
                                                iDloaded=true;
                                                currID=project.data[mainProjID]
                                            }
                                        }
                                    }
                                    
                                    
                                    if (iDloaded){
                                        let tmpRec={                          
                                            name : projNameCurrTxt,
                                            // mainProjID : project.data.scratchpadBEID,    
                                            data : data,   
                                            namespace : namespace,                             
                                        };

                                        tmpRec[mainProjID]=project.data[mainProjID];

                                        scratchpadBEUpdate(tmpRec,()=>{
                                            scratchpadBEListRecs({},()=>{})
                                        })
                                    }else{
                                        alert("no project ID Loaded")
                                    }
                                    
                                }}
                            >save</button>

                            <button
                                onClick={()=>{

                                    let exists=false;
                                    let foundRec;
                                    scratchpadBEsList.data.forEach((r,i)=>{
                                        if (r.name===projNameCurrTxt){
                                            exists=true;
                                            foundRec=r[mainProjID];
                                        }
                                    });

                                    if (exists){
                                        alert("name already exist on another project");
                                        return 
                                    }


                                    if (projNameCurrTxt.trim()===""){
                                        alert("name is empty");
                                        return ;
                                    }
                                    scratchpadBEAdd({                       
                                        name : projNameCurrTxt,       
                                        data : data,
                                        namespace : namespace,                 
                                    },()=>{
                                        scratchpadBEListRecs({ namespace : namespace,},()=>{})

                                        if (false){
                                            setProject({...projectDef});                            
                                        }
                                            
                                            //setFpSrc("");
                                            //setFpDst("")
                                            setProject({...projectDef});   
                                            //setName("");
                                            setData(JSON.parse(JSON.stringify(dataDef)));
                                            setDataTxt(JSON.stringify(dataDef));
                                            setNotes([...notesDef]);
                                            setNotesTxt(JSON.stringify(notesDef))
                                        
                                    });
                                }}
                            >
                                new
                            </button>

                            <button
                                onClick={()=>{
                                    let iDloaded=false
                                    if (project.data){
                                        if (project.data[mainProjID]){
                                            if (project.data[mainProjID].trim()!==""){
                                                iDloaded=true;
                                            }
                                        }
                                    }
                                    if (iDloaded){
                                        let tmpRec={}
                                        tmpRec[mainProjID]=project.data[mainProjID];
                                        scratchpadBERemove(tmpRec,()=>{
                                            scratchpadBEListRecs({ namespace : namespace,},()=>{})
                                        })
                                    }else{
                                        alert("no project ID Loaded")
                                    }
                                }}
                                
                            >
                                delete
                            </button>
                        </div>
                    )
                    return E;
            })();


            let style=scratchpadBEsListECss;

            style={...generalEachCss,...style};


            scratchpadBEsListE=(
                <div
                    style={style}
                >

                    <div
                        style={{

                        }}
                    >
                        {scratchpadHeaderE}
                    </div>

                    <div
                        style={scratchpadBEsListELoadContainer}
                    >

                        <div
                            style={{
                                cursor : "pointer"
                            }}
                            onClick={()=>{
                                setLoadListChildrenShowHide(!loadListChildrenShowHide);
                            }}
                        >
                            <label
                                style={{
                                    pointerEvents : "none"
                                }}
                                
                            >load</label>
                        </div>
                        <br/>
                        <div
                            style={loadListChildrenShowHideCss}
                        >
                        {arrE}
                        </div>
                    </div>
                </div>
            )
        }

    }


    // ---------------------------


  

        let notesManageBarE
        if (params.showManagerBar){
            notesManageBarE=(()=>{
                let E

                E=(
                    <div
                        style={{
                            position : "relative",
                            display : "block",                        
                        }}
                    >
                        <button                    
                            onClick={newNoteFn}
                        >new note</button>

                        


                    </div>
                );

                return E;

            })();
        }
        
        let notesE
        notesE=(()=>{
            let arrE=[];

            let styleDef={
                display : "inline-block",
                position : "relative",
            }

            notes.forEach((r,i)=>{
                let style={...styleDef}
                let props={}
                if (data.notesProps){
                    if (data.notesProps[r.uuid]){
                        if (data.notesProps[r.uuid].show!==undefined){
                            if (data.notesProps[r.uuid].show===false){
                                style.display="none";
                            }
                        }
                        if (data.notesProps[r.uuid].displayMode!==undefined){                            
                                props.displayMode=data.notesProps[r.uuid].displayMode;
                            
                        }
                    }
                }

                arrE.push(

                    <div
                        key={i + "_" + projNameCurrTxt}
                        style={style}
                    >
                        {(()=>{
                            if (props.displayMode===false){
                                return (
                                    <button                    
                                        style={{
                                            fontSize : 10,
                                            borderRadius : 3,
                                            border : "none",

                                            background : "red",
                                            color : "white",

                                            cursor : "pointer",
                                        }}
                                        onClick={()=>{                                           
                                            let foundIter=-1;
                                            notes.forEach((r2,i2)=>{
                                                if (r2.uuid===r.uuid){
                                                    foundIter=i2;
                                                }
                                            })
                                            if (foundIter > -1){
                                                setNotes((cst)=>{
                                                    let nst=[...cst]

                                                    nst.splice(foundIter,1);

                                                    return nst;
                                                })
                                                
                                            }
                                        }}
                                    >delete</button>
                                )
                            }
                        })()}
                        
                        <Note 
                            key={i + "_" + projNameCurrTxt}
                            data={r}
                            {...props}
                            //uuid={r.uuid}
                            onChangeData={(dt)=>{
                                if (dt.data){
                                    let nstNotes=[...notes];
                                    let nstData={...data};

                                    if (JSON.stringify(nstNotes[i])!==JSON.stringify(dt.data)){
                                        nstNotes[i]=dt.data;
                                    }
                                    if (JSON.stringify(nstData.notes[i])!==JSON.stringify(dt.data)){
                                        nstData.notes[i]=dt.data;
                                    }                                        

                                    setNotes((cst)=>{
                                        return nstNotes
                                    });
                                    setNotesTxt(JSON.stringify(nstNotes,null,2));
                                    setData((cst)=>{                                            
                                        return nstData
                                    });
                                    setDataTxt(JSON.stringify(nstData,null,2));
                                }                            
                            }}
                        />
                            
                    </div>
                )

            })

            return arrE;

        })();

    
        // ---------------------------

        let E=(
            <div
                style={{
                    display : "inline-block",
                }}
            >
                <div
                    style={{

                    }}
                >
                    {notesManageBarE}
                </div>
                <div
                    style={{
                        
                    }}
                >
                    {notesE}
                </div>
            </div>
        )

    // ---------------------------

        let jsonProjChildrenshowHideCss={            
            position : "relative",
        }
        if (jsonProjChildrenshowHide){
            jsonProjChildrenshowHideCss.display= "inline-block";
        }else{
            jsonProjChildrenshowHideCss.display="none";
        }

        

        

    // --------------------------
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
        
        style.width=width;

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

        
        if (props.getStyle){
            if (typeof(props.getStyle)==="function"){
                props.getStyle(style);
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
                        style={scratchpadMainTitleContainerCss}
                    > 
                        <label
                            style={scratchpadMainTitleCss}
                        >{scratchpadMainTitle}</label>

                        <label
                            style={{
                                margin : 4,
                            }}
                        >{name}</label>

                    </div>
                    {props.beforeE}

                    <div
                        style={{

                        }}
                    >

                        {scratchpadBEsListE}
                        {managerE}

                        {(()=>{
                            if (true){

                                let style={
                                    display : "inline-block",
                                    position : "relative",
                                    background : "lightgrey",
                                    padding  : 4,
                                    borderRadius : 4,
                                }

                                style={...generalEachCss,...style}
                                

                                return (
                                    <>
                                       
                                        <div
                                            style={style}
                                        >
                                            <div
                                                style={{
                                                    display : "inline-block",
                                                    position : "relative",
                                                    border : "solid thin grey",
                                                    borderRadius : 4,
                                                    background : "lightgrey",
                                                    cursor : "pointer",
                                                    padding : 4,
                                                }}
                                                onClick={()=>{
                                                    setJsonProjChildrenshowHide(!jsonProjChildrenshowHide)
                                                }}
                                            >
                                                <label
                                                    style={{
                                                        fontSize : 14,
                                                        pointerEvents : "none",
                                                    }}
                                                >json proj :
                                                </label>
                                            </div>
                                            <br/>
                                            <div
                                                style={jsonProjChildrenshowHideCss}                                              
                                            >                                            
                                                
                                                <div
                                                    style={{
                                                        display : "inline-block",
                                                        position : "relative",
                                                    }}
                                                >                                            
                                                    <label
                                                        style={{
                                                            fontSize : 12,
                                                        }}
                                                    >data :</label>
                                                    <br/>
                                                    <textarea
                                                        style={{
                                                            width : 200,
                                                            height : 200,
                                                            fontSize : 8,
                                                        }}
                                                        value={dataTxt}
                                                        onChange={(e)=>{
                                                            let val=e.target.value;
                                                            setDataTxt(val)
                                                        }}
                                                        onBlur={(e)=>{                                                
                                                            let val=e.target.value;
                                                            //console.log("val : " ,val);
                                                            let tmp
                                                            try{
                                                                tmp=JSON.parse(val);
                                                                setData((cst)=>{
                                                                    let nst={...cst};
                                                                    nst=tmp;
                                                                    return nst;
                                                                });
                                                                setNotes((cst)=>{
                                                                    let nst=[...cst];
                                                                    //console.log("nst : " ,nst);
                                                                    nst=tmp.notes;
                                                                    return nst;
                                                                });
                                                                setNotesTxt(JSON.stringify(tmp.notes ,null,2));
                                                            }catch(e){
                                                            alert("error : " + e.message) ;
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                
                                                <div
                                                    style={{
                                                        display : "inline-block",
                                                        position : "relative",
                                                    }}
                                                >

                                                    <label
                                                        style={{
                                                            fontSize : 12,
                                                        }}
                                                    >notes :</label>
                                                    <br/>
                                                    <textarea
                                                        style={{
                                                            width : 200,
                                                            height : 200,
                                                            fontSize : 8,
                                                        }}
                                                        //value={JSON.stringify(notes,null,2)}
                                                        value={notesTxt}
                                                        onChange={(e)=>{
                                                            let val=e.target.value;
                                                            setNotesTxt(val)                                                 
                                                        }}
                                                        onBlur={(e)=>{
                                                            let val=e.target.value;
                                                            try{
                                                                let tmp=JSON.parse(val);
                                                                setNotes(tmp);
                                                                let nstData=nst={...data}
                                                                nstData.notes=tmp;
                                                                setData((cst)=>{                                                        
                                                                    return nst;
                                                                });
                                                                setDataTxt(JSON.stringify(nstData.notes ,null,2));

                                                            }catch(e){
                                                                
                                                            }
                                                            
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                </>
                                )

                            }
                        })()}

                        {E}
                        
                        

                    </div>


                        {props.afterE}
                </div>
            </div>
        </div>
            
    )



}

