const _ = require("underscore");

var globals = {};

function makeBindFun(resolver) {
    return function (k, v) {
        var stack = globals[k] || [];
        globals[k] = resolver(stack, v);
        console.log(globals)
        return globals
    }
}

var stackBinder = makeBindFun(function (stack, v) {
    stack.push(v);
    return stack;
})

var stackUnBinder = makeBindFun(function (stack) {
    stack.pop();
    return stack;
})

var dynamicLookup = function (k) {
    var slot = globals[k] || []
    return _.last(slot);
}

stackBinder('a', 1);
console.log(globals)
stackUnBinder('a');
console.log(globals)


{
    // 大写变量为闭包捕获变量
    function whatWasTheLocal() {
        var CAPTURED = "Oh, hai";
        return function () {
            return "The local was: " + CAPTURED;
        }
    }

    function createScaleFunction(FACTOR) {
        return function (v) {
            return _.map(v, function (n) {
                return (n * FACTOR);
            })
        }
    }

    var scale10 = createScaleFunction(10);
    scale10([1, 2, 3]);

    const _ = require("underscore");
    function createWeirdScalaFunction(FACTOR) {
        return function (v) {
            this['FACTOR'] = FACTOR;
            var captures = this;

            return _.map(v, _.bind(function (n) {
                // console.log(this === window);
                return (n * this['FACTOR']);
            }, captures))
        }
    }
    var scale20 = createWeirdScalaFunction(20);
    scale20([1,2,3]);

}
{
    var pingpong = function(){
        var PRIVATE = 0;
        return {
            inc: function(n){
                return PRIVATE += n;
            },
            dec: function (n) {
                return PRIVATE -= n
            }
        }
    }()

    console.log(pingpong)
}