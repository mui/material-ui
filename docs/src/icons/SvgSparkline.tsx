import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgSparkline({ active, ...props }: RootSvgProps<{ active?: boolean }>) {
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
          id={`svg-sparkline1-${props.id}`}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <rect
            width={24}
            height={24}
            rx={5}
            fill={theme.palette.svgBg[active ? 'active' : 'base']}
          />
        </mask>
        <g mask={`url(#svg-sparkline1-${props.id})`}>
          <path
            d="M5.34 13.148L.17 18.328A4 4 0 00-1 21.156V24a4 4 0 004 4h19a4 4 0 004-4v-7.075a4 4 0 00-1.169-2.826l-4.063-4.07a4 4 0 00-5.841.193l-2.658 3.038a2.336 2.336 0 01-3.517 0 2.336 2.336 0 00-3.412-.112z"
            fill="#173A5E"
          />
          <g filter={`url(#svg-sparkline2-${props.id})`}>
            <path
              d="M-1 19.485l6.34-6.34a2.337 2.337 0 013.411.114v0a2.337 2.337 0 003.519 0l2.66-3.04a4 4 0 015.838-.195l5.247 5.246"
              stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
              strokeWidth={2}
            />
          </g>
        </g>
        <rect x={1} y={1} width={22} height={22} rx={4} stroke="#265D97" strokeWidth={2} />
        <defs>
          <filter
            id={`svg-sparkline2-${props.id}`}
            x={-5.707}
            y={7.852}
            width={36.429}
            height={20.34}
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
      <rect width={24} height={24} rx={5} fill={theme.palette.svgBg[active ? 'active' : 'base']} />
      <mask
        id={`svg-sparkline1-${props.id}`}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <rect
          width={24}
          height={24}
          rx={5}
          fill={theme.palette.svgBg[active ? 'active' : 'base']}
        />
      </mask>
      <g mask={`url(#svg-sparkline1-${props.id})`}>
        <path
          d="M7.106 11.378L-1 19.5V28h27V15.27L17.745 7l-7.234 8.27-3.405-3.892z"
          fill={`url(#svg-sparkline2-${props.id})`}
        />
        <g filter={`url(#svg-sparkline3-${props.id})`}>
          <path
            d="M-1 19.485l6.594-6.595a2 2 0 012.92.098l.491.561a2 2 0 003.01 0l4.322-4.94a2 2 0 012.92-.097l6.758 6.758"
            stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
            strokeWidth={2}
          />
        </g>
      </g>
      <rect
        x={1}
        y={1}
        width={22}
        height={22}
        rx={4}
        stroke={theme.palette.svgBg[active ? 'active' : 'base']}
        strokeWidth={2}
      />
      <defs>
        <linearGradient
          id={`svg-sparkline2-${props.id}`}
          x1={12}
          y1={7}
          x2={12}
          y2={25}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={theme.palette.svgBg[active ? 'active' : 'base']} />
          <stop offset={0.953} stopColor={theme.palette.svgStroke[active ? 'active' : 'base']} />
          <stop offset={1} stopColor={theme.palette.svgStroke[active ? 'active' : 'base']} />
        </linearGradient>
        <filter
          id={`svg-sparkline3-${props.id}`}
          x={-5.707}
          y={-1.074}
          width={36.429}
          height={21.266}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={-4} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0.843137 0 0 0 0 0.862745 0 0 0 0 0.882353 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </RootSvg>
  );
}

export default SvgSparkline;
