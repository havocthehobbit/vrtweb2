import React,{ useState,useEffect,useRef, Component,lazy,Suspense } from 'react';
import "../../App.css";
import { ContextStore } from '../common/contextStore';
import { Homepage } from './homepage';
import { GeneralView } from './general';
import { isAuth } from '../login/login';
import $gl from '../common/globallib'
//import {Public} from "../cviews/PublicMain/PublicMain"


export const stylec={
    button : {fontSize : 30, borderRadius : 4, padding : 3, margin : 2 },
    input : {fontSize : 30, borderRadius : 4, padding : 3, margin : 2 },
    label : {},

    buttons : {},
    unputs : {},
    labels : {},
};


let background=(()=>{
    return (
        <div 
            style={{
                position : "absolute",                
                top : 0,
                left : 0,
                zIndex : -10,
                background : "linear-gradient(purple, darkblue)",
                width : "100%",
                height : "100%",                
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",

            }}
        />  
    )
})();

var Background=lazy(() =>{    
    let file='cviews/Background.jsx';
     return import(`../${ file}`) // only works with template ticks that lookup a variable , wont work with literals    
    .catch(() => ({ default: () => background }))
});


let DefPublic=()=>{
    return (<div/>)
};
let Public=lazy(() =>{    
    //let file='cviews/PublicMain/PublicMain.jsx';
    let file='cviews/PublicMain.jsx';
     return import(`../${ file}`)   

    .catch(() => ({ default: DefPublic }) )
    
});

let getWindowDimensions=()=>{
    let width =  window.innerWidth 
    let  height = window.innerHeight 
    return {
      width,
      height,
    };
}

