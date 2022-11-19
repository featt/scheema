import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  Edge,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import './dnd.css'
import CustomNode from './CustomNode';


const nodeTypes = {
    custom: CustomNode,
};
  
  let id = 0;
  const getId = () => `dndnode_${id++}`;
  
  const CustomDNDFlow = () => {
    const reactFlowWrapper = useRef<any>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
    const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), []);
  
    const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
  
    const onDrop = useCallback(
      (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: number; clientY: number; }) => {
        event.preventDefault();
  
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const url = event.dataTransfer.getData('url');
        const name = event.dataTransfer.getData('name');
        
        
        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: { name, url },
        };
  
        setNodes((nds) => nds.concat(newNode));
      },
      [reactFlowInstance]
    );
  
    return (
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
          
          <Sidebar />
        </ReactFlowProvider>
      </div>
    );
  };
  
  export default CustomDNDFlow;
  