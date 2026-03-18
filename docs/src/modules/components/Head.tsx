import * as React from 'react';
import HeadBase from '@mui/docs/AppLayoutDocs/Head';
import { LANGUAGES_SSR } from 'docs/config';

interface HeadProps {
  card?: string;
  children?: React.ReactNode;
  description: string;
  disableAlternateLocale?: boolean;
  largeCard?: boolean;
  title: string;
  type?: string;
}

export default function Head(props: HeadProps) {
  return <HeadBase {...props} languagesSSR={LANGUAGES_SSR} />;
}
