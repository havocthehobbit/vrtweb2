import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { customHookdata } from "./customHookdata"
// useHook : ret- hook;string ,cmpt;string 

export const CustomHook=(props)=>{
    
    let [cmptName, setCmptName]=useState("ComponentName")
    let [cmptNameTxt, setCmptNameTxt]=useState("ComponentName")
    

    let customHookObj=customHookdata.useHook({ name : cmptName })
    let chookUseHook=customHookObj.hook;
    let chookDefFile=customHookObj.cmpt;

    let style={
        position  : "relative",
        background : "white",
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
                <textarea 
                    style={{
                        width : 800,
                        height : 300
                    }}
                    value={chookDefFile}
                    onChange={(e)=>{

                    }}
                />
            </div>

            <div
                style={{

                }}
            >
                <label>use Custom Component</label>                
                <br/>
                <textarea 
                    style={{
                        width : 800,
                        height : 50
                    }}
                    value={chookUseHook}
                    onChange={(e)=>{

                    }}
                />
            </div>
        </div>
    )

}