// purpose of Main2 is to eventually replace Main , class component with current standard use and maintained function components 
export const Main=(props)=>{
    let initC=useRef(true);

    let [isLoggedIn, setIsLoggedIn]=useState(false);
    let [background, setBackground]=useState("white");
    let [testStuff, setTestStuff]=useState("dfdf");
    let [isAuthHasRun , setIsAuthHasRun]=useState(false);
    let [about, setAbout]=useState({});
    let [themes, setThemes]=useState({
        name : "",
        themes : [],
    });
    let [windowDimensions, setWindowDimensions ]=useState( getWindowDimensions() );
    
    let tt={
        state : {
            isLoggedIn, setIsLoggedIn,
            background, setBackground,        
            isAuthHasRun , setIsAuthHasRun,
            about, setAbout,
            themes, setThemes,
            windowDimensions , setWindowDimensions ,
        }        
    }

    let userid="";

    // init
    useEffect(()=>{
        if (initC.current){
            initC.current=false;

            let userid=$gl.getCookie("userid")
            
            if (typeof(userid)==="undefined" || userid===""){}else{
                    isAuth( { userid : userid} , function(dt){                
                        if (dt.data.auth===true || dt.data.loggedin===true){
                            isLoggedInSet(true)                            
                        };
                        
                    })
            }

            window.addEventListener('resize', handleResize);



            (async ()=>{
                // appNameMain
                //let file='cviews/appNameMain.json';
                //return import(`../${ file}`)
                window["vwAppConfigMain"]={};
                try {
                    let file='cviews/appConfigMain.json';
                     //return import(`../${ file}`)
                    const appConfigMain = await import(`../${ file}`);
                       
                        console.log('Config loaded: cviews/appConfigMain.json', appConfigMain.default);
                        window["vwAppConfigMain"]=appConfigMain.main;
                        
                    } catch (error) {
                        console.log('Config file not found : cviews/appConfigMain.json'); // , error
                        // You can set default config or handle the missing file here
                  }
            })();

        }

        return ()=>{
            //console.log("unmount")
            // this is suppose to be called when umounting component but it seems to being called unexpectantly
            //  window.removeEventListener('resize', handleResize);            
        }

   },[]);


    let handleResize=()=>{                
        setWindowDimensions( getWindowDimensions() );
    }
    
    

    let isLoggedInSet=(isLoggedIn, cb)=>{        
        setIsLoggedIn(isLoggedIn);
        if (typeof(cb)==="function"){
            cb()
        }
    }

        
    let wd=windowDimensions.width;
    let hd=windowDimensions.height;
    //console.log("main.js wd,hd : ",wd,hd);

    
    let addr=$gl.urladdr;    
    let pathnames=Array.isArray(addr.pathnames)===true? addr.pathnames : [];
    let urlparams=addr.params;   

    let usePublic=true;

    if (usePublic){
        usePublic=false;            
        if (pathnames.length){
            if (pathnames[0]==="public"){
                usePublic=true;
            };
        }
    }

    let PublicPage=()=>{     
        return (
            <ContextStore.Provider 
                value={{
                    isLoggedIn,
                    isLoggedInSet,                            
                    tt : tt,
                    windowSize : {width : wd ,height : hd },
                    pathnames : pathnames,
                }}
            >    
                {/* <header className='App-header'> */}
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        //fontSize: "calc(10px + 2vmin)",                                
                        color: "black",
                    }}
                >                        
                    
                    <React.Suspense fallback={<div></div>}>
                        <ContextStore.Provider
                            value={{                                        
                                isLoggedIn,
                                isLoggedInSet,                            
                                tt : tt,
                                windowSize : {width : wd ,height : hd },
                                urlPaths : pathnames,
                                urlParams : urlparams,
                            }}
                        >
                            <Public/>   
                        </ContextStore.Provider>
                        
                    </React.Suspense>    
                            
                </div>
                
            </ContextStore.Provider> 
        );            
    }

    let homepageE
    homepageE=(()=>{
        if (isLoggedIn!==true){
            //let params = new URLSearchParams(window.location.search);
            
            if (usePublic){
                
                return PublicPage();
            }

            return (
                <ContextStore.Provider 
                    value={{
                        isLoggedIn,
                        isLoggedInSet,                            
                        tt : tt,
                        windowSize : {width : wd ,height : hd },
                        addr : addr,
                        about, setAbout,
                        themes, setThemes,
                        background, setBackground, 
                    }}
                >    
                    {/* <header className='App-header'> */}
                    <div
                        style={{
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            //fontSize: "calc(10px + 2vmin)",                                
                            color: "black",
                        }}
                    >                        
                        <Homepage/>                        
                                  
                    </div>
                    
                </ContextStore.Provider>   
            )
        }
    })();

    let generalViewE
    generalViewE=(()=>{
        if (isLoggedIn===true){
            if (usePublic){
                return PublicPage();
            }

            return (
            <ContextStore.Provider 
                    value={{
                        isLoggedIn,
                        isLoggedInSet,
                        tt : tt,
                        testStuff,
                        windowSize : {width : wd ,height : hd },
                        addr : addr,      
                        about, setAbout,
                        themes, setThemes,
                        background, setBackground,                   
                    }}
                >                       
                    <GeneralView/>                   
            </ContextStore.Provider>   
            )
        }
    })();
    
    return (
        <div
            style={{  
                    position : "absolute",
                    height : "100%", width : "100%" , 
                    top : 0 , left : 0, margin : 0,
                    //overflow : "scroll"
                    //overflow : "hidden"
            }}
        >   
            <React.Suspense fallback={<div></div>}>
                <ContextStore.Provider
                    value={{                                        
                        tt : tt,
                        addr : addr,
                        about, setAbout,
                        themes, setThemes,
                        background, setBackground, 
                    }}
                >
                    <Background themes={themes} />
                </ContextStore.Provider>
                
            </React.Suspense>
                                
            {homepageE}
            
            {generalViewE}     
            
        </div> 
    );

}


// ================= old #todo remove


export class Main_old extends Component {
    constructor(props){
        super(props)

     
        this.state={ 
            isLoggedIn : false, background : "white", testStuff : "dfdf",
            isAuthHasRun : false, background : "white", testStuff : "dfdf",
            about : {},
            themes : {
                name : "",
                themes : [],
            },
            windowDimensions : this.getWindowDimensions()

        }
    }

