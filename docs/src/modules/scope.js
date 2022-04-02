const baseImports = {
  react: require('react'),
  '@mui/material': require('@mui/material'),
  '@mui/material/styles': require('@mui/material/styles'),
  '@mui/icons-material': require('@mui/icons-material'),
  '@mui/lab': require('@mui/lab'),
};
const packages = Object.keys(baseImports);

export default {
  require: (module) => {
    if (packages.includes(module)) return baseImports[module];

    for (const key of packages) {
      if (module.startsWith(key)) {
        const result = baseImports[key][module.substring(key.length + 1)];
        if (result !== undefined) return result;
        throw new Error(`Module "${module}" not found`);
      }
    }

    throw new Error(`Module "${module}" not found`);
  },
};
