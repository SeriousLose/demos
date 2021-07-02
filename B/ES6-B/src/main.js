import * as a from '../lib/export';
// 导入整个模块
import * as test from "./export.js";
// 导入单个绑定
import { age, name, name as personName } from "./export.js";
console.log(a);

console.log(name) // Peter

console.log(name, age) // Peter 25

console.log(test.name, test.age) // Peter 25

console.log(personName) // Peter