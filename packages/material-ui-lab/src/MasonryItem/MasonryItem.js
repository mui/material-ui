import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import masonryItemClasses, { getMasonryItemUtilityClass } from './masonryItemClasses';
import MasonryContext from '../Masonry/MasonryContext';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
    img: ['img'],
    div: ['div'],
  };

  return composeClasses(slots, getMasonryItemUtilityClass, classes);
};

const MasonryItemRoot = styled('div', {
  name: 'MuiMasonryItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [
      { [`& .${masonryItemClasses.img}`]: styles.img },
      { [`& .${masonryItemClasses.div}`]: styles.div },
      styles.root,
    ];
  },
})(({ styleProps, theme }) => {
  const gap = Number(theme.spacing(styleProps.spacing).replace('px', ''));
  const totalHeight = styleProps.contentHeight + gap;
  const rowSpan = Math.ceil(totalHeight / gap);
  return {
    width: '100%',
    [`& *`]: {
      // all contents should have a width of 100%
      objectFit: 'cover',
      width: '100%',
    },
    gridRowEnd: `span ${rowSpan}`,
  };
});

const MasonryItem = React.forwardRef(function MasonryItem(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonryItem',
  });

  const masonryItemRef = React.useRef(null);
  const { spacing } = React.useContext(MasonryContext);
  const { children, className, component = 'div', style, ...other } = props;
  const [styleProps, setStyleProps] = React.useState({
    ...props,
    spacing,
  });

  const classes = useUtilityClasses(styleProps);
  const computeHeights = () => {
    if (masonryItemRef && masonryItemRef.current) {
      const elem = masonryItemRef.current;
      const contentHeight = elem.querySelector('img')
        ? elem.querySelector('img').getBoundingClientRect().height
        : elem.querySelector('div').getBoundingClientRect().height;
      setStyleProps({ ...styleProps, contentHeight });
    }
  };
  React.useEffect(() => {
    const timer = setTimeout(computeHeights, 500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line
  return (
    <MasonryItemRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={masonryItemRef}
      style={style}
      styleProps={styleProps}
      {...other}
    >
      {children}
    </MasonryItemRoot>
  );
});

MasonryItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `<img>` or a `<div>`.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default MasonryItem;
