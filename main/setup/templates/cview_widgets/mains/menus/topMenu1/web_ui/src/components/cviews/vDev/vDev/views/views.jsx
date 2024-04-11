import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { saveViewsBE as saveCmptMeBE ,listViewsBE as listCmptMeBE,loadViewsBE as loadCmptMeBE} from './libs/backend';



export const Views=(props)=>{
    let initC=useRef(true)
    // ---------------------------------  
    

    // ---------------------------------  

    let [currentSchemaData, setCurrentSchemaData]=useState({})

    

    // ---------------------------------   
    let [cmptMeName, setCmptMeName]=useState("")
    let [cmptMeNameTxt, setCmptMeNameTxt]=useState("")
    
    let [project,setProject]=useState("");

    let cmptMeDef={ "name" :"" ,"version" : "0","data" : {} ,"type" : " " , "types" : [], "subSchema" : {} , "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}" }
    let cmptMeSubDef={ "name" :"" ,"data" : {}  ,"types" : " " , "type" : [], "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}","linked" : false, "link" : { "path"  : "" , "name" : "" } }
    
    let [descTxt,setDescTxt]=useState("");
    let [notesTxt,setNotesTxt]=useState("");

    let [cmptMe,setCmptMe]=useState({...cmptMeDef});
    let [cmptMeTxt,setCmptMeTxt]=useState(JSON.stringify(cmptMeDef,null,2));
    
    let [schemaSubCmptMe,setCmptMeSubCmptMe]=useState({...cmptMeSubDef});
    let [schemaTxtSubCmptMe,setSchemaTxtSubCmptMe]=useState(JSON.stringify(cmptMeSubDef,null,2));

    
    let [cmptMeJsn,setCmptMeJsn]=useState({});


    let [errorMain,setErrorMain]=useState("");
    let [errorMainSubCmptMe,setErrorMainSubCmptMe]=useState("");

    let [listCmptMeData,setListCmptMeData]=useState([]); 

    let [currentProp,setCurrentProp]=useState("");
    let [currentCmptMeSub,setCurrentSchemaSub]=useState("__vw__main");
    let [currentCmptMeSubTxt,setCurrentSchemaSubTxt]=useState("__vw__main");

    
    let currentCmptMeSubPrevRef=useRef("");


    // --------------------------------
    
    useEffect(()=>{
        if (initC.current){
            initC.current=false;

            listCmptMe() 
        }        
    },[]);



    // --------------------------------

    let listCmptMe=(...args)=>{
            
        listCmptMeBE(args[0],(dt)=>{
           
            
            let ndt=[]
            if (dt.data){
                if (dt.data.all){
                    ndt=dt.data.all;
                }
            }

            if (args.length===1 || args.length===0 ){
                setListCmptMeData(ndt);
                
            }
            if (args.length===2){
                args[1](dt)
            }
        });            
            
    }

    
    let loadCmptMe=(...args)=>{
        loadCmptMeBE(args[0],(dt)=>{

            
            
            let ndt={}
            if (dt.data){
                if (dt.data){
                    ndt=dt.data;
                }
            }

            if (args.length===1 || args.length===0 ){
                
            }
            if (args.length===2){
                args[1](dt)
            }
        });            
    }

    let newCmptMe=(...args)=>{

        setCmptMe({...cmptMeDef})
        
        setCmptMeName("");
        setProject("");
       
        setCmptMeTxt(JSON.stringify(cmptMeDef,null,2));

        setDescTxt("");
        setNotesTxt("");
    }


    let loadedCmptMeDataSetState=(...args)=>{
        let data={...cmptMe}

        if (args[0]){
            if (args[0].data){
                data={...data,...args[0].data}
            }
        }
       

        setCmptMe(data);
        
        setCmptMeName(data.name);
       
        //setExampleTxt(data.example);
        //setExampleJsn(JSON.parse(data.example));
        setCmptMeTxt(JSON.stringify(data,null,2));

        setDescTxt(data.desc);
        setNotesTxt(data.notes);
        
    }


    // --------------------------------

    let listCmptMeE=(()=>{
        let arrE=[]

        let styledef={
            background : "lightblue",
            cursor : "pointer",
            margin : 1,
            padding : 2,
            borderRadius : 4,
            border : "solid thin black"
        }

        let ni1=0;
        // up/back dir
        arrE.push(
            <div
                key={ni1}
                
                style={{...styledef,...{ padding :  0,color : "grey",overflow : "hidden"}}}
                onClick={(e)=>{
                    setProject("");                        
                    setTimeout(listCmptMe({project : project}),1500 );
                }}
            >
                <div
                    style={{
                        position :"relative",
                        height : 15,
                    }}
                >
                    <div
                        style={{
                            position :"absolute",                                
                            top : -5,
                            left : 100
                            
                        }}
                    >{"..  <--"}</div>
                    
                </div>
                

            </div>
        )
        ni1++;

        listCmptMeData.forEach((r,i)=>{
            let name=r.name.replace(".json", "")
            let desc=`${name}`;

            let style={...styledef}

            let isDir="false";
            if (r.isDir){
                isDir="true";
                desc=`${name}.proj`;
                style.background="DarkCyan";
            }                
            
            let ni2=i+ni1;
            arrE.push(
                <div
                    key={ni2}
                    rname={name}
                    isdir={isDir}
                    style={style}
                    onClick={(e)=>{
                        let rname=e.target.getAttribute("rname");
                        let isDir=e.target.getAttribute("isdir");

                        if (isDir==="false"){
                            loadCmptMe({ name : rname ,project : project },(dt)=>{                                    
                                loadedCmptMeDataSetState(dt)                                    
                            })
                        }else{
                            setProject(rname)
                            setTimeout(listCmptMe({project : project}),1500 )
                        }
                    }}
                >
                    {desc}

                </div>
            )

        })

        return (
            <div
                style={{
                    position : "relative",
                    border :"black solid thin",
                    borderRadius : 6,
                    margin : 2,
                    padding : 2,
                    width : 300,
                    height : 100,
                    overflow : "hidden",
                }}
            >
                load
                <div
                    style={{
                        position : "relative",
                        border :"black solid thin",
                        borderRadius : 4,
                        width : 285,
                        height : 85,
                        overflow : "auto",
                    }}
                >
                    {arrE}
                </div>
                
            </div>
        )
    })()

    // --------------------------------



    // --------------------------------


    let style={
        position  : "relative",
        background : "white",
        width : 300,
        height : 300, 
        borderRadius : 8,
        overflow : "hidden",

    }
    if (props.style){
        style={...style,...props.style}
    }

    return (
        <div
            style={style}
        >
            Views


            <div
                style={{
                    position : "relative",
                    
                 }}

            >
                <div
                    style={{
                        position : "relative",
                        //width : 700,
                     }}
                >
                    <div style={{ clear : "left" }} />


                    <div
                        style={{
                            float : "left",
                        }}
                    >
                        {listCmptMeE}
                    </div>
                    <div
                        style={{
                            float : "left",
                        }}
                    >

                    
                        <button
                            style={{

                            }}
                            onClick={()=>{
                                newCmptMe()
                            }}
                        >
                            new
                        </button>

                        <button
                            style={{

                            }}
                            onClick={()=>{
                                let nd={...cmptMeJsn}
                                nd.name=cmptMeName.replace(/ / ,"");
                                saveCmptMeBE( { name : nd.name , data :  nd , project : project.replace(/ / ,"")  } , ()=>{
                                    listCmptMe()
                                })
                            }}
                        >
                            save
                        </button>
                        
                        
                        <br/>

                        <input 
                            placeholder='CmptMe Name'
                            value={cmptMeName}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setCmptMeName(val)
                            }}
                        />

                        <input 
                            placeholder='Project'
                            value={project}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setProject(val)
                            }}
                            onBlur={()=>{
                                listCmptMe({project : project})
                            }}
                        />

                        <br/>

                        <textarea 
                            placeholder='descTxt'
                            value={descTxt}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setDescTxt(val)
                            }}
                        />

                        <textarea 
                            placeholder='notesTxt'
                            value={notesTxt}
                            onChange={(e)=>{
                                let val=e.target.value;

                                setNotesTxt(val)
                            }}
                        />
                    
                    
                    </div>



                    <div style={{ clear : "left" }} />
                </div>

            </div>

            

        </div>
    )

}


