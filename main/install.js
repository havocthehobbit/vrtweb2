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
console.log("5.1")

tmp="node_serv/package.json"
if (!fs.existsSync("./" + tmp )){    
    try {
        fs.copyFileSync('./setup/templates/' + tmp , './' + tmp)       
        console.log(`install ${tmp} `)     
    }catch (err) {
        console.log(err);
    }
}

console.log("5.2")
tmp="node_serv/cstartdevw.bat"
if (!fs.existsSync("./" + tmp )){    
    try {
        fs.copyFileSync('./setup/templates/' + tmp , './' + tmp)       
        console.log(`install ${tmp} `)     
    }catch (err) {
        console.log(err);
    }
}

console.log("5.3")
tmp="web_ui/cstartdevw.bat"
if (!fs.existsSync("./" + tmp )){    
    try {
        fs.copyFileSync('./setup/templates/' + tmp , './' + tmp)       
        console.log(`install ${tmp} `)     
    }catch (err) {
        console.log(err);
    }
}

console.log("7")
tmp="web_ui/src/components/cviews"
if (!fs.existsSync("./" + tmp )){    
    try {
        fs.mkdirSync( tmp )       
        console.log(`creating custom dir : ${tmp} `)     
    }catch (err) {
        console.log(err);
    }
}

console.log("10")
console.log("install reactjs packages (web_ui)")
//res=child_process.execSync("dir" )
res=child_process.execSync("npm i", { cwd : "./web_ui"} )
console.log(res.toString())

console.log("install nodejs packages (node_serv)")
res=child_process.execSync("npm i", { cwd : "./node_serv"} )
console.log(res.toString())

console.log(`=========================================
done!!!
-----------

to start dev mode open up 2 session in shell/cmd and navigate to web_ui and node_serv respectively.
then run cstartdevw.bat for windows or cstartdevw.sh for linux for each session . 
now you should be able to login to admin using admin/admin123 from a browser on port 3008 ;
to change port edit the cstartdevw.bat/sh script files and the data/setup.json ( which will be create after first startup attempt) ;

# Customisation templates can be found in the templates/cview_widgets and be copied into web_ui-->cviews and node_serv-->custom modules respectively. 

`)
process.exit()