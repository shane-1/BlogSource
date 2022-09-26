<template><div><h1 id="在k8s上部署redis-集群" tabindex="-1"><a class="header-anchor" href="#在k8s上部署redis-集群" aria-hidden="true">#</a> 在K8s上部署Redis 集群</h1>
<p>转载自<a href="https://blog.csdn.net/zhutongcloud/article/details/90768390" target="_blank" rel="noopener noreferrer">朱溪红的博客<ExternalLinkIcon/></a></p>
<h2 id="一、前言" tabindex="-1"><a class="header-anchor" href="#一、前言" aria-hidden="true">#</a> 一、前言</h2>
<p>架构原理：每个Master都可以拥有多个Slave。当Master下线后，Redis集群会从多个Slave中选举出一个新的Master作为替代，而旧Master重新上线后变成新Master的Slave。</p>
<h2 id="二、准备操作" tabindex="-1"><a class="header-anchor" href="#二、准备操作" aria-hidden="true">#</a> 二、准备操作</h2>
<p>本次部署主要基于该项目：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>https://github.com/zuxqoj/kubernetes-redis-cluster
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其包含了两种部署Redis集群的方式：</p>
<ul>
<li>StatefulSet</li>
<li>Service&amp;Deployment</li>
</ul>
<p>两种方式各有优劣，对于像Redis、Mongodb、Zookeeper等有状态的服务，使用StatefulSet是首选方式。本文将主要介绍如何使用StatefulSet进行Redis集群的部署。</p>
<h2 id="三、statefulset简介" tabindex="-1"><a class="header-anchor" href="#三、statefulset简介" aria-hidden="true">#</a> 三、StatefulSet简介</h2>
<p>RC、Deployment、DaemonSet都是面向无状态的服务，它们所管理的Pod的IP、名字，启停顺序等都是随机的，而StatefulSet是什么？顾名思义，有状态的集合，管理所有有状态的服务，比如MySQL、MongoDB集群等。
StatefulSet本质上是Deployment的一种变体，在v1.9版本中已成为GA版本，它为了解决有状态服务的问题，它所管理的Pod拥有固定的Pod名称，启停顺序，在StatefulSet中，Pod名字称为网络标识(hostname)，还必须要用到共享存储。
<strong>在Deployment中，与之对应的服务是service，而在StatefulSet中与之对应的headless service，headless service，即无头服务，与service的区别就是它没有Cluster IP，解析它的名称时将返回该Headless Service对应的全部Pod的Endpoint列表。</strong>
除此之外，StatefulSet在Headless Service的基础上又为StatefulSet控制的每个Pod副本创建了一个DNS域名，这个域名的格式为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$(podname).(headless server name)   
FQDN： $(podname).(headless server name).namespace.svc.cluster.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也即是说，对于有状态服务，我们最好使用固定的网络标识（如域名信息）来标记节点，当然这也需要应用程序的支持（如Zookeeper就支持在配置文件中写入主机域名）。
StatefulSet基于Headless Service（即没有Cluster IP的Service）为Pod实现了稳定的网络标志（包括Pod的hostname和DNS Records），在Pod重新调度后也保持不变。同时，结合PV/PVC，StatefulSet可以实现稳定的持久化存储，就算Pod重新调度后，还是能访问到原先的持久化数据。
以下为使用StatefulSet部署Redis的架构，无论是Master还是Slave，都作为StatefulSet的一个副本，并且数据通过PV进行持久化，对外暴露为一个Service，接受客户端请求。</p>
<h2 id="四、部署过程" tabindex="-1"><a class="header-anchor" href="#四、部署过程" aria-hidden="true">#</a> 四、部署过程</h2>
<p>本文参考项目的README中，简要介绍了基于StatefulSet的Redis创建步骤：</p>
<ol>
<li>创建NFS存储</li>
<li>创建PV</li>
<li>创建PVC</li>
<li>创建Configmap</li>
<li>创建headless服务</li>
<li>创建Redis StatefulSet</li>
<li>初始化Redis集群</li>
</ol>
<p>这里，我将参考如上步骤，实践操作并详细介绍Redis集群的部署过程。文中会涉及到很多K8S的概念，希望大家能提前了解学习</p>
<h3 id="_1-创建nfs存储" tabindex="-1"><a class="header-anchor" href="#_1-创建nfs存储" aria-hidden="true">#</a> 1. 创建NFS存储</h3>
<p>创建NFS存储主要是为了给Redis提供稳定的后端存储，当Redis的Pod重启或迁移后，依然能获得原先的数据。这里，我们先要创建NFS，然后通过使用PV为Redis挂载一个远程的NFS路径。</p>
<p><strong>安装NFS</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nfs-utils（主包提供文件系统）
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> rpcbind（提供rpc协议）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，新增/etc/exports文件，用于设置需要共享的路径：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ftp pv3<span class="token punctuation">]</span><span class="token comment"># cat /etc/exports</span>
/usr/local/k8s/redis/pv1 <span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv2 <span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv3 <span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv4 <span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv5 <span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv6 <span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>rw,sync,no_root_squash<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/images/2020-11-18-14-42-51.png" alt=""></p>
<p>创建相应目录</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@ftp quizii]# mkdir -p /usr/local/k8s/redis/pv{1..6}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着，启动NFS和rpcbind服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart rpcbind
systemctl restart nfs
systemctl <span class="token builtin class-name">enable</span> nfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ftp pv3<span class="token punctuation">]</span><span class="token comment"># exportfs -v</span>
/usr/local/k8s/redis/pv1
	<span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>sync,wdelay,hide,no_subtree_check,sec<span class="token operator">=</span>sys,rw,secure,no_root_squash,no_all_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv2
	<span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>sync,wdelay,hide,no_subtree_check,sec<span class="token operator">=</span>sys,rw,secure,no_root_squash,no_all_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv3
	<span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>sync,wdelay,hide,no_subtree_check,sec<span class="token operator">=</span>sys,rw,secure,no_root_squash,no_all_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv4
	<span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>sync,wdelay,hide,no_subtree_check,sec<span class="token operator">=</span>sys,rw,secure,no_root_squash,no_all_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv5
	<span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>sync,wdelay,hide,no_subtree_check,sec<span class="token operator">=</span>sys,rw,secure,no_root_squash,no_all_squash<span class="token punctuation">)</span>
