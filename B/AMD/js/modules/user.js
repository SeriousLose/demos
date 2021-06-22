// user.js文件
// 定义没有依赖的模块
define(function () {
  let author = 'Fly'
  function getAuthor () {
    return author.toUpperCase()
  }
  return { getAuthor } // 暴露模块
})