import React, {Component} from "react"
import settingsicon from "../../assets/icons/settings-gear-icon.svg"



export class SettingsView extends Component {

    constructor(props){
        super(props)

        this.state={}
    }

    render(){
        return (
            <div>
                <p> settings </p>
            </div>
        )

    }


}



export class SettingsViewIconLaunch extends Component {

    constructor(props){
        super(props)

        this.state={}
    }

    render(){
        return (
            <div>
                <img style={{height : 25,width : 20,cursor:"pointer"}}
                    src={settingsicon} alt={settingsicon} 
                />                
            </div>
        )

    }


}