---
sidebar: false
---
<script setup>
import { ref, onMounted } from 'vue'
import { ClientOnly } from '@vuepress/client'

const isMobile = ref(false)
const isWeChat = ref(false)
const pdfPath = '/pdf/JavaXM.pdf'

const checkPlatform = () => {
  const ua = navigator.userAgent.toLowerCase()
  isMobile.value = /mobile|android|iphone|ipad|phone/i.test(ua)
  isWeChat.value = /micromessenger/i.test(ua)
}

const openPDF = () => {
  if (isWeChat.value) {
    // 微信内打开提示在浏览器打开
    alert('请点击右上角按钮，选择"在浏览器打开"，获得最佳浏览体验')
    return
  }
  try {
    const newWindow = window.open(pdfPath, '_blank')
    if (!newWindow) {
      alert('请允许浏览器打开新窗口以查看 PDF')
    }
  } catch (e) {
    window.location.href = pdfPath
  }
}

onMounted(() => {
  checkPlatform()
})
</script>

<ClientOnly>
  <div v-if="!isMobile.value && !isWeChat.value" style="margin:0;padding:0;width:100%;height:calc(100vh - 60px);">
    <iframe
      :src="pdfPath"
      style="display:block;position:relative;left:50%;right:50%;width:100vw;max-width:100vw;height:calc(100vh - 60px);margin-left:-50vw;margin-right:-50vw;border:none;"
    ></iframe>
  </div>
  <div v-else style="text-align:center;padding:2em;">
    <template v-if="isWeChat.value">
      <a>在微信内无法直接浏览，请点击右上角按钮，选择"在浏览器打开"</a>
    </template>
    <template v-else>
      <a>暂时不支持移动端直接浏览，请点击下方按钮在新窗口中打开或下载 PDF</a>
    </template>
    <br><br>
    <button 
      @click="openPDF"
      style="font-size:1.1em;padding:0.6em 2em;background:#3eaf7c;color:#fff;border:none;border-radius:4px;cursor:pointer;">
      点击这里
    </button>
  </div>
</ClientOnly>