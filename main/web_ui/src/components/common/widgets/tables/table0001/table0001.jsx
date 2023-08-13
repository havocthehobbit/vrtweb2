import React,{ useState,useEffect,useRef,useContext ,Context} from "react"
export const contextStore=React.createContext()
                

export const Table001=(props)=>{
    let ctx=useContext(contextStore)
    let [searchTxt,setSearchTxt]=useState("")
    let [current,setCurrent]=useState("")

    let tmp=""
    let params={
        hasSearch : true,
        style : {position: "relative", display : "inline-block",
                width : 820,height : 340,padding : 30,
                overflow : "hidden" ,
        }
    }   
    
    

    tmp="hasSearch"
    if (typeof(props[tmp])!=="undefined"){
        params[tmp]=props[tmp]
    }

    let data=props.data
    
    
    let tdataE=[]

    useEffect(()=>{
       if (tdataE.length===1){
        console.log("1111")
       } 
    },[tdataE])

    let tmpTdata=[]
    data.forEach((r,i)=>{

        let background=undefined
        
        if (current===r.uuid){
            background="#FFF8DC"
        }

        let foundSearch=false
        if (r.name.toLowerCase().includes(searchTxt.toLowerCase())){
            foundSearch=true
        }
        if (r.desc.toLowerCase().includes(searchTxt.toLowerCase())){
            foundSearch=true
        }
        if (r.uuid===searchTxt){
            foundSearch=true
        }

        if (searchTxt===""){
            foundSearch=true
        }
        
        if (foundSearch){
            tdataE.push(
                <tr
                    let style={{ background : background,
                                    cursor  : "pointer",
                    }}
                    key={i}
                    uuid={r.uuid}
                    onClick={(e)=>{
                        e.preventDefault()
                        e.stopPropagation()
                        let val=e.target.getAttribute("uuid")
                        setCurrent(val)
                        ctx.setCurrentUUID(val)
                    }}
                >
                    <td>{i + 1}</td>
                    <td uuid={r.uuid}><p style={{ userSelect : "none",pointerEvents : "none", display : "inline-block"}}>{r.name}</p></td>
                    <td uuid={r.uuid}><p style={{ userSelect : "none",pointerEvents : "none", display : "inline-block"}}>{r.desc}</p></td>
                </tr>
            )
        }
        
    })
        
    let header={}
    let headerE=(()=>{
        return (
            <>
                <th>#</th>
                <th>name</th>
                <th>desc</th>
            </>
        )
    })()

    let tb=(
        <table
            style={{ display : "inline"}}
        >
            <thead style={{}}>
                <tr>
                    {headerE}
                </tr>
            </thead>
            
            <tbody>
                  {tdataE}
            </tbody>
        </table>
    )

    let SearchE
    if (params.hasSearch){
        SearchE=(()=>{
            return (
                <div
                    style={{ 
                            //position: "relative",
                            display : "inline-block",
                            background : "grey",
                            width : 820

                    }}
                >
                    <input
                        style={{ width : "60%",
                                    margin : 5,
                        
                        }}
                        placeholder="SEARCH/FILTER..."
                        value={searchTxt}
                        onChange={(e)=>{
                            let val=e.target.value//getAttribute("value")
                            setSearchTxt(val)
                        }}
                    />
                    <label>{tdataE.length}/{data.length}</label>
                    

                </div>
            )
        })()
    }

    return (
        <>
            <div style={params.style}>
                {SearchE} 
                <br/>
                <div

                    style={{ 
                            height : params.style.height ,
                            overflow : "auto",
                    }}
                >
                    {tb}
                </div>
                
            </div>
           
        </>
    )
}