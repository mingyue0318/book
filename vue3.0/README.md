# vue3.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
    https://mp.weixin.qq.com/s/tBpWpWJx1MBLa1TKKAqqgw


    https://mp.weixin.qq.com/s/IIs3JJZTjJhTmmoSwXb9Cw
```


### 父组件给子组件传值  

```
方法一
        父：
        <Children msg="message">
        子
        props:{
            msg:String,
        }
        setup(props){
            console.log(props)
        }
方法二  
        父：
        import { provide } from "@vue/composition-api";  // 父组件引入 provide
        setup(){
            provide("customVal", "我是父组件向子组件传递的值"); 
        }
        子：
        // 子组件导入 inject
        import { inject } from "@vue/composition-api";
        setup(){
            const customVal = inject("customVal");
            return{
                customVal
            }
        }

------父组件可以通过ref创建响应式数据通过provide 共享给子组件
```
### 子组件给父组件传值
```

```

