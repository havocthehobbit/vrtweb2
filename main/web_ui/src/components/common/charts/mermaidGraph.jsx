import React,{ useState,useEffect,useRef} from "react"
import mermaid from "mermaid";
import { v4 as uuidv4 } from 'uuid';


let mchart1=`
flowchart LR

A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2] 
` 

mchart1=`
gantt
    section Section
    Completed :done,    des1, 2014-01-06,2014-01-08
    Active        :active,  des2, 2014-01-07, 3d
    Parallel 1   :         des3, after des1, 1d
    Parallel 2   :         des4, after des1, 1d
    Parallel 3   :         des5, after des3, 1d
    Parallel 4   :         des6, after des4, 1d
`

mchart1=`
graph TD;
A-->B;
A-->C;
B-->D;
C-->D;
`

mchart1=`
stateDiagram-v2
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]
`
        


export class Mermaid extends React.Component {
  
    constructor(props) { 
        super(props)
        if (props.cmpt){
            this.cmpt=props.cmpt
        }
        mermaid.initialize({startOnLoad:false});
        mermaid.mermaidAPI.initialize();
    }

    componentDidMount() { 
        let tt=this
       /*
        mermaid.initialize({
            mermaid : {
                startOnLoad: true,
                useMaxWidth : true,
            },
            startOnLoad: true,
            useMaxWidth : false,
            
        })   
        mermaid.contentLoaded();
        */

        mermaid.contentLoaded();
        

        // Watch the element's attributes for changes
        let mermaidObserverOpts = {
            attributes: true
        };
        if (false){
            document.querySelectorAll('.mermaid').forEach(function(el) {
                let observer = new MutationObserver((entries) => {
                    let target = entries[0].target;
                    
                    // Act only when the element becomes visible
                    if(target.classList.contains('visible')) {
                        // Get the contents of the Mermaid element
                        let html = el.textContent;
        
                        // Generate a unique-ish ID so we don't clobber existing graphs
                        // This is definitely quick and dirty and could be improved to 
                        // avoid collisions when many charts are used
                        //let id = 'graph-' + Math.floor(Math.random() * Math.floor(1000));
                        let id="mermaid-chart" + "_" + tt.id
                        // Actually render the chart
                        mermaid.mermaidAPI.render(id, html, content => {
                            el.innerHTML = content;
                        });
        
                        // Disconnect the observer, since the chart is now on the page. 
                        // There's no point in continuing to watch it
                        observer.disconnect();
                    }
                });
        
                observer.observe(el, mermaidObserverOpts);
            });
        }


       // mermaid.mermaidAPI.render()
        //mermaid.contentLoaded();

    }

    id=uuidv4()
    

    render() {
        let tt=this
        //console.log("mermaid-chart" + "_" + tt.id)
        
        let E=<pre id={"mermaid-chart" + "_" + tt.id } className="mermaid">{this.props.chart}</pre>

        if (tt.cmpt){
            E=<tt.cmpt>
                <pre id={"mermaid-chart" + "_" + tt.id } className="mermaid">{this.props.chart}</pre>
            </tt.cmpt>
        } 

        return (
            <div
                style={{ position : "relative",width : 600,height : 600  }}
            >   
                
                
                
                {E}
              
            </div>
      
        )
    }
}



