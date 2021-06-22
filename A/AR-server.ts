import { Injectable } from '@angular/core';
// 需要在angular的根模块NgModule的providers中声明这个服务。 比如默认app.module.ts中的AppModule类。
// 2.在另外对象中注入别的功能组件
import { HeroService } from '../hero.service';

// 把HeroService声明为可注入的服务，就可以在别的组件中通过依赖注入的方式来使用

@Injectable()
export class HeroService {
  constructor() {}

  getHeroes(): Hero[] {
    return HEROES;
  }
}


// 在该类的构造函数中导入HeroService
constructor(private heroService: HeroService) { }

// 使用注入组件的函数
getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}