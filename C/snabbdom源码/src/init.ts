import { DOMAPI, htmlDomApi } from "./htmldomapi";
import * as is from "./is";
import { Module } from "./modules/module";
import { vnode, VNode } from "./vnode";
// 导入依赖的模块


// 定义类型
type NonUndefined<T> = T extends undefined ? never : T;

function isUndef(s: any): boolean {
  return s === undefined;
}
function isDef<A>(s: A): s is NonUndefined<A> {
  return s !== undefined;
}

type VNodeQueue = VNode[];

const emptyNode = vnode("", {}, [], undefined, undefined);

function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
  const isSameKey = vnode1.key === vnode2.key;
  const isSameIs = vnode1.data?.is === vnode2.data?.is;
  const isSameSel = vnode1.sel === vnode2.sel;

  return isSameSel && isSameKey && isSameIs;
}

function isVnode(vnode: any): vnode is VNode {
  return vnode.sel !== undefined;
}

type KeyToIndexMap = { [key: string]: number };

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>;
};

type ModuleHooks = ArraysOf<Required<Module>>;

function createKeyToOldIdx(
  children: VNode[],
  beginIdx: number,
  endIdx: number
): KeyToIndexMap {
  const map: KeyToIndexMap = {};
  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = children[i]?.key;
    if (key !== undefined) {
      map[key as string] = i;
    }
  }
  return map;
}

// 定义了钩子函数
const hooks: Array<keyof Module> = [
  "create",
  "update",
  "remove",
  "destroy",
  "pre",
  "post",
];

