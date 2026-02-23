export function TitleBar({ id }: { id: string }) {
    return(

        <div className="shrink-0 bg-slate-950 p-2 border-b border-slate-800 flex justify-between items-center handle">
        <span className="text-sm font-bold text-slate-200 pl-2">Controller {id}</span>
        <div className='text-[10px] text-slate-500'>ID: {id}</div>
      </div>
    )
}