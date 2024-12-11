import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { customHookdata } from "./customHookdata"
// useHook : ret- hook;string ,cmpt;string 

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
//import { githubDark } from '@uiw/codemirror-theme-github';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';



export const CustomHook=(props)=>{
    
    let cmptNameDef="";
    if (props.componentName){
        cmptNameDef=props.componentName;
    }

    let [cmptName, setCmptName]=useState(cmptNameDef)
    let [cmptNameTxt, setCmptNameTxt]=useState(cmptNameDef)
    

    let customHookObj=customHookdata.useHook({ name : cmptName })
    let chookUseHook=customHookObj.hook;
    let chookDefFile=customHookObj.cmpt;

    // --------------------------------------------------------------------------------

    useEffect(()=>{
        if (props.componentName!==cmptName){
            setCmptName(props.componentName);
            setCmptNameTxt(props.componentName)
        }
    },[props.componentName]);


    useEffect(()=>{
        if (props.componentName!==cmptName){
            onChangeName(cmptName);
            // cmptNameTxt
        }
    },[cmptName]);

    
    useEffect(()=>{
        if (typeof(props.onChangeHook)==="function"){
            props.onChangeHook({ value : chookUseHook});
        }        
    },[chookUseHook]);


    useEffect(()=>{
        if (typeof(props.onChange)==="function"){
            props.onChange({ value : chookDefFile})  
        }       
    },[chookDefFile]);

    // --------------------------------------------------------------------------------


    let onChangeName=()=>{};
    if (props.onChangeName){
        if (typeof(props.onChangeName)==="function"){
            onChangeName=props.onChangeName;
        }
    }



    // --------------------------------------------------------------------------------




    // --------------------------------------------------------------------------------

    let style={
        position  : "relative",
        //background : "white",
        width : 1200,
        height : 300, 
        borderRadius : 8 ,
        //overflow : "hidden",

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

                }}
            >
                <label>component name</label>                
                <br/>                
                <input 
                    value={cmptNameTxt}
                    placeholder="ComponentName"
                    onChange={(e)=>{
                        let val=e.target.value;
                        setCmptNameTxt(val)
                    }}
                    onBlur={(e)=>{
                        let val=e.target.value;
                        setCmptName(val)
                    }}
                />
            </div>

            <div
                style={{

                }}
            >
                <label>Custom Compent File API Access from FE React</label>                
                <br/>
                <CodeMirror 
                    style={{
                        textAlign : "left",
                        fontSize : 12,

                    }}
                    value={chookDefFile} 
                    height="200px"
                    extensions={[javascript({ jsx: true })]} 
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
                {/*
                <textarea 
                    style={{
                        width : 800,
                        height : 300
                    }}
                    value={chookDefFile}
                    onChange={(e)=>{

                    }}
                />
                */}
            </div>

            <div
                style={{

                }}
            >
                <label>use Custom Component</label>                
                <br/>
                <CodeMirror 
                    style={{
                        textAlign : "left",
                        width : 800,
                        height : 50,
                        fontSize : 12,
                    
                    }}
                    value={chookUseHook} 
                    //height="200px"
                    extensions={[javascript({ jsx: true })]} 
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
                {/*
                <textarea 
                    style={{
                        width : 800,
                        height : 50
                    }}
                    value={chookUseHook}
                    onChange={(e)=>{

                    }}
                /> */}
            </div>
        </div>
    )

}


