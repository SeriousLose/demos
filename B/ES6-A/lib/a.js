// a.js
import { foo } from './b';
console.log('a.js');
export const bar = 1;
export const bar2 = () => {
  console.log('bar2');
}
export function bar3 () {
  console.log('bar3');
}
console.log(foo,111);

const add = (...a) => {
  let sum = a.reduce((t, c) => t + c, 0);
  const item = (...b) => {
    sum = sum + b.reduce((t, c) => t + c, 0);
    return item;
  };
  item.toString = () => sum;
  return item;
};
let c = add(1,2)(3);
console.log(c);

