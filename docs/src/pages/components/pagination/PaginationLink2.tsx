import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
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

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

export default function PaginationLink2() {
  const { items } = usePagination({
    count: 10,
  });

  return (
    <Router>
      <Pagination>
        {items.map((item, index) => (
          <li>
            <PaginationItem
              to={`/cars${item.page === 1 ? '' : `?page=${item.page}`}`}
              component={Link}
              {...item}
              key={index.toString()}
            />
          </li>
        ))}
      </Pagination>
    </Router>
  );
}
