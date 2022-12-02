import create from "zustand";
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
  } from 'reactflow';
import nodes from "./nodes";
import edges from "./edges";

type RFState = {
    nodes: Node[];
    edges: Edge[];
    currentNodeId: string;
    options: any;
    setOptions: (options: any) => void;
    setCurrentNodeId: (id: string) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
  };

const useStore = create<RFState>((set, get) => ({
    nodes: nodes,
    edges: edges,   
    currentNodeId: '', 
    options: {},
    setOptions: (options: any) => set((state) => ({ options: state.options = options })),
    setCurrentNodeId: (id: string) => {
      set({
        currentNodeId: id
      })
    },
    onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
}))

export default useStore;