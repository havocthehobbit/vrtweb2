import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { useWindowSize} from "../../../common/widgets/containers/useWindowSize";



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

export const VDev=(props)=>{

    let [stylesSt,setStylesSt]=useState({ 
        "Db" : { "show" : true, "display" : "inline-block" },
        "Server" : { "show" : true, "display" : "inline-block" },
        "CiCd" : { "show" : true, "display" : "inline-block" },
        "Features" : { "show" : true, "display" : "inline-block" },
        "Bugs" : { "show" : true, "display" : "inline-block" },
        "Notes" : { "show" : true, "display" : "inline-block" },
        "Views" : { "show" : true, "display" : "inline-block" },
        "Cmpt" : { "show" : true, "display" : "inline-block" },
        "Schemas" : { "show" : true, "display" : "inline-block" },
        "Projects" : { "show" : true, "display" : "inline-block" },
        
    });    
    let [stylesStAll,setStylesStAll]=useState({ "show" : true})


    
    
    let wSize=useWindowSize();

    let style={ 
        position : "relative",
        display : "block",
        top : 50,
        margin : 10

    };
    if (props.style){
        style={...style,...props.style};
    }
    
 
    
    
    let styles={
        "Db" : {position : "relative"},
        "Server" : {position : "relative"},
        "CiCd" : {position : "relative"},
        "Features" : {position : "relative"},
        "Bugs" : {position : "relative"},
        "Notes" : {position : "relative"},
        "Views" : {  width : wSize.wWidth - 50 ,position : "relative"   },
        "Cmpt" : {position : "relative"},
        "Schemas" : {position : "relative"},
        "Projects" : {position : "relative"},
    }
  
    

    if (wSize.wWidth<2600){
        //viewsStyle.width=1750
    }
    if (wSize.wWidth<1800){
       // viewsStyle.width=1750
    }
    if (wSize.wWidth<1600){
       // viewsStyle.width=1750
    }

    let tmp="";
    for (let p in stylesSt ){
        tmp=p;
        if (stylesSt[tmp].show==false){
            styles[tmp].display="none"
        }else{
            styles[tmp].display=stylesSt[tmp].display
        }
    }

    return (
        <div
            style={style}
        >
            DEV

            <div
                style={{
                    position : "relative",
                    display : "block",
                }}
            >   {
                    (()=>{
                        let arrE=[]

                        for (let p in stylesSt ){
                            let bg="lightgrey"
                            if (stylesSt[p].show===false){
                                bg="grey"
                            }

                            arrE.push(
                                <div
                                    key={p}
                                    style={{
                                        position :"relative",
                                        display : "inline-block",
                                        background : bg,
                                        width : 30,
                                        height : 9,
                                        margin : 2,
                                        padding : 2,
                                        paddingTop : 0,
                                        cursor : "pointer",
                                        overflow : "hidden",
                                        fontSize : 9,

                                    }}
                                    onClick={()=>{
                                        // stylesSt["Db"].show
                                        let tmp=p; //"Db";
                                        let show=!stylesSt[tmp].show;
                                        setStylesSt((st)=>{
                                            let nst={...st};

                                            nst[tmp].show=show;

                                            return nst;
                                        })
                                    }}
                                >
                                    {p}
                                </div>
                            );                            
                        };

                        let bg="lightgrey"
                        if (setStylesStAll.show===false){
                            bg="grey"
                        }
                        let p2="allconts"
                        arrE.push(
                            <div
                                key={p2}
                                style={{
                                    position :"relative",
                                    display : "inline-block",
                                    background : bg,
                                    width : 30,
                                    height : 9,
                                    margin : 2,
                                    padding : 2,
                                    paddingTop : 0,
                                    cursor : "pointer",
                                    overflow : "hidden",
                                    fontSize : 9,

                                }}
                                onClick={()=>{                                    
                                    let show=!stylesStAll.show;
                                    setStylesStAll((st)=>{
                                        let nst={...st};
                                        nst.show=show;
                                        return nst;
                                    });
                                    setStylesSt((st)=>{
                                        let nst={...st};

                                        for (let p3 in nst ){
                                            nst[p3].show=show;
                                        };

                                        return nst;
                                    })
                                    
                                }}
                            >
                                {"all"}
                            </div>
                        );

                        return arrE

                    })()
                
                }

            </div>
            
            <Db 
                style={{...{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                },...styles["Db"]}}
            />

            <Server
                style={{...{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                },...styles["Server"]}}
            />
            
            <CiCd
                style={{...{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                },...styles["CiCd"]}}
            />  

            <Features
                style={{...{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                },...styles["Features"]}}
            /> 
            
            <Bugs
                style={{...{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                },...styles["Bugs"]}}
            />  

            <Notes
                style={{...{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                },...styles["Notes"]}}
            />  

            <br/>

            <Views
                style={
                    {...{ 
                        position : "relaive",
                        display : "inline-block",
                        margin : 5 ,
                        width : 600,
                    },...styles["Views"]}
                }
            />
            <br/>

            <Cmpt
                style={{...{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 ,
                    height : 600
                },...styles["Cmpt"]}}
            />
            
            <br/>
            

            <Schemas
                style={{...{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 ,
                    height : 600
                },...styles["Schemas"]}}
            />


            <Projects
                style={{...{ 
                    position : "relaive",
                    display : "inline-block",
                    margin : 5 
                },...styles["Projects"]}}
            />

            
            

        </div>
    )

}