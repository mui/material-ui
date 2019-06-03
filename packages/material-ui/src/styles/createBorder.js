export default function createBorder(defaultWidth, defaultStyle, defaultColor) {
  const border = (widthArg, styleArg, colorArg) => {
    const width = widthArg || defaultWidth;
    const style = styleArg || defaultStyle;
    const color = colorArg || defaultColor;

    return `${typeof width === 'number' ? `${width}px` : width} ${style} ${color}`;
  };

  return border;
}
