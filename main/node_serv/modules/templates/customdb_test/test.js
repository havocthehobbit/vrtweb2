let mod_name="testdb1"

var main={
    "auto_run" : ()=>{
        console.log("testing testdb1")
    },
    db : {
        users2 : {
            getUsers2 : ()=>{

            }
         },
         users : {
            amendUsers : ()=>{

            }
         },
         loginAuth : { 
            checkCanPass : (franeworkData, params, cbp)=>{
                // passowrd auth override --?  ret.login_confirmed=true/false to login
                // args --> params : { bd , data , ret_data}
                let db
                let temp=""
                let details={}
                let view=undefined  
                
                if (franeworkData.generalDbFns){
                    db=franeworkData.generalDbFns.db
                }else{ // no custom dbs
                    cbp=params
                    params=franeworkData
                }            
    
                let cb=()=>{}
                if (typeof(cbp)==="function"){
                    cb=cbp
                }            
                
                let ret={
                    login_confirmed : false,            
                }                            
                
                // customisable logic 
                if (params.data.password===params.bd.password){
                    ret.login_confirmed=true;                
                }
    
                cb(ret)
            }
        },
    },
    schemas : {
        users4 : {

        }
    }
}



 
module.exports[mod_name]=main;