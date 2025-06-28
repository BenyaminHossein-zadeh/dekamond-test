"use client"

import { useEffect } from 'react';
import { logoutUser } from '../auth/actions';
import { useToast } from '@/components/Toast';
import type { UserData } from '@/types/user';
import styles from './dashboard.module.scss';

interface DashboardContentProps {
  userData: UserData | null;
}

export default function DashboardContent({ userData }: DashboardContentProps) {
  const { showToast } = useToast();

  useEffect(() => {
    // welcome toast
    if (userData?.apiData) {
      const userName = `${userData.apiData.name.first} ${userData.apiData.name.last}`;
      showToast({
        type: 'success',
        title: 'خوش آمدید!',
        message: `سلام ${userName}، به داشبورد خوش آمدید`,
        duration: 4000
      });
    } else {
      showToast({
        type: 'info',
        title: 'خوش آمدید!',
        message: 'به داشبورد خوش آمدید',
        duration: 3000
      });
    }
  }, [userData, showToast]);

  return (
    <>
      {userData?.apiData && (
        <div className={styles.userInfo}>
          <img 
            src={userData.apiData.picture.large} 
            alt="User Avatar" 
            className={styles.avatar}
          />
          <div className={styles.userDetails}>
            <h3>{userData.apiData.name.first} {userData.apiData.name.last}</h3>
            <p>{userData.apiData.email}</p>
            <p>شماره موبایل: {userData.phone}</p>
            <p>کشور: {userData.apiData.location.country}</p>
            <p>شهر: {userData.apiData.location.city}</p>
          </div>
        </div>
      )}

      <form action={logoutUser}>
        <button type="submit" className={styles.logoutButton}>
          خروج
        </button>
      </form>
    </>
  );
} 