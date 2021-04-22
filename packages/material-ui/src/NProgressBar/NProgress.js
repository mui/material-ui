import { getInitialDelay, setProgressValue } from '@material-ui/core/NProgressBar/nProgressState';

let timeout;

const NProgress = {
  start() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setProgressValue(1);
      timeout = undefined;
    }, getInitialDelay());
  },
  finish() {
    if (timeout) {
      clearTimeout(timeout);
    } else {
      setProgressValue(100);
    }
  },
};

export default NProgress;
