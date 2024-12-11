import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { customDBdata } from "./customDBdata.js"
// custom DB API
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
//import { githubDark } from '@uiw/codemirror-theme-github';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';


export const CustomDbAPI=(props)=>{
           
    let cmptNameDef="ComponentName";
    if (props.componentName){
        cmptNameDef=props.componentName;
    }

    let cmptTableNameDef="TableName";
    if (props.cmptTableNameDef){
        cmptTableNameDef=props.cmptTableNameDef;
    }

    let [cmptName, setCmptName]=useState(cmptNameDef)    
    let [cmptNameTxt, setCmptNameTxt]=useState("ComponentName")
    
    let [cmptTableName, setCmptTableName]=useState(cmptTableNameDef)    
    let [cmptTableNameTxt, setCmptTableNameTxt]=useState("ComponentName")
    

    let customObj=customDBdata.Obj({ name : cmptName })
    //let chookUseHook=customObj.hook;
    let chookDefFile=customObj.customDB;
    let chookDefBoilerplate=customObj.boilerplate;

    useEffect(()=>{
        if (props.componentName!==cmptName){
            setCmptName(props.componentName);
            setCmptNameTxt(props.componentName)
        }
    },[props.componentName])

    useEffect(()=>{
        if (props.componentTableName!==cmptTableName){
            setCmptTableName(props.componentTableName);
            setCmptTableNameTxt(props.componentTableName)
        }
    },[props.componentTableName])

     

    useEffect(()=>{
        onChange({ value : chookDefFile})        
    },[chookDefFile]);

    useEffect(()=>{
        onTableNameBoilerplate({ value : chookDefBoilerplate})        
    },[chookDefBoilerplate]);

    // --------------------------------------------------------------------------------

    let onChange=()=>{};
    if (props.onChange){
        if (typeof(props.onChange)==="function"){
            onChange=props.onChange;
        }
    }

    let onNameChange=()=>{};
    if (props.onNameChange){
        if (typeof(props.onNameChange)==="function"){
            onNameChange=props.onNameChange;
        }
    }

    let onTableNameChange=()=>{};
    if (props.onTableNameChange){
        if (typeof(props.onTableNameChange)==="function"){
            onTableNameChange=props.onTableNameChange;
        }
    }

    let onTableNameBoilerplate=()=>{};
    if (props.onTableNameBoilerplate){
        if (typeof(props.onTableNameBoilerplate)==="function"){
            onTableNameBoilerplate=props.onTableNameBoilerplate;
        }
    }



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
  
            custom DB API
            <div
                style={{

                }}
            >
                <label>component name</label>                
                <br/>
                <input 
                    placeholder="ComponentName"
                    value={cmptNameTxt}
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
                        width : 800,
                        height : 300,
                        fontSize : 12,

                    }}
                    value={chookDefFile} 
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
                {/*}
                <textarea 
                    style={{
                        width : 800,
                        height : 300
                    }}
                    value={chookDefFile}
                    onChange={(e)=>{

                    }}
                />*/}
            </div>

       
        </div>
    )

}

