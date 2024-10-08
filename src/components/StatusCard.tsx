import React from 'react'

interface StatusCardProps {
  title: string
  value: number
  unit?: string
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, unit }) => {
  return (
    <div className="bg-gray-900 bg-opacity-60 p-2 rounded-lg flex flex-col items-center justify-center">
      <h3 className="text-xs font-bold mb-1 text-center">{title}</h3>
      <p className="text-sm text-center">
        {value.toFixed(2)}
        {unit && <span className="text-xs ml-1">{unit}</span>}
      </p>
    </div>
  )
}

export default StatusCard