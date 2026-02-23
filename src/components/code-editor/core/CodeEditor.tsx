import { Editor } from "@monaco-editor/react"

export function CodeEditor({id , data , updateNodeData}: {id: string, data: any, updateNodeData: (id: string, newData: any) => void}) {
    return(
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
    ) 
}