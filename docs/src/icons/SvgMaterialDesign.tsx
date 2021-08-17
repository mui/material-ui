import * as React from 'react';

function SvgMaterialDesign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle cx={12} cy={12} r={12} fill="#737373" />
      <path fill="#BDBDBD" d="M4 4h16v16H4z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20l8-16H4l8 16z" fill="#fff" />
    </svg>
  );
}

export default SvgMaterialDesign;
