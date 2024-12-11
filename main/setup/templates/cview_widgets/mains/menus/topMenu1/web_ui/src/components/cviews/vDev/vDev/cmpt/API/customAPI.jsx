import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { customAPIdata } from "./customAPIdata"
// custom API
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
//import { githubDark } from '@uiw/codemirror-theme-github';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

export const CustomAPI=(props)=>{
       
    let nameSpaceAPIDef="nameSpaceAPI";
    if (props.nameSpaceAPI){
        nameSpaceAPIDef=props.nameSpaceAPI;
    }
    let nameAPIDef="nameAPI";
    if (props.nameAPI){
        nameAPIDef=props.nameAPI;
    }

    let [nameSpaceAPI, setNameSpaceAPI]=useState(nameSpaceAPIDef);
    let [nameSpaceAPITxt, setNameSpaceAPITxt]=useState(nameSpaceAPIDef);
    
    let [nameAPI, setNameAPI]=useState(nameAPIDef)
    let [nameAPITxt, setNameAPITxt]=useState(nameAPIDef)
    

    let customObj=customAPIdata.Obj({ name : nameAPI , nameSpace : nameSpaceAPI})
    //
    let chookDefFile=customObj.customAPI;
    let customAPIboilerplate=customObj.customAPIboilerplate;

    // --------------------------------------------------------------------------------


    useEffect(()=>{
        onChange({ value : chookDefFile})        
    },[chookDefFile]);

    useEffect(()=>{
        onChangeBoilerplate({ value : customAPIboilerplate})        
    },[customAPIboilerplate]);
    

    useEffect(()=>{

    },[customAPIboilerplate]);

    useEffect(()=>{
        if (nameSpaceAPI!==props.nameSpaceAPI){
            setNameSpaceAPI(props.nameSpaceAPI);
            setNameSpaceAPITxt(props.nameSpaceAPI);
          
        }
    },[props.nameSpaceAPI]);

    useEffect(()=>{
        if (nameAPI!==props.nameAPI){
            setNameAPI(props.nameAPI);
            setNameAPITxt(props.nameAPI);
        }
    },[props.nameAPI]);

    // --------------------------------------------------------------------------------

    let onChange=()=>{};
    if (props.onChange){
        if (typeof(props.onChange)==="function"){
            onChange=props.onChange;
        }
    }

    let onChangeBoilerplate=()=>{};
    if (props.onChangeBoilerplate){
        if (typeof(props.onChangeBoilerplate)==="function"){
            onChangeBoilerplate=props.onChangeBoilerplate;
        }
    }

    let onNameSpaceChange=()=>{};
    if (props.onNameSpaceChange){
        if (typeof(props.onNameSpaceChange)==="function"){
            onNameSpaceChange=props.onNameSpaceChange;
        }
    }

    let onNameChange=()=>{};
    if (props.onNameChange){
        if (typeof(props.onNameChange)==="function"){
            onNameChange=props.onNameChange;
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
            custom API

            <div
                style={{

                }}
            >
                <label>name Space API </label>                
                <br/>
                <input 
                    value={nameSpaceAPITxt}
                    onChange={(e)=>{
                        let val=e.target.value;
                        setNameSpaceAPITxt(val)
                    }}
                    onBlur={(e)=>{
                        let val=e.target.value;
                        setNameSpaceAPI(val)
                    }}
                />
            </div>

            <div
                style={{

                }}
            >
                <label>name  API </label>                
                <br/>
                <input 
                    value={nameAPITxt}
                    onChange={(e)=>{
                        let val=e.target.value;
                        setNameAPITxt(val)
                    }}
                    onBlur={(e)=>{
                        let val=e.target.value;
                        setNameAPI(val)
                    }}
                />
            </div>

            <div
                style={{

                }}
            >
                <label>custom API</label>                
                <br/>
                <CodeMirror 
                    style={{
                        textAlign : "left",
                        width : 1000,
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

           
        </div>
    )

}

