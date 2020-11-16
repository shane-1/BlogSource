# Redis

## NoSQL概述

### 为什么要用NoSQL

> 大数据时代,传统SQL不满足需求

#### 单机MySQL的年代

![](/images/2020-11-16-09-47-24.png)   

**90s:**

- 一个基本的网站的访问量一般不会太大,单机够用
- 静态网页\服务器压力小

**网站瓶颈:**

- 数据量太大,一个机器放不下!

- 数据的索引(B+Tree),一个机器内存放不下

- 访问量(读写混合),一个服务器也放不下

  > 出现以上任一情况,都需要升级

#### Memcached(缓存) + MySQL + 垂直拆分(读写分离)

网站80%的情况都是在读,每次都要去查询数据库的话就十分的麻烦!所以说我们希望减轻数据的压力,我们可以使用缓存来保证效率!

**发展过程:**

优化数据结构和索引	-->	文件缓存(IO)	-->	Memcached

![](/images/2020-11-16-09-59-59.png)

#### 分库分表  + 水平拆分 + MySQL集群

技术和业务发展的同时,对人的要求越来越高!

**<u>本质:数据库(读\写)</u>**

早年MyISAM: 表锁,十分影响效率!高并发下就会出现严重的锁问题

转战Innodb:行锁

慢慢的就开始使用分库分表来解决写的压力!MySQL在那个年代推出了<u>表分区</u>!这个并没有多少公司使用!

MySQL的集群,很好满足了那个年代的需求!

![](/images/2020-11-16-10-05-59.png)

#### 当今

MySQL等关系型数据库就不够用了!数据量很多,变化很快~!

MySQL有点使用它来存储比较大的文件(图片\博客)!数据库表很大,效率就低了!如果有一种数据库来专门处理这种数据.

MySQL的压力就变得十分小(研究处理这些问题!)大数据的IO压力下,表集合没法更大!

![](/images/2020-11-16-10-20-13.png)

#### 总结

- 用户的个人信息,社交网络,地理位置.用户自己产生的数据,用户日志等爆发式增长!
- 这时候我们就需要使用NoSQL数据库,NoSQL能很好处理以上情况!

### 什么是NoSQL

> NoSQL = Not Only SQL

关系型数据库: 表格, 行, 列 (OPI)

泛指非关系数据库的,随着web2.0互联网的诞生!传统的关系型数据库很难对付web2.0时代!尤其是超大规模的高并发的社区!暴露出很多难以克服的问题,NoSQL在当今大数据环境下发展得十分迅速,Redis是发展最快的,而且是我们当下必须要掌握的技术!

很多的数据类型用户的个人信息,社交网络,地理位置.这些数据类型的储存不需要一个固定的格式!不需要多月的操作就可以横向扩展的!Map<String,Obeject>使用键值对来控制的!

### NoSQL特点

解耦

1. 方便扩展(数据之间没有关系,很好扩展!)

2. 大数据量高性能(Redis一秒写8万次,读取11万,NoSQL的缓存记录级,是一种细粒度的缓存,性能会比较高!)

3. 数据类型是多样性的!(不需要事先设计数据库!随取随用!如果是数据量十分大的表,很多人就无法设计了!)

4. 传统RDBMS和NoSQL

   ```
   传统的RDBMS
   - 结构化组织
   - 数据和关系都存在单独的表中
   - 数据操作 数据定义语言
   - 严格的一致性
   - 基础的事务
   - ...
   ```

   ```
   NoSQL
   - 不仅仅是数据
   - 没有固定的查询语言
   - 键值对存储, 列存储, 文档存储, 图形数据库(社交关系)
   - 最终一致性
   - CAP定理和BASE (异地多活)初级架构
   - 高性能, 高可用, 高扩展 
   - ...
   ```

### 了解: 3V+3高

大数据时代的3V: 主要是描述问题的

1. Volume 海量
2. Variety 多样
3. Velocity 实时

大数据时代的3高: 主要是对程序的要求

1. 高并发
2. 高可拓(随时水平拆分,弹性伸缩)
3. 高性能

真正的公司实践: NoSQL + RDBMS一起使用才是最强的

