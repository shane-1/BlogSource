#  Docker容器技术基础

## 容器的概念 

> “Build, ship, amd Run any App, Anywhere”
>
> 操作系统上一个特殊的进程

###   虚拟化原理

+ 虚拟机:存在于硬件层和操作系统层间的虚拟化技术。虚拟机通过"伪造一个硬件抽象接口,将一个操作系统以及操作系统层以上的层嫁接到硬件上,实现和真实物理机几乎一样的功能。

+ 容器：存在于操作系统层和函数库层之间的虚拟化技术。容器通过"伪造"操作系统的接口,将API抽象层,函数库层以上的功能置于操作系统上,以Docker为例,就是基于Linux操作系统的`Namespace`和`CGroup`功能实现的隔离容器,模拟操作系统的功能,因为它比虚拟机高了一层,也就需要少一层东西,所以容器占用资源少。

  ```int pid = clone(main_function, stack_size,CLONE_NEMPID I SIGCHLD, NULL);```

+ JVM:存在于函数库层和应用程序之间的虚拟化技术。Java虚拟机具有跨平台特性,所谓跨平台特性实际上就是虚拟化的功劳我们Java语言是调用操作系统函数库的,然而不同操作系统的函数库互不相同,JVM就是建立一个虚拟化层,对下通过不同的版本适应不同的操作系统,对上提供统一的运行环境交给程序和开发者。

+ 恰到好处的隔离性

  > 可以把容器理解为虚机吗?
  >
  > 答:其实并不能,如果你非要这么理解,一定要先知道容器的优势与极限。更应该把容器理解为一个配置了多种启动参数的进程。

![](/images/2020-09-22-13-52-33.png)

### 容器的优势

- 一致的运行环境: Docker的镜像提供了除内核外完整的运行时环境,确保了应用运行环境一致性,从而不会再出现"这段代码在我机器上没问题啊"这类问题。

- 更快速的启动时间:可以做到秒级、甚至毫秒级的启动时间。

- 大大的节约了开发、测试、部署的时间。隔离性:避免公用的服务器,资源会容易受到其他用户的影响。

- 弹性伸缩:善于处理集中爆发的服务器使用压力。

- 迁移方便:可以很轻易的将在一个平台上运行的应用,迁移到另一个平台上,而不用担心运行环境的变化导致应用无法正常运行的情况。

- 持续交付和部署:使用Docker可以通过定制应用镜像来实现持续集成、持续交付、部署。

  > 而正是以容器镜像统一应用发布格式这件事为起点

  > 开发、测试、生产的应用运行环境被统一,从而方便了应用编译、发布的, CI CD、 DevOps乃至于微服务的技术因此得到发展。这甚至比讨论容器和虚拟机的性能差异更为重要,可以说是容器带给IT行业最大的改变。

### 容器的劣势

+ 进程级的隔离:虽然容器本身使用了namespce,cgroup的方法做隔离和限制。但是在某些对Linux该特性支持不佳的应用上就会出问题。
+ 容器网 络:大部分容器网络基于虚拟网络、Snat、隧道技术实现。而这部分会导致不如传统的L2网络。
+ 数据存储:基于挂载点实现的容器存储,如果需要用好容器,势必需要一个完善的共享存储系统。

## Docker的架构

### Docker是什么

+ Docker是一种Linux容器管理引擎
+ Docker是目前最火热的开源项目之一
  + Docker公司主导开发
  + 遵循Apache License 2.0许可证协议
  + 托管于GitHub
  + Go语言编写
  + 适用于Linux. Windows, macOs
+ Docker是一种实现打包、输送、运行任意应用的容器解决方案

### 架构图

![](/images/2020-09-22-14-30-02.png)

> 镜像是静态,容器是运行时的状态

### Docker Daemon

 Docker Daemon是一个长期运行的程序,被用来监听Docker APl的请求

+ 管理Docker对象
  + 镜像
  + 容器
  + 网络
  + 存储卷

### Docker Client 

+ Docker Client是用户与Docker交互的接口
+ 将用户的命令发送给Docker Daemon
+ 使用Docker API作为通信方式

### Docker Registry

+ Docker Registry被用来存储Docker镜像
+ 分为公有和私有两种
  + Docker Hub.
  +  Docker Trusted Registry·
+ 当使用`docker pul`和`docker run`命令时,如果需要的镜像不存在,该镜像将会被从指定的Docker Registry上下载下来·
+ 当使用`docker push`命令时,该镜像将会被上传至指定的Docker Registr
+ 默认的Docker Registry为Docker Hub

> 不指定域名IP,默认拉取外网

Harbor 镜像仓库

`10.160.3.152/harbor/projects/1/repositories `

###### #9.6

### Docker images 

+ Docker镜像是用来创建Docker容器的模版

+ 通常基于另一个镜像构建而成

  (猜一猜最开始的镜像是怎么来的)

+ 只读性

