import isPropValid from '@emotion/is-prop-valid';
import isHostComponent from './isHostComponent';

/**
 * If a targetElement is a DOM element name, it filters the props object to include just the valid props.
 * Otherwise, it returns the props object unchanged.
 *
 * @param targetElement Element to filter the props for.
 * @param props Props to filter.
 */
export default function getForwardableProps(targetElement: React.ElementType, props: object) {
  if (!isHostComponent(targetElement)) {
    return props;
  }

  return Object.keys(props)
    .filter(isPropValid)
    .reduce((acc, current) => {
      acc[current] = (props as Record<string, string>)[current];
      return acc;
    }, {} as Record<string, any>);
}
