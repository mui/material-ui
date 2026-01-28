import setupVitest from '@mui/internal-test-utils/setupVitest';

globalThis.MUI_TEST_ENV = true;

setupVitest({ emotion: true });
