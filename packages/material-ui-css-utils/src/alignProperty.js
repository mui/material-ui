function alignProperty({ size, grid }) {
  const sizeBelow = size - (size % grid);
  const sizeAbove = sizeBelow + grid;

  return size - sizeBelow < sizeAbove - size ? sizeBelow : sizeAbove;
}

export default alignProperty;
