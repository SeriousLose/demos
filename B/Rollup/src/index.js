import { camelCase } from 'lodash-es'
import { name, version } from '../package.json'
import { log } from './logger'
import messages from './messages'
console.log(name, version)
log(messages.hi)
console.log(camelCase('hello rollup'))