export const MermaidCmpt=(props)=>{
    let initC=useRef(true);
    
    let hasExamples=false;
    if (props.hasExamples){
        hasExamples=props.hasExamples;
    }

    let hasTextBox=false;
    if (props.hasTextBox){
        hasTextBox=props.hasTextBox;
    }

    let hasDownload=false;
    if (props.hasDownload){
        hasDownload=props.hasDownload;
    }
    
    let mermadeTxtDef=mchart1;
    if (props.text){
        mermadeTxtDef=props.text;
    }
    if (props.src){
        mermadeTxtDef=props.src;
    }
    
    let [mermadeTxt, setMermadeTxt]=useState(mermadeTxtDef);

    useEffect(()=>{
        if (initC.current){
            initC.current=false;
            
        }
    },[]);


    useEffect(()=>{
        if (props.src){            
            if (mermadeTxt!==props.src){
                setMermadeTxt(props.src)
            }
        }
        if (props.text){
            if (mermadeTxt!==props.text){
                setMermadeTxt(props.text)
            }            
        }


    },[props.src,props.text]);



    // -------------------------------------------

        let style={}

        if (props.style){
            style={...style,...props.style}

        }

        if (props.styleOverride){
            style=props.style;
        }

    // -------------------------------------------


    let examplesE
    if (hasExamples){
        examplesE=(()=>{

            return (
                <div
                    style={{
                        display : "inline-block",
                    }}
                >
                    <button
                        onClick={()=>{
                            let val=""
                            + "stateDiagram-v2" + "\n"
                            + "[*] --> Still" + "\n"
                            + "Still --> [*]" + "\n"
                            + "Still --> Moving" + "\n"
                            + "Moving --> Still" + "\n"
                            + "Moving --> Crash" + "\n"
                            + "Crash --> [*]"; 

                            setMermadeTxt(val);
                        }}
                    >example 1</button>
                    <button
                        onClick={()=>{
                            let val=""
                            + "flowchart TD" + "\n"
                            + " A[Christmas] -->|Get money| B(Go shopping)" + "\n"
                            + " B --> C{Let me think}" + "\n"
                            + " C -->|One| D[Laptop]" + "\n"
                            + " C -->|Two| E[iPhone]" + "\n"
                            + " C -->|Three| F[fa:fa-car Car]";

                            setMermadeTxt(val);
                        }}
                    >example 2</button>
                    <button
                        onClick={()=>{
                            let val=""
                            + "classDiagram" + "\n"
                            + "Animal <|-- Duck" + "\n"
                            + "Animal <|-- Fish" + "\n"
                            + "Animal <|-- Zebra" + "\n"
                            + "Animal : +int age" + "\n"
                            + "Animal : +String gender" + "\n"
                            + "Animal: +isMammal()" + "\n"
                            + "Animal: +mate()" + "\n"
                            + "class Duck{" + "\n"
                            + "+String beakColor" + "\n"
                            + "+swim()" + "\n"
                            + "+quack()" + "\n"
                            + "}" + "\n"
                            + "class Fish{" + "\n"
                            + "-int sizeInFeet" + "\n"
                            + "-canEat()" + "\n"
                            + "}" + "\n"
                            + "class Zebra{" + "\n"
                            + "+bool is_wild" + "\n"
                            + "+run()" + "\n"
                            + "}" + "\n";
                            setMermadeTxt(val);
                            console.log(val);
                        }}
                    >example 3</button>
                    <button
                        onClick={()=>{
                            let val=""

                            + "gantt" + "\n"
                            + "title A Gantt Diagram" + "\n"
                            + "dateFormat  YYYY-MM-DD" + "\n"
                            + "section Section" + "\n"
                            + "A task           :a1, 2014-01-01, 30d" + "\n"
                            + "Another task     :after a1  , 20d" + "\n"
                            + "section Another" + "\n"
                            + "Task in sec      :2014-01-12  , 12d" + "\n"
                            + "another task      : 24d" + "\n"


                            setMermadeTxt(val);
                        }}
                    >example 4</button>
                    <button
                        onClick={()=>{
                            let val=""

                            + "journey" + "\n"
                            + "title My working day" + "\n"
                            + "section Go to work" + "\n"
                            + "  Make tea: 5: Me" + "\n"
                            + "  Go upstairs: 3: Me" + "\n"
                            + "  Do work: 1: Me, Cat" + "\n"
                            + "section Go home" + "\n"
                            + "  Go downstairs: 5: Me" + "\n"
                            + "  Sit down: 3: Me" + "\n"

                            setMermadeTxt(val);
                        }}
                    >example 5</button>
                    <button
                        onClick={()=>{
                            let val=""
                            + 'pie title Pets adopted by volunteers' + '\n'
                            + '"Dogs" : 386' + '\n'
                            + '"Cats" : 85' + '\n'
                            + '"Rats" : 15' + '\n'
                        
                            setMermadeTxt(val);
                        }}
                    >example 6</button>
                    <button
                        onClick={()=>{
                            let val=""
                            + 'quadrantChart' + '\n'
                            + 'title Reach and engagement of campaigns' + '\n'
                            + 'x-axis Low Reach --> High Reach' + '\n'
                            + 'y-axis Low Engagement --> High Engagement' + '\n'
                            + 'quadrant-1 We should expand' + '\n'
                            + 'quadrant-2 Need to promote' + '\n'
                            + 'quadrant-3 Re-evaluate' + '\n'
                            + 'quadrant-4 May be improved' + '\n'
                            + 'Campaign A: [0.3, 0.6]' + '\n'
                            + 'Campaign B: [0.45, 0.23]' + '\n'
                            + 'Campaign C: [0.57, 0.69]' + '\n'
                            + 'Campaign D: [0.78, 0.34]' + '\n'
                            + 'Campaign E: [0.40, 0.34]' + '\n'
                            + 'Campaign F: [0.35, 0.78]' + '\n'
                        
                            setMermadeTxt(val);
                        }}
                    >example 7</button>
                    <button
                        onClick={()=>{
                            let val=""
                        
                            + 'xychart-beta' + '\n'
                            + 'title "Sales Revenue"' + '\n'
                            + 'x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]' + '\n'
                            + 'y-axis "Revenue (in $)" 4000 --> 11000' + '\n'
                            + 'bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]' + '\n'
                            + 'line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]' + '\n'
                        
                            setMermadeTxt(val);
                        }}
                    >example 8</button>
                    <button
                        onClick={()=>{
                            let val=''
                        
                            + 'mindmap' + '\n'
                            + 'root((mindmap))' + '\n'
                            + '    Origins' + '\n'
                            + '    Long history' + '\n'
                            + '    ::icon(fa fa-book)' + '\n'
                            + '    Popularisation' + '\n'
                            + '        British popular psychology author Tony Buzan' + '\n'
                            + '    Research' + '\n'
                            + '    On effectivness<br/>and features' + '\n'
                            + '    On Automatic creation' + '\n'
                            + '        Uses' + '\n'
                            + '            Creative techniques' + '\n'
                            + '            Strategic planning' + '\n'
                            + '            Argument mapping' + '\n'
                            + '    Tools' + '\n'
                            + '    Pen and paper' + '\n'
                            + '    Mermaid;' + '\n'
                        
                            setMermadeTxt(val);
                        }}
                    >example 9</button>                
                </div>
            )

        })();
    }

    let downloadE
    if (hasDownload){
        downloadE=(()=>{

            return (
                <button
                    onClick={()=>{

                        let svg=document.querySelector(".mermaid").firstChild;
                        if (!svg) return;
                        const svgData = new XMLSerializer().serializeToString(svg);
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        const img = new Image();

                        // Set dimensions
                        canvas.width = svg.clientWidth;
                        canvas.height = svg.clientHeight;

                        img.onload = () => {

                            /// background white
                                ctx.fillStyle = "white";
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ///
                            ctx.drawImage(img, 0, 0);
                            const pngData = canvas.toDataURL("image/png");

                            // Download image
                            const link = document.createElement("a");
                            link.href = pngData;
                            link.download = "diagram.png";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        };

                        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;

                    }}                
                >download</button>

            )

        })();
    }


    let textBoxE;

    if (hasTextBox){
        
        textBoxE=(()=>{

            return (

                        <textarea   
                            style={{
                                position : "absolute",
                                right : 0,
                                top : 50,
                                display : "inline-block",

                                width : 600,height : 300
                            }}
                            value={mermadeTxt}
                            onChange={(e)=>{
                                let val=e.target.value;
                                setMermadeTxt(val);

                            }}
                        />    

            )

        })()
    }



    return (
            <div
                style={style}
            >
                <div>
                    {examplesE}                    
                    {textBoxE}
                </div>      

                {(()=>{
                    if (hasExamples){
                        return (
                            <a href="https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNpVUV1vgjAU_StNn1xiE0Bk4tui2UeWKBHNsoWXSq_QAC0rRbMY__vaDpbt8dxzzj09t1ecSwZ4iQkhmdBc17BEGd6vEpTQvAKd4Uw4rnWQHEHTTCDkEX9ulansVQ4okcpJEfIjMvMts4ZOc0E1l-IPPQtINHNG-OxBGOumb46gftgoJLFb-5BXQl5qYEUDQv_TxBGJYxdANUXb06mDMdozr_KcfwcdqDOwkYjs8LB7GvG9C1m9jnhhcZI-j9gF7NL9gH3PPfl9M2LX8PHlFwfED9zONy6YvAzjYEH80LVdlZBXXd8MRBia87mMgypswURyoceGfmR6xC5ism3tATtEBTM_whgXxd2gigMSzOe_l5icqeL0WAOqQRS6dDI8xQ2ohnJm_vhqbRnWJTSQYWtkVFVWdjM62muZfokcL7XqYYqV7IsSL0-07gzqW0Y1rDktFG1GSUvFh5TNILp9A99qr5A">help</a>                         
                        )
                    }
                })()}
                


                


                { 
                    <Mermaid 
                        key={Math.random()}
                        chart={mermadeTxt} 
                    />  
                }
            </div>
    )
}