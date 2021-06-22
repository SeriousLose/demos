let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// Index signature in type 'readonly number[]' only permits reading.

// ro.push(5); // error!
// Property 'push' does not exist on type 'readonly number[]'.

// ro.length = 100; // error!
// Cannot assign to 'length' because it is a read-only property.

// a = ro; // error!
// The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.

a = ro as number[];

// 多余属性检查

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return { color: config.color || 'red', area: config.width || 20 };
}
// let mySquare = createSquare({ colour: "red", width: 100 }); // 报错
// 报错原因
// TypeScript 认为这可能是一个 BUG。
// 编译器在将对象字面量赋值给别的变量或者传递给某个函数时会有一个被称为***多余属性检查***的特殊过程。
// 如果对象字面量有任何目标类型所没有的属性时，就会报错;
// Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
//  Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write ‘color'

// 跳过该检查

// let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

interface SearchFunc {
  (source: string, subString: string): boolean;
}

// let mySearch: SearchFunc;
// // 该函数拥有和类型声明一致的参数类型和返回值。
// mySearch = function (source: string, subString: string) {
//   let result = source.search(subString);
//   return result > -1;
// };

// let mySearch: SearchFunc;
// mySearch = function (src, sub) {
//   let result = src.search(sub);
//   return result > -1;
// };

// let mySearch: SearchFunc;
// mySearch = function (src, sub) {
//   // Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
//   //  Type 'string' is not assignable to type 'boolean'.
//   let result = src.search(sub);
//   return 'string';
// };

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  // [x: number]: Animal;
  // Numeric index type 'Animal' is not assignable to string index type 'Dog'.
  [x: number]: Dog; // [x:number]:Dog , Dog 要和 Dog保持一致
  [x: string]: Dog;
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
// myArray[2] = 'Mallory'; // error!
// Index signature in type 'ReadonlyStringArray' only permits reading.

// interface ClockInterface {
//   currentTime: Date;
// }

// class Clock implements ClockInterface {
//   currentTime: Date = new Date();
//   constructor(h: number, m: number) {}
// }

// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date): void;
// }

// class Clock implements ClockInterface {
//   currentTime: Date = new Date();
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number) {}
// }

// interface ClockConstructor {
//   new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
//   // Class 'Clock' incorrectly implements interface 'ClockConstructor'.
//   //  Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'.
//   currentTime: Date;
//   constructor(h: number, m: number) {}
// }

// 定义了两个接口，
// 构造函数类型 ClockConstructor 和实例类型 ClockInterface，
// 再定义了一个创建实例的函数 createClock，该函数返回第一个参数的实例

// 构造函数类型接口 ClockConstructor
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

// 实例类型 ClockInterface
interface ClockInterface {
  tick(): void;
}

/**
 * @description: 创建实例函数
 * @param {type} ctor:ClockConstructor
 * @return: ClockInterface的实例
 */
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep');
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tick tock');
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep');
  }
};

interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;



  class Control {
    private state: any;
  }

  interface SelectableControl extends Control {
    select(): void;
  }

  class Button extends Control implements SelectableControl {
    select() {}
  }

  class TextBox extends Control {
    select() {}
  }

  // class ImageControl implements SelectableControl {
  //   // Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
  //   // Types have separate declarations of a private property 'state'.
  //   private state: any;
  //   select() {}
  // }
