import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgList({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
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
      <rect
        x={8}
        y={7}
        width={12}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={8}
        y={11}
        width={12}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={8}
        y={15}
        width={12}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={4}
        y={7}
        width={2}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={4}
        y={11}
        width={2}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={4}
        y={15}
        width={2}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
    </svg>
  );
}

export default SvgList;
