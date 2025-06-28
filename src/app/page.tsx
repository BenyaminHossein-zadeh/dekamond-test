"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Add 2-second timeout before checking authentication
    const timeout = setTimeout(() => {
      // Check if user is authenticated by looking for userToken cookie
      const checkAuth = () => {
        const cookies = document.cookie.split(';');
        const userTokenCookie = cookies.find(cookie => 
          cookie.trim().startsWith('userToken=')
        );
        
        if (userTokenCookie) {
          // User is authenticated, redirect to dashboard
          router.push('/dashboard');
        } else {
          // User is not authenticated, redirect to auth
          router.push('/auth');
        }
      };

      checkAuth();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  // Show loading while checking authentication
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.spinner}></div>
        <p>در حال بررسی احراز هویت...</p>
      </div>
    </div>
  );
}