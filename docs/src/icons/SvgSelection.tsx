import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

function SvgSelection({ active, ...props }: { active?: boolean } & React.SVGProps<SVGSVGElement>) {
  const theme = useTheme();
  if (theme.palette.mode === 'dark') {
    if (active) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <rect width={24} height={24} rx={5} fill="#265D97" />
          <path d="M4 8a4 4 0 014-4h8a4 4 0 014 4H4z" fill="#C2E0FF" />
          <path fill="#66B2FF" d="M4 8h16v4H4z" />
          <path fill="#007FFF" d="M4 12h16v4H4z" />
          <path d="M4 16h16a4 4 0 01-4 4H8a4 4 0 01-4-4z" fill="#0072E6" />
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
        <rect width={24} height={24} rx={5} fill="#265D97" />
        <path d="M4 8a4 4 0 014-4h8a4 4 0 014 4H4z" fill="#0072E6" />
        <path fill="#0059B3" d="M4 8h16v4H4z" />
        <path fill="#004C99" d="M4 12h16v4H4z" />
        <path d="M4 16h16a4 4 0 01-4 4H8a4 4 0 01-4-4z" fill="#003A75" />
      </svg>
    );
  }
  if (active) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <rect width={24} height={24} rx={5} fill="#F3F6F9" />
        <path d="M4 8a4 4 0 014-4h8a4 4 0 014 4H4z" fill="#66B2FF" />
        <path fill="#007FFF" d="M4 8h16v4H4z" />
        <path fill="#66B2FF" d="M4 12h16v4H4z" />
        <path d="M4 16h16a4 4 0 01-4 4H8a4 4 0 01-4-4z" fill="#C2E0FF" />
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
      <rect width={24} height={24} rx={5} fill="#F3F6F9" />
      <path d="M4 8a4 4 0 014-4h8a4 4 0 014 4H4z" fill="#D7DCE1" />
      <path fill="#BFC7CF" d="M4 8h16v4H4z" />
      <path fill="#D7DCE1" d="M4 12h16v4H4z" />
      <path d="M4 16h16a4 4 0 01-4 4H8a4 4 0 01-4-4z" fill="#E5E8EC" />
    </svg>
  );
}

export default SvgSelection;
