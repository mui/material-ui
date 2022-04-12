import { createContainer } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import { getContainerUtilityClass } from './containerClasses';
import { ContainerTypeMap } from './ContainerProps';
import defaultTheme from '../styles/defaultTheme';
import styled from '../styles/styled';
import { JoyTheme } from '../styles/defaultTheme';

const Container = createContainer<JoyTheme>({
  defaultTheme,
  getContainerUtilityClass,
  styled,
}) as OverridableComponent<ContainerTypeMap>;

export default Container;
