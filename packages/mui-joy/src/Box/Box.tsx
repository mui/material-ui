'use client';
import { createBox } from '@mui/system';
import PropTypes from 'prop-types';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '../className';
import { Theme } from '../styles/types';
import defaultTheme from '../styles/defaultTheme';
import THEME_ID from '../styles/identifier';
import boxClasses from './boxClasses';
/**
 *
 * Demos:
 *
 * - [Box](https://mui.com/joy-ui/react-box/)
 *
 * API:
 *
 * - [Box API](https://mui.com/joy-ui/api/box/)
 */
const Box = createBox<Theme>({
  themeId: THEME_ID,
  defaultTheme,
  defaultClassName: boxClasses.root,
  generateClassName: ClassNameGenerator.generate,
});

Box.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Box;
