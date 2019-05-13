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
      mqls.forEach((mSet, media) => {
        // for performance reasons we mut cssMatchMedia in the screen object
        const current = cssMatchMedia.match(media, { width });
        // v is a set
        mSet.forEach(mql => {
          mql.dispatchEvent({ type: 'change', matched: current, media, width });
        });
      });
    },
    register(media, l) {
      const mSet = mqls.get(media) || new Set();
      mSet.add(l);
      mqls.set(media, mSet);
    },
  };
}
