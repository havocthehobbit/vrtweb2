let path=require("path");
let fs=require("fs");
let child_process=require("child_process");

console.log("1")
let $cnn=require("./node_serv/l_node_modules/libNativeNode.js").$cnn
let $cn=require("./node_serv/l_node_modules/libNative.js").$cn
console.log("2")
let cl=$cn.l
let tof=$cn.tof
let isUn=$cn.isUn

let tmp=""
console.log("3")
// create folders
tmp="data"
if (!fs.existsSync("./")){
    console.log("creating folder " + tmp )
    fs.mkdirSync("./" + tmp)
}
tmp="ignoreme"
if (!fs.existsSync("./")){
    console.log("creating folder " + tmp )
    fs.mkdirSync("./" + tmp)
}
tmp="web_ui/src/components/cviews"
if (!fs.existsSync("./")){
    console.log("creating folder " + tmp )
    fs.mkdirSync("./" + tmp)
}

tmp="node_serv/modules/custom_vwDataSchema"
if (!fs.existsSync("./")){
    console.log("creating folder " + tmp )
    fs.mkdirSync("./" + tmp)
}



//fs.writeFileSync( settingsPath ,JSON.stringify(dataOdef, null, 2) )
console.log("4")
tmp="web_ui/package.json"
if (!fs.existsSync("./" + tmp )){    
    try {
        fs.copyFileSync('./setup/templates/' + tmp , './' + tmp)       
        console.log(`install ${tmp} `)     
    }catch (err) {
        console.log(err);
    }
}

console.log("5")

tmp="node_serv/package.json"
if (!fs.existsSync("./" + tmp )){    
    try {
        fs.copyFileSync('./setup/templates/' + tmp , './' + tmp)       
        console.log(`install ${tmp} `)     
    }catch (err) {
        console.log(err);
    }
}

console.log("6")

console.log("install reactjs packages (web_ui)")
//res=child_process.execSync("dir" )
res=child_process.execSync("npm i", { cwd : "./web_ui"} )
console.log(res.toString())

console.log("install nodejs packages (node_serv)")
res=child_process.execSync("npm i", { cwd : "./node_serv"} )
console.log(res.toString())

console.log("done!")
process.exit()