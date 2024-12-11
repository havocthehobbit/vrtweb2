import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';

let tof=$cn.tof;
let isOb=$cn.isOb;

/*

let fetchBE=(...args)=>{ 
        let cb=()=>{}
        let params={}

        
        if (args.length === 1){
            cb=args[0];        
        }

        
        if (args.length > 1){
            if (args[0]!==undefined){
                params=args[0]    
            }
            
            cb=args[1]
        }

        let api="plugins"
        let data={ 
            "type" : "listAll",         
            //"searchTxt" : searchBox,  
            
        };

        if ( params.filename){
            //data.filename=params.filename
        }

        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })

    }

*/

export const Server=(props)=>{


    let initC=useRef(true)

    //let [all,setAll]=useState([]);


    let [cmds,setCmds]=useState([]);
    let [cmd,setCmd]=useState({});
    let [cmdsCurrNameTxt,setCmdsCurrNameTxt]=useState("");
    let [cmdsCurrName,setCmdsCurrName]=useState("");
    let [cmdsCurr,setCmdsCurr]=useState("");


    // -----------------------------------------


    useEffect(()=>{
        if (initC.current){
            initC.current=false;
                        
        }

    },[]);




    // -----------------------------------------



    let runCommandsE
    if (true){
        runCommandsE=(()=>{
            let E
            let arrE=[];


            cmds.forEach((r,i)=>{


                if (true){
                    arrE.push(
                        <div
                            key={i}

                            style={{
                                
                            }}
                            onClick={()=>{

                                if (false){
                                    setCmd()
                                    setCmdsCurrNameTxt()
                                    setCmdsCurrName()
                                    setCmdsCurr()
                                }
                            }}

                        >
                            <div
                                style={{
                                    display : "inline-block"
                                }}
                            >
                                {r.name}
                            </div>


                            <button
                                style={{
                                
                                }}
                                
                                onClick={()=>{
                                    
                                }}
                            >run</button>

                        </div>
                    );
                }

            });



            

            E=(
                <div
                    style={{
                        background : "white",
                        padding : 5,
                        border : "solid thin grey",
                        borderRadius : 4

                    }}
                >
                    <label>commands</label>                    

                    <br/>

                    <div
                        style={{

                        }}
                    >
                        {arrE}

                    </div>

                </div>
            )

            return E;
        })();
    }


    let cmdCurrE
    if (true){
        cmdCurrE=(()=>{
            let E


            E=(
                <div
                    style={{
                        background : "white",
                        padding : 5,
                        border : "solid thin grey",
                        borderRadius : 4

                    }}
                >
                    <label>new</label>

                    <br/>

                    <button
                        onClick={()=>{

                        }}
                    >new</button>
                    <button
                        onClick={()=>{
                            
                        }}
                    >save</button>
                    <button
                        onClick={()=>{
                            
                        }}
                    >del</button>
                    

                    <br/>

                    <div>                        
                        <input
                            placeholder={"name"}

                            style={{
                                margin : 2,
                            }} 
                            
                            onChange={()=>{

                            }}
                        />
                        <input
                            
                            placeholder={"cmd"}
                            style={{
                                margin : 2,
                            }} 
                            
                            onChange={()=>{

                            }}
                        />
                    </div>

                    <div
                        style={{

                        }}
                    >
                        

                    </div>

                </div>
            )


            return E;
        })();
    }


    // -----------------------------------------



    let style={
        position  : "relative",
        background : "white",
        width : 300,
        height : 300, 
        borderRadius : 8 ,
        overflow : "hidden",
        padding : 5,

    }
    if (props.style){
        style={...style,...props.style}
    }


    if (props.params){
        if (props.params.allActive){
            style.width=1200
            style.height=800


        }
    }

    return (
        <div
            style={style}
        >
            Server
            <div
                style={{
                    
                }}
            >   
                <div
                    style={{
                        
                    }}
                >   
                    has PM2 <input 
                                value={Math.random()} 
                                type="checkbox"
                                onClick={()=>{

                                }} 
                            />
                </div>
                <div
                    style={{
                        
                    }}
                >   
                    has Rev Proxy <input 
                                value={Math.random()} 
                                type="checkbox"
                                onClick={()=>{

                                }} 
                            />
                </div>
                <div
                    style={{
                        
                    }}
                >   
                    vrtweb2 settings


                      
                </div>
            </div>

            
            <div
                style={{
                        background : "orange",
                        padding : 5,
                        border : "solid thin grey",
                        borderRadius : 4
                }}
            >

                
                <div
                    style={{
                        
                    }}
                >
                    {runCommandsE}
                </div>

                <div
                    style={{
                        
                    }}
                >
                    {cmdCurrE}
                </div>                
            </div>

        </div>
    )

}


