// Non-relative imports should not be modified
import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

// Relative import should be modified
import { localFunction } from './src/local-file';

// Re-export non-relative
export { useState } from 'react';
export * from '@mui/material';

// Dynamic import non-relative
const loadLodash = () => import('lodash');

console.log(React, Button, axios, localFunction, loadLodash);
