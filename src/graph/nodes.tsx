import {Node} from '@xyflow/react'

export const initialNodes: Node[] = [
  { 
    id: 'n1', 
    position: { x: 0, y: 0 }, 
    data: { label: 'Node 1' }
  }
];

import { Button } from '@/components/ui/button';

type Props = {
  onAddNode: () => void;
};

export const Controllernode = ({ onAddNode } : Props) => {
  return (
    <div>
      <Button onClick={
        ()=>{onAddNode();
        }
      }>Click Me</Button>
    </div>
  );
};
