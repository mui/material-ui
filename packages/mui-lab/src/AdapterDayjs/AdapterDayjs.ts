let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The AdapterDayjs class was moved from `@mui/lab` to `@mui/x-date-pickers`',
        '',
        "You should use `import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @deprecated The AdapterDayjs class was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 */
export default class AdapterDayjs {
  constructor() {
    warn();
  }
}
