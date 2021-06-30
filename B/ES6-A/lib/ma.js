// a.mjs
// import { bar } from './mb';
// console.log('a.mjs');
// console.log(bar);
// export let foo = 'foo';

import { bar } from './mb';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export { foo };
