
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

export default  $gl