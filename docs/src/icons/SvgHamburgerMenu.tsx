import * as React from 'react';

export default function SvgHamburgerMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <rect x={1} y={5} width={14} height={1.5} rx={1} fill="#007FFF" />
      <rect x={1} y={9} width={14} height={1.5} rx={1} fill="#007FFF" />
    </svg>
  );
}
