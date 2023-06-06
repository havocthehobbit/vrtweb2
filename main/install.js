let path=require("path");
let fs= require("fs");

let $cnn=require("./node_serv/l_node_modules/libNativeNode.js").$cnn
let $cn=require("./node_serv/l_node_modules/libNative.js").$cn

let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn

let tmp=""

// create folders
if (!fs.existsSync("./data")){
    fs.mkdirSync("./data")
}

//fs.writeFileSync( settingsPath ,JSON.stringify(dataOdef, null, 2) )

tmp="web_ui/package.json"
if (!fs.existsSync("./" + tmp )){
    fs.copyFile('./setup/templates/' + tmp , './' + tmp, (err) => {
        if (err) throw err;
        console.log( tmp + ' was copied to destination.txt');
    });
}
tmp="node_serv/package.json"
if (!fs.existsSync("./" + tmp )){
    fs.copyFile('./setup/templates/' + tmp , './' + tmp, (err) => {
        if (err) throw err;
        console.log( tmp + ' was copied to destination.txt');
    });
}