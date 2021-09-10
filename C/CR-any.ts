let user: any = {
  sister: {
    name: 'sisterAn'
  }
};
let sister = user.sister // any
let url = sister.url // any

const notSure: any = 'sisterAn'
notSure.hello() // no error