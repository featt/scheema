import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import './dnd.css'
import CustomNode from './CustomNode';
import useStore from '../store/useStore';


const nodeTypes = {
    custom: CustomNode,
};
  
  let id = 0;
  const getId = () => `${++id}`;
  
  const CustomDNDFlow = () => {
    const currNodeId = useStore(state => state.currentNodeId)
    const first = useStore(state => state.first)
    const second = useStore(state => state.second)
    const setX = useStore(state => state.setFirst)
    const setY = useStore(state => state.setSecond)
    const reactFlowWrapper = useRef<any>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    console.log(currNodeId);
    console.log(nodes);   
    
    useEffect(() => {
      //@ts-ignore
      setNodes((prev) => prev.map(node => {
        if(node?.id === currNodeId) {
          node.data = {
            ...node?.data,
            props: {
              ...node?.data?.props,
              x: first,
              y: second
            },
            result: {
              ...node?.data?.result,
              res: first + second
            }
          }
          return node
        }
        return node
      }))
      console.log(nodes);
      
    }, [currNodeId, setNodes, first, second])
  
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
          data: { name, url, props: {x: 0, y: 0}, result: { res: 0 } },
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
              <Background/>
              <Controls />
            </ReactFlow>
          </div>
          
          <Sidebar />
        </ReactFlowProvider>
      </div>
    );
  };
  
  export default CustomDNDFlow;
  