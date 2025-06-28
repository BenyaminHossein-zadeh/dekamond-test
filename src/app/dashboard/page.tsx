"use client";

import { useRouter } from "next/navigation";
import { removeItem, getItem } from "@/core/services/storage/localStorage";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./dashboard.module.scss";
import { useEffect, useState } from "react";
import type { UserData } from "@/types/user";

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = getItem("user") as UserData;
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  const handleLogout = () => {
    removeItem("user");

    document.cookie =
      "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    router.push("/auth");
  };

  return (
    <div className={styles.container}>
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>

      <h1 className={styles.title}>سلام خوش اومدی</h1>

      <p className={styles.description}>
        شما با موفقیت وارد داشبورد شدید
      </p>

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

      <button onClick={handleLogout} className={styles.logoutButton}>
        خروج
      </button>
    </div>
  );
}
