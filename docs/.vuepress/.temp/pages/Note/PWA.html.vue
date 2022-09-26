<template><div><h1 id="pwa介绍及快速上手搭建一个pwa应用" tabindex="-1"><a class="header-anchor" href="#pwa介绍及快速上手搭建一个pwa应用" aria-hidden="true">#</a> PWA介绍及快速上手搭建一个PWA应用</h1>
<blockquote>
<p>作者 游魂 | 发布于 2018-04-27</p>
</blockquote>
<h2 id="pwa初次体验" tabindex="-1"><a class="header-anchor" href="#pwa初次体验" aria-hidden="true">#</a> PWA初次体验</h2>
<blockquote>
<p>前言：本示例不用安装任何东西</p>
<p>部分资源来自网络资源及PWA官网，不要把PWA想象的太复杂，跟着示例走一下，你行的。</p>
</blockquote>
<h3 id="pwa介绍" tabindex="-1"><a class="header-anchor" href="#pwa介绍" aria-hidden="true">#</a> PWA介绍</h3>
<p>一个新的前端技术，PWA（ 全称：Progressive Web App ）也就是说这是个渐进式的网页应用程序。</p>
<p>官网：<a href="https://developers.google.com/web/progressive-web-apps/" target="_blank" rel="noopener noreferrer">https://developers.google.com...<ExternalLinkIcon/></a></p>
<p>是 Google 在 2015 年提出，2016年6月才推广的项目。是结合了一系列现代Web技术的组合，在网页应用中实现和原生应用相近的用户体验。</p>
<p>官网上给出 PWA 的宣传是 ： <strong>Reliable</strong> （ 可靠的 ）、<strong>Fast</strong>（ 快速的 ）、<strong>Engaging</strong>（ 可参与的 ）</p>
<p><strong>Reliable</strong> ：当用户从手机主屏幕启动时，不用考虑网络的状态是如何，都可以立刻加载出 PWA。</p>
<p><strong>Fast</strong>：这一点应该都很熟悉了吧，站在用户的角度来考虑，如果一个网页加载速度有点长的话，那么我们会放弃浏览该网站，所以 PWA 在这一点上做的很好，他的加载速度是很快的。</p>
<p><strong>Engaging</strong> ： PWA 可以添加在用户的主屏幕上，不用从应用商店进行下载，他们通过网络应用程序 Manifest file 提供类似于 APP 的使用体验（ 在 Android 上可以设置全屏显示哦，由于 Safari 支持度的问题，所以在 IOS 上并不可以 ），并且还能进行 ”推送通知” 。</p>
<h3 id="pwa关键技术" tabindex="-1"><a class="header-anchor" href="#pwa关键技术" aria-hidden="true">#</a> PWA关键技术</h3>
<ul>
<li><strong>Service Worker</strong> （可以理解为服务工厂）</li>
<li><strong>Manifest</strong> （应用清单）</li>
<li><strong>Push Notification</strong>（推送通知）</li>
</ul>
<h4 id="service-worker" tabindex="-1"><a class="header-anchor" href="#service-worker" aria-hidden="true">#</a> Service Worker</h4>
<p>以下用SW来表示</p>
<p>SW 是什么呢？这个是离线缓存文件。我们 PWA 技术使用的就是它！SW 是浏览器在后台独立于网页运行的脚本，它打开了通向不需要网页或用户交互的功能的大门，因为使用了它，才会有的那个 Reliable 特性吧，SW 作用于 浏览器于服务器之间，相当于一个代理服务器。</p>
<p><strong>浏览器支持</strong></p>
<p>顺便带一句：目前只能在 HTTPS 环境下才能使用SW，因为SW 的权利比较大，能够直接截取和返回用户的请求，所以要考虑一下安全性问题。</p>
<p><img src="/images/2020-10-12-10-20-59.png" alt=""></p>
<p><strong>事件机制</strong></p>
<p><img src="/images/2020-10-12-10-21-50.png" alt=""></p>
<p><strong>功能</strong>(还是比较逆天的)</p>
<ul>
<li>后台数据的同步</li>
<li>从其他域获取资源请求</li>
<li>接受计算密集型数据的更新，多页面共享该数据</li>
<li>客户端编译与依赖管理</li>
<li>后端服务的hook机制</li>
<li>根据URL模式，自定义模板</li>
<li>性能优化</li>
<li>消息推送</li>
<li>定时默认更新</li>
<li>地理围栏</li>
</ul>
<p><strong>生命周期</strong></p>
<p><img src="/images/2020-10-12-10-22-32.png" alt=""></p>
<ul>
<li>
<p>Parsed （ 解析成功 ）： 首次注册 SW 时，浏览器解决脚本并获得入口点，如果解析成功，就可以访问到 SW 注册对象，在这一点中我们需要在 HTML 页面中添加一个判断，判断该浏览器是否支持 SW 。</p>
</li>
<li>
<p>Installing （ 正在安装 ）：SW 脚本解析完成之后，浏览器会尝试进行安装，installing 中 install 事件被执行，如果其中有 event.waitUntil ( ) 方法，则 installing 事件会一直等到该方法中的 Promise 完成之后才会成功，如果 Promise 被拒绝，则安装失败，SW会进入 Redundant（ 废弃 ）状态。</p>
</li>
<li>
<p>Installed / Waiting （安装成功/等待中）：如果安装成功，SW 将会进入这个状态。</p>
</li>
<li>
<p>Activating （ 正在激活 ）：处于 waiting 状态的 SW 发生以下情况，将会进入 activating 状态中：</p>
<p>当前已无激活状态的 worker 、 SW脚本中的 self.skipWaiting（）方法被调用 （ ps： self 是 SW 中作用于全局的对象，这个方法根据英文翻译过来也能明白什么意思啦，跳过等待状态 ）、用户已关闭 SW 作用域下的所有页面，从而释放了当前处于激活状态的 worker、超出指定时间，从而释放当前处于激活状态的 worker</p>
</li>
<li>
<p>Activated （ 激活成功 ）：该状态，其成功接收了 document 全面控制的激活态 worker 。</p>
</li>
<li>
<p>Redundant （ 废弃 ）：这个状态的出现时有原因的，如果 installing 事件失败或者 activating 事件失败或者新的 SW 替换其成为激活态 worker 。installing 事件失败和 activating 事件失败的信息我们可以在 Chrome 浏览器的 DevTools 中查看</p>
</li>
</ul>
<p>一个很不错的全面介绍sw的教程：[https://www.villainhr.com/page/2017/01/08/Service%20Worker%20%E5%85%A8%E9%9D%A2%E8%BF%9B%E9%98%B6](https://www.villainhr.com/page/2017/01/08/Service Worker 全面进阶)</p>
<h4 id="manifest" tabindex="-1"><a class="header-anchor" href="#manifest" aria-hidden="true">#</a> Manifest</h4>
<p>Web App Manifest 是一个 W3C 规范，它定义了一个基于 JSON 的 List 。Manifest 在 PWA 中的作用有：</p>
<p>能够将你浏览的网页添加到你的手机屏幕上</p>
<p>在 Android 上能够全屏启动，不显示地址栏 （ 由于 Iphone 手机的浏览器是 Safari ，所以不支持哦）</p>
<p>控制屏幕 横屏 / 竖屏 展示</p>
<p>定义启动画面</p>
<p>可以设置你的应用启动是从主屏幕启动还是从 URL 启动</p>
<p>可以设置你添加屏幕上的应用程序图标、名字、图标大小</p>
<h4 id="push-notification" tabindex="-1"><a class="header-anchor" href="#push-notification" aria-hidden="true">#</a> Push Notification</h4>
<p>Push 和 Notification 是两个不同的功能，涉及到两个 API 。</p>
<p>Notification 是浏览器发出的通知消息。</p>
<p>Push 和 Notification 的关系，Push：服务器端将更新的信息传递给 SW ，Notification： SW 将更新的信息推送给用户。</p>
<h3 id="pwa示例" tabindex="-1"><a class="header-anchor" href="#pwa示例" aria-hidden="true">#</a> PWA示例</h3>
<p><strong>准备</strong></p>
<p>我们先创建一个关于 PWA 的项目文件夹，</p>
<p>进入文件夹下我们准备一张 120x120的图片一张，作为我们的应用程序图标。</p>
<p>创建一个 index.html 文件</p>
<p>创建一个 main.css 文件</p>
<p>创建一个 manifest.json 文件</p>
<p>创建一个 sw.js 文件</p>
<p><img src="/images/2020-10-12-10-23-05.png" alt=""></p>
<p><strong>index.html</strong></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Hello PWA<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main.css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>manifest<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>manifest.json<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>Hello PWA<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token comment">// 检测浏览器是否支持SW</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>serviceWorker <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    navigator<span class="token punctuation">.</span>serviceWorker<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token string">'sw.js'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">registartion</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'支持sw:'</span><span class="token punctuation">,</span>registartion<span class="token punctuation">.</span>scope<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>main.css</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>h3{
  color: #f00;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>manifest.json</strong></p>
<p>short_name: “ &quot; 用户主屏幕上的应用名字</p>
<p>display : “standalone&quot; 设置启动样式，让您的网络应用隐藏浏览器的 URL 地址栏</p>
<p>start_url : “/“ 设置启动网址，如果不提供的话，默认是使用当前页面</p>
<p>theme_color : “ “ 用来告知浏览器用什么颜色来为地址栏等 UI 元素着色</p>
<p>background_color: “ ” 设置启动页面的背景颜色</p>
<p>icons：”” 就是添加到主屏幕之后的图标</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"一个PWA示例"</span><span class="token punctuation">,</span>
  <span class="token property">"short_name"</span><span class="token operator">:</span> <span class="token string">"PWA示例"</span><span class="token punctuation">,</span>
  <span class="token property">"start_url"</span><span class="token operator">:</span> <span class="token string">"/index.html"</span><span class="token punctuation">,</span>
  <span class="token property">"display"</span><span class="token operator">:</span> <span class="token string">"standalone"</span><span class="token punctuation">,</span>
  <span class="token property">"background_color"</span><span class="token operator">:</span> <span class="token string">"#fff"</span><span class="token punctuation">,</span>
  <span class="token property">"theme_color"</span><span class="token operator">:</span> <span class="token string">"#3eaf7c"</span><span class="token punctuation">,</span>
  <span class="token property">"icons"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"/youhun.jpg"</span><span class="token punctuation">,</span>
      <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"120x120"</span><span class="token punctuation">,</span>
      <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>sw.js</strong></p>
<p>看网上很多人都安装的hs和ngrok去调试，在这里为了照顾新手我是直接引用的sw</p>
<p>处理静态缓存，首先定义需要缓存的路径，以及需要缓存的静态文件的列表。</p>
<p>借助 SW 注册完成安装 SW 时，抓取资源写入缓存中。使用了一个方法那就是 self.skipWaiting( ) ，为了在页面更新的过程当中，新的 SW 脚本能够立刻激活和生效。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">importScripts</span><span class="token punctuation">(</span><span class="token string">"https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> cacheStorageKey <span class="token operator">=</span> <span class="token string">'minimal-pwa-1'</span>
<span class="token keyword">var</span> cacheList<span class="token operator">=</span><span class="token punctuation">[</span>
  <span class="token string">'/'</span><span class="token punctuation">,</span>
  <span class="token string">'index.html'</span><span class="token punctuation">,</span>
  <span class="token string">'main.css'</span><span class="token punctuation">,</span>
  <span class="token string">'youhun.jpg'</span>
<span class="token punctuation">]</span>
self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'install'</span><span class="token punctuation">,</span><span class="token parameter">e</span> <span class="token operator">=></span><span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">waitUntil</span><span class="token punctuation">(</span>
    caches<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>cacheStorageKey<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">cache</span> <span class="token operator">=></span> cache<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>cacheList<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> self<span class="token punctuation">.</span><span class="token function">skipWaiting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>处理动态缓存，我们监听 fetch 事件，在 caches 中去 match 事件的 request ，如果 response 不为空的话就返回 response ，最后返回 fetch 请求，在 fetch 事件中我们可以手动生成 response 返回给页面。</p>
<p>更新静态资源，缓存的资源会跟随着版本的更新会过期的，所以会根据缓存的字符串名称清除旧缓存。在新安装的 SW 中通过调用 self.clients.claim( ) 取得页面的控制权，这样之后打开页面都会使用版本更新的缓存。旧的 SW 脚本不在控制着页面之后会被停止，也就是会进入 Redundant 期。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'fetch'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">respondWith</span><span class="token punctuation">(</span>
    caches<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>response <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> response
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
self<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'activate'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  e<span class="token punctuation">.</span><span class="token function">waitUntil</span><span class="token punctuation">(</span>
    <span class="token comment">//获取所有cache名称</span>
    caches<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">cacheNames</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>
        <span class="token comment">// 获取所有不同于当前版本名称cache下的内容</span>
        cacheNames<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">cacheNames</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> cacheNames <span class="token operator">!==</span> cacheStorageKey
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">cacheNames</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> caches<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>cacheNames<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> self<span class="token punctuation">.</span>clients<span class="token punctuation">.</span><span class="token function">claim</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>部署</strong></p>
<p>我们可以把当前pwa目录的所有内容都扔进服务器中，或者coding Pages和gitHub Pages也是可以的，当然，记得开启https。在上变介绍过SW的权利比较大，为了安全性，我们使用https协议来访问。</p>
<p>试着访问一下，我们这里用的coding Pages并且绑定了自己的域名</p>
<p>打开 chrom 的调试工具，打开 application ，点击 service workers 之后我们会发现 sw.js 脚本已经存到了 SW 中 。</p>
<p><img src="/images/2020-10-12-10-24-22.png" alt=""></p>
<p>我们打开 Network 刷新页面一下，看看，我们的页面资源来自 SW 而不是其他的地方，在 Console 中也打印出了我们在 index.html 中判断的语句，浏览器支持就会打印出这一句话。</p>
<p><img src="/images/2020-10-12-10-24-47.png" alt=""></p>
<p>接下来我们断网操作，在 Application 中给 Offline 打上对勾就行啦。然后刷新页面，我们仍然能看到之前的页面，原因就是我们在上图看到，他的资源是从 SW 上获得到的。当我们第一次打开这个页面的时候，Resopnse 对象被存到了 Cache Storage （ 定义在 SW 规范中 ，相关资料请同学们自行查询啦 ）中，我们看下图：</p>
<p><img src="/images/2020-10-12-10-25-18.png" alt=""></p>
<p>通过存放到 Cache Storage 中，我们下次访问的时候如果是弱网或者断网的情况下，就可以不走网络请求，而直接就能将本地缓存的内容展示给用户，优化用户的弱网及断网体验。</p>
<p>这个时候肯定会有同学在想，如果内容更新了，那么页面展示的内容是新内容呢还是旧内容呢？下面我们操作一下，打开 index.html 文件，我们在 body 中添加一个 p 标签 ，然后回到页面刷新。</p>
<p><img src="/images/2020-10-12-10-25-52.png" alt=""></p>
<p><img src="/images/2020-10-12-10-26-19.png" alt=""></p>
<p>我们看到，页面上的内容并没有显示出我刚刚添加的那个 p 标签。这说明了，我们拿到的数据还是从 Cache Storage 中获取到的，Cache Storage中的内容并没有更新，强制刷新也不行哦，那么我们怎么才能让我刚刚添加的那个 p 标签显示出来呢。</p>
<p>我们打开 sw.js 脚本文件，我们修改一下 cacheStorageKey。</p>
<p><img src="/images/2020-10-12-10-26-43.png" alt=""></p>
<p>修改后，我们再次打开该网址，强制刷新下或者关掉浏览器重新打开。</p>
<p>页面中出现了刚刚添加的P标签，我们再看一下 Cache Storage 中的缓存名字，已经被修改。</p>
<p><img src="/images/2020-10-12-10-27-05.png" alt=""></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>如果是使用coding或者gitHub提供的pages服务，则需要注意最好绑定下独立域名。如果不绑定则注意下文件请求路径即可。</p>
<p>研究PWA门槛不低，部署的服务器要求HTTPS，ServiceWorker涉及API众多，需要单独学习，另外npm中也已经有这个包了<a href="https://www.npmjs.com/package/web-pwa" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package...<ExternalLinkIcon/></a> ，玩玩可以，真正部署到项目生产环境可能坑很多，但有坑填坑，不折腾还叫前端么。</p>
<p>本作品系 原创， <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer">采用《署名-非商业性使用-禁止演绎 4.0 国际》许可协议<ExternalLinkIcon/></a></p>
<h2 id="vuepress-pwa支持" tabindex="-1"><a class="header-anchor" href="#vuepress-pwa支持" aria-hidden="true">#</a> Vuepress PWA支持</h2>
<h3 id="vuepress-plugin-pwa" tabindex="-1"><a class="header-anchor" href="#vuepress-plugin-pwa" aria-hidden="true">#</a> <a href="https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-pwa" target="_blank" rel="noopener noreferrer">@vuepress/plugin-pwa<ExternalLinkIcon/></a></h3>
<blockquote>
<p>PWA 插件</p>
</blockquote>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @vuepress/plugin-pwa
<span class="token comment"># OR npm install -D @vuepress/plugin-pwa</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@vuepress/pwa'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示</p>
<p>为了让你的网站完全地兼容 PWA，你需要:</p>
<ul>
<li>在 <code v-pre>.vuepress/public</code> 提供 Manifest 和 icons</li>
<li>在 <code v-pre>.vuepress/config.js</code> 添加正確的 <a href="https://v1.vuepress.vuejs.org/config/#head" target="_blank" rel="noopener noreferrer">head links<ExternalLinkIcon/></a>(参见下面例子).</li>
</ul>
<p>更多细节，请参见 <a href="https://developer.mozilla.org/en-US/docs/Web/Manifest" target="_blank" rel="noopener noreferrer">MDN docs about the Web App Manifest<ExternalLinkIcon/></a>.</p>
<p>这是一个在VuePress中完全地兼容 PWA 的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'icon'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'/logo.png'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'manifest'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'/manifest.json'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'theme-color'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'#3eaf7c'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'apple-mobile-web-app-capable'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'yes'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'apple-mobile-web-app-status-bar-style'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'black'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'apple-touch-icon'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'/icons/apple-touch-icon-152x152.png'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'mask-icon'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'/icons/safari-pinned-tab.svg'</span><span class="token punctuation">,</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'#3eaf7c'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'msapplication-TileImage'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'/icons/msapplication-icon-144x144.png'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'msapplication-TileColor'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'#000000'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@vuepress/pwa'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">serviceWorker</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">updatePopup</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="选项" tabindex="-1"><a class="header-anchor" href="#选项" aria-hidden="true">#</a> 选项</h3>
<h4 id="serviceworker" tabindex="-1"><a class="header-anchor" href="#serviceworker" aria-hidden="true">#</a> serviceWorker</h4>
<ul>
<li>类型: <code v-pre>boolean</code></li>
<li>默认值: <code v-pre>true</code></li>
</ul>
<p>如果设置为 <code v-pre>true</code>，VuePress 将自动生成并注册一个 <a href="https://developers.google.com/web/fundamentals/primers/service-workers/" target="_blank" rel="noopener noreferrer">Service Worker<ExternalLinkIcon/></a>，用于缓存页面的内容以供离线使用（仅会在生产环境中启用）。</p>
<p>有一个别名化的模块 <code v-pre>@sw-event</code> 模块将会 emit 以下事件：</p>
<ul>
<li><code v-pre>sw-ready</code></li>
<li><code v-pre>sw-cached</code></li>
<li><code v-pre>sw-updated</code></li>
<li><code v-pre>sw-offline</code></li>
<li><code v-pre>sw-error</code></li>
</ul>
<p>提示</p>
<p>只有在你能够使用 SSL 部署您的站点时才能启用此功能，因为 service worker 只能在 HTTPs 的 URL 下注册。</p>
<h4 id="generateswconfig" tabindex="-1"><a class="header-anchor" href="#generateswconfig" aria-hidden="true">#</a> generateSWConfig</h4>
<ul>
<li>类型: <code v-pre>object</code></li>
<li>默认值: <code v-pre>{}</code></li>
</ul>
<p>workbox-build 的 <a href="https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config" target="_blank" rel="noopener noreferrer">generateSW config<ExternalLinkIcon/></a>。</p>
<h4 id="updatepopup" tabindex="-1"><a class="header-anchor" href="#updatepopup" aria-hidden="true">#</a> updatePopup</h4>
<ul>
<li>类型: <code v-pre>boolean|popupConfig</code></li>
<li>默认值: <code v-pre>undefined</code></li>
</ul>
<p>类型 <code v-pre>popupConfig</code> 的定义如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">normalPopupConfig</span> <span class="token punctuation">{</span>
  message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// defaults to 'New content is available.'</span>
  buttonText<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// defaults to 'Refresh'</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">localedPopupConfig</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>localePath<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> normalPopupConfig
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">popupConfig</span> <span class="token operator">=</span> normalPopupConfig <span class="token operator">|</span> localedPopupConfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本选项开启了一个用于刷新内容的弹窗。这个弹窗将会在站点有内容更新时显示出来，并提供了一个 <code v-pre>refresh</code> 按钮，允许用户立即刷新内容。</p>
<blockquote>
<p>如果没有“刷新”按钮，则只有在所有的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Clients" target="_blank" rel="noopener noreferrer">Clients<ExternalLinkIcon/></a> 被关闭后，新的 Service Worker 才会处于活动状态。这意味着用户在关闭你网站的所有标签之前无法看到新内容。但是 <code v-pre>refresh</code> 按钮会立即激活新的 Service Worker。</p>
</blockquote>
<h4 id="popupcomponent" tabindex="-1"><a class="header-anchor" href="#popupcomponent" aria-hidden="true">#</a> popupComponent</h4>
<ul>
<li>类型: <code v-pre>string</code></li>
<li>默认值: <code v-pre>undefined</code></li>
</ul>
<p>用于替换默认弹出组件的自定义组件。</p>
<p><strong>参考:</strong></p>
<ul>
<li><a href="https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#%E8%87%AA%E5%AE%9A%E4%B9%89-sw-update-popup-%E7%9A%84-ui" target="_blank" rel="noopener noreferrer">自定义 SW-Update Popup<ExternalLinkIcon/></a></li>
</ul>
<h3 id="从-0-x-迁移" tabindex="-1"><a class="header-anchor" href="#从-0-x-迁移" aria-hidden="true">#</a> 从 0.x 迁移</h3>
<h4 id="service-worker-1" tabindex="-1"><a class="header-anchor" href="#service-worker-1" aria-hidden="true">#</a> Service Worker</h4>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code>module.exports = {
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> serviceWorker: true,
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> plugins: ['@vuepress/pwa']
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sw-update-popup" tabindex="-1"><a class="header-anchor" href="#sw-update-popup" aria-hidden="true">#</a> SW-Update Popup</h4>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code>module.exports = {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> themeConfig: {
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">   serviceWorker: {
</span><span class="token prefix deleted">-</span><span class="token line">     updatePopup: {
</span><span class="token prefix deleted">-</span><span class="token line">        message: "New content is available.",
</span><span class="token prefix deleted">-</span><span class="token line">        buttonText: "Refresh"
</span><span class="token prefix deleted">-</span><span class="token line">     }
</span><span class="token prefix deleted">-</span><span class="token line">   }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> },
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  plugins: {
</span><span class="token prefix inserted">+</span><span class="token line">   '@vuepress/pwa': {
</span><span class="token prefix inserted">+</span><span class="token line">      serviceWorker: true,
</span><span class="token prefix inserted">+</span><span class="token line">      updatePopup: {
</span><span class="token prefix inserted">+</span><span class="token line">        message: "New content is available.",
</span><span class="token prefix inserted">+</span><span class="token line">        buttonText: "Refresh"
</span><span class="token prefix inserted">+</span><span class="token line">      }
</span><span class="token prefix inserted">+</span><span class="token line">    }
</span><span class="token prefix inserted">+</span><span class="token line"> }
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你在 <a href="https://v1.vuepress.vuejs.org/zh/guide/i18n.html" target="_blank" rel="noopener noreferrer">i18n<ExternalLinkIcon/></a> 模式下:</p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code>module.exports = {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> themeConfig: {
</span><span class="token prefix unchanged"> </span><span class="token line">   '/': {
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">     serviceWorker: {
</span><span class="token prefix deleted">-</span><span class="token line">       updatePopup: {
</span><span class="token prefix deleted">-</span><span class="token line">         message: "New content is available.",
</span><span class="token prefix deleted">-</span><span class="token line">         buttonText: "Refresh"
</span><span class="token prefix deleted">-</span><span class="token line">       }
</span><span class="token prefix deleted">-</span><span class="token line">     }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   },
</span><span class="token prefix unchanged"> </span><span class="token line">   '/zh/': {
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">     serviceWorker: {
</span><span class="token prefix deleted">-</span><span class="token line">       updatePopup: {
</span><span class="token prefix deleted">-</span><span class="token line">         message: "发现新内容可用",
</span><span class="token prefix deleted">-</span><span class="token line">         buttonText: "刷新"
</span><span class="token prefix deleted">-</span><span class="token line">       }
</span><span class="token prefix deleted">-</span><span class="token line">     }
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">   }
</span><span class="token prefix unchanged"> </span><span class="token line"> },
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  plugins: {
</span><span class="token prefix inserted">+</span><span class="token line">    '@vuepress/pwa': {
</span><span class="token prefix inserted">+</span><span class="token line">      serviceWorker: true,
</span><span class="token prefix inserted">+</span><span class="token line">      updatePopup: {
</span><span class="token prefix inserted">+</span><span class="token line">        '/': {
</span><span class="token prefix inserted">+</span><span class="token line">          message: "New content is available.",
</span><span class="token prefix inserted">+</span><span class="token line">          buttonText: "Refresh"
</span><span class="token prefix inserted">+</span><span class="token line">        },
</span><span class="token prefix inserted">+</span><span class="token line">        '/zh/': {
</span><span class="token prefix inserted">+</span><span class="token line">          message: "发现新内容可用",
</span><span class="token prefix inserted">+</span><span class="token line">          buttonText: "刷新"
</span><span class="token prefix inserted">+</span><span class="token line">        }
</span><span class="token prefix inserted">+</span><span class="token line">      }
</span><span class="token prefix inserted">+</span><span class="token line">    }
</span><span class="token prefix inserted">+</span><span class="token line">  }
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得一提的是本插件已经内置了上述的 i18n 配置，所以如果你想直接使用默认的 i18n，你可以将上面的配置缩写为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'@vuepress/pwa'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">serviceWorker</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">updatePopup</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>欢迎提交 PR 以增加默认的 <a href="https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-pwa/lib/i18n.js" target="_blank" rel="noopener noreferrer">i18n 配置<ExternalLinkIcon/></a>.</p>
<h3 id="自定义-sw-update-popup-的-ui" tabindex="-1"><a class="header-anchor" href="#自定义-sw-update-popup-的-ui" aria-hidden="true">#</a> 自定义 SW-Update Popup 的 UI</h3>
<p>默认的 SW-Update Popup 组件提供了一个默认插槽，使您能够完全控制弹窗的外观。</p>
<p>首先，您需要在 <code v-pre>.vuepress/components</code> 中创建一个全局组件（例如<code v-pre>MySWUpdatePopup</code>)。 一个基于默认组件创建的简单组件如下：</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SWUpdatePopup</span> <span class="token attr-name">v-slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{ enabled, reload, message, buttonText }<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
      <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>enabled<span class="token punctuation">"</span></span>
      <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>my-sw-update-popup<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      {{ message }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>reload<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ buttonText }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>SWUpdatePopup</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> SWUpdatePopup <span class="token keyword">from</span> <span class="token string">'@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> SWUpdatePopup <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">.my-sw-update-popup</span> <span class="token punctuation">{</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 5px solid #3eaf7c<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.my-sw-update-popup button</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #fefefe<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着，更新你的插件配置：</p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code>module.exports = {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">  plugins: {
