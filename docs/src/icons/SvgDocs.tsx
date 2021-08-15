import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgDocs(props: React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 28 28"
        fill="none"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.423 9.064A1 1 0 0124 9.97v16.46a1 1 0 01-1.423.906l-18-8.4A1 1 0 014 18.03V1.57A1 1 0 015.423.664l18 8.4z"
          fill="#0059B3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.921 8.728l.021.026.022.026 1.572 1.888a2 2 0 01.464 1.28V21a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2h7.022l2.9 3.728zm-1.32-4.956L20.5 7.5l1.573 1.887A4 4 0 0123 11.948V21a4 4 0 01-4 4H9a4 4 0 01-4-4V7a4 4 0 014-4h7.022a2 2 0 011.579.772zM10 10a1 1 0 100 2h4a1 1 0 100-2h-4zm-1 5a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm1 3a1 1 0 100 2h8a1 1 0 100-2h-8z"
          fill="#80BFFF"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <rect width={28} height={28} rx={2} fill="#fff" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.423 9.064A1 1 0 0124 9.97v16.46a1 1 0 01-1.423.906l-18-8.4A1 1 0 014 18.03V1.57A1 1 0 015.423.664l18 8.4z"
        fill="#C2E0FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.921 8.728l.021.026.022.026 1.572 1.888a2 2 0 01.464 1.28V21a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2h7.022l2.9 3.728zm-1.32-4.956L20.5 7.5l1.573 1.887A4 4 0 0123 11.948V21a4 4 0 01-4 4H9a4 4 0 01-4-4V7a4 4 0 014-4h7.022a2 2 0 011.579.772zM10 10a1 1 0 100 2h4a1 1 0 100-2h-4zm-1 5a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm1 3a1 1 0 100 2h8a1 1 0 100-2h-8z"
        fill="url(#svg-docs-linear1)"
      />
      <defs>
        <linearGradient
          id="svg-docs-linear1"
          x1={23}
          y1={25}
          x2={1.436}
          y2={7.356}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SvgDocs;
