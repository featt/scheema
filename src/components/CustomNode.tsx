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
import { Handle, Position } from "reactflow";
import React, { memo } from "react";
import useStore from "../store/useStore";
import { useInput } from "../hooks/useInput";
import { getStateFromElements } from "../utils/helpers";
import { elements } from "../utils/elements";


interface IData {
  [x: string]: any;
  name: string;
  url: string;
}

interface CustomNodeProps {
  id?: string;
  type?: string;
  data: IData;
}

const CustomNode: React.FC<CustomNodeProps> = (props: CustomNodeProps) => {
  const { values, onChange, setValues } = useInput({})
  const setCurrnetNodeId = useStore<any>(state => state.setCurrentNodeId)
  const setOptions = useStore<any>(state => state.setOptions)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hendleClick = () => {
    onOpen();
    setCurrnetNodeId(props?.id);   
    setValues((getStateFromElements(props?.data?.name, elements)))    
    setOptions({});
  };  

  const onSubmit = () => {
    setOptions(values);
    onClose();    
  }

  function check() {
    if (props.data?.result?.res != -123) {
      return <h1><br></br><br></br><br></br><br></br><br></br><br></br><br></br>Результат: {props.data?.result?.res} </h1>
    }
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
                  type="number"
                  // @ts-ignore
                  value={value === null ? '' : value}
                  onChange={(e) => {
                    onChange(e, key.toString())
                    console.log(value);                    
                  }}
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
            <Handle type="source" position={Position.Left} style={{ height: 10, width: 10 }} />
            <Handle type="target" position={Position.Right} style={{ height: 10, width: 10 }} />
        </>
      ) : (
        <>
            <Handle type="source" position={Position.Top} style={{ height: 10, width: 10 }} />
            <Handle type="target" position={Position.Bottom} style={{ height: 10, width: 10 }} />
        </>
      )}
      
      {check()}

    </Box>
  );
};

export default memo(CustomNode);
