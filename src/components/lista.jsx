import React, { useContext, useEffect, useState } from 'react';
import {  TiPlusOutline } from "react-icons/ti";
import { PomodoroContext } from '../context/pomodoroContext';
import { useLocalStorage } from '../context/useLocalStorage';
import { FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";
export const Lista = () => {
   
    const [inputText, setInputText] = useState({nombre:'', id:0, urgente:false});
    const [tarea, setTarea] = useLocalStorage(inputText);
    const [tareas, setTareas] = useState([]);
    const [storedValue, setStoredValue] = useLocalStorage();
    const [reloadPage, setReloadPage] = useState(false);
    const {taskView, setTaskView} = useContext(PomodoroContext);

    const addTask = () => {
        setTarea(inputText);
        setInputText({nombre:'', id:0, urgente:false})
    }

    const deleteItem = (id) => {
    
      for( let i = 0; i < tareas.length;  i++){
        if(id === tareas[i].id){

          if(tareas[i].nombre === taskView){
            setTaskView('')
          }
          let newArray = [...tareas];
          newArray.splice(i, 1);
          console.log(newArray)
          window.localStorage.setItem('tareas', JSON.stringify(newArray));
          setTareas(JSON.parse(window.localStorage.getItem('tareas')))
          return;
        }
      }
    }

    useEffect(()=>{
   
      if(tarea.length>=1 || tarea.nombre != ''){
        setTareas(JSON.parse(window.localStorage.getItem('tareas')))
      } else {
          return;
      }

    },[tarea])
   
    if(tareas.length >= 1){
        const tareaList = tareas.map((task, i)=>{
            return (
                <section key={i} className={`section ${task.urgente}`}>
                <span className='tarea-button '> <a onClick={()=>{setTaskView(task.nombre)}}>{task.nombre}</a>  <a className='boton-lista' onClick={()=>deleteItem(task.id)}><FaRegTrashAlt/></a></span>
              
               </section>    
            )
        })
        return(
        <div className="lista">
            <h3>Lista</h3>
            <form onSubmit={addTask}>
            <div className="input-row">
            <input type='text' placeholder='Nombre tarea' defaultValue={inputText.nombre} onChange={(e)=>{setInputText({nombre:e.target.value,id:Math.floor(Math.random()*1000000),urgente:false })}} required/>
            
            <select id='urgencia'  onChange={(e)=>{setInputText({...inputText, urgente: e.target.value})}}>
            <option value="false">No urgente</option>
            <option value="true">Urgente</option>
           
          </select>
            <button type='submit'> <FaPlusCircle/></button>
            </div>
            </form>
            
            <div className="list-row">
             {tareaList}
            </div>
           
        </div>
    )
    } else {
       
        return(
        <div className="lista">
            <h3>Lista</h3>
            <form onSubmit={addTask}>
            <div className="input-row">
            <input type='text' placeholder='Nombre tarea' defaultValue={inputText.nombre} onChange={(e)=>{setInputText({nombre:e.target.value,id:Math.floor(Math.random()*1000000),urgente:false })}} required/>      
            <select id='urgencia'  onChange={(e)=>{setInputText({...inputText, urgente: e.target.value})}}>
            <option value="false">No urgente</option>
            <option value="true">Urgente</option>
           
          </select>
            <button type='submit'> <FaPlusCircle/></button>
            </div>
            </form>
           
            <div className="list-row">
             <a>No hay tareas</a>
            </div>
           
        </div>
    )
    }
            
    
    
}