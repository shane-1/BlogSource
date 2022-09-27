<template><div><h1 id="spring框架" tabindex="-1"><a class="header-anchor" href="#spring框架" aria-hidden="true">#</a> Spring框架</h1>
<blockquote>
<p>4.0</p>
</blockquote>
<h2 id="第1章-spring概述" tabindex="-1"><a class="header-anchor" href="#第1章-spring概述" aria-hidden="true">#</a> 第1章  Spring概述</h2>
<h3 id="_1-1-spring概述" tabindex="-1"><a class="header-anchor" href="#_1-1-spring概述" aria-hidden="true">#</a> 1.1 Spring概述</h3>
<ol>
<li>Spring是一个开源框架</li>
<li>Spring为简化企业级开发而生，使用Spring，JavaBean就可以实现很多以前要靠EJB才能实现的功能。同样的功能，在EJB中要通过繁琐的配置和复杂的代码才能够实现，而在Spring中却非常的优雅和简洁。</li>
<li>Spring是一个<code v-pre>IOC(DI)</code>和<code v-pre>AOP</code>容器框架。</li>
<li>Spring的优良特性<br>
①	非侵入式：基于Spring开发的应用中的对象可以不依赖于Spring的API<br>
②  依赖注入：DI——Dependency Injection，反转控制(IOC)最经典的实现。<br>
③  面向切面编程：Aspect Oriented Programming——AOP<br>
④  容器：Spring是一个容器，因为它包含并且管理应用对象的生命周期<br>
⑤  组件化：Spring实现了使用简单的组件配置组合成一个复杂的应用。在 Spring 中可以使用XML和Java注解组合这些对象。<br></li>
<li>一站式：在IOC和AOP的基础上可以整合各种企业应用的开源框架和优秀的第三方类库（实际上Spring 自身也提供了表述层的SpringMVC和持久层的Spring JDBC）。<br></li>
<li>Spring模块</li>
</ol>
<p><img src="/images/2020-04-09-16-55-24.png" alt=""><br></p>
<h3 id="_1-2-安装spring插件" tabindex="-1"><a class="header-anchor" href="#_1-2-安装spring插件" aria-hidden="true">#</a> 1.2 安装Spring插件</h3>
<ol>
<li>插件包：springsource-tool-suite-3.4.0.RELEASE-e4.3.1-updatesite.zip</li>
<li>操作步骤：参照《[尚硅谷]_参考资料：安装Springtools插件.doc</li>
</ol>
<h3 id="_1-3搭建spring运行时环境" tabindex="-1"><a class="header-anchor" href="#_1-3搭建spring运行时环境" aria-hidden="true">#</a> 1.3搭建Spring运行时环境</h3>
<ol>
<li>加入JAR包
① Spring自身JAR包：<br><code v-pre>spring-framework-4.0.0.RELEASE\libs</code>目录下<br></li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>spring-beans-4.0.0.RELEASE.jar
spring-context-4.0.0.RELEASE.jar
spring-core-4.0.0.RELEASE.jar
spring-expression-4.0.0.RELEASE.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>② <code v-pre>commons-logging-1.1.1.jar</code>
2. 在Spring Tool Suite工具中通过如下步骤创建Spring的配置文件<br>
① File-&gt;New-&gt;Spring Bean Configuration File<br>
② 为文件取名字 例如：applicationContext.xml<br></p>
<h3 id="_1-4-helloworld" tabindex="-1"><a class="header-anchor" href="#_1-4-helloworld" aria-hidden="true">#</a> 1.4 HelloWorld</h3>
<ol>
<li>目标：使用Spring创建对象，为属性赋值</li>
<li>创建Student类
<img src="/images/2020-04-09-18-40-10.png" alt=""><br></li>
<li>创建Spring配置文件</li>
</ol>
<div class="language-XML ext-XML line-numbers-mode"><pre v-pre class="language-XML"><code>&lt;!-- 使用bean元素定义一个由IOC容器创建的对象 --&gt;
	&lt;!-- class属性指定用于创建bean的全类名 --&gt;
	&lt;!-- id属性指定用于引用bean实例的标识 --&gt;
	&lt;bean id=&quot;student&quot; class=&quot;com.atguigu.helloworld.bean.Student&quot;&gt;
		&lt;!-- 使用property子元素为bean的属性赋值 --&gt;
		&lt;property name=&quot;studentId&quot; value=&quot;1001&quot;/&gt;
		&lt;property name=&quot;stuName&quot; value=&quot;Tom2015&quot;/&gt;
		&lt;property name=&quot;age&quot; value=&quot;20&quot;/&gt;
	&lt;/bean&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>测试：通过Spring的IOC容器创建Student类实例</li>
