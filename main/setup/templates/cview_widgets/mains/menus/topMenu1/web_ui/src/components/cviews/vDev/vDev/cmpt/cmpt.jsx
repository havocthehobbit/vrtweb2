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

// useHook : ret- hook;string ,cmpt;string 

export const Cmpt=(props)=>{
    
    let [cmptName, setCmptName]=useState("")
    let [cmptNameTxt, setCmptNameTxt]=useState("")

    let [customHookShowHide, setCustomHookShowHide]=useState(false)
    let [customAPIShowHide, setCustomAPIShowHide]=useState(false)
    let [customDBShowHide, setCustomDBShowHide]=useState(false)

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

    let customHookShowHideCSS={ display : "none"}
    if (customHookShowHide){
        customHookShowHideCSS.display="block"
    }
    
    let customAPIShowHideCSS={ display : "none"}
    if (customAPIShowHide){
        customAPIShowHideCSS.display="block"
    }
    
    let customDBShowHideCSS={ display : "none"}
    if (customDBShowHide){
        customDBShowHideCSS.display="block"
    }
    

    return (
        <div
            style={style}
        >
            Component
            <br/>

            <div
                style={{
                    position  : "relative",
                    width : 1000,
                    height : 300,                    
                    overflow : "auto"
                }}  
            >
                <button 
                    onClick={()=>{
                        setCustomHookShowHide(!customHookShowHide);
                    }}
                >show/hide CustomHook</button>
                <button 
                    onClick={()=>{
                        setCustomAPIShowHide(!customAPIShowHide);
                    }}
                >show/hide CustomAPI</button>  
                <button 
                    onClick={()=>{
                        setCustomDBShowHide(!customDBShowHide);
                    }}
                >show/hide CustomDbAPI</button>  


                <div
                    style={{...{
                        position  : "relative",
                        height : 200,
                        overflow : "auto",
                        background : "green",
                        marginTop : 10,
                    },...customHookShowHideCSS}}  
                >
                    <CustomHook />
                    
                </div>

                
                <div
                    style={{...{
                        position  : "relative",
                        height : 200,
                        overflow : "auto",
                        background : "blue",
                        marginTop : 10,
                    },...customAPIShowHideCSS}}   
                >
                    <CustomAPI />
                    
                </div>

                
                <div
                    style={{...{
                        position  : "relative",
                        height : 200,
                        overflow : "auto",
                        background : "yellow",
                        marginTop : 10,
                    },...customDBShowHideCSS}}  
                >
                    <CustomDbAPI />
                    
                </div>
            </div>

        </div>
    )

}


