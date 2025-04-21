---
sidebar: false
---
<script setup>
import { ClientOnly } from '@vuepress/client'
const pdfPath = '/pdf/MySQLXM.pdf'

const openPDF = () => {
  window.open(pdfPath, '_blank')
}
</script>

<ClientOnly>
<div style="position:relative;width:100%;height:calc(100vh - 60px);">
    <iframe
      :src="pdfPath"
      style="display:block;position:relative;left:50%;right:50%;width:100vw;max-width:100vw;height:calc(100vh - 60px);margin-left:-50vw;margin-right:-50vw;border:none;"
    ></iframe>
  </div>
  <div style="margin-bottom:20px;text-align:center;padding:1em;">
    <div style="margin-bottom:10px;">如果显示异常或需要下载请点击下方按钮</div>
    <button 
      @click="openPDF"
      style="font-size:1.1em;padding:0.6em 2em;background:#3eaf7c;color:#fff;border:none;border-radius:4px;cursor:pointer;">
      点击这里
    </button>
  </div>
  
</ClientOnly>
