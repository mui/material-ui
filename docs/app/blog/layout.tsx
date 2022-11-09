import * as React from 'react';
import BrandingProvider from './BrandingProvider';
import Head from './Head';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <BrandingProvider>
      <Head
        title="Blog - MUI"
        description="Follow the MUI blog to learn about new product features, latest advancements in UI development, and business initiatives."
        disableAlternateLocale
      />
      <body>{children}</body>
    </BrandingProvider>
  );
}
