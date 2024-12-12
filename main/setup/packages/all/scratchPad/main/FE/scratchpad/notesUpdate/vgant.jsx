import { useState,useEffect,useRef,useContext ,Context} from "react"
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption }  from "gantt-task-react";
import { PopupBox } from "../../tools/reps/SQL/sqlbuilder";
import "@silevis/reactgrid/styles.css";
import "./style.css"
import { v4 as uuidv4 } from 'uuid';


export const VGant=(props)=>{
    /*
        <VGrid 
                    hasPopupForm={true}
                    onDataChange={(dt)=>{
                        console.log("VGrid ",dt)
                    }}
                />
    */


    let currentDate = new Date();

    let tasksDef=useRef([
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
            name: "Some Project",
            id: "ProjectSample",
            progress: 25,
            type: "project",
            hideChildren: false,
            displayOrder: 1,
            isDisabled : false
        }
    ]);
        
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


    let [rows,setRows]=useState([...tasksDef.current])  
    let [headerRow,setHeaderRow]=useState({...headerRowDef.current})    
    let [columns,setColumns]=useState([...columnsDef.current])
    let [rowsCurrent,setRowsCurrent]=useState(0)    
    let [newCol,setNewCol]=useState("____newCol_____")  

    let [taskProject,setTaskProject]=useState("Project1")
    let [taskID,setTaskID]=useState("TaskID")
    let [taskIDNew,setTaskIDnew]=useState("TaskID")
    let [taskName,setTaskName]=useState("Task Name")
    let [gtTaskType,setGtTaskType]=useState("task")
    let [dateFrom,setDateFrom]=useState(new Date())
    let [dateTo,setDateTo]=useState(new Date())
    let [taskProgress,setTaskProgress]=useState(0)

    //let [currentTaskID,setCurrentTaskID]=useState("")
    let [viewMode,setViewMode]=useState("Day") // Specifies the time scale. Hour, Quarter Day, Half Day, Day, Week(ISO-8601, 1st day is Monday), Month, QuarterYear, Year.
    

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


    useEffect((...args)=>{
        let crows=rows;
        if (props.rows!==undefined){            
                let lrows=[]
                if (props.rows){
                    let tmp=JSON.stringify(props.rows )  ;                   
                    lrows=JSON.parse(tmp);  //[...props.data.rows ]
                    if (lrows.length===0){
                        return
                    }

                }
                if (JSON.stringify(lrows)===JSON.stringify(rows)){
                    return
                }
               if (lrows.length){
                    lrows.forEach((r,i)=>{
                        if (r.start){

                            r.start=new Date(r.start)
                        }
                        if (r.end){
                            r.end=new Date(r.end)
                        }
                    })
                 
                    //setHeaderRow(lheaderRow)
                    //setColumns(lcolumns)
                    if (true){
                        setRows(()=>{
                            return lrows
                        })
                    }
                }
                
                         
        }
    },[props.rows])

    useEffect(()=>{  
        let crows=rows;    
        //if (init.current===false){  
            if (props.rows!==rows){        
                    let propsdatarows={}
                    if (props.rows){
                        if (props.rows){
                            propsdatarows=props.rows
                        }        
                    }
                    //if (JSON.stringify(propsdatarows)!==JSON.stringify(rows)){
                       onDataChange({ rows  : rows })
                    //}
                

            }
        //}
        //console.log("note ",note)
    },[rows])

    let onDataChange=(dt)=>{
        let crows=rows;
        if (props.onDataChange){
            //if (init.current)
            
            if (JSON.stringify(rows)!==JSON.stringify(tasksDef.current)){

                let propsdatarows={}
                if (props.rows){
                    if (props.rows){
                        propsdatarows=props.rows
                    }        
                }
                if (propsdatarows!==crows){
                    props.onDataChange(dt)
                }
            }
        }
    }

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
        
        
    }
    

    let TaskTypes=[
        {
            name : "project", 
            id : "project"
        },
        {
            name : "task", 
            id : "task"
        },
        {
            name : "milestone", 
            id : "milestone"
        },        
    ]

    let taskTypesE=(()=>{
        let TaskTypesAE=[]
        TaskTypes.forEach((r,i)=>{
            TaskTypesAE.push(
                <option key={i} style={{}} value={r.id} >{r.name}</option>
            )
        })
        return (
            <select 
                    value={gtTaskType}
                    style={{}}
                    onChange={(e) => {
                        // setUp(e.target.value)
                        let val=e.target.value
                        setGtTaskType((st)=>{
                            //let nsr={...st}                            
                            return val                        
                        })
                    }}
                    onBlur={(e)=>{
                        let val=e.target.value
                        let iter=-1;
    
                        rows.forEach((r,i)=>{
                            if (r.id===taskID){                            
                                    iter=i                            
                            }
                        });
    
                        if (iter > -1){
                            setRows((st)=>{
                                let ns=[...st]
        
                                ns[iter].type=val
        
                                return ns
                            })
                        };
                    }}
                   
                >
                    {TaskTypesAE}                    
                </select>
        )
    })()

    let addTask=(inp1)=>{
        let tmp

        tmp={
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
            name: "Some Project",
            id: "ProjectSample",
            progress: 25,
            type: "project",
            hideChildren: false,
            displayOrder: 1,
        };

        tmp.start= new Date(dateFrom)
        tmp.end=new Date(dateTo)
        tmp.name=taskName
        tmp.type=gtTaskType
        tmp.progress=taskProgress
        
        tmp.id=uuidv4()
        if (gtTaskType==="project"){
            tmp.id=taskProject
            //tmp.id=taskName

        }else{
            tmp.project=taskProject
            //tmp.project=taskName
        }

        setRows((st)=>{
            let ns=[...st]

            ns.push(tmp)        

            return ns
        })
        setTaskID(()=>tmp.id)

        /*
            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
                name: "Some Project",
                id: "ProjectSample",
                progress: 25,
                type: "project",
                hideChildren: false,
                displayOrder: 1,
            },

            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                end: new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                2,
                12,
                28
                ),
                name: "Idea",
                id: "Task 0",
                progress: 45,
                type: "task",
                project: "ProjectSample",
                displayOrder: 2,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
            name: "Research",
            id: "Task 1",
            progress: 25,
            dependencies: ["Task 0"],
            type: "task",
            project: "ProjectSample",
            displayOrder: 3,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
            name: "Discussion with team",
            id: "Task 2",
            progress: 10,
            dependencies: ["Task 1"],
            type: "task",
            project: "ProjectSample",
            displayOrder: 4,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
            name: "Developing",
            id: "Task 3",
            progress: 2,
            dependencies: ["Task 2"],
            type: "task",
            project: "ProjectSample",
            displayOrder: 5,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
            name: "Review",
            id: "Task 4",
            type: "task",
            progress: 70,
            dependencies: ["Task 2"],
            project: "ProjectSample",
            displayOrder: 6,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
            name: "Release",
            id: "Task 6",
            progress: currentDate.getMonth(),
            type: "milestone",
            dependencies: ["Task 4"],
            project: "ProjectSample",
            displayOrder: 7,
        },
        {
            start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
            end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
            name: "Party Time",
            id: "Task 9",
            progress: 0,
            isDisabled: true,
            type: "task",
        },
        */

        

    
    }

    //////////////////////////////////////////////////////

    

    
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
    
    //let rgRows=procRowsFN(rows);
    let gridprops={}
   
    let stdProps={
        seq: props.seq,
        uid : props.uid,
    }
    let chartprops={}

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

    if (true){
        //viewMode={view}
        //onDelete={handleTaskDelete}
        //onProgressChange={handleProgressChange}
        //onDoubleClick={handleDblClick}
        chartprops.viewMode=viewMode
        chartprops.tasks=rows;
        chartprops.style={color : "black"}; 

        chartprops.onClick=(...args)=>{
            //console.log("onClick", args)
            if (args[0]){
                let a0=args[0]
                
                if (a0.id){                    
                    setTaskID(a0.id)
                    setTaskName(a0.name)
                    setDateFrom(a0.start)
                    setDateTo(a0.end)
                    setTaskProgress(a0.progress)
                    setGtTaskType(a0.type)
                }


            }
            /*
                arg[0]=
                {
                    "start": "2023-12-31T22:00:00.000Z",
                    "end": "2024-01-14T22:00:00.000Z",
                    "name": "Some Project",
                    "id": "ProjectSample",
                    "progress": 25,
                    "type": "project",
                    "hideChildren": false,
                    "displayOrder": 1,
                    "typeInternal": "project",
                    "x1": 60,
                    "x2": 900,
                    "y": 10,
                    "index": 0,
                    "progressX": 60,
                    "progressWidth": 210,
                    "barCornerRadius": 3,
                    "handleWidth": 8,
                    "height": 30,
                    "barChildren": [],
                    "styles": {
                        "backgroundColor": "#fac465",
                        "backgroundSelectedColor": "#f7bb53",
                        "progressColor": "#7db59a",
                        "progressSelectedColor": "#59a985"
                    }
                }
            */
            
        }
        
        chartprops.onDoubleClick=(...args)=>{
        }

        chartprops.onSelect=(...args)=>{
            //console.log("onSelect", args)
            /*

            */
        }
        chartprops.onExpanderClick=(...args)=>{
            //console.log("onExpanderClick", args)

            let rec=args[0]

            let iter=0
            rows.forEach((r,i)=>{
                if (r.id===rec.id){
                    iter=i
                }
            })
            setRows((st)=>{
                let ns=[...st]

                ns[iter].hideChildren=!ns[iter].hideChildren

                return ns
            })
            /*

            */
        }
        //chartprops.listCellWidth={isChecked ? "155px" : ""}
        
        //chartprops.columnWidth={columnWidth}  
    }
        
    // {popupFormE}
    return (
        <div
            {...stdProps}
            style={{
                position : "relative",
                textAlign : "left",
            }}
        >
            
            {popupclickE}
            <PopupBox                 
                //showhide={popupShow}
                
                show={popupShow}
                showval={(val)=>{
                    setPopupShow(val)
                }}
                //childrenRefE={popupChildrenRefE}
            >{popupChildrenRefE.current}</PopupBox>
            <input  
                value={taskName}
                onChange={(e)=>{
                    let val=e.target.value
                    setTaskName(val)
                }}
                onBlur={(e)=>{
                    let val=e.target.value
                    let iter=-1;

                    rows.forEach((r,i)=>{
                        if (r.id===taskID){                            
                                iter=i                            
                        }
                    });

                    if (iter > -1){
                        setRows((st)=>{
                            let ns=[...st]
    
                            ns[iter].name=taskName
    
                            return ns
                        })
                    };
                }}
            />
            <button
                onClick={()=>{
                    addTask()
                }}
                
            >taskADD+</button>
            <button
                onClick={()=>{
                    let iter=-1;

                    rows.forEach((r,i)=>{
                        if (r.id===taskID){
                            if (rows.length===1){
                                alert("please add at least one more component before removing the last task or project on this gantt chart")
                            }else{
                                iter=i
                            }
                        }
                    });

                    if (iter > -1){
                        setRows((st)=>{
                            let ns=[...st]
    
                            ns.splice(iter,1)
    
                            return ns
                        })
                    };

                    

                }}
                
            >taskDEL-</button>
            {taskTypesE}
            <label>dateFrom</label>
            <input  
                value={dateFrom}
                onChange={(e)=>{
                    let val=e.target.value
                    setDateFrom(val)


                }}
                onBlur={(e)=>{
                    let val=e.target.value
                    let iter=-1;

                    rows.forEach((r,i)=>{
                        if (r.id===taskID){
                            iter=i                            
                        }
                    });

                    if (iter > -1){
                        setRows((st)=>{
                            let ns=[...st]
    
                            try {
                                let date=new Date(dateFrom)
                                ns[iter].start=date
                                                                
                            } catch (error) {
                                 alert("date parse error, please try again")                           
                            }
    
                            return ns
                        })
                    };
                }}
            />
            <label>dateTo</label>
            <input  
                value={dateTo}
                onChange={(e)=>{
                    let val=e.target.value
                    setDateTo(val)
                }}
                onBlur={(e)=>{
                    let val=e.target.value
                    let iter=-1;

                    rows.forEach((r,i)=>{
                        if (r.id===taskID){
                            iter=i                            
                        }
                    });

                    if (iter > -1){
                        setRows((st)=>{
                            let ns=[...st]
                            
                            try {
                                let date=new Date(dateTo)
                                ns[iter].end=date
                            } catch (error) {
                                 alert("date parse error, please try again")                           
                            }

                            return ns
                        })
                    };
                }}
            />
            <label>progress%</label>
            <input  
                value={taskProgress}
                onChange={(e)=>{
                    let val=e.target.value
                    setTaskProgress(parseInt(val))
                }}
                onBlur={(e)=>{
                    let val=e.target.value
                    let iter=-1;

                    rows.forEach((r,i)=>{
                        if (r.id===taskID){
                            iter=i
                        }
                    });

                    if (iter > -1){
                        setRows((st)=>{
                            let ns=[...st]
    
                            ns[iter].progress=taskProgress
    
                            return ns
                        })
                    };
                }}
            />
            <label>project</label>
            {
                (()=>{
                    if (true){}

                    let rowProjects=[
                        <option key={"def_" + 0} style={{}} value={""} >{""}</option>
                    ]
                    rows.forEach((r,i)=>{
                        if (r.type==="project"){
                            if (r.id!==taskID){
                                rowProjects.push(
                                    <option key={i} style={{}} value={r.id} >{r.name}</option>
                                )
                            }
                        }
                    });

                    return (
                        <select 
                                value={taskProject}
                                style={{}}
                                onChange={(e) => {
                                    // setUp(e.target.value)
                                    let val=e.target.value
                                    setTaskProject((st)=>{
                                        //let nsr={...st}                            
                                        return val                        
                                    })
                                }}
                                onBlur={(e)=>{
                                    let val=e.target.value
                                    let iter=-1;
                
                                    rows.forEach((r,i)=>{
                                        if (r.id===taskID){                            
                                                iter=i                            
                                        }
                                    }); 
                
                                    if (iter > -1){
                                        setRows((st)=>{
                                            let ns=[...st]
                    
                                            ns[iter].project=val
                    
                                            return ns
                                        })
                                    };
                                }}
                               
                            >
                                {rowProjects}                    
                            </select>
                    )

                })()
            }
            <input  
                value={taskProject}
                onChange={(e)=>{
                    let val=e.target.value
                    setTaskProject(val)
                }}
                onBlur={(e)=>{
                    let val=e.target.value
                    let iter=-1;

                    rows.forEach((r,i)=>{
                        if (r.id===taskID){
                            iter=i
                        }
                    });

                    if (iter > -1){
                        setRows((st)=>{
                            let ns=[...st]
    
                            ns[iter].project=taskProject
    
                            return ns
                        })
                    };
                }}
            />

            {
                (()=>{
                    if (gtTaskType==="project"){

                        return (
                            <>
                                <label>projectID</label>
                                <input  
                                    value={taskID}
                                    onChange={(e)=>{
                                        let val=e.target.value
                                        //setTaskID(val)
                                    }}
                                    onBlur={(e)=>{
                                        let val=e.target.value
                                        let iter=-1;
                                        return
                                        rows.forEach((r,i)=>{
                                            if (r.id===taskID){
                                                iter=i
                                            }
                                        });

                                        if (iter > -1){
                                            setRows((st)=>{
                                                let ns=[...st]
                        
                                                ns[iter].id=taskProject
                        
                                                return ns
                                            })
                                        };
                                    }}
                                />
                                <label>New projectID</label>
                                <input  
                                    value={taskIDNew}
                                    onChange={(e)=>{
                                        let val=e.target.value
                                        setTaskIDnew(val)
                                    }}
                                    onBlur={(e)=>{
                                        let val=e.target.value
                                        let iter=-1;
                                        
                                        rows.forEach((r,i)=>{
                                            if (r.id===taskID){
                                                iter=i
                                            }
                                        });

                                        if (iter > -1){
                                            setRows((st)=>{
                                                let ns=[...st]
                        
                                                ns[iter].id=taskIDNew
                        
                                                return ns
                                            })
                                        };
                                    }}
                                />
                            </>
                        )

                    }

                })()
            }

            <Gantt 
                {...chartprops}
                
                
                           
            />
            
            
           
             
        </div>
    )
    
}