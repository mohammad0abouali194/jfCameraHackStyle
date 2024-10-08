import React, { useState, useEffect } from 'react'
import { MessageSquare } from 'lucide-react'

const AIMessages: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const possibleMessages = [
      "Anomaly detected in Sector 7G",
      "Energy efficiency increased by 15%",
      "Predictive maintenance required for Transmitter #42",
      "New optimization algorithm deployed",
      "Security breach attempt blocked",
      "Production output exceeds daily target by 7%"
    ]

    const interval = setInterval(() => {
      const newMessage = possibleMessages[Math.floor(Math.random() * possibleMessages.length)]
      setMessages(prev => [newMessage, ...prev.slice(0, 4)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2 flex items-center">
        <MessageSquare className="mr-2" /> AI Notifications
      </h2>
      <ul className="space-y-2">
        {messages.map((message, index) => (
          <li key={index} className="bg-gray-800 p-2 rounded">
            {message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AIMessages