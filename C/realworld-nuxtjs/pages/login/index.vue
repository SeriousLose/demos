<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in': 'Sign up'}}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to='/login'>Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">{{field}} {{message}}</li>
            </template>
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input required v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input required minlength="8" v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in': 'Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import { login, register } from '../api/user'
// 仅在客户端加载
const Cookie = process.client ? require('js-cookie') : undefined


export default {
  name: 'LoginPage',
  components: {},
  // 定义属性
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {
        // email: ['a', 'b'],
        // password: ['1', '2']

      }
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    isLogin () {
      return this.$route.name === 'login';
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onSubmit () {
      try {
        const { data } = this.isLogin ?
          await login({
            user: this.user
          }) :
          await register({
            user: this.user
          })

        this.$store.commit('setUser', data.user) // mutating to store for client rendering
        Cookie.set('user', data.user) // sa
      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
      }


      // TODO:保存用户的登录状态

      // 跳转到首页
      this.$router.push('/');
    }

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