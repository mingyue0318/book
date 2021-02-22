{
    // 对象关联
    Task = {
        setID: function(ID){
            this.id = ID    
        },
        outputID:function(){
            console.log(this.id)
        }

    }

    XYZ = Object.create(Task);

    XYZ.prepareTask = function (ID,Label) {
        this.setID(ID);
        this.label = Label
    }

    XYZ.outputTaskDetails = function(){
        this.outputID()
        console.log(this.label)
    }
    // ABC = Object.create(Task)
}
{   
    // 面向对象 (原型)
    function Foo(who){
        this.me = who;
    }
    Foo.prototype.identify = function(){
        return "I'm"+this.me
    }
    function Bar(who){
        Foo.call(this,who);
    }

    Bar.prototype = Object.create(Foo.prototype);

    Bar.prototype.speak = function(){
        alert("Hello,"+this.identify()+".")
    }

    var b1 = new Bar('b1');
    var b2 = new Bar('b2');

    b1.speak()
    b2.speak()

}
{
    // 对象关联
    Foo = {
        init:function(who){
            this.me = who
        },
        identify:function(){
            return "I'm"+this.me
        }
    }

    Bar = Object.create(Foo);

    Bar.speak = function (param) { 
        alert("Hello,"+this.identify()+".")
    }


    var b1 = Object.create(Bar);
    var b2 = Object.create(Bar);
    b1.init('b1');
    b2.init('b2');
    b1.speak()
    b2.speak()
}
{
    // 丑陋的显式伪多态
    function Widget(width,height){
        this.width = width||50;
        this.height = height||50;
        this.$elem = null;
    }

    Widget.prototype.render = function(){
        if(this.$elem){
            this.$elem.css({
                width:this.width + 'px',
                height:this.height + 'px'
            }).appendTo($where)
        }
    }

    function Button(width,height,label){
        Widget.call(this,width,height)
        this.label = label || "Default";

        this.$elem = $("<button>").text(this.label)
    }

    Button.prototype = Object.create(Widget.prototype);

    Button.prototype.render = function($where){
        Widget.prototype.render.call(this,$where)
        this.$elem.click(this.onClick.bind(this));
    }
    Button.prototype.onClick = function(evt){
        console.log("Button'" + this.label+"'clicked!");
    }


    $(document).ready(function(){
        var $body = $(document.body);
        var btn1 = new Button(125,30,'Hello')
        var btn1 = new Button(150,40,'World')

        btn1.render($body);
        btn2.render($body);

    })
}
{
    // ES6 class 语法糖
    class Widget {
        constructor(width,height){
            
        }
    }
}