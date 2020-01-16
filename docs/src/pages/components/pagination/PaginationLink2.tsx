import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { usePagination } from '@material-ui/lab/Pagination';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function PaginationLink2() {
  const { items } = usePagination({
    count: 10,
  });

  return (
    <Router>
      <Pagination>
        {items.map((item, index) => (
          <li key={index.toString()}>
            <PaginationItem
              to={`/cars${item.page === 1 ? '' : `?page=${item.page}`}`}
              component={Link}
              {...item}
            />
          </li>
        ))}
      </Pagination>
    </Router>
  );
}
