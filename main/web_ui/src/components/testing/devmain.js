
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

    let [hide1IsTrue,setHide1IsTrue]=useState(getCookie().isMin)
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

    let hide1={ height : 150 , width : 300,display : "block",opacity : 1, overflow : "auto" }
    if (hide1IsTrue){
        hide1.height=20
        hide1.width=50
        hide1.overflow="hidden"
        //hide1.background="transparent" // rgba(255, 0, 0, 0.4)
        hide1.background="rgba(255, 0, 0, 0.4)"
        hide1.opacity=0.8
        
    }

    return (
        <div 
            style={{position : "fixed", left :"20%",zIndex : 9999 , top:0,background :  hide1.background, opacity : hide1.opacity}}
        >
            {(()=>{
                    if (process.env.NODE_ENV !== 'production') { 
                        return (
                    
                                    <div
                                        style={{ position : "relative",padding : 5, 
                                                width : hide1.width, height : hide1.height, 
                                                display : hide1.display, opacity : hide1.opacity,
                                                overflow: hide1.overflow , borderRadius : 5, fontWeight : "bold"
                                            }}
                                    >   
                                        <div
                                            style={{zIndex : 9999, fontSize : 10,padding : 0,margin : 0, top : 0,left : 0, 
                                                position : "relative", background : "grey", borderRadius : 5, 
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

                                        <div style={{ background : "lightgrey" ,  zIndex : 0,position : "absolute", top :0,left : 0, width : "100%", height : "100%" }} />
                                        <div
                                            style={{ position : "relative",zIndex : 2}}
                                        >
                                            
                                            

                                            <Palette/>
                                        </div>
                                    </div>
                                
                        )
            
                    }   
            })()}
        </div>
    )

}