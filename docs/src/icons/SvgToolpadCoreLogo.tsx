import * as React from 'react';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

export default function SvgToolpadLogo(props: RootSvgProps) {
  return (
    <RootSvg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="#0073E6"
        d="M0 5a5 5 0 0 1 5-5h19v2a4 4 0 0 1-4 4H0V5ZM9 8h6v11a5 5 0 0 1-5 5H9V8Z"
      />
    </RootSvg>
  );
}

export const toolpadSvgLogoString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#0073E6" d="M0 5a5 5 0 0 1 5-5h19v2a4 4 0 0 1-4 4H0V5ZM9 8h6v11a5 5 0 0 1-5 5H9V8Z"/></svg>`;
