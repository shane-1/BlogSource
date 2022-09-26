<template><div><h1 id="docker容器技术基础" tabindex="-1"><a class="header-anchor" href="#docker容器技术基础" aria-hidden="true">#</a> Docker容器技术基础</h1>
<h2 id="容器的概念" tabindex="-1"><a class="header-anchor" href="#容器的概念" aria-hidden="true">#</a> 容器的概念</h2>
<blockquote>
<p>“Build, ship, amd Run any App, Anywhere”</p>
<p>操作系统上一个特殊的进程</p>
</blockquote>
<h3 id="虚拟化原理" tabindex="-1"><a class="header-anchor" href="#虚拟化原理" aria-hidden="true">#</a> 虚拟化原理</h3>
<ul>
<li>
<p>虚拟机:存在于硬件层和操作系统层间的虚拟化技术。虚拟机通过&quot;伪造一个硬件抽象接口,将一个操作系统以及操作系统层以上的层嫁接到硬件上,实现和真实物理机几乎一样的功能。</p>
</li>
<li>
<p>容器：存在于操作系统层和函数库层之间的虚拟化技术。容器通过&quot;伪造&quot;操作系统的接口,将API抽象层,函数库层以上的功能置于操作系统上,以Docker为例,就是基于Linux操作系统的<code v-pre>Namespace</code>和<code v-pre>CGroup</code>功能实现的隔离容器,模拟操作系统的功能,因为它比虚拟机高了一层,也就需要少一层东西,所以容器占用资源少。</p>
<p><code v-pre>int pid = clone(main_function, stack_size,CLONE_NEMPID I SIGCHLD, NULL);</code></p>
</li>
<li>
<p>JVM:存在于函数库层和应用程序之间的虚拟化技术。Java虚拟机具有跨平台特性,所谓跨平台特性实际上就是虚拟化的功劳我们Java语言是调用操作系统函数库的,然而不同操作系统的函数库互不相同,JVM就是建立一个虚拟化层,对下通过不同的版本适应不同的操作系统,对上提供统一的运行环境交给程序和开发者。</p>
</li>
<li>
<p>恰到好处的隔离性</p>
<blockquote>
<p>可以把容器理解为虚机吗?</p>
<p>答:其实并不能,如果你非要这么理解,一定要先知道容器的优势与极限。更应该把容器理解为一个配置了多种启动参数的进程。</p>
</blockquote>
</li>
</ul>
<p><img src="/images/2020-09-22-13-52-33.png" alt=""></p>
<h3 id="容器的优势" tabindex="-1"><a class="header-anchor" href="#容器的优势" aria-hidden="true">#</a> 容器的优势</h3>
<ul>
<li>
<p>一致的运行环境: Docker的镜像提供了除内核外完整的运行时环境,确保了应用运行环境一致性,从而不会再出现&quot;这段代码在我机器上没问题啊&quot;这类问题。</p>
</li>
<li>
<p>更快速的启动时间:可以做到秒级、甚至毫秒级的启动时间。</p>
</li>
<li>
<p>大大的节约了开发、测试、部署的时间。隔离性:避免公用的服务器,资源会容易受到其他用户的影响。</p>
</li>
<li>
<p>弹性伸缩:善于处理集中爆发的服务器使用压力。</p>
</li>
<li>
<p>迁移方便:可以很轻易的将在一个平台上运行的应用,迁移到另一个平台上,而不用担心运行环境的变化导致应用无法正常运行的情况。</p>
</li>
<li>
<p>持续交付和部署:使用Docker可以通过定制应用镜像来实现持续集成、持续交付、部署。</p>
<blockquote>
<p>而正是以容器镜像统一应用发布格式这件事为起点</p>
</blockquote>
<blockquote>
<p>开发、测试、生产的应用运行环境被统一,从而方便了应用编译、发布的, CI CD、 DevOps乃至于微服务的技术因此得到发展。这甚至比讨论容器和虚拟机的性能差异更为重要,可以说是容器带给IT行业最大的改变。</p>
</blockquote>
</li>
</ul>
<h3 id="容器的劣势" tabindex="-1"><a class="header-anchor" href="#容器的劣势" aria-hidden="true">#</a> 容器的劣势</h3>
<ul>
<li>进程级的隔离:虽然容器本身使用了namespce,cgroup的方法做隔离和限制。但是在某些对Linux该特性支持不佳的应用上就会出问题。</li>
<li>容器网络:大部分容器网络基于虚拟网络、Snat、隧道技术实现。而这部分会导致不如传统的L2网络。</li>
<li>数据存储:基于挂载点实现的容器存储,如果需要用好容器,势必需要一个完善的共享存储系统。</li>
</ul>
<h2 id="docker的架构" tabindex="-1"><a class="header-anchor" href="#docker的架构" aria-hidden="true">#</a> Docker的架构</h2>
<h3 id="docker是什么" tabindex="-1"><a class="header-anchor" href="#docker是什么" aria-hidden="true">#</a> Docker是什么</h3>
<ul>
<li>Docker是一种Linux容器管理引擎</li>
<li>Docker是目前最火热的开源项目之一
<ul>
<li>Docker公司主导开发</li>
<li>遵循Apache License 2.0许可证协议</li>
<li>托管于GitHub</li>
<li>Go语言编写</li>
<li>适用于Linux. Windows, macOs</li>
</ul>
</li>
<li>Docker是一种实现打包、输送、运行任意应用的容器解决方案</li>
</ul>
<h3 id="架构图" tabindex="-1"><a class="header-anchor" href="#架构图" aria-hidden="true">#</a> 架构图</h3>
<p><img src="/images/2020-09-22-14-30-02.png" alt=""></p>
<blockquote>
<p>镜像是静态,容器是运行时的状态</p>
</blockquote>
<h3 id="docker-daemon" tabindex="-1"><a class="header-anchor" href="#docker-daemon" aria-hidden="true">#</a> Docker Daemon</h3>
<p>Docker Daemon是一个长期运行的程序,被用来监听Docker APl的请求</p>
<ul>
<li>管理Docker对象
<ul>
<li>镜像</li>
<li>容器</li>
<li>网络</li>
<li>存储卷</li>
</ul>
</li>
</ul>
<h3 id="docker-client" tabindex="-1"><a class="header-anchor" href="#docker-client" aria-hidden="true">#</a> Docker Client</h3>
<ul>
<li>Docker Client是用户与Docker交互的接口</li>
<li>将用户的命令发送给Docker Daemon</li>
<li>使用Docker API作为通信方式</li>
</ul>
<h3 id="docker-registry" tabindex="-1"><a class="header-anchor" href="#docker-registry" aria-hidden="true">#</a> Docker Registry</h3>
<ul>
<li>Docker Registry被用来存储Docker镜像</li>
<li>分为公有和私有两种
<ul>
<li>Docker Hub.</li>
<li>Docker Trusted Registry·</li>
</ul>
</li>
<li>当使用<code v-pre>docker pul</code>和<code v-pre>docker run</code>命令时,如果需要的镜像不存在,该镜像将会被从指定的Docker Registry上下载下来·</li>
<li>当使用<code v-pre>docker push</code>命令时,该镜像将会被上传至指定的Docker Registr</li>
<li>默认的Docker Registry为Docker Hub</li>
</ul>
<blockquote>
<p>不指定域名IP,默认拉取外网</p>
</blockquote>
<p>Harbor 镜像仓库</p>
<p><code v-pre>10.160.3.152/harbor/projects/1/repositories </code></p>
<h6 id="_9-6" tabindex="-1"><a class="header-anchor" href="#_9-6" aria-hidden="true">#</a> #9.6</h6>
<h3 id="docker-images" tabindex="-1"><a class="header-anchor" href="#docker-images" aria-hidden="true">#</a> Docker images</h3>
<ul>
<li>
<p>Docker镜像是用来创建Docker容器的模版</p>
</li>
<li>
<p>通常基于另一个镜像构建而成</p>
<p>(猜一猜最开始的镜像是怎么来的)</p>
</li>
<li>
<p>只读性</p>
</li>
<li>
<p>使用Dockerfile来定义镜像构建时的步骤</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># python基础镜像</span>
FROM python<span class="token punctuation">:</span><span class="token number">3.7</span><span class="token operator">-</span>alpine
<span class="token comment"># 环境变量</span>
ENV PATH<span class="token operator">=</span>$PATH<span class="token punctuation">:</span><span class="token operator">/</span>usr<span class="token operator">/</span>src<span class="token operator">/</span>app
<span class="token comment"># 工作目录</span>
WORKDIR <span class="token operator">/</span>usr<span class="token operator">/</span>src<span class="token operator">/</span>app
<span class="token comment">#copy本地文件到/go/src/app</span>
COPY <span class="token operator">/</span> <span class="token operator">/</span>usr<span class="token operator">/</span>src<span class="token operator">/</span>app<span class="token operator">/</span>
<span class="token comment">#暴露80端口</span>
EXPOSE <span class="token number">80</span>
<span class="token comment"># run app</span>
CMD <span class="token punctuation">[</span><span class="token string">"/usr/src/app/supervisord.sh"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="docker-containers" tabindex="-1"><a class="header-anchor" href="#docker-containers" aria-hidden="true">#</a> Docker CONTAINERS</h3>
<ul>
<li>
<p>Docker容器是Docker镜像的可运行实例·</p>
</li>
<li>
<p>使用Docker Client或Docker AP可以对Docker容器进行创建、运行、停止、删除等操作.</p>
</li>
<li>
<p>Docker容器可以被连接上一个或多个网络.</p>
</li>
<li>
<p>Docker容器可以被分配存储.</p>
</li>
<li>
<p>Docker容器的当前状态可以被用来创建新的镜像·</p>
</li>
<li>
<p>默认情况下,容器与容器之间、容器与宿主机之间是相对隔离的·</p>
<blockquote>
<p>(Namespace做隔离,CGroup做限制 )</p>
</blockquote>
</li>
<li>
<p>可以通过配置参数的方法来配置Docker容器的运行</p>
</li>
<li>
<p>当运行命令<code v-pre>docker run-i-t ubuntu /bin/bash</code>时,系统中会发生以下事件</p>
<ul>
<li>如果本地没有需要的镜像, Docker会从Docker Hub上下载镜像</li>
<li>Docker创建一个新的容器</li>
<li>Docker会给这个容器分配一个可读写层,所有对于已运行的容器的文件操作都会在这个可读写层上进行</li>
<li>Docker为容器创建网卡并将该容器连接到默认网络上,这一步包括为容器分配IP地址</li>
<li>Docker启动新创建出的容器并且运行&quot;/bin/bash&quot;,该容器是以可交互的方式运行并且被附加到当前Terminal上</li>
<li>当输入&quot;exit&quot;命令时, &quot;/bin/bash&quot;命令被终止,该容器被停止但并未被移除</li>
</ul>
</li>
</ul>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结:</h2>
<p>容器:一个容器,实际上是一个由Linux Namespace, Linux Cgroups和rootfs三种技术构建出来的进程的隔离环境。**类似java项目里,在lomcat中最后运行起来的war文件夹,可以对应到机器中的某个进程。**当然不谈底层原理,从实际使用角度来看容器,容器更类似Vmware和Openstack创建出的虚拟机。容器作为运行时状态,我们可以通过docker命令和API去控制和改变容器的状态,比如start, stop等等,甚至可以用Python, Go等语言很方便的进行调用。</p>
<p>镜像:容器镜像就是一个Linux的文件系统(Root FileSystem) ,这个文件系统里面包含可以运行在Linux内核的程序以及相应的数据。<strong>类似Java项目里, Maven打包出来的jar包、war包,可以对应到机器中的某个文件。</strong></p>
<p>​		从实际使用角度上来说,容器镜像更类似Vmware和Openstack都有镜像模版的概念,我们要衍生创建虚1拟机,就可以通过镜像模版来快速部署和生成相同类型的VM. Docker的image也是一个道理,通过不同类型的模版,比如redis镜像、nginx镜像来快速创建出容器。好比复制克隆,只要资源够,想生成多少就多少。并且生成出新的容器你可以使用,这时候你又可以打包成镜像。有了镜像这个功能,为生产提供了很好的打包、迭代、传递方式。</p>
<p>镜像仓库:**容器镜像仓库就是一个标准化管理容器镜像的仓库。**类似与lava项目中的Maven仓库。这各种镜像仓库中Docker Registry是Docker官方提供的开源私有镜像仓库,提供REST风格的API接口提供给用户去使用,鼓励做一些自动化或者二次开发的操作。后面的Habor等镜像仓库就是基于DockerRegistry的API开发的。VMware Harbor项目是由VMware中国研发团队开发的开源容器镜像仓库系统,基于Docker Registry并对其进行了许多增强,主要特性包括:基于角色的访问控制、镜像复制、Web Ul管理界面等。当然常用的Maven管理仓库Nexus,在V3版本上也支持了Dcoker镜像仓库。推荐使用的是Harbor镜像仓库。</p>
<h3 id="容器化中间件集群" tabindex="-1"><a class="header-anchor" href="#容器化中间件集群" aria-hidden="true">#</a> 容器化中间件集群</h3>
<p>Kubernetes Cluster</p>
<h2 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装" aria-hidden="true">#</a> Docker安装</h2>
<p>官网(centos):</p>
<p>https://docs.docker.com/engine/install/centos/</p>
<p>行内使用yum安装:</p>
<ol>
<li>修改yum源:</li>
</ol>
<p><code v-pre>wget-P /etc/yum.repos.d/ http://10.126.6.217/repo/last/docker-ce-el7/docker-ceel7.repo</code></p>
<p><code v-pre>yum clean all &amp;&amp; yum makecache</code></p>
<p><code v-pre>yum install-y docker-ce</code></p>
<h6 id="_6-9" tabindex="-1"><a class="header-anchor" href="#_6-9" aria-hidden="true">#</a> # 6.9</h6>
<ol start="2">
<li><code v-pre>docker version #查看docker版本,验证安装是否成功</code></li>
<li><code v-pre>systemctl status docker #查看docker服务端是否启动</code></li>
<li><code v-pre> systemctl start docker &amp;&amp; systemctl enable docker #启动docker并加入开机启动</code></li>
</ol>
<h2 id="docker常用运行命令" tabindex="-1"><a class="header-anchor" href="#docker常用运行命令" aria-hidden="true">#</a> Docker常用运行命令</h2>
<h3 id="帮助命令" tabindex="-1"><a class="header-anchor" href="#帮助命令" aria-hidden="true">#</a> 帮助命令</h3>
<p><code v-pre>docker 命令 --help</code>  查看docker命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> info <span class="token comment">#显示docker的系统信息</span>
<span class="token function">docker</span> version <span class="token comment">#显示docker的版本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="镜像命令" tabindex="-1"><a class="header-anchor" href="#镜像命令" aria-hidden="true">#</a> 镜像命令</h3>
<blockquote>
<p>Docker image CONNMAD</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#docker images</span>
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
docker/getting-started   latest              1f32459ef038        <span class="token number">3</span> months ago        <span class="token number">26</span>.8MB
hello-world              latest              bf756fb1ae65        <span class="token number">9</span> months ago        <span class="token number">13</span>.3kB
<span class="token comment">#解释</span>
REPOSITORY	镜像的仓库源
TAG			镜像的标签
IMAGE ID 	镜像的id
CREATED		创建的创建时间
SIZE		大小

<span class="token comment">#可选项</span>
 -a, <span class="token parameter variable">--all</span>             Show all images <span class="token punctuation">(</span>default hides intermediate images<span class="token punctuation">)</span>
      <span class="token parameter variable">--digests</span>         Show digests
  -f, <span class="token parameter variable">--filter</span> filter   Filter output based on conditions provided
      <span class="token parameter variable">--format</span> string   Pretty-print images using a Go template
      --no-trunc        Don't truncate output
  -q, <span class="token parameter variable">--quiet</span>           Only show numeric IDs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="搜索镜像" tabindex="-1"><a class="header-anchor" href="#搜索镜像" aria-hidden="true">#</a> 搜索镜像</h4>
<p><code v-pre>docker search</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>NAME                              DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
mysql                             MySQL is a widely used, open-source relation…   <span class="token number">10100</span>               <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
mariadb                           MariaDB is a community-developed fork of MyS…   <span class="token number">3705</span>                <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
mysql/mysql-server                Optimized MySQL Server Docker images. Create…   <span class="token number">738</span>                                     <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>

<span class="token comment">#可选项</span>
Options:
  -f, <span class="token parameter variable">--filter</span> filter   Filter output based on conditions provided
      <span class="token parameter variable">--format</span> string   Pretty-print search using a Go template
      <span class="token parameter variable">--limit</span> int       Max number of search results <span class="token punctuation">(</span>default <span class="token number">25</span><span class="token punctuation">)</span>
      --no-trunc        Don't truncate output
      
      <span class="token parameter variable">--filter</span><span class="token operator">=</span>STARS<span class="token operator">=</span><span class="token number">3000</span> <span class="token comment">#搜索收藏数大于3000的</span>
      
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="下载镜像" tabindex="-1"><a class="header-anchor" href="#下载镜像" aria-hidden="true">#</a> 下载镜像</h4>
<p><code v-pre>docker pull 镜像名[:tag]</code></p>
<blockquote>
<p>默认拉取最新版</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Options:
  -a, --all-tags                Download all tagged images <span class="token keyword">in</span> the repository
      --disable-content-trust   Skip image verification <span class="token punctuation">(</span>default <span class="token boolean">true</span><span class="token punctuation">)</span>
      <span class="token parameter variable">--platform</span> string         Set platform <span class="token keyword">if</span> server is multi-platform capable
  -q, <span class="token parameter variable">--quiet</span>                   Suppress verbose output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@Surface:/home/shane<span class="token comment"># docker pull mysql</span>
Using default tag: latest
latest: Pulling from library/mysql
bb79b6b2107f: Pull complete
49e22f6fb9f7: Pull complete
842b1255668c: Pull complete
9f48d1f43000: Pull complete
c693f0615bce: Pull complete
8a621b9dbed2: Pull complete
0807d32aef13: Pull complete
a56aca0feb17: Pull complete
de9d45fd0f07: Pull complete
1d68a49161cc: Pull complete
d16d318b774e: Pull complete
49e112c55976: Pull complete
Digest: sha256:8c17271df53ee3b843d6e16d46cff13f22c9c04d6982eb15a9a47bd5c9ac7e2d
Status: Downloaded newer image <span class="token keyword">for</span> mysql:latest
docker.io/library/mysql:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除镜像" tabindex="-1"><a class="header-anchor" href="#删除镜像" aria-hidden="true">#</a> 删除镜像</h4>
<p><code v-pre>docker rmi -f id</code></p>
<p>删除对应id镜像(多个使用空格分隔)</p>
<p><code v-pre>docker rmi -f $(docker images -aq)  </code></p>
<p>删除全部的容器</p>
<h4 id="查看镜像的元数据" tabindex="-1"><a class="header-anchor" href="#查看镜像的元数据" aria-hidden="true">#</a> 查看镜像的元数据</h4>
<p><code v-pre>docker inspect</code>查看镜像全部信息</p>
<p><code v-pre>docker inspect centos</code></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token property">"Id"</span><span class="token operator">:</span> <span class="token string">"sha256:0d120b6ccaa8c5e149176798b3501d4dd1885f961922497cd0abef155c869566"</span><span class="token punctuation">,</span>
        <span class="token property">"RepoTags"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">"centos:latest"</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">"RepoDigests"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">"centos@sha256:76d24f3ba3317fa945743bb3746fbaf3a0b752f10b10376960de01da70685fbd"</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">"Parent"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
        <span class="token property">"Comment"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
        <span class="token property">"Created"</span><span class="token operator">:</span> <span class="token string">"2020-08-10T18:19:49.837885498Z"</span><span class="token punctuation">,</span>
        <span class="token property">"Container"</span><span class="token operator">:</span> <span class="token string">"3b04ecd9fb2d3f921f12d858edf5f3a6aa7c36c8e1e6f74bd32555fd4d7f7da2"</span><span class="token punctuation">,</span>
        <span class="token property">"ContainerConfig"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Hostname"</span><span class="token operator">:</span> <span class="token string">"3b04ecd9fb2d"</span><span class="token punctuation">,</span>
            <span class="token property">"Domainname"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"User"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"AttachStdin"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"AttachStdout"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"AttachStderr"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Tty"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"OpenStdin"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"StdinOnce"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Env"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"Cmd"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"/bin/sh"</span><span class="token punctuation">,</span>
                <span class="token string">"-c"</span><span class="token punctuation">,</span>
                <span class="token string">"#(nop) "</span><span class="token punctuation">,</span>
                <span class="token string">"CMD [\"/bin/bash\"]"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"ArgsEscaped"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">"Image"</span><span class="token operator">:</span> <span class="token string">"sha256:69587a438b2c9b803db8ed4f6e6b5abce25a6b8ec2583a394807cf82bfd23693"</span><span class="token punctuation">,</span>
            <span class="token property">"Volumes"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"WorkingDir"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"Entrypoint"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"OnBuild"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"Labels"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"org.label-schema.build-date"</span><span class="token operator">:</span> <span class="token string">"20200809"</span><span class="token punctuation">,</span>
                <span class="token property">"org.label-schema.license"</span><span class="token operator">:</span> <span class="token string">"GPLv2"</span><span class="token punctuation">,</span>
                <span class="token property">"org.label-schema.name"</span><span class="token operator">:</span> <span class="token string">"CentOS Base Image"</span><span class="token punctuation">,</span>
                <span class="token property">"org.label-schema.schema-version"</span><span class="token operator">:</span> <span class="token string">"1.0"</span><span class="token punctuation">,</span>
                <span class="token property">"org.label-schema.vendor"</span><span class="token operator">:</span> <span class="token string">"CentOS"</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"DockerVersion"</span><span class="token operator">:</span> <span class="token string">"18.09.7"</span><span class="token punctuation">,</span>
        <span class="token property">"Author"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
        <span class="token property">"Config"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Hostname"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"Domainname"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"User"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"AttachStdin"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"AttachStdout"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"AttachStderr"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Tty"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"OpenStdin"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"StdinOnce"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
            <span class="token property">"Env"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"Cmd"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"/bin/bash"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"ArgsEscaped"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
            <span class="token property">"Image"</span><span class="token operator">:</span> <span class="token string">"sha256:69587a438b2c9b803db8ed4f6e6b5abce25a6b8ec2583a394807cf82bfd23693"</span><span class="token punctuation">,</span>
            <span class="token property">"Volumes"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"WorkingDir"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token property">"Entrypoint"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"OnBuild"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
            <span class="token property">"Labels"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"org.label-schema.build-date"</span><span class="token operator">:</span> <span class="token string">"20200809"</span><span class="token punctuation">,</span>
                <span class="token property">"org.label-schema.license"</span><span class="token operator">:</span> <span class="token string">"GPLv2"</span><span class="token punctuation">,</span>
                <span class="token property">"org.label-schema.name"</span><span class="token operator">:</span> <span class="token string">"CentOS Base Image"</span><span class="token punctuation">,</span>
                <span class="token property">"org.label-schema.schema-version"</span><span class="token operator">:</span> <span class="token string">"1.0"</span><span class="token punctuation">,</span>
                <span class="token property">"org.label-schema.vendor"</span><span class="token operator">:</span> <span class="token string">"CentOS"</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"Architecture"</span><span class="token operator">:</span> <span class="token string">"amd64"</span><span class="token punctuation">,</span>
        <span class="token property">"Os"</span><span class="token operator">:</span> <span class="token string">"linux"</span><span class="token punctuation">,</span>
        <span class="token property">"Size"</span><span class="token operator">:</span> <span class="token number">215102299</span><span class="token punctuation">,</span>
        <span class="token property">"VirtualSize"</span><span class="token operator">:</span> <span class="token number">215102299</span><span class="token punctuation">,</span>
        <span class="token property">"GraphDriver"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Data"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"MergedDir"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/overlay2/3b172334602338425b3b12a39ab86ed55ab8b118b9ad9f5efa3e576a3a052703/merged"</span><span class="token punctuation">,</span>
                <span class="token property">"UpperDir"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/overlay2/3b172334602338425b3b12a39ab86ed55ab8b118b9ad9f5efa3e576a3a052703/diff"</span><span class="token punctuation">,</span>
                <span class="token property">"WorkDir"</span><span class="token operator">:</span> <span class="token string">"/var/lib/docker/overlay2/3b172334602338425b3b12a39ab86ed55ab8b118b9ad9f5efa3e576a3a052703/work"</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token property">"Name"</span><span class="token operator">:</span> <span class="token string">"overlay2"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"RootFS"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"Type"</span><span class="token operator">:</span> <span class="token string">"layers"</span><span class="token punctuation">,</span>
            <span class="token property">"Layers"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"sha256:291f6e44771a7b4399b0c6fb40ab4fe0331ddf76eda11080f052b003d96c7726"</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">"Metadata"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"LastTagTime"</span><span class="token operator">:</span> <span class="token string">"0001-01-01T00:00:00Z"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h4>
<table>
<thead>
<tr>
<th style="text-align:center">指令</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ls</td>
<td style="text-align:center">列出镜像</td>
</tr>
<tr>
<td style="text-align:center">build</td>
<td style="text-align:center">构建一个镜像(Dockerfile)</td>
</tr>
<tr>
<td style="text-align:center">history</td>
<td style="text-align:center">显示镜像历史</td>
</tr>
<tr>
<td style="text-align:center">insepect</td>
<td style="text-align:center">显示镜像详情</td>
</tr>
<tr>
<td style="text-align:center">pull</td>
<td style="text-align:center">拉起一个镜像</td>
</tr>
<tr>
<td style="text-align:center">push</td>
<td style="text-align:center">推送一个镜像至镜像仓库</td>
</tr>
<tr>
<td style="text-align:center">rm</td>
<td style="text-align:center">删除一个镜像</td>
</tr>
<tr>
<td style="text-align:center">prune</td>
<td style="text-align:center">移去未使用镜像</td>
</tr>
<tr>
<td style="text-align:center">save</td>
<td style="text-align:center">保存了一个镜像或多个镜像至一个tar归档</td>
</tr>
<tr>
<td style="text-align:center">load</td>
<td style="text-align:center">从标准输入载入一个归档</td>
</tr>
<tr>
<td style="text-align:center">tag</td>
<td style="text-align:center">给一个镜像打一个tag</td>
</tr>
</tbody>
</table>
<h3 id="容器命令" tabindex="-1"><a class="header-anchor" href="#容器命令" aria-hidden="true">#</a> 容器命令</h3>
<blockquote>
<p>说明:我们有了镜像才可以创建容器,以centos为例</p>
</blockquote>
<h4 id="新建容器并启动" tabindex="-1"><a class="header-anchor" href="#新建容器并启动" aria-hidden="true">#</a> 新建容器并启动</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">[</span>可选参数<span class="token punctuation">]</span> image

<span class="token comment">#参数说明</span>
<span class="token parameter variable">--name</span><span class="token operator">=</span><span class="token string">"Name"</span> 容器名字
<span class="token parameter variable">-d</span>    		后台方式运行
<span class="token parameter variable">-it</span>			以交互方式运行,进入容器查看内容
<span class="token parameter variable">-p</span> 	端口号		指定容器的端口 
<span class="token parameter variable">-p</span> 主机端口:容器端口 主机映射端口
<span class="token parameter variable">-p</span> ip:主机端口:容器端口
<span class="token parameter variable">-p</span>	随机指定端口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试,启动并进入容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@Surface:/home/shane<span class="token comment"># docker run -it centos /bin/bash</span>
<span class="token punctuation">[</span>root@966f11ab42c9 /<span class="token punctuation">]</span><span class="token comment"># ls #查看容器内部的centos,基础版本,很多命令不完善</span>
bin  etc   lib    lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>exit</code>-从容器退回主机</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@966f11ab42c9 /<span class="token punctuation">]</span><span class="token comment"># exit</span>
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看运行的容器" tabindex="-1"><a class="header-anchor" href="#查看运行的容器" aria-hidden="true">#</a> 查看运行的容器</h4>
<p><code v-pre>docker ps</code>查看运行的容器</p>
<p><code v-pre>docker ps -a</code>查看所有运行的容器(包含历史)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@Surface:/home/shane<span class="token comment"># docker ps -a</span>
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                          PORTS                NAMES
966f11ab42c9        centos                   <span class="token string">"/bin/bash"</span>              <span class="token number">4</span> minutes ago       Exited <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> About a minute ago                        festive_williamson
fbf9b4271ea1        centos                   <span class="token string">"/bin/bash"</span>              <span class="token number">5</span> minutes ago       Exited <span class="token punctuation">(</span><span class="token number">127</span><span class="token punctuation">)</span> <span class="token number">4</span> minutes ago                           hopeful_edison
14df202a332b        hello-world              <span class="token string">"/hello"</span>                 <span class="token number">2</span> days ago          Exited <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token number">2</span> days ago                                gracious_kare
6011f47bd41b        docker/getting-started   <span class="token string">"/docker-entrypoint.…"</span>   <span class="token number">3</span> days ago          Exited <span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token number">6</span> hours ago        <span class="token number">0.0</span>.0.0:80-<span class="token operator">></span><span class="token number">80</span>/tcp   practical_vaughan

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>docker ps -n=?</code>显示最近创建的n个容器</p>
<p><code v-pre>docker ps -q</code> 只显示容器编号</p>
<h4 id="退出容器" tabindex="-1"><a class="header-anchor" href="#退出容器" aria-hidden="true">#</a> 退出容器</h4>
<p>exit 直接容器停止并退出</p>
<p>ctrl + P + Q 容器不停止退出</p>
<h4 id="删除容器" tabindex="-1"><a class="header-anchor" href="#删除容器" aria-hidden="true">#</a> 删除容器</h4>
<p><code v-pre>docker rm 容器 id</code> 删除指定容器</p>
<p><code v-pre>docker rm -f $(docker ps -aq)</code>轻质删除所有容器</p>
<p><code v-pre>docker ps -a -q|xargs docker rm </code>删除所有容器</p>
<h4 id="启动和停止容器的操作" tabindex="-1"><a class="header-anchor" href="#启动和停止容器的操作" aria-hidden="true">#</a> 启动和停止容器的操作</h4>
<p><code v-pre>docker start 容器id</code>启动容器</p>
<p><code v-pre>docker restart 容器id</code>重启容器</p>
<p><code v-pre>docker stop 容器id</code>停止当前正在运行的容器</p>
<p><code v-pre>docker kill 容器id</code>强制停止当前容器</p>
<h4 id="后台启动容器" tabindex="-1"><a class="header-anchor" href="#后台启动容器" aria-hidden="true">#</a> 后台启动容器</h4>
<p><code v-pre>docker run -d 镜像名</code></p>
<blockquote>
<p>docker run -d centos 发现停止了</p>
<p><strong>原因:</strong> docker容器后台启动,必须有一个前台进程</p>
</blockquote>
<h4 id="查看日志" tabindex="-1"><a class="header-anchor" href="#查看日志" aria-hidden="true">#</a> 查看日志</h4>
<p><code v-pre>docker logs -ft --tail n 容器id</code>查看n条日志</p>
<h4 id="查看进程" tabindex="-1"><a class="header-anchor" href="#查看进程" aria-hidden="true">#</a> 查看进程</h4>
<p><code v-pre>docker top 容器id</code> 查看指定id的进程</p>
<h4 id="进入容器" tabindex="-1"><a class="header-anchor" href="#进入容器" aria-hidden="true">#</a> 进入容器</h4>
<p><code v-pre>docker exec -it 容器id bashShell</code></p>
<p>进入容器后开启一个新的终端(可以操作)</p>
<p><code v-pre>docker attach 容器id</code></p>
<p>进入正在执行的终端,不会启动新的进程</p>
<h4 id="拷贝文件" tabindex="-1"><a class="header-anchor" href="#拷贝文件" aria-hidden="true">#</a> 拷贝文件</h4>
<p><code v-pre>docker cp 容器id:容器内路径 目的主机路径</code></p>
<blockquote>
<p>拷贝为手动实现,之后使用-v 卷的技术,可以实现同步</p>
</blockquote>
<h3 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>attach    Attach to a running container  <span class="token comment">#当前shell下attach连接指定运行镜像</span>
build     Build an image from a Dockerfile  <span class="token comment">#通过Dockerfile定制镜像</span>
commit    Create a new image from a container<span class="token string">'s changes  #提交当前容器为新的镜像
cp    Copy files/folders from a container to a HOSTDIR or to STDOUT  #从容器中拷贝指定文件或者目录到宿主机中
create    Create a new container  #创建一个新的容器，同run 但不启动容器
diff    Inspect changes on a container'</span>s filesystem  <span class="token comment">#查看docker容器变化</span>
events    Get real <span class="token function">time</span> events from the server<span class="token comment">#从docker服务获取容器实时事件</span>
<span class="token builtin class-name">exec</span>    Run a <span class="token builtin class-name">command</span> <span class="token keyword">in</span> a running container<span class="token comment">#在已存在的容器上运行命令</span>
<span class="token builtin class-name">export</span>    Export a container's filesystem as a <span class="token function">tar</span> archive  <span class="token comment">#导出容器的内容流作为一个tar归档文件(对应import)</span>
<span class="token function">history</span>    Show the <span class="token function">history</span> of an image  <span class="token comment">#展示一个镜像形成历史</span>
images    List images  <span class="token comment">#列出系统当前镜像</span>
<span class="token function">import</span>    Import the contents from a tarball to create a filesystem image  <span class="token comment">#从tar包中的内容创建一个新的文件系统映像(对应export)</span>
info    Display system-wide information  <span class="token comment">#显示系统相关信息</span>
inspect    Return low-level information on a container or image  <span class="token comment">#查看容器详细信息</span>
<span class="token function">kill</span>    Kill a running container  <span class="token comment">#kill指定docker容器</span>
load    Load an image from a <span class="token function">tar</span> archive or STDIN  <span class="token comment">#从一个tar包中加载一个镜像(对应save)</span>
login    Register or log <span class="token keyword">in</span> to a Docker registry<span class="token comment">#注册或者登陆一个docker源服务器</span>
<span class="token builtin class-name">logout</span>    Log out from a Docker registry  <span class="token comment">#从当前Docker registry退出</span>
logs    Fetch the logs of a container  <span class="token comment">#输出当前容器日志信息</span>
pause    Pause all processes within a container<span class="token comment">#暂停容器</span>
port    List port mappings or a specific mapping <span class="token keyword">for</span> the CONTAINER  <span class="token comment">#查看映射端口对应的容器内部源端口</span>
<span class="token function">ps</span>    List containers  <span class="token comment">#列出容器列表</span>
pull    Pull an image or a repository from a registry  <span class="token comment">#从docker镜像源服务器拉取指定镜像或者库镜像</span>
push    Push an image or a repository to a registry  <span class="token comment">#推送指定镜像或者库镜像至docker源服务器</span>
<span class="token function">rename</span>    Rename a container  <span class="token comment">#重命名容器</span>
restart    Restart a running container  <span class="token comment">#重启运行的容器</span>
<span class="token function">rm</span>    Remove one or <span class="token function">more</span> containers  <span class="token comment">#移除一个或者多个容器</span>
rmi    Remove one or <span class="token function">more</span> images  <span class="token comment">#移除一个或多个镜像(无容器使用该镜像才可以删除，否则需要删除相关容器才可以继续或者-f强制删除)</span>
run    Run a <span class="token builtin class-name">command</span> <span class="token keyword">in</span> a new container  <span class="token comment">#创建一个新的容器并运行一个命令</span>
save    Save an image<span class="token punctuation">(</span>s<span class="token punctuation">)</span> to a <span class="token function">tar</span> archive<span class="token comment">#保存一个镜像为一个tar包(对应load)</span>
search    Search the Docker Hub <span class="token keyword">for</span> images  <span class="token comment">#在docker</span>
hub中搜索镜像
start    Start one or <span class="token function">more</span> stopped containers<span class="token comment">#启动容器</span>
stats    Display a live stream of container<span class="token punctuation">(</span>s<span class="token punctuation">)</span> resource usage statistics  <span class="token comment">#统计容器使用资源</span>
stop    Stop a running container  <span class="token comment">#停止容器</span>
tag         Tag an image into a repository  <span class="token comment">#给源中镜像打标签</span>
<span class="token function">top</span>       Display the running processes of a container <span class="token comment">#查看容器中运行的进程信息</span>
unpause    Unpause all processes within a container  <span class="token comment">#取消暂停容器</span>
version    Show the Docker version information<span class="token comment">#查看容器版本号</span>
<span class="token function">wait</span>         Block <span class="token keyword">until</span> a container stops, <span class="token keyword">then</span> print its <span class="token builtin class-name">exit</span> code  <span class="token comment">#截取容器停止时的退出状态值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="学习资料" tabindex="-1"><a class="header-anchor" href="#学习资料" aria-hidden="true">#</a> 学习资料</h2>
<p><a href="https://edu.aliyun.com/roadmap/cloudnative" target="_blank" rel="noopener noreferrer">阿里云云原生技术公开课<ExternalLinkIcon/></a></p>
<p><a href="https://developer.aliyun.com/learning/roadmap/java?spm5176.13257455.1389354.1.4d347facxfoasc" target="_blank" rel="noopener noreferrer">阿里巴巴lava学习公开课<ExternalLinkIcon/></a></p>
<p><a href="https://developer.aliyun.com/topic/ebook?spm-a2c6h.14946804J2600602170.1.d5co5od5E5Bqch" target="_blank" rel="noopener noreferrer">阿里系电子书<ExternalLinkIcon/></a></p>
<blockquote>
<p>强烈推荐: 《深入浅出Kubernetes》 、《阿里巴巴经济体云原生实践》 、《阿里巴巴云原生实践15讲》</p>
</blockquote>
<p><a href="https://www.infog.cn/topic/cloud-computing" target="_blank" rel="noopener noreferrer">Info0迷你书<ExternalLinkIcon/></a></p>
<blockquote>
<p>强烈推荐: 《架构师特刊: Kubernetes Paas冲击波》 、《架构师(2020年4月) 》</p>
</blockquote>
<h2 id="镜像的分层" tabindex="-1"><a class="header-anchor" href="#镜像的分层" aria-hidden="true">#</a> 镜像的分层</h2>
<p>共享资源</p>
<h2 id="copyonwrite" tabindex="-1"><a class="header-anchor" href="#copyonwrite" aria-hidden="true">#</a> CopyonWrite</h2>
<p>容器保存变化的部分,不会对本身进行修改</p>
<h2 id="构建镜像" tabindex="-1"><a class="header-anchor" href="#构建镜像" aria-hidden="true">#</a> 构建镜像</h2>
<ol>
<li>启动一个容器</li>
<li>修改容器</li>
<li>开启另一个终端</li>
<li>查看本地镜像</li>
</ol>
<h2 id="特别提醒" tabindex="-1"><a class="header-anchor" href="#特别提醒" aria-hidden="true">#</a> <strong>特别提醒</strong></h2>
<p><strong>文章已做脱敏处理,部分代码可能无法正常运行</strong></p>
<hr>
<p>整理不易，转载请注明出处。</p>
</div></template>


