export function NoTasks(props){
    return <>
    <div className="flex flex-col h-full justify-center">
        <i className="bi bi-calendar-x text-center text-6xl"></i>
        <h1 className="px-5 pt-3 text-center font-bold text-2xl">Você não possui tarefas nesse dia!</h1>
        <p className="px-5 pb-3 text-center">Caso você queira:</p>
        <button 
        className="m-10 py-5 text-xl bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 duration-300"
        onClick={()=>props.setAddingNewTask(true)}>
            Adicione uma nova tarefa ;)
        </button>
    </div>
    </>
}