import * as is from "./is";
import { vnode, VNode, VNodeData } from "./vnode";

// 文件的导入

// 定义一些类型并导出

export type VNodes = VNode[];
export type VNodeChildElement = VNode | string | number | undefined | null;
export type ArrayOrElement<T> = T | T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;

function addNS(
  data: any,
  children: VNodes | undefined,
  sel: string | undefined
): void {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const childData = children[i].data;
      if (childData !== undefined) {
        addNS(childData, children[i].children as VNodes, children[i].sel);
      }
    }
  }
}

// h函数的重载

// 定义了4种h函数的重载
export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData | null): VNode;
export function h(sel: string, children: VNodeChildren): VNode;
export function h(
  sel: string,
  data: VNodeData | null,
  children: VNodeChildren
): VNode;

// 对上边4种重载进行实现
export function h(sel: any, b?: any, c?: any): VNode {
  let data: VNodeData = {};
  let children: any;
  let text: any;
  let i: number;
  // 处理参数,实现重载的机制
  if (c !== undefined) {
    // 处理三个参数的情况
    // sel  data  children/text
    if (b !== null) {
      data = b;
    }
    if (is.array(c)) {
      children = c;
    }
    // 如果c是字符串 或 数字
    else if (is.primitive(c)) {
      text = c;
    }
    // 如果c是VNode
    else if (c && c.sel) {
      children = [c];
    }
  } else if (b !== undefined && b !== null) {
    // 处理两个参数的情况
    // 如果b是数组
    if (is.array(b)) {
      children = b;
    }
    // 如果b是字符串或数字
    else if (is.primitive(b)) {
      text = b;
    }
    // 如果b是VNode
    else if (b && b.sel) {
      children = [b];
    } else {
      data = b;
    }
  }
  if (children !== undefined) {
    // 处理children 中的原始值 string/number
    for (i = 0; i < children.length; ++i) {
      // 如果child 是 string/number,创建文本节点
      if (is.primitive(children[i]))
        children[i] = vnode(
          undefined,
          undefined,
          undefined,
          children[i],
          undefined
        );
    }
  }
  if (
    sel[0] === "s" &&
    sel[1] === "v" &&
    sel[2] === "g" &&
    (sel.length === 3 || sel[3] === "." || sel[3] === "#")
  ) {
    // 如果是 svg,添加命名空间
    addNS(data, children, sel);
  }
  return vnode(sel, data, children, text, undefined);
}
