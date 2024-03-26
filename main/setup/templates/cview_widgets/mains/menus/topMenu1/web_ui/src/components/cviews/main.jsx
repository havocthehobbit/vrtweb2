import React,{ useEffect , useState,useRef, useContext } from 'react'
import { ContextRoutes} from './context/contextRoutes';
import { ContextStore } from '../common/contextStore.js';
import $gl from '../common/globallib';
import { vDev } from './vDev/vDev/vDev.jsx';
import { Home } from './home/home.jsx';
import { AdminSettings } from './admin/adminSettings.jsx';

import { v4 as uuidv4 } from 'uuid';
import { PopupBox,usePopupBox } from '../common/widgets/containers/popup.jsx';

let mainApi="api";
let mainApiGetmenusFunction="getmainmenus";
let allMainEles={ 
    Home, vDev, AdminSettings,
}

   
export const Main=(props)=>{ // main menu with custom routing 
    let ctx=useContext(ContextStore)
    
    let init=useRef(true)
    var [current, setCurrent] = useState(0)    
    var [hover, setHover] = useState(-1)    
    
    var [updateState, setUpdateState] = useState(new Date())    
    
    
    let  pages=useRef([])

    //let addrParamsArgs=useRef({})
    let [addrParamsArgs,setAddrParamsArgs]=useState({})

    let defPageAppCtx={} // going to be used to have some sort of context to what app your using and current state
    let [pageAppCtx, setPageAppCtx] = useState(defPageAppCtx)   

    let [theme, setTheme] = useState("lightblue")   
    let [popupProps, setPopupProps] = useState({})   
    let [popupContainerStyleShowState, setPopupContainerStyleShowState] = useState({})   
        
    let themes=[
        {
            name : "dark",
            menuButtonBackround : "black" ,
            menuButtonColor : "lightgrey" ,

            selectedBackground : "blue",
            selectedColor : "white" ,

            hoverBackground : "lightgrey",         
        },
        {
            name : "light",
            menuButtonBackround : "white",
            menuButtonColor : "lightgrey" ,

            selectedBackground : "black",
            selectedColor : "lightgrey" ,

            hoverBackground : "lightgrey", 
            
            
            
        },
        {
            name : "lightblue",
            menuButtonBackround : "linear-gradient( white 0%, grey 35%, lightblue 100%)",
            menuButtonColor : "black" ,

            selectedBackground : "lightyellow",
            selectedColor : "black" ,

            hoverBackground : "lightgrey",                        
            
        }
    ];

    useEffect(()=>{
        if (init.current){
            init.current=false
            
            loadPages(()=>{                
                let params = new URLSearchParams(window.location.search);
                
                let addr={                
                    pathname : window.location.pathname,
                    params :$gl.addrParamsToObject()
                }            

                // on page load navigate to route
                pages.current.forEach((r,pg)=>{ 
                    if (r.pathname===addr.pathname){
                        let routeTo=true
                        if (typeof(props.routeTo)!=="undefined"){
                            routeTo=props.routeTo
                        }
                        if (routeTo){
                            setAddrParamsArgs(addr.params)
                            setCurrent(pg)                    
                        }
                    }
                });
                setUpdateState(new Date());
            })

            let th=$gl.getCookie("theme")
            
            if (true){
                if (th){
                    setTheme((st)=>{

                        let themesMain={...ctx.tt.state.themes}
                        themesMain.name=th
                        ctx.tt.setState({ themes : themesMain })

                        return th                                                                                                                                                                                                                                      
                    })
                }
            }

        }

        document.addEventListener('keydown',keydownHandler)

        return ()=>{
            //console.log("unmounting")
            document.removeEventListener('keydown',keydownHandler);
        }
    },[])

    let {popupE,popupShow,setPopupShow,popupCurrent,setPopupCurrent,popupCurrentRef,popupChildrenRefE,popupCurrentRefCB }=usePopupBox({popupProps});

    let fetchBEmainmenus=(...args)=>{

        let cb=()=>{}
        let params={}

        if (args.length === 1){
            cb=args[0]
        }
        if (args.length > 1){
            params=args[0]
            cb=args[1]
        }

        let api=mainApi
        let data={ 
            "type" : mainApiGetmenusFunction,         
            //"module" : module,  
            //"filename" : searchBox,
            //"lineno" : stlineno,                            
        };

        if ( params.filename){
            data.filename=params.filename
        }

        if ( params.filename){
            data.module=params.module
        }

        if ( params.stlineno){
            data.lineno=params.stlineno
        }        
        
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        //cl("url ",url)     
        if (typeof(cb)!=="function"){ cb=()=>{} }
        
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

    let loadPages=(cb)=>{
        if (true){
            fetchBEmainmenus((dtr)=>{                 
                let rdata={}
                let views=[]
                if (dtr.data){
                    rdata=dtr.data
                    if (rdata.views){
                        views=rdata.views
                    }
                }

                views.forEach((r,i)=>{
                    addPage({
                        title: r.title,
                        pathname :  r.pathname, 
                        showMenu : r.showMenu,  
                        groups : [],       
                        e : allMainEles[r.e],                    
                    })
                })

                ////////////////////
                
                cb()                 
            })
        }
    }

    useEffect(()=>{        
        //setTimeout(()=>{ setAddrParamsArgs({}) } , 1000)
        // may need to create an already mounted and set paramereters for route setting current        
    },[current])

    let keydownHandler=(e)=>{                
        if(e.keyCode===13 && e.ctrlKey){ // ctrl + enter            
            CycleThemes()           
        } 
    }


    let CycleThemes=()=>{
        let nt=theme;
        setTheme((st)=>{
                let theme=st
            
            let currTHemeIter
            themes.forEach((r,i)=>{
                if (r.name===theme){
                    currTHemeIter=i
                }
            })
            //console.log("currThemeBeforCycle", theme , currTHemeIter)
            let next=currTHemeIter + 1
            if (next > ( themes.length - 1 ) ){
                next=0      
            }
            
            let nt=themes[next].name                       
            let themesMain={...ctx.tt.state.themes}
            themesMain.name=nt
            ctx.tt.setState({ themes : themesMain })

            $gl.createCookie("theme" , nt)
            
            return nt
        });        
    }    
  
    let addPage=(params)=>{
        let tmplt={
            title: "",
            pathname : "noname______",
            showMenu : true,  
            groups : [],
            e : undefined,
        }

        let page={...tmplt,...params}
        let NotExist=true
        pages.current.forEach((r,i)=>{
            if (r.pathname===page.pathname || r.title===page.title){
                NotExist=false
            }
        })
        if (NotExist){
            pages.current.push(page)
        }
    }
  
    let currentTheme=(()=>{
        let crnt
        themes.forEach((r,i)=>{            
            
            if (r.name===theme){
                crnt=r
            }
        })
        return crnt
    })()

    let quickmenu=function(){
  
      var menu = []
  
      var mi = 0
  
      pages.current.forEach(function (r, i) {

        let display="block"
        if (r.showMenu===false){
            display="none"
        }

        let menuButtonBackround=currentTheme.menuButtonBackround
        let menuButtonColor=currentTheme.menuButtonColor
        
        if (parseInt(hover)===parseInt(i)){
            menuButtonBackround="#FAFAD2"
        }
        if (parseInt(current)===parseInt(i)){            
            menuButtonBackround=currentTheme.selectedBackground//"#E9967A"
            menuButtonColor=currentTheme.selectedColor
        }
        


        menu.push(
          <div key={i} current={i}
            style={
              {
                display : display,
                position: "relative", float: "left", marginLeft:7, padding: 3,paddingTop : 0,paddingBottom: 0, 
                width: 150, height: undefined, cursor: "pointer", fontSize :10,
                border : "black thin solid",borderRadius: 3,
                //background: "white",
                //background : "linear-gradient( white 0%, lightgrey 35%, rgba(0,212,255,1) 100%)",
                //background : "linear-gradient( white 0%, red 35%, lightblue 100%)",
                background : menuButtonBackround ,
                
                color : menuButtonColor
              }
            }
            onClick={
              function (e) {                
                var newval = e.target.getAttribute("current") //- 1                                
                window.history.pushState('',document.title , pages.current[newval].pathname);
                //window.history.replaceState('',document.title , pages.current[newval].pathname);
                
                setCurrent(newval)
                
                
              }
            }

            onMouseEnter={(e)=>{
                var newval = e.target.getAttribute("current")
                setHover(newval)
            }}
            onMouseLeave={(e)=>{
                setHover(-1)
            }}
          >
            <p
              style={{ padding : 0,margin : 0, pointerEvents : "none", userSelect : "none" }}
            >{r.title}</p>
          </div>
        )
  
      })
  
      return (
        <div>
          {menu}
          <div style={{ clear: "left" }} />
        </div>
      )
    }()   
    
    let popupContainerStyle={
        position : "absolute",top : 0,left : 0,
        zIndex :999999999,        
    }
    let popupContainerStyleShow={
        position : "absolute",top : 0,left : 0,
        zIndex :999999999,
        width : "100vw",height : "100%",
        
    }
    if (popupShow){
        popupContainerStyle=popupContainerStyleShow        
        popupContainerStyle={...popupContainerStyle,...popupContainerStyleShowState}
    }
    ;

    return (
        <>
            <div
                style={popupContainerStyle}
            >
            {popupE}
            </div>
            <div style={{ 
                            position : "absolute",
                            top : 0,
                            overflow: "hidden", zIndex: 9999,                            
                        }}
            >
                <div
                    style={{                        
                        fontWeight : "bold"
                        }}
                    >       
                    {quickmenu}
                    <div style={{ clear: "left" }} />
                    </div>
                
            
                
            
            </div>
           
                <ContextRoutes.Provider
                    value={{
                        pages : pages.current,
                        pagesRef : pages,
                        addrParamsArgs,
                        setAddrParamsArgs,
                        current, 
                        setCurrent,
                        MainContainerSetUpdateState :setUpdateState,
                        popup : {
                            popupE,setPopupShow,popupCurrent,setPopupCurrent,popupCurrentRef,popupCurrentRefCB,popupChildrenRefE,popupProps, setPopupProps,
                            popupContainerStyleShowState, setPopupContainerStyleShowState,MainContainerSetUpdateState :setUpdateState
                        }
                    }}
                >            
                    {
                        (()=>{          
                            let E;                        
                            if (pages.current[current]){
                                let TmpE=pages.current[current].e                        
                                E=<TmpE {...addrParamsArgs} />;
                            }
                            return E
                        })()
                        
                    
                    }
                </ContextRoutes.Provider>
            
        </>
    )
  
  }
  

export default Main