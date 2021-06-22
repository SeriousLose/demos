// main.js
(function () {
  require.config({
    baseUrl: 'js/', // 基本路径 出发点在根目录下
    paths: {
      //映射: 模块标识名: 路径
      article: './modules/article', // 此处不能写成article.js,会报错
      user: './modules/user'
    }
  })
  require(['article'], function (alerter) {
    // article.consoleMsg()
    console.log(alerter.consoleMsg());
  })
})()
// (function() {
//   require.config({
//     baseUrl: 'js/',
//     paths: {
//       article: './modules/article',
//       user: './modules/user',
//       // 第三方库模块
//       jquery: './libs/jquery-1.10.1'// 注意：写成jQuery会报错
//     }
//   })
//   require(['article'], function(alerter) {
//     article.consoleMsg()
//   })
// })()
