import { AttachData } from "./helpers/attachto";
import { Hooks } from "./hooks";
import { Attrs } from "./modules/attributes";
import { Classes } from "./modules/class";
import { Dataset } from "./modules/dataset";
import { On } from "./modules/eventlisteners";
import { Props } from "./modules/props";
import { VNodeStyle } from "./modules/style";

// 导入的依赖模块

// 定义一些type / interface
export type Key = string | number | symbol;

export interface VNode {
  sel: string | undefined; // 选择器
  data: VNodeData | undefined; // 节点数据:属性/样式/事件等
  children: Array<VNode | string> | undefined; // zi 节点,和text 互斥
  elm: Node | undefined; // 记录 vnode 对应的真实DOM
  text: string | undefined; // 节点中的内容,和children 互斥
  key: Key | undefined; // 优化使用
}

export interface VNodeData {
  props?: Props;
  attrs?: Attrs;
  class?: Classes;
  style?: VNodeStyle;
  dataset?: Dataset;
  on?: On;
  attachData?: AttachData;
  hook?: Hooks;
  key?: Key;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: any[]; // for thunks
  is?: string; // for custom elements v1
  [key: string]: any; // for any other 3rd party module
}

export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined
): VNode {
  const key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
}
