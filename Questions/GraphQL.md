### GraphGL

```
    获取数据的三步:
    1.首先要设计数据模型，用来描述数据对象，它的作用可以看做是VO，用于告知GraphQL如何来描述定义的数据，为下一步查询返回做准备；
    2.前端使用模式查询语言（Schema）来描述需要请求的数据对象类型和具体需要的字段（称之为声明式数据获取）；
    3.后端GraphQL通过前端传过来的请求，根据需要，自动组装数据字段，返回给前端。

    GraphQL的这种思考模式是不是完美解决了之前遇到的问题呢？
```

```
    一个GraphQL服务仅暴露一个 GraphQL Endpoint，可以按照业务来进行区分，部署多个GraphQL服务，分管不同的业务数据，这样就可以避免单服务器压力过大的问题了

    https://mp.weixin.qq.com/s/qkk9qkh5CGurlV4RK5sNAA
vue + GraphGL
    https://mp.weixin.qq.com/s/RspUDIwhjYww6aGxycpMIg
```