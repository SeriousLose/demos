// var snabbdom = require('snabbdom');

// 错误使用方式
// import snabbdom from 'snabbdom';
// console.log(snabbdom);

import { h, init, thunk } from 'snabbdom';
console.log(h, thunk, init)

// 1. hello world

// init函数
// 参数: 数组,模块
// 返回值:patch函数,作用对比两个VNode的差异更新到真实DOM中
let patch = init([]);

// h函数
// 第一个参数 标签+选择器
// 第二个参数 如果是字符串,就是标签中的内容
// 返回值 VNode
let VNode = h('div#container.cls-name','hello SeriousLose');

// 获取app DOM
let app = document.querySelector("#app");

// patch函数
// 第一个参数: 如果是DOM元素,内部会把DOM元素转换成VNode
// 第二个参数: VNode
// 返回值 VNode
let oldVNode = patch(app,VNode);

// 模拟接口获取数据
setTimeout(() => {
  VNode = h('div','hello SeriousLose ,你好 snabbdom');
  oldVNode = patch(oldVNode,VNode);
}, 1000);
