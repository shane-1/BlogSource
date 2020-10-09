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
    "revision": "8299208bc98e0274418cb930600cb607"
  },
  {
    "url": "ALGO/KMP.html",
    "revision": "da9de3fb0d3ff0b1e37abfd97a273431"
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
    "url": "assets/js/13.f0b4a407.js",
    "revision": "a49617db0a096986a34754f458e25fb4"
  },
  {
    "url": "assets/js/14.7922b303.js",
    "revision": "fbd9441821b5601c0a2b5fa069aa9176"
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
    "url": "assets/js/17.757f3e0a.js",
    "revision": "f71efa9e32903ad9bda64e10b81ac0a4"
  },
  {
    "url": "assets/js/18.b15b6226.js",
    "revision": "248d272ce8ead6d4de0445c6da15fb96"
  },
  {
    "url": "assets/js/19.0d9b30d4.js",
    "revision": "3d77c1cf61762fb19549909cc68fece0"
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
    "url": "assets/js/21.224a54c7.js",
    "revision": "2decdca129e69ee7231e6948dfe459dd"
  },
  {
    "url": "assets/js/22.e0bd1220.js",
    "revision": "71d95b824f25edaef1c79bcf7c6b0187"
  },
  {
    "url": "assets/js/23.8fa7fcef.js",
    "revision": "b985417d304828a581fd79fa4462f44c"
  },
  {
    "url": "assets/js/24.3117b6ea.js",
    "revision": "12f55743f697dfe8fd2065aabd71d42b"
  },
  {
    "url": "assets/js/25.9437f3c6.js",
    "revision": "e2a1f8ce66d22e80a1c91fa103a57140"
  },
  {
    "url": "assets/js/26.c3a3f2dd.js",
    "revision": "2b814223c19adffd62c49e19a11b2841"
  },
  {
    "url": "assets/js/27.01e2da81.js",
    "revision": "20281061c2952cc5da1bce5627ccb0c3"
  },
  {
    "url": "assets/js/28.a035f586.js",
    "revision": "0ba60dc5ada040182af3b8dd07ededc4"
  },
  {
    "url": "assets/js/29.73337e4d.js",
    "revision": "91ae3f0ae7ced930ae78f8b9a74bf31d"
  },
  {
    "url": "assets/js/3.434642e4.js",
    "revision": "4c7979143d0ead74e2d8d0e7ad002593"
  },
  {
    "url": "assets/js/30.0ffa30d5.js",
    "revision": "5e66fd5219df04f2538bbca38202b75f"
  },
  {
    "url": "assets/js/31.f3815b2f.js",
    "revision": "514382b52c7b4b1303cf9496a76cda91"
  },
  {
    "url": "assets/js/32.a4cc4274.js",
    "revision": "ef275aaae0dfe4237d747344aef2a611"
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
    "url": "assets/js/app.cfce3714.js",
    "revision": "1b9edca9a13e1230010277b82f6e6baf"
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
    "revision": "9bd4813cfecb0ce916e1e77dfefacee3"
  },
  {
    "url": "Java/练习.html",
    "revision": "8536726053efa774b8f61af8d240b099"
  },
  {
    "url": "Java/AnnotationReflection.html",
    "revision": "8a807ac1be1956fd1b84daa1720583be"
  },
  {
    "url": "Java/DesignPattern.html",
    "revision": "fd383ffcbd0a448ddc1c67c082db076d"
  },
  {
    "url": "Java/DevOpsThinking.html",
    "revision": "eaba75836f124d559541333367f567a2"
  },
  {
    "url": "Java/DockerBase.html",
    "revision": "d281d6c06eba1dffeacafea159948547"
  },
  {
    "url": "Java/Java.html",
    "revision": "db49e18f4d773f6064dcd5c49832e4bf"
  },
  {
    "url": "Java/JDBC.html",
    "revision": "83ff44fca0fc1314fd32893fdf5869b9"
  },
  {
    "url": "Java/Multithread.html",
    "revision": "4cb1f1179ff08d8a6e461d1a47d5ba05"
  },
  {
    "url": "Java/Mybatis.html",
    "revision": "8935d8c76c1181fd9a6f89c78b954a9f"
  },
  {
    "url": "Java/Spring.html",
    "revision": "cebf4d481a655be9b2638fd05eaa377f"
  },
  {
    "url": "logo.png",
    "revision": "32c43eb791d414791ab825de440ff4e8"
  },
  {
    "url": "Meme/Meme.html",
    "revision": "0dd2d28d0caef47000ba17626210805b"
  },
  {
    "url": "ML/TensorflowEnvironment.html",
    "revision": "98556ab8bb304a4d4239ab088f97d8ee"
  },
  {
    "url": "ML/TensorflowError.html",
    "revision": "3726da9cbdebc885644853b2ae5a71aa"
  },
  {
    "url": "Note/Cmd.html",
    "revision": "16901804c2b800dc6efc1b5f2e65bbee"
  },
  {
    "url": "Note/DBOM.html",
    "revision": "508db66bc4438d00c405b92c7f3c0780"
  },
  {
    "url": "Note/IndexDS.html",
    "revision": "d6c35428c46589ee3f71307d41b16c7a"
  },
  {
    "url": "Note/Markdown.html",
    "revision": "d85bad802ced6775e7dd6c0e9e9c277c"
  },
  {
    "url": "Note/MySQL.html",
    "revision": "b562f7813ea168e0500dce56789b3c76"
  },
  {
    "url": "Note/Swagger.html",
    "revision": "6047424a9c4d901345c91528a2851afc"
  },
  {
    "url": "Phil/ENFP.html",
    "revision": "06a2d51c2479259356514deddee999fd"
  },
  {
    "url": "Phil/Internet.html",
    "revision": "be344ca99bb2755e33f18b524c576ab2"
  },
  {
    "url": "Phil/WCHNS.html",
    "revision": "8f659214553076b28b294c4239b05b69"
  },
  {
    "url": "Python/ZenOfPython.html",
    "revision": "166ad921f6c1152b70dc9d62381bdb63"
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
