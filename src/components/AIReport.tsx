import React, { useState, useEffect } from 'react'
import { BarChart2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const AIReport: React.FC = () => {
  const [report, setReport] = useState<string[]>([])
  const productionData = useSelector((state: RootState) => state.production.data)

  useEffect(() => {
    const generateReport = () => {
      const latestData = productionData[productionData.length - 1]
      const newReport = `Analyzing production data for timestamp ${new Date(latestData.createdAt).toLocaleString()}...
Pellet size distribution: ${latestData.pellet_size_dist.toFixed(2)}mm - ${latestData.pellet_size_dist > 1 ? 'Above' : 'Below'} average
Sphericity at ${(latestData.sphericity * 100).toFixed(2)}% - ${latestData.sphericity > 0.85 ? 'Excellent' : 'Needs improvement'}
Broken pellet percentage: ${(latestData.broken_pellet_percent * 100).toFixed(2)}% - ${latestData.broken_pellet_percent < 0.1 ? 'Within' : 'Exceeds'} acceptable range
Sponge iron size distribution: ${latestData.sponge_iron_size_dist.toFixed(2)}mm - ${latestData.sponge_iron_size_dist > 10 ? 'Above' : 'Below'} target`

      setReport(prev => [newReport, ...prev].slice(0, 5))
    }

    generateReport()
  }, [productionData])

  return (
    <div className="bg-gray-900 bg-opacity-60 p-4 rounded-lg shadow-lg h-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <BarChart2 className="mr-2" /> AI Analysis Report
      </h2>
      <div className="bg-black p-4 rounded-lg h-[calc(100%-3rem)] overflow-y-auto">
        {report.map((entry, index) => (
          <pre key={index} className="text-green-400 whitespace-pre-wrap mb-4">{entry}</pre>
        ))}
      </div>
    </div>
  )
}

export default AIReport