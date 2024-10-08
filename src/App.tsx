import React, { useState, useEffect } from 'react'
import { Monitor, Mic, Bell } from 'lucide-react'
import { Provider } from 'react-redux'
import { store } from './store'
import CodeRain from './components/CodeRain'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Transmitters from './pages/Transmitters'
import AIAnalysis from './pages/AIAnalysis'
import MicrophoneModal from './components/MicrophoneModal'
import NotificationModal from './components/NotificationModal'
import { socket } from './socket'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isMicActive, setIsMicActive] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    socket.on('notification', (message: string) => {
      setNotifications(prev => [...prev, message])
    })

    return () => {
      socket.off('notification')
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'transmitters':
        return <Transmitters />
      case 'ai-analysis':
        return <AIAnalysis />
      default:
        return <Dashboard />
    }
  }

  const handleMicClick = () => {
    setIsMicActive(true)
    setTimeout(() => setIsMicActive(false), 4000)
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
        <CodeRain />
        <div className="container mx-auto p-4 relative z-10">
          <header className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <Monitor className="mr-2" /> Industrial Control Center
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleNotificationClick}
                className="bg-gray-800 bg-opacity-60 p-2 rounded-full hover:bg-opacity-80 transition-colors relative"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              <button
                onClick={handleMicClick}
                className="bg-gray-800 bg-opacity-60 p-2 rounded-full hover:bg-opacity-80 transition-colors"
              >
                <Mic size={20} />
              </button>
            </div>
          </header>
          <Navigation setCurrentPage={setCurrentPage} />
          {renderPage()}
        </div>
        {isMicActive && <MicrophoneModal />}
        {showNotifications && <NotificationModal notifications={notifications} onClose={() => setShowNotifications(false)} />}
      </div>
    </Provider>
  )
}

export default App