    componentDidMount(){
        let tt=this
        //this.setBackground_old("linear-gradient(purple, darkblue)")        
        //linear-gradient(red, yellow)

        let userid=$gl.getCookie("userid")
        
        if (typeof(userid)==="undefined" || userid===""){}else{
                isAuth( { userid : userid} , function(dt){                
                    if (dt.data.auth===true || dt.data.loggedin===true){
                    tt.isLoggedInSet(true)
                    };
                    //tt.setState({ isAuthHasRun : true})
                })
        }
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize=()=>{
        let tt=this
        tt.setState({windowDimensions : tt.getWindowDimensions() });        
    }
    getWindowDimensions=()=>{
        let width =  window.innerWidth 
        let  height = window.innerHeight 
        return {
          width,
          height,
        };
    }   

    isLoggedInSet=(isLoggedIn, cb)=>{
        this.setState({ isLoggedIn : isLoggedIn})
        if (typeof(cb)==="function"){
            cb()
        }
        
    }


    render(){
        let tt=this
        const {isLoggedIn, testStuff}=tt.state // same as let isLoggedIn=tt.state.isLogged in, except you can add other var from state object ,in one line with shorter syntax
        const {isLoggedInSet}=tt // similar to above line 

        let wd=tt.state.windowDimensions.width
        let hd=tt.state.windowDimensions.height

        let pathnames=[];
        let urlparams="";
        let addr={                
            pathname : window.location.pathname,
            params :$gl.addrParamsToObject()
        }  
        if (typeof(addr.pathname)==="string"){
            pathnames=addr.pathname.replace(/^\/|\/$/g, '').split('/');  // .split(/\// ) ; the normal split doesnt work as it includes a leading blank , "" , ...
        }

        urlparams=addr.params;

        let usePublic=true;

        if (usePublic){
            usePublic=false;            
            if (pathnames.length){
                if (pathnames[0]==="public"){
                    usePublic=true;
                };
            }
        }
        
        let PublicPage=()=>{     
            return (
                <ContextStore.Provider 
                    value={{
                        isLoggedIn,
                        isLoggedInSet,                            
                        tt : tt,
                        windowSize : {width : wd ,height : hd },
                        pathnames : pathnames,
                    }}
                >    
                    {/* <header className='App-header'> */}
                    <div
                        style={{
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            //fontSize: "calc(10px + 2vmin)",                                
                            color: "black",
                        }}
                    >                        
                        
                        <React.Suspense fallback={<div></div>}>
                            <ContextStore.Provider
                                value={{                                        
                                    isLoggedIn,
                                    isLoggedInSet,                            
                                    tt : tt,
                                    windowSize : {width : wd ,height : hd },
                                    urlPaths : pathnames,
                                    urlParams : urlparams,
                                }}
                            >
                                <Public/>   
                            </ContextStore.Provider>
                            
                        </React.Suspense>    
                                
                    </div>
                    
                </ContextStore.Provider> 
            );            
        }

        let homepageE
        homepageE=(()=>{
            if (isLoggedIn!==true){
                //let params = new URLSearchParams(window.location.search);
                
                if (usePublic){
                    
                    return PublicPage();
                }

                return (
                    <ContextStore.Provider 
                        value={{
                            isLoggedIn,
                            isLoggedInSet,                            
                            tt : tt,
                            windowSize : {width : wd ,height : hd },
                            urlPaths : pathnames,
                            urlParams : urlparams,
                        }}
                    >    
                        {/* <header className='App-header'> */}
                        <div
                            style={{
                                minHeight: "100vh",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                //fontSize: "calc(10px + 2vmin)",                                
                                color: "black",
                            }}
                        >                        
                            <Homepage/>                        
                                      
                        </div>
                        
                    </ContextStore.Provider>   
                )
            }
        })();

        let generalViewE
        generalViewE=(()=>{
            if (isLoggedIn===true){
                if (usePublic){
                    return PublicPage();
                }

                return (
                <ContextStore.Provider 
                        value={{
                            isLoggedIn,
                            isLoggedInSet,
                            tt : tt,
                            testStuff,
                            windowSize : {width : wd ,height : hd },
                            urlPaths : pathnames,
                            urlParams : urlparams,
                        }}
                    >                       
                        <GeneralView/>                   
                </ContextStore.Provider>   
                )
            }
        })();

        

        return (            
                <div
                    style={{  
                            position : "absolute",
                            height : "100%", width : "100%" , 
                            top : 0 , left : 0, margin : 0,
                            //overflow : "scroll"
                            //overflow : "hidden"

                    }}
                >   
                    <React.Suspense fallback={<div></div>}>
                        <ContextStore.Provider
                            value={{                                        
                                        tt : tt,
                                        urlPaths : pathnames,
                                        urlParams : urlparams,
                            }}
                        >
                            <Background themes={tt.state.themes} />
                        </ContextStore.Provider>
                        
                    </React.Suspense>
                                        
                    {homepageE}
                    
                    {generalViewE}     
                    
                </div>            
        )
    }
}