</ol>
<div class="language-JAVA ext-JAVA line-numbers-mode"><pre v-pre class="language-JAVA"><code>//1.创建IOC容器对象
ApplicationContext iocContainer = 
		new ClassPathXmlApplicationContext(&quot;helloworld.xml&quot;);
//2.根据id值获取bean实例对象
Student student = (Student) iocContainer.getBean(&quot;student&quot;);
//3.打印bean
System.out.println(student);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第2章-ioc容器和bean的配置" tabindex="-1"><a class="header-anchor" href="#第2章-ioc容器和bean的配置" aria-hidden="true">#</a> 第2章  IOC容器和Bean的配置</h2>
<h3 id="_2-1-ioc和di" tabindex="-1"><a class="header-anchor" href="#_2-1-ioc和di" aria-hidden="true">#</a> 2.1 IOC和DI</h3>
<h4 id="_2-1-1-ioc-inversion-of-control-反转控制" tabindex="-1"><a class="header-anchor" href="#_2-1-1-ioc-inversion-of-control-反转控制" aria-hidden="true">#</a> 2.1.1 IOC(Inversion of Control)：反转控制</h4>
<p>  在应用程序中的组件需要获取资源时，传统的方式是组件主动的从容器中获取所需要的资源，在这样的模式下开发人员往往需要知道在具体容器中特定资源的获取方式，增加了学习成本，同时降低了开发效率。<br>
  反转控制的思想完全颠覆了应用程序组件获取资源的传统方式：反转了资源的获取方向——改由容器主动的将资源推送给需要的组件，开发人员不需要知道容器是如何创建资源对象的，只需要提供接收资源的方式即可，极大的降低了学习成本，提高了开发的效率。这种行为也称为查找的<strong>被动形式</strong>。</p>
<h4 id="_2-1-2-di-dependency-injection-依赖注入" tabindex="-1"><a class="header-anchor" href="#_2-1-2-di-dependency-injection-依赖注入" aria-hidden="true">#</a> 2.1.2 DI(Dependency Injection)：依赖注入</h4>
<p>  IOC的另一种表述方式：即组件以一些预先定义好的方式(例如：setter 方法)接受来自于容器的资源注入。相对于IOC而言，这种表述更直接。<br>
  IOC 描述的是一种思想，而DI 是对IOC思想的具体实现.</p>
