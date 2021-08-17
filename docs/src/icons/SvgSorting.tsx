import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgPagination({ active, ...props }: RootSvgProps<{ active?: boolean }>) {
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
        d="M12 17.5v-10M7 12l5-5 5 5"
        stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </RootSvg>
  );
}

export default SvgPagination;
