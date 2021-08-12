import { h, init } from 'snabbdom';

let patch = init([]);
let VNode = h('div#container',[
  h('h1','hello 苦了'),
  h('p','这是个p标签')
])

let app = document.querySelector("#app");

let oldVNode  = patch(app,VNode);

setTimeout(() => {
  // patch(oldVNode,null)
  oldVNode = patch(oldVNode,h('!'))
}, 2000);

