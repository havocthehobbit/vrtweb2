import React, {Component} from "react"
import "../../App.css";
import { ContextStore } from "../common/contextStore";
import $gl from "../common/globallib"
import { stylec } from "../views/main"
let $cn=require("../common/libNative").$cn

let cl=$cn.l
let tof=$cn.tof

export class Login extends Component {

    constructor(props){
        super(props)

        this.focusRefInp=React.createRef()
        this.focusRefPass=React.createRef()

        this.state={ test : "" , userid : "", password : ""}
    }    

    componentDidMount(){        
        let tt=this

           
        
        if (tt.state.userid!==""){
            tt.focusRefPass.focus()
        }else{
            tt.focusRefInp.focus()
        }        
    }

    focustRef=undefined

    fetchLoginUser=(cb)=>{      
        let tt=this  
        let api="login"
        let data={userid : tt.state.userid.trim() , password : tt.state.password.trim() };
        let host=$gl.host//"localhost"        
        let port=$gl.port//"3001"

        let protocall=$gl.protocall//"http"
        let responseType="json" // json,text,blob,formData
        let fparams=new $gl.fetchPostCors()
        
        fparams.body=JSON.stringify(data)
        let url=protocall + "//" + host + ":" + port + "/" + api;     
        
        cl("url ",url)   
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

    loginUser=(cb)=>{      
        let tt=this 
        if (tof(cb)!=="function"){ cb=()=>{} }

        tt.fetchLoginUser((...args)=>{
            
            if (args.length>1){cl("err : ", args[1])}
            if (args.length===1){                                                     
                let dt=args[0]
                if( dt.status===true){
                    //setcookies
                    $gl.createCookie("userid" , tt.state.userid)   
                    // setRootState and change page
                    const context =this.context;                    
                    var isLoggedInSetMain=context.isLoggedInSet
                    isLoggedInSetMain(true)
                }
            }

            cb()
        })


    }
    
    render(){
        let tt=this
        const context =this.context;
        let isLoggedInMain=context.isLoggedIn
        var isLoggedInSetMain=context.isLoggedInSet        

        return (
            <div>                
                <input  
                    ref={(e)=>{tt.focusRefInp=e}}
                    style={stylec.input}
                    value={tt.state.userid}
                    placeholder={"userID"}
                    onChange={
                        (e)=>{
                            tt.setState({ userid : e.target.value})
                        }
                    }
                    onKeyUp={
                        (e)=>{
                            if(e.key==="Enter"){
                                tt.focusRefPass.focus()                                
                            }
                        }
                    }

                />
                <input 
                    ref={(e)=>{ tt.focusRefPass=e}}
                    style={stylec.input}
                    value={tt.state.password}
                    placeholder={"password"}
                    type={"password"}
                    onChange={
                        (e)=>{
                            tt.setState({ password : e.target.value})
                        }
                    }
                    onKeyUp={
                        (e)=>{
                            if(e.key==="Enter"){
                               tt.loginUser()
                            }
                        }
                    }

                />
                <button
                    style={stylec.button}
                    onClick={(e)=>{
                        tt.loginUser()
                    }}
                >
                    Login
                </button>


            </div>
        )

    }


}
Login.contextType=ContextStore



export const isAuth=function(){
    var args=arguments;
    var cb=()=>{}    
    var userid="";    
    if ( args.length > 0){
        if ($cn.isPlainObject(args[0])){
            if (!$cn.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            if (!$cn.isUndefined(args[0].userid)){
                userid=args[0].userid
            }           
        }

        if (args.length > 1){
            cb=args[1];
        }
    }
    
    var url=$gl.url + "/isAuth"; 
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(
           { "userid" : userid }
        ),
        headers: {            
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => { 
            cb(data);
        } ).catch(error => {
            cb({}, { err : error});
            //console.log(error);
        })

}