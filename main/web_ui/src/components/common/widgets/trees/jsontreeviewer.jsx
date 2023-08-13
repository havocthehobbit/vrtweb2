import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react";
import { $cn } from "../../../common/libNative";

let feach=$cn.each
let tof=$cn.tof
let isUn=$cn.isUn
let isOb=$cn.isOb

export const JsonTreeViewer=(props)=>{
    let [data,setData]=useState({})
    let [forceupdateSt,setForceupdateSt]=useState(new Date())

    let expTree=useRef({
        idx : {
            id : {}
        }
    })

    //let E
    let E=useRef()

    useEffect(()=>{
        setData(props.data)
    },[props.data])

    let forceUpdate=()=>{
        setForceupdateSt(new Date())
    }

    let buildE=(nd, params)=>{        
        let arrE=[]
        let i=0

        if (tof(params)==="undefined"){
            params={
                level : 0,
                cbEach : ()=>{},
                parentID : "[root]",
            }
        }
        if (tof(params.level)==="undefined"){
            params.level=0
        }
        if (tof(params.cbEach)==="undefined"){
            params.cbEach=()=>{}
        }
        if (tof(params.parentID)==="undefined"){
            params.parentID="[root]"
        }

        let parentIDOrig=params.parentID
        
        feach(nd,(r, p)=>{
            let treeID = "" + params.parentID + ",[" + params.level + "],[" + i + "]"
            if (expTree.current.idx.id[treeID]){ }else{
                expTree.current.idx.id[treeID]={ rec :  r , treeID : treeID , isExpanded : false }
            }
            let currT=expTree.current.idx.id[treeID]


            params.parentID=treeID
            let subE

            let display="block"
            let left=(()=>{ 
                if (params.level > 0){
                    //return params.level * 20 
                    return  20 
                }
            })()

            if ( typeof(r)==="object"){
                params.level++

                let isExpanded=currT.isExpanded
                
                let expandedE=<>[-]</>
                let buttonColor="lightgreen"

                if (isExpanded===false){
                    display="none"
                    expandedE=<>[+]</>
                    buttonColor="orange"
                }

                if (true) { 
                    subE=(
                        
                        <div
                            treeID={treeID}
                            isExpanded={isExpanded}
                            style={{
                                position : "relative",
                                width : 350,
                                //display : display,
                                left : left,
                                // height : 7,
                                margin : 0,padding : 0,
                            }}
                        >
                            <button
                                style={{
                                    
                                    background : buttonColor,
                                    borderRadius : 6,
                                    color : "brown",
                                    paddingLeft : 4, paddingRight : 4,
                                    marginRight : 0,
                                }}
                                treeID={treeID}
                                isExpanded={isExpanded}
                                onClick={(e)=>{
                                    let treeID=e.target.getAttribute("treeID")
                                    let isExpanded=e.target.getAttribute("isExpanded")

                                    expTree.current.idx.id[treeID].isExpanded=!expTree.current.idx.id[treeID].isExpanded

                                    setTimeout(()=>{
                                        E.current=buildE(data)
                                        forceUpdate()
                                    },0)
                                

                                    
                                    
                                }}
                            >
                                <p
                                    style={{
                                        padding : 0, margin : 0, 
                                        pointerEvents : "none", userSelect : "none" ,
                                                                    
                                    }}
                                ><b>{expandedE}</b></p>
                            </button>
                                    <label
                                        style={{ position: "relative",left : 2,
                                                    background : "white",   
                                                    padding : 0, margin : 0,  
                                                    paddingLeft : 4, paddingRight : 4,
                                                    borderRadius : 4,
                                        }}
                                    >{p}</label>  
                                    {
                                        // ({treeID}) 
                                    }
                                
                            
                                    <br/>
                                    {
                                        (()=>{
                                            if (isExpanded){
                                                return(
                                                    <>
                                                        <div

                                                            style={{ display : display}}
                                                        >
                                                            {buildE(r,params )}
                                                        </div>
                                                    </>
                                            )
                                        }
                                    })()
                            }
                        </div>
                        
                    
                    )
                }

                params.level--
            }else{
                let value=r
                let valueE
                let styletxt={
                    border: "none",
                    outline: "none",
                    borderRadius : 6,
                    padding : 0,margin : 0,
                }

                if (value.length < 200){
                    styletxt.width=600
                }              

                if (value.length < 50){
                    styletxt.width=300
                }
                if (value.length < 25){
                    styletxt.width=200
                }
                if (value.length < 10){
                    styletxt.width=100
                }
                if (value.length <= 1){
                    styletxt.width=40
                    styletxt.height=20
                }
                

                valueE=<textarea
                            treeID={treeID}
                            value={value}
                            style={styletxt}
                            //onChange={(e)=>{ }}
                            onBlur={(e)=>{
                                let treeID=e.target.getAttribute("treeID")
                                let value=e.target.value
                            }}
                />


                subE=(
                    <div
                        treeID={treeID}
                    >
                        <span
                            style={{background : "white",
                                    //position : "inline" ,   
                                    display : "relative" ,   
                        }}
                        >{p}</span> 
                        - {valueE} - 
                        {
                            //tof(r)
                        } 
                        {/* ({treeID}) */}
                    </div>
                )
            }
            

            arrE.push(
                <>
                    <div
                        key={treeID}
                        style={{ 
                            position : "relative", display : "inline" , background : "lightblue" , width : 300 , height : undefined,
                            margin : 0, padding : 0,
                            left : left,
                        }}
                    >   
                        {subE}
                        
                    </div>
                    <br/>
                </>
            )


            params.parentID=parentIDOrig// reset parent id for next iteration
            i++
        })
        //ret=JSON.stringify(data,null,2)
        return arrE
    }

    useEffect(()=>{
        //E.current=buildE(data)
        setTimeout(()=>{
            E.current=buildE(data)
            forceUpdate()
        },0)
    },[data])

    //E=useCallback(()=>{  return buildE(data) },[data])
    //E=useMemo(() => buildE(data), [data]);
    
    //E=buildE(data)
    
    let height=450

    if (typeof(props.height)){
        height=props.height
    }

    let style={...{
        textAlign : "left",
        position :"relative" ,
        overflow : "hidden",
        
        height : height,

    },...props.style }

    let style2={...{   
        overflow : "auto",

        height : height, 
    
    },...props.style2}

    return (
        <div
           
            style={style}
        >
            <div
                style={style2}
           >
                {E.current}
            </div>
            
            
        </div>
    )


}
