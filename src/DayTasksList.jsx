
export function DayTasksList(data, actualDate){
    let tasksList = []
    let count = 0
    const year = String(actualDate.getFullYear());
    const month = String(actualDate.getMonth());
    const day = String(actualDate.getDate());
    for (const element of data[year][month][day]) {
        tasksList.push(
        <li className="max-w-full p-1 rounded-t-md opacity-75" style={{backgroundColor : element.bgColor, color : element.color}}>
            <p className="max-w-full overflow-hidden">
                <span>{String(parseInt(element.time/60)).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(element.time-parseInt(element.time/60)*60).padStart(2, "0")}</span>
                <span className="ml-2">{element.title}</span>
            </p>
        </li>)
        count++
        if(count>=3){
            break
        }
    }
    return <ul className="max-w-full flex flex-col gap-3">
        {tasksList}
    </ul>
}