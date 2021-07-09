import isHostComponent from './isHostComponent';

export default function appendStyleProps(
  component: React.ElementType,
  componentsProps: Record<string, any>,
  styleProps: object,
) {
  if (!isHostComponent(component)) {
    componentsProps.styleProps = { ...componentsProps.styleProps, ...styleProps };
  }
}
