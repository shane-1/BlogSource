<template><div><h1 id="工具链会议概要" tabindex="-1"><a class="header-anchor" href="#工具链会议概要" aria-hidden="true">#</a> 工具链会议概要</h1>
<h2 id="_1-版本管理" tabindex="-1"><a class="header-anchor" href="#_1-版本管理" aria-hidden="true">#</a> 1.版本管理</h2>
<ul>
<li>
<p>IPMP演示错误</p>
</li>
<li>
<p>部署完后部署状态显示红×</p>
<p>三个指标强制:</p>
<ul>
<li>系统测试UAT测试 缺陷数0</li>
<li>CAST红线改进数0</li>
<li>安全性扫描高危漏洞数0</li>
</ul>
<blockquote>
<p>后台自己维护,项目组不能自己修改,组织级别</p>
</blockquote>
</li>
<li>
<p>版本验证信息汇总blocking</p>
<blockquote>
<p>薄涛老师: 可能部分指标不满足,是否可以投产</p>
<p>陈劲松老师: 三个强制指标为组织级要求,CAST今年九月要求全覆盖,先强制要求</p>
</blockquote>
</li>
<li>
<p>质量信息分两块-&gt; CAST和安全性测试</p>
<blockquote>
<p>可以合并</p>
</blockquote>
</li>
<li>
<p>修改版本权限提示</p>
<blockquote>
<p>修改为<code v-pre>没有版本管理权限</code></p>
</blockquote>
</li>
<li>
<p>版本管理测试环境推广演示Demo</p>
<blockquote>
<p>完成后推广</p>
</blockquote>
</li>
<li>
<p>后续需要跟进其他系统(预计今年4月上线)</p>
</li>
<li>
<p>测试地址分享</p>
<blockquote>
<ol>
<li>
<p>需要修改插件为容器地址,不使用本地地址</p>
</li>
<li>
<p>清除其他不用的版本管理页面</p>
</li>
</ol>
</blockquote>
</li>
<li>
<p>IPMP单号脚本做成流水线插件</p>
<blockquote>
<p>rel环境正式晋级</p>
</blockquote>
</li>
<li>
<p>下周云转型内部\测试管理处\项目中心演示</p>
<blockquote>
<p>需要版本管理截图</p>
</blockquote>
</li>
</ul>
<h2 id="_2-系统集成" tabindex="-1"><a class="header-anchor" href="#_2-系统集成" aria-hidden="true">#</a> 2. 系统集成</h2>
<h3 id="scc" tabindex="-1"><a class="header-anchor" href="#scc" aria-hidden="true">#</a> SCC</h3>
<ul>
<li>
<p>SCC插件多环境区分</p>
<blockquote>
<p>只部署测试环境,生产环境AOMS部署</p>
</blockquote>
</li>
<li>
<p>信息有误,授权问题</p>
<blockquote>
<p>SCC没有权限的校验,可能需要授权</p>
<p>讨论解决方案为:</p>
<ol>
<li>
<p>将关键信息变为密文,防止克隆流水线执行到其他项目组资源</p>
</li>
<li>
<p>SCC是否能提供项目组token</p>
</li>
<li>
<p>服务连接,资源名作为下拉框</p>
<p>目前没有相关接口,可以提需求</p>
</li>
</ol>
</blockquote>
</li>
<li>
<p>yml文件变量可能有多个,做ADS变量的map映射</p>
<blockquote>
<p>内置replace token插件可以实现</p>
</blockquote>
</li>
</ul>
<h3 id="接口测试" tabindex="-1"><a class="header-anchor" href="#接口测试" aria-hidden="true">#</a> 接口测试</h3>
<ul>
<li>调试测试 会去掉</li>
</ul>
<h3 id="安全测试" tabindex="-1"><a class="header-anchor" href="#安全测试" aria-hidden="true">#</a> 安全测试</h3>
<ul>
<li>
<p>密码使用ADS密文变量</p>
</li>
<li>
<p>target id 生产过程不可控, license可能过多</p>
<blockquote>
<ol>
<li>
<p>应该预先访问是否通过与否</p>
</li>
<li>
<p>安全测试平台需要通过target ID控制数量</p>
</li>
<li>
<p>系统级别限制</p>
</li>
</ol>
</blockquote>
</li>
<li>
<p>目前统一认证平台无法登录进行安全测试</p>
</li>
</ul>
<h3 id="sonar" tabindex="-1"><a class="header-anchor" href="#sonar" aria-hidden="true">#</a> Sonar</h3>
<ul>
<li>
<p>图标修改</p>
</li>
<li>
<p>显示差异</p>
<blockquote>
<p>给差异的超链接</p>
</blockquote>
</li>
<li>
<p>把差异和原指标对应排版</p>
</li>
</ul>
<h2 id="_3-jira" tabindex="-1"><a class="header-anchor" href="#_3-jira" aria-hidden="true">#</a> 3. JIRA</h2>
<ul>
<li>
<p>设置以IPMP项目编号为准,后台自动转换</p>
</li>
<li>
<p>JIRA同步到ADS状态不对应</p>
</li>
</ul>
<blockquote>
<p>ADS对应Bug状态与JIRA不一致</p>
</blockquote>
<ul>
<li>
<p>同步时间太长</p>
<blockquote>
<p>考虑提升查询时间</p>
</blockquote>
</li>
<li>
<p>实时同步</p>
<blockquote>
<p>使用JIRA webhook</p>
</blockquote>
</li>
<li>
<p>JIRA的缺陷可能被ADS定时覆盖</p>
</li>
</ul>
<h2 id="_4-aoms" tabindex="-1"><a class="header-anchor" href="#_4-aoms" aria-hidden="true">#</a> 4. AOMS</h2>
<ul>
<li>
<p>修改ads为aoms</p>
</li>
<li>
<p>轮询间隔次数</p>
<blockquote>
<p>改为<code v-pre>轮询失败重试次数</code></p>
</blockquote>
</li>
<li>
<p>一直等到运行中</p>
<blockquote>
<p>轮询到部署完成</p>
</blockquote>
</li>
<li>
<p>AOMS日志</p>
<blockquote>
<p>轮询中日志更新</p>
</blockquote>
</li>
</ul>
<h2 id="_5-测试管理" tabindex="-1"><a class="header-anchor" href="#_5-测试管理" aria-hidden="true">#</a> 5. 测试管理</h2>
<h3 id="测试用例导入" tabindex="-1"><a class="header-anchor" href="#测试用例导入" aria-hidden="true">#</a> 测试用例导入</h3>
<ul>
<li>要求项目编号和实时单元编号在创建测试计划时必填</li>
</ul>
<h2 id="_6-实施单元管理" tabindex="-1"><a class="header-anchor" href="#_6-实施单元管理" aria-hidden="true">#</a> 6.实施单元管理</h2>
<ul>
<li>
<p>修改创建工作项为<code v-pre>特性</code></p>
<blockquote>
<p>右侧动态匹配模板对应项</p>
</blockquote>
</li>
<li>
<p>需要手动刷新</p>
</li>
<li>
<p>功能描述隐藏</p>
</li>
</ul>
<h2 id="_7-关联工作项" tabindex="-1"><a class="header-anchor" href="#_7-关联工作项" aria-hidden="true">#</a> 7.  关联工作项</h2>
<ul>
<li>没有后台,可以直接上生产</li>
</ul>
<h2 id="_8-gitstat" tabindex="-1"><a class="header-anchor" href="#_8-gitstat" aria-hidden="true">#</a> 8. Gitstat</h2>
<ul>
<li>可以指定代理机仓库地址</li>
</ul>
</div></template>


