import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

// Rendered by the component demos, so it stays on the default `swap`: the demos are the
// reference for what Material UI looks like, and under `optional` a slow first load would show
// them in the system font instead of Roboto.
export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

// `display: 'optional'` gives these faces a block period and no swap period: one that misses
// the block window is skipped for the rest of that page load and picked up on the next
// navigation, so text is never re-laid out mid-load. That only holds while the faces can reach
// the window, which is why every weight the branding theme can request is preloaded.
export const generalSans = localFont({
  declarations: [{ prop: 'font-family', value: 'General Sans' }],
  display: 'optional',
  src: [
    { path: './fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/GeneralSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const ibmPlexSans = localFont({
  declarations: [{ prop: 'font-family', value: 'IBM Plex Sans' }],
  display: 'optional',
  src: [
    { path: './fonts/IBMPlexSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/IBMPlexSans-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/IBMPlexSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const fonts = [roboto, generalSans, ibmPlexSans];

// Applied to `<body>` to activate the faces. The families themselves are applied per element
// by the branding theme, not by these classes.
export const fontClasses = fonts.map((font) => font.className).join(' ');
