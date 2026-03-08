import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { ChangeTitle } from "./ChangeTitle"

export function TitleBar({ id, title, updateTitle}: { id: string, title: string, updateTitle: (id: string, newData: any)=>void }) {
  
  return(
        <div className="text-white p-3">
          <Field orientation={"horizontal"} className="justify-between">
              <Label>{title}</Label>
              <ChangeTitle id={id} updateTitle={updateTitle} currentTitle={title}/>
          </Field>
      </div>
    )
}