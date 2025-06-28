import type { Metadata } from "next";
import { Vazirmatn } from 'next/font/google'
import { cookies } from 'next/headers';
import '../styles/globals.scss'
import { ThemeProvider } from '@/core/context/ThemeContext'
import { ToastProvider } from '@/components/Toast'

const vazir = Vazirmatn({ 
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazir'
})

export const metadata: Metadata = {
  title: "تست شرکت دکاموند",
  description: "توسعه داده شده توسط بنیامین حسین زاده",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme');
  const initialTheme = (themeCookie?.value as 'light' | 'dark') || 'light';

  return (
    <html lang="fa" dir="rtl" data-theme={initialTheme}>
      <body className={`${vazir.className} ${vazir.variable}`}>
        <ThemeProvider initialTheme={initialTheme}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
