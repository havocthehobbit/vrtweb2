import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import Rete, {NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { createRoot } from 'react-dom/client'; // rob 7 // based on NPM doc
import ReactRenderPlugin, {Presets} from "rete-react-render-plugin"; 
import ConnectionPlugin from "rete-connection-plugin";  

import AreaPlugin  from "rete-area-plugin";

import ConnectionReroutePlugin from "rete-connection-reroute-plugin";

import KeyboardPlugin from 'rete-keyboard-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';

import MinimapPlugin from "rete-minimap-plugin";

import { MyNode } from "./MyNode";

import { contextStore } from "./contextStore";

var numSocket = new Rete.Socket("Number value"); // creates a socket type that all of them will share that makes them connectable to eachother

let cmpnts={}
let cntrls={}

/////////////////////////////////////////////////////////

let customNode={
  nodes : {
    MyFirstNode : MyNode,
  },
  sockets : {
    numSocket : numSocket
  },
  parClss : Rete.Component,
  ReteComponent : Rete.Component,
  ReteControl : Rete.Control,
  libs : { Rete  },
  helpCreateNodeEg : `
    let reteRef=useRef()
    ///////////////////

    useEffect(()=>{
      if (initRete.current){
          if (typeof(reteRef.current)!=="undefined"){
              initRete.current=false
            
              let edtiorInit=reteRef.current

              let customNode=edtiorInit.customNode
              let Rete=customNode.libs.Rete

              let MyNode=customNode.nodes.MyFirstNode
              
              //let numSocket = new Rete.Socket("Number value"); to create another custom socket, that limits connection between this newly create socket type between nodes that have it 
              //let anyTypeSocket = new Rete.Socket('Any type');
              //numSocket.combineWith(anyTypeSocket); // to make a socket compatable with another socket, in this example its using anytype to make a  number type compatable to connect with any
              let sockets=customNode.sockets  // you could add this customNode.sockets object tp add a new socketype so its accessable by other nodes easily ...eg : customNode.sockets["anyTypeSocket"]=anyTypeSocket ;

              //class testingCust1 extends customNode.ReteComponent {
              nO[cname]=class extends customNode.ReteComponent {
                constructor(props) {
                  let name='Some New Node title'
                  super(name);
                  this.cdata={ // custom data here , that custom node (MyNode) can pull data from          
                    someCustProp : "SomeCustom Value"
                  }
                  this.data.component = MyNode;
                }
                builder(node) {        
                  let inp1 = new Rete.Input("num1", "Number", sockets.numSocket);
                  let inp2 = new Rete.Input("num2", "Number", sockets.numSocket);
                  let out = new Rete.Output("num", "Number", sockets.numSocket);

                  return node 
                    .addInput(inp1)
                    .addInput(inp2)
                    .addOutput(out)
                    
                }
                worker(node, inputs, outputs) { // do stuff when inputs and outputs are change
                  let n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
                  let n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;       
                
                  var sum = n1 + n2 ;
                  this.editor.nodes
                    .find((n) => n.id == node.id)
                    .controls.get("preview")
                    .setValue(sum);
                  outputs["num"] = sum;        
                }
              }

              customNode.addReteClass(cname,nO[cname], edtiorInit,(nd)=>{
              //customNode.addReteClass(cname,testingCust1 , edtiorInit,(nd)=>{
                  //console.log("addReteClass nd : ",cname , nd)
              })
            }        
          }        
      },[reteRef.current])
  `
}

let addReteClass=async (name,clss , edtiorInit, cb)=>{ // creating clss before running this function requires extend inheritance from Rete.Control
  let editor=edtiorInit.editor
  let engine=edtiorInit.engine

  cmpnts[name]={ cmpt : clss }

  // register
  let c=new cmpnts[name].cmpt({ image : "testing 123"})
  edtiorInit.components.push(c)
  let iter=edtiorInit.components.length - 1
  edtiorInit.componentsIDX[name]={ name : name , node : edtiorInit.components[iter] , iter : iter }
  
  await editor.register(edtiorInit.components[iter]);
  await engine.register(edtiorInit.components[iter]);

  if (typeof(cb)==="function"){
    cb({ component : c ,iter : iter })
  }

}
customNode["addReteClass"]=addReteClass

// to do - to test
let addReteClassDyn=(name,clss)=>{
  let o={}

  let a={}
  let nc=(clss)=>{

    return (
        class extends Rete.Control {
          constructor(){}
        }
      )
  }
  
  class clssTmp1 extends clss{}
  class clssTmp2 extends Rete.Control {}

  let nO=Object.create(clssTmp1 , clssTmp2 )

  o[name]=nO
  cntrls[name]={ cmpt : o[name] }
}


/////////////////////////////////////////////////////////////////

class NumControl extends Rete.Control {
  static component = ({ value, onChange }) => (
    <input
      type="number"
      value={value}
      ref={(ref) => {
        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
      }}
      onChange={(e) => onChange(+e.target.value)}
    />
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = NumControl.component;

    const initial = node.data[key] || 0;

    node.data[key] = initial;
    this.props = {
      readonly,
      value: initial,
      onChange: (v) => {
        this.setValue(v);
        this.emitter.trigger("process");
      }
    };
  }

  setValue(val) {
    this.props.value = val;
    this.putData(this.key, val);
    this.update();
  }
}
cntrls["NumControl"]={ cmpt : NumControl }

/////////////////////////////////////////////////////////////////

class NumComponent extends Rete.Component {
  constructor() {
    super("Number"); // rob 5 title
  }

  builder(node) {
    var out1 = new Rete.Output("num", "Number", numSocket);
    var ctrl = new NumControl(this.editor, "num", node);

    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["num"] = node.data.num;
  }
}
cmpnts["NumComponent"]={ cmpt : NumComponent }

class AddComponent extends Rete.Component { // extendeng the custom component 
  constructor() {
    //super("Add");
    super("rob Add "); // rob 6 - title change of custom node 
    this.data.component = MyNode; // optional
    
  }

  builder(node) {
    var inp1 = new Rete.Input("num1", "Number", numSocket);
    var inp2 = new Rete.Input("num2", "Number2", numSocket);
    var inp3 = new Rete.Input("num3", "Number3", numSocket); // rob 4
    var out = new Rete.Output("num", "Number", numSocket);

    inp1.addControl(new NumControl(this.editor, "num1", node));
    inp2.addControl(new NumControl(this.editor, "num2", node));
    inp3.addControl(new NumControl(this.editor, "num3", node)); // rob 4

    return node
      .addInput(inp1)
      .addInput(inp2)
      .addInput(inp3) // rob 4
      .addControl(new NumControl(this.editor, "preview", node, true))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
    var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
    var n3 = inputs["num3"].length ? inputs["num3"][0] : node.data.num2; // rob 2
    //var sum = n1 + n2;
    var sum = n1 + n2 + n3; // rob 3
    

    this.editor.nodes
      .find((n) => n.id == node.id)
      .controls.get("preview")
      .setValue(sum);
    outputs["num"] = sum;
  }
} 
cmpnts["AddComponent"]={ cmpt : AddComponent }

/////////////////////////////////////////////////////////////////

let registerCustomClasses=async (edtiorInit, paramsArg,cbArg)=>{ 
  let editor=edtiorInit.editor
  let engine=edtiorInit.engine  
  
  let i=0;
  for (let pname in cmpnts ){    
    //components.push( new cmpnts[pname].cmpt({ image : "testing 123"}) );
    edtiorInit.components.push( new cmpnts[pname].cmpt({ image : "testing 123"}) );
    edtiorInit.componentsIDX[pname]={ name : pname , node : edtiorInit.components[i] , iter : i }
    i++
  }

  for (let i=0 ; i < edtiorInit.components.length ; i++){
    let c=edtiorInit.components[i]
    try {
       editor.register(c);
       engine.register(c); // may need to add this later #bug rt, found that it was giving alreawdy registered errors , which means class adding component probably regiesters them with engine , so added this try and commented out this line to avoid error until I fully understand the engine 
    } catch (error){}
  }

  edtiorInit.controls=cntrls

  if (typeof(cb)==="function"){ cbArg() }  

  return
} 


let addNodeToEdt=async (edtiorInit, paramsArg,cbArg)=>{ 
  let editor=edtiorInit.editor
  let engine=edtiorInit.engine
  
  let params={ 
    nodename : "",data : {},
    params : true ,
  }
  let cb=()=>{}

  if (typeof(paramsArg)==="object"){
    if (Array.isArray(paramsArg)===false){
      for (let p in paramsArg){
        params[p]=paramsArg[p]
      }      
    }
  }

  if (typeof(cbArg)==="function"){
    cb=cbArg
  }  

  let newClass=true
  if (newClass){
    edtiorInit.components.map((c)=>{
      try {
        editor.register(c);
        engine.register(c); // may need to add this later #bug rt, found that it was giving alreawdy registered errors , which means class adding component probably regiesters them with engine , so added this try and commented out this line to avoid error until I fully understand the engine 
      } catch (error) {
        //console.log("vw err!!!", error)
      }    
    });
  }

  ///////////////////////////////////////////////
  let tmp=""

  let cdata={}
  let extraData={}

  if (params.data){
    extraData=params.data
  }  
  
  extraData["customdata0"]="customdata123"  

  if ( params.nodename !==""){
    let nodeIter=edtiorInit.componentsIDX[params.nodename ].iter

    if (edtiorInit.components[nodeIter].cdata){
      //cdata=components[nodeIter].cdata
      for (let p in edtiorInit.components[nodeIter].cdata){
        cdata[p]=edtiorInit.components[nodeIter].cdata[p]
      }
    }
    extraData.cdata=cdata
    
    var newNode = await edtiorInit.components[nodeIter].createNode(extraData); // can access this argument ,in custom node data properties  , if needed 
    newNode.position = [500, 440];   
    
    //////////////////////////////////////////////////////
    
    newNode.cmpt=params.nodename   

    newNode.cdata=cdata // can access cdata from custom node

    //////////////////////////////////////////////////////////////////
    // parameter overides 
    //paramsArg

    if (paramsArg.cbNode){
        if (typeof(paramsArg.cbNode)==="function"){
          paramsArg.cbNode(newNode)
        }
    }
        
    tmp="image"
    if (typeof(paramsArg[tmp]) !== "undefined"){
      newNode.cdata[tmp]=paramsArg[tmp]
    }

    tmp="position"
    if (typeof(paramsArg[tmp]) !== "undefined"){
      newNode[tmp]=paramsArg[tmp]
    }

    /////////////////////////////////////////////////

    editor.addNode(newNode);
    
    if (params.zoomAtnodes){
      AreaPlugin.zoomAt(editor, editor.nodes);
    }
    
 

    cb({ node :  newNode })
    
  }
  


} 
/////////////////////////////////////////////////////////////////
// events

let events=(edtiorInit)=>{
  let editor=edtiorInit.editor
  let engine=edtiorInit.engine

  // https://rete.readthedocs.io/en/latest/Events/ --> help for events and list of all
  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      //console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );

  editor.on('nodecreate', node => {
    //console.log("rete node create event")
    if (node.cdata){
      node.data.cdata=node.cdata
    }else{
      if (node.data.cdata){
        node.cdata=node.data.cdata
      }
    }
    
  })

  editor.on('componentregister', node => {
    //console.log("rete node componentregister")

  })

  editor.on('import', (...args) => {
    let edtiorInit=editor.edtiorInit 
    
    if (args.length < 1){
      console.log("nothing to load")
      return
    }

    // need to update cdata/"custom data", as it had issues saving and loading 
    let data=args[0]
    if (data.nodes){
      let nodes=data.nodes      
      for (let i in nodes){
        let r=nodes[i]
        let params={}
        if (r.data.cdata){
          r.cdata=r.data.cdata
        }
      }      
    }

    //setTimeout(()=>{ // needed to add a time out as await was slowing down load and causing issues when registering
      //AreaPlugin.zoomAt(editor, editor.nodes);    
    //},500)
  
  })

  editor.on('export', node => {
    //console.log("rete node export")
    
  })  


  editor.on(
    "selectnode",
    async (...args) => {

      //console.log("selectnode")
      //console.log(JSON.stringify(args))
    }
  );

  editor.on(
    "nodeselect",
    async (...args) => {
      //console.log("nodeselect")
      //console.log(JSON.stringify(args))
    }
  );

  editor.on(
    "click",
    async (...args) => {
      //alert(JSON.stringify(args))
    }
  );

  editor.on(
    "rendernode",
    async (...args) => {
      //console.log("rendernode")
      //console.log(JSON.stringify(args))
    }
  );
  

}

//////////////////////////////////////////////////////////////////////////

export async function createEditor(container) {
  //var components = [new NumComponent(), new AddComponent()];  

  let editorName="n@0.0.0"
  editorName="demo@0.1.0"
  //editorName="vvv@0.1.0"

  var editor = new Rete.NodeEditor(editorName, container);

  var engine = new Rete.Engine(editorName);

  //let area= new AreaPlugin//(container)

  ///////////////////////////////////////////////////////////////////////////
  
  let edtiorInit={ 
    editor, 
    engine ,
    //AreaPlugin : area, 
    AreaPlugin , 
    components : [],componentsIDX :{}, controls : {} 
  }

 ///////////////////////////////////////////////////////////////////////////////
  // register components 
  
  registerCustomClasses(edtiorInit)

  events(edtiorInit)

  ////////////////////////////////////////////////////////////
  // plugins 
  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin, { createRoot });
  editor.use(KeyboardPlugin)

  console.log(ReactRenderPlugin)

  //let AreaExtra = ReactArea2D;
  //const area = new AreaPlugin(container);
  //editor.use(area)

  editor.use(MinimapPlugin);
  editor.use(ConnectionReroutePlugin);
  
 // AreaPlugin.use(MinimapPlugin);

  editor.use(ContextMenuPlugin, { 
    searchBar: true,
    delay: 500,
    allocate(component) {

        //return ['nodes']
        //return editorName.components
    },
    items: {
        'Click me'(){ console.log('Works!') },
        'Click me2' : ()=>{ 
            addNodeToEdt(edtiorInit,{ nodename : "Login"})
        },
        subitems1: [
          { label: 'Subitem', key: '1', handler: () => console.log('Subitem') }
        ]
    }
  });

  //////////////////////////////////////////////////////////////

  
  //const area = new AreaPlugin<Schemes, AreaExtra>(container)
  
  //console.log("AreaExtensions : ",AreaExtensions )


  /////////////////////////////////////////////////////////

  editor.view.resize();
  editor.trigger("process");
  AreaPlugin.zoomAt(editor, editor.nodes);

  return edtiorInit;
}

