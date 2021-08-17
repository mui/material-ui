import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgCharts({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={28}
      viewBox="0 0 24 28"
      fill="none"
      {...props}
    >
      <rect width={24} height={24} rx={5} fill={theme.palette.svgBg[active ? 'active' : 'base']} />
      <g filter="url(#svg-charts-filter1)">
        <rect
          x={5}
          y={12}
          width={2}
          height={8}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
      </g>
      <g filter="url(#svg-charts-filter2)">
        <rect
          x={9}
          y={8}
          width={2}
          height={12}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
      </g>
      <g filter="url(#svg-charts-filter3)">
        <rect
          x={13}
          y={14}
          width={2}
          height={6}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
      </g>
      <g filter="url(#svg-charts-filter4)">
        <rect
          x={17}
          y={4}
          width={2}
          height={16}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
      </g>
      {theme.palette.mode === 'dark' && (
        <defs>
          <filter
            id="svg-charts-filter1"
            x={1}
            y={12}
            width={10}
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
            id="svg-charts-filter2"
            x={5}
            y={8}
            width={10}
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
          <filter
            id="svg-charts-filter3"
            x={9}
            y={14}
            width={10}
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
            id="svg-charts-filter4"
            x={13}
            y={4}
            width={10}
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
      )}
      {theme.palette.mode === 'light' && (
        <defs>
          <filter
            id="svg-charts-filter1"
            x={1}
            y={12}
            width={10}
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
            <feColorMatrix values="0 0 0 0 0.843137 0 0 0 0 0.862745 0 0 0 0 0.882353 0 0 0 1 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <filter
            id="svg-charts-filter2"
            x={5}
            y={8}
            width={10}
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
          <filter
            id="svg-charts-filter3"
            x={9}
            y={14}
            width={10}
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
            id="svg-charts-filter4"
            x={13}
            y={4}
            width={10}
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
      )}
    </svg>
  );
}

export default SvgCharts;
