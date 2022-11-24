import * as React from 'react';
import EmotionRootStyleRegistry from './EmotionRootStyleRegistry';

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <head></head>
      <body>
        <EmotionRootStyleRegistry>{children}</EmotionRootStyleRegistry>
      </body>
    </html>
  );
}
