
import {Dia} from './Dia.jsx';





function changeMonth(actualDate, modifier){
    let newMonth = actualDate.getMonth()
    newMonth+=modifier
    return new Date(actualDate.getFullYear(), newMonth, actualDate.getDate())
}
function changeYear(actualDate, modifier){
    let newYear = actualDate.getFullYear()
    newYear+=modifier
    return new Date(newYear, actualDate.getMonth(), actualDate.getDate())
}


export function Calendario(props){
    let actualDate = props.actualDate
    let setActualDate = props.setActualDate
    const dias = []
    let diaAtual = new Date(actualDate.getFullYear(),actualDate.getMonth(),1).getDay()*-1
    for (let i = 0; i < 6; i++) {
        dias.push(<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">{
            Array.from({ length: 7}).map((_,key) => {
                diaAtual++
                return Dia(key, diaAtual, actualDate, setActualDate, props.data)
            })
        }</tr>)
    }
    
    return (
    <div className="relative overflow-x-auto h-dvh flex flex-col w-full">
        <div className="w-full flex justify-between bg-white dark:bg-gray-700 text-gray-400 border-b-4 border-gray-600">
            <div className="px-6 py-3 font-bold text-xl flex w-[10em] justify-between"><i className="bi bi-chevron-left cursor-pointer" onClick={() => setActualDate(changeMonth(actualDate, -1))}></i> <div>{actualDate.toLocaleDateString('pt-BR', {month: 'long'})}</div> <i className="bi bi-chevron-right cursor-pointer" onClick={() => setActualDate(changeMonth(actualDate, 1))}></i></div>
            <div className="px-6 py-3 font-bold text-xl"><h1>D4FTO'S PLANNER <i className='bi bi-calendar-week'></i></h1></div>
            <div className="px-6 py-3 font-bold text-xl flex w-[8em] justify-between"><i className="bi bi-chevron-left cursor-pointer" onClick={() => setActualDate(changeYear(actualDate, -1))}></i> <div>{actualDate.getFullYear()}</div> <i className="bi bi-chevron-right cursor-pointer" onClick={() => setActualDate(changeYear(actualDate, 1))}></i></div>
        </div>
        <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border dark:border-gray-700 border-gray-200">
                <tr>
                    <th scope="col" className="px-6 py-3">Dom</th>
                    <th scope="col" className="px-6 py-3">Seg</th>
                    <th scope="col" className="px-6 py-3">Ter</th>
                    <th scope="col" className="px-6 py-3">Qua</th>
                    <th scope="col" className="px-6 py-3">Qui</th>
                    <th scope="col" className="px-6 py-3">Sex</th>
                    <th scope="col" className="px-6 py-3">Sab</th>
                </tr>
            </thead>
            <tbody>
                {dias}
            </tbody>
        </table>
    </div>
    )
}