/usr/local/k8s/redis/pv6
	<span class="token number">192.168</span>.0.0/24<span class="token punctuation">(</span>sync,wdelay,hide,no_subtree_check,sec<span class="token operator">=</span>sys,rw,secure,no_root_squash,no_all_squash<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nfs-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看存储端共享</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@node2 ~<span class="token punctuation">]</span><span class="token comment"># showmount -e 192.168.0.222</span>
Export list <span class="token keyword">for</span> <span class="token number">192.168</span>.0.222:
/usr/local/k8s/redis/pv6 <span class="token number">192.168</span>.0.0/24
/usr/local/k8s/redis/pv5 <span class="token number">192.168</span>.0.0/24
/usr/local/k8s/redis/pv4 <span class="token number">192.168</span>.0.0/24
/usr/local/k8s/redis/pv3 <span class="token number">192.168</span>.0.0/24
/usr/local/k8s/redis/pv2 <span class="token number">192.168</span>.0.0/24
/usr/local/k8s/redis/pv1 <span class="token number">192.168</span>.0.0/24
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建PV</strong>
每一个Redis Pod都需要一个独立的PV来存储自己的数据，因此可以创建一个pv.yaml文件，包含6个PV：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># cat pv.yaml </span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>pv1
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 200M
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.0.222
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"/usr/local/k8s/redis/pv1"</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>vp2
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 200M
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.0.222
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"/usr/local/k8s/redis/pv2"</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>pv3
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 200M
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.0.222
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"/usr/local/k8s/redis/pv3"</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>pv4
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 200M
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.0.222
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"/usr/local/k8s/redis/pv4"</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>pv5
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 200M
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.0.222
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"/usr/local/k8s/redis/pv5"</span>

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>pv6
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 200M
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.0.222
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"/usr/local/k8s/redis/pv6"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上，可以看到所有PV除了名称和挂载的路径外都基本一致。执行创建即可：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment">#kubectl create -f pv.yaml </span>
persistentvolume <span class="token string">"nfs-pv1"</span> created
persistentvolume <span class="token string">"nfs-pv2"</span> created
persistentvolume <span class="token string">"nfs-pv3"</span> created
persistentvolume <span class="token string">"nfs-pv4"</span> created
persistentvolume <span class="token string">"nfs-pv5"</span> created
persistentvolume <span class="token string">"nfs-pv6"</span> created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-创建configmap" tabindex="-1"><a class="header-anchor" href="#_2-创建configmap" aria-hidden="true">#</a> 2.创建Configmap</h3>
<p>这里，我们可以直接将Redis的配置文件转化为Configmap，这是一种更方便的配置读取方式。配置文件redis.conf如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># cat redis.conf </span>
appendonly <span class="token function">yes</span>
cluster-enabled <span class="token function">yes</span>
cluster-config-file /var/lib/redis/nodes.conf
cluster-node-timeout <span class="token number">5000</span>
<span class="token function">dir</span> /var/lib/redis
port <span class="token number">6379</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建名为redis-conf的Configmap：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create configmap redis-conf --from-file<span class="token operator">=</span>redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看创建的configmap:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># kubectl describe cm redis-conf</span>
Name:         redis-conf
Namespace:    default
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">></span>
Annotations:  <span class="token operator">&lt;</span>none<span class="token operator">></span>

