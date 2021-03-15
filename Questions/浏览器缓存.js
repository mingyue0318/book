// https://mp.weixin.qq.com/s/vesFysBdmeE1zBc3urPEYA
// 优点

// 减少了冗余的数据传输，节省网费
// 减少服务器的负担，提升网站性能
// 加快了客户端加载网页的速度

// Cache-Control 的几个取值含义：
// private： 仅浏览器可以缓存
// public： 浏览器和代理服务器都可以缓存（对于private和public，前端可以认为一样，不用深究）
// max-age=xxx 过期时间（重要）
// no-cache 不进行强缓存（重要）
// no-store 不强缓存，也不协商缓存，基本不用，缓存越多才越好呢


// 强缓存
// 第一次请求 a.js ，缓存表中没该信息，直接请求后端服务器。
// 后端服务器返回了 a.js ，且 http response header 中 cache-control 为 max-age=xxxx，所以是强缓存规则，存入缓存表中。
// 第二次请求 a.js ，缓存表中是 max-age， 那么命中强缓存，然后判断是否过期，如果没过期，直接读缓存的a.js，如果过期了，则执行协商缓存的步骤了


// 协商缓存

// Cache-Control 的值为 no-cache （不强缓存）
// 或者 max-age 过期了 （强缓存，但总有过期的时候）

// 注意：协商缓存无论如果，都要向服务端发请求的，只不过，资源未更改时，返回的只是header信息，所以size很小；而资源有更改时，还要返回body数据，所以size会大。


// F5 会 跳过强缓存规则，直接走协商缓存；；；Ctrl+F5 ，跳过所有缓存规则，和第一次请求一样，重新获取资源