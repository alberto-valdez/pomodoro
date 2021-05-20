import logo from './logo.svg';
import './App.css';
import { Lista } from './components/lista';
import { Timer } from './components/timer';
import { PomodoroProvider } from './context/pomodoroContext';

function App() {
  return (
    <PomodoroProvider>

    
    <div className='container'>
      <div className='titulo'>
      <h1>Pomodoro</h1>
      </div>

      <div className='split-container'>
        <div>
        <Lista/>
        </div>
        <div>
        <Timer/>
        </div>
      </div>
      
    </div>
    </PomodoroProvider>
  );
}

export default App;