Data
<span class="token operator">==</span><span class="token operator">==</span>
redis.conf:
----
appendonly <span class="token function">yes</span>
cluster-enabled <span class="token function">yes</span>
cluster-config-file /var/lib/redis/nodes.conf
cluster-node-timeout <span class="token number">5000</span>
<span class="token function">dir</span> /var/lib/redis
port <span class="token number">6379</span>

Events:  <span class="token operator">&lt;</span>none<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上，redis.conf中的所有配置项都保存到redis-conf这个Configmap中。</p>
<h3 id="_3-创建headless-service" tabindex="-1"><a class="header-anchor" href="#_3-创建headless-service" aria-hidden="true">#</a> 3.创建Headless service</h3>
<p>Headless service是StatefulSet实现稳定网络标识的基础，我们需要提前创建。准备文件headless-service.yml如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># cat headless-service.yaml </span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>service
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>port
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">appCluster</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>cluster

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> headless-service.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看：
<img src="/images/2020-11-18-15-17-05.png" alt=""></p>
<p>可以看到，服务名称为redis-service，其CLUSTER-IP为None，表示这是一个“无头”服务。</p>
<h3 id="_4-创建redis-集群节点" tabindex="-1"><a class="header-anchor" href="#_4-创建redis-集群节点" aria-hidden="true">#</a> 4.创建Redis 集群节点</h3>
<p>创建好Headless service后，就可以利用StatefulSet创建Redis 集群节点，这也是本文的核心内容。我们先创建redis.yml文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># cat redis.yaml </span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>app
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> <span class="token string">"redis-service"</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">6</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
        <span class="token key atrule">appCluster</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>cluster
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
        <span class="token key atrule">podAntiAffinity</span><span class="token punctuation">:</span>
          <span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">100</span>
            <span class="token key atrule">podAffinityTerm</span><span class="token punctuation">:</span>
              <span class="token key atrule">labelSelector</span><span class="token punctuation">:</span>
                <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> app
                  <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                  <span class="token key atrule">values</span><span class="token punctuation">:</span>
                  <span class="token punctuation">-</span> redis
              <span class="token key atrule">topologyKey</span><span class="token punctuation">:</span> kubernetes.io/hostname
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
        <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
        <span class="token key atrule">command</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">"redis-server"</span>
        <span class="token key atrule">args</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token string">"/etc/redis/redis.conf"</span>
          <span class="token punctuation">-</span> <span class="token string">"--protected-mode"</span>
          <span class="token punctuation">-</span> <span class="token string">"no"</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">"100m"</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> <span class="token string">"100Mi"</span>
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">6379</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> <span class="token string">"TCP"</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">16379</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> <span class="token string">"TCP"</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">"redis-conf"</span>
            <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> <span class="token string">"/etc/redis"</span>
          <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">"redis-data"</span>
            <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> <span class="token string">"/var/lib/redis"</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">"redis-conf"</span>
        <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">"redis-conf"</span>
          <span class="token key atrule">items</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token string">"redis.conf"</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"redis.conf"</span>
  <span class="token key atrule">volumeClaimTemplates</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>data
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">"ReadWriteMany"</span> <span class="token punctuation">]</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">requests</span><span class="token punctuation">:</span>
          <span class="token key atrule">storage</span><span class="token punctuation">:</span> 200M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上，总共创建了6个Redis节点(Pod)，其中3个将用于master，另外3个分别作为master的slave；Redis的配置通过volume将之前生成的redis-conf这个Configmap，挂载到了容器的/etc/redis/redis.conf；Redis的数据存储路径使用volumeClaimTemplates声明（也就是PVC），其会绑定到我们先前创建的PV上。
