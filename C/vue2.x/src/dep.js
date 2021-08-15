class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = []
  }
  // 添加观察者
  addSub (sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 通知所有观察者
  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
// 以下代码在 Observer 类中 defineReactive 方法中添加
// 创建 dep 对象收集依赖
const dep = new Dep()
// getter 中
// get 的过程中收集依赖
Dep.target && dep.addSub(Dep.target)
// setter 中
// 当数据变化之后，发送通知
dep.notify()
