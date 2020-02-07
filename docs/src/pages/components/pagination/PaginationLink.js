import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

export default function PaginationLink() {
  return (
    <Router>
      <Pagination
        count={10}
        renderItem={item => (
          <PaginationItem
            component={Link}
            to={`/cars${item.page === 1 ? '' : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </Router>
  );
}
