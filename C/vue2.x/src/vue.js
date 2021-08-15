class Vue {
  constructor(options) {
    // 1. 通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    const el = options.el;
    this.$el = typeof options.el === 'string' ? document.querySelector(el) : el
    // 2. 把data的成员转化为getter和setter,并 data 注入到 Vue 实例
    this._proxyData(this.$data)

    // 3. 负责调用 Observer 实现数据劫持,监听数据的变化
    // new Observer(this.$data)
    // 4. 负责调用 Compiler 解析指令/插值表达式等
    // new Compiler(this)
  }
  _proxyData (data) {
    // 遍历 data 的所有属性
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          return data[key]
        },
        set (newValue) {
          if (data[key] === newValue) {
            return
          }
          data[key] = newValue
        }
      })
    })
  }
}