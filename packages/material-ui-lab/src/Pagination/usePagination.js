import { useControlled } from '@material-ui/core/utils';

export default function usePagination(props) {
  const {
    boundaryRange = 0,
    componentName = 'usePagination',
    count = 0,
    disabled = false,
    hideNextButton = false,
    hidePrevButton = false,
    onChange: handleChangeProp,
    page: pageProp,
    showFirstButton = false,
    showLastButton = false,
    siblingRange = 1,
    ...other
  } = props;

  const [page, setPageState] = useControlled({
    controlled: pageProp,
    default: 1,
    name: componentName,
  });

  const handleClick = (event, value) => {
    if (!pageProp) {
      setPageState(value);
    }
    if (handleChangeProp) {
      handleChangeProp(event, value);
    }
  };

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

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

  // Basic list of items to render
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

  // Map the button type to its page number
  const buttonPage = type => {
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
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map(item => {
    return typeof item === 'number'
      ? {
          disabled,
          onClick: handleClick,
          page: item,
          selected: item === page,
        }
      : {
          onClick: handleClick,
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
