import { createContext, useState } from "react";


export const PomodoroContext = createContext();


export const PomodoroProvider = ({ children }) => {

    const [taskView, setTaskView] = useState('');

    return (
        <PomodoroContext.Provider
        value={{
            taskView,
            setTaskView
        }}
        >
            { children }
        </PomodoroContext.Provider>
    )
}