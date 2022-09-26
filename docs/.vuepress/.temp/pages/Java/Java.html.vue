<template><div><h1 id="java基础" tabindex="-1"><a class="header-anchor" href="#java基础" aria-hidden="true">#</a> Java基础</h1>
<blockquote>
<p>Less is More!</p>
</blockquote>
<h2 id="标识符" tabindex="-1"><a class="header-anchor" href="#标识符" aria-hidden="true">#</a> 标识符</h2>
<ul>
<li>
<p>所有标识符都应该以字母(A-Z或a-z),美元符($),或者下划线(_)开始</p>
<blockquote>
<p>不允许数字开头</p>
</blockquote>
</li>
<li>
<p>不能使用关键字</p>
</li>
</ul>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<h3 id="强类型语言" tabindex="-1"><a class="header-anchor" href="#强类型语言" aria-hidden="true">#</a> 强类型语言</h3>
<ol>
<li>
<p>基本类型(primitive type)</p>
<table>
<thead>
<tr>
<th style="text-align:center">类型</th>
<th style="text-align:center">字节</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">byte</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">short</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">int</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">long</td>
<td style="text-align:center">8</td>
</tr>
<tr>
<td style="text-align:center">float</td>
<td style="text-align:center">4</td>
</tr>
<tr>
<td style="text-align:center">double</td>
<td style="text-align:center">8</td>
</tr>
<tr>
<td style="text-align:center">char</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">boolean</td>
<td style="text-align:center">1位</td>
</tr>
</tbody>
</table>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">long</span> num <span class="token operator">=</span> <span class="token number">30L</span><span class="token punctuation">;</span> <span class="token comment">//需要数字后加个L(最好使用大写,防止误读)</span>
<span class="token keyword">float</span> f <span class="token operator">=</span> <span class="token number">0.1f</span><span class="token punctuation">;</span>

<span class="token comment">//JDK新特性,数字之间可以用下划线分割</span>
<span class="token keyword">int</span> money <span class="token operator">=</span> <span class="token number">10_0000_0000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最好避免使用浮点数去比较大小,需要考虑舍入误差</strong></p>
<p><u>金融使用<code v-pre>BigDecimal</code></u></p>
</li>
<li>
<p>引用类型(reference type)</p>
</li>
</ol>
<h2 id="进制" tabindex="-1"><a class="header-anchor" href="#进制" aria-hidden="true">#</a> 进制</h2>
<ul>
<li>二进制 0b数字</li>
<li>十进制 数字</li>
<li>八进制 0数字</li>
<li>十六进制 0x数字</li>
</ul>
<h2 id="类成员" tabindex="-1"><a class="header-anchor" href="#类成员" aria-hidden="true">#</a> 类成员</h2>
<ol>
<li>成员变量<br>
<em>注:生命周期仅在大括号</em></li>
<li>成员函数</li>
<li>构造函数</li>
<li>构造代码块</li>
<li>静态代码块</li>
</ol>
<blockquote>
<p>在类加载过程中调用，只调用一次</p>
</blockquote>
<ol start="6">
<li>内部类</li>
</ol>
<h2 id="对象创建过程" tabindex="-1"><a class="header-anchor" href="#对象创建过程" aria-hidden="true">#</a> 对象创建过程</h2>
<ol>
<li>
<p>在内存分配内存空间</p>
</li>
<li>
<p>对成员变量赋默认值</p>
</li>
<li>
<p>执行构造代码块或赋值语句，如果多个，从上到下按序执行</p>
</li>
<li>
<p>构造函数</p>
<p><strong>如果有有参构造,建议写上无参构造供框架反射调用.</strong></p>
</li>
</ol>
<h2 id="static成员" tabindex="-1"><a class="header-anchor" href="#static成员" aria-hidden="true">#</a> static成员</h2>
<p>static成员，跟对象无关，访问方式是<code v-pre>Class.XXX()</code><br></p>
<ol>
<li>
<p>随着类的加载而加载</p>
<blockquote>
<p>没赋值默认有初始值</p>
<p>布尔值: 默认false</p>
<p>除了基本类型默认是null</p>
</blockquote>
</li>
<li>
<p>先优于对象存在</p>
</li>
<li>
<p>被所有对象共享</p>
</li>
<li>
<p>可以直接被类名调用</p>
</li>
<li>
<p>静态的只能访问静态的,非静态的可以访问全部</p>
<blockquote>
<p>因为静态对象随类先加载,不能让其访问不存在的东西(例某个对象的属性方法)</p>
</blockquote>
</li>
</ol>
<ul>
<li>静态方法只能访问静态成员</li>
<li>静态方法不能出现this，super等对象关键字</li>
<li>主函数是静态的</li>
</ul>
<h2 id="javadoc" tabindex="-1"><a class="header-anchor" href="#javadoc" aria-hidden="true">#</a> javadoc</h2>
<p>使用<code v-pre>/**-----*/</code></p>
<p>参数列表:</p>
<ul>
<li>@author</li>
<li>@Version</li>
<li>@Since</li>
<li>@param</li>
<li>@return</li>
<li>@throws</li>
</ul>
<p><code v-pre>javadoc -encoding UTF-8 -charset UTF-8 xx.java</code>
生成文档</p>
<h2 id="javabean" tabindex="-1"><a class="header-anchor" href="#javabean" aria-hidden="true">#</a> JavaBean</h2>
<p>bean.
getter/setter</p>
<h2 id="封装" tabindex="-1"><a class="header-anchor" href="#封装" aria-hidden="true">#</a> 封装</h2>
<p>将相应属性隐藏,使用方法访问,可以<strong>自定义</strong>重写对应的get\set方法</p>
<h2 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h2>
<ol>
<li>抽象共享</li>
<li>多个类是子类，抽象的类是父类（超类）</li>
<li>子类可以访问父类的非private成员</li>
<li>通过extends继承</li>
<li>类只支持单重继承 + 多层继承</li>
</ol>
<blockquote>
<p>不要为了获取其他类的某种功能去继承<br>
类与类之间要有所属（“is a”）关系，xx1是xx2的一种</p>
</blockquote>
<ul>
<li>OOP面向对象编程 重要的一点是继承复用</li>
<li>AOP面向切面编程 也是为了复用</li>
</ul>
<h2 id="多态" tabindex="-1"><a class="header-anchor" href="#多态" aria-hidden="true">#</a> 多态</h2>
<blockquote>
<p>子类和父类重写的方法实现规则不一样</p>
</blockquote>
<ol>
<li>
<p>父类引用指向子类对象</p>
</li>
<li>
<p>父类.方法()执行的是子类的实现</p>
</li>
<li>
<p>只能调用父类中声明的方法</p>
<blockquote>
<p>编译时</p>
<p>overload</p>
<blockquote>
<p>xxx.java ---&gt; xxx.class</p>
</blockquote>
<p>运行时</p>
<p>override</p>
</blockquote>
</li>
</ol>
<h2 id="super-this" tabindex="-1"><a class="header-anchor" href="#super-this" aria-hidden="true">#</a> super | this</h2>
<p>  类内置的成员变量，指向的是父类（自己）对象的引用。只能在类的内部使用，类似于this。<br>
  如果当前类有和父类相同的成员，若访问父类成员，需要用到<code v-pre>super.</code></p>
