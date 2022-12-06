import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Image,
  VStack,
  Box,
  AccordionPanel,
  HStack,
  Button
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { COMPRESSOR_IMG, WATER_FILTER } from "../utils/constants";

const Sidebar = () => {
  const onDragStart = (event: any, nodeType: any, flag: string, name: string) => {
    event.dataTransfer.setData('url', flag)
    event.dataTransfer.setData('name', name)
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const navigate = useNavigate()

  return (
    <VStack color="white" w="20%" bg="#191A23">
      <Accordion w="80%" defaultIndex={[0]} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Тестовая группа элементов
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
      <Button onClick={() => navigate('/login')} color='black'>Log out</Button>
    </VStack>
  );
};

export default Sidebar;