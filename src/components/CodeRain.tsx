import React, { useEffect, useRef } from 'react'

const CodeRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pythonCode = [
      'def analyze_data():',
      'import numpy as np',
      'class Sensor:',
      'data = np.array([])',
      'for i in range(100):',
      'if temp > threshold:',
      'return result.tolist()',
      'async def process():'
    ]

    const assemblyCode = [
      'mov eax, [ebp+8]',
      'push ebx',
      'xor ecx, ecx',
      'call _function',
      'pop ebx',
      'ret',
      'jmp short loop',
      'cmp eax, 0'
    ]

    const columns = canvas.width / 10
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height)
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(0, 255, 0, 0.3)'
      ctx.font = '10px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? 
          pythonCode[Math.floor(Math.random() * pythonCode.length)] :
          assemblyCode[Math.floor(Math.random() * assemblyCode.length)]
        ctx.fillText(text, i * 10, drops[i] * 10)

        if (drops[i] * 10 > canvas.height && Math.random() > 0.99) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
}

export default CodeRain