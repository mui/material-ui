import deepmerge from '@mui/utils/deepmerge';

function merge(acc: object, item: object): object {
  if (!item) {
    return acc;
  }

  return deepmerge(acc, item, {
    clone: false, // No need to clone deep, it's way faster.
  });
}

export default merge;
