/*
    !!!!!!!!! 
        Only vanilla and native node libs allowed ,  
        ...no third party library dependancies allowed to be loaded in this file
    !!!!!!!!!
*/

let cool_native_js={
    name : "cool_native_node",    
    each : function(inst,cb){ // for each in for objects and arrays
        if (cool_native_js.isObject(inst)){
            Object.keys(inst).forEach((v , p)=>{
                cb(inst[v] , v) 
            })
        }else{
            inst.forEach(function(v,i){ cb(v,i) })
        }
    },
    isObject : function(input){
        var ret=false
        if (typeof(input)==="object"){
            if (Array.isArray(input)){
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
        if (typeof (inp)==="undefined"){
            ret=true
        }
        return ret
    },
    isUn : function(inp){
       return cool_native_js.isUndefined(inp)
    },
    typeof : function(inp){
        var t=typeof(inp)

        if (t==="object"){
            if (cool_native_js.isObject(inp)){
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

        cool_native_js.l_this=cool_native_js ;

        cool_native_js.isPlainObject=cool_native_js.isObject
        cool_native_js.isOb=cool_native_js.isObject
        
        cool_native_js.tof=cool_native_js.typeof      
    }
}
cool_native_js.init()
let $cn=cool_native_js;


module.exports.$cn=cool_native_js;
module.exports.libNative=cool_native_js;
module.exports.coolNative=cool_native_js;

