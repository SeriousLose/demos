// lib/counter.js
var counter = 1;
function increment () {
  counter++;
}
function decrement () {
  counter--;
}
module.exports = {
  counter: counter,
  increment: increment,
  decrement: decrement
};
