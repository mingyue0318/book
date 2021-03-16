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
var obj = {foo: foo};
console.log(obj.foo() === globalObject); // true

// 尝试用 call 改变this的值
console.log(foo.call(obj) === globalObject); // true //this的值并未变成obj

// 尝试用 bind 改变this的值
foo = foo.bind(obj);
console.log(foo() === globalObject); // true