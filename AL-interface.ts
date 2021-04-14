  // const getUserInfo = (user: { name: string, age: number }): string => {
  //   return `name: ${user.name} age: ${user.age}`;
  // };
  // getUserInfo({ name: 'long', age: 18 });
  // 错误的调用
  // getUserInfo(); // 错误信息：An argument for 'user' was not provided.
  // getUserInfo({ name: 'long' }); // 错误信息：Property 'age' is missing in type '{ name: string; }'
  // getUserInfo({ name: 'long', height: 1.88 }); // 错误信息：类型不匹配


  // 重构1
  // 先定义一个接口
  // interface IUser {
  //   name: string;
  //   age: number;
  // }

  // const getUserInfo = (user: IUser): string => {
  //   return`name: ${user.name}, age: ${user.age}`;
  // };

  // // 正确的调用
  // getUserInfo({name: "long", age: 18});

  // 重构2
  type IUserInfoFunc = (user: IUser) =>string;
  interface IUser {
    name: string;
    age: number;
  }

  const getUserInfo: IUserInfoFunc = (user) => {
    return`name: ${user.name}, age: ${user.age}`;
  };

  getUserInfo({name: "koala", age: 18});
  // getUserInfo();

  // -- 查询列表时候使用的接口
  interface IQuery {
    page: number;
    rows: number;
    disabledPage?: boolean; // 是否禁用分页，true将会忽略`page`和`rows`参数
  }
  // - 商品
  export interface IGoodsQuery extends IQuery {
    isOnline?: string | number; // 是否出售中的商品
    goodsNo?: string; // 商品编号
    goodsName?: string; // 商品名称
  }


  interface Func {
    // ✔️ 定于这个函数接收两个必选参数都是 number 类型，以及一个可选的字符串参数 desc，这个函数不返回任何值
    (x: number, y: number, desc?: string): void
  }

  const sum: Func = function (x, y, desc = '') {
    // const sum: Func = function (x: number, y: number, desc: string): void {
    // ts类型系统默认推论可以不必书写上述类型定义
    console.log(desc, x + y)
  }

  sum(32, 22)