<h2 id="super-this-1" tabindex="-1"><a class="header-anchor" href="#super-this-1" aria-hidden="true">#</a> super() | this()</h2>
<p>此方法调用的是父类（自己）的构造函数。必须是第一句</p>
<h2 id="方法重载" tabindex="-1"><a class="header-anchor" href="#方法重载" aria-hidden="true">#</a> 方法重载</h2>
<p>参数不同</p>
<h2 id="方法覆盖-重写" tabindex="-1"><a class="header-anchor" href="#方法覆盖-重写" aria-hidden="true">#</a> 方法覆盖（重写）</h2>
<ol>
<li>和父类的方法签名相同</li>
<li>private方法无法覆盖</li>
<li>super可以访问父类方法</li>
<li>注意事项：<br>
a. 权限要想相同或放大
b. 静态和非静态必须一致</li>
</ol>
<h2 id="final" tabindex="-1"><a class="header-anchor" href="#final" aria-hidden="true">#</a> final</h2>
<ol>
<li>修饰方法\类\变量</li>
<li>修饰类<br>
final class Dog    //不能继承.终态类</li>
<li>修饰方法<br>
不能重写,是否被继承取决于方法private与否</li>
<li>修饰变量<br>
不能修改,常量</li>
</ol>
<h2 id="内部类" tabindex="-1"><a class="header-anchor" href="#内部类" aria-hidden="true">#</a> 内部类</h2>
<ol>
<li>定义在class内部的类</li>
<li>编译产生OuterClass$Innerc.class</li>
<li>内部类访问外部类的局部变量,需要final修饰.</li>
</ol>
<h2 id="抽象类" tabindex="-1"><a class="header-anchor" href="#抽象类" aria-hidden="true">#</a> 抽象类</h2>
<ol>
<li>不能实例化的类</li>
<li>abstract修饰的类</li>
<li>抽象方法必须定义在抽象类</li>
</ol>
<blockquote>
<p>final  + private 修饰成员变量有意义,为私有常量,修饰方法无意义</p>
</blockquote>
<h2 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h2>
<ol>
<li>interface</li>
<li>接口中的成员修饰符固定<br></li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token comment">//成员变量</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token comment">//成员函数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>间接实现多重继承</li>
<li>最低标准</li>
<li>降低耦合</li>
<li>可以多实现</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Class</span> <span class="token class-name">Xxx</span> <span class="token keyword">implements</span> <span class="token class-name">Xx</span><span class="token punctuation">,</span><span class="token class-name">Xx</span><span class="token punctuation">{</span>
<span class="token comment">//</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Xxx</span> <span class="token keyword">extends</span> <span class="token class-name">Xx</span><span class="token punctuation">,</span><span class="token class-name">Xx</span><span class="token punctuation">{</span>
<span class="token comment">//</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="面向接口的编程" tabindex="-1"><a class="header-anchor" href="#面向接口的编程" aria-hidden="true">#</a> 面向接口的编程</h3>
<ul>
<li>开闭原则
<ul>
<li>对扩展开放</li>
<li>对修改关闭</li>
</ul>
</li>
</ul>
<h2 id="多态-1" tabindex="-1"><a class="header-anchor" href="#多态-1" aria-hidden="true">#</a> 多态</h2>
<p>  指向同一个对象,但某种状态下只能访问该状态下的属性和方法<br>
  接口同样具有多态<br>
  更加抽象<code v-pre>父类=子类</code>可以直接赋值,更加具体<code v-pre>子类=父类</code>需要强制转换<br>
  接口 = 类<code v-pre>隐式转换</code>,类 = 接口<code v-pre>强制转换</code></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//Animal &lt; Dog &lt; Husky</span>
<span class="token class-name">Husty</span> hope <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Husty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Dog</span> hope1 <span class="token operator">=</span> hope<span class="token punctuation">;</span>
<span class="token class-name">Animal</span> hope2 <span class="token operator">=</span> hope1<span class="token punctuation">;</span>
hope1 <span class="token operator">=</span> <span class="token punctuation">(</span>hope1<span class="token punctuation">)</span>hope2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>  使用父类引用子类的对象<br>
  使用接口引用实现类的对象<br></p>
<blockquote>
<p>注意:方法继承会覆盖,但成员变量(字段\数据)不会被覆盖</p>
</blockquote>
<h2 id="异常和错误" tabindex="-1"><a class="header-anchor" href="#异常和错误" aria-hidden="true">#</a> 异常和错误</h2>
<ul>
<li>
<p>异常:在Java语言中,将程序执行中发生的不正常情况称为“异常”。(开发过程中的语法错误和逻辑错误不是异常)</p>
</li>
<li>
<p>Java程序在执行过程中所发生的异常事件分为两类:</p>
<ul>
<li>
<p>Error错误: Java虚拟机无法解决的严重问题。如: JVM系统内部错误、资源耗尽等严重情况。</p>
<blockquote>
<p>比如:</p>
<p>StackOverflowError和OOM,一般不编写针对性的代码进行处理。</p>
</blockquote>
</li>
<li>
<p>Exception异常:其它因编程错误或偶然的外在因素导致的一般性问题,可以使用针对性的代码进行处理。</p>
<blockquote>
<p>例如:</p>
<p>空指针访问</p>
<p>试图读取不存在的文件</p>
<p>网络连接中断</p>
<p>数组角标越界</p>
</blockquote>
</li>
</ul>
</li>
<li>
<p>对于这些错误,一般有两种解决方法:</p>
<ul>
<li>一是遇到错误就终止程序的运行。</li>
<li>另一种方法是由程序员在编写程序时,就考虑到错误的检测、错误消息的提示,以及错误的处理。</li>
</ul>
</li>
<li>
<p>捕获错误最理想的是在编译期间,但有的错误只有在运行时才会发生。比如:除数为0,数组下标越界等</p>
</li>
<li>
<p>分类:编译时异常和运行时异常</p>
</li>
</ul>
<p><img src="/images/2020-09-27-13-28-37.png" alt=""></p>
<blockquote>
<p>蓝色:非受检(unchecked)异常</p>
</blockquote>
<h3 id="异常分类" tabindex="-1"><a class="header-anchor" href="#异常分类" aria-hidden="true">#</a> 异常分类</h3>
<ol>
<li>运行时异常
<ul>
<li>是指编译器不要求强制处置的异常。一般是指编程时的逻辑错误,是程序员应该积极避免其出现的异常。<code v-pre>java.lang.RuntimeException</code>类及它的子类都是运行时异常。</li>
<li>对于这类异常,可以不作处理,因为这类异常很普遍,若全处理可能会对程序的可读性和运行效率产生影响。</li>
</ul>
</li>
<li>编译时异常
<ul>
<li>是指编译器要求必须处置的异常。即程序在运行时由于外界因素造成的一般性异常。</li>
<li>编译器要求Java程序必须捕获或声明所有编译时异常。对于这类异常,如果程序不处理,可能会带来意想不到的结果。</li>
</ul>
</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">try</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token comment">//除了system.exit(0),finally的语句在返回等情况下都会执行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="throw-throws" tabindex="-1"><a class="header-anchor" href="#throw-throws" aria-hidden="true">#</a> throw&amp;throws</h3>
<ul>
<li>
<p>throws：用来声明一个方法可能产生的所有异常，不做任何处理而是将异常往上传，谁调用我我就抛给谁。</p>
<ul>
<li>用在方法声明后面，跟的是异常类名</li>
<li>可以跟多个异常类名，用逗号隔开</li>
<li>表示抛出异常，由该方法的调用者来处理</li>
<li>throws表示出现异常的一种可能性，并不一定会发生这些异常</li>
</ul>
</li>
<li>
<p>throw：则是用来抛出一个具体的异常类型。</p>
<ul>
<li>用在方法体内，跟的是异常对象名</li>
<li>只能抛出一个异常对象名</li>
<li>表示抛出异常，由方法体内的语句处理</li>
<li>throw则是抛出了异常，执行throw则一定抛出了某种异常</li>
</ul>
</li>
</ul>
<hr>
<p>异常的子类catch应在异常父类catch之前<br></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">CheckedException</span>   <span class="token comment">//待检异常,非运行时异常,必须声明抛出语句</span>
<span class="token class-name">RuntimeException</span>   <span class="token comment">//运行异常,不需要在方法声明抛出语句,也不需要必须使用try/catch语句处理</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>一个方法被覆盖是,覆盖它的方法必须抛出相同的异常或异常的子类,范围可以缩小,不能放大<br></p>
<h3 id="自定义异常" tabindex="-1"><a class="header-anchor" href="#自定义异常" aria-hidden="true">#</a> 自定义异常</h3>
<ul>
<li>一般地,用户自定义异常类都是RuntimeException的子类。</li>
<li>自定义异常类通常需要编写几个重载的构造器。</li>
<li>自定义异常需要提供serialVersionUID自定义的异常通过throw抛出。</li>
<li>自定义异常最重要的是异常类的名字,当异常出现时,可以根据名字判断异常类型。</li>
</ul>
<h2 id="package" tabindex="-1"><a class="header-anchor" href="#package" aria-hidden="true">#</a> package</h2>
<p>完整类名:包名.类名(全限定名 full qualified name)<br>
命名规则:com</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jar  //java archive
ear  //enterprise archive
war  //web
har  //hadoop 
tar  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相对路径" tabindex="-1"><a class="header-anchor" href="#相对路径" aria-hidden="true">#</a> 相对路径</h2>
<blockquote>
<p>.   //当前目录<br>
..  // 上级目录<br></p>
</blockquote>
<h2 id="绝对路径" tabindex="-1"><a class="header-anchor" href="#绝对路径" aria-hidden="true">#</a> 绝对路径</h2>
<p>C:\xx\xx</p>
<h2 id="权限访问" tabindex="-1"><a class="header-anchor" href="#权限访问" aria-hidden="true">#</a> 权限访问</h2>
<p>private     //私有,不能继承<br>
public      //公有<br>
protected   //受保护,针对其他包中的子类<br>
default       //默认,不写.不同包不能继承<br>
一个java源文件只能有一个public类<br></p>
<table>
<thead>
<tr>
<th style="text-align:center">范围</th>
<th style="text-align:center">public</th>
<th style="text-align:center">protected</th>
<th style="text-align:center">default</th>
<th style="text-align:center">private</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">同类</td>
<td style="text-align:center">✓</td>
<td style="text-align:center">✓</td>
<td style="text-align:center">✓</td>
<td style="text-align:center">✓</td>
</tr>
<tr>
<td style="text-align:center">同包</td>
<td style="text-align:center">✓</td>
<td style="text-align:center">✓</td>
<td style="text-align:center">✓</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">子类</td>
<td style="text-align:center">✓</td>
<td style="text-align:center">✓</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">不同包</td>
<td style="text-align:center">✓</td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
</tbody>
</table>
<h2 id="jar" tabindex="-1"><a class="header-anchor" href="#jar" aria-hidden="true">#</a> jar</h2>
<ol>
<li>打包方式一<br>
<code v-pre>jar cvf  xxx.jar Xxx.class Yyy.class</code> //指定class</li>
<li>打包方式二<br>
<code v-pre>jar cvf xxx.jar -C xxx/.</code>//指定目录</li>
<li>查看jar文件<br>
<code v-pre>jar -tf xxx.jar</code></li>
<li>运行jar中的类<br>
<code v-pre>java -cp xxx.jar xx.xx.xx;</code>//后面跟完整类名</li>
<li>指定清单文件(xxx.jar/META-INF/MENIFEST.MF)的入口类<br>
<code v-pre>jar {ctxui}[vfmn0PMe] [jar-file] [manifest-file] [entry-point] [-C dir] files ...</code><br>
<code v-pre>jar -cvfe classes.jar com.day01.java.PagDemo classes/ .</code></li>
<li>如果jar中的清单文件含有入口点(Main-Class),''可以直接使用以下命令执行<br>
<code v-pre>java -jar classes.jar</code></li>
</ol>
<h2 id="eclipse快捷键" tabindex="-1"><a class="header-anchor" href="#eclipse快捷键" aria-hidden="true">#</a> eclipse快捷键</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    alt <span class="token operator">+</span> <span class="token operator">/</span> <span class="token comment">//内容辅助</span>
    ctl <span class="token operator">+</span> alt <span class="token operator">+</span> down <span class="token comment">//向下复制一行</span>
    ctl <span class="token operator">+</span> alt <span class="token operator">+</span> up <span class="token comment">//向上复制一行</span>

    alt <span class="token operator">+</span> down <span class="token comment">//向下移动一行</span>
    alt <span class="token operator">+</span> up <span class="token comment">//向上移动一行</span>
    ctl <span class="token operator">+</span> d <span class="token comment">//删除一整行</span>
    ctl <span class="token operator">+</span> shift <span class="token operator">+</span> f <span class="token comment">//代码格式化</span>

    shift <span class="token operator">+</span> enter <span class="token comment">//中途回车,不换行</span>
    ctrl <span class="token operator">+</span> <span class="token operator">/</span> <span class="token comment">//切换注释</span>
    ctrl <span class="token operator">+</span> shift <span class="token operator">+</span> <span class="token operator">/</span> <span class="token comment">//块注释</span>
    ctrl <span class="token operator">+</span> shift <span class="token operator">+</span> \ <span class="token comment">//解除块注释 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="java单元测试" tabindex="-1"><a class="header-anchor" href="#java单元测试" aria-hidden="true">#</a> java单元测试</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span></span><span class="token class-name">Test</span></span><span class="token punctuation">;</span> <span class="token comment">//rember to import related jar</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> test1 <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>@Test只能加到非静态方法上</p>
</blockquote>
<div class="language-jave ext-jave line-numbers-mode"><pre v-pre class="language-jave"><code>@Before
//非静态方法前

@Before Class
//静态方法前
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="lambda表达式" tabindex="-1"><a class="header-anchor" href="#lambda表达式" aria-hidden="true">#</a> Lambda表达式</h2>
<ul>
<li>避免匿名内部类定义过多</li>
<li>实质属于函数式编程的概念</li>
</ul>
<blockquote>
<p>(params)-&gt;expression[表达式]<br>(params)-&gt;statement[语句]<br>(params)-&gt;{statements}</p>
</blockquote>
<p><code v-pre>a-&gt; System.out.println(&quot;Test lambda&quot;);</code><br>
<code v-pre>new Thread (()-&gt;System.out.println(&quot;new thread&quot;)).start();</code><br></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//推导lambda</span>

<span class="token comment">//1.函数式接口</span>
<span class="token keyword">interface</span> <span class="token class-name">ILike</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">lambda</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//2.实现</span>
<span class="token keyword">class</span> <span class="token class-name">Like</span> <span class="token keyword">implements</span> <span class="token class-name">ILike</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lambda</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Lambda~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> test<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ILike</span> like <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Like</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//匿名内部类,没有类名，借助接口或父类</span>
        like <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ILike</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">lambda</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Lambda~~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        like<span class="token punctuation">.</span><span class="token function">lambda</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// >>>>>>>>lambda简化</span>
        like <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Lambda~~~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        like<span class="token punctuation">.</span><span class="token function">lambda</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>lambda表达式只能有一行代码的情况下才能简化成为一行,如果有多行,那么就用代码块包裹</li>
<li>前提是接口为函数式接口</li>
<li>多个参数也可以去掉参数类型,要去的就都去掉,必须加上括号.</li>
</ul>
<h2 id="string类" tabindex="-1"><a class="header-anchor" href="#string类" aria-hidden="true">#</a> String类</h2>
<ol>
<li>字符串类
final类,无法继承</li>
<li>内部采用char[]数组存储</li>
<li>内部不能改变,属于常量</li>
<li>常见方法<br>
str.length(); //长度<br>
str.trim();   //删除头尾空白符的字符串<br>
srt.split(&quot;x&quot;);//按照x规则进行切割<br></li>
</ol>
<h2 id="字符集" tabindex="-1"><a class="header-anchor" href="#字符集" aria-hidden="true">#</a> 字符集<br></h2>
<blockquote>
<p>ascii :     美国国家标准交换码,使用一个字节的7
位表示.<br>
iso-8859-1:     欧洲码表,使用8位表示,无法存储汉字.<br>
gb2312:     中文码表,简体中文.两个字节存储.<br>
gbk:    gb2312升级版<br>
big-5:      繁体中文<br>
utf-8:     变长字符表示法,最多使用三个字节表示.<br>
unicode:      两个字节表示字符,java中使用该码</p>
</blockquote>
<hr>
<p>Charset.defaultCharset();</p>
<h3 id="编码" tabindex="-1"><a class="header-anchor" href="#编码" aria-hidden="true">#</a> 编码</h3>
<p>encode<br>
String --&gt; byte[]<br>
String.getBytes(&quot;gbk&quot;); //编码格式</p>
<h3 id="解码" tabindex="-1"><a class="header-anchor" href="#解码" aria-hidden="true">#</a> 解码</h3>
<p>decode<br>
byte[] --&gt; String<br>
new String(arr,&quot;gbk&quot;)//解码格式</p>
<h2 id="stringbuffer" tabindex="-1"><a class="header-anchor" href="#stringbuffer" aria-hidden="true">#</a> StringBuffer</h2>
<p>线程安全</p>
<h2 id="stringbuilder" tabindex="-1"><a class="header-anchor" href="#stringbuilder" aria-hidden="true">#</a> StringBuilder</h2>
<p>非线程安全</p>
<h2 id="包装类" tabindex="-1"><a class="header-anchor" href="#包装类" aria-hidden="true">#</a> 包装类</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//自动装箱=基本数据类型->包装类对象</span>
<span class="token class-name">Integer</span> i <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span> 
<span class="token comment">//自动拆箱=包装类对象->直接提取基本数据类型</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> ii<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>基本数据类型没有null的概念<br>
数值类型基本数据类型(成员变量)默认值是0.<br></p>
</blockquote>
<hr>
<blockquote>
<p>包装类的默认是null.<br>
有NullPointerException.<em>注意初始化</em></p>
</blockquote>
<h2 id="容器" tabindex="-1"><a class="header-anchor" href="#容器" aria-hidden="true">#</a> 容器</h2>
<h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<ol>
<li>类型相同</li>
<li>长度固定</li>
<li>可以存放基本类型</li>
</ol>
<h3 id="集合类" tabindex="-1"><a class="header-anchor" href="#集合类" aria-hidden="true">#</a> 集合类</h3>
<ol>
<li>长度不固定</li>
<li>类型可以不同</li>
<li>不能存放基本类型</li>
<li>List: 有序,可重复<br>
ArrayList<br>
LinkedList</li>
<li>Set:无序,不能重复<br>
  存取无序,判断hash code是否相同,如果不同,可以存放,相同则判断是否为同一对象,同样则重复,否则再使用equals方法判断是否相同</li>
<li>Map:key-value,<strong>key有set的特点</strong>.
<img src="/images/2020-04-11-08-55-07.png" alt=""></li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//迭代器访问,list为ArrayList</span>
<span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Cat</span><span class="token punctuation">></span></span> it <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">Cat</span> cat1 <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>==</code>判断内存地址<br>
<code v-pre>equals</code>默认只判断内存地址,需要进行重写</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//equals 重写实例:</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//poj为null</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>obj <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//是非为同一对象</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//得到obj的类</span>
    <span class="token class-name">Class</span> objClazz <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">gatClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>objClazz <span class="token operator">!=</span> <span class="token class-name">Cat</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> flase<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
   <span class="token class-name">Cat</span> b <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Cat</span><span class="token punctuation">)</span>obj<span class="token punctuation">;</span>
   <span class="token class-name">String</span> bname <span class="token operator">=</span> b<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">int</span> age <span class="token operator">=</span> b<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">boolean</span> nameEqual <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>name <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token keyword">if</span><span class="token punctuation">(</span>bname <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           nameEqual <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
   <span class="token keyword">else</span><span class="token punctuation">{</span>
           nameEqual <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>bname<span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
   
       <span class="token keyword">return</span> nameEqual <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>age <span class="token operator">==</span> bage<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>list使用add添加对象,保存的是引用,相同对象指向相同.</p>
<h2 id="arraylist" tabindex="-1"><a class="header-anchor" href="#arraylist" aria-hidden="true">#</a> ArrayList</h2>
<p>Object[]<br>
Capacity    //容量<br>
size          //元素个数<br>
index + offset<br>
只判断对象是否存在,只跟equals有关.</p>
<h2 id="linkedlist" tabindex="-1"><a class="header-anchor" href="#linkedlist" aria-hidden="true">#</a> LinkedList</h2>
<p>clear方法会移除元素,降低容量,与arraylist不变容量不同.<br>
链表优缺点</p>
<h2 id="vector" tabindex="-1"><a class="header-anchor" href="#vector" aria-hidden="true">#</a> Vector</h2>
<p>类似于ArrayList,通过对象数组实现<br>
线程安全的<br>
迭代器在Collection接口中是通用的,它替代了vector的Enumeration(枚举)</p>
<h2 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> Set</h2>
<p>元素是唯一的<br>
无序的<br>
通过迭代器访问<br></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> it <span class="token operator">=</span> set<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HashSet和HashMap没有本质区别.底层用Dummy当Key</p>
<h2 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h2>
<p>映射<br>
Key ---&gt; value  //Entry,条目<br>
put(k,v);</p>
<blockquote>
<p>1.判断hashcode是否相同<br>
2.相同则判断是否同一对象,满足则不添加<br>
3.如果调用equals方法为真,满足则不添加<br>
<code v-pre>key.hash == p.hash &amp;&amp; (key == p || key.equals(p));</code></p>
</blockquote>
<h2 id="hashset-vs-hashmap" tabindex="-1"><a class="header-anchor" href="#hashset-vs-hashmap" aria-hidden="true">#</a> HashSet vs HashMap</h2>
<ol>
<li>底层无最本质区别,Set采用Map实现.</li>
<li>哈希本质是打散元素(散列),在容器中均匀存放.</li>
<li>map为数组和链表的组合.</li>
<li>HashCode默认返回对象内存地址,故一般需要重写方法,根据元素特征值生成.</li>
</ol>
<h2 id="hash的方式" tabindex="-1"><a class="header-anchor" href="#hash的方式" aria-hidden="true">#</a> Hash的方式</h2>
<p><code v-pre>h = key.hasCode() ^ (h &gt;&gt;&gt;16) //^ 异或</code><br>
^会使数更加散列,更多特征值决定哈希值<br>
hashSet线程不安全<br></p>
<ol>
<li>new hash<br>
h = e.hashCode;<br>
h ^(h &gt;&gt;&gt; 16)</li>
<li>定位桶<br>
newhash &amp; (n-1) // n为桶个数</li>
<li>判断桶元素 == null<br>
为null,直接放入<br></li>
<li>不为空<br>
(hash == p.hash&amp;&amp;())<br></li>
<li>继续此过程</li>
</ol>
<h2 id="treeset" tabindex="-1"><a class="header-anchor" href="#treeset" aria-hidden="true">#</a> TreeSet</h2>
<p>  通过Comparator.compareTo或者comparable.compare()方法来保证元素是否相等.元素是以二叉树形式存放的.<br>
  实现<strong>Comparator接口</strong>或<strong>传入对比器</strong>都可以实现对象的树集合<br>
TreeSet同样通过TreeMap实现<br>
  字符的compareTo通过较短字符串的长度逐个比较存储对应码值,返回差值<br></p>
<blockquote>
<p>注:中文码值与笔画有关</p>
</blockquote>
<h2 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型" aria-hidden="true">#</a> 泛型</h2>
<ol>
<li>提高了程序的安全性</li>
<li>将运行期遇到的问题转移到编码期</li>
<li>省去了类型强转的麻烦</li>
<li>泛型类的出现优化了程序设计</li>
</ol>
<h2 id="遍历方式" tabindex="-1"><a class="header-anchor" href="#遍历方式" aria-hidden="true">#</a> 遍历方式</h2>
<ol>
<li>for</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>iteterator</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> it <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>for+</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//for(数据类型 变量名:数组或Collection集合)</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">String</span> s <span class="token operator">:</span> list<span class="token punctuation">)</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>增强for循环可用于多种迭代过程,类似Python的for each in.<br>例:</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Entry</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span><span class="token punctuation">></span></span> set <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> e<span class="token operator">:</span> set<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> key <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> value <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//可变参数-可允许出现一个且必须为最后一个参数</span>
<span class="token comment">//不会产生空指针异常,默认为空数组</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">List</span> list<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token operator">:</span>x<span class="token punctuation">)</span><span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="io" tabindex="-1"><a class="header-anchor" href="#io" aria-hidden="true">#</a> IO</h2>
<p>Stream -&gt; byte[]</p>
<ol>
<li>数据类型<br></li>
</ol>
<blockquote>
<p>字节流<br>
字符流<br></p>
<blockquote>
<p>处理文本,防止乱码</p>
</blockquote>
</blockquote>
<ol start="2">
<li>流向<br></li>
</ol>
<blockquote>
<p>输入流<br>
输出流<br></p>
</blockquote>
<ol start="3">
<li>性能<br></li>
</ol>
<blockquote>
<p>缓冲区流<br></p>
</blockquote>
<ol start="4">
<li>性能<br></li>
</ol>
<blockquote>
<p>转换流<br></p>
<blockquote>
<p>InputStream/OutputStream -&gt; Reader/Writer</p>
</blockquote>
</blockquote>
<h3 id="流的超类" tabindex="-1"><a class="header-anchor" href="#流的超类" aria-hidden="true">#</a> 流的超类</h3>
<p>InputStream<br>
OutputStream</p>
<h3 id="字符流" tabindex="-1"><a class="header-anchor" href="#字符流" aria-hidden="true">#</a> 字符流</h3>
<p>Reader<br>
Writer<br>
文本首选</p>
<h3 id="字节流" tabindex="-1"><a class="header-anchor" href="#字节流" aria-hidden="true">#</a> 字节流</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token function">newFileInputStream</span><span class="token punctuation">(</span><span class="token string">"d:/xx/x.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span>fis<span class="token punctuation">.</span><span class="token function">available</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//编码</span>
<span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"d:/xx/x.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">InputStreamReader</span> isr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>fis<span class="token punctuation">,</span> <span class="token string">"utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> len <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>len <span class="token operator">=</span> isr<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
isr<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="缓冲区字符流" tabindex="-1"><a class="header-anchor" href="#缓冲区字符流" aria-hidden="true">#</a> 缓冲区字符流</h2>
<p>默认缓冲区:8K<br>
<em>先关缓冲区，后关文件流</em></p>
<h2 id="输入输出流" tabindex="-1"><a class="header-anchor" href="#输入输出流" aria-hidden="true">#</a> 输入输出流</h2>
<p>改变System.out.print到文件</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">setOut</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PrintStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">"x:/xx/x.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"XXXXXXX"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>读取控制台输入</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">InputStream</span> in <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">;</span>
<span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>in<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//转换流</span>
<span class="token class-name">String</span> line  <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>line<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"quit"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">//退出</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件归档" tabindex="-1"><a class="header-anchor" href="#文件归档" aria-hidden="true">#</a> 文件归档</h2>
<ol>
<li>文件名字节数</li>
<li>文件名</li>
<li>文件字节数</li>
<li>文件</li>
</ol>
<h2 id="文件" tabindex="-1"><a class="header-anchor" href="#文件" aria-hidden="true">#</a> 文件</h2>
<p>包名:java.io.File<br>
类名:File<br>
方法:<br></p>
<ul>
<li>File.exists();</li>
<li>File.isDirectory();</li>
<li>File.isFile();</li>
<li>File.mkdirs(); //创建目录</li>
<li>File.createNewFile();</li>
<li>File.listFiles();</li>
<li>File.getAbsolutePath();</li>
<li>File.getName();</li>
<li>File.getCanonicalPath(); //得到正规路径名<br></li>
</ul>
<p>打印输出目录结构:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">printDir</span><span class="token punctuation">(</span><span class="token class-name">String</span> file<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">File</span> f <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">is</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">isDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">File</span><span class="token punctuation">[</span><span class="token punctuation">]</span> fileList <span class="token operator">=</span> f<span class="token punctuation">.</span><span class="token function">listFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>fileList <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fileList<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">File</span> singelFile <span class="token operator">:</span> fileList<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token function">printDir</span><span class="token punctuation">(</span>singelFile<span class="token punctuation">.</span><span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>递归复制到指定文件夹:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">copyDir</span><span class="token punctuation">(</span><span class="token class-name">String</span> file<span class="token punctuation">,</span><span class="token class-name">String</span> destDir<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">File</span> f <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">is</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">isDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//创建目录</span>
            <span class="token class-name">File</span> newFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>destDir<span class="token punctuation">,</span>f<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            newFile<span class="token punctuation">.</span><span class="token function">mkdirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">File</span><span class="token punctuation">[</span><span class="token punctuation">]</span> fileList <span class="token operator">=</span> f<span class="token punctuation">.</span><span class="token function">listFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>fileList <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fileList<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">File</span> singelFile <span class="token operator">:</span> fileList<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token function">copyDir</span><span class="token punctuation">(</span>singleFile<span class="token punctuation">.</span><span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> newFile<span class="token punctuation">.</span><span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token function">copyFile</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span>destDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">copyFile</span><span class="token punctuation">(</span><span class="token class-name">String</span> srcFile<span class="token punctuation">,</span><span class="token class-name">String</span> destDir<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span><span class="token punctuation">{</span>
        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>srcFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">File</span> newFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>destDir<span class="token punctuation">,</span>file<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>newFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>len <span class="token operator">=</span> fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            fos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        fos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>     <span class="token comment">//不推荐捕获类型,这里旨在简化代码</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>整理不易，转载请注明出处。</p>
</div></template>


