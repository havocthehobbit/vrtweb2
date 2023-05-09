
import { useState,useEffect, useRef} from 'react'
import $gl from '../common/globallib'
import { $cn } from '../common/libNative'


export const Palette=(props)=>{
    let [curr,setCurr]=useState("")

    useEffect(()=>{

    },[curr])

    let allE=(()=>{
        let E=[]
        $cn.each($gl.col,(v,p)=>{
            E.push(
                <div
                    key={p}
                    col={v}
                    colval={p}
                    style={{position : "relative",fontSize : 4, float : "left",
                            margin : 0, border : "solid white thin",
                            background : v,
                            cursor : "pointer"
                    }}
                    onClick={
                        (e)=>{
                            setCurr({
                                col : e.target.getAttribute("col"),
                                colval: e.target.getAttribute("colval")                                    
                            })
                        }
                    }
                >
                    <label                         
                        style={{fontSize : 8, pointerEvents : "none" }}
                        disabled={true}
                    >{p}</label>

                </div>
            )
        })
        return (
            E
        )
    })()


    let currE=(
        <div
            style={{ position : "relative", margin : 2, border : "solid white thin",
                        background : $gl.col[curr.colval],height : 15,padding : 2,overflow : "hidden" ,
                        width : 200
            }}
        >
            <label style={{ position : "absolute",fontSize : 8,margin :0,padding : 0,top :0 }}>
            {curr.col} - {curr.colval}
                <div style={{clear : "left"}} />
            </label>
        </div>
    )

    return (
        <div>
            <label
                style={{ fontSize : 10,margin : 0,padding : 0}}
            >
                palettes
            </label>            
            <div
                style={{ overflow : "hidden",width : 250 , height : 100}}
            >
                <div
                    style={{ position : "relative",overflow : "auto" ,width : 265 , height : 100}}
                >
                    {currE}
                    {allE}
                </div>
                <div style={{clear : "left"}}/>
            </div>
            
        </div>
    )

}