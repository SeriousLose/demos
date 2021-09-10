let user: any = {
  sister: {
    name: 'sisterAn'
  }
};
let sister = user.sister // any
let url = sister.url // any

// 使用不存在的属性或方法而不报错
const notSure: any = 'sisterAn'
notSure.hello() // no error