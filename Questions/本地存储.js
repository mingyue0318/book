//  Cookie/Session/Token
// https://mp.weixin.qq.com/s/yJAygqZHRPZBZj9hO5_f6g



//1 cookie
// 为了解决 HTTP 协议无状态特性的问题
            // 用户的两次 HTTP 请求，服务端并不能通过请求本身，知道这两次请求，来自于同一个用户
// Cookie 的安全问题
            // Cookie 在每次请求中都会被发送，如果不使用 HTTPS 并对其加密，其保存的信息很容易被窃取，导致安全风险
            // 举个例子，在一些使用 Cookie 保持登录态的网站上，如果 Cookie 被窃取，他人很容易利用你的 Cookie 来假扮成你登录网站
            // 当然可以用 Session 配合 Cookie 来缓解这个问题，但是 Session 会占用额外的服务器资源
            // Cookie 每次请求自动发送的特性还会导致 CSRF(跨站请求伪造) 攻击的安全风险
                                            //  XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
// Cookie 只允许储存 4kb 的数据
// Cookie 的操作较为繁琐复杂


// 第三方cookie
    // Cookie 可以被服务端设置
    // 服务器可以通过 response 的请求头来要求浏览器设置 Cookie
    // Set-Cookie: userId=123;



    // 1.当用户处于 abc.com 时，浏览器会向 taobao.com/some-ads 发起一个 HTTP 请求
    // 2.当淘宝服务器返回广告内容时，会顺带一个 Set-Cookie 的 HTTP 请求头，告诉浏览器设置一个源为 taobao.com 的 Cookie，里面存上当前用户的 ID 等信息
    // 3.这个 Cookie 相对于 abc.com 而言就是第三方 Cookie，因为它属于 taobao.com
    // 而当用户访问 xyz.com 时，由于 xyz.com 上也嵌入了淘宝的广告，因此用户的浏览器也会向 taobao.com/some-ads 发起请求
    // 有意思的来了，发请求时，浏览器发现本地已有 taobao.com 的 Cookie（此前访问 abc.com 时设置的），因此，浏览器会将这个 Cookie 发送过去
    // 淘宝服务器根据发过来的 Cookie，发现当前访问 xyz.com 的用户和之前访问 abc.com 的用户是同一个，因此会返回相同的广告
// 广告中，用来跨站标记用户与跟踪用户行为，这样在你访问不同页面时，广告商也能知道是同一个用户在访问，从而实现后续的商品推荐等功能


// Cookie 可以被服务器设置
// 浏览器每次请求会自动带上 Cookie

SameSite

    // 第三方 Cookie 失效   解决 ：SameSite=None
Secure, HttpOnly

    // Secure 是只允许 Cookie 在 HTTPS 请求中被使用
    // HttpOnly 则用来禁止使用 JS 访问 cookie
        // ducoment.cookie // 访问被禁止了
//2 Web Storage
    LocalStorage  = '(10M)'

    // CSRF 攻击的特点是，诱导你去访问某个需要你的权限的接口，HTTPS 并不能阻止这种访问
    // CSRF 攻击的核心，就是利用了浏览器会自动在所有请求里带上 Cookie 的特性

    // token 的方法加上 HTTPS 请求，就可以很大程度上提高登录的安全性，避免被 CSRF 攻击（但是依然无法完全避免被 XSS 攻击的风险）

    // 缺点：
    //     无法像 Cookie 一样设置过期时间
    //     只能存入字符串，无法直接存对象

//3 indexedDB







