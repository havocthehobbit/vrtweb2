import { Component } from 'react';
import "../../App.css";
import { ContextStore } from '../common/contextStore';
import { Logout } from '../login/logout';
import { NotificationsIconLaunch } from '../common/messaging/notifications';
import { MenuMain } from '../navigation/menuMain';
import { SettingsViewIconLaunch } from './settings';
import { ProfileIconExpandable } from './profile';
import { Devmain } from '../testing/devmain';

import { $cn } from '../common/libNative';
import $gl from '../common/globallib'
import "./general.css"

export class GeneralView extends Component {
    static contextType=ContextStore

    constructor(props){
        super(props)

        this.state={
            windowDimensions : this.getWindowDimensions()
        }
    }

    
    componentDidMount(){      
        window.addEventListener('resize', this.handleResize); // onRezise event call handleResize         
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

    pages={

        // contains all pages cards , general , settings , profile , services ,users etc...
        all : {
                // pages grouped by name
                "general" : {
                        name : "general",
                        cards : [
                            {
                                name : "myhome",
                                isMin : false,
                                isMinPrf : "cardsMinimise_",
                                isHid : false,
                                isHidPrf : "cardsHidden_",
                                subcards : [],
                                sortOrder : 9,
                            },
                            {
                                name : "neighbourshub",
                                isMin : false,
                                isMinPrf : "cardsMinimise_",
                                isHid : false,
                                isHidPrf : "cardsHidden_",
                                subcards : [],
                                sortOrder : 9,
                            },
                            {
                                name : "homes",
                                isMin : false,
                                isMinPrf : "cardsMinimise_",
                                isHid : false,
                                isHidPrf : "cardsHidden_",
                                subcards : [],
                                sortOrder : 9,
                            },
                            {
                                name : "featured",
                                isMin : false,
                                isMinPrf : "cardsMinimise_",
                                isHid : false,
                                isHidPrf : "cardsHidden_",
                                subcards : [],
                                sortOrder : 9,
                            }
                        ]
                    }
                },
    }
       
    menuItems=[
        { title : "my home", name : "home",icon : undefined, 
            onClick : (p,tt)=>{                                              
                let nr={}              
                let tmp="myhome"                
                $cn.each(tt.pages.all.general.cards,(r,p)=>{                    
                    if (r.name===tmp){
                        nr[r.isMinPrf + r.name]=true
                        nr[r.isHidPrf + r.name]=true
                    }
                    if (r.name!=tmp && r.name!=="featured" ){
                        nr[r.isMinPrf + r.name]=false
                        nr[r.isHidPrf + r.name]=false
                    }
                })

                tt.setState(nr)    
            }
        },
        { title : "page2", name : "page2",icon : undefined, 
            onClick : (p,tt)=>{               
                let nr={}              
                let tmp="page2"                
                $cn.each(tt.pages.all.general.cards,(r,p)=>{                    
                    if (r.name===tmp){
                        nr[r.isMinPrf + r.name]=true
                        nr[r.isHidPrf + r.name]=true
                    }
                    if (r.name!=tmp && r.name!=="featured" ){
                        nr[r.isMinPrf + r.name]=false
                        nr[r.isHidPrf + r.name]=false
                    }
                })

                tt.setState(nr)     
            } 
        },
        { name : "page3", name : "page3",icon : undefined, 
            onClick : (p,tt)=>{
                let nr={}              
                let tmp="page3"                
                $cn.each(tt.pages.all.general.cards,(r,p)=>{                    
                    if (r.name===tmp){
                        nr[r.isMinPrf + r.name]=true
                        nr[r.isHidPrf + r.name]=true
                    }
                    if (r.name!=tmp && r.name!=="featured" ){
                        nr[r.isMinPrf + r.name]=false
                        nr[r.isHidPrf + r.name]=false
                    }
                })

                tt.setState(nr)   
            }
        },
        { title : "showall", name : "showall",icon : undefined, 
            onClick : (p,tt)=>{
                let nr={}                                             
                $cn.each(tt.pages.all.general.cards,(r,p)=>{                    
                    nr[r.isMinPrf + r.name]=true                   
                    nr[r.isHidPrf + r.name]=true
                })

                tt.setState(nr)   
            }
        },
    ]
    
    
    menuSetup={ 
        vert : false, 
        cssEach : { color : "white", background : "black", borderRadius : 5,
                    margin : 2, paddingLeft : 10,paddingRight : 10,paddingTop :15, paddingBottom : 15,
                    
                    width : undefined
                },
        cssEachCurrent : { background : "green"},
        cssEachCurrentOverlap : true,
        cssEachHover  : { background : "orange"},
        cssEachHoverOverlap : true,
        cssText : { top : 0 , left : 0, fontSize : 12, fontFamily : "Liberation Sans"},
        fontNum : { num : 2 },
        hasBurger : false
    }
    
    defmenu={...this.menuSetup}

    render(){
        var tt=this        
        
        let tmp=""
        let tmpprfx=""        
        let CssCards={}
        let CssCardsTmp={}

        let clear=<div stlye={{clear : "left"}} />

        //background : BlueViolet
        // $gl.col.AntiqueWhite , i.e. $gl.col.AntiqueWhite + 65 ( adding 2 values ontop adds transparency)
        let card_style={ background : $gl.col.White + 35 ,borderRadius : 8, overflow : "hidden",
                        margin : 5,fontSize : 30, 
                    }

        // background : BlueViolet , lightblue , Aquamarine , DarkMagenta , DarkMagenta
        // DarkViolet ,Indigo , MediumOrchid , MediumPurple , MediumOrchid , MediumSlateBlue
        // RebeccaPurple,
        let card_title_style={ background : $gl.col.BlueViolet, color : "white", fontSize : 12 }
        let subcard_title_style={...card_title_style ,...{ background : $gl.col.RebeccaPurple }}

        let buttons={ background : "orange",fontWeight: "bold", border : "none", borderRadius : 3,
                        color : $gl.col.DarkOrchid ,margin :1 ,padding : 2,paddingLeft : 8, paddingRight : 8,
        }


        tt.menuSetup.vert=false        
        tt.menuSetup.cssEach=tt.defmenu.cssEach

        let mainCards={}
        let myHomeC={width : 800}
        let rightBarC={display : "block"}
        let featuredC={width: 800}
        let subCard={width : 380}
        let wd=tt.state.windowDimensions.width
        let hd=tt.state.windowDimensions.height
        if (true) {
            if (wd > 200 && wd <= 500){
                tt.menuSetup.vert=true            
                mainCards.width=490
                myHomeC.width=mainCards.width
                featuredC.width=mainCards.width
                subCard.width=480

                rightBarC.display="none"
                
                card_title_style.fontSize=25
                subcard_title_style.fontSize=18

                
                tt.menuSetup.cssEach={...tt.menuSetup.cssEach, ...{margin : 1, paddingLeft : 8,paddingRight :8 }}
            }
            if (wd > 500 && wd < 800){
                mainCards.width=630
                myHomeC.width=mainCards.width
                featuredC.width=mainCards.width
                subCard.width=300

                card_title_style.fontSize=20
            }
            if (wd > 800 ){
                mainCards.width=1000
                myHomeC.width=mainCards.width
                featuredC.width=mainCards.width
                subCard.width=480

                card_title_style.fontSize=20
            }

            if (wd > 1200 ){
                mainCards.width=1500
                myHomeC.width=mainCards.width
                featuredC.width=mainCards.width
                subCard.width=700

                card_title_style.fontSize=20
            }
        }

        CssCardsTmp="displayCs"
        CssCards[CssCardsTmp]={}
        tmpprfx="isMinPrf"        
        if (true){
            let nr={}                                             
            $cn.each(tt.pages.all.general.cards,(r,p)=>{                                    
                tmp=r[tmpprfx] + r.name
                CssCards[CssCardsTmp][tmp]={}
                CssCards[CssCardsTmp][tmp].display="block"
                if (typeof(tt.state[tmp])==="boolean"){
                    if (!tt.state[tmp]){
                        CssCards[CssCardsTmp][tmp].display="none"
                    }
                }
            })            
        }
        
        CssCardsTmp="displayHidCs"
        CssCards[CssCardsTmp]={}
        tmpprfx="isHidPrf"        
        if (true){
            let nr={}                                             
            $cn.each(tt.pages.all.general.cards,(r,p)=>{                                    
                tmp=r[tmpprfx] + r.name
                CssCards[CssCardsTmp][tmp]={}
                CssCards[CssCardsTmp][tmp].display="block"
                if (typeof(tt.state[tmp])==="boolean"){
                    if (!tt.state[tmp]){
                        CssCards[CssCardsTmp][tmp].display="none"
                    }
                }
            })            
        }
        
        

        let rightBar
        rightBar=(()=>{
            let E=[]
            let count=10
            let i=0
            let size=0
            let testarrInit=4
            for (i in new Array(testarrInit).fill()){                
                E.push(
                    <div
                        key={i}
                        style={{ background : "lightyellow",
                                width : 50,height : 50,margin : 1, 
                                borderRadius : 8,border : "thick purple solid"
                        }}
                    >

                    </div>
                )
                  
                size++
            }

            E.push(
                <div
                    key={size}
                    style={{ background : "white",
                                width : 50,height : 50,margin : 1, 
                                borderRadius : 8,border : "thick purple solid",
                                position : "relative"
                        }}
                >
                    <label                        
                        style={{fontSize : 55, fontWeight : "bold", position : "absolute", left : "12%", top : "40%" ,
                                lineHeight : 0,color : "grey"
                        }}
                    >+</label>
                </div>
            )

            return (E)
        })()

        let dev=(
            ()=>{ 
                if (true){                                
                        return  <Devmain/>                                
                }
            }
        )()

        return (
            <div
                style={{position : "absolute",height : "100%",width : "100%" , top : 0,overflow : "hidden"}}
            >
                {dev}

                {/* menu */}
                <div
                    style={{ position : "absolute", top : 0, left : 0,zIndex :99999 }}
                >
                    <MenuMain
                        style={{ background : "transparent", position : "relative", width : undefined, height : undefined}}
                        items={tt.menuItems} tt={tt}
                        setup={ tt.menuSetup} obj={tt}
                    >

                    </MenuMain>
                </div>

                 {/* logout profile */}
                <div 
                    className='titleProgileLogOutNotiBox'
                    style={{ position : "absolute",  zIndex : 9999 ,width :250  /*right : 40 */ }}
                >                    
                    <div style={{float : "left", position : "absolute",top : 0,right : 60,zIndex : 999}}>
                        <NotificationsIconLaunch/>
                    </div>
                    
                    <div style={{float : "left"}}>
                        <ProfileIconExpandable>
                            
                            <div style={{}}>
                                <div
                                    style={{float : "left"}}
                                ><SettingsViewIconLaunch/></div> 
                                <div
                                    style={{float : "left"}}
                                > <label>settings</label></div>
                                <div style={{clear : "left" }} />
                            </div>
                            <div style={{}}>
                                <Logout
                                    style={{background : "red",color : "white" , borderRadius: 3,}}
                                />
                            </div>
                        </ProfileIconExpandable>
                    </div>                    
                    
                    <div style={{ clear : "left"}}/>
                </div>
                    
                { /* views */ }
                <div style={{ position : "relative", top : 60, 
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                }}>
                        {/* my home */}
                          
                </div>

                <div style={{position : "absolute",background : $gl.color.BlueViolet + "99",top: 0,right : 0,width : 60,
                            padding : 3,height : "100%",margin : 0, borderRadius : 0, zIndex:1200,
                            display : rightBarC.display
                                }}>
                        {rightBar}
                </div>                                
                
            </div>
        )
    }
}