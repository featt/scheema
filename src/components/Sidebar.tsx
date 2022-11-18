import { Button, VStack } from "@chakra-ui/react"
import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import useStore from "../store/useStore"


const Sidebar = () => {
    let nodeId = 3;
    const reactFlowInstance = useReactFlow();
    const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

    return(
        <VStack w='20%' bg='#191A23'>
             <Button onClick={onClick} className="btn-add">Add Node</Button> 
        </VStack>
    )
}

export default Sidebar