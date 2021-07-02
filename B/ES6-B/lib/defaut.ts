// // 导出变量--写法4：导出默认值1
// let name = "Peter";
// export default name;

// // 导出变量--写法5：导出默认值2
// let name = "Peter";
// export { name as default };

// // 导出函数--写法4:导出默认值1
// function sum(a, b) {
//     return a + b;
// }
// export default sum;

// // 导出函数--写法5:导出默认值2
// function sum(a, b) {
//     return a + b;
// }
// export { sum as default };

// // 导出类--写法4：导出默认值1
// class Person {
//     constructor(name) {
//         this.name = name;
//     }
//     hello() {
//         console.log('hello' + this.name)
//     }
// }
// export default Person

// // 导出类--写法5：导出默认值2
// class Person {
//     constructor(name) {
//         this.name = name;
//     }
//     hello() {
//         console.log('hello' + this.name)
//     }
// }
// export { Person as default }

let name = "Peter";
let age = 25;
export default name;
export default age;