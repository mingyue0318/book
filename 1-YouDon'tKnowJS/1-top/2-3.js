{
    var strPrimitive = 'i am string';
    typeof strPrimitive  // 'string'
    strPrimitive instanceof String // false

    var strObject = new String('i am string');
    typeof strObject // 'Object'
    strObject instanceof String // true
}
// 复制对象
{
    var newObj = JSON.parse( JSON.stringify( someObj ) ) //部分情况可用，保证对象是json安全的

    Object.assign() //浅复制
}
// 属性描述
{
    Object.getOwnPropertyDescriptor( myObject, "a" ); //获取属性
    // 添加修改属性
    Object.defineProperties('a',{
        value:'3',
        writeable:true,
        configurable:true, // 确定 defineProperties 是否可用
        enumerable:true
    })
    Object.preventExtensions(obj) // 禁止对象obj扩展
    Object.seal() // 密封对象-- 仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以修改属性的值）
    Object.freeze() // 调用Object.seal(..)并把所有“数据访问”属性标记为writable:false
}
{
    var myObject = {     // 给a定义一个getter
        get a() {
              return this._a_;      
        },
        set a(val) {
         
             this._a_ = val
     
     
         } 
     };
}
// in操作符会检查属性是否在对象及其[[Prototype]]原型链中
// hasOwnProperty
{
    var obj = {}
    Object.defineProperty(obj,'a',{
        enumerable:true,
        value:2
    })
    obj.propertyIsEnumerable('a') //属性名是否直接存在于对象中（而不是在原型链上）并且满足enumerable:true
    Object.keys(obj) // 包含所有可枚举属性
    Object.getOwnPropertyNames(obj) //返回一个数组，包含所有属性，无论它们是否可枚举
}
{
    // 循环
    forEach() //会遍历数组中的所有值并忽略回调函数的返回值
    every()   //会一直运行直到回调返回false
    some()    //会一直运行直到回调函数返回true
    // for..in  获取枚举属性
    // for..of  获取值
        // 1.请求一个迭代器 iterator
        // 2.next()

    var myArr = [1,12,3,6]

    var obj = myArr[Symbol.iterator]()
    obj.next()
    obj.next()
    obj.next()
    obj.next()

    var myObject = {a:2,b:3}
    Object.defineProperty(myObject,'Symbol.iterator',{
        writable:false,
        enumerable:false,
        configurable:true,
        value:function(){
                  var o = this;
                  var idx = 0;
                  var ks = Object.keys(o)
                  return {
                            next:function(){
                                return {
                                        value: o[ks[idx++]],
                                        done:idx > ks.length
                                        }
                            }
                          }
              }
    })


}
// JavaScript中万物都是对象？
