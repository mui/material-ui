import { Inter, Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const generalSans = localFont({
  declarations: [{ prop: 'font-family', value: 'General Sans' }],
  src: [
    { path: './static/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './static/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './static/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './static/GeneralSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const ibmPlexSans = localFont({
  declarations: [{ prop: 'font-family', value: 'IBM Plex Sans' }],
  src: [
    { path: './static/IBMPlexSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './static/IBMPlexSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './static/IBMPlexSans-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './static/IBMPlexSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const fonts = [inter, roboto, generalSans, ibmPlexSans];

export const fontClasses = Array.from(fonts, (font) => font.className).join(' ');
