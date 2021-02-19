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