<template><div><h1 id="设计模式-design-pattern" tabindex="-1"><a class="header-anchor" href="#设计模式-design-pattern" aria-hidden="true">#</a> 设计模式 Design pattern</h1>
<h2 id="单例模式-singleton" tabindex="-1"><a class="header-anchor" href="#单例模式-singleton" aria-hidden="true">#</a> 单例模式 Singleton</h2>
<p>类有且只有一个对象<br></p>
<ol>
<li>懒汉式</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//单例模式,垃圾桶</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GarbageBox</span><span class="token punctuation">{</span>
    <span class="token comment">//实例</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">GarbageBox</span>  instance<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
    *构造私有
    */</span>
    <span class="token keyword">private</span> <span class="token class-name">GarbageBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">GarbageBox</span>  <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>intsant  <span class="token operator">==</span>  <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            instance  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GarbageBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span>  instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多线程优化</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//单例模式,垃圾桶</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GarbageBox</span><span class="token punctuation">{</span>
    <span class="token comment">//实例</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">GarbageBox</span>  instance<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Obeject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//锁</span>
    <span class="token doc-comment comment">/**
    *构造私有
    */</span>
    <span class="token keyword">private</span> <span class="token class-name">GarbageBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">GarbageBox</span>  <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//为空情况下才锁住</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>intsant  <span class="token operator">==</span>  <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">Synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    instance  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GarbageBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span>  instance<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>饿汉式</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//单例模式,垃圾桶</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GarbageBox</span><span class="token punctuation">{</span>
    <span class="token comment">//实例</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">GarbageBox</span>  instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GarbageBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
    *构造私有
    */</span>
    <span class="token keyword">private</span> <span class="token class-name">GarbageBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">GarbageBox</span>  <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span>  instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="适配器-adapter" tabindex="-1"><a class="header-anchor" href="#适配器-adapter" aria-hidden="true">#</a> 适配器 Adapter</h2>
<p>  将一个接口转换成客户希望的另一个接口，使接口不兼容的那些类可以一起工作，其别名为包装器(Wrapper)。适配器模式既可以作为类结构型模式，也可以作为对象结构型模式。<br>
  在适配器模式中，我们通过增加一个新的适配器类来解决接口不兼容的问题，使得原本没有任何关系的类可以协同工作。<br>
  根据适配器类与适配者类的关系不同，适配器模式可分为<strong>对象适配器</strong>和<strong>类适配器</strong>两种，在<strong>对象适配器</strong>模式中，适配器与适配者之间是<strong>关联关系</strong>；在<strong>类适配器</strong>模式中，适配器与适配者之间是<strong>继承</strong>（或实现）关系。</p>
<h2 id="装饰模式-decorate" tabindex="-1"><a class="header-anchor" href="#装饰模式-decorate" aria-hidden="true">#</a> 装饰模式  Decorate</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">aa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">A</span> a<span class="token punctuation">;</span>

    publlic <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token class-name">A</span> a<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> a<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">aa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        a<span class="token punctuation">.</span><span class="token function">aa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工厂模式-factory" tabindex="-1"><a class="header-anchor" href="#工厂模式-factory" aria-hidden="true">#</a> 工厂模式 Factory</h2>
<p>通过静态方法创建完整对象</p>
<h3 id="简单工厂" tabindex="-1"><a class="header-anchor" href="#简单工厂" aria-hidden="true">#</a> 简单工厂</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CarFactory</span><span class="token punctuation">{</span>
   <span class="token keyword">public</span> staitic car <span class="token function">createCar</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"audi"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Audi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"BYD"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BYD</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CarFactory</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">Car</span> <span class="token function">createCar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AudiFactory</span> <span class="token keyword">implements</span> <span class="token class-name">CarFactory</span><span class="token punctuation">{</span>
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">Car</span> <span class="token function">createCar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Audi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h2>
<p>角色:</p>
<ol>
<li>真实角色</li>
<li>代理角色</li>
<li>抽象角色(前两者需要有共同的方法,由该部分完成)</li>
</ol>
<ul>
<li>真正做事情的是真实角色</li>
<li>对于外界来说一定是代理角色,真实角色被隐藏</li>
<li>代理要有真实角色的引用</li>
<li>代理角色可以附加自己的功能</li>
</ul>
<h3 id="静态代理" tabindex="-1"><a class="header-anchor" href="#静态代理" aria-hidden="true">#</a> 静态代理</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Proxyee</span> <span class="token keyword">implements</span> share<span class="token punctuation">{</span>
   <span class="token constant">XXXX</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Proxy</span> <span class="token keyword">implements</span> share<span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">Share</span> share <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxyee</span><span class="token punctuation">;</span>
   <span class="token constant">XXXX</span><span class="token punctuation">;</span>
   share<span class="token punctuation">.</span><span class="token constant">XXXX</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Share</span><span class="token punctuation">{</span>
   <span class="token constant">XXXX</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="动态代理" tabindex="-1"><a class="header-anchor" href="#动态代理" aria-hidden="true">#</a> 动态代理</h3>
<blockquote>
<p>解决静态代理带来的高消耗,重复创建不同的代理</p>
</blockquote>
<p>通过反射实现,具体实现可参考文章:</p>
<p><a href="https://shane-1.io/java/AnnotationReflection.html#%E5%8F%8D%E5%B0%84" target="_blank" rel="noopener noreferrer">反射和注解<ExternalLinkIcon/></a></p>
<h2 id="构建器模式-builder" tabindex="-1"><a class="header-anchor" href="#构建器模式-builder" aria-hidden="true">#</a> 构建器模式 Builder</h2>
<p>setXx()返回对象自身</p>
<h2 id="观察者模式-observer" tabindex="-1"><a class="header-anchor" href="#观察者模式-observer" aria-hidden="true">#</a> 观察者模式 Observer</h2>
<p>Observers<br>
Observable<br></p>
<hr>
<p>整理不易，转载请注明出处。</p>
</div></template>


