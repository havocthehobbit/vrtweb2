

let apiBaseTemplateGenerateFN=(nameIn,addDataIn)=>{

    let name="";
    let addData="";

    if (nameIn){
        name=nameIn
    }
    if (addDataIn){
        addData=addDataIn
    }

let apiBaseTemplateVAR=`let fs=require('fs')
let path = require('path'); // this contanes some extra modules and standard library function that can be made to make life easier , please see help under nodejsVRTwebStdLib

let modName="${name}"

let $cn=require("../../l_node_modules/libNative").$cn
let cl=$cn.l
let feach=$cn.each
let isOb=$cn.isOb
let isUn=$cn.isUn 

let main={
    type  : "apiJS",
    auto_run : function(){ 
        console.log("auto_running " + modName)
    },
    run_after_init : function(params){
        console.log("run_after_init " + modName)
    },
    __app : [ // must be named __app to create a route
        ${addData}
    ]
}



 
module.exports[modName]=main;
`;

    return apiBaseTemplateVAR
}


export const apiBaseTemplateGenerate=apiBaseTemplateGenerateFN;
