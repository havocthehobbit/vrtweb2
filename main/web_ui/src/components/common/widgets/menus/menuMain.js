import React, { Component } from "react"



export class MenuMain extends Component{

    constructor(props){
        super(props)

        if (props.style){
            this.style=props.style
        }

        if (props.obj){
            this.obj=props.tt
        }

        this.state={
            items : [],
            current : 0,
            currentHover : -1,
        }
    }

    style={}

    obj={}
    
    render(){
        let tt=this

        let styleDef={}
        let StyleThis=tt.style
        let style={...styleDef, ...StyleThis}
        
        let all_times
        all_times=((e)=>{
            let arr=[]
            let setup={}
            let key=0

            if (tt.props.setup!==undefined){
                setup=tt.props.setup
            }
            
            let eachEleFn=(ele, key,attr)=>{ // 
                var estyle={ width : 90, background : "lightgreen" }
                let onClick=()=>{} 
                let onMouseEnter=()=>{} 
                let onMouseLeave=()=>{} 
                 

                if (attr===undefined){
                    attr={}
                }

                let setup={vert : true}

                if (tt.props.setup){
                    setup=tt.props.setup
                    if ( setup.vert!==undefined){
                        if ( setup.vert===true){
                            estyle.float="left"
                        }
                    }

                    if ( setup.cssEach!==undefined){
                        estyle={...estyle, ...setup.cssEach}
                    }                    

                }

                if (attr.onClick!==undefined){
                    onClick=attr.onClick
                }    
                
                
                
                let onClickPar=(e)=>{
                    var eparams={
                        e : e,
                        name : attr.name,
                        extra : attr.extr,
                        data : attr.data,
                        this : attr.this,
                        obj : tt.obj
                    }
                    
                    onClick(eparams,tt.obj)
                    tt.setState({ current : key })
                }

                let onMouseEnterPar=(e)=>{
                    var eparams={
                        e : e,
                        name : attr.name,
                        extra : attr.extr,
                        data : attr.data,
                        this : attr.this
                    }

                    onMouseEnter(eparams)
                    let ceid=parseInt(e.target.getAttribute("eid"))
                    tt.setState({ currentHover : ceid })
                }
                let onMouseLeavePar=(e)=>{
                    var eparams={
                        e : e,
                        name : attr.name,
                        extra : attr.extr,
                        data : attr.data,
                        this : attr.this
                    }

                    onMouseLeave(eparams)
                    tt.setState({ currentHover : -1 })
                }

                if ( key===tt.state.currentHover){
                    if (setup.cssEachHover!==undefined){
                        let overlap=false;
                        if (setup.cssEachHoverOverlap!==undefined){
                            if (setup.cssEachHoverOverlap){
                                overlap=true    
                            }
                            
                        }
                    
                        if (overlap){
                            estyle={...estyle,...setup.cssEachHover}
                        }else{
                            estyle=setup.cssEachHover
                        }
                        
                    
                        
                    
                    }               
                }               
           

                // currently selected
                if (tt.state.current===key){
                    let overlap=false;
                    if (setup.cssEachCurrentOverlap!==undefined){
                        if (setup.cssEachCurrentOverlap){
                            overlap=true    
                        }
                        
                    }
                    if (setup.cssEachCurrent!==undefined){
                        if (overlap){
                            estyle={ ...estyle,...setup.cssEachCurrent}
                        }else{
                            estyle=setup.cssEachCurrent
                        }
                        
                    }

                }

                return (
                        <div
                            key={key}
                            eid={key}
                            rname={attr.name}
                            style={estyle}  

                            onMouseEnter={onMouseEnterPar}   
                            onMouseLeave={onMouseLeavePar}
                            onClick={onClickPar}   
                            
                        >
                            {ele}                            
                        </div>
                )   
            }
            
            
            if (setup.hasBurger!==undefined){
                    
                if (setup.hasBurger){
                    arr.push(
                        <div>
                            =
                        </div>
                    )
                }   
                


                key++
            }

            if (tt.props.children!==undefined){
                                
                tt.props.children.forEach((r,i)=>{
                    arr.push(
                        eachEleFn(r,key)                    
                    )

                    key++
                });
            }

            if (tt.props.items!==undefined){
                                
                tt.props.items.forEach((r,i)=>{
                    let title="title_" + (key + 1)
                    let name=""
                    

                    if (r.name===undefined){
                        name=title
                    }else{
                        name=r.name
                    }
                    
                    if (r.title===undefined){
                        title=name
                    }else{
                        title=r.title
                    }           
                    
                    let cssText={}
                    if (setup.cssText!==undefined){
                        cssText={ ...setup.cssText}
                    }
                    
                    if (setup.fontNum!==undefined){ // some defaults and templates by number, so that you dont have to remember all fontfamily names and settings for quick menu seutps 
                        if (setup.fontNum.num!==undefined){
                            let fontfams=["", "Arial","Helvetica", "Blippo", "Liberation Sans","Boogaloo"]
                            let num=setup.fontNum.num
                            if (num< 0 || num > (fontfams.length -1 ) ){
                                num=0
                            }

                            cssText.fontFamily=fontfams[num]
                        }
                    }

                    let ele=(
                        <div
                            style={cssText}                            
                        >
                            {title}   
                        </div>
                    )
                    arr.push(
                        eachEleFn(ele , key, r)
                    )

                    key++

                })
            }

            arr.push(<div key={key} style={{clear : "left"}}/>)

            return arr
        })()

       

        return (
            <div
                style={style}
            >
                <div>

                </div>
                <div>
                    {all_times}
                </div>
                
            </div>
        )
    }



}