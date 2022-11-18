import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactFlowProvider } from 'reactflow'
import App from './App'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReactFlowProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ReactFlowProvider>
)
