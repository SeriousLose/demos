<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to='/' exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to='/editor'><i class="ion-compose"></i>&nbsp;New Post</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to='/settings'><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/profile/1">
                <img class="user-pic" ng-src="">
                hlf
              </nuxt-link>
            </li>
          </template>

          <template v-if="!user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to='/login'>Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to='/register'>Sign up</nuxt-link>
            </li>
          </template>

        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: '',
  components: {},
  // 定义属性
  data () {
    return {}
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapState(['user'])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='stylus' scoped></style>