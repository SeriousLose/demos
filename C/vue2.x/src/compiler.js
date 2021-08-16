// 负责解析指令/插值表达式
class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    // 编译模板
    this.compile(this.el)
  }
  // 编译模板
  // 处理文本节点和元素节点
  compile (el) {
    const nodes = el.childNodes
    Array.from(nodes).forEach(node => {
      // 判断是文本节点还是元素节点
      if (this.isTextNode(node)) {
        // 文本节点
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 元素节点
        this.compileElement(node)
      }
      // 多层级,继续遍历 递归调用
      if (node.childNodes && node.childNodes.length) {
        // 如果当前节点中还有子节点，递归编译
        this.compile(node)
      }
    })
  }
  // 判断是否是文本节点
  isTextNode (node) {
    return node.nodeType === 3
  }
  // 判断是否是属性节点
  isElementNode (node) {
    return node.nodeType === 1
  }
  // 判断是否是以 v- 开头的指令
  isDirective (attrName) {
    return attrName.startsWith('v-')
  }

  // 编译文本节点
  // 在 compiler.js(即Compiler类) 中为每一个指令/插值表达式创建 watcher 对象，监视数据的变化
  compileText (node) {
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      const key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
      // 编译差值表达式中创建一个 watcher，观察数据的变化
      new Watcher(this.vm, key, newValue => {
        node.textContent = newValue
      })
    }
  }


  // 编译属性节点
  compileElement (node) {
    // 遍历元素节点中的所有属性，找到指令
    Array.from(node.attributes).forEach(attr => {
      // 获取元素属性的名称
      let attrName = attr.name
      // 判断当前的属性名称是否是指令
      if (this.isDirective(attrName)) {
        // attrName 的形式 v-text v-model
        // 截取属性的名称，获取 text model
        attrName = attrName.substr(2)
        // 获取属性的名称，属性的名称就是我们数据对象的属性 v-text="name"，获取的是name
        const key = attr.value
        // 处理不同的指令
        this.update(node, key, attrName)
      }
    })
  }
  // 负责更新 DOM
  // 创建 Watcher
  update (node, key, dir) {
    // node 节点，key 数据的属性名称，dir 指令的后半部分
    const updaterFn = this[dir + 'Updater']
    // updaterFn && updaterFn(node, this.vm[key])
    // 因为在 textUpdater等中要使用 this
    updaterFn && updaterFn.call(this, node, this.vm[key], key)
  }


  // v-text 指令的更新方法
  textUpdater (node, value, key) {
    node.textContent = value
    // 每一个指令中创建一个 watcher，观察数据的变化
    new Watcher(this.vm, key, value => {
      node.textContent = value
    })
  }

  // 视图变化更新数据
  // v-model 指令的更新方法
  modelUpdater (node, value, key) {
    node.value = value
    // 每一个指令中创建一个 watcher，观察数据的变化
    new Watcher(this.vm, key, value => {
      node.value = value
    })
    // 监听视图的变化 ,实现双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

}
