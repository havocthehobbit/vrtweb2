import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { customAPIdata } from "./customAPIdata"
// custom API

export const CustomAPI=(props)=>{
       
    let [nameSpaceAPI, setNameSpaceAPI]=useState("nameSpaceAPI")
    let [nameSpaceAPITxt, setNameSpaceAPITxt]=useState("nameSpaceAPI")
    
    let [nameAPI, setNameAPI]=useState("nameAPI")
    let [nameAPITxt, setNameAPITxt]=useState("nameAPI")
    

    let customObj=customAPIdata.Obj({ name : nameAPI , nameSpace : nameSpaceAPI})
    //
    let chookDefFile=customObj.customAPI;

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

           
        </div>
    )

}