</span><span class="token prefix unchanged"> </span><span class="token line">   '@vuepress/pwa': {
</span><span class="token prefix unchanged"> </span><span class="token line">      serviceWorker: true,
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">      popupComponent: 'MySWUpdatePopup',
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">      updatePopup: true
</span><span class="token prefix unchanged"> </span><span class="token line">    }
</span><span class="token prefix unchanged"> </span><span class="token line"> }
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考:</h3>
<p><a href="https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#%E5%AE%89%E8%A3%85" target="_blank" rel="noopener noreferrer"><strong>vuepress官方文档</strong><ExternalLinkIcon/></a></p>
<ul>
<li><a href="https://v1.vuepress.vuejs.org/zh/guide/using-vue.html#%E4%BD%BF%E7%94%A8%E7%BB%84%E4%BB%B6" target="_blank" rel="noopener noreferrer">VuePress &gt; 使用组件<ExternalLinkIcon/></a></li>
<li><a href="https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD" target="_blank" rel="noopener noreferrer">Vue &gt; 作用域插槽<ExternalLinkIcon/></a></li>
</ul>
<h2 id="原文链接" tabindex="-1"><a class="header-anchor" href="#原文链接" aria-hidden="true">#</a> 原文链接</h2>
<p><a href="https://segmentfault.com/a/1190000014639473" target="_blank" rel="noopener noreferrer">PWA介绍及快速上手搭建一个PWA应用<ExternalLinkIcon/></a></p>
</div></template>


