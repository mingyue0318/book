const { type } = require("os");

Array.of();  // 创建数组

// 有一个函数需要传入的参数封装成数组

创建数组

var  arr = Array.of(3) 
arr.length  // 1
arr[0]     // 3



Array.from();// 类数组转化为数组

ES5
Array.prototype.slice.call(arr);
var arr2 = arr.slice()

ES6
Array.from(arr);
// 避免空槽位
Array.from({length:4})
// 映射
Array.from(arr,(item,index)=>{
    if(typeof item === 'string'){
        return item.toUppercase();
    }
    else{
        return idex;
    }
})

find()

~arr.indexOf() //不存在值为0
arr = [1,2,3];
a.some((x)=>x===3)  //true
a.find((x)=>x===3)   // 3

 
for( i of a.entries()){ // 迭代器

} 
// 值
arr.values();
// key
arr.keys();


Object.is()    ===  '==='
// 更严格


// 设置行为委托
Object.setPrototypeOf(obj1,obj2);

Object.assign()//浅复制

Object.assign(Object.create(o1),{

})

