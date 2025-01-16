import { unstable_memoTheme } from '@mui/system';
import type { Theme } from '../styles/createTheme';

const memoTheme = unstable_memoTheme<Theme>;

export default memoTheme;
