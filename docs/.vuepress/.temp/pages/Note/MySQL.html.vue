<template><div><h1 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> MySQL</h1>
<h2 id="初识mysql" tabindex="-1"><a class="header-anchor" href="#初识mysql" aria-hidden="true">#</a> 初识MySQL</h2>
<p>JavaEE: 企业级java开发 web</p>
<p>前端(页面: 展示,数据!)</p>
<p>后台(连接点: 连接数据库JDBC, 链接前端(控制,控制视图调转和给前端传递数据))</p>
<p>数据库(存数据, Txt, Excel, Word)</p>
<h2 id="数据库简介" tabindex="-1"><a class="header-anchor" href="#数据库简介" aria-hidden="true">#</a> 数据库简介</h2>
<p>数据库(DB, DataBase)</p>
<p>概念:数据仓库, <strong>软件</strong>, 安装在操作系统之上! SQL, 可以存储大量的数据</p>
<p>作用: 存储数据,管理数据</p>
<h2 id="数据库分类" tabindex="-1"><a class="header-anchor" href="#数据库分类" aria-hidden="true">#</a> 数据库分类</h2>
<h3 id="关系型数据库-sql" tabindex="-1"><a class="header-anchor" href="#关系型数据库-sql" aria-hidden="true">#</a> 关系型数据库(SQL)</h3>
<ul>
<li>MySQL, Oracle, Sql Server, DB2, SQLlite</li>
<li>通过表与表之间,行和列之间的关系进行数据的存储, 学员信息表, 考勤表, ....</li>
</ul>
<h3 id="非关系型数据库-nosql-not-only" tabindex="-1"><a class="header-anchor" href="#非关系型数据库-nosql-not-only" aria-hidden="true">#</a> 非关系型数据库(NoSQL- Not Only)</h3>
<ul>
<li>Redis, MongDB</li>
<li>非关系型数据库, 对象储存, 通过对象的自身的属性来决定</li>
</ul>
<h3 id="dbms数据库管理系统" tabindex="-1"><a class="header-anchor" href="#dbms数据库管理系统" aria-hidden="true">#</a> <u>DBMS数据库管理系统</u></h3>
<ul>
<li>数据库的管理软件, 科学有效的管理我们的数据.维护和获取数据;</li>
<li>MySQL,数据库管理系统</li>
</ul>
<h2 id="mysql简介" tabindex="-1"><a class="header-anchor" href="#mysql简介" aria-hidden="true">#</a> MySQL简介</h2>
<blockquote>
<p>SQL + NoSQL</p>
</blockquote>
<p>MySQL是一个<strong>关系型数据库管理系统</strong></p>
<p>前世:瑞典MySQL AB公司</p>
<p>今生:属于Oracle旗下产品</p>
<p>MySQL是最好的RDBMS(Relational Database Management System)应用软件之一</p>
<p>开源的数据库软件</p>
<p>体积小, 速度快, 总体拥有成本低, 招人成本低</p>
<p>中小型网站, 或大型网站,集群.</p>
<p><a href="https://www.mysql.com" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></p>
<ul>
<li>安装建议:
<ol>
<li>尽量不要安装exe(注册表难以清理)</li>
<li>尽可能压缩包安装~</li>
</ol>
</li>
</ul>
<h2 id="安装mysql" tabindex="-1"><a class="header-anchor" href="#安装mysql" aria-hidden="true">#</a> 安装MySQL</h2>
<p><strong>这里建议大家使用压缩版,安装快,方便.不复杂.</strong></p>
<h3 id="软件下载" tabindex="-1"><a class="header-anchor" href="#软件下载" aria-hidden="true">#</a> 软件下载</h3>
<p>mysql5.7 64位下载地址:</p>
<p>https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.19-winx64.zip</p>
<p>电脑是64位的就下载使用64位版本的！</p>
<h3 id="安装步骤" tabindex="-1"><a class="header-anchor" href="#安装步骤" aria-hidden="true">#</a> 安装步骤</h3>
<p>1、下载后得到zip压缩包.</p>
<p>2、解压到自己想要安装到的目录，本人解压到的是D:\Environment\mysql-5.7.19</p>
<p>3、添加环境变量：我的电脑-&gt;属性-&gt;高级-&gt;环境变量</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>选择PATH,在其后面添加: 你的mysql 安装文件下面的bin文件夹
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4、编辑 my.ini 文件 ,注意替换路径位置</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[mysqld]
basedir=D:\Program Files\mysql-5.7\
datadir=D:\Program Files\mysql-5.7\data\
port=3306
skip-grant-tables
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、启动管理员模式下的CMD，并将路径切换</p>
<p>至mysql下的bin目录，然后输入<code v-pre>mysqld –install </code>(安装mysql)</p>
<p>6、再输入  <code v-pre>mysqld --initialize-insecure --user=mysql</code> 初始化数据文件</p>
<p>7、然后再次启动mysql<code v-pre>net start mysql</code> 然后用命令 <code v-pre>mysql –u root –p</code> 进入mysql管理界面（密码可为空）</p>
<p>8、进入界面后更改root密码</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>update mysql.user set authentication_string=password('123456') where user='root' and Host = 'localhost';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>9、刷新权限</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>flush privileges;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>10、修改 my.ini文件删除最后一句skip-grant-tables</p>
<p>11、重启mysql即可正常使用</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>net stop mysql
net start mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>12、连接上测试出现以下结果就安装好了</p>
<p><img src="/images/2020-09-23-23-22-27.png" alt=""></p>
<p>一步步去做 , 理论上是没有任何问题的 .</p>
<p>如果您以前装过,现在需要重装,一定要将环境清理干净 .</p>
<p>好了,到这里大家都装好了,因为刚接触,所以我们先不学习命令.</p>
<h2 id="推荐工具-sqlyog" tabindex="-1"><a class="header-anchor" href="#推荐工具-sqlyog" aria-hidden="true">#</a> 推荐工具 : <strong>SQLyog</strong></h2>
<p>即便有了可视化工具,可是基本的DOS命名大家还是要记住!</p>
<p>可手动操作,管理MySQL数据库的软件工具</p>
<p>特点 : 简洁 , 易用 , 图形化</p>
<p><img src="/images/2020-09-23-23-24-23.png" alt=""></p>
<p><img src="/images/2020-09-23-23-25-07.png" alt=""></p>
<p>使用SQLyog管理工具自己完成以下操作 :</p>
<ul>
<li>
<p>连接本地MySQL数据库</p>
</li>
<li>
<p>新建MySchool数据库</p>
</li>
<li>
<ul>
<li>字段</li>
<li>GradeID : int(11) , Primary Key (pk)</li>
<li>GradeName : varchar(50)</li>
<li>数据库名称MySchool</li>
<li>新建数据库表(grade)</li>
</ul>
</li>
</ul>
<p>在历史记录中可以看到相对应的数据库操作的语句 .</p>
<h2 id="连接数据库" tabindex="-1"><a class="header-anchor" href="#连接数据库" aria-hidden="true">#</a> 连接数据库</h2>
<p>打开MySQL命令窗口</p>
<ul>
<li>在DOS命令行窗口进入 <strong>安装目录\mysql\bin</strong></li>
<li>可设置环境变量，设置了环境变量，可以在任意目录打开！</li>
</ul>
<p><strong>连接数据库语句 :</strong> mysql -h 服务器主机地址 -u 用户名 -p 用户密码</p>
<blockquote>
<p>注意 : -p后面不能加空格,否则会被当做密码的内容,导致登录失败 !</p>
</blockquote>
<p><code v-pre>sc delete mysql  //清空mysql服务,不建议轻易使用</code></p>
<h2 id="基本数据库操作命令" tabindex="-1"><a class="header-anchor" href="#基本数据库操作命令" aria-hidden="true">#</a> 基本数据库操作命令</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">update</span> <span class="token keyword">user</span> <span class="token keyword">set</span> password<span class="token operator">=</span>password<span class="token punctuation">(</span><span class="token string">'123456'</span><span class="token punctuation">)</span><span class="token keyword">where</span> <span class="token keyword">user</span><span class="token operator">=</span><span class="token string">'root'</span><span class="token punctuation">;</span> 
<span class="token keyword">update</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span> <span class="token keyword">set</span> authentication_string<span class="token operator">=</span>password<span class="token punctuation">(</span><span class="token string">'123456'</span><span class="token punctuation">)</span><span class="token keyword">where</span> <span class="token keyword">user</span> <span class="token operator">=</span><span class="token string">'root'</span> <span class="token operator">and</span> Host <span class="token operator">=</span> <span class="token string">'localhost'</span><span class="token punctuation">;</span>
<span class="token comment">--修改密码</span>
flush <span class="token keyword">privileges</span><span class="token punctuation">;</span><span class="token comment">-- 刷新数据库权限</span>
<span class="token comment">----------------------------------------------------------</span>
<span class="token comment">--所有的语句都用;结尾</span>
<span class="token keyword">show</span> <span class="token keyword">databases</span><span class="token punctuation">;</span> <span class="token comment">--显示所有数据库</span>
<span class="token keyword">use</span> dbname；<span class="token comment">--打开某个数据库</span>

<span class="token keyword">show</span> <span class="token keyword">tables</span><span class="token punctuation">;</span> <span class="token comment">--显示数据库mysql中所有的表</span>
<span class="token keyword">describe</span> <span class="token keyword">user</span><span class="token punctuation">;</span> <span class="token comment">--显示表mysql数据库中user表的列信息</span>

<span class="token keyword">create</span> <span class="token keyword">database</span> name<span class="token punctuation">;</span> <span class="token comment">--创建数据库</span>

<span class="token keyword">exit</span><span class="token punctuation">;</span> <span class="token comment">--退出Mysql</span>
? 命令关键词 : <span class="token comment">--寻求帮助</span>

 <span class="token comment">-- 表示注释</span>
<span class="token comment">/*
多行注释
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结构化查询语句分类" tabindex="-1"><a class="header-anchor" href="#结构化查询语句分类" aria-hidden="true">#</a> 结构化查询语句分类</h2>
<table>
<thead>
<tr>
<th style="text-align:center">名称</th>
<th style="text-align:center">解释</th>
<th style="text-align:center">命令</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">数据定义语言-DDL:Data Definition Language</td>
<td style="text-align:center">定义和管理数据对象,如数据库,数据表等</td>
<td style="text-align:center">CREATE、 DROP, ALTER</td>
</tr>
<tr>
<td style="text-align:center">数据操纵语言-DML:Data Manipulation Language</td>
<td style="text-align:center">用于操作数据库对象中所包含的数据</td>
<td style="text-align:center">INSERT, UPDATE, DELETE</td>
</tr>
<tr>
<td style="text-align:center">数据查询语言-DQL:Data Query Language</td>
<td style="text-align:center">用于查询数据库数据</td>
<td style="text-align:center">SELECT</td>
</tr>
<tr>
<td style="text-align:center">数据控制语言-DCL:Data Control Language</td>
<td style="text-align:center">用于管理数据库的语言,包括管理权限及数据更改</td>
<td style="text-align:center">GRANT, commit. rollback</td>
</tr>
</tbody>
</table>
<h2 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作" aria-hidden="true">#</a> 数据库操作</h2>
<p>操作数据库&gt;操作数据库中的表&gt;操作数据库中表的数据</p>
<p>SQL大小写不敏感</p>
<h3 id="命令行操作数据库" tabindex="-1"><a class="header-anchor" href="#命令行操作数据库" aria-hidden="true">#</a> 命令行操作数据库</h3>
<ol>
<li>创建数据库 :</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">database</span> <span class="token punctuation">[</span><span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span><span class="token punctuation">]</span> 数据库名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>删除数据库 :</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">drop</span> <span class="token keyword">database</span> <span class="token punctuation">[</span><span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">]</span> 数据库名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>查看数据库 :</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">databases</span><span class="token punctuation">;</span> <span class="token comment">--查看所有数据库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>使用数据库 :</li>
</ol>
<ul>
<li>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">use</span> <span class="token identifier"><span class="token punctuation">`</span>数据库名<span class="token punctuation">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<blockquote>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">--如果你的表名或者字段名为特殊字段,,需要用**tab**键上的``符号框起来.例如:</span>
<span class="token keyword">USE</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p><u>对比工具操作数据库</u></p>
<p><strong>学习方法</strong>：</p>
<ul>
<li>对照SQLyog工具自动生成的语句学习</li>
<li>固定语法中的单词需要记忆</li>
<li><img src="/images/2020-09-26-18-17-22.png" alt=""></li>
</ul>
<h2 id="创建数据表" tabindex="-1"><a class="header-anchor" href="#创建数据表" aria-hidden="true">#</a> 创建数据表</h2>
<p>属于DDL的一种，语法 :</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token punctuation">[</span><span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span><span class="token punctuation">]</span> <span class="token identifier"><span class="token punctuation">`</span>表名<span class="token punctuation">`</span></span><span class="token punctuation">(</span>
   <span class="token string">'字段名1'</span> 列类型 <span class="token punctuation">[</span>属性<span class="token punctuation">]</span><span class="token punctuation">[</span>索引<span class="token punctuation">]</span><span class="token punctuation">[</span>注释<span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token string">'字段名2'</span> 列类型 <span class="token punctuation">[</span>属性<span class="token punctuation">]</span><span class="token punctuation">[</span>索引<span class="token punctuation">]</span><span class="token punctuation">[</span>注释<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">#...</span>
   <span class="token string">'字段名n'</span> 列类型 <span class="token punctuation">[</span>属性<span class="token punctuation">]</span><span class="token punctuation">[</span>索引<span class="token punctuation">]</span><span class="token punctuation">[</span>注释<span class="token punctuation">]</span>
<span class="token punctuation">)</span><span class="token punctuation">[</span>表类型<span class="token punctuation">]</span><span class="token punctuation">[</span>表字符集<span class="token punctuation">]</span><span class="token punctuation">[</span>注释<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明 :</strong> 反引号用于区别MySQL保留字与普通字符而引入的 (键盘esc下面的键).</p>
<h2 id="数据值和列类型" tabindex="-1"><a class="header-anchor" href="#数据值和列类型" aria-hidden="true">#</a> 数据值和列类型</h2>
<p>列类型 : 规定数据库中该列存放的数据类型</p>
<h3 id="数值类型" tabindex="-1"><a class="header-anchor" href="#数值类型" aria-hidden="true">#</a> 数值类型</h3>
<p><img src="/images/2020-09-26-18-57-05.png" alt=""></p>
<blockquote>
<p><strong>金融计算时,一般使用decimal</strong></p>
</blockquote>
<h3 id="字符串类型" tabindex="-1"><a class="header-anchor" href="#字符串类型" aria-hidden="true">#</a> 字符串类型</h3>
<p><img src="/images/2020-09-26-18-59-33.png" alt=""></p>
<blockquote>
<ul>
<li>
<p>变量名常用varchar,长文档用text</p>
</li>
<li>
<p>int(3): 3表示显示长度,与本身int长度无关,<strong>最大显示宽度为255</strong></p>
</li>
<li>
<p>verchar(3): 3直接影响数据库存储长度</p>
</li>
</ul>
</blockquote>
<h3 id="日期和时间型数值类型" tabindex="-1"><a class="header-anchor" href="#日期和时间型数值类型" aria-hidden="true">#</a> 日期和时间型数值类型</h3>
<p><img src="/images/2020-09-26-19-03-29.png" alt=""></p>
<h3 id="null值" tabindex="-1"><a class="header-anchor" href="#null值" aria-hidden="true">#</a> NULL值</h3>
<ul>
<li>理解为 &quot;没有值&quot; 或 &quot;未知值&quot;</li>
<li><strong>不要用NULL进行算术运算</strong> , 结果仍为NULL</li>
</ul>
<h2 id="数据字段属性" tabindex="-1"><a class="header-anchor" href="#数据字段属性" aria-hidden="true">#</a> <u>数据字段属性</u></h2>
<h3 id="unsigned" tabindex="-1"><a class="header-anchor" href="#unsigned" aria-hidden="true">#</a> UnSigned</h3>
<ul>
<li>无符号的</li>
<li>声明该数据列不允许负数 .</li>
</ul>
<h3 id="zerofill" tabindex="-1"><a class="header-anchor" href="#zerofill" aria-hidden="true">#</a> ZEROFILL</h3>
<ul>
<li>0填充的</li>
<li>不足位数的用0来填充 , 如int(3),   <code v-pre>5---&gt;005</code></li>
</ul>
<h3 id="auto-increment" tabindex="-1"><a class="header-anchor" href="#auto-increment" aria-hidden="true">#</a> Auto_InCrement</h3>
<ul>
<li>
<p>自动增长的 , 每添加一条数据 , 自动在上一个记录数上加 1(默认)</p>
</li>
<li>
<p>通常用于设置<strong>主键</strong> , 且为整数类型</p>
</li>
<li>
<p>可定义起始值和步长</p>
</li>
<li>
<ul>
<li>当前表设置步长(AUTO_INCREMENT=100) : 只影响当前表</li>
<li>SET @@auto_increment_increment=5 ; 影响所有使用自增的表(全局)</li>
</ul>
</li>
</ul>
<h3 id="null-和-not-null" tabindex="-1"><a class="header-anchor" href="#null-和-not-null" aria-hidden="true">#</a> NULL 和 NOT NULL</h3>
<ul>
<li>默认为NULL , 即没有插入该列的数值</li>
<li>如果设置为NOT NULL , 则该列必须有值</li>
</ul>
<h3 id="default" tabindex="-1"><a class="header-anchor" href="#default" aria-hidden="true">#</a> DEFAULT</h3>
<ul>
<li>默认的</li>
<li>用于设置默认值</li>
<li>例如,性别字段,默认为&quot;男&quot; , 否则为 &quot;女&quot; ; 若无指定该列的值 , 则默认值为&quot;男&quot;的值</li>
</ul>
<blockquote>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">/*
扩展:
alibaba standard
*/</span>
id <span class="token comment">--主键</span>
<span class="token identifier"><span class="token punctuation">`</span>version<span class="token punctuation">`</span></span> <span class="token comment">--乐观锁</span>
is_delete <span class="token comment">--伪删除</span>
gmt_create <span class="token comment">--创建时间</span>
gmt_update <span class="token comment">--修改时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 目标 : 创建一个school数据库</span>
<span class="token comment">-- 创建学生表(列,字段)</span>
<span class="token comment">-- 学号int 登录密码varchar(20) 姓名,性别varchar(2),出生日期(datatime),家庭住址,email</span>
<span class="token comment">-- 创建表之前 , 一定要先选择数据库</span>

