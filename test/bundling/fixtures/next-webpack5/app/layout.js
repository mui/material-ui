import { CssBaseline } from '@mui/material';
import { QueryProbe } from './QueryProbe';

export const metadata = {
  title: 'MUI Next.js barrel import',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <QueryProbe />
        {children}
      </body>
    </html>
  );
}
