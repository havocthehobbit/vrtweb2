import { v4 as uuidv4 } from 'uuid';

let sn=[];


let tmpO={};

let recDef={
    uuid : "",

    name : "",   
    lang : "",    
    langs_other : [],
    type : "",
    subType : [],   
    text : "", 
    project_type : "", 
    project_version : "", 
    lang_version : "", 
};

/*

tmpO=fnNew();
tmpO.name="";
tmpO.lang="";
tmpO.type="";
tmpO.text=
`
`;

fnAdd(tmpO);

*/

let fnNew=()=>{
    let newTmp={...recDef}
    newTmp.uuid=uuidv4();
    return newTmp;
}

let fnAdd=(tmpO)=>{

    sn.push(tmpO);
}


// -------------------------------
// -------------------------------

    tmpO.tmpO=fnNew();
    tmpO.name="select";
    tmpO.lang="react";
    tmpO.type="input";
    tmpO.subType="";
    tmpO.text=
    `
    <select
        style={{
        }}
        onClick={()=>{
            
        }}
    >
        <option value={""} > </option>
    </select>
    `;

    fnAdd(tmpO);

// -------------------------------

    tmpO=fnNew();
    tmpO.name="checkbox";
    tmpO.lang="react";
    tmpO.type="input";
    tmpO.subType="";
    tmpO.text=
    `<input
        checked={someState}                                

        type={"checkbox"}
        style={{
        }}
        //readOnly={true}
        onChange={(e)=>{
            let val=e.target.checked;                                    
            setSomeState(val);        
        }}
    />
    `

    fnAdd(tmpO);

// -------------------------------

tmpO=fnNew();
tmpO.name="component Template 1";
tmpO.lang="react";
tmpO.type="template-file";
tmpO.subType="";
tmpO.text=
`import React,{ useEffect , useState,useRef, useContext } from 'react'
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
import { v4 as uuidv4 } from 'uuid';

//let feach=$cn.each
let tof=$cn.tof;
//let isUn=$cn.isUn
let isOb=$cn.isOb
//let cl=$cn.l

let deepCloneObj=(obj)=>{
    return JSON.parse(JSON.stringify(obj));
}

export const SchemasListLoad=(props)=>{ // onLoad , onClick ,onChangeProjectName , onChangeSchemaName
    
    let initC=useRef(true)
    
    let someObjStateDef={};
    if (props.someObj){
        someObjStateDef=deepCloneObj(props.someObj);
    }
    
    let [someState,setSomeState]=useState("");
    let [someObjState,setSomeObjState]=useState(someObjStateDef);


    useEffect(()=>{
        if (initC.current===false){            
            initC.current=true;

        }
    },[props.updateProjectList]);


    
    // -------------------------------

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

                styleSubMainFrame.height=785;
                
                styleSubMainFrame.borderRadius=5;
            
            }
        }

    // -------------------------------

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

                    New Component
        
                </div>
            </div>
        </div>
    )

}
`;

fnAdd(tmpO);

// -------------------------------




export const data=sn;