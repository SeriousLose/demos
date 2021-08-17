const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个示例
// 为了防止数据冲突,必须 把 state 定义个函数,返回数据对象
export const state = () => {
  return {
    user: null
  }
}
export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}
export const actions = {
  // nuxtServerInit 是一个特殊的action方法
  // 这个action 会在服务端渲染期间自动调用
  // 作用: 初始化容器数据,传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    // 如果请求头中有cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把cookie字符串转为js对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    // 提交mutation 修改 state状态
    commit('setUser', user)
  }
}