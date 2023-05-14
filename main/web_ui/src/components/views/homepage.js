import React,{ Component } from "react";
//import logo from '../../assets/logo2small.png';
import '../../App.css';

import { ContextStore } from "../common/contextStore";
import { Login } from "../login/login"
import { RegisterButton } from "../login/register";
import { SocialRegisterButton } from "../login/socialReg";



export class Homepage extends Component {
    static contextType=ContextStore

    constructor (props){
        super(props)      

        document.title = 'vrtweb'

        this.state={}
    }

    render (){
        let tt=this        
        
        return (
            <div
                
            >  
                <Login />
                
                {/* <RegisterButton/> <SocialRegisterButton/> */}
                {/* <img 
                    style={{ width : 400}}
                    src={logo} alt={logo} 
                /> */}
               <br/>
                <h3>Home</h3>                
            </div>

        )
    }
}