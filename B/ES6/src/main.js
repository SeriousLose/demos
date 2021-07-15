import * as counter from '../lib/counter';
console.log(counter.counter); // 1
counter.increment();
console.log(counter.counter); // 2

const curry_add = (...a) => {
  let num = a.reduce((t, c) => t + c, 0);
  const item = (...b) => {
    num = num + b.reduce((t, c) => t + c, 0);
    return item;
  };
  item.toString = () => num;
  return item;
};
curry_add(1, 2)(3);