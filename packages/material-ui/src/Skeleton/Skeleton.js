import { keyframes } from '@material-ui/styled-engine';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge } from '@material-ui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  alpha,
  unstable_getUnit as getUnit,
  unstable_toUnitless as toUnitless,
  useThemeVariants
} from '../styles';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import skeltonClasses, { getSkeltonUtilityClass } from './skeltonClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...styles[styleProps.variant],
    ...styles[styleProps.animation],
    ...(styleProps.hasChildren && styles.withChildren),
    ...(styleProps.hasChildren && !styleProps.width && styles.fitContent),
    ...(styleProps.hasChildren && !styleProps.height && styles.heightAuto),
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, variant, animation, hasChildren, width, height } = styleProps;

  const slots = {
    root: [
      'root',
      variant,
      animation,
      hasChildren && 'withChildren',
      hasChildren && !width && 'fitContent',
      hasChildren && !height && 'heightAuto',
    ],
  };

  return composeClasses(slots, getSkeltonUtilityClass, classes);
};

const pulseKeyframe = keyframes`
0% {
  opacity: 1;
}
50% {
  /* +0.5s of delay between each loop */
  opacity: 0.4;
}
100% {
  opacity: 1;
}
`;

const waveKeyframe = keyframes`
0% {
  transform: translateX(-100%);
}
50% {
  /* +0.5s of delay between each loop */
  transform: translateX(100%);
}
100% {
  transform: translateX(100%);
}
`;

// This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.
const SkeltonRoot = experimentalStyled(
  'span',
  {},
  { name: 'MuiSkelton', slot: 'Root' },
  overridesResolver,
)`
  display: block;
  background-color: ${({ theme }) =>
    alpha(theme.palette.text.primary, theme.palette.mode === 'light' ? 0.11 : 0.13)};
  height: 1.2em;

  & .${skeltonClasses.text} {
    margin-top: 0;
    margin-bottom: 0;
    height: auto;
    transform-origin: 0 55%;
    transform: scale(1, 0.60);
    border-radius: ${({ theme }) => {
      const radiusUnit = getUnit(theme.shape.borderRadius) || 'px';
      const radiusValue = toUnitless(theme.shape.borderRadius);
      return `${radiusValue}${radiusUnit}/${
        Math.round((radiusValue / 0.6) * 10) / 10
      }${radiusUnit}`;
    }};
    &:empty:before {
      content: '"\\00a0";
    }
  }

  & .${skeltonClasses.circular} {
    border-radius: 50%;
  }

  & .${skeltonClasses.pulse} {
    animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
  }

  & .${skeltonClasses.wave} {
    position: relative;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    position: relative;
    &::after {
      animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
      background: ${({ theme }) =>
        `linear-gradient(90deg, transparent, ${theme.palette.action.hover}, transparent)`};
      content: "";
      position: absolute;
      transform: translateX(-100%);
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
  }

  & .${skeltonClasses.withChildren} {
    & > * {
      visibility: hidden;
    }
  }


  & .${skeltonClasses.fitContent} {
    max-width: fit-content;
  }

  & .${skeltonClasses.heightAuto} {
    height: auto;
  }
`;

const Skeleton = React.forwardRef(function Skeleton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiSkelton',
  });

  const {
    animation = 'pulse',
    className,
    component = 'span',
    height,
    style,
    variant = 'text',
    width,
    ...other
  } = props;

  const themeVariantsClasses = useThemeVariants(
    {
      ...props,
      animation,
      component,
      variant,
    },
    'MuiSkeleton',
  );

  const hasChildren = Boolean(other.children);

  const styleProps = {
    ...props,
    animation,
    component,
    variant,
    hasChildren,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <SkeltonRoot
      as={component}
      ref={ref}
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes[animation]]: animation !== false,
          [classes.withChildren]: hasChildren,
          [classes.fitContent]: hasChildren && !width,
          [classes.heightAuto]: hasChildren && !height,
        },
        themeVariantsClasses,
        className,
      )}
      styleProps={styleProps}
      {...other}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
});

Skeleton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The animation.
   * If `false` the animation effect is disabled.
   * @default 'pulse'
   */
  animation: PropTypes.oneOf(['pulse', 'wave', false]),
  /**
   * Optional children to infer width and height from.
   */
  children: PropTypes.node,
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
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The type of content that will be rendered.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'rectangular', 'text']),
    PropTypes.string,
  ]),
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Skeleton;
