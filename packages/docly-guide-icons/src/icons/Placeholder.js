import React from 'react';

const SvgPlaceholder = props => (
  <svg viewBox="0 0 57 56" {...props}>
    <g transform="translate(-167 -149)">
      <clipPath id="placeholder_svg__a" clipRule="evenodd">
        <path d="M168 149h56v56h-56v-56z" fill="#FFF" />
      </clipPath>
      <g clipPath="url(#placeholder_svg__a)">
        <use
          xlinkHref="#placeholder_svg__path0_fill"
          transform="translate(171 154.667)"
          fill="#2F424A"
        />
        <use
          xlinkHref="#placeholder_svg__path0_fill"
          transform="matrix(-1 0 0 1 202.3 154.667)"
          fill="#2F424A"
        />
        <use
          xlinkHref="#placeholder_svg__path1_fill"
          transform="translate(184.984 180.333)"
          fill="#2F424A"
        />
        <use
          xlinkHref="#placeholder_svg__path2_fill"
          transform="translate(177.327 153)"
          fill="#2F424A"
        />
        <use
          xlinkHref="#placeholder_svg__path2_fill"
          transform="translate(190.646 153)"
          fill="#2F424A"
        />
        <use
          xlinkHref="#placeholder_svg__path3_fill"
          transform="translate(208.571 170.195)"
          fill="#2F424A"
        />
      </g>
    </g>
    <defs>
      <path
        id="placeholder_svg__path0_fill"
        fillRule="evenodd"
        d="M0 0h7.473v2H2v9.017c0 7.538 6.111 13.65 13.65 13.65v2C7.007 26.667 0 19.66 0 11.017V0z"
      />
      <path
        id="placeholder_svg__path1_fill"
        fillRule="evenodd"
        d="M0 5.516V0h2v5.516c0 7.263 5.888 13.15 13.15 13.15 7.264 0 13.152-5.887 13.152-13.15V0h2v5.516c0 8.367-6.784 15.15-15.151 15.15C6.783 20.667 0 13.884 0 5.517z"
      />
      <path
        id="placeholder_svg__path2_fill"
        d="M5.327 2.667a2.665 2.665 0 0 1-2.663 2.666A2.665 2.665 0 0 1 0 2.667 2.665 2.665 0 0 1 2.664 0a2.665 2.665 0 0 1 2.663 2.667z"
      />
      <path
        id="placeholder_svg__path3_fill"
        fillRule="evenodd"
        d="M5.714 9.463A3.723 3.723 0 0 0 9.43 5.732 3.723 3.723 0 0 0 5.714 2 3.723 3.723 0 0 0 2 5.732a3.723 3.723 0 0 0 3.714 3.731zm0 2c3.156 0 5.715-2.566 5.715-5.731C11.429 2.566 8.87 0 5.714 0 2.558 0 0 2.566 0 5.732c0 3.165 2.558 5.731 5.714 5.731z"
      />
    </defs>
  </svg>
);

export default SvgPlaceholder;
