
import { useState,useEffect,useRef,useContext ,Context , lazy,Component, Suspense } from "react"

import { ReactGrid, Column, Row } from "@silevis/reactgrid";
//import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption }  from "gantt-task-react";

import { PopupBox } from "../../tools/reps/SQL/sqlbuilder";
import { render } from "react-dom"
import "@silevis/reactgrid/styles.css";
import "./style.css"
import { v4 as uuidv4 } from 'uuid';


let initialData={
    "elements": [
      {
        "type": "rectangle",
        "version": 141,
        "versionNonce": 361174001,
        "isDeleted": false,
        "id": "oDVXy8D6rom3H1-LLH2-f",
        "fillStyle": "hachure",
        "strokeWidth": 1,
        "strokeStyle": "solid",
        "roughness": 1,
        "opacity": 100,
        "angle": 0,
        "x": 100.50390625,
        "y": 93.67578125,
        "strokeColor": "#000000",
        "backgroundColor": "transparent",
        "width": 186.47265625,
        "height": 141.9765625,
        "seed": 1968410350,
        "groupIds": []
      }
    ],
    "appState": { "zenModeEnabled": true, "viewBackgroundColor": "#AFEEEE" }
  }
  ;
  
  let comment = {
      x: 0,
      y: 0,
      value: 0,
      id: 0,
  };
  
  export const VGrid=(props)=>{
      /*
          <VGrid 
                      hasPopupForm={true}
                      onDataChange={(dt)=>{
                          console.log("VGrid ",dt)
                      }}
                  />
      */
          
      let headerRowDef =useRef({
          rowId: "header",
          cells: [
              { type: "header", text: "Name" },
              { type: "header", text: "Surname" }
          ]
      });
      let columnsDef=useRef([
          { columnId: "name", width: 150 },
          { columnId: "surname", width: 150 }
      ]);
      let rowsDef=useRef([
          { name: "Thomas", surname: "Goldman" },
          { name: "Susie", surname: "Quattro" },
          { name: "", surname: "" }
      ]);
  
      let [rows,setRows]=useState([...rowsDef.current])  
      let [headerRow,setHeaderRow]=useState({...headerRowDef.current})    
      let [columns,setColumns]=useState([...columnsDef.current])
      let [rowsCurrent,setRowsCurrent]=useState(0)    
      let [newCol,setNewCol]=useState("____newCol_____")    
  
  
      let [popupShow,setPopupShow]=useState(false)
      let popupChildrenRefE=useRef()
  
      let [currentPopupData,setCurrentPopupData]=useState({})    
      let [currentPopupDataText,setCurrentPopupDataText]=useState("")
  
     
      let init=useRef(true)
  
   
      ///////////////////////////////////////////////////////
      useEffect(()=>{
          if (init.current){
              init.current=false
           
          }
      },[])
  
  
      useEffect(()=>{
          if (props.data!==undefined){            
                  let lrows=[]
                  if (props.data.rows){ lrows=props.data.rows }
                  let lheaderRow={...headerRowDef.current}
                  if (props.data.headerRow){ lheaderRow=props.data.headerRow ; headerRowDef.current=props.data.headerRow  }
                  let lcolumns=[...columnsDef.current]
                  if (props.data.columns){ lcolumns=props.data.columns ; columnsDef.current=props.data.columns }
                 
                 
                  setHeaderRow(lheaderRow)
                  setColumns(lcolumns)
                  setRows(lrows)
                           
          }
      },[props.data])
  
      useEffect(()=>{        
          if (props.rows!==rows){        
              onDataChange({ rows  : rows })
          }
          //console.log("note ",note)
      },[rows,headerRow,columns])
  
  
      useEffect(()=>{        
              if (typeof(currentPopupData)==="object"){
                  if (currentPopupData.data){                    
                      updatecurrentpopupdataFN(currentPopupData)
                  }
              }       
      },[currentPopupData])
      let updatecurrentpopupdataFN=()=>{}
  
      let inputToArrayCols=(newColsInp)=>{
          let newcols=[]
          if (typeof(newColsInp)==="string"){
              //newcols=JSON.parse(newColsInp)
              
              if (newColsInp.trim().startsWith("[") && newColsInp.trim().endsWith("]")){               
                  newcols=newColsInp.replace(/\[|\]/g,'').split(',')
              }else{
                  if (newColsInp.includes('\t')){
                      newcols=newColsInp.split('\t')
                  }else{
                      newcols=newcols=[newColsInp]
                  }                
              }            
          }else{
              newcols=newColsInp
          }
  
          newcols.forEach((r5,i5)=>{
              if (typeof(r5)==="string"){
  
              }else{
                  newcols[i5]=toString(r5)
              }
          })
  
          return newcols
      }
      let collsAdd=(newColsInp,paramsInp )=>{
          let newcols=[]
          let ndata
          
          let params={
              replace : false
          }
  
          newcols=inputToArrayCols(newColsInp)
          
          if (params){
              if (typeof(paramsInp)==="object"){
                  if (!Array.isArray(paramsInp)){
                      params={...params,...paramsInp}
                  }
              }
          }
  
          if (params.rows){
              ndata=params.rows
          }
  
          let lcolumns
          let lheaderRow
          let lrows
  
          setColumns((st)=>{
              let ns
              if (params.replace){
                  ns=[]
              }else{
                  ns=[...st]  
              }
  
              newcols.forEach((r7, i7)=>{
                  let nr={}
                  
                  nr.columnId=r7
                  nr.width=150
                  
                  let exists=false
                  ns.forEach((r5,i5)=>{
                      if (r5.columnId===r7){
                          exists=true
                      }
                  })
                  if (!exists){
                      ns.push(nr)
                  }
              })
              
              lcolumns=ns 
              columnsDef.current=ns            
              return ns
          })                            
          setHeaderRow((st)=>{
              let ns={...st}
  
              
              if (params.replace){
                  headerRowDef.current.cells=[]
              }
              newcols.forEach((r7, i7)=>{ 
                  let nr={}                
  
                  nr.type="header"
                  nr.text=r7
                  
                  let exists=false
                  headerRowDef.current.cells.forEach((r5,i5)=>{
                      if (r5.text===r7){
                          exists=true
                      }
                  })
                  if (!exists){
                      headerRowDef.current.cells.push(nr)
                  }
              })
  
              ns={...headerRowDef.current}
              lheaderRow=ns
  
              return ns
          })
          setRows((st)=>{
              let ns=[...st]
             
              if (ndata){
                  ns=[...ndata]
              }else{            
                  ns.forEach((r5,i5)=>{   
                      newcols.forEach((r7, i7)=>{ 
                          if (r5[r7]===undefined){
                              r5[r7]="..."
                          }
                      })
                  })
              }
  
              lrows=ns
              return ns
          })
          /*
          setNote((st)=>{
              let ns={...st}
              ns.rows=[...lrows]
              ns.headerRow={...lheaderRow}
              ns.columns=[...lcolumns]
              return ns
          })
          */
          
      }
  
      //////////////////////////////////////////////////////
  
      let onDataChange=(dt)=>{
          if (props.onDataChange){
              props.onDataChange(dt)
          }
      }
  
      let procRowsFN=(nrs)=>{
          let tmp
          
          tmp=[
              headerRow,
              ...nrs.map((rec0, idx) => { 
                  let cells=[]
                  columnsDef.current.forEach((r5 , i5)=>{
                      cells.push({ type: "text", text: rec0[r5.columnId] })
                  })
                  return ({
                      rowId: idx,                        
                      cells: cells,
                      /*
                      cells: 
                          { type: "text", text: rec0.name },
                          { type: "text", text: rec0.surname }
                      ]
                      */
                  })
          })
          ];
  
          return tmp
      }
      updatecurrentpopupdataFN=(...args)=>{ 
          //alert(JSON.stringify(args[0], null,2)) 
          let val=args[0].data
          try {
                  /*
                  let tmpval=`[
                      { "name": "a", "surname": "a" },
                      { "name": "b", "surname": "b" },
                      { "name": "c", "surname": "c" },
                      { "name": "d", "surname": "d" }
                  ]`
                  */
                  let tmpval=val
                  let ndtmp0=JSON.parse(tmpval)
                  let ndtmp=[]
                  
                  if (Array.isArray(ndtmp0)){
                      ndtmp=ndtmp0
                  }else{                        
                      ndtmp.push(ndtmp0)
                  }
              
                  setRows((st)=>{
                      return ndtmp
                  })
          } catch (error) {
              try {
                  let tmpt=""
                  let tmptArr=val.split("\n")
                  console.log("tmptArr " , tmptArr)
                  let nrows=[]
                  let firstRow=[]
  
                  firstRow=tmptArr[0]
                  let headersArr=inputToArrayCols(firstRow)
                  tmptArr.forEach((r5 , i5)=>{
                      let tmpTabArr=r5.split("\t")
                      let nr={}
  
  
                      tmpTabArr.forEach((r52 , i52)=>{
                          //if (columnsDef.current[i52] ){
                          if (headersArr[i52] ){                                
                              //nr[columnsDef.current[i52].columnId]=r52
                              nr[headersArr[i52]]=r52
                              
                          }
                          //columnsDef.current.forEach((r6,i6)=>{
                          //})
                      })
                      if (i5!==0){
                          nrows.push(nr)
                      }                        
                  })
  
                  collsAdd( firstRow , { rows : nrows , replace : true })
              }catch (error2) {
  
              }
              
              
              //setRows((st)=>{ return nrows      })
          }
      }
      
      let rgRows=procRowsFN(rows);
      let gridprops={}
      if (true){
          
          gridprops.onFocusLocationChanging=(...args)=>{
              //console.log("onFocusLocationChanging" , args)
              //rowsCurrentRef.current=args[0].rowId
              
              setRowsCurrent((st)=>{
                  let nv=st
                  if (args[0]){                                    
                      nv=args[0].rowId
                  }
                  return nv
              })
              
             return true
          }
           /*
              gridprops.onFocusLocationChanged=(...args)=>{
                  console.log("onFocusLocationChanged" , args)
                  return true
              }
          */
          /*
              onSelectionChanged={(...args)=>{
                  console.log("onSelectionChanged" , args)
              }}
              
              onSelectionChanging={(...args)=>{
                  console.log("onSelectionChanging" , args)
              }}
              onContextMenu={(...args)=>{
                  console.log("onContextMenu" , args)
              }}                       
          */
      }
  
      let stdProps={
          seq: props.seq,
          uid : props.uid,
      }
  
      let hasPopupForm=false
      if (props.hasPopupForm){
          hasPopupForm=props.hasPopupForm
      }
  
      let popupFormE
      let popupclickE
      if (hasPopupForm){
          popupFormE=(()=>{
              return (
                  <div>
                      <button
                          onClick={()=>{
                              setCurrentPopupData((st)=>{
                                  let nd={
                                      data : currentPopupDataText,
                                      dataType : "",
                                  }
                                  return nd
                              })
                              setPopupShow(false)
  
                          }}
                      >ok</button>
                      <br/>
  
                      <textarea
                          value={currentPopupDataText}
                          style={{
                              width : "80%",
                              height : 400 ,
                          }}
                          onChange={(e)=>{
                              let val=e.target.value
                              setCurrentPopupDataText(()=>{
                                  
                                  return val                        
                              })
                          }}
                          
                          
                      />
  
                  </div>
              )
          }
          )()
  
      
          if (props.popupFormE){
              popupFormE=props.popupFormE
          }
  
          popupChildrenRefE.current=popupFormE
          
  
          popupclickE=(()=>{
          
              return (
                  <button
                      onClick={()=>{
                          
      
                          setPopupShow(true)
      
                      }}
                  >
                      popup
                  </button>
              )
              
      
          })()
      }
  
      if (currentPopupData.data){
          
      }
          
      // {popupFormE}
      return (
          <div>
              
              {popupclickE}
              <PopupBox                 
                  //showhide={popupShow}
                  
                  show={popupShow}
                  showval={(val)=>{
                      setPopupShow(val)
                  }}
                  //childrenRefE={popupChildrenRefE}
              >{popupChildrenRefE.current}</PopupBox>
              <ReactGrid 
                          //key={Math.random()}
                          {...stdProps}
                          style={{color : "black"}}                            
                          rows={rgRows} columns={columns} 
                          {...gridprops}
                          enableRowSelection
                          enableColumnSelection
                          enableFillHandle
                          moveRightOnEnter
                          onCellsChanged={(...args)=>{
                              // https://reactgrid.com/docs/4.0/7-api/1-types/2-cell-change/
                              
                              setRows((st)=>{
                                  let ns=[...st]
  
                                  if (args[0]){                                    
                                      //ns.rows=[...rows]
                                      
                                      args[0].forEach((r1,i1)=>{
  
                                          ns[r1.rowId][r1.columnId]=r1.newCell.text
                                          // [r1.rowId][r1.columnId][r1.previousCellns.text]
                                          /*
                                              args-->[
                                                  [
                                                      {
                                                          "previousCell": {
                                                              "type": "text",
                                                              "text": "b",
                                                              "value": null,
                                                              "placeholder": ""
                                                          },
                                                          "newCell": {
                                                              "type": "text",
                                                              "text": "b1",
                                                              "value": null,
                                                              "placeholder": ""
                                                          },
                                                          "type": "text",
                                                          "rowId": 0,
                                                          "columnId": "surname"
                                                      }
                                                  ]
                                              ]
                                          */
                                      })
                                  }
                              
                              
                                  
                                  //ns.rows=nval
                                  return ns                          
                              })
                              
                          }}              
                         
                      />
                      <button
                          onClick={()=>{
                              let lrows
                              setRows((st)=>{
                                  let ns=[...st]
                                  let nr={}
                                  columnsDef.current.forEach((r4,i4)=>{
                                      nr[r4.columnId]=""
                                  })
                                  ns.push(nr)
                                  lrows=ns
                                  return ns
                              })
                              
                              /*
                              setNote((st)=>{
                                  let ns={...st}
                                  ns.rows=rows
                              })
                              */
  
                          }}
                          
                      >rowADD+</button>
                      <button
                          onClick={()=>{
                              let lrows
                              setRows((st)=>{
                                  let ns=[...st]
                                  let nr={}
                                  
                                  //ns.push(nr)
                                  ns.splice(rowsCurrent,1)
                                  lrows=ns
                                  return ns
                              })
                             
                              
                              /*
                              setNote((st)=>{
                                  let ns={...st}
                                  ns.rows=rows
                              })
                              */
  
                          }}
                          
                      >rowDEL-</button>
                      <input
                          value={newCol}
                          onChange={(e)=>{
                              let val=e.target.value
                              setNewCol(()=>val)
                          }}
                      />
                      <button                        
                          onClick={()=>{  
  
                              
                               collsAdd(newCol)
                              
                              
                          } }                       
                      >colADD+</button>
               
          </div>
      )
      
  }