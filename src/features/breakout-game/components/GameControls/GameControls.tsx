import Button from '../../../../components/Button/Button'
import Text from '../../../../components/Text/Text'
import styles from './GameControls.module.css'

interface GameControlsProps {
  score: number
  lives: number
  buttonText: string
  onButtonClick: () => void
}

const GameControls: React.FC<GameControlsProps> = ({
  score,
  lives,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className={styles.controls}>
      <Button onClick={onButtonClick}>
        {buttonText}
      </Button>
      <div className={styles.scoreContainer}>
        <Text variant="bold">スコア: <span>{score}</span></Text>
      </div>
      <div className={styles.livesContainer}>
        <Text variant="bold">残機: <span>{lives}</span></Text>
      </div>
    </div>
  )
}

export default GameControls
