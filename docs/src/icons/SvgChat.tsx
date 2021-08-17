import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgChat(props: RootSvgProps) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    return (
      <RootSvg
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
          d="M4.577 9.064A1 1 0 004 9.97v16.46a1 1 0 001.423.906l18-8.4A1 1 0 0024 18.03V1.57a1 1 0 00-1.423-.906l-18 8.4z"
          fill="#0059B3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.383 8h10a2 2 0 012 2v8a2 2 0 01-2 2h-12V10a2 2 0 012-2zm-4 11v-9a4 4 0 014-4h10a4 4 0 014 4v8a4 4 0 01-4 4H3.619c-1.056 0-1.391-1.422-.448-1.894L5.383 19z"
          fill="#80BFFF"
        />
        <rect x={9.383} y={11} width={10} height={2} rx={1} fill="#80BFFF" />
        <rect x={9.383} y={15} width={7} height={2} rx={1} fill="#80BFFF" />
      </RootSvg>
    );
  }
  return (
    <RootSvg
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
        d="M4.577 9.064A1 1 0 004 9.97v16.46a1 1 0 001.423.906l18-8.4A1 1 0 0024 18.03V1.57a1 1 0 00-1.423-.906l-18 8.4z"
        fill="#C2E0FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.383 8h10a2 2 0 012 2v8a2 2 0 01-2 2h-12V10a2 2 0 012-2zm-4 11v-9a4 4 0 014-4h10a4 4 0 014 4v8a4 4 0 01-4 4H3.619c-1.056 0-1.391-1.422-.448-1.894L5.383 19z"
        fill={`url(#svg-chat-${props.id})`}
      />
      <rect
        x={9.383}
        y={11}
        width={10}
        height={2}
        rx={1}
        fill={`url(#svg-chat-linear1-${props.id})`}
      />
      <rect
        x={9.383}
        y={15}
        width={7}
        height={2}
        rx={1}
        fill={`url(#svg-chat-linear2-${props.id})`}
      />
      <defs>
        <linearGradient
          id="svg-chat"
          x1={23.383}
          y1={22}
          x2={7.911}
          y2={1.921}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
        <linearGradient
          id={`svg-chat-linear1-${props.id}`}
          x1={19.383}
          y1={13}
          x2={18.613}
          y2={9.154}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
        <linearGradient
          id={`svg-chat-linear2-${props.id}`}
          x1={16.383}
          y1={17}
          x2={15.326}
          y2={13.302}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0059B3" />
          <stop offset={1} stopColor="#007FFF" />
        </linearGradient>
      </defs>
    </RootSvg>
  );
}

export default SvgChat;
