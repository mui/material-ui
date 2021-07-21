import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <rect x={1} y={5} width={14} height={2} rx={1} fill="#007FFF" />
      <rect x={1} y={9} width={14} height={2} rx={1} fill="#007FFF" />
    </svg>
  );
}

export default SvgComponent;
