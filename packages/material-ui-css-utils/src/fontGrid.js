// fontGrid finds a minimal grid (in rem) for the fontSize values so that the
// lineHeight falls under a x pixels grid, 4px in the case of Material Design,
// without changing the relative line height
function fontGrid({ lineHeight, pixels, htmlFontSize }) {
  return pixels / (lineHeight * htmlFontSize);
}

export default fontGrid;