export function init(modules: Array<Partial<Module>>, domApi?: DOMAPI) {
  let i: number;
  let j: number;
  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: [],
  };
  // 初始化转化虚拟节点的api
  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi;

  // 把传入的所有模块的钩子函数,统一存储到cbs对象中;
  // 最终构建的cbs 对象的形式cbs = {creat:[fn1,fn2],update:[],...}
  for (i = 0; i < hooks.length; ++i) {
    // cbs.create = [],cbs.update=[].....
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      // modules传入的模块数组
      // 获取模块中的hook函数
      // hook = modules[0][create].....
      const hook = modules[j][hooks[i]];
      if (hook !== undefined) {
        // 把获取到的hook函数放入到cbs 对应的钩子函数数组中
        (cbs[hooks[i]] as any[]).push(hook);
      }
    }
  }

  function emptyNodeAt(elm: Element) {
    const id = elm.id ? "#" + elm.id : "";

    // elm.className doesn't return a string when elm is an SVG element inside a shadowRoot.
    // https://stackoverflow.com/questions/29454340/detecting-classname-of-svganimatedstring
    const classes = elm.getAttribute("class");

    const c = classes ? "." + classes.split(" ").join(".") : "";
    return vnode(
      api.tagName(elm).toLowerCase() + id + c,
      {},
      [],
      undefined,
      elm
    );
  }

  function createRmCb(childElm: Node, listeners: number) {
    return function rmCb() {
      if (--listeners === 0) {
        const parent = api.parentNode(childElm) as Node;
        api.removeChild(parent, childElm);
      }
    };
  }

  function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let i: any;
    let data = vnode.data;
    if (data !== undefined) {
      // 执行用户设置的init钩子函数
      const init = data.hook?.init; // 用户传递的init函数
      if (isDef(init)) {
        init(vnode); // 调用init后,可能改变vnode的内容
        data = vnode.data; // 所以再次进行赋值;
      }
    }
    // 把vnode转换成真实DOM对象(没有渲染到页面)
    const children = vnode.children;
    const sel = vnode.sel;
    if (sel === "!") {
      //  注释节点
      if (isUndef(vnode.text)) {
        vnode.text = "";
      }
      vnode.elm = api.createComment(vnode.text!);
    } else if (sel !== undefined) {
      // 如果选择器不为空
      // 解析选择器
      // Parse selector
      const hashIdx = sel.indexOf("#"); // #位置
      const dotIdx = sel.indexOf(".", hashIdx); // .的位置
      const hash = hashIdx > 0 ? hashIdx : sel.length;
      const dot = dotIdx > 0 ? dotIdx : sel.length;
      const tag =
        hashIdx !== -1 || dotIdx !== -1
          ? sel.slice(0, Math.min(hash, dot))
          : sel; // 标签名
      const elm = (vnode.elm =
        isDef(data) && isDef((i = data.ns))
          ? api.createElementNS(i, tag, data)
          : api.createElement(tag, data));
      if (hash < dot) elm.setAttribute("id", sel.slice(hash + 1, dot));
      if (dotIdx > 0)
        elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
      // 执行模块的create钩子函数
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      // 如果vnode中有子节点,创建子vnode对应的DOM元素并追加到DOM树上;
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          const ch = children[i];
          if (ch != null) {
            // 如果子节点不为空,递归调用子节点,追加在对应父节点上
            api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue));
          }
        }
      } else if (is.primitive(vnode.text)) {
        // 如果vnode的text值是 string/number,创建文本节点并追加到 DOM树上
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      const hook = vnode.data!.hook;
      if (isDef(hook)) {
        // 执行用户传入的钩子 create
        hook.create?.(emptyNode, vnode);
        if (hook.insert) {
          // 把vnode 添加到队列中,为后续执行insert钩子做准备
          insertedVnodeQueue.push(vnode);
        }
      }
    } else {
      // 选择器为空,创建文本节点
      vnode.elm = api.createTextNode(vnode.text!);
    }
    // 返回新创建的DOM
    return vnode.elm;
  }

  function addVnodes(
    parentElm: Node,
    before: Node | null,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number,
    insertedVnodeQueue: VNodeQueue
  ) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
      }
    }
  }

  function invokeDestroyHook(vnode: VNode) {
    const data = vnode.data;
    if (data !== undefined) {
      data?.hook?.destroy?.(vnode);
      for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      if (vnode.children !== undefined) {
        for (let j = 0; j < vnode.children.length; ++j) {
          const child = vnode.children[j];
          if (child != null && typeof child !== "string") {
            invokeDestroyHook(child);
          }
        }
      }
    }
  }

  function removeVnodes(
    parentElm: Node,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number
  ): void {
    for (; startIdx <= endIdx; ++startIdx) {
      let listeners: number;
      let rm: () => void;
      const ch = vnodes[startIdx];
      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm!, listeners);
          for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
          const removeHook = ch?.data?.hook?.remove;
          if (isDef(removeHook)) {
            removeHook(ch, rm);
          } else {
            rm();
          }
        } else {
          // Text node
          api.removeChild(parentElm, ch.elm!);
        }
      }
    }
  }

  function updateChildren(
    parentElm: Node,
    oldCh: VNode[],
    newCh: VNode[],
    insertedVnodeQueue: VNodeQueue
  ) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx: KeyToIndexMap | undefined;
    let idxInOld: number;
    let elmToMove: VNode;
    let before: any;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(
          parentElm,
          oldStartVnode.elm!,
          api.nextSibling(oldEndVnode.elm!)
        );
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = oldKeyToIdx[newStartVnode.key as string];
        if (isUndef(idxInOld)) {
          // New element
          api.insertBefore(
            parentElm,
            createElm(newStartVnode, insertedVnodeQueue),
            oldStartVnode.elm!
          );
        } else {
          elmToMove = oldCh[idxInOld];
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(
              parentElm,
              createElm(newStartVnode, insertedVnodeQueue),
              oldStartVnode.elm!
            );
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined as any;
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(
          parentElm,
          before,
          newCh,
          newStartIdx,
          newEndIdx,
          insertedVnodeQueue
        );
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  function patchVnode(
    oldVnode: VNode,
    vnode: VNode,
    insertedVnodeQueue: VNodeQueue
  ) {
    const hook = vnode.data?.hook;
    hook?.prepatch?.(oldVnode, vnode);
    const elm = (vnode.elm = oldVnode.elm)!;
    const oldCh = oldVnode.children as VNode[];
    const ch = vnode.children as VNode[];
    if (oldVnode === vnode) return;
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; ++i)
        cbs.update[i](oldVnode, vnode);
      vnode.data.hook?.update?.(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      api.setTextContent(elm, vnode.text!);
    }
    hook?.postpatch?.(oldVnode, vnode);
  }

  // init内部返回patch函数,把vnode渲染成真实的dom,并返回vnode
  // return 一个函数 ,这个函数是一个高阶函数
  return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node;
    // 保存新插入节点的队列,为了触发钩子函数
    const insertedVnodeQueue: VNodeQueue = [];
    // 执行模块的pre钩子函数
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    // 如果oldVnode 不是VNode,创建VNode并设置elm
    if (!isVnode(oldVnode)) {
      // 把DOM元素转化成空的VNode
      oldVnode = emptyNodeAt(oldVnode);
    }
    // 如果新旧节点是相同节点(key 和 sel相同)
    if (sameVnode(oldVnode, vnode)) {
      // 找节点的差异并更新DOM
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      // 如果新旧节点不同,vnode创建对应的DOM
      // 获取当前的DOM元素
      elm = oldVnode.elm!; // !表示必定存在
      parent = api.parentNode(elm) as Node; // 找到父级元素
      // 创建 vnode对应的DOM元素,并触发init/create钩子函数;
      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        // 如果父节点不为空,把vnode对应的DOM插入到文档中
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
        // 移出老节点
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }
    // 执行用户设置的insert钩子函数
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
    }
    // 执行模块的post钩子函数
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    // 返回vnode
    return vnode;
  };
}
