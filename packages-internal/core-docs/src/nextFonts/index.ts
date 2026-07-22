import { Inter, Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  preload: false,
});

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  preload: false,
});

export const generalSans = localFont({
  declarations: [{ prop: 'font-family', value: 'General Sans' }],
  src: [{ path: './fonts/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' }],
});

const generalSansDeferred = localFont({
  declarations: [{ prop: 'font-family', value: 'General Sans' }],
  preload: false,
  src: [
    { path: './fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/GeneralSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const ibmPlexSans = localFont({
  declarations: [{ prop: 'font-family', value: 'IBM Plex Sans' }],
  src: [{ path: './fonts/IBMPlexSans-Regular.woff2', weight: '400', style: 'normal' }],
});

const ibmPlexSansDeferred = localFont({
  declarations: [{ prop: 'font-family', value: 'IBM Plex Sans' }],
  preload: false,
  src: [
    { path: './fonts/IBMPlexSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/IBMPlexSans-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/IBMPlexSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const fonts = [
  ibmPlexSans,
  generalSans,
  ibmPlexSansDeferred,
  generalSansDeferred,
  inter,
  roboto,
];

export const fontClasses = fonts.map((font) => font.className).join(' ');