<h4 id="_2-1-3-ioc容器在spring中的实现" tabindex="-1"><a class="header-anchor" href="#_2-1-3-ioc容器在spring中的实现" aria-hidden="true">#</a> 2.1.3 IOC容器在Spring中的实现</h4>
<ol>
<li>在通过IOC容器读取Bean的实例之前，需要先将IOC容器本身实例化。</li>
<li>Spring提供了IOC容器的两种实现方式<br>
① BeanFactory：IOC容器的基本实现，是Spring内部的基础设施，是面向Spring本身的，不是提供给开发人员使用的。<br>
② ApplicationContext：BeanFactory的子接口，提供了更多高级特性。面向Spring的使用者，几乎所有场合都使用ApplicationContext而不是底层的BeanFactory
<img src="/images/2020-04-09-18-49-39.png" alt=""><br></li>
</ol>
<h4 id="_2-1-4-applicationcontext的主要实现类" tabindex="-1"><a class="header-anchor" href="#_2-1-4-applicationcontext的主要实现类" aria-hidden="true">#</a> 2.1.4 ApplicationContext的主要实现类</h4>
<ol>
<li>ClassPathXmlApplicationContext：对应类路径下的XML格式的配置文件</li>
<li>FileSystemXmlApplicationContext：对应文件系统中的XML格式的配置文件</li>
<li>在初始化时就创建单例的bean，也可以通过配置的方式指定创建的Bean是多实例的。</li>
</ol>
<h4 id="_2-1-5-configurableapplicationcontext" tabindex="-1"><a class="header-anchor" href="#_2-1-5-configurableapplicationcontext" aria-hidden="true">#</a> 2.1.5 ConfigurableApplicationContext</h4>
<ol>
<li>是ApplicationContext的子接口，包含一些扩展方法</li>
<li>refresh()和close()让ApplicationContext具有启动、关闭和刷新上下文的能力。</li>
</ol>
<h4 id="_2-1-6-webapplicationcontext" tabindex="-1"><a class="header-anchor" href="#_2-1-6-webapplicationcontext" aria-hidden="true">#</a> 2.1.6 WebApplicationContext</h4>
<ol>
<li>专门为WEB应用而准备的，它允许从相对于WEB根目录的路径中完成初始化工作</li>
</ol>
<h3 id="_2-2-通过类型获取bean" tabindex="-1"><a class="header-anchor" href="#_2-2-通过类型获取bean" aria-hidden="true">#</a> 2.2 通过类型获取bean</h3>
<ol>
<li>
<p>从IOC容器中获取bean时，除了通过id值获取，还可以通过bean的类型获取。但如果同一个类型的bean在XML文件中配置了多个，则获取时会抛出异常，所以同一个类型的bean在容器中必须是唯一的。
<code v-pre>HelloWorld helloWorld = cxt.getBean(HelloWorld. class);</code></p>
</li>
<li>
<p>或者可以使用另外一个重载的方法，同时指定bean的id值和类型
<code v-pre>HelloWorld helloWorld = cxt.getBean(“helloWorld”,HelloWorld. class);</code></p>
</li>
</ol>
<h3 id="_2-3-给bean的属性赋值" tabindex="-1"><a class="header-anchor" href="#_2-3-给bean的属性赋值" aria-hidden="true">#</a> 2.3 给bean的属性赋值</h3>
<h4 id="_2-3-1-依赖注入的方式" tabindex="-1"><a class="header-anchor" href="#_2-3-1-依赖注入的方式" aria-hidden="true">#</a> 2.3.1 依赖注入的方式</h4>
<ol>
<li>通过bean的setXxx()方法赋值
Hello World中使用的就是这种方式
<img src="/images/2020-04-09-18-52-12.png" alt=""><br></li>
<li>通过bean的构造器赋值<br></li>
</ol>
<ol>
<li>Spring自动匹配合适的构造器<br></li>
</ol>
<div class="language-XML ext-XML line-numbers-mode"><pre v-pre class="language-XML"><code>     &lt;bean id=&quot;book&quot; class=&quot;com.atguigu.spring.bean.Book&quot; &gt;
           &lt;constructor-arg value= &quot;10010&quot;/&gt;
           &lt;constructor-arg value= &quot;Book01&quot;/&gt;
           &lt;constructor-arg value= &quot;Author01&quot;/&gt;
           &lt;constructor-arg value= &quot;20.2&quot;/&gt;
     &lt;/bean &gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过索引值指定参数位置</p>
<div class="language-XML ext-XML line-numbers-mode"><pre v-pre class="language-XML"><code>     &lt;bean id=&quot;book&quot; class=&quot;com.atguigu.spring.bean.Book&quot; &gt;
           &lt;constructor-arg value= &quot;10010&quot; index =&quot;0&quot;/&gt;
           &lt;constructor-arg value= &quot;Book01&quot; index =&quot;1&quot;/&gt;
           &lt;constructor-arg value= &quot;Author01&quot; index =&quot;2&quot;/&gt;
           &lt;constructor-arg value= &quot;20.2&quot; index =&quot;3&quot;/&gt;
     &lt;/bean &gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>通过类型区分重载的构造器</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>book<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.spring.bean.Book<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>10010<span class="token punctuation">"</span></span> <span class="token attr-name">index</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java.lang.Integer<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>Book01<span class="token punctuation">"</span></span> <span class="token attr-name">index</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java.lang.String<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>Author01<span class="token punctuation">"</span></span> <span class="token attr-name">index</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java.lang.String<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>constructor-arg</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>20.2<span class="token punctuation">"</span></span> <span class="token attr-name">index</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>3<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java.lang.Double<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span> <span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-2-p名称空间" tabindex="-1"><a class="header-anchor" href="#_2-3-2-p名称空间" aria-hidden="true">#</a> 2.3.2  p名称空间</h4>
<p>  为了简化XML文件的配置，越来越多的XML文件采用属性而非子元素配置信息。Spring从2.5版本开始引入了一个新的p命名空间，可以通过Bean元素属性的方式配置Bean的属性。<br>
  使用p命名空间后，基于XML的配置方式将进一步简化。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> 
	<span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>studentSuper<span class="token punctuation">"</span></span> 
	<span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.helloworld.bean.Student<span class="token punctuation">"</span></span>
	<span class="token attr-name"><span class="token namespace">p:</span>studentId</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2002<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">p:</span>stuName</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Jerry2016<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">p:</span>age</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>18<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-3-可以使用的值" tabindex="-1"><a class="header-anchor" href="#_2-3-3-可以使用的值" aria-hidden="true">#</a> 2.3.3 可以使用的值</h4>
