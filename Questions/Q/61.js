const person = { name: "Lydia" };

Object.defineProperty(person, "age", { value: 21 });
// configurable ，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
// enumerable 该属性才会出现在对象的枚举属性中。
// writable 属性的值，也就是上面的 value，才能被赋值运算符改变。

console.log(person);
console.log(Object.keys(person));