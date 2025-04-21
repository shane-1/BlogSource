---
sidebar: false
---
<script setup>
import { ref, onMounted } from 'vue'
import { ClientOnly } from '@vuepress/client'

const isMobile = ref(false)
const pdfPath = '/pdf/JavaXM.pdf'

const openPDF = () => {
  window.open(pdfPath, '_blank')
}

onMounted(() => {
  isMobile.value = /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent)
})
</script>

<ClientOnly>
  <div v-if="!isMobile.value" style="margin:0;padding:0;width:100%;height:calc(100vh - 60px);">
    <iframe
      :src="pdfPath"
      style="display:block;position:relative;left:50%;right:50%;width:100vw;max-width:100vw;height:calc(100vh - 60px);margin-left:-50vw;margin-right:-50vw;border:none;"
    ></iframe>
  </div>
  <div v-else style="text-align:center;padding:2em;">
    <a> 暂时不支持移动端浏览，请点击下面在新窗口中打开或下载 PDF</a>
    <br>
    <br>
    <button 
      @click="openPDF"
      style="font-size:1.1em;padding:0.6em 2em;background:#3eaf7c;color:#fff;border:none;border-radius:4px;cursor:pointer;">
      点击这里
    </button>
  </div>
</ClientOnly>