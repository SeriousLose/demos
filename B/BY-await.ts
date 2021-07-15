function test() {
  console.log(1);
  return new Promise.resolve(1);
}

function test1(a: any) {
  console.log(a, 2);
  return new Promise.resolve(2);
}

async function aa() {
  let a = await test();

  let b = await test1(a);

  a.then(async function (results) {
    let b = await test1(results);
  })

}
