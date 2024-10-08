import React from 'react'
import { Home, Radio, Brain } from 'lucide-react'

interface NavigationProps {
  setCurrentPage: (page: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ setCurrentPage }) => {
  return (
    <nav className="mb-6">
      <ul className="flex space-x-4 bg-gray-900 p-2 rounded-lg">
        <li>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="flex items-center px-3 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            <Home size={18} className="mr-2" /> Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentPage('transmitters')}
            className="flex items-center px-3 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            <Radio size={18} className="mr-2" /> Transmitters
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentPage('ai-analysis')}
            className="flex items-center px-3 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            <Brain size={18} className="mr-2" /> AI Analysis
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation