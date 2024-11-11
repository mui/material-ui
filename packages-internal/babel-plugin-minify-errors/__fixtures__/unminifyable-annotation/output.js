const foo = 'foo';
const bar = ['bar'];
throw /* FIXME (minify-errors-in-prod): Unminifyable error in production! */ new Error(foo);
throw /* FIXME (minify-errors-in-prod): Unminifyable error in production! */ new Error(...bar);