let initialNodes=(edtiorInit, cb)=>{
    //addNodeToEdt(edtiorInit.editor)
    
    if (typeof(cb)==="function"){
      cb(edtiorInit)
    }
}


export function useRete() {
  let ctxRete=useContext(contextStore)

  const [container, setContainer] = useState(null);  
  const editorRef = useRef();  
  let initC = useRef(true);  

  useEffect(() => {
    if (container) {
      if (initC.current){
        initC.current=false
        createEditor(container).then((edtiorInit) => { 
          edtiorInit.editor.edtiorInit=edtiorInit         
          edtiorInit.reset=()=>{
            initC.current=true
            setContainer(null)
          }
          edtiorInit.customNode=customNode          

          ctxRete.addNode.current=addNodeToEdt 
          
          ctxRete.reteEdtRef.current=edtiorInit.editor
          ctxRete.reteRef.current=edtiorInit
          
          //editorMain=edtior
          editorRef.current = edtiorInit.editor; 
          

          initialNodes(edtiorInit)
        });
      }else{
        //editorRef.current.trigger("process");
        //editorRef.current = editorMain; 
      } 
    }
  }, [container]);
 
  useEffect(() => {
    return () => {
      if (editorRef.current) {

        editorRef.current.destroy(); 
      }
    };
  }, []);

  return [setContainer];
}
