require('@babel/register')({
  extensions: ['.js', '.ts', '.tsx'],
  ignore: ['node_modules\\/([^(@mui\\/x-date-pickers\\/(.*)\\.js)])'],
});
