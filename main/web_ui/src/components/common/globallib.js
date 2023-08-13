
let $cn=require("./libNative").$cn

let $gl={ fn : {}}


let colors={
        AliceBlue: '#F0F8FF',
        AntiqueWhite: '#FAEBD7',
        Aqua: '#00FFFF',
        Aquamarine: '#7FFFD4',
        Azure: '#F0FFFF',
        Beige: '#F5F5DC',
        Bisque: '#FFE4C4',
        Black: '#000000',
        BlanchedAlmond: '#FFEBCD',
        Blue: '#0000FF',
        BlueViolet: '#8A2BE2',
        Brown: '#A52A2A',
        BurlyWood: '#DEB887',
        CadetBlue: '#5F9EA0',
        Chartreuse: '#7FFF00',
        Chocolate: '#D2691E',
        Coral: '#FF7F50',
        CornflowerBlue: '#6495ED',
        Cornsilk: '#FFF8DC',
        Crimson: '#DC143C',
        Cyan: '#00FFFF',
        DarkBlue: '#00008B',
        DarkCyan: '#008B8B',
        DarkGoldenRod: '#B8860B',
        DarkGray: '#A9A9A9',
        DarkGrey: '#A9A9A9',
        DarkGreen: '#006400',
        DarkKhaki: '#BDB76B',
        DarkMagenta: '#8B008B',
        DarkOliveGreen: '#556B2F',
        DarkOrange: '#FF8C00',
        DarkOrchid: '#9932CC',
        DarkRed: '#8B0000',
        DarkSalmon: '#E9967A',
        DarkSeaGreen: '#8FBC8F',
        DarkSlateBlue: '#483D8B',
        DarkSlateGray: '#2F4F4F',
        DarkSlateGrey: '#2F4F4F',
        DarkTurquoise: '#00CED1',
        DarkViolet: '#9400D3',
        DeepPink: '#FF1493',
        DeepSkyBlue: '#00BFFF',
        DimGray: '#696969',
        DimGrey: '#696969',
        DodgerBlue: '#1E90FF',
        FireBrick: '#B22222',
        FloralWhite: '#FFFAF0',
        ForestGreen: '#228B22',
        Fuchsia: '#FF00FF',
        Gainsboro: '#DCDCDC',
        GhostWhite: '#F8F8FF',
        Gold: '#FFD700',
        GoldenRod: '#DAA520',
        Gray: '#808080',
        Grey: '#808080',
        Green: '#008000',
        GreenYellow: '#ADFF2F',
        HoneyDew: '#F0FFF0',
        HotPink: '#FF69B4',
        IndianRed: '#CD5C5C',
        Indigo: '#4B0082',
        Ivory: '#FFFFF0',
        Khaki: '#F0E68C',
        Lavender: '#E6E6FA',
        LavenderBlush: '#FFF0F5',
        LawnGreen: '#7CFC00',
        LemonChiffon: '#FFFACD',
        LightBlue: '#ADD8E6',
        LightCoral: '#F08080',
        LightCyan: '#E0FFFF',
        LightGoldenRodYellow: '#FAFAD2',
        LightGray: '#D3D3D3',
        LightGrey: '#D3D3D3',
        LightGreen: '#90EE90',
        LightPink: '#FFB6C1',
        LightSalmon: '#FFA07A',
        LightSeaGreen: '#20B2AA',
        LightSkyBlue: '#87CEFA',
        LightSlateGray: '#778899',
        LightSlateGrey: '#778899',
        LightSteelBlue: '#B0C4DE',
        LightYellow: '#FFFFE0',
        Lime: '#00FF00',
        LimeGreen: '#32CD32',
        Linen: '#FAF0E6',
        Magenta: '#FF00FF',
        Maroon: '#800000',
        MediumAquaMarine: '#66CDAA',
        MediumBlue: '#0000CD',
        MediumOrchid: '#BA55D3',
        MediumPurple: '#9370DB',
        MediumSeaGreen: '#3CB371',
        MediumSlateBlue: '#7B68EE',
        MediumSpringGreen: '#00FA9A',
        MediumTurquoise: '#48D1CC',
        MediumVioletRed: '#C71585',
        MidnightBlue: '#191970',
        MintCream: '#F5FFFA',
        MistyRose: '#FFE4E1',
        Moccasin: '#FFE4B5',
        NavajoWhite: '#FFDEAD',
        Navy: '#000080',
        OldLace: '#FDF5E6',
        Olive: '#808000',
        OliveDrab: '#6B8E23',
        Orange: '#FFA500',
        OrangeRed: '#FF4500',
        Orchid: '#DA70D6',
        PaleGoldenRod: '#EEE8AA',
        PaleGreen: '#98FB98',
        PaleTurquoise: '#AFEEEE',
        PaleVioletRed: '#DB7093',
        PapayaWhip: '#FFEFD5',
        PeachPuff: '#FFDAB9',
        Peru: '#CD853F',
        Pink: '#FFC0CB',
        Plum: '#DDA0DD',
        PowderBlue: '#B0E0E6',
        Purple: '#800080',
        RebeccaPurple: '#663399',
        Red: '#FF0000',
        RosyBrown: '#BC8F8F',
        RoyalBlue: '#4169E1',
        SaddleBrown: '#8B4513',
        Salmon: '#FA8072',
        SandyBrown: '#F4A460',
        SeaGreen: '#2E8B57',
        SeaShell: '#FFF5EE',
        Sienna: '#A0522D',
        Silver: '#C0C0C0',
        SkyBlue: '#87CEEB',
        SlateBlue: '#6A5ACD',
        SlateGray: '#708090',
        SlateGrey: '#708090',
        Snow: '#FFFAFA',
        SpringGreen: '#00FF7F',
        SteelBlue: '#4682B4',
        Tan: '#D2B48C',
        Teal: '#008080',
        Thistle: '#D8BFD8',
        Tomato: '#FF6347',
        Turquoise: '#40E0D0',
        Violet: '#EE82EE',
        Wheat: '#F5DEB3',
        White: '#FFFFFF',
        WhiteSmoke: '#F5F5F5',
        Yellow: '#FFFF00',
        YellowGreen: '#9ACD32',
 }

