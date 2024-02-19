import React,{ Component,lazy,Suspense } from 'react';
import "../../App.css";
import { ContextStore } from '../common/contextStore';
import { Homepage } from './homepage';
import { GeneralView } from './general';
import { isAuth } from '../login/login';
import $gl from '../common/globallib'


export const stylec={
    button : {fontSize : 30, borderRadius : 4, padding : 3, margin : 2 },
    input : {fontSize : 30, borderRadius : 4, padding : 3, margin : 2 },
    label : {},

    buttons : {},
    unputs : {},
    labels : {},
}

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
})()

var Background=lazy(() =>{    
    let file='cviews/Background.jsx';
     return import(`../${ file}`) // only works with template ticks that lookup a variable , wont work with literals    
    .catch(() => ({ default: () => background }))
})






export class Main extends Component {
    constructor(props){
        super(props)

     
        this.state={ 
            isLoggedIn : false, background : "white", testStuff : "dfdf",
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
                    }
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

    setBackground_old=(bck)=>{
        this.setState({ background : bck },()=>{
            window.document.body.style.background = bck;
            let app=window.document.querySelector('.App')
            app.style.background=bck
            let appheader=window.document.querySelector('.App-header')
            if (appheader){
                appheader.style.background=bck
            }else{

            }
    
        })
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

        

        let homepageE
        homepageE=(()=>{
            if (isLoggedIn!==true){
                return (
                    <ContextStore.Provider 
                        value={{
                            isLoggedIn,
                            isLoggedInSet,                            
                            tt : tt,
                            windowSize : {width : wd ,height : hd }
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
        })()

        let generalViewE
        generalViewE=(()=>{
            if (isLoggedIn===true){
                return (
                <ContextStore.Provider 
                        value={{
                            isLoggedIn,
                            isLoggedInSet,
                            tt : tt,
                            testStuff,
                            windowSize : {width : wd ,height : hd }
                        }}
                    >                       
                        <GeneralView/>                   
                </ContextStore.Provider>   
                )
            }
        })()

        

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