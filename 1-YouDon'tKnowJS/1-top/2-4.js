// 实例化（instantiation）、继承（inheritance）和（相对）多态（polymorphism）

// 面向对象编程强调的是数据和操作数据的行为本质上是互相关联的

// 近似类的语法元素
// instanceof new class[ES6]

// ’类‘和’实例‘的概念来源于房屋建造

// 多重继承
{
    // 显示混入
    function mixin(sourceObj,targetObj){
        for(var key in sourceObj){
            if(!(key in targetObj)){
                targetObj[key] = sourceObj[key];
            }
        }
        return targetObj
    }

    var Vehicle = {
        engines : 1,
        ignition:function(){
            console.log("Turning on my engine.");
        },
        drive:function(){
            this.ignition();
            console.log("Steering and moving forward");
        }

    } 
    var Car = mixin(Vehicle,{
        wheel:4,

        drive:function(){
            Vehicle.drive.call(this);
            console.log("Rolling on all"+ this.wheel + "wheel!")
        }
    })
}
{
    // 混合复制
    function mixin(sourceObj,targetObj){
        for(var key in sourceObj){
            targetObj[key] = sourceObj[key]
        }
        return targetObj
    }
    var Vehicle = {

    }
    var Car = mixin(Vehicle,{})

    mixin({
        wheel:4,
        drive:function () {
            
        }
    },Car)
}
{
    // 寄生继承
    function Vehicle(){
        this.engines = 1;
    }

    Vehicle.prototype.ignition = function(){
        console.log("Turning on my engine.")
    }
    Vehicle.prototype.drive = function(){
        this.ignition()
        console.log("Steering and moving forward");
    }

    function Car(){
        var car = new Vehicle();
        car.wheel = 5;
        var vehDrive = car.drive;
        car.drive = function(){
            vehDrive.call(this);
            console.log("Rolling on all"+ this.wheel + "wheel!")
        }
    }
}
{
    // 隐式混入
    var Something = {
        cool:function(){
            this.greeting = 'Hello World';
            this.count = this.count?this.count+1:1;
        }
    }

    var Another = {
        cool:function(){
            Something.cool.call(this);
            
        }
    }
}