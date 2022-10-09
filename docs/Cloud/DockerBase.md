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
+ 容器网络:大部分容器网络基于虚拟网络、Snat、隧道技术实现。而这部分会导致不如传统的L2网络。
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

## Docker安装

官网(centos):

https://docs.docker.com/engine/install/centos/

行内使用yum安装:

1. 修改yum源:

`wget-P /etc/yum.repos.d/ http://10.126.6.217/repo/last/docker-ce-el7/docker-ceel7.repo`

`yum clean all && yum makecache`

`yum install-y docker-ce`

###### # 6.9

2. `docker version #查看docker版本,验证安装是否成功`
3. `systemctl status docker #查看docker服务端是否启动`
4. ` systemctl start docker && systemctl enable docker #启动docker并加入开机启动`

## Docker常用运行命令

### 帮助命令

`docker 命令 --help`  查看docker命令

```shell
docker info #显示docker的系统信息
docker version #显示docker的版本
```



### 镜像命令

> Docker image CONNMAD

```shell
#docker images
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
docker/getting-started   latest              1f32459ef038        3 months ago        26.8MB
hello-world              latest              bf756fb1ae65        9 months ago        13.3kB
#解释
REPOSITORY	镜像的仓库源
TAG			镜像的标签
IMAGE ID 	镜像的id
CREATED		创建的创建时间
SIZE		大小

#可选项
 -a, --all             Show all images (default hides intermediate images)
      --digests         Show digests
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print images using a Go template
      --no-trunc        Don't truncate output
  -q, --quiet           Only show numeric IDs
```

#### 搜索镜像

`docker search`

```shell
NAME                              DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
mysql                             MySQL is a widely used, open-source relation…   10100               [OK]
mariadb                           MariaDB is a community-developed fork of MyS…   3705                [OK]
mysql/mysql-server                Optimized MySQL Server Docker images. Create…   738                                     [OK]

#可选项
Options:
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print search using a Go template
      --limit int       Max number of search results (default 25)
      --no-trunc        Don't truncate output
      
      --filter=STARS=3000 #搜索收藏数大于3000的
      
```



#### 下载镜像

`docker pull 镜像名[:tag]`

> 默认拉取最新版

```shell
Options:
  -a, --all-tags                Download all tagged images in the repository
      --disable-content-trust   Skip image verification (default true)
      --platform string         Set platform if server is multi-platform capable
  -q, --quiet                   Suppress verbose output
```

```shell
root@Surface:/home/shane# docker pull mysql
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
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest
```



#### 删除镜像

`docker rmi -f id`

删除对应id镜像(多个使用空格分隔)

`docker rmi -f $(docker images -aq)  `

删除全部的容器

#### 查看镜像的元数据

`docker inspect`查看镜像全部信息

`docker inspect centos`

```json
[
    {
        "Id": "sha256:0d120b6ccaa8c5e149176798b3501d4dd1885f961922497cd0abef155c869566",
        "RepoTags": [
            "centos:latest"
        ],
        "RepoDigests": [
            "centos@sha256:76d24f3ba3317fa945743bb3746fbaf3a0b752f10b10376960de01da70685fbd"
        ],
        "Parent": "",
        "Comment": "",
        "Created": "2020-08-10T18:19:49.837885498Z",
        "Container": "3b04ecd9fb2d3f921f12d858edf5f3a6aa7c36c8e1e6f74bd32555fd4d7f7da2",
        "ContainerConfig": {
            "Hostname": "3b04ecd9fb2d",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "#(nop) ",
                "CMD [\"/bin/bash\"]"
            ],
            "ArgsEscaped": true,
            "Image": "sha256:69587a438b2c9b803db8ed4f6e6b5abce25a6b8ec2583a394807cf82bfd23693",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.label-schema.build-date": "20200809",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "DockerVersion": "18.09.7",
        "Author": "",
        "Config": {
            "Hostname": "",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/bash"
            ],
            "ArgsEscaped": true,
            "Image": "sha256:69587a438b2c9b803db8ed4f6e6b5abce25a6b8ec2583a394807cf82bfd23693",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.label-schema.build-date": "20200809",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 215102299,
        "VirtualSize": 215102299,
        "GraphDriver": {
            "Data": {
                "MergedDir": "/var/lib/docker/overlay2/3b172334602338425b3b12a39ab86ed55ab8b118b9ad9f5efa3e576a3a052703/merged",
                "UpperDir": "/var/lib/docker/overlay2/3b172334602338425b3b12a39ab86ed55ab8b118b9ad9f5efa3e576a3a052703/diff",
                "WorkDir": "/var/lib/docker/overlay2/3b172334602338425b3b12a39ab86ed55ab8b118b9ad9f5efa3e576a3a052703/work"
            },
            "Name": "overlay2"
        },
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:291f6e44771a7b4399b0c6fb40ab4fe0331ddf76eda11080f052b003d96c7726"
            ]
        },
        "Metadata": {
            "LastTagTime": "0001-01-01T00:00:00Z"
        }
    }
]
```



#### 其他

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



### 容器命令

> 说明:我们有了镜像才可以创建容器,以centos为例

#### 新建容器并启动

```shell
docker run [可选参数] image

#参数说明
--name="Name" 容器名字
-d    		后台方式运行
-it			以交互方式运行,进入容器查看内容
-p 	端口号		指定容器的端口 
-p 主机端口:容器端口 主机映射端口
-p ip:主机端口:容器端口
-p	随机指定端口
```

