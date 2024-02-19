'use server';
import { cookies } from 'next/headers';

// eslint-disable-next-line import/prefer-default-export
export async function setTheme(theme: string) {
  cookies().set('theme', theme);
}
