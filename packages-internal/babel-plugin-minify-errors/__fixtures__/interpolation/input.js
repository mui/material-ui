const foo = 'foo';
const bar = 'bar';
throw /* mui-minify-error */ new Error(`MUI: ${foo}, ${bar}`);
throw /* mui-minify-error */ new Error(`MUI: ${foo}` + `, ${bar}`);
throw /* mui-minify-error */ new Error('MUI: ' + `${foo}, ${bar}`);
