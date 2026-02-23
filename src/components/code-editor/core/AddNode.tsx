import { Button } from "../../ui/button";

export function AddNode({ id, data , getNode}: { id: string; data: any , getNode: any}) {
    return(
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
          Add Node
        </Button>
      </div>
    )
}