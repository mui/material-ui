import * as React from 'react';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgMaterialDesign(props: RootSvgProps) {
  return (
    <RootSvg
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
    </RootSvg>
  );
}

export default SvgMaterialDesign;
