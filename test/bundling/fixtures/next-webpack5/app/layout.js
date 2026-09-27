import { CssBaseline } from '@mui/material';
import QueryProbe from './QueryProbe';

export const metadata = {
  title: 'MUI Next.js barrel import',
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <QueryProbe />
        {/* eslint-disable-next-line react/prop-types -- Next.js layout fixture, not a published component */}
        {props.children}
      </body>
    </html>
  );
}
