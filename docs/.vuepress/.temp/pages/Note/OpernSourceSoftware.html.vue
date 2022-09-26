<template><div><h1 id="开源软件" tabindex="-1"><a class="header-anchor" href="#开源软件" aria-hidden="true">#</a> 开源软件</h1>
<h2 id="tomcat" tabindex="-1"><a class="header-anchor" href="#tomcat" aria-hidden="true">#</a> tomcat</h2>
<h3 id="maxconnection" tabindex="-1"><a class="header-anchor" href="#maxconnection" aria-hidden="true">#</a> Maxconnection</h3>
<p>最大连接数</p>
<h3 id="acceptcount" tabindex="-1"><a class="header-anchor" href="#acceptcount" aria-hidden="true">#</a> acceptCount</h3>
<p>连接后最大能处理的连接数</p>
<p>多的用户会进入连接等待状态</p>
<blockquote>
<p>早期connection ---&gt; thread</p>
<p>会限制并发数,浪费资源,单个线程内存默认分1MB(轻量可以分配128K)</p>
</blockquote>
<h3 id="node-完全异步io" tabindex="-1"><a class="header-anchor" href="#node-完全异步io" aria-hidden="true">#</a> Node (完全异步IO)</h3>
<blockquote>
<p>vertx同样使用异步,如果发生阻塞,可能服务崩溃</p>
</blockquote>
<h3 id="tomcat异步io" tabindex="-1"><a class="header-anchor" href="#tomcat异步io" aria-hidden="true">#</a> Tomcat异步IO</h3>
<blockquote>
<p>6.0开始</p>
</blockquote>
<p>不使用完全异步IO</p>
<blockquote>
<p>线程数一般为<strong>CPU线程X2</strong></p>
</blockquote>
<h3 id="lambda-probe" tabindex="-1"><a class="header-anchor" href="#lambda-probe" aria-hidden="true">#</a> Lambda Probe</h3>
<blockquote>
<p>监控软件</p>
</blockquote>
<p>提供日志,数据源,线程等监控服务</p>
<p>以war包部署在tomcat之中</p>
<h2 id="rabbitmq" tabindex="-1"><a class="header-anchor" href="#rabbitmq" aria-hidden="true">#</a> RabbitMQ</h2>
<blockquote>
<p>消息队列</p>
</blockquote>
<h3 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h3>
<ul>
<li>
<p>可靠性传输</p>
</li>
<li>
<p>不重复传输</p>
<p>断点续传</p>
</li>
<li>
<p>异步性传输</p>
<p>脱机能力和安全性</p>
</li>
<li>
<p>消息驱动</p>
<p>主动通知消息接收方</p>
</li>
<li>
<p>不支持事务</p>
<blockquote>
<p>因为不能支持可靠到达</p>
</blockquote>
</li>
</ul>
<h3 id="优势" tabindex="-1"><a class="header-anchor" href="#优势" aria-hidden="true">#</a> 优势</h3>
<ul>
<li>键壮</li>
<li>易于使用</li>
<li>高性能</li>
<li>强大开源社区支持</li>
<li>RabbitMQ各主流操作系统都有安装包</li>
<li>插件机制繁荣,各种第三方扩展,监控完备</li>
<li>各种管理脚本,完善日志</li>
</ul>
<h3 id="不同类型" tabindex="-1"><a class="header-anchor" href="#不同类型" aria-hidden="true">#</a> 不同类型</h3>
<ol>
<li>Queue, Exchange 可以通过客户端来建立,客户端也可以直接绑定Borker已经存在Queue,Exchange</li>
<li>Direct 类型的特点就是Exchange 与 Queue直连的,routeKey不影响传输结果</li>
<li>Direct 类型 Exchange也可以绑定多条Queue,并且每条Queue都可以收到消息</li>
<li>Fanout 类型订阅-发布模式, routerKey无效</li>
<li>Topic类型广播模式,在广播是会匹配模式的 - routerKey</li>
</ol>
<ul>
<li>Direct - p2p</li>
<li>Fanout - 广播</li>
<li>Topic - 广播 (routeKey 筛选)</li>
<li>Header - 广播 (header 属性筛选)</li>
</ul>
<h3 id="性能对比" tabindex="-1"><a class="header-anchor" href="#性能对比" aria-hidden="true">#</a> 性能对比</h3>
<p>Direct: 267ms</p>
<p>Fanout: 256ms</p>
<p>Topic: 323ms</p>
<p>Header: 308ms</p>
<h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h2>
<h3 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h3>
<ol>
<li>
<p>高并发连接</p>
<blockquote>
<p>官方数据5W并发,实际生产环境2~3W</p>
</blockquote>
</li>
<li>
<p>内存消耗少</p>
</li>
<li>
<p>配置文件简单</p>
</li>
<li>
<p>成本低廉</p>
</li>
<li>
<p>支持Rewrite重写规则</p>
</li>
<li>
<p>内置健康检查功能</p>
</li>
<li>
<p>节省带宽</p>
</li>
<li>
<p>稳定性高</p>
</li>
</ol>
<h3 id="alpine" tabindex="-1"><a class="header-anchor" href="#alpine" aria-hidden="true">#</a> alpine</h3>
<p>较centos或ubantu比系统小,适合容器化部署</p>
<p>使用<code v-pre>apk add</code>进行安装</p>
<h3 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h3>
<p><code v-pre>nginx -c 配置文件</code></p>
<p><code v-pre>nginx -t</code>检查配置文件语法是否正确</p>
<p><code v-pre>nginx reload</code> 热读取配置文件</p>
<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>
<p>nginx.conf</p>
<h4 id="location" tabindex="-1"><a class="header-anchor" href="#location" aria-hidden="true">#</a> location</h4>
<p>指向访问路径</p>
<h4 id="内核模块" tabindex="-1"><a class="header-anchor" href="#内核模块" aria-hidden="true">#</a> 内核模块</h4>
<div class="language-conf ext-conf line-numbers-mode"><pre v-pre class="language-conf"><code>user nobody;

