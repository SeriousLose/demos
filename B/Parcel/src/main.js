// ./src/main.js
import { log } from './logger'
log('hello parcel去')
// HMR API
if (module.hot) {
  module.hot.accept(() => {
    console.log('HMR～')
  })
}