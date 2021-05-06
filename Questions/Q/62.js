var setting = {
    username: "lydiahallie",
    level: 19,
    health: 90
};
var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
// const data = JSON.stringify(settings, ["level", "health"]);
// console.log(data);

const data = JSON.stringify(foo, function(key,value){
    console.log(111,key,value)
    if(typeof value !== 'number'){
        console.log(333)
        return undefined
    }
    return value -12
});
console.log(data);
// 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
// 如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
// 如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。


// var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
var jsonString = JSON.stringify(foo, function (key, value) {
        console.log(222,key,value)
      if (typeof value === "string"){
        return undefined;
      }
      return value * 2;
    });
    console.log(jsonString)