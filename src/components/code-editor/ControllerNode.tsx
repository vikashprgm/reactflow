import { Handle, NodeResizeControl, Position, useReactFlow } from "@xyflow/react";
import { ResizeIcon } from "../ui/ResizeIcon";
import { AddNode } from "./core/AddNode";
import { CodeEditor } from "./core/CodeEditor";
import { TitleBar } from "./core/TitleBar";

export const Controllernode = ({ id, data, selected }: { id: string, data: any, selected?: boolean }) => {
  const {updateNodeData, getNode, setNodes } = useReactFlow();

  const updateTitle = (nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, title : newData.title, label: newData.label } };
        }
        return node;
      })
    );
  };

  return (
      <div 
        className={`flex flex-col h-full w-full rounded-xl border-2 bg-slate-900 overflow-hidden
          ${selected 
            ? 'border-pink-100' 
            : 'border-slate-700'
          }`}
      >
      <NodeResizeControl style={{ border: '2px solid black'}} minWidth={300} minHeight={300}><ResizeIcon/></NodeResizeControl>

      <TitleBar title={data.label || data.title} id={id} updateTitle={updateTitle}/>

      <CodeEditor id={id} data={data} updateNodeData={updateNodeData}/>

      <AddNode id={id} data={data} getNode={getNode}/>

      <Handle position={Position.Left} type='target' />
      <Handle position={Position.Right} type='source' />
    
    </div>
  );
};