export default function usePagination(props) {
  const {
    boundaryRange = 0,
    count,
    disabled = false,
    hideNextButton = false,
    hidePrevButton = false,
    showFirstButton = false,
    showLastButton = false,
    onChange: handleChange,
    page = 1,
    siblingRange = 1,
    ...other
  } = props;

  function range(start, end) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  const startPages = range(1, Math.min(boundaryRange + 1, count));
  const endPages = range(Math.max(count - boundaryRange, boundaryRange + 2), count);

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingRange,
      // Lower boundary when page is high
      count - boundaryRange - siblingRange * 2 - 2),
    // Greater than startPages
    boundaryRange + 3
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingRange,
      // Upper boundary when page is low
      boundaryRange + siblingRange * 2 + 3
    ),
    // Less than endPages
    endPages[0] - 2
  );

  const siblingPages = range(siblingsStart, siblingsEnd);

  const itemProps = {
    disabled,
    onChange: handleChange,
    page,
  };

  const items = [];

  // First page button
  if (showFirstButton) {
    items.push({
      ...itemProps,
      disabled: disabled || page <= 1,
      type: 'first',
    });
  }

  // Previous page button
  if (!hidePrevButton) {
    items.push({
      ...itemProps,
      disabled: disabled || page <= 1,
      type: 'previous',
    });
  }

  // Start pages
  startPages.forEach(i => (
    items.push({
      ...itemProps,
      page: i,
      selected: page === i,
    })
  ));

  // Start ellipsis
  if (siblingsStart > boundaryRange + 3) {
    items.push({ type: 'ellipsis' });
  } else if (2 + boundaryRange < count - boundaryRange - 1) {
    items.push({
      ...itemProps,
      page: 2 + boundaryRange,
      selected: page === 2 + boundaryRange,
    });
  }

  // Sibling pages
  siblingPages.forEach(i => (
    items.push({
      ...itemProps,
      page: i,
      selected: page === i,
    })
  ));

  // End ellipsis
  if (siblingsEnd < count - boundaryRange - 2) {
    items.push({ type: 'ellipsis' });
  } else if (count - boundaryRange - 1 > boundaryRange + 1) {
    items.push({
      ...itemProps,
      page: count - boundaryRange - 1,
      selected: page === count - boundaryRange - 1,
    });
  }

  // End pages
  endPages.forEach(i => (
    items.push({
      ...itemProps,
      page: i,
      selected: page === i,
    })
  ));

  // Next page button
  if (!hideNextButton) {
    items.push({
      ...itemProps,
      disabled: disabled || page >= count,
      type: 'next',
    });
  }

  // Last page button
  if (showLastButton) {
    items.push({
      ...itemProps,
      disabled: disabled || page >= count,
      type: 'last',
    });
  }

  console.log(items)

  return {
    items,
    ...other,
  };
}
