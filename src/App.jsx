import { useState } from "react";
import './App.css'
import { Calendario } from "./calendario.jsx";
import { Sidebar } from "./Sidebar.jsx";

if(!localStorage.getItem("data")){
  localStorage.setItem("data",JSON.stringify({}))
}


function setData(data, actualDate, value, setDataState){
  const newData = {...data}
  const year = String(actualDate.getFullYear());
  const month = String(actualDate.getMonth());
  const day = String(actualDate.getDate());

  if (!newData[year]) newData[year] = {};
  if (!newData[year][month]) newData[year][month] = {};
  if (!newData[year][month][day]) newData[year][month][day] = [];
  newData[year][month][day].push(value)
  newData[year][month][day].sort((a,b)=>(parseInt(a.time)-parseInt(b.time)))
  setDataState(()=>newData)
  localStorage.setItem("data", JSON.stringify(newData))
}

function App() {
  const [actualDate, setActualDate] = useState(new Date());
  const [data, setDataState] = useState(() => JSON.parse(localStorage.getItem("data")));

  return (
    <>
    <section className="flex w-dvw">
      <Sidebar actualDate={actualDate} setDataState={setDataState} data={data} setData={setData}/>
      <Calendario actualDate={actualDate} setActualDate={setActualDate} data={data}/>
    </section>
    </>
  )
}

export default App
