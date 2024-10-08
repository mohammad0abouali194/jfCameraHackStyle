import React, { useEffect, useRef } from 'react'

interface GraphProps {
  data: number[]
  label: string
}

const Graph: React.FC<GraphProps> = ({ data, label }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#00FF00'
      ctx.lineWidth = 2
      ctx.beginPath()
      const step = canvas.width / (data.length - 1)
      data.forEach((value, index) => {
        const x = index * step
        const y = canvas.height - (value / 100) * canvas.height
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()
    }

    drawGraph()
  }, [data])

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-2">{label}</h3>
      <canvas ref={canvasRef} width={300} height={150} className="w-full" />
    </div>
  )
}

export default Graph