import React,{ useEffect , useState,useRef, useContext } from 'react'
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
import { v4 as uuidv4 } from 'uuid';


import { data as snippetsImportData} from './staticData/snippetsData';

//let feach=$cn.each
let tof=$cn.tof;
//let isUn=$cn.isUn
let isOb=$cn.isOb
//let cl=$cn.l

let fileDef={
    name : "",
    uuid : "",
    text : "",
    type : "",
    lasteEditDateTime : "",
    lasteEditDateTimeWrite : "",
}

export const IDE=(props)=>{ 
    let initC=useRef(true)


    let[fileCurr,setfileCurr]=useState(""); // current selected tab
    let[fileSection,setSection]=useState("");// current view split section/layout
    let[colorMode,setColorMode]=useState("light");

    let[projectTypesSt,setPojectTypesSt]=useState("javascript");
    let[fileTypesSt,setFileTypesSt]=useState("javascript-src");

    


    let Files=[]

    // ------------------------------------------------
        let projectTypesData=[
            {
                "name"  : "custom",
            },
            {
                "name"  : "rust",
            },
            {
                "name"  : "tauri",
            },
            {
                "name"  : "bevy",
            },
            {
                "name"  : "react",
            },
            {
                "name"  : "nodejs",
                
            },
            {
                "name"  : "javascript",
                
            }
        ]

        let fileTypesData=[
            { 
                "name" : "unknown", 
                "ext" : "",
            },
            { 
                "name" : "text", 
                "ext" : "txt",
            },
            { 
                "name" : "html", 
                "ext" : "html",
            },                        
            { 
                "name" : "rust-src", 
                "ext" : "rs",
            },
            { 
                "name" : "golang-src", 
                "ext" : "go",
            },
            { 
                "name" : "c-src", 
                "ext" : "c",
            },
            { 
                "name" : "cpp-src", 
                "ext" : "cpp",
            },
            { 
                "name" : "python-src", 
                "ext" : "py",
            },
            { 
                "name" : "javascript-src", 
                "ext" : "js",
            },
            { 
                "name" : "bash", 
                "ext" : "bash",
            },
            { 
                "name" : "json", 
                "ext" : "json",
            },
            { 
                "name" : "xml", 
                "ext" : "xml",
            },
            { 
                "name" : "yaml", 
                "ext" : "yaml",
            },
        ]
       


    // ------------------------------------------------


        useEffect(()=>{
            if (initC.current===false){            
                initC.current=false;
            }
        },[]);


    // ------------------------------------------------        

        let titleE
        let Title=()=>{
            let style={};
            let text="IDE";
            return (
                <div
                    style={style}
                >
                    <label>{text}</label>
                </div>
            )
        }
        if (true){
            titleE=(Title)()
        }


        let projTypeSelectE
        let projTypeSelect=()=>{
            let arrE=[]

            projectTypesData.forEach((r,i)=>{
                arrE.push(
                    <option
                        key={i}
                        value={r.name}
                    >{r.name}</option>
                )
            })


            let style={
                display : "inline-block",
                verticalAlign : "top",
            };
            
            return (
                <div
                    style={style}
                >
                    <select
                        onChange={(e)=>{
                            let val=e.target.value;
                            setPojectTypesSt(val);
                        }}
                    >
                        {arrE}
                    </select>
                </div>
            )
        }
        if (true){
            projTypeSelectE=(projTypeSelect)()
        }

        let fileTypeSelectE
        let FileTypeSelect=()=>{
            let arrE=[];
            
            fileTypesData.forEach((r,i)=>{
                arrE.push(
                    <option
                        key={i}
                        value={r.name}
                    >{r.name}</option>
                )
            })

            let style={
                display : "inline-block",
                verticalAlign : "top",
            };
            
            return (
                <div
                    style={style}
                >
                    <select>
                        {arrE}
                    </select>
                </div>
            )
        }
        if (true){
            fileTypeSelectE=(FileTypeSelect)()
        }


        let colorModeE
        let ColorMode=()=>{
            let arrE=[];


            let style={
                display : "inline-block",
                verticalAlign : "top",
            };
            
            return (
                <div
                    style={style}
                >
                    <select
                        onChange={(e)=>{
                            let val=e.target.value
                            setColorMode(val)
                        }}
                    >
                        <option value={"light"} >light</option>
                        <option value={"dark"} >dark</option>
                    </select>
                </div>
            )
        }
        if (true){
            colorModeE=(ColorMode)()
        }



        let snippetsboxE, Snippetsbox;
        if (true){
            Snippetsbox=()=>{
                return (
                    <div
                        style={{
                            display : "inline-block",
                            verticalAlign : "top",
                        }}
                    >
                        <Snippets />
                    </div>
                )
            }
            snippetsboxE=(Snippetsbox)();
        }
        


    // ------------------------------------------------


    // ------------------------------------------------


        let style ,styleSubMain,styleSubMainFrame ;
        if (true){
            style={       
                position  : "relative",
                //display   : "inline-block",
                background : "white",
                width : 1200,
                height : 300, 
                borderRadius : 8 ,
                overflow : "hidden",
                padding : 5,

            };
            if (props.style){
                style={...style,...props.style}
            }

            styleSubMain={
                border : "solid thin lightgrey",
                margin : 6,
                borderRadius : 5,
                //overflow : "hidden",
                
                overflow : "auto",
            }

            styleSubMainFrame={
                
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
                    
                    styleSubMainFrame.borderRadius=5;
                    
                }
            }
        }

        if (colorMode==="dark"){
            style.background="black";
            style.color="white";
        }

    // ------------------------------------------------
    

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
                    {titleE}
                    
                    <br/>
                    {colorModeE}
                    {projTypeSelectE}
                    {fileTypeSelectE}

                    

                    <TextViewer
                    
                    />

                    {snippetsboxE}


                </div>
            </div>
        </div>
    )


} 

