import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardContent from './DashboardContent';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './dashboard.module.scss';

export default async function Dashboard() {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const userToken = cookieStore.get('userToken');
  const userDataCookie = cookieStore.get('userData');
  
  if (!userToken) {
    redirect('/auth');
  }

  // Parse user data from cookie
  let userData = null;
  if (userDataCookie?.value) {
    try {
      userData = JSON.parse(userDataCookie.value);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.themeToggle}>
        <ThemeToggle />
      </div>

      <h1 className={styles.title}>سلام خوش اومدی</h1>

      <p className={styles.description}>
        شما با موفقیت وارد داشبورد شدید
      </p>

      <DashboardContent userData={userData} />
    </div>
  );
}
