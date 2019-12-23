module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
      },
    ],
  ],
};
