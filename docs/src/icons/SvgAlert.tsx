import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

function SvgAlert({ active, ...props }: RootSvgProps<{ active?: boolean }>) {
  const theme = useTheme();
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
      <path
        d="M12 6.492l5.647 9.758H6.352L12 6.492zM5.055 15.5a1.5 1.5 0 001.297 2.25h11.295a1.5 1.5 0 001.298-2.25l-5.648-9.758a1.5 1.5 0 00-2.595 0L5.055 15.5zm6.195-5.25v1.5c0 .412.337.75.75.75.412 0 .75-.338.75-.75v-1.5A.752.752 0 0012 9.5a.752.752 0 00-.75.75zm0 4.5a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
    </RootSvg>
  );
}

export default SvgAlert;
