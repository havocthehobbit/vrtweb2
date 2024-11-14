
import { useState,useEffect, useRef} from 'react'
import $gl from '../common/globallib'
import { $cn } from '../common/libNative'
import { Palette } from './palette'


export const Devmain=(props)=>{   
    let getCookie=(cb)=>{
        let ret={isMin : false}
        let err
        let cookie=$gl.getCookie("devv")
        
        if ( !$cn.isUndefined(cookie)){
            try {
                ret=JSON.parse(cookie)
            } catch (error) {
               err=error 
            }
        }

        if (typeof(cb)==="function"){
            cb(ret,err)
        }


        return ret
    }


    let zIndexDef=9999;
    if (props.zIndex){
        zIndexDef=props.zIndex;
    }
    let mainLeftDef="20%";
    if (props.mainLeft){
        mainLeftDef=props.mainLeft;
    }
    let mainRightDef=undefined;
    if (props.mainRight){
        mainRightDef=props.mainRight;
    }

    let mainTopDef=undefined;
    if (props.mainTop){
        mainTopDef=props.mainTop;
    }
    let mainBottomtDef=undefined;
    if (props.mainBottom){
        mainBottomDef=props.mainBottom;
    }


    let [hide1IsTrue,setHide1IsTrue]=useState(getCookie().isMin)
    let [zIndex,setZindex]=useState(zIndexDef)
    let [mainLeft,setMainLeft]=useState(mainLeftDef);
    let [mainRight,setMainRight]=useState(mainRightDef);
    let [mainTop,setMainTop]=useState(mainTopDef);
    let [mainBottom,setMainBottom]=useState(mainBottomtDef);
    
    

    let init=useRef(true)
    useEffect(()=>{
        if (init.current){
            init.current=false

            return
        }
    },[])

    useEffect(()=>{
        if (init.current){
            init.current=false

            return
        }

        setCookie()
    },[hide1IsTrue])
    

    let setCookie=(cb)=>{
        getCookie((dt ,err)=>{
            if (err){
                alert(err)
                return
            }

            let nr=dt
            dt.isMin=hide1IsTrue            
            $gl.createCookie("devv" , JSON.stringify(nr))

        })
    }

    useEffect(()=>{
        if (zIndex!==props.zIndex){
            onChangeZindex(zIndex)   ;
        }
    },[zIndex])

    let onChangeZindex=()=>{}
    if (props.onChangeZindex){
        onChangeZindex=props.onChangeZindex
    }
    
     

    let hide1={ height : 150 , width : 300,display : "block",opacity : 1, overflow : "auto" }
    if (hide1IsTrue){
        hide1.height=20
        hide1.width=50
        hide1.overflow="hidden"
        //hide1.background="transparent" // rgba(255, 0, 0, 0.4)
        hide1.background="rgba(255, 0, 0, 0.4)"
        hide1.opacity=0.8
        
    }

    let style={
        position : "fixed",
        zIndex : zIndex , 
        top:0
        ,background :  hide1.background, 
        opacity : hide1.opacity,
        //, left :"20%"
    }

    
    if (mainLeft!==undefined){
        let mainLeftCss
        let isNum=false;
        if (typeof(mainLeft)==="string"){
            if (mainLeft.includes("%")){
                isNum=false;
            }else{
                isNum=true;
            }
        }else{
            isNum=true;
        }
        if (isNum===false){
            mainLeftCss=mainLeft;
        }else{
            let val=Number(mainLeft);
            mainLeftCss=val;
        }
        style.left=mainLeftCss;
    }

    
    if (mainRight!==undefined){
        let mainRightCss
        let isNum=false;
        if (typeof(mainRight)==="string"){
            if (mainRight.includes("%")){
                isNum=false;
            }else{
                isNum=true;
            }
        }else{
            isNum=true;
        }
        if (isNum===false){
            mainRightCss=mainRight;
        }else{
            let val=Number(mainRight);
            mainRightCss=val;
        }
        style.right=mainRightCss;
    }

    if (mainTop!==undefined){
        let mainTopCss
        let isNum=false;
        if (typeof(mainTop)==="string"){
            if (mainTop.includes("%")){
                isNum=false;
            }else{
                isNum=true;
            }
        }else{
            isNum=true;
        }
        if (isNum===false){
            mainTopCss=mainTop;
        }else{
            let val=Number(mainTop);
            mainTopCss=val;
        }
        style.top=mainTopCss;
    }

    if (mainBottom!==undefined){
        let mainBottomCss
        let isNum=false;
        if (typeof(mainBottom)==="string"){
            if (mainBottom.includes("%")){
                isNum=false;
            }else{
                isNum=true;
            }
        }else{
            isNum=true;
        }
        if (isNum===false){
            mainBottomCss=mainBottom;
        }else{
            let val=Number(mainBottom);
            mainBottomCss=val;
        }
        style.bottom=mainBottomCss;
    }

    
    return (
        <div 
            style={style}
        >
            {(()=>{
                    if (process.env.NODE_ENV !== 'production') { 
                        return (
                    
                                    <div
                                        style={{ position : "relative",padding : 5, 
                                                width : hide1.width, height : hide1.height, 
                                                display : hide1.display, opacity : hide1.opacity,
                                                overflow: hide1.overflow , borderRadius : 5, fontWeight : "bold",


                                                resize: "both"
                                            }}
                                    >   
                                        <div
                                            style={{zIndex : zIndex, fontSize : 10,padding : 0,margin : 0, top : 0,left : 0, 
                                                position : "relative", background : "grey", borderRadius : 5, height :35 ,
                                                cursor : "pointer",
                                            }}
                                            onClick={()=>{                                                        
                                                setHide1IsTrue(!hide1IsTrue)
                                                
                                            }}
                                           
                                        >
                                            
                                            <label                                                    
                                                  style={{ pointerEvents : "none",userSelect: "none"}}                                                    
                                            >
                                                Dev...
                                            </label>
                                        </div>

                                        <div style={{ 
                                                background : "lightgrey" ,  zIndex : 0,
                                                position : "absolute", top :0,left : 0, 
                                                width : "100%", height : "100%" ,
                                            }} 
                                        />
                                        <div
                                            style={{ position : "relative",zIndex : 2}}
                                        >
                                            
                                            <input 
                                                //value={{zIndexTxt}}
                                                placeholder="z-index"
                                                style={{
                                                    background : "white",                                                   
                                                    width : 40,
                                                    fontSize : 10
                                                }}
                                                defaultValue={zIndex}
                                                onBlur={(e)=>{
                                                    let val=e.target.value;
                                                    let nval=Number(val);
                                                    setZindex(nval)
                                                    
                                                }}
                                            />
                                            <input
                                                placeholder="left"
                                                style={{
                                                    background : "white",                                                   
                                                    width : 40,
                                                    fontSize : 10
                                                }}
                                                defaultValue={mainLeft}
                                                onBlur={(e)=>{
                                                    let val=e.target.value;                                                    
                                                    if (val.trim()===""){
                                                        val=undefined
                                                    }
                                                    setMainLeft(val)
                                                    
                                                }}
                                            />
                                            <input                                                                                              
                                                placeholder="right"
                                                style={{
                                                    background : "white",                                                    
                                                    width : 40 ,
                                                    fontSize : 10                                                   
                                                }}
                                                defaultValue={mainRight}
                                                onBlur={(e)=>{
                                                    let val=e.target.value;
                                                    if (val.trim()===""){
                                                        val=undefined
                                                    }
                                                    setMainRight(val)
                                                    
                                                }}
                                            />
                                            <input                                                
                                                placeholder="top"
                                                style={{
                                                    background : "white",                                                   
                                                    width : 40,
                                                    fontSize : 10
                                                }}
                                                defaultValue={mainTop}
                                                onBlur={(e)=>{
                                                    let val=e.target.value;
                                                    if (val.trim()===""){
                                                        val=undefined
                                                    }
                                                    setMainTop(val)
                                                    
                                                }}
                                            />
                                            <input                                                
                                                placeholder="bottom"
                                                style={{
                                                    background : "white",                                                   
                                                    width : 40,
                                                    fontSize : 10
                                                }}
                                                defaultValue={mainBottom}
                                                onBlur={(e)=>{
                                                    let val=e.target.value;
                                                    if (val.trim()===""){
                                                        val=undefined
                                                    }
                                                    setMainBottom(val)
                                                    
                                                }}
                                            />

                                            <Palette/>
                                        </div>
                                    </div>
                                
                        )
            
                    }   
            })()}
        </div>
    )

}