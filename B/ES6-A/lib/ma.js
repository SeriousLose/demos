// a.mjs
// import { bar } from './mb';
// console.log('a.mjs');
// console.log(bar);
// export let foo = 'foo';
import $ from 'jquery';
import { bar } from './mb';
console.log('a.mjs');
console.log(bar());
console.log($)
function foo() { return 'foo' }
export { foo };
