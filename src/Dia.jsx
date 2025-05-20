import { DayTasksList } from "./DayTasksList.jsx";


let defaultClass = `px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border dark:border-gray-700 border-gray-200 hover:bg-gray-600 cursor-pointer relative`

function diasNoMes(mes, ano) {
    var data = new Date(ano, mes, 0);
    return data.getDate();
}

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
  

export function Dia(key, diaAtual, actualDate, setActualDate, data){
    let isLastMonth = diaAtual<1
    let isNextMonth = diaAtual>diasNoMes(actualDate.getMonth()+1,actualDate.getYear())
    let isThisMonth = !(isLastMonth || isNextMonth)
    let isSelected = diaAtual == actualDate.getDate()
    let isToday = diaAtual == new Date().getDate() && actualDate.getFullYear() == new Date().getFullYear() && actualDate.getMonth() == new Date().getMonth()

    return <th  key = {key} scope="row" onClick={() => setActualDate(new Date(actualDate.getFullYear(), actualDate.getMonth(), diaAtual))} className= {
            defaultClass+
            (!isThisMonth?" backdrop-brightness-80 brightness-70 opacity-75 ":"") + 
            (isSelected?" saturate-200 bg-wwhite dark:bg-gray-700":"") +
            (isToday?"  outline outline-8 outline-gray-700 outline-dashed outline-offset-[-4px]":"")
        }>
        <div className="relative">

            
            <div>
                {
                isLastMonth?
                diasNoMes(actualDate.getMonth(), actualDate.getYear())+diaAtual:
                isNextMonth?
                diaAtual-diasNoMes(actualDate.getMonth()+1,actualDate.getYear()):
                diaAtual
                }
            </div>
            <div className="absolute max-w-[75%]  overflow-hidden top-[50%] translate-y-[-50%] right-[0]">
                {verifyData(data, new Date(actualDate.getFullYear(), actualDate.getMonth(), diaAtual))?DayTasksList(data, new Date(actualDate.getFullYear(), actualDate.getMonth(), diaAtual)):<></>}
            </div>
            
        </div>
    </th>
}