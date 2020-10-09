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
    "revision": "0d8ded6f4deb0f6eda594fe4aa3b2577"
  },
  {
    "url": "ALGO/KMP.html",
    "revision": "225e0868036670fafae4c8e340da7032"
  },
  {
    "url": "assets/css/0.styles.57d6b9c4.css",
    "revision": "af6ba63bf5288fa81d85763a3582b0d9"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.7ea8f3da.js",
    "revision": "ab5c40d1e324adc1903fe1956771e667"
  },
  {
    "url": "assets/js/11.5a5ac60a.js",
    "revision": "27fe99dfc9a5bd2c1f1b081473d3f140"
  },
  {
    "url": "assets/js/12.6a3ad8e3.js",
    "revision": "2062dd2e32d6e3186e3998cd65ff1868"
  },
  {
    "url": "assets/js/13.26fe3f25.js",
    "revision": "b8b821f44a1058151e06af6276f93c68"
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
    "url": "assets/js/16.d2212666.js",
    "revision": "eceaf79157eb754a3b34f949ebcda33b"
  },
  {
    "url": "assets/js/17.067e29cf.js",
    "revision": "1f85d5fd46d29f81921a23170acdbf6e"
  },
  {
    "url": "assets/js/18.dfcd32e3.js",
    "revision": "2513094ae44e0eff00476179c990a25a"
  },
  {
    "url": "assets/js/19.eb8d457f.js",
    "revision": "8295aad93e4278d8238032f772ba14cd"
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
    "url": "assets/js/21.114461b7.js",
    "revision": "0e098c983f775ef8f8a049631fbdd7d4"
  },
  {
    "url": "assets/js/22.d82b3b5b.js",
    "revision": "343041902453fd0b982316a134a976fd"
  },
  {
    "url": "assets/js/23.61944905.js",
    "revision": "11162aabc7b258e7b899b343253e7208"
  },
  {
    "url": "assets/js/24.8c58bbf1.js",
    "revision": "da9b41cec8f597b9de824f2f90fbd020"
  },
  {
    "url": "assets/js/25.b34488d6.js",
    "revision": "8e9349f13ac9cf74433f09c8297f829d"
  },
  {
    "url": "assets/js/26.c3a3f2dd.js",
    "revision": "2b814223c19adffd62c49e19a11b2841"
  },
  {
    "url": "assets/js/27.d5eaced2.js",
    "revision": "ae449703e77655cb11a8ed73aa174517"
  },
  {
    "url": "assets/js/28.4f7ad356.js",
    "revision": "3209f5a3328340dbe78b7df18df7a4b4"
  },
  {
    "url": "assets/js/29.623b2736.js",
    "revision": "313f8dd0c16f4312d42a61c66fe08383"
  },
  {
    "url": "assets/js/3.434642e4.js",
    "revision": "4c7979143d0ead74e2d8d0e7ad002593"
  },
  {
    "url": "assets/js/30.1b58a650.js",
    "revision": "cbc2b2a50ae6b329983881c8fcb96e26"
  },
  {
    "url": "assets/js/31.cd6c1ee2.js",
    "revision": "b5ee2b4e1b546dfb7d99d789199b641b"
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
    "url": "assets/js/5.8d3040f2.js",
    "revision": "ecacf4ab787bdbe5caf2d8b200388627"
  },
  {
    "url": "assets/js/6.2c936906.js",
    "revision": "8370f76bfc83862e50f930ae35cc3649"
  },
  {
    "url": "assets/js/7.cb9f9e5a.js",
    "revision": "f3e422927cd891da165746f6c8760e37"
  },
  {
    "url": "assets/js/8.dc95efe8.js",
    "revision": "1c03460ce86d4e91bc160f6f7efc5f9a"
  },
  {
    "url": "assets/js/9.d26b4754.js",
    "revision": "f1ce3926e616112060372b279aa88a04"
  },
  {
    "url": "assets/js/app.3672b54b.js",
    "revision": "4e0e6e1cececfaaa3208206910747b72"
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
    "revision": "1f0a6c6cf140e406cc0b1321696141af"
  },
  {
    "url": "Java/练习.html",
    "revision": "e3fe7156f33691f0302ee274cfb09fbb"
  },
  {
    "url": "Java/AnnotationReflection.html",
    "revision": "54adced723f39b5ee41601e7778f5326"
  },
  {
    "url": "Java/DesignPattern.html",
    "revision": "09c287746f8969bff5e86a430bf5a4a0"
  },
  {
    "url": "Java/DevOpsThinking.html",
    "revision": "4bdeed95daada66168d26ae6aa3d9290"
  },
  {
    "url": "Java/DockerBase.html",
    "revision": "95789b3ea432dcad245df588692b5778"
  },
  {
    "url": "Java/Java.html",
    "revision": "a67580a57b6ef5bb7d09c26dc0eab2ec"
  },
  {
    "url": "Java/JDBC.html",
    "revision": "c59ba0fea48c384e43dee72856cd97aa"
  },
  {
    "url": "Java/Multithread.html",
    "revision": "c8f3eff76b0d427db8f04f241b85ec95"
  },
  {
    "url": "Java/Mybatis.html",
    "revision": "9fc423aed0ed5514564b2243ae7ba27f"
  },
  {
    "url": "Java/Spring.html",
    "revision": "a0b419750287d8d99f059c7359b51cc7"
  },
  {
    "url": "logo.png",
    "revision": "32c43eb791d414791ab825de440ff4e8"
  },
  {
    "url": "Meme/Meme.html",
    "revision": "fb5da70953bec1acc7286103080a7b3d"
  },
  {
    "url": "ML/TensorflowEnvironment.html",
    "revision": "e44f0071c0c40ba31d89eb212d5edcff"
  },
  {
    "url": "ML/TensorflowError.html",
    "revision": "3d06ffb34f07f0e2b38cad7114258d9a"
  },
  {
    "url": "Note/Cmd.html",
    "revision": "79286107e44e1bc78493900cd441d48b"
  },
  {
    "url": "Note/DBOM.html",
    "revision": "67186f77fe09c4ab3d7fe4ad11332b4a"
  },
  {
    "url": "Note/IndexDS.html",
    "revision": "e6a7200f94c0272443e6b688ed0c7d2c"
  },
  {
    "url": "Note/Markdown.html",
    "revision": "fed04ef061c2e81fbd499e44b4b04a90"
  },
  {
    "url": "Note/MySQL.html",
    "revision": "6aad8a5066eecbbce2ae2271ffa31358"
  },
  {
    "url": "Note/Swagger.html",
    "revision": "90a86141008cbed25f90c82b7967c651"
  },
  {
    "url": "Phil/ENFP.html",
    "revision": "2353d85380a123de51b9e42841f02d2c"
  },
  {
    "url": "Phil/Internet.html",
    "revision": "8846e95f4d8dd4abbed4b04f79a86f37"
  },
  {
    "url": "Phil/WCHNS.html",
    "revision": "1183d28a3d818726a709f08d2247157a"
  },
  {
    "url": "Python/ZenOfPython.html",
    "revision": "6c462c35a1d29dfc882a47a082ad11e2"
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
