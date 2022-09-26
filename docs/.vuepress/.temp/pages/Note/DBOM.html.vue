<template><div><h1 id="octave与matlab的区别" tabindex="-1"><a class="header-anchor" href="#octave与matlab的区别" aria-hidden="true">#</a> Octave与MatLab的区别</h1>
<hr>
<p>MatLab用户转而使用octave几乎不需要什么培训，只是要一些小细节上注意一下。下面我们罗列一些octave和MatLab的区别。</p>
<h2 id="布尔值的乘积" tabindex="-1"><a class="header-anchor" href="#布尔值的乘积" aria-hidden="true">#</a> 布尔值的乘积</h2>
<div class="language-matlab ext-matlab line-numbers-mode"><pre v-pre class="language-matlab"><code>X <span class="token operator">=</span> <span class="token function">ones</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
<span class="token function">prod</span><span class="token punctuation">(</span><span class="token function">size</span><span class="token punctuation">(</span>X<span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>MatLab和octave的输出是不同的：<br></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Matlab: ??? Function 'prod' is not defined for values of class 'logical'.
Octave: ans = 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>octave输出为0的原因是 size(X) 为
ans =
2   2</p>
</blockquote>
<h2 id="逻辑运算符、算术运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符、算术运算符" aria-hidden="true">#</a> 逻辑运算符、算术运算符</h2>
<p>Octave与MatLab兼容，甚至更为宽松。
<img src="/images/2020-02-28-16-40-17.png" alt=""><br></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>MatLab用 x^2，octave用 x^2 或者 x**2 表示 “x的平方”。Octave用 x**2 是为了照顾GnuPlot的用户。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>总而言之，octave在运算符方面彻底兼容MatLab，MatLab用户放心大胆地用octave吧，但octave用户用MatLab的时候就要小心了。</p>
<h2 id="c-风格的自动增量、赋值、屏幕打印" tabindex="-1"><a class="header-anchor" href="#c-风格的自动增量、赋值、屏幕打印" aria-hidden="true">#</a> C-风格的自动增量、赋值、屏幕打印</h2>
<p>Octave允许C-风格的</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>i<span class="token operator">++</span> <span class="token punctuation">;</span> <span class="token operator">++</span>i <span class="token punctuation">;</span> i<span class="token operator">+=</span><span class="token number">1</span> <span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token char">'My result is: %d\n'</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>而MatLab不认它们。MatLab打印至屏幕和文件都用 <code v-pre>fprintf</code> 函数。</p>
<h2 id="注意空格" tabindex="-1"><a class="header-anchor" href="#注意空格" aria-hidden="true">#</a> 注意空格</h2>
<p>octave对空格是作为一个符号识别的，在列合并中短的列自然扩充，例如</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>A = ['123 ';'123'] ;
size(A)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>结果是 2 4，<br>
而MatLab则返回列合并有问题：<br>
?? Error using ==&gt; vertcat</p>
<blockquote>
<p>另外，转置符号与矩阵之间如果有空格
[0 1] '
在MatLab里不允许，octave则允许，且与 [0 1]' 的结果是一样的。<br></p>
</blockquote>
<h2 id="直方图内置函数hist" tabindex="-1"><a class="header-anchor" href="#直方图内置函数hist" aria-hidden="true">#</a> 直方图内置函数hist</h2>
<p>octave的hist为<br>
<code v-pre>hist (Y, X, NORM)</code><br>
其中NORM为所有柱高之和。</p>
<h2 id="导入空文件" tabindex="-1"><a class="header-anchor" href="#导入空文件" aria-hidden="true">#</a> 导入空文件</h2>
<p>MatLab允许导入空文件，老版本的octave不允许，新版本的octave-3.0.3则允许。</p>
<h2 id="行续符" tabindex="-1"><a class="header-anchor" href="#行续符" aria-hidden="true">#</a> 行续符</h2>
<p>MatLab中用 `...' 做行续符，如用</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>A = rand (1, ...
         2) ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>表达</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>A = rand (1,2) ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="octave与matlab兼容-除此之外-octave还允许如下两种表示方法。" tabindex="-1"><a class="header-anchor" href="#octave与matlab兼容-除此之外-octave还允许如下两种表示方法。" aria-hidden="true">#</a> Octave与MatLab兼容，除此之外，octave还允许如下两种表示方法。</h6>
<hr>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>A = rand (1,
        2) ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>和</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>A = rand (1, \
        2) ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="if、for等环境的结束符" tabindex="-1"><a class="header-anchor" href="#if、for等环境的结束符" aria-hidden="true">#</a> if、for等环境的结束符</h2>
<p>Octave用<code v-pre>end{if,for, ...}</code></p>
<p>而MatLab则统一用 <code v-pre>end</code>。</p>
<hr>
<p>整理不易，转载请注明出处。</p>
</div></template>


