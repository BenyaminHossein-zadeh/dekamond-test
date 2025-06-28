"use client"

import { setItem } from "@/core/services/storage/localStorage";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./auth.module.scss";
import Input from "@/components/Input";
import ThemeToggle from "@/components/ThemeToggle";
import { validateAuthForm, validatePassword, getPasswordStrength } from "@/core/validation";
import type { UserData, User } from "@/types/user";

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

export default function Auth() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  const router = useRouter();

  const fetchUserData = async (): Promise<User | null> => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results[0];
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const handlePasswordChange = (password: string) => {
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);
  };

  const [, formAction] = useActionState(async (prevState: unknown, formData: FormData) => {
    try {
      const validationResult = validateAuthForm(formData);
      if (!validationResult.isValid) {
        setErrors(validationResult.errors);
        return;
      }

      setErrors({});

      const phone = formData.get("phone") as string;
      const password = formData.get("password") as string;
      
      // Additional comprehensive password validation
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        setErrors({
          password: passwordValidation.errors.join('، ')
        });
        return;
      }
      
      // Fetch user data from API
      const apiData = await fetchUserData();
      
      // Prepare user data
      const userData: UserData = {
        phone,
        password,
        apiData
      };
      
      // Save to localStorage
      setItem("user", userData);
      
      // Set cookie for middleware
      document.cookie = `userToken=authenticated; path=/; max-age=86400; SameSite=Lax`;
      
      // Use router.push instead of redirect for client-side navigation
      router.push("/dashboard");
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: "خطا در ورود. لطفاً دوباره تلاش کنید." });
    }
  }, null);

  const getPasswordStrengthColor = (strength: 'weak' | 'medium' | 'strong') => {
    switch (strength) {
      case 'weak': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'strong': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPasswordStrengthText = (strength: 'weak' | 'medium' | 'strong') => {
    switch (strength) {
      case 'weak': return 'ضعیف';
      case 'medium': return 'متوسط';
      case 'strong': return 'قوی';
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <ThemeToggle />
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          ورود به حساب کاربری
        </h1>
        
        {errors.general && (
          <div className={styles.errorMessage}>
            {errors.general}
          </div>
        )}
        
        <form action={formAction} className={styles.form}>
          <input type="hidden" name="redirectTo" value="/dashboard" />
          
          <Input
            type="text"
            name="phone"
            label="شماره موبایل"
            required
            error={errors.phone}
          />

          <div className={styles.passwordContainer}>
            <Input
              type="password"
              name="password"
              label="رمز عبور"
              minLength={8}
              required
              error={errors.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            
            {/* Password strength indicator */}
            <div className={styles.passwordStrength}>
              <div className={styles.strengthBar}>
                <div 
                  className={styles.strengthFill}
                  style={{ 
                    width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%',
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
        
        <div className={styles.info}>
          <h4>راهنمای رمز عبور:</h4>
          <ul>
            <li>حداقل 8 کاراکتر</li>
            <li>شامل حروف بزرگ و کوچک</li>
            <li>شامل اعداد</li>
            <li>شامل کاراکترهای خاص (!@#$%^&*)</li>
          </ul>
          <p>شماره موبایل باید با 09 یا 989 شروع شود و 11 یا 12 رقم باشد</p>
        </div>
      </div>
    </div>
  );
}
