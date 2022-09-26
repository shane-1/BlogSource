<template><div><h1 id="基于ads平台流水线的flyway实践" tabindex="-1"><a class="header-anchor" href="#基于ads平台流水线的flyway实践" aria-hidden="true">#</a> 基于ADS平台流水线的Flyway实践</h1>
<p><img src="/images/2021-08-03-18-28-48.png" alt=""></p>
<h2 id="一、前言" tabindex="-1"><a class="header-anchor" href="#一、前言" aria-hidden="true">#</a> 一、前言</h2>
<p>随着项目的不断迭代，数据库表结构、数据都在发生着变化。甚至有的业务在多环境版本并行运行。数据为王的时代，管理好数据库的版本也成为了迫切的需要。如何能做到像 <strong>Git</strong> 之类的版本控制工具来管理数据库？</p>
<p><strong>Flyway</strong> 是一个敏捷工具，用于数据库的移植。采用 Java 开发，支持所有兼容 JDBC 的数据库。</p>
<p>主要用于在你的应用版本不断升级的同时，升级你的数据库结构和里面的数据。</p>
<p>支持的数据库</p>
<blockquote></blockquote>
<p>Oracle、SQL Server、DB2、MySQL、Aurora MySQL、MariaDB、Percona XtraDB群集、PostgreSQL、Aurora PostgreSQL、Redshift、CockroachDB、SAP HANA、Sybase ASE、Informix、H2、HSQLDB、Derby、SQLite、Firebird</p>
<h2 id="二、flyway-的特点" tabindex="-1"><a class="header-anchor" href="#二、flyway-的特点" aria-hidden="true">#</a> 二、Flyway 的特点</h2>
<p><strong>Flyway</strong> 大受欢迎是因为它具有以下优点：</p>
<ul>
<li>
<p><strong>简单</strong> 非常容易安装和学习，同时迁移的方式也很容易被开发者接受。</p>
</li>
<li>
<p><strong>专一</strong> <strong>Flyway</strong> 专注于搞数据库迁移、版本控制而并没有其它副作用。</p>
</li>
<li>
<p><strong>强大</strong> 专为连续交付而设计。让Flyway在应用程序启动时迁移数据库。</p>
</li>
</ul>
<h2 id="三、flyway-的工作机制" tabindex="-1"><a class="header-anchor" href="#三、flyway-的工作机制" aria-hidden="true">#</a> 三、Flyway 的工作机制</h2>
<p><strong>Flyway</strong> 需要在 DB 中先创建一个 metadata 表 (缺省表名为 flyway_schema_history), 在该表中保存着每次 migration （迁移）的记录, 记录包含 migration 脚本的版本号和 <strong>SQL</strong> 脚本的 checksum 值。下图表示了多个数据库版本。
<img src="/images/2021-08-03-18-31-38.png" alt="">
对应的 <u>metadata</u> 表记录：</p>
<table>
<thead>
<tr>
<th><strong>installed_rank</strong></th>
<th><strong>version</strong></th>
<th><strong>description</strong></th>
<th><strong>type</strong></th>
<th><strong>script</strong></th>
<th><strong>checksum</strong></th>
<th><strong>installed_by</strong></th>
<th><strong>installed_on</strong></th>
<th><strong>execution_time</strong></th>
<th><strong>success</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>1</strong></td>
<td><strong>1</strong></td>
<td><strong>Initial Setup</strong></td>
<td><strong>SQL</strong></td>
<td><strong>V1__Initial_Setup.sql</strong></td>
<td><strong>1996767037</strong></td>
<td><strong>axel</strong></td>
<td><strong>2016-02-04  22:23:00.0</strong></td>
<td><strong>546</strong></td>
<td><strong>true</strong></td>
</tr>
<tr>
<td><strong>2</strong></td>
<td><strong>2</strong></td>
<td><strong>First Changes</strong></td>
<td><strong>SQL</strong></td>
<td><strong>V2__First_Changes.sql</strong></td>
<td><strong>1279644856</strong></td>
<td><strong>axel</strong></td>
<td><strong>2016-02-06  09:18:00.0</strong></td>
<td><strong>127</strong></td>
<td><strong>true</strong></td>
</tr>
</tbody>
</table>
<p><strong>Flyway</strong> 扫描文件系统或应用程序的类路径读取 <strong>DDL</strong> 和 <strong>DML</strong> 以进行迁移。根据<u>metadata</u> 表进行检查迁移。<strong>如果脚本声明的版本号小于或等于标记为当前版本的版本号之一，将忽略它们。其余迁移是待处理迁移：可用，但未应用。最后按版本号对它们进行排序并按顺序执行</strong> <strong>并将执行结果写入</strong> <strong>metadata</strong> <strong>表。</strong></p>
<p>对应的 <u>metadata</u> 表记录：</p>
<table>
<thead>
<tr>
<th><strong>installed_rank</strong></th>
<th><strong>version</strong></th>
<th><strong>description</strong></th>
<th><strong>type</strong></th>
<th><strong>script</strong></th>
<th><strong>checksum</strong></th>
<th><strong>installed_by</strong></th>
<th><strong>installed_on</strong></th>
<th><strong>execution_time</strong></th>
<th><strong>success</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>1</strong></td>
<td><strong>1</strong></td>
<td><strong>Initial Setup</strong></td>
<td><strong>SQL</strong></td>
<td><strong>V1__Initial_Setup.sql</strong></td>
<td><strong>1996767037</strong></td>
<td><strong>axel</strong></td>
<td><strong>2016-02-04  22:23:00.0</strong></td>
<td><strong>546</strong></td>
<td><strong>true</strong></td>
</tr>
<tr>
<td><strong>2</strong></td>
<td><strong>2</strong></td>
<td><strong>First Changes</strong></td>
<td><strong>SQL</strong></td>
<td><strong>V2__First_Changes.sql</strong></td>
<td><strong>1279644856</strong></td>
<td><strong>axel</strong></td>
<td><strong>2016-02-06  09:18:00.0</strong></td>
<td><strong>127</strong></td>
<td><strong>true</strong></td>
</tr>
<tr>
<td><strong>3</strong></td>
<td><strong>2.1</strong></td>
<td><strong>Refactoring</strong></td>
<td><strong>JDBC</strong></td>
<td><strong>V2_1__Refactoring</strong></td>
<td><strong>axel</strong></td>
<td><strong>2016-02-10</strong></td>
<td><strong>17:45:05.4</strong></td>
<td><strong>251</strong></td>
<td><strong>true</strong></td>
</tr>
</tbody>
</table>
<p>Flyway 支持命令行（需要下载命令行工具）和 <strong>Java Api</strong> ，也支持构建工具 <strong>Maven</strong> 和 <strong>Gradle</strong> 。这里我们主要介绍和ADS流水线的集成</p>
<h2 id="四、flyway-的规则" tabindex="-1"><a class="header-anchor" href="#四、flyway-的规则" aria-hidden="true">#</a> 四、Flyway 的规则</h2>
<p><strong>Flyway</strong> 是如何比较两个 <strong>SQL</strong> 文件的先后顺序呢？它采用 <strong>采用左对齐原则</strong>**,** <strong>缺位用</strong> <strong>0</strong> <strong>代替</strong> 。举几个例子：</p>
<p>1.0.1.1 比 1.0.1 版本高。</p>
<p>1.0.10 比 1.0.9.4 版本高。</p>
<p>1.0.10 和 1.0.010 版本号一样高, 每个版本号部分的前导 0 会被忽略。</p>
<p><strong>Flyway</strong> 将 <strong>SQL</strong> 文件分为 <strong>Versioned</strong> 、<strong>Repeatable</strong> 和 <strong>Undo</strong> 三种：</p>
<ul>
<li>
<p><strong>Versioned</strong> 用于版本升级, 每个版本有唯一的版本号并只能执行一次.</p>
</li>
<li>
<p><strong>Repeatable</strong> 可重复执行, 当 <strong>Flyway</strong>检测到 <strong>Repeatable</strong> 类型的 <strong>SQL</strong> 脚本的 checksum 有变动, <strong>Flyway</strong> 就会重新应用该脚本. 它并不用于版本更新, 这类的 migration 总是在 <strong>Versioned</strong> 执行之后才被执行。</p>
</li>
<li>
<p><strong>Undo</strong> 用于撤销具有相同版本的版本化迁移带来的影响。但是该回滚过于粗暴，过于机械化，一般不推荐使用。一般建议使用 <strong>Versioned</strong> 模式来解决。</p>
</li>
</ul>
<p>这三种的命名规则如下图：</p>
<p><img src="/images/2021-08-03-18-44-09.png" alt=""></p>
<ul>
<li>
<p><strong>Prefix</strong> 可配置，前缀标识，默认值 V 表示 <strong>Versioned</strong>, R 表示 <strong>Repeatable</strong>, U 表示 <strong>Undo</strong></p>
</li>
<li>
<p><strong>Version</strong> 标识版本号, 由一个或多个数字构成, 数字之间的分隔符可用点 . 或下划线 _</p>
</li>
<li>
<p><strong>Separator</strong> 可配置, 用于分隔版本标识与描述信息, 默认为两个下划线 __</p>
</li>
<li>
<p><strong>Description</strong> 描述信息, 文字之间可以用下划线 _ 或空格 分隔</p>
</li>
<li>
<p><strong>Suffix</strong> 可配置, 后续标识, 默认为 .sql</p>
</li>
</ul>
<h2 id="五、flyway-ads代理配置" tabindex="-1"><a class="header-anchor" href="#五、flyway-ads代理配置" aria-hidden="true">#</a> 五、Flyway ADS代理配置</h2>
<ol>
<li>下载<code v-pre>flyway-commandline-7.9.1-linux-x64.tar</code>包到安装目录</li>
<li>使用<code v-pre>tar zxvf flyway-commandline-7.9.1-linux-x64.tar</code> 解压文件</li>
<li>使用<code v-pre>vi /etc/profile</code> 编辑环境变量</li>
<li>添加flyway安装路径到环境变量
<img src="/images/2021-08-03-18-51-17.png" alt=""></li>
<li>使用<code v-pre>source /etc/profile </code>更新环境变量</li>
<li>配置ADS代理机</li>
</ol>
<h2 id="六、ads流水线配置" tabindex="-1"><a class="header-anchor" href="#六、ads流水线配置" aria-hidden="true">#</a> 六、ADS流水线配置</h2>
<ol>
<li>Speed4j后端项目建议在代码库的<code v-pre>src\main\resources</code>下的<code v-pre>DB\migration</code>存放Sql脚本文件</li>
</ol>
<p><img src="/images/2021-08-03-18-53-21.png" alt=""></p>
<p><strong>三级目录命名规则</strong></p>
<ul>
<li>版本号命名的目录：如V1.0.0，存放该版本中的数据库升级脚本（包含需要手工处理和自动处理的脚本）和check脚本；</li>
<li>Views：存放R开头脚本及一些回调脚本，该目录下的脚本为每次执行完V目录下的脚本后均会重复执行的脚本；</li>
</ul>
<ol start="2">
<li>将要执行的Sql脚本按照命名规则放到对应文件夹中</li>
</ol>
<p><img src="/images/2021-08-03-18-55-35.png" alt=""></p>
<ol start="3">
<li>打开ADS-Piplines-发布 配置ADS部署流水线</li>
</ol>
<p><img src="/images/2021-08-03-18-56-37.png" alt=""></p>
<ol start="4">
<li>选择对应发布管道，点击编辑</li>
</ol>
<p><img src="/images/2021-08-03-18-57-19.png" alt=""></p>
<ol start="5">
<li>选择对应阶段编辑，选择添加，输入<u>flyway</u>搜索，添加<code v-pre>Flyway CLI</code></li>
</ol>
<p><img src="/images/2021-08-03-18-58-54.png" alt=""></p>
<ol start="6">
<li>Command选择baseline</li>
</ol>
<p><img src="/images/2021-08-03-18-59-33.png" alt=""></p>
<ol start="7">
<li>选择输入框后面小点指定脚本目录</li>
</ol>
<p><img src="/images/2021-08-03-19-00-20.png" alt=""></p>
<ol start="8">
<li>选择sql脚本存储的<code v-pre>src\main\resources</code>下的<code v-pre>DB\migration</code>目录</li>
</ol>
<p><img src="/images/2021-08-03-19-02-15.png" alt=""></p>
<ol start="9">
<li>配置好对应数据库的url和账户密码</li>
</ol>
<p><img src="/images/2021-08-03-19-02-55.png" alt=""></p>
<ol start="10">
<li>
<p>再次选择添加，输入“flyway“搜索，再添加Flyway CLI</p>
</li>
<li>
<p>将Command选择为migrate，其他配置与之前相同</p>
</li>
</ol>
<p><img src="/images/2021-08-03-19-03-45.png" alt=""></p>
<ol start="12">
<li>
<p>保存流水线</p>
<blockquote>
<p>注意：首次执行CD后会在数据库生成flyway_schema_history表</p>
</blockquote>
</li>
</ol>
<p><strong>建议首次执行后再次编辑流水线，禁用flyway baseline任务</strong></p>
<p><img src="/images/2021-08-03-19-05-52.png" alt=""></p>
<h2 id="六、flyway-基础命令" tabindex="-1"><a class="header-anchor" href="#六、flyway-基础命令" aria-hidden="true">#</a> 六、Flyway 基础命令</h2>
<h3 id="migrate" tabindex="-1"><a class="header-anchor" href="#migrate" aria-hidden="true">#</a> <strong>Migrate</strong></h3>
<p>Migrate命令将模式迁移到最新版本。如果模式历史表不存在，Flyway会自动创建它。</p>
<p><img src="/images/2021-08-03-19-07-04.png" alt=""></p>
<p>Migrate是Flyway工作流的核心。它会扫描文件系统或类路径，寻找可用的迁移，然后和数据库已经应用的迁移进行比较。如果发现有什么不同，就会迁移数据库以缩小差距。</p>
<p>Migrate最好在应用程序启动时执行，从而避免数据库和期望代码之间出现不兼容的情况。</p>
<h3 id="clean" tabindex="-1"><a class="header-anchor" href="#clean" aria-hidden="true">#</a> <strong>Clean</strong></h3>
<p>Clean命令删除已配置模式中的所有对象。</p>
<p><img src="/images/2021-08-03-19-10-09.png" alt=""></p>
<p>Clean对开发测试有很大帮助。它能将你已配置的模式完全清除，从而有效地提供一个全新的开始。所有对象（表、视图、过程……）都会被删除。</p>
<h3 id="info" tabindex="-1"><a class="header-anchor" href="#info" aria-hidden="true">#</a> <strong>Info</strong></h3>
<p>Info命令打印所有迁移的详细信息和状态信息。</p>
</div></template>


