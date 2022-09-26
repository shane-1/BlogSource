<template><div><h1 id="jdbc" tabindex="-1"><a class="header-anchor" href="#jdbc" aria-hidden="true">#</a> JDBC</h1>
<h2 id="数据库驱动" tabindex="-1"><a class="header-anchor" href="#数据库驱动" aria-hidden="true">#</a> 数据库驱动</h2>
<p>程序通过数据库驱动和数据库交互</p>
<h2 id="jdbc-1" tabindex="-1"><a class="header-anchor" href="#jdbc-1" aria-hidden="true">#</a> JDBC</h2>
<p>SUN公司为了简化开发人员的(对数据库统一的)操作,提供了一个Java操作数据库的规范,俗称JDBC</p>
<p>这些规范的实现由具体的厂商去实现</p>
<p>对于开发人员来说,我们只需要掌握JDBC接口的操作即可</p>
<blockquote>
<p>java.sql</p>
<p>javax.sql</p>
</blockquote>
<p>还需要导入一个数据库驱动包</p>
<p><code v-pre>mysql-connector-java-5.1.47.jar</code></p>
<h2 id="第一个jdbc程序" tabindex="-1"><a class="header-anchor" href="#第一个jdbc程序" aria-hidden="true">#</a> 第一个JDBC程序</h2>
<h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDBC</span><span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span><span class="token punctuation">,</span> <span class="token class-name">SQLException</span><span class="token punctuation">{</span>
        
        <span class="token comment">//1.加载驱动</span>
        <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">"com.mysql.jdbc.Driver"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//固定写法</span>
        
        <span class="token comment">//2.用户信息和url</span>
		<span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">"jdbc:mysql://localhost:3306/DateBaseName?useUnicode=true&amp;characterEncoding=utf8&amp;useSSL=true"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token string">"root"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> password <span class="token operator">=</span> <span class="token string">"123456"</span><span class="token punctuation">;</span>
            
        <span class="token comment">//3.连接成功,数据库对象</span>
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span>username<span class="token punctuation">,</span>password<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//4.执行sql的对象</span>
        <span class="token class-name">Statement</span> statement <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//5.执行sql的对象去执行sql,可能存在结构,查看返回结果</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"SELECT * FROM users"</span><span class="token punctuation">;</span>
        <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> statement<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//返回的结果集,为链表</span>
        
        <span class="token keyword">while</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"id="</span> <span class="token operator">+</span> resultSet<span class="token punctuation">.</span><span class="token function">getObeject</span><span class="token punctuation">(</span>columnLabel<span class="token operator">:</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"name="</span> <span class="token operator">+</span> resultSet<span class="token punctuation">.</span><span class="token function">getObeject</span><span class="token punctuation">(</span>columnLabel<span class="token operator">:</span><span class="token string">"NAME"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"pwd="</span> <span class="token operator">+</span> resultSet<span class="token punctuation">.</span><span class="token function">getObeject</span><span class="token punctuation">(</span>columnLabel<span class="token operator">:</span><span class="token string">"PASSWORD"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
        <span class="token punctuation">}</span>
        <span class="token comment">//6.释放连接</span>
        resultSet<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        statement<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        connection<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意:</h3>
<blockquote>
<p>时区问题加&amp;serverTimezone=GMT%2B8</p>
<p>ssl报错是因为5.7.28以后的版本才真正支持ssl,但应用服务器没有提供验证出错,可以提供truststore或关闭ssl解决</p>
<p>8.0的sql驱动为com.mysql.cj.jdbc.driver</p>
</blockquote>
<h3 id="步骤总结" tabindex="-1"><a class="header-anchor" href="#步骤总结" aria-hidden="true">#</a> 步骤总结</h3>
<ol>
<li>加载驱动</li>
<li>连接数据库 DriverManage</li>
<li>获取执行sql的对象 Statement</li>
<li>获得返回的结果集</li>
<li>释放连接</li>
</ol>
<h2 id="数据库驱动-1" tabindex="-1"><a class="header-anchor" href="#数据库驱动-1" aria-hidden="true">#</a> 数据库驱动</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>DiverManager<span class="token punctuation">.</span>registerDriver<span class="token punctuation">(</span>new com<span class="token punctuation">.</span>mysql<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>Driver<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
<span class="token comment">// 不建议这样使用,因为注册相关代码为静态代码块,类被加载就已经注册,这样写等同于注册了两次驱动</span>

<span class="token comment">//推荐写法(利用反射)</span>
 Class<span class="token punctuation">.</span>forName<span class="token punctuation">(</span><span class="token string">"com.mysql.jdbc.Driver"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//固定写法</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="url" tabindex="-1"><a class="header-anchor" href="#url" aria-hidden="true">#</a> URL</h2>
<p><code v-pre>String url = &quot;jdbc:mysql://localhost:3306/DateBaseName?useUnicode=true&amp;characterEncoding=utf8&amp;useSSL=true&quot;;</code></p>
<p>jdbc:mysql://主机地址:端口号/数据库名?参数1&amp;参数2&amp;参数3</p>
<blockquote>
<p>默认mysql端口3306,Oracle1521,sqlServer1433;</p>
<p>Oracle:  jdbc:oracle:thin:@localhost:1521:sid</p>
</blockquote>
<h2 id="connection" tabindex="-1"><a class="header-anchor" href="#connection" aria-hidden="true">#</a> Connection</h2>
<p><code v-pre>Connection connection = DriverManager.getConnection(url,username,password);</code></p>
<p>connection代表数据库</p>
<p>该层可以设置自动提交\事务提交\事务回滚等数据库层能做的事</p>
<h2 id="statement-preparestatement" tabindex="-1"><a class="header-anchor" href="#statement-preparestatement" aria-hidden="true">#</a> Statement&amp;PrepareStatement</h2>
<p><strong>jdbc中的statement对象用于向数据库发送SQL语句,想完成对数据库的增删改查,只需要通过这个对象向狙击发送增删改查语句即可.</strong></p>
<p><code v-pre> Statement statement = connection.createStatement();</code></p>
<ul>
<li><code v-pre>statement.executeQuery();</code>查询操作返回ResultSet</li>
<li><code v-pre>statement.execute();</code>执行任何sql</li>
<li><code v-pre>statement.executeUpdate();</code> 更新\插入\删除,都是用这个,返回一个受影响的行数</li>
</ul>
<h2 id="resultset" tabindex="-1"><a class="header-anchor" href="#resultset" aria-hidden="true">#</a> ResultSet</h2>
<p>ResultSet查询结果集:封装了所有的查询结果</p>
<p>在不知道列类型情况下使用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>resultSet<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在知道了列类型时,获得指定的类型</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>resultSet<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
resultSet<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
resultSet<span class="token punctuation">.</span><span class="token function">getFloat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
resultSet<span class="token punctuation">.</span><span class="token function">getDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意:结果集结构上为双向链表</p>
<ol>
<li><code v-pre>resultSet.beforeFirst();</code>:移动到最前面</li>
<li><code v-pre>resultSet.afterLast();</code>:移动到最后面</li>
<li><code v-pre>resultSet.next();</code>:移动到下一个数据</li>
<li><code v-pre>resultSet.previous();</code>:移动到前一行</li>
<li><code v-pre>resultSet.absolute(row);</code>:移动到指定行</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//一般使用while遍历</span>
<span class="token keyword">while</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="释放资源" tabindex="-1"><a class="header-anchor" href="#释放资源" aria-hidden="true">#</a> 释放资源</h2>
<p><code v-pre>resultSet.close();      statement.close();      connection.close();</code></p>
<p>先打开的后关闭</p>
<h2 id="自定义数据库工具类" tabindex="-1"><a class="header-anchor" href="#自定义数据库工具类" aria-hidden="true">#</a> 自定义数据库工具类</h2>
<p>将数据库资源配置解耦,单独存放于src目录下的db.properties文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/DateBaseName?useUnicode=true&amp;characterEncoding=utf8&amp;useSSL=true
username=root
password=123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">InputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Properties</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JdbcUtils</span> <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> driver <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> username <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> password <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    
    <span class="token keyword">static</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token class-name">InputStream</span> in <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">"db.properties"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            properties<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            driver <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"driver"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            url <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"url"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            username <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            password <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            <span class="token comment">//1.加载驱动(只加载一次)</span>
            <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>driver<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
        	e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    
    <span class="token comment">//获取连接</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Connection</span> <span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">{</span>
    	<span class="token keyword">return</span> <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span>username<span class="token punctuation">,</span>password<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//释放连接资源</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">release</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">,</span> <span class="token class-name">Statement</span> statement<span class="token punctuation">,</span> <span class="token class-name">ResultSet</span> resultSet<span class="token punctuation">)</span><span class="token punctuation">{</span>
    	<span class="token keyword">if</span><span class="token punctuation">(</span>resultset <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                resultSet<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>statement <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                statement<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>connection <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                connection<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试工具类" tabindex="-1"><a class="header-anchor" href="#测试工具类" aria-hidden="true">#</a> 测试工具类</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>shane<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">JdbcUtils</span></span><span class="token punctuation">;</span> <span class="token comment">//导入自定义工具类</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Statement</span> statement <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取数据库连接</span>
            statement <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">connection<span class="token punctuation">.</span></span>CreateStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//创建SQL执行对象</span>
            <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> statement<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//假设sql内容为插入,返回受影响行(删改同理)</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"插入成功~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            resultSet <span class="token operator">=</span> statement<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//假设sql为查询</span>
            	<span class="token keyword">while</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        		 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"id="</span> <span class="token operator">+</span> resultSet<span class="token punctuation">.</span><span class="token function">getObeject</span><span class="token punctuation">(</span>columnLabel<span class="token operator">:</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
        		 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"name="</span> <span class="token operator">+</span> resultSet<span class="token punctuation">.</span><span class="token function">getObeject</span><span class="token punctuation">(</span>columnLabel<span class="token operator">:</span><span class="token string">"NAME"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
       		     <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"pwd="</span> <span class="token operator">+</span> resultSet<span class="token punctuation">.</span><span class="token function">getObeject</span><span class="token punctuation">(</span>columnLabel<span class="token operator">:</span><span class="token string">"PASSWORD"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
      			  <span class="token punctuation">}</span>    
        <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span>statement<span class="token punctuation">,</span>resultSet<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="避免sql注入" tabindex="-1"><a class="header-anchor" href="#避免sql注入" aria-hidden="true">#</a> 避免SQL注入</h2>
<p><strong>使用<u>PrepareStatement代替Statement</u>防止SQL注入</strong></p>
<h3 id="本质" tabindex="-1"><a class="header-anchor" href="#本质" aria-hidden="true">#</a> 本质</h3>
<p>将传递来的参数当做字符,不直接拼接.</p>
<ul>
<li>假设其中存在转义字符(例如符号`),就直接忽略了</li>
</ul>
<blockquote>
<p>效率更高</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>shane<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">JdbcUtils</span></span><span class="token punctuation">;</span> <span class="token comment">//导入自定义工具类</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">PreparedStatement</span> preparedStatement <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取数据库连接</span>
            <span class="token comment">//区别于Statement</span>
            <span class="token comment">/*插入例子~增删同理*/</span>
            <span class="token comment">//使用占位符代替参数</span>
            <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"insert into users(id, `name`, `password`, 'birthday') values (?, ?, ?, ?)"</span><span class="token punctuation">;</span>
            <span class="token comment">//预编译,先写sql,不执行</span>
            preparedStatement <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            <span class="token comment">//手动赋值</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">setInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//id赋值</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">"shane"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//名字赋值</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">setInt</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">"12222"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//密码赋值</span>
            <span class="token comment">//注意这里是哪个包的时间</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">setDate</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span>Date</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span>Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
     
            <span class="token keyword">int</span> i <span class="token operator">=</span> preparedStatement<span class="token punctuation">.</span><span class="token function">executeUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"插入成功~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">/*查询例子*/</span>
            sql <span class="token operator">=</span> <span class="token string">"select * from users where id = ?"</span><span class="token punctuation">;</span>
            preparedStatement <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//预编译</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">setInt</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//传递参数</span>
            resultSet <span class="token operator">=</span> preparedStatement<span class="token punctuation">.</span><span class="token function">executeQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//执行查询</span>
            	<span class="token keyword">while</span><span class="token punctuation">(</span>resultSet<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        		 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"id="</span> <span class="token operator">+</span> resultSet<span class="token punctuation">.</span><span class="token function">getObeject</span><span class="token punctuation">(</span>columnLabel<span class="token operator">:</span><span class="token string">"id"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
        		 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"name="</span> <span class="token operator">+</span> resultSet<span class="token punctuation">.</span><span class="token function">getObeject</span><span class="token punctuation">(</span>columnLabel<span class="token operator">:</span><span class="token string">"NAME"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
       		     <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"pwd="</span> <span class="token operator">+</span> resultSet<span class="token punctuation">.</span><span class="token function">getObeject</span><span class="token punctuation">(</span>columnLabel<span class="token operator">:</span><span class="token string">"PASSWORD"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
      			  <span class="token punctuation">}</span>    
        <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span>statement<span class="token punctuation">,</span>resultSet<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>shane<span class="token punctuation">.</span>utils<span class="token punctuation">.</span></span><span class="token class-name">JdbcUtils</span></span><span class="token punctuation">;</span> <span class="token comment">//导入自定义工具类</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
        <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Statement</span> statement <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ResultSet</span> resultSet <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            connection <span class="token operator">=</span> <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//获取数据库连接</span>
            <span class="token comment">//关闭数据库自动提交,自动开启事务</span>
            connection<span class="token punctuation">.</span><span class="token function">setAutoCommit</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            <span class="token class-name">String</span> sql1 <span class="token operator">=</span> <span class="token string">"update account set money = money - 100 where name = ?"</span><span class="token punctuation">;</span>
            
            <span class="token comment">//预编译,先写sql,不执行</span>
            preparedStatement <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"A"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//名字赋值</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">excuteUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> sql2 <span class="token operator">=</span> <span class="token string">"update account set money = money + 100 where name = ?"</span><span class="token punctuation">;</span>
            
            <span class="token comment">//预编译,先写sql,不执行</span>
            preparedStatement <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">setString</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"B"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//名字赋值</span>
            preparedStatement<span class="token punctuation">.</span><span class="token function">excuteUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
            <span class="token comment">//业务执行成功,提交事务</span>
            connection<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     
        <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                connection<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//失败回滚</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e1<span class="token punctuation">)</span><span class="token punctuation">{</span>
                 e1<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
            <span class="token class-name">JdbcUtils</span><span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span>statement<span class="token punctuation">,</span>resultSet<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>开启事务<code v-pre> connection.setAutoCommit(false);</code></li>
<li>一组业务执行完毕,提交事务</li>
<li>可以在catch语句中显示的定义回滚语句,但<strong>默认失败就会回滚</strong></li>
</ul>
<h2 id="数据库连接池" tabindex="-1"><a class="header-anchor" href="#数据库连接池" aria-hidden="true">#</a> 数据库连接池</h2>
<p>数据库连接-执行完毕-释放十分浪费系统资源</p>
<h3 id="池化技术" tabindex="-1"><a class="header-anchor" href="#池化技术" aria-hidden="true">#</a> 池化技术:</h3>
<p>准备一些预先的资源,过来就连接预先准备好的</p>
<p><strong>编写连接池,实现了一个借口DataSource</strong></p>
<h3 id="最小连接数" tabindex="-1"><a class="header-anchor" href="#最小连接数" aria-hidden="true">#</a> 最小连接数</h3>
<p>一般设置为常用连接数</p>
<h3 id="最大连接数" tabindex="-1"><a class="header-anchor" href="#最大连接数" aria-hidden="true">#</a> 最大连接数</h3>
<p>业务最高承载上限</p>
<h3 id="等待超时" tabindex="-1"><a class="header-anchor" href="#等待超时" aria-hidden="true">#</a> 等待超时</h3>
<p>如果超时到达该限度,就返回</p>
<h3 id="开源数据源实现" tabindex="-1"><a class="header-anchor" href="#开源数据源实现" aria-hidden="true">#</a> 开源数据源实现</h3>
<ul>
<li>DBCP</li>
<li>C3P0</li>
<li>Druid</li>
</ul>
<p>使用这些数据库连接池后,在项目开发中就不需要编写连接数据库的代码了!</p>
<h3 id="dbcp" tabindex="-1"><a class="header-anchor" href="#dbcp" aria-hidden="true">#</a> DBCP</h3>
<p>需要的jar包</p>
<p><code v-pre>commons-dbcp-1.4</code>/<code v-pre>commons-pool-1.6</code></p>
<p>src目录下建立dbcpconfig.properties配置文件</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment">#连接设置</span>
<span class="token key attr-name">driverClassName</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.jdbc.Driver</span>
<span class="token key attr-name">url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://localhost:3306/bank</span>
<span class="token key attr-name">username</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token key attr-name">password</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>

<span class="token comment">#初始化连接</span>
<span class="token key attr-name">initialSize</span><span class="token punctuation">=</span><span class="token value attr-value">10</span>

<span class="token comment">#最大连接数量</span>
<span class="token key attr-name">maxActive</span><span class="token punctuation">=</span><span class="token value attr-value">50</span>

<span class="token comment">#最大空闲连接</span>
<span class="token key attr-name">maxIdle</span><span class="token punctuation">=</span><span class="token value attr-value">20</span>

<span class="token comment">#最小空闲连接</span>
<span class="token key attr-name">minIdle</span><span class="token punctuation">=</span><span class="token value attr-value">5</span>

<span class="token comment">#超时,单位为毫秒</span>
<span class="token key attr-name">maxWait</span><span class="token punctuation">=</span><span class="token value attr-value">60000</span>

<span class="token comment">#JDBC驱动建立连接时附带的连接属性属性的格式必须为这样：[属性名=property;]</span>
<span class="token comment">#注意：“user” 与 “password” 两个属性会被明确地传递，因此这里不需要包含他们。</span>
<span class="token key attr-name">connectionProperties</span><span class="token punctuation">=</span><span class="token value attr-value">useUnicode=true;characterEncoding=gbk</span>

<span class="token comment">#指定由连接池所创建的连接的自动提交（auto-commit）状态。</span>
<span class="token key attr-name">defaultAutoCommit</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>

<span class="token comment">#driver default 指定由连接池所创建的连接的事务级别（TransactionIsolation）。</span>
<span class="token comment">#可用值为下列之一：（详情可见javadoc。）NONE,READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE</span>
<span class="token key attr-name">defaultTransactionIsolation</span><span class="token punctuation">=</span><span class="token value attr-value">READ_UNCOMMITTED</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbcp<span class="token punctuation">.</span></span><span class="token class-name">BasicDataSource</span>
<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">InputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Properties</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JdbcUtils_DBCP</span> <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">DateSource</span> dataSource <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    
    <span class="token keyword">static</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token class-name">InputStream</span> in <span class="token operator">=</span> <span class="token class-name">JdbcUtils_DBCP</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">"dbcpconfig.properties"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            properties<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//创建数据源</span>
            dataSource <span class="token operator">=</span> <span class="token class-name">BasicDataSourceFactory</span><span class="token punctuation">.</span><span class="token function">createDataSource</span><span class="token punctuation">(</span>properties<span class="token punctuation">)</span><span class="token punctuation">;</span>
            
        <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
        	e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    
    <span class="token comment">//获取连接</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Connection</span> <span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">{</span>
    	<span class="token keyword">return</span> dataSource<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//从数据源获取连接</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//释放连接资源</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">release</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">,</span> <span class="token class-name">Statement</span> statement<span class="token punctuation">,</span> <span class="token class-name">ResultSet</span> resultSet<span class="token punctuation">)</span><span class="token punctuation">{</span>
    	<span class="token keyword">if</span><span class="token punctuation">(</span>resultset <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                resultSet<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>statement <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                statement<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>connection <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                connection<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
            
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="c3p0" tabindex="-1"><a class="header-anchor" href="#c3p0" aria-hidden="true">#</a> C3P0</h3>
<p>需要的jar包</p>
<p><code v-pre>c3p0-0.9.5.5</code>\<code v-pre>mchange-commons-java-0.2.19</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>c3p0-config</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>default-config</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClass<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>com.mysql.jdbc.Driver<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbcUrl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>jdbc:mysql://localhost/std<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>root<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>root<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>initialPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxIdleTime<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>30<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>100<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>minPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxStatements<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>200<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>default-config</span><span class="token punctuation">></span></span>

  <span class="token comment">&lt;!-- This app is massive! --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>named-config</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>intergalactoApp<span class="token punctuation">"</span></span><span class="token punctuation">></span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>acquireIncrement<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>50<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>initialPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>100<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>minPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>50<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1000<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- intergalactoApp adopts a different approach to configuring statement caching --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxStatements<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxStatementsPerConnection<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- he's important, but there's only one of him --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>user-overrides</span> <span class="token attr-name">user</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>master-of-the-universe<span class="token punctuation">"</span></span><span class="token punctuation">></span></span> 
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>acquireIncrement<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>initialPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>minPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxPoolSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>maxStatementsPerConnection<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>50<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>user-overrides</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>named-config</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>c3p0-config</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>dbcp<span class="token punctuation">.</span></span><span class="token class-name">BasicDataSource</span>
<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">InputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Properties</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JdbcUtils_C3P0</span> <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">DateSource</span> dataSource <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    
    <span class="token keyword">static</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
                   <span class="token comment">//配置</span>
            dataSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ComboPooledDataSource</span><span class="token punctuation">(</span>configName<span class="token operator">:</span><span class="token string">"default-config"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            
        <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
        	e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    
    <span class="token comment">//获取连接</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Connection</span> <span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">{</span>
    	<span class="token keyword">return</span> dataSource<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//从数据源获取连接</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">//释放连接资源</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">release</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">,</span> <span class="token class-name">Statement</span> statement<span class="token punctuation">,</span> <span class="token class-name">ResultSet</span> resultSet<span class="token punctuation">)</span><span class="token punctuation">{</span>
    	<span class="token keyword">if</span><span class="token punctuation">(</span>resultset <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                resultSet<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>statement <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                statement<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>connection <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                connection<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
            
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>整理不易，转载请注明出处。</p>
</div></template>


