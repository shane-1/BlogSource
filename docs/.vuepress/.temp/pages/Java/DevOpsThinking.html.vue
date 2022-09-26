<template><div><h1 id="devops-思想" tabindex="-1"><a class="header-anchor" href="#devops-思想" aria-hidden="true">#</a> DevOps 思想</h1>
<p><img src="/images/2020-09-22-10-16-51.png" alt=""></p>
<ul>
<li>DevOps是一种思想或方法论,它涵盖开发-测试-运维整个过程</li>
<li>DevOps强调软件开发与软件测试/软件运维\质量保证QA部门之间有效的沟通与协作</li>
<li>强调通过自动化的方法管理软件变更\软件集成</li>
<li>使软件从构建到测试发布更加快捷和可靠,最终按时交付软件</li>
</ul>
<h2 id="项目开发流程" tabindex="-1"><a class="header-anchor" href="#项目开发流程" aria-hidden="true">#</a> 项目开发流程</h2>
<p><img src="/images/2020-09-22-10-23-02.png" alt=""></p>
<blockquote>
<p>Produce Backlog源自于Scrum方法,是指产品待办事项的合集,其中事务有优先级判断,先处理优先级高的事项</p>
</blockquote>
<h2 id="如何落地实现devops理念" tabindex="-1"><a class="header-anchor" href="#如何落地实现devops理念" aria-hidden="true">#</a> 如何落地实现DevOps理念</h2>
<p>  DevOps兴起与2009年,近年来由于云计算\互联网发展.促进了DevOps的基础设置及工具链的发展,涌现了一大批优秀的工具,这些工具包括开发\测试\运维的各个领域.例如GItHub, GIt/svn, Docker, Jenkins, HudSon, Ant/Maven/Gradle,QUnit, JMeter等</p>
<p><img src="/images/2020-09-22-10-58-19.png" alt=""><br>
<img src="/images/2020-09-22-11-34-20.png" alt=""></p>
<h2 id="持续继承continuous-integration" tabindex="-1"><a class="header-anchor" href="#持续继承continuous-integration" aria-hidden="true">#</a> 持续继承Continuous Integration</h2>
<p>持续集成(CI)是<strong>自动构建</strong>和<strong>测试代码</strong>的过程。</p>
<ul>
<li>在项目早期发现Bug,降低Bug修复成本</li>
<li>自动执行测试(单元测试\静态代码扫描)</li>
<li>创建可用于部署的交付件(artifacts)</li>
</ul>
<h3 id="持续集成的好处" tabindex="-1"><a class="header-anchor" href="#持续集成的好处" aria-hidden="true">#</a> 持续集成的好处</h3>
<ul>
<li>
<p>基于快速反馈提高代码质量</p>
</li>
<li>
<p>触发每个代码更改的自动化测试</p>
</li>
<li>
<p>更好地管理技术债务和代码分析</p>
</li>
<li>
<p>减少长期、困难和引发错误的合并</p>
</li>
<li>
<p>有利于在生产部署之前增加了对代码库健康运行的信心</p>
<blockquote>
<p>关键价值快速反馈给开发人员,降低修复成本</p>
</blockquote>
</li>
</ul>
<h2 id="azure-pipeline" tabindex="-1"><a class="header-anchor" href="#azure-pipeline" aria-hidden="true">#</a> Azure Pipeline</h2>
<p><img src="/images/2020-10-09-09-15-28.png" alt=""></p>
<ul>
<li>通过管道创建可重复,可靠且逐步改进的流程</li>
<li>支持任何语言或平合.Net,Java, Python, PHP, Ruby, C# 和Go</li>
<li>支持不同类型的部署目标- Windows, Linux, MacOS</li>
</ul>
<h3 id="持续集成环境技术架构" tabindex="-1"><a class="header-anchor" href="#持续集成环境技术架构" aria-hidden="true">#</a> 持续集成环境技术架构</h3>
<ul>
<li>代理池 Agent Pool
服务器或组织级别</li>
<li>代理队列 Agent Queue
团队项目级别</li>
<li>代理 Agent
部署在用于执行持续集成的PC(服务
器/客戶端电脑均可)
一个机器可以运行多个 Agent
<ul>
<li>Windows</li>
<li>Linux</li>
<li>Unⅸ</li>
<li>macOS
<img src="/images/2020-10-09-09-25-48.png" alt=""></li>
</ul>
</li>
</ul>
<h2 id="azure-devops持续部署" tabindex="-1"><a class="header-anchor" href="#azure-devops持续部署" aria-hidden="true">#</a> Azure Devops持续部署</h2>
<ul>
<li>Azure Pipeline发布管理功能概述
<ul>
<li>服务终结点 Service Endpoint</li>
<li>发布定义,环境,任务,环境变量,触发器和审批</li>
<li>常用远程操作任务, Windows和 Linux</li>
<li>运行部署和查看部署结果,仪表盘集成</li>
<li>使用环境变量处理环境差异</li>
</ul>
</li>
</ul>
<h3 id="持续部署-continuous-delivery-cd" tabindex="-1"><a class="header-anchor" href="#持续部署-continuous-delivery-cd" aria-hidden="true">#</a> 持续部署(Continuous delivery CD)</h3>
<ul>
<li>允许代码被构建,测试并部署到一个或多个
测试和生产环境</li>
<li>在多个环境中持续部署应用有助于提升质量
控制能力</li>
<li>持续集成(C)产生的交付件( artifact)被持续部
署(CD使用</li>
<li>多个测试和生产环境按照部署顺序/逻辑关
系组合形成流水线( Pipeline),交付件 artifact)
在这个流水线中按照团队需要的方式流动
并使用构建ID和部署|D进行跟踪。</li>
</ul>
</div></template>


