// 导出一个对象
module.exports = {
  name: "SeriousLose",
  age: 24,
  sex: "male"
}

// 导出任意值
module.exports.name = "SeriousLose"
module.exports.sex = null
module.exports.age = undefined

exports.name = "SeriousLose"
exports.sex = "male"


exports.name = "SeriousLose"
exports.sex = "male"
exports = {
    name: "蛙人"
}


exports.name = "SeriousLose"
module.exports.age = 24


let lists = ["./index.js", "./config.js"]
lists.forEach((url) => require(url)) // 动态导入

if (lists.length) {
    require(lists[0]) // 动态导入
}