+ 使用Dockerfile来定义镜像构建时的步骤

  ```python
  # python基础镜像
  FROM python:3.7-alpine
  # 环境变量
  ENV PATH=$PATH:/usr/src/app
  # 工作目录
  WORKDIR /usr/src/app
  #copy本地文件到/go/src/app
  COPY / /usr/src/app/
  #暴露80端口
  EXPOSE 80
  # run app
  CMD ["/usr/src/app/supervisord.sh"]
  ```

  ### Docker CONTAINERS

  - Docker容器是Docker镜像的可运行实例·

  - 使用Docker Client或Docker AP可以对Docker容器进行创建、运行、停止、删除等操作.

  - Docker容器可以被连接上一个或多个网络.

  - Docker容器可以被分配存储.

  - Docker容器的当前状态可以被用来创建新的镜像·

  - 默认情况下,容器与容器之间、容器与宿主机之间是相对隔离的·

    > (Namespace做隔离,CGroup做限制 )

  - 可以通过配置参数的方法来配置Docker容器的运行

  - 当运行命令`docker run-i-t ubuntu /bin/bash`时,系统中会发生以下事件

    - 如果本地没有需要的镜像, Docker会从Docker Hub上下载镜像
    - Docker创建一个新的容器
    - Docker会给这个容器分配一个可读写层,所有对于已运行的容器的文件操作都会在这个可读写层上进行
    - Docker为容器创建网卡并将该容器连接到默认网络上,这一步包括为容器分配IP地址
    - Docker启动新创建出的容器并且运行"/bin/bash",该容器是以可交互的方式运行并且被附加到当前Terminal上
    - 当输入"exit"命令时, "/bin/bash"命令被终止,该容器被停止但并未被移除

## 小结:

容器:一个容器,实际上是一个由Linux Namespace, Linux Cgroups和rootfs三种技术构建出来的进程的隔离环境。**类似java项目里,在lomcat中最后运行起来的war文件夹,可以对应到机器中的某个进程。**当然不谈底层原理,从实际使用角度来看容器,容器更类似Vmware和Openstack创建出的虚拟机。容器作为运行时状态,我们可以通过docker命令和API去控制和改变容器的状态,比如start, stop等等,甚至可以用Python, Go等语言很方便的进行调用。

镜像:容器镜像就是一个Linux的文件系统(Root FileSystem) ,这个文件系统里面包含可以运行在Linux内核的程序以及相应的数据。**类似Java项目里, Maven打包出来的jar包、war包,可以对应到机器中的某个文件。**

​		从实际使用角度上来说,容器镜像更类似Vmware和Openstack都有镜像模版的概念,我们要衍生创建虚1拟机,就可以通过镜像模版来快速部署和生成相同类型的VM. Docker的image也是一个道理,通过不同类型的模版,比如redis镜像、nginx镜像来快速创建出容器。好比复制克隆,只要资源够,想生成多少就多少。并且生成出新的容器你可以使用,这时候你又可以打包成镜像。有了镜像这个功能,为生产提供了很好的打包、迭代、传递方式。

镜像仓库:**容器镜像仓库就是一个标准化管理容器镜像的仓库。**类似与lava项目中的Maven仓库。这各种镜像仓库中Docker Registry是Docker官方提供的开源私有镜像仓库,提供REST风格的API接口提供给用户去使用,鼓励做一些自动化或者二次开发的操作。后面的Habor等镜像仓库就是基于DockerRegistry的API开发的。VMware Harbor项目是由VMware中国研发团队开发的开源容器镜像仓库系统,基于Docker Registry并对其进行了许多增强,主要特性包括:基于角色的访问控制、镜像复制、Web Ul管理界面等。当然常用的Maven管理仓库Nexus,在V3版本上也支持了Dcoker镜像仓库。推荐使用的是Harbor镜像仓库。

### 容器化中间件集群

Kubernetes Cluster

### Docker安装

官网:

https://docs.docker.com/install/linux/docker-ce/centos/

行内使用yum安装:

1. 修改yum源:

`wget-P /etc/yum.repos.d/ http://10.126.6.217/repo/last/docker-ce-el7/docker-ceel7.repo`

`yum clean all && yum makecache`

`yum install-y docker-ce`

###### # 6.9

2. `docker version #查看docker版本,验证安装是否成功`
3. `systemctl status docker #查看docker服务端是否启动`
4. ` systemctl start docker && systemctl enable docker #启动docker并加入开机启动`

### Docker常用运行命令

docker help  查看docker命令

管理镜像常用命令:

 docker image CONNMAD

|   指令   |                 描述                  |
| :------: | :-----------------------------------: |
|    ls    |               列出镜像                |
|  build   |       构建一个镜像(Dockerfile)        |
| history  |             显示镜像历史              |
| insepect |             显示镜像详情              |
|   pull   |             拉起一个镜像              |
|   push   |        推送一个镜像至镜像仓库         |
|    rm    |             删除一个镜像              |
|  prune   |            移去未使用镜像             |
|   save   | 保存了一个镜像或多个镜像至一个tar归档 |
|   load   |        从标准输入载入一个归档         |
|   tag    |          给一个镜像打一个tag          |

## 学习资料

[阿里云云原生技术公开课](https://edu.aliyun.com/roadmap/cloudnative)

[阿里巴巴lava学习公开课](https://developer.aliyun.com/learning/roadmap/java?spm5176.13257455.1389354.1.4d347facxfoasc)

[阿里系电子书](https://developer.aliyun.com/topic/ebook?spm-a2c6h.14946804J2600602170.1.d5co5od5E5Bqch)

>强烈推荐: 《深入浅出Kubernetes》 、《阿里巴巴经济体云原生实践》 、《阿里巴巴云原生实践15讲》

[Info0迷你书](https://www.infog.cn/topic/cloud-computing)

>强烈推荐: 《架构师特刊: Kubernetes Paas冲击波》 、《架构师(2020年4月) 》

## 镜像的分层

共享资源

## CopyonWrite

容器保存变化的部分,不会对本身进行修改

## 构建镜像

1. 启动一个容器
2. 修改容器
3. 开启另一个终端
4. 查看本地镜像




## **特别提醒**

**文章已做脱敏处理,部分代码可能无法正常运行**


---

整理不易，转载请注明出处。