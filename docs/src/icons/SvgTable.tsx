import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgTable({ active, ...props }: RootSvgProps<{ active?: boolean }>) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    if (active) {
      return (
        <RootSvg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <rect width={24} height={24} rx={5} fill="#1E4976" />
          <mask
            id={`svg-table-mask1-${props.id || ''}`}
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={24}
            height={24}
          >
            <rect width={24} height={24} rx={5} fill="#265D97" />
          </mask>
          <g mask={`url(#svg-table-mask1-${props.id || ''})`}>
            <g filter={`url(#svg-table-mask2-${props.id || ''})`}>
              <mask id={`svg-table-mask3-${props.id || ''}`} fill="#fff">
                <rect x={4} y={4} width={23} height={24} rx={1} />
              </mask>
              <rect x={4} y={4} width={23} height={24} rx={1} fill="#132F4C" />
              <rect
                x={4}
                y={4}
                width={23}
                height={24}
                rx={1}
                stroke="#66B2FF"
                strokeWidth={4}
                mask={`url(#svg-table-mask3-${props.id || ''})`}
              />
            </g>
            <rect x={4.5} y={10.5} width={22} height={1} rx={0.5} fill="#007FFF" stroke="#66B2FF" />
            <rect x={9.5} y={14.5} width={7} height={1} rx={0.5} fill="#39F" stroke="#66B2FF" />
            <rect x={19.5} y={14.5} width={7} height={1} rx={0.5} fill="#39F" stroke="#66B2FF" />
            <rect x={4.5} y={18.5} width={24} height={1} rx={0.5} fill="#007FFF" stroke="#66B2FF" />
          </g>
          <defs>
            <filter
              id={`svg-table-mask2-${props.id || ''}`}
              x={0}
              y={4}
              width={31}
              height={32}
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
        <rect width={24} height={24} rx={5} fill="#1E4976" />
        <mask
          id={`svg-table-mask1-${props.id || ''}`}
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={24}
          height={24}
        >
          <rect width={24} height={24} rx={5} fill="#265D97" />
        </mask>
        <g mask={`url(#svg-table-mask1-${props.id || ''})`}>
          <g filter={`url(#svg-table-mask2-${props.id || ''})`}>
            <mask id={`svg-table-mask3-${props.id || ''}`} fill="#fff">
              <rect x={4} y={4} width={23} height={24} rx={1} />
            </mask>
            <rect x={4} y={4} width={23} height={24} rx={1} fill="#173A5E" />
            <rect
              x={4}
              y={4}
              width={23}
              height={24}
              rx={1}
              stroke="#001E3C"
              strokeWidth={4}
              mask={`url(#svg-table-mask3-${props.id || ''})`}
            />
          </g>
          <rect x={4} y={10} width={23} height={2} rx={1} fill="#001E3C" />
          <rect x={9} y={14} width={8} height={2} rx={1} fill="#001E3C" />
          <rect x={19} y={14} width={8} height={2} rx={1} fill="#001E3C" />
          <rect x={4} y={18} width={25} height={2} rx={1} fill="#001E3C" />
        </g>
        <defs>
          <filter
            id={`svg-table-mask2-${props.id || ''}`}
            x={0}
            y={4}
            width={31}
            height={32}
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
        id={`svg-table-mask1-${props.id || ''}`}
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
      <g mask={`url(#svg-table-mask1-${props.id || ''})`}>
        <g filter={`url(#svg-table-filter1-${props.id || ''})`}>
          <mask
            id={`svg-table-mask2-${props.id || ''}`}
            fill={theme.palette.svgStroke[active ? 'active' : 'base']}
          >
            <rect x={4} y={4} width={23} height={24} rx={1} />
          </mask>
          <rect
            x={4}
            y={4}
            width={23}
            height={24}
            rx={1}
            fill={theme.palette.svgStroke[active ? 'active' : 'base']}
          />
          <rect
            x={4}
            y={4}
            width={23}
            height={24}
            rx={1}
            stroke={theme.palette.svgFilled[active ? 'active' : 'base']}
            strokeWidth={4}
            mask={`url(#svg-table-mask2-${props.id || ''})`}
          />
        </g>
        <rect
          x={4}
          y={10}
          width={23}
          height={2}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
        <rect
          x={9}
          y={14}
          width={8}
          height={2}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
        <rect
          x={19}
          y={14}
          width={8}
          height={2}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
        <rect
          x={4}
          y={18}
          width={25}
          height={2}
          rx={1}
          fill={theme.palette.svgFilled[active ? 'active' : 'base']}
        />
      </g>
      <defs>
        <filter
          id={`svg-table-filter1-${props.id || ''}`}
          x={0}
          y={4}
          width={31}
          height={32}
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

export default SvgTable;
