import { useState } from 'react'
import QuizContainer from './components/QuizContainer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>React Quiz Application</h1>
      <QuizContainer />
    </div>
  )
}

export default App
