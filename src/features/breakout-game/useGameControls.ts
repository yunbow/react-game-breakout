import { useCallback, useEffect, useState } from 'react'
import { GameControls } from './types'

interface UseGameControlsProps {
  onStartGame: () => void
  onTogglePause: () => void
  gameRunning: boolean
}

export const useGameControls = ({ onStartGame, onTogglePause, gameRunning }: UseGameControlsProps) => {
  const [controls, setControls] = useState<GameControls>({
    rightPressed: false,
    leftPressed: false,
  })

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Right':
      case 'ArrowRight':
        setControls(prev => ({ ...prev, rightPressed: true }))
        break
      case 'Left':
      case 'ArrowLeft':
        setControls(prev => ({ ...prev, leftPressed: true }))
        break
      case ' ':
      case 'Spacebar':
        if (!gameRunning) {
          onStartGame()
        }
        e.preventDefault()
        break
      case 'p':
      case 'P':
        if (gameRunning) {
          onTogglePause()
        }
        break
    }
  }, [onStartGame, onTogglePause, gameRunning])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Right':
      case 'ArrowRight':
        setControls(prev => ({ ...prev, rightPressed: false }))
        break
      case 'Left':
      case 'ArrowLeft':
        setControls(prev => ({ ...prev, leftPressed: false }))
        break
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  return controls
}
