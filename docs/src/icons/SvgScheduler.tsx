import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgScheduler({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={27}
        viewBox="0 0 24 27"
        fill="none"
        {...props}
      >
        <rect
          width={24}
          height={24}
          rx={5}
          fill={theme.palette.svgBg[active ? 'active' : 'base']}
        />
        <path fill="#173A5E" d="M8 5h16v6H8zM15 13h9v6h-9z" />
        <g filter="url(#svg-scheduler1)">
          <circle cx={7} cy={8} r={3} fill={theme.palette.svgFilled[active ? 'active' : 'base']} />
        </g>
        <g filter="url(#svg-scheduler2)">
          <circle
            cx={15}
            cy={16}
            r={3}
            fill={theme.palette.svgFilled[active ? 'active' : 'base']}
          />
        </g>
        <defs>
          <filter
            id="svg-scheduler1"
            x={0}
            y={5}
            width={14}
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
            id="svg-scheduler2"
            x={8}
            y={13}
            width={14}
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
        </defs>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={27}
      viewBox="0 0 24 27"
      fill="none"
      {...props}
    >
      <rect width={24} height={24} rx={5} fill={theme.palette.svgBg[active ? 'active' : 'base']} />
      <path fill="#D7DCE1" d="M8 5h16v6H8zM15 13h9v6h-9z" />
      <g filter="url(#svg-scheduler1)">
        <circle cx={7} cy={8} r={3} fill={theme.palette.svgFilled[active ? 'active' : 'base']} />
      </g>
      <g filter="url(#svg-scheduler2)">
        <circle cx={15} cy={16} r={3} fill={theme.palette.svgFilled[active ? 'active' : 'base']} />
      </g>
      <defs>
        <filter
          id="svg-scheduler1"
          x={0}
          y={5}
          width={14}
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
          id="svg-scheduler2"
          x={8}
          y={13}
          width={14}
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
      </defs>
    </svg>
  );
}

export default SvgScheduler;
