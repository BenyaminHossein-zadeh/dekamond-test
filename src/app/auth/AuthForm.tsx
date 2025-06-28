"use client"

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { useState } from "react";
import Input from "@/components/Input";
import { authenticateUser } from "./actions";
import { getPasswordStrength } from "@/core/validation";
import styles from "./auth.module.scss";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={styles.submitButton}
    >
      {pending ? "در حال انتظار..." : "ورود"}
    </button>
  );
}

export default function AuthForm() {
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | 'very strong'>('weak');
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction] = useActionState(authenticateUser, null);

  const handlePasswordChange = (password: string) => {
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrengthColor = (strength: 'weak' | 'medium' | 'strong' | 'very strong') => {
    switch (strength) {
      case 'weak': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'strong': return '#28a745';
      case 'very strong': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const getPasswordStrengthText = (strength: 'weak' | 'medium' | 'strong' | 'very strong') => {
    switch (strength) {
      case 'weak': return 'ضعیف';
      case 'medium': return 'متوسط';
      case 'strong': return 'قوی';
      case 'very strong': return 'خیلی قوی';
      default: return '';
    }
  };

  const getPasswordStrengthWidth = (strength: 'weak' | 'medium' | 'strong' | 'very strong') => {
    switch (strength) {
      case 'weak': return '25%';
      case 'medium': return '50%';
      case 'strong': return '75%';
      case 'very strong': return '100%';
      default: return '0%';
    }
  };

  return (
    <>
      {state?.errors?.general && (
        <div className={styles.errorMessage}>
          {state.errors.general}
        </div>
      )}
      
      <form action={formAction} className={styles.form}>
        <input type="hidden" name="redirectTo" value="/dashboard" />
        
        <Input
          type="text"
          name="phone"
          label="شماره موبایل"
          required
          error={state?.errors?.phone}
        />

        <div className={styles.passwordContainer}>
          <div className={styles.passwordInputWrapper}>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={`${styles.input} ${state?.errors?.password ? styles.error : ''}`}
                minLength={8}
                required
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <label htmlFor="password" className={styles.label}>
                رمز عبور
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.passwordToggle}
                aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {state?.errors?.password && (
              <div className={styles.errorMessage}>
                {state.errors.password}
              </div>
            )}
          </div>
          
          {/* Password strength indicator */}
          <div className={styles.passwordStrength}>
            <div className={styles.strengthBar}>
              <div 
                className={styles.strengthFill}
                style={{ 
                  width: getPasswordStrengthWidth(passwordStrength),
                  backgroundColor: getPasswordStrengthColor(passwordStrength)
                }}
              />
            </div>
            
            <span 
              className={styles.strengthText}
              style={{ color: getPasswordStrengthColor(passwordStrength) }}
            >
              {getPasswordStrengthText(passwordStrength)}
            </span>
          </div>
        </div>

        <SubmitButton />
      </form>
    </>
  );
} 