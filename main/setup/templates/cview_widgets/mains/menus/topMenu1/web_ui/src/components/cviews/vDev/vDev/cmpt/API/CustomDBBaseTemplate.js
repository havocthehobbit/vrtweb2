

let dbBaseTemplateGenerateFN=(nameIn,addDataIn)=>{

    let name="";
    let addData="";

    if (nameIn){
        name=nameIn
    }
    if (addDataIn){
        addData=addDataIn
    }

let dbBaseTemplateVAR=`let mod_name="${name}"
let $cn=require("../../l_node_modules/libNative").$cn
let cl=$cn.l
let tof=$cn.tof
let feach=$cn.each
let isUn=$cn.isUn
let isOb=$cn.isOb
let crypto = require('crypto');

var main={
    type  : "dbJS",
    "auto_run" : ()=>{
        console.log("db lib : " , mod_name)
    },
    db : {
      ${addData}
    },
    schemas : { // TODO
        
    }
}

module.exports[mod_name]=main;
`;

    return dbBaseTemplateVAR
}


export const dbBaseTemplateGenerate=dbBaseTemplateGenerateFN;
