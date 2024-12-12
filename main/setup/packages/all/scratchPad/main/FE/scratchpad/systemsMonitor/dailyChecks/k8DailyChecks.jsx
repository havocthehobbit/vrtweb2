import React,{ useEffect , useState,useRef, useContext } from 'react'
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
import { v4 as uuidv4 } from 'uuid';

import { useKCSDCcustomers } from "./k8DailyChecks/customersFetchBE"

export const K8DailyChecksMain=(props)=>{ 
    let initC=useRef(true);

    /*
    let recChangeCB=(dt)=>{
        //alert(JSON.stringify(dt));
        if (dt.data){
            if (Array.isArray(dt.data.filepaths)){
                setFilepathsState(dt.data.filepaths);
            }else{
                setFilepathsState([...filepathsStateDef]);
            }
        }
    }
    */
    let {KCSDCcustomers, KCSDCcustomersDef, KCSDCcustomerss, KCSDCcustomerssList, 
        setKCSDCcustomers, setKCSDCcustomerss, setKCSDCcustomerssList, 
        KCSDCcustomersGetRec, KCSDCcustomersGetRecs, KCSDCcustomersListRecs, KCSDCcustomersAdd, KCSDCcustomersUpdate, KCSDCcustomersRemove, }=useKCSDCcustomers()


        useEffect(()=>{
            if (initC.current){
                initC.current=false;

                /*
                getFolderPathsBE((dt)=>{
                    if (dt){
                        if (dt.data){
                            setFolderPaths(dt.data)
                        }
                    }
                    
                })
                */
            }
        },[])
    


        let projectsE
        if (true){
            projectsE=(()=>{
                let arrE=[];
    
                
                if (!Array.isArray(KCSDCcustomerss)){
                    return;
                }
    
                //projects.forEach((r,i)=>{
                KCSDCcustomerss.forEach((r,i)=>{
                    
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

      
        let projectListE;
        if (KCSDCcustomerssList.data){
            let arrE=[];
            KCSDCcustomerssList.data.forEach((r,i)=>{

                // r.projectsVdevID
                // r.lastUpdate

                arrE.push(
                    <div
                        key={i}
                        style={{
                            borderBottom : "solid thin grey",
                            cursor : "pointer",
                        }}

                        onClick={()=>{
                            
                            //setProjNameCurrTxt(r.name);

                            KCSDCcustomersGetRec({ KCSDCcustomersID : r.KCSDCcustomersID},(dt)=>{
                                
                                //setProject(dt)
                                //setProjNameCurr(r.name);
                                
                            })
                        }}
                    >
                        {r.name}
                    </div>
                )

            });

            projectListE=(
                <div
                    style={{
                        display : "inline-block",
                        position : "relatiev",
                        width  : 200,

                        background : "lightblue",
                        
                    }}
                >
                    {arrE}
                </div>
            )

        }

        // -----------------------------------


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
    
        let styleSubMain={
            border : "solid thin lightgrey",
            margin : 6,
            borderRadius : 5,        
            overflow : "auto",
            
        }
    
        let styleSubMainFrame={
            width : "99%",
            borderRadius : 5,
            overflow : "hidden",
            borderRadius : 5, 
        }
    
        if (typeof(style.height)==="number"){
            styleSubMain.height = style.height - 10;
        }
        if (typeof(style.width)==="number"){
            styleSubMain.width = style.width - 10;
    
        }
    
        if (props.params){
            if (props.params.allActive){
                style.height=800;
    
                styleSubMain.height=780;
    
                styleSubMainFrame.height=785;            
                styleSubMainFrame.borderRadius=5;;
    
            }
        }


        return (
            <div
                style={style}
            >       
                <div
                    style={styleSubMainFrame}
                > 
                    <div
                        style={styleSubMain}
                    > 
                        <h1
                            style={{
                                color : "black"
                            }}
                        >Daily Checks</h1>

                        <div
                            style={{}}
                        >
                            <label>projects</label>
                            {projectsE}

                        </div>

                        <div
                            style={{

                            }}
                        >
                            {projectListE}
                        </div>
                    
            

                    </div>
                </div>
            </div>
        )


}