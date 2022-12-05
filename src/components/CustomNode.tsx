import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { Connection, Handle, Position } from "reactflow";
import React, { memo } from "react";
import useStore from "../store/useStore";
import { useInput } from "../hooks/useInput";


interface IData {
  name: string;
  url: string;
}

interface CustomNodeProps {
  id?: string;
  type?: string;
  data: IData;
}


const Comp = {x: 0, y: 0, z: 0}
const filter = {PI: Math.PI, e: Math.E, log: Math.log}
const elements = [['compressor', Comp], ['filter', filter]]


const CustomNode: React.FC<CustomNodeProps> = (props: CustomNodeProps) => {
  const { values, onChange, setValues } = useInput({})
  const setCurrnetNodeId = useStore<any>(state => state.setCurrentNodeId)
  const setOptions = useStore<any>(state => state.setOptions)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hendleClick = (e: any) => {
    //@ts-ignore
    onOpen(e.target.value);
    setCurrnetNodeId(props?.id);   
    setValues((getStateFromElements(props?.data?.name)))    
    setOptions({});
  };
  
  const getStateFromElements = (name: string) => {
    for(let i = 0; i < elements.length; i++) {
      if(elements[i][0] === name) {
        return elements[i][1]
      }
    }
  }

  const onSubmit = () => {
    setOptions(values);
    onClose();    
  }

  function check() {
    //@ts-ignore
    if (props.data?.result?.res != -123) {
          //@ts-ignore
      return <h1><br></br><br></br><br></br><br></br><br></br><br></br><br></br>Результат: {props.data?.result?.res} </h1>
    }
  }

  function moveResFromSrcToTarget(e: Connection) {
    console.log(e);    
  }

  return (
    <Box     
      w="220px"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize='250px'
      h="170px"
      mt='9px'            
      bgImage={props?.data?.url} 
      onClick={hendleClick}
    >
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Внесение параметров в элемент: {props?.data?.name}
          </DrawerHeader>
          <DrawerBody>
            {Object.entries(values).map(([key, value]) => (
              <InputGroup key={key} mb="10px">
              <InputLeftAddon children={key} />
                <Input
                  // @ts-ignore
                  value={value}
                  onChange={(e) => onChange(e, key.toString())}
                  type="number"
                  placeholder={`Type ${key} value`}
                />
              </InputGroup> 
            ))}           
            <HStack justifyContent='space-between'>
              <Button onClick={onSubmit} bg='green' w='100px'>Вычислить</Button>              
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>      
      {props.data.name === 'filter' ? (
        <>
            <Handle onConnect={e => moveResFromSrcToTarget(e)} type="source" position={Position.Left} style={{ height: 10, width: 10 }} />
            <Handle onConnect={e => moveResFromSrcToTarget(e)} type="target" position={Position.Right} style={{ height: 10, width: 10 }} />
        </>
      ) : (
        <>
            <Handle onConnect={e => moveResFromSrcToTarget(e)} type="source" position={Position.Top} style={{ height: 10, width: 10 }} />
            <Handle onConnect={e => moveResFromSrcToTarget(e)} type="target" position={Position.Bottom} style={{ height: 10, width: 10 }} />
        </>
      )}
      
      {check()}

    </Box>
  );
};

export default memo(CustomNode);
