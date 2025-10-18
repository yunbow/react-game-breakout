import { useCallback, useEffect, useRef } from 'react'
import { GameState, GameConfig, GameControls } from './types'
import {
  detectBallBrickCollision,
  detectBallPaddleCollision,
  calculateBallBounceAngle,
  checkAllBricksDestroyed
} from './gameLogic'

interface UseGameLoopProps {
  gameState: GameState
  config: GameConfig
  controls: GameControls
  onUpdateGameState: (updates: Partial<GameState>) => void
  onGameWin: () => void
  onLifeLost: () => void
  onGameOver: () => void
}

export const useGameLoop = ({
  gameState,
  config,
  controls,
  onUpdateGameState,
  onGameWin,
  onLifeLost,
  onGameOver
}: UseGameLoopProps) => {
  const animationFrameRef = useRef<number>()

  const gameLoop = useCallback(() => {
    if (gameState.gamePaused || !gameState.gameRunning || gameState.gameOver) {
      return
    }

    const { ball, paddle, bricks, score, lives } = gameState
    let newBall = { ...ball }
    let newPaddle = { ...paddle }
    let newScore = score
    let newLives = lives

    // 衝突検出
    const brickCollision = detectBallBrickCollision(newBall, bricks)
    if (brickCollision.collision) {
      newBall.dy = -newBall.dy
      newScore += brickCollision.score

      if (checkAllBricksDestroyed(bricks)) {
        onGameWin()
        return
      }
    }

    // 壁の衝突判定
    if (newBall.x + newBall.dx > config.canvasWidth - config.ballRadius || newBall.x + newBall.dx < config.ballRadius) {
      newBall.dx = -newBall.dx
    }
    if (newBall.y + newBall.dy < config.ballRadius) {
      newBall.dy = -newBall.dy
    } else if (newBall.y + newBall.dy > config.canvasHeight - config.ballRadius - config.paddleHeight) {
      if (detectBallPaddleCollision(newBall, newPaddle)) {
        const bounceAngle = calculateBallBounceAngle(newBall, newPaddle)
        newBall.dx = bounceAngle
        newBall.dy = -Math.abs(newBall.dy)
      } else if (newBall.y + newBall.dy > config.canvasHeight - config.ballRadius) {
        newLives--
        onUpdateGameState({
          ball: newBall,
          paddle: newPaddle,
          score: newScore,
          lives: newLives
        })
        if (newLives === 0) {
          onGameOver()
          return
        } else {
          onLifeLost()
          return
        }
      }
    }

    // パドルの移動
    if (controls.rightPressed) {
      newPaddle.x += 7
      if (newPaddle.x + config.paddleWidth > config.canvasWidth) {
        newPaddle.x = config.canvasWidth - config.paddleWidth
      }
    } else if (controls.leftPressed) {
      newPaddle.x -= 7
      if (newPaddle.x < 0) {
        newPaddle.x = 0
      }
    }

    // ボールの移動
    newBall.x += newBall.dx
    newBall.y += newBall.dy

    onUpdateGameState({
      ball: newBall,
      paddle: newPaddle,
      score: newScore,
      lives: newLives
    })

    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [gameState, config, controls, onUpdateGameState, onGameWin, onLifeLost, onGameOver])

  useEffect(() => {
    if (gameState.gameRunning && !gameState.gamePaused && !gameState.gameOver) {
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState.gameRunning, gameState.gamePaused, gameState.gameOver, gameLoop])

  return animationFrameRef
}