这里有一个关键概念——Affinity，请参考官方文档详细了解。其中，podAntiAffinity表示反亲和性，其决定了某个pod不可以和哪些Pod部署在同一拓扑域，可以用于将一个服务的POD分散在不同的主机或者拓扑域中，提高服务本身的稳定性。
而PreferredDuringSchedulingIgnoredDuringExecution 则表示，在调度期间尽量满足亲和性或者反亲和性规则，如果不能满足规则，POD也有可能被调度到对应的主机上。在之后的运行过程中，系统不会再检查这些规则是否满足。
在这里，matchExpressions规定了Redis Pod要尽量不要调度到包含app为redis的Node上，也即是说已经存在Redis的Node上尽量不要再分配Redis Pod了。但是，由于我们只有三个Node，而副本有6个，因此根据PreferredDuringSchedulingIgnoredDuringExecution，这些豌豆不得不得挤一挤，挤挤更健康~
另外，根据StatefulSet的规则，我们生成的Redis的6个Pod的hostname会被依次命名为 <code v-pre>$(statefulset名称)-$(序号)</code> 如下图所示：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># kubectl get pods -o wide </span>
NAME                                            READY     STATUS      RESTARTS   AGE       IP             NODE            NOMINATED NODE
redis-app-0                                     <span class="token number">1</span>/1       Running     <span class="token number">0</span>          2h        <span class="token number">172.17</span>.24.3    <span class="token number">192.168</span>.0.144   <span class="token operator">&lt;</span>none<span class="token operator">></span>
redis-app-1                                     <span class="token number">1</span>/1       Running     <span class="token number">0</span>          2h        <span class="token number">172.17</span>.63.8    <span class="token number">192.168</span>.0.148   <span class="token operator">&lt;</span>none<span class="token operator">></span>
redis-app-2                                     <span class="token number">1</span>/1       Running     <span class="token number">0</span>          2h        <span class="token number">172.17</span>.24.8    <span class="token number">192.168</span>.0.144   <span class="token operator">&lt;</span>none<span class="token operator">></span>
redis-app-3                                     <span class="token number">1</span>/1       Running     <span class="token number">0</span>          2h        <span class="token number">172.17</span>.63.9    <span class="token number">192.168</span>.0.148   <span class="token operator">&lt;</span>none<span class="token operator">></span>
redis-app-4                                     <span class="token number">1</span>/1       Running     <span class="token number">0</span>          2h        <span class="token number">172.17</span>.24.9    <span class="token number">192.168</span>.0.144   <span class="token operator">&lt;</span>none<span class="token operator">></span>
redis-app-5                                     <span class="token number">1</span>/1       Running     <span class="token number">0</span>          2h        <span class="token number">172.17</span>.63.10   <span class="token number">192.168</span>.0.148   <span class="token operator">&lt;</span>none<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上，可以看到这些Pods在部署时是以{0…N-1}的顺序依次创建的。注意，直到redis-app-0状态启动后达到Running状态之后，redis-app-1 才开始启动。
同时，每个Pod都会得到集群内的一个DNS域名，格式为<code v-pre>$(podname).$(service name).$(namespace).svc.cluster.local</code> ，也即是：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>redis-app-0.redis-service.default.svc.cluster.local
redis-app-1.redis-service.default.svc.cluster.local
...以此类推...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在K8S集群内部，这些Pod就可以利用该域名互相通信。我们可以使用busybox镜像的nslookup检验这些域名：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># kubectl exec -ti busybox -- nslookup redis-app-0.redis-service</span>
Server:    <span class="token number">10.0</span>.0.2
Address <span class="token number">1</span>: <span class="token number">10.0</span>.0.2 kube-dns.kube-system.svc.cluster.local

