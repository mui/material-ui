let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The AdapterMoment class was moved from `@mui/lab` to `@mui/x-date-pickers`',
        '',
        "You should use `import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @deprecated The AdapterMoment class was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 */
export default class AdapterMoment {
  constructor() {
    warn();
  }
}
