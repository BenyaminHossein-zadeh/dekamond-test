import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  className,
  error,
  id,
  onChange,
  ...inputProps
}) => {
  const inputId = id || inputProps.name;

  return (
    <div className={`${styles.inputContainer} ${className || ''}`}>
      <input
        id={inputId}
        className={`${styles.input} ${error ? styles.error : ''}`}
        onChange={onChange}
        {...inputProps}
      />
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;