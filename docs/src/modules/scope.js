import * as React from 'react';
import * as Material from '@mui/material';
import * as IconsMaterial from '@mui/icons-material';
import * as Lab from '@mui/lab';

const baseImports = {
  react: React,
  '@mui/material': Material,
  '@mui/icons-material': IconsMaterial,
  '@mui/lab': Lab,
};
const packages = Object.keys(baseImports);

export default {
  require: (module) => {
    if (packages.includes(module)) {
      return baseImports[module];
    }

    // eslint-disable-next-line
    for (const key of packages) {
      if (module.startsWith(key)) {
        const result = baseImports[key][module.substring(key.length + 1)];
        if (result !== undefined) {
          return Object.assign(result, baseImports[key]);
        }
        throw new Error(`Module "${module}" not found`);
      }
    }

    throw new Error(`Module "${module}" not found`);
  },
};
