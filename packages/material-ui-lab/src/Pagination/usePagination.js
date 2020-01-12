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
      count - boundaryRange - siblingRange * 2 - 2,
    ),
    // Greater than startPages
    boundaryRange + 3,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingRange,
      // Upper boundary when page is low
      boundaryRange + siblingRange * 2 + 3,
    ),
    // Less than endPages
    endPages[0] - 2,
  );

  // itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(showFirstButton ? ['first'] : []),
    ...(hidePrevButton ? [] : ['previous']),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryRange + 3
      ? ['ellipsis']
      : 2 + boundaryRange < count - boundaryRange - 1
      ? [2 + boundaryRange]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryRange - 2
      ? ['ellipsis']
      : count - boundaryRange - 1 > boundaryRange + 1
      ? [count - boundaryRange - 1]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next']),
    ...(showLastButton ? ['last'] : []),
  ];

  const itemProps = {
    disabled,
    onChange: handleChange,
    page,
  };

  function buttonPage(type) {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return page - 1;
      case 'next':
        return page + 1;
      case 'last':
        return count;
      default:
    }
  }

  const items = itemList.map(item => {
    return typeof item === 'number'
      ? {
          ...itemProps,
          page: item,
          selected: item === page,
        }
      : {
          ...itemProps,
          type: item,
          page: buttonPage(item),
          disabled: disabled || (item === 'next' || item === 'last' ? page >= count : page <= 1),
        };
  });

  return {
    items,
    ...other,
  };
}
