import { eventListenersModule, h, init, styleModule } from 'snabbdom';

let patch = init([
  styleModule,
  eventListenersModule,
])

let VNode = h('div', {
  style: {
    backgroundColor: 'red'
  },
  on: { click: eventHandler }
}, [
  h('h1', 'hello 七夕')
])

function eventHandler () {
  console.log('你好,SeriousLose')
}

let app = document.getElementById("app");
let oldVNode = patch(app, VNode);
