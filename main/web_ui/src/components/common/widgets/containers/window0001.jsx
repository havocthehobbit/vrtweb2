import { useState } from "react"

export const Window0001=(props)=>{
    let defMin=false
    let minTitleBar=false
    if (typeof(props.min)!=="undefined"){
        defMin=props.min
    }

    let [min,setMin]=useState(defMin)


    if (typeof(props.minTitleBar)!=="undefined"){
        minTitleBar=props.minTitleBar
    }

    let style={...{
        position : "relative",
        background : "white" , 
        padding : 3, 
        borderRadius : 5,
        overflow : "hidden",
    },...props.style}

    let styleTitle={...{ 
            position : "relative",
            background : "green",
            width : "100%", height : 25,
            padding : 0,            
            borderRadius : 5,
            overflow : "hidden",
    },...props.styleTitle}

    let displayBody="block"
    if (min){
        displayBody="none"
        style.height=undefined
    }

    let onClick=()=>{
            
            if (props.onClick){
                props.onClick(min)
            }
            
            setMin(!min)
    
    }
    let onClickTitleBar=()=>{}

    let smallMinButtonE
    if (minTitleBar===false){
        smallMinButtonE=(()=>{

            return (
                <div
                        style={{ position : "absolute", 
                                    //display : "none",
                                    right : 0, top : 0, 
                                    background : "lightgrey", margin : 2, padding : 1,paddingLeft :6,paddingRight : 6,
                                    borderRadius : 4, border : "thin solid grey", height : 18,
                                    cursor : "pointer",
                        }}
            
                        onClick={onClick}
                    >
                        <span
                            style={{ pointerEvents : "none", userSelect : "none"}}
                            
                        >{"-"}</span>
                    </div>
            )
    
    
        })()
    }else{
        onClickTitleBar=onClick
    }
    
    

    // defminTitleBar

    return (
        <div
            style={style}
        >
            <div // title
                style={styleTitle}
                onClick={onClickTitleBar}
            >   
                {props.titleEBefore}
                {props.titleE}
                <p
                    style={{ margin : 0, padding : 0}}
                >{props.title}</p>
                {props.titleEAfter}
                {smallMinButtonE}
            </div>
            <div
                style={{...{ overflow : "auto"},...{display : displayBody}}}
            >
                {props.children}
            </div>
            
        </div>
    )
}