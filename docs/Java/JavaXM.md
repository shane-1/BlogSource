---
sidebar: false
---
<script setup>
const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent)
function openPDF() {
  window.open('/pdf/JavaXM.pdf', '_blank')
}
</script>

<div v-if="!isMobile" style="margin:0;padding:0;width:100%;height:calc(100vh - 60px);">
  <iframe
    src="/pdf/JavaXM.pdf"
    style="display:block;position:relative;left:50%;right:50%;width:100vw;max-width:100vw;height:calc(100vh - 60px);margin-left:-50vw;margin-right:-50vw;border:none;"
  ></iframe>
</div>
<div v-else style="text-align:center;padding:2em;">
<a> 暂时不支持移动端浏览，请点击下面在新窗口中打开或下载 PDF</a>
<br>
<br>
  <button 
    @click="openPDF"
    style="font-size:1.1em;padding:0.6em 2em;background:#3eaf7c;color:#fff;border:none;border-radius:4px;cursor:pointer;" >
    点击这里
  </button>
</div>