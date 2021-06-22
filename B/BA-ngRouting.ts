
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {

  _cacheRouters: { [key: string]: any } = {};

  /**
   * @description: 路由是否允许复用
   * @param {type} route
   * @return: boolean true-允许 false-禁止
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  /**
   * @description: 存储路由快照,路由离开时,触发;
   * 按path作为key存储路由快照&组件当前实例对象
   * path等同RouterModule.forRoot中的配置
   * @param {type}
   */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this._cacheRouters[route.routeConfig.path] = { snapshot: route,handle: handle,};
  }

  /**
   * @description: 是否允许还原路由快照
   * 在缓存中有的都认为允许还原路由
   * @param {type} route
   * @return:boolean true-允许 false-禁止
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this._cacheRouters[route.routeConfig.path];
  }

  /**
   * @description: 获取存储的路由
   * 从缓存中获取快照
   * @param {type} route
   * @return:若无则返回null
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig || !this._cacheRouters[route.routeConfig.path]) return null;
    return this._cacheRouters[route.routeConfig.path].handle;
  }

  /**
   * @description: 同一路由时,复用路由;进入路由触发
   * @param {type}
   * @return:boolean true-复用 false-不复用
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}

