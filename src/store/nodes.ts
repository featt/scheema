import { Node } from 'reactflow';

export default [
  {
    id: '1',
    type: 'input',
    data: { name: 'filter', props: {x: 5, y: 6}, result: {} },
    position: { x: 250, y: 25 },   
  },

  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Node 3' },
    position: { x: 250, y: 250 },
  },
] as Node[];
