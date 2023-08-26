import React from "react";
import { Node, Socket, Control } from "rete-react-render-plugin";

export class MyNode extends Node {
  render() {
    const { node, bindSocket, bindControl } = this.props;
    const { outputs, controls, inputs, selected } = this.state;

    //console.log("node props", this.props)

    let title=node.name
    if (title){}else{
        title="custom node 1"
    }
    //console.log("node mynode", node , this)
    //console.log("this.props", node , this)
    //console.log("node-->this", this )
    let image0=""
    let image0E
    let imageE00main
    //if (node.cmpt==="K8Login"){
      //image0=node.image
    //}
    //console.log("mynode...", "image" ,node.image )
    //console.log("mynode...", "image0"  , image0)
    //console.log("mynode2...", node.cmpt ,)
    //console.log("cdata...", node.cdata)


    let htmlJsnParseRec=()=>{
      
    }

    let htmlJsnParse=()=>{
      
    }



    let nodeTitle=node.name

    let hasImage=true

    let htmlE
    
    let cStyle={}
    let cStyleTitle={}

    let cStyleImageContainer={}
    let cStyleImage={}
    let cImageClick=()=>{}



    let cdata=node.cdata
    if (cdata){
      
      if (cdata.title){
        nodeTitle=cdata.title
      }

      if (cdata.style){
        cStyle=cdata.style
      }
      if (cdata.styleTitle){
        cStyleTitle=cdata.styleTitle
      }
      if (cdata.styleImageContainer){
        cStyleImageContainer=cdata.styleImageContainer
      }
      if (cdata.styleImage){
        cStyleImage=cdata.styleImage
      }
      
      if (cdata.onClickImage){
        cImageClick=cdata.onClickImage
      }

      //if (cdata.html){
        //htmlE=htmlJsnParse(cdata.html)
      //}



      if (typeof(cdata.hasImage)!==undefined){
        hasImage=cdata.hasImage
      }

      

      
      if (hasImage!==false){
        if (cdata.image){
          image0=cdata.image
  
          image0E=(
            <img 
                  style={{
                    ...{
                      maxWidth : 300,maxWidth : 400,
                    },...cStyleImage
                  }}
                  alt={".."}
  
                  src={image0} 
                />
          )
        }

        imageE00main=(
          <div
            style={
              {
                  ...{
                    maxWidth : 100,maxWidth : 500,
                    overflow : "hidden"
                  },
                  ...cStyleImageContainer
              }
            }
  
            onClick={(e)=>{
              cImageClick({ e : e })
            }}
          >
              {image0E}
          </div>
        )
      }

      
      

    }

    

    return (
      <div 
          className={`node ${selected}`} 
          style={{...{ background: "grey", 
                    
              },...cStyle}}
          
      >
        <div className="title"
            style={cStyleTitle}
        >
          {""} {nodeTitle} {""}
          
        </div>
        {htmlE}

        {imageE00main}
       {/*
        <div><img src={"https://picsum.photos/id/237/200/300"} /></div> 
        /*}

        {/* Outputs */}
        {outputs.map(output => (
          <div className="output" key={output.key}>
            <div className="output-title">{output.name}</div>
            <Socket
              type="output"
              socket={output.socket}
              io={output}
              innerRef={bindSocket}
            />
          </div>
        ))}
        {/* Controls */}
        {controls.map(control => (
          <Control
            className="control"
            key={control.key}
            control={control}
            innerRef={bindControl}
          />
        ))}
        {/* Inputs */}
        {inputs.map(input => (
          <div className="input" key={input.key}>
            <Socket
              type="input"
              socket={input.socket}
              io={input}
              innerRef={bindSocket}
            />
            {!input.showControl() && (
              <div className="input-title">{input.name}</div>
            )}
            {input.showControl() && (
              <Control
                className="input-control"
                control={input.control}
                innerRef={bindControl}
              />
            )}
          </div>
        ))}
        
      </div>
    );
  }
}
