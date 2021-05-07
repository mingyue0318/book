const box = { x: 10, y: 20 };

Object.freeze(box);

const shape = box;
shape.x = 100;
console.log(shape)

// 被冻结对象自身的所有属性都不可能以任何方式被修改