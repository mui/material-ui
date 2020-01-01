export default function usePagination(props) {
  const {
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
      page: 1,
      type: 'first',
    });
  }

  // Previous page button
  if (!hidePrevButton) {
    items.push({
      ...itemProps,
      disabled: disabled || page <= 1,
      page: page - 1,
      type: 'previous',
    });
  }

  // First page
  items.push({
    ...itemProps,
    page: 1,
    selected: page === 1,
  });

  // Start ellipsis
  if (page - siblingRange > 3) {
    items.push({ type: 'ellipsis' });
  } else {
    items.push({
      ...itemProps,
      page: 2,
      selected: page === 2,
    });
  }

  // Siblings
  for (
    let i = Math.max(3, Math.min(page - siblingRange, count - 2 - siblingRange * 2));
    i <= Math.max(Math.min(count - 2, page + siblingRange), siblingRange * 2 + 3);
    i += 1
  ) {
    items.push({
      ...itemProps,
      page: i,
      selected: page === i,
    });
  }

  // End ellipsis
  if (page + siblingRange < count - 2) {
    items.push({ type: 'ellipsis' });
  } else {
    items.push({
      ...itemProps,
      page: count - 1,
      selected: page === count - 1,
    });
  }

  // Last page
  if (count > 1) {
    items.push({
      ...itemProps,
      page: count,
      selected: page === count,
    });
  }

  // Next page button
  if (!hideNextButton) {
    items.push({
      ...itemProps,
      disabled: disabled || page >= count,
      page: page + 1,
      type: 'next',
    });
  }

  // Last page button
  if (showLastButton) {
    items.push({
      ...itemProps,
      disabled: disabled || page >= count,
      page: count,
      type: 'last',
    });
  }

  return {
    items,
    ...other,
  };
}
