/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "e3ec3dcda4e5b771d10a5728f76eeb1c"
  },
  {
    "url": "ALGO/KMP.html",
    "revision": "84b495ab9f2c375ee7910c1e23b38c83"
  },
  {
    "url": "assets/css/0.styles.77d59476.css",
    "revision": "8ad29684f58da5c8aa683ddd2d0a9c27"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.651a42dd.js",
    "revision": "cec14396cd0f0b5e9de6fcd1ca437fbf"
  },
  {
    "url": "assets/js/11.5a5ac60a.js",
    "revision": "27fe99dfc9a5bd2c1f1b081473d3f140"
  },
  {
    "url": "assets/js/12.acbd8c35.js",
    "revision": "52bf6150f2ed6b9f235b97b95827f08b"
  },
  {
    "url": "assets/js/13.d2f9aa11.js",
    "revision": "7042180252315c97b33f0f2f7bb8b890"
  },
  {
    "url": "assets/js/14.d444027e.js",
    "revision": "928aa2dea20ed2f8120093721796f22a"
  },
  {
    "url": "assets/js/15.ba5bacd0.js",
    "revision": "66fa204fb425b0d36446c6b6133c9cbb"
  },
  {
    "url": "assets/js/16.eff87abd.js",
    "revision": "322ec8423f48a65b7bc0077de9b22451"
  },
  {
    "url": "assets/js/17.3d39b1a5.js",
    "revision": "7e18ce7fe779f347edb6655a195a1e07"
  },
  {
    "url": "assets/js/18.a73ebe76.js",
    "revision": "691e208c3857f0074df44b0182d9b928"
  },
  {
    "url": "assets/js/19.80ff5689.js",
    "revision": "eedafc0a0eab76eb1b51da8397c1bbb4"
  },
  {
    "url": "assets/js/2.f8658114.js",
    "revision": "79745531bc7f7377cd130048d3530c18"
  },
  {
    "url": "assets/js/20.86d92e51.js",
    "revision": "9c68cef07a3118efd8a6d8df30eda578"
  },
  {
    "url": "assets/js/21.9aaf1f9f.js",
    "revision": "b7ec0effd872225668e1cbfed70f4438"
  },
  {
    "url": "assets/js/22.f23310bb.js",
    "revision": "b37e33b594b9f1881520d78c8f47c165"
  },
  {
    "url": "assets/js/23.44bfbcb4.js",
    "revision": "c4b798f8c2000e4cc10ef662ee90ea1a"
  },
  {
    "url": "assets/js/24.c15a3840.js",
    "revision": "2e9565dc280e8554714eafe0c68ef4eb"
  },
  {
    "url": "assets/js/25.84382a75.js",
    "revision": "10b770bf431bfe6f2e8be974702da247"
  },
  {
    "url": "assets/js/26.987d93ae.js",
    "revision": "1acf18ebd991f19cf4aed119a664e968"
  },
  {
    "url": "assets/js/27.818215ca.js",
    "revision": "69d8e13f05ac524f37b91fc2f24eac3c"
  },
  {
    "url": "assets/js/28.425d750a.js",
    "revision": "c7feefa1941dda7ac3f8ffcf472cbcf1"
  },
  {
    "url": "assets/js/29.2cf4b791.js",
    "revision": "b996c0b28695de578c906f622b8090a6"
  },
  {
    "url": "assets/js/3.434642e4.js",
    "revision": "4c7979143d0ead74e2d8d0e7ad002593"
  },
  {
    "url": "assets/js/30.e46de318.js",
    "revision": "5dd286d8e719469b7ec49ef23e14f168"
  },
  {
    "url": "assets/js/31.872fa95f.js",
    "revision": "1844a2742b95662364049f68eab33b48"
  },
  {
    "url": "assets/js/32.083c5b78.js",
    "revision": "c810b00af9bee4560fcd718c8077d1e4"
  },
  {
    "url": "assets/js/33.5a4abf92.js",
    "revision": "2ca46ed0fb26267ce8ba9ab9c3f9810d"
  },
  {
    "url": "assets/js/4.c58eb8ee.js",
    "revision": "32163fe915c4dfe05f3f81331a9de834"
  },
  {
    "url": "assets/js/5.e6e659b2.js",
    "revision": "f5d3c0916b84958a48f954052fc0761b"
  },
  {
    "url": "assets/js/6.f4454e67.js",
    "revision": "c6b6adbf3adee635ea71b8b6dc304f4f"
  },
  {
    "url": "assets/js/7.cb9f9e5a.js",
    "revision": "f3e422927cd891da165746f6c8760e37"
  },
  {
    "url": "assets/js/8.d14cd340.js",
    "revision": "9f213abea60465aa7773acf558ab63a9"
  },
  {
    "url": "assets/js/9.64464cb9.js",
    "revision": "4132ed6092cbbd8781bf889cb0507cbd"
  },
  {
    "url": "assets/js/app.c2dde1f4.js",
    "revision": "fbbd551a81fc83fac9e65ef7ed52fb6b"
  },
  {
    "url": "gitalk.css",
    "revision": "a28283be10544d427b9f1e9e2d47a45a"
  },
  {
    "url": "images/2020-02-27-15-05-13.png",
    "revision": "f7d47e612ca4bfd343e2e9f1f33e11d6"
  },
  {
    "url": "images/2020-02-27-15-07-12.png",
    "revision": "967767c9a32e5dfd05f69bfe4f2ede79"
  },
  {
    "url": "images/2020-02-27-15-08-09.png",
    "revision": "cdc05c5f96073569b976448c0a392a61"
  },
  {
    "url": "images/2020-02-27-15-09-15.png",
    "revision": "11cd9cc622edd0f6cbe55bd78d0e2c3c"
  },
  {
    "url": "images/2020-02-27-15-10-33.png",
    "revision": "cfc23be391bc865f2261d168b960d0d9"
  },
  {
    "url": "images/2020-02-27-15-12-11.png",
    "revision": "39720c3c75b257246ed1c99b389502a5"
  },
  {
    "url": "images/2020-02-27-15-12-30.png",
    "revision": "90538249c1bca0526343e1aad7a4363d"
  },
  {
    "url": "images/2020-02-28-16-40-17.png",
    "revision": "fd4ed8ab19db4e53225f338445733bfd"
  },
  {
    "url": "images/2020-02-29-08-46-24.png",
    "revision": "c5d55a2f9ec21e755914abe601005386"
  },
  {
    "url": "images/2020-03-01-15-10-05.png",
    "revision": "f0b2da3ed36ad0c83eb6aa896eae3d14"
  },
  {
    "url": "images/2020-03-01-15-10-29.png",
    "revision": "f95ced3555cfb12ee3b660fb07abd05d"
  },
  {
    "url": "images/2020-03-01-15-10-43.png",
    "revision": "90d9d2249bf975facac38271eb9f2592"
  },
  {
    "url": "images/2020-03-01-15-10-57.png",
    "revision": "aae2d41d803b16caf25ff647f7374071"
  },
  {
    "url": "images/2020-03-01-15-11-28.png",
    "revision": "3bd5a1668b1e5ddc1a8c3abd2aad29d6"
  },
  {
    "url": "images/2020-03-01-15-20-37.png",
    "revision": "5791fae8fc9e8af656dfad95031756ea"
  },
  {
    "url": "images/2020-03-01-15-20-57.png",
    "revision": "b2811910729ba7b0aca83b9d7c4434a5"
  },
  {
    "url": "images/2020-03-01-15-30-19.png",
    "revision": "dc9d1e751ce9138b98f068e327b70b95"
  },
  {
    "url": "images/2020-03-01-15-30-38.png",
    "revision": "9f58ed9401619550619788f54812be2c"
  },
  {
    "url": "images/2020-03-01-15-30-55.png",
    "revision": "6b2257e804d8125a2f6d22ae378b8f42"
  },
  {
    "url": "images/2020-03-01-15-45-01.png",
    "revision": "2dd42ad0647131bf9faeb3ce6f8db645"
  },
  {
    "url": "images/2020-03-01-15-45-17.png",
    "revision": "9626286d004ef582c665e62d7250bb15"
  },
  {
    "url": "images/2020-03-01-15-45-28.png",
    "revision": "1dcec16ccc6bcb6c60fe005236c953db"
  },
  {
    "url": "images/2020-03-01-15-45-44.png",
    "revision": "83c5e62d7eb744f81a87ff83e8d382d8"
  },
  {
    "url": "images/2020-03-01-15-45-56.png",
    "revision": "cb6df2209d46bb6704ffa898e69ec72b"
  },
  {
    "url": "images/2020-03-01-15-46-10.png",
    "revision": "38ecf0bedc8c2d77d85c71dcf6ba862f"
  },
  {
    "url": "images/2020-03-01-15-46-29.png",
    "revision": "a8934b78242d99d0edea7a6d1fcdd9c0"
  },
  {
    "url": "images/2020-03-01-15-48-11.png",
    "revision": "e61974629493cb1bacf417703b9244e8"
  },
  {
    "url": "images/2020-03-01-15-48-31.png",
    "revision": "0e51ae64964b6352ab2ae7b561832676"
  },
  {
    "url": "images/2020-03-01-15-49-08.png",
    "revision": "afec7f1cacafd7d73895cc9b83ffc636"
  },
  {
    "url": "images/2020-03-01-15-49-27.png",
    "revision": "4144bea40bd5dd4ca68a255da81b3288"
  },
  {
    "url": "images/2020-03-01-15-49-46.png",
    "revision": "87f0f4ab67773dedbf1dc4f49cf327e6"
  },
  {
    "url": "images/2020-03-01-15-50-32.png",
    "revision": "1c70238cd497b42ef579225095348937"
  },
  {
    "url": "images/2020-03-01-15-50-43.png",
    "revision": "9b2e6cc9a24204a1cb1b990d8875bc6f"
  },
  {
    "url": "images/2020-03-04-08-54-58.gif",
    "revision": "f1c2f31430b1cf0cf8283407286c34cd"
  },
  {
    "url": "images/2020-03-04-08-54-58.png",
    "revision": "fd3333531bf0109278f836b51de236fe"
  },
  {
    "url": "images/2020-04-09-08-46-34.png",
    "revision": "63e5344b8cd492ea89451fe7f9279e0f"
  },
  {
    "url": "images/2020-04-09-16-55-24.png",
    "revision": "4db9a027040ba098f7bc757764d2ef35"
  },
  {
    "url": "images/2020-04-09-18-40-10.png",
    "revision": "cd112eb1a6673a8095690a5d9460fd28"
  },
  {
    "url": "images/2020-04-09-18-49-39.png",
    "revision": "6efef2e8fc9e250b5cec64ac81cc2888"
  },
  {
    "url": "images/2020-04-09-18-52-12.png",
    "revision": "0dac19bf2ed3d7d5ab102077b39578f7"
  },
  {
    "url": "images/2020-04-09-19-01-05.png",
    "revision": "fd578a5d164304a35c4e5d3f55d4455c"
  },
  {
    "url": "images/2020-04-09-19-04-25.png",
    "revision": "8683af64085402af09a750b809cdd4fb"
  },
  {
    "url": "images/2020-04-09-19-11-34.png",
    "revision": "71bcdb6702ac0c5e12d762559cedef4f"
  },
  {
    "url": "images/2020-04-11-08-55-07.png",
    "revision": "69091e271d81dd3535b703474c974432"
  },
  {
    "url": "images/2020-04-16-16-16-16.png",
    "revision": "7c029514fe8388d97a6d52fe26dabbb0"
  },
  {
    "url": "images/2020-09-15-16-53-34.png",
    "revision": "ae1a7900fe1be516ee6070634ffeaa48"
  },
  {
    "url": "images/2020-09-16-16-26-06.png",
    "revision": "5d6492039161c0d05cf87dd4eeba13b5"
  },
  {
    "url": "images/2020-09-17-09-15-19.png",
    "revision": "e1d826c879226450bcfe7b5880aaff31"
  },
  {
    "url": "images/2020-09-18-10-30-16.png",
    "revision": "32e7008b678391945e7a7da8e5770cd7"
  },
  {
    "url": "images/2020-09-22-10-16-51.png",
    "revision": "59c31421f1ccf6c7d0e24c93b25a15b8"
  },
  {
    "url": "images/2020-09-22-10-23-02.png",
    "revision": "7652811ec33cfe366e7551adfd557cab"
  },
  {
    "url": "images/2020-09-22-10-58-19.png",
    "revision": "11aa029eebbcf37d47e490fe3d4215e1"
  },
  {
    "url": "images/2020-09-22-11-34-20.png",
    "revision": "59c8d5e823818d4fbc1e9390245362a0"
  },
  {
    "url": "images/2020-09-22-13-52-33.png",
    "revision": "a9e01edaac005631c685c694e667e827"
  },
  {
    "url": "images/2020-09-22-14-30-02.png",
    "revision": "a1aab5d1c7e18d83114ef0c530696775"
  },
  {
    "url": "images/2020-09-23-23-22-27.png",
    "revision": "b28200bb50c632e51e4fd5148121b376"
  },
  {
    "url": "images/2020-09-23-23-24-23.png",
    "revision": "0c89a3a0f6e5ea7f3cf59c4849e776fd"
  },
  {
    "url": "images/2020-09-23-23-25-07.png",
    "revision": "029260c4168e69fc7e11e0d5b9268702"
  },
  {
    "url": "images/2020-09-26-18-17-22.png",
    "revision": "506d0d4aff8eaf4a34373b1e157bc07c"
  },
  {
    "url": "images/2020-09-26-18-57-05.png",
    "revision": "f63ed41212a963382e2d9c7964bdf2eb"
  },
  {
    "url": "images/2020-09-26-18-59-33.png",
    "revision": "7b089538abe3a1d5bfe1a5de30e315c2"
  },
  {
    "url": "images/2020-09-26-19-03-29.png",
    "revision": "e1bc30257c2eecef200cd228182e1568"
  },
  {
    "url": "images/2020-09-26-21-54-04.png",
    "revision": "3d70acbbb88e67edf3bf3b0d8d299fb0"
  },
  {
    "url": "images/2020-09-26-21-56-47.png",
    "revision": "ddcc4b466597368e5bc7c91879d5b1c1"
  },
  {
    "url": "images/2020-09-27-13-28-37.png",
    "revision": "13395e4892b3a2c3a39cfbb2eb50cb11"
  },
  {
    "url": "images/2020-09-28-08-55-56.png",
    "revision": "2dcb5eb5ae26050b73f828646a696298"
  },
  {
    "url": "images/2020-09-28-13-52-54.png",
    "revision": "c643cf18c1b121644157cd1b278e926e"
  },
  {
    "url": "images/2020-09-28-16-25-46.png",
    "revision": "ccaaf4606155691651f0a77907e0449a"
  },
  {
    "url": "images/2020-10-05-20-09-22.png",
    "revision": "3b0132577f78866a8342de17a5a176c9"
  },
  {
    "url": "images/2020-10-05-20-47-23.png",
    "revision": "70e584617005fa6f303643d466d86a88"
  },
  {
    "url": "images/2020-10-09-09-15-28.png",
    "revision": "dccfe912225508faa517a0b45ddf41fc"
  },
  {
    "url": "images/2020-10-09-09-25-48.png",
    "revision": "c4d8f82b28b22ab684310c9ce04c2474"
  },
  {
    "url": "index.html",
    "revision": "eca97355d6ee8fd557d184a337fec262"
  },
  {
    "url": "Java/练习.html",
    "revision": "6226ab39792c03445042ecc8995572f1"
  },
  {
    "url": "Java/AnnotationReflection.html",
    "revision": "1b0267d6af61e13507c069ebf4724b38"
  },
  {
    "url": "Java/DesignPattern.html",
    "revision": "2d1d2662bb5b2a078089ed00a08dc2c8"
  },
  {
    "url": "Java/DevOpsThinking.html",
    "revision": "9c82dfd824095c81fb22a9de0467e904"
  },
  {
    "url": "Java/DockerBase.html",
    "revision": "78a7f45779fb69a1a7b5f5f9c9346e14"
  },
  {
    "url": "Java/Java.html",
    "revision": "aef8b30729680083a90654b6786ea4b1"
  },
  {
    "url": "Java/JDBC.html",
    "revision": "dafbe9b50bd1be77a74c630f3dc76f69"
  },
  {
    "url": "Java/Multithread.html",
    "revision": "6606bcb82ccfaf066dda35bda6b114c3"
  },
  {
    "url": "Java/Mybatis.html",
    "revision": "7152a9779f4d7fb60f8b5cc47ffd6857"
  },
  {
    "url": "Java/Spring.html",
    "revision": "b08dbb819c11ad6cab8c07a499ae8b51"
  },
  {
    "url": "logo.png",
    "revision": "32c43eb791d414791ab825de440ff4e8"
  },
  {
    "url": "Meme/Meme.html",
    "revision": "bd2d073ee37d41f78ca87e341ae96fa3"
  },
  {
    "url": "ML/TensorflowEnvironment.html",
    "revision": "65797e02b32748e1637f099c2ffdef36"
  },
  {
    "url": "ML/TensorflowError.html",
    "revision": "f816f4b739141e33f0496b09fce58b38"
  },
  {
    "url": "Note/Cmd.html",
    "revision": "9bf1757ea55decdfbc9bccc5bc2a65db"
  },
  {
    "url": "Note/DBOM.html",
    "revision": "091a66fc5113eba3ed4abcc786f043a8"
  },
  {
    "url": "Note/IndexDS.html",
    "revision": "fa8ea59cc468fb5aa47ab037a630ab04"
  },
  {
    "url": "Note/Markdown.html",
    "revision": "e1ef7733bf2f4e02ed72cf2d0a4c31d2"
  },
  {
    "url": "Note/MySQL.html",
    "revision": "45a861632bb3dcb3a04d2471af4504dd"
  },
  {
    "url": "Note/Swagger.html",
    "revision": "45eebb415ca9305d54a5860a20e6c226"
  },
  {
    "url": "Phil/ENFP.html",
    "revision": "6d107351524909ba512df24b0768a9f6"
  },
  {
    "url": "Phil/Internet.html",
    "revision": "93ec3d0a04a38799a0072f7ea875cc8c"
  },
  {
    "url": "Phil/WCHNS.html",
    "revision": "c215e914544f559acbe91ff27a32f487"
  },
  {
    "url": "Python/ZenOfPython.html",
    "revision": "9133621b63ab1d035030dcaa710399e8"
  },
  {
    "url": "rick - Copy.png",
    "revision": "48e95bc49c528b81490695c9c81ad9e6"
  },
  {
    "url": "rick.gif",
    "revision": "c41b4ea5b2919a8c92d16e66021c1532"
  },
  {
    "url": "rick.jpg",
    "revision": "69fcdad3c20b6a8ab61f8038f34b410f"
  },
  {
    "url": "rick.png",
    "revision": "48e95bc49c528b81490695c9c81ad9e6"
  },
  {
    "url": "rickSource.png",
    "revision": "6d311fa4c150b1a2af07397365ed6178"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
