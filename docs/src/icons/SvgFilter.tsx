import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgFilter({ active, ...props }: RootSvgProps<{ active?: boolean }>) {
  const theme = useTheme();
  return (
    <RootSvg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect width={24} height={24} rx={5} fill={theme.palette.svgBg[active ? 'active' : 'base']} />
      <path
        d="M6.833 7.74l3.834 4.926V16c0 .733.6 1.333 1.333 1.333s1.334-.6 1.334-1.333v-3.334s2.286-2.94 3.833-4.926a.666.666 0 00-.534-1.074H7.36a.665.665 0 00-.527 1.074z"
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
    </RootSvg>
  );
}

export default SvgFilter;