export const ProjectManagerToolbar=(props)=>{ 
    let initC=useRef(true)


    let Files=[]

    let style={

    };

    return (
        <div
            style={style}
        >
            <div
                style={{
                    display : "inline-block",
                    margin : 2,
                    padding : 4,
                    border : "solid thin lightrey"
                }}
            >
                <label
                    style={{
                        pointerEvents : "none",
                    }}
                >new</label>                
            </div>


            <div
                style={{
                    display : "inline-block",
                    margin : 2,
                    padding : 4,
                    border : "solid thin lightrey"
                }}
            >
                <label
                    style={{
                        pointerEvents : "none",
                    }}
                >save</label>                
            </div>



        </div>
    )


} 




export const TextViewer=(props)=>{ 
    let initC=useRef(true)

    let valueDef="";
    if (props.value){
        valueDef=props.value;
    }

    let [value,setValue]=useState(valueDef);

    // ----------------------------------------------------

        useEffect(()=>{
            if (initC.current===false){            
                initC.current=false;
            }
        },[]);

    // ----------------------------------------------------


    // ----------------------------------------------------

    // ----------------------------------------------------

        let style={
            display : "inline-block",
            margin : 4,
            padding : 4,
            background : "orange",

            borderRadius : 4,
            overflow : "hidden",
        };

        if (props.style){
            style={...style,...props.style}
        }
        if (props.styleOverride){
            style=props.styleOverride;
        }

    // ----------------------------------------------------
    

    return (
        <div
            style={style}
        >   

            <textarea
                style={{
                    width : 800,
                    height : 400,
                }}
                value={value}
                onChange={(e)=>{
                    let val=e.target.value;
                    setValue(val)
                }}
                onBlur={(e)=>{
                    let val=e.target.value;
                    //setValue(val)
                }}

            />  

        </div>
    )

} 

export const MetaLanguageViewer=(props)=>{ // Psuedo code visualiser like language , used to be able to convert between paradimes and language and files 
    let initC=useRef(true)

    let valueDef="";
    if (props.value){
        valueDef=props.value;
    }

    let [value,setValue]=useState(valueDef);

    let style={

    };

    return (
        <div
            style={style}
        >   

            <textarea
                value={value}

            />

        </div>
    )

} 

