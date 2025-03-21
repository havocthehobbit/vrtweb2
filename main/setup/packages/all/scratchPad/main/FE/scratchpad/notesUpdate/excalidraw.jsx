import { useState,useEffect,useRef,useContext ,Context , lazy,Component, Suspense , useMemo , forwardRef } from "react"
import { Excalidraw  ,
    exportToCanvas,
    exportToSvg,
    exportToBlob,
    serializeAsJSON,
    exportToClipboard,    
    useHandleLibrary,
    MIME_TYPES,
    sceneCoordsToViewportCoords,
    viewportCoordsToSceneCoords,
    restoreElements,
    LiveCollaborationTrigger,
    MainMenu,
    Footer,
    Sidebar,
} from "@excalidraw/excalidraw";



import "./excalidraw.css";

const resolvablePromise = () => {
    let resolve;
    let reject;
    const promise = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    promise.resolve = resolve;
    promise.reject = reject;
    return promise;
}

export const ExcaliDrawBase=(props ,excalidrawAPIRefIn)=>{
    let initC=useRef(true);

    let [upd,setUpd]=useState(new Date())
    let [theme,setTheme]=useState("dark")
    
    //const appRef = useRef(null);
    let excalidrawAPIRef = useRef(null);
    if (excalidrawAPIRefIn){
        excalidrawAPIRef = excalidrawAPIRefIn;
    }else{
        excalidrawAPIRef = useRef(null);
    }

    let [data,setData]=useState([])


    
    /*
        refs 
            https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/props/excalidraw-api
            https://codesandbox.io/p/sandbox/excalidraw-ehlz3?file=%2Fsrc%2FApp.tsx%3A3%2C3-16%2C10

            egs
                https://codesandbox.io/p/sandbox/excalidraw-ehlz3

    */

    /* #tools  - API --> excalidrawAPI --> refFN - .setActiveTool { type : "line" , ; locked : false }
        
        'selection',
        'rectangle'
        'diamond',
        'ellipse',
        'arrow',
        'line',
        'draw',
        'text',
        'image',
        'frame',
        'embeddable',
        'laser',
        'mermaid',

    */
    /* API --> excalidrawAPI --> refFN
        
        args[0]
        ... https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/props/excalidraw-api
        addFiles  :  event => {…}
        getAppState  :  () => this.state
        getFiles  :  () => this.files
        getSceneElements  :  () => {…}
        getSceneElementsIncludingDeleted :  () => {…}
        history: {clear: ƒ}
        id : "WQVSkzTIp7ri9Y7Nk15RJ"
        onChange :  cb => this.onChangeEmitter.on(cb)
        onPointerDown :  cb => this.onPointerDownEmitter.on(cb)
        onPointerUp : cb => this.onPointerUpEmitter.on(cb)
        refresh : () => {…}
        resetCursor:  () => {…}
        resetScene :  event => {…}
        scrollToContent: (target = this.scene.getNonDeletedElements(), opts) => {…}
        setActiveTool: tool => {…}
        setCursor: cursor => {…}
        setToast: toast => {…}
        toggleSidebar: ({ name, tab, force }) => {…}
        updateFrameRenderin:  opts => {…}
        updateLibrary: ({ libraryItems, prompt = false, merge = false, openLibraryMenu = false, defaultStatus = "unpublished" }) => {…}
        updateScene
    */

    //const excalidrawRef = React.useRef(null);

    
    /*
    const excalidrawRef = useMemo(
        () => ({
          current: {
            readyPromise: resolvablePromise()
          }
        }),
        []
    );

    useEffect(() => {
        excalidrawRef.current.readyPromise.then((api) => {
            console.log("loaded", api);
        });
    }, [excalidrawRef]);
    */
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
    useHandleLibrary({ excalidrawAPI });


    if (props.extras){
        if (typeof(props.extras)==="function"){
            props.extras({
                exportToCanvas,
                exportToSvg,
                exportToBlob,
                serializeAsJSON,
                exportToClipboard,    
                useHandleLibrary,
                MIME_TYPES,
                sceneCoordsToViewportCoords,
                viewportCoordsToSceneCoords,
                restoreElements,
                LiveCollaborationTrigger,
                MainMenu,
                Footer,
                Sidebar,
            })
        }
    }

    useEffect(()=>{
        if (props.data!==undefined){
            //if (typeof(props.data)==="string"){
            //    let propdatastr=
            //}
            if (props.data.elements){            
                if ( excalidrawAPIRef.current){
                    let ndata={};
                    if (props.data.elements){
                        ndata.elements=props.data.elements;
                    }
                    if (props.data.appState){
                        //ndata.appState=props.data.appState;
                    }
                    if (props.data.files){
                        ndata.files=props.data.files;
                    }

                    excalidrawAPIRef.current.updateScene(ndata);

                    //excalidrawAPIRef.current.updateScene({             
                    //    elements  : props.data.elements,
                    //    //appState : {  viewBackgroundColor: "#edf2ff" },
                    //    // files : []
                    //});
                   
                } 
            }else{
                if (Array.isArray(props.data)){
                    excalidrawAPIRef.current.updateScene({             
                        elements  : props.data,
                        //appState : {  viewBackgroundColor: "#edf2ff" },
                        // files : []
                    });
                }
            }
            
            if (props.data.files){            
                if (isEmpty(props.data.files)===false){
                    let existingFiles=props.data.files;
                    if ( excalidrawAPIRef.current){                        
                        let binconv2=async()=>{
                            /*
                            for (const [fileId, blob] of Object.entries(props.data.files)) {
                                // Example: Update file content (here, we just keep the original)
                                const updatedBlob = new Blob([await blob.text()], { type: blob.type });

                                // Example: Add a suffix to the file ID
                                updatedFiles[`${fileId}-updated`] = updatedBlob;
                            }
                            */

                            const updatedFiles = {};
                            Object.entries(existingFiles).forEach(([fileId, file]) => {
                                const { mimeType, dataURL } = file;

                                // Decode dataURL to a Blob
                                const byteString = atob(dataURL.split(",")[1]); // Extract base64 content
                                const arrayBuffer = new Uint8Array(byteString.length);
                                for (let i = 0; i < byteString.length; i++) {
                                arrayBuffer[i] = byteString.charCodeAt(i);
                                }
                                const blob = new Blob([arrayBuffer], { type: mimeType });

                                // Add the Blob to the updated files object
                                updatedFiles[`${fileId}-updated`] = blob;
                            });
                            
                            excalidrawAPIRef.current.addFiles(updatedFiles);

                            //for (let p in props.data.files){                                
                                //excalidrawAPIRef.current.addFiles(props.data.files[p])
                            //}
                        };
                        let binconv=async()=>{

                        };

                        binconv();
                    } 
                }
            }
        }
    }
    ,[props.data]);

    useEffect(()=>{
        if (data!==undefined){            
            if ( excalidrawAPIRef.current){
                if (data.elements){            
                    if ( excalidrawAPIRef.current){

                        if (true){
                            
                            let ndata={};
                            if (data.elements){
                                ndata.elements=data.elements;
                            }
                            if (data.appState){
                                //ndata.appState=props.data.appState;
                            }
                            if (data.files){
                                let nfiles={};
                                let currFilesTmp=excalidrawAPIRef.current.getFiles();
                                for (let p in data.files){
                                    if (currFilesTmp[p]!==undefined){}else{

                                        excalidrawAPIRef.current.addFiles([ data.files[p] ])// arrays add
                                    }
                                }


                                //ndata.files=nfiles; // data.files;
                            }

                            excalidrawAPIRef.current.updateScene(ndata);
                        }
                    } 
                }else{
                    if (Array.isArray(data)){
                        excalidrawAPIRef.current.updateScene({             
                            elements  : data,
                            //appState : {  viewBackgroundColor: "#edf2ff" },
                            // files : []
                        });
                    }
                }                
            }            
        }
    },[data]);

    useEffect(() => {
        if (!excalidrawAPI) {
          return;
        }
        // Fetch image and add it to Excalidraw
    }, [excalidrawAPI]);

    useEffect(()=>{
    //if (initC.current){
        initC.current=false
        const toolbarElement = excalidrawAPIRef.current?.containerElement?.querySelector('.excalidraw-toolbar');
        if (toolbarElement) {
            toolbarElement.addEventListener('click', (e) => console.log('Toolbar clicked', e));
        }
    //}
    
    },[]);

    let refFN=()=>{}
    if (props.refFN){
        //props.refFN(excalidrawRef,appRef )
        //props.refFN(appRef )
        refFN=(...args)=>{
            props.refFN(args[0] , excalidrawAPIRef.current )
        }
        
    }

    let propsC={
        UIOptions : {
            canvasActions: {
                changeViewBackgroundColor: true,
                clearCanvas: true,
                //export: true,
                loadScene: true,
                saveScene: true,
                theme: true,
              },
        },
        user : { name: "Excalidraw User" },
        theme : theme,
        initialData : {
            elements: [
            {
                type: "rectangle",
                version: 141,
                versionNonce: 361174001,
                isDeleted: false,
                id: "oDVXy8D6rom3H1-LLH2-f",
                fillStyle: "hachure",
                strokeWidth: 1,
                strokeStyle: "solid",
                roughness: 1,
                opacity: 100,
                angle: 0,
                x: 100.50390625,
                y: 93.67578125,
                strokeColor: "#000000",
                backgroundColor: "transparent",
                width: 186.47265625,
                height: 141.9765625,
                seed: 1968410350,
                groupIds: [],
            },
            ],
            appState: { 
                //zenModeEnabled: true, 
                viewBackgroundColor: "#a5d8ff" 
            },
                scrollToContent: true
        },
        renderTopRightUI : () => {
            return (
            <button
                style={{
                    background: "#70b1ec",                                                    
                    color: "#fff",
                    width: "max-content",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius : 5
                }}
                onClick={() =>{ 
                    //window.alert("This is dummy top right UI");
                    console.log("excalidrawAPIRef" , excalidrawAPIRef)
                    excalidrawAPIRef.current.setActiveTool({ type : "line", locked : false})
                }}
            >
                line
            </button>
            );
        },
    }

    let options={ zenModeEnabled: true };
    if (props.options){
        options={...options, ...props.options};
    }
    if (props.optionsOverride){
        options={...props.optionsOverride};
    }
    if (props.viewModeEnabled){
        propsC.viewModeEnabled=props.viewModeEnabled;
    }
    if (props.propsC){
        propsC={...propsC,...props.propsC };
    }
    if (props.propsCOverride){
        propsC=props.propsCOverride;
    }


    //console.log("excalidrawAPI" ,excalidrawAPI)
    return (
        <div>          
            <div style={{
                    height: 700,
                    pointerEvents : "auto"


                }}
                //ref={appRef}
            >                       
                    <Excalidraw 
                        // new 2024 Nov
                           //onPointerUpdate={(payload) => setPointerData(payload)}
                           //onPointerUpdate={(payload) => console.log(payload) }
                        //

                        //ref={appRef}
                        //ref={excalidrawRef} 
                              
                        //#todo - take note of bellow line comment
                        //ref={(api) => setExcalidrawAPI(api)} //#todo - this ref causes a forward ref error and is not needed for the moment , so commented out 

                        {...propsC}

                        excalidrawAPI={(...args)=>{
                            //console.log("excalidrawAPI 0 ... " , args[0]);
                            excalidrawAPIRef.current=args[0];
                            //console.log("ExcalidrawImperativeAPI" , ExcalidrawImperativeAPI)
                            
                            let tmpData=[]
                            if (props.data){
                                tmpData=props.data;
                            }


                            refFN(args[0]);
                            setUpd(new Date());
                            setTimeout(()=>{
                                setData(tmpData)
                            },2000)
                            
                             
                        }}
                        
                        //initialData={initialData}
                        
                        options={options}
                        //onPointerDown={(e) => console.log("Pointer down", e)}
                        /*
                        onPointerDown={
                            (...args)=>{
                                //console.log("onPointerDown : ",args)
                            }
                        }
                        */
                        //</div>onChange={(elements, state) =>{
                            //console.log("Elements :", elements, "State : ", state , new Date()) // broken takes effect for every mouse movement 

                            // implement a save 
                            //excalidrawAPIRef.current.getSceneElements((...args)=>{console.log(args[0]) ; })
                            //

                            //implement a load 
                            // to load update scene with api.updateScene( { elements : [] , appState: { viewBackgroundColor: "#edf2ff"}  }  ) // note you can see other things that can go into upstate by calling .getAppState

                        //}}

                        /*
                        initialData={{
                            elements: [
                            {
                                type: "rectangle",
                                version: 141,
                                versionNonce: 361174001,
                                isDeleted: false,
                                id: "oDVXy8D6rom3H1-LLH2-f",
                                fillStyle: "hachure",
                                strokeWidth: 1,
                                strokeStyle: "solid",
                                roughness: 1,
                                opacity: 100,
                                angle: 0,
                                x: 100.50390625,
                                y: 93.67578125,
                                strokeColor: "#000000",
                                backgroundColor: "transparent",
                                width: 186.47265625,
                                height: 141.9765625,
                                seed: 1968410350,
                                groupIds: [],
                            },
                            ],
                            appState: { 
                                //zenModeEnabled: true, 
                                viewBackgroundColor: "#a5d8ff" 
                            },
                                scrollToContent: true
                        }}
                        */

                        //onPointerDown={(e) => {
                        //    e.preventDefault();
                        //}} 
                        //viewModeEnabled={true}
                        
                        // class for toolbar
                        //Island App-toolbar App-toolbar--mobile

                        //works                                        
                        /*
                        renderTopRightUI={() => {
                            return (
                            <button
                                style={{
                                    background: "#70b1ec",                                                    
                                    color: "#fff",
                                    width: "max-content",
                                    fontWeight: "bold",
                                    border: "none",
                                    borderRadius : 5
                                }}
                                onClick={() =>{ 
                                    //window.alert("This is dummy top right UI");
                                    console.log("excalidrawAPIRef" , excalidrawAPIRef)
                                    excalidrawAPIRef.current.setActiveTool({ type : "line", locked : false})
                                }}
                            >
                                line
                            </button>
                            );
                        }} */
                        
                    >
                       { /*
                         <MainMenu/> 
                        */}
                       { /*
                        <Sidebar/>
                        */}
                    </Excalidraw>
                    
            </div>

        </div>
    )


}

