// 1零合并操作符 ??

// 当左侧的操作数为 null 或者 undefined 时，返回右侧操作数，否则返回左侧操作数。

undefined || 'default' // 'default'
null || 'default' // 'default'
false || 'default' // 'default'
0 || 'default' // 'default'

undefined ?? 'default' // 'default'
null ?? 'default' // 'default'
false ?? 'default' // 'false'
0 ?? 'default' // 0


// 可以运用赋值运算符的简写 ??=

let a = {
    b: null,
    c: 10
}
a.b ??= 20
a.c ??= 20
console.log(a) // 输出 { b: 20, c: 10 }


// 2可选链操作符 ?.


const obj = {
    a: 'foo',
    b: {
        c: 'bar'
    }
}

console.log(obj.b ?.c) // 输出 bar
console.log(obj.d ?.c) // 输出 undefined
console.log(obj.func ?.()) // 不报错，输出 undefined


// 3 私有方法/属性


class Person {
    getDesc(){ 
      return this.#name +' '+ this.#getAge()
    }
    
    #getAge(){ return this.#age } // 私有方法
  
    get #name(){ return 'foo' } // 私有访问器
    #age = 23                   // 私有属性
  }
  const a = new Person()
  console.log(a.age)       // undefined 直接访问不到
  console.log(a.getDesc()) // foo 23