<span class="token comment">--主要英文状态(), 表的 名称 和 字段尽量	`` 括起来</span>
<span class="token comment">--AOTO_INCREMENT 自增</span>
<span class="token comment">--字符串用单引号括起来</span>
<span class="token comment">--所有语句后加, 最后一项不加</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>student<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
<span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">'学号'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'匿名'</span> <span class="token keyword">COMMENT</span> <span class="token string">'姓名'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>pwd<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'123456'</span> <span class="token keyword">COMMENT</span> <span class="token string">'密码'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>sex<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'男'</span> <span class="token keyword">COMMENT</span> <span class="token string">'性别'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>birthday<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'生日'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>address<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'地址'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>email<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'邮箱'</span><span class="token punctuation">,</span>
<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8

<span class="token comment">-- 查看数据库的定义</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>格式</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABlE</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span> <span class="token identifier"><span class="token punctuation">`</span>表名<span class="token punctuation">`</span></span><span class="token punctuation">(</span>
	<span class="token identifier"><span class="token punctuation">`</span>字段名<span class="token punctuation">`</span></span> 列类型 <span class="token punctuation">[</span>属性<span class="token punctuation">]</span> <span class="token punctuation">[</span>索引<span class="token punctuation">]</span> <span class="token punctuation">[</span>注释<span class="token punctuation">]</span><span class="token punctuation">,</span>   
   <span class="token identifier"><span class="token punctuation">`</span>字段名<span class="token punctuation">`</span></span> 列类型 <span class="token punctuation">[</span>属性<span class="token punctuation">]</span> <span class="token punctuation">[</span>索引<span class="token punctuation">]</span> <span class="token punctuation">[</span>注释<span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
   <span class="token identifier"><span class="token punctuation">`</span>字段名<span class="token punctuation">`</span></span> 列类型 <span class="token punctuation">[</span>属性<span class="token punctuation">]</span> <span class="token punctuation">[</span>索引<span class="token punctuation">]</span> <span class="token punctuation">[</span>注释<span class="token punctuation">]</span>
<span class="token punctuation">)</span><span class="token punctuation">[</span>表的类型<span class="token punctuation">]</span><span class="token punctuation">[</span>字符集类型<span class="token punctuation">]</span><span class="token punctuation">[</span>注释<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h3 id="查看数据库定义" tabindex="-1"><a class="header-anchor" href="#查看数据库定义" aria-hidden="true">#</a> 查看数据库定义</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">--查看数据库的定义</span>
<span class="token keyword">SHOW</span> <span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> school<span class="token punctuation">;</span>

<span class="token comment">-- 查看数据表的定义</span>
<span class="token keyword">SHOW</span> <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> student<span class="token punctuation">;</span>

<span class="token comment">-- 显示表结构</span>
<span class="token keyword">DESC</span> student<span class="token punctuation">;</span>  

<span class="token comment">-- 设置严格检查模式(不能容错了)</span>
<span class="token keyword">SET</span> sql_mode<span class="token operator">=</span><span class="token string">'STRICT_TRANS_TABLES'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据表的类型" tabindex="-1"><a class="header-anchor" href="#数据表的类型" aria-hidden="true">#</a> 数据表的类型</h2>
<h3 id="设置数据表的类型" tabindex="-1"><a class="header-anchor" href="#设置数据表的类型" aria-hidden="true">#</a> 设置数据表的类型</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> 表名<span class="token punctuation">(</span>
   <span class="token comment">-- 省略一些代码</span>
   <span class="token comment">-- Mysql注释</span>
   <span class="token comment">-- 1. # 单行注释</span>
   <span class="token comment">-- 2. /*...*/ 多行注释</span>
<span class="token punctuation">)</span><span class="token keyword">ENGINE</span> <span class="token operator">=</span> MyISAM <span class="token punctuation">(</span><span class="token operator">or</span> <span class="token keyword">InnoDB</span><span class="token punctuation">)</span>

<span class="token comment">-- 查看mysql所支持的引擎类型 (表类型)</span>
<span class="token keyword">SHOW</span> ENGINES<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MySQL的数据表的类型 : <strong>MyISAM</strong> , <strong>InnoDB</strong> , HEAP , BOB , CSV等...</p>
<blockquote>
<p>默认使用InnoDB,早年使用MyISAM</p>
</blockquote>
<p>常见的 MyISAM 与 InnoDB 类型：</p>
<p><img src="/images/2020-09-26-21-54-04.png" alt=""></p>
<p>经验 ( 适用场合 )  :</p>
<ul>
<li>适用 MyISAM : 节约空间, 速度较快</li>
<li>适用 InnoDB : 安全性 , 事务处理及多用户操作数据表</li>
</ul>
<h3 id="数据表的存储位置" tabindex="-1"><a class="header-anchor" href="#数据表的存储位置" aria-hidden="true">#</a> 数据表的存储位置</h3>
<ul>
<li>
<p>MySQL数据表以文件方式存放在磁盘中</p>
</li>
<li>
<ul>
<li>包括表文件 , 数据文件 , 以及数据库的选项文件</li>
<li>位置 : Mysql安装目录\data\下存放数据表 . 目录名对应数据库名 , 该目录下文件名对应数据表 .</li>
</ul>
</li>
<li>
<p>注意 :</p>
</li>
<li>
<ul>
<li>
<p>* . frm -- 表结构定义文件</p>
</li>
<li>
<p>* . MYD -- 数据文件 ( data )</p>
</li>
<li>
<p>* . MYI -- 索引文件 ( index )</p>
</li>
<li>
<p>InnoDB类型数据表只有一个 *.frm文件 , <strong>以及上一级目录的ibdata1文件</strong></p>
</li>
<li>
<p>MyISAM类型数据表对应三个文件 :</p>
</li>
</ul>
<p><img src="/images/2020-09-26-21-56-47.png" alt=""></p>
</li>
</ul>
<h3 id="设置数据表字符集" tabindex="-1"><a class="header-anchor" href="#设置数据表字符集" aria-hidden="true">#</a> 设置数据表字符集</h3>
<p>我们可为数据库,数据表,数据列设定不同的字符集，设定方法 :</p>
<ul>
<li>
<p>创建时通过命令来设置 , 如 :<code v-pre> CREATE TABLE 表名()CHARSET = utf8;</code></p>
<blockquote>
<p>不设置的话,使用默认字符集编码,不支持中文.</p>
</blockquote>
</li>
<li>
<p>如无设定 , 则根据MySQL数据库配置文件 my.ini 中的参数设定</p>
</li>
</ul>
<h3 id="修改数据库" tabindex="-1"><a class="header-anchor" href="#修改数据库" aria-hidden="true">#</a> 修改数据库</h3>
<h4 id="修改表-alter-table" tabindex="-1"><a class="header-anchor" href="#修改表-alter-table" aria-hidden="true">#</a> 修改表 ( ALTER TABLE )</h4>
<h5 id="修改表名" tabindex="-1"><a class="header-anchor" href="#修改表名" aria-hidden="true">#</a> 修改表名 :</h5>
<blockquote>
<p>ALTER TABLE 旧表名 RENAME AS 新表名</p>
</blockquote>
<h5 id="添加字段" tabindex="-1"><a class="header-anchor" href="#添加字段" aria-hidden="true">#</a> 添加字段 :</h5>
<blockquote>
<p>ALTER TABLE 表名 ADD字段名 列属性[属性]</p>
</blockquote>
<h5 id="修改字段" tabindex="-1"><a class="header-anchor" href="#修改字段" aria-hidden="true">#</a> 修改字段 :</h5>
<ul>
<li>
<h6 id="修改约束" tabindex="-1"><a class="header-anchor" href="#修改约束" aria-hidden="true">#</a> 修改约束:</h6>
</li>
</ul>
<blockquote>
<p>ALTER TABLE 表名 MODIFY 字段名 列类型[属性]</p>
</blockquote>
<ul>
<li>
<h6 id="修改字段名" tabindex="-1"><a class="header-anchor" href="#修改字段名" aria-hidden="true">#</a> 修改字段名:</h6>
</li>
</ul>
<blockquote>
<p>ALTER TABLE 表名 CHANGE 旧字段名 新字段名 列属性[属性]</p>
</blockquote>
<h5 id="删除字段" tabindex="-1"><a class="header-anchor" href="#删除字段" aria-hidden="true">#</a> 删除字段 :</h5>
<p>ALTER TABLE 表名</p>
<p>DROP 字段名</p>
<h5 id="删除数据表" tabindex="-1"><a class="header-anchor" href="#删除数据表" aria-hidden="true">#</a> 删除数据表</h5>
<p>语法：DROP TABLE [IF EXISTS] 表名</p>
<ul>
<li>IF EXISTS为可选 , 判断是否存在该数据表</li>
<li>如删除不存在的数据表会抛出错误</li>
</ul>
<blockquote>
<p><strong>所有的创建和删除操作尽量加上判断,以免报错~</strong></p>
</blockquote>
<h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>1. 可用反引号（`）为标识符（库名、表名、字段名、索引、别名）包裹，以避免与关键字重名！中文也可以作为标识符！

2. 每个库目录存在一个保存当前数据库的选项文件db.opt。

3. 注释：
  单行注释 # 注释内容
  多行注释 /* 注释内容 */
  单行注释 -- 注释内容      
  (标准SQL注释风格，要求双破折号后加一空格符（空格、TAB、换行等）)
   
4. 模式通配符：
  _   任意单个字符
  %   任意多个字符，甚至包括零字符
  单引号需要进行转义 \'
   
5. CMD命令行内的语句结束符可以为 ";", "\G", "\g"，仅影响显示结果。其他地方还是用分号结束。delimiter 可修改当前对话的语句结束符。

6. SQL对大小写不敏感 （关键字）

7. 清除已有语句：\c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql数据管理" tabindex="-1"><a class="header-anchor" href="#mysql数据管理" aria-hidden="true">#</a> MySQL数据管理</h2>
<h3 id="外键" tabindex="-1"><a class="header-anchor" href="#外键" aria-hidden="true">#</a> 外键</h3>
<h4 id="外键概念" tabindex="-1"><a class="header-anchor" href="#外键概念" aria-hidden="true">#</a> 外键概念</h4>
<p>  如果公共关键字在一个关系中是主关键字，那么这个公共关键字被称为另一个关系的外键。由此可见，外键表示了两个关系之间的相关联系。以另一个关系的外键作主关键字的表被称为<strong>主表</strong>，具有此外键的表被称为主表的<strong>从表</strong>。</p>
<p>  在实际操作中，将一个表的值放入第二个表来表示关联，所使用的值是第一个表的主键值(在必要时可包括复合主键值)。此时，第二个表中保存这些值的属性称为外键(<strong>foreign key</strong>)。</p>
<h4 id="外键作用" tabindex="-1"><a class="header-anchor" href="#外键作用" aria-hidden="true">#</a> 外键作用</h4>
<p>保持数据<strong>一致性</strong>，<strong>完整性</strong>，主要目的是控制存储在外键表中的数据,<strong>约束</strong>。使两张表形成关联，外键只能引用外表中的列的值或使用空值。</p>
<h4 id="创建外键" tabindex="-1"><a class="header-anchor" href="#创建外键" aria-hidden="true">#</a> 创建外键</h4>
<h5 id="建表时指定外键约束" tabindex="-1"><a class="header-anchor" href="#建表时指定外键约束" aria-hidden="true">#</a> 建表时指定外键约束</h5>
<p>格式</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">constraint</span> <span class="token identifier"><span class="token punctuation">`</span>FK_外键名<span class="token punctuation">`</span></span> <span class="token keyword">foreign</span> <span class="token keyword">key</span> <span class="token punctuation">(</span><span class="token string">'从表id'</span><span class="token punctuation">)</span> <span class="token keyword">references</span> <span class="token identifier"><span class="token punctuation">`</span>主表名<span class="token punctuation">`</span></span><span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>主表id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建外键的方式一 : 创建子表同时创建外键</span>

<span class="token comment">-- 年级表 (id\年级名称)</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>grade<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
<span class="token identifier"><span class="token punctuation">`</span>gradeid<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">'年级ID'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>gradename<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'年级名称'</span><span class="token punctuation">,</span>
<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gradeid<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8

<span class="token comment">-- 学生信息表 (学号,姓名,性别,年级,手机,地址,出生日期,邮箱,身份证号)</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>student<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
<span class="token identifier"><span class="token punctuation">`</span>studentno<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'学号'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>studentname<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'匿名'</span> <span class="token keyword">COMMENT</span><span class="token string">'姓名'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>sex<span class="token punctuation">`</span></span> <span class="token keyword">TINYINT</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">'1'</span> <span class="token keyword">COMMENT</span> <span class="token string">'性别'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>gradeid<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'年级'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>phoneNum<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'手机'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>address<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'地址'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>borndate<span class="token punctuation">`</span></span> <span class="token keyword">DATETIME</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'生日'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>email<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'邮箱'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>idCard<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'身份证号'</span><span class="token punctuation">,</span>
<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>studentno<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>FK_gradeid<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gradeid<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token keyword">CONSTRAINT</span> <span class="token identifier"><span class="token punctuation">`</span>FK_gradeid<span class="token punctuation">`</span></span> <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gradeid<span class="token punctuation">`</span></span><span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> <span class="token identifier"><span class="token punctuation">`</span>grade<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gradeid<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="建表后修改" tabindex="-1"><a class="header-anchor" href="#建表后修改" aria-hidden="true">#</a> 建表后修改</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建外键方式二 : 创建子表完毕后,修改子表添加外键</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>student<span class="token punctuation">`</span></span>
<span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> <span class="token identifier"><span class="token punctuation">`</span>FK_gradeid<span class="token punctuation">`</span></span> <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gradeid<span class="token punctuation">`</span></span><span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> <span class="token identifier"><span class="token punctuation">`</span>grade<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>gradeid<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除外键" tabindex="-1"><a class="header-anchor" href="#删除外键" aria-hidden="true">#</a> 删除外键</h4>
<p>操作：删除 grade 表，发现报错</p>
<p><img src="/images/2020-09-28-08-55-56.png" alt=""></p>
<p><strong>注意</strong> : 删除具有主外键关系的表时 , 要先删子表 , 后删主表</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>-- 删除外键
ALTER TABLE student DROP FOREIGN KEY FK_gradeid;
-- 发现执行完上面的,索引还在,所以还要删除索引
-- 注:这个索引是建立外键的时候默认生成的
ALTER TABLE student DROP INDEX FK_gradeid;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>阿里规范:</p>
<p>不得使用外键级联,一切外键概念必须在应用层解决</p>
</blockquote>
<h2 id="dml语言" tabindex="-1"><a class="header-anchor" href="#dml语言" aria-hidden="true">#</a> DML语言</h2>
<p><strong>数据库意义</strong> ： 数据存储、数据管理</p>
<h3 id="管理数据库数据方法" tabindex="-1"><a class="header-anchor" href="#管理数据库数据方法" aria-hidden="true">#</a> 管理数据库数据方法：</h3>
<ul>
<li>通过SQLyog等管理工具管理数据库数据</li>
<li>通过<strong>DML语句</strong>管理数据库数据</li>
</ul>
<h3 id="dml语言-数据操作语言" tabindex="-1"><a class="header-anchor" href="#dml语言-数据操作语言" aria-hidden="true">#</a> DML语言  ：数据操作语言</h3>
<ul>
<li>
<p>用于操作数据库对象中所包含的数据</p>
</li>
<li>
<p>包括 :</p>
</li>
<li>
<ul>
<li>INSERT (添加数据语句)</li>
<li>UPDATE (更新数据语句)</li>
<li>DELETE (删除数据语句)</li>
</ul>
</li>
</ul>
<h3 id="添加数据" tabindex="-1"><a class="header-anchor" href="#添加数据" aria-hidden="true">#</a> 添加数据</h3>
<h4 id="insert命令" tabindex="-1"><a class="header-anchor" href="#insert命令" aria-hidden="true">#</a> INSERT命令</h4>
<h5 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法：</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> 表名<span class="token punctuation">[</span><span class="token punctuation">(</span>字段<span class="token number">1</span><span class="token punctuation">,</span>字段<span class="token number">2</span><span class="token punctuation">,</span>字段<span class="token number">3</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'值1'</span><span class="token punctuation">,</span><span class="token string">'值2'</span><span class="token punctuation">,</span><span class="token string">'值3'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意 :</h5>
<ul>
<li>字段或值之间用英文逗号隔开 .</li>
<li>' 字段1,字段2...' 该部分可省略 , 但添加的值务必与表结构,数据列,顺序相对应,且数量一致 .</li>
<li>可同时插入多条数据 , values 后用英文逗号隔开 .</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 使用语句如何增加语句?</span>
<span class="token comment">-- 语法 : INSERT INTO 表名[(字段1,字段2,字段3,...)] VALUES('值1','值2','值3')</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> grade<span class="token punctuation">(</span>gradename<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'大一'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 主键自增,那能否省略呢?</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> grade <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'大二'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 结果:INSERT INTO grade VALUE ('大二') 错误代码：1136</span>
<span class="token comment">-- 其实缺省是可以的,但需要表名后缺省的属性名和values后的数据一一对应,且缺省的属性值允许为空或有默认值:</span>

<span class="token keyword">Column</span> count doesn<span class="token punctuation">`</span>t <span class="token keyword">match</span> <span class="token keyword">value</span> count at <span class="token keyword">row</span> <span class="token number">1</span>

<span class="token comment">-- 结论:'字段1,字段2...'该部分可省略 , 但添加的值务必与表结构,数据列,顺序相对应,且数量一致.</span>

<span class="token comment">-- 一次插入多条数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> grade<span class="token punctuation">(</span>gradename<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'大三'</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">'大四'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="练习题目" tabindex="-1"><a class="header-anchor" href="#练习题目" aria-hidden="true">#</a> 练习题目</h5>
<p>自己使用INSERT语句为课程表subject添加数据,使用到外键.</p>
<h3 id="修改数据" tabindex="-1"><a class="header-anchor" href="#修改数据" aria-hidden="true">#</a> 修改数据</h3>
<h4 id="update命令" tabindex="-1"><a class="header-anchor" href="#update命令" aria-hidden="true">#</a> update命令</h4>
<h5 id="语法-1" tabindex="-1"><a class="header-anchor" href="#语法-1" aria-hidden="true">#</a> 语法：</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">UPDATE</span> 表名 <span class="token keyword">SET</span> column_name<span class="token operator">=</span><span class="token keyword">value</span> <span class="token punctuation">[</span><span class="token punctuation">,</span>column_name2<span class="token operator">=</span>value2<span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">WHERE</span> condition<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="注意-1" tabindex="-1"><a class="header-anchor" href="#注意-1" aria-hidden="true">#</a> <strong>注意 :</strong></h5>
<ul>
<li>column_name 为要更改的数据列,尽量带上``</li>
<li>value 为修改后的数据 , 可以为变量 (如CURRENT_TIME), 具体指表达式或者嵌套的SELECT结果</li>
<li>condition 为筛选条件 , <strong>如不指定则修改该表的所有列数据</strong></li>
</ul>
<h4 id="where条件子句" tabindex="-1"><a class="header-anchor" href="#where条件子句" aria-hidden="true">#</a> where条件子句</h4>
<p>可以简单的理解为 : 有条件地从表中筛选数据</p>
<h6 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> <img src="/images/2020-09-28-13-52-54.png" alt=""></h6>
<h5 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试：</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 修改年级信息</span>
<span class="token keyword">UPDATE</span> grade <span class="token keyword">SET</span> gradename <span class="token operator">=</span> <span class="token string">'高中'</span> <span class="token keyword">WHERE</span> gradeid <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除数据" tabindex="-1"><a class="header-anchor" href="#删除数据" aria-hidden="true">#</a> 删除数据</h3>
<h4 id="delete命令" tabindex="-1"><a class="header-anchor" href="#delete命令" aria-hidden="true">#</a> DELETE命令</h4>
<h5 id="语法-2" tabindex="-1"><a class="header-anchor" href="#语法-2" aria-hidden="true">#</a> 语法：</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> 表名 <span class="token punctuation">[</span><span class="token keyword">WHERE</span> condition<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="注意-condition为筛选条件-如不指定则删除该表的所有列数据" tabindex="-1"><a class="header-anchor" href="#注意-condition为筛选条件-如不指定则删除该表的所有列数据" aria-hidden="true">#</a> <strong>注意：condition为筛选条件 , 如不指定则删除该表的所有列数据</strong></h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 删除最后一个数据</span>
<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> grade <span class="token keyword">WHERE</span> gradeid <span class="token operator">=</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="truncate命令" tabindex="-1"><a class="header-anchor" href="#truncate命令" aria-hidden="true">#</a> TRUNCATE命令</h4>
<h5 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用：</h5>
<p>用于完全清空表数据 , 但表结构 , 索引 , 约束等不变 ;</p>
<h5 id="语法-3" tabindex="-1"><a class="header-anchor" href="#语法-3" aria-hidden="true">#</a> 语法：</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">TRUNCATE</span> <span class="token punctuation">[</span><span class="token keyword">TABLE</span><span class="token punctuation">]</span> table_name<span class="token punctuation">;</span>

<span class="token comment">-- 清空年级表</span>
<span class="token keyword">TRUNCATE</span> grade
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="注意-区别于delete命令" tabindex="-1"><a class="header-anchor" href="#注意-区别于delete命令" aria-hidden="true">#</a> <strong>注意：区别于DELETE命令</strong></h5>
<ul>
<li>
<p>相同 : 都能删除数据 , 不删除表结构 , 但TRUNCATE速度更快</p>
</li>
<li>
<p>不同 :</p>
<ul>
<li>使用TRUNCATE TABLE 重新设置AUTO_INCREMENT计数器</li>
<li>使用TRUNCATE TABLE不会对事务有影响 （事务后面会说）</li>
</ul>
</li>
</ul>
<h5 id="测试-1" tabindex="-1"><a class="header-anchor" href="#测试-1" aria-hidden="true">#</a> 测试：</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建一个测试表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>test<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
<span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>coll<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8

<span class="token comment">-- 插入几个测试数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> test<span class="token punctuation">(</span>coll<span class="token punctuation">)</span> <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'row1'</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">'row2'</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">'row3'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 删除表数据(不带where条件的delete)</span>
<span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> test<span class="token punctuation">;</span>
<span class="token comment">-- 结论:如不指定Where则删除该表的所有列数据,自增当前值依然从原来基础上进行,会记录日志.</span>

<span class="token comment">-- 删除表数据(truncate)</span>
<span class="token keyword">TRUNCATE</span> <span class="token keyword">TABLE</span> test<span class="token punctuation">;</span>
<span class="token comment">-- 结论:truncate删除数据,自增当前值会恢复到初始值重新开始;不会记录日志.</span>

<span class="token comment">-- 同样使用DELETE清空不同引擎的数据库表数据.重启数据库服务后</span>
<span class="token comment">-- InnoDB : 自增列从初始值重新开始 (因为是存储在内存中,断电即失)</span>
<span class="token comment">-- MyISAM : 自增列依然从上一个自增数据基础上开始 (存在文件中,不会丢失)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dql语言" tabindex="-1"><a class="header-anchor" href="#dql语言" aria-hidden="true">#</a> <u>DQL语言</u></h2>
<p><strong>DQL( Data Query Language 数据查询语言 )</strong></p>
<ul>
<li>查询数据库数据 , 如<strong>SELECT</strong>语句</li>
<li>简单的单表查询或多表的复杂查询和嵌套查询</li>
<li>是数据库语言中<strong>最核心,最重要</strong>的语句</li>
<li>使用频率最高的语句</li>
</ul>
<h3 id="select语法" tabindex="-1"><a class="header-anchor" href="#select语法" aria-hidden="true">#</a> SELECT语法</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token punctuation">[</span><span class="token keyword">ALL</span> <span class="token operator">|</span> <span class="token keyword">DISTINCT</span><span class="token punctuation">]</span>
{<span class="token operator">*</span> <span class="token operator">|</span> <span class="token keyword">table</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token operator">|</span> <span class="token punctuation">[</span><span class="token keyword">table</span><span class="token punctuation">.</span>field1<span class="token punctuation">[</span><span class="token keyword">as</span> alias1<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token keyword">table</span><span class="token punctuation">.</span>field2<span class="token punctuation">[</span><span class="token keyword">as</span> alias2<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">]</span>}
<span class="token keyword">FROM</span> table_name <span class="token punctuation">[</span><span class="token keyword">as</span> table_alias<span class="token punctuation">]</span>
  <span class="token punctuation">[</span><span class="token keyword">left</span> <span class="token operator">|</span> <span class="token keyword">right</span> <span class="token operator">|</span> <span class="token keyword">inner</span> <span class="token keyword">join</span> table_name2<span class="token punctuation">]</span>  <span class="token comment">-- 联合查询</span>
  <span class="token punctuation">[</span><span class="token keyword">WHERE</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>  <span class="token comment">-- 指定结果需满足的条件</span>
  <span class="token punctuation">[</span><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>  <span class="token comment">-- 指定结果按照哪几个字段来分组</span>
  <span class="token punctuation">[</span><span class="token keyword">HAVING</span><span class="token punctuation">]</span>  <span class="token comment">-- 过滤分组的记录必须满足的次要条件</span>
  <span class="token punctuation">[</span><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>  <span class="token comment">-- 指定查询记录按一个或多个条件排序</span>
  <span class="token punctuation">[</span><span class="token keyword">LIMIT</span> {<span class="token punctuation">[</span><span class="token keyword">offset</span><span class="token punctuation">,</span><span class="token punctuation">]</span>row_count <span class="token operator">|</span> row_countOFFSET <span class="token keyword">offset</span>}<span class="token punctuation">]</span><span class="token punctuation">;</span>
   <span class="token comment">-- 指定查询的记录从哪条至哪条</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注意 : [ ] 括号代表可选的 , { }括号代表必选得</strong></p>
</blockquote>
<h3 id="指定查询字段" tabindex="-1"><a class="header-anchor" href="#指定查询字段" aria-hidden="true">#</a> 指定查询字段</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 查询表中所有的数据列结果 , 采用 **" \* "** 符号; 但是效率低，不推荐 .</span>

<span class="token comment">-- 查询所有学生信息</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> student<span class="token punctuation">;</span>

<span class="token comment">-- 查询指定列(学号 , 姓名)</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentname <span class="token keyword">FROM</span> student<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="as-子句作为别名" tabindex="-1"><a class="header-anchor" href="#as-子句作为别名" aria-hidden="true">#</a> AS 子句作为别名</h3>
<h4 id="作用-1" tabindex="-1"><a class="header-anchor" href="#作用-1" aria-hidden="true">#</a> 作用：</h4>
<ul>
<li>可给数据列取一个新别名</li>
<li>可给表取一个新别名</li>
<li>可把经计算或总结的结果用另一个新名称来代替</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 这里是为列取别名(当然as关键词可以省略)</span>
<span class="token keyword">SELECT</span> studentno <span class="token keyword">AS</span> 学号<span class="token punctuation">,</span>studentname <span class="token keyword">AS</span> 姓名 <span class="token keyword">FROM</span> student<span class="token punctuation">;</span>

<span class="token comment">-- 使用as也可以为表取别名</span>
<span class="token keyword">SELECT</span> studentno <span class="token keyword">AS</span> 学号<span class="token punctuation">,</span>studentname <span class="token keyword">AS</span> 姓名 <span class="token keyword">FROM</span> student <span class="token keyword">AS</span> s<span class="token punctuation">;</span>

<span class="token comment">-- 使用as,为查询结果取一个新名字</span>
<span class="token comment">-- CONCAT()函数拼接字符串</span>
<span class="token keyword">SELECT</span> CONCAT<span class="token punctuation">(</span><span class="token string">'姓名:'</span><span class="token punctuation">,</span>studentname<span class="token punctuation">)</span> <span class="token keyword">AS</span> 新姓名 <span class="token keyword">FROM</span> student<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="distinct关键字的使用" tabindex="-1"><a class="header-anchor" href="#distinct关键字的使用" aria-hidden="true">#</a> DISTINCT关键字的使用</h3>
<h4 id="作用-2" tabindex="-1"><a class="header-anchor" href="#作用-2" aria-hidden="true">#</a> 作用 :</h4>
<p>去掉SELECT查询返回的记录结果中重复的记录 ( 返回所有列的值都相同 ) , 只返回一条</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- # 查看哪些同学参加了考试(学号) 去除重复项</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> result<span class="token punctuation">;</span> <span class="token comment">-- 查看考试成绩</span>
<span class="token keyword">SELECT</span> studentno <span class="token keyword">FROM</span> result<span class="token punctuation">;</span> <span class="token comment">-- 查看哪些同学参加了考试</span>
<span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> studentno <span class="token keyword">FROM</span> result<span class="token punctuation">;</span> <span class="token comment">-- 了解:DISTINCT 去除重复项 , (默认是ALL)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用表达式的列" tabindex="-1"><a class="header-anchor" href="#使用表达式的列" aria-hidden="true">#</a> 使用表达式的列</h3>
<h4 id="数据库中的表达式" tabindex="-1"><a class="header-anchor" href="#数据库中的表达式" aria-hidden="true">#</a> 数据库中的表达式 :</h4>
<p>一般由文本值 , 列值 , NULL , 函数和操作符等组成</p>
<h4 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景 :</h4>
<ul>
<li>
<p>SELECT语句返回结果列中使用</p>
</li>
<li>
<p>SELECT语句中的ORDER BY , HAVING等子句中使用</p>
</li>
<li>
<p>DML语句中的 where 条件语句中使用表达式</p>
</li>
<li>
<p>避免SQL返回结果中包含 ' . ' , ' * ' 和括号等干扰开发语言程序.</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- selcet查询中可以使用表达式</span>
<span class="token keyword">SELECT</span> VERSION<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">-- 查询系统版本	(函数)</span>
<span class="token keyword">SELECT</span> <span class="token number">100</span><span class="token operator">*</span><span class="token number">34</span><span class="token operator">+</span><span class="token number">6</span> <span class="token keyword">AS</span> 结果 <span class="token comment">-- 用来计算	(表达式)</span>
<span class="token keyword">SELECT</span> @<span class="token variable">@auto_increment_increment</span> <span class="token comment">-- 查询自增步长	(变量)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>某行数据加一显示</p>
<p><code v-pre>SELECT StudentNo, StudentResult + 1 AS ‘提分后’ FROM result</code></p>
</li>
</ul>
<blockquote>
<p>可以查询数据库中的表达式: 文本值, 列, Nill, 函数, 计算表达式, 系统变量.. .</p>
</blockquote>
<h3 id="where条件语句" tabindex="-1"><a class="header-anchor" href="#where条件语句" aria-hidden="true">#</a> where条件语句</h3>
<h4 id="作用-3" tabindex="-1"><a class="header-anchor" href="#作用-3" aria-hidden="true">#</a> 作用：</h4>
<p>用于检索数据表中 符合条件 的记录</p>
<p>搜索条件可由一个或多个逻辑表达式组成 , 结果一般为真或假.</p>
<h4 id="逻辑操作符" tabindex="-1"><a class="header-anchor" href="#逻辑操作符" aria-hidden="true">#</a> 逻辑操作符</h4>
<table>
<thead>
<tr>
<th style="text-align:center">操作符名称</th>
<th style="text-align:center">语法</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">AND 或 &amp;&amp;</td>
<td style="text-align:center">a AND b 或 a &amp;&amp; b</td>
<td style="text-align:center">逻辑与,同时为真时才为真</td>
</tr>
<tr>
<td style="text-align:center">OR 或 ||</td>
<td style="text-align:center">a OR b 或 a || b</td>
<td style="text-align:center">逻辑或,只要一个为真,则结果为真</td>
</tr>
<tr>
<td style="text-align:center">NOT 或 !</td>
<td style="text-align:center">NOT a 或 !a</td>
<td style="text-align:center">逻辑非,若操作数为加,则结果为真</td>
</tr>
</tbody>
</table>
<h4 id="测试-2" tabindex="-1"><a class="header-anchor" href="#测试-2" aria-hidden="true">#</a> 测试</h4>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 满足条件的查询(where)</span>
<span class="token keyword">SELECT</span> Studentno<span class="token punctuation">,</span>StudentResult <span class="token keyword">FROM</span> result<span class="token punctuation">;</span>

<span class="token comment">-- 查询考试成绩在95-100之间的</span>
<span class="token keyword">SELECT</span> Studentno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> result
<span class="token keyword">WHERE</span> StudentResult<span class="token operator">>=</span><span class="token number">95</span> <span class="token operator">AND</span> StudentResult<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span>

<span class="token comment">-- AND也可以写成 &amp;&amp;</span>
<span class="token keyword">SELECT</span> Studentno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> result
<span class="token keyword">WHERE</span> StudentResult<span class="token operator">>=</span><span class="token number">95</span> <span class="token operator">&amp;&amp;</span> StudentResult<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span>

<span class="token comment">-- 模糊查询(对应的词:精确查询)</span>
<span class="token keyword">SELECT</span> Studentno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> result
<span class="token keyword">WHERE</span> StudentResult <span class="token operator">BETWEEN</span> <span class="token number">95</span> <span class="token operator">AND</span> <span class="token number">100</span><span class="token punctuation">;</span>

<span class="token comment">-- 除了1000号同学,要其他同学的成绩</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentresult
<span class="token keyword">FROM</span> result
<span class="token keyword">WHERE</span> studentno<span class="token operator">!=</span><span class="token number">1000</span><span class="token punctuation">;</span>

<span class="token comment">-- 使用NOT</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentresult
<span class="token keyword">FROM</span> result
<span class="token keyword">WHERE</span> <span class="token operator">NOT</span> studentno<span class="token operator">=</span><span class="token number">1000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模糊查询-比较操作符" tabindex="-1"><a class="header-anchor" href="#模糊查询-比较操作符" aria-hidden="true">#</a> 模糊查询 ：比较操作符</h3>
<table>
<thead>
<tr>
<th style="text-align:center">操作符名称</th>
<th style="text-align:center">语法</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">IS NULL</td>
<td style="text-align:center">A IS NULL</td>
<td style="text-align:center">若操作符为NULL,则结果为真</td>
</tr>
<tr>
<td style="text-align:center">IS NOT NULL</td>
<td style="text-align:center">A IS NOT NULL</td>
<td style="text-align:center">若操作符不为NULL,则结果为真</td>
</tr>
<tr>
<td style="text-align:center">BETWEEN</td>
<td style="text-align:center">A BETWEEN B AND C</td>
<td style="text-align:center">若A范围在B与C之间,则结果为真</td>
</tr>
<tr>
<td style="text-align:center"><strong>LIKE</strong></td>
<td style="text-align:center"><strong>A LIKE B</strong></td>
<td style="text-align:center"><strong>SQL模式匹配, 若A匹配B,则结果为真</strong></td>
</tr>
<tr>
<td style="text-align:center"><strong>IN</strong></td>
<td style="text-align:center"><strong>A IN(A1, A2, A3, ...)</strong></td>
<td style="text-align:center"><strong>若A等于 A1, A2 ...中的某一个,则结果为真</strong></td>
</tr>
</tbody>
</table>
<blockquote>
<p>like结合使用的通配符 : % (代表0到任意个字符) _ (一个字符)</p>
<p>不能直接写=NULL , 这是代表错误的 , 用 is (not) null</p>
<p>空字符串不等于null</p>
</blockquote>
<h4 id="注意-2" tabindex="-1"><a class="header-anchor" href="#注意-2" aria-hidden="true">#</a> 注意：</h4>
<ul>
<li>数值数据类型的记录之间才能进行算术运算 ;</li>
<li>相同数据类型的数据之间才能进行比较 ;</li>
</ul>
<h4 id="测试-3" tabindex="-1"><a class="header-anchor" href="#测试-3" aria-hidden="true">#</a> 测试：</h4>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 模糊查询 between and \ like \ in \ null</span>

<span class="token comment">-- =============================================</span>
<span class="token comment">-- LIKE</span>
<span class="token comment">-- =============================================</span>
<span class="token comment">-- 查询姓刘的同学的学号及姓名</span>
<span class="token comment">-- like结合使用的通配符 : % (代表0到任意个字符) _ (一个字符)</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentname <span class="token keyword">FROM</span> student
<span class="token keyword">WHERE</span> studentname <span class="token operator">LIKE</span> <span class="token string">'刘%'</span><span class="token punctuation">;</span>

<span class="token comment">-- 查询姓刘的同学,后面只有一个字的</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentname <span class="token keyword">FROM</span> student
<span class="token keyword">WHERE</span> studentname <span class="token operator">LIKE</span> <span class="token string">'刘_'</span><span class="token punctuation">;</span>

<span class="token comment">-- 查询姓刘的同学,后面只有两个字的</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentname <span class="token keyword">FROM</span> student
<span class="token keyword">WHERE</span> studentname <span class="token operator">LIKE</span> <span class="token string">'刘__'</span><span class="token punctuation">;</span>

<span class="token comment">-- 查询姓名中含有 嘉 字的</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentname <span class="token keyword">FROM</span> student
<span class="token keyword">WHERE</span> studentname <span class="token operator">LIKE</span> <span class="token string">'%嘉%'</span><span class="token punctuation">;</span>

<span class="token comment">-- 查询姓名中含有特殊字符的需要使用转义符号 '\'</span>
<span class="token comment">-- 自定义转义符关键字: ESCAPE ':'</span>

<span class="token comment">-- =============================================</span>
<span class="token comment">-- IN</span>
<span class="token comment">-- =============================================</span>
<span class="token comment">-- 查询学号为1000,1001,1002的学生姓名</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentname <span class="token keyword">FROM</span> student
<span class="token keyword">WHERE</span> studentno <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span><span class="token number">1001</span><span class="token punctuation">,</span><span class="token number">1002</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 查询地址在北京,南京,河南洛阳的学生</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>address <span class="token keyword">FROM</span> student
<span class="token keyword">WHERE</span> address <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token string">'北京'</span><span class="token punctuation">,</span><span class="token string">'南京'</span><span class="token punctuation">,</span><span class="token string">'河南洛阳'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- =============================================</span>
<span class="token comment">-- NULL 空</span>
<span class="token comment">-- =============================================</span>
<span class="token comment">-- 查询出生日期没有填写的同学</span>
<span class="token comment">-- 不能直接写=NULL , 这是代表错误的 , 用 is null</span>
<span class="token keyword">SELECT</span> studentname <span class="token keyword">FROM</span> student
<span class="token keyword">WHERE</span> BornDate <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>

<span class="token comment">-- 查询出生日期填写的同学</span>
<span class="token keyword">SELECT</span> studentname <span class="token keyword">FROM</span> student
<span class="token keyword">WHERE</span> BornDate <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>

<span class="token comment">-- 查询没有写家庭住址的同学(空字符串不等于null)</span>
<span class="token keyword">SELECT</span> studentname <span class="token keyword">FROM</span> student
<span class="token keyword">WHERE</span> Address<span class="token operator">=</span><span class="token string">''</span> <span class="token operator">OR</span> Address <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="连接查询" tabindex="-1"><a class="header-anchor" href="#连接查询" aria-hidden="true">#</a> 连接查询</h3>
<h4 id="join-对比" tabindex="-1"><a class="header-anchor" href="#join-对比" aria-hidden="true">#</a> JOIN 对比</h4>
<table>
<thead>
<tr>
<th style="text-align:center">操作符名称</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">INNER JOIN</td>
<td style="text-align:center">如果表中有至少一个匹配,则返回行</td>
</tr>
<tr>
<td style="text-align:center">LEFT JOIN</td>
<td style="text-align:center">即使右表中没有匹配,也从左表中返回所有的行</td>
</tr>
<tr>
<td style="text-align:center">RIGHT JOIN</td>
<td style="text-align:center">即使左表中没有匹配,也从右表中返回所有的行</td>
</tr>
</tbody>
</table>
<h4 id="七种join" tabindex="-1"><a class="header-anchor" href="#七种join" aria-hidden="true">#</a> 七种Join</h4>
<p><img src="/images/2020-09-28-16-25-46.png" alt=""></p>
<h4 id="测试-4" tabindex="-1"><a class="header-anchor" href="#测试-4" aria-hidden="true">#</a> 测试</h4>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">/*
连接查询
   如需要多张数据表的数据进行查询,则可通过连接运算符实现多个查询
内连接 inner join
   查询两个表中的结果集中的交集
外连接 outer join
   左外连接 left join
       (以左表作为基准,右边表来一一匹配,匹配不上的,返回左表的记录,右表以NULL填充)
   右外连接 right join
       (以右表作为基准,左边表来一一匹配,匹配不上的,返回右表的记录,左表以NULL填充)
       
等值连接和非等值连接

自连接
*/</span>

<span class="token comment">-- 查询参加了考试的同学信息(学号,学生姓名,科目编号,分数)</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> student<span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> result<span class="token punctuation">;</span>

<span class="token comment">/*思路:
(1):分析需求,确定查询的列来源于两个类,student result,连接查询
(2):确定使用哪种连接查询?(内连接)
确定交叉点(这两个表哪个数据是相同的)
判断的条件: 学生表中的studentNo = 成绩表 studentNo
*/</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s  <span class="token comment">-- 省略了取别名关键词as</span>
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno 

<span class="token comment">-- 右连接(也可实现)</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s
<span class="token keyword">RIGHT</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno

<span class="token comment">-- 等值连接(使用where)</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s <span class="token punctuation">,</span> result r
<span class="token keyword">WHERE</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno

<span class="token comment">-- 左连接 (查询了所有同学,不考试的也会查出来)</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno

<span class="token comment">-- 查一下缺考的同学(左连接应用场景)</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno
<span class="token keyword">WHERE</span> StudentResult <span class="token operator">IS</span> <span class="token boolean">NULL</span>

<span class="token comment">-- 思考题:查询参加了考试的同学信息(学号,学生姓名,科目名,分数)</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectname<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> sub
<span class="token keyword">ON</span> sub<span class="token punctuation">.</span>subjectno <span class="token operator">=</span> r<span class="token punctuation">.</span>subjectno
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>-- join (连接的表) on (判断条件)	连接查询</p>
<p>-- where 等值查询</p>
<p>在左连接分别使用on和where时:</p>
<ul>
<li><strong>on</strong> 条件是在生成临时表时使用的条件，它不管 <strong>on</strong> 中的条件是否为真，都会返回左边表中的记录。</li>
<li><strong>where</strong> 条件是在临时表生成好后，再对临时表进行过滤的条件。这时已经没有 <strong>left join</strong> 的含义（必须返回左边表的记录）了，条件不为真的就全部过滤掉。</li>
</ul>
</blockquote>
<h3 id="自连接" tabindex="-1"><a class="header-anchor" href="#自连接" aria-hidden="true">#</a> 自连接</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">/*
自连接
   数据表与自身进行连接

需求:从一个包含栏目ID , 栏目名称和父栏目ID的表中
    查询父栏目名称和其他子栏目名称
*/</span>

<span class="token comment">-- 创建一个表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>category<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
<span class="token identifier"><span class="token punctuation">`</span>categoryid<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">UNSIGNED</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">'主题id'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>pid<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'父id'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>categoryName<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'主题名字'</span><span class="token punctuation">,</span>
<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>categoryid<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">9</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8

<span class="token comment">-- 插入数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>category<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>categoryid<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>pid<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>categoryName<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'2'</span><span class="token punctuation">,</span><span class="token string">'1'</span><span class="token punctuation">,</span><span class="token string">'信息技术'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'3'</span><span class="token punctuation">,</span><span class="token string">'1'</span><span class="token punctuation">,</span><span class="token string">'软件开发'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'4'</span><span class="token punctuation">,</span><span class="token string">'3'</span><span class="token punctuation">,</span><span class="token string">'数据库'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'5'</span><span class="token punctuation">,</span><span class="token string">'1'</span><span class="token punctuation">,</span><span class="token string">'美术设计'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'6'</span><span class="token punctuation">,</span><span class="token string">'3'</span><span class="token punctuation">,</span><span class="token string">'web开发'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'7'</span><span class="token punctuation">,</span><span class="token string">'5'</span><span class="token punctuation">,</span><span class="token string">'ps技术'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">'8'</span><span class="token punctuation">,</span><span class="token string">'2'</span><span class="token punctuation">,</span><span class="token string">'办公信息'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 编写SQL语句,将栏目的父子关系呈现出来 (父栏目名称,子栏目名称)</span>
<span class="token comment">-- 核心思想:把一张表看成两张一模一样的表,然后将这两张表连接查询(自连接)</span>
<span class="token keyword">SELECT</span> a<span class="token punctuation">.</span>categoryName <span class="token keyword">AS</span> <span class="token string">'父栏目'</span><span class="token punctuation">,</span>b<span class="token punctuation">.</span>categoryName <span class="token keyword">AS</span> <span class="token string">'子栏目'</span>
<span class="token keyword">FROM</span> category <span class="token keyword">AS</span> a<span class="token punctuation">,</span>category <span class="token keyword">AS</span> b <span class="token comment">--自连接处</span>
<span class="token keyword">WHERE</span> a<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>categoryid<span class="token punctuation">`</span></span><span class="token operator">=</span>b<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>pid<span class="token punctuation">`</span></span>

<span class="token comment">-- 思考题:查询参加了考试的同学信息(学号,学生姓名,科目名,分数)</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectname<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> sub
<span class="token keyword">ON</span> sub<span class="token punctuation">.</span>subjectno <span class="token operator">=</span> r<span class="token punctuation">.</span>subjectno

<span class="token comment">-- 查询学员及所属的年级(学号,学生姓名,年级名)</span>
<span class="token keyword">SELECT</span> studentno <span class="token keyword">AS</span> 学号<span class="token punctuation">,</span>studentname <span class="token keyword">AS</span> 学生姓名<span class="token punctuation">,</span>gradename <span class="token keyword">AS</span>年级名称
<span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> grade g
<span class="token keyword">ON</span> s<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>GradeId<span class="token punctuation">`</span></span> <span class="token operator">=</span> g<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>GradeID<span class="token punctuation">`</span></span>

<span class="token comment">-- 查询科目及所属的年级(科目名称,年级名称)</span>
<span class="token keyword">SELECT</span> subjectname <span class="token keyword">AS</span> 科目名称<span class="token punctuation">,</span>gradename <span class="token keyword">AS</span> 年级名称
<span class="token keyword">FROM</span> SUBJECT sub
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> grade g
<span class="token keyword">ON</span> sub<span class="token punctuation">.</span>gradeid <span class="token operator">=</span> g<span class="token punctuation">.</span>gradeid

<span class="token comment">-- 查询 数据库结构-1 的所有考试结果(学号 学生姓名 科目名称 成绩)</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectname<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> sub
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>subjectno <span class="token operator">=</span> sub<span class="token punctuation">.</span>subjectno
<span class="token keyword">WHERE</span> subjectname<span class="token operator">=</span><span class="token string">'数据库结构-1'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="排序和分页" tabindex="-1"><a class="header-anchor" href="#排序和分页" aria-hidden="true">#</a> 排序和分页</h3>
<h4 id="排序" tabindex="-1"><a class="header-anchor" href="#排序" aria-hidden="true">#</a> 排序</h4>
<h5 id="语法-4" tabindex="-1"><a class="header-anchor" href="#语法-4" aria-hidden="true">#</a> 语法</h5>
<ul>
<li>ORDER BY
ORDER BY 语句用于根据指定的列对结果集进行排序。</li>
</ul>
<ul>
<li>ORDER BY
默认按照ASC升序对记录进行排序。
如果您希望按照降序对记录进行排序，可以使用 DESC 关键字。</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>   
<span class="token comment">-- 查询 数据库结构-1 的所有考试结果(学号 学生姓名 科目名称 成绩)</span>
<span class="token comment">-- 按成绩降序排序</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectname<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> sub
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>subjectno <span class="token operator">=</span> sub<span class="token punctuation">.</span>subjectno
<span class="token keyword">WHERE</span> subjectname<span class="token operator">=</span><span class="token string">'数据库结构-1'</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> StudentResult <span class="token keyword">DESC</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="分页" tabindex="-1"><a class="header-anchor" href="#分页" aria-hidden="true">#</a> 分页</h4>
<h5 id="语法-5" tabindex="-1"><a class="header-anchor" href="#语法-5" aria-hidden="true">#</a> 语法:</h5>
<p><code v-pre>SELECT * FROM table LIMIT [offset,] rows | rows OFFSET offset</code></p>
<blockquote>
<p>好处 : (用户体验,网络传输,查询压力)</p>
</blockquote>
<p>limit 	起始页, 页面的大小.</p>
<p>推导:
第一页 : <code v-pre>limit 0,5</code>
第二页 : <code v-pre>limit 5,5</code>
第三页 : <code v-pre>limit 10,5</code>
......
第N页 : <code v-pre>limit (pageNo-1)*pageSize,pageSize</code>
[pageNo:页码,pageSize:单页面显示条数]</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 每页显示5条数据</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectname<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> sub
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>subjectno <span class="token operator">=</span> sub<span class="token punctuation">.</span>subjectno
<span class="token keyword">WHERE</span> subjectname<span class="token operator">=</span><span class="token string">'数据库结构-1'</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> StudentResult <span class="token keyword">DESC</span> <span class="token punctuation">,</span> studentno
<span class="token keyword">LIMIT</span> <span class="token number">0</span><span class="token punctuation">,</span><span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 查询 JAVA第一学年 课程成绩前10名并且分数大于80的学生信息(学号,姓名,课程名,分数)</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname<span class="token punctuation">,</span>subjectname<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>studentno <span class="token operator">=</span> s<span class="token punctuation">.</span>studentno
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> sub
<span class="token keyword">ON</span> r<span class="token punctuation">.</span>subjectno <span class="token operator">=</span> sub<span class="token punctuation">.</span>subjectno
<span class="token keyword">WHERE</span> subjectname<span class="token operator">=</span><span class="token string">'JAVA第一学年'</span> <span class="token operator">AND</span> StudentResult <span class="token operator">>=</span> <span class="token number">80</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> StudentResult <span class="token keyword">DESC</span>
<span class="token keyword">LIMIT</span> <span class="token number">0</span><span class="token punctuation">,</span><span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子查询" tabindex="-1"><a class="header-anchor" href="#子查询" aria-hidden="true">#</a> 子查询</h3>
<blockquote>
<p>什么是子查询?</p>
</blockquote>
<ul>
<li>在查询语句中的WHERE条件子句中,又嵌套了另一个查询语句</li>
<li>嵌套查询可由多个子查询组成,求解的方式是由里及外;</li>
<li>子查询返回的结果一般都是集合,故而建议使用IN关键字;</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 查询 数据库结构-1 的所有考试结果(学号,科目编号,成绩),并且成绩降序排列</span>
<span class="token comment">-- 方法一:使用连接查询</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>r<span class="token punctuation">.</span>subjectno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> result r
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> sub
<span class="token keyword">ON</span> r<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>SubjectNo<span class="token punctuation">`</span></span><span class="token operator">=</span>sub<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>SubjectNo<span class="token punctuation">`</span></span>
<span class="token keyword">WHERE</span> subjectname <span class="token operator">=</span> <span class="token string">'数据库结构-1'</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> studentresult <span class="token keyword">DESC</span><span class="token punctuation">;</span>

<span class="token comment">-- 方法二:使用子查询(执行顺序:由里及外)</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>subjectno<span class="token punctuation">,</span>StudentResult
<span class="token keyword">FROM</span> result
<span class="token keyword">WHERE</span> subjectno<span class="token operator">=</span><span class="token punctuation">(</span>
   <span class="token keyword">SELECT</span> subjectno <span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span>
   <span class="token keyword">WHERE</span> subjectname <span class="token operator">=</span> <span class="token string">'数据库结构-1'</span>
<span class="token punctuation">)</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> studentresult <span class="token keyword">DESC</span><span class="token punctuation">;</span>

<span class="token comment">-- 查询课程为 高等数学-2 且分数不小于80分的学生的学号和姓名</span>
<span class="token comment">-- 方法一:使用连接查询</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname
<span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r
<span class="token keyword">ON</span> s<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>StudentNo<span class="token punctuation">`</span></span> <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>StudentNo<span class="token punctuation">`</span></span>
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> sub
<span class="token keyword">ON</span> sub<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>SubjectNo<span class="token punctuation">`</span></span> <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>SubjectNo<span class="token punctuation">`</span></span>
<span class="token keyword">WHERE</span> subjectname <span class="token operator">=</span> <span class="token string">'高等数学-2'</span> <span class="token operator">AND</span> StudentResult<span class="token operator">>=</span><span class="token number">80</span>

<span class="token comment">-- 方法二:使用连接查询+子查询</span>
<span class="token comment">-- 分数不小于80分的学生的学号和姓名</span>
<span class="token keyword">SELECT</span> r<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname <span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r <span class="token keyword">ON</span> s<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>StudentNo<span class="token punctuation">`</span></span><span class="token operator">=</span>r<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>StudentNo<span class="token punctuation">`</span></span>
<span class="token keyword">WHERE</span> StudentResult<span class="token operator">>=</span><span class="token number">80</span>

<span class="token comment">-- 在上面SQL基础上,添加需求:课程为 高等数学-2</span>
<span class="token keyword">SELECT</span> r<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span>studentname <span class="token keyword">FROM</span> student s
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> result r <span class="token keyword">ON</span> s<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>StudentNo<span class="token punctuation">`</span></span><span class="token operator">=</span>r<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>StudentNo<span class="token punctuation">`</span></span>
<span class="token keyword">WHERE</span> StudentResult<span class="token operator">>=</span><span class="token number">80</span> <span class="token operator">AND</span> subjectno<span class="token operator">=</span><span class="token punctuation">(</span>
   <span class="token keyword">SELECT</span> subjectno <span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span>
   <span class="token keyword">WHERE</span> subjectname <span class="token operator">=</span> <span class="token string">'高等数学-2'</span>
<span class="token punctuation">)</span>

<span class="token comment">-- 方法三:使用子查询</span>
<span class="token comment">-- 分步写简单sql语句,然后将其嵌套起来</span>
<span class="token keyword">SELECT</span> studentno<span class="token punctuation">,</span>studentname <span class="token keyword">FROM</span> student <span class="token keyword">WHERE</span> studentno <span class="token operator">IN</span><span class="token punctuation">(</span>
   <span class="token keyword">SELECT</span> studentno <span class="token keyword">FROM</span> result <span class="token keyword">WHERE</span> StudentResult<span class="token operator">>=</span><span class="token number">80</span> ANDsubjectno<span class="token operator">=</span><span class="token punctuation">(</span>
       <span class="token keyword">SELECT</span> subjectno <span class="token keyword">FROM</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> <span class="token keyword">WHERE</span> subjectname <span class="token operator">=</span> <span class="token string">'高等数学-2'</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token comment">/*
练习题目:
   查 C语言-1 的前5名学生的成绩信息(学号,姓名,分数)
   使用子查询,查询郭靖同学所在的年级名称
*/</span>
<span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>studentno<span class="token punctuation">,</span> studntname<span class="token punctuation">,</span> StudentResult <span class="token keyword">From</span> 
student s <span class="token keyword">inner</span> <span class="token keyword">join</span> 
studentresult r <span class="token keyword">on</span> s<span class="token punctuation">.</span>studentno <span class="token operator">=</span> r<span class="token punctuation">.</span>studentno
<span class="token keyword">where</span> subjectno <span class="token operator">=</span> <span class="token punctuation">(</span>
	<span class="token keyword">select</span> subjectno <span class="token keyword">from</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span>
    <span class="token keyword">where</span> subjectname <span class="token operator">=</span> <span class="token identifier"><span class="token punctuation">`</span>C语言-1<span class="token punctuation">`</span></span>
<span class="token punctuation">)</span>
<span class="token keyword">order</span> <span class="token keyword">by</span> StudentResult <span class="token keyword">desc</span> 
<span class="token keyword">limit</span> <span class="token number">0</span><span class="token punctuation">,</span><span class="token number">5</span>

<span class="token keyword">SELECT</span> grade <span class="token keyword">from</span> grade
<span class="token keyword">where</span> studentno <span class="token operator">=</span> <span class="token punctuation">(</span>
<span class="token keyword">select</span> studentno <span class="token keyword">from</span> studnt <span class="token keyword">where</span> studentname <span class="token operator">=</span> <span class="token string">'郭靖'</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分组和过滤" tabindex="-1"><a class="header-anchor" href="#分组和过滤" aria-hidden="true">#</a> 分组和过滤</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token comment">-- 查询不同课程的平均分,最高分,最低分,平均分大于80</span>
 <span class="token comment">-- 前提:根据不同的课程进行分组</span>
 
 <span class="token keyword">SELECT</span> subjectname<span class="token punctuation">,</span><span class="token function">AVG</span><span class="token punctuation">(</span>studentresult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 平均分<span class="token punctuation">,</span><span class="token function">MAX</span><span class="token punctuation">(</span>StudentResult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 最高分<span class="token punctuation">,</span><span class="token function">MIN</span><span class="token punctuation">(</span>StudentResult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 最低分
 <span class="token keyword">FROM</span> result <span class="token keyword">AS</span> r
 <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> <span class="token keyword">AS</span> s
 <span class="token keyword">ON</span> r<span class="token punctuation">.</span>subjectno <span class="token operator">=</span> s<span class="token punctuation">.</span>subjectno
 <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> r<span class="token punctuation">.</span>subjectno
 <span class="token keyword">HAVING</span> 平均分<span class="token operator">></span><span class="token number">80</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<ul>
<li>
<p>where写在group by前面.</p>
</li>
<li>
<p>要是放在分组后面的筛选, 要使用HAVING..</p>
</li>
</ul>
<blockquote>
<p>因为having是从前面筛选的字段再筛选，而where是从数据表中的&gt;字段直接进行的筛选的</p>
</blockquote>
</blockquote>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> 去重 要查询的字段 <span class="token keyword">from</span> 表<span class="token punctuation">(</span>注意:表和字段可以取别名<span class="token punctuation">)</span>
xxx <span class="token keyword">join</span> 要连接的表 <span class="token keyword">on</span> 等值判断
<span class="token keyword">where</span><span class="token punctuation">(</span>具体的值<span class="token punctuation">,</span>子查询语句<span class="token punctuation">)</span>
<span class="token keyword">Group</span> <span class="token keyword">by</span><span class="token punctuation">(</span>通过哪个字段来分组<span class="token punctuation">)</span>
<span class="token keyword">Having</span> <span class="token punctuation">(</span>过滤分组后的信息<span class="token punctuation">,</span>条件和<span class="token keyword">where</span>是一样的<span class="token punctuation">,</span>位置不同<span class="token punctuation">)</span>
<span class="token keyword">order</span> <span class="token keyword">by</span><span class="token punctuation">(</span>通过那个字段排序<span class="token punctuation">)</span><span class="token punctuation">[</span>升序<span class="token operator">/</span>降序<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token keyword">asc</span> <span class="token operator">/</span> <span class="token keyword">desc</span><span class="token punctuation">]</span>
<span class="token keyword">limit</span> startIndex<span class="token punctuation">,</span> pagesize
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用函数" tabindex="-1"><a class="header-anchor" href="#常用函数" aria-hidden="true">#</a> 常用函数</h2>
<h3 id="常用数学运算" tabindex="-1"><a class="header-anchor" href="#常用数学运算" aria-hidden="true">#</a> 常用数学运算</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">SELECT</span> ABS<span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/*绝对值*/</span>
 <span class="token keyword">SELECT</span> CEILING<span class="token punctuation">(</span><span class="token number">9.4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*向上取整*/</span>
 <span class="token keyword">SELECT</span> FLOOR<span class="token punctuation">(</span><span class="token number">9.4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">/*向下取整*/</span>
 <span class="token keyword">SELECT</span> RAND<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/*随机数,返回一个0-1之间的随机数*/</span>
 <span class="token keyword">SELECT</span> SIGN<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*符号函数: 负数返回-1;正数返回1;0返回0*/</span>
  <span class="token function">format</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> d<span class="token punctuation">)</span>    <span class="token comment">-- 格式化千分位数值 format(1234567.456, 2) = 1,234,567.46</span>
 <span class="token function">round</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>        <span class="token comment">-- 四舍五入去整</span>
 <span class="token function">mod</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> n<span class="token punctuation">)</span>        <span class="token comment">-- m%n m mod n 求余 10%3=1</span>
 pi<span class="token punctuation">(</span><span class="token punctuation">)</span>            <span class="token comment">-- 获得圆周率</span>
 pow<span class="token punctuation">(</span>m<span class="token punctuation">,</span> n<span class="token punctuation">)</span>        <span class="token comment">-- m^n</span>
 sqrt<span class="token punctuation">(</span>x<span class="token punctuation">)</span>            <span class="token comment">-- 算术平方根</span>
 <span class="token keyword">truncate</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> d<span class="token punctuation">)</span>    <span class="token comment">-- 截取d位小数</span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串函数" tabindex="-1"><a class="header-anchor" href="#字符串函数" aria-hidden="true">#</a> 字符串函数</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">SELECT</span> CHAR_LENGTH<span class="token punctuation">(</span><span class="token string">'to be or not to be'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*返回字符串包含的字符数*/</span>
 <span class="token keyword">SELECT</span> CONCAT<span class="token punctuation">(</span><span class="token string">'人'</span><span class="token punctuation">,</span><span class="token string">'性'</span><span class="token punctuation">,</span><span class="token string">'复杂'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/*合并字符串,参数可以有多个*/</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">INSERT</span><span class="token punctuation">(</span><span class="token string">'我爱编程helloworld'</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">'超级热爱'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/*替换字符串,从某个位置开始替换某个长度*/</span>
 <span class="token keyword">SELECT</span> LOWER<span class="token punctuation">(</span><span class="token string">'Shane'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*小写*/</span>
 <span class="token keyword">SELECT</span> UPPER<span class="token punctuation">(</span><span class="token string">'Shane'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*大写*/</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">LEFT</span><span class="token punctuation">(</span><span class="token string">'hello,world'</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">/*从左边截取*/</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">RIGHT</span><span class="token punctuation">(</span><span class="token string">'hello,world'</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/*从右边截取*/</span>
 <span class="token keyword">SELECT</span> INSTR<span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">,</span><span class="token string">'e'</span><span class="token punctuation">)</span> <span class="token comment">/*返回第一次出现的子串的索引*/</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">REPLACE</span><span class="token punctuation">(</span><span class="token string">'shane说坚持就能成功'</span><span class="token punctuation">,</span><span class="token string">'坚持'</span><span class="token punctuation">,</span><span class="token string">'努力'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/*替换字符串*/</span>
 <span class="token keyword">SELECT</span> SUBSTR<span class="token punctuation">(</span><span class="token string">'shane说坚持就能成功'</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*截取字符串,开始和长度*/</span>
 <span class="token keyword">SELECT</span> REVERSE<span class="token punctuation">(</span><span class="token string">'shane说坚持就能成功'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*反转*/</span>
 
 <span class="token comment">-- 查询姓周的同学,改成邹</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">REPLACE</span><span class="token punctuation">(</span>studentname<span class="token punctuation">,</span><span class="token string">'周'</span><span class="token punctuation">,</span><span class="token string">'邹'</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> 新名字
 <span class="token keyword">FROM</span> student <span class="token keyword">WHERE</span> studentname <span class="token operator">LIKE</span> <span class="token string">'周%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="日期和时间函数" tabindex="-1"><a class="header-anchor" href="#日期和时间函数" aria-hidden="true">#</a> 日期和时间函数</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">SELECT</span> <span class="token keyword">CURRENT_DATE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">/*获取当前日期*/</span>
 <span class="token keyword">SELECT</span> CURDATE<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">/*获取当前日期*/</span>
 <span class="token keyword">SELECT</span> <span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">/*获取当前日期和时间*/</span>
 <span class="token keyword">SELECT</span> LOCALTIME<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">/*获取当前日期和时间*/</span>
 <span class="token keyword">SELECT</span> SYSDATE<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">/*获取当前日期和时间*/</span>
 
 <span class="token comment">-- 获取年月日,时分秒</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">YEAR</span><span class="token punctuation">(</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">MONTH</span><span class="token punctuation">(</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">DAY</span><span class="token punctuation">(</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">HOUR</span><span class="token punctuation">(</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">MINUTE</span><span class="token punctuation">(</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">SECOND</span><span class="token punctuation">(</span><span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                  
  <span class="token comment">-- 当前时间</span>
 <span class="token keyword">date</span><span class="token punctuation">(</span><span class="token string">'yyyy-mm-dd hh:ii:ss'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">-- 获取日期部分</span>
 <span class="token keyword">time</span><span class="token punctuation">(</span><span class="token string">'yyyy-mm-dd hh:ii:ss'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">-- 获取时间部分</span>
 date_format<span class="token punctuation">(</span><span class="token string">'yyyy-mm-dd hh:ii:ss'</span><span class="token punctuation">,</span> <span class="token string">'%d %y %a %d %m %b %j'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
 <span class="token comment">-- 格式化时间</span>
 unix_timestamp<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">-- 获得unix时间戳</span>
 from_unixtime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                <span class="token comment">-- 从时间戳获得时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="系统信息函数" tabindex="-1"><a class="header-anchor" href="#系统信息函数" aria-hidden="true">#</a> 系统信息函数</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">SELECT</span> VERSION<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">/*版本*/</span>
 <span class="token keyword">SELECT</span> <span class="token keyword">USER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">/*用户*/</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="聚合函数" tabindex="-1"><a class="header-anchor" href="#聚合函数" aria-hidden="true">#</a> 聚合函数</h3>
<table>
<thead>
<tr>
<th>函数名称</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>COUNT()</td>
<td>返回满足Select条件的记录总和数，如 select count(*) 【不建议使用 *，效率低】</td>
</tr>
<tr>
<td>SUM()</td>
<td>返回数字字段或表达式列作统计，返回一列的总和。</td>
</tr>
<tr>
<td>AVG()</td>
<td>通常为数值字段或表达列作统计，返回一列的平均值</td>
</tr>
<tr>
<td>MAX()</td>
<td>可以为数值字段，字符字段或表达式列作统计，返回最大的值。</td>
</tr>
<tr>
<td>MIN()</td>
<td>可以为数值字段，字符字段或表达式列作统计，返回最小的值。</td>
</tr>
</tbody>
</table>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token comment">-- 聚合函数</span>
 <span class="token comment">/*COUNT:非空的*/</span>
 <span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span>studentname<span class="token punctuation">)</span> <span class="token keyword">FROM</span> student<span class="token punctuation">;</span> <span class="token comment">--指定列(字段)</span>
 <span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> student<span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> student<span class="token punctuation">;</span>  <span class="token comment">/*推荐*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从含义上讲， 与 count(*) 都表示对全部数据行的查询。</p>
<ul>
<li>
<p>count(字段) 会统计该字段在表中出现的次数，忽略字段为null 的情况。即不统计字段为null 的记录。</p>
</li>
<li>
<p>count(*) 包括了所有的列，相当于行数，在统计结果的时候，包含字段为null 的记录；*</p>
</li>
<li>
<p>用1代表代码行，在统计结果的时候，包含字段为null 的记录 。</p>
</li>
</ul>
<blockquote>
<p>很多人认为执行的效率会比count(*)高，原因是count(*)会存在全表扫描，而可以针对一个字段进行查询。其实不然，和count(*)都会对全表进行扫描，统计所有记录的条数，包括那些为null的记录，因此，它们的效率可以说是相差无几。而count(字段)则与前两者不同，它会统计该字段不为null的记录条数。</p>
</blockquote>
<p><strong>下面它们之间的一些对比</strong>：</p>
<ol>
<li>效率排序: count(*) &gt; count(1) &gt; count(主键) &gt; count(字段)</li>
<li>实际差别不会很明显</li>
<li>count(*)与count(1)实际效率类似</li>
<li>count(*)被mysql优化后,不会读取具体的行数据,甚至比count(1)快一点</li>
</ol>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">SELECT</span> <span class="token function">SUM</span><span class="token punctuation">(</span>StudentResult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 总和 <span class="token keyword">FROM</span> result<span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>StudentResult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 平均分 <span class="token keyword">FROM</span> result<span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> <span class="token function">MAX</span><span class="token punctuation">(</span>StudentResult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 最高分 <span class="token keyword">FROM</span> result<span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> <span class="token function">MIN</span><span class="token punctuation">(</span>StudentResult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 最低分 <span class="token keyword">FROM</span> result<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目：</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token comment">-- 查询不同课程的平均分,最高分,最低分</span>
 <span class="token comment">-- 前提:根据不同的课程进行分组</span>
 
 <span class="token keyword">SELECT</span> subjectname<span class="token punctuation">,</span><span class="token function">AVG</span><span class="token punctuation">(</span>studentresult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 平均分<span class="token punctuation">,</span><span class="token function">MAX</span><span class="token punctuation">(</span>StudentResult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 最高分<span class="token punctuation">,</span><span class="token function">MIN</span><span class="token punctuation">(</span>StudentResult<span class="token punctuation">)</span> <span class="token keyword">AS</span> 最低分
 <span class="token keyword">FROM</span> result <span class="token keyword">AS</span> r
 <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> <span class="token identifier"><span class="token punctuation">`</span>subject<span class="token punctuation">`</span></span> <span class="token keyword">AS</span> s
 <span class="token keyword">ON</span> r<span class="token punctuation">.</span>subjectno <span class="token operator">=</span> s<span class="token punctuation">.</span>subjectno
 <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> r<span class="token punctuation">.</span>subjectno
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="md5-加密" tabindex="-1"><a class="header-anchor" href="#md5-加密" aria-hidden="true">#</a> MD5 加密</h2>
<h3 id="一、md5简介" tabindex="-1"><a class="header-anchor" href="#一、md5简介" aria-hidden="true">#</a> 一、MD5简介</h3>
<p>MD5即Message-Digest Algorithm 5（信息-摘要算法5），用于确保信息传输完整一致。是计算机广泛使用的杂凑算法之一（又译摘要算法、哈希算法），主流编程语言普遍已有MD5实现。将数据（如汉字）运算为另一固定长度值，是杂凑算法的基础原理，MD5的前身有MD2、MD3和MD4。</p>
<h3 id="二、实现数据加密" tabindex="-1"><a class="header-anchor" href="#二、实现数据加密" aria-hidden="true">#</a> 二、实现数据加密</h3>
<p>新建一个表 testmd5</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>testmd5<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>pwd<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
 <span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插入一些数据</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> testmd5 <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'shane'</span><span class="token punctuation">,</span><span class="token string">'123456'</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">'jack'</span><span class="token punctuation">,</span><span class="token string">'456789'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们要对pwd这一列数据进行加密，语法是：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">update</span> testmd5 <span class="token keyword">set</span> pwd <span class="token operator">=</span> md5<span class="token punctuation">(</span>pwd<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果单独对某个用户(如shane)的密码加密：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> testmd5 <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">'shane2'</span><span class="token punctuation">,</span><span class="token string">'123456'</span><span class="token punctuation">)</span>
 <span class="token keyword">update</span> testmd5 <span class="token keyword">set</span> pwd <span class="token operator">=</span> md5<span class="token punctuation">(</span>pwd<span class="token punctuation">)</span> <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">'shane2'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>插入新的数据自动加密</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> testmd5 <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">'shane3'</span><span class="token punctuation">,</span>md5<span class="token punctuation">(</span><span class="token string">'123456'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询登录用户信息（md5对比使用，查看用户输入加密后的密码进行比对）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> testmd5 <span class="token keyword">WHERE</span> <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span><span class="token operator">=</span><span class="token string">'shane'</span> <span class="token operator">AND</span> pwd<span class="token operator">=</span>MD5<span class="token punctuation">(</span><span class="token string">'123456'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h2>
<h3 id="什么是事务" tabindex="-1"><a class="header-anchor" href="#什么是事务" aria-hidden="true">#</a> 什么是事务</h3>
<ul>
<li>事务就是将一组SQL语句放在<strong>同一批次</strong>内去执行</li>
<li>如果一个SQL语句出错,则该批次内的所有SQL都将被取消执行</li>
<li>MySQL事务处理只支持InnoDB和BDB数据表类型</li>
</ul>
<h3 id="事务的acid原则" tabindex="-1"><a class="header-anchor" href="#事务的acid原则" aria-hidden="true">#</a> 事务的ACID原则</h3>
<h4 id="原子性-atomic" tabindex="-1"><a class="header-anchor" href="#原子性-atomic" aria-hidden="true">#</a> 原子性(Atomic)</h4>
<ul>
<li>整个事务中的所有操作，要么全部完成，要么全部不完成，不可能停滞在中间某个环节。事务在执行过程中发生错误，会被**回滚（ROLLBACK）**到事务开始前的状态，就像这个事务从来没有执行过一样。</li>
</ul>
<h4 id="一致性-consist" tabindex="-1"><a class="header-anchor" href="#一致性-consist" aria-hidden="true">#</a> 一致性(Consist)</h4>
<ul>
<li>
<p>事务前后的数据完整性要保证一致</p>
</li>
<li>
<p>一个事务可以封装状态改变（除非它是一个只读的）。事务必须始终保持系统处于一致的状态，不管在任何给定的时间并发事务有多少。也就是说：如果事务是并发多个，系统也必须如同串行事务一样操作。其主要特征是保护性和不变性(Preserving an Invariant)，以转账案例为例，假设有五个账户，每个账户余额是100元，那么五个账户总额是500元，如果在这个5个账户之间同时发生多个转账，无论并发多少个，比如在A与B账户之间转账5元，在C与D账户之间转账10元，在B与E之间转账15元，五个账户总额也应该还是500元，这就是保护性和不变性。</p>
</li>
</ul>
<h4 id="隔离性-isolated" tabindex="-1"><a class="header-anchor" href="#隔离性-isolated" aria-hidden="true">#</a> 隔离性(Isolated)</h4>
<ul>
<li>隔离状态执行事务，使它们好像是系统在给定时间内执行的唯一操作。如果有两个事务，运行在相同的时间内，执行相同的功能，事务的隔离性将确保每一事务在系统中认为只有该事务在使用系统。这种属性有时称为串行化，为了防止事务操作间的混淆，必须串行化或序列化请求，使得在同一时间仅有一个请求用于同一数据。</li>
</ul>
<h4 id="持久性-durable" tabindex="-1"><a class="header-anchor" href="#持久性-durable" aria-hidden="true">#</a> 持久性(Durable)</h4>
<ul>
<li>在事务完成以后，该事务对数据库所作的更改便持久的保存在数据库之中，并不会被回滚。</li>
<li>一旦提交,一定会持久化到数据库,不可逆</li>
</ul>
<h3 id="事务隔离导致的问题" tabindex="-1"><a class="header-anchor" href="#事务隔离导致的问题" aria-hidden="true">#</a> 事务隔离导致的问题</h3>
<h4 id="脏读" tabindex="-1"><a class="header-anchor" href="#脏读" aria-hidden="true">#</a> 脏读</h4>
<p>指一个事务读取了另外一个事务未提交的数据</p>
<h4 id="不可重复读" tabindex="-1"><a class="header-anchor" href="#不可重复读" aria-hidden="true">#</a> 不可重复读</h4>
<p>多次读取结果不一致</p>
<h4 id="幻读" tabindex="-1"><a class="header-anchor" href="#幻读" aria-hidden="true">#</a> 幻读</h4>
<p>指在一个事务内读取到了别的事务插入的数据,导致前后读取不一致</p>
<h3 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 使用set语句来改变自动提交模式</span>
<span class="token keyword">SET</span> autocommit <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>   <span class="token comment">/*关闭*/</span>
<span class="token keyword">SET</span> autocommit <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>   <span class="token comment">/*开启(默认值)*/</span>

<span class="token comment">-- 流程:先关闭自动提交</span>
<span class="token keyword">SET</span> autocommit <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
<span class="token comment">-- 开始一个事务,标记事务的起始点</span>
<span class="token keyword">START</span> <span class="token keyword">TRANSACTION</span>  

<span class="token comment">-- 提交一个事务给数据库(成功)</span>
<span class="token keyword">COMMIT</span>

<span class="token comment">-- 将事务回滚,数据回到本次事务的初始状态(失败)</span>
<span class="token keyword">ROLLBACK</span>

<span class="token comment">-- 还原MySQL数据库的自动提交</span>
<span class="token keyword">SET</span> autocommit <span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">-- 保存点</span>
<span class="token keyword">SAVEPOINT</span> 保存点名称 <span class="token comment">-- 设置一个事务保存点</span>
<span class="token keyword">ROLLBACK</span> <span class="token keyword">TO</span> <span class="token keyword">SAVEPOINT</span> 保存点名称 <span class="token comment">-- 回滚到保存点</span>
<span class="token keyword">RELEASE</span> <span class="token keyword">SAVEPOINT</span> 保存点名称 <span class="token comment">-- 删除保存点</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="注意-3" tabindex="-1"><a class="header-anchor" href="#注意-3" aria-hidden="true">#</a> 注意:</h4>
<ol>
<li>MySQL中默认是自动提交</li>
<li>使用事务时应先关闭自动提交</li>
<li>事务结束也应该开启自动提交</li>
</ol>
<h3 id="测试-5" tabindex="-1"><a class="header-anchor" href="#测试-5" aria-hidden="true">#</a> 测试</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">/*
课堂测试题目

A在线买一款价格为500元商品,网上银行转账.
A的银行卡余额为2000,然后给商家B支付500.
商家B一开始的银行卡余额为10000

创建数据库shop和创建表account并插入2条数据
*/</span>

<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token identifier"><span class="token punctuation">`</span>shop<span class="token punctuation">`</span></span><span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8 <span class="token keyword">COLLATE</span> utf8_general_ci<span class="token punctuation">;</span>
<span class="token keyword">USE</span> <span class="token identifier"><span class="token punctuation">`</span>shop<span class="token punctuation">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>account<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
<span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>cash<span class="token punctuation">`</span></span> <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> account <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>cash<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token string">'A'</span><span class="token punctuation">,</span><span class="token number">2000.00</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">'B'</span><span class="token punctuation">,</span><span class="token number">10000.00</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 转账实现</span>

<span class="token keyword">SET</span> autocommit <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">-- 关闭自动提交</span>

<span class="token keyword">START</span> <span class="token keyword">TRANSACTION</span><span class="token punctuation">;</span>  <span class="token comment">-- 开始一个事务,标记事务的起始点</span>
<span class="token keyword">UPDATE</span> account <span class="token keyword">SET</span> cash<span class="token operator">=</span>cash<span class="token operator">-</span><span class="token number">500</span> <span class="token keyword">WHERE</span> <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span><span class="token operator">=</span><span class="token string">'A'</span><span class="token punctuation">;</span>
<span class="token keyword">UPDATE</span> account <span class="token keyword">SET</span> cash<span class="token operator">=</span>cash<span class="token operator">+</span><span class="token number">500</span> <span class="token keyword">WHERE</span> <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span><span class="token operator">=</span><span class="token string">'B'</span><span class="token punctuation">;</span>

<span class="token keyword">COMMIT</span><span class="token punctuation">;</span> <span class="token comment">-- 提交事务</span>
<span class="token keyword">rollback</span><span class="token punctuation">;</span> <span class="token comment">-- 回滚</span>

<span class="token keyword">SET</span> autocommit <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">-- 恢复自动提交</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="索引-index" tabindex="-1"><a class="header-anchor" href="#索引-index" aria-hidden="true">#</a> 索引(index)</h2>
<blockquote>
<p>是帮助mysql高效获取数据的数据结构</p>
</blockquote>
<h3 id="索引的作用" tabindex="-1"><a class="header-anchor" href="#索引的作用" aria-hidden="true">#</a> 索引的作用</h3>
<ul>
<li>提高查询速度</li>
<li>确保数据的唯一性</li>
<li>可以加速表和表之间的连接 , 实现表与表之间的参照完整性</li>
<li>使用分组和排序子句进行数据检索时 , 可以显著减少分组和排序的时间</li>
<li>全文检索字段进行搜索优化.</li>
</ul>
<h3 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h3>
<ul>
<li>主键索引 (Primary Key)</li>
<li>唯一索引 (Unique)</li>
<li>常规索引 (Key/Index)</li>
<li>全文索引 (FullText)</li>
</ul>
<h4 id="主键索引-primary-key" tabindex="-1"><a class="header-anchor" href="#主键索引-primary-key" aria-hidden="true">#</a> 主键索引 (Primary Key)</h4>
<h5 id="主键" tabindex="-1"><a class="header-anchor" href="#主键" aria-hidden="true">#</a> 主键 :</h5>
<p>某一个属性组能唯一标识一条记录</p>
<h5 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点 :</h5>
<ul>
<li>最常见的索引类型</li>
<li>确保数据记录的唯一性</li>
<li>确定特定数据记录在数据库中的位置</li>
</ul>
<h4 id="唯一索引-unique" tabindex="-1"><a class="header-anchor" href="#唯一索引-unique" aria-hidden="true">#</a> 唯一索引(Unique)</h4>
<h5 id="作用-4" tabindex="-1"><a class="header-anchor" href="#作用-4" aria-hidden="true">#</a> 作用 :</h5>
<p>避免同一个表中某数据列中的值重复</p>
<h5 id="注意-4" tabindex="-1"><a class="header-anchor" href="#注意-4" aria-hidden="true">#</a> 注意:</h5>
<p>与主键索引的区别</p>
<ul>
<li>主键索引只能有一个</li>
<li>唯一索引可能有多个</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>Grade<span class="token punctuation">`</span></span><span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>GradeID<span class="token punctuation">`</span></span> <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">AUTO_INCREMENT</span> PRIMARYKEY<span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>GradeName<span class="token punctuation">`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">UNIQUE</span>
   <span class="token comment">-- 或 UNIQUE KEY `GradeID` (`GradeID`)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="常规索引-index" tabindex="-1"><a class="header-anchor" href="#常规索引-index" aria-hidden="true">#</a> 常规索引(Index)</h4>
<h5 id="作用-5" tabindex="-1"><a class="header-anchor" href="#作用-5" aria-hidden="true">#</a> 作用 :</h5>
<p>快速定位特定数据</p>
<h5 id="注意-5" tabindex="-1"><a class="header-anchor" href="#注意-5" aria-hidden="true">#</a> 注意 :</h5>
<ul>
<li>index 和 key 关键字都可以设置常规索引</li>
<li>应加在查询找条件的字段</li>
<li>不宜添加太多常规索引,影响数据的插入,删除和修改操作</li>
</ul>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>result<span class="token punctuation">`</span></span><span class="token punctuation">(</span>
   <span class="token comment">-- 省略一些代码</span>
  <span class="token keyword">INDEX</span><span class="token operator">/</span><span class="token keyword">KEY</span> <span class="token identifier"><span class="token punctuation">`</span>ind<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>studentNo<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>subjectNo<span class="token punctuation">`</span></span><span class="token punctuation">)</span> <span class="token comment">-- 创建表时添加</span>
<span class="token punctuation">)</span>
<span class="token comment">-- 创建后添加</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>result<span class="token punctuation">`</span></span> <span class="token keyword">ADD</span> <span class="token keyword">INDEX</span> <span class="token identifier"><span class="token punctuation">`</span>ind<span class="token punctuation">`</span></span><span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>studentNo<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>subjectNo<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="全文索引-fulltext" tabindex="-1"><a class="header-anchor" href="#全文索引-fulltext" aria-hidden="true">#</a> 全文索引(FullText)</h4>
<h5 id="作用-6" tabindex="-1"><a class="header-anchor" href="#作用-6" aria-hidden="true">#</a> 作用 :</h5>
<p>快速定位特定数据</p>
<h5 id="注意-6" tabindex="-1"><a class="header-anchor" href="#注意-6" aria-hidden="true">#</a> 注意 :</h5>
<ul>
<li>只能用于MyISAM类型的数据表(新版InnoDB支持)</li>
<li>只能用于CHAR , VARCHAR , TEXT数据列类型</li>
<li>适合大型数据集</li>
</ul>
<h3 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h3>
<h4 id="方法一" tabindex="-1"><a class="header-anchor" href="#方法一" aria-hidden="true">#</a> 方法一：</h4>
<p>创建表时</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> 表名 <span class="token punctuation">(</span>
               字段名<span class="token number">1</span> 数据类型 <span class="token punctuation">[</span>完整性约束条件…<span class="token punctuation">]</span><span class="token punctuation">,</span>
               字段名<span class="token number">2</span> 数据类型 <span class="token punctuation">[</span>完整性约束条件…<span class="token punctuation">]</span><span class="token punctuation">,</span>
               <span class="token punctuation">[</span><span class="token keyword">UNIQUE</span> <span class="token operator">|</span> FULLTEXT <span class="token operator">|</span> SPATIAL <span class="token punctuation">]</span>   <span class="token keyword">INDEX</span> <span class="token operator">|</span> <span class="token keyword">KEY</span>
               <span class="token punctuation">[</span>索引名<span class="token punctuation">]</span> <span class="token punctuation">(</span>字段名<span class="token punctuation">[</span><span class="token punctuation">(</span>长度<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">ASC</span> <span class="token operator">|</span><span class="token keyword">DESC</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
               <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p></p>
<h4 id="方法二" tabindex="-1"><a class="header-anchor" href="#方法二" aria-hidden="true">#</a> 方法二：</h4>
<p>CREATE在已存在的表上创建索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token punctuation">[</span><span class="token keyword">UNIQUE</span> <span class="token operator">|</span> FULLTEXT <span class="token operator">|</span> SPATIAL <span class="token punctuation">]</span> <span class="token keyword">INDEX</span> 索引名
                    <span class="token keyword">ON</span> 表名 <span class="token punctuation">(</span>字段名<span class="token punctuation">[</span><span class="token punctuation">(</span>长度<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">ASC</span> <span class="token operator">|</span><span class="token keyword">DESC</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h4 id="方法三" tabindex="-1"><a class="header-anchor" href="#方法三" aria-hidden="true">#</a> 方法三：</h4>
<p>ALTER TABLE在已存在的表上创建索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>     <span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">ADD</span> <span class="token punctuation">[</span><span class="token keyword">UNIQUE</span> <span class="token operator">|</span> FULLTEXT <span class="token operator">|</span> SPATIAL <span class="token punctuation">]</span> <span class="token keyword">INDEX</span>
                            索引名 <span class="token punctuation">(</span>字段名<span class="token punctuation">[</span><span class="token punctuation">(</span>长度<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">ASC</span> <span class="token operator">|</span><span class="token keyword">DESC</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其他操作" tabindex="-1"><a class="header-anchor" href="#其他操作" aria-hidden="true">#</a> 其他操作</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">--删除索引：</span>
<span class="token keyword">DROP</span> <span class="token keyword">INDEX</span> 索引名 <span class="token keyword">ON</span> 表名字<span class="token punctuation">;</span>

<span class="token comment">--删除主键索引:</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">DROP</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">;</span>

<span class="token comment">--显示索引信息: </span>
<span class="token keyword">SHOW</span> <span class="token keyword">INDEX</span> <span class="token keyword">FROM</span> student<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h3>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>
<span class="token comment">/*增加全文索引*/</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>school<span class="token punctuation">`</span></span><span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">`</span>student<span class="token punctuation">`</span></span> <span class="token keyword">ADD</span> FULLTEXT <span class="token keyword">INDEX</span> <span class="token identifier"><span class="token punctuation">`</span>studentname<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>StudentName<span class="token punctuation">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/*EXPLAIN : 分析SQL语句执行性能*/</span>
<span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> student <span class="token keyword">WHERE</span> studentno<span class="token operator">=</span><span class="token string">'1000'</span><span class="token punctuation">;</span>

<span class="token comment">/*使用全文索引*/</span>
<span class="token comment">-- 全文搜索通过 MATCH() 函数完成。</span>
<span class="token comment">-- 搜索字符串作为 against() 的参数被给定。搜索以忽略字母大小写的方式执行。对于表中的每个记录行，MATCH() 返回一个相关性值。即，在搜索字符串与记录行在 MATCH() 列表中指定的列的文本之间的相似性尺度。</span>
<span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span><span class="token keyword">FROM</span> student <span class="token keyword">WHERE</span> <span class="token keyword">MATCH</span><span class="token punctuation">(</span>studentname<span class="token punctuation">)</span> AGAINST<span class="token punctuation">(</span><span class="token string">'love'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开始之前，先说一下全文索引的版本、存储引擎、数据类型的支持情况</p>
<blockquote>
<ul>
<li>MySQL 5.6 以前的版本，只有 MyISAM 存储引擎支持全文索引；</li>
<li>MySQL 5.6 及以后的版本，MyISAM 和 InnoDB 存储引擎均支持全文索引;</li>
<li>只有字段的数据类型为 char、varchar、text 及其系列才可以建全文索引。</li>
<li>测试或使用全文索引时，要先看一下自己的 MySQL 版本、存储引擎和数据类型是否支持全文索引。</li>
</ul>
</blockquote>
<h3 id="拓展-测试索引" tabindex="-1"><a class="header-anchor" href="#拓展-测试索引" aria-hidden="true">#</a> 拓展：测试索引</h3>
<p><strong>建表app_user：</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>app_user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
<span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">unsigned</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户昵称'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>email<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户邮箱'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>phone<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span> <span class="token keyword">COMMENT</span> <span class="token string">'手机号'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>gender<span class="token punctuation">`</span></span> <span class="token keyword">tinyint</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token keyword">unsigned</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'性别（0:男；1：女）'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>password<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'密码'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>age<span class="token punctuation">`</span></span> <span class="token keyword">tinyint</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'年龄'</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>create_time<span class="token punctuation">`</span></span> <span class="token keyword">datetime</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span>
<span class="token identifier"><span class="token punctuation">`</span>update_time<span class="token punctuation">`</span></span> <span class="token keyword">timestamp</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span>
<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">'app用户表'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>批量插入数据：100w</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">FUNCTION</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> mock_data<span class="token punctuation">;</span>
<span class="token keyword">DELIMITER</span> $$
<span class="token keyword">CREATE</span> <span class="token keyword">FUNCTION</span> mock_data<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">RETURNS</span> <span class="token keyword">INT</span>
<span class="token keyword">DETERMINISTIC</span>
<span class="token keyword">BEGIN</span>
<span class="token keyword">DECLARE</span> num <span class="token keyword">INT</span> <span class="token keyword">DEFAULT</span> <span class="token number">1000000</span><span class="token punctuation">;</span>
<span class="token keyword">DECLARE</span> i <span class="token keyword">INT</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">WHILE</span> i <span class="token operator">&lt;</span> num <span class="token keyword">DO</span>
  <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> app_user<span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>email<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>phone<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>gender<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>password<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>age<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
   <span class="token keyword">VALUES</span><span class="token punctuation">(</span>CONCAT<span class="token punctuation">(</span><span class="token string">'用户'</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'24736743@qq.com'</span><span class="token punctuation">,</span> CONCAT<span class="token punctuation">(</span><span class="token string">'18'</span><span class="token punctuation">,</span> FLOOR<span class="token punctuation">(</span>RAND<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token punctuation">(</span><span class="token number">999999999</span><span class="token operator">-</span><span class="token number">100000000</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">100000000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>FLOOR<span class="token punctuation">(</span>RAND<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>UUID<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> FLOOR<span class="token punctuation">(</span>RAND<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">SET</span> i <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">END</span> <span class="token keyword">WHILE</span><span class="token punctuation">;</span>
<span class="token keyword">RETURN</span> i<span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> mock_data<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>索引效率测试</strong></p>
<p>无索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> app_user <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">'用户9999'</span><span class="token punctuation">;</span> <span class="token comment">-- Total Time     : 1.538 sec</span>

<span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> app_user <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">'用户9999'</span><span class="token punctuation">;</span>

<span class="token comment">/*
          id: 1
select_type: SIMPLE
       table: app_user
  partitions: NULL
        type: ALL
possible_keys: NULL
        key: NULL
    key_len: NULL
        ref: NULL
        rows: 992759
    filtered: 10.00
      Extra: Using where
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_app_user_name <span class="token keyword">ON</span> app_user<span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试普通索引</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> app_user <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">'用户9999'</span>
<span class="token comment">-- Total Time     : 0.011 sec</span>

<span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> app_user <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">'用户9999'</span>

<span class="token comment">/*
          id: 1
select_type: SIMPLE
       table: app_user
  partitions: NULL
        type: ref
possible_keys: idx_app_user_name
        key: idx_app_user_name
    key_len: 203
        ref: const
        rows: 1
    filtered: 100.00
      Extra: NULL
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="索引准则" tabindex="-1"><a class="header-anchor" href="#索引准则" aria-hidden="true">#</a> 索引准则</h3>
<ul>
<li>索引不是越多越好</li>
<li>不要对经常变动的数据加索引</li>
<li><strong>小数据量的表建议不要加索引</strong></li>
<li>索引一般应加在常用来查询的字段上</li>
</ul>
<h3 id="索引的数据结构" tabindex="-1"><a class="header-anchor" href="#索引的数据结构" aria-hidden="true">#</a> 索引的数据结构</h3>
<p>我们可以在创建上述索引的时候，为其指定索引类型，分两类</p>
<ul>
<li>hash类型的索引：查询单条快，范围查询慢</li>
<li>btree类型的索引：b+树，层数越多，数据量指数级增长（我们就用它，因为innodb默认支持它）</li>
</ul>
<p>不同的存储引擎支持的索引类型也不一样</p>
<ul>
<li>InnoDB 支持事务，支持行级别锁定，支持 B-tree、Full-text 等索引，不支持 Hash 索引；</li>
<li>MyISAM 不支持事务，支持表级别锁定，支持 B-tree、Full-text 等索引，不支持 Hash 索引；</li>
<li>Memory 不支持事务，支持表级别锁定，支持 B-tree、Hash 等索引，不支持 Full-text 索引；</li>
<li>NDB 支持事务，支持行级别锁定，支持 Hash 索引，不支持 B-tree、Full-text 等索引；
Archive 不支持事务，支持表级别锁定，不支持 B-tree、Hash、Full-text等索引</li>
<li>Archive 不支持事务，支持表级别锁定，不支持 B-tree、Hash、Full-text等索引；</li>
</ul>
<p><strong>详细内容建议看<RouterLink to="/Note/%5Bhttps:/shane-1.github.io/Note/IndexDS.html#innodb%E7%9A%84%E4%B8%BB%E9%94%AE%E9%80%89%E6%8B%A9%E4%B8%8E%E6%8F%92%E5%85%A5%E4%BC%98%E5%8C%96%5D(https://shane-1.github.io/Note/IndexDS.html)">这里</RouterLink></strong></p>
<h2 id="用户管理" tabindex="-1"><a class="header-anchor" href="#用户管理" aria-hidden="true">#</a> 用户管理</h2>
<p>使用SQLyog 创建用户，并授予权限演示</p>
<p><img src="/images/2020-10-05-20-09-22.png" alt=""></p>
<h3 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令" aria-hidden="true">#</a> 基本命令</h3>
<h5 id="用户和权限管理" tabindex="-1"><a class="header-anchor" href="#用户和权限管理" aria-hidden="true">#</a> 用户和权限管理</h5>
<p>用户信息表：mysql.user</p>
<h5 id="刷新权限" tabindex="-1"><a class="header-anchor" href="#刷新权限" aria-hidden="true">#</a> 刷新权限</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>FLUSH <span class="token keyword">PRIVILEGES</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="增加用户" tabindex="-1"><a class="header-anchor" href="#增加用户" aria-hidden="true">#</a> 增加用户</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> shane IDENTIFIED <span class="token keyword">BY</span> <span class="token string">'123456'</span>

<span class="token keyword">CREATE</span> <span class="token keyword">USER</span> 用户名 IDENTIFIED <span class="token keyword">BY</span> <span class="token punctuation">[</span>PASSWORD<span class="token punctuation">]</span> 密码<span class="token punctuation">(</span>字符串<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>必须拥有mysql数据库的全局CREATE USER权限，或拥有INSERT权限。</li>
<li>只能创建用户，不能赋予权限。</li>
<li>用户名，注意引号：如 'user_name'@'192.168.1.1'</li>
<li>密码也需引号，纯数字密码也要加引号</li>
<li>要在纯文本中指定密码，需忽略PASSWORD关键词。要把密码指定为由PASSWORD()函数返回的混编值，需包含关键字PASSWORD</li>
</ul>
<h5 id="重命名用户" tabindex="-1"><a class="header-anchor" href="#重命名用户" aria-hidden="true">#</a> 重命名用户</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">RENAME</span> <span class="token keyword">USER</span> shane <span class="token keyword">TO</span> jack
<span class="token keyword">RENAME</span> <span class="token keyword">USER</span> old_user <span class="token keyword">TO</span> new_user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="设置密码" tabindex="-1"><a class="header-anchor" href="#设置密码" aria-hidden="true">#</a> 设置密码</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SET</span> PASSWORD <span class="token operator">=</span> PASSWORD<span class="token punctuation">(</span><span class="token string">'密码'</span><span class="token punctuation">)</span>    <span class="token comment">-- 为当前用户设置密码</span>
<span class="token keyword">SET</span> PASSWORD <span class="token keyword">FOR</span> 用户名 <span class="token operator">=</span> PASSWORD<span class="token punctuation">(</span><span class="token string">'密码'</span><span class="token punctuation">)</span>    <span class="token comment">-- 为指定用户设置密码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="删除用户" tabindex="-1"><a class="header-anchor" href="#删除用户" aria-hidden="true">#</a> 删除用户</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">USER</span> jack
<span class="token keyword">DROP</span> <span class="token keyword">USER</span> 用户名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="分配权限-添加用户" tabindex="-1"><a class="header-anchor" href="#分配权限-添加用户" aria-hidden="true">#</a> 分配权限/添加用户</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">GRANT</span> 权限列表 <span class="token keyword">ON</span> 表名 <span class="token keyword">TO</span> 用户名 <span class="token punctuation">[</span>IDENTIFIED <span class="token keyword">BY</span> <span class="token punctuation">[</span>PASSWORD<span class="token punctuation">]</span><span class="token string">'password'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>all privileges 表示所有权限</li>
<li>*.* 表示所有库的所有表</li>
<li>库名.表名 表示某库下面的某表</li>
</ul>
<h5 id="查看权限" tabindex="-1"><a class="header-anchor" href="#查看权限" aria-hidden="true">#</a> 查看权限</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> GRANTS <span class="token keyword">FOR</span> root<span class="token variable">@localhost</span><span class="token punctuation">;</span>
<span class="token keyword">SHOW</span> GRANTS <span class="token keyword">FOR</span> 用户名

<span class="token comment">--root用户权限</span>
<span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> root<span class="token variable">@'localhost'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="查看当前用户权限" tabindex="-1"><a class="header-anchor" href="#查看当前用户权限" aria-hidden="true">#</a> 查看当前用户权限</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>  <span class="token keyword">SHOW</span> GRANTS<span class="token punctuation">;</span> 
  <span class="token comment">--或</span>
  <span class="token keyword">SHOW</span> GRANTS <span class="token keyword">FOR</span> <span class="token keyword">CURRENT_USER</span><span class="token punctuation">;</span> 
  <span class="token comment">--或 </span>
  <span class="token keyword">SHOW</span> GRANTS <span class="token keyword">FOR</span> <span class="token keyword">CURRENT_USER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="撤消权限" tabindex="-1"><a class="header-anchor" href="#撤消权限" aria-hidden="true">#</a> 撤消权限</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">REVOKE</span> 权限列表 <span class="token keyword">ON</span> 表名 <span class="token keyword">FROM</span> 用户名
<span class="token keyword">REVOKE</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span><span class="token punctuation">,</span> <span class="token keyword">GRANT</span> <span class="token keyword">OPTION</span> <span class="token keyword">FROM</span> 用户名    <span class="token comment">-- 撤销所有权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="权限解释" tabindex="-1"><a class="header-anchor" href="#权限解释" aria-hidden="true">#</a> 权限解释</h3>
<h5 id="权限列表" tabindex="-1"><a class="header-anchor" href="#权限列表" aria-hidden="true">#</a> 权限列表</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">ALL</span> <span class="token punctuation">[</span><span class="token keyword">PRIVILEGES</span><span class="token punctuation">]</span>    <span class="token comment">-- 设置除GRANT OPTION之外的所有简单权限</span>
<span class="token keyword">ALTER</span>    <span class="token comment">-- 允许使用ALTER TABLE</span>
<span class="token keyword">ALTER</span> <span class="token keyword">ROUTINE</span>    <span class="token comment">-- 更改或取消已存储的子程序</span>
<span class="token keyword">CREATE</span>    <span class="token comment">-- 允许使用CREATE TABLE</span>
<span class="token keyword">CREATE</span> <span class="token keyword">ROUTINE</span>    <span class="token comment">-- 创建已存储的子程序</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TEMPORARY</span> <span class="token keyword">TABLES</span>        <span class="token comment">-- 允许使用CREATE TEMPORARY TABLE</span>
<span class="token keyword">CREATE</span> <span class="token keyword">USER</span>        <span class="token comment">-- 允许使用CREATE USER, DROP USER, RENAME USER和REVOKE ALL PRIVILEGES。</span>
<span class="token keyword">CREATE</span> <span class="token keyword">VIEW</span>        <span class="token comment">-- 允许使用CREATE VIEW</span>
<span class="token keyword">DELETE</span>    <span class="token comment">-- 允许使用DELETE</span>
<span class="token keyword">DROP</span>    <span class="token comment">-- 允许使用DROP TABLE</span>
<span class="token keyword">EXECUTE</span>        <span class="token comment">-- 允许用户运行已存储的子程序</span>
<span class="token keyword">FILE</span>    <span class="token comment">-- 允许使用SELECT...INTO OUTFILE和LOAD DATA INFILE</span>
<span class="token keyword">INDEX</span>     <span class="token comment">-- 允许使用CREATE INDEX和DROP INDEX</span>
<span class="token keyword">INSERT</span>    <span class="token comment">-- 允许使用INSERT</span>
<span class="token keyword">LOCK</span> <span class="token keyword">TABLES</span>        <span class="token comment">-- 允许对您拥有SELECT权限的表使用LOCK TABLES</span>
PROCESS     <span class="token comment">-- 允许使用SHOW FULL PROCESSLIST</span>
<span class="token keyword">REFERENCES</span>    <span class="token comment">-- 未被实施</span>
RELOAD    <span class="token comment">-- 允许使用FLUSH</span>
<span class="token keyword">REPLICATION</span> CLIENT    <span class="token comment">-- 允许用户询问从属服务器或主服务器的地址</span>
<span class="token keyword">REPLICATION</span> SLAVE    <span class="token comment">-- 用于复制型从属服务器（从主服务器中读取二进制日志事件）</span>
<span class="token keyword">SELECT</span>    <span class="token comment">-- 允许使用SELECT</span>
<span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span>    <span class="token comment">-- 显示所有数据库</span>
<span class="token keyword">SHOW</span> <span class="token keyword">VIEW</span>    <span class="token comment">-- 允许使用SHOW CREATE VIEW</span>
<span class="token keyword">SHUTDOWN</span>    <span class="token comment">-- 允许使用mysqladmin shutdown</span>
SUPER    <span class="token comment">-- 允许使用CHANGE MASTER, KILL, PURGE MASTER LOGS和SET GLOBAL语句，mysqladmin debug命令；允许您连接（一次），即使已达到max_connections。</span>
<span class="token keyword">UPDATE</span>    <span class="token comment">-- 允许使用UPDATE</span>
<span class="token keyword">USAGE</span>    <span class="token comment">-- “无权限”的同义词</span>
<span class="token keyword">GRANT</span> <span class="token keyword">OPTION</span>    <span class="token comment">-- 允许授予权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="表维护" tabindex="-1"><a class="header-anchor" href="#表维护" aria-hidden="true">#</a> 表维护</h5>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- 分析和存储表的关键字分布</span>
<span class="token keyword">ANALYZE</span> <span class="token punctuation">[</span><span class="token keyword">LOCAL</span> <span class="token operator">|</span> NO_WRITE_TO_BINLOG<span class="token punctuation">]</span> <span class="token keyword">TABLE</span> 表名 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment">-- 检查一个或多个表是否有错误</span>
<span class="token keyword">CHECK</span> <span class="token keyword">TABLE</span> tbl_name <span class="token punctuation">[</span><span class="token punctuation">,</span> tbl_name<span class="token punctuation">]</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">[</span><span class="token keyword">option</span><span class="token punctuation">]</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">option</span> <span class="token operator">=</span> {<span class="token keyword">QUICK</span> <span class="token operator">|</span> FAST <span class="token operator">|</span> MEDIUM <span class="token operator">|</span> <span class="token keyword">EXTENDED</span> <span class="token operator">|</span> CHANGED}
<span class="token comment">-- 整理数据文件的碎片</span>
<span class="token keyword">OPTIMIZE</span> <span class="token punctuation">[</span><span class="token keyword">LOCAL</span> <span class="token operator">|</span> NO_WRITE_TO_BINLOG<span class="token punctuation">]</span> <span class="token keyword">TABLE</span> tbl_name <span class="token punctuation">[</span><span class="token punctuation">,</span> tbl_name<span class="token punctuation">]</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql备份" tabindex="-1"><a class="header-anchor" href="#mysql备份" aria-hidden="true">#</a> MySQL备份</h2>
<p>数据库备份必要性</p>
<ul>
<li>保证重要数据不丢失</li>
<li>数据转移</li>
</ul>
<p>MySQL数据库备份方法</p>
<ul>
<li>mysqldump备份工具(命令行使用)</li>
<li>数据库管理工具,如SQLyog导出</li>
<li>直接拷贝数据库文件和相关配置文件</li>
</ul>
<h5 id="sqlyog" tabindex="-1"><a class="header-anchor" href="#sqlyog" aria-hidden="true">#</a> SQLyog</h5>
<ul>
<li>选中要导出的表或库,右键选中备份或导出</li>
<li><img src="/images/2020-10-05-20-47-23.png" alt=""></li>
</ul>
<h5 id="mysqldump客户端" tabindex="-1"><a class="header-anchor" href="#mysqldump客户端" aria-hidden="true">#</a> mysqldump客户端</h5>
<h6 id="作用-7" tabindex="-1"><a class="header-anchor" href="#作用-7" aria-hidden="true">#</a> 作用 :</h6>
<ul>
<li>转储数据库</li>
<li>搜集数据库进行备份</li>
<li>将数据转移到另一个SQL服务器,不一定是MySQL服务器</li>
</ul>
<p><code v-pre>mysqldump -h 主机 -u 用户名 -p 密码 数据库 表名 &gt; 物理磁盘位置/文件名</code></p>
<h6 id="导出一张表" tabindex="-1"><a class="header-anchor" href="#导出一张表" aria-hidden="true">#</a> 导出一张表</h6>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- mysqldump -uroot -p123456 school student >D:/a.sql</span>
　　mysqldump <span class="token operator">-</span>u用户名 <span class="token operator">-</span>p密码 库名 表名 <span class="token operator">></span> 文件名<span class="token punctuation">(</span>D:<span class="token operator">/</span>a<span class="token punctuation">.</span><span class="token keyword">sql</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="导出多张表" tabindex="-1"><a class="header-anchor" href="#导出多张表" aria-hidden="true">#</a> 导出多张表</h6>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- mysqldump -uroot -p123456 school student result >D:/a.sql</span>
　　mysqldump <span class="token operator">-</span>u用户名 <span class="token operator">-</span>p密码 库名 表<span class="token number">1</span> 表<span class="token number">2</span> 表<span class="token number">3</span> <span class="token operator">></span> 文件名<span class="token punctuation">(</span>D:<span class="token operator">/</span>a<span class="token punctuation">.</span><span class="token keyword">sql</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="导出所有表" tabindex="-1"><a class="header-anchor" href="#导出所有表" aria-hidden="true">#</a> 导出所有表</h6>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- mysqldump -uroot -p123456 school >D:/a.sql</span>
　　mysqldump <span class="token operator">-</span>u用户名 <span class="token operator">-</span>p密码 库名 <span class="token operator">></span> 文件名<span class="token punctuation">(</span>D:<span class="token operator">/</span>a<span class="token punctuation">.</span><span class="token keyword">sql</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="导出一个库" tabindex="-1"><a class="header-anchor" href="#导出一个库" aria-hidden="true">#</a> 导出一个库</h6>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- mysqldump -uroot -p123456 -B school >D:/a.sql</span>
　　mysqldump <span class="token operator">-</span>u用户名 <span class="token operator">-</span>p密码 <span class="token operator">-</span>B 库名 <span class="token operator">></span> 文件名<span class="token punctuation">(</span>D:<span class="token operator">/</span>a<span class="token punctuation">.</span><span class="token keyword">sql</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>可以-w携带备份条件</p>
</blockquote>
<h6 id="导入" tabindex="-1"><a class="header-anchor" href="#导入" aria-hidden="true">#</a> 导入</h6>
<ol>
<li>在登录mysql的情况下：</li>
</ol>
<p><code v-pre>source D:/a.sqlsource 备份文件</code>
　　
2. 在不登录的情况下:
<code v-pre>mysql -u用户名 -p密码 库名&lt; 备份文件</code></p>
<h2 id="规范化数据库设计" tabindex="-1"><a class="header-anchor" href="#规范化数据库设计" aria-hidden="true">#</a> 规范化数据库设计</h2>
<h3 id="为什么需要数据库设计" tabindex="-1"><a class="header-anchor" href="#为什么需要数据库设计" aria-hidden="true">#</a> 为什么需要数据库设计</h3>
<p>当数据库比较复杂时我们需要设计数据库</p>
<h4 id="糟糕的数据库设计" tabindex="-1"><a class="header-anchor" href="#糟糕的数据库设计" aria-hidden="true">#</a> 糟糕的数据库设计 :</h4>
<ul>
<li>数据冗余,存储空间浪费</li>
<li>数据更新和插入的异常</li>
</ul>
<blockquote>
<p>如使用数据库层的物理外键</p>
</blockquote>
<ul>
<li>程序性能差</li>
</ul>
<h4 id="良好的数据库设计" tabindex="-1"><a class="header-anchor" href="#良好的数据库设计" aria-hidden="true">#</a> 良好的数据库设计 :</h4>
<ul>
<li>节省数据的存储空间</li>
<li>能够保证数据的完整性</li>
<li>方便进行数据库应用系统的开发</li>
</ul>
<h3 id="软件项目开发周期中数据库设计" tabindex="-1"><a class="header-anchor" href="#软件项目开发周期中数据库设计" aria-hidden="true">#</a> 软件项目开发周期中数据库设计</h3>
<ul>
<li>需求分析阶段: 分析客户的业务和数据处理需求</li>
<li>概要设计阶段:设计数据库的E-R模型图 , 确认需求信息的正确和完整.</li>
</ul>
<h3 id="设计数据库步骤-blog为例" tabindex="-1"><a class="header-anchor" href="#设计数据库步骤-blog为例" aria-hidden="true">#</a> 设计数据库步骤(Blog为例)</h3>
<ul>
<li>
<p>收集信息,分析需求</p>
<ul>
<li>用户表(用户登录注销, 用户的个人信息, 写博客, 创建分类)</li>
<li>分类表(文章分类, 谁创建的)</li>
<li>文章表(文章的信息)</li>
<li>友链表(友链信息)</li>
<li>自定义表(系统信息, 某个关键的字, 或者一些主字段. key: value)</li>
</ul>
<p>与该系统有关人员进行交流 , 座谈 , 充分了解用户需求 , 理解数据库需要完成的任务.</p>
</li>
<li>
<p>标识实体[Entity] (把需求落地到每个字段)</p>
</li>
<li>
<p>标识实体之间的关系</p>
<ul>
<li>写博客:user--&gt;blog</li>
<li>创建分类:user--&gt;category</li>
<li>关注:user--&gt;user</li>
<li>友链:links</li>
<li>评论:user-user-blog</li>
</ul>
</li>
<li>
<p>标识数据库要管理的关键对象或实体,实体一般是名词</p>
</li>
<li>
<p>标识每个实体需要存储的详细信息[Attribute]</p>
</li>
<li>
<p>标识实体之间的关系[Relationship]</p>
</li>
</ul>
<h2 id="三大范式" tabindex="-1"><a class="header-anchor" href="#三大范式" aria-hidden="true">#</a> 三大范式</h2>
<h3 id="问题-为什么需要数据规范化" tabindex="-1"><a class="header-anchor" href="#问题-为什么需要数据规范化" aria-hidden="true">#</a> 问题 : 为什么需要数据规范化?</h3>
<p>不合规范的表设计会导致的问题：</p>
<ul>
<li>
<p>信息重复</p>
</li>
<li>
<p>更新异常</p>
</li>
<li>
<p>插入异常</p>
<ul>
<li>无法正确表示信息</li>
</ul>
</li>
<li>
<p>删除异常</p>
<ul>
<li>丢失有效信息</li>
</ul>
</li>
</ul>
<h3 id="三大范式-1" tabindex="-1"><a class="header-anchor" href="#三大范式-1" aria-hidden="true">#</a> 三大范式</h3>
<h4 id="第一范式-1st-nf" tabindex="-1"><a class="header-anchor" href="#第一范式-1st-nf" aria-hidden="true">#</a> 第一范式 (1st NF)</h4>
<p>第一范式的目标是确保每列的原子性,如果每列都是不可再分的最小数据单元,则满足第一范式</p>
<h4 id="第二范式-2nd-nf" tabindex="-1"><a class="header-anchor" href="#第二范式-2nd-nf" aria-hidden="true">#</a> 第二范式(2nd NF)</h4>
<p>第二范式（2NF）是在第一范式（1NF）的基础上建立起来的，即满足第二范式（2NF）必须先满足第一范式（1NF）。</p>
<p>第二范式要求每个表只描述一件事情</p>
<blockquote>
<p>确保每一列都和主键相关,而不能只与主键的某一部分相关</p>
</blockquote>
<h4 id="第三范式-3rd-nf" tabindex="-1"><a class="header-anchor" href="#第三范式-3rd-nf" aria-hidden="true">#</a> 第三范式(3rd NF)</h4>
<p>如果一个关系满足第二范式,并且除了主键以外的其他列都不传递依赖于主键列,则满足第三范式.</p>
<p>第三范式需要确保数据表中的每一列数据都和主键直接相关，而不能间接相关。</p>
<h3 id="规范化和性能的关系" tabindex="-1"><a class="header-anchor" href="#规范化和性能的关系" aria-hidden="true">#</a> 规范化和性能的关系</h3>
<ul>
<li>
<p>为满足某种商业目标 , 数据库性能比规范化数据库更重要</p>
</li>
<li>
<p>在数据规范化的同时 , 要综合考虑数据库的性能</p>
</li>
<li>
<p>通过在给定的表中添加额外的字段,以大量减少需要从中搜索信息所需的时间</p>
</li>
<li>
<p>通过在给定的表中插入计算列,以方便查询</p>
</li>
</ul>
<hr>
<p>整理不易，转载请注明出处。
相关视频教程可参考狂神说</p>
</div></template>


