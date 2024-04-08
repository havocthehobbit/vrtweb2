import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';

import { Db } from "./db/db"
import { Server } from "./Server/server"
import { Views } from "./views/views"
import { CiCd } from "./CICD/cicd"
import { Features } from "./features/features"
import { Bugs } from "./bugs/bugs"
import { Notes } from "./notes/notes"
import { Cmpt } from "./cmpt/cmpt"
import { Schemas } from "./schemas/schema"
import { Projects } from "./projects/projects"

export const vDev=(props)=>{
    

    return (
        <div
            style={{ 
                position : "relative",
                top : 50,
                margin : 10

            }}
        >
            DEV
            
            <Db 
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                }}
            />

            <Server
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                }}
            />

            <Views
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                }}
            />

            
            <CiCd
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                }}
            />  

            <Features
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                }}
            /> 
            
            <Bugs
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                }}
            />  

            <Notes
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                }}
            />  



            <Cmpt
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                }}
            />
            
            
            <Schemas
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 ,
                    height : 600
                }}
            />


            <Projects
                style={{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                }}
            />

            
            

        </div>
    )

}