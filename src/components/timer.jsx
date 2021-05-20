import React, { useContext, useEffect, useState } from 'react';
import click from '../assets/sounds/click.mp3';
import alarm from '../assets/sounds/alarm.mp3';
import {Howl, Howler} from 'howler';
import { PomodoroContext } from '../context/pomodoroContext';
import { FaVolumeDown, FaVolumeMute } from "react-icons/fa";
import swal from 'sweetalert';

export const Timer = () => {

    const {taskView, setTaskView} = useContext(PomodoroContext);


    const  [hora, setHora] = useState();
    const [start, setStart] = useState(false);
    const [intervalid, setIntervalid] = useState(null);
    const [minutos, setMinutos] = useState(25);
    const  [seconds, setSeconds] = useState(0);
    const [volumen, setVolumen] = useState(1.0);
    const [onBreak, setOnBreak] = useState(false);

    
    const runPomodoro = (e) => {
        e.preventDefault();
        setStart(true);
        setMinutos(24);
        setSeconds(59);
    }
    const runBreak = ()=> {
        setTaskView('¡Break!');
        setStart(true);
        setMinutos(3);
        setSeconds(59);
        setOnBreak(true)

    }
    const resetPomdoro = (e) => {
        setStart(false);
    }

    const soundPlay = (src) => {
        const sound = new Howl({
            src
        })
        sound.play();
        
    }
    
    
     useEffect(()=>{
         if(start){
             
            let pomodoro = setInterval(() => {
                clearInterval(pomodoro);
                if(seconds === 0){
                    if(minutos !== 0){
                        setSeconds(59);
                        setMinutos(minutos - 1);
                        soundPlay(click)
                    } else {
                      
                        soundPlay(alarm);
                        setStart(false);
                        if(onBreak){
                            swal("Listo!", "Puedes añadir otra tarea", "success");
                            setOnBreak(false)
                            setTaskView('');
                        }else {
                            swal({
                                title:'¡Tiempo completado!',
                                text:'¿Deseas empezar el descanso?',
                                icon:'success',
                                buttons: ["No!", "Break!"],
                            }).then(willDelete => {
                                if(willDelete){
                                    runBreak();
                                } else {
                                    swal("Listo!", "Puedes añadir otra tarea", "success");
    
                                }
                            })
                        }
                    
                     
                    }
                } else {
                        setSeconds(seconds - 1)
                        soundPlay(click)
                }
   
            }, 1000);
            
         }
        
     }, [seconds]);

    
     const m = minutos < 10 ? `0${minutos}` : minutos;
     const s = seconds < 10 ? `0${seconds}` : seconds;

     useEffect(()=>{
        Howler.volume(volumen);
     },[volumen])
    
     
   
    return(
        <div className="timer">

            <div className="reloj">
                { start ? (
                <h1>{m + ':' + s}</h1>         
                ) : (
                <h1>25:00</h1>
                )

                }
       
            </div>
            <div className="container-flex">
                    {taskView === '' ? ( <h3>No hay tarea</h3> ): (<h3>{taskView}</h3>)}
            </div>
            <div className="container-flex">
                <button disabled={start} onClick={runPomodoro}>
                    Empezar
                </button>
                <button onClick={resetPomdoro}>
                    Detener
                </button>
            </div>

            <div className="container-flex">
              
              { volumen === 0 ? ( 
              <h3 className='volume' onClick={()=>setVolumen(1.0)}>    
                  <FaVolumeMute/>
              </h3>   
             ) : ( 
              <h3 className='volume' onClick={()=>setVolumen(0)}>
                  <FaVolumeDown/>     
              </h3>   
             )}
             
            </div>
        </div>
    )
}