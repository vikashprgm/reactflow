import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback, useEffect, useRef } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, OnNodesChange, OnEdgesChange, OnConnect, Controls, Background, Handle, Position, useReactFlow} from '@xyflow/react'
import { Node, Edge } from '@xyflow/react'
import { ReactFlowProvider } from '@xyflow/react';
import { ReactFlowInstance } from '@xyflow/react';
import { Panel } from '@xyflow/react';
import { Controllernode } from '@/components/code-editor/ControllerNode';
import { ResetFlow } from '@/components/code-editor/core/Resetflow';
import { HelpBox } from '@/components/code-editor/core/HelpBox';

export const Route = createFileRoute('/')({
  component: Home,
})
const initialEdges: Edge[] = [];

const initialNodes: Node[] = [
  { 
    id: '1', 
    position: { x: 0, y: 0 }, 
    data: { label: 'Node 1', onAdd: () => {}, content: 'Type or Paste code here...' },
    type: 'controllernode',
    style: { width: 400, height: 400}
  },
];

const flowKey: string = 'xyflow-demo';

const nodeTypes = {
  controllernode: Controllernode,
};

function InnerHome() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const { setViewport } = useReactFlow();
  const idcounter = useRef(2);

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

  const addNode = useCallback(({ old_id, old_pos }: { old_id: string, old_pos: { x: number, y: number } }) => {
    const newId = `${idcounter.current++}`;
    
    const newNode: Node = {
      id: newId,
      position: { x: old_pos.x + 450, y: old_pos.y + (Math.random() - 0.5) * 200 },
      data: { 
        label: `Node ${newId}`, 
        onAdd: addNode,
        content: '// Type or Paste code here...'
      },
      type: 'controllernode',
      style: { width: 400, height: 300 }
    };
    
    const newEdge: Edge = {
      id: `${newId}-${old_id}`,
      source: old_id,
      target: newId,
    };
    
    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat(newEdge));
  }, []);

  const onRestore = useCallback(() => {
    const flowdata = localStorage.getItem(flowKey);
    const flow = flowdata ? JSON.parse(flowdata) : null;

    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      
      //calculate max id to set idcounter
      let maxId = 0;
      (flow.nodes || []).forEach((node: Node) => {
        const nId = parseInt(node.id);
        if (!isNaN(nId)) maxId = Math.max(maxId, nId);
      });
      idcounter.current = maxId + 1;

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

  //SAVE FUNCTION
  useEffect(() => {
    if (rfInstance && nodes.length > 0) {
      const saveInterval = setInterval(() => {
        const flow = rfInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
      }, 1000);
      return () => clearInterval(saveInterval);
    }
  }, [rfInstance, nodes, edges]);

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
        fitViewOptions={{maxZoom : 1}}
        colorMode='dark'
      > 
        <Controls />
        <Background />
        <Panel position="top-center" className="pt-1 gap-2 flex">
          <ResetFlow flowKey={flowKey}/>
          <HelpBox/>
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