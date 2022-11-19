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
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
} from "@chakra-ui/react";
import { Handle, Position } from "reactflow";
import React, { memo, useState } from "react";
import nodes from "../store/nodes";
import { COMPRESSOR_IMG, WATER_FILTER } from "../utils/constants";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currNode, setCurrNode] = useState<string | undefined>("");
  const [firstProp, setFirstProp] = useState<string | any>("");
  const [secondProp, setSecondProp] = useState<string | any>("");
  let curr = nodes.filter((node) => node.id === currNode)[0];
  console.log(curr);
    console.log(props );
    
  const hendleClick = (e: any) => {
    //@ts-ignore
    onOpen(e.target.value);
    setCurrNode(props.id);
  };


  return (
    <HStack
      px={2}
      py={2}
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
            Add props on {props.data.name} Node
          </DrawerHeader>
          <DrawerBody>
            <InputGroup mb="10px">
              <InputLeftAddon children="X:" />
              <Input
                value={firstProp}
                onChange={(e) => setFirstProp(e.target.value)}
                type="number"
                placeholder="Type x..."
              />
            </InputGroup>
            <InputGroup mb="10px">
              <InputLeftAddon children="Y:" />
              <Input
                value={secondProp}
                onChange={(e) => setSecondProp(e.target.value)}
                type="number"
                placeholder="Type y..."
              />
            </InputGroup>
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
