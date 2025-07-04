"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Show loading for 2 seconds
    const timeout = setTimeout(() => {
      const checkAuth = () => {
        const cookies = document.cookie.split(';');
        const userTokenCookie = cookies.find(cookie => 
          cookie.trim().startsWith('userToken=')
        );
        
        if (userTokenCookie) {
          // if user is Auth, go to dashboard
          router.push('/dashboard');
        } else {
          // if user is not Auth, go to auth
          router.push('/auth');
        }
      };

      checkAuth();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.spinner}></div>
        <p>در حال بررسی احراز هویت...</p>
      </div>
    </div>
  );
}