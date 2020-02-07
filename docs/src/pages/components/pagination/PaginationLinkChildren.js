import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination, { usePagination } from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export default function PaginationLinkChildren() {
  const { items } = usePagination({
    count: 10,
  });

  return (
    <Router>
      <Pagination>
        {items.map(item => (
          <li key={item.type || item.page.toString()}>
            <PaginationItem
              component={Link}
              to={`/cars${item.page === 1 ? '' : `?page=${item.page}`}`}
              {...item}
            />
          </li>
        ))}
      </Pagination>
    </Router>
  );
}
