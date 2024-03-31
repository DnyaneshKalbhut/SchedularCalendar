import { useState } from 'react'
import Modal from "react-modal";
import Calender from './Components/Calender';
import './App.css'



Modal.setAppElement('#root');

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Calender />
    </>
  )
}

export default App
