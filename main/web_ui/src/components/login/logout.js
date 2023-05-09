import React, {Component} from "react"
//import "../../App.css";
import { ContextStore } from "../common/contextStore";
import $gl from "../common/globallib"
let $cn=require("../common/libNative").$cn

let cl=$cn.l
let tof=$cn.tof

export class Logout extends Component {
    static contextType=ContextStore
    constructor(props){
        super(props)

        this.state={}
    }

    fetchLogoutUser=(cb)=>{      
        let tt=this  
        let api="logout"
        let data={};
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;        
        if (tof(cb)!=="function"){ cb=()=>{} }
        
        fetch(url, fparams)
        .then((response)=>{
            if (responseType==="json"){return response.json()}
            else{
                if (responseType==="text"){  return response.text()}
                else { 
                    if(responseType==="blob"){ return response.blob()}
                    else{ if(responseType==="formData"){ return response.formData()}
                    }
                }
                
            }            
        })
        .then(data => { 
                cb(data);
        }).catch(function(err){
            cb({},{err : err});
        })
    }

    logout=(cb)=>{      
        let tt=this 
        if (tof(cb)!=="function"){ cb=()=>{} }

        tt.fetchLogoutUser((...args)=>{
            
            if (args.length>1){cl("err : ", args[1])}
            if (args.length===1){                                                     
                let dt=args[0]
                if( dt.status===true){
                    //setcookies
                    $gl.deleteCookie("userid")   
                    // setRootState and change page
                    const context =this.context;                    
                    var isLoggedInSetMain=context.isLoggedInSet
                    isLoggedInSetMain(false)
                }
            }

            cb()
        })


    }
    

    render(){
        let tt=this
        
        
        let propStyle={}
        if ( typeof(tt.props.style)==="object"){
            propStyle=tt.props.style
        }
        let defStyle={ background : "orange",color : "blue", border :"none",borderRadius : 4,cursor:"pointer"}

        let style={ ...defStyle, ...propStyle}

        return (
            <div>
                <button 
                    style={style}
                    onClick={
                        (e)=>{
                            tt.logout()
                        }
                    }
                 

                >
                    Logout
                </button>


            </div>
        )

    }


}