import * as React from 'react';
import Badge from '@material-ui/core/Badge';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default {
  react: React,
  '@material-ui/core/Badge': Badge,
  '@material-ui/core/styles': { styled },
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/ShoppingCart': ShoppingCartIcon,
};
