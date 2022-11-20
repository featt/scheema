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
} from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import React, { memo, useEffect, useState } from "react";
import nodes from "../store/nodes";
import { COMPRESSOR_IMG, WATER_FILTER } from "../utils/constants";
import useStore from "../store/useStore";

interface IData {
  name: string;
  url: string;
}

interface CustomNodeProps {
  id?: string;
  type?: string;
  data: IData;
}

const CustomNode: React.FC<CustomNodeProps> = (props: CustomNodeProps) => {
  const currentNodeId = useStore(state => state.currentNodeId)
  const setCurrnetNodeId = useStore<any>(state => state.setCurrentNodeId)
  const setX = useStore(state => state.setFirst)
  const setY = useStore(state => state.setSecond)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currNode, setCurrNode] = useState<string | undefined>("");
  const [firstProp, setFirstProp] = useState<string | any>("");
  const [secondProp, setSecondProp] = useState<string | any>("");
  let curr = nodes.filter((node) => node.id === currNode)[0];
  console.log(currentNodeId);
  console.log(firstProp);
  
  
  const hendleClick = (e: any) => {
    //@ts-ignore
    onOpen(e.target.value);
    setCurrnetNodeId(props?.id);    
  };

  useEffect(() => {
    console.log(props.data.name);
    
  }, [props.data])

  const handleCalc = () => {
    if(currentNodeId) {
      setX(firstProp)
      setY(secondProp)
    }
  }

  return (
    <HStack
      justifyContent={"space-between"}      
      w="260px"
      bgPosition="center"
      bgRepeat="no-repeat"
      h="150px"
      border='1px'      
      bgImage={props?.data?.url}
      rounded={"lg"}
      onClick={hendleClick}
    >
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Add props on {props?.data?.name} Node
          </DrawerHeader>
          <DrawerBody>
            <InputGroup mb="10px">
              <InputLeftAddon children="X:" />
              <Input
                value={firstProp}
                onChange={(e) => setFirstProp(+e?.target?.value)}
                type="number"
                placeholder="Type x..."
              />
            </InputGroup>
            <InputGroup mb="10px">
              <InputLeftAddon children="Y:" />
              <Input
                value={secondProp}
                onChange={(e) => setSecondProp(+e?.target?.value)}
                type="number"
                placeholder="Type y..."
              />
            </InputGroup>
            <HStack justifyContent='space-between'>
              <Button onClick={handleCalc} bg='green' w='100px'>Calc</Button>
              <Text>⬅️ Result</Text>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>      
      {props.data.name === 'filter' ? (
        <>
            <Handle type="source" position={Position.Left} />
            <Handle type="target" position={Position.Right} />
        </>
      ) : (
        <>
            <Handle type="source" position={Position.Top} />
            <Handle type="target" position={Position.Bottom} />
        </>
      )}
    </HStack>
  );
};

export default memo(CustomNode);
