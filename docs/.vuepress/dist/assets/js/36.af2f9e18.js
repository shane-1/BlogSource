(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{467:function(t,a,v){"use strict";v.r(a);var _=v(28),e=Object(_.a)({},(function(){var t=this,a=t.$createElement,v=t._self._c||a;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"开源软件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#开源软件"}},[t._v("#")]),t._v(" 开源软件")]),t._v(" "),v("h2",{attrs:{id:"tomcat"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#tomcat"}},[t._v("#")]),t._v(" tomcat")]),t._v(" "),v("h3",{attrs:{id:"maxconnection"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#maxconnection"}},[t._v("#")]),t._v(" Maxconnection")]),t._v(" "),v("p",[t._v("最大连接数")]),t._v(" "),v("h3",{attrs:{id:"acceptcount"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#acceptcount"}},[t._v("#")]),t._v(" acceptCount")]),t._v(" "),v("p",[t._v("连接后最大能处理的连接数")]),t._v(" "),v("p",[t._v("多的用户会进入连接等待状态")]),t._v(" "),v("blockquote",[v("p",[t._v("早期connection ---\x3e thread")]),t._v(" "),v("p",[t._v("会限制并发数,浪费资源,单个线程内存默认分1MB(轻量可以分配128K)")])]),t._v(" "),v("h3",{attrs:{id:"node-完全异步io"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#node-完全异步io"}},[t._v("#")]),t._v(" Node (完全异步IO)")]),t._v(" "),v("blockquote",[v("p",[t._v("vertx同样使用异步,如果发生阻塞,可能服务崩溃")])]),t._v(" "),v("h3",{attrs:{id:"tomcat异步io"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#tomcat异步io"}},[t._v("#")]),t._v(" Tomcat异步IO")]),t._v(" "),v("blockquote",[v("p",[t._v("6.0开始")])]),t._v(" "),v("p",[t._v("不使用完全异步IO")]),t._v(" "),v("blockquote",[v("p",[t._v("线程数一般为"),v("strong",[t._v("CPU线程X2")])])]),t._v(" "),v("h3",{attrs:{id:"lambda-probe"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#lambda-probe"}},[t._v("#")]),t._v(" Lambda Probe")]),t._v(" "),v("blockquote",[v("p",[t._v("监控软件")])]),t._v(" "),v("p",[t._v("提供日志,数据源,线程等监控服务")]),t._v(" "),v("p",[t._v("以war包部署在tomcat之中")]),t._v(" "),v("h2",{attrs:{id:"rabbitmq"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#rabbitmq"}},[t._v("#")]),t._v(" RabbitMQ")]),t._v(" "),v("blockquote",[v("p",[t._v("消息队列")])]),t._v(" "),v("h3",{attrs:{id:"特性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#特性"}},[t._v("#")]),t._v(" 特性")]),t._v(" "),v("ul",[v("li",[v("p",[t._v("可靠性传输")])]),t._v(" "),v("li",[v("p",[t._v("不重复传输")]),t._v(" "),v("p",[t._v("断点续传")])]),t._v(" "),v("li",[v("p",[t._v("异步性传输")]),t._v(" "),v("p",[t._v("脱机能力和安全性")])]),t._v(" "),v("li",[v("p",[t._v("消息驱动")]),t._v(" "),v("p",[t._v("主动通知消息接收方")])]),t._v(" "),v("li",[v("p",[t._v("不支持事务")]),t._v(" "),v("blockquote",[v("p",[t._v("因为不能支持可靠到达")])])])]),t._v(" "),v("h3",{attrs:{id:"优势"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#优势"}},[t._v("#")]),t._v(" 优势")]),t._v(" "),v("ul",[v("li",[t._v("键壮")]),t._v(" "),v("li",[t._v("易于使用")]),t._v(" "),v("li",[t._v("高性能")]),t._v(" "),v("li",[t._v("强大开源社区支持")]),t._v(" "),v("li",[t._v("RabbitMQ各主流操作系统都有安装包")]),t._v(" "),v("li",[t._v("插件机制繁荣,各种第三方扩展,监控完备")]),t._v(" "),v("li",[t._v("各种管理脚本,完善日志")])]),t._v(" "),v("h3",{attrs:{id:"不同类型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#不同类型"}},[t._v("#")]),t._v(" 不同类型")]),t._v(" "),v("ol",[v("li",[t._v("Queue, Exchange 可以通过客户端来建立,客户端也可以直接绑定Borker已经存在Queue,Exchange")]),t._v(" "),v("li",[t._v("Direct 类型的特点就是Exchange 与 Queue直连的,routeKey不影响传输结果")]),t._v(" "),v("li",[t._v("Direct 类型 Exchange也可以绑定多条Queue,并且每条Queue都可以收到消息")]),t._v(" "),v("li",[t._v("Fanout 类型订阅-发布模式, routerKey无效")]),t._v(" "),v("li",[t._v("Topic类型广播模式,在广播是会匹配模式的 - routerKey")])]),t._v(" "),v("ul",[v("li",[t._v("Direct - p2p")]),t._v(" "),v("li",[t._v("Fanout - 广播")]),t._v(" "),v("li",[t._v("Topic - 广播 (routeKey 筛选)")]),t._v(" "),v("li",[t._v("Header - 广播 (header 属性筛选)")])]),t._v(" "),v("h3",{attrs:{id:"性能对比"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#性能对比"}},[t._v("#")]),t._v(" 性能对比")]),t._v(" "),v("p",[t._v("Direct: 267ms")]),t._v(" "),v("p",[t._v("Fanout: 256ms")]),t._v(" "),v("p",[t._v("Topic: 323ms")]),t._v(" "),v("p",[t._v("Header: 308ms")]),t._v(" "),v("h2",{attrs:{id:"nginx"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#nginx"}},[t._v("#")]),t._v(" Nginx")]),t._v(" "),v("h3",{attrs:{id:"优点"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#优点"}},[t._v("#")]),t._v(" 优点")]),t._v(" "),v("ol",[v("li",[v("p",[t._v("高并发连接")]),t._v(" "),v("blockquote",[v("p",[t._v("官方数据5W并发,实际生产环境2~3W")])])]),t._v(" "),v("li",[v("p",[t._v("内存消耗少")])]),t._v(" "),v("li",[v("p",[t._v("配置文件简单")])]),t._v(" "),v("li",[v("p",[t._v("成本低廉")])]),t._v(" "),v("li",[v("p",[t._v("支持Rewrite重写规则")])]),t._v(" "),v("li",[v("p",[t._v("内置健康检查功能")])]),t._v(" "),v("li",[v("p",[t._v("节省带宽")])]),t._v(" "),v("li",[v("p",[t._v("稳定性高")])])]),t._v(" "),v("h3",{attrs:{id:"alpine"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#alpine"}},[t._v("#")]),t._v(" alpine")]),t._v(" "),v("p",[t._v("较centos或ubantu比系统小,适合容器化部署")]),t._v(" "),v("p",[t._v("使用"),v("code",[t._v("apk add")]),t._v("进行安装")]),t._v(" "),v("h3",{attrs:{id:"命令"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#命令"}},[t._v("#")]),t._v(" 命令")]),t._v(" "),v("p",[v("code",[t._v("nginx -c 配置文件")])]),t._v(" "),v("p",[v("code",[t._v("nginx -t")]),t._v("检查配置文件语法是否正确")]),t._v(" "),v("p",[v("code",[t._v("nginx reload")]),t._v(" 热读取配置文件")]),t._v(" "),v("h3",{attrs:{id:"配置"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[t._v("#")]),t._v(" 配置")]),t._v(" "),v("p",[t._v("nginx.conf")]),t._v(" "),v("h4",{attrs:{id:"location"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#location"}},[t._v("#")]),t._v(" location")]),t._v(" "),v("p",[t._v("指向访问路径")]),t._v(" "),v("h4",{attrs:{id:"内核模块"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#内核模块"}},[t._v("#")]),t._v(" 内核模块")]),t._v(" "),v("div",{staticClass:"language-conf extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[t._v("user nobody;\n\nworker_processes 4;\n\n#涉及异步IO,不建议设置过大,一般为`CPU核心X2`\n\nerror log file [debug|info|notice|warn|error|crit]\n默认值 ${prefix}/logs/error.log\n上下文 http, server, location\n")])])]),v("h4",{attrs:{id:"事件模块"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#事件模块"}},[t._v("#")]),t._v(" 事件模块")]),t._v(" "),v("blockquote",[v("p",[t._v("采用完全异步形式,区别于tomcat")])]),t._v(" "),v("h3",{attrs:{id:"反向代理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#反向代理"}},[t._v("#")]),t._v(" 反向代理")]),t._v(" "),v("blockquote",[v("p",[t._v("相对于人来说是不可感知的,由反向代理服务器完成流量分发,实现负载均衡")])]),t._v(" "),v("h3",{attrs:{id:"docker-compose"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#docker-compose"}},[t._v("#")]),t._v(" docker-compose")]),t._v(" "),v("p",[t._v("使用"),v("code",[t._v("dockr-compose.yml")]),t._v("进行轻量级的容器编排")]),t._v(" "),v("p",[v("code",[t._v("links")]),t._v(" 容器内部的链接")]),t._v(" "),v("p",[v("code",[t._v("depends_on")]),t._v(" 容器的启动顺序")]),t._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[t._v("server{\t\n\tlisten 80 default_server;\n\tlisten[::]:80 default_server\n}\n")])])]),v("h3",{attrs:{id:"缓存"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#缓存"}},[t._v("#")]),t._v(" 缓存")]),t._v(" "),v("p",[t._v("考虑一致性的需要,合理设置")]),t._v(" "),v("h3",{attrs:{id:"rewrite"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#rewrite"}},[t._v("#")]),t._v(" Rewrite")]),t._v(" "),v("p",[t._v("对关键代码进行重写")]),t._v(" "),v("p",[t._v("支持"),v("strong",[t._v("正则表达式")])]),t._v(" "),v("h3",{attrs:{id:"优化"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#优化"}},[t._v("#")]),t._v(" 优化")]),t._v(" "),v("h4",{attrs:{id:"worker数目设置"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#worker数目设置"}},[t._v("#")]),t._v(" worker数目设置")]),t._v(" "),v("p",[t._v("最大为: 核数X2")]),t._v(" "),v("h4",{attrs:{id:"使用epoll"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#使用epoll"}},[t._v("#")]),t._v(" 使用epoll")]),t._v(" "),v("p",[t._v("useepoll;")]),t._v(" "),v("h3",{attrs:{id:"关闭访问日志"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#关闭访问日志"}},[t._v("#")]),t._v(" 关闭访问日志")]),t._v(" "),v("p",[t._v("access_log off;")]),t._v(" "),v("h4",{attrs:{id:"其他"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[t._v("#")]),t._v(" 其他")]),t._v(" "),v("p",[t._v("work_connections 连接数")]),t._v(" "),v("p",[t._v("....")]),t._v(" "),v("h2",{attrs:{id:"参考"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),v("p",[t._v("相关软件安装参考地址为https://www.mls-tech.info")])])}),[],!1,null,null,null);a.default=e.exports}}]);