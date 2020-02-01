module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
      },
    ],
  ],
};
