// import * as a from '../lib/export';
// // 导入整个模块
// import * as test from "./export.js";
// // 导入默认值
// import { age, default as add, default as lalala, default as sum, name, name as personName } from "./export.js";
// console.log(a);

// console.log(name) // Peter

// console.log(name, age) // Peter 25

// console.log(test.name, test.age) // Peter 25

// console.log(personName) // Peter

// // 导出默认值
// let name = "Peter";
// export default name;

// console.log(lalala) // Peter


// // 导出默认值、非默认值
// let name = "Peter"
// function sum(a, b) {
//     return a + b;
// }
// export default sum;
// export { name };

// console.log(sum(1, 2)) // 3
// console.log(name) // Peter

// console.log(add(1, 2)) // 3
// console.log(name) // Peter

// if (true) {
//   export * from './export.js';
// }