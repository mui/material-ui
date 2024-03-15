import createEmotion from '@emotion/css/create-instance';

const { keyframes, cache, css } = createEmotion({
  stylisPlugins: [],
  key: 'zero',
});

export { keyframes, cache, css };
