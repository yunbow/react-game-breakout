import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, className }) => {
  return (
    <button
      className={`${styles.button} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
