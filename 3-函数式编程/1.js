const _ = require("underscore");
const tool = require('./tools')

// console.log(tool.existy(null));
// console.log('111',_);


_.each(['whiskey','tango','foxtrot'],function(word){
    console.log(word.charAt(0).toUpperCase()+word.substr(1));
})
{
    // 命令式编程

    var lyrics = [];
    for(var bottles = 9;bottles>0;bottles--){
        lyrics.push(bottles+ " bottles of beer on the wall");
        lyrics.push(bottles+ " bottles of beer ");
        lyrics.push( "Take on down ,pass it around");
        if(bottles>1){
            lyrics.push(bottles-1,"bottles of beer on the wall");
        }
        else{
            lyrics.push("No more bottles of beer on the wall");
        }
    }
    console.log(lyrics)

    // 函数式
    const _ = require("underscore");
    function lyricSegment(n){
        return _.chain([])
        .push(n+ " bottles of beer on the wall")
        .push(n+ " bottles of beer ")
        .push( "Take on down ,pass it around")
        .tap(function(lyrics){
            if(n>1){
                lyrics.push(n-1,"bottles of beer on the wall");
            }else{
                lyrics.push("No more bottles of beer on the wall");
            }
        }).value()
    }
    // lyricSegment(9);
    // console.log( lyricSegment(9))

    function song(start,end,lyricGen){
        return _.reduce(_.range(start,end,-1),function(acc,n){
            return acc.concat(lyricGen(n));
        },[]);
    }
    // song(10,0,lyricSegment);
    console.log( song(10,0,lyricSegment))
}

{
    // 基于原型的面向对象编程
    var a = {name:"a",fun:function(){return this}};
    a.fun() // a本身

    var bFun = function(){return this};
    var b = {name:"b",fun:bFun}

    b.fun() // 全局变量
}
{
    // 元编程
    function Point2D(x,y){
        this._x = x;
        this._y = y;
    }

    console.log(new Point2D(1,2));

    function Point3D(x,y,z){
        Point2D.call(this,x,y);
        this._z = z;
    }
    console.log(new Point3D(1,2,3));
}
{
    const _ = require("underscore");
    var nums = [1,2,3,4,5];
    function doubleAll(arr){
        return _.map(arr,n=>n*2);
    }
    console.log(doubleAll(nums));

    function average(array){
        var sum = _.reduce(array,function(a,b){return a+b});
        return sum/_.size(array);
    }
    average(nums);


    function onlyEven(array){
        return _.filter(array,function(n){
            return (n%2) === 0;
        })
    }
    
}