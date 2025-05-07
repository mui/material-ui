const foo = 'foo';
const bar = 'bar';
throw /* minify-error */ new Error(`MUI: ${foo}, ${bar}`);
throw /* minify-error */ new Error(`MUI: ${foo}` + `, ${bar}`);
throw /* minify-error */ new Error('MUI: ' + `${foo}, ${bar}`);