<ol>
<li>字面量</li>
</ol>
<ol>
<li>可以使用字符串表示的值，可以通过value属性或value子节点的方式指定<br></li>
<li>基本数据类型及其封装类、String等类型都可以采取字面值注入的方式<br></li>
<li>若字面值中包含特殊字符，可以使用<code v-pre>&lt;![CDATA[]]&gt;</code>把字面值包裹起来</li>
</ol>
<ol start="2">
<li>null值</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.spring.bean.Book<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bookNull<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>bookId<span class="token punctuation">"</span></span> <span class="token attr-name">value</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>2000<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>bookName<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
               <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>null</span><span class="token punctuation">/></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>author<span class="token punctuation">"</span></span> <span class="token attr-name">value</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nullAuthor<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>price<span class="token punctuation">"</span></span> <span class="token attr-name">value</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span> <span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>给bean的级联属性赋值</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>action<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.spring.ref.Action<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>service<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>service<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
          <span class="token comment">&lt;!-- 设置级联属性(了解) --></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>service.dao.dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DBCP<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>外部已声明的bean&lt;</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shop<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.spring.bean.Shop<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>book<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>book<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span> <span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>内部bean
当bean实例仅仅给一个特定的属性使用时，可以将其声明为内部bean。内部bean声明直接包含在<code v-pre>&lt;property&gt;</code>或<code v-pre>&lt;constructor-arg&gt;</code>元素里，不需要设置任何id或name属性<br>
内部bean不能使用在任何其他地方</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shop2<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.spring.bean.Shop<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>book<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>com.atguigu.spring.bean.Book<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>bookId<span class="token punctuation">"</span></span> <span class="token attr-name">value</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1000<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>bookName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>innerBook<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>author<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>innerAuthor<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>price<span class="token punctuation">"</span></span> <span class="token attr-name">value</span> <span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span> <span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-集合属性" tabindex="-1"><a class="header-anchor" href="#_2-4-集合属性" aria-hidden="true">#</a> 2.4 集合属性</h3>
<p>在Spring中可以通过一组内置的XML标签来配置集合属性，例如：<code v-pre>&lt;list&gt;</code>，<code v-pre>&lt;set&gt;</code>或<code v-pre>&lt;map&gt;</code>。</p>
<h4 id="_2-4-1-数组和list" tabindex="-1"><a class="header-anchor" href="#_2-4-1-数组和list" aria-hidden="true">#</a> 2.4.1 数组和List</h4>
<p>  配置java.util.List类型的属性，需要指定<code v-pre>&lt;list&gt;</code>标签，在标签里包含一些元素。这些标签可以通过<code v-pre>&lt;value&gt;</code>指定简单的常量值，通过<code v-pre>&lt;ref&gt;</code>指定对其他Bean的引用。通过<code v-pre>&lt;bean&gt;</code>	指定内置bean定义。通过<code v-pre>&lt;null/&gt;</code>指定空元素。甚至可以内嵌其他集合。<br>
  数组的定义和List一样，都使用<code v-pre>&lt;list&gt;</code>元素。配置java.util.Set需要使用<code v-pre>&lt;set&gt;</code>标签，定义的方法与List一样。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shop<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.spring.bean.Shop<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>categoryList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
               <span class="token comment">&lt;!-- 以字面量为值的List集合 --></span>
               <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>list</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span> 历史<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span> <span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span> 军事<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span> <span class="token punctuation">></span></span>
               <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>list</span><span class="token punctuation">></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>bookList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
               <span class="token comment">&lt;!-- 以bean的引用为值的List集合 --></span>
               <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>list</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>book01<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span>book02<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
               <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>list</span><span class="token punctuation">></span></span>
           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span> <span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-2-map" tabindex="-1"><a class="header-anchor" href="#_2-4-2-map" aria-hidden="true">#</a> 2.4.2 Map</h4>