$gl.colors=colors
$gl.color=colors
$gl.col=colors


$gl.alert=(...args)=>{ alert(args) }

let fetchPostCors=function(params){        
    let obj={        
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({}), 
        headers: {                    
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }                          
    }    

    if (!$cn.isUndefined( params)){
        if ($cn.isPlainObject(params)){}
        else{
            if (params==="upload"){
                delete obj.headers.Accept
                delete obj.headers["Content-Type"]
            }
        }
    }

    return obj    
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
$gl.getCookie=getCookie;
$gl.fetchCookie=getCookie;



function createCookie(name,value,days) {
    var expires
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
$gl.createCookie=createCookie;
$gl.setCookie=createCookie;
$gl.updateCookie=createCookie;

function eraseCookie(name) {
    createCookie(name,"",-1);
}
$gl.eraseCookie=eraseCookie;
$gl.deleteCookie=eraseCookie;

function cookie(){
    var args=arguments	
    var argsl=args.length

    if (argsl===1){
        return getCookie(args[0])
    }
    if (argsl===2){
        return createCookie(args[0],args[1])
    }
}
$gl.cookie=cookie;



var getHost=()=>{
    let url= window.document.createElement('a');
    url.setAttribute('href', window.location.href)
    let host=url.hostname;
    
    return host.trim();
}

$gl.fn.getHost=getHost;


var getPort=()=>{
    let url= window.document.createElement('a');
    url.setAttribute('href', window.location.href)
    
    let port=url.port;
    if (process.env.NODE_ENV !== 'production') {
      port=window["node_port"];
      if ($cn.isUn(port)){
        port=3001
      }
    }    

    return port.trim();
}
$gl.fn.getPort=getPort;

var getProtocall=()=>{
    return window.location.protocol;
}
$gl.fn.getProtocall=getProtocall;

// node port during development // create a global variable
if (process.env.NODE_ENV !== 'production') { 
    window["node_port"]=process.env["REACT_APP_DEV_NODE_PORT"]; // #BE # export REACT_APP_DEV_NODE_PORT=30?? npm start    
    if ($cn.isUn(window["node_port"])){
        window["node_port"]=3001
    }    
}

$gl.host=getHost();
$gl.port=getPort()
$gl.protocall=getProtocall();
$gl.url=$gl.protocall + "//" + $gl.host + ":" + $gl.port ;


$gl.fetchPostCors=fetchPostCors;



export const download=(filename, text)=>{
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
$gl.download=download

export const addrParamsToObject=()=>{
  var pairs = window.location.search.substring(1).split("&"),
    obj = {},
    pair,
    i;

  for ( i in pairs ) {
    if ( pairs[i] === "" ) continue;

    pair = pairs[i].split("=");
    obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
  }

  return obj;
}
$gl.addrParamsToObject=addrParamsToObject



let checkContainsOpenCloseChars=(inp)=>{
  let ret={ closePos: -1 }
  
  let opChar=inp.opChar
  let clChar=inp.clChar
  let newtmp1=inp.in

  let regexStr=escapeStringRegExp( opChar + "|" + clChar)            
          //returns { closePos , openSeqCount , openTotal,  closeTotal, hasFinalClose }
          //const rg0=new RegExp("\\${|}","g"); // g, is important for global find all
          const rg0=new RegExp(regexStr,"g"); // g, is important for global find all
          let bbb=[...newtmp1.matchAll(rg0)];  
          
          let prevOpen=true
          let currOpen=false
          let countOpenClose=0
          let openSeqCount=0
          let closeSeqCount=0
          let openTotal=0
          let closeTotal=0
          let lastidxPos=-1

          let exitloop=false             
          if (bbb.length>0){
              if (bbb[0]===clChar){
                  // done, no need to look deeper
              }else{
                  // need to look deeper for nested
                  //console.log("bbb ",newtmp1,bbb)
                  // count open closes until we get to out close
                                  
                  bbb.forEach((v,i)=>{
                      let idx=v.index
                      let val=v[0]
                      if (!exitloop){
                          currOpen=false                          
                          if (val===opChar){ // clChar                            
                              currOpen=true
                          }                           

                          if (currOpen===true ){
                              openSeqCount++
                              openTotal++
                              
                          }
                          if (currOpen===false){
                              openSeqCount--
                              closeTotal++
                              
                          }
                                                                              
                          prevOpen=currOpen
                          if (openSeqCount===0){
                              lastidxPos=idx

                              exitloop=true                                
                          }
                      }
                  })                     
              }
          }
          if (openSeqCount===0){
              ret.closePos=lastidxPos    
              ret.hasFinalClose=true           
          }
          ret.openSeqCount=openSeqCount
          ret.openTotal=openTotal
          ret.closeTotal=closeTotal

      return ret
}
$gl.checkContainsOpenCloseChars=checkContainsOpenCloseChars

escapeStringRegExp.matchOperatorsRe = /[\\{}[\]^$+*?.]/g;
function escapeStringRegExp(str) {
  return str.replace(escapeStringRegExp.matchOperatorsRe, '\\$&');
}
$gl.escapeStringRegExp=escapeStringRegExp

function arrnumSmallest(a) {
  let ret=0
  let smallest
  let smallestIdx    
  
  a.forEach((v,i)=>{           
      //let prVal                  
      if (i===0){
          smallest=v
          smallestIdx=i
      }else{            
          //prVal=a[ i - 1 ]
          a.forEach((v2,i2)=>{                
              if (i2===i){
              }else{                    
                  let curr_smallest=v2
                  let curr_smallestidx=i2
                  if (v < v2){
                      curr_smallest=v
                      curr_smallestidx=i
                  }                        
                  if (curr_smallest<smallest){
                      smallest=curr_smallest
                      smallestIdx=curr_smallestidx
                  }                    
              }
          })
      
      }
  })
  ret={ v : smallest, i : smallestIdx}
  return ret
}
$gl.arrnumSmallest=arrnumSmallest

function indexOfSmallest(a) {
  return  arrnumSmallest(a).i
}
$gl.indexOfSmallest=indexOfSmallest

const findTemplateStartEndsMulti=(params,...args)=>{ // ret {data} // & { closePos: 2,data,dataLen,stOp,stCl,startPosGlob,endPosGlob,inGlobLen,i }    
  let opChar=params.stOp
  let clChar=params.stCl
  let str=params.in
  
  let arr=params.arr
  let currSearchRec={}
  let tmp,tmp0,temp1    
  // need array loop of opens, to find the nearest
  let openPosType
  let openPos=-1
  let newtmp1=-1
  let startData0=[]
  let startData1=[]
  if (typeof(params.i)==="undefined"){
      params.i=0
  }
  if (typeof(params.inGlob)==="undefined"){
      params.inGlob=str
  }
  

  // open chars 
  let arrOut=params.arrOut    
  arr.forEach((r,i)=>{
      let tmp0=str.indexOf(r.stOp ) 
      if (tmp0 === -1 ){ return }

      tmp0=tmp0  + r.stOp.length    
      startData0.push(tmp0)        

      let tmp1=str.substr(tmp0)
      startData1.push(tmp1)  
  })    

  if (startData0.length===0){
      return arrOut
  }
  let si=indexOfSmallest(startData0)
  currSearchRec=arr[si]
  openPos=si
  newtmp1=startData1[si]    
  opChar=currSearchRec.stOp

  // close chars 
  let closePos
  let midTemp
  let midTempUntrimmed
  let nextTemp    
  let hasClose=false 
  clChar=currSearchRec.stCl            
  closePos=newtmp1.indexOf(clChar)      

  if ( closePos !== -1 ){    
      hasClose=true

      //#todo need to check between the 2( midTemp ), to see if there are other open and closing attributs, for things like openings that dont have closing elements
      let ccOC=checkContainsOpenCloseChars({ in : newtmp1, opChar : opChar, clChar : clChar  })  //return { closePos , openSeqCount , openTotal,  closeTotal, hasFinalClose }
      //console.log("newtmp1 :", opChar + newtmp1)
      
      if (ccOC.hasFinalClose){
          closePos=ccOC.closePos
      }

      midTempUntrimmed=newtmp1.substr(0, closePos )
      midTemp=midTempUntrimmed//.trim() // #rob removed trim 21-06-23
      
      nextTemp=newtmp1.substr(closePos + 1 + clChar.length ) 
      
  }else{
      nextTemp=newtmp1//.substr(closePos + 1 + clChar.length )    
  }
  ////////////////////////////////////////////////////////////////////                        

  ///
  if (true){
      let endPosGlob=(params.inGlob.length - str.length ) + ( midTemp.length + closePos ) + ( opChar.length + clChar.length )
      //console.log("str - params.inGlob.length" , params.inOrig.length ,params.inGlob.length , str.length - ( params.inGlob.length - midTemp.length  ) )
      
      let nr={ openPos : openPos ,closePos : closePos , 
                  data :  midTemp, dataLen : midTemp.length,
                  stOp : opChar, stCl : clChar ,
                  startPosGlob : (params.inGlob.length - str.length ) + midTemp.length  + ( opChar.length + clChar.length ) , 
              // startPosGlob : params.inGlob.length - ( (str.length - midTemp.length ) -  0), 
                  //startPosGlob : newtmp1.length -  midTemp.length ,
                  //startPosGlob :   ( params.inGlob.length - ( str.length ) ) + (   ( openPos +  midTemp.length ) ) ,
                  endPosGlob : endPosGlob , 
                  inGlobLen : params.inGlob.length, i : params.i, 
      }
      
      if (params.in.length <=  0 || openPos=== -1 ){
          return arrOut
      }
      if (hasClose){
          arrOut.push(nr)
      }
      
      params.arrOut=arrOut
      params.in=nextTemp    

      params.i++
      arrOut=findTemplateStartEndsMulti(params)
  }
      
  return arrOut
}
$gl.findTemplateStartEndsMulti=findTemplateStartEndsMulti



const splitObjectPathDelimKeep=(str,...args)=>{ // loop through arrary of
  //let splitstr=str.split(/(\.+|\[+|\]+)/);  // keep delimeters
  //let splitstr=str.split(/\.|\[|\]/); // round braces make regex keep delims
  
  var rx,searchreg
  //rx=new RegExp( "(\.+|\[+|\]+)" , "s") 
  searchreg=escapeStringRegExp( ".|[|]| " ) // at special character cariage prefix "\"
  
  if (typeof(args[0])==="object"){
      if (Array.isArray(args[0])){
          let tmp=""
          args[0].forEach((v,i)=>{
              if (i<args[0].length - 1){
                  tmp+=v + "|"
              }else{
                  tmp+=v
              }
          })

          searchreg=escapeStringRegExp(tmp)            
      }
  }

  var expressionResult = searchreg 
  //rx=new RegExp( "(\\.+|\\[+|\\]+|\\s+)" , "s")   
  rx=new RegExp( expressionResult , "s")   
  //let splitstr=str.split(/\.|\[|\]/); // round braces make regex keep delims
  let splitstr
  splitstr=str.split(rx).filter(Boolean); // filter boolean removed null/empty string '' 
  return splitstr

}
$gl.splitObjectPathDelimKeep=splitObjectPathDelimKeep


const splitObjectPath=(str,...args)=>{ // loop through arrary of
  //let splitstr=str.split(/(\.+|\[+|\]+)/);  // keep delimeters
  var rx,searchreg
  //rx=new RegExp( "(\.+|\[+|\]+)" , "s") 
  searchreg=escapeStringRegExp("(" + ".|[|]| "+  ")") // at special character cariage prefix "\"
  
  if (typeof(args[0])==="object"){
      if (Array.isArray(args[0])){
          let tmp=""
          args[0].forEach((v,i)=>{
              if (i<args[0].length - 1){
                  tmp+=v + "|"
              }else{
                  tmp+=v
              }
          })

          searchreg=escapeStringRegExp("(" + tmp +")")            
      }
  }

  var expressionResult = searchreg 
  //rx=new RegExp( "(\\.+|\\[+|\\]+|\\s+)" , "s")   
  rx=new RegExp( expressionResult , "s")   
  //let splitstr=str.split(/\.|\[|\]/); // round braces make regex keep delims
  let splitstr
  splitstr=str.split(rx).filter(Boolean); // filter boolean removed null/empty string '' 
  return splitstr
}
$gl.splitObjectPath=splitObjectPath

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}
$gl.isBlank=isBlank


let xmlparse=function(xmlString){
  var parser = new DOMParser();
  return parser.parseFromString(xmlString,"text/xml")
}
$gl.xmlparse=xmlparse

function xmlToJson(xml) {
 
  // Create the return object
  var obj = {};

  if (xml.nodeType === 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
      }
  } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue;
  }
  
  if (xml.hasChildNodes()) { // do children
      for(var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof(obj[nodeName]) == "undefined") {
              obj[nodeName] = xmlToJson(item);
          } else {
              if (typeof(obj[nodeName].push) === "undefined") {
                  var old = obj[nodeName];
                  obj[nodeName] = [];
                  obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item));
            }
       }
  } 

  return obj;
}
$gl.xmlToJson=xmlToJson


export default  $gl