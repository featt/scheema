import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import {extendTheme} from '@chakra-ui/react';
import type {ThemeConfig} from '@chakra-ui/react';

// const config: ThemeConfig = {
// 	initialColorMode: 'light',
// 	useSystemColorMode: false,
// };

// const chakraTheme = extendTheme({config});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    
      <ChakraProvider>
        <App />
      </ChakraProvider>

  </BrowserRouter>
)
