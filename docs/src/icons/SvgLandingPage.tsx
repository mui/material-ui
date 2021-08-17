import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgLandingPage({ active = false, ...props }: RootSvgProps<{ active?: boolean }>) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    return (
      <RootSvg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <rect width={24} height={24} rx={5} fill="#265D97" />
        <mask
          id={`svg-landingpage1-${props.id || ''}`}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <rect width={24} height={24} rx={5} fill="#1E4976" />
        </mask>
        <g mask={`url(#svg-landingpage1-${props.id || ''})`}>
          <g filter={`url(#svg-landingpage2-${props.id || ''})`}>
            <path
              d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
              fill="#173A5E"
            />
            <path
              d="M5 6a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V6z"
              stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
              strokeWidth={2}
            />
          </g>
          <path
            d="M7 15a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zM7 12a1 1 0 011-1h5a1 1 0 110 2H8a1 1 0 01-1-1zM7 9a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z"
            fill={theme.palette.svgFilled[active ? 'active' : 'base']}
          />
        </g>
        <defs>
          <filter
            id={`svg-landingpage2-${props.id || ''}`}
            x={0}
            y={4}
            width={24}
            height={24}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={2} />
            <feColorMatrix values="0 0 0 0 0.04 0 0 0 0 0.0989474 0 0 0 0 0.16 0 0 0 0.5 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </RootSvg>
    );
  }
  return (
    <RootSvg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect width={24} height={24} rx={5} fill="#F3F6F9" />
      <mask
        mask-type="alpha"
        id={`svg-landingpage1-${props.id || ''}`}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <rect width={24} height={24} rx={5} fill="#F3F6F9" />
      </mask>
      <g mask={`url(#svg-landingpage1-${props.id || ''})`}>
        <g filter={`url(#svg-landingpage2-${props.id || ''})`}>
          <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" fill="#fff" />
          <path
            d="M5 6a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V6z"
            stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
            strokeWidth={2}
          />
        </g>
        <path
          d="M7 15a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zM7 12a1 1 0 011-1h5a1 1 0 110 2H8a1 1 0 01-1-1zM7 9a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z"
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
      </g>
      <defs>
        <filter
          id={`svg-landingpage2-${props.id || ''}`}
          x={0}
          y={4}
          width={24}
          height={24}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0.843137 0 0 0 0 0.862745 0 0 0 0 0.882353 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </RootSvg>
  );
}

export default SvgLandingPage;
