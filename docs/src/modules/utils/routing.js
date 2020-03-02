import find from 'lodash/find';

export function getAsPath(page) {
  const { linkProps = {}, pathname } = page;
  return (linkProps.as || pathname).replace(/\/$/, '');
}

export function arePagesEqual(leftPage, rightPage) {
  return getAsPath(leftPage) === getAsPath(rightPage);
}

export function isChild(asPath, page) {
  return asPath.indexOf(getAsPath(page)) === 0;
}

export function findActivePage(pages, asPath) {
  const activePage = find(pages, page => {
    if (page.children) {
      if (isChild(asPath, page)) {
        // Check if one of the children matches (for /components)
        return findActivePage(page.children, asPath);
      }
    }

    // Should be an exact match if no children
    return getAsPath(page) === asPath;
  });

  if (!activePage) {
    return null;
  }
  // active page is a child of the currentPage
  if (getAsPath(activePage) !== asPath) {
    return findActivePage(activePage.children, asPath);
  }

  return activePage;
}
