// b.mjs
// import { foo } from './ma';
// console.log('b.mjs');
// console.log(foo);
// export let bar = 'bar';

import { foo } from './ma';
console.log('b.mjs');
console.log(foo());
function bar() { return'bar' }
export { bar };
