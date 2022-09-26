<template><div><h1 id="aws-devops" tabindex="-1"><a class="header-anchor" href="#aws-devops" aria-hidden="true">#</a> AWS DevOps</h1>
<blockquote>
<p>微服务</p>
<p>敏捷</p>
</blockquote>
<h2 id="任务拆分" tabindex="-1"><a class="header-anchor" href="#任务拆分" aria-hidden="true">#</a> 任务拆分</h2>
<ul>
<li>拆分单元尽可能小</li>
<li>划分数据域</li>
<li>根据scaling factors而不是职能部门来解耦</li>
<li>服务间独立运行</li>
<li>服务间通过api直接调用</li>
</ul>
<p><strong>这将使组织结果发生变化</strong></p>
<h2 id="整体开发生命周期" tabindex="-1"><a class="header-anchor" href="#整体开发生命周期" aria-hidden="true">#</a> 整体开发生命周期</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>开发者 --->  服务  ---> 交付流水线(build ---> test ---> release --> monitor)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>每个server独立部署</p>
</blockquote>
<h2 id="amazon-devops的三大定律" tabindex="-1"><a class="header-anchor" href="#amazon-devops的三大定律" aria-hidden="true">#</a> Amazon DevOps的三大定律</h2>
<ol>
<li>拆分任务</li>
<li>团队自主运行</li>
<li>技术规范化</li>
</ol>
<h2 id="why-devops" tabindex="-1"><a class="header-anchor" href="#why-devops" aria-hidden="true">#</a> why DevOps</h2>
<ol>
<li>快速发布</li>
<li>反脆弱</li>
<li>消除技术债务</li>
</ol>
<blockquote>
<p>灰度部署:先进行部分试部署上线</p>
</blockquote>
<h2 id="devops构成" tabindex="-1"><a class="header-anchor" href="#devops构成" aria-hidden="true">#</a> DevOps构成</h2>
<h3 id="持续规划" tabindex="-1"><a class="header-anchor" href="#持续规划" aria-hidden="true">#</a> 持续规划</h3>
<ol>
<li>考虑运维</li>
<li>需求</li>
<li>共创合作</li>
</ol>
<h3 id="持续开发" tabindex="-1"><a class="header-anchor" href="#持续开发" aria-hidden="true">#</a> 持续开发</h3>
<ol>
<li>版本管理 <code v-pre>codecommit</code></li>
<li>分支管理</li>
</ol>
<h3 id="持续测试" tabindex="-1"><a class="header-anchor" href="#持续测试" aria-hidden="true">#</a> 持续测试</h3>
<ul>
<li>自动化测试</li>
</ul>
<ol>
<li>静态代码检查</li>
<li>单元测试</li>
<li>接口测试</li>
<li>UI测试</li>
<li>压力测试</li>
<li>安全测试</li>
</ol>
<h3 id="持续集成" tabindex="-1"><a class="header-anchor" href="#持续集成" aria-hidden="true">#</a> 持续集成</h3>
<ol>
<li>Trunk提交</li>
<li>触发job
<ol>
<li>pull</li>
<li>冲突</li>
<li>静态代码检查</li>
<li>编译</li>
<li>单元测试</li>
<li>打包</li>
<li>部署dev</li>
<li>测试</li>
</ol>
</li>
</ol>
<h3 id="持续部署" tabindex="-1"><a class="header-anchor" href="#持续部署" aria-hidden="true">#</a> 持续部署</h3>
<ol>
<li>
<p>部署test</p>
</li>
<li>
<p>测试</p>
</li>
<li>
<p>部署production</p>
<ul>
<li>
<p>部署自动化</p>
</li>
<li>
<p>参数配置-&gt;配置管理</p>
<blockquote>
<ol>
<li>部署过程自动化,减少高频部署人为错误</li>
<li>所有对环境的改动经统一入口</li>
<li>Dev\Test\Pro环境尽量保持一致</li>
</ol>
</blockquote>
</li>
<li>
<p>容器化</p>
</li>
<li>
<p>部署方式</p>
<ul>
<li>蓝绿部署</li>
<li>灰度部署(金丝雀)</li>
</ul>
</li>
</ul>
</li>
</ol>
<h3 id="持续监控" tabindex="-1"><a class="header-anchor" href="#持续监控" aria-hidden="true">#</a> 持续监控</h3>
<ol>
<li><code v-pre>ELK</code> 收集日志</li>
<li><code v-pre>elasticsearch</code> 搜索引擎</li>
<li><code v-pre>kibana</code> 界面展示</li>
</ol>
<h2 id="部署vs发布" tabindex="-1"><a class="header-anchor" href="#部署vs发布" aria-hidden="true">#</a> 部署vs发布</h2>
<h3 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署:</h3>
<p>又称交付,IT部门操作,技术能力</p>
<h3 id="发布" tabindex="-1"><a class="header-anchor" href="#发布" aria-hidden="true">#</a> 发布:</h3>
<p>业务部门,业务决定</p>
<h2 id="部署流水线" tabindex="-1"><a class="header-anchor" href="#部署流水线" aria-hidden="true">#</a> 部署流水线</h2>
<blockquote>
<p>评估所有对系统的改动,能够侦测对高风险或对质量有影响的改动拒绝集成,持续给团队提供相关改动反馈,让团队有能力快速经济的修复问题</p>
</blockquote>
<h2 id="案例分析" tabindex="-1"><a class="header-anchor" href="#案例分析" aria-hidden="true">#</a> 案例分析</h2>
<h2 id="单体式应用-monolithic" tabindex="-1"><a class="header-anchor" href="#单体式应用-monolithic" aria-hidden="true">#</a> 单体式应用  Monolithic</h2>
<ul>
<li>软件高度耦合</li>
<li>构建/测试/发布 周期长</li>
</ul>
<h3 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h3>
<ul>
<li>
<p>扩展性差</p>
</li>
<li>
<p>缺乏灵活性</p>
</li>
<li>
<p>系统运维十分困难</p>
</li>
<li>
<p>软件架构难以维护和发展</p>
</li>
<li>
<p>缺乏创新</p>
</li>
<li>
<p>开发速度慢</p>
<p>...</p>
</li>
</ul>
<h2 id="微服务-microservice" tabindex="-1"><a class="header-anchor" href="#微服务-microservice" aria-hidden="true">#</a> 微服务 MicroService</h2>
<ul>
<li>服务注册\发现</li>
<li>网关</li>
<li>配置中心</li>
<li>链路追踪</li>
</ul>
<h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h3>
<p><u>微服务= Service-oriented architecture + &quot;小&quot; public API</u></p>
<blockquote>
<p>没有总线,会导致复杂的互相调用的链路</p>
</blockquote>
<h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h3>
<h4 id="身份验证" tabindex="-1"><a class="header-anchor" href="#身份验证" aria-hidden="true">#</a> 身份验证</h4>
<h4 id="授权-权限管理" tabindex="-1"><a class="header-anchor" href="#授权-权限管理" aria-hidden="true">#</a> 授权(权限管理)</h4>
<h4 id="根据需要自动扩展服务" tabindex="-1"><a class="header-anchor" href="#根据需要自动扩展服务" aria-hidden="true">#</a> 根据需要自动扩展服务</h4>
<p>(CPU\TPS访问量)</p>
<h4 id="api向后兼容" tabindex="-1"><a class="header-anchor" href="#api向后兼容" aria-hidden="true">#</a> API向后兼容</h4>
<h4 id="隐藏你的数据" tabindex="-1"><a class="header-anchor" href="#隐藏你的数据" aria-hidden="true">#</a> 隐藏你的数据</h4>
<h2 id="敏捷-scrum" tabindex="-1"><a class="header-anchor" href="#敏捷-scrum" aria-hidden="true">#</a> 敏捷 Scrum</h2>
<p><strong>个体和交互高于工具和流程</strong></p>
<ul>
<li>自管理团队</li>
<li>T型人才</li>
<li>引导团队自主解决问题</li>
<li>跨职能</li>
</ul>
<h3 id="每日站会" tabindex="-1"><a class="header-anchor" href="#每日站会" aria-hidden="true">#</a> 每日站会</h3>
<p>同步信息</p>
<p><s>非签到会\成果会</s></p>
<blockquote>
<p>看板\燃尽图:信息辐射源</p>
</blockquote>
<h3 id="scrum-master" tabindex="-1"><a class="header-anchor" href="#scrum-master" aria-hidden="true">#</a> Scrum Master</h3>
<p>角色:确保团队遵循Scrum</p>
<p><s>团队的直接领导</s></p>
<h3 id="product-owner" tabindex="-1"><a class="header-anchor" href="#product-owner" aria-hidden="true">#</a> Product Owner</h3>
<p>角色:梳理product backlog,排序\解释\验收</p>
<ul>
<li>
<p>具有对产品的构想</p>
</li>
<li>
<p>管理产品代办事项列表</p>
</li>
<li>
<p>在产品待办事项类别中按照优先级安排用户故事</p>
</li>
</ul>
<h3 id="develop-team" tabindex="-1"><a class="header-anchor" href="#develop-team" aria-hidden="true">#</a> Develop Team</h3>
<p>角色:构建\交付\并监控高质量的软件</p>
<h3 id="高带宽沟通" tabindex="-1"><a class="header-anchor" href="#高带宽沟通" aria-hidden="true">#</a> 高带宽沟通</h3>
<p>推荐面对面沟通</p>
<h3 id="_335" tabindex="-1"><a class="header-anchor" href="#_335" aria-hidden="true">#</a> 335</h3>
<p>3个角色3个中间产物</p>
<blockquote>
<ul>
<li>Product backlog</li>
<li>Sprint backlog</li>
<li>Product Increment</li>
</ul>
</blockquote>
<p>5个活动</p>
<ol>
<li>
<p>Product backlog grooming:</p>
<ul>
<li>
<p>排优先级</p>
</li>
<li>
<p>讨论用户故事必要性</p>
</li>
<li>
<p>增删改</p>
</li>
<li>
<p>具备独立性</p>
<blockquote>
<p>(PO主导)</p>
</blockquote>
</li>
</ul>
</li>
<li>
<p>Sprint Planning meeting</p>
<ul>
<li>决定迭代目标(承诺)</li>
<li>输入:初始迭代目标\团队速率\团队情况</li>
<li>输出:Sprint Backlog</li>
<li>全员参加(一次迭代1-4周)</li>
<li>估算:功能点估算</li>
</ul>
<blockquote>
<p>迭代推荐2-3周,合理解冻客服需求时间.可以交付较大\较重要的stories.</p>
</blockquote>
<p>故事点:</p>
<ol>
<li>可以计算出相对数字</li>
<li>可以屏蔽噪音</li>
</ol>
</li>
<li>
<p>Daily Standup</p>
<p>​	3个问题</p>
<ol>
<li>昨天做了什么</li>
<li>今天要做什么</li>
<li>遇到了什么问题</li>
</ol>
</li>
<li>
<p>Review</p>
<ul>
<li>输入:迭代需求列表\潜在的可交付产品增量</li>
<li>输出:经过梳理的需求</li>
</ul>
</li>
<li>
<p><strong>Retrospective</strong></p>
</li>
</ol>
<h3 id="三大支柱" tabindex="-1"><a class="header-anchor" href="#三大支柱" aria-hidden="true">#</a> 三大支柱</h3>
<ul>
<li>透明</li>
<li>检查</li>
<li>适应</li>
</ul>
<h3 id="sprint-board" tabindex="-1"><a class="header-anchor" href="#sprint-board" aria-hidden="true">#</a> Sprint Board</h3>
<ul>
<li>任务看板</li>
<li>故事看板</li>
</ul>
<blockquote>
<p>WIP:限制某列的数量</p>
<p>解决项目推进的瓶颈</p>
</blockquote>
<h2 id="aws-cloudformation" tabindex="-1"><a class="header-anchor" href="#aws-cloudformation" aria-hidden="true">#</a> AWS CloudFormation</h2>
<ul>
<li>基础架构即代码</li>
<li>集成版本控制</li>
<li>JSON/YAML格式</li>
<li>模板-Template</li>
<li>堆栈-Stack</li>
<li>支持所有AWS资源类型</li>
</ul>
<p><img src="/images/2020-10-26-16-15-59.png" alt=""></p>
<h2 id="容器" tabindex="-1"><a class="header-anchor" href="#容器" aria-hidden="true">#</a> 容器</h2>
<ul>
<li>恰到好处的隔离</li>
<li>通过control group</li>
</ul>
<h3 id="优势" tabindex="-1"><a class="header-anchor" href="#优势" aria-hidden="true">#</a> 优势</h3>
<ul>
<li>only one kernel runs on the machine</li>
<li>No Hypervisor overhead</li>
<li>run different os</li>
<li>process isolation&amp;security</li>
</ul>
<h3 id="建议" tabindex="-1"><a class="header-anchor" href="#建议" aria-hidden="true">#</a> 建议</h3>
<ul>
<li>不要创建大型镜像</li>
<li>不要使用单层镜像</li>
</ul>
<blockquote>
<p>单层不要太大,一个功能打一层</p>
</blockquote>
<ul>
<li>不要在单个容器运行多个进程</li>
<li>不要在容器保存凭据,不要依赖IP地址</li>
<li>以非root用户运行进程</li>
<li>不要使用&quot;最新&quot;标签</li>
</ul>
<blockquote>
<p>lasted tag</p>
</blockquote>
<ul>
<li>不要利用运行中的容器创建镜像</li>
<li>不要将数据存放在容器内</li>
</ul>
<h3 id="k8s" tabindex="-1"><a class="header-anchor" href="#k8s" aria-hidden="true">#</a> K8S</h3>
<h4 id="cli" tabindex="-1"><a class="header-anchor" href="#cli" aria-hidden="true">#</a> CLI</h4>
<h4 id="master" tabindex="-1"><a class="header-anchor" href="#master" aria-hidden="true">#</a> Master</h4>
<ul>
<li>APIserver</li>
</ul>
<p>交互</p>
<ul>
<li>Controller</li>
</ul>
<p>容器调度</p>
<ul>
<li>Scheduler</li>
<li>ETCD</li>
</ul>
<p>服务发现,分布式存储系统</p>
<h4 id="node" tabindex="-1"><a class="header-anchor" href="#node" aria-hidden="true">#</a> Node</h4>
<ul>
<li>pod</li>
</ul>
<blockquote>
<p>pause负责管理pod</p>
</blockquote>
<ul>
<li>kubelet</li>
</ul>
<h4 id="发布方式" tabindex="-1"><a class="header-anchor" href="#发布方式" aria-hidden="true">#</a> 发布方式</h4>
<ol>
<li>
<p>deployment</p>
<p>不区分状态</p>
</li>
<li>
<p>StatefulSet</p>
<p>区分状态</p>
</li>
<li>
<p>DaemonSst</p>
<p>守护</p>
<blockquote>
<p>子集ReplicaSet</p>
</blockquote>
</li>
</ol>
<h4 id="不同node通讯" tabindex="-1"><a class="header-anchor" href="#不同node通讯" aria-hidden="true">#</a> 不同Node通讯</h4>
<ul>
<li>IPTAble</li>
</ul>
<blockquote>
<p>集群少</p>
</blockquote>
<h2 id="aws-developer-tools-for-ci-cd" tabindex="-1"><a class="header-anchor" href="#aws-developer-tools-for-ci-cd" aria-hidden="true">#</a> AWS Developer Tools for CI/CD</h2>
<blockquote>
<p>Souce -&gt; Build-&gt; Test -&gt; Deploy -&gt; Monitor</p>
</blockquote>
<ul>
<li>AWS CodeStar</li>
<li>AWS CodeBuild</li>
<li>AWS CodeCommit</li>
<li>AWS CodeDeploy</li>
<li>AWS CodePipline</li>
</ul>
<h2 id="aws-cloud9" tabindex="-1"><a class="header-anchor" href="#aws-cloud9" aria-hidden="true">#</a> AWS Cloud9</h2>
<p>用于编写\运行和调试代码的云IDE</p>
<h2 id="aws-codecommit" tabindex="-1"><a class="header-anchor" href="#aws-codecommit" aria-hidden="true">#</a> AWS CodeCommit</h2>
<ul>
<li>安全的\可扩展的\可管理的Git源代码管理</li>
<li>使用标准的Git工具</li>
</ul>
<h2 id="aws-codebuild" tabindex="-1"><a class="header-anchor" href="#aws-codebuild" aria-hidden="true">#</a> AWS CodeBuild</h2>
<ul>
<li>易于管库的编译源代码\运行测试和软件打包的构建服务</li>
<li>可持续扩展并同时处理多个构建</li>
<li>用户不用管理build服务器</li>
<li>按分钟付费,只为您使用的计算资源付费</li>
<li>通过CloudWatch事件监控构建</li>
</ul>
<blockquote>
<ul>
<li>每次构建都在新的容器运行,以保证一致的\不变的环境</li>
<li>每个官方的CodeBuild镜像都安装了Docker和AWS CLI</li>
<li>通过使用Docker镜像自定义环境</li>
</ul>
</blockquote>
<h2 id="aws-codedeploy" tabindex="-1"><a class="header-anchor" href="#aws-codedeploy" aria-hidden="true">#</a> AWS CodeDeploy</h2>
<ul>
<li>将代码自动部署到任何实体和lambda中</li>
<li>处理更新应用程序的福扎心</li>
<li>避免应用部署期间的停机时间</li>
<li>检测到事故自动回滚</li>
</ul>
<h2 id="code-pipeline" tabindex="-1"><a class="header-anchor" href="#code-pipeline" aria-hidden="true">#</a> Code Pipeline</h2>
<ol>
<li>EC2</li>
<li>容器</li>
<li>无服务Lambda</li>
</ol>
<h2 id="aws-codestar" tabindex="-1"><a class="header-anchor" href="#aws-codestar" aria-hidden="true">#</a> AWS CodeStar</h2>
<p>Preconfigured 持续交付工具链</p>
<h2 id="aws-codeguru" tabindex="-1"><a class="header-anchor" href="#aws-codeguru" aria-hidden="true">#</a> AWS CodeGuru</h2>
<blockquote>
<p>内置的代码审查和可操作并提供有用的建议-&gt;上线前检测并优化代码-&gt;轻松识别程序缺陷</p>
</blockquote>
<h2 id="eks" tabindex="-1"><a class="header-anchor" href="#eks" aria-hidden="true">#</a> EKS</h2>
<blockquote>
<p>Elastic Kubernetes Server</p>
</blockquote>
<h3 id="概览" tabindex="-1"><a class="header-anchor" href="#概览" aria-hidden="true">#</a> 概览</h3>
<p>全托管开源Kubernetes控制平台</p>
</div></template>