## 阿里巴巴的架构演进

**敏捷开发 + 极限编程**

![](/images/2020-11-16-12-10-45.png)
![](/images/2020-11-16-12-11-33.png)

没有什么是加一层解决不了了

```
# 1. 商品的基本信息
名称、价格、商家信息
关系型数据库就可以解决了!MySQL/ Oracle(淘宝早年就去IOE了!-王坚-推荐文章:阿里云的这群疯子)
淘宝内部的 MySQL不是大家用的MySQL
# 2. 商品的描述、评论(文字比较多)
	文档型数据库中,MongoDB
# 3. 图片
分布式文件系统 FastDFS
- 淘宝 TFS
- Google GFS
- Hadop HDFS
- 阿里云 oss
# 4. 商品的关键字(搜索)
- 搜索引擎 solr elasticsearch
- ISerach 多隆
# 5. 商品热门的波段信息
- 内存数据库
- Redis Tair Memache...
# 6. 商品的交易\外部的制服接口
- 三方应用
```

一个简单的网页背后的技术一定不简单

### 大型互联网的问题:

- 数据类型太多了
- 数据源繁多,经常重构
- 数据要改造,大面积改造

### 解决方案

![](/images/2020-11-16-13-28-19.png)

![](/images/2020-11-16-13-29-42.png)

## NoSQL的四大分类

### KV键值对:

- 新浪: Redis
- 美图: Redis + Tair
- 阿里\百度: Redis + memecache

### 文档型数据库(bson格式和json一样):

- MongoDB(一般必须要掌握)
  - MongoDB是一个基于分布式文件储存的数据库,C++编写,主要用来处理大量的文档!
  - MongoDB是一样介于关系型数据库和非关系型数据库的中间产品!MongoDB是非关系型数据库功能最丰富,最像关系型数据库的!
- ConthDB

### 列存储数据库

- HBase
- 分布式文件系统

### 图关系数据库

![](/images/2020-11-16-13-36-59.png)

- 它不是存图形的,放的是关系. 比如:朋友圈社交网络,广告推荐!
- Neo4j, InfoGrid;

### 对比

![](/images/2020-11-16-13-40-46.png)

## Redis入门

### 概述

> Redis (Remote Dictionary Server), 远程字典服务

是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库,并提供多种语言的APl。是当下最热门的NoSQL技术之一!也被人们称为结构化数据库!

### 功能

1. 内存存储, 持久化, 内存中是断电即失, 所以持久化**(rdb\aof)**很重要
2. 效率高, 可以用于高速缓存
3. 发布订阅系统
4. 地图信息分析
5. 计时器, 计数器(浏览量)
6. ...

### 特性

1. 多样的数据类型
2. 持久化
3. 集群
4. 事务
5. ...

### 相关资源

1. 官网: https://redis.io/
2. 中文官网: http://www.redis.cn/
3. 下载地址: 通过官网下载

> 注意: Windows版本在GitHub下载
>
> **推荐在Linux服务器搭建**

### Windows安装

1. 下载安装包: https://github.com/dmajkic/redis/releases

2. 下载完毕得到压缩包:

![](/images/2020-11-16-13-56-18.png)   

3. 解压到对应文件夹

4. 开启Redis,双击运行服务即可

![](/images/2020-11-16-13-57-57.png)

5. 使用客户端来连接Redis

![](/images/2020-11-16-14-00-04.png)   

> 默认端口6379

### Linux安装

1. 下载tar.gz包

2. 解压redis的安装包(推荐/opt目录)

![](/images/2020-11-16-14-30-56.png)

3. 进入解压后的文件,可以看到redis的配置文件

![](/images/2020-11-16-14-35-36.png)

4. 基本环境准备

   1. yum install gcc-c++
   2. make 
   3. make install
![](/images/2020-11-16-14-53-55.png)
![](/images/2020-11-16-14-54-38.png)

5. redis的默认安装路径`/usr/local/bin`

![](/images/2020-11-16-14-46-02.png)   

6. 将redis的配置文件复制到当前目录

![](/images/2020-11-16-14-57-27.png)   

