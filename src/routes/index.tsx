import { createFileRoute} from '@tanstack/react-router'
import { useState, useCallback, useEffect, useRef } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, OnNodesChange, OnEdgesChange, OnConnect, Controls, Background, Handle, Position, ConnectionMode, useReactFlow, NodeResizer} from '@xyflow/react'
import {Node,Edge} from '@xyflow/react'
import { Button } from '@/components/ui/button';
import { Editor } from '@monaco-editor/react';
import { ReactFlowProvider } from '@xyflow/react';
import { ReactFlowInstance } from '@xyflow/react';
import { Panel } from '@xyflow/react';
import { NodeResizeControl } from '@xyflow/react';
import { ResizeIcon } from '@/components/ui/ResizeIcon';

export const Route = createFileRoute('/')({
  component: Home,
})
const initialEdges: Edge[] = [];

const initialNodes: Node[] = [
  { 
    id: '1', 
    position: { x: 0, y: 0 }, 
    data: { label: 'Node 1', onAdd: () => {}, content: 'Example' },
    type: 'controllernode',
    style: { width: 400, height: 400}
  },
];

const flowKey: string = 'xyflow-demo';

const Controllernode = ({ id, data, selected }: { id: string, data: any, selected?: boolean }) => {
  const {updateNodeData, getNode } = useReactFlow();

  return (
    <div className="flex flex-col h-full w-full rounded-xl border border-slate-700 bg-slate-900 shadow-xl overflow-hidden">
      <NodeResizeControl style={{ border: '2px solid black'}} minWidth={300} minHeight={300}>
        <ResizeIcon/>
      </NodeResizeControl>

      <div className="shrink-0 bg-slate-950 p-2 border-b border-slate-800 flex justify-between items-center handle">
        <span className="text-sm font-bold text-slate-200 pl-2">Controller {id}</span>
        <div className='text-[10px] text-slate-500'>ID: {id}</div>
      </div>

      <div className="grow min-h-0 w-full relative nodrag nowheel">
        <Editor 
          height="100%"
          defaultValue={data.content || "//Your Code here..."}
          theme="vs-dark"
          onChange={(val)=> updateNodeData(id, { content: val })}
          options={{
            minimap: { enabled: false },
            fontSize: 12,
            padding: { top: 10 },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <div className="shrink-0 p-3 bg-slate-900 border-t border-slate-800">
        <Button
          size="sm"
          className="nodrag w-full bg-blue-600 hover:bg-blue-500 text-white"
          onClick={() => {
            const currentNode = getNode(id);
            if (currentNode && data.onAdd) {
              data.onAdd({ old_id: currentNode.id, old_pos: currentNode.position });
            }
          }}
        >
          Add Next Node
        </Button>
      </div>

      <Handle position={Position.Left} type='target' />
      <Handle position={Position.Right} type='source' />
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
        <Panel position="top-center" className="pt-1">
          <Button 
            variant="default"
            onClick={() => {
              localStorage.removeItem(flowKey,);

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