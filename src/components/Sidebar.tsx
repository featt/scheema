import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Button,
  Card,
  Image,
  VStack,
  Box,
  AccordionPanel,
  HStack
} from "@chakra-ui/react";
import { COMPRESSOR_IMG, WATER_FILTER } from "../utils/constants";

const Sidebar = () => {
  const onDragStart = (event: any, nodeType: any, flag: string, name: string) => {
    event.dataTransfer.setData('url', flag)
    event.dataTransfer.setData('name', name)
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <VStack color="white" w="20%" bg="#191A23">
      <Accordion w="80%" defaultIndex={[0]} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Group one
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <HStack spacing={8}>
              <Image src={WATER_FILTER} maxW='80px' maxH='80px' onDragStart={(event) => onDragStart(event, 'custom', WATER_FILTER, 'filter')} />
              <Image src={COMPRESSOR_IMG} maxW='80px' maxH='80px'  onDragStart={(event) => onDragStart(event, 'custom', COMPRESSOR_IMG, 'compressor')} />      
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

export default Sidebar;