export const ExcaliDraw=forwardRef(ExcaliDrawBase)

function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
}

export const ExDraw=(props)=>{


    const appRef = useRef(null);
    //const excalidrawRef = React.useRef(null);

    
    /*
    const excalidrawRef = useMemo(
        () => ({
          current: {
            readyPromise: resolvablePromise()
          }
        }),
        []
    );

    useEffect(() => {
        excalidrawRef.current.readyPromise.then((api) => {
            console.log("loaded", api);
        });
    }, [excalidrawRef]);
    */
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
    useHandleLibrary({ excalidrawAPI });


    useEffect(() => {
        if (!excalidrawAPI) {
          return;
        }
        // Fetch image and add it to Excalidraw
      }, [excalidrawAPI]);

    if (props.refFN){
        //props.refFN(excalidrawRef,appRef )
        //props.refFN(appRef )
        props.refFN(excalidrawAPI )
    }
    //console.log("excalidrawAPI" ,excalidrawAPI)
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
                            <div style={{ height: 500 }}
                                //ref={appRef}
                            >
                                    <Excalidraw 
                                        //ref={appRef}
                                        //ref={excalidrawRef}
                                        ref={(api) => setExcalidrawAPI(api)}
                                        
                                        //initialData={initialData}
                                        user={{ name: "Excalidraw User" }}
                                        options={{ zenModeEnabled: true }}
                                        onPointerDown={
                                            (...args)=>{
                                                console.log("args : ",args)
                                            }
                                        }
                                        onChange={(elements, state) =>{
                                            //console.log("Elements :", elements, "State : ", state)
                                        }}

                                        initialData={{
                                            elements: [
                                            {
                                                type: "rectangle",
                                                version: 141,
                                                versionNonce: 361174001,
                                                isDeleted: false,
                                                id: "oDVXy8D6rom3H1-LLH2-f",
                                                fillStyle: "hachure",
                                                strokeWidth: 1,
                                                strokeStyle: "solid",
                                                roughness: 1,
                                                opacity: 100,
                                                angle: 0,
                                                x: 100.50390625,
                                                y: 93.67578125,
                                                strokeColor: "#000000",
                                                backgroundColor: "transparent",
                                                width: 186.47265625,
                                                height: 141.9765625,
                                                seed: 1968410350,
                                                groupIds: [],
                                            },
                                            ],
                                            appState: { zenModeEnabled: true, viewBackgroundColor: "#a5d8ff" },
                                            scrollToContent: true
                                        }}
                                        //onPointerDown={(e) => {
                                        //    e.preventDefault();
                                        //}} 
                                        //viewModeEnabled={true}
                                        /*
                                        //works
                                        renderTopRightUI={() => {
                                            return (
                                            <button
                                                style={{
                                                background: "#70b1ec",
                                                border: "none",
                                                color: "#fff",
                                                width: "max-content",
                                                fontWeight: "bold",
                                                }}
                                                onClick={() => window.alert("This is dummy top right UI")}
                                            >
                                                Click me
                                            </button>
                                            );
                                        }} */
                                        UIOptions={{
                                            canvasActions: { loadScene: false }
                                        }}
                                    />
                            </div>

        </div>
    )

}

export default ExDraw;