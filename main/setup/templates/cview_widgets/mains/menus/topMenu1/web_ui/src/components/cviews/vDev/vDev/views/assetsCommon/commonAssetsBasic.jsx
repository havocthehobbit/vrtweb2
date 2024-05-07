import { useState,useEffect,useRef,useContext ,Context , useMemo, useCallback} from "react"

import { v4 as uuidv4 } from 'uuid';

import { useWindowSize } from "../../../../../common/widgets/containers/useWindowSize";

export const parseAssetsParamsFn=(params,args)=>{

    params.key=""   
    params.name=""   
    params.style={} 
    params.props={} 
    params.events={}
    params.eventsProps={}
    params.states={}
    params.statesProps={}
    params.vars={}
    params.varsProps=[]
    params.Fn={}
    params.FnLocal={}
    params.FnProps={}
    params.insts={}
    params.extra={}

    params.ignoreSpecialProps={}

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
        if (args[0].props){
            params.props=args[0].props
        }
        if (args[0].events){
            params.events=args[0].events
        }
        if (args[0].eventsProps){
            params.eventsProps=args[0].eventsProps
        }
        if (args[0].states){
            params.states=args[0].states
        }
        if (args[0].statesProps){
            params.statesProps=args[0].statesProps
        }
        
        if (args[0].vars){
            params.var=args[0].vars
        }
        if (args[0].varsProps){
            params.varsProps=args[0].varsProps
        }
        if (args[0].Fn){
            params.Fn=args[0].Fn
        }
        if (args[0].Fnlocal){
            params.Fnlocal=args[0].Fnlocal
        }
        if (args[0].FnProps){
            params.FnProps=args[0].FnProps
        }
        if (args[0].extra){
            params.extra=args[0].extra

            if (params.extra.instancesRef){
                params.insts=params.extra.instancesRef
            }
            //if (params.extra.props){
            //    params.props=params.extra.props
            //}

            if (true){
                if (params.insts.current){
                    if (params.insts.current.events){
                        params.events=params.insts.current.events
                    }
                    if (params.insts.current.states){
                        params.states=params.insts.current.states
                    }
                    if (params.insts.current.vars){
                        params.vars=params.insts.current.vars
                    }
                    if (params.insts.current.Fn){
                        params.Fn=params.insts.current.Fn
                    }

                    if (params.insts.current.ignoreSpecialProps){
                        params.ignoreSpecialProps=params.insts.current.ignoreSpecialProps
                    }
                }
            }

            if (true){
                if (params.extra.events){
                    params.events=params.extra.events
                }
                if (params.extra.states){
                    params.states=params.extra.states
                }
                if (params.extra.vars){
                    params.vars=params.extra.vars
                }
                if (params.extra.Fn){
                    params.Fn=params.extra.Fn
                }

                if (params.extra.ignoreSpecialProps){
                    params.ignoreSpecialProps=params.extra.ignoreSpecialProps
                }
            }


            


        }

        if (args[0].ignoreSpecialProps){
            params.ignoreSpecialProps=args[0].ignoreSpecialProps
        }
    }

    if (params.key===""){
        params.key=uuidv4()
    }

    let tmp=""

    let ignore_special_props={ // custom handled properties , dont auto handle
        "style" : "",
    }

    ignore_special_props={...ignore_special_props,...params.ignoreSpecialProps};

    if (params.insts.current){
        if (params.insts.current.all){
            if (params.insts.current.all[params.name]){
                if (params.insts.current.all[params.name].properties){

                    // --------- end props -----------------

                        if (true){ // auto_handle properties   
                            let useAssetSource=false;
                            
                            for (let p in params.insts.current.all[params.name].properties){
                                if (ignore_special_props[p]){}else{
                                    let r=params.insts.current.all[params.name].properties;
                                    params.props[p]=r[p]
                                }
                            }
                        }

                        
                        if (true){ // styles  
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

                        if (false){ // value  
                            let useAssetSource=false;
                            
                            tmp="value"

                            if (params.insts.current.all[params.name].properties[tmp]){
                                params.props[tmp]=params.insts.current.all[params.name].properties[tmp]
                            }else{
                                useAssetSource=true;
                            }

                            // use asset source
                            if (useAssetSource){
                                if (params.insts.current.all[params.name].assetSource){
                                    let assetSource=params.insts.current.all[params.name].assetSource
                                    if (params.insts.current.all[assetSource]){
                                        if (params.insts.current.all[assetSource].properties){
                                            if (params.insts.current.all[assetSource].properties[tmp]){
                                                params.props[tmp]=params.insts.current.all[assetSource].properties[tmp];
                                            }
                                        }
                                    }
                                }
                            }
                        }


                    // --------- end props -----------------
                }
                if (params.insts.current.all[params.name].states){
                    if (true){ // auto_handle states per ele   
                        let useAssetSource=false;
                        
                        for (let p in params.insts.current.all[params.name].states){
                            //if (ignore_special_props[p]){}else{
                                let r=params.insts.current.all[params.name].states;
                                params.statesProps[p]=r[p]
                            //}
                        }
                    }
                }
                if (params.insts.current.all[params.name].events){
                    if (true){ // auto_handle events per ele   
                        let useAssetSource=false;
                        
                        for (let p in params.insts.current.all[params.name].events){
                            //if (ignore_special_props[p]){}else{
                                let r=params.insts.current.all[params.name].events;
                                params.eventsProps[p]=r[p]
                            //}
                        }
                    }
                }
                if (params.insts.current.all[params.name].Fn){
                    if (true){ // auto_handle functions per ele   
                        let useAssetSource=false;
                        
                        for (let p in params.insts.current.all[params.name].Fn){
                            //if (ignore_special_props[p]){}else{
                                let r=params.insts.current.all[params.name].Fn;
                                params.FnLocal[p]=r[p]
                            //}
                        }
                    }
                }
                if (params.insts.current.all[params.name].FnProps){
                    if (true){ // auto_handle functions per ele   
                        let useAssetSource=false;                        
                  
                        for (let p in params.insts.current.all[params.name].FnProps){
                            //if (ignore_special_props[p]){}else{
                                let r=params.insts.current.all[params.name].FnProps;
                                params.FnProps[p]=r[p]
                            //}
                        }
                
                        
                    }
                }
                
                if (params.insts.current.all[params.name].vars){
                    if (true){ // auto_handle vars per ele   
                        let useAssetSource=false;
                        
                        for (let p in params.insts.current.all[params.name].vars){
                            //if (ignore_special_props[p]){}else{
                                let r=params.insts.current.all[params.name].vars;
                                params.varsProps[p]=r[p]
                            //}
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
                    
                    let tmp="";
                    let tmpO={
                        value : "",
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <input
                            value={tmpO["value"]}
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

                    let tmp="";
                    let tmpO={
                        value : "",
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
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

                    let tmp="";
                    let tmpO={
                        value : "",
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <textarea
                            value={tmpO["value"]}
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

                    let tmp="";
                    let tmpO={
                        value : "",
                        changeLayout : ()=>{}
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }

                    // ---- events -----
                    //tmp="changeLayout";                    
                    //if (params.events[tmp]!==undefined){
                    //    tmpO[tmp]=params.events[tmp];
                    //}

                    let fnAssign=(tmp,event)=>{
                        
                        if (params.Fn[tmp]!==undefined){ // global functions
                            let fn=()=>{}
                            if ( params.Fn[tmp].type==="fn" ){
                                fn=params.Fn[tmp].fn
                            }
                            if ( params.Fn[tmp].type==="ref" ){
                                fn=params.Fn[tmp].fn.current
                            }
                            if(true){
                                if (params.FnProps){
                                    tmpO[tmp]=(e)=>{ 
                                        fn.apply(this,params.FnProps ) 
                                    }
                                }else{
                                    tmpO[tmp]=(e)=>{ 
                                        fn() 
                                    }
                                }
                                
                            }

                            prps[event]=tmpO[tmp];

                            //params.Fn[tmp];
                        }
                    }
                    let fnLocalAssign=(tmp,event,paramsIn)=>{
                        let fnLocalGlob="FnLocal";

                        let lParams={}
                        if (paramsIn){
                            lParams={...lParams,...paramsIn}
                        }


                        let fnExists=false;
                        let useGlobalFn=false;
                        if (fnLocalGlob==="FnLocal"){
                            if (params[fnLocalGlob][tmp]!==undefined){
                                fnExists=true
                            }else{
                                if (params["Fn"][tmp]!==undefined){
                                    useGlobalFn=true
                                    fnLocalGlob="Fn"
                                    fnExists=true
                                }
                            }
                        }else{
                            useGlobalFn=true
                            if (params[fnLocalGlob][tmp]!==undefined){ 
                                fnExists=true
                            }
                        }

                        if (fnExists){ // global functions
                            let fn=()=>{}
                            
                            if ( params[fnLocalGlob][tmp].type==="fn" ){
                                //if (useGlobalFn){
                                    fn=params[fnLocalGlob][tmp].fn
                                //}else{

                                //}
                            }
                            if ( params[fnLocalGlob][tmp].type==="ref" ){
                                fn=params[fnLocalGlob][tmp].fn.current
                            }
                            if(true){
                                if (params.FnProps){
                                    

                                    if (params.FnProps[event]){
                                        let nprops=[undefined,undefined,undefined,undefined,undefined,undefined]
                                        if (params.FnProps[event][1]){
                                                nprops[0]=params.FnProps[event][1].val
                                            if (params.FnProps[event][2]){
                                                nprops[1]=params.FnProps[event][2].val

                                                if (params.FnProps[event][3]){
                                                    nprops[2]=params.FnProps[event][3].val

                                                    if (params.FnProps[event][4]){
                                                        nprops[3]=params.FnProps[event][4].val

                                                        if (params.FnProps[event][5]){
                                                            nprops[4]=params.FnProps[event][5].val

                                                            if (params.FnProps[event][6]){
                                                                nprops[5]=params.FnProps[event][6].val
                                                                
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        tmpO[tmp]=(e)=>{ 
                                            fn.apply(this,nprops ) 
                                        }
                                    }else{
                                        tmpO[tmp]=(e)=>{ 
                                            fn() 
                                        }
                                    }
                                }else{
                                    tmpO[tmp]=(e)=>{ 
                                        fn() 
                                    }
                                }
                                
                            }

                            prps[event]=tmpO[tmp];

                            //params.Fn[tmp];
                        }
                    }

                    tmp="changeLayout";                    
                    //fnAssign(tmp);

                    tmp="alert";                    
                    //fnAssign(tmp,"onClick");
                    
                    if (params.FnLocal){

                        if (params.FnLocal["onClick"]){
                            tmp="onClick";    
                            fnLocalAssign(params.FnLocal["onClick"],"onClick");
                        }

                    
                        tmp="changeLayout";                    
                        if (params.FnLocal[tmp]!==undefined){ // for dynamicly assigning functions via inputs <-- .Fn parsed from individual instanced item
                            //params.FnProps[tmp]
                            //params.FnProps[tmp];
                        }
                    }
                    //tmp="name";                    
                    
                    
                   
                    return (               
                        <button
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</button>
                              
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
                    }

                    let tmp="";
                    let tmpO={
                        value : "",
                    }

                    tmp="src";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }                    
                   
                    return (               
                        <img
                            src={tmpO["src"]}
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
         

                    let tmp="";
                    let tmpO={
                        value : "",
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <p
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</p>
                              
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
                   

                    let tmp="";
                    let tmpO={
                        value : "",
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <pre
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</pre>
                              
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

                    let tmp="";
                    let tmpO={
                        value : "",
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <span
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</span>
                              
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
                   
                    let tmp="";
                    let tmpO={
                        value : ""
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }

                    return (               
                        <h1
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</h1>
                              
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
                   
                    let tmp="";
                    let tmpO={
                        value : ""
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }


                    return (               
                        <h2
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</h2>
                              
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
                   

                    let tmp="";
                    let tmpO={
                        value : ""
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <h3
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</h3>
                              
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

                    let tmp="";
                    let tmpO={
                        value : ""
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <h4
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</h4>
                              
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

                    let tmp="";
                    let tmpO={
                        value : ""
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <li
                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</li>
                              
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

                    let tmp="";
                    let tmpO={
                        value : "",
                    }

                    tmp="value";                    
                    if (params.props[tmp]!==undefined){
                        tmpO[tmp]=params.props[tmp];
                    }

                    tmp="href";                    
                    if (params.props[tmp]!==undefined){
                        prps[tmp]=params.props[tmp];
                    }

                    tmp="target";                    
                    if (params.props[tmp]!==undefined){
                        prps[tmp]=params.props[tmp];
                    }
                    tmp="download";                    
                    if (params.props[tmp]!==undefined){
                        prps[tmp]=params.props[tmp];
                    }

                    
                   
                    return (               
                        <a
                            href={tmpO["href"]}

                            key={params.key}
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            {...prps}
                            
                        >{tmpO["value"]}</a>
                              
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

                    let tmp="";
                    let tmpO={
                        
                    }

                    tmp="src";                    
                    if (params.props[tmp]!==undefined){
                        prps[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <audio
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
         
        layoutname="video";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={}

                    let tmp="";
                    let tmpO={
                        
                    }

                    tmp="src";                    
                    if (params.props[tmp]!==undefined){
                        prps[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <video
                        
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
        

        layoutname="iframe";
        layoutposContsO[layoutname]={
            name : layoutname,            
            e : (...args)=>{
                    let params={}
                    parseAssetsParamsFn(params, args);

                    let prps={}

                    let tmp="";
                    let tmpO={
                        
                    }

                    tmp="src";                    
                    if (params.props[tmp]!==undefined){
                        prps[tmp]=params.props[tmp];
                    }
                   
                    return (               
                        <iframe
                            style={{...{                                
                                position : "relative",                                
                            },...params.style}}

                            key={params.key}   
                            {...prps}                         
                        />
                              
                )
            }

        };  
        retArr.push(layoutposContsO[layoutname])
        

    }

    return retArr;
}