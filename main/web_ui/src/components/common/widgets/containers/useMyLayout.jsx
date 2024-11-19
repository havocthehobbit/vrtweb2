import { useState,useEffect,useRef} from "react";
import { useWindowSize } from "../../../common/widgets/containers/useWindowSize";


/* // usage useMyLayout

    * 1.) import custom hook
    ```jsx
        import { useMyLayout } from "../../../../common/widgets/containers/useMyLaout";
        import { useWindowSize } from "../../../../common/widgets/containers/useWindowSize";
    ```

    * 2.1) in component , create reference to change view state function , which you can use anywhere in your own component program to change the view
    ```jsx
        let setCurrStateRef=useRef(()=>{});
        
        let {wWidth,wHeight}=useWindowSize()

    ```

    * 2.2) create container and view variables
    ```jsx
        let posContsStates={};
        let posContsO={};
        let name="";


        // *** optional styling , you could just style in dividual menu inline
        let menuStyle={
            background : "white",
            position : "relative",
            display : "inline-block",
            width : 100,
            height : 300,
            borderRadius : 8,
            margin : 5,
            padding : 5,       
            overflow : "hidden", 
        };
    ```

    * 2.3) in component  , setup components assets, in this exampe we setup a menu component to access 2 views ( mainView & settingsView), then we add 3 components , but all other sub components that could be used in these views and any other will go here 
    ```jsx
        name="menu";
        posContsO[name]={
            name : name,            
            e : (
                    <div
                        key={name}
                        style={menuStyle}
                    >
                        <h4>menu</h4>                             
                        
                        <div
                            menuname={"viewMain"}
                            style={{
                                position : "relative",
                                display : "inline-block",
                                cursor : "pointer",
                            }}
                            onClick={(e)=>{
                                let menuname=e.target.getAttribute("menuname");
                                setCurrStateRef.current(menuname)
                            }}
                        >
                            <label
                                menuname={"viewMain"}
                            >Main</label>                            
                        </div>           
                        <div
                            menuname={"editSettings"}
                            style={{
                                position : "relative",
                                display : "inline-block",
                                cursor : "pointer",
                            }}
                            onClick={(e)=>{
                                let menuname=e.target.getAttribute("menuname");
                                setCurrStateRef.current(menuname)
                            }}
                        >
                            <label
                                menuname={"editSettings"}
                            >Settings</label>                            
                        </div>           

                    </div>
            ),
        };

        name="Main";
        posContsO[name]={
            name : name,            
            e : (                  
                    <div
                        key={name}
                        style={{
                            background : "white",
                            position : "relative",
                            display : "inline-block",
                            width : 400,
                            height : 300,
                            borderRadius : 8,
                            margin : 5,
                            padding : 5,
                            overflow : "hidden"
                        }}
                    >
                        <h4>Main</h4>                
                    </div>
            )

        };


        name="Settings";
        posContsO[name]={
            name : name,            
            e : (                  
                    <div
                        key={name}
                        style={{
                            background : "white",
                            position : "relative",
                            display : "inline-block",
                            width : 400,
                            height : 300,
                            borderRadius : 8,
                            margin : 5,
                            padding : 5,
                            overflow : "hidden"
                        }}
                    >
                        <h4>Settings</h4>                
                    </div>
            )
        };

        name="title";
        posContsO[name]={
            name : name,            
            e : (                  
                    <div
                        key={name}
                        style={{
                            background : "white",
                            position : "relative",
                            display : "inline-block",
                            width : 300,
                            height : 90,
                            borderRadius : 8,
                            margin : 5,
                            padding : 5,
                            overflow : "hidden"
                        }}
                    >
                        <h4>my title</h4>                
                    </div>
            )

        };

        name="linebreak1";
        posContsO[name]={
            name : name,            
            e : (<br key={name} />),
        };  


    ```
    
    * 2.3) in component  , setup views , that we can switch between , that will have different our previous assets of reusable components arranged how we want , note in the posCont, we can arrange the layour of our assets , and use eLogic , to make realtime changes based on any logic 
    ```jsx
        name="viewMain";
        posContsStates[name]={
            name : name,
            posCont : [ "title" , "linebreak1" , "menu" ],            
            eLogic : function(){
                let tt=this;
                let args=arguments;
                if (args.length > 0){
                    tt=args[0]
                }
                let ret=tt.posCont
                if (wWidth < 700){
                    ret=[ "menu" , "linebreak1" ,"Main"  ] // removed title based on screensize
                }
                return ret
            }
        }

        name="editSettings";
        posContsStates[name]={
            name : name,
            posCont : [ "title","menu"  ],            
            eLogic : function(){
                let tt=this;
                let args=arguments;
                if (args.length > 0){
                    tt=args[0]
                }
                let ret=tt.posCont
                if (wWidth < 700){
                    //ret=[ "menu" , "linebreak1" , "Settings"  ]
                }
                return ret
            }
        }
    ```

    ```jsx
    ```

    ```jsx
    ```

    * use custom chook to get cariables and component needed to render lout view views
    ```jsx
        let { myLayout,currState ,setCurrState  }=useMyLayout({ posContsStates, posContsO , allState , currStateDef : "viewSummary" })
        setCurrStateRef.current=setCurrState;
    ```

    ```jsx

        <div
            style={style}
        >
            {myLayout }
        </div>

    ```

*/
export const useMyLayout=(props)=>{
    let ret={}
    let allState={

    }
    if (props.allState){
        allState=props.allState
    }   
    let extra={}
    if (props.extra){
        extra=props.extra
    }

    let currStateDef=""
    if (props.currStateDef){
        currStateDef=props.currStateDef
    }    

    let [currState,setCurrState]=useState(currStateDef)
    let initC=useRef(true)

    let {wWidth,wHeight}=useWindowSize()

    // ====================================================================
    
        useEffect(()=>{
            if (initC.current){
                initC.current=false;
                
            }
        },[])

        useEffect(()=>{
            if (props.currState){
                if (typeof(props.currState)==="string"){
                    setCurrState(props.currState)
                }
            }
        },[props.currState])


     // ====================================================================

       let style={
            position : "relative",
            top : 80,
            margin : 20
        }
        if (props.style){
            style={...style,...props.style}
        }

    // ====================================================================
        // components

        let posConts=[]
        let posContsStates={};
        let posContsO={};
        let name="";
        
        /*  //cant have multiple components that can be children of views
            name="menu";
            posContsO[name]={
                name : name,
                seq : 2,
                e : (
                        <div
                            key={name}
                            style={menuStyle}
                        >
                            <h4>menu</h4>                            
                                   
                            <div
                                menuname={"viewSummary"}
                                style={{
                                    position : "relative",
                                    display : "inline-block",
                                    cursor : "pointer",
                                }}
                                onClick={(e)=>{
                                    let menuname=e.target.getAttribute("menuname");
                                    setCurrState(menuname)
                                }}
                            >
                                <label
                                    menuname={"viewSummary"}
                                >Summary</label>                            
                            </div>           
                            <div
                                menuname={"editSettings"}
                                style={{
                                    position : "relative",
                                    display : "inline-block",
                                    cursor : "pointer",
                                }}
                                onClick={(e)=>{
                                    let menuname=e.target.getAttribute("menuname");
                                    setCurrState(menuname)
                                }}
                            >
                                <label
                                    menuname={"editSettings"}
                                >Settings</label>                            
                            </div>           

                        </div>
                ),
            };


            name="title";
            posContsO[name]={        
                name : name,
                seq : 1,
                e : (                    
                        <div
                            key={name}
                            style={{
                                //background : "white",
                                background : "white",
                                position : "relative",
                                display : "inline-block",
                                width : 300,                 
                                height : 25,
                                borderRadius : 8,
                                overflow : "hidden",
                            }}
                        >
                            <h3
                                style={{
                                    margin : 0, padding : 0,
                                    display : "inline-block",
                                }}
                            >title</h3>                     

                            {wWidth + " x " + wHeight}

                        </div>
                        
                ),
            };
        */


        if (props.posContsO){
            for (let p in props.posContsO){
                if ( props.posContsO[p] ){
                    posContsO[p]=props.posContsO[p];
                }
            }
        }

    // ====================================================================
        // views
        
        /* // can have multiple views that are changed by --> setCurrState(viewName)
            name="viewSummary";
            posContsStates[name]={
                name : name,
                posCont : [ "title" , "linebreak1" , "menu" , "summary"  ],
                //eLogic : (...args)=>{
                eLogic : function(){
                    let tt=this;
                    let args=arguments;
                    if (args.length > 0){
                        tt=args[0]
                    }
                    let ret=tt.posCont
                    if (wWidth < 700){
                        ret=[ "menu" , "summary"  ]
                    }
                    return ret
                }
            }

            name="editSettings";
            posContsStates[name]={
                name : name,
                posCont : [ "title","menu"  ],
                //eLogic : (...args)=>{
                eLogic : function(){
                    let tt=this;
                    let args=arguments;
                    if (args.length > 0){
                        tt=args[0]
                    }
                    let ret=tt.posCont
                    if (wWidth < 700){
                        //ret=[ "menu" , "summary"  ]
                    }
                    return ret
                }
            }

        */

        if (props.posContsStates){
            for (let p in props.posContsStates){
                if (props.posContsStates[p]){
                    posContsStates[p]=props.posContsStates[p];
                }
            }
        }

    
    // ====================================================================
    
        /*

            name="viewSummary";
            posContsStates[name]={
                name : name,
                posCont : [ "title" , "linebreak1" , "menu" , "summary"],
                //eLogic : (...args)=>{
                eLogic : function(){
                    let tt=this;
                    let args=arguments;
                    if (args.length > 0){
                        tt=args[0]
                    }
                    let ret=tt.posCont
                    if (wWidth < 700){
                        ret=[ "menu" , "summary"  ]
                    }
                    return ret
                }
            }

        */


        let getPosContE=(posContsStateName)=>{
            let ret=[];
            if (posContsStates[posContsStateName]){
                ret=posContsStates[posContsStateName].eLogic();            
            }
            
            return ret;
        }
    
    // ====================================================================
    
        let posContsE
        if (true){        
            posContsE=(()=>{
                let arrE=[]
            
                posConts= getPosContE(currState);           

                
                //posConts[]

                posConts.forEach((r,i)=>{
                    if (posContsO[r]){
                        let E;   
                        if (typeof(posContsO[r].e)==="function"){
                            E=posContsO[r].e({ name : r , extra : extra });
                        }else{
                            E=posContsO[r].e;
                        }                 

                        arrE.push(E);
                    }
                })

                return (<>{arrE}</>)
            })();
        }
    
    // ====================================================================
    
        let retE=(
            <
                //style={style}
            >
                {posContsE}
            </>
        )
    
    // ====================================================================

    let retDef={
        e : retE , myLayout : retE, posContsE , currState ,setCurrState,
    }
    
    for (let p in retDef){
        ret[p]=retDef[p]
    }
    
    //ret. = ;

    return ret
}