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
    "revision": "85416c40e835837eb7f61ff568e9a83f"
  },
  {
    "url": "ALGO/KMP.html",
    "revision": "9980cf5ec556c561072a095cc88deee8"
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
    "url": "assets/js/10.d79f0c76.js",
    "revision": "b97921d750c91786838723719b95e1a3"
  },
  {
    "url": "assets/js/11.5a5ac60a.js",
    "revision": "27fe99dfc9a5bd2c1f1b081473d3f140"
  },
  {
    "url": "assets/js/12.5583eb01.js",
    "revision": "b48ab2e6abd818f7f1f120bd7c605e84"
  },
  {
    "url": "assets/js/13.e5528911.js",
    "revision": "af3ae7932ded6f2d0ec56c63c677a673"
  },
  {
    "url": "assets/js/14.5dfd2a1a.js",
    "revision": "defb57106cfb008ff72d6da82e73eb61"
  },
  {
    "url": "assets/js/15.475a1290.js",
    "revision": "f870f7a7adf25cf54a30bf764fe92571"
  },
  {
    "url": "assets/js/16.1a5edb8d.js",
    "revision": "ef3ca7d332a60c6e7f4669cb900548c6"
  },
  {
    "url": "assets/js/17.29e8ee86.js",
    "revision": "17825950a1b8bb24c089c82c275c0ced"
  },
  {
    "url": "assets/js/18.c48ecc8a.js",
    "revision": "5c322a10cc04dc9a326b7e415b805e5f"
  },
  {
    "url": "assets/js/19.d33e1e4f.js",
    "revision": "af651958c77169a313552ff2e16d18a1"
  },
  {
    "url": "assets/js/2.f8658114.js",
    "revision": "79745531bc7f7377cd130048d3530c18"
  },
  {
    "url": "assets/js/20.8e18a2cf.js",
    "revision": "e59b5ab0a2b9ba25cbe65c7a75817b8e"
  },
  {
    "url": "assets/js/21.444f9c63.js",
    "revision": "7788bbdbb0c5fa5c08ce5491ab67d02c"
  },
  {
    "url": "assets/js/22.8b7ac8b3.js",
    "revision": "42b2f603ffa5c4933abd1db9f729de1f"
  },
  {
    "url": "assets/js/23.8ece2b6f.js",
    "revision": "1f1314449d94b103a2bc9b2aa0838e74"
  },
  {
    "url": "assets/js/24.8c58bbf1.js",
    "revision": "da9b41cec8f597b9de824f2f90fbd020"
  },
  {
    "url": "assets/js/25.694446e9.js",
    "revision": "8e17d7e0f9adf404e64b468b31da6bb8"
  },
  {
    "url": "assets/js/26.936c40e2.js",
    "revision": "59aa43ff853207566fd70f161acb20d6"
  },
  {
    "url": "assets/js/27.cea46cbc.js",
    "revision": "2742a4677df0d5a2c4589f8da534f319"
  },
  {
    "url": "assets/js/28.cf78f65c.js",
    "revision": "af704bd51ca944a9e0ddd15846d437f1"
  },
  {
    "url": "assets/js/29.7b99f0fc.js",
    "revision": "76fa3ed7f6cad31d469d94be7f235730"
  },
  {
    "url": "assets/js/3.434642e4.js",
    "revision": "4c7979143d0ead74e2d8d0e7ad002593"
  },
  {
    "url": "assets/js/30.2aa39617.js",
    "revision": "cda7aceba06643dbe144befedeaa8c84"
  },
  {
    "url": "assets/js/31.f3815b2f.js",
    "revision": "514382b52c7b4b1303cf9496a76cda91"
  },
  {
    "url": "assets/js/32.30ea4cde.js",
    "revision": "f234c636fd67ec39c56466d75319c3ce"
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
    "url": "assets/js/9.e306ac2b.js",
    "revision": "681f1c56e69d67e8271a872a15105a0d"
  },
  {
    "url": "assets/js/app.94eb4997.js",
    "revision": "331b01047fbeeeb4b2274487ce4b61aa"
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
    "revision": "b15420f9e14b04731b6f52a36b420b75"
  },
  {
    "url": "Java/练习.html",
    "revision": "b97f097a3dd2d5ad45d09082e99d6d1d"
  },
  {
    "url": "Java/AnnotationReflection.html",
    "revision": "59eb6f9de0040de807c78d02c6a6d636"
  },
  {
    "url": "Java/DesignPattern.html",
    "revision": "ae5b3f96669d5bf91c14434dabc6a271"
  },
  {
    "url": "Java/DevOpsThinking.html",
    "revision": "1b858ad4d59f824eb335caebf9c732df"
  },
  {
    "url": "Java/DockerBase.html",
    "revision": "89aed752cbf3fd5a2b98a2f8a23a2551"
  },
  {
    "url": "Java/Java.html",
    "revision": "48cd41c26a5b9d51477f4159a5703702"
  },
  {
    "url": "Java/JDBC.html",
    "revision": "73ca72665e6b975c99e22672f6d24b94"
  },
  {
    "url": "Java/Multithread.html",
    "revision": "d296b7ce817da2354d4797a1b5a0a53c"
  },
  {
    "url": "Java/Mybatis.html",
    "revision": "a484e318dc0cc0c626b95328f2020b3a"
  },
  {
    "url": "Java/Spring.html",
    "revision": "fee24b8f6ecd2079364604b37b42420a"
  },
  {
    "url": "logo.png",
    "revision": "32c43eb791d414791ab825de440ff4e8"
  },
  {
    "url": "Meme/Meme.html",
    "revision": "cb132bce295b22466cdc4285964b7624"
  },
  {
    "url": "ML/TensorflowEnvironment.html",
    "revision": "48ebf39a19f8ab46828fea0dbc3f1bd0"
  },
  {
    "url": "ML/TensorflowError.html",
    "revision": "b5b0467bfd6be6b0264143e43ed01d66"
  },
  {
    "url": "Note/Cmd.html",
    "revision": "eebd821a2b7e851e3e186006c9fcb22d"
  },
  {
    "url": "Note/DBOM.html",
    "revision": "689097d64a5dd6d084ee81f97bd9e285"
  },
  {
    "url": "Note/IndexDS.html",
    "revision": "417f6b7a240d068f25d07e72c31cd211"
  },
  {
    "url": "Note/Markdown.html",
    "revision": "0fb7f053da6dcf464e69dfc099f55e05"
  },
  {
    "url": "Note/MySQL.html",
    "revision": "3e41a76a025a1c1820d37f6718d68d86"
  },
  {
    "url": "Note/Swagger.html",
    "revision": "5204df8b03b2699ea90f0d4b3b3f6d14"
  },
  {
    "url": "Phil/ENFP.html",
    "revision": "38387a51877d02d2ef66e21c73a1cae9"
  },
  {
    "url": "Phil/Internet.html",
    "revision": "074c091091889de914c6201d9d8853ae"
  },
  {
    "url": "Phil/WCHNS.html",
    "revision": "83b808952125d4c83f11805b5fa28378"
  },
  {
    "url": "Python/ZenOfPython.html",
    "revision": "60c4daf4648e0686245288ebd1b9af0d"
  },
  {
    "url": "rick.gif",
    "revision": "c41b4ea5b2919a8c92d16e66021c1532"
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
