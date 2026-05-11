'use client'

import dynamic from 'next/dynamic'

// ssr: false is only allowed inside a Client Component
const ChatWidget = dynamic(() => import('@/components/chat/chat-widget'), {
  ssr: false,
  loading: () => null,
})

export default function ChatWidgetLoader() {
  return <ChatWidget />
}
