import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgPagination({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect width={24} height={24} rx={5} fill={theme.palette.svgBg[active ? 'active' : 'base']} />
      <path
        d="M5 12a7 7 0 1114 0 7 7 0 01-14 0z"
        stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
        strokeWidth={2}
      />
      <path
        d="M11 14l2-2-2-2"
        stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgPagination;
