// 布尔值(Boolean)
// 最基本的数据类型就是简单的 true/ false值，在 JavaScript和 TypeScript里叫做 boolean（其它语言中也一样）。
let isDone: boolean = false;

// 数字(Number)
// 和 JavaScript一样， TypeScript里的所有数字都是 浮点数。这些 浮点数的类型是 number。
// 除了支持 十进制和 十六进制字面量， TypeScript还支持 ECMAScript2015中引入的 二进制和 八进制字面量。

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 字符串(String)
// 可以使用双引号（ "）或单引号（ '）表示字符串
let color: string = 'blue';

// 标记(Symbol)
// 自 ECMAScript2015起， symbol成为了一种新的原生类型，就像 number和 string一样。
// symbol类型的值是通过 Symbol构造函数创建的

let sym1 = Symbol();
let sym2 = Symbol('key');
// 可选的字符串key

// Symbols是不可改变且唯一的。

let sym3 = Symbol('key');
let sym4 = Symbol('key');
sym3 === sym4; // false, symbols是唯一的

// symbols也可以被用做对象属性的键。
let sym = Symbol();
let obj = {
  [sym]: 'value',
};
console.log(obj[sym]); // "value"

// Symbols也可以与计算出的 属性名声明相结合，来声明对象的属性和类成员。
const getClassNameSymbol = Symbol();
class C {
  [getClassNameSymbol]() {
    return ('C');
  }
}
let c = new C();

let className = c[getClassNameSymbol](); // "C"