Name:      redis-app-0.redis-service
Address <span class="token number">1</span>: <span class="token number">172.17</span>.24.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可以看到， redis-app-0的IP为172.17.24.3。*当然，若Redis Pod迁移或是重启（我们可以手动删除掉一个Redis Pod来测试），IP是会改变的*，但是Pod的域名、SRV records、A record都不会改变。</strong></p>
<p>另外可以发现，我们之前创建的pv都被成功绑定了：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># kubectl get pv</span>
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                            STORAGECLASS   REASON    AGE
nfs-pv1   200M       RWX            Retain           Bound     default/redis-data-redis-app-2                            3h
nfs-pv3   200M       RWX            Retain           Bound     default/redis-data-redis-app-4                            3h
nfs-pv4   200M       RWX            Retain           Bound     default/redis-data-redis-app-5                            3h
nfs-pv5   200M       RWX            Retain           Bound     default/redis-data-redis-app-1                            3h
nfs-pv6   200M       RWX            Retain           Bound     default/redis-data-redis-app-0                            3h
nfs-vp2   200M       RWX            Retain           Bound     default/redis-data-redis-app-3                            3h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-初始化redis集群" tabindex="-1"><a class="header-anchor" href="#_5-初始化redis集群" aria-hidden="true">#</a> 5.初始化Redis集群</h3>
<p>创建好6个Redis Pod后，我们还需要利用常用的Redis-tribe工具进行集群的初始化</p>
<p><strong>创建Ubuntu容器</strong>
由于Redis集群必须在所有节点启动后才能进行初始化，而如果将初始化逻辑写入Statefulset中，则是一件非常复杂而且低效的行为。这里，本人不得不称赞一下原项目作者的思路，值得学习。也就是说，我们可以在K8S上创建一个额外的容器，专门用于进行K8S集群内部某些服务的管理控制。
这里，我们专门启动一个Ubuntu的容器，可以在该容器中安装Redis-tribe，进而初始化Redis集群，执行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl run <span class="token parameter variable">-it</span> ubuntu <span class="token parameter variable">--image</span><span class="token operator">=</span>ubuntu <span class="token parameter variable">--restart</span><span class="token operator">=</span>Never /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们使用阿里云的Ubuntu源，执行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/<span class="token comment"># cat > /etc/apt/sources.list &lt;&lt; EOF</span>
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
 
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
<span class="token operator">></span> EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>成功后，原项目要求执行如下命令安装基本的软件环境：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">vim</span> <span class="token function">wget</span> python2.7 python-pip redis-tools dnsutils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化集群
首先，我们需要安装<code v-pre>redis-trib</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> redis-trib<span class="token operator">==</span><span class="token number">0.5</span>.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，创建只有Master节点的集群：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>redis-trib.py create <span class="token punctuation">\</span>
  <span class="token variable"><span class="token variable">`</span><span class="token function">dig</span> +short redis-app-0.redis-service.default.svc.cluster.local<span class="token variable">`</span></span>:6379 <span class="token punctuation">\</span>
  <span class="token variable"><span class="token variable">`</span><span class="token function">dig</span> +short redis-app-1.redis-service.default.svc.cluster.local<span class="token variable">`</span></span>:6379 <span class="token punctuation">\</span>
  <span class="token variable"><span class="token variable">`</span><span class="token function">dig</span> +short redis-app-2.redis-service.default.svc.cluster.local<span class="token variable">`</span></span>:6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，为每个Master添加Slave</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>redis-trib.py replicate <span class="token punctuation">\</span>
  --master-addr <span class="token variable"><span class="token variable">`</span><span class="token function">dig</span> +short redis-app-0.redis-service.default.svc.cluster.local<span class="token variable">`</span></span>:6379 <span class="token punctuation">\</span>
  --slave-addr <span class="token variable"><span class="token variable">`</span><span class="token function">dig</span> +short redis-app-3.redis-service.default.svc.cluster.local<span class="token variable">`</span></span>:6379

