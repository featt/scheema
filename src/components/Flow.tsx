import { Flex } from '@chakra-ui/react';
import ReactFlow, { Background, MiniMap, ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import edges from '../store/edges'
import nodes from '../store/nodes'
import './button.css';

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};

const connectionLineStyle = { stroke: 'white' };
console.log(nodes);

function Flow() {
  return (
    <Flex w='100%'>
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        defaultEdgeOptions={edgeOptions}
        fitView
        style={{
          backgroundColor: '#D3D2E5',
        }}
        connectionLineStyle={connectionLineStyle}
        onClick={e => console.log(e.target)}
      />    
      <MiniMap/>
    </Flex>
  );
}

export default Flow
