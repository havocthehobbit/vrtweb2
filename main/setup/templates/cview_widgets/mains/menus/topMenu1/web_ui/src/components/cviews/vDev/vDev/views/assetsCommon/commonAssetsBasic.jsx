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

    }

    return retArr;
}