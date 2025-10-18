import { useRef, useEffect } from 'react'
import styles from './Canvas.module.css'

interface CanvasProps {
  width: number
  height: number
  onCanvasReady: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void
  onMouseMove?: (e: React.MouseEvent) => void
  onTouchMove?: (e: React.TouchEvent) => void
  onTouchStart?: (e: React.TouchEvent) => void
}

const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  onCanvasReady,
  onMouseMove,
  onTouchMove,
  onTouchStart
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        onCanvasReady(canvas, ctx)
      }
    }
  }, [onCanvasReady])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={styles.canvas}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    />
  )
}

export default Canvas
