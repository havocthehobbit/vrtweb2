import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';

import { ScratchPad  } from './scratchpad/scratchPad';


export const Notes=(props)=>{
    let [mainNoteText, setMainNoteText]=useState("")


    let style={
        position  : "relative",
        background : "white",
        width : 300,
        height : 300, 
        borderRadius : 8 ,
        overflow : "hidden",

    }
    if (props.style){
        style={...style,...props.style}
    }

    return (
        <div
            style={style}
        >
            Notes
            <br/>
            <ScratchPad
                namespace="vDevNotes"
                style={{
                    display :"inline-block",
                    position : "relative",
                    //background : "",
                    //width : widthScratchPatch,
                    //height  : 800,
                    margin : 5,
                }}                
            />
        </div>
    )

}


