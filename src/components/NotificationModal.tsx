import React from 'react'
import { X } from 'lucide-react'

interface NotificationModalProps {
  notifications: string[]
  onClose: () => void
}

const NotificationModal: React.FC<NotificationModalProps> = ({ notifications, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-3/4 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {notifications.map((notification, index) => (
            <div key={index} className="bg-gray-800 p-3 rounded mb-2">
              {notification}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationModal