{
    var Fib = {
        [Symbol.iterator]() {
            var n1 = 1,
                n2 = 1;
            return {
                [Symbol.iterator]() {
                    return this
                },
                next() {
                    var current = n2;
                    n2 = n1;
                    n1 = n1 + current;
                    return {
                        value: current,
                        done: false
                    };
                },
                return (v) {
                    console.log("Fibonacci sequence abandoned");
                    return {
                        value: v,
                        done: true
                    };
                }

            }
        }
    }

    for (var v of Fib) {
        console.log(v);
        if (v > 1) break;
    }
} {
    var tasks = {
        [Symbol.iterator]() {
            var steps = this.actions.slice();
            return {
                [Symbol.iterator]() {
                    return this;
                },
                next(...args) {
                    if (steps.length > 0) {
                        let res = steps.shift()(...args);
                        return {
                            value: res,
                            done: false
                        };
                    } else {
                        return {
                            done: true
                        };
                    }
                },
                return (v) {
                    steps.length = 0;
                    return {
                        value: v,
                        done: true
                    }
                }
            }
        },
        actions: []
    }
    tasks.actions.push(function step1(x) {
        console.log('step1:', x);
        return x * 2
    })
    tasks.actions.push(function step2(x, y) {
        console.log('step2:', x, y)
        return x + y * 2
    })
    tasks.actions.push(function step1(x, y, z) {
        console.log('step3:', x, y, z);
        return x * y + z
    })

    var it = tasks[Symbol.iterator]();
    it.next(1)

} {
    if (!Number.prototype[Symbol.iterator]) {
        Object.defineProperty(Number.prototype, Symbol.iterator, {
            writable: true,
            configurable: true,
            enumerable: false,
            value: function iterator() {
                var i, inc, done = false,
                    top = +this;

                // 正向还是反向
                inc = 1*(top<0?-1:1);
                return {
                    [Symbol.iterator](){
                        return this;
                    },
                    next(){
                        if(!done){
                            // 初始迭代总是0；
                            if(i == null){
                                i = 0;
                            }
                            else if(top>=0){
                                i = Math.min(top,i+inc);
                            }
                            else{
                                i = Math.max(top,i+inc);
                            }
                            if(i === top) done = true;
                            return {value: i,done:false};
                        }
                        else{
                            return {done:true};
                        }
                    }

                }
            }
        })
    }
}