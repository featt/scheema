import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import React, { memo, useEffect, useState, createContext, useReducer } from "react";
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
  const { values, onChange, setValues } = useInput(Comp)
  const setCurrnetNodeId = useStore<any>(state => state.setCurrentNodeId)
  const setOptions = useStore<any>(state => state.setOptions)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hendleClick = (e: any) => {
    //@ts-ignore
    onOpen(e.target.value);
    setCurrnetNodeId(props?.id);   
    setValues((getStateFromElements(props?.data?.name)))
    console.log((getStateFromElements(props?.data?.name))); 
    console.log(Object.entries(values).map(([key, value]) => (value)));    
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
            Add props on {props?.data?.name} Node
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
              <Button onClick={onSubmit} bg='green' w='100px'>Calc</Button>              
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>      
      {props.data.name === 'filter' ? (
        <>
            <Handle type="source" position={Position.Left} style={{ height: 10, width: 10 }} />
            <Handle onConnect={e => console.log('asdas')} type="target" position={Position.Right} style={{ height: 10, width: 10 }} />
        </>
      ) : (
        <>
            <Handle onConnect={e => console.log(e.sourceHandle)} type="source" position={Position.Top} style={{ height: 10, width: 10 }} />
            <Handle type="target" position={Position.Bottom} style={{ height: 10, width: 10 }} />
        </>
      )}
    </Box>
  );
};

export default memo(CustomNode);
