# PWA介绍及快速上手搭建一个PWA应用

> 作者 游魂 | 发布于 2018-04-27

## PWA初次体验

>  前言：本示例不用安装任何东西
>
> 部分资源来自网络资源及PWA官网，不要把PWA想象的太复杂，跟着示例走一下，你行的。

### PWA介绍

一个新的前端技术，PWA（ 全称：Progressive Web App ）也就是说这是个渐进式的网页应用程序。

官网：[https://developers.google.com...](https://developers.google.com/web/progressive-web-apps/)

是 Google 在 2015 年提出，2016年6月才推广的项目。是结合了一系列现代Web技术的组合，在网页应用中实现和原生应用相近的用户体验。

官网上给出 PWA 的宣传是 ： **Reliable** （ 可靠的 ）、**Fast**（ 快速的 ）、**Engaging**（ 可参与的 ）

**Reliable** ：当用户从手机主屏幕启动时，不用考虑网络的状态是如何，都可以立刻加载出 PWA。

**Fast**：这一点应该都很熟悉了吧，站在用户的角度来考虑，如果一个网页加载速度有点长的话，那么我们会放弃浏览该网站，所以 PWA 在这一点上做的很好，他的加载速度是很快的。

**Engaging** ： PWA 可以添加在用户的主屏幕上，不用从应用商店进行下载，他们通过网络应用程序 Manifest file 提供类似于 APP 的使用体验（ 在 Android 上可以设置全屏显示哦，由于 Safari 支持度的问题，所以在 IOS 上并不可以 ），并且还能进行 ”推送通知” 。

### PWA关键技术

- **Service Worker** （可以理解为服务工厂）
- **Manifest** （应用清单）
- **Push Notification**（推送通知）

#### Service Worker

以下用SW来表示

SW 是什么呢？这个是离线缓存文件。我们 PWA 技术使用的就是它！SW 是浏览器在后台独立于网页运行的脚本，它打开了通向不需要网页或用户交互的功能的大门，因为使用了它，才会有的那个 Reliable 特性吧，SW 作用于 浏览器于服务器之间，相当于一个代理服务器。

**浏览器支持**

顺便带一句：目前只能在 HTTPS 环境下才能使用SW，因为SW 的权利比较大，能够直接截取和返回用户的请求，所以要考虑一下安全性问题。

![](/images/2020-10-12-10-20-59.png)

**事件机制** 

![](/images/2020-10-12-10-21-50.png)

**功能**(还是比较逆天的)

- 后台数据的同步
- 从其他域获取资源请求
- 接受计算密集型数据的更新，多页面共享该数据
- 客户端编译与依赖管理
- 后端服务的hook机制
- 根据URL模式，自定义模板
- 性能优化
- 消息推送
- 定时默认更新
- 地理围栏

**生命周期**

![](/images/2020-10-12-10-22-32.png)

- Parsed （ 解析成功 ）： 首次注册 SW 时，浏览器解决脚本并获得入口点，如果解析成功，就可以访问到 SW 注册对象，在这一点中我们需要在 HTML 页面中添加一个判断，判断该浏览器是否支持 SW 。

- Installing （ 正在安装 ）：SW 脚本解析完成之后，浏览器会尝试进行安装，installing 中 install 事件被执行，如果其中有 event.waitUntil ( ) 方法，则 installing 事件会一直等到该方法中的 Promise 完成之后才会成功，如果 Promise 被拒绝，则安装失败，SW会进入 Redundant（ 废弃 ）状态。

- Installed / Waiting （安装成功/等待中）：如果安装成功，SW 将会进入这个状态。

- Activating （ 正在激活 ）：处于 waiting 状态的 SW 发生以下情况，将会进入 activating 状态中：

  当前已无激活状态的 worker 、 SW脚本中的 self.skipWaiting（）方法被调用 （ ps： self 是 SW 中作用于全局的对象，这个方法根据英文翻译过来也能明白什么意思啦，跳过等待状态 ）、用户已关闭 SW 作用域下的所有页面，从而释放了当前处于激活状态的 worker、超出指定时间，从而释放当前处于激活状态的 worker

- Activated （ 激活成功 ）：该状态，其成功接收了 document 全面控制的激活态 worker 。

- Redundant （ 废弃 ）：这个状态的出现时有原因的，如果 installing 事件失败或者 activating 事件失败或者新的 SW 替换其成为激活态 worker 。installing 事件失败和 activating 事件失败的信息我们可以在 Chrome 浏览器的 DevTools 中查看

一个很不错的全面介绍sw的教程：[https://www.villainhr.com/page/2017/01/08/Service%20Worker%20%E5%85%A8%E9%9D%A2%E8%BF%9B%E9%98%B6](https://www.villainhr.com/page/2017/01/08/Service Worker 全面进阶)

#### Manifest

Web App Manifest 是一个 W3C 规范，它定义了一个基于 JSON 的 List 。Manifest 在 PWA 中的作用有：

 能够将你浏览的网页添加到你的手机屏幕上

 在 Android 上能够全屏启动，不显示地址栏 （ 由于 Iphone 手机的浏览器是 Safari ，所以不支持哦）

 控制屏幕 横屏 / 竖屏 展示

 定义启动画面

 可以设置你的应用启动是从主屏幕启动还是从 URL 启动

 可以设置你添加屏幕上的应用程序图标、名字、图标大小

#### Push Notification

Push 和 Notification 是两个不同的功能，涉及到两个 API 。

 Notification 是浏览器发出的通知消息。

 Push 和 Notification 的关系，Push：服务器端将更新的信息传递给 SW ，Notification： SW 将更新的信息推送给用户。

### PWA示例

**准备**

我们先创建一个关于 PWA 的项目文件夹，

进入文件夹下我们准备一张 120x120的图片一张，作为我们的应用程序图标。

创建一个 index.html 文件

创建一个 main.css 文件

创建一个 manifest.json 文件

创建一个 sw.js 文件

![](/images/2020-10-12-10-23-05.png)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello PWA</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="main.css">
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <h3>Hello PWA</h3>
</body>
<script>
  // 检测浏览器是否支持SW
  if(navigator.serviceWorker != null){
    navigator.serviceWorker.register('sw.js')
    .then(function(registartion){
      console.log('支持sw:',registartion.scope)
    })
  }
</script>
</html>
```

**main.css**

```
h3{
  color: #f00;
}
```

**manifest.json**

short_name: “ " 用户主屏幕上的应用名字

display : “standalone" 设置启动样式，让您的网络应用隐藏浏览器的 URL 地址栏

start_url : “/“ 设置启动网址，如果不提供的话，默认是使用当前页面

theme_color : “ “ 用来告知浏览器用什么颜色来为地址栏等 UI 元素着色

background_color: “ ” 设置启动页面的背景颜色

icons：”” 就是添加到主屏幕之后的图标

```json
{
  "name": "一个PWA示例",
  "short_name": "PWA示例",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#fff",
  "theme_color": "#3eaf7c",
  "icons": [
    {
      "src": "/youhun.jpg",
      "sizes": "120x120",
      "type": "image/png"
    }
  ],
}
```

**sw.js**

看网上很多人都安装的hs和ngrok去调试，在这里为了照顾新手我是直接引用的sw

处理静态缓存，首先定义需要缓存的路径，以及需要缓存的静态文件的列表。

借助 SW 注册完成安装 SW 时，抓取资源写入缓存中。使用了一个方法那就是 self.skipWaiting( ) ，为了在页面更新的过程当中，新的 SW 脚本能够立刻激活和生效。

```js
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'minimal-pwa-1'
var cacheList=[
  '/',
  'index.html',
  'main.css',
  'youhun.jpg'
]
self.addEventListener('install',e =>{
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
})
```

处理动态缓存，我们监听 fetch 事件，在 caches 中去 match 事件的 request ，如果 response 不为空的话就返回 response ，最后返回 fetch 请求，在 fetch 事件中我们可以手动生成 response 返回给页面。

更新静态资源，缓存的资源会跟随着版本的更新会过期的，所以会根据缓存的字符串名称清除旧缓存。在新安装的 SW 中通过调用 self.clients.claim( ) 取得页面的控制权，这样之后打开页面都会使用版本更新的缓存。旧的 SW 脚本不在控制着页面之后会被停止，也就是会进入 Redundant 期。

```js
self.addEventListener('fetch',function(e){
  e.respondWith(
    caches.match(e.request).then(function(response){
      if(response != null){
        return response
      }
      return fetch(e.request.url)
    })
  )
})
self.addEventListener('activate',function(e){
  e.waitUntil(
    //获取所有cache名称
    caches.keys().then(cacheNames => {
      return Promise.all(
        // 获取所有不同于当前版本名称cache下的内容
        cacheNames.filter(cacheNames => {
          return cacheNames !== cacheStorageKey
        }).map(cacheNames => {
          return caches.delete(cacheNames)
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})
```

**部署**

我们可以把当前pwa目录的所有内容都扔进服务器中，或者coding Pages和gitHub Pages也是可以的，当然，记得开启https。在上变介绍过SW的权利比较大，为了安全性，我们使用https协议来访问。

试着访问一下，我们这里用的coding Pages并且绑定了自己的域名

打开 chrom 的调试工具，打开 application ，点击 service workers 之后我们会发现 sw.js 脚本已经存到了 SW 中 。

![](/images/2020-10-12-10-24-22.png)

我们打开 Network 刷新页面一下，看看，我们的页面资源来自 SW 而不是其他的地方，在 Console 中也打印出了我们在 index.html 中判断的语句，浏览器支持就会打印出这一句话。

![](/images/2020-10-12-10-24-47.png)

接下来我们断网操作，在 Application 中给 Offline 打上对勾就行啦。然后刷新页面，我们仍然能看到之前的页面，原因就是我们在上图看到，他的资源是从 SW 上获得到的。当我们第一次打开这个页面的时候，Resopnse 对象被存到了 Cache Storage （ 定义在 SW 规范中 ，相关资料请同学们自行查询啦 ）中，我们看下图：

![](/images/2020-10-12-10-25-18.png)

通过存放到 Cache Storage 中，我们下次访问的时候如果是弱网或者断网的情况下，就可以不走网络请求，而直接就能将本地缓存的内容展示给用户，优化用户的弱网及断网体验。

这个时候肯定会有同学在想，如果内容更新了，那么页面展示的内容是新内容呢还是旧内容呢？下面我们操作一下，打开 index.html 文件，我们在 body 中添加一个 p 标签 ，然后回到页面刷新。

![](/images/2020-10-12-10-25-52.png)

![](/images/2020-10-12-10-26-19.png)

我们看到，页面上的内容并没有显示出我刚刚添加的那个 p 标签。这说明了，我们拿到的数据还是从 Cache Storage 中获取到的，Cache Storage中的内容并没有更新，强制刷新也不行哦，那么我们怎么才能让我刚刚添加的那个 p 标签显示出来呢。

我们打开 sw.js 脚本文件，我们修改一下 cacheStorageKey。

![](/images/2020-10-12-10-26-43.png)

修改后，我们再次打开该网址，强制刷新下或者关掉浏览器重新打开。

页面中出现了刚刚添加的P标签，我们再看一下 Cache Storage 中的缓存名字，已经被修改。

![](/images/2020-10-12-10-27-05.png)

### 总结

如果是使用coding或者gitHub提供的pages服务，则需要注意最好绑定下独立域名。如果不绑定则注意下文件请求路径即可。

研究PWA门槛不低，部署的服务器要求HTTPS，ServiceWorker涉及API众多，需要单独学习，另外npm中也已经有这个包了[https://www.npmjs.com/package...](https://www.npmjs.com/package/web-pwa) ，玩玩可以，真正部署到项目生产环境可能坑很多，但有坑填坑，不折腾还叫前端么。

本作品系 原创， [采用《署名-非商业性使用-禁止演绎 4.0 国际》许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/)

## Vuepress PWA支持

### [@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-pwa)

> PWA 插件

### 安装

```bash
yarn add -D @vuepress/plugin-pwa
# OR npm install -D @vuepress/plugin-pwa
```

### 使用

```javascript
module.exports = {
  plugins: ['@vuepress/pwa']
}
```

提示

为了让你的网站完全地兼容 PWA，你需要:

- 在 `.vuepress/public` 提供 Manifest 和 icons
- 在 `.vuepress/config.js` 添加正確的 [head links](https://v1.vuepress.vuejs.org/config/#head)(参见下面例子).

更多细节，请参见 [MDN docs about the Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).

这是一个在VuePress中完全地兼容 PWA 的例子：

```javascript
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
  }],
}
```

### 选项

#### serviceWorker

- 类型: `boolean`
- 默认值: `true`

如果设置为 `true`，VuePress 将自动生成并注册一个 [Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/)，用于缓存页面的内容以供离线使用（仅会在生产环境中启用）。

有一个别名化的模块 `@sw-event` 模块将会 emit 以下事件：

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

提示

只有在你能够使用 SSL 部署您的站点时才能启用此功能，因为 service worker 只能在 HTTPs 的 URL 下注册。

#### generateSWConfig

- 类型: `object`
- 默认值: `{}`

workbox-build 的 [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)。

#### updatePopup

- 类型: `boolean|popupConfig`
- 默认值: `undefined`

类型 `popupConfig` 的定义如下：

```typescript
interface normalPopupConfig {
  message: string; // defaults to 'New content is available.'
  buttonText: string; // defaults to 'Refresh'
}

interface localedPopupConfig {
  [localePath: string]: normalPopupConfig
}

type popupConfig = normalPopupConfig | localedPopupConfig
```

本选项开启了一个用于刷新内容的弹窗。这个弹窗将会在站点有内容更新时显示出来，并提供了一个 `refresh` 按钮，允许用户立即刷新内容。

> 如果没有“刷新”按钮，则只有在所有的 [Clients](https://developer.mozilla.org/en-US/docs/Web/API/Clients) 被关闭后，新的 Service Worker 才会处于活动状态。这意味着用户在关闭你网站的所有标签之前无法看到新内容。但是 `refresh` 按钮会立即激活新的 Service Worker。

#### popupComponent

- 类型: `string`
- 默认值: `undefined`

用于替换默认弹出组件的自定义组件。

**参考:**

- [自定义 SW-Update Popup](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#自定义-sw-update-popup-的-ui)

### 从 0.x 迁移

#### Service Worker

```diff
module.exports = {
- serviceWorker: true,
+ plugins: ['@vuepress/pwa']
}
```

#### SW-Update Popup

```diff
module.exports = {
  themeConfig: {
-   serviceWorker: {
-     updatePopup: {
-        message: "New content is available.",
-        buttonText: "Refresh"
-     }
-   }
  },
+  plugins: {
+   '@vuepress/pwa': {
+      serviceWorker: true,
+      updatePopup: {
+        message: "New content is available.",
+        buttonText: "Refresh"
+      }
+    }
+ }
}
```

如果你在 [i18n](https://v1.vuepress.vuejs.org/zh/guide/i18n.html) 模式下:

```diff
module.exports = {
  themeConfig: {
    '/': {
-     serviceWorker: {
-       updatePopup: {
-         message: "New content is available.",
-         buttonText: "Refresh"
-       }
-     }
    },
    '/zh/': {
-     serviceWorker: {
-       updatePopup: {
-         message: "发现新内容可用",
-         buttonText: "刷新"
-       }
-     }
    }
  },
+  plugins: {
+    '@vuepress/pwa': {
+      serviceWorker: true,
+      updatePopup: {
+        '/': {
+          message: "New content is available.",
+          buttonText: "Refresh"
+        },
+        '/zh/': {
+          message: "发现新内容可用",
+          buttonText: "刷新"
+        }
+      }
+    }
+  }
```

值得一提的是本插件已经内置了上述的 i18n 配置，所以如果你想直接使用默认的 i18n，你可以将上面的配置缩写为：

```js
module.exports = {
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    }
  }
}
```

欢迎提交 PR 以增加默认的 [i18n 配置](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-pwa/lib/i18n.js).

### 自定义 SW-Update Popup 的 UI

默认的 SW-Update Popup 组件提供了一个默认插槽，使您能够完全控制弹窗的外观。

首先，您需要在 `.vuepress/components` 中创建一个全局组件（例如`MySWUpdatePopup`)。 一个基于默认组件创建的简单组件如下：

```vue
<template>
  <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
    <div
      v-if="enabled"
      class="my-sw-update-popup">
      {{ message }}<br>
      <button @click="reload">{{ buttonText }}</button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

export default {
  components: { SWUpdatePopup }
}
</script>

<style>
.my-sw-update-popup {
  text-align: right;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  font-size: 20px;
  padding: 10px;
  border: 5px solid #3eaf7c;
}

.my-sw-update-popup button {
  border: 1px solid #fefefe;
}
</style>
```

接着，更新你的插件配置：

```diff
module.exports = {
   plugins: {
    '@vuepress/pwa': {
       serviceWorker: true,
+      popupComponent: 'MySWUpdatePopup',
       updatePopup: true
     }
  }
}
```

### 参考:

[**vuepress官方文档**](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#%E5%AE%89%E8%A3%85)

- [VuePress > 使用组件](https://v1.vuepress.vuejs.org/zh/guide/using-vue.html#使用组件)
- [Vue > 作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#作用域插槽)

## 原文链接

[PWA介绍及快速上手搭建一个PWA应用](https://segmentfault.com/a/1190000014639473)

