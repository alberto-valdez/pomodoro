import { useState } from "react"

export function useLocalStorage(tarea) {
   
    const [storedValue, setStoredValue] = useState(()=>{
        try{
          const item = window.localStorage.getItem('tareas');
          return item ? JSON.parse(item) : tarea
        } catch (err) {return tarea};
    });

    const setValue = value => {
        try{
            setStoredValue(value);
            let items = JSON.parse(localStorage.getItem('tareas') || '[]');
            items.push(value);
            window.localStorage.setItem('tareas', JSON.stringify(items))
        } catch (err) {console.log(err)};
    }

    return [storedValue, setValue, setStoredValue]
}