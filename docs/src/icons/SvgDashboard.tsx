import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgDashboard({ active = false, ...props }: RootSvgProps<{ active?: boolean }>) {
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
        <mask
          id={`svg-dashboard1-${props.id || ''}`}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <rect width={24} height={24} rx={5} fill="#F3F6F9" />
        </mask>
        <g mask={`url(#svg-dashboard1-${props.id || ''})`}>
          <rect width={24} height={24} rx={5} fill="#265D97" />
          <g filter={`url(#svg-dashboard2-${props.id || ''})`}>
            <rect
              x={12}
              y={4}
              width={8}
              height={6}
              rx={2}
              fill={theme.palette.svgFilled[active ? 'active' : 'base']}
            />
          </g>
          <g filter={`url(#svg-dashboard3-${props.id || ''})`}>
            <rect
              x={12}
              y={12}
              width={8}
              height={8}
              rx={2}
              fill={theme.palette.svgFilled[active ? 'active' : 'base']}
            />
          </g>
          <rect x={14} y={14} width={4} height={4} rx={1} fill="#173A5E" />
          <g filter={`url(#svg-dashboard4-${props.id || ''})`}>
            <path
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
              fill={theme.palette.svgFilled[active ? 'active' : 'base']}
            />
          </g>
        </g>
        <defs>
          <filter
            id={`svg-dashboard2-${props.id || ''}`}
            x={8}
            y={4}
            width={16}
            height={14}
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
          <filter
            id={`svg-dashboard3-${props.id || ''}`}
            x={8}
            y={12}
            width={16}
            height={16}
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
          <filter
            id={`svg-dashboard4-${props.id || ''}`}
            x={0}
            y={4}
            width={14}
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
      <mask
        id={`svg-dashboard1-${props.id || ''}`}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <rect width={24} height={24} rx={5} fill="#F3F6F9" />
      </mask>
      <g mask={`url(#svg-dashboard1-${props.id || ''})`}>
        <rect width={24} height={24} rx={5} fill="#F3F6F9" />
        <g filter={`url(#svg-dashboard2-${props.id || ''})`}>
          <rect
            x={12}
            y={4}
            width={8}
            height={6}
            rx={2}
            fill={theme.palette.svgFilled[active ? 'active' : 'base']}
          />
          <rect
            x={12}
            y={12}
            width={8}
            height={8}
            rx={2}
            fill={theme.palette.svgFilled[active ? 'active' : 'base']}
          />
          <rect x={14} y={14} width={4} height={4} rx={1} fill="#fff" />
          <path
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
            fill={theme.palette.svgFilled[active ? 'active' : 'base']}
          />
        </g>
      </g>
      <defs>
        <filter
          id={`svg-dashboard2-${props.id || ''}`}
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

export default SvgDashboard;