7. redis默认不是后台启动,修改配置文件

![](/images/2020-11-16-14-58-31.png)

8. 启动redis服务`redis-server  dir/redis.cofig`

![](/images/2020-11-16-14-59-47.png)

9. 使用redis-cli进行连接测试`redis-cli -p 6379`

![](/images/2020-11-16-15-01-33.png)   

10. 查看redis的进程是否开启`ps -ef|grep redis`

![](/images/2020-11-16-15-02-25.png)    

11. 关闭redis服务`shut down`

![](/images/2020-11-16-15-03-16.png)

## 测试性能

<u>redis-benchmark</u> 是一个压力测试工具!

官方自带的性能测试工具

### redis-benchmark命令参数

![](/images/2020-11-16-15-16-03.png)

**简单测试:**

```bash
# 测试:100个并发连接 100000请求
redis-benchmark -h localhost -p 6379 -c 100 -n 100000
```

![](/images/2020-11-16-15-27-49.png)

![](/images/2020-11-16-15-29-39.png)

## 基础知识

redis默认有16个数据库

![](/images/2020-11-16-15-31-27.png)

默认使用的是第0个数据库

可以使用select进行切换数据库

```bash
127.0.0.1:6379> select 3 #切换数据库
OK
127.0.0.1:6379[3]> DBSIZE #查看DB大小
(integer) 0
```

![](/images/2020-11-16-15-35-28.png)

```bash
127.0.0.1:6379[3]> keys* #查看所有的key
1) "name"
```

清除当前数据库`flush`

清除所有数据库`FLUSHALL`

```bash
127.0.0.1:6379[3]> flushdb #清除当前数据库
OK
127.0.0.1:6379[3]> keys*
(empty list or set)
```

思考: 为什么redis默认端口是6379!

> 追星(MySQL3306女儿名)

### Redis是单线程的

Redis是很快的,基于内存操作,CPU不是Redis的性能瓶颈,而是根据极其的内存和网络带宽.既然可以使用单线程来实现,就使用单线程了!

Redis是C语言写的,官方提供数据为100000+的QPS,完全不比同样是使用key-value的Memecache差!

**Redis为什么单线程还快?**

1. 误区1: 高性能的服务器一定是多线程的!

2. 误区2:多线程一定比单线程效率高!

   > CPU上下文会切换,所以不一定

核心:redis是将所有的数据全部放在内存中的,所以谁使用单线程去操作效率就是最高的,多线程(<u>存在CPU上下文切换的耗时操作</u>),**对于内存系统来说,如果没有上下文切换效率就是最高的!**多次读写都是在一个CPU上的**,在内存情况下,这个就是最佳的方案!**

## 五大数据类型

Redis是一个开源(BSD许可)的,内存中的数据结构存储系统,它可以用作**数据库、缓存和消息中间件MQ**。它支持多种类型的
数据结构,如字符串( strings), 散列( hashes), 列表( lists), 集合(sets), 有序集合( sorted sets)与范围查询, bitmaps, hyperloglogs和地理空间( geospatial)索引半径查询。 

Redis内置了复制( replication),LUA脚本(Luascripting), LRU驱动事件( LRU eviction), 事务( transactions)和不同级别的磁盘持久化( persistence),并通过Reds哨兵(Sentinel)和自动分区( Cluster)提供高可用性( high availability)。

### Redis-Key

```bash
127.0.0.1:6379> keys* #查看所有的key
(empty list or set)
127.0.0.1:6379> set name shane #set key
OK
127.0.0.1:6379> keys*
1)"name"
127.0.0.1:6379> set age 1
127.0.0.1:6379> keys*
1) "age"
2) "name"
127,0.0.1:6379> EXISTS name #判断当前key是否存在
(integer) 1
127.0.0.1:6379> EXISTS name1
(integer) 0
127,0.0.1:6379> move name 1 #1代表数据库一
(integer) 1
127.0.0.1:6379> keys*
1) "age"
127.0.0.1:6379> set name shane
OK
127.0.0.1:6379> keys *
1) "age"
2) "name"
127.0.0.1:6379> get name
"shane"
127.0.0,1:6379> EXPIRE name 10 #设置key的过期时间,单位是秒
(integer) 1
127,0.0.1:6379> ttl name #查看当前key剩余时间
(integer) 4
127.0.0.1:6379> tt1 name
(integer) 3
127.0.0.1:6379> tt1 name
(integer) -2 #已过期
127.0.0.1:6379> type name #查看当前key类型
string

```