<p>  Java.util.Map通过<code v-pre>&lt;map&gt;</code>标签定义，<code v-pre>&lt;map&gt;</code>标签里可以使用多个<code v-pre>&lt;entry&gt;</code>作为子标签。每个条目包含一个键和一个值。<br>
  必须在<key>标签里定义键。<br>
  因为键和值的类型没有限制，所以可以自由地为它们指定<value>、<ref>、<bean>或<null/>元素。<br>
  可以将Map的键和值作为<entry>的属性定义：简单常量使用key和value来定义；bean引用通过key-ref和value-ref属性定义。<br></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cup<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.spring.bean.Cup<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bookMap<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>map</span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>entry</span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>bookKey01<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>book01<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>entry</span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>entry</span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>key</span><span class="token punctuation">></span></span>
					<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>bookKey02<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>key</span><span class="token punctuation">></span></span>
				<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>book02<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>entry</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>map</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.4.3 集合类型的bean
  如果只能将集合对象配置在某个bean内部，则这个集合的配置将不能重用。我们需要将集合bean的配置拿到外面，供其他bean引用。<br>
  配置集合类型的bean需要引入util名称空间</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">util:</span>list</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bookList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>book01<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>book02<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>book03<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>book04<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ref</span> <span class="token attr-name">bean</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>book05<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">util:</span>list</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">util:</span>list</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>categoryList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>编程<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>极客<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>相声<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>评书<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">util:</span>list</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-factorybean" tabindex="-1"><a class="header-anchor" href="#_2-5-factorybean" aria-hidden="true">#</a> 2.5  FactoryBean</h3>
<h4 id="_2-5-1-factorybean" tabindex="-1"><a class="header-anchor" href="#_2-5-1-factorybean" aria-hidden="true">#</a> 2.5.1 FactoryBean</h4>
<p>  Spring中有两种类型的bean，一种是普通bean，另一种是工厂bean，即FactoryBean。<br>
  工厂bean跟普通bean不同，其返回的对象不是指定类的一个实例，其返回的是该工厂bean的getObject方法所返回的对象。<br>
  工厂bean必须实现org.springframework.beans.factory.</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>![](/images/2020-04-09-19-01-05.png)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>product<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.spring.bean.ProductFactory<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>productName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Mp3<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6-bean的高级配置" tabindex="-1"><a class="header-anchor" href="#_2-6-bean的高级配置" aria-hidden="true">#</a> 2.6 bean的高级配置</h3>
<h4 id="_2-6-1-配置信息的继承" tabindex="-1"><a class="header-anchor" href="#_2-6-1-配置信息的继承" aria-hidden="true">#</a> 2.6.1 配置信息的继承</h4>
<ol>
<li>背景
查看下面两个Employee的配置，其中dept属性是重复的。</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dept<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.parent.bean.Department<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>deptId<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>deptName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IT<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>emp01<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.parent.bean.Employee<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>empId<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1001<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>empName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Tom<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>age<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>20<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

	<span class="token comment">&lt;!-- 重复的属性值 --></span>	
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dept<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dept<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>emp02<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.parent.bean.Employee<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>empId<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1002<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>empName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Jerry<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>age<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>25<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

	<span class="token comment">&lt;!-- 重复的属性值 --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dept<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dept<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>配置信息的继承</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 以emp01作为父bean，继承后可以省略公共属性值的配置 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>emp02<span class="token punctuation">"</span></span> <span class="token attr-name">parent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>emp01<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>empId<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1002<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>empName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Jerry<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>age<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>25<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>  Spring允许继承bean的配置，被继承的bean称为父bean。继承这个父bean的bean	称为子bean<br>
  子bean从父bean中继承配置，包括bean的属性配置<br>
  子bean也可以覆盖从父bean继承过来的配置</p>
<ol start="3">
<li>补充说明
  父bean可以作为配置模板，也可以作为bean实例。若只想把父bean作为模板，可以设置<bean>的abstract 属性为true，这样Spring将不会实例化这个bean<br>
  如果一个bean的class属性没有指定，则必须是抽象bean
  并不是<bean>元素里的所有属性都会被继承。比如：autowire，abstract等。<br>
  也可以忽略父bean的class属性，让子bean指定自己的类，而共享相同的属性配置。但此时abstract必须设为true。</li>
</ol>
<h4 id="_2-6-2-bean之间的依赖" tabindex="-1"><a class="header-anchor" href="#_2-6-2-bean之间的依赖" aria-hidden="true">#</a> 2.6.2 bean之间的依赖</h4>
<p>  有的时候创建一个bean的时候需要保证另外一个bean也被创建，这时我们称前面的bean对后面的bean有依赖。例如：要求创建Employee对象的时候必须创建Department。	这里需要注意的是依赖关系不等于引用关系，Employee即使依赖Department也可以不引用它。<br></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>emp03<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.parent.bean.Employee<span class="token punctuation">"</span></span> <span class="token attr-name">depends-on</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dept <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>empId<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1003<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>empName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Kate<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>age<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>21<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-bean的作用域★" tabindex="-1"><a class="header-anchor" href="#_2-7-bean的作用域★" aria-hidden="true">#</a> 2.7  bean的作用域★</h3>
<p>  在Spring中，可以在<bean>元素的scope属性里设置bean的作用域，以决定这个bean是单实例的还是多实例的。<br>
  默认情况下，Spring只为每个在IOC容器里声明的bean创建唯一一个实例，整个IOC容器范围内都能共享该实例：所有后续的getBean()调用和bean引用都将返回这个唯一的bean实例。该作用域被称为singleton，它是所有bean的默认作用域。
