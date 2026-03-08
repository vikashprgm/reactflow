import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/learnmore/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/learnmore/"!</div>
}
