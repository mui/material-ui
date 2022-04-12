import { createContainer } from '@mui/system';
import { defaultTheme } from '../styles/defaultTheme';
import styled from '../styles/styled';
import { getContainerUtilityClass } from './containerClasses';

const Container = createContainer({
  defaultTheme,
  styled,
  getContainerUtilityClass,
});

export default Container;