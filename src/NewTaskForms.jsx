import { useState } from "react";
import "./NewTaskForms.css"


export function NewTaskForms(props){
    const [hour, setHour] = useState("06")
    const [minute, setMinute] = useState("30")
    const [title, setTitle] = useState("Tarefa sem nome")
    const [description, setDescription] = useState("")
    const [bgColor, setBgColor] = useState("#bbbfd5")
    const [color, setColor] = useState("#000000")
    const handleHourChange = (e) => {
        const value = parseInt(e.target.value)
        if (value >= 0 && value <= 23) {
            setHour(String(value).padStart(2,"0"))
            return
        }
        if (value<0){
            setHour("23")
            return
        }
        if(value>23){
            setHour("00")
            return
        }
    };
    
    const handleMinuteChange = (e) => {
        const value = parseInt(e.target.value)
        if (value >= 0 && value <= 59) {
            setMinute(String(value).padStart(2,"0"))
            return
        }
        if (value<0){
            setMinute("59")
            return
        }
        if(value>59){
            setMinute("00")
            return
        }
    };
    const handleTitleChange = (e) => {
        const value = e.target.value
        if (value.length<26) {
            setTitle(value)
            return
        }
    };
    const handleDescriptionChange = (e) => {
        const value = e.target.value
        if (value.length<144) {
            setDescription(value)
            return
        }
    };
    function send(event){
        event.preventDefault()

        let value = {
            time: parseInt(hour)*60+parseInt(minute),
            title: title,
            description: description,
            bgColor: bgColor,
            color: color
        }
        props.setData(props.data, props.actualDate, value, props.setDataState)
    }
    return <>
    <form onSubmit={send} className="flex flex-col items-center justify-center w-full h-full px-5">
        <h1 className="text-3xl">Horário:</h1>
        <div className="flex text-6xl">
            <input type="number" name="hour" id="hour" value={hour} onChange={handleHourChange} className="text-right w-[2ch] focus:outline-none focus:underline"/>
            <span>:</span>
            <input type="number" name="minute" id="minute" value={minute} onChange={handleMinuteChange} className="w-[2ch] focus:outline-none focus:underline"/>
        </div>
        <hr className="h-px w-75 border border-gray-600 my-2" />
        <h1 className="text-3xl pb-3">Título:</h1>
        <div className="flex text-xl">
            <input type="text" name="title" id="title" value={title} onChange={handleTitleChange} minLength={1} required className="w-[25ch] text-center border-2 border-gray-600 focus:outline-none rounded-sm"/>
        </div>
        <hr className="h-px w-75 border border-gray-600 my-4" />
        <h1 className="text-3xl pb-3">Descrição:</h1>
        <div className="flex text-xl">
            <textarea name="description" id="description" value={description} onChange={handleDescriptionChange} className="w-[25ch] text-center border-2 border-gray-600 focus:outline-none rounded-sm h-[180px] resize-none"/>
        </div>
        <hr className="h-px w-75 border border-gray-600 my-4" />
        <h1 className="text-3xl pb-3">Cor de fundo:</h1>
        <div className="flex text-xl">
            <input type="color" name="color" id="color" value={bgColor} onChange={(e)=>{setBgColor(e.target.value)}} className="mr-2"/>
            <p>{bgColor}</p>
        </div>
        <hr className="h-px w-75 border border-gray-600 my-4" />
        <h1 className="text-3xl pb-3">Cor do texto:</h1>
        <div className="flex text-xl">
            <input type="color" name="color" id="color" value={color} onChange={(e)=>{setColor(e.target.value)}} className="mr-2"/>
            <p>{color}</p>
        </div>
        <hr className="h-px w-75 border border-gray-600 my-4" />
        <ul className="flex flex-col w-full gap-5">
            <li style={{ backgroundColor: bgColor, color: color }} className=" w-full py-1 px-5 text-xl rounded-t-md">
                <div className="flex justify-between w-full">
                    <div>
                        <span>{hour}</span>
                        <span>:</span>
                        <span>{minute}</span>
                        <span className="ml-2">{title}</span>
                    </div>
                    <i className="bi bi-caret-down-fill cursor-pointer text-2xl duration-300"></i>
                </div>
                <div className="pb-2 grid overflow-hidden duration-300" style={{gridTemplateRows: "0fr"}}>
                    <div className="grid  overflow-hidden">
                        {description}
                    </div>
                </div>
            </li>
        </ul>
        <button 
        className="m-5 py-5 px-5 text-xl bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 duration-300"
        >
            Adicionar Tarefa
        </button>
    </form>
    </>
}