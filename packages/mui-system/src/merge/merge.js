import deepmerge from '@mui/utils/deepmerge';

const options = {
  clone: false,
};

function merge(acc, item) {
  return deepmerge(acc, item, options);
}

export default merge;
