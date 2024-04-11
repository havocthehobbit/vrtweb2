import React,{ useEffect , useState,useRef, useContext } from 'react'
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';

import { useProjectsVdev } from './projects/useProjectsVdev';

export const Projects=(props)=>{ 

    let [projects,setProjects]=useState([]);
    let [projNameCurr,setProjNameCurr]=useState("");
    


    let {projectsVdev, projectsVdevDef, projectsVdevs, projectsVdevsList, setProjectsVdev, 
        setProjectsVdevs, setProjectsVdevsList, projectsVdevGetRec, projectsVdevGetRecs, 
        projectsVdevListRecs, projectsVdevAdd, projectsVdevUpdate, projectsVdevRemove, }=useProjectsVdev()
    

    let saveProjectFn=()=>{
        
    }

    

    let projectsE
    if (true){
        projectsE=(()=>{
            let arrE=[];

            
            if (!Array.isArray(projectsVdevs)){
                return;
            }

            //projects.forEach((r,i)=>{
            projectsVdevs.forEach((r,i)=>{
                
                let tmpR
                tmpR=JSON.stringify(r); // JSON.stringify(r,null,2);
                arrE.push(
                    <div
                        style={{

                        }}
                    >
                        {tmpR}
                    </div>
                )

            })


        })()
    }

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

    return (
        <div
             style={style}
        >       
            <h1
                style={{
                    color : "black"
                }}
            >Projects</h1>
            
            
            <input 
                placeholder={'Project Name...'}
                value={projNameCurr}
                onChange={(e)=>{
                    let val=e.target.value;
                    setProjNameCurr(val);
                }}
            />
            <br/>
            <button
                onClick={()=>{
                    projectsVdevAdd({                            
                        name : projNameCurr,
                        
                    },()=>{
                        projectsVdevListRecs({},()=>{})
                    })
                }}
            >
                save
            </button>

            <button
                style={{

                }}
                onClick={()=>{

                }}
            >
                archive
            </button>

            <button
                style={{

                }}
                onClick={()=>{

                }}
            >
                export
            </button>

            <br/>

            <div
                style={{}}
            >
                <label>projects</label>
                {projectsE}

            </div>
            
            

        </div>
    )

}