import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';



export const Server=(props)=>{
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
            Server
            <div
                style={{

                }}
            >   
                <div
                    style={{
                        
                    }}
                >   
                    has PM2 <input 
                                value={Math.random()} 
                                type="checkbox"
                                onClick={()=>{

                                }} 
                            />
                </div>
                <div
                    style={{
                        
                    }}
                >   
                    has Rev Proxy <input 
                                value={Math.random()} 
                                type="checkbox"
                                onClick={()=>{

                                }} 
                            />
                </div>
                <div
                    style={{
                        
                    }}
                >   
                    vrtweb2 settings


                      
                </div>
            </div>

        </div>
    )

}


