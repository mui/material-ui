import cssMatchMedia from 'css-mediaquery';

export default function createScreen() {
  let width = 640;
  const mqls = new Map(); // mqls
  return {
    getWidth() {
      return width;
    },
    setWidth(w) {
      width = w;
      mqls.forEach((mSet, k) => {
        // for performance reasons we mut cssMatchMedia in the screen object
        const current = cssMatchMedia(k, { width });
        // v is a set
        mSet.forEach(mql => {
          mql.dipatchEvent({ type: 'change', matched: current, media: k, width });
        });
      });
    },
    registerMatchMedia(media, l) {
      const mSet = mqls.get(media) || new Set();
      mSet.add(l);
      mqls.set(media, mSet);
    },
  };
}
