import { createContainer } from '@mui/system';
import PropTypes from 'prop-types';
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

Container.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export default Container;