<img src="/images/2020-04-09-19-04-25.png" alt=""><br>
  当bean的作用域为单例时，Spring会在IOC容器对象创建时就创建bean的对象实例。而当bean的作用域为prototype时，IOC容器在获取bean的实例时创建bean的实例对象。</p>
<h3 id="_2-8-bean的生命周期" tabindex="-1"><a class="header-anchor" href="#_2-8-bean的生命周期" aria-hidden="true">#</a> 2.8  bean的生命周期</h3>
<ol>
<li>Spring IOC容器可以管理bean的生命周期，Spring允许在bean生命周期内特定的时间点执行指定的任务。</li>
<li>Spring IOC容器对bean的生命周期进行管理的过程：<br>
① 通过构造器或工厂方法创建bean实例<br>
② 为bean的属性设置值和对其他bean的引用<br>
③ 调用bean的初始化方法<br>
④ bean可以使用了<br>
⑤ 当容器关闭时，调用bean的销毁方法</li>
<li>在配置bean时，通过init-method和destroy-method 属性为bean指定初始化和销毁方法</li>
<li>bean的后置处理器
① bean后置处理器允许在调用<strong>初始化方法前后</strong>对bean进行额外的处理<br>
② bean后置处理器对IOC容器里的所有bean实例逐一处理，而非单一实例。其典型应用是：检查bean属性的正确性或根据特定的标准更改bean的属性。<br>
③ bean后置处理器时需要实现接口：<br>
<code v-pre>org.springframework.beans.factory.config.BeanPostProcessor。</code>在初始化方法被调用前后，Spring将把每个bean实例分别传递给上述接口的以下两个方法：
●<code v-pre>postProcessBeforeInitialization(Object, String)</code>
●<code v-pre>postProcessAfterInitialization(Object, String)</code></li>
<li>添加bean后置处理器后bean的生命周期
①通过构造器或工厂方法<strong>创建bean实例</strong><br>
②为bean的<strong>属性设置值</strong>*和对其他bean的引用<br>
③将bean实例传递给bean后置处理器的postProcessBeforeInitialization()方法<br>
④调用bean的初始化方法<br>
⑤将bean实例传递给bean后置处理器的postProcessAfterInitialization()方法<br>
⑥bean可以使用了<br>
⑦当容器关闭时调用bean的销毁方法</li>
</ol>
<h3 id="_2-9-引用外部属性文件" tabindex="-1"><a class="header-anchor" href="#_2-9-引用外部属性文件" aria-hidden="true">#</a> 2.9 引用外部属性文件</h3>
<p>  当bean的配置信息逐渐增多时，查找和修改一些bean的配置信息就变得愈加困难。这时可以将一部分信息提取到bean配置文件的外部，以properties格式的属性文件保存起来，同时在bean的配置文件中引用properties属性文件中的内容，从而实现一部分属性值在发生变化时仅修改properties属性文件即可。这种技术多用于连接数据库的基本信息的配置。</p>
<h4 id="_2-9-1-直接配置" tabindex="-1"><a class="header-anchor" href="#_2-9-1-直接配置" aria-hidden="true">#</a> 2.9.1 直接配置</h4>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 直接配置 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mchange.v2.c3p0.ComboPooledDataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbcUrl<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc:mysql:///test<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClass<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mysql.jdbc.Driver<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-9-2-使用外部的属性文件" tabindex="-1"><a class="header-anchor" href="#_2-9-2-使用外部的属性文件" aria-hidden="true">#</a> 2.9.2 使用外部的属性文件</h4>
<ol>
<li>创建properties属性文件</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>prop.userName=root
prop.password=root
prop.url=jdbc:mysql:///test
prop.driverClass=com.mysql.jdbc.Driver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>引入context名称空间
<img src="/images/2020-04-09-19-11-34.png" alt=""><br></li>
<li>指定properties属性文件的位置</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 指定properties属性文件的位置 --></span>
<span class="token comment">&lt;!-- classpath:xxx 表示属性文件位于类路径下 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>property-placeholder</span> <span class="token attr-name">location</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:jdbc.properties<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>从properties属性文件中引入属性值</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 从properties属性文件中引入属性值 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.mchange.v2.c3p0.ComboPooledDataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${prop.userName}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${prop.password}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbcUrl<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${prop.url}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClass<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${prop.driverClass}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-10-自动装配" tabindex="-1"><a class="header-anchor" href="#_2-10-自动装配" aria-hidden="true">#</a> 2.10 自动装配</h3>
<h4 id="_2-10-1-自动装配的概念" tabindex="-1"><a class="header-anchor" href="#_2-10-1-自动装配的概念" aria-hidden="true">#</a> 2.10.1 自动装配的概念</h4>
<ol>
<li>手动装配：以value或ref的方式明确指定属性值都是手动装配。</li>
<li>自动装配：根据指定的装配规则，不需要明确指定，Spring自动将匹配的属性值注入bean中。</li>
</ol>
<h4 id="_2-10-2-装配模式" tabindex="-1"><a class="header-anchor" href="#_2-10-2-装配模式" aria-hidden="true">#</a> 2.10.2 装配模式</h4>
<ol>
<li>根据类型自动装配：将类型匹配的bean作为属性注入到另一个bean中。若IOC容器中有多个与目标bean类型一致的bean，Spring将无法判定哪个bean最合适该属性，所以不能执行自动装配</li>
<li>根据名称自动装配：必须将目标bean的名称和属性名设置的完全相同</li>
<li>通过构造器自动装配：当bean中存在多个构造器时，此种自动装配方式将会很复杂。不推荐使用。</li>
</ol>
<h4 id="_2-10-3-选用建议" tabindex="-1"><a class="header-anchor" href="#_2-10-3-选用建议" aria-hidden="true">#</a> 2.10.3 选用建议</h4>
<p>  相对于使用注解的方式实现的自动装配，在XML文档中进行的自动装配略显笨拙，在项目中更多的使用注解的方式实现。</p>
<h3 id="_2-11-通过注解配置bean" tabindex="-1"><a class="header-anchor" href="#_2-11-通过注解配置bean" aria-hidden="true">#</a> 2.11 通过注解配置bean</h3>
<h4 id="_2-11-1-概述" tabindex="-1"><a class="header-anchor" href="#_2-11-1-概述" aria-hidden="true">#</a> 2.11.1 概述</h4>
<p>  相对于XML方式而言，通过注解的方式配置bean更加简洁和优雅，而且和MVC组件化开发的理念十分契合，是开发中常用的使用方式。</p>
<h4 id="_2-11-2-使用注解标识组件" tabindex="-1"><a class="header-anchor" href="#_2-11-2-使用注解标识组件" aria-hidden="true">#</a> 2.11.2 使用注解标识组件</h4>
<ol>
<li>普通组件：@Component
标识一个受Spring IOC容器管理的组件</li>
<li>持久化层组件：@Repository
标识一个受Spring IOC容器管理的持久化层组件</li>
<li>业务逻辑层组件：@Service
标识一个受Spring IOC容器管理的业务逻辑层组件</li>
<li>表述层控制器组件：@Controller
标识一个受Spring IOC容器管理的表述层控制器组件</li>
<li>组件命名规则
①默认情况：使用组件的简单类名首字母小写后得到的字符串作为bean的id<br>
②使用组件注解的value属性指定bean的id
注意：事实上Spring并没有能力识别一个组件到底是不是它所标记的类型，即使将@Respository注解用在一个表述层控制器组件上面也不会产生任何错误，所以@Respository、@Service、@Controller这几个注解仅仅是为了让开发人员自己明确当前的组件扮演的角色。</li>
</ol>
<h4 id="_2-11-3-扫描组件" tabindex="-1"><a class="header-anchor" href="#_2-11-3-扫描组件" aria-hidden="true">#</a> 2.11.3  扫描组件</h4>
<p>  组件被上述注解标识后还需要通过Spring进行扫描才能够侦测到。</p>
<ol>
<li>指定被扫描的package</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> <span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.component<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>详细说明
①<strong>base-package</strong>属性指定一个需要扫描的基类包，Spring容器将会扫描这个基类包及其子包中的所有类。<br>
②当需要扫描多个包时可以使用逗号分隔。<br>
③如果仅希望扫描特定的类而非基包下的所有类，可使用resource-pattern属性过滤特定的类，示例：</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> 
	<span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.atguigu.component<span class="token punctuation">"</span></span> 
	<span class="token attr-name">resource-pattern</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>autowire/*.class<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>④包含与排除&lt;br&gt;
	●&lt;context:include-filter&gt;子节点表示要包含的目标类&lt;br&gt;
</code></pre>
<p>注意：通常需要与use-default-filters属性配合使用才能够达到“仅包含某些组件”这样的效果。即：通过将use-default-filters属性设置为false，	禁用默认过滤器，然后扫描的就只是include-filter中的规则指定的组件了。<br>
●<a href="context:exclude-filter">context:exclude-filter</a>子节点表示要排除在外的目标类<br>
●component-scan下可以拥有若干个include-filter和exclude-filter子节点<br>
●过滤表达式</p>
<table>
<thead>
<tr>
<th style="text-align:center">类别</th>
<th style="text-align:center">示例</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">annotation</td>
<td style="text-align:center">com.atguigu.XxxAnnotation</td>
<td style="text-align:center">过滤所有标注了XxxAnnotation的类。这个规则根据目标组件是否标注了指定类型的注解进行过滤。</td>
</tr>
<tr>
<td style="text-align:center">assignable</td>
<td style="text-align:center">com.atguigu.BaseXxx</td>
<td style="text-align:center">过滤所有BaseXxx类的子类。这个规则根据目标组件是否是指定类型的子类的方式进行过滤。</td>
</tr>
<tr>
<td style="text-align:center">aspectj</td>
<td style="text-align:center">com.atguigu.*Service+</td>
<td style="text-align:center">所有类名是以Service结束的，或这样的类的子类。这个规则根据AspectJ表达式进行过滤。</td>
</tr>
<tr>
<td style="text-align:center">regex</td>
<td style="text-align:center">com.atguigu.anno.*</td>
<td style="text-align:center">所有com.atguigu.anno包下的类。这个规则根据正则表达式匹配到的类名进行过滤。</td>
</tr>
<tr>
<td style="text-align:center">custom</td>
<td style="text-align:center">com.atguigu.XxxTypeFilter</td>
<td style="text-align:center">使用XxxTypeFilter类通过编码的方式自定义过滤规则。该类必须实现org.springframework.core.type.filter.TypeFilter接口</td>
</tr>
</tbody>
</table>
<ol start="3">
<li>JAR包
必须在原有JAR包组合的基础上再导入一个：spring-aop-4.0.0.RELEASE.jar</li>
</ol>
<h4 id="_2-11-4-组件装配" tabindex="-1"><a class="header-anchor" href="#_2-11-4-组件装配" aria-hidden="true">#</a> 2.11.4 组件装配</h4>
<ol>
<li>
<p>需求
Controller组件中往往需要用到Service组件的实例，Service组件中往往需要用到Repository组件的实例。Spring可以通过注解的方式帮我们实现属性的装配。</p>
</li>
<li>
<p>实现依据
在指定要扫描的包时，<a href="context:component-scan">context:component-scan</a> 元素会自动注册一个bean的后置处	理器：AutowiredAnnotationBeanPostProcessor的实例。该后置处理器可以 自动装配标记	了@Autowired、@Resource或@Inject注解的属性。</p>
</li>
<li>
<p>@Autowired注解
①根据类型实现自动装配。<br>
②构造器、普通字段(即使是非public)、一切具有参数的方法都可以应用@Autowired注解<br>
③默认情况下，所有使用@Autowired注解的属性都需要被设置。当Spring找不到匹配的bean装配属性时，会抛出异常。<br>
④若某一属性允许不被设置，可以设置@Autowired注解的required属性为 false<br>
⑤默认情况下，当IOC容器里存在多个类型兼容的bean时，Spring会尝试匹配bean 的id值是否与变量名相同，如果相同则进行装配。如果bean的id值不相同，通过类型的自动装配将无法工作。此时可以在@Qualifier注解里提供bean的名称。Spring甚至允许在方法的形参上标注@Qualifiter注解以指定注入bean的名称。<br>	
⑥@Autowired注解也可以应用在数组类型的属性上，此时Spring将会把所有匹配的bean进行自动装配。<br>
⑦@Autowired注解也可以应用在集合属性上，此时Spring读取该集合的类型信息，然后自动装配所有与之兼容的bean。<br>
⑧@Autowired注解用在java.util.Map上时，若该Map的键值为String，那么 Spring将自动装配与值类型兼容的bean作为值，并以bean的id值作为键。</p>
</li>
<li>
<p>@Resource
@Resource注解要求提供一个bean名称的属性，若该属性为空，则自动采用标注处的变量或方法名作为bean的名称。</p>
</li>
<li>
<p>@Inject
@Inject和@Autowired注解一样也是按类型注入匹配的bean，但没有reqired属性。</p>
</li>
</ol>
<hr>
<p>整理不易，转载请注明出处。</p>
</div></template>


