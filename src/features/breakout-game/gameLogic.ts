import { Brick, Ball, Paddle, GameConfig } from './types'

export const initBricks = (config: GameConfig): Brick[][] => {
  const bricks: Brick[][] = []
  for (let c = 0; c < config.brickColumnCount; c++) {
    bricks[c] = []
    for (let r = 0; r < config.brickRowCount; r++) {
      const brickHealth = Math.floor(Math.random() * 3) + 1
      bricks[c][r] = {
        x: (c * (config.brickWidth + config.brickPadding)) + config.brickOffsetLeft,
        y: (r * (config.brickHeight + config.brickPadding)) + config.brickOffsetTop,
        width: config.brickWidth,
        height: config.brickHeight,
        status: brickHealth,
        maxHealth: brickHealth
      }
    }
  }
  return bricks
}

export const checkAllBricksDestroyed = (bricks: Brick[][]): boolean => {
  return bricks.every(column => column.every(brick => brick.status === 0))
}

export const detectBallBrickCollision = (ball: Ball, bricks: Brick[][]): { collision: boolean; score: number } => {
  let score = 0
  let collision = false

  for (let c = 0; c < bricks.length; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      const brick = bricks[c][r]
      if (brick.status > 0) {
        if (
          ball.x > brick.x &&
          ball.x < brick.x + brick.width &&
          ball.y > brick.y &&
          ball.y < brick.y + brick.height
        ) {
          brick.status -= 1
          score += 10
          collision = true
          return { collision, score }
        }
      }
    }
  }

  return { collision, score }
}

export const detectBallPaddleCollision = (ball: Ball, paddle: Paddle): boolean => {
  return (
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width &&
    ball.y + ball.radius > paddle.y
  )
}

export const calculateBallBounceAngle = (ball: Ball, paddle: Paddle): number => {
  const hitPos = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2)
  return hitPos * 5
}

export const getBrickColor = (health: number, maxHealth: number): string => {
  if (maxHealth === 1) {
    return '#0095DD'
  } else if (maxHealth === 2) {
    return health === 2 ? '#00DD95' : '#77AADD'
  } else {
    if (health === 3) return '#DD9500'
    else if (health === 2) return '#DDDD00'
    else return '#AAAADD'
  }
}
