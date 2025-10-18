export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  dx: number;
  dy: number;
}

export interface Ball extends Position, Velocity {
  radius: number;
}

export interface Paddle extends Position {
  width: number;
  height: number;
}

export interface Brick extends Position {
  width: number;
  height: number;
  status: number;
  maxHealth: number;
}

export interface GameState {
  score: number;
  lives: number;
  gameRunning: boolean;
  gameOver: boolean;
  gamePaused: boolean;
  bricks: Brick[][];
  ball: Ball;
  paddle: Paddle;
}

export interface GameConfig {
  ballRadius: number;
  paddleHeight: number;
  paddleWidth: number;
  brickRowCount: number;
  brickColumnCount: number;
  brickWidth: number;
  brickHeight: number;
  brickPadding: number;
  brickOffsetTop: number;
  brickOffsetLeft: number;
  canvasWidth: number;
  canvasHeight: number;
}

export interface GameControls {
  rightPressed: boolean;
  leftPressed: boolean;
}
