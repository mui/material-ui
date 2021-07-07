// A masonry component using the following libs as inspiration.
//
// For the implementation:
// - https://github.com/STRML/react-grid-layout
// - https://material.angularjs.org/latest/demo/gridList
// - https://next.material-ui.com/components/image-list/#masonry-image-list
// - https://github.com/desandro/masonry
// - https://mdbootstrap.com/docs/react/layout/masonry/
// - https://muuri.dev/
// - https://github.com/bigbite/macy.js
// - https://github.com/paulcollett/react-masonry-css
// - https://bvaughn.github.io/react-virtualized/#/components/Masonry
// - https://github.com/jaredLunde/masonic

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { getMasonryUtilityClass } from './masonryClasses';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryUtilityClass, classes);
};

const MasonryRoot = styled('div', {
  name: 'MuiMasonry',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})(() => {
  /* Styles applied to the root element. */
  return {
    display: 'grid',
    gridAutoRows: 0,
    padding: 0,
    width: '100%',
  };
});

const Masonry = React.forwardRef(function Masonry(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonry',
  });

  const {
    children,
    className,
    cols = 4,
    component = 'div',
    gap = 10,
    style: styleProp,
    ...other
  } = props;
  const [masonryItems, setMasonryItems] = React.useState(children);
  const style = { gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...styleProp };
  const styleProps = { ...props, component, gap };
  const classes = useUtilityClasses(styleProps);
  const resizeItems = () => {
    const resizedChildren = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        ref: (elem) => {
          if (!elem || (!elem.querySelector('img') && !elem.querySelector('div'))) return;
          const totalHeight = elem.querySelector('img')
            ? elem.querySelector('img').getBoundingClientRect().height + gap
            : elem.querySelector('div').getBoundingClientRect().height + gap;
          const rowSpan = Math.ceil(totalHeight / gap);
          elem.style.gridRowEnd = `span ${rowSpan}`;
        },
      });
    });
    setMasonryItems(resizedChildren);
  };
  React.useEffect(() => {
    resizeItems();
  }, []); // eslint-disable-line

  return (
    <MasonryRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      style={style}
      styleProps={styleProps}
      {...other}
    >
      {masonryItems}
    </MasonryRoot>
  );
});

Masonry.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally `MasonryItem`s.
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
   * Number of columns.
   * @default 4
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The gap between items in px.
   * @default 10
   */
  gap: PropTypes.number,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default Masonry;
