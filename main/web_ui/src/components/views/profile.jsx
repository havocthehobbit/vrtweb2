import React, { Component,lazy,Suspense} from "react"

var ProfileDyn=lazy(() =>{    
    let file='cviews/profile.jsx';
     return import(`../${ file}`) // only works with template ticks that lookup a variable , wont work with literals    
    .catch(() => ({ default: () => 
        <p style={{ fontSize : 16,padding : 0,margin : 0,cursor:"pointer"}}>
            My Profile.
            </p> 
    }))
})

var ProfileMain=lazy(() =>{    
    let file='cviews/profileMain.jsx';
     return import(`../${ file}`) // only works with template ticks that lookup a variable , wont work with literals    
    .catch(() => ({ default: (props) => 
        <ProfileIconExpandableMain {...props} />
    }))
})

export class Profile extends Component {

    constructor(props){
        super(props)

        this.state={}

    }  



    render(){

        
        return(
            <div>
                profile...
            </div>
        )
    }

}

export class ProfileIconDef extends Component {
    constructor(props){
        super(props)

        this.state={
            expanded : false,

        }

    }

    render(){
        let tt=this
        let expandedCSS="none"
        if (tt.state.expanded){ 
            expandedCSS="block"
        }

        let profileHeight=50
        let profileWidth=50
        let profileDropDownWidth=240

        return ( 
            <div style={{ position : "relative" ,
                            width : profileDropDownWidth
                        }} >
                <div
                    style={{position : "relative",cursor : "pointer" , top:0,right : 0,height :50, width : 50}}
                />
                <div
                    style={{position : "absolute",cursor : "pointer" ,top:0, right : 0,height :50, width : 50}}
                    onClick={
                        ()=>{
                            tt.setState({ expanded : !tt.state.expanded})
                        }
                    }
                >
                    <ProfileIcon
                        style={{PointerEvent : "none",userSelect : "none",}}
                    />
                </div>
                <div 
                    style={{ display : expandedCSS , background : "white", 
                    borderRadius : 6, border : "2px solid grey",
                    padding : 0, zIndex : 999 ,
                    width : profileDropDownWidth,maxHeight : 800,overflow : "auto"
                    }}
                >
                    <div style={{ padding : 20 }} >
                        {tt.props.children}
                    </div>
                   
                </div>
            </div>
        )

    }
}

export const ProfileIconExpandable=(props)=>{
    return (
        <>
            <Suspense fallback={<div></div>} >
                <ProfileMain {...props} />
            </Suspense>
            
        </>
    )
}

export class ProfileIconExpandableMain extends Component {
    constructor(props){
        super(props)

        this.state={
            expanded : false,

        }

    }

    render(){
        let tt=this
        let expandedCSS="none"
        if (tt.state.expanded){ 
            expandedCSS="block"
        }

        let profileHeight=50
        let profileWidth=50
        let profileDropDownWidth=240

        let main=(()=>{
            return (
                <div style={{ position : "relative" ,
                                width : profileDropDownWidth
                            }} 
                >
                    <div
                        style={{position : "relative",cursor : "pointer" , top:0,right : 0,height :50, width : 50}}
                    />
                    <div
                        style={{position : "absolute",cursor : "pointer" ,top:0, right : 0,height :50, width : 50}}
                        onClick={
                            ()=>{
                                tt.setState({ expanded : !tt.state.expanded})
                            }
                        }
                    >
                        <ProfileIcon
                            style={{PointerEvent : "none",userSelect : "none",}}
                        />
                    </div>
                    <div 
                        style={{ display : expandedCSS , background : "white", 
                        borderRadius : 6, border : "2px solid grey",
                        padding : 0, zIndex : 999 ,
                        width : profileDropDownWidth,maxHeight : 800,overflow : "auto"
                        }}
                    >
                        <div style={{ padding : 20 }} >
                            {tt.props.children}
                        </div>
                    
                    </div>
                </div>
            )
        })()



        return ( 
        <>            
            {main}
           </>
        )

    }
}

export class ProfileIcon extends Component {

    constructor(props){
        super(props)

        this.state={}

    }

    render(){
        let tt=this

        let profile
        profile=(()=>{

            let propStyle={}
            if ( typeof(tt.props.style)==="object"){
                propStyle=tt.props.style
            }
            let defStyle={
                background : "white",
                height : 50,
                width : 50,

                borderRadius : 8,
                boder : "solid black thin",
                overflow : "hidden",                
            }

            let style={ ...defStyle, ...propStyle}
            return (
                
                <div
                    style={style}                    
                >
                    <React.Suspense fallback={<div></div>}>
                        <ProfileDyn/>                
                    </React.Suspense>
                    

                </div>
            )

        })()


        return(
            <div>
                {profile}
            </div>
        )
    }

}

