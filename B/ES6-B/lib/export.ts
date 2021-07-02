// 导出变量--写法1
export let name = 'Peter';

// 导出变量--写法2：先定义，再导出
let name1 = "Peter";
export { name1 };
export { name2 as PersonName }; // 这里export时记得加花括号，不加则会报错。
export { sum2 };
export { sum3 as add };
export { Person2 };
export { Person3 as HelloPerson };

// 导出变量--写法3：重命名
let name2 = "Peter";

// 导出函数--写法1
export function sum1(a, b) {
  return a + b;
}

// 导出函数--写法2：先定义、再导出
function sum2(a, b) {
  return a + b;
}

// 导出函数--写法3：重命名
function sum3(a, b) {
  return a + b;
}

// 导出类--写法1
export class Person1 {
  constructor(name) {
      this.name = name;
  }
  hello() {
      console.log('hello' + this.name)
  }
}

// 导出类--写法2：先定义、再导出
class Person2 {
  constructor(name) {
      this.name = name;
  }
  hello() {
      console.log('hello' + this.name)
  }
}

// 导出类--写法3：重命名
class Person3 {
  constructor(name) {
      this.name = name;
  }
  hello() {
      console.log('hello' + this.name)
  }
}
