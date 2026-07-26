import HlsPlayer from '@/HlsPlayer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/watch/$id')({
  component: HlsPlayer,
})