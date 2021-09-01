{
    // ES5
    // 响应式核心原理就是 发布-订阅  代理  用ES5 Object.defineProperty
    let activeEffect
    class Dep {
        subscribers = new Set();
        depend(){
            if(activeEffect){
                this.subscribers.add(activeEffect);
            }
        }

        notify(){
            this.subscribers.forEach(effect=>effect());
        }
    }
    function watchEffect(effect){
        activeEffect = effect;
        effect();
        activeEffect = null;
    }
    function reactive(raw){

        // 使用 Object.defineProperty
        // 1. 遍历对象上存在的 key
        Object.keys(raw).forEach(key=>{

            // 2. 为每个 key 都创建一个依赖对象
            const dep = new Dep();

            // 3. 用 getter 和 setter 重写原对象的属性
            let realValue = raw[key];
            Object.defineProperty(raw,key,{
                get(){

                    // 4. 在 getter 和 setter 里调用依赖对象的对应方法
                    dep.depend();
                    return realValue;
                },
                set(newValue){
                    realValue = newValue;
                    dep.notify();
                }
            })
        })
        return raw;
    }


    // 使用
    
    const dep = new Dep();

    let actualCount = 0;
    const state = {
        get count(){
            dep.depend();
            return actualCount;
        },
        set count(newCount){
            actualCount = newCount;
            dep.notify();
        }
    }
    watchEffect(()=>{
        console.log(state.count);
    })

    state.count++;

}
{
    // Vue3 使用的代理  Proxy

    // 定义一个暂时存放 watchEffect 传进来的参数的变量
    let activeEffect;

    // 定义一个 Dep 类，该类将会为每一个响应式对象的每一个键生成一个发布者实例
    class Dep {
        // 用 Set 做缓存列表以防止列表中添加多个完全相同的函数
        subscribers = new Set();
        // 构造函数接受一个初始化的值放在私有变量内
        constructor(value){
            this._value = value;
        }
        // 当使用 xxx.value 获取对象上的 value 值时
        get value(){
            // 代理模式 当获取对象上的value属性的值时将会触发 depend 方法
            this.depend();
            // 然后返回私有变量内的值
            return this._value;
        }

        // 当使用 xxx.value = xxx 修改对象上的 value 值时
        set value(value){
             // 代理模式 当修改对象上的value属性的值时将会触发 notify 方法
            this._value = value;
           
            // 先改值再触发 这样保证触发的时候用到的都是已经修改后的新值
            this.notify();
        }

         // 这就是我们常说的依赖收集方法
        depend(){
             // 如果 activeEffect 这个变量为空 就证明不是在 watchEffect 这个函数里面触发的 get 操作
            if(activeEffect){
                // 但如果 activeEffect 不为空就证明是在 watchEffect 里触发的 get 操作
                // 那就把 activeEffect 这个存着 watchEffect 参数的变量添加进缓存列表中
                this.subscribers.add(activeEffect);
            }
        }

        // 更新操作 通常会在值被修改后调用
        notify(){

             // 遍历缓存列表里存放的函数 并依次触发执行
            this.subscribers.forEach((effect)=>{
                effect()
            })
        }
    }

    // 模仿 Vue3 的 watchEffect 函数
    function watchEffect(effect){

         // 先把传进来的函数放入到 activeEffect 这个变量中
        activeEffect = effect;

        // 然后执行 watchEffect 里面的函数
        effect();

         // 最后把 activeEffect 置为空值
        activeEffect = null;
    }

    // proxy version

    const reactiveHandles = {
        // 当触发 get 操作时
        get(target,key){
            // 先调用 getDep 函数取到里面存放的 value 值
            const value = getDep(target,key).value;

            // 如果 value 是对象的话
            if(value && typeof value === "object"){

                // 那就把 value 也变成一个响应式对象
                return reactive(value);
            }else{

                 // 如果 value 只是基本数据类型的话就直接将值返回
                return value;
            }
        },

        // 当触发 set 操作时
        set(target,key,value){
            // 调用 getDep 函数并将里面存放的 value 值重新赋值成 set 操作的值
            getDep(target,key).value = value;
        }
    }
    // 定义一个 WeakMap 数据类型 用于存放 reactive 定义的对象以及他们的发布者对象集
    const targetToHashMap = new WeakMap();
    // 定义 getDep 函数 用于获取 reactive 定义的对象所对应的发布者对象集里的某一个键对应的发布者对象
    function getDep(target,key){
        // 获取 reactive 定义的对象所对应的发布者对象集
        let depMap = targetToHashMap.get(target);

         // 如果没获取到的话
        if(!depMap){
            // 就新建一个空的发布者对象集
            depMap = new Map();
             // 然后再把这个发布者对象集存进 WeakMap 里
            targetToHashMap.set(target,depMap);
        }
        // 再获取到这个发布者对象集里的某一个键所对应的发布者对象
        let dep =depMap.get(key);
        // 如果没获取到的话
        if(!dep){

            // 就新建一个发布者对象并初始化赋值
            dep = new Dep(target[key]);

            // 然后将这个发布者对象放入到发布者对象集里
            depMap.set(key,dep);
        }
        // 最后返回这个发布者对象
        return dep;
    }

    // 模仿 Vue3 的 reactive 函数
    function reactive(obj){

        // 返回一个传进来的参数对象的代理对象 以便使用代理模式拦截对象上的操作并应用发布-订阅模式
        return new Proxy(obj,reactiveHandles);
    }

    const state = reactive({
        count: 0
    })
    
    watchEffect(() => {
    console.log(state.count)
    }) // 0
    
    state.count++ // 1
   
}
// Vue3 之所以性能比 Vue2 强很多的其中一个非常重要的优化点就是这个Proxy。
// 并不是说Proxy的性能就比Object.defineProperty高多少，
// 而是说在Proxy里的处理方式比Vue2时期的好很多：
// Vue2的响应式是一上来就一顿遍历+递归把你定义的所有数据全都变成响应式的，
// 这就会导致如果页面上有很多很复杂的数据结构时，用Vue2写的页面就会白屏一小段时间。
// 毕竟遍历+递归还是相对很慢的一个操作嘛！


// Vue3是用到哪部分的数据的时候，再把数据变成响应式的。
// 而Vue2则是不管三七二十一，刚开局就全都给你变成响应式数据。

// https://mp.weixin.qq.com/s/0oUkdqj9jE9IEQic8QrfyA