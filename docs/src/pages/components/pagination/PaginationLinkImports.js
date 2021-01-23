import * as React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/core/Pagination';
import PaginationItem from '@material-ui/core/PaginationItem';

export default {
  react: React,
  'react-router': { MemoryRouter, Route },
  'react-router-dom': { Link },
  '@material-ui/core/Pagination': Pagination,
  '@material-ui/core/PaginationItem': PaginationItem,
};
