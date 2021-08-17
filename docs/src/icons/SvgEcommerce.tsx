import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgEcommerce({ active = false, ...props }: RootSvgProps<{ active?: boolean }>) {
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
          id={`svg-ecommerce1-${props.id || ''}`}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <rect width={24} height={24} rx={5} fill="#1E4976" />
        </mask>
        <g mask={`url(#svg-ecommerce1-${props.id || ''})`}>
          <g filter={`url(#svg-ecommerce2-${props.id || ''})`}>
            <path
              d="M6.544 5.368A2 2 0 018.442 4h7.117a2 2 0 011.897 1.368L19 10H5l1.544-4.632z"
              fill="#173A5E"
            />
            <path
              d="M7.493 5.684A1 1 0 018.442 5h7.117a1 1 0 01.948.684L17.613 9H6.387l1.106-3.316z"
              stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
              strokeWidth={2}
            />
          </g>
          <g filter={`url(#svg-ecommerce3-${props.id || ''})`}>
            <path
              d="M5 10a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z"
              fill="#173A5E"
            />
            <path
              d="M6 10a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1v-8z"
              stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
              strokeWidth={2}
            />
          </g>
          <path
            d="M15 12a3 3 0 11-6 0"
            stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
        <defs>
          <filter
            id={`svg-ecommerce2-${props.id || ''}`}
            x={1}
            y={4}
            width={22}
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
            id={`svg-ecommerce3-${props.id || ''}`}
            x={1}
            y={8}
            width={22}
            height={20}
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
        id={`svg-ecommerce1-${props.id || ''}`}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <rect width={24} height={24} rx={5} fill="#F3F6F9" />
      </mask>
      <g mask={`url(#svg-ecommerce1-${props.id || ''})`}>
        <g filter={`url(#svg-ecommerce2-${props.id || ''})`}>
          <path
            d="M6.544 5.368A2 2 0 018.442 4h7.117a2 2 0 011.897 1.368L19 10H5l1.544-4.632z"
            fill="#fff"
          />
          <path
            d="M7.493 5.684A1 1 0 018.442 5h7.117a1 1 0 01.948.684L17.613 9H6.387l1.106-3.316z"
            stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
            strokeWidth={2}
          />
        </g>
        <g filter={`url(#svg-ecommerce3-${props.id || ''})`}>
          <path
            d="M5 10a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z"
            fill="#fff"
          />
          <path
            d="M6 10a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1v-8z"
            stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
            strokeWidth={2}
          />
        </g>
        <path
          d="M15 12a3 3 0 11-6 0"
          stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id={`svg-ecommerce2-${props.id || ''}`}
          x={1}
          y={4}
          width={22}
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
          <feColorMatrix values="0 0 0 0 0.843137 0 0 0 0 0.862745 0 0 0 0 0.882353 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id={`svg-ecommerce3-${props.id || ''}`}
          x={1}
          y={8}
          width={22}
          height={20}
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

export default SvgEcommerce;
