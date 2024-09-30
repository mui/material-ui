const foo = 'foo';
const bar = 'bar';
throw new Error(`MUI: ${foo}, ${bar}`);
throw new Error(`MUI: ${foo}` + `, ${bar}`);
throw new Error('MUI: ' + `${foo}, ${bar}`);
