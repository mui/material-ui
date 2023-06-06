import { SxProps } from './types';

const getCSSVariable = (componentName: string, variableName: string) =>
  `--${componentName}-${variableName}`;

function prepareSxProp<VXType>(
  componentName: string,
  sx: SxProps | undefined,
  vx: VXType | undefined,
) {
  let sxAsArray;
  if (sx) {
    sxAsArray = Array.isArray(sx) ? sx : [sx];
  }
  return sx || vx
    ? ([
        ...Object.entries(vx ?? {}).map(([key, value]) => ({
          [getCSSVariable(componentName, key)]: value,
        })),
        ...(sxAsArray ?? []),
      ] as SxProps)
    : undefined;
}

export default prepareSxProp;
