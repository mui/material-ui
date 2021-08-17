import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgAlert({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
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
        y={5}
        width={12}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={11}
        y={9}
        width={9}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={14}
        y={13}
        width={6}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={17}
        y={17}
        width={3}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={4}
        y={5}
        width={2}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={7}
        y={9}
        width={2}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={10}
        y={13}
        width={2}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
      <rect
        x={13}
        y={17}
        width={2}
        height={2}
        rx={1}
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
    </svg>
  );
}

export default SvgAlert;
