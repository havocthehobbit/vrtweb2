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

import { SchemasListLoad } from "../schemas/schema";

// useHook : ret- hook;string ,cmpt;string 

export const Cmpt=(props)=>{
    
    let [cmptName, setCmptName]=useState("")
    let [cmptNameTxt, setCmptNameTxt]=useState("")

    let [customHookShowHide, setCustomHookShowHide]=useState(false)
    let [customAPIShowHide, setCustomAPIShowHide]=useState(false)
    let [customDBShowHide, setCustomDBShowHide]=useState(false)

    let [currentSchemaData, setCurrentSchemaData]=useState({})
    
    
    

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
                    style={{
                        position : "relative",
                        
                    }}
                >
                    <label>schema</label>
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
                            value={JSON.stringify(currentSchemaData,null,2)}
                            onChange={()=>{

                            }}
                        />
                    </div>
                </div>


            <div
                style={{
                    position  : "relative",
                    width : 1000,
                    //height : 300,                    
                    height : style.height - 225,                    
                    overflow : "auto"
                }}  
            >
                

               
                <div
                    style={{...{
                        position  : "relative",
                        height : 200,
                        overflow : "auto",
                        background : "green",
                        marginTop : 10,
                        padding : 1, 
                        border : "solid thin grey"
                    },...{}}}  
                >
                    
                        <div>CustomHook</div>
                        <div
                            style={customHookShowHideCSS} 
                        >
                            <CustomHook />
                        </div>
                </div>

                
                <div
                    style={{...{
                        position  : "relative",
                        height : 200,
                        overflow : "auto",
                        background : "blue",
                        marginTop : 10,
                        padding : 1, 
                        border : "solid thin grey"
                    },...{}}}   
                >

                    <div>CustomAPI</div>
                    <div
                         style={customAPIShowHideCSS} 
                    >
                        <CustomAPI />                    
                    </div>
                </div>

                
                <div
                    style={{...{
                        position  : "relative",
                        height : 200,
                        overflow : "auto",
                        background : "yellow",
                        marginTop : 10,
                        padding : 1, 
                        border : "solid thin grey"
                    },...{}}}  
                >
                    <div>CustomDbAPI</div>
                    <div
                         style={customDBShowHideCSS} 
                    >
                        <CustomDbAPI />
                    </div>
                </div>
            </div>

        </div>
    )

}


