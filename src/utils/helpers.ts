import {Node} from 'reactflow'

export const getStateFromElements = (name: string, elements: any) => {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i][0] === name) {
      return elements[i][1];
    }
  }
};

export const count = (options: any, prev: any) => {
  let result = 0;
  for (const key of Object.keys(options)) {
    const value = options[key];
    result += value;
  }
  result += prev ? prev[0]?.prevCalc : 0;
  return result;
};

export const savePrevStateNode = (prev: Node[]) => {
  return prev.map((node: Node) => {
    return {
      nodeId: node.id,
      prevCalc: node?.data?.result?.res,
    };
  });
};
