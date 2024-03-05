import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"

export const PopupBox=(props)=>{    
    /*      
            let [popupShow,setPopupShow]=useState(false)
            let popupChildrenRefE=useRef() 

            let fnss=useRef({});
            fnss.current.SomeEle1=(()=>{
                return (<h1>asdsadasd</h1> )
            })() ;
            fnss.current.SomeEle2=(()=>{
                return (<h1>asdsadasd</h1> )
            })() 
    
            popupChildrenRefE.current=fnss.current[fnss.current.currentMainFnss];
            

            return ( // main render
                <div>
                    <PopupBox                 
                        showhide={popupShow} 
                        
                        // show={popupShow} // got more control use this instead of showhide
                        //showval={(val)=>{
                        //    setPopupShow(val)
                        //}}

                        //style={{}} // styleCancel={{}} //syleEpar
                        // clickCancel={(e)=>{}}
                        //childrenRefE={popupChildrenRefE}
                    >{childrenRefE.current}</PopupBox>

                    <button
                        onClick={()=>{                                
                                fnss.current.currentMainFnss="SomeEle1"
                                
                                setPopupShow(!popupShow)
                        }}
                    >btn1</button>
                     <button
                        onClick={()=>{                                
                                fnss.current.currentMainFnss="SomeEle2"
                                
                                setPopupShow(!popupShow)
                        }}
                    >btn1</button>
                </dvi>
            )
    */
    let defPopupShow=false
    if (props.show){        
        defPopupShow=props.show
    }
    let [popupShow,setPopupShow]=useState(defPopupShow)

    let init=useRef(true)

    let E

    
    useEffect(()=>{
        if (init.current){
            init.current=false
               
        }
    },[])

    useEffect(()=>{
        if (props.show!==undefined){
            setPopupShow(props.show)
        }
    },[props.show])

    useEffect(()=>{        
        if (props.showhide!==undefined){
            if (init.current===false){
                setPopupShow((st)=>!st)
            }
        }
    },[props.showhide])
    
    useEffect(()=>{
        if (props.showval!==undefined){
            showval()
        }
    },[popupShow])

    let showval=()=>{}
    if (props.showval!==undefined){
        showval=()=>{
            props.showval(popupShow)
        }
    }

    let clickCancel=(e)=>{
        if (props.clickCancel){
            clickCancel(e)
        }
        
         setPopupShow(false)
        
    }
    
  
    E=props.children    

    let childrenRefE
    if (props.childrenRefE){
        childrenRefE=props.childrenRefE.current
    }
    
    let style={}
    if (props.style){
        style={...style,...props.style}        
    }
    if (style.display){
        style.display="block"
    }else{
        style.display="none"
    }
    
    if (popupShow){
        style.display="block"
    }else{
        style.display="none"
    }



    
    return (
            <div
                style={{...{ position : "absolute", left : 0,top:0, zIndex : 9999, background : "lightgrey",width : "100%", height : 600,overflow :"hidden"},
                        ...style
                }}
            >
                <button 
                    style={props.styleCancel}
                    onClick={clickCancel}
                >cancel</button>
                <br/>
                <div
                    style={{...{ position : "absolute", display : "block", zIndex : 9999, background : "lightgrey",width : "90%", height : "100%",overflow :"scroll"},
                        ...props.syleEpar
                    }}
                >
                    {E}
                    {childrenRefE}
                </div>
            </div>
            
        )
}



export const usePopupBox=(props)=>{ // custom hook , just a function runs on every render that allows using React hooks in it, except you can use array specifiers on when to run and update like useEffect but it only updates values once its finished its calculation, to be more efficient
    /* usage
        // 1.) add custom hook 
            let {popupE,setPopupShow,popupCurrent,setPopupCurrent,popupChildrenRefE }=usePopupBox();

        // 2.) To add custom popup contents : in general component run area , customize what you want in the poup
            if (popupCurrent==="green"){
                popupChildrenRefE.current=(
                    <div
                        style={{
                            position : "relative",
                            top : 0, left : 0,
                            width  : 1000,
                            height  : 1000,
                            background : "green"
                        }}
                    >

                        sdsasds
                    </div>
                
                    
                );
            }
            if (popupCurrent==="red"){
                popupChildrenRefE.current=(
                    <div
                        style={{
                            position : "relative",
                            top : 0, left : 0,
                            width  : 1000,
                            height  : 1000,
                            background : "red"
                        }}
                    >

                        sdsasds
                    </div>
                
                    
                );
            }
        // 3.) To show Popup : in render area
            <button
                style={{
                    position : "relative",
                    margin : 1,
                    background : "green",
                    color : "white",
                    cursor : "pointer",
                }}
                onClick={(e)=>{                               
                    setPopupCurrent("green")
                    setPopupShow(true)
                }}
            >add</button>
            <button
                style={{
                    position : "relative",
                    margin : 1,
                    background : "red",
                    color : "white",
                    cursor : "pointer",
                }}
                onClick={(e)=>{
                    setPopupCurrent("red")
                    setPopupShow(true)
                }}
            >remove</button>
    */
    const [popupShow,setPopupShow]=useState(false);
    const [popupCurrent,setPopupCurrent]=useState("");
    
    const [forceUpdate,setForceUpdate]=useState(new Date());
    const popupChildrenRefE=useRef()
     
    let popupCurrentRefCB=useRef(()=>{})
    let popupCurrentRef=useRef("")

    

    let popupProps={
        show: popupShow,
        showval : (val)=>{
            setPopupShow(val)
        }
    }
    if (props){
        if (props.popupProps){
            popupProps={...popupProps,...props.popupProps}
        }
    }

    popupCurrentRefCB.current()

    let popupE=(
        <PopupBox
            {...popupProps}
            
        >{popupChildrenRefE.current}</PopupBox>
    )
    

    //setPopupShow(()=>false)
    //return [popupShow,setPopupShow,popupChildrenRefE] 
    return {popupShow,setPopupShow,popupChildrenRefE,popupE,popupCurrent,setPopupCurrent,popupCurrentRef,popupCurrentRefCB } // replaced return as object rather then array tublet , so consumer can optionally use any of these components instead of using all by default.
}