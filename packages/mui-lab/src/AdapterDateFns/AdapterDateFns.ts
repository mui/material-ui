let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The AdapterDateFns class was moved from `@mui/lab` to `@mui/x-date-pickers`',
        '',
        "You should use `import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

// tslint:disable-next-line:no-unnecessary-class
export default class AdapterDateFns {
  constructor() {
    warn();
  }
}
