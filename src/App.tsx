import { Flex } from '@chakra-ui/react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Flow from './pages/Flow'
import Signup from './pages/Signup'

function App(): JSX.Element {
  return (
    <Flex w='100vw' h='100vh'>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/flow' element={<Flow/>} />
      </Routes>      
    </Flex>
  )
}

export default App
