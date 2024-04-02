'use client';
import clsx from 'clsx';
import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';

const useSx = (props) => {
  const { sx } = props;
  const sxClass = typeof sx === 'string' ? sx : sx?.className;
  const sxVars = sx && typeof sx !== 'string' ? sx.vars : undefined;
  const sxVarsStyles = {};

  if (sxVars) {
    Object.entries(sxVars).forEach(([cssVariable, [value, isUnitLess]]) => {
      if (typeof value === 'string' || isUnitLess) {
        sxVarsStyles[`--${cssVariable}`] = value;
      } else {
        sxVarsStyles[`--${cssVariable}`] = `${value}px`;
      }
    });
  }

  return {
    ...props,
    className: clsx(props.className, sxClass),
    style: { ...sxVarsStyles, ...props.style },
  };
};

export default function useThemeProps({ props: inProps, name, defaultTheme, themeId }) {
  let theme = useTheme(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  const props = useSx(inProps);
  const mergedProps = getThemeProps({ theme, name, props });
  return mergedProps;
}
