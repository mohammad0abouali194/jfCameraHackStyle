import React, { useEffect, useRef } from 'react'

const MicrophoneModal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)

      for (let i = 0; i < canvas.width; i++) {
        const amplitude = Math.sin(i * 0.05) * 20
        const y = canvas.height / 2 + amplitude * Math.random()
        ctx.lineTo(i, y)
      }

      ctx.strokeStyle = '#00FF00'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw a faint line below the main wave
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2 + 30)
      for (let i = 0; i < canvas.width; i++) {
        const amplitude = Math.sin(i * 0.05) * 10
        const y = canvas.height / 2 + 30 + amplitude * Math.random()
        ctx.lineTo(i, y)
      }
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const interval = setInterval(drawWave, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-3/4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Voice Command Active</h2>
        <canvas ref={canvasRef} width={400} height={100} className="w-full" />
      </div>
    </div>
  )
}

export default MicrophoneModal