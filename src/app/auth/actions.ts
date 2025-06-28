'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateAuthForm, validatePassword } from '@/core/validation';
import type { UserData, User } from '@/types/user';

async function fetchUserData(): Promise<User | null> {
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
}

export async function authenticateUser(
  prevState: { success: boolean; errors: { [key: string]: string } } | null,
  formData: FormData
) {
  try {
    const validationResult = validateAuthForm(formData);
    if (!validationResult.isValid) {
      return {
        success: false,
        errors: validationResult.errors
      };
    }

    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return {
        success: false,
        errors: {
          password: passwordValidation.errors.join('، ')
        }
      };
    }
    
    const apiData = await fetchUserData();
    
    const userData: UserData = {
      phone,
      password,
      apiData
    };
    
    const cookieStore = await cookies();
    cookieStore.set('userToken', 'authenticated', {
      path: '/',
      maxAge: 86400,
      sameSite: 'lax'
    });
    
    cookieStore.set('userData', JSON.stringify(userData), {
      path: '/',
      maxAge: 86400,
      sameSite: 'lax'
    });
    
    redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      errors: { general: "خطا در ورود. لطفاً دوباره تلاش کنید." }
    };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('userToken');
  cookieStore.delete('userData');
  redirect('/auth');
} 