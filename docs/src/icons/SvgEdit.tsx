import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgEdit({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
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
        d="M13.067 10.32a.434.434 0 11.613.613L8.074 16.54a.433.433 0 11-.614-.614l5.607-5.606zM15.773 6a.667.667 0 00-.466.193l-.867.867a.5.5 0 000 .707l1.793 1.793a.5.5 0 00.707 0l.867-.867c.26-.26.26-.68 0-.94l-1.56-1.56A.655.655 0 0015.773 6zM14.08 8.834a1 1 0 00-1.414 0l-6.373 6.373a1 1 0 00-.293.707V17a1 1 0 001 1h1.086a1 1 0 00.707-.293l6.373-6.373a1 1 0 000-1.414L14.08 8.834z"
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
    </svg>
  );
}

export default SvgEdit;
