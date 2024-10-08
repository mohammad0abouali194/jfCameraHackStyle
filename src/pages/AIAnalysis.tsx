import React, { useState, useEffect } from 'react'
import { Brain } from 'lucide-react'

const AIAnalysis: React.FC = () => {
  const [analysis, setAnalysis] = useState('')

  useEffect(() => {
    const analysisSteps = [
      'Initializing AI analysis module...',
      'Collecting data from all active transmitters...',
      'Processing sensor readings...',
      'Applying machine learning algorithms...',
      'Detecting anomalies in production patterns...',
      'Generating efficiency recommendations...',
      'Predicting maintenance requirements...',
      'Optimizing resource allocation...',
      'Finalizing analysis report...',
      'Analysis complete. Recommendations ready.'
    ]

    let step = 0
    const interval = setInterval(() => {
      if (step < analysisSteps.length) {
        setAnalysis(prev => prev + analysisSteps[step] + '\n')
        step++
      } else {
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Brain className="mr-2" /> AI Analysis
      </h2>
      <div className="bg-black p-4 rounded-lg h-96 overflow-y-auto">
        <pre className="text-green-400 whitespace-pre-wrap">{analysis}</pre>
      </div>
    </div>
  )
}

export default AIAnalysis