worker_processes 4;

#涉及异步IO,不建议设置过大,一般为`CPU核心X2`

error log file [debug|info|notice|warn|error|crit]
默认值 ${prefix}/logs/error.log
上下文 http, server, location
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="事件模块" tabindex="-1"><a class="header-anchor" href="#事件模块" aria-hidden="true">#</a> 事件模块</h4>
<blockquote>
<p>采用完全异步形式,区别于tomcat</p>
</blockquote>
<h3 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理" aria-hidden="true">#</a> 反向代理</h3>
<blockquote>
<p>相对于人来说是不可感知的,由反向代理服务器完成流量分发,实现负载均衡</p>
</blockquote>
<h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> docker-compose</h3>
<p>使用<code v-pre>dockr-compose.yml</code>进行轻量级的容器编排</p>
<p><code v-pre>links</code> 容器内部的链接</p>
<p><code v-pre>depends_on</code> 容器的启动顺序</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>server{	
	listen 80 default_server;
	listen[::]:80 default_server
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="缓存" tabindex="-1"><a class="header-anchor" href="#缓存" aria-hidden="true">#</a> 缓存</h3>
<p>考虑一致性的需要,合理设置</p>
<h3 id="rewrite" tabindex="-1"><a class="header-anchor" href="#rewrite" aria-hidden="true">#</a> Rewrite</h3>
<p>对关键代码进行重写</p>
<p>支持<strong>正则表达式</strong></p>
<h3 id="优化" tabindex="-1"><a class="header-anchor" href="#优化" aria-hidden="true">#</a> 优化</h3>
<h4 id="worker数目设置" tabindex="-1"><a class="header-anchor" href="#worker数目设置" aria-hidden="true">#</a> worker数目设置</h4>
<p>最大为: 核数X2</p>
<h4 id="使用epoll" tabindex="-1"><a class="header-anchor" href="#使用epoll" aria-hidden="true">#</a> 使用epoll</h4>
<p>useepoll;</p>
<h3 id="关闭访问日志" tabindex="-1"><a class="header-anchor" href="#关闭访问日志" aria-hidden="true">#</a> 关闭访问日志</h3>
<p>access_log off;</p>
<h4 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h4>
<p>work_connections 连接数</p>
<p>....</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<p>相关软件安装参考地址为https://ww w.mls-tech.info</p>
</div></template>


