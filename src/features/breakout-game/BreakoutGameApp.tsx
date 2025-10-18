import { useState, useCallback, useRef, useEffect } from 'react'
import GameRenderer from './components/GameRenderer/GameRenderer'
import GameControls from './components/GameControls/GameControls'
import { useGameControls } from './useGameControls'
import { useGameLoop } from './useGameLoop'
import { GameState } from './types'
import { GAME_CONFIG } from '../../Config'
import { initBricks } from './gameLogic'
import styles from './BreakoutGameApp.module.css'

const BreakoutGameApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    gameRunning: false,
    gameOver: false,
    gamePaused: false,
    bricks: initBricks(GAME_CONFIG),
    ball: {
      x: GAME_CONFIG.canvasWidth / 2,
      y: GAME_CONFIG.canvasHeight - 30,
      dx: 4,
      dy: -4,
      radius: GAME_CONFIG.ballRadius
    },
    paddle: {
      x: (GAME_CONFIG.canvasWidth - GAME_CONFIG.paddleWidth) / 2,
      y: GAME_CONFIG.canvasHeight - GAME_CONFIG.paddleHeight,
      width: GAME_CONFIG.paddleWidth,
      height: GAME_CONFIG.paddleHeight
    }
  })

  const handleStartGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameRunning: true,
      gameOver: false,
      gamePaused: false,
      score: 0,
      lives: 3,
      bricks: initBricks(GAME_CONFIG),
      ball: {
        x: GAME_CONFIG.canvasWidth / 2,
        y: GAME_CONFIG.canvasHeight - 30,
        dx: 4,
        dy: -4,
        radius: GAME_CONFIG.ballRadius
      },
      paddle: {
        x: (GAME_CONFIG.canvasWidth - GAME_CONFIG.paddleWidth) / 2,
        y: GAME_CONFIG.canvasHeight - GAME_CONFIG.paddleHeight,
        width: GAME_CONFIG.paddleWidth,
        height: GAME_CONFIG.paddleHeight
      }
    }))
  }, [])

  const handleTogglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gamePaused: !prev.gamePaused
    }))
  }, [])

  const handleUpdateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }, [])

  const handleGameWin = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameRunning: false,
      gameOver: false
    }))
  }, [])

  const handleLifeLost = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      ball: {
        x: GAME_CONFIG.canvasWidth / 2,
        y: GAME_CONFIG.canvasHeight - 30,
        dx: 4,
        dy: -4,
        radius: GAME_CONFIG.ballRadius
      },
      paddle: {
        x: (GAME_CONFIG.canvasWidth - GAME_CONFIG.paddleWidth) / 2,
        y: GAME_CONFIG.canvasHeight - GAME_CONFIG.paddleHeight,
        width: GAME_CONFIG.paddleWidth,
        height: GAME_CONFIG.paddleHeight
      }
    }))
  }, [])

  const handleGameOver = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameRunning: false,
      gameOver: true
    }))
  }, [])

  const controls = useGameControls({
    onStartGame: handleStartGame,
    onTogglePause: handleTogglePause,
    gameRunning: gameState.gameRunning
  })

  useGameLoop({
    gameState,
    config: GAME_CONFIG,
    controls,
    onUpdateGameState: handleUpdateGameState,
    onGameWin: handleGameWin,
    onLifeLost: handleLifeLost,
    onGameOver: handleGameOver
  })

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    canvasRef.current = canvas
    ctxRef.current = ctx
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (gameState.gameRunning && !gameState.gamePaused && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      if (relativeX > 0 && relativeX < GAME_CONFIG.canvasWidth) {
        const newPaddleX = relativeX - GAME_CONFIG.paddleWidth / 2
        setGameState(prev => ({
          ...prev,
          paddle: {
            ...prev.paddle,
            x: Math.max(0, Math.min(newPaddleX, GAME_CONFIG.canvasWidth - GAME_CONFIG.paddleWidth))
          }
        }))
      }
    }
  }, [gameState.gameRunning, gameState.gamePaused])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    if (gameState.gameRunning && !gameState.gamePaused && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      const relativeX = touch.clientX - rect.left
      if (relativeX > 0 && relativeX < GAME_CONFIG.canvasWidth) {
        const newPaddleX = relativeX - GAME_CONFIG.paddleWidth / 2
        setGameState(prev => ({
          ...prev,
          paddle: {
            ...prev.paddle,
            x: Math.max(0, Math.min(newPaddleX, GAME_CONFIG.canvasWidth - GAME_CONFIG.paddleWidth))
          }
        }))
      }
    }
  }, [gameState.gameRunning, gameState.gamePaused])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    if (!gameState.gameRunning) {
      handleStartGame()
    }
  }, [gameState.gameRunning, handleStartGame])

  const handleButtonClick = useCallback(() => {
    if (!gameState.gameRunning) {
      handleStartGame()
    } else {
      handleTogglePause()
    }
  }, [gameState.gameRunning, handleStartGame, handleTogglePause])

  const getButtonText = () => {
    if (!gameState.gameRunning) {
      return gameState.gameOver ? 'もう一度' : 'スタート'
    }
    return gameState.gamePaused ? '再開' : 'ポーズ'
  }

  useEffect(() => {
    if (ctxRef.current) {
      const ctx = ctxRef.current
      ctx.clearRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight)

      if (!gameState.gameRunning && !gameState.gameOver) {
        ctx.font = '48px Arial'
        ctx.fillStyle = '#0095DD'
        ctx.textAlign = 'center'
        ctx.fillText('ブロック崩し', GAME_CONFIG.canvasWidth / 2, 200)

        ctx.font = '24px Arial'
        ctx.fillText('「スタート」ボタンを押すか、', GAME_CONFIG.canvasWidth / 2, 300)
        ctx.fillText('画面をタッチするとゲームが始まります', GAME_CONFIG.canvasWidth / 2, 340)

        ctx.font = '18px Arial'
        ctx.fillText('← →キーでパドルを動かします', GAME_CONFIG.canvasWidth / 2, 400)
        ctx.fillText('Pキーでポーズ', GAME_CONFIG.canvasWidth / 2, 430)
      } else if (gameState.gameOver) {
        ctx.font = '36px Arial'
        ctx.fillStyle = '#DD0000'
        ctx.textAlign = 'center'
        ctx.fillText('ゲームオーバー', GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 - 30)
        ctx.font = '24px Arial'
        ctx.fillStyle = '#0095DD'
        ctx.fillText(`最終スコア: ${gameState.score}`, GAME_CONFIG.canvasWidth / 2, GAME_CONFIG.canvasHeight / 2 + 20)
      } else if (gameState.gameRunning) {
        gameState.bricks.forEach(column => {
          column.forEach(brick => {
            if (brick.status > 0) {
              let color
              const health = brick.status
              const maxHealth = brick.maxHealth

              if (maxHealth === 1) {
                color = '#0095DD'
              } else if (maxHealth === 2) {
                color = health === 2 ? '#00DD95' : '#77AADD'
              } else {
                if (health === 3) color = '#DD9500'
                else if (health === 2) color = '#DDDD00'
                else color = '#AAAADD'
              }

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

        ctx.beginPath()
        ctx.arc(gameState.ball.x, gameState.ball.y, gameState.ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#0095DD'
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.rect(gameState.paddle.x, gameState.paddle.y, GAME_CONFIG.paddleWidth, GAME_CONFIG.paddleHeight)
        ctx.fillStyle = '#0095DD'
        ctx.fill()
        ctx.closePath()
      }
    }
  }, [gameState])

  return (
    <div className={styles.gameContainer}>
      <GameRenderer
        gameState={gameState}
        config={GAME_CONFIG}
        onCanvasReady={handleCanvasReady}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      />
      <GameControls
        score={gameState.score}
        lives={gameState.lives}
        buttonText={getButtonText()}
        onButtonClick={handleButtonClick}
      />
    </div>
  )
}

export default BreakoutGameApp
