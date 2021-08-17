import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgTypography({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
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
      <path
        d="M5 16.83h1.742l.64-1.897h3.414l.628 1.897h1.754L10.132 8H8.046L5 16.83zm2.844-3.319L9.09 9.79l1.244 3.721H7.844zM15.986 16.972c.837 0 1.509-.277 2.015-.83v.688h1.47v-4.29c0-.451-.115-.85-.344-1.198a2.259 2.259 0 00-.948-.806c-.396-.197-.858-.296-1.387-.296-.648 0-1.225.154-1.73.462-.506.308-.854.715-1.044 1.221l1.269.616c.118-.292.304-.525.557-.699.252-.182.549-.272.889-.272.355 0 .64.094.853.284.221.182.332.41.332.687v.214l-1.92.308c-.759.126-1.32.367-1.683.723-.364.355-.545.802-.545 1.34 0 .568.201 1.018.604 1.35.403.332.94.498 1.612.498zm-.605-1.908c0-.45.305-.735.913-.854l1.624-.272v.26c0 .443-.154.818-.462 1.127-.3.308-.696.462-1.186.462-.26 0-.474-.063-.64-.19a.652.652 0 01-.249-.533z"
        fill={theme.palette.svgFilled[active ? 'active' : 'base']}
      />
    </svg>
  );
}

export default SvgTypography;