[官网命令查询地址](http://www.redis.cn/commands.html)

### String(字符串)

90%的程序员只会使用的类型

#### 设置获取

```bash
127.0.0.1:6379> set key v1 #设置值
127.0.0.1:6379> get key	   #获得值
"v1"
127.0.0.1:6379> APPEND key "hello" #追加到原字符串
127.0.0.1:6379> STRLEN key #查看当前字符串长度
(integer)7
```

#### 自增减

```bash
127.0.0.1:6379> set views 0 #设置值
127.0.0.1:6379> get key	   #获得值
"0"
127.0.0.1:6379> incr views #自增一
127.0.0.1:6379> decr views #自减一
127.0.0.1:6379> INCRBY views 10 #+10
127.0.0.1:6379> DECRBY views 10 #-10
```

#### 字符串范围

```bash
127.0.0.1:6379> set key "hello,world!!!"
OK
127.0.0.1:6379> GETRANGEkey 0 3 #字符串截取[0,3]
"hell"
127.0.0.1:6379> GETRANGE 0 -1 #获得全部字符串 和 get key 一样
"hello,world!!!"
```

#### 替换

```bash
127.0.0.1:6379> set key abcdefg
OK
127.0.0.1:6379> get key
"abcdefg"
127.0.0.1:6379> SETRANGE key 1 xx #替换指定位置开始的字符串!
(integer) 7
127.0.0.1:6379> get key
"axxdefg"
```

#### 过期时间设置

```bash
# setex (set with expire) #设置过期时间
# setnx (set if not exist) #不存在再设置(在分布式锁中常用)
127.0.0.1:6379> setex key 30 "hello"
OK
127.0.0.1:6379> ttl key
(integer) 26
127.0.0.1:6379> setnx mykey "redis"
(integer)1 #设置成功
127.0.0.1:6379> setnx mykey "MongoDB"
(integer)0 #设置失败
```

#### 批量操作

```bash
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3
OK
127.0.0.1:6379> mget k1 k2 k3
1) "v1"
2) "v2"
3) "v3"
127.0.0.1:6379> msetnx k1 v1 k4 v4
(integer) 0	#原子性操作,一起成功一起失败
127.0.0.1:6379> get k4
(nil)
```

#### 对象

```bash
set user:1 {name:shane, age:3}# 设置一个user:1对象值为json字符来保存一个对象
#这里的key是一个巧妙的设计: user:{id}:{filed}, 如此设计在redis中完全可行
127.0.0.1:6379> mset user:1:name shane user:1:age 2
OK
127.0.0.1:6379> mget user:1:name user:1:age
1) "shane"
2) "2"
```

#### getset

```bash
127.0.0.1:6379> getset bd redis #如果不存在值,则返回nil
(nil)
127.0.0.1:6379> get db
"redis"
127.0.0.1:6379> getset db mongobd #如果存在值,则返回当前值后设置新值
"redis"
127.0.0.1:6379> get db
"mongobd"
```

String类型的使用场景: value除了是我们的字符串还可以是我们的数字!

- 计数器
- 统计多单位的数量
- 粉丝数
- 对象缓存存储

### List(列表)

> 在redis里面,我们可以把list玩成栈, 队列, 阻塞队列!

所有的list命令都是用l开头的

#### LPUSH&RPUSH

```bash
127.0.0.1:6379> LPUSH list one #将一个或多个值插入列表的头部
(integer) 1
127.0.0.1:6379> LPUSH list two
(integer) 2
127.0.0.1:6379> LPUSH list three
(integer) 3
127.0.0.1:6379> LRANGE list 0 -1 #获取区间值,-1为全部
1) "three"
2) "two"
3) "one"
127.0.0.1:6379> LRANGE list 0 1
1) "three"
2) "two"
127.0.0.1:6379> Rpush list four	#将一个或多个值插入列表的尾部
(integer) 4
127.0.0.1:6379> LRANGE list 0 -1 
1) "three"
2) "two"
3) "one"
4) "four"
```

#### LPOP&RPOP

```bash
127.0.0.1:6379> LRANGE list 0 -1 
1) "three"
2) "two"
3) "one"
4) "four"
127.0.0.1:6379> Lpop list	#移除头部第一个元素
"three"
127.0.0.1:6379> Rpop list	#移除尾部第一个元素
"four"
127.0.0.1:6379> LRANGE list 0 -1
1) "two"
2) "one"
```

#### Lindex

```bash
127.0.0.1:6379> LRANGE list 0 -1
1) "two"
2) "one"
127.0.0.1:6379> Lindex list 1 #通过下标获得list某一个值
"one"
127.0.0.1:6379> Lindex list 0
"two"
```

#### Llen

```bash
127.0.0.1:6379> LPUSH list one 
(integer) 1
127.0.0.1:6379> LPUSH list two
(integer) 2
127.0.0.1:6379> LPUSH list three
(integer) 3
127.0.0.1:6379> Llen list	#返回列表的长度
(integer) 3
```

#### Lrem

> 移除指定的值

```bash
127.0.0.1:6379> LRANGE list 0 -1
1) "four"
2) "three"
3) "two"
4) "one"
127.0.0.1:6379> Lrem list 1 one #移除一个指定建值为one的值
(integer) 1
127.0.0.1:6379> LRANGE list 0 -1
1) "four"
2) "three"
3) "two"
```

#### ltrim

修建/截断

```bash
127.0.0.1:6379> Rpush mylist "hello"
(integer) 1
127.0.0.1:6379> Rpush mylist "hello1"
(integer) 2
127.0.0.1:6379> Rpush mylist "hello2"
(integer) 3
127.0.0.1:6379> Rpush mylist "hello3"
(integer) 4
127.0.0.1:6379> ltrim mylist 1 2 #通过下标截取指定的长度,这个list只剩下已经截取的部分
OK
127.0.0.1:6379> LRANGE mylist 0 -1
1) "hello1"
2) "hello2"
```

#### rpoolpush

> 移除带列表最后一个元素,并将它移动到新的列表

```bash
127.0.0.1:6379> Rpush mylist "hello"
(integer) 1
127.0.0.1:6379> Rpush mylist "hello1"
(integer) 2
127.0.0.1:6379> Rpush mylist "hello2"
(integer) 3
127.0.0.1:6379> rpoolpush mylist myotherlist
"hello2"
```

#### Lset

> 列表必须存在,否则报错`(error) ERR no such key`
>
> 列表的index必须存在,否则报错`(error) ERR index out of range`

```bash
127.0.0.1:6379> lpush list value
(integer) 1
127.0.0.1:6379> lrange list 0 -1
"value"
127.0.0.1:6379> lset list 0 new
OK
127.0.0.1:6379> lrange list 0 -1
"new"
```

#### linsert

> 将某个值插入到特定值的前面/后面

```bash
127.0.0.1:6379> Rpush mylist "hello"
(integer) 1
127.0.0.1:6379> Rpush mylist "hello1"
(integer) 2
127.0.0.1:6379> LINSERT mylisy before "hello1" "hello2"
(integer) 3
127.0.0.1:6379> lrange list 0 -1
1) "hello"
2) "hello2"
3) "hello1"
127.0.0.1:6379> LINSERT mylisy after "hello1" "hello3"
(integer) 4
127.0.0.1:6379> lrange list 0 -1
1) "hello"
2) "hello2"
3) "hello1"
4) "hello3"
```

#### 小结

- list实际为一个链表,before Node after, left, right 都可以插入值
- 如果key不存在,创建新的脸
- 如果key存在,新增内容
- 如果移除了所有值,空链表,也代表不存在
- 在两边插入或改动值,效率最高!
- 在中间元素操作,效率低一点!

消息排队!消息队列|(Lpush,Rpop), 栈(Lpush,Lpop)







