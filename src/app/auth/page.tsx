import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthForm from './AuthForm';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './auth.module.scss';

export default async function Auth() {
  // Check if user is already authenticated
  const cookieStore = await cookies();
  const userToken = cookieStore.get('userToken');
  
  if (userToken) {
    redirect('/dashboard');
  }

  return (
    <div className={styles.container}>
      <ThemeToggle />
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          ورود به حساب کاربری
        </h1>
        
        <AuthForm />
        
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