测试,启动并进入容器

```shell
root@Surface:/home/shane# docker run -it centos /bin/bash
[root@966f11ab42c9 /]# ls #查看容器内部的centos,基础版本,很多命令不完善
bin  etc   lib    lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr
```

`exit`-从容器退回主机

```shell
[root@966f11ab42c9 /]# exit
exit
```

#### 查看运行的容器

`docker ps`查看运行的容器

`docker ps -a`查看所有运行的容器(包含历史)

```shell
root@Surface:/home/shane# docker ps -a
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                          PORTS                NAMES
966f11ab42c9        centos                   "/bin/bash"              4 minutes ago       Exited (0) About a minute ago                        festive_williamson
fbf9b4271ea1        centos                   "/bin/bash"              5 minutes ago       Exited (127) 4 minutes ago                           hopeful_edison
14df202a332b        hello-world              "/hello"                 2 days ago          Exited (0) 2 days ago                                gracious_kare
6011f47bd41b        docker/getting-started   "/docker-entrypoint.…"   3 days ago          Exited (255) 6 hours ago        0.0.0.0:80->80/tcp   practical_vaughan

```

`docker ps -n=?`显示最近创建的n个容器

`docker ps -q` 只显示容器编号

#### 退出容器

exit 直接容器停止并退出

ctrl + P + Q 容器不停止退出

#### 删除容器

`docker rm 容器 id` 删除指定容器

`docker rm -f $(docker ps -aq)`轻质删除所有容器

`docker ps -a -q|xargs docker rm `删除所有容器

#### 启动和停止容器的操作

`docker start 容器id`启动容器

`docker restart 容器id`重启容器

`docker stop 容器id`停止当前正在运行的容器

`docker kill 容器id`强制停止当前容器



#### 后台启动容器

`docker run -d 镜像名`

> docker run -d centos 发现停止了
>
> **原因:** docker容器后台启动,必须有一个前台进程

#### 查看日志

`docker logs -ft --tail n 容器id`查看n条日志

#### 查看进程

`docker top 容器id` 查看指定id的进程

#### 进入容器

`docker exec -it 容器id bashShell`

进入容器后开启一个新的终端(可以操作)

`docker attach 容器id`

进入正在执行的终端,不会启动新的进程

#### 拷贝文件

`docker cp 容器id:容器内路径 目的主机路径`

> 拷贝为手动实现,之后使用-v 卷的技术,可以实现同步

### 小结

```shell
attach    Attach to a running container  #当前shell下attach连接指定运行镜像
build     Build an image from a Dockerfile  #通过Dockerfile定制镜像
commit    Create a new image from a container's changes  #提交当前容器为新的镜像
cp    Copy files/folders from a container to a HOSTDIR or to STDOUT  #从容器中拷贝指定文件或者目录到宿主机中
create    Create a new container  #创建一个新的容器，同run 但不启动容器
diff    Inspect changes on a container's filesystem  #查看docker容器变化
events    Get real time events from the server#从docker服务获取容器实时事件
exec    Run a command in a running container#在已存在的容器上运行命令
export    Export a container's filesystem as a tar archive  #导出容器的内容流作为一个tar归档文件(对应import)
history    Show the history of an image  #展示一个镜像形成历史
images    List images  #列出系统当前镜像
import    Import the contents from a tarball to create a filesystem image  #从tar包中的内容创建一个新的文件系统映像(对应export)
info    Display system-wide information  #显示系统相关信息
inspect    Return low-level information on a container or image  #查看容器详细信息
kill    Kill a running container  #kill指定docker容器
load    Load an image from a tar archive or STDIN  #从一个tar包中加载一个镜像(对应save)
login    Register or log in to a Docker registry#注册或者登陆一个docker源服务器
logout    Log out from a Docker registry  #从当前Docker registry退出
logs    Fetch the logs of a container  #输出当前容器日志信息
pause    Pause all processes within a container#暂停容器
port    List port mappings or a specific mapping for the CONTAINER  #查看映射端口对应的容器内部源端口
ps    List containers  #列出容器列表
pull    Pull an image or a repository from a registry  #从docker镜像源服务器拉取指定镜像或者库镜像
push    Push an image or a repository to a registry  #推送指定镜像或者库镜像至docker源服务器
rename    Rename a container  #重命名容器
restart    Restart a running container  #重启运行的容器
rm    Remove one or more containers  #移除一个或者多个容器
rmi    Remove one or more images  #移除一个或多个镜像(无容器使用该镜像才可以删除，否则需要删除相关容器才可以继续或者-f强制删除)
run    Run a command in a new container  #创建一个新的容器并运行一个命令
save    Save an image(s) to a tar archive#保存一个镜像为一个tar包(对应load)
search    Search the Docker Hub for images  #在docker
hub中搜索镜像
start    Start one or more stopped containers#启动容器
stats    Display a live stream of container(s) resource usage statistics  #统计容器使用资源
stop    Stop a running container  #停止容器
tag         Tag an image into a repository  #给源中镜像打标签
top       Display the running processes of a container #查看容器中运行的进程信息
unpause    Unpause all processes within a container  #取消暂停容器
version    Show the Docker version information#查看容器版本号
wait         Block until a container stops, then print its exit code  #截取容器停止时的退出状态值
```



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