redis-trib.py replicate <span class="token punctuation">\</span>
  --master-addr <span class="token variable"><span class="token variable">`</span><span class="token function">dig</span> +short redis-app-1.redis-service.default.svc.cluster.local<span class="token variable">`</span></span>:6379 <span class="token punctuation">\</span>
  --slave-addr <span class="token variable"><span class="token variable">`</span><span class="token function">dig</span> +short redis-app-4.redis-service.default.svc.cluster.local<span class="token variable">`</span></span>:6379

redis-trib.py replicate <span class="token punctuation">\</span>
  --master-addr <span class="token variable"><span class="token variable">`</span><span class="token function">dig</span> +short redis-app-2.redis-service.default.svc.cluster.local<span class="token variable">`</span></span>:6379 <span class="token punctuation">\</span>
  --slave-addr <span class="token variable"><span class="token variable">`</span><span class="token function">dig</span> +short redis-app-5.redis-service.default.svc.cluster.local<span class="token variable">`</span></span>:6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，我们的Redis集群就真正创建完毕了，连到任意一个Redis Pod中检验一下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># kubectl exec -it redis-app-2 /bin/bash</span>
root@redis-app-2:/data<span class="token comment"># /usr/local/bin/redis-cli -c</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> cluster nodes
5d3e77f6131c6f272576530b23d1cd7592942eec <span class="token number">172.17</span>.24.3:6379@16379 master - <span class="token number">0</span> <span class="token number">1559628533000</span> <span class="token number">1</span> connected <span class="token number">0</span>-5461
a4b529c40a920da314c6c93d17dc603625d6412c <span class="token number">172.17</span>.63.10:6379@16379 master - <span class="token number">0</span> <span class="token number">1559628531670</span> <span class="token number">6</span> connected <span class="token number">10923</span>-16383
368971dc8916611a86577a8726e4f1f3a69c5eb7 <span class="token number">172.17</span>.24.9:6379@16379 slave 0025e6140f85cb243c60c214467b7e77bf819ae3 <span class="token number">0</span> <span class="token number">1559628533672</span> <span class="token number">4</span> connected
0025e6140f85cb243c60c214467b7e77bf819ae3 <span class="token number">172.17</span>.63.8:6379@16379 master - <span class="token number">0</span> <span class="token number">1559628533000</span> <span class="token number">2</span> connected <span class="token number">5462</span>-10922
6d5ee94b78b279e7d3c77a55437695662e8c039e <span class="token number">172.17</span>.24.8:6379@16379 myself,slave a4b529c40a920da314c6c93d17dc603625d6412c <span class="token number">0</span> <span class="token number">1559628532000</span> <span class="token number">5</span> connected
2eb3e06ce914e0e285d6284c4df32573e318bc01 <span class="token number">172.17</span>.63.9:6379@16379 slave 5d3e77f6131c6f272576530b23d1cd7592942eec <span class="token number">0</span> <span class="token number">1559628533000</span> <span class="token number">3</span> connected
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> cluster info
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:6
cluster_stats_messages_ping_sent:14910
cluster_stats_messages_pong_sent:15139
cluster_stats_messages_sent:30049
cluster_stats_messages_ping_received:15139
cluster_stats_messages_pong_received:14910
cluster_stats_messages_received:30049
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，还可以在NFS上查看Redis挂载的数据：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ftp pv3<span class="token punctuation">]</span><span class="token comment"># ll /usr/local/k8s/redis/pv3</span>
total <span class="token number">12</span>
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">92</span> Jun  <span class="token number">4</span> <span class="token number">11</span>:36 appendonly.aof
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">175</span> Jun  <span class="token number">4</span> <span class="token number">11</span>:36 dump.rdb
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">794</span> Jun  <span class="token number">4</span> <span class="token number">11</span>:49 nodes.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-创建用于访问service" tabindex="-1"><a class="header-anchor" href="#_6-创建用于访问service" aria-hidden="true">#</a> 6.创建用于访问Service</h3>
<p>前面我们创建了用于实现StatefulSet的Headless Service，但该Service没有Cluster Ip，因此不能用于外界访问。所以，我们还需要创建一个Service，专用于为Redis集群提供访问和负载均衡：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># cat redis-access-service.yaml </span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>access<span class="token punctuation">-</span>service
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>port
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> <span class="token string">"TCP"</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">6379</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">appCluster</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>cluster

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上，该Service名称为 <code v-pre>redis-access-service</code>，在K8S集群中暴露6379端口，并且会对<code v-pre>labels name</code>为<code v-pre>app: redis</code>或<code v-pre>appCluster: redis-cluster</code>的pod进行负载均衡。</p>
<p>创建后查看：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment">#  kubectl get svc redis-access-service -o wide</span>
NAME                   TYPE        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE       SELECTOR
redis-access-service   ClusterIP   <span class="token number">10.0</span>.0.64    <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">6379</span>/TCP   2h        <span class="token assign-left variable">app</span><span class="token operator">=</span>redis,appCluster<span class="token operator">=</span>redis-cluster
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上，在K8S集群中，所有应用都可以通过<code v-pre>10.0.0.64 :6379</code>来访问Redis集群。当然，为了方便测试，我们也可以为Service添加一个NodePort映射到物理机上，这里不再详细介绍。</p>
<h2 id="五、测试主从切换" tabindex="-1"><a class="header-anchor" href="#五、测试主从切换" aria-hidden="true">#</a> 五、测试主从切换</h2>
<p>在K8S上搭建完好Redis集群后，我们最关心的就是其原有的高可用机制是否正常。这里，我们可以任意挑选一个Master的Pod来测试集群的主从切换机制，如<code v-pre>redis-app-0</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># kubectl get pods redis-app-0 -o wide</span>
NAME          READY     STATUS    RESTARTS   AGE       IP            NODE            NOMINATED NODE
redis-app-1   <span class="token number">1</span>/1       Running   <span class="token number">0</span>          3h        <span class="token number">172.17</span>.24.3   <span class="token number">192.168</span>.0.144   <span class="token operator">&lt;</span>none<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入<code v-pre>redis-app-0</code>查看：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># kubectl exec -it redis-app-0 /bin/bash</span>
root@redis-app-0:/data<span class="token comment"># /usr/local/bin/redis-cli -c</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> role
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"master"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">13370</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"172.17.63.9"</span>
      <span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"6379"</span>
      <span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"13370"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上可以看到，<code v-pre>app-0</code>为master，slave为<code v-pre>172.17.63.9</code>即<code v-pre>redis-app-3</code>。</p>
