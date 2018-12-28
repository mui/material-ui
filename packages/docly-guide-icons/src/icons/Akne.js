import React from 'react';

const SvgAkne = props => (
  <svg viewBox="0 0 56 57" {...props}>
    <g transform="translate(-14 178)">
      <clipPath id="akne_svg__a" clipRule="evenodd">
        <path d="M14-178h56v56H14v-56z" fill="#FFF" />
      </clipPath>
      <g clipPath="url(#akne_svg__a)">
        <use
          xlinkHref="#akne_svg__path0_fill"
          transform="matrix(-1 0 0 1 53.948 -175.997)"
          fill="#2F424A"
        />
        <use
          xlinkHref="#akne_svg__path1_fill"
          transform="matrix(-1 0 0 1 37.641 -155.628)"
          fill="#2F424A"
        />
        <use
          xlinkHref="#akne_svg__path2_fill"
          transform="matrix(-1 0 0 1 48.472 -145.239)"
          fill="#FF383B"
        />
        <use
          xlinkHref="#akne_svg__path2_fill"
          transform="matrix(-1 0 0 1 42.38 -141.062)"
          fill="#FF383B"
        />
        <use
          xlinkHref="#akne_svg__path2_fill"
          transform="matrix(-1 0 0 1 42.38 -148.719)"
          fill="#FF383B"
        />
      </g>
    </g>
    <defs>
      <path
        id="akne_svg__path0_fill"
        fillRule="evenodd"
        d="M.623 2.194l-.502.031L0 .23.406.204C3.27.029 7.402-.224 11.424.387c4.225.647 8.536 2.29 11.131 6.204 1.324 1.996 1.934 4.986 2.232 7.336.151 1.196.228 2.292.266 3.068a35.615 35.615 0 0 1 .036 1.062l5.158 11.233a2 2 0 0 1-1.347 2.778l-3.809.922v5.202l-.01.072c-.185 1.241-.833 3.222-2.053 4.819-1.275 1.643-3.24 2.997-6.045 2.997h-1.707v4.917h-2V44.08h3.707c2.069 0 3.49-.966 4.465-2.223 1.008-1.275 1.48-2.738 1.643-3.811v-6.63l5.338-1.292L23.091 18.5v-.294a19.64 19.64 0 0 0-.004-.235 33.114 33.114 0 0 0-.032-.88 37.73 37.73 0 0 0-.252-2.913c-.295-2.326-.869-4.904-1.915-6.482-2.143-3.232-5.785-4.722-9.768-5.333C7.355 1.78 3.471 2.02.623 2.194z"
      />
      <path
        id="akne_svg__path1_fill"
        d="M4.061 2.088c0 1.154-.909 2.088-2.03 2.088C.909 4.176 0 3.241 0 2.088S.91 0 2.03 0c1.122 0 2.032.935 2.032 2.088z"
      />
      <path
        id="akne_svg__path2_fill"
        d="M3.385 1.74c0 .961-.758 1.74-1.693 1.74C.758 3.48 0 2.701 0 1.74 0 .78.758 0 1.692 0c.935 0 1.693.78 1.693 1.74z"
      />
    </defs>
  </svg>
);

export default SvgAkne;
