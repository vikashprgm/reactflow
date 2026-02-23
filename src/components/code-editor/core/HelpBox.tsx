import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function HelpBox() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Help</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Help</DialogTitle>
          <DialogDescription>
            These are the basics of how to use the React Flow editor. For more detailed information, please refer to the documentation.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
            <p className="mb-4 leading-normal">
               To add a new node, click on the "Add Node" button on the bottom of an existing node. The new node will be connected to that node 
               <br/><br/>
               To edit a node's content, simply click on the node and start typing in the code editor that appears. 
               <br/><br/>
               You can also delete a node by selecting it and pressing the "Delete" or "Backspace" key on your keyboard.
            </p>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
