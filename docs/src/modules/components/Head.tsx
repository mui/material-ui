import * as React from 'react';
import { AppLayoutHead, AppLayoutHeadProps } from '@mui/internal-core-docs/AppLayout';

// #host-reference
const HOST = process.env.PULL_REQUEST_ID
  ? `https://deploy-preview-${process.env.PULL_REQUEST_ID}--${process.env.NETLIFY_SITE_NAME}.netlify.app`
  : 'https://mui.com';

type HeadProps = Omit<AppLayoutHeadProps, 'hostUrl'>;

export default function Head(props: HeadProps) {
  return <AppLayoutHead {...props} hostUrl={HOST} />;
}
