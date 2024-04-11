import React,{ useEffect , useState,useRef, useContext } from 'react'

import MarkdownPreview from '@uiw/react-markdown-preview';

export const Templates=(props)=>{ 

    let initC=useRef(true)


    useEffect(()=>{

        if (initC.current){
            initC.current=false;

        }

    },[])

    return (
        <div
            style={{

            }}
        >            
            <h1
                style={{
                    color : "black"
                }}
            >Templates</h1>
            

            <h3
                style={{
                    color : "black"
                }}
            >vrtweb</h3>

            <h3
                style={{
                    color : "black"
                }}
            >Reactjs</h3>




            <h3
                style={{
                    color : "black"
                }}
            >NodeJs</h3>


        </div>
        )

}