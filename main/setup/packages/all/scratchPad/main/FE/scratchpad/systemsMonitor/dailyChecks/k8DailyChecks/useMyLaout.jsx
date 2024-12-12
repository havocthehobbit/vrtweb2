import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
import $gl from "../../../../../common/globallib";
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../../common/libNative"
import { v4 as uuidv4 } from 'uuid';
import { ContextRoutes } from "../../../../context/contextRoutes" ;

import { useWindowSize } from "../../../../../common/widgets/containers/useWindowSize";

//let feach=$cn.each
let tof=$cn.tof
//let isUn=$cn.isUn
let isOb=$cn.isOb
//let cl=$cn.l

export const useMyLayout=(props)=>{
    let ret={}
    let allState={

    }
    if (props.allState){
        allState=props.allState
    }   

    let currStateDef=""
    if (props.currStateDef){
        currStateDef=props.currStateDef
    }    

    let [currState,setCurrState]=useState(currStateDef)
    let initC=useRef(true)

    let {wWidth,wHeight}=useWindowSize()

    // ====================================================================
    
        useEffect(()=>{
            if (initC.current){
                initC.current=false;
                
            }
        },[])

        useEffect(()=>{
            if (props.currState){
                if (typeof(props.currState)==="string"){
                    setCurrState(props.currState)
                }
            }
        },[props.currState])


     // ====================================================================



       let style={
            position : "relative",
            //top : 80,
            //margin : 20
        }
        if (props.style){
            style={...style,...props.style}
        }


    // ====================================================================
        // components

        let posConts=[]
        let posContsStates={};
        let posContsO={};
        let name="";
        
        /*  //cant have multiple components that can be children of views
            name="menu";
            posContsO[name]={
                name : name,
                seq : 2,
                e : (
                        <div
                            key={name}
                            style={menuStyle}
                        >
                            <h4>menu</h4>  
                            
                            <div
                                menuname={"viewCards"}
                                style={{
                                    position : "relative",
                                    display : "inline-block",
                                    cursor : "pointer",
                                }}
                                onClick={(e)=>{
                                    let menuname=e.target.getAttribute("menuname");
                                    setCurrState(menuname)
                                }}
                            >
                                <label
                                    menuname={"viewCards"}
                                >Cards</label>
                            </div>           
                            <div
                                menuname={"viewSummary"}
                                style={{
                                    position : "relative",
                                    display : "inline-block",
                                    cursor : "pointer",
                                }}
                                onClick={(e)=>{
                                    let menuname=e.target.getAttribute("menuname");
                                    setCurrState(menuname)
                                }}
                            >
                                <label
                                    menuname={"viewSummary"}
                                >Summary</label>                            
                            </div>           
                            <div
                                menuname={"editSettings"}
                                style={{
                                    position : "relative",
                                    display : "inline-block",
                                    cursor : "pointer",
                                }}
                                onClick={(e)=>{
                                    let menuname=e.target.getAttribute("menuname");
                                    setCurrState(menuname)
                                }}
                            >
                                <label
                                    menuname={"editSettings"}
                                >Settings</label>                            
                            </div>           

                        </div>
                ),
            };


            name="title";
            posContsO[name]={        
                name : name,
                seq : 1,
                e : (                    
                        <div
                            key={name}
                            style={{
                                //background : "white",
                                background : "white",
                                position : "relative",
                                display : "inline-block",
                                width : 300,                 
                                height : 25,
                                borderRadius : 8,
                                overflow : "hidden",
                            }}
                        >
                            <h3
                                style={{
                                    margin : 0, padding : 0,
                                    display : "inline-block",
                                }}
                            >KCS Daily Checks</h3>                     

                            {wWidth + " x " + wHeight}

                        </div>
                        
                ),
            };
        */


        if (props.posContsO){
            for (let p in props.posContsO){
                if ( props.posContsO[p] ){
                    posContsO[p]=props.posContsO[p];
                }
            }
        }

    // ====================================================================
        // views
        
        /* // can have multiple views that are changed by --> setCurrState(viewName)
            name="viewSummary";
            posContsStates[name]={
                name : name,
                posCont : [ "title" , "linebreak1" , "menu" , "summary" , "checkers" ],
                //eLogic : (...args)=>{
                eLogic : function(){
                    let tt=this;
                    let args=arguments;
                    if (args.length > 0){
                        tt=args[0]
                    }
                    let ret=tt.posCont
                    if (wWidth < 700){
                        ret=[ "menu" , "summary"  ]
                    }
                    return ret
                }
            }

            name="editSettings";
            posContsStates[name]={
                name : name,
                posCont : [ "title","menu"  ],
                //eLogic : (...args)=>{
                eLogic : function(){
                    let tt=this;
                    let args=arguments;
                    if (args.length > 0){
                        tt=args[0]
                    }
                    let ret=tt.posCont
                    if (wWidth < 700){
                        //ret=[ "menu" , "summary"  ]
                    }
                    return ret
                }
            }

        */

        if (props.posContsStates){
            for (let p in props.posContsStates){
                if (props.posContsStates[p]){
                    posContsStates[p]=props.posContsStates[p];
                }
            }
        }

    
    // ====================================================================
    
        /*

            name="viewSummary";
            posContsStates[name]={
                name : name,
                posCont : [ "title" , "linebreak1" , "menu" , "summary" , "checkers" ],
                //eLogic : (...args)=>{
                eLogic : function(){
                    let tt=this;
                    let args=arguments;
                    if (args.length > 0){
                        tt=args[0]
                    }
                    let ret=tt.posCont
                    if (wWidth < 700){
                        ret=[ "menu" , "summary"  ]
                    }
                    return ret
                }
            }

        */


        let getPosContE=(posContsStateName)=>{
            let ret=[];
            if (posContsStates[posContsStateName]){
                ret=posContsStates[posContsStateName].eLogic();            
            }
            
            return ret;
        }
    
    // ====================================================================
    
        let posContsE
        if (true){        
            posContsE=(()=>{
                let arrE=[]
            
                posConts= getPosContE(currState);           

                
                //posConts[]

                posConts.forEach((r,i)=>{
                    let E;
                    E=posContsO[r].e;

                    arrE.push(E);
                })

                return (<>{arrE}</>)
            })();
        }
    
    // ====================================================================
    
        let retE=(
            <div
                style={style}
            >
                {posContsE}
            </div>
        )
    
    // ====================================================================

    let retDef={
        e : retE , myLayout : retE, posContsE , currState ,setCurrState,
    }
    
    for (let p in retDef){
        ret[p]=retDef[p]
    }
    
    //ret. = ;

    return ret
}