import{_ as l,r as t,o as i,c as p,a as s,b as a,e as c,d as e}from"./app.a189e6da.js";const o={},u=c(`<h1 id="shell-\u811A\u672C\u4F20\u53C2\u65B9\u6CD5\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#shell-\u811A\u672C\u4F20\u53C2\u65B9\u6CD5\u603B\u7ED3" aria-hidden="true">#</a> Shell \u811A\u672C\u4F20\u53C2\u65B9\u6CD5\u603B\u7ED3</h1><blockquote><p>\u5E73\u65F6\u4F1A\u9047\u5230\u5F88\u591A\u811A\u672C\u90FD\u6709\u53C2\u6570\u9009\u9879\uFF0C\u7C7B\u4F3C\uFF1A</p></blockquote><div class="language-swift ext-swift line-numbers-mode"><pre class="language-swift"><code><span class="token operator">./</span>test<span class="token punctuation">.</span>sh <span class="token operator">-</span>f config<span class="token punctuation">.</span>conf <span class="token operator">-</span>v <span class="token operator">--</span><span class="token keyword">prefix</span><span class="token operator">=/</span>home
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u79CD\u811A\u672C\u600E\u4E48\u5199\u5462\uFF1F</p><hr><h2 id="shell-\u7279\u6B8A\u53C2\u6570\u89E3\u91CA" tabindex="-1"><a class="header-anchor" href="#shell-\u7279\u6B8A\u53C2\u6570\u89E3\u91CA" aria-hidden="true">#</a> Shell \u7279\u6B8A\u53C2\u6570\u89E3\u91CA</h2><p>\u9996\u5148\u6765\u770B\u51E0\u4E2A\u7279\u6B8A\u53D8\u91CF\uFF1A$0, $#, $*, $@, $?, $$, $_</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$0</span>    <span class="token comment"># \u5F53\u524D\u811A\u672C\u7684\u6587\u4EF6\u540D\uFF08\u95F4\u63A5\u8FD0\u884C\u65F6\u8FD8\u5305\u62EC\u7EDD\u5BF9\u8DEF\u5F84\uFF09\u3002</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$n</span>    <span class="token comment"># \u4F20\u9012\u7ED9\u811A\u672C\u6216\u51FD\u6570\u7684\u53C2\u6570\u3002n \u662F\u4E00\u4E2A\u6570\u5B57\uFF0C\u8868\u793A\u7B2C\u51E0\u4E2A\u53C2\u6570\u3002\u4F8B\u5982\uFF0C\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F $1 \u3002</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$#</span>    <span class="token comment"># \u4F20\u9012\u7ED9\u811A\u672C\u6216\u51FD\u6570\u7684\u53C2\u6570\u4E2A\u6570\u3002</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$*</span>    <span class="token comment"># \u4F20\u9012\u7ED9\u811A\u672C\u6216\u51FD\u6570\u7684\u6240\u6709\u53C2\u6570\u3002</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$@</span>    <span class="token comment"># \u4F20\u9012\u7ED9\u811A\u672C\u6216\u51FD\u6570\u7684\u6240\u6709\u53C2\u6570\u3002\u88AB\u53CC\u5F15\u53F7 (&quot; &quot;) \u5305\u542B\u65F6\uFF0C\u4E0E $* \u4E0D\u540C\uFF0C\u4E0B\u9762\u5C06\u4F1A\u8BB2\u5230\u3002</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$?</span>    <span class="token comment"># \u4E0A\u4E2A\u547D\u4EE4\u7684\u9000\u51FA\u72B6\u6001\uFF0C\u6216\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u3002</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$$</span>    <span class="token comment"># \u5F53\u524D Shell \u8FDB\u7A0B ID\u3002\u5BF9\u4E8E Shell \u811A\u672C\uFF0C\u5C31\u662F\u8FD9\u4E9B\u811A\u672C\u6240\u5728\u7684\u8FDB\u7A0B ID\u3002</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$_</span>    <span class="token comment"># \u4E0A\u4E00\u4E2A\u547D\u4EE4\u7684\u6700\u540E\u4E00\u4E2A\u53C2\u6570</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$!</span>    <span class="token comment"># \u540E\u53F0\u8FD0\u884C\u7684\u6700\u540E\u4E00\u4E2A\u8FDB\u7A0B\u7684 ID \u53F7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u73B0\u5728\u4FDD\u5B58\u4E3A\u4E00\u4E2A\u811A\u672C\uFF0C\u7136\u540E\u52A0\u4E0A\u51E0\u4E2A\u53C2\u6570\u8FD0\u884C\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ ./test.sh <span class="token builtin class-name">test</span> test1 test2 test3 test4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD4\u56DE\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>./test.sh                      <span class="token comment"># $0</span>
                               <span class="token comment"># $n</span>
<span class="token number">5</span>                              <span class="token comment"># $#</span>
<span class="token builtin class-name">test</span> test1 test2 test3 test4   <span class="token comment"># $*</span>
<span class="token builtin class-name">test</span> test1 test2 test3 test4   <span class="token comment"># $@</span>
<span class="token number">0</span>                              <span class="token comment"># $?</span>
<span class="token number">12305</span>                          <span class="token comment"># $$</span>
<span class="token number">12305</span>                          <span class="token comment"># $_</span>
                               <span class="token comment"># $!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>$* \u548C $@ \u90FD\u8868\u793A\u4F20\u9012\u7ED9\u51FD\u6570\u6216\u811A\u672C\u7684\u6240\u6709\u53C2\u6570\uFF0C\u4E0D\u88AB\u53CC\u5F15\u53F7 (&quot;&quot;) \u5305\u542B\u65F6\uFF0C\u90FD\u4EE5&quot;$1&quot;&quot;$2&quot; \u2026 &quot;$n&quot; \u7684\u5F62\u5F0F\u8F93\u51FA\u6240\u6709\u53C2\u6570\u3002</p></blockquote><blockquote><p>\u4F46\u662F\u5F53\u5B83\u4EEC\u88AB\u53CC\u5F15\u53F7 (&quot;&quot;) \u5305\u542B\u65F6\uFF0C&quot;$*&quot;\u4F1A\u5C06\u6240\u6709\u7684\u53C2\u6570\u4F5C\u4E3A\u4E00\u4E2A\u6574\u4F53\uFF0C\u4EE5&quot;$1 $2 \u2026 $n&quot;\u7684\u5F62\u5F0F\u8F93\u51FA\u6240\u6709\u53C2\u6570\uFF1B&quot;$@&quot;\u4F1A\u5C06\u5404\u4E2A\u53C2\u6570\u5206\u5F00\uFF0C\u4EE5&quot;$1&quot;&quot;$2&quot; \u2026 &quot;$n&quot; \u7684\u5F62\u5F0F\u8F93\u51FA\u6240\u6709\u53C2\u6570\u3002</p></blockquote><p>\u4F8B\u5982\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;\\<span class="token variable">$*</span>=&quot;</span> <span class="token variable">$*</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable">$*</span><span class="token entity" title="\\&quot;">\\&quot;</span>=&quot;</span> <span class="token string">&quot;<span class="token variable">$*</span>&quot;</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;\\<span class="token variable">$@</span>=&quot;</span> <span class="token variable">$@</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable">$@</span><span class="token entity" title="\\&quot;">\\&quot;</span>=&quot;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;print each param from \\<span class="token variable">$*</span>&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">var</span> <span class="token keyword">in</span> <span class="token variable">$*</span>
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$var</span>&quot;</span>
<span class="token keyword">done</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;print each param from \\<span class="token variable">$@</span>&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">var</span> <span class="token keyword">in</span> <span class="token variable">$@</span>
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$var</span>&quot;</span>
<span class="token keyword">done</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;\u4ECE <span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable">$*</span><span class="token entity" title="\\&quot;">\\&quot;</span> \u83B7\u53D6\u5E76\u6253\u5370\u6BCF\u4E00\u4E2A\u53C2\u6570&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">var</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$*</span>&quot;</span>
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$var</span>&quot;</span>
<span class="token keyword">done</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;\u4ECE <span class="token entity" title="\\&quot;">\\&quot;</span>\\<span class="token variable">$@</span><span class="token entity" title="\\&quot;">\\&quot;</span> \u83B7\u53D6\u5E76\u6253\u5370\u6BCF\u4E00\u4E2A\u53C2\u6570&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">var</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$var</span>&quot;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE\u7ED3\u679C\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token variable">$*</span><span class="token operator">=</span> <span class="token builtin class-name">test</span> test1 test2
<span class="token string">&quot;<span class="token variable">$*</span>&quot;</span><span class="token operator">=</span> <span class="token builtin class-name">test</span> test1 test2
<span class="token variable">$@</span><span class="token operator">=</span> <span class="token builtin class-name">test</span> test1 test2
<span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token operator">=</span> <span class="token builtin class-name">test</span> test1 test2
print each param from <span class="token variable">$*</span>
<span class="token builtin class-name">test</span>
test1
test2
print each param from <span class="token variable">$@</span>
<span class="token builtin class-name">test</span>
test1
test2
\u4ECE <span class="token string">&quot;<span class="token variable">$*</span>&quot;</span> \u83B7\u53D6\u5E76\u6253\u5370\u6BCF\u4E00\u4E2A\u53C2\u6570
<span class="token builtin class-name">test</span> test1 test2
\u4ECE <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> \u83B7\u53D6\u5E76\u6253\u5370\u6BCF\u4E00\u4E2A\u53C2\u6570
<span class="token builtin class-name">test</span>
test1
test2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-\u624B\u5DE5\u5904\u7406\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#_1-\u624B\u5DE5\u5904\u7406\u53C2\u6570" aria-hidden="true">#</a> 1. \u624B\u5DE5\u5904\u7406\u53C2\u6570</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token punctuation">]</span>  
<span class="token keyword">do</span>  
  <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>   
    -a<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -a \u9009\u9879&quot;</span>  
        <span class="token punctuation">;</span><span class="token punctuation">;</span>  
    -b<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -b \u9009\u9879&quot;</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;-b \u9009\u9879\u7684\u53C2\u6570\u503C\u662F\uFF1A<span class="token variable">$2</span>&quot;</span>   
        <span class="token builtin class-name">shift</span>  
        <span class="token punctuation">;</span><span class="token punctuation">;</span>  
    -c<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -c \u9009\u9879&quot;</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;-c \u9009\u9879\u7684\u53C2\u6570\u503C\u662F\uFF1A<span class="token variable">$2</span>&quot;</span>  
        <span class="token builtin class-name">shift</span>  
        <span class="token punctuation">;</span><span class="token punctuation">;</span>  
    -d<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -d \u9009\u9879&quot;</span>  
        <span class="token punctuation">;</span><span class="token punctuation">;</span>  
    *<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$1</span> is not an option&quot;</span>  
        <span class="token punctuation">;</span><span class="token punctuation">;</span>  
  <span class="token keyword">esac</span>  
  <span class="token builtin class-name">shift</span>  
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\uFF1A</p><div class="language-swift ext-swift line-numbers-mode"><pre class="language-swift"><code><span class="token operator">./</span>test<span class="token punctuation">.</span>sh <span class="token operator">-</span>a <span class="token operator">-</span>b t2 <span class="token operator">-</span>c t3 <span class="token operator">-</span>d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD4\u56DE\uFF1A</p><div class="language-swift ext-swift line-numbers-mode"><pre class="language-swift"><code>\u53D1\u73B0 <span class="token operator">-</span>a \u9009\u9879
\u53D1\u73B0 <span class="token operator">-</span>b \u9009\u9879
<span class="token operator">-</span>b \u9009\u9879\u7684\u53C2\u6570\u503C\u662F\uFF1At2
\u53D1\u73B0 <span class="token operator">-</span>c \u9009\u9879
<span class="token operator">-</span>c \u9009\u9879\u7684\u53C2\u6570\u503C\u662F\uFF1At3
\u53D1\u73B0 <span class="token operator">-</span>d \u9009\u9879
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-getopt-\u5904\u7406\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#_2-getopt-\u5904\u7406\u53C2\u6570" aria-hidden="true">#</a> 2. getopt \u5904\u7406\u53C2\u6570</h2><p>\u4E0B\u9762 <code>getopt ab:c:d &quot;$@&quot;</code> \u4E2D\u7684 abcd \u5206\u522B\u4EE3\u8868\u56DB\u4E2A\u9009\u9879\uFF0C\u540E\u9762\u5E26\u6709\u5192\u53F7\u7684\u8868\u793A\u9009\u9879\u9700\u8981\u53C2\u6570\u503C\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">GETOPTOUT</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>getopt ab:c:d <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token variable">\`</span></span>  
    <span class="token builtin class-name">set</span> -- <span class="token variable">$GETOPTOUT</span>   
    <span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token punctuation">]</span>   
    <span class="token keyword">do</span>  
    <span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>   
        -a<span class="token punctuation">)</span>  
            <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -a \u9009\u9879&quot;</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>  
        -b<span class="token punctuation">)</span>  
            <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -b \u9009\u9879&quot;</span>
            <span class="token builtin class-name">echo</span> <span class="token string">&quot;-b \u9009\u9879\u7684\u53C2\u6570\u503C\u662F\uFF1A<span class="token variable">$2</span>&quot;</span>
            <span class="token builtin class-name">shift</span>  
            <span class="token punctuation">;</span><span class="token punctuation">;</span>  
        -c<span class="token punctuation">)</span>  
            <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -c \u9009\u9879&quot;</span>
            <span class="token builtin class-name">echo</span> <span class="token string">&quot;-c \u9009\u9879\u7684\u53C2\u6570\u503C\u662F\uFF1A<span class="token variable">$2</span>&quot;</span>
            <span class="token builtin class-name">shift</span>  
            <span class="token punctuation">;</span><span class="token punctuation">;</span>  
        -d<span class="token punctuation">)</span>  
            <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -d \u9009\u9879&quot;</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>  
        --<span class="token punctuation">)</span>  
            <span class="token builtin class-name">shift</span>  
            <span class="token builtin class-name">break</span>  
            <span class="token punctuation">;</span><span class="token punctuation">;</span>  
         *<span class="token punctuation">)</span>  
             <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u672A\u77E5\u9009\u9879:&quot;</span><span class="token variable">$1</span><span class="token string">&quot;&quot;</span>  
            <span class="token punctuation">;</span><span class="token punctuation">;</span>  
    <span class="token keyword">esac</span>  
    <span class="token builtin class-name">shift</span>  
    <span class="token keyword">done</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\uFF1A</p><div class="language-swift ext-swift line-numbers-mode"><pre class="language-swift"><code><span class="token operator">./</span>proxychains4<span class="token punctuation">.</span>sh <span class="token operator">-</span>a <span class="token operator">-</span>b t2 <span class="token operator">-</span>c t3 <span class="token operator">-</span>d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD4\u56DE\uFF1A</p><div class="language-swift ext-swift line-numbers-mode"><pre class="language-swift"><code>\u53D1\u73B0 <span class="token operator">-</span>a \u9009\u9879
\u53D1\u73B0 <span class="token operator">-</span>b \u9009\u9879
<span class="token operator">-</span>b \u9009\u9879\u7684\u53C2\u6570\u503C\u662F\uFF1At2
\u53D1\u73B0 <span class="token operator">-</span>c \u9009\u9879
<span class="token operator">-</span>c \u9009\u9879\u7684\u53C2\u6570\u503C\u662F\uFF1At3
\u53D1\u73B0 <span class="token operator">-</span>d \u9009\u9879
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u5DE5\u5177\u5F88\u5F3A\u5927\uFF0C\u7ED9\u4E2A\u5B8C\u6574\u6A21\u677F\u53C2\u8003\u4E00\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">ARGV</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token variable"><span class="token variable">$(</span>getopt <span class="token parameter variable">-o</span> \u77ED\u9009\u98791<span class="token punctuation">[</span>:<span class="token punctuation">]</span>\u77ED\u9009\u98792<span class="token punctuation">[</span>:<span class="token punctuation">]</span><span class="token punctuation">..</span>.<span class="token punctuation">[</span>:<span class="token punctuation">]</span>\u77ED\u9009\u9879n <span class="token parameter variable">-l</span> \u957F\u9009\u98791,\u957F\u9009\u98792,<span class="token punctuation">..</span>.,\u957F\u9009\u9879n -- <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token variable">)</span></span><span class="token punctuation">)</span>
<span class="token builtin class-name">eval</span> <span class="token builtin class-name">set</span> -- <span class="token string">&quot;<span class="token variable">$ARGV</span>&quot;</span>
<span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
<span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
    -\u77ED\u9009\u98791<span class="token operator">|</span>--\u957F\u9009\u98791<span class="token punctuation">)</span>
        process
        <span class="token builtin class-name">shift</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    -\u77ED\u9009\u98792<span class="token operator">|</span>--\u957F\u9009\u98792<span class="token punctuation">)</span>
        <span class="token comment"># \u83B7\u53D6\u9009\u9879</span>
        opt <span class="token operator">=</span> <span class="token variable">$2</span>
        process
        <span class="token builtin class-name">shift</span> <span class="token number">2</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    
    <span class="token punctuation">..</span>. <span class="token punctuation">..</span>.

    -\u77ED\u9009\u98793<span class="token operator">|</span>--\u957F\u9009\u98793<span class="token punctuation">)</span>
        process
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    --<span class="token punctuation">)</span>
        <span class="token builtin class-name">break</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u5173\u4E8E eval \u8FD9\u4E2A\u547D\u4EE4\uFF0C\u7528\u4E00\u4E2A\u5C0F\u4F8B\u5B50\u89E3\u91CA\uFF1A</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">foo</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token assign-left variable">x</span><span class="token operator">=</span>foo
<span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token string">&#39;$&#39;</span><span class="token variable">$x</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$y</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$foo</span>
<span class="token builtin class-name">eval</span> <span class="token assign-left variable">y</span><span class="token operator">=</span><span class="token string">&#39;$&#39;</span><span class="token variable">$x</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token variable">$foo</span>
<span class="token number">10</span>
<span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u56E0\u4E3A\u6211\u4E00\u822C\u7528\u8FD9\u4E2A\u547D\u4EE4\u8FDE\u63A5\u6784\u5EFA\u547D\u4EE4\u53C2\u6570\uFF0C\u6240\u4EE5\u4F60\u53EF\u4EE5\u7B80\u5355\u7406\u89E3\u4E3A\u6267\u884C\u4E24\u6B21\uFF08\u867D\u7136\u4E0D\u592A\u5BF9\uFF09\u3002\u901A\u8FC7\u6DFB\u52A0 eval \u53EF\u4EE5\u628A\u53C2\u6570\u89E3\u6790\u540E\u518D\u6267\u884C\u3002</p><h2 id="_3-getopts-\u5904\u7406\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#_3-getopts-\u5904\u7406\u53C2\u6570" aria-hidden="true">#</a> 3. getopts \u5904\u7406\u53C2\u6570</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">while</span> <span class="token builtin class-name">getopts</span> :ab:c:d ARGS  
<span class="token keyword">do</span>  
<span class="token keyword">case</span> <span class="token variable">$ARGS</span> <span class="token keyword">in</span>   
    a<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -a \u9009\u9879&quot;</span>  
        <span class="token punctuation">;</span><span class="token punctuation">;</span>  
    b<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -b \u9009\u9879&quot;</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;-b \u9009\u9879\u7684\u503C\u662F\uFF1A<span class="token variable">$OPTARG</span>&quot;</span>  
        <span class="token punctuation">;</span><span class="token punctuation">;</span>  
    c<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -c \u9009\u9879&quot;</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;-c \u9009\u9879\u7684\u503C\u662F\uFF1A<span class="token variable">$OPTARG</span>&quot;</span>  
        <span class="token punctuation">;</span><span class="token punctuation">;</span>  
    d<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u53D1\u73B0 -d \u53C2\u6570&quot;</span>  
        <span class="token punctuation">;</span><span class="token punctuation">;</span>  
    *<span class="token punctuation">)</span>  
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u672A\u77E5\u9009\u9879\uFF1A<span class="token variable">$ARGS</span>&quot;</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u79CD\u65B9\u6CD5\u6700\u65B9\u4FBF\u7B80\u5355\u3002\u63A5\u4E0B\u6765\u57FA\u4E8E\u8FD9\u79CD\u65B9\u6CD5\u6DF1\u5165\u8BB2\u89E3\u3002</p><h2 id="_4-\u4F20\u53C2\u610F\u5916\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#_4-\u4F20\u53C2\u610F\u5916\u5904\u7406" aria-hidden="true">#</a> 4. \u4F20\u53C2\u610F\u5916\u5904\u7406</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>      <span class="token string">&quot;?&quot;</span><span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u672A\u77E5\u9009\u9879 <span class="token variable">$OPTARG</span>&quot;</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
      <span class="token string">&quot;:&quot;</span><span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u6CA1\u6709\u8F93\u5165\u4EFB\u4F55\u9009\u9879 <span class="token variable">$OPTARG</span>&quot;</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
      *<span class="token punctuation">)</span>
        <span class="token comment"># \u53D1\u751F\u4E0D\u80FD\u9884\u6599\u7684\u9519\u8BEF\u65F6\u3002</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u5904\u7406\u9009\u9879\u65F6\u51FA\u73B0\u672A\u77E5\u9519\u8BEF&quot;</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u8D44\u6599" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a> \u53C2\u8003\u8D44\u6599</h2>`,44),r={href:"https://link.jianshu.com/?t=https://www.ibm.com/developerworks/cn/linux/l-bash-parameters.html",target:"_blank",rel:"noopener noreferrer"},d=e("https://www.ibm.com/developerworks/cn/linux/l-bash-parameters.html"),v={href:"https://link.jianshu.com/?t=http://www.361way.com/shell-getopt/4981.html",target:"_blank",rel:"noopener noreferrer"},k=e("http://www.361way.com/shell-getopt/4981.html"),b=s("hr",null,null,-1);function m(h,q){const n=t("ExternalLinkIcon");return i(),p("div",null,[u,s("ul",null,[s("li",null,[s("a",r,[d,a(n)])]),s("li",null,[s("a",v,[k,a(n)])])]),b])}const $=l(o,[["render",m],["__file","Shell.html.vue"]]);export{$ as default};
