"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./not-found.module.scss";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Use window.location for more reliable redirect
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGoHome = () => {
    // Use window.location for more reliable redirect
    window.location.href = "/";
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>

      <div className={styles.content}>
        <div className={styles.errorCode}>
          <span className={styles.number}>4</span>
          <div className={styles.zero}>
            <div className={styles.face}>
              <div className={styles.eyes}>
                <div className={styles.eye}></div>
                <div className={styles.eye}></div>
              </div>
              <div className={styles.mouth}></div>
            </div>
          </div>
          <span className={styles.number}>4</span>
        </div>

        <h1 className={styles.title}>صفحه مورد نظر یافت نشد!</h1>
        
        <p className={styles.description}>
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>

        <div className={styles.countdown}>
          <p>بازگشت خودکار به صفحه اصلی در {countdown} ثانیه</p>
        </div>

        <div className={styles.actions}>
          <button onClick={handleGoHome} className={styles.primaryButton}>
            بازگشت به صفحه اصلی
          </button>
          
          <button onClick={handleGoBack} className={styles.secondaryButton}>
            بازگشت به صفحه قبل
          </button>
        </div>

        <div className={styles.suggestions}>
          <h3>پیشنهادات:</h3>
          <ul>
            <li>آدرس URL را بررسی کنید</li>
            <li>از منوی اصلی استفاده کنید</li>
            <li>با پشتیبانی تماس بگیرید</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 