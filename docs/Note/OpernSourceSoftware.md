# 开源软件

## tomcat

### Maxconnection

最大连接数

### acceptCount 

连接后最大能处理的连接数

多的用户会进入连接等待状态

> 早期connection ---> thread
>
> 会限制并发数,浪费资源,单个线程内存默认分1MB(轻量可以分配128K)

### Node (完全异步IO)

> vertx同样使用异步,如果发生阻塞,可能服务崩溃

### Tomcat异步IO

> 6.0开始

不使用完全异步IO

> 线程数一般为**CPU线程X2**



### Lambda Probe

> 监控软件

提供日志,数据源,线程等监控服务

以war包部署在tomcat之中

## RabbitMQ

> 消息队列

### 特性

- 可靠性传输

- 不重复传输

  断点续传

- 异步性传输

  脱机能力和安全性

- 消息驱动

  主动通知消息接收方

- 不支持事务

  > 因为不能支持可靠到达

### 优势

- 键壮
- 易于使用
- 高性能
- 强大开源社区支持
- RabbitMQ各主流操作系统都有安装包
- 插件机制繁荣,各种第三方扩展,监控完备
- 各种管理脚本,完善日志

### 不同类型

1. Queue, Exchange 可以通过客户端来建立,客户端也可以直接绑定Borker已经存在Queue,Exchange
2. Direct 类型的特点就是Exchange 与 Queue直连的,routeKey不影响传输结果
3. Direct 类型 Exchange也可以绑定多条Queue,并且每条Queue都可以收到消息
4. Fanout 类型订阅-发布模式, routerKey无效
5. Topic类型广播模式,在广播是会匹配模式的 - routerKey

- Direct - p2p
- Fanout - 广播
- Topic - 广播 (routeKey 筛选)
- Header - 广播 (header 属性筛选)

### 性能对比

Direct: 267ms

Fanout: 256ms

Topic: 323ms

Header: 308ms

## Nginx

### 优点

1. 高并发连接

   > 官方数据5W并发,实际生产环境2~3W

2. 内存消耗少

3. 配置文件简单

4. 成本低廉

5. 支持Rewrite重写规则

6. 内置健康检查功能

7. 节省带宽

8. 稳定性高

### alpine

较centos或ubantu比系统小,适合容器化部署

使用`apk add`进行安装

### 命令

`nginx -c 配置文件`

`nginx -t`检查配置文件语法是否正确

`nginx reload` 热读取配置文件

### 配置

nginx.conf

#### location

指向访问路径

#### 内核模块

```conf
user nobody;

worker_processes 4;

#涉及异步IO,不建议设置过大,一般为`CPU核心X2`

error log file [debug|info|notice|warn|error|crit]
默认值 ${prefix}/logs/error.log
上下文 http, server, location
```

#### 事件模块

> 采用完全异步形式,区别于tomcat

### 反向代理

> 相对于人来说是不可感知的,由反向代理服务器完成流量分发,实现负载均衡

### docker-compose

使用`dockr-compose.yml`进行轻量级的容器编排

`links` 容器内部的链接

`depends_on` 容器的启动顺序

```
server{	
	listen 80 default_server;
	listen[::]:80 default_server
}
```

### 缓存

考虑一致性的需要,合理设置

### Rewrite

对关键代码进行重写

支持**正则表达式**

### 优化

#### worker数目设置

最大为: 核数X2

#### 使用epoll

useepoll;

### 关闭访问日志

access_log off;

#### 其他

work_connections 连接数

....



## 参考

相关软件安装参考地址为https://ww w.mls-tech.info

















