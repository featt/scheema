import { Flex } from '@chakra-ui/react'
import { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, EdgeChange, NodeChange, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
    { id: '3', data: { label: 'Node 3' }, position: { x: 5, y: 150 } },
    { id: '4', data: { label: 'Node 4' }, position: { x: 5, y: 200 } },
  ];
  
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }, {id: 'e3-4', source: '3', target: '4'}];

function Workflow(): JSX.Element {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const onNodesChange = useCallback(    
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  return (
    <Flex w='80%' h='100vh'>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Flex>
  )
}

export default Workflow
