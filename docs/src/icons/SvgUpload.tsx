import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgUpload({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <rect
          width={24}
          height={24}
          rx={5}
          fill={theme.palette.svgBg[active ? 'active' : 'base']}
        />
        <mask
          id="svg-upload1"
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
        <g mask="url(#svg-upload1)">
          <g filter="url(#svg-upload2)">
            <path
              d="M11.178 5.186a1 1 0 011.644 0l3.287 4.745a1 1 0 01-.822 1.569H8.713a1 1 0 01-.822-1.57l3.287-4.744z"
              fill={theme.palette.svgFilled[active ? 'active' : 'base']}
            />
          </g>
          <g filter="url(#svg-upload3)">
            <path
              d="M10 11a2 2 0 114 0v4a2 2 0 11-4 0v-4z"
              fill={theme.palette.svgFilled[active ? 'active' : 'base']}
            />
          </g>
          <g filter="url(#svg-upload4)">
            <path
              d="M5 20.333C5 19.597 5.597 19 6.333 19h11.334c.736 0 1.333.597 1.333 1.333a.667.667 0 01-.667.667H5.667A.667.667 0 015 20.333z"
              fill={theme.palette.svgFilled[active ? 'active' : 'base']}
            />
          </g>
        </g>
        <defs>
          <filter
            id="svg-upload2"
            x={3.711}
            y={4.756}
            width={16.577}
            height={14.744}
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
            id="svg-upload3"
            x={6}
            y={9}
            width={12}
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
            id="svg-upload4"
            x={1}
            y={19}
            width={22}
            height={10}
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
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <rect width={24} height={24} rx={5} fill={theme.palette.svgBg[active ? 'active' : 'base']} />
      <mask
        id="svg-upload1"
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
      <g
        filter="url(#svg-upload2)"
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        mask="url(#svg-upload1)"
      >
        <path d="M11.178 5.186a1 1 0 011.644 0l3.287 4.745a1 1 0 01-.822 1.569H8.713a1 1 0 01-.822-1.57l3.287-4.744z" />
        <path d="M10 11a2 2 0 114 0v4a2 2 0 11-4 0v-4zM5 20.333C5 19.597 5.597 19 6.333 19h11.334c.736 0 1.333.597 1.333 1.333a.667.667 0 01-.667.667H5.667A.667.667 0 015 20.333z" />
      </g>
      <defs>
        <filter
          id="svg-upload2"
          x={1}
          y={4.756}
          width={22}
          height={24.244}
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

export default SvgUpload;
