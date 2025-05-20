function verifyData(data, actualDate){
    const year = String(actualDate.getFullYear());
    const month = String(actualDate.getMonth());
    const day = String(actualDate.getDate());
  
    if (!data[year]) return false;
    if (!data[year][month]) return false;
    if (!data[year][month][day]) return false;
    if(!data[year][month][day].length) return false;

    return true
}
function removeTask(task, data, actualDate, setDataState){
    const newData = {...data}
    const year = String(actualDate.getFullYear());
    const month = String(actualDate.getMonth());
    const day = String(actualDate.getDate());
    let newArr = []

    for (const element of newData[year][month][day]) {
        if(element!=task){
            newArr.push(element)
        }
    }
    newData[year][month][day]=[...newArr]
    setDataState(newData)
    localStorage.setItem("data", JSON.stringify(data))
}

function changeTask(e){
    let element = e.target.parentElement.nextSibling
    if(element.style.gridTemplateRows=="0fr"){
        element.style.gridTemplateRows="1fr"
        e.target.classList.add("-scale-y-100")
        return
    }
    e.target.classList.remove("-scale-y-100")
    element.style.gridTemplateRows="0fr"
}

export function Tasks(props){
    let actualDate = props.actualDate
    const year = String(actualDate.getFullYear());
    const month = String(actualDate.getMonth());
    const day = String(actualDate.getDate());
    if(!verifyData(props.data, actualDate)){
        return<></>
    }

    let tasksList = []
    for (let i = 0; i < props.data[year][month][day].length; i++) {
        let item = props.data[year][month][day][i]
        tasksList.push(<li style={{ backgroundColor: item.bgColor, color: item.color }} className=" w-full py-1 px-5 text-xl rounded-t-md">
            <div className="flex justify-between w-full">
                <div>
                    <span>{String(parseInt(item.time/60)).padStart(2, "0")}</span>
                    <span>:</span>
                    <span>{String(item.time-parseInt(item.time/60)*60).padStart(2, "0")}</span>
                    <span className="ml-2">{item.title}</span>
                </div>
                <i className="bi bi-caret-down-fill cursor-pointer text-2xl duration-300" onClick={(e)=>changeTask(e)}></i>
            </div>
            <div className="pb-2 grid overflow-hidden duration-300" style={{gridTemplateRows: "0fr"}}>
                <div className="overflow-hidden">
                    <div>
                        {item.description}
                    </div>
                    <div className="flex justify-between pt-2 mt-3 border-t-2 border-dashed" style={{borderColor: item.color}}>
                        <div>
                            {`${day.padStart(2,"0")}-${String(parseInt(month)+1).padStart(2,"0")}-${year}`}
                        </div>
                        <div className="flex gap-3 pr-[2px]">
                            <i className="bi bi-pencil-fill cursor-pointer" onClick={()=>{props.setEditingTask([i, actualDate])}}></i>
                            <i className="bi bi-trash3-fill cursor-pointer" onClick={()=>{removeTask(item, props.data, actualDate, props.setDataState)}}></i>
                        </div>
                    </div>
                </div>
                
            </div>
        </li>)
    }

    return <>
    <div className="h-full justify-between flex flex-col items-center py-3 px-5">
        <ul className="flex flex-col w-full gap-5 max-h-[80dvh] overflow-x-hidden pr-3">
            {tasksList}
        </ul>
        <button 
        className="p-5 text-xl bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 duration-300"
        onClick={()=>props.setAddingNewTask(true)}>
            Adicione uma nova tarefa ;)
        </button>
    </div>
    </>
}