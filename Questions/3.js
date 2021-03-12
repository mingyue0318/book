const shape = {
    radius: 10,
    diameter() {
      return this.radius * 2
    },
    perimeter: () => 2 * Math.PI * this.radius
  }
  
  shape.diameter()
  shape.perimeter()

//   1，shape定义所在环境，是window对象。
// 2，diameter方法中的this指向方法调用者，即shape。perimeter方法中的this指向方法调用者**所在的环境**，即window对象。