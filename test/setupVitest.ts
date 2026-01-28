import setupVitest from '@mui/internal-test-utils/setupVitest';

(globalThis as any).MUI_TEST_ENV = true;

setupVitest({ emotion: true });
