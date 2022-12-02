import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
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
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import '../styles/dnd.css'
import CustomNode from './CustomNode';
import useStore from '../store/useStore';

const nodeTypes = {
    custom: CustomNode,
};
  
  let id = 0;
  const getId = () => `${++id}`;
  
  const CustomDNDFlow = () => {
    const currNodeId = useStore(state => state.currentNodeId)
    const reactFlowWrapper = useRef<any>(null);
    const options = useStore(state => state.options)
    const setOptions = useStore(state => state.setOptions)
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    
    useEffect(() => {
      setNodes((prev: Node[]) => prev.map((node: Node) => {
        if(node?.id === currNodeId) {
          node.data = {
            ...node?.data,
            props: {
              ...node?.data?.props,  
              ...options            
            },
            result: {
              ...node?.data?.result,
              res: 5
            }
          }
          return node
        }
        return node
      }))  

    }, [currNodeId, setNodes, options])
    console.log(nodes);
    
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
          data: { name, url, props: {}, result: { res: 0 } },
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
  