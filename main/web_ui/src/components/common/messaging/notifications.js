import React, { Component} from "react"

export class Notifications extends Component {

    constructor(props){
        super(props)

        this.state={}

    }

    render(){

        return(
            <div>
                Notifications...
            </div>
        )
    }

}



export class NotificationsIconLaunch extends Component {

    constructor(props){
        super(props)

        this.state={}

    }

    render(){

        return(
            <div style={{ position: "relative", background : "blue", color : "lightgrey" , borderRadius : 4, width :30, fontWeight : "bold",cursor:"pointer",margin : 3}}>
               <p style={{ fontSize : 16,padding : 0,margin : 0}}>N</p>
               <p style={{ position : "absolute",color : "red", fontSize : 10, top : 0,left : 20 ,padding : 0,margin : 0}}>3</p>
            </div>
        )
    }

}