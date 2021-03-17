// 1.函数直接调用

// 非严格模式执行时，this的值会指向全局对象；
// 而在严格模式中，this的值将会默认为undefined

/* 非严格模式 */
function f1() {
    return this;
}
console.log(f1() === window); //true

// in node;
console.log(f1() === global); //true

/* 严格模式 */
function f2() {
    'use strict'
    return this;
}
console.log(f1() === undefined); //true



// 2.1 call / apply
function add(c, d) {
    return this.a + this.b + c + d;
}

var o = {
    a: 1,
    b: 3
};

// call的第一个参数 是对象，也就是this的指向对象。后面的参数就是函数arguments对象的成员
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// call的第一个参数 是对象，也就是this的指向对象。后面的参数是数组，数组里的成员也就是函数arguments对象成员
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34

// 使用call和apply时需要注意的是，当传入的第一个参数的值不是对象时，JavaScript会尝试使用ToObject 操作将其转化为对象
function bar() {
    console.log(Object.prototype.toString.call(this));
}

bar.call(7); // [object Number]

// 2.2 bind

// 调用f.bind(someObject)会创建一个与f具有相同函数体和作用域的函数，但是在这个新函数中，this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的。
function f() {
    return this.a;
}

var g = f.bind({
    a: 'azerty'
}); //生成一个绑定函数g
console.log(g()); // azerty

var o = {
    a: 10,
    f: f,
    g: g
};
console.log(o.f(), o.g()); //10, azerty

//需要注意的是，绑定函数不可以再bind
var h = g.bind({
    a: 'foo'
});
console.log(h()); //azerty，不会变成foo


// 3 对象方法调用
// 当以对象里的方法的方式调用函数时，它们的 this 是调用该函数的对象
var prop = 36;
var o = {
    prop: 37,
    bar: function () {
        return this.prop;
    }
};
console.log(o.bar()); //37

// 4 构造函数调用
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.introduce = function () {
        console.log('My name is ' + this.name + ', I\'m ' + this.age);
    };
}
var Joseph = new Person('Joseph', 19);
Joseph.introduce(); // "My name is Joseph, I'm 19"

// 当构造器返回的默认值是一个this引用的对象时，可以手动设置返回其他的对象，如果返回值不是一个对象，返回this。
// （这句话看起来比较难理解，我们看下一个例子）。
function Fn2() {
    this.a = 9; // dead code
    return {
        a: 10
    };
}
var o = new Fn2();
console.log(o.a); // 10


// 5 箭头函数
// this的值是封闭执行环境决定的。在全局环境中，那么被赋值为全局对象。

// 与其他情况不同的是，不管函数如何调用，上面this的值一直都是全局对象。call / bind 也不能改变它的值。
// 作为对象方法被调用
var obj = {
    foo: foo
};
console.log(obj.foo() === globalObject); // true

// 尝试用 call 改变this的值
console.log(foo.call(obj) === globalObject); // true //this的值并未变成obj

// 尝试用 bind 改变this的值
foo = foo.bind(obj);
console.log(foo() === globalObject); // true


// 1.原型 && 构造器 constructor

function User(name, age) { // 构造器 constructor or 构造函数
    this.name = name;
    this.age = age
}

var zhangsan = new User('张三', 12)
var lisi = new User('李四', 15)

// 2.原型-proto & prototype

// 创建对象 在对象中添加一个功能属性，可以引用自己的属性 "greet"

function User(name, age) { // 构造器 constructor or 构造函数
    this.name = name;
    this.age = age;
    this.greet = function () {
        console.log('你好，我是' + this.name + ',今年' + this.age);
    }
}

var zhangsan = new User('张三', 12)
var lisi = new User('李四', 15)

zhangsan.greet() === lisi.greet() // false

console.log(zhangsan.greet() === lisi.greet())
zhangsan.greet()
lisi.greet()


// prototype 就是给他即将生成的对象，继承下去的属性


function User(name, age) {
    this.name = name; // 这里面的this，就代表了即将生成的那个对象 ，并且绑定传参
    this.age = age;
}
User.prototype.greet = function () {
    console.log('你好, 我是' + this.name + '，我' + this.age + '岁');
}
var lisi = new User('李四', 22);
console.log(lisi);
/*
User {}
name:'李四'
age = 22
__proto__
greet:f()
constructor : f User (name, age)
__proto__:Object
...
*/

// 1.__proto__
function Test() {}
Test.prototype.name = 'test'
var test01 = new Test()
var test02 = new Test()
test01.__proto__ === test02.__proto__ // true
// ----------------------- 实例之后的对象调用__proto__指针指向的 等于被实例的构造函数的prototype！
// test01.__proto__ = Test.prototype  // true

// 每个对象都有一个 proto 的属性，指向该对象的原型。
// 实例后通过对 proto 属性的访问 去对 prototype对象进行访问；
// 原型链是由原型对象组成的，每个对象都有__proto__属性，指向创建该对象的构造函数的原型 ，然后通过__proto__属性将对象链接起来，组成一个原型链，用来实现继承和共享属性！

// 2.prototype

// 3.constructor
// 通过 proto 去找到这个实例对象的构造函数 constructor ，我再通过这个构造函数再去实例对象

// #原型-原生对象的原型

// 原生对象

var a = {}
console.log(a)
/*
  {}
  __proto__
  greet:f()
  constructor : f Object()
  ...
  */


var a = {}
var b = new Object()
console.log(a.constructor === b.constructor) // true


var a = new Object.create(null) // 创建函数必须传参，一个对象或者是 null ，否则会报错！
console.log(a)
/*
  no prototies 
  */


var a = new Object.create({
    name: juejin,
    des: "666"
}) // 创建函数必须传参，一个对象或者是 null ，否则会报错！
console.log(a)
/*
  {}
  __proto__
  name:juejin
  des:"666"
    __proto__
    constructor : f Object()
    ...
  */

    // 多级继承链

// Animal --> Mammal --> Person -> me

function Animal(color,weight){
    this.color = color;
    this.weight = weight;
}
Animal.prototype.eat = function(){
    console.log('吃饭');
}
Animal.prototype.sleep = function(){
    console.log('睡觉');
}

function Mammal(color,weight){
    Animal.call(this,color,weight);
}

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;

Mammal.prototype.suckle = function(){
    console.log('喝牛奶');
}

function Person(color,weight){
    Mammal.call(this,color,weight);
}

Person.prototype = Object.create(Mammal.prototype);
Person.prototype.constructor = Person;
Person.prototype.lie = function () {
  console.log('你是个骗子');
}


var zhangsan = new Person('brown', 100);
var lisi = new Person('brown', 80);
console.log('zhangsan:', zhangsan);
console.log('lisi:', lisi);  


// this 并不取决于它所在的位置，而是取决于它所在的function是怎么被调用的！！！

