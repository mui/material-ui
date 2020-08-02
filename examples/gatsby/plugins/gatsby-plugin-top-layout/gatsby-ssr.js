/* eslint-disable import/prefer-default-export */
import React from 'react';
import TopLayout from './TopLayout';

export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};
