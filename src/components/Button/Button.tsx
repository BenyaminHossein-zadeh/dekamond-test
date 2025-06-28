import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  outline?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  outline = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const getButtonClasses = () => {
    const classes = [styles.button];
    
    if (outline) {
      classes.push(styles.outline, styles[variant]);
    } else {
      classes.push(styles[variant]);
    }
    
    if (size !== 'medium') {
      classes.push(styles[size]);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return (
    <button
      type={type}
      className={getButtonClasses()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 