import React, {Component} from "react"
import { ContextStore } from "../common/contextStore";

export class Logout extends Component {
    static contextType=ContextStore
    constructor(props){
        super(props)

        this.state={}
    }

    render(){
        let tt=this
        
        return (
                <div>
                </div>
        )

    }
    
    
}