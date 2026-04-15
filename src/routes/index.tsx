import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'

export const Route = createFileRoute('/')({
  component: HomePage,
})

export default function HomePage() {
  return (
    <Hero/>
  )
}
