import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Interpolation, MUIStyledComponent as StyledComponent } from '@mui/styled-engine';
import { OverridableComponent } from '@mui/types';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '@mui/utils/capitalize';
import { ContainerProps, ContainerTypeMap } from './ContainerProps';
import useThemePropsSystem from '../useThemeProps';
import systemStyled from '../styled';
import createTheme, { Theme as DefaultTheme, Breakpoint } from '../createTheme';

interface StyleFnProps<Theme> extends ContainerProps {
  theme: Theme;
  ownerState: ContainerProps;
}

const defaultTheme = createTheme();

const defaultCreateStyledComponent = systemStyled('div', {
  name: 'MuiContainer',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`],
      ownerState.fixed && styles.fixed,
      ownerState.disableGutters && styles.disableGutters,
    ];
  },
});

const useThemePropsDefault = (inProps: ContainerProps) =>
  useThemePropsSystem({ props: inProps, name: 'MuiContainer', defaultTheme });

const useUtilityClasses = (ownerState: ContainerProps, componentName: string) => {
  const getContainerUtilityClass = (slot: string) => {
    return generateUtilityClass(componentName, slot);
  };
  const { classes, fixed, disableGutters, maxWidth } = ownerState;

  const slots = {
    root: [
      'root',
      maxWidth && `maxWidth${capitalize(String(maxWidth))}`,
      fixed && 'fixed',
      disableGutters && 'disableGutters',
    ],
  };

  return composeClasses(slots, getContainerUtilityClass, classes);
};

type RequiredThemeStructure = Pick<DefaultTheme, 'breakpoints' | 'spacing'>;

export default function createContainer<Theme extends RequiredThemeStructure = DefaultTheme>(
  options: {
    createStyledComponent?: (
      ...styles: Array<Interpolation<StyleFnProps<Theme>>>
    ) => StyledComponent<ContainerProps>;
    useThemeProps?: (inProps: ContainerProps) => ContainerProps & { component?: React.ElementType };
    componentName?: string;
  } = {},
) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    componentName = 'MuiContainer',
  } = options;

  const ContainerRoot = createStyledComponent(
    ({ theme, ownerState }: StyleFnProps<Theme>) =>
      ({
        width: '100%',
        marginLeft: 'auto',
        boxSizing: 'border-box',
        marginRight: 'auto',
        ...(!ownerState.disableGutters && {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          // @ts-ignore module augmentation fails if custom breakpoints are used
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
        }),
      }) as Interpolation<StyleFnProps<Theme>>,
    ({ theme, ownerState }: StyleFnProps<Theme>) =>
      ownerState.fixed &&
      Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
        const breakpoint = breakpointValueKey;
        const value = theme.breakpoints.values[breakpoint as Breakpoint];

        if (value !== 0) {
          // @ts-ignore
          acc[theme.breakpoints.up(breakpoint)] = {
            maxWidth: `${value}${theme.breakpoints.unit}`,
          };
        }
        return acc;
      }, {}),
    ({ theme, ownerState }: StyleFnProps<Theme>) => ({
      // @ts-ignore module augmentation fails if custom breakpoints are used
      ...(ownerState.maxWidth === 'xs' && {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        [theme.breakpoints.up('xs')]: {
          // @ts-ignore module augmentation fails if custom breakpoints are used
          maxWidth: Math.max(theme.breakpoints.values.xs, 444),
        },
      }),
      ...(ownerState.maxWidth &&
        // @ts-ignore module augmentation fails if custom breakpoints are used
        ownerState.maxWidth !== 'xs' && {
          // @ts-ignore module augmentation fails if custom breakpoints are used
          [theme.breakpoints.up(ownerState.maxWidth)]: {
            // @ts-ignore module augmentation fails if custom breakpoints are used
            maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`,
          },
        }),
    }),
  );

  const Container = React.forwardRef(function Container(inProps, ref) {
    const props: ContainerProps & { component?: React.ElementType } = useThemeProps(inProps);
    const {
      className,
      component = 'div',
      disableGutters = false,
      fixed = false,
      maxWidth = 'lg',
      classes: classesProp,
      ...other
    } = props;

    const ownerState = {
      ...props,
      component,
      disableGutters,
      fixed,
      maxWidth,
    };

    // @ts-ignore module augmentation fails if custom breakpoints are used
    const classes = useUtilityClasses(ownerState, componentName);

    return (
      // @ts-ignore theme is injected by the styled util
      <ContainerRoot
        as={component}
        // @ts-ignore module augmentation fails if custom breakpoints are used
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      />
    );
  }) as OverridableComponent<ContainerTypeMap>;

  Container.propTypes /* remove-proptypes */ = {
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.elementType,
    disableGutters: PropTypes.bool,
    fixed: PropTypes.bool,
    maxWidth: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
      PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
      PropTypes.string,
    ]),
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
      PropTypes.func,
      PropTypes.object,
    ]),
  };

  return Container;
}
