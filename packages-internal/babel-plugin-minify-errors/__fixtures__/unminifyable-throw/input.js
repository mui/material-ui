const foo = 'foo';
const bar = ['bar'];
throw /* minify-error */ new Error(foo);
throw /* minify-error */ new Error(...bar);
