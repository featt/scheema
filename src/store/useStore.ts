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
    setCurrentNodeId: (id: string) => void;
    first: number;
    second: number;
    setFirst: (x: number) => void;
    setSecond: (y: number) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
  };

const useStore = create<RFState>((set, get) => ({
    nodes: nodes,
    edges: edges,   
    currentNodeId: '', 
    first: 0,
    second: 0,
    setFirst: (x) => {
      set({
        first: x
      })
    },
    setSecond(y) {
        set({
          second: y
        })
    },
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