<p>接着，我们手动删除<code v-pre>redis-app-0</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># kubectl delete pod redis-app-0</span>
pod <span class="token string">"redis-app-0"</span> deleted
<span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment">#  kubectl get pod redis-app-0 -o wide</span>
NAME          READY     STATUS    RESTARTS   AGE       IP            NODE            NOMINATED NODE
redis-app-0   <span class="token number">1</span>/1       Running   <span class="token number">0</span>          4m        <span class="token number">172.17</span>.24.3   <span class="token number">192.168</span>.0.144   <span class="token operator">&lt;</span>none<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再进入<code v-pre>redis-app-0</code>内部查看：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@master redis<span class="token punctuation">]</span><span class="token comment"># kubectl exec -it redis-app-0 /bin/bash</span>
root@redis-app-0:/data<span class="token comment"># /usr/local/bin/redis-cli -c</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> role
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"slave"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"172.17.63.9"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">6379</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"connected"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">13958</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上，<code v-pre>redis-app-0</code>变成了slave，从属于它之前的从节点<code v-pre>172.17.63.9</code>即<code v-pre>redis-app-3</code>。</p>
<h2 id="六、疑问" tabindex="-1"><a class="header-anchor" href="#六、疑问" aria-hidden="true">#</a> 六、疑问</h2>
<p>至此，大家可能会疑惑，那为什么没有使用稳定的标志，Redis Pod也能正常进行故障转移呢？这涉及了Redis本身的机制。因为，Redis集群中每个节点都有自己的NodeId（保存在自动生成的nodes.conf中），并且该NodeId不会随着IP的变化和变化，这其实也是一种固定的网络标志。也就是说，就算某个Redis Pod重启了，该Pod依然会加载保存的NodeId来维持自己的身份。我们可以在NFS上查看redis-app-1的nodes.conf文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-node2 ~<span class="token punctuation">]</span><span class="token comment"># cat /usr/local/k8s/redis/pv1/nodes.conf </span>
96689f2018089173e528d3a71c4ef10af68ee462 <span class="token number">192.168</span>.169.209:6379@16379 slave d884c4971de9748f99b10d14678d864187a9e5d3 <span class="token number">0</span> <span class="token number">1526460952651</span> <span class="token number">4</span> connected237d46046d9b75a6822f02523ab894928e2300e6 <span class="token number">192.168</span>.169.200:6379@16379 slave c15f378a604ee5b200f06cc23e9371cbc04f4559 <span class="token number">0</span> <span class="token number">1526460952651</span> <span class="token number">1</span> connected
c15f378a604ee5b200f06cc23e9371cbc04f4559 <span class="token number">192.168</span>.169.197:6379@16379 master - <span class="token number">0</span> <span class="token number">1526460952651</span> <span class="token number">1</span> connected <span class="token number">10923</span>-16383d884c4971de9748f99b10d14678d864187a9e5d3 <span class="token number">192.168</span>.169.205:6379@16379 master - <span class="token number">0</span> <span class="token number">1526460952651</span> <span class="token number">4</span> connected <span class="token number">5462</span>-10922c3b4ae23c80ffe31b7b34ef29dd6f8d73beaf85f <span class="token number">192.168</span>.169.198:6379@16379 myself,slave c8a8f70b4c29333de6039c47b2f3453ed11fb5c2 <span class="token number">0</span> <span class="token number">1526460952565</span> <span class="token number">3</span> connected
c8a8f70b4c29333de6039c47b2f3453ed11fb5c2 <span class="token number">192.168</span>.169.201:6379@16379 master - <span class="token number">0</span> <span class="token number">1526460952651</span> <span class="token number">6</span> connected <span class="token number">0</span>-5461vars currentEpoch <span class="token number">6</span> lastVoteEpoch <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上，第一列为NodeId，稳定不变；第二列为IP和端口信息，可能会改变。</p>
<p>这里，我们介绍NodeId的两种使用场景：</p>
<p>当某个Slave Pod断线重连后IP改变，但是Master发现其NodeId依旧， 就认为该Slave还是之前的Slave。</p>
<p>当某个Master Pod下线后，集群在其Slave中选举重新的Master。待旧Master上线后，集群发现其NodeId依旧，会让旧Master变成新Master的slave。</p>
<p>对于这两种场景，大家有兴趣的话还可以自行测试，注意要观察Redis的日志。</p>
</div></template>


