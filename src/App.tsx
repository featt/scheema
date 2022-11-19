import { Flex } from '@chakra-ui/react'
import CustomDNDFlow from './components/CustomDNDFlow'
import CustomFlow from './components/CustomFlow'
import Flow from './components/Flow'
import Sidebar from './components/Sidebar'
import Workflow from './components/Workflow'


function App(): JSX.Element {
  return (
    <Flex w='100vw' h='100vh'>
      
      <CustomDNDFlow/>
    </Flex>
  )
}

export default App
