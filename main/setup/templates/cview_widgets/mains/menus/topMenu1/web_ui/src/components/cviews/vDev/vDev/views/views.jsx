import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
import { v4 as uuidv4 } from 'uuid';
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

    let cmptMeDef={ "name" :"" , "name_cmpt" : "" ,"version" : "0","data" : {} ,"type" : "" , "types" : [], "view" : {} , "subView" : {} , "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}" }
    let cmptMeSubDef={ "name" :"" , "name_cmpt" : "","data" : {}  ,"type" : "" , "types" : [], "view" : {}, "desc" : "" , "notes" : "" , "keys" : {} ,"idx" : {} , "example" : "{}","linked" : false, "link" : { "path"  : "" , "name" : "" } }
    
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
    
    let cmptMeBeforeTxtRef=useRef(cmptMeTxt);



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
    let [layoutStatePropertiesPosContCurrSel,setLayoutStatePropertiesPosContCurrSel]=useState("");

    let instances=useRef({
        all : {},
        counts : {},
    })

    let [srcTxt,setSrcTxt]=useState("");


    // --------------------------------
    let [loadShowHide,setLoadShowHide]=useState(true)
    let [newSaveShowHide,setNewSaveShowHide]=useState(true)
    let [textMainShowHide,setTextMainShowHide]=useState(true)
    let [toolsShowHide,setToolsShowHide]=useState(true)
    let [toolAssetsShowHide,setToolAssetsShowHide]=useState(true)
    let [layoutStatesShowHide,setLayoutStatesShowHide]=useState(true)
    let [layoutStatesPropertiesShowHide,setLayoutStatesPropertiesShowHide]=useState(true)
    let [mainlayoutStatesPropertiesShowHide,setMainLayoutStatesPropertiesShowHide]=useState(true)
    let [previewShowHide,setPreviewShowHide]=useState(true)


    
  

    // -----------------------------

    useEffect(()=>{
        if (initC.current){
            initC.current=false;

            listCmptMe();
            layoutposContsOAddInitial();
            layoutposContsStatesAddInitial();
        }        
    },[]);

    useEffect(()=>{
    
        let tmpstr=JSON.stringify(cmptMe,null,2)
        setCmptMeTxt(JSON.stringify(cmptMe,null,2))
        

        cmptMeBeforeTxtRef.current=tmpstr;
    },[cmptMe])


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

        // ------------------------
        setLayoutposContsStatesDyn({})
    }

    // currently not using , using saveCmptMeBE directly on button , #TODO
    let saveCmptMe=(...args)=>{
        let ndt={}
        
        ndt.data=cmptMe;
        
        if (args[0]){
            ndt={...ndt,...args[0]}
        }

        

        saveCmptMeBE(ndt,(dt)=>{
            if (typeof(args[1])==="function"){
                args[1](dt)
            }
        })
    }

    let loadedCmptMeDataSetState=(...args)=>{
        let data={...cmptMe}

        if (args[0]){
            if (args[0].data){
                data={...data,...args[0].data}
            }
        }


        //------------------------

       
        let LayoutposContsODynTmp0={};
        let LayoutposContsStatesDynTmp0={};

        if (true){
            let layoutname="";
            if (data.view){
                if (data.view.layoutposContsO){
                    for (let p in data.view.layoutposContsO){
                        layoutname=p
                        let r=data.view.layoutposContsO[p];
                
                        LayoutposContsODynTmp0[layoutname]={
                            name : layoutname,                       
                        };
                        if (r.assetSource){
                            LayoutposContsODynTmp0[layoutname].e=layoutposContsO[r.assetSource].e  ; 
                        }else{
                            if (layoutposContsODyn[p]){
                                LayoutposContsODynTmp0[layoutname].e=layoutposContsODyn[p].e
                            }else{
                                LayoutposContsODynTmp0[layoutname].e=(...args)=>{
                                        
                                    let key=""    
                                    if (args[0]){
                                        if (args[0].key){
                                            key=args[0].key
                                        }
                                        if (args[0].name){
                                            key=args[0].name
                                        }
                                    }

                                    if (key===""){
                                        key=uuidv4()
                                    }
                                    return (  
                                        <div
                                            key={key}
                                            style={layoutmenuStyle}
                                        >
                                            <h4>unknown asset {key} </h4> 
                                            
                                            </div>
                                    )   ;

                                }
                            }
                        }
                        

                    }
                }
                if (data.view.LayoutposContsStates){
                    for (let p in data.view.LayoutposContsStates){
                        layoutname=p
                        let r=data.view.LayoutposContsStates[p];              

                        LayoutposContsStatesDynTmp0[layoutname]={
                            name : layoutname,
                            posCont :   r.posCont,                         
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
                    }
                }
            }
        };
       
        //------------------------

        setCmptMe(data);
        
        setCmptMeName(data.name);
       
        //setExampleTxt(data.example);
        //setExampleJsn(JSON.parse(data.example));
        setCmptMeTxt(JSON.stringify(data,null,2));

        setDescTxt(data.desc);
        setNotesTxt(data.notes);

        //------------------------

        setLayoutposContsODyn((st)=>{
            let nst={...st} ;

            for (let p in LayoutposContsODynTmp0){                
                let r=LayoutposContsODynTmp0[p];
                nst[p]=r;
            }

            return nst
        });
        setLayoutposContsStatesDyn((st)=>{
            //let nst={...st} ;
            let nst={} ;

            for (let p in LayoutposContsStatesDynTmp0){
                let r=LayoutposContsStatesDynTmp0[p];
                nst[p]=r;
            }

            return nst
        });
        
    }


    // --------------------------------

        let addToLayout=(...args)=>{

        }

        let delFromLayout=(...args)=>{
            
        }

        let MoveFromLayout=(...args)=>{
            
        }

    // --------------------------------

        let generateSrc=(...args)=>{
            let txt=""

            let txtImports=""

            if (true){
                txtImports+=`import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react";`;
                txtImports+="\n";
                txtImports+="\n";
                txtImports+=`import { useMyLayout } from "../../../../common/widgets/containers/useMyLayout";`;
                txtImports+="\n";
                txtImports+=`import { useWindowSize } from "../../../../common/widgets/containers/useWindowSize";`;
                txtImports+="\n";
            }
            txt+=txtImports;

            if (true){
                txt+="\n";
                txt+=`export const ${"CmptName"}=(props)=>{`;
                txt+="\n";
                txt+=`  let initC=useRef(true)`;
                txt+="\n";
                txt+=`  let [updateStete,setUpdateStete]=useState(new Date());`;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  let layoutsetCurrStateRef=useRef(()=>{});`;
                txt+="\n";
                txt+=`  let [layoutcurrStateDef,setLayoutcurrStateDef]=useState("viewMain");`;
                txt+="\n";                
                txt+=`  let [layoutposContsStatesDyn,setLayoutposContsStatesDyn]=useState({});`;
                txt+="\n";                
                txt+=`  let [layoutposContsODyn,setLayoutposContsODyn]=useState({});`;
                txt+="\n";                
                txt+=`  layoutcurrStateDef`;
                txt+="\n";
                txt+=`  `;
                txt+="\n";                
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";                
                txt+=`  `;
                txt+="\n";
                txt+=`  let wSize=useWindowSize();`;
                txt+="\n";
                txt+=`  `;
                txt+="\n";                
                txt+=`  `;
                txt+="\n";
                txt+=`  useEffect(()=>{`;
                txt+="\n";                
                txt+=`      if (initC.current){`;
                txt+="\n";
                txt+=`          initC.current=false;`;
                txt+="\n";                
                txt+=`          `;
                txt+="\n";
                txt+=`      }`;
                txt+="\n";
                txt+=`  },[]);`;
                txt+="\n"; 
                txt+=`  `;
                txt+="\n"; 
                txt+=`  let updateStateForce=()=>{ setUpdateStete(new Date()) }`;
                txt+="\n"; 
                txt+=`  `;
                txt+="\n"; 
                txt+=`  let layoutposContsStates={};`;
                txt+="\n"; 
                txt+=`  let layoutposContsO={};`;
                txt+="\n"; 
                txt+=`  let layoutname="";`;
                txt+="\n"; 
                txt+=`  `;
                txt+="\n"; 
                txt+=`  let layoutmenuStyle={`;
                txt+="\n";
                txt+=`      background : "white",`;
                txt+="\n";
                txt+=`      position : "relative",`;
                txt+="\n";
                txt+=`      display : "inline-block",`;
                txt+="\n";
                txt+=`      width : 100,`;
                txt+="\n";
                txt+=`      height : 300,`;
                txt+="\n";
                txt+=`      borderRadius : 8,`;
                txt+="\n";
                txt+=`      margin : 5,`;
                txt+="\n";
                txt+=`      padding : 5,`;
                txt+="\n";
                txt+=`      overflow : "hidden", `;                
                txt+="\n";
                txt+=`  };`;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  let layoutposContsODynGenerateDynamic=(()=>{`;
                txt+="\n";
                txt+=`      layoutposContsO={...layoutposContsO,...layoutposContsODyn}`;
                txt+="\n";
                txt+=`  })()`;
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  let layoutposContsStatesGenerateDynamic=(()=>{`;
                txt+="\n";
                txt+=`      layoutposContsStates={...layoutposContsStates,...layoutposContsStatesDyn}`;
                txt+="\n";
                txt+=`  })()`;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+="\n";                
                txt+=`  let layoutRetUseMyLayout=useMyLayout({ posContsStates : layoutposContsStates , posContsO : layoutposContsO  ,/* allState : layoutallState ,*/ currStateDef : layoutcurrStateDef })`;
                txt+="\n";
                txt+=`  let layoutmyLayout=layoutRetUseMyLayout.myLayout;`;
                txt+="\n";
                txt+=`  let layoutcurrState=layoutRetUseMyLayout.currState;`;
                txt+="\n";
                txt+=`  let layoutsetCurrState=layoutRetUseMyLayout.setCurrState;`;
                txt+="\n";
                txt+=`  layoutsetCurrStateRef.current=layoutsetCurrState;`;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  let style={`;
                txt+="\n";
                txt+=`      position  : "relative",`;
                txt+="\n";
                txt+=`      `;
                txt+="\n";
                txt+=`      `;
                txt+="\n";
                txt+=`      `;
                txt+="\n";
                txt+=`  }`;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  if (props.style){`;
                txt+="\n";
                txt+=`      style={...style,...props.style}`;
                txt+="\n";
                txt+=`  }`;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`   return (`;
                txt+="\n";
                txt+=`      <div`;
                txt+="\n";
                txt+=`          style={style}`;
                txt+="\n";
                txt+=`      >`;
                txt+="\n";
                txt+=`          `;
                txt+="\n";
                txt+=`          {layoutmyLayout}`;
                txt+="\n";
                txt+=`          `;
                txt+="\n";
                txt+=`          `;                
                txt+="\n";
                txt+=`          `;
                txt+="\n";
                txt+=`          `;
                txt+="\n";
                txt+=`      </div>`;                
                txt+="\n";
                txt+=`  )`;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`  `;
                txt+="\n";
                txt+=`}`;
                txt+="\n";
                txt+=``;
            }


            if (cmptMe.view){
                if (cmptMe.view.layoutposContsO){

                }

                if (cmptMe.view.LayoutposContsStates){

                }
            }


            

            return txt;
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

            let LayoutposContsODynTmp0
            setLayoutposContsODyn((st)=>{
                let nst={...st} ;

                let layoutposContsO={};
                let layoutname="";

                if (true){
                    layoutname="menu";
                    layoutposContsO[layoutname]={
                        name : layoutname,            
                        e : (...args)=>{
                                
                            let key=""    
                            if (args[0]){
                                if (args[0].key){
                                    key=args[0].key
                                }
                                if (args[0].name){
                                    key=args[0].name
                                }
                            }

                            if (key===""){
                                key=uuidv4()
                            }
                            return (  
                                <div
                                    key={key}
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
                            )
                        },
                    };
                    nst[layoutname]=layoutposContsO[layoutname]

                    layoutname="Main";
                    layoutposContsO[layoutname]={
                        name : layoutname,            
                        e : (...args)=>{
                                
                                let key=""    
                                if (args[0]){
                                    if (args[0].key){
                                        key=args[0].key
                                    }
                                    if (args[0].name){
                                        key=args[0].name
                                    }
                                }

                                if (key===""){
                                    key=uuidv4()
                                }

                                return (               
                                    <div
                                        key={key}
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
                        }

                    };
                    nst[layoutname]=layoutposContsO[layoutname]

                    layoutname="Settings";
                    layoutposContsO[layoutname]={
                        name : layoutname,            
                        e : (...args)=>{                            
                                let key=""    
                                if (args[0]){
                                    if (args[0].key){
                                        key=args[0].key
                                    }
                                    if (args[0].name){
                                        key=args[0].name
                                    }
                                }

                                if (key===""){
                                    key=uuidv4()
                                }
                                
                                return (                  
                                    <div
                                        key={key}
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
                        }
                    };
                    nst[layoutname]=layoutposContsO[layoutname]

                    layoutname="title";
                    layoutposContsO[layoutname]={
                        name : layoutname,            
                        e : (...args)=>{                            
                                let key=""    
                                if (args[0]){
                                    if (args[0].key){
                                        key=args[0].key
                                    }
                                    if (args[0].name){
                                        key=args[0].name
                                    }
                                }

                                if (key===""){
                                    key=uuidv4()
                                }

                                return (                  
                                    <div
                                        key={key}
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
                        }

                    };
                    nst[layoutname]=layoutposContsO[layoutname]

                    layoutname="linebreak1";
                    layoutposContsO[layoutname]={
                        name : layoutname,            
                        e : (...args)=>{
                                
                            let key=""    
                            if (args[0]){
                                if (args[0].key){
                                    key=args[0].key
                                }
                                if (args[0].name){
                                    key=args[0].name
                                }
                            }

                            if (key===""){
                                key=uuidv4()
                            }

                            return (<br key={key} />)
                        },
                    };  
                    nst[layoutname]=layoutposContsO[layoutname]

                    layoutname="summary";
                    layoutposContsO[layoutname]={
                        name : layoutname,            
                        e : (...args)=>{
                                
                                let key=""    
                                if (args[0]){
                                    if (args[0].key){
                                        key=args[0].key
                                    }
                                    if (args[0].name){
                                        key=args[0].name
                                    }
                                }

                                if (key===""){
                                    key=uuidv4()
                                }

                                return (             
                                    <div
                                        key={key}
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
                        }
                    };
                }
                nst[layoutname]=layoutposContsO[layoutname]
                LayoutposContsODynTmp0=nst
                return nst
            })
            setCmptMe((st)=>{
                let nst={...st};

                if (nst.view.layoutposContsO){}else{
                    nst.view.layoutposContsO={}
                }
                let layoutposContsOTmp={}
                for ( let p in LayoutposContsODynTmp0){
                    let r=LayoutposContsODynTmp0[p]
                    layoutposContsOTmp[p]={
                        
                    }
                }
                nst.view.layoutposContsO=layoutposContsOTmp

                return nst;
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
                    e : (...args)=>{                            
                            let key=""    
                            if (args[0]){
                                if (args[0].key){
                                    key=args[0].key
                                }
                                if (args[0].name){
                                    key=args[0].name
                                }
                            }

                            if (key===""){
                                key=uuidv4()
                            }

                            return (             
                                <div
                                    key={key}
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
                    }
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

            let LayoutposContsStatesDynTmp0
            setLayoutposContsStatesDyn((st)=>{
                let nst={...st} ;

                if (true){
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
                }
                
                LayoutposContsStatesDynTmp0=nst
                return nst
            })
            setCmptMe((st)=>{
                let nst={...st};

                if (nst.view.LayoutposContsStates){}else{
                    nst.view.LayoutposContsStates={}
                }
                let LayoutposContsStatesDynTmp={}
                for ( let p in LayoutposContsStatesDynTmp0){
                    let r=LayoutposContsStatesDynTmp0[p]
                    LayoutposContsStatesDynTmp[p]={
                        name : r.name,
                        posCont : r.posCont
                    }
                }
                nst.view.LayoutposContsStates=LayoutposContsStatesDynTmp

                return nst;
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

    let toolsShowHideStyle={
        border : "solid thin lightgrey",
        width : 400,
        height : 150,
    }
    if (toolsShowHide===false){
        toolsShowHideStyle.display="none"        
        toolsShowHideStyle.border=undefined
        toolsShowHideStyle.width=undefined
        toolsShowHideStyle.height=undefined
    }
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

        return (
            <div
                style={{
                    position : "relative",
                    display : "inline-block",
                    width : toolsShowHideStyle.width,
                    height : toolsShowHideStyle.height,
                    margin : 5 ,
                    padding : 5 ,
                    border : toolsShowHideStyle.border,
                    borderRadius : 5 , 
                }}
            >   
                <button 
                    onClick={()=>{
                        setToolsShowHide(!toolsShowHide)
                    }}
                >show/hide tlas</button>
                
                <div
                    style={{
                        display : toolsShowHideStyle.display,
                    }}
                >
                    Tools
                    <br/>
                    ==========
                    <br/>
                    {arrE}
                </div>
            </div>
        )
    })();

        
    let toolAssetsShowHideStyle={
        border : "solid thin lightgrey",
        width : 400,
        height : 150,
    }
    if (toolAssetsShowHide===false){
        toolAssetsShowHideStyle.display="none"        
        toolAssetsShowHideStyle.border=undefined
        toolAssetsShowHideStyle.width=undefined
        toolAssetsShowHideStyle.height=undefined
    }
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
                //width : 40,
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
                        setLayoutStatePropertiesPosContAddName(val)
                    }}
                >
                    {toolname}
                </div>
            )


            i++;
        }
       
        return (
            <div
                style={{
                    position : "relative",
                    display : "inline-block",
                    width : toolAssetsShowHideStyle.width,
                    height : toolAssetsShowHideStyle.height,
                    margin : 5 ,
                    padding : 5 ,
                    border : toolAssetsShowHideStyle.border,
                    borderRadius : 5 , 
                    overflow : "hidden",
                }}
            >   
                <button 
                    onClick={()=>{
                        setToolAssetsShowHide(!toolAssetsShowHide)
                    }}
                >show/hide tlas</button>
                
                <div
                    style={{
                        position : "relative",
                        width : 385,
                        height : 135 ,
                        overflow : "auto",
                        display : toolAssetsShowHideStyle.display
                    }}
                >
                    Layout Assets 
                    <br/>
                    ==========
                    <br/>
                    <button
                        onClick={()=>{
                            
                        }}
                    >add</button>
                    <br/>
                    {arrE}
                </div>
            </div>
        )
    })()


    

    let layoutStatesShowHideStyle={
        border : "solid thin lightgrey",
       
    }
    if (layoutStatesShowHide===false){
        layoutStatesShowHideStyle.display="none"        
        layoutStatesShowHideStyle.border=undefined
    }
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
       
        return (
            <div
                style={{
                    margin : 5 ,
                    padding : 5 ,
                    border : layoutStatesShowHideStyle.border,
                    borderRadius : 5 , 
                }}
            >   
                <button 
                    onClick={()=>{
                        setLayoutStatesShowHide(!layoutStatesShowHide)
                    }}
                >show/hide lst</button>
                <div
                    style={{
                        display : layoutStatesShowHideStyle.display
                    }}
                >
                    Layout States 
                    <br/>
                    ==========
                    <br/>               
                    <label
                        >
                            add layout
                        </label>
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
                                let layoutname=currentNewCmptName;

                                let LayoutposContsStatesDynTmp0;
                                setLayoutposContsStatesDyn((st)=>{
                                    let nst={...st};

                                    let nr={
                                        name : layoutname,
                                    }
                                    
                                    nr={
                                        name : layoutname,
                                        posCont : [ ],            
                                        eLogic : function(){
                                            let tt=this;
                                            let args=arguments;
                                            if (args.length > 0){
                                                tt=args[0]
                                            }
                                            let ret=tt.posCont
                                            // custom code 

                                            return ret
                                        }
                                    }

                                    nst[layoutname]=nr;
                                    LayoutposContsStatesDynTmp0=nst[layoutname]

                                    return nst;
                                })

                                setCmptMe((st)=>{
                                    let nst={...st};
                    
                                    if (nst.view.LayoutposContsStates){}else{
                                        nst.view.LayoutposContsStates={}
                                    }
                                    
                                    nst.view.LayoutposContsStates[layoutname]=LayoutposContsStatesDynTmp0;

                                    return nst;
                                })
                                
                                
                                
                            }}
                        >add</button>
                        <button
                            onClick={()=>{
                                let layoutname=layoutcurrStateSel;
                                setLayoutposContsStatesDyn((st)=>{
                                    let nst={...st};

                                    delete nst[layoutname]
                                    return nst;
                                    
                                })
                                setCmptMe((st)=>{
                                    let nst={...st};

                                    delete nst.view.LayoutposContsStates[layoutname]

                                    return nst;
                                })
                            }}
                        >del</button>
                        <br/>
                    <br/>
                    {arrE}
                </div>
            </div>
        )
    })()

    let layoutStatesPropertiesShowHideStyle={
        border : "solid thin black",
        width : 300,
        height : 200,
    }
    if (layoutStatesPropertiesShowHide===false){
        layoutStatesPropertiesShowHideStyle.display="none"        
        layoutStatesPropertiesShowHideStyle.border=undefined
        layoutStatesPropertiesShowHideStyle.width=undefined
        layoutStatesPropertiesShowHideStyle.height=undefined
    }
    let layoutStatePropertiesE=(()=>{
        let arrE=[];

        let styledef={
            position : "relative",
            display : "inline-block",                                
            border : "black solid transparent",
            borderRadius : 5,
            overflow : "hidden",
            margin : 1,
            padding : 4,
            color : "white",
            background : "orange",
        }

        let curr={}
        let currStr="{}"
        let currPosContE=[]
        if (layoutposContsStates[layoutcurrStateSel]){
            curr=layoutposContsStates[layoutcurrStateSel];
           
            if (curr.posCont){                
                currStr=JSON.stringify(curr)

                curr.posCont.forEach((r,i)=>{
                    let style={...styledef}
                    if (r===layoutStatePropertiesPosContCurrSel){
                        style.background="blue";
                    }
                   

                    currPosContE.push(
                        <div
                            style={style}
                            onClick={()=>{
                                setLayoutStatePropertiesPosContCurrSel(r)
                            }}
                        >
                            {r}
                        </div>
                    )
                });
                

            }

        }

        return (
            <div
                style={{
                    position : "relative",
                    display : "inline-block",
                    border : layoutStatesPropertiesShowHideStyle.border,
                    fontSize  : 11,
                    width : layoutStatesPropertiesShowHideStyle.width,
                    height : layoutStatesPropertiesShowHideStyle.height,
                    overflow : "hidden",
                    padding : 5,
                    margin : 5,


                }}
            >   
                <button 
                    onClick={()=>{
                        setLayoutStatesPropertiesShowHide(!layoutStatesPropertiesShowHide)
                    }}
                >show/hide lstpr</button>
                <div
                    style={{
                        position : "relative",
                        display : layoutStatesPropertiesShowHideStyle.display,                        
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
                            if (layoutposContsODyn[assetName].assetSource){
                                assetName=layoutposContsODyn[assetName].assetSource;
                            }
                            if (layoutposContsODyn[assetName]){        
                                
                                if (layoutposContsStatesDyn[layoutcurrStateSel]){     
                                    let nst0={...layoutposContsStates};   

                                    let newInstanceID=""
                                    let countIdx=0;
                                    if (instances.current.counts[assetName]){
                                        instances.current.counts[assetName].count++ ;
                                    }else{
                                        instances.current.counts[assetName]={
                                            name : assetName,
                                            count : 0,
                                        }
                                    } 
                                    countIdx=instances.current.counts[assetName].count    
                                    
                                    newInstanceID=assetName + "__inst" + countIdx  ;
                                    
                                    instances.current.all[newInstanceID]={};          
                                    instances.current.all[newInstanceID].id=newInstanceID;
                                    instances.current.all[newInstanceID].uuid=uuidv4();
                                    instances.current.all[newInstanceID].dateCreate=new Date();

                                    if (layoutposContsODyn[assetName].assetSource){
                                        instances.current.all[newInstanceID].assetSource=layoutposContsODyn[assetName].assetSource
                                    }else{
                                        instances.current.all[newInstanceID].assetSource=assetName;
                                    }
                                    
                                    
                                    
                                    // nst0[layoutcurrStateSel].posCont.push(assetName);


                                    // nst0[layoutcurrStateSel].posCont.push(instances.current.all[newInstanceID].id);
                                    let currIdx=(()=>{
                                        let foundI=false
                                        let idx=0
                                        nst0[layoutcurrStateSel].posCont.forEach((r1,i2)=>{
                                            if (r1===layoutStatePropertiesPosContCurrSel ){
                                                foundI=true;
                                                idx=i2 + 1 ;
                                            }
                                        })

                                        if (foundI===false){
                                            return nst0[layoutcurrStateSel].posCont.length ; // same as push to end of last ;
                                        }
                                        return idx
                                    })();
                                    nst0[layoutcurrStateSel].posCont.splice(currIdx, 0,instances.current.all[newInstanceID].id)


                                    let LayoutposContsODynTmp0
                                    let  LayoutposContsStatesDynTmp0
                                    setLayoutposContsODyn((st)=>{
                                        let nst={...st}   

                                        let layoutname=instances.current.all[newInstanceID].assetSource;
                                        nst[newInstanceID]={...st[layoutname]};
                                        nst[newInstanceID].name=newInstanceID;
                                        nst[newInstanceID].assetSource=layoutname;
                                        // #TODO generate new E  and key 
                                        // nst[newInstanceID].generate({ key : newInstanceID});
                                        LayoutposContsODynTmp0=nst
                                        return nst;
                                    })  ;                                 
                                    setLayoutposContsStatesDyn((st)=>{
                                        let nst={...st}   

                                        nst[layoutcurrStateSel].posCont=nst0[layoutcurrStateSel].posCont;

                                        LayoutposContsStatesDynTmp0=nst
                                        return nst;
                                    });
                                    setCmptMe((st)=>{
                                        let nst={...st};

                                        if (nst.view.layoutposContsO){}else{
                                            nst.view.layoutposContsO={}
                                        }
                                        let layoutposContsOTmp={}
                                        for ( let p in LayoutposContsODynTmp0){
                                            let r=LayoutposContsODynTmp0[p]
                                            layoutposContsOTmp[p]={
                                                assetSource : r.assetSource
                                            }
                                        }
                                        nst.view.layoutposContsO=layoutposContsOTmp
                                        
                                        // -------------------------------
                                        if (nst.view.LayoutposContsStates){}else{
                                            nst.view.LayoutposContsStates={}
                                        }
                                        let LayoutposContsStatesDynTmp={}
                                        for ( let p in LayoutposContsStatesDynTmp0){
                                            let r=LayoutposContsStatesDynTmp0[p]
                                            LayoutposContsStatesDynTmp[p]={
                                                name : r.name,
                                                posCont : r.posCont
                                            }
                                        }
                                        nst.view.LayoutposContsStates=LayoutposContsStatesDynTmp
                        
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
                    <button
                        style={{
                            fontSize : 9,                        
                        }}
                        onClick={()=>{
                            if (layoutposContsStatesDyn[layoutcurrStateSel]){
                                let nst0={...layoutposContsStates};  

                                let currIdx=(()=>{
                                    let foundI=false
                                    let idx=0
                                    nst0[layoutcurrStateSel].posCont.forEach((r1,i2)=>{
                                        if (r1===layoutStatePropertiesPosContCurrSel ){
                                            foundI=true;
                                            idx=i2  ;
                                        }
                                    })

                                    if (foundI===false){
                                        return nst0[layoutcurrStateSel].posCont.length ; // same as push to end of last ;
                                    }
                                    return idx
                                })();
                                nst0[layoutcurrStateSel].posCont.splice(currIdx, 1)

                                let LayoutposContsODynTmp0
                                let  LayoutposContsStatesDynTmp0
                                setLayoutposContsStatesDyn((st)=>{
                                    let nst={...st}   

                                    nst[layoutcurrStateSel].posCont=nst0[layoutcurrStateSel].posCont;

                                    LayoutposContsStatesDynTmp0=nst
                                    return nst;
                                })
                                setCmptMe((st)=>{
                                    let nst={...st};
                                                                       
                                    // -------------------------------
                                    if (nst.view.LayoutposContsStates){}else{
                                        nst.view.LayoutposContsStates={}
                                    }
                                    let LayoutposContsStatesDynTmp={}
                                    for ( let p in LayoutposContsStatesDynTmp0){
                                        let r=LayoutposContsStatesDynTmp0[p]
                                        LayoutposContsStatesDynTmp[p]={
                                            name : r.name,
                                            posCont : r.posCont
                                        }
                                    }
                                    nst.view.LayoutposContsStates=LayoutposContsStatesDynTmp
                    
                                    return nst;
                                })
                            }

                        }}
                    >del</button>

                    <br/>
                    {currPosContE}
                    
                    <br/>
                    {arrE}
                </div>
            </div>
        )
    })()


    let mainlayoutStatesPropertiesShowHideStyle={
        border : "solid thin black",
        width : 200,
        height : 100,
    }
    if (mainlayoutStatesPropertiesShowHide===false){
        mainlayoutStatesPropertiesShowHideStyle.display="none"
        mainlayoutStatesPropertiesShowHideStyle.border=undefined
        mainlayoutStatesPropertiesShowHideStyle.width=undefined
        mainlayoutStatesPropertiesShowHideStyle.height=undefined
    }
    let mainLayoutPropertiesE=(()=>{

        return (

            <div
                style={{...{
                    position : "relative",
                    display : "inline-block",
                    border : mainlayoutStatesPropertiesShowHideStyle.border,
                    fontSize  : 11,
                    width : mainlayoutStatesPropertiesShowHideStyle.width,
                    height : mainlayoutStatesPropertiesShowHideStyle.height,
                    overflow : "hidden",
                    padding : 5,
                    margin : 5,


                },...{}}}
            >   
                <button 
                    onClick={()=>{
                        setMainLayoutStatesPropertiesShowHide(!mainlayoutStatesPropertiesShowHide)
                    }}
                >show/hide mlpr</button>
                <div
                    style={{
                        display : mainlayoutStatesPropertiesShowHideStyle.display
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
                        <label>Startup layout </label>
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

    let previewStyle={}
    if (props.previewStyle){
        previewStyle={previewStyle,...props.previewStyle}
    }

    if (style.width>800){

    }

    let innerStyle={
        position : "relative",
        overflow : "auto" , 
        //width : 1200,
        width : style.width - 50,
        height : 600, 
    }
    if (props.innerStyle){
        innerStyle={innerStyle,...props.innerStyle}
    }

    if (previewShowHide===false){
        previewStyle.display="none"
    }

    let loadShowHideStyle={}
    if (loadShowHide===false){
        loadShowHideStyle.display="none"
    }

    let newSaveShowHideStyle={}
    if (newSaveShowHide===false){
        newSaveShowHideStyle.display="none"
    }

    let textMainShowHideStyle={}
    if (textMainShowHide===false){
        textMainShowHideStyle.display="none"
    }


    
    
    


    return (
        <div
            style={style}
        >
            Views

            
            <div
                style={innerStyle}

            >
                <div
                    style={{
                        position : "relative",
                        float : "left",
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
                            <button 
                                    onClick={()=>{
                                        setLoadShowHide(!loadShowHide)
                                    }}
                            >show/hide ld</button>
                            <div
                                style={loadShowHideStyle}
                            >
                            {listCmptMeE}
                            </div>
                        </div>
                        <div
                            style={{
                                float : "left",
                            }}
                        >
                            <button 
                                    onClick={()=>{
                                        setNewSaveShowHide(!newSaveShowHide)
                                    }}
                            >show/hide nw-sv</button>
                            <div
                                 style={newSaveShowHideStyle}
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
                                        let nd={...cmptMe}
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
                        </div>



                        <div style={{ clear : "left" }} />
                    </div>

                </div>

                {/*<div style={{ clear : "left" }} /> */}

                <div
                    style={{
                        position : "relative",
                        float : "left",
                    }}

                >    
                    <button 
                        style={{
                            position : "relative",
                            float : "left",
                        }}
                        onClick={()=>{
                            setTextMainShowHide(!textMainShowHide)
                        }}
                    >show/hide txt</button>
                    <br/>
                    <div
                        style={{...{
                            float : "left",
                        },...textMainShowHideStyle}}
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

                { /* <div style={{ clear : "left" }} /> */}

                <div
                    style={{
                        position : "relative",
                        float : "left",
                        width : 700,
                        //background : "purple",
                    }}

                > 
                    
                    {toolsCmptMeE}
                    {layoutAssetsE}
                    
                    
                </div>

               

                <div
                    style={{
                        position : "relative",
                        float : "left",
                        width : 700,
                        
                    }}

                >       
                    {viewLayoutStatesE}
                  
                </div>
                <div
                    style={{
                        position : "relative",
                        float : "left",
                        width : 700,
                        
                    }}

                >       
                  
                    {layoutStatePropertiesE}
                    {mainLayoutPropertiesE}
                </div>
                
                <div style={{ clear : "left" }} />

                <div
                    style={{
                        position : "relative",
                        float : "left",
                        width : 300
                    }}

                >    
                    <div
                        style={{
                            position : "relative",
                            float : "left",
                           
                        }}
                    >
                        
                        {subCmptMeListE}
                        
                        
                    </div>
                    <div
                        style={{
                            position : "relative",
                            float : "left",
                            
                        }}
                    >
                        {propsListE}

                    </div>
                    <div
                        style={{
                            position : "relative",
                            float : "left",
                            display : "inline-block",
                        }}
                    >
                        {propCmptMeE}
                    </div>
                    
                    <div style={{ clear : "left" }} />

                    <div style={{ clear : "left" }} />

                    { /* <div style={{ clear : "left" }} /> */}
                </div>

                
                <div style={{ clear : "left" }} />
                {/* preview */}
                <div
                    style={{
                        position : "relative",
                    }}
                >    
                    <label
                        style={{
                            position : "relative",
                        }}
                    >preview</label>
                    <button 
                        onClick={()=>{
                            setPreviewShowHide(!previewShowHide)
                        }}
                    >show/hide</button>
                    <div
                        style={{
                            ...{
                            position : "relative",
                            width  : 1820,
                            height  : 1220,
                            overflow : "hidden",
                            border  : "solid thin black",
                            },
                            ...previewStyle
                            
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

                <div
                    style={{
                        position : "relative",
                        
                    }}
                >    
                    <br/>
                    <button
                        onClick={()=>{
                            let txt=generateSrc()
                            setSrcTxt(txt)
                        }}
                    >generate source</button>
                    <br/>
                    <textarea
                        value={srcTxt}
                        style={{
                            width : 1200,
                            height : 500,
                            
                        }}
                        onChange={(e)=>{
                            let val=e.target.value
                            setSrcTxt(val)

                        }}
                        
                        
                    >

                    </textarea>

                </div>
            </div>



        </div>
    )

}


