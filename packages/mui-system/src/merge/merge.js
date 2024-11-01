import deepmerge from '@mui/utils/deepmerge';
import fastDeepAssign from '@mui/utils/fastDeepAssign';

const options = {
  clone: false,
};

function merge(acc, item) {
  return fastDeepAssign(acc, item);
}

export default merge;
