import type { Metadata } from "next";
import { Vazirmatn } from 'next/font/google'
import '../styles/globals.scss'
import { ThemeProvider } from '@/core/context/ThemeContext'

const vazir = Vazirmatn({ 
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazir'
})

export const metadata: Metadata = {
  title: "تست شرکت دکاموند",
  description: "توسعه داده شده توسط بنیامین حسین زاده",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${vazir.className} ${vazir.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
