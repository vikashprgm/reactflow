import { createFileRoute, Router, useRouter } from '@tanstack/react-router'
import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, OnNodesChange, OnEdgesChange, OnConnect, Controls, Background, Handle, Position, ConnectionMode, useReactFlow} from '@xyflow/react'
import {Node,Edge} from '@xyflow/react'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ReactFlowProvider } from '@xyflow/react';
import { ReactFlowInstance } from '@xyflow/react';
import { Panel } from '@xyflow/react';

export const Route = createFileRoute('/')({
  component: Home,
})
const initialEdges: Edge[] = [];

const initialNodes: Node[] = [
  { 
    id: '1', 
    position: { x: 0, y: 0 }, 
    data: { label: 'Node 1', onAdd: () => {} },
    type: 'controllernode',
  },
];

const flowKey: string = 'xyflow-demo';

let id: number = 2;
const getId = () => `${id++}`;

const Controllernode = ({id, data }: { id:string,data: any }) => {
  const {getNode} = useReactFlow();

  return (
    <div className="w-64 rounded-xl border-2 border-solid border-black bg-slate-800 p-4">
      <div className="flex flex-col gap-3">
        <span className="text-center text-md font-bold text-white">Title</span>
        <Textarea 
          className="nodrag min-h w-full border border-gray-300 p-2" 
          placeholder="Enter text..."
        />
        <Button
          className="nodrag w-full dark:bg-gray-700 dark:text-white active:scale-80"
          
          onClick={()=>{
            const currentNode = getNode(id);
            if (currentNode && data.onAdd) data.onAdd({old_id: currentNode.id, old_pos: currentNode.position});
            
          }}
        >Add Node</Button>
        <div className='text-xs text-white'>Node ID : {id}</div>
      </div>
      <Handle position={Position.Left} type='target' />
      <Handle position={Position.Right} type='source'/>
    </div>
  );
};

const nodeTypes = {
  controllernode: Controllernode,
};

function InnerHome() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const { setViewport } = useReactFlow();
 
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const addNode = useCallback(({ old_id, old_pos }: { old_id: string, old_pos: { x: number, y: number } }) => {
    const newid = getId();
    const newNode: Node = {
      id: newid,
      position: { x: old_pos.x + 300, y: old_pos.y + (0.5 - Math.random()) * 300 },
      data: { 
        label: `Node ${newid}`, 
        onAdd: addNode 
      },
      type: 'controllernode',
    };
    const newEdge: Edge = {
      id: `${newid}-${old_id}`,
      source: `${old_id}`,
      target: `${newid}`,
    };
    setEdges((eds) => eds.concat(newEdge));
    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onRestore = useCallback(() => {
    const flowdata = localStorage.getItem(flowKey);
    const flow = flowdata ? JSON.parse(flowdata) : null;

    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      
      const restoredNodes = (flow.nodes || []).map((node: Node) => ({
        ...node,
        data: { ...node.data, onAdd: addNode }
      }));

      setNodes(restoredNodes);
      setEdges(flow.edges || []);
      setTimeout(() => setViewport({ x, y, zoom }), 0);
    }
  }, [addNode, setViewport]);

  useEffect(() => {
    onRestore();
  },[onRestore]);  

  useEffect(() => {
    if (nodes.length > 0) {
      onSave();
    }
  }, [nodes, edges, onSave]);

  useEffect(() => {
    setNodes((nds) => nds.map((node) => ({
      ...node,
      data: { ...node.data, onAdd: addNode },
    })));
  }, [addNode]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        fitView
        colorMode='dark'
      > 
        <Controls />
        <Background />
        <Panel position="top-center" className="pt-1">
          <Button 
            variant="default" // Shadcn styling
            onClick={() => {
              localStorage.removeItem(flowKey);
              window.location.reload();
            }}
          >
            Reset Flow
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default function Home() {
  return (
    <ReactFlowProvider>
      <InnerHome />
    </ReactFlowProvider>
  )
}