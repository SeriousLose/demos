// 负责数据劫持
// 把 $data 中的成员转换成 getter/setter
class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk (data) {
    // 1. 判断数据是否是对象，如果不是对象返回
    if (!data || typeof data !== 'object') {
      return
    }
    // 2. 如果是对象，遍历对象的所有属性，设置为 getter/setter
    // 遍历 data 的所有成员
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  // 定义响应式成员
  // 为啥要传值 val 这个参数?
  // 如果返回 data[key] 会出现递归调用,导致内存泄露
  defineReactive (data, key, val) {
    const that = this; // this 为observer实例;
    // 如果 val 是对象，继续设置它下面的成员为响应式数据
    // 解决  data 中对象, 设置为响应式数据
    this.walk(val)
    Object.defineProperty(data, key, {
      configurable: true, // 可枚举
      enumerable: true, // 可配置

      // data 就是上边的data,get方法在外层有引用,形成闭包
      get () {
        // return data[key]  // 如果返回这个,会递归调用
        return val // 打断点可查看
      },
      set (newValue) {
        if (newValue === val) {
          return
        }
        // 如果 newValue 是对象，设置 newValue 的成员为响应式
        // 如果新赋值的是对象,也设置为响应式
        that.walk(newValue)
        // this.walk(newValue)
        // 该this指向 data对象,并无walk方法

        val = newValue
      }
    })
  }
}