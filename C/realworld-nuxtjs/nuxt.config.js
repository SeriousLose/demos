module.exports = {
  router: {
    // 自定义
    extendRoutes (routes, resolve) {
      routes.splice(0);
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home'),
            },
            {
              path: 'login',
              name: 'login',
              component: resolve(__dirname, 'pages/login'),
            },
            {
              path: 'register',
              name: 'register',
              component: resolve(__dirname, 'pages/login'),
            }
          ]
        }
      ])
    }
  }
}