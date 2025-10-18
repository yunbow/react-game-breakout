import { useCallback } from 'react'
import Canvas from '../../../../components/Canvas/Canvas'
import { GameState, GameConfig } from '../../types'
import { getBrickColor } from '../../gameLogic'

interface GameRendererProps {
  gameState: GameState
  config: GameConfig
  onCanvasReady: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void
  onMouseMove?: (e: React.MouseEvent) => void
  onTouchMove?: (e: React.TouchEvent) => void
  onTouchStart?: (e: React.TouchEvent) => void
}

const GameRenderer: React.FC<GameRendererProps> = ({
  gameState,
  config,
  onCanvasReady,
  onMouseMove,
  onTouchMove,
  onTouchStart
}) => {
  const drawGame = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight)

    // ブロックの描画
    gameState.bricks.forEach(column => {
      column.forEach(brick => {
        if (brick.status > 0) {
          const color = getBrickColor(brick.status, brick.maxHealth)
          ctx.beginPath()
          ctx.rect(brick.x, brick.y, brick.width, brick.height)
          ctx.fillStyle = color
          ctx.fill()
          ctx.strokeStyle = 'rgba(0,0,0,0.2)'
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.closePath()
        }
      })
    })

    // ボールの描画
    ctx.beginPath()
    ctx.arc(gameState.ball.x, gameState.ball.y, gameState.ball.radius, 0, Math.PI * 2)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()

    // パドルの描画
    ctx.beginPath()
    ctx.rect(gameState.paddle.x, gameState.paddle.y, config.paddleWidth, config.paddleHeight)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
  }, [gameState, config])

  const drawStartScreen = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight)

    ctx.font = '48px Arial'
    ctx.fillStyle = '#0095DD'
    ctx.textAlign = 'center'
    ctx.fillText('ブロック崩し', config.canvasWidth / 2, 200)

    ctx.font = '24px Arial'
    ctx.fillText('「スタート」ボタンを押すか、', config.canvasWidth / 2, 300)
    ctx.fillText('画面をタッチするとゲームが始まります', config.canvasWidth / 2, 340)

    ctx.font = '18px Arial'
    ctx.fillText('← →キーでパドルを動かします', config.canvasWidth / 2, 400)
    ctx.fillText('Pキーでポーズ', config.canvasWidth / 2, 430)
  }, [config])

  const drawGameOverScreen = useCallback((ctx: CanvasRenderingContext2D) => {
    drawGame(ctx)

    ctx.font = '36px Arial'
    ctx.fillStyle = '#DD0000'
    ctx.textAlign = 'center'
    ctx.fillText('ゲームオーバー', config.canvasWidth / 2, config.canvasHeight / 2 - 30)
    ctx.font = '24px Arial'
    ctx.fillStyle = '#0095DD'
    ctx.fillText(`最終スコア: ${gameState.score}`, config.canvasWidth / 2, config.canvasHeight / 2 + 20)
  }, [drawGame, config, gameState.score])


  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    onCanvasReady(canvas, ctx)

    if (!gameState.gameRunning) {
      drawStartScreen(ctx)
    } else if (gameState.gameOver) {
      drawGameOverScreen(ctx)
    } else {
      drawGame(ctx)
    }
  }, [onCanvasReady, gameState, drawStartScreen, drawGameOverScreen, drawGame])

  return (
    <Canvas
      width={config.canvasWidth}
      height={config.canvasHeight}
      onCanvasReady={handleCanvasReady}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    />
  )
}

export default GameRenderer
