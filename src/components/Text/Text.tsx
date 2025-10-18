import styles from './Text.module.css'

interface TextProps {
  children: React.ReactNode
  variant?: 'normal' | 'bold' | 'large'
  className?: string
}

const Text: React.FC<TextProps> = ({ children, variant = 'normal', className }) => {
  const variantClass = styles[variant] || styles.normal

  return (
    <span className={`${variantClass} ${className || ''}`}>
      {children}
    </span>
  )
}

export default Text
