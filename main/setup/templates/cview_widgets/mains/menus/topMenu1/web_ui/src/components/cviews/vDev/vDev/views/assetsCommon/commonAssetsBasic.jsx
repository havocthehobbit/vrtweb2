import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"

import { v4 as uuidv4 } from 'uuid';

import { useWindowSize } from "../../../../../common/widgets/containers/useWindowSize";

export const parseAssetsParamsFn=(params,args)=>{

    params.key=""   
    params.name=""   
    params.style={} 
    params.insts={}
    params.extra={}

    if (args[0]){
        if (args[0].key){
            params.key=args[0].key
        }
        if (args[0].name){
            params.key=args[0].name
        }
        if (args[0].name){
            params.name=args[0].name
        }
        if (args[0].style){
            params.style=args[0].style
        }
        if (args[0].extra){
            params.extra=args[0].extra

            if (params.extra.instancesRef){
                params.insts=params.extra.instancesRef
            }
        }
    }

    if (params.key===""){
        params.key=uuidv4()
    }

    if (params.insts.current){
        if (params.insts.current.all){
            if (params.insts.current.all[params.name]){
                if (params.insts.current.all[params.name].properties){
                    let useAssetSource=false;
                    if (params.insts.current.all[params.name].properties.style){
                        params.style={...params.style,...params.insts.current.all[params.name].properties.style}
                    }else{
                        useAssetSource=true;
                    }

                    // use asset source
                    if (useAssetSource){
                        if (params.insts.current.all[params.name].assetSource){
                            let assetSource=params.insts.current.all[params.name].assetSource
                            if (params.insts.current.all[assetSource]){
                                if (params.insts.current.all[assetSource].properties){
                                    if (params.insts.current.all[assetSource].properties.style){
                                        params.style={...params.style,...params.insts.current.all[assetSource].properties.style};
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    


    return params
}

export const genCommonAssets=()=>{
    let retArr=[];

    let layoutposContsStates={};
    let layoutposContsO={};
    let layoutname="";

    let LayoutposContsODynTmp0


    

    if (true){
        layoutname="tableBase";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    
                let params={}
                parseAssetsParamsFn(params, args);

                return (               
                        <table
                            key={params.key}
                            style={{...{
                                background : "white",
                                position : "relative",
                                //display : "inline-block",
                                width : 400,
                                height : 300,
                                borderRadius : 8,
                                margin : 5,
                                padding : 5,
                                overstssssflow : "hidden"
                            },...params.style}}
                        >
                                    
                        </table>
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="blueDiv";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                 
                    let params={}
                    parseAssetsParamsFn(params, args);
                    
                    return (               
                        <div
                            key={params.key}
                            style={{...{
                                background : "blue",
                                position : "relative",
                                //display : "inline-block",
                                width : 200,
                                height : 200,
                                borderRadius : 8,
                                margin : 5,
                                padding : 5,
                                overflow : "hidden"
                            },...params.style}}

                            onClick={(e)=>{
                                
                                if (params.insts.current){
                                    if (params.insts.current.all){
                                        if (params.insts.current.all[params.name]){
                                            //alert(JSON.stringify(params.insts.current.all[params.name],null,2))
                                            alert(JSON.stringify(params.style,null,2))
                                            
                                        }
                                    }
                                }
                            }}
                        >
                            {params.key}        
                        </div>
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="redDiv";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    
                    let params={}
                    parseAssetsParamsFn(params, args);

                    return (               
                        <div
                            key={params.key}
                            style={{...{
                                background : "red",
                                position : "relative",
                                //display : "inline-block",
                                width : 200,
                                height : 200,
                                borderRadius : 8,
                                margin : 5,
                                padding : 5,
                                overflow : "hidden"
                            },...params.style}}
                        >
                                {params.key}   
                        </div>
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="greenDiv";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                   
                    return (               
                        <div
                            key={params.key}
                            style={{...{
                                background : "green",
                                position : "relative",
                                //display : "inline-block",
                                width : 200,
                                height : 200,
                                borderRadius : 8,
                                margin : 5,
                                padding : 5,
                                overflow : "hidden"
                            },...params.style}}
                        >
                                {params.key}    
                        </div>
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])


        layoutname="input";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onChange : ()=>{},
                        onBlur : ()=>{},
                    }
                   
                    return (               
                        <input
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        
        layoutname="password";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onChange : ()=>{},
                        onBlur : ()=>{},
                    }
                   
                    return (               
                        <input
                            key={params.key}
                            type="password"
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="select";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onChange : ()=>{},
                        onBlur : ()=>{},
                    }
                   
                    return (               
                        <select
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        
        
        layoutname="radio";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onChange : ()=>{},
                        onBlur : ()=>{},
                    }
                   
                    return (               
                        <input
                            key={params.key}
                            type="radio"
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])


        layoutname="checkbox";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onChange : ()=>{},
                        onBlur : ()=>{},
                    }
                   
                    return (               
                        <input
                            key={params.key}
                            type="checkbox"
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="date";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onChange : ()=>{},
                        onBlur : ()=>{},
                    }
                   
                    return (               
                        <input
                            key={params.key}
                            type="date"
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        
        layoutname="datetime-local";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onChange : ()=>{},
                        onBlur : ()=>{},
                    }
                   
                    return (               
                        <input
                            key={params.key}
                            type="datetime-local"
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="color";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onChange : ()=>{},
                        onBlur : ()=>{},
                    }
                   
                    return (               
                        <input
                            key={params.key}
                            type="color"
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        



        layoutname="textarea";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onChange : ()=>{},
                        onBlur : ()=>{},
                    }
                   
                    return (               
                        <textarea
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="button";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={};
                    let value="text abc";

                    
                   
                    return (               
                        <button
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{value}</button>
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="img";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onClick : ()=>{},     
                        src : "",                   
                    }
                   
                    return (               
                        <img
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        
        layoutname="svg";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={}
                   
                    return (               
                        <svg
                            key={params.key}                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        
        layoutname="canvas";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={}
                   
                    return (               
                        <canvas
                            key={params.key}                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])
        

        layoutname="p";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={};
                    let value="text abc";
                   
                    return (               
                        <p
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{value}</p>
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="pre";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={};
                    let value="text abc";
                   
                    return (               
                        <pre
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{value}</pre>
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        
        layoutname="span";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={};
                    let value="text abc";
                   
                    return (               
                        <span
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{value}</span>
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="h1";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={};
                    let value="text abc";
                   
                    return (               
                        <h1
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{value}</h1>
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="h2";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={};
                    let value="text abc";
                   
                    return (               
                        <h2
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{value}</h2>
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="h3";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={};
                    let value="text abc";
                   
                    return (               
                        <h3
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{value}</h3>
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="h4";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={};
                    let value="text abc";
                   
                    return (               
                        <h4
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{value}</h4>
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="li";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onClick : ()=>{},                                          
                    }
                   
                    return (               
                        <li
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        layoutname="a";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={
                        onClick : ()=>{},                                          
                    }
                   
                    return (               
                        <a
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])


        
        layoutname="audio";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={}
                   
                    return (               
                        <audio
                            key={params.key}                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

        
        layoutname="audio";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={}
                   
                    return (               
                        <audio
                            key={params.key}                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])

         
        layoutname="video";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={}
                   
                    return (               
                        <video
                            key={params.key}                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])
        

        layoutname="iframe";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={}
                   
                    return (               
                        <iframe
                            key={params.key}                            
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])
        

    }

    return retArr;
}