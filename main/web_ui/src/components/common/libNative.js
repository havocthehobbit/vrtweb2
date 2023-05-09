/*
    !!!!!!!!! 
        Only vanilla and native node libs allowed ,  
        ...no third party library dependancies allowed to be loaded in this file
    !!!!!!!!!
*/

let cool_native_js={
    name : "cool_native_node",    
    each : function(inst,cb){ // for each in for objects and arrays
        if (this.isObject){
            Object.keys(inst).forEach((v , p)=>{
                cb(inst[v] , v) 
            })
        }else{
            inst.forEach(function(v,i){ cb(v,i) })
        }


    },
    isObject : function(inp){
        var ret=false
        if (typeof(inp)==="object"){
            if (Array.isArray(inp)){
                ret=false
            }else{
                ret =true
            }

        }

        return ret
        
    },
    isOb : undefined,
    isPlainObject : undefined,
    isUndefined : function(inp){
        var ret=false
        if (typeof  inp=== "undefined"){
            ret=true
        }
        return ret
    },
    isUn : function(inp){
       return this.isUndefined(inp)
    },
    typeof : function(inp){
        var t=typeof(inp)

        if (t==="object"){
            if (this.isObject()){
                t="object"

            }else{
                t="array"
            }
        }

        return t

    },
    tof : undefined ,
    capitalizeFirstLetter : function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    l : function(){ // console.log
        console.log.apply(this,arguments)
    },

    init : function(){
        var args=arguments;
        var args_l=args.length;
        var param={ name : "" }

        this.l_this=this ;

        this.isPlainObject=this.isObject
        this.isOb=this.isObject
        
        this.tof=this.typeof      
    }
}
cool_native_js.init()
let $cn=cool_native_js;


module.exports.$cn=cool_native_js;
module.exports.libNative=cool_native_js;
module.exports.coolNative=cool_native_js;

