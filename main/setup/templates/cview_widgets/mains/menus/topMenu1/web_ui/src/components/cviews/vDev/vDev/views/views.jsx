import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
//import { v4 as uuidv4 } from 'uuid';
import { saveViewsBE as saveCmptMeBE ,listViewsBE as listCmptMeBE,loadViewsBE as loadCmptMeBE} from './libs/backend';

import { useMyLayout } from "../../../../common/widgets/containers/useMyLayout";
import { useWindowSize } from "../../../../common/widgets/containers/useWindowSize";


export const Views=(props)=>{
    let initC=useRef(true)
    let [updateStete,setUpdateStete]=useState(new Date());
    // ---------------------------------  
    

    // ---------------------------------  

    let [currentSchemaData, setCurrentSchemaData]=useState({})

    

    // ---------------------------------   
    let [cmptMeName, setCmptMeName]=useState("")
    let [cmptMeNameTxt, setCmptMeNameTxt]=useState("")
    
    let [project,setProject]=useState("");

    let cmptMeDef={ "name" :"" , "name_cmpt" : "" ,"version" : "0","data" : {} ,"type" : "" , "types" : [], "views" : [] , "subView" : {} , "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}" }
    let cmptMeSubDef={ "name" :"" , "name_cmpt" : "","data" : {}  ,"type" : "" , "types" : [], "views" : [], "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}","linked" : false, "link" : { "path"  : "" , "name" : "" } }
    
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

    // 
    let [currentNewCmpt,setCurrentNewCmp]=useState({});
    let [currentNewCmptName,setCurrentNewCmpName]=useState("");

    // --------------------------------

    let layoutsetCurrStateRef=useRef(()=>{});
    let {wWidth,wHeight}=useWindowSize();    
    let [layoutcurrStateDef,setLayoutcurrStateDef]=useState("viewMain");
    let [layoutcurrStateDefTxt,setLayoutcurrStateDefTxt]=useState("viewMain");
    
    let [layoutcurrStateSel,setLayoutcurrStateSel]=useState("");
    let [layoutcurrAssetsSel,setLayoutcurrAssetsSel]=useState("");

    let [layoutposContsStatesDyn,setLayoutposContsStatesDyn]=useState({});
    let [layoutposContsODyn,setLayoutposContsODyn]=useState({});

    let [layoutStatePropertiesPosContCurr,setLayoutStatePropertiesPosContCurr]=useState("");
    let [layoutStatePropertiesPosAddName,setLayoutStatePropertiesPosContAddName]=useState("");

    // --------------------------------


    useEffect(()=>{
        if (initC.current){
            initC.current=false;

            listCmptMe();
            layoutposContsOAddInitial();
            layoutposContsStatesAddInitial();
        }        
    },[]);


    // --------------------------------

    let updateStateForce=()=>{ setUpdateStete(new Date()) }

    let processData=(...args)=>{

    }

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

        let addToLayout=(...args)=>{

        }

        let delFromLayout=(...args)=>{
            
        }

        let MoveFromLayout=(...args)=>{
            
        }

    // --------------------------------

        let layoutPrefabsList={
            "label" : {
                "name_cmpt" : "label",
                "name" : "",     
                "toolname" : "",     
                "toolname_small" : "lb",     
                "toolname_med" : "",     
                "toolname_large" : "",     
                "uuid"  : "",
                "type" : "label"
            },
            "input" : {
                "name_cmpt" : "input",
                "name" : "",     
                "toolname_small" : "",     
                "toolname_med" : "",     
                "toolname_large" : "",     
                "uuid"  : "",
                "type" : "ele",
                "sub_type" : "label",
            }
        }

        let prefabs={
            "label" : {
                "e" : (
                    <label>label</label>
                ),
                "type" : "ele",
                "generate" : (...args)=>{
                    let cb=()=>{}
                    let params={                        
                        value : "label",
                        style : {},
                    }
                    if (args.length){
                        params={...params,...args[0]}
                        if (args[1]){
                            cb=args[1];
                        }
                    }
                    let eProps={}
                    
                    if (params.eProps!==undefined){
                        eProps={...eProps,...params.eProps}
                    }
                    if (params.key!==undefined){
                        eProps.key=params.key
                    }
                    if (params.style!==undefined){
                        eProps.style=params.style
                    }
                    if (params.value!==undefined){
                        params.value=params.value
                    }
                    
                    let e=prefabs["label"].e;
                    
                    e=(
                        <label {...eProps}>{params.value}</label>
                    )
                    

                    return  { e : e }
                },
                "prompts" : []
            },
            "input" : {
                "e" : (
                    <input />
                ),
                "type" : "ele",
                "generate" : (...args)=>{
                    let cb=()=>{}
                    let params={                        
                        value : "label",
                        style : {},
                    }
                    if (args.length){
                        params={...params,...args[0]}
                        if (args[1]){
                            cb=args[1];
                        }
                    }
                    let eProps={}
                    
                    if (params.eProps!==undefined){
                        eProps={...eProps,...params.eProps}
                    }
                    if (params.key!==undefined){
                        eProps.key=params.key
                    }
                    if (params.style!==undefined){
                        eProps.style=params.style
                    }
                    if (params.value!==undefined){
                        eProps.value=params.value
                    }
                    if (params.onChange!==undefined){
                        eProps.onChange=params.onChange
                    }
                    if (params.onBlur!==undefined){
                        eProps.onBlur=params.onBlur
                    }
                    if (params.onClick!==undefined){
                        eProps.onClick=params.onClick
                    }

                    
                    
                    let e=prefabs["label"].e;
                    
                    e=(
                        <input {...eProps} />
                    )
                    

                    return  { e : e }
                },
                
                "prompts" : []
            },
        }

    // --------------------------------
        //cmptMe."views"
        // ---- 
        let layoutposContsStates={};
        let layoutposContsO={};
        let layoutname="";

        // ---- 

        let layoutmenuStyle={
            background : "white",
            position : "relative",
            display : "inline-block",
            width : 100,
            height : 300,
            borderRadius : 8,
            margin : 5,
            padding : 5,       
            overflow : "hidden", 
        };

        // ----  posContsO
        

        let layoutposContsOAddInitial=()=>{
            let layoutposContsStates={};
            let layoutposContsO={};
            let layoutname="";

            setLayoutposContsODyn((st)=>{
                let nst={...st} ;

                let layoutposContsO={};
                let layoutname="";

                layoutname="viewMain";
                layoutposContsO[layoutname]={
                    name : layoutname,
                    posCont : [ "title" , "linebreak1" , "menu" ,"Main" ],            
                    eLogic : function(){
                        let tt=this;
                        let args=arguments;
                        if (args.length > 0){
                            tt=args[0]
                        }
                        let ret=tt.posCont
                        if (wWidth < 700){
                            ret=[ "menu" , "Main"  ]
                        }
                        return ret
                    }
                }
                nst[layoutname]=layoutposContsO[layoutname]

                layoutname="menu";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (
                            <div
                                key={layoutname}
                                style={layoutmenuStyle}
                            >
                                <h4>menu</h4>                             
                                
                                <div
                                    menuname={"viewMain"}
                                    style={{
                                        position : "relative",
                                        display : "inline-block",
                                        cursor : "pointer",
                                        width : 100,
                                    }}
                                    onClick={(e)=>{
                                        let menuname=e.target.getAttribute("menuname");
                                        layoutsetCurrStateRef.current(menuname)
                                    }}
                                >
                                    <label
                                        menuname={"viewMain"}
                                    >Main</label>                            
                                </div>   
                                <div
                                    menuname={"viewSummary"}
                                    style={{
                                        position : "relative",
                                        display : "inline-block",
                                        cursor : "pointer",
                                        width : 100,
                                    }}
                                    onClick={(e)=>{
                                        let menuname=e.target.getAttribute("menuname");
                                        layoutsetCurrStateRef.current(menuname)
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
                                        width : 100,
                                    }}
                                    onClick={(e)=>{
                                        let menuname=e.target.getAttribute("menuname");
                                        layoutsetCurrStateRef.current(menuname)
                                    }}
                                >
                                    <label
                                        menuname={"editSettings"}
                                    >Settings</label>                            
                                </div>           

                            </div>
                    ),
                };
                nst[layoutname]=layoutposContsO[layoutname]

                layoutname="Main";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (                  
                            <div
                                key={layoutname}
                                style={{
                                    background : "white",
                                    position : "relative",
                                    display : "inline-block",
                                    width : 400,
                                    height : 300,
                                    borderRadius : 8,
                                    margin : 5,
                                    padding : 5,
                                    overflow : "hidden"
                                }}
                            >
                                <h4>Main</h4>                
                            </div>
                    )

                };
                nst[layoutname]=layoutposContsO[layoutname]

                layoutname="Settings";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (                  
                            <div
                                key={layoutname}
                                style={{
                                    background : "white",
                                    position : "relative",
                                    display : "inline-block",
                                    width : 400,
                                    height : 300,
                                    borderRadius : 8,
                                    margin : 5,
                                    padding : 5,
                                    overflow : "hidden"
                                }}
                            >
                                <h4>Settings</h4>                
                            </div>
                    )
                };
                nst[layoutname]=layoutposContsO[layoutname]

                layoutname="title";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (                  
                            <div
                                key={layoutname}
                                style={{
                                    background : "white",
                                    position : "relative",
                                    display : "inline-block",
                                    width : 300,
                                    height : 90,
                                    borderRadius : 8,
                                    margin : 5,
                                    padding : 5,
                                    overflow : "hidden"
                                }}
                            >
                                <h4>my title</h4>                
                            </div>
                    )

                };
                nst[layoutname]=layoutposContsO[layoutname]

                layoutname="linebreak1";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (<br key={layoutname} />),
                };  
                nst[layoutname]=layoutposContsO[layoutname]

                layoutname="summary";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (             
                            <div
                                key={layoutname}
                                style={{
                                    background : "white",
                                    position : "relative",
                                    display : "inline-block",
                                    width : 400,
                                    height : 300,
                                    borderRadius : 8,
                                    margin : 5,
                                    padding : 5,
                                    overflow : "hidden",
                                }}
                            >
                                <h4>Summary</h4>                
                            </div>
                    )
                };
                nst[layoutname]=layoutposContsO[layoutname]

                return nst
            })

            updateStateForce()
        }

        let layoutposContsODynGenerateDynamic=(()=>{
            layoutposContsO={...layoutposContsO,...layoutposContsODyn}

        })()

        let buildLayoutAssets=(()=>{
            let i=0;
            for ( let p in layoutPrefabsList){
                let r={...layoutPrefabsList[p]};
                
                let e
                if (prefabs[layoutname]){
                    if (prefabs[layoutname].generate){
                        e=prefabs[layoutname].generate().e;
                    }
                    
                }

                layoutname=r.name_cmpt;
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (             
                            <div
                                key={layoutname}
                                style={{
                                    background : "white",
                                    position : "relative",
                                    display : "inline-block",
                                    width : 400,
                                    height : 300,
                                    borderRadius : 8,
                                    margin : 5,
                                    padding : 5,
                                    overflow : "hidden",
                                }}
                            >
                                {e}
                            </div>
                    )
                };
    
                i++;
            }

        })();
        

        // ---- 

        // ---- posContsStates
        
        
        
        let layoutposContsStatesAddInitial=()=>{
            let layoutposContsStates={};
            let layoutposContsO={};
            let layoutname="";

            setLayoutposContsStatesDyn((st)=>{
                let nst={...st} ;

                layoutname="viewMain";
                layoutposContsStates[layoutname]={
                    name : layoutname,
                    posCont : [ "title" , "linebreak1" , "menu" ,"Main" ],            
                    eLogic : function(){
                        let tt=this;
                        let args=arguments;
                        if (args.length > 0){
                            tt=args[0]
                        }
                        let ret=tt.posCont
                        if (wWidth < 700){
                            ret=[ "menu" , "Main"  ]
                        }
                        return ret
                    }
                }
                nst[layoutname]=layoutposContsStates[layoutname]

                layoutname="viewSummary";
                layoutposContsStates[layoutname]={
                    name : layoutname,
                    posCont : [ "title" , "linebreak1" , "menu" , "summary"  ],            
                    eLogic : function(){
                        let tt=this;
                        let args=arguments;
                        if (args.length > 0){
                            tt=args[0]
                        }
                        let ret=tt.posCont
                        if (wWidth < 700){
                            ret=[ "menu" , "Main"  ]
                        }
                        return ret
                    }
                }
                nst[layoutname]=layoutposContsStates[layoutname]

                layoutname="editSettings";
                layoutposContsStates[layoutname]={
                    name : layoutname,
                    posCont :   [ "title" , "linebreak1" , "menu" , "Settings" ],                         
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
                nst[layoutname]=layoutposContsStates[layoutname]
            
                

                return nst
            })

            updateStateForce()
        }

        let layoutposContsStatesGenerateDynamic=(()=>{
            layoutposContsStates={...layoutposContsStates,...layoutposContsStatesDyn}

        })()

        // ---- 
        
        //layout
        //let { myLayout,currState ,setCurrState  }=useMyLayout({ posContsStates, posContsO , allState , currStateDef : "viewSummary" })
        let layoutRetUseMyLayout=useMyLayout({ posContsStates : layoutposContsStates , posContsO : layoutposContsO  ,/* allState : layoutallState ,*/ currStateDef : layoutcurrStateDef })
        let layoutmyLayout=layoutRetUseMyLayout.myLayout;
        let layoutcurrState=layoutRetUseMyLayout.currState;
        let layoutsetCurrState=layoutRetUseMyLayout.setCurrState;
        layoutsetCurrStateRef.current=layoutsetCurrState;


    // --------------------------------


    let toolsCmptMeE=(()=>{
        let arrE=[];

        let i=0
        for ( let p in layoutPrefabsList){
            let r={...layoutPrefabsList[p]};
            let toolname="tool";
            
            if (r.toolname){
                toolname=r.toolname
            }else{
                toolname=r.name_cmpt
            }

            arrE.push(
                <div
                    key={i}
                    style={{
                        poistion : "relative",
                        display : "inline-block",
                        width : 40,
                        height : 40,
                        margin : 1,
                        padding : 2,
                        overflow : "hidden",
                        border : "solid lightgrey thin",
                        borderRadius : 5,
                        cursor : "pointer",

                    }}
                    onClick={(e)=>{
                        let params={};
                        params={ ...{},...r };


                        
                        addToLayout()
                    }}
                >
                    {toolname}
                </div>
            )


            i++;
        }



        /*
         .forEach((r,i)=>{
            arrE.push(
                <div
                    key={i}
                    style={{

                    }}
                    onClick={()=>{

                    }}
                >
                    {""}
                </div>
            )
         })
        */
        return (
            <div
                style={{
                    position : "relative",
                    display : "inline-block",
                    width : 400,
                    height : 100,
                    margin : 5 ,
                    padding : 5 ,
                    border : "solid thin lightgrey",
                    borderRadius : 5 , 
                }}
            >   
                Tools
                <br/>
                ==========
                <br/>
                {arrE}
            </div>
        )
    })();

        
    let layoutAssetsE=(()=>{
        let arrE=[];

        // layoutposContsO[layoutname].name
        let i=0
        for ( let p in layoutposContsO){
            let r={...layoutposContsO[p]};
            let toolname="tool";
            
            if (r.name){
                toolname=r.name
            }

            let style={
                poistion : "relative",
                display : "inline-block",
                width : 40,
                height : 40,
                margin : 1,
                padding : 2,
                overflow : "hidden",
                border : "solid lightgrey thin",
                borderRadius : 5,
                cursor : "pointer",

            };

            if  ( r.name===layoutcurrAssetsSel){
                style.background="lightgrey";
            }

            arrE.push(
                <div
                    key={i}
                    layoutname={r.name}
                    style={style}
                    onClick={(e)=>{
                        let val=e.target.getAttribute("layoutname");
                        let params={};
                        params={ ...{},...r };                        
                        //addToLayout(params)                        
                        setLayoutcurrAssetsSel(val)
                    }}
                >
                    {toolname}
                </div>
            )


            i++;
        }



        /*
         .forEach((r,i)=>{
            arrE.push(
                <div
                    key={i}
                    style={{

                    }}
                    onClick={()=>{

                    }}
                >
                    {""}
                </div>
            )
         })
        */
        return (
            <div
                style={{
                    position : "relative",
                    display : "inline-block",
                    width : 400,
                    height : 150,
                    margin : 5 ,
                    padding : 5 ,
                    border : "solid thin lightgrey",
                    borderRadius : 5 , 
                    overflow : "hidden",
                }}
            >   
                <div
                    style={{
                        position : "relative",
                        width : 385,
                        height : 135 ,
                        overflow : "auto",
                    }}
                >
                    Layout Assets 
                    <br/>
                    ==========
                    <br/>
                    <button>add</button>
                    <br/>
                    {arrE}
                </div>
            </div>
        )
    })()


    


    let viewLayoutStatesE=(()=>{
        let arrE=[];

        
        
        let i=0
        for ( let p in layoutposContsStates){
            let r={...layoutposContsStates[p]};
            let toolname="tool";
            let posCont=[];
            let posContStr="";

            if (r.name){
                toolname=r.name
            }

            if (r.posCont){
                posContStr=JSON.stringify(r.posCont)
            }
            
            let style={
                poistion : "relative",
                display : "inline-block",
                width : 200,
                height : 60,
                margin : 1,
                padding : 2,
                overflow : "hidden",
                border : "solid lightgrey thin",
                borderRadius : 5,
                cursor : "pointer",
                fontSize : 11,

            }

            if (layoutcurrStateSel===r.name){
                style.background="lightgrey"
            }

            arrE.push(
                <div
                    key={i}
                    layoutname={r.name}
                    style={style}
                    onClick={(e)=>{
                        let val=e.target.getAttribute("layoutname");
                        let params={};
                        params={ ...{},...r };                        
                        //addToLayout()
                        setLayoutcurrStateSel(val)
                    }}
                >
                    {toolname}
                    <br/>
                    {posContStr}
                </div>
            )


            i++;
        }



        /*
         .forEach((r,i)=>{
            arrE.push(
                <div
                    key={i}
                    style={{

                    }}
                    onClick={()=>{

                    }}
                >
                    {""}
                </div>
            )
         })
        */
        return (
            <div
                style={{
                    margin : 5 ,
                    padding : 5 ,
                    border : "solid thin lightgrey",
                    borderRadius : 5 , 
                }}
            >   
                Layout States 
                <br/>
                ==========
                <br/>
                <button
                    style={{
                        fontSize : 9,
                        
                    }}
                    onClick={()=>{

                    }}
                >add</button>
                <br/>
                {arrE}
            </div>
        )
    })()

    let layoutStatePropertiesE=(()=>{
        let arrE=[];

        let curr={}
        let currStr="{}"
        if (layoutposContsStates[layoutcurrStateSel]){
            curr=layoutposContsStates[layoutcurrStateSel];

            if (curr.posCont){                
                currStr=JSON.stringify(curr)
            }

        }

        return (
            <div
                style={{
                    position : "relative",
                    display : "inline-block",
                    border : "solid thin black",
                    fontSize  : 11,
                    width : 300,
                    height : 200,
                    overflow : "hidden",
                    padding : 5,
                    margin : 5,


                }}
            >   
                <div
                    style={{
                        position : "relative",
                        display : "inline-block",                        
                        fontSize  : 11,
                        width : 285,
                        height : 150,
                        overflow : "auto"
                    }}
                >
                    Layout State Properties 
                    <br/>
                    ==========
                    <br/>
                    name : {curr.name}
                    <br/>
                    
                    posCont: 
                    <br/>

                    <button
                        style={{
                            fontSize : 9,                        
                        }}
                        onClick={()=>{
                            // insert into from Layout Assets                             
                            
                            let assetName=layoutStatePropertiesPosAddName;
                            
                            if (layoutposContsO[assetName]){        
                                
                                if (layoutposContsStates[layoutcurrStateSel]){                               

                                    setLayoutposContsStatesDyn((st)=>{
                                        let nst={...st}

                                        nst[layoutcurrStateSel].posCont.push(assetName)

                                        

                                        
                                        return nst;
                                    })
                                }
                            }
                        }}
                    >add</button>
                    <input
                        value={layoutStatePropertiesPosAddName}
                        onChange={(e)=>{
                            let val=e.target.value
                            setLayoutStatePropertiesPosContAddName(val)
                        }}
                    
                    />
                    <br/>{currStr}
                    
                    <br/>
                    {arrE}
                </div>
            </div>
        )
    })()


    let mainLayoutPropertiesE=(()=>{

        return (
            <div
                style={{
                    position : "relative",
                    display : "inline-block",
                    border : "solid thin black",
                    fontSize  : 11,
                    width : 200,
                    height : 100,
                    overflow : "hidden",
                    padding : 5,
                    margin : 5,


                }}
            >   
                main layout properties
                <br/>-----------------------------
                
                <div
                    style={{
                        position : "relative",
                        display : "inline-block",                        
                        fontSize  : 11,
                        width : 185,
                        height : 85,
                        overflow : "auto"
                    }}
                >
                    <lable>Startup layout </lable>
                    <input 
                        style={{
                            fontSize : 11,
                            width : 80,
                        }}
                        value={layoutcurrStateDefTxt}
                        onChange={(e)=>{
                            let val=e.target.value;
                            setLayoutcurrStateDefTxt(val)
                        }}
                        onBlur={(e)=>{
                            // #TODO validate default layout
                            setLayoutcurrStateDef(layoutcurrStateDefTxt)
                        }}
                        

                    />
                </div>
            </div>
        )
        
    })()


    

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

    let propCmptMeE=(()=>{
    })()

    let propsListE=(()=>{
    })()

    let subCmptMeListE=(()=>{

    })();


    // --------------------------------


    let style={
        position  : "relative",
        background : "white",
        width : 1200,
        height : 600, 
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
                    overflow : "auto" , 
                    width : 1200,
                    height : 600, 
                 }}

            >
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

                <div style={{ clear : "left" }} />

                <div
                    style={{
                        position : "relative",
                        
                    }}

                >    
                    <div
                        style={{
                            float : "left",
                        }}
                    >                    
                        <label>Text Main</label>
                        <br/>
                        <textarea 
                            value={cmptMeTxt}
                            onChange={(e)=>{
                                let val=e.target.value;
                                setCmptMeTxt(val)
                            }}
                            onBlur={(e)=>{
                                let val=e.target.value;                           
                                
                                let json={...cmptMe}
                                try {
                                    json=JSON.parse(val);
                                    setCmptMe( json );
                                    setErrorMain("")
                                } catch (error) {
                                    setErrorMain(error)
                                }
                                
                            }}
                            style={{
                                width : 400,
                                height : 200,
                            }}
                        />
                        
                    </div>

                </div>

                <div style={{ clear : "left" }} />

                <div
                    style={{
                        position : "relative",
                        
                    }}

                > 
                    <input 
                        value={currentNewCmptName}
                        onChange={(e)=>{
                            let val=e.target.value;
                            setCurrentNewCmpName(val)
                        }}
                        onBlur={(e)=>{

                        }}
                    />
                    <button
                        onClick={()=>{
                            addToLayout()
                        }}
                    >add</button>
                    {toolsCmptMeE}
                    {layoutAssetsE}
                    {viewLayoutStatesE}
                    
                    <br/>
                    {layoutStatePropertiesE}
                    {mainLayoutPropertiesE}
                </div>

                <div style={{ clear : "left" }} />

                <div
                    style={{
                        position : "relative",
                        
                    }}

                >    
                    <div
                        style={{
                            float : "left",
                        }}
                    >
                        
                        {subCmptMeListE}
                        
                        
                    </div>
                    <div
                        style={{
                            float : "left",
                        }}
                    >
                        {propsListE}

                    </div>
                    <div
                        style={{
                            float : "left",
                        }}
                    >
                        {propCmptMeE}
                    </div>
                    
                    <div style={{ clear : "left" }} />

                    <div
                        style={{
                            position : "relative",
                            
                        }}
                    >    
                        <label
                            style={{

                            }}
                        >preview</label>
                        <div
                            style={{
                                position : "relative",
                                width  : 1820,
                                height  : 1220,
                                overflow : "hidden",
                                border  : "solid thin black",
                                
                            }}
                        >    
                            <div
                                style={{
                                    background : "lightgrey",
                                    position : "relative",
                                    width  : 1800,
                                    height  : 1200,
                                    overflow : "auto",
                                    
                                }}
                            >   
                                    {layoutmyLayout}

                            </div>
                        </div>
                    </div>

                    <div style={{ clear : "left" }} />
                </div>
            </div>
        </div>
    )

}


