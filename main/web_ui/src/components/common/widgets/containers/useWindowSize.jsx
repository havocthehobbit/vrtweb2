import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
import { ContextStore as commonVLContext } from "../../../common/contextStore" ;


export const useWindowSize=()=>{
    let ctxStdL=useContext(commonVLContext)

    let wWidth=ctxStdL.windowSize.width
    let wHeight=ctxStdL.windowSize.height 

    let sizes={
        "800x600" : {

        },
    }
    let sizesArr=[

    ]

    return {
        wWidth , wHeight ,
        sizes,sizesArr,
    }

}