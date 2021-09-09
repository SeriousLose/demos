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
    return 'C';
  }
}
let c = new C();

let className = c[getClassNameSymbol](); // "C"

// 数组(Array)
// TypeScript像 JavaScript一样可以操作数组元素。
// 有两种方式可以定义数组。
// 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：
let list: number[] = [1, 2, 3];

// 第二种方式是使用数组泛型， Array<元素类型>：
let list1: Array<number> = [1, 2, 3];

// 元组(Tuple)
// 元组类型允许表示一个 已知元素数量 和 类型的数组，各元素的类型不必相同。
// 比如，你可以定义一对值分别为 string和 number类型的元组。
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error

// 当访问一个已知索引的元素，会得到正确的类型：
console.log(x[0].substring(1)); // OK
console.log(x[1].substring(1)); // Error, 'number' does not have 'substring'

x[3] = 'world'; // Error, Property '3' does not exist on type '[string, number]'.
console.log(x[5].toString()); // Error, Property '5' does not exist on type '[string, number]'.

// 枚举(Enum)
// enum类型是对 JavaScript标准数据类型的一个补充。像 C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字
enum Color {
  Red,
  Green,
  Blue,
}
// 默认情况下，从 0开始为元素编号。
let c: Color = Color.Green; // 1

// 手动的指定成员的数值
enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green; // 2

// 或者，全部都采用手动赋值：
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green; // 2

// 初始其中一个值
enum Color {
  Red = 1,
  Green,
  Blue,
}

let colorName: string = Color[2];
console.log(colorName);
// 显示'Green'因为上面代码里它的值是2

// 指定枚举值为字符串
const { log } = console;
enum Color {
  Red = 'rRed',
  Green = 'rGreen',
  Blue = 'rBlue',
}
const c: Color = Color.Red; // 1
log(c); // rRed
log(Color.Green); // rGreen
log(Color.Blue); // rBlue

// 请注意这边如果将枚举值指定为非 number类型的值，
// 则需要每个枚举值都进行手动赋值，否则就会报错 Enummember must have initializer.。
enum Color {
  Red = 'rRed',
  Green,
  Blue,
} // Enum member must have initializer.

// 注意这边如果将枚举值指定为非 number类型的值，则需要每个枚举值都进行手动赋值，
// 同时，除了 number类型，手动赋值的类型需要为同一种类型
// fine-好的
enum Color {
  Red = 0,
  Green = 'rGreen',
  Blue = 'rBlue',
}

// Computed values are not permitted in an enum with string valued members.
enum Color {
  Red = true,
  Green = 'rGreen',
  Blue = 'rBlue',
}

// 指定枚举值为布尔值
enum Color {
  Red = 0,
  Green = true, // Type 'true' is not assignable to type 'Color'
  Blue = false, // Type 'false' is not assignable to type 'Color'
}

// 指定枚举值为 null和 undefined
enum Color {
  Red = 0,
  Green = null, // Type 'null' is not assignable to type 'Color'
  Blue = undefined, // Type 'undefined' is not assignable to type 'Color'
}

// 指定枚举值为 array和 object
enum Color {
  Red = 0,
  Green = [], // Type 'never[]' is not assignable to type 'Color'
  Blue = {}, // Type '{}' is not assignable to type 'Color'
}

// 指定枚举值为 symbol
const sys = Symbol();
enum Color {
  Red = 0,
  Green = sys, // Type 'unique symbol' is not assignable to type 'Color'.
  Blue, // Type '{}' is not assignable to type 'Color'
}

// Any
// 想要为那些在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。
// 不希望 类型检查器对这些值进行检查而是直接让它们通过 编译阶段的检查。可以使用 any类型来标记这些变量
// any类型是十分有用的，允许你在编译时可选择地包含或移除类型检查。
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean

let notSure: any = 4;
notSure.ifItExists(); //  TSLint will not throw Error, okay, ifItExists might exist at runtime
notSure.toFixed(); // TSLint will not throw Error, okay, toFixed exists (but the compiler doesn't check)

// Object类型的变量只是允许你给它赋任意值，但是却不能够在它上面调用任意的方法，即便它真的有这些方法：
let prettySure: Object = 4;
prettySure.toFixed(); // TSLint will throw Error: Property 'toFixed' does not exist on type 'Object'.

// 空值(Void)
// 某种程度上来说， void类型像是与 any类型相反，它表示没有任何类型。
// 当一个函数没有返回值时，你通常会见到其返回值类型是 void
function warnUser(): void {
  console.log('This is my warning message');
}
//  声明一个 void类型的变量没有什么大用，因为你只能为它赋予 undefined和 null
let unusable: void = undefined;

// Null(Null) 和 Undefined(Undefined)
// TypeScript里， undefined和 null两者各自有自己的类型分别叫做 undefined和 null
// 默认情况下 null和 undefined是所有类型的 子类型。
// 就是说你可以把 null和 undefined赋值给 number类型的变量
// 当你指定了 --strictNullChecks标记， null和 undefined只能赋值给 void和它们各自。
let u: undefined = undefined;
let n: null = null;

// 非存在类型(Never)
// never类型表示的是那些永不存在的值的类型。
// 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
// 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

function testNever(test: never): never {
  return test;
}

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error('Something failed');
}
// 返回never的函数必须存在无法达到的终点

function infiniteLoop(): never {
  while (true) {}
}

function testDoWhile(): never {
  do {} while (true);
}

// never类型是任何类型的子类型，也可以赋值给任何类型；
// 然而，没有类型是 never的子类型或可以赋值给 never类型（除了 never本身之外）。即使 any也不可以赋值给 never
const x1: string = never;
// 'never' only refers to a type, but is being used as a value here.

const x2: number = never;
// 'never' only refers to a type, but is being used as a value here.

const x3: boolean = never;
// 'never' only refers to a type, but is being used as a value here.

const x4: null = never;
// 'never' only refers to a type, but is being used as a value here.

const x5: never = never;
// 'never' only refers to a type, but is being used as a value here.

const x6: any = never;
// 'never' only refers to a type, but is being used as a value here.

const x7: undefined = never;
// 'never' only refers to a type, but is being used as a value here.

// 对象(Object)
// object表示非原始类型，也就是除 number， string， boolean， symbol， null或 undefined之外的类型。
// 使用 object类型，就可以更好的表示像 Object.create这样的API。

declare function create(o: object | null): void;

create({ prop: 0 }); // OK

create(null); // OK

create(42); // Error

create('string'); // Error

create(false); // Error

create(undefined); // Error


// 通常这会发生在你清楚地知道一个 实体具有比它现有类型更确切的 类型。
// 通过 类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。
// 类型断言好比其它语言里的 类型转换，或者类型装箱，但是不进行特殊的 数据检查和 解构。
// 它没有运行时的影响，只是在 编译阶段起作用。 TypeScript会假设你已经进行了必须的检查。

let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;

let strLength: number = (someValue as string).length;


type ParsedType = {
  id: number
}

const parseApiResponse(
  response: Record<string, unknown>
): ParsedType => {
   // without doing the type cast we would
  // get a type error here
  const convertedResponse = (response as ParsedType)

  if(convertedResponse.id >= 0) {
    return convertedResponse
  } else {
    throw new Error("Invalid response")
  }
}
