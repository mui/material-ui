import systemStyles from './systemStyles';

const system = ({ theme, ...props }) => {
  const propKeys = Object.keys(props);
  let style = {};
  for (let i = 0, length = propKeys.length; i < length; i+=1) {
    const key = propKeys[i];
    const systemStyle = systemStyles[key];
    if (systemStyle) {
      style = {
        ...style,
        ...systemStyle(props[key], theme)
      };
    }
  }
  return style;
}

export default system;
