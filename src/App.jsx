import { useState } from 'react'
import { Button } from '@mui/material'
import Input from './Input'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex justify-center max-auto flex-wrap'>
      <Input />
      <Button sx={{minWidth: "52.5%" }}> Hello there</Button>
    </div>
  )
}

export default App
