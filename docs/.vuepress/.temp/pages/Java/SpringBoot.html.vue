<template><div><h1 id="springboot" tabindex="-1"><a class="header-anchor" href="#springboot" aria-hidden="true">#</a> SpringBoot</h1>
<h2 id="回顾什么是spring" tabindex="-1"><a class="header-anchor" href="#回顾什么是spring" aria-hidden="true">#</a> 回顾什么是Spring</h2>
<p>Spring是一个开源框架，2003 年兴起的一个轻量级的Java 开发框架，作者：Rod Johnson  。</p>
<p><strong>Spring是为了解决企业级应用开发的复杂性而创建的，简化开发。</strong></p>
<h2 id="spring是如何简化java开发的" tabindex="-1"><a class="header-anchor" href="#spring是如何简化java开发的" aria-hidden="true">#</a> Spring是如何简化Java开发的</h2>
<p>为了降低Java开发的复杂性，Spring采用了以下4种关键策略：</p>
<p>1、基于POJO的轻量级和最小侵入性编程，所有东西都是bean；</p>
<p>2、通过IOC，依赖注入（DI）和面向接口实现松耦合；</p>
<p>3、基于切面（AOP）和惯例进行声明式编程；</p>
<p>4、通过切面和模版减少样式代码，RedisTemplate，xxxTemplate；</p>
<h2 id="什么是springboot" tabindex="-1"><a class="header-anchor" href="#什么是springboot" aria-hidden="true">#</a> 什么是SpringBoot</h2>
<p>学过javaweb的同学就知道，开发一个web应用，从最初开始接触Servlet结合Tomcat, 跑出一个Hello Wolrld程序，是要经历特别多的步骤；后来就用了框架Struts，再后来是SpringMVC，到了现在的SpringBoot，过一两年又会有其他web框架出现；你们有经历过框架不断的演进，然后自己开发项目所有的技术也在不断的变化、改造吗？建议都可以去经历一遍；</p>
<p>言归正传，什么是SpringBoot呢，就是一个javaweb的开发框架，和SpringMVC类似，对比其他javaweb框架的好处，<strong>官方说是简化开发，约定大于配置</strong>，  you can &quot;just run&quot;，能迅速的开发web应用，几行代码开发一个http接口。</p>
<p>所有的技术框架的发展似乎都遵循了一条主线规律：从一个复杂应用场景 衍生 一种规范框架，人们只需要进行各种配置而不需要自己去实现它，这时候强大的配置功能成了优点；发展到一定程度之后，人们根据实际生产应用情况，选取其中实用功能和设计精华，重构出一些轻量级的框架；之后为了提高开发效率，嫌弃原先的各类配置过于麻烦，于是开始提倡“约定大于配置”，进而衍生出一些一站式的解决方案。</p>
<p>是的这就是Java企业级应用-&gt;J2EE-&gt;spring-&gt;springboot-&gt;springcloud的过程。</p>
<p>随着 Spring 不断的发展，涉及的领域越来越多，项目整合开发需要配合各种各样的文件，慢慢变得不那么易用简单，违背了最初的理念，甚至人称配置地狱。Spring Boot 正是在这样的一个背景下被抽象出来的开发框架，目的为了让大家更容易的使用 Spring 、更容易的集成各种常用的中间件、开源软件；</p>
<p>Spring Boot 基于 Spring 开发，Spirng Boot 本身并不提供 Spring 框架的核心特性以及扩展功能，只是用于快速、敏捷地开发新一代基于 Spring 框架的应用程序。也就是说，它并不是用来替代 Spring 的解决方案，而是和 Spring 框架紧密结合用于提升 Spring 开发者体验的工具。Spring Boot 以<strong>约定大于配置的核心思想</strong>，默认帮我们进行了很多设置，多数 Spring Boot 应用只需要很少的 Spring 配置。同时它集成了大量常用的第三方库配置（例如 Redis、MongoDB、Jpa、RabbitMQ、Quartz 等等），Spring Boot 应用中这些第三方库几乎可以零配置的开箱即用。</p>
<p>简单来说就是SpringBoot其实不是什么新的框架，它默认配置了很多框架的使用方式，就像maven整合了所有的jar包，spring boot整合了所有的框架 。</p>
<p>Spring Boot 出生名门，从一开始就站在一个比较高的起点，又经过这几年的发展，生态足够完善，Spring Boot 已经当之无愧成为 Java 领域最热门的技术。</p>
<h2 id="spring-boot的主要优点" tabindex="-1"><a class="header-anchor" href="#spring-boot的主要优点" aria-hidden="true">#</a> Spring Boot的主要优点：</h2>
<ul>
<li>为所有Spring开发者更快的入门</li>
<li><strong>开箱即用</strong>，提供各种默认配置来简化项目配置</li>
<li>内嵌式容器简化Web项目</li>
<li>没有冗余代码生成和XML配置的要求</li>
</ul>
<h2 id="微服务" tabindex="-1"><a class="header-anchor" href="#微服务" aria-hidden="true">#</a> 微服务</h2>
<h3 id="什么是微服务" tabindex="-1"><a class="header-anchor" href="#什么是微服务" aria-hidden="true">#</a> 什么是微服务?</h3>
<p>微服务是一种架构风格,它要求我们在开发一个应用的时候,这个应用必须构建成一系列小服务的组合;可以通过http的方式进行互通。要说微服架构,先得说说过去我们的单体应用架构。</p>
<h3 id="单体应用架构" tabindex="-1"><a class="header-anchor" href="#单体应用架构" aria-hidden="true">#</a> 单体应用架构</h3>
<p>所谓单体应用架构( all in one)是指,我们将一个应用的中的所有应用服务都封装在一个应用中</p>
<p>无论是ERP、CRM或是其他什么系统,你都把数据库访问,web访问,等等各个功能放到一个war
包内。</p>
<ul>
<li>这样做的好处是,易于开发和测试;也十分方便部署;当需要扩展时,只需要将war复制多份,然后放到多个服务器上,再做个负载均衡就可以了。</li>
<li>单体应用架构的缺点是,哪怕我要修改一个非常小的地方,我都需要停掉整个服务,重新打包、部署这个应用war包。特别是对于一个大型应用,我们不可能吧所有内容都放在一个应用里面,我们如何维护、如何分工合作都是问题。</li>
</ul>
<h3 id="微服务架构" tabindex="-1"><a class="header-anchor" href="#微服务架构" aria-hidden="true">#</a> 微服务架构</h3>
<p>all in one的架构方式,我们把所有的功能单元放在一个应用里面。然后我们把整个应用部署到服务器上。如果负载能力不行,我们将整个应用进行水平复制,进行扩展,然后在负载均衡。</p>
<p>所谓微服务架构,就是打破之前all in one的架构方式,把每个功能元独立出来。把独立出来的功能元素的动态组合,需要的功能元素才去拿来组合,需要多一些功能时可以去整合多个功能元素。所以微服务架构是对功能元素进行复制,而没有对整个应用进行复制。</p>
<p>这样做的好处是</p>
<ol>
<li>节省了调用资源。</li>
<li>每个功能元素的服务都是一个可替换的、可独立升级的软件代码。</li>
</ol>
<h3 id="详细阐明" tabindex="-1"><a class="header-anchor" href="#详细阐明" aria-hidden="true">#</a> 详细阐明</h3>
<p><img src="/images/2020-10-14-09-57-40.png" alt=""></p>
<blockquote>
<p>图片来源于</p>
<p>Microservices</p>
<p>——a definition of this new architectural term</p>
</blockquote>
<p>推荐阅读下面论文:</p>
<ul>
<li><a href="http://martinfowler.com/articles/microservices.html" target="_blank" rel="noopener noreferrer">原文地址<ExternalLinkIcon/></a></li>
<li><a href="https://shane-1.github.io/Note/microserveices.html" target="_blank" rel="noopener noreferrer">中文翻译<ExternalLinkIcon/></a></li>
</ul>
<h2 id="扩展-网络架构发展" tabindex="-1"><a class="header-anchor" href="#扩展-网络架构发展" aria-hidden="true">#</a> 扩展:网络架构发展:</h2>
<p>随着互联网的发展，网站应用的规模不断扩大，常规的垂直应用架构已无法应对，分布式服务架构以及流动计算架构势在必行，亟需一个治理系统确保架构有条不紊的演进。</p>
<p><img src="/images/2020-10-14-09-41-42.png" alt=""></p>
<h3 id="单一应用架构" tabindex="-1"><a class="header-anchor" href="#单一应用架构" aria-hidden="true">#</a> 单一应用架构</h3>
<p>当网站流量很小时，只需一个应用，将所有功能都部署在一起，以减少部署节点和成本。此时，用于简化增删改查工作量的数据访问框架(ORM)是关键。</p>
<h3 id="垂直应用架构" tabindex="-1"><a class="header-anchor" href="#垂直应用架构" aria-hidden="true">#</a> 垂直应用架构</h3>
<p>当访问量逐渐增大，单一应用增加机器带来的加速度越来越小，提升效率的方法之一是将应用拆成互不相干的几个应用，以提升效率。此时，用于加速前端页面开发的Web框架(MVC)是关键。</p>
<h3 id="分布式服务架构" tabindex="-1"><a class="header-anchor" href="#分布式服务架构" aria-hidden="true">#</a> 分布式服务架构</h3>
<p>当垂直应用越来越多，应用之间交互不可避免，将核心业务抽取出来，作为独立的服务，逐渐形成稳定的服务中心，使前端应用能更快速的响应多变的市场需求。此时，用于提高业务复用及整合的分布式服务框架(RPC)是关键。</p>
<h3 id="流动计算架构" tabindex="-1"><a class="header-anchor" href="#流动计算架构" aria-hidden="true">#</a> 流动计算架构</h3>
<p>当服务越来越多，容量的评估，小服务资源的浪费等问题逐渐显现，此时需增加一个调度中心基于访问压力实时管理集群容量，提高集群利用率。此时，用于提高机器利用率的资源调度和治理中心(SOA)是关键。</p>
<h2 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> Hello，World !</h2>
<h3 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h3>
<p>我们将学习如何快速的创建一个Spring Boot应用，并且实现一个简单的Http请求处理。通过这个例子对Spring Boot有一个初步的了解，并体验其结构简单、开发快速的特性。</p>
<p>我的环境准备：</p>
<ul>
<li>java version &quot;1.8.0_181&quot;</li>
<li>Maven-3.6.1</li>
<li>SpringBoot 2.x 最新版</li>
</ul>
<p>开发工具：</p>
<ul>
<li>IDEA</li>
</ul>
<h2 id="创建基础项目说明" tabindex="-1"><a class="header-anchor" href="#创建基础项目说明" aria-hidden="true">#</a> 创建基础项目说明</h2>
<p>Spring官方提供了非常方便的工具让我们快速构建应用</p>
<p>Spring Initializr：https://start.spring.io/</p>
<h3 id="项目创建方式一" tabindex="-1"><a class="header-anchor" href="#项目创建方式一" aria-hidden="true">#</a> 项目创建方式一：</h3>
<p><strong>使用Spring Initializr 的 Web页面创建项目</strong></p>
<ol>
<li>打开  https://start.spring.io/</li>
<li>填写项目信息</li>
<li>点击”Generate Project“按钮生成项目；下载此项目</li>
<li>解压项目包，并用IDEA以Maven项目导入，一路下一步即可，直到项目导入完毕。</li>
<li>如果是第一次使用，可能速度会比较慢，包比较多、需要耐心等待一切就绪。</li>
</ol>
<h3 id="项目创建方式二" tabindex="-1"><a class="header-anchor" href="#项目创建方式二" aria-hidden="true">#</a> 项目创建方式二：</h3>
<p><strong>使用 IDEA 直接创建项目</strong></p>
<ol>
<li>创建一个新项目</li>
<li>选择spring initalizr ， 可以看到默认就是去官网的快速构建工具那里实现</li>
<li>填写项目信息</li>
<li>选择初始化的组件（初学勾选 Web 即可）</li>
<li>填写项目路径</li>
<li>等待项目构建成功</li>
</ol>
<h3 id="项目结构分析" tabindex="-1"><a class="header-anchor" href="#项目结构分析" aria-hidden="true">#</a> 项目结构分析：</h3>
<p>通过上面步骤完成了基础项目的创建。就会自动生成以下文件。</p>
<ol>
<li>程序的主启动类</li>
<li>一个 application.properties 配置文件</li>
<li>一个 测试类</li>
<li>一个 pom.xml</li>
</ol>
<h2 id="pom-xml-分析" tabindex="-1"><a class="header-anchor" href="#pom-xml-分析" aria-hidden="true">#</a> pom.xml 分析</h2>
<p>打开pom.xml，看看Spring Boot项目的依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>
<span class="token comment">&lt;!-- 父依赖 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.5.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>relativePath</span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- web场景启动器 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- springboot单元测试 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 剔除依赖 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.junit.vintage<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit-vintage-engine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 打包插件 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编写一个http接口" tabindex="-1"><a class="header-anchor" href="#编写一个http接口" aria-hidden="true">#</a> 编写一个http接口</h2>
<p>1、在主程序的同级目录下，新建一个controller包，一定要在同级目录下，否则识别不到</p>
<p>2、在包中新建一个HelloController类</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>@RestControllerpublic class HelloController {
    @RequestMapping("/hello")    public String hello() {        return "Hello World";    }    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3、编写完毕后，从主程序启动项目，浏览器发起请求，看页面返回；控制台输出了 Tomcat 访问的端口号！</p>
<p><img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7L1vFQMnaRIJSmeZ58T2eZic3WmhvicMATPwQLpTwLtWWE0aQs32iaEKyFnVViacPQbtEdCjBXm5yZf0A/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="img"></p>
<p>简单几步，就完成了一个web接口的开发，SpringBoot就是这么简单。所以我们常用它来建立我们的微服务项目！</p>
<h2 id="将项目打成jar包-点击-maven的-package" tabindex="-1"><a class="header-anchor" href="#将项目打成jar包-点击-maven的-package" aria-hidden="true">#</a> 将项目打成jar包，点击 maven的 package</h2>
<p><img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7L1vFQMnaRIJSmeZ58T2eZiczfno2TOQbfItia25xQzicMFnkicKh5pVD7IrHrUicb03y381CicrLFKXNMw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="img"></p>
<p>如果遇到以上错误，可以配置打包时 跳过项目运行测试用例</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;!--    在工作中,很多情况下我们打包是不想执行测试用例的    可能是测试用例不完事,或是测试用例会影响数据库数据    跳过测试用例执    -->&lt;plugin>    &lt;groupId>org.apache.maven.plugins&lt;/groupId>    &lt;artifactId>maven-surefire-plugin&lt;/artifactId>    &lt;configuration>        &lt;!--跳过项目运行测试用例-->        &lt;skipTests>true&lt;/skipTests>    &lt;/configuration>&lt;/plugin>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果打包成功，则会在target目录下生成一个 jar 包</p>
<p><img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7L1vFQMnaRIJSmeZ58T2eZic03vupvIqMbibWh4aIKyjiaQfwuvDWKo033g9kRvj6aXnJO4brKTdwnvA/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="img"></p>
<p>打成了jar包后，就可以在任何地方运行了！OK</p>
<p><strong>彩蛋</strong></p>
<p>如何更改启动时显示的字符拼成的字母，SpringBoot呢？也就是 banner 图案；</p>
<p>只需一步：到项目下的 resources 目录下新建一个banner.txt 即可。</p>
<p>图案可以到：https://www.bootschool.net/ascii 这个网站生成，然后拷贝到文件中即可！</p>
<p><img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7L1vFQMnaRIJSmeZ58T2eZicDRbeN90LEmYYxoxkr55ic6RaCrbs16z0kS78s9RpHUZdZyOJ2BegGKg/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="img"></p>
<p><strong>SpringBoot这么简单的东西背后一定有故事，我们之后去进行一波源码分析！</strong></p>
<p>我们之前写的HelloSpringBoot，到底是怎么运行的呢，Maven项目，我们一般从pom.xml文件探究起；</p>
<blockquote>
<p><strong>pom.xml</strong></p>
</blockquote>
<h2 id="父依赖" tabindex="-1"><a class="header-anchor" href="#父依赖" aria-hidden="true">#</a> 父依赖</h2>
<p>其中它主要是依赖一个父项目，主要是管理项目的资源过滤及插件！</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;parent>    &lt;groupId>org.springframework.boot&lt;/groupId>    &lt;artifactId>spring-boot-starter-parent&lt;/artifactId>    &lt;version>2.2.5.RELEASE&lt;/version>    &lt;relativePath/> &lt;!-- lookup parent from repository -->&lt;/parent>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>点进去，发现还有一个父依赖</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;parent>    &lt;groupId>org.springframework.boot&lt;/groupId>    &lt;artifactId>spring-boot-dependencies&lt;/artifactId>    &lt;version>2.2.5.RELEASE&lt;/version>    &lt;relativePath>../../spring-boot-dependencies&lt;/relativePath>&lt;/parent>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里才是真正管理SpringBoot应用里面所有依赖版本的地方，SpringBoot的版本控制中心；</p>
<p><strong>以后我们导入依赖默认是不需要写版本；但是如果导入的包没有在依赖中管理着就需要手动配置版本了；</strong></p>
<h2 id="启动器-spring-boot-starter" tabindex="-1"><a class="header-anchor" href="#启动器-spring-boot-starter" aria-hidden="true">#</a> 启动器 spring-boot-starter</h2>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;dependency>    &lt;groupId>org.springframework.boot&lt;/groupId>    &lt;artifactId>spring-boot-starter-web&lt;/artifactId>&lt;/dependency>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>springboot-boot-starter-xxx</strong>：就是spring-boot的场景启动器</p>
<p><strong>spring-boot-starter-web</strong>：帮我们导入了web模块正常运行所依赖的组件；</p>
<p>SpringBoot将所有的功能场景都抽取出来，做成一个个的starter （启动器），只需要在项目中引入这些starter即可，所有相关的依赖都会导入进来 ， 我们要用什么功能就导入什么样的场景启动器即可 ；我们未来也可以自己自定义 starter；</p>
<blockquote>
<p><strong>主启动类</strong></p>
</blockquote>
<p>分析完了 pom.xml 来看看这个启动类</p>
<h2 id="默认的主启动类" tabindex="-1"><a class="header-anchor" href="#默认的主启动类" aria-hidden="true">#</a> 默认的主启动类</h2>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//@SpringBootApplication 来标注一个主程序类//说明这是一个Spring Boot应用@SpringBootApplicationpublic class SpringbootApplication {
   public static void main(String[] args) {     //以为是启动了一个方法，没想到启动了一个服务      SpringApplication.run(SpringbootApplication.class, args);   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是**一个简单的启动类并不简单！**我们来分析一下这些注解都干了什么</p>
<h2 id="springbootapplication" tabindex="-1"><a class="header-anchor" href="#springbootapplication" aria-hidden="true">#</a> @SpringBootApplication</h2>
<p>作用：标注在某个类上说明这个类是SpringBoot的主配置类 ， SpringBoot就应该运行这个类的main方法来启动SpringBoot应用；</p>
<p>进入这个注解：可以看到上面还有很多其他注解！</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>@SpringBootConfiguration@EnableAutoConfiguration@ComponentScan(    excludeFilters = {@Filter(    type = FilterType.CUSTOM,    classes = {TypeExcludeFilter.class}), @Filter(    type = FilterType.CUSTOM,    classes = {AutoConfigurationExcludeFilter.class})})public @interface SpringBootApplication {    // ......}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="componentscan" tabindex="-1"><a class="header-anchor" href="#componentscan" aria-hidden="true">#</a> @ComponentScan</h2>
<p>这个注解在Spring中很重要 ,它对应XML配置中的元素。</p>
<p>作用：自动扫描并加载符合条件的组件或者bean ， 将这个bean定义加载到IOC容器中</p>
<h2 id="springbootconfiguration" tabindex="-1"><a class="header-anchor" href="#springbootconfiguration" aria-hidden="true">#</a> @SpringBootConfiguration</h2>
<p>作用：SpringBoot的配置类 ，标注在某个类上 ， 表示这是一个SpringBoot的配置类；</p>
<p>我们继续进去这个注解查看</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// 点进去得到下面的 @Component@Configurationpublic @interface SpringBootConfiguration {}
@Componentpublic @interface Configuration {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的 @Configuration，说明这是一个配置类 ，配置类就是对应Spring的xml 配置文件；</p>
<p>里面的 @Component 这就说明，启动类本身也是Spring中的一个组件而已，负责启动应用！</p>
<p>我们回到 SpringBootApplication 注解中继续看。</p>
<h2 id="enableautoconfiguration" tabindex="-1"><a class="header-anchor" href="#enableautoconfiguration" aria-hidden="true">#</a> @EnableAutoConfiguration</h2>
<p><strong>@EnableAutoConfiguration ：开启自动配置功能</strong></p>
<p>以前我们需要自己配置的东西，而现在SpringBoot可以自动帮我们配置 ；@EnableAutoConfiguration告诉SpringBoot开启自动配置功能，这样自动配置才能生效；</p>
<p>点进注解接续查看：</p>
<p><strong>@AutoConfigurationPackage ：自动配置包</strong></p>
<ul>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>@Import({Registrar.class})public @interface AutoConfigurationPackage {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>@import</strong> ：Spring底层注解@import ， 给容器中导入一个组件</p>
<p>Registrar.class 作用：将主启动类的所在包及包下面所有子包里面的所有组件扫描到Spring容器 ；</p>
<p>这个分析完了，退到上一步，继续看</p>
<p><strong>@Import({AutoConfigurationImportSelector.class}) ：给容器导入组件 ；</strong></p>
<p>AutoConfigurationImportSelector ：自动配置导入选择器，那么它会导入哪些组件的选择器呢？我们点击去这个类看源码：</p>
<p>1、这个类中有一个这样的方法</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// 获得候选的配置protected List&lt;String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {    //这里的getSpringFactoriesLoaderFactoryClass（）方法    //返回的就是我们最开始看的启动自动导入配置文件的注解类；EnableAutoConfiguration    List&lt;String> configurations = SpringFactoriesLoader.loadFactoryNames(this.getSpringFactoriesLoaderFactoryClass(), this.getBeanClassLoader());    Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you are using a custom packaging, make sure that file is correct.");    return configurations;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、这个方法又调用了  SpringFactoriesLoader 类的静态方法！我们进入SpringFactoriesLoader类loadFactoryNames() 方法</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>public static List&lt;String> loadFactoryNames(Class&lt;?> factoryClass, @Nullable ClassLoader classLoader) {    String factoryClassName = factoryClass.getName();    //这里它又调用了 loadSpringFactories 方法    return (List)loadSpringFactories(classLoader).getOrDefault(factoryClassName, Collections.emptyList());}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、我们继续点击查看 loadSpringFactories 方法</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>private static Map&lt;String, List&lt;String>> loadSpringFactories(@Nullable ClassLoader classLoader) {    //获得classLoader ， 我们返回可以看到这里得到的就是EnableAutoConfiguration标注的类本身    MultiValueMap&lt;String, String> result = (MultiValueMap)cache.get(classLoader);    if (result != null) {        return result;    } else {        try {            //去获取一个资源 "META-INF/spring.factories"            Enumeration&lt;URL> urls = classLoader != null ? classLoader.getResources("META-INF/spring.factories") : ClassLoader.getSystemResources("META-INF/spring.factories");            LinkedMultiValueMap result = new LinkedMultiValueMap();
            //将读取到的资源遍历，封装成为一个Properties            while(urls.hasMoreElements()) {                URL url = (URL)urls.nextElement();                UrlResource resource = new UrlResource(url);                Properties properties = PropertiesLoaderUtils.loadProperties(resource);                Iterator var6 = properties.entrySet().iterator();
                while(var6.hasNext()) {                    Entry&lt;?, ?> entry = (Entry)var6.next();                    String factoryClassName = ((String)entry.getKey()).trim();                    String[] var9 = StringUtils.commaDelimitedListToStringArray((String)entry.getValue());                    int var10 = var9.length;
                    for(int var11 = 0; var11 &lt; var10; ++var11) {                        String factoryName = var9[var11];                        result.add(factoryClassName, factoryName.trim());                    }                }            }
            cache.put(classLoader, result);            return result;        } catch (IOException var13) {            throw new IllegalArgumentException("Unable to load factories from location [META-INF/spring.factories]", var13);        }    }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、发现一个多次出现的文件：spring.factories，全局搜索它</p>
<h2 id="spring-factories" tabindex="-1"><a class="header-anchor" href="#spring-factories" aria-hidden="true">#</a> spring.factories</h2>
<p>我们根据源头打开spring.factories ， 看到了很多自动配置的文件；这就是自动配置根源所在！</p>
<p><img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7L1vFQMnaRIJSmeZ58T2eZicEIZDCZKtTPxQrKTvEdxHFGsG824OkO8XN8CfP2x4OdpC8DwjHYwcFw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="img"></p>
<p><strong>WebMvcAutoConfiguration</strong></p>
<p>我们在上面的自动配置类随便找一个打开看看，比如 ：WebMvcAutoConfiguration</p>
<p><img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7L1vFQMnaRIJSmeZ58T2eZicaV7UfSRiaRdCHNmHE1wS10QwbLEVZJLB2sN9ztcvjx7n2dKDJ0HrCmA/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="img"></p>
<p>可以看到这些一个个的都是JavaConfig配置类，而且都注入了一些Bean，可以找一些自己认识的类，看着熟悉一下！</p>
<p>所以，自动配置真正实现是从classpath中搜寻所有的META-INF/spring.factories配置文件 ，并将其中对应的 org.springframework.boot.autoconfigure. 包下的配置项，通过反射实例化为对应标注了 @Configuration的JavaConfig形式的IOC容器配置类 ， 然后将这些都汇总成为一个实例并加载到IOC容器中。</p>
<p><strong>结论：</strong></p>
<ol>
<li>SpringBoot在启动的时候从类路径下的META-INF/spring.factories中获取EnableAutoConfiguration指定的值</li>
<li>将这些值作为自动配置类导入容器 ， 自动配置类就生效 ， 帮我们进行自动配置工作；</li>
<li>整个J2EE的整体解决方案和自动配置都在springboot-autoconfigure的jar包中；</li>
<li>它会给容器中导入非常多的自动配置类 （xxxAutoConfiguration）, 就是给容器中导入这个场景需要的所有组件 ， 并配置好这些组件 ；</li>
<li>有了自动配置类 ， 免去了我们手动编写配置注入功能组件等的工作；</li>
</ol>
<p><strong>现在大家应该大概的了解了下，SpringBoot的运行原理，后面我们还会深化一次！</strong></p>
<blockquote>
<p><strong>SpringApplication</strong></p>
</blockquote>
<h2 id="不简单的方法" tabindex="-1"><a class="header-anchor" href="#不简单的方法" aria-hidden="true">#</a> 不简单的方法</h2>
<p>我最初以为就是运行了一个main方法，没想到却开启了一个服务；</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>@SpringBootApplicationpublic class SpringbootApplication {    public static void main(String[] args) {        SpringApplication.run(SpringbootApplication.class, args);    }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>SpringApplication.run分析</strong></p>
<p>分析该方法主要分两部分，一部分是SpringApplication的实例化，二是run方法的执行；</p>
<h2 id="springapplication" tabindex="-1"><a class="header-anchor" href="#springapplication" aria-hidden="true">#</a> SpringApplication</h2>
<p><strong>这个类主要做了以下四件事情：</strong></p>
<p>1、推断应用的类型是普通的项目还是Web项目</p>
<p>2、查找并加载所有可用初始化器 ， 设置到initializers属性中</p>
<p>3、找出所有的应用程序监听器，设置到listeners属性中</p>
<p>4、推断并设置main方法的定义类，找到运行的主类</p>
<p>查看构造器：</p>
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>public SpringApplication(ResourceLoader resourceLoader, Class... primarySources) {    // ......    this.webApplicationType = WebApplicationType.deduceFromClasspath();    this.setInitializers(this.getSpringFactoriesInstances();    this.setListeners(this.getSpringFactoriesInstances(ApplicationListener.class));    this.mainApplicationClass = this.deduceMainApplicationClass();}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="run方法流程分析" tabindex="-1"><a class="header-anchor" href="#run方法流程分析" aria-hidden="true">#</a> run方法流程分析</h2>
<p><img src="https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7L1vFQMnaRIJSmeZ58T2eZicjafiawQLp9u8wc4ic1Mjy6OyfibzfjVofeL5pnS1NSFKVjlIg6neI9ySg/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="img"></p>
<p>跟着源码和这幅图就可以一探究竟了！</p>
</div></template>


