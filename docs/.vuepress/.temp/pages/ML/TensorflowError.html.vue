<template><div><h1 id="tensorflow常见报错解决" tabindex="-1"><a class="header-anchor" href="#tensorflow常见报错解决" aria-hidden="true">#</a> Tensorflow常见报错解决</h1>
<blockquote>
<p>2018年10月30日</p>
</blockquote>
<h2 id="tf-train-summarywriter" tabindex="-1"><a class="header-anchor" href="#tf-train-summarywriter" aria-hidden="true">#</a> tf.train.SummaryWriter</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>AttributeError: 'module' object has no attribute 'SummaryWriter'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>tf.train.SummaryWriter
改为：tf.summary.FileWriter</p>
<h2 id="tf-merge-all-summaries" tabindex="-1"><a class="header-anchor" href="#tf-merge-all-summaries" aria-hidden="true">#</a> tf.merge_all_summaries()</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>AttributeError: 'module' object has no attribute 'summaries'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>tf.merge_all_summaries()
改为：summary_op = tf.summary.merge_all()</p>
<h2 id="tf-histogram-summary" tabindex="-1"><a class="header-anchor" href="#tf-histogram-summary" aria-hidden="true">#</a> tf.histogram_summary()</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>AttributeError: 'module' object has no attribute 'histogram_summary'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="tf-histogram-summary-1" tabindex="-1"><a class="header-anchor" href="#tf-histogram-summary-1" aria-hidden="true">#</a> tf.histogram_summary()</h2>
<p>改为：tf.summary.histogram()</p>
<h2 id="tf-scalar-summary" tabindex="-1"><a class="header-anchor" href="#tf-scalar-summary" aria-hidden="true">#</a> tf.scalar_summary()</h2>
<p>改为：tf.summary.scalar()</p>
<h2 id="tf-image-summary" tabindex="-1"><a class="header-anchor" href="#tf-image-summary" aria-hidden="true">#</a> tf.image_summary()</h2>
<p>改为：tf.summary.image()</p>
</div></template>


