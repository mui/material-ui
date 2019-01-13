import PropTypes from 'prop-types';
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function TSLogo({ color, ...props }) {
  const fill = color === 'official' ? '#007ACC' : undefined;

  return (
    <SvgIcon viewBox="0 0 630 630" {...props}>
      <g
        fill={fill}
        transform="translate(0.000000,630.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M0 3150 l0 -3150 3150 0 3150 0 0 3150 0 3150 -3150 0 -3150 0 0
-3150z m5077 251 c160 -40 282 -111 394 -227 58 -62 144 -175 151 -202 2 -8
-272 -192 -438 -295 -6 -4 -30 22 -57 62 -81 118 -166 169 -296 178 -191 13
-314 -87 -313 -254 0 -49 7 -78 27 -118 42 -87 120 -139 365 -245 451 -194
644 -322 764 -504 134 -203 164 -527 73 -768 -100 -262 -348 -440 -697 -499
-108 -19 -364 -16 -480 5 -253 45 -493 170 -641 334 -58 64 -171 231 -164 243
3 4 29 20 58 37 28 16 134 77 234 135 l181 105 38 -56 c53 -81 169 -192 239
-229 201 -106 477 -91 613 31 58 53 82 108 82 189 0 73 -9 105 -47 160 -49 70
-149 129 -433 252 -325 140 -465 227 -593 365 -74 80 -144 208 -173 315 -24
89 -30 312 -11 402 67 314 304 533 646 598 111 21 369 13 478 -14z m-1479
-263 l2 -258 -410 0 -410 0 0 -1165 0 -1165 -290 0 -290 0 0 1165 0 1165 -410
0 -410 0 0 253 c0 140 3 257 7 260 3 4 502 6 1107 5 l1101 -3 3 -257z"
        />
      </g>
    </SvgIcon>
  );
}
TSLogo.propTypes = {
  color: PropTypes.oneOf(['inherit', 'official']),
};
TSLogo.defaultProps = {
  color: 'official',
};
TSLogo.muiName = 'SvgIcon';
export default TSLogo;
