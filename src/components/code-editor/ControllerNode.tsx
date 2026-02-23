import { Handle, NodeResizeControl, Position, useReactFlow } from "@xyflow/react";
import { ResizeIcon } from "../ui/ResizeIcon";
import { AddNode } from "./core/AddNode";
import { CodeEditor } from "./core/CodeEditor";
import { TitleBar } from "./core/TitleBar";

export const Controllernode = ({ id, data}: { id: string, data: any}) => {
  const {updateNodeData, getNode } = useReactFlow();

  return (
    <div className="flex flex-col h-full w-full rounded-xl border border-slate-700 bg-slate-900 shadow-xl overflow-hidden">
      
      <NodeResizeControl style={{ border: '2px solid black'}} minWidth={300} minHeight={300}><ResizeIcon/></NodeResizeControl>

      <TitleBar id={id}/>

      <CodeEditor id={id} data={data} updateNodeData={updateNodeData}/>

      <AddNode id={id} data={data} getNode={getNode}/>

      <Handle position={Position.Left} type='target' />
      <Handle position={Position.Right} type='source' />
    
    </div>
  );
};