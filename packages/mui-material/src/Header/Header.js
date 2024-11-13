import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import classes from './Header.module.css';

const HeaderRoot = styled('h1')({});

function Header(props) {
  return <HeaderRoot {...props} className={clsx('MuiHeader-root', classes.root, props.className)} />;
}

export default Header;