import React,{ useEffect , useState,useRef, useContext } from 'react'
import { ContextRoutes} from './context/contextRoutes';
import { ContextStore } from '../common/contextStore.js';
import $gl from '../common/globallib';
import { $cgl } from './globals/cg.js';


   
export const Main=()=>{ // main menu with custom routing 
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

    let [theme, setTheme] = useState("magenta")   
        

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
            
            
            
        }
    ]

    useEffect(()=>{
        if (init.current){
            init.current=false
            
            loadPages(()=>{
                
                let params = new URLSearchParams(window.location.search);
                
                let addr={                
                    pathname : window.location.pathname,
                    params :$cgl.addrParamsToObject()
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
                })

                setUpdateState(new Date())
                

            })

            let th=$gl.getCookie("theme")
            console.log("theme....",th)
            if (th){
                setTheme((st)=>{

                    let themesMain={...ctx.tt.state.themes}
                    themesMain.name=th
                    ctx.tt.setState({ themes : themesMain })

                    return th                                                                                                                                                                                                                                      
                })
            }

        }

        document.addEventListener('keydown',keydownHandler)

        return ()=>{
            //console.log("unmounting")
            document.removeEventListener('keydown',keydownHandler);
        }

        

    },[])

    let loadPages=(cb)=>{
        
        //setTimeout(()=>{ // fake timed test for loading from backend prep,
        //add auto backend fetch here 
            if (true){
                addPage(
                    {
                        title: "", // add title name here 
                        pathname : "/routename", /* add routename here including  / prefix */
                        showMenu : true,
                        groups : [],
                        e : undefined, /* add component name excludeding < & /> */            
                    }
                )

                addPage(
                    {
                        title: "", // add title name here 
                        pathname : "/routename", /* add routename here including  / prefix */
                        showMenu : true,
                        groups : [],
                        e : undefined, /* add component name excludeding < & /> */            
                    }
                )                               
                
            }
            if (typeof(cb)==="function"){
                cb()
            }
            

        //}, 3000)

    }

    useEffect(()=>{        
        //setTimeout(()=>{ setAddrParamsArgs({}) } , 1000)
        // may need to create an already mounted and set paramereters for route setting current
        
    },[current])

    let keydownHandler=(e)=>{                
        if(e.keyCode===13 && e.ctrlKey){ // ctrl + enter            
            CycleThemes()
            //console.log("ctx ", ctx)

            
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
        //console.log("new theme", nt, next)
        //setTheme(nt)

            //  set main theme
            let themesMain={...ctx.tt.state.themes}
            themesMain.name=nt
            ctx.tt.setState({ themes : themesMain })

            $gl.createCookie("theme" , nt)
            
            return nt
        })

        
    }
    //console.log("theme", theme)
  
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
        //for (let p in themes){            
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
        //mi++\
        let display="block"
        if (r.showMenu===false){
            display="none"
        }
        // "lightgrey"
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
                //background : "linear-gradient( white 0%, red 35%, magenta 100%)",
                background : menuButtonBackround ,
                
                color : menuButtonColor
              }
            }
            onClick={
              function (e) {
                //console.log(e.target.getAttribute("current"))
                var newval = e.target.getAttribute("current") //- 1
                window.history.pushState('',document.title , pages.current[newval].pathname);
                setCurrent(newval)
              }
            }

            onMouseEnter={(e)=>{
                var newval = e.target.getAttribute("current")
                setHover(newval)
            }}
            onMouseLeave={(e)=>{
                //var newval = e.target.getAttribute("current")
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
  
    return (
        <>
            <div style={{ 
                            position : "relative",
                            overflow: "hidden", zIndex: 9999,
                            //background : "transparent",
                            //color : "green"
                            //background : "linear-gradient( rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                            //background : "linear-gradient( rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                            
                        }}>
            <div
                style={{
                    //position : "fixed"
                    //background : "linear-gradient( lightblue 0%,  white 100%)", 
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