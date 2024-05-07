import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"
//import { ContextStore } from "../contextStore"
//import $gl from "../../../../common/globallib"
//import { $cgl } from "../../../globals/cg"
//import { Window0001 } from "../../../widgets/containers/window0001"
//import { $cn } from "../../../../common/libNative"
import { v4 as uuidv4 } from 'uuid';
import { saveViewsBE as saveCmptMeBE ,listViewsBE as listCmptMeBE,loadViewsBE as loadCmptMeBE} from './libs/backend';

import { genCommonAssets, parseAssetsParamsFn } from "./assetsCommon/commonAssetsBasic";

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
    let [componentName, setComponentName]=useState("")
    let [componentPath, setComponentPath]=useState("cview")


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

    //let [assetProperty,setAssetProperty]=useState({});
    let [assetPropertyStyleBackground,setAssetPropertyStyleBackground]=useState("");
    let [assetPropertyStyleColor,setAssetPropertyStyleColor]=useState("");
    let [assetPropertyStyleZindex,setAssetPropertyStyleZindex]=useState(0);
    let [assetPropertyStyleBorder,setAssetPropertyStyleBorder]=useState("");
    let [assetPropertyStyleBorderRadius,setAssetPropertyStyleBorderRadius]=useState(0);
    let [assetPropertyStyleFloat,setAssetPropertyStyleFloat]=useState("");
    let [assetPropertyStyleClear,setAssetPropertyStyleClear]=useState("");
    let [assetPropertyStyleFontFamily,setAssetPropertyStyleFontFamily]=useState("");
    let [assetPropertyStyleFontSize,setAssetPropertyStyleFontSize]=useState(0);
    let [assetPropertyStyleFontWeight,setAssetPropertyStyleFontWeight]=useState("");
    let [assetPropertyStyleTextAlign,setAssetPropertyStyleTextAlign]=useState("");
    let [assetPropertyStyleCursor,setAssetPropertyStyleCursor]=useState("");
    let [assetPropertyStyleLeft,setAssetPropertyStyleLeft]=useState(0);
    let [assetPropertyStyleRight,setAssetPropertyStyleRight]=useState(0);
    let [assetPropertyStyleTop,setAssetPropertyStyleTop]=useState(0);
    let [assetPropertyStyleBottom,setAssetPropertyStyleBottom]=useState(0);
    let [assetPropertyStyleMargin,setAssetPropertyStyleMargin]=useState("");
    let [assetPropertyStylePadding,setAssetPropertyStylePadding]=useState("");    
    let [assetPropertyStylePostion,setAssetPropertyStylePostion]=useState("");    
    let [assetPropertyStyleDisplay,setAssetPropertyStyleDisplay]=useState("");    

    let [assetPropertyClass,setAssetPropertyClass]=useState("");
    let [assetPropertyID,setAssetPropertyID]=useState("");

    let [assetPropertySrc,setAssetPropertySrc]=useState("");
    let [assetPropertyHref,setAssetPropertyHref]=useState("");
    
    let [assetPropertyValue,setAssetPropertyValue]=useState("");
    let [assetPropertyPlaceholder,setAssetPropertyPlaceholder]=useState("");
    let [assetPropertyType,setAssetPropertyType]=useState("");

    let [assetPropertyEventOnClick,setAssetPropertyEventOnClick]=useState("");
    let [assetPropertyEventOnClickProps,setAssetPropertyEventOnClickProps]=useState({});
    let [assetPropertyEventOnClickProps1,setAssetPropertyEventOnClickProps1]=useState("");
    let [assetPropertyEventOnClickPropsType1,setAssetPropertyEventOnClickPropsType1]=useState("");
    let [assetPropertyEventOnClickProps2,setAssetPropertyEventOnClickProps2]=useState("");
    let [assetPropertyEventOnClickPropsType2,setAssetPropertyEventOnClickPropsType2]=useState("");
    let [assetPropertyEventOnClickProps3,setAssetPropertyEventOnClickProps3]=useState("");
    let [assetPropertyEventOnClickPropsType3,setAssetPropertyEventOnClickPropsType3]=useState("");
    let [assetPropertyEventOnClickProps4,setAssetPropertyEventOnClickProps4]=useState("");
    let [assetPropertyEventOnClickPropsType4,setAssetPropertyEventOnClickPropsType4]=useState("");
    let [assetPropertyEventOnClickProps5,setAssetPropertyEventOnClickProps5]=useState("");
    let [assetPropertyEventOnClickPropsType5,setAssetPropertyEventOnClickPropsType5]=useState("");
    let [assetPropertyEventOnClickProps6,setAssetPropertyEventOnClickProps6]=useState("");
    let [assetPropertyEventOnClickPropsType6,setAssetPropertyEventOnClickPropsType6]=useState("");
        


    let [assetPropertyStyleBoxChild,setAssetPropertyStyleBoxChild]=useState({
        prop : {
            events : { show : true , css : {}, cssHide : {display : "none"} , cssShow : { display : "block"} },
            css : { show : true , css : {}, cssHide : {display : "none"} , cssShow : { display : "block"} },
            props : { show : true , css : {}, cssHide : {display : "none"} , cssShow : { display : "block"} },
        }
    });


    let [assetPropertyCurrSel,setAssetPropertyCurrSel]=useState("");
    
    let instancesPropertiesDef={
        style : {},
        
    }
    let instanceEachDef={
        id : "",
        uuid : "",
        name : "",
        type : "",
        subtype : [],
        dateCreate : "",
        style : {},
        states : {},
        events : {},
        Fn : {},
        FnProps : {},
        properties : {...instancesPropertiesDef}
    };
    let instancesDef={
        all : {},
        counts : {},
        Fn : {},
        events : {},
        states : {},
        vars : {},
    }
    let instances=useRef({...instancesDef})

    let [srcTxt,setSrcTxt]=useState("");

    // --------------------------------
    let vmodesTypesDef={ 
        all : ["design",],
        default : "nomode",
        modes : {
            "nomode" : { name : "nomode" },
            "edit" : { name : "edit" },
            "design" : { name : "design" },
            "run" : { name : "run" },
            "profileTest" : { name : "profiletest" },
            "deploy" : { name : "deploy" },
            "componentEdit" : { name : "componentEdit" },
            "planning" : { name : "planning" },
            "debugData" : { name : "debugData" },
            "src" : { name : "src" },
            "project" : { name : "project" },
        }
    }
    let [vmodes,setVmodes]=useState({"nomode" : {}});
    let [vmodesMultiMode,setVmodesMultiMode]=useState(false);
    let [vmodesTypes,setVmodesTypes]=useState({...vmodesTypesDef});


    // --------------------------------

    
    let [appStatePrev,setAppPrev]=useState({}); // used to test app states for preview/run mode

    let [appState,setAppState]=useState({});
    let [appStateName,setAppStateName]=useState("");
    let [appStateID,setAppStateID]=useState("");    
    

    let [appFn,setAppFn]=useState({});
    let [appFnName,setAppFnName]=useState("");
    let [appFnID,setAppFnID]=useState("");
    let [appFnProps,setAppFnProps]=useState([]);
    let [appFnPropName,setAppFnPropName]=useState("");
    let [appFnPropID,setAppFnPropID]=useState("");

    
    let [appEvent,setAppEvent]=useState({});
    let [fnsName,setFnsName]=useState("");
    let [fnsID,setFnsID]=useState("");
    let [fnsProps,setFnsProps]=useState("");
    
    let [sigil,setSigil]=useState({}); // proxyText    
    let [sigilName,setSigilName]=useState({}); 
    let [sigilID,setSigilID]=useState({}); 


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
            appFnInitial();
            
            
            
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
        instances.current={...instancesDef}

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

        let nLtPCO=layoutposContsOAddInitial({ updateState : false })
        LayoutposContsODynTmp0=nLtPCO.layoutposContsO ;

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

                instances.current={...instancesDef};
                if (data.view.instances){
                    instances.current=data.view.instances
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

        setComponentName(data.name_cmpt);
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


        let createUpdateFiles=(...args)=>{

        }

        let appFnInitial=()=>{
            let name=""
            //let nst0={...appFn}
            let nst0={};

            name="alert";
            nst0[name]={
                "fn" : alert,                    
                "type" : "fn", // ref : reactRef , ruleSeq , fn : ()=>{} , fnStr : string reference to global string registry
                "props" : [
                    { "name" : "name"  , type : "string" , "optional" : false , "subtype" : [/* if prop is like a object and it has subtypes that need validation */]},
                ],
                 
            };
            instances.current.Fn[name]=nst0[name]

           
            name="changeLayout";
            nst0[name]={
                "fn" : layoutsetCurrStateRef,                    
                "type" : "ref", // ref : reactRef , ruleSeq , fn : ()=>{} , fnStr : string reference to global string registry
                "props" : [
                    { "name" : "name"  , type : "string" , "optional" : false },
                ],
                "subtype" : [] // { optional }
            };
            instances.current.Fn[name]=nst0[name]

            
            setAppFn((st)=>{
                let nst={...st};

                return nst0;
            })
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
                txt+=`export const ${componentName}=(props)=>{`;
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
        

        let layoutposContsOAddInitial=(paramsIn)=>{
            let params={ updateState : true }
            if (paramsIn){
                params={...params,...paramsIn}
            }

            let layoutposContsStates={};
            let layoutposContsO={};
            let layoutname="";

            let genCommonAssetsNew={}

            let genCommonAssetsTmp=genCommonAssets();

            genCommonAssetsTmp.forEach((r,i)=>{
                let nr={}
                layoutname=r.name;
                nr={
                    "name" : layoutname, 
                };
                if (r.e){
                    nr.e=r.e
                }else{
                    nr.e=(...args)=>{
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
                            >
                                <h4>{layoutname}</h4>                
                            </div>
                        )
                        

                    };
                }
                

                genCommonAssetsNew[layoutname]=nr
            });

           
            let LayoutposContsODynTmp0
            let nst01={...layoutposContsODyn} ;

            //let layoutposContsO={};
            //let layoutname="";
            if (true){
                

                for (let np in genCommonAssetsNew){
                    let r=genCommonAssetsNew[np];
                    layoutname=np;
                    layoutposContsO[layoutname]={
                        name : layoutname,    
                        e : r.e,
                    };
                    nst01[layoutname]=layoutposContsO[layoutname];
                }
            }

            if (true){
                layoutname="menu";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (...args)=>{
                        
                        let params={}
                        parseAssetsParamsFn(params, args);

                        return (  
                            <div
                                key={params.key}
                                style={{...layoutmenuStyle,...params.style}}
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
                nst01[layoutname]=layoutposContsO[layoutname]

                layoutname="Main";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (...args)=>{
                            
                            let params={}
                            parseAssetsParamsFn(params, args);


                            return (               
                                <div
                                    key={params.key}
                                    style={{...{
                                        background : "white",
                                        position : "relative",
                                        display : "inline-block",
                                        width : 400,
                                        height : 300,
                                        borderRadius : 8,
                                        margin : 5,
                                        padding : 5,
                                        overflow : "hidden"
                                    },...params.style}}
                                >
                                    <h4>Main</h4>                
                                </div>
                        )
                    }

                };
                nst01[layoutname]=layoutposContsO[layoutname]

                layoutname="Settings";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (...args)=>{                            
                            let params={}
                            parseAssetsParamsFn(params, args);

                            
                            return (                  
                                <div
                                    key={params.key}
                                    style={{...{
                                        background : "white",
                                        position : "relative",
                                        display : "inline-block",
                                        width : 400,
                                        height : 300,
                                        borderRadius : 8,
                                        margin : 5,
                                        padding : 5,
                                        overflow : "hidden"
                                    },...params.style}}
                                >
                                    <h4>Settings</h4>                
                                </div>
                        )
                    }
                };
                nst01[layoutname]=layoutposContsO[layoutname]

                layoutname="title";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (...args)=>{                            
                            let params={}
                            parseAssetsParamsFn(params, args);

                            let tmp=""
                            let tmpO={
                                value : "my title"
                            } 
                            
                            tmp="value"
                            if (params.props[tmp]!==undefined){
                                tmpO[tmp]=params.props[tmp]
                            }

                            if (params.value){

                            }
                            
                            return (                  
                                <div
                                    key={params.key}
                                    style={{...{
                                        background : "white",
                                        position : "relative",
                                        display : "inline-block",
                                        width : 300,
                                        height : 90,
                                        borderRadius : 8,
                                        margin : 5,
                                        padding : 5,
                                        overflow : "hidden"
                                    },...params.style}}
                                >
                                    <h4>{tmpO["value"]}</h4>                
                                </div>
                        )
                    }

                };
                nst01[layoutname]=layoutposContsO[layoutname]

                layoutname="linebreak1";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (...args)=>{
                            
                        let params={}
                        parseAssetsParamsFn(params, args);


                        return (<br key={params.key} />)
                    },
                };  
                nst01[layoutname]=layoutposContsO[layoutname]

                layoutname="summary";
                layoutposContsO[layoutname]={
                    name : layoutname,            
                    e : (...args)=>{
                            
                            let params={}
                            parseAssetsParamsFn(params, args);


                            return (             
                                <div
                                    key={params.key}
                                    style={{...{
                                        background : "white",
                                        position : "relative",
                                        display : "inline-block",
                                        width : 400,
                                        height : 300,
                                        borderRadius : 8,
                                        margin : 5,
                                        padding : 5,
                                        overflow : "hidden",
                                    },...params.style}}
                                >
                                    <h4>Summary</h4>                
                                </div>
                        )
                    }
                };

                


            }
            nst01[layoutname]=layoutposContsO[layoutname]
            LayoutposContsODynTmp0=nst01;
            
            if (params.updateState){
                setLayoutposContsODyn((st)=>{
                    return nst01
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
            }

                
            

            return {
                layoutposContsO : nst01 
            } 

            //updateStateForce()
        }

        let layoutposContsODynGenerateDynamic=(()=>{
            layoutposContsO={...layoutposContsO,...layoutposContsODyn}

        })()

        // ---- 

        // ---- posContsStates
        
        
        
        let layoutposContsStatesAddInitial=(paramsIn)=>{
            let params={ updateState : true }
            if (paramsIn){
                params={...params,...paramsIn}
            }

            let layoutposContsStates={};
            let layoutposContsO={};
            let layoutname="";

            let LayoutposContsStatesDynTmp0

            let nst01={...layoutposContsStatesDyn} ;
            

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
                nst01[layoutname]=layoutposContsStates[layoutname]

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
                nst01[layoutname]=layoutposContsStates[layoutname]

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
                nst01[layoutname]=layoutposContsStates[layoutname]
            }
            
            LayoutposContsStatesDynTmp0=nst01

            setLayoutposContsStatesDyn((st)=>{
                
                return nst01
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

            //updateStateForce()
        }

        let layoutposContsStatesGenerateDynamic=(()=>{
            layoutposContsStates={...layoutposContsStates,...layoutposContsStatesDyn}

        })()

        // ---- 
        
        //layout
        //let { myLayout,currState ,setCurrState  }=useMyLayout({ posContsStates, posContsO , allState , currStateDef : "viewSummary" })
        let layoutRetUseMyLayout=useMyLayout({ posContsStates : layoutposContsStates , posContsO : layoutposContsO  ,
            /* allState : layoutallState ,*/ 
            currStateDef : layoutcurrStateDef,
            extra : {instancesRef : instances },
        })
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
    let toolsCmptMeE
    
        
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
    let layoutAssetsE
    if (vmodes["nomode"] || vmodes["edit"]){
        layoutAssetsE=(()=>{
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
                    height : 20,
                    margin : 1,
                    padding : 2,
                    overflow : "hidden",
                    border : "solid lightgrey thin",
                    borderRadius : 5,
                    cursor : "pointer",
                    fontSize : 11,
                    background : "grey",
                    color : "white",

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
                            setAssetPropertyCurrSel(val)
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

                    <u>Layout Assets </u>   
                    <button 
                        style={{                        
                            fontSize : 9,           
                            marginLeft : 8, position : "relative"
                        }}
                        onClick={()=>{
                            setToolAssetsShowHide(!toolAssetsShowHide)
                        }}
                    >show/hide tlas</button>
                    
                    <div
                        style={{
                            position : "relative",
                            display : "inline-block",
                            width : 385,
                            height : 135 ,
                            overflow : "auto",
                            display : toolAssetsShowHideStyle.display
                        }}
                    >                    
                        {arrE}
                    </div>
                </div>
            )
        })()
    }

    let AssetPropertyE
    if (vmodes["nomode"] || vmodes["edit"]){
        AssetPropertyE=(()=>{
            let newInstanceFn=()=>{
                if (instances.current.all[assetPropertyCurrSel]){}else{
                    let newInstanceID=assetPropertyCurrSel
                    instances.current.all[newInstanceID]={...instanceEachDef}
                    instances.current.all[newInstanceID].id=newInstanceID
                    //instances.current.all[newInstanceID].properties={...instancesPropertiesDef};
                    instances.current.all[newInstanceID].assetSource=assetPropertyCurrSel
                    if (layoutposContsODyn[newInstanceID]){
                        if (layoutposContsODyn[newInstanceID].assetSource){
                            instances.current.all[newInstanceID].assetSource=layoutposContsODyn[newInstanceID].assetSource
                        }
                    }
                };                                   

                //if (instances.current.all[assetPropertyCurrSel].properties){}else{
                //    instances.current.all[assetPropertyCurrSel].properties={...instancesPropertiesDef}
                //}
                
                //if (instances.current.all[assetPropertyCurrSel].properties.style){}else{
                //    instances.current.all[assetPropertyCurrSel].properties.style={}
                //}
            }

            let Events=()=>{
                let arrE=[];

                let iG=0;

                if (true){                
                    arrE.push(
                        <div
                            style={{}}
                            key={iG}
                        >
                            <label
                                style={{
                                    fontSize  : 11,
                                }}
                            >onClick Fn : </label>
                            <input
                                value={assetPropertyEventOnClick}
                                style={{
                                    width : 80,
                                }}
                                onChange={(e)=>{
                                    let val=e.target.value
                                    setAssetPropertyEventOnClick(val)
                                }}
                                onBlur={(e)=>{
                                    let val=e.target.value
                                    
                                    newInstanceFn();
                                    
                                    let tmp="onClick"
                                    let insrec=instances.current.all[assetPropertyCurrSel].Fn
                                    if (val!==""){
                                        insrec[tmp]=val;                                        
                                    }else{
                                        if ( insrec[tmp]){
                                            delete insrec[tmp];
                                        }
                                    }

                                    setCmptMe((st)=>{
                                        let nst={...st};
                                        nst.view.instances=instances.current
                                        return nst;
                                    })
                                    
                                
                                }}
                            />     
                        </div>
                    )
                    iG++;
                }

                if (true){                
                    arrE.push(
                        <div
                            style={{}}
                            key={iG}
                        >
                            <label
                                style={{
                                    fontSize  : 11,
                                }}
                            >onClick Props 1: </label>
                            <input
                                value={assetPropertyEventOnClickProps1}
                                style={{
                                    width : 80,
                                }}
                                onChange={(e)=>{
                                    let val=e.target.value
                                    setAssetPropertyEventOnClickProps1(val)
                                }}
                                onBlur={(e)=>{
                                    let val=e.target.value
                                    
                                    newInstanceFn();
                                    
                                    let tmp="onClick"
                                    let tmp2=1
                                    let insrec=instances.current.all[assetPropertyCurrSel].FnProps
                                    if (val!==""){
                                        insrec[tmp]={};
                                        if (insrec[tmp]===undefined){
                                            insrec[tmp]={};
                                        }
                                        if (insrec[tmp][tmp2]===undefined){
                                            insrec[tmp][tmp2]={ val : val , type : "string"};
                                        }

                                        insrec[tmp][tmp2].val=val;

                                                                                                                        
                                    }else{
                                        if ( insrec[tmp]){
                                            delete insrec[tmp];
                                        }
                                    }

                                    setCmptMe((st)=>{
                                        let nst={...st};
                                        nst.view.instances=instances.current
                                        return nst;
                                    })
                                    
                                
                                }}
                            />     
                        </div>
                    )
                    iG++;
                }

                return (
                    <div
                        style={{
                            position : "relative",
                            margin : 1,
                            padding : 1,
                            background : "lightgreen",
                            borderRadius : 6,
                        }}
                    >
                        <u
                             style={{
                                cursor : "pointer"
                            }}
                            onClick={()=>{
                                let tmp="events";
                                let nst0={...assetPropertyStyleBoxChild };//JSON.parse(JSON.stringify(assetPropertyStyleBoxChild))
                                nst0.prop[tmp].show=!nst0.prop[tmp].show
                                if (nst0.prop[tmp].show){
                                    nst0.prop[tmp].css={...nst0.prop[tmp].cssHide}
                                }else{
                                    nst0.prop[tmp].css={...nst0.prop[tmp].cssShow}
                                }
                                setAssetPropertyStyleBoxChild(nst0)
                            }}
                        >events</u>
                        <div
                            style={
                                assetPropertyStyleBoxChild.prop["events"].css
                            }
                        >
                            {arrE}
                        </div>
                    </div>
                )
            }
            let EventsE=Events();

            return (
                <div
                    style={{
                        position : "relative",
                        display : "inline-block",
                        width : 200,
                        height : 150,
                        margin : 5 ,
                        padding : 5 ,
                        borderRadius : 5 , 
                        border : "solid thin lightgrey",
                        overflow : "hidden",
                    }}
                >
                    <div
                        style={{
                            position : "relative",
                            width : 195,
                            height : 145,
                            overflow : "auto",
                            //background : "lightgrey",
                        }}
                    >
                        <u>{assetPropertyCurrSel}</u> 
                        <div
                                style={{}}
                        >
                            {EventsE}

                            <div>
                                <div
                                    style={{
                                        position : "relative",
                                        margin : 1,
                                        padding : 1,
                                        background : "lightblue",
                                        borderRadius : 6,
                                    }}
                                >
                                    <u
                                        style={{
                                            cursor : "pointer"
                                        }}
                                        onClick={()=>{
                                            let tmp="css";
                                            let nst0={...assetPropertyStyleBoxChild };//JSON.parse(JSON.stringify(assetPropertyStyleBoxChild))
                                            nst0.prop[tmp].show=!nst0.prop[tmp].show
                                            if (nst0.prop[tmp].show){
                                                nst0.prop[tmp].css={...nst0.prop[tmp].cssHide}
                                            }else{
                                                nst0.prop[tmp].css={...nst0.prop[tmp].cssShow}
                                            }
                                            setAssetPropertyStyleBoxChild(nst0)
                                        }}
                                    >css</u>
                                    <div
                                        style={
                                            assetPropertyStyleBoxChild.prop["css"].css
                                        }
                                    >
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Background : </label>
                                        <input
                                            value={assetPropertyStyleBackground}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleBackground(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="background"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Text Color : </label>
                                        <input
                                            value={assetPropertyStyleColor}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleColor(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="color"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >z-Index : </label>
                                        <input
                                            value={assetPropertyStyleZindex}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleZindex(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value

                                                newInstanceFn();
                                                
                                                let tmp="zIndex"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                            
                                                    let type="number";
                                                    if (type==="number"){
                                                        try {
                                                            val=parseInt(val)
                                                        } catch (error) {
                                                            alert("not a number")
                                                            return
                                                        }
                                                    }

                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Border : </label>
                                        <input
                                            value={assetPropertyStyleBorder}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleBorder(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="border"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Border Radius : </label>
                                        <input
                                            value={assetPropertyStyleBorderRadius}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleBorderRadius(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="borderRadius"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                            
                                                    let type="number";
                                                    if (type==="number"){
                                                        try {
                                                            val=parseInt(val)
                                                        } catch (error) {
                                                            alert("not a number")
                                                            return
                                                        }
                                                    }

                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Float : </label>
                                        <input
                                            value={assetPropertyStyleFloat}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleFloat(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="float"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Clear : </label>
                                        <input
                                            value={assetPropertyStyleClear}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleClear(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="clear"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >FontFamily : </label>
                                        <input
                                            value={assetPropertyStyleFontFamily}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleFontFamily(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="fontFamily"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >FontSize : </label>
                                        <input
                                            value={assetPropertyStyleFontSize}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleFontSize(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="fontSize"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                            
                                                    let type="number";
                                                    if (type==="number"){
                                                        try {
                                                            val=parseInt(val)
                                                        } catch (error) {
                                                            alert("not a number")
                                                            return
                                                        }
                                                    }

                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >FontWeight : </label>
                                        <input
                                            value={assetPropertyStyleFontWeight}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleFontWeight(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="fontWeight"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >TextAlign : </label>
                                        <input
                                            value={assetPropertyStyleTextAlign}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleTextAlign(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="textAlign"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Cursor : </label>
                                        <input
                                            value={assetPropertyStyleCursor}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleCursor(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="cursor"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Left : </label>
                                        <input
                                            value={assetPropertyStyleLeft}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleLeft(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="left"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                            
                                                    let type="number";
                                                    if (type==="number"){
                                                        try {
                                                            val=parseInt(val)
                                                        } catch (error) {
                                                            alert("not a number")
                                                            return
                                                        }
                                                    }

                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />

                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Right : </label>
                                        <input
                                            value={assetPropertyStyleRight}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleRight(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="right"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                        
                                                    let type="number";
                                                    if (type==="number"){
                                                        try {
                                                            val=parseInt(val)
                                                        } catch (error) {
                                                            alert("not a number")
                                                            return
                                                        }
                                                    }

                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />
                                        
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Top : </label>
                                        <input
                                            value={assetPropertyStyleTop}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleTop(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="top"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    
                                                    let type="number";
                                                    if (type==="number"){
                                                        try {
                                                            val=parseInt(val)
                                                        } catch (error) {
                                                            alert("not a number")
                                                            return
                                                        }
                                                    }

                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />
                                        
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Bottom : </label>
                                        <input
                                            value={assetPropertyStyleBottom}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleBottom(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="bottom"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                            
                                                    let type="number";
                                                    if (type==="number"){
                                                        try {
                                                            val=parseInt(val)
                                                        } catch (error) {
                                                            alert("not a number")
                                                            return
                                                        }
                                                    }

                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />                            
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Margin : </label>
                                        <input
                                            value={assetPropertyStyleMargin}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleMargin(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="margin"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                            
                                                    let type="number";
                                                    if (type==="number"){
                                                        try {
                                                            val=parseInt(val)
                                                        } catch (error) {
                                                            alert("not a number")
                                                            return
                                                        }
                                                    }

                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />                            
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Padding : </label>
                                        <input
                                            value={assetPropertyStylePadding}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStylePadding(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="padding"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                            
                                                    let type="number";
                                                    if (type==="number"){
                                                        try {
                                                            val=parseInt(val)
                                                        } catch (error) {
                                                            alert("not a number")
                                                            return
                                                        }
                                                    }

                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />                            
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Postion : </label>
                                        <input
                                            value={assetPropertyStylePostion}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStylePostion(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="postion"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />                            
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Display : </label>
                                        <input
                                            value={assetPropertyStyleDisplay}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyStyleDisplay(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="display"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties.style
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />                            
                                    </div>
                                </div>
                                <div
                                    style={{
                                        
                                        position : "relative",
                                        margin : 1,
                                        padding : 1,
                                        background : "lightblue",
                                        borderRadius : 6,
                                    }}
                                >
                                    <u
                                        style={{
                                            cursor : "pointer"
                                        }}
                                        onClick={()=>{
                                            let tmp="props";
                                            let nst0={...assetPropertyStyleBoxChild };//JSON.parse(JSON.stringify(assetPropertyStyleBoxChild))
                                            nst0.prop[tmp].show=!nst0.prop[tmp].show
                                            if (nst0.prop[tmp].show){
                                                nst0.prop[tmp].css={...nst0.prop[tmp].cssHide}
                                            }else{
                                                nst0.prop[tmp].css={...nst0.prop[tmp].cssShow}
                                            }
                                            setAssetPropertyStyleBoxChild(nst0)
                                        }}
                                    >...</u>

                                    <div                                        
                                        style={
                                            assetPropertyStyleBoxChild.prop["props"].css
                                        }
                                    >                                    
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Class : </label>
                                        <input
                                            value={assetPropertyClass}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyClass(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="className"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />                           
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >ID : </label>
                                        <input
                                            value={assetPropertyID}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyID(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="id"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />                            
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Src : </label>
                                        <input
                                            value={assetPropertySrc}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertySrc(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="src"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />                            
                                        
                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Href : </label>
                                        <input
                                            value={assetPropertyHref}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyHref(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="href"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />        

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Value : </label>
                                        <input
                                            value={assetPropertyValue}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyValue(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="value"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />        

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Placeholder : </label>
                                        <input
                                            value={assetPropertyPlaceholder}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyPlaceholder(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="placeholder"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />        

                                        <br/>
                                        <label
                                            style={{
                                                fontSize  : 11,
                                            }}
                                        >Input Type : </label>
                                        <input
                                            value={assetPropertyType}
                                            style={{
                                                width : 80,
                                            }}
                                            onChange={(e)=>{
                                                let val=e.target.value
                                                setAssetPropertyType(val)
                                            }}
                                            onBlur={(e)=>{
                                                let val=e.target.value
                                                
                                                newInstanceFn();
                                                
                                                let tmp="type"
                                                let insrec=instances.current.all[assetPropertyCurrSel].properties
                                                if (val!==""){
                                                    insrec[tmp]=val;                                        
                                                }else{
                                                    if ( insrec[tmp]){
                                                        delete insrec[tmp];
                                                    }
                                                }

                                                setCmptMe((st)=>{
                                                    let nst={...st};
                                                    nst.view.instances=instances.current
                                                    return nst;
                                                })
                                                
                                            
                                            }}
                                        />                                 
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            )
        })()
    }  

    let layoutStatesShowHideStyle={
        border : "solid thin lightgrey",
       
    }
    if (layoutStatesShowHide===false){
        layoutStatesShowHideStyle.display="none"        
        layoutStatesShowHideStyle.border=undefined
    }
    let viewLayoutStatesE
    if (vmodes["nomode"] || vmodes["edit"]){
        viewLayoutStatesE=(()=>{
            let arrE=[];
            
            let posCosntsShow=false;

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

                if (posCosntsShow){
                    style.width=200
                    style.height=60
                }else{
                    style.width=undefined;
                    style.height=undefined;
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
                        {(()=>{
                            if (posCosntsShow){
                                return (
                                    <>
                                    <br/>
                                    {posContStr}
                                    
                                    </>
                                )
                            }
                        })()}
                        
                        
                    </div>
                )


                i++;
            }
        
            return (
                <div
                    style={{
                        position : "relative",
                        margin : 5 ,
                        padding : 5 ,
                        border : layoutStatesShowHideStyle.border,
                        borderRadius : 5 , 
                        width : 270,
                        height : 150,
                    }}
                >   
                    <div

                        style={{
                            position : "relative",
                            margin : 2 ,
                            padding : 5 ,                            
                            width : 260,
                            height : 145,
                        }}
                    >
                        <u>Layout States </u>
                        <button 
                            style={{ fontSize : 9 , marginLeft : 8, position : "relative"}}
                            onClick={()=>{
                                setLayoutStatesShowHide(!layoutStatesShowHide)
                            }}
                        >show/hide lst</button>
                        <div
                            style={{
                                position : "relative",
                                display : layoutStatesShowHideStyle.display
                            }}
                        >
                            
                            
                            <input 
                                placeholder={"add layout"}
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
                            {arrE}
                        </div>
                    </div>
                </div>
            )
        })()
    }

    let layoutStatesPropertiesShowHideStyle={        
        border : "solid thin lightgrey",        
        width : 400,
        height : 150,
    }
    if (layoutStatesPropertiesShowHide===false){
        layoutStatesPropertiesShowHideStyle.display="none"        
        layoutStatesPropertiesShowHideStyle.border=undefined
        layoutStatesPropertiesShowHideStyle.width=undefined
        layoutStatesPropertiesShowHideStyle.height=undefined
    }
    
    let layoutStatePropertiesE
    if (vmodes["nomode"] || vmodes["edit"]){
        layoutStatePropertiesE=(()=>{
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
                                    //#region click state state 
                                    setLayoutStatePropertiesPosContCurrSel(r)
                                    setAssetPropertyCurrSel(r)
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
                        margin : 5 ,
                        padding : 5 ,                        
                        borderRadius : 5 , 

                    }}
                >   
                    <u>Layout State Properties </u>
                    <button 
                        style={{fontSize : 9, marginLeft : 8 }}
                        onClick={()=>{
                            setLayoutStatesPropertiesShowHide(!layoutStatesPropertiesShowHide)
                        }}
                    >show/hide lstpr</button>

                    <div
                        style={{
                            position : "relative",
                            display : layoutStatesPropertiesShowHideStyle.display,                        
                            fontSize  : 11,
                            width : 385,
                            height : 145,
                            overflow : "auto"
                        }}
                    >                    
                        name : {curr.name}
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
                                        
                                        instances.current.all[newInstanceID]={...instanceEachDef};          
                                        instances.current.all[newInstanceID].id=newInstanceID;
                                        instances.current.all[newInstanceID].uuid=uuidv4();
                                        instances.current.all[newInstanceID].dateCreate=new Date();
                                        // instances.current.all[newInstanceID].properties={...instancesPropertiesDef};

                                        if (layoutposContsODyn[assetName].assetSource){
                                            instances.current.all[newInstanceID].assetSource=layoutposContsODyn[assetName].assetSource
                                        }else{
                                            instances.current.all[newInstanceID].assetSource=assetName;
                                        }
                                                                                
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
    }

    let mainlayoutStatesPropertiesShowHideStyle={
        border : "solid thin lightgrey",
        width : 300,                        
        height : 150,
    }
    if (mainlayoutStatesPropertiesShowHide===false){
        mainlayoutStatesPropertiesShowHideStyle.display="none"
        mainlayoutStatesPropertiesShowHideStyle.border=undefined
        mainlayoutStatesPropertiesShowHideStyle.width=undefined
        mainlayoutStatesPropertiesShowHideStyle.height=undefined
    }
    let mainLayoutPropertiesE
    if (vmodes["nomode"] || vmodes["edit"]){
        mainLayoutPropertiesE=(()=>{

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
                        borderRadius : 5 , 


                    },...{}}}
                >   
                    <u>main layout properties</u>
                    <button 
                        style={{fontSize : 9 }}
                        onClick={()=>{
                            setMainLayoutStatesPropertiesShowHide(!mainlayoutStatesPropertiesShowHide)
                        }}
                    >show/hide mlpr</button>
                    <div
                        style={{
                            display : mainlayoutStatesPropertiesShowHideStyle.display
                        }}
                    >
                        
                    
                        
                        <div
                            style={{
                                position : "relative",
                                display : "inline-block",                        
                                fontSize  : 11,
                                width : 285,
                                height : 145,
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

    }
        

    // --------------------------------

    let listCmptMeE
    if (vmodes["nomode"] || vmodes["project"] ){

        listCmptMeE=(()=>{
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
    }

    let propCmptMeE=(()=>{
    })()

    let propsListE=(()=>{
    })()

    let subCmptMeListE=(()=>{

    })();


    // --------------------------------

    let vmodesSelectE
    if (true){
        vmodesSelectE=(()=>{
            let arrE=[]

            let multiselectmode=vmodesMultiMode

            for (let p in vmodesTypes.modes){
                let selected=false
                if (vmodes[p]){
                    selected=true
                }

                let style={

                }

                if (selected){
                    style.background="lightgrey"
                }

                arrE.push(
                    <option
                        style={style}
                        key={p}
                        value={p}
                        //{p}
                    >
                        {p}
                    </option>
                )

            }

            return (
                <>
                    {
                        //JSON.stringify(vmodes)
                    }<label style={{ fontSize :13}} >modes</label>
                    <div
                        style={{
                                position : "relative" ,
                                display : "inline-block",
                                width : 120,
                                height : 20,
                                paddingBottom : 115,                                
                        }}
                    >
                        <select
                            style={{
                                position : "relative" ,
                                zIndex : 9999,                            
                            }}

                            //defaultValue={[vmodesTypes.modes["default"]]}
                            defaultValue={vmodesTypes["default"]}
                            multiple={false}
                            onChange={(e) => {
                                setVmodes((st)=>{
                                    let nst={...st}
                                    
                                    let val=e.target.value;
                                    if (multiselectmode===true){       
                                        if ( nst[val] ){
                                            delete nst[val]
                                        }else{
                                            nst[val]=vmodesTypes.modes[val]
                                        }                                    
                                    }else{
                                        nst={}
                                        nst[val]=vmodesTypes.modes[val]
                                    }                                

                                    return nst
                                })
                            }}
                        >
                            {arrE}
                        </select>
                    </div>
                    <div
                        style={{
                                position : "relative" ,
                                display : "inline-block",
                                width : 30,
                                marginTop : 15
                        }}
                    >
                    <input 
                        style={{position : "relative" ,zIndex : 9999 , width : 20, height : 20}}
                        type={"checkbox"}                         
                        key={Math.random()}
                        defaultChecked={vmodesMultiMode}
                        value={vmodesMultiMode}
                        onChange={()=>{
                            let val=!vmodesMultiMode
                            setVmodesMultiMode((st)=>{      
                                //alert( "new : " + val  + " , " + "stCurr : " + st)                          
                                return val;
                            })
                        }}
                    /> 
                    </div>
                    <label
                        style={{ fontSize : 13}}
                    >multi</label>
                </> 
                
            )
        })()
    }

    // --------------------------------


    let style={
        position  : "relative",
        display  : "block",
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
                style={{
                    position : "absolute",
                    //display : "inline-block",
                    right : 80,
                    top : 5,
                    fontSize : 9,
                }}
            >
                {vmodesSelectE}
            </div>

            <div
                style={innerStyle}

            >
                {(()=>{
                    if (vmodes["nomode"] || vmodes["project"]  ){}else{
                        return 
                    }
                    return (
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
                    )
                })()}
                                    
                {/*<div style={{ clear : "left" }} /> */}
                {(()=>{
                    if (vmodes["nomode"] || vmodes["project"]  ){}else{
                        return 
                    }
                    return (
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
                                        height : 100,
                                    }}
                                />

                                <textarea 
                                    style={{
                                        display : "inline-block",
                                        width : 400,
                                        height : 100,
                                    }}
                                    value={JSON.stringify(instances,null,2)}
                                    onChange={()=>{

                                    }}
                                />
                                
                            </div>

                        </div>

                    )
                })()}

                { /* <div style={{ clear : "left" }} /> */}

                <div
                    style={{
                        position : "relative",
                        float : "left",
                        //width : 700,
                        //background : "purple",
                    }}

                > 
                    
                    {toolsCmptMeE}
                    {layoutAssetsE}
                    {AssetPropertyE}
                    
                </div>

               

                <div
                    style={{
                        position : "relative",
                        float : "left",
                        //width : 700,
                        
                    }}

                >       
                    {viewLayoutStatesE}
                  
                </div>
                <div
                    style={{
                        position : "relative",
                        float : "left",
                        //width : 700,
                        
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
                
                <input 
                    placeholder={"component name"}
                    value={componentName}
                    onChange={(e)=>{
                        let val=e.target.value;
                        setComponentName(val)
                    }}
                    onBlur={(e)=>{
                        let val=e.target.value;
                        
                        setCmptMe((st)=>{
                            let nst={...st}
                            
                            let hasSpaces=false;
                            if ((new RegExp(" +")).test(val)===false){                                
                                nst.name_cmpt=val;
                            }else{
                                hasSpaces=true;
                                alert("error : component name contains space or invalid characters, space not permitted ")
                            }
                            

                            return nst
                        })
                    }}
                    
                />

                <input 
                    placeholder={"component path"}
                    value={componentPath}
                    onChange={(e)=>{
                        let val=e.target.value;
                        setComponentPath(val)
                    }}
                    onBlur={(e)=>{
                        let val=e.target.value;
                        
                        setCmptMe((st)=>{
                            let nst={...st}
                            
                            let hasSpaces=false;
                            if ((new RegExp(" +")).test(val)===false){                                
                                nst.cmpt_path=val;
                            }else{
                                hasSpaces=true;
                                alert("error : component name contains space or invalid characters, space not permitted ")
                            }
                            

                            return nst
                        })
                    }}
                    
                />
                <button
                    onClick={()=>{
                        createUpdateFiles();
                    }}
                >create/update files</button>

                <div style={{ clear : "left" }} />


                {/* preview */}
                {(()=>{
                    if (vmodes["nomode"] || vmodes["run"]  || vmodes["design"] || vmodes["edit"]  || vmodes["profileTest"]  || vmodes["debugData"] ){}else{
                        return 
                    }
                    return (
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
                    )
                })()}
                     
            
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


