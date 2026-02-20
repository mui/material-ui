import setupVitest from '@mui/internal-test-utils/setupVitest';

if (navigator.userAgent.includes('jsdom')) {
  (globalThis as any).MUI_TEST_ENV = true;
}

setupVitest({ emotion: true });