export const SyntaxTreeViewer=(props)=>{ // Custom AST view to understand your program component higher archy
    let initC=useRef(true)

    let valueDef="";
    if (props.value){
        valueDef=props.value;
    }

    let [value,setValue]=useState(valueDef);

    let style={

    };

    return (
        <div
            style={style}
        >   

            <textarea
                value={value}

            />

        </div>
    )

} 

export const Layouts=(props)=>{  // split screens layouts 
    let initC=useRef(true)


    let Files=[]

    let style={

    };

    return (
        <div
            style={style}
        >
            GUILayouts
        </div>
    )


}



export const FileBrowser=(props)=>{ 
    let initC=useRef(true)


    let Files=[]

    let style={

    };

    return (
        <div
            style={style}
        >
            FileBrowser
        </div>
    )


} 


export const Snippets=(props)=>{ 
    let initC=useRef(true)

    let [curr,setCurr]=useState("");
    let [currRec,setCurrRec]=useState("");

    let [cbTest,setCbTest]=useState(false);


    let Files=[]


    // --------------------------------------

    let useSnipE,UseSnip;
    if (true){
        UseSnip=()=>{
            let E;
            let arrE=[];
            E=(
                <div
                    style={{
                        display : "inline-block",
                        verticalAlign : "top",
                        margin : 2,
                    }}
                >
                     <button
                        onClick={()=>{

                        }}
                    >add</button>
                </div>
            )


            return E;
        };
        useSnipE=(UseSnip)();

    }

   

    // --------------------------------------
    
    let listE,List;
    if (true){
        List=()=>{
            let E;
            let arrE=[];

            if (Array.isArray(snippetsImportData)){
                
                let cssEach={
                    //display : "inline-block",
                    borderBottom : "solid thin lightgrey",
                    fontSize : 12,
                    cursor : "pointer"
                };

                snippetsImportData.forEach((r,i)=>{
                    let cssEachInst={...cssEach};

                    if (curr===r.uuid){
                        cssEachInst.background="lightyellow";
                    }
                    arrE.push(
                        <div
                            key={i}
                            style={cssEachInst}
                            onClick={()=>{
                                setCurr(r.uuid);
                                setCurrRec(r);
                            }}
                        >
                            {r.name} 
                            

                        </div>
                    )


                });

            }

           


            E=(
                <div
                    style={{
                        display : "inline-block",
                        verticalAlign : "top",
                        margin : 2,
                    }}
                >
                    {arrE}
                </div>
            )


            return E;
        };
        listE=(List)();

    }
    
    let snippetE,Snippet            
    if (currRec){
        let Snippet=()=>{
            return (
                <div
                    style={{
                        display : "inline-block",
                        verticalAlign : "top",
                        margin : 2,
                    }}
                >
                    <label
                        style={{

                        }}
                    >
                        {currRec.name}
                    </label>
                    <br/>
                    
                    <div
                        style={{
                            display : "inline-block",
                            verticalAlign : "top",
                        }}
                    >
                        <textarea 
                            style={{
                                width : 400,
                                height : 200,

                                verticalAlign : "top",
                                margin : 2,
                            }}

                            value={currRec.text}
                            onChange={(e)=>{

                            }}
                        />
                    </div>

                </div>
            )
        }
        snippetE=(Snippet)()
    }
    
    // --------------------------------------
    
    
    
    
    // --------------------------------------

    let style={

    };

    return (
        <div
            style={style}
        >
            Snippets
            <br/>
            {listE}

            {snippetE}


        </div>
    )


} 

export const Templates=(props)=>{ 
    let initC=useRef(true)


    let Files=[]

    let style={

    };

    return (
        <div
            style={style}
        >
            Templates
        </div>
    )


}

export const GUILayouts=(props)=>{  // form/gui editor/viewer
    let initC=useRef(true)


    let Files=[]

    let style={

    };

    return (
        <div
            style={style}
        >
            GUILayouts
        </div>
    )


}





