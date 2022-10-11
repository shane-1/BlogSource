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

## Windows安装

1. 下载安装包: https://github.com/dmajkic/redis/releases

2. 下载完毕得到压缩包:

![](/images/2020-11-16-13-56-18.png)   

3. 解压到对应文件夹

4. 开启Redis,双击运行服务即可

![](/images/2020-11-16-13-57-57.png)

5. 使用客户端来连接Redis

![](/images/2020-11-16-14-00-04.png)   

> 默认端口6379

## Linux安装

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

### Set(集合)

set中的值是不能重复的 

#### sadd&Smembers

```bash
127.0.0.1:6379> sadd myset "hello" #添加值
(integer) 1 I
127.0.0.1:6379> sadd myset "shane"
(integer) 1
127.0.0.1:6379> sadd myset "jack"
(integer) 1
127.0.0.1:6379> SMEMBERS myset #查看集合所有元素
1) "he11o"
2) "shane"
3) "jack"
127.0.0.1: 6379> SISMEMBER myset hello #查看指定元素是否存在
(integer) 1
127.0.0.1: 6379> SISMEMBER myset world
(integer) 0
```

#### Scard

```bash
127.0.0.1:6379> scard myset #获取set集合中的内容元素个数
(integer) 3
```

#### SRem

```bash
127.0.0.1:6379> srem myset he1lo #移除set集合中的指定元素
(integer) 1
127.0.0.1:6379> scard myset
(integer) 2
127.0.0.1:6379> SMEMBERS myset
1) "shane"
2) "jack"
```

#### Srandmember

```bash
127.0.0.1:6379> SRANDMEMBER myset
"shane"
```

#### Spop

```bash
127.0.0.1: 6379> SMEMBERS myset
1) "shane"
2) "jack"
3) "luck"
127.0.0,1:6379> Spop myset#随机删除一些set集合中的元素
"jack"
127.0.0.1:6379> Spop myset
"luck"
127.0.0.1: 6379> SMEMBERS myset
1) "shane"
```

#### Smove

```bash
127.0.0.1: 6379> sadd myset hello
(integer) 1
127.0.0.1: 6379> sadd myset world
(integer) 1
127.0.0.1: 6379> sadd myset shane
(integer) 1
127.0.0.1:6379> sadd myset2 "set2"
(integer) 1
127.0.0.1:6379> smove myset myset2 "shane"#将一个指定的值,移动到另外一个set集合!
(integer) 1
127.0.0.1: 6379> SMEMBERS myset
1) "world"
2) "hello"
127.0.0.1: 6379> SMEMBERS myset2
1) "shane"
2) "set2"
```

#### 数字集合类:

- 差集
- 交集
- 并集

```bash
127.0.6.1:6379> sadd key1 a
(integer) 1 
27.0.6.1:6379> sadd key1 b
(integer) 1
127.0.0.1:6379> sadd key1 c
(integer) 1
127.0.0.1:6379>5 add key2 c
(integer) 1
127.0.0.1:6379> sadd key2 d
(integer) 1
127.0.6.1:6379> sadd key2 e
(integer) 1
127.0.0.1:6379> SDIFF key1 key2 #差集
1) "b"
2) "a"
127.0.0.1:6379> SINTER keyl key2#交集 共同好友就可以这样实现
1) "c"
127.0.0.1:6379> SUNION key1 key2#并集
1) "b"
2) "c"
3) "e"
4) "a"
5) "d"
```

微博,A用户将所有关注的人放在一个set集合中!将他的粉丝也放在一个集合中!

共同关注, 共同爱好, 二度好友, 推荐好友!(六度分割理论)

### Hash(哈希)

Map集合, key-map! 时这个值是一个map集合!本质和string类型没有太大的区别,还是一个简单的key-value!

##### get&set

```bash
127.0.0.1:6379> hset myhash fieldl shane #set一个key-vlaue
(integer) 1
127.0.0.1:6379> hget myhash field1 #获取一个字段值
"shane"
127.0.0.1:6379> hmset myhash field1 hello field2 world #set多个key-vlaue
OK
127.0.0.1:6379> hmget myhash fieldl field2	#获取多个字段值
1) "he1lo"
2) "world"
127.0.0.1:6379> hgetall myhash #获取全部的数据
1) "fieldl"
2) "he11o"
3) "field2"
4) "world"
```

#### hdel

```bash
127.0.0.1:6379> hdel myhash field1 #删除hash指定key字段!对应的value值也就消失了!
(integer) 1
127.0.0.1:6379> hgetall myhash
1) "field2"
2) "world"
```

#### hlen

```bash
127.0.0.1:6379> hmset myhash fieldl hello field2 world
OK
127.0.0.1:6379> HGETALL myhash
1) "field2"
2) "world"
3) "field1"
4) "hello"
127.0.0.1:6379> hlen myhash
(integer) 2
```

#### hexists

```bash
127.0.0,1:6379> HEXISTS myhash field1#判断hash中指定字段是否存在
(integer) 1
127.0.0.1:6379> HEXISTS myhash field3
(integer) 0
```

#### hkeys&hvals

```bash
#只获得所有 Field
#只获得所有 value
127.0.0.1:6379> hkeys myhash #只获得所有 field
1) "field2"
2) "field1"
127.0.0.1:6379> hvals myhash #只获得所有value
1) "world"
2) "he11o"
```

#### incr&decr

```bash
127.0.0.1:6379> hset myhash field3 5 #指定增量!
(integer) 1
127.0.0.1:6379> HINCRBY myhash field3 1
(integer) 6
127.0.0.1:6379> HINCRBY myhash field3 -1
(integer) 5
127.0.0.1:6379> hsetnx myhash field4 he11o #如果不存在则可以设置
(integer) 1
127.0.0.1:6379> hsetnx myhash fie1d4 world #如果存在则不能设置
Integer) 0
```

hash变更的数据 user name age,有其是用户的信息之类的,经常变动的信息! hash更适合于对象的存储,string更加适合字符串的存储

### Zset(有序集合)

在set的基础上, 增加了一个值, 

`set k1 v1`   	`zset k1 score1 v1`

#### zadd

```bash
127.0.0.1:6379 > zadd myset 1one #添加一个值
(integer) 1
127.0.0.1:6379> zadd myset 2 two 3 three #添加多个值
(integer) 2
127.0.0.1:6379> ZRANGE myset 0 -1
1) "one"
2) "two"
3) "three"
```

#### ZRANGEBYSCORE

```bash
127.0.0.1: 6379> zadd salary 2500 xiaohong
Integer) 1
127.0.0.1: 6379> zadd salary 5000 zhangsan
(integer) 1
127.0.0.1: 6379> zadd salary 500 shane
(integer) 1
# ZRANGEBYS key min max
127.0.0.1: 6379> ZRANGEBYSCORE salary -inf +inf #显示全部用户(从小到大)!
1) "shane"
2) "xiaohong"
3) "zhangsun"
127.0.0.1: 6379> ZREVRANGE salary 0 -1 #显示全部用户(从大到小)!
1) "zhangsun"
2) "xiaohong"
3) "shane"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf +inf withscores #显示全部的用户并且附带数值
1) "shane"
2) "500"
3) "xiaohong"
4) "2500"
5) "zhangsan"
6) "5000"
127.0.0.1:6379> ZRANGEBYSCORE salary -inf 2500 withscores #附带数值显示工资小于2500员工的升序排序!
1) "shane"
2) "500"
3) "xiaohong"
4) "2500"

```

#### zrem

```bash
#移除rem中的元素
127.0.0. 1: 6379> zrange salary 0 -l
1) "shane"
2) "xiaohong"
3) "zhangsan"
127.0.0.1: 6379> zrem salary xiaohong
(integer) 1
127.0.0.1:6379> zrange salary 0 -1
1) "shane"
2) "zhangsan"
```

#### zcard

```bash
127.0.0.1:6379> zcard salary # 获取有序集合中的个数
(integer) 2
```

#### zcount

```bash
127.0.0.1:6379> zadd myset 1 hello
127.0.0.1:6379> zadd myset 2 world 3 shane
127.0.0.1:6379> zcount myset 1 3 #获取指定区间的成员数量!
(integer) 3
127.0.0.1:6379> zcount myset 1 2
(integer) 2
```

案例思路: set排序 存储班级成绩表 工资表排序!

普通消息(1) ,重要消息(2),带权重进行判断!

排行榜应用实现,取Top N测试

## 三种特殊数据类型

### geospatial 地理位置

Redis的Geo在Redis3,2版本就推出了!这个功能可以推算地理位置的信息,两地之间的距离,方圆几里的人!

可以查询一些测试数据:http://www.jsons.cn/lngcodeinfo/0706D99C19A781A3/

使用经纬度定位地理坐标并用一个有序集合zset保存，所以zset命令也可以使用

- `geoadd key longitud(经度) latitude(纬度) member [..]` 将具体经纬度的坐标存入一个有序集合

  > 规则:两极无法直接添加,我们一般会下载城市数据,或者通过java程序一次性导入!
  >
  > 参数key 值(经度. 纬度. 名称)

- `geopos key member [member..]` 获取集合中的一个/多个成员坐标

- `geodist key member1 member2 [unit]` 返回两个给定位置之间的距离。默认以米作为单位。[unit]中可以使用不同的单位

- `georadius key longitude latitude radius m|km|mi|ft [WITHCOORD][WITHDIST] [WITHHASH] [COUNT count]` 以给定的经纬度为中心， 返回集合包含的位置元素当中， 与中心的距离不超过给定最大距离的所有位置元素。

- `GEORADIUSBYMEMBER key member radius...` 功能与GEORADIUS相同，只是中心位置不是具体的经纬度，而是使用结合中**已有的成员作为中心点**。

- `geohash key member1 [member2..]` 返回一个或多个位置元素的Geohash表示。使用Geohash位置52点整数编码。

#### 有效经纬度

- 有效的经度从-180度到180度。
- 有效的纬度从-85.05112878度到85.05112878度。

指定单位的参数 unit 必须是以下单位的其中一个：

m 表示单位为米。

km 表示单位为千米。

mi 表示单位为英里。

ft 表示单位为英尺。

#### 关于GEORADIUS的参数

通过georadius就可以完成 附近的人功能

- withcoord:带上坐标

- withdist:带上距离，单位与半径单位相同

- COUNT n : 只显示前n个(按距离递增排序)

代码:

```bash
----------------georadius---------------------
127.0.0.1:6379> GEORADIUS china:city 120 30 500 km withcoord withdist # 查询经纬度(120,30)坐标500km半径内的成员(withdist带上距离)
1) 1) "hangzhou"
   2) "29.4151"
   3) 1) "120.20000249147415"
      2) "30.199999888333501"
2) 1) "shanghai"
   2) "205.3611"
   3) 1) "121.40000134706497"
      2) "31.400000253193539"
------------geohash---------------------------
127.0.0.1:6379> geohash china:city yichang shanghai # 获取成员经纬坐标的geohash表示

"wmrjwbr5250"
"wtw6ds0y300"
```

#### GEORADIUSBYMEMBER

通过指定元素找出周围的元素

```bash
找出位于指定元素周围的其他元素
127.0.0.1:6379> GEORADIUSBYMEMBER china:city beijing 1000 km
1) "beijing"
2) "xian"
127.0.0.1:6379> GEORADIUSBYMEMBER china:city shanghai 400 km
1) "hangzhou"
2) "shanghai"
```

#### GEOHASH

返回11个字符的Geohash字符串

```bash
#将二维的经纬度转换为一维的字符串,如果两个字符串越接近,那么则距离越近!
127.0.0.1:6379> geohash china:city beijing chongqi
1) "wx4fbxxfkeO"
2) "wm5xzrybtyo"
```

### Hyperloglog(基数统计)

> Redis 2.8.9+

Redis HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，**在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定的、并且是很小的。**

花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基数。

因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。<u>Hyperloglog会有0.81%的错误率,传统UV任务,可以忽略</u>

其底层使用string数据类型。

#### 什么是基数？

数据集中不重复的元素的个数。

#### 应用场景：

网页的访问量（UV）：一个用户多次访问，也只能算作一个人。

传统实现，存储用户的id,然后每次进行比较。**当用户变多之后这种方式及其浪费空间，而我们的目的只是计数，Hyperloglog就能帮助我们利用最小的空间完成。**

- `PFADD key element1 [elememt2..]` 添加指定元素到 HyperLogLog中
- `PFCOUNT key [key]` 返回给定 HyperLogLog 的基数估算值。
- `PFMERGE destkey sourcekey [sourcekey..]` 将多个 HyperLogLog 合并为一个 HyperLogLog

#### 代码示例

```bash
----------PFADD--PFCOUNT---------------------
127.0.0.1:6379> PFADD myelemx a b c d e f g h i j k # 添加元素
(integer) 1
127.0.0.1:6379> type myelemx # hyperloglog底层使用String
string
127.0.0.1:6379> PFCOUNT myelemx # 估算myelemx的基数
(integer) 11
127.0.0.1:6379> PFADD myelemy i j k z m c b v p q s
(integer) 1
127.0.0.1:6379> PFCOUNT myelemy
(integer) 11
----------------PFMERGE-----------------------
127.0.0.1:6379> PFMERGE myelemz myelemx myelemy # 合并myelemx和myelemy成为myelemz
OK
127.0.0.1:6379> PFCOUNT myelemz # 估算基数
(integer) 17
```

如果允许容错, 那么一定可以使用Hyperloglog!

如果不允许容错, 就使用set或者自己的数据类型即可!

### BitMaps(位图)

使用位存储，信息状态只有 0 和 1两个状态. 

Bitmap是一串连续的2进制数字（0或1），每一位所在的位置为偏移(offset)，在bitmap上可执行AND,OR,XOR,NOT以及其它位操作。

#### 应用场景: 

签到统计、状态统计

- `setbit key offset value` 为指定key的offset位设置值
- `getbit key offset` 获取offset位的值
- `bitcount key [start end]` 统计字符串被设置为1的bit数，也可以指定统计范围按字节
- `bitop operration destkey key[key..]` 对一个或多个保存二进制位的字符串 key 进行位元操作，并将结果保存到 destkey 上。
- `BITPOS key bit [start] [end]` 返回字符串里面第一个被设置为1或者0的bit位。start和end只能按字节,不能按位

#### 代码示例

```bash
------------setbit--getbit--------------
127.0.0.1:6379> setbit sign 0 1 # 设置sign的第0位为 1 
(integer) 0
127.0.0.1:6379> setbit sign 2 1 # 设置sign的第2位为 1  不设置默认 是0
(integer) 0
127.0.0.1:6379> setbit sign 3 1
(integer) 0
127.0.0.1:6379> setbit sign 5 1
(integer) 0
127.0.0.1:6379> type sign
string
127.0.0.1:6379> getbit sign 2 # 获取第2位的数值
(integer) 1
127.0.0.1:6379> getbit sign 3
(integer) 1
127.0.0.1:6379> getbit sign 4 # 未设置默认是0
(integer) 0
-----------bitcount----------------------------
127.0.0.1:6379> BITCOUNT sign # 统计sign中为1的位数
(integer) 4
```

## 事务

**Redis的单条命令是保证原子性的，但是redis事务不能保证原子性.**

#### Redis事务本质:

 <u>一组命令的集合!</u>

----------------- 队列 set set set 执行 -------------------

事务中每条命令都会被序列化，执行过程中按顺序执行，不允许其他命令进行干扰。

- 一次性
- 顺序性
- 排他性

Redis事务没有隔离级别的概念

Redis单条命令是保证原子性的，但是事务不保证原子性！

#### Redis事务操作过程

- 开启事务（multi）
- 命令入队
- 执行事务（exec）

所以事务中的命令在加入时都没有被执行，直到提交时才会开始执行(Exec)一次性完成。

#### 正常执行

```bash
127.0.0.1:6379> multi # 开启事务
OK
127.0.0.1:6379> set k1 v1 # 命令入队
QUEUED
127.0.0.1:6379> set k2 v2 # ..
QUEUED
127.0.0.1:6379> get k1
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> keys *
QUEUED
127.0.0.1:6379> exec # 事务执行
1) OK
2) OK
3) "v1"
4) OK
5) 1) "k3"
   2) "k2"
   3) "k1"
```

#### 取消事务(discurd)

```bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> DISCARD # 放弃事务
OK
127.0.0.1:6379> EXEC 
(error) ERR EXEC without MULTI # 当前未开启事务
127.0.0.1:6379> get k1 # 被放弃事务中命令并未执行
(nil)
```

#### 事务错误

> 代码语法错误（编译时异常）所有的命令都不执行

```bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> error k1 # 这是一条语法错误命令
(error) ERR unknown command `error`, with args beginning with: `k1`, # 会报错但是不影响后续命令入队 
127.0.0.1:6379> get k2
QUEUED
127.0.0.1:6379> EXEC
(error) EXECABORT Transaction discarded because of previous errors. # 执行报错
127.0.0.1:6379> get k1 
(nil) # 其他命令并没有被执行
```

> 代码逻辑错误 (运行时异常) **其他命令可以正常执行 ** 
>
> >所以不保证事务原子性



```bash
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> INCR k1 # 这条命令逻辑错误（对字符串进行增量）
QUEUED
127.0.0.1:6379> get k2
QUEUED
127.0.0.1:6379> exec
1) OK
2) OK
3) (error) ERR value is not an integer or out of range # 运行时报错
4) "v2" # 其他命令正常执行
```

虽然中间有一条命令报错了，但是后面的指令依旧正常执行成功了。
所以说**Redis单条指令保证原子性，但是Redis事务不能保证原子性。**

### 监控

#### 悲观锁：

- 很悲观，认为什么时候都会出现问题，无论做什么都会加锁

#### 乐观锁：

- 很乐观，认为什么时候都不会出现问题，所以不会上锁！更新数据的时候去判断一下，在此期间是否有人修改过这个数据
- 获取version
- 更新的时候比较version

使用watch key监控指定数据，相当于乐观锁加锁。

#### 代码

正常执行

```bash
127.0.0.1:6379> set money 100 # 设置余额:100
OK
127.0.0.1:6379> set use 0 # 支出使用:0
OK
127.0.0.1:6379> watch money # 监视money (上锁)
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> DECRBY money 20
QUEUED
127.0.0.1:6379> INCRBY use 20
QUEUED
127.0.0.1:6379> exec # 监视值没有被中途修改，事务正常执行
1) (integer) 80
2) (integer) 20
```

测试多线程修改值，使用watch可以当做redis的乐观锁操作（相当于getversion）

我们启动另外一个客户端模拟插队线程。

线程1：

```bash
127.0.0.1:6379> watch money # money上锁
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> DECRBY money 20
QUEUED
127.0.0.1:6379> INCRBY use 20
QUEUED
127.0.0.1:6379>     # 此时事务并没有执行
```

模拟线程插队，线程2：

```bash
127.0.0.1:6379> INCRBY money 500 # 修改了线程一中监视的money
(integer) 600
```

回到线程1，执行事务：

```bash
127.0.0.1:6379> EXEC # 执行之前，另一个线程修改了我们的值，这个时候就会导致事务执行失败
(nil) # 没有结果，说明事务执行失败
127.0.0.1:6379> get money # 线程2 修改生效
"600"
127.0.0.1:6379> get use # 线程1事务执行失败，数值没有被修改
"0"
```

解锁获取最新值，然后再加锁进行事务。

unwatch进行解锁。

**注意：每次提交执行exec后都会自动释放锁，不管是否成功**

## Jedis

使用Java来操作Redis，Jedis是Redis官方推荐使用的Java连接redis的客户端。

1. 导入依赖

```xml
<!--导入jredis的包-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.2.0</version>
</dependency>
<!--fastjson-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.70</version>
</dependency>
```

2. 编码测试

> - 连接数据库
> - 操作命令
> - 断开连接

代码示例

```java
public class TestPing {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("192.168.xx.xxx", 6379);
        String response = jedis.ping();
        System.out.println(response); // PONG
    }
}
```

输出PONG

### 常用的API

string、list、set、hash、zset

**所有的api命令，就是我们对应的上面学习的指令，一个都没有变化！**

```JAVA
public class TestTX {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        jedis.flushDB();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("hello","world");
        jsonObject.put("name","kuangshen");
        // 开启事务
        Transaction multi = jedis.multi();
        String result = jsonObject.toJSONString();
        // jedis.watch(result)
        try {
            multi.set("user1",result);
            multi.set("user2",result);
            int i = 1/0 ; // 代码抛出异常事务，执行失败！
            multi.exec(); // 执行事务！
        } catch (Exception e) {
            multi.discard(); // 放弃事务
            e.printStackTrace();
        } finally {
            System.out.println(jedis.get("user1"));
            System.out.println(jedis.get("user2"));
            jedis.close(); // 关闭连接
        }
    }
}
```

## SpringBoot整合

SpringBoot 操作数据：spring-data jpa jdbc mongodb redis！

SpringData 也是和 SpringBoot 齐名的项目！

> **说明： 在 SpringBoot2.x 之后，原来使用的jedis 被替换为了 lettuce**

jedis : 采用的直连，多个线程操作的话，是不安全的，如果想要避免不安全的，使用 jedis pool 连接池！ 更像 BIO 模式

lettuce : 采用netty，实例可以再多个线程中进行共享，不存在线程不安全的情况！可以减少线程数据了，更像 NIO 模式

源码分析：

```java
@Bean
@ConditionalOnMissingBean(name = "redisTemplate") 
// 我们可以自己定义一个redisTemplate来替换这个默认的！
public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) throws UnknownHostException {
// 默认的 RedisTemplate 没有过多的设置，redis 对象都是需要序列化！
// 两个泛型都是 Object, Object 的类型，我们后使用需要强制转换 <String, Object>
    RedisTemplate<Object, Object> template = new RedisTemplate<>();
    template.setConnectionFactory(redisConnectionFactory);
    return template;
}
@Bean
@ConditionalOnMissingBean // 由于 String 是redis中最常使用的类型，所以说单独提出来了一个bean！
public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory) throws UnknownHostException {
    StringRedisTemplate template = new StringRedisTemplate();
    template.setConnectionFactory(redisConnectionFactory);
    return template;
}
```

#### 整合测试

##### 1.导入依赖			

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

springboot 2.x后 ，原来使用的 Jedis 被 lettuce 替换。

jedis：采用的直连，多个线程操作的话，是不安全的。如果要避免不安全，使用jedis pool连接池！更像BIO模式

lettuce：采用netty，实例可以在多个线程中共享，不存在线程不安全的情况！可以减少线程数据了，更像NIO模式

我们在学习SpringBoot自动配置的原理时，整合一个组件并进行配置一定会有一个自动配置类xxxAutoConfiguration,并且在spring.factories中也一定能找到这个类的完全限定名。Redis也不例外。

![](/images/2020-11-18-08-43-54.png)

那么就一定还存在一个RedisProperties类

![](/images/2020-11-18-08-44-45.png)

@ConditionalOnClass注解中有两个类是默认不存在的，所以Jedis是无法生效的

然后再看Lettuce：

![](/images/2020-11-18-08-45-18.png)

完美生效。

现在我们回到RedisAutoConfiguratio

![](/images/2020-11-18-08-45-50.png)

只有两个简单的Bean

- RedisTemplate
- StringRedisTemplate

当看到xxTemplate时可以对比RestTemplat、SqlSessionTemplate,通过使用这些Template来间接操作组件。那么这俩也不会例外。分别用于操作Redis和Redis中的String数据类型。

在RedisTemplate上也有一个条件注解，说明我们是可以对其进行定制化的

说完这些，我们需要知道如何编写配置文件然后连接Redis，就需要阅读RedisProperties

![](/images/2020-11-18-08-46-16.png)

这是一些基本的配置属性。

![](/images/2020-11-18-08-46-43.png)

还有一些连接池相关的配置。注意使用时一定使用**Lettuce**的连接池。

![](/images/2020-11-18-08-47-13.png)



##### 2.编写配置文件

```properties
# 配置redis
spring.redis.host=39.99.xxx.xx
spring.redis.port=6379
```



##### 3.使用RedisTemplate

```java
@SpringBootTest
class Redis02SpringbootApplicationTests {
@Autowired
private RedisTemplate redisTemplate;

@Test
void contextLoads() {

    // redisTemplate 操作不同的数据类型，api和我们的指令是一样的
    // opsForValue 操作字符串 类似String
    // opsForList 操作List 类似List
    // opsForSet
    // opsForHash
    // opsForZSet
    // opsForGeo
    // opsForHyperLog

    // 除了基本的操作，我们常用的方法都可以直接通过redisTemplate操作，比如事务和基本的CRUD

    // 获取连接对象
    //RedisConnection connection = redisTemplate.getConnectionFactory().getConnection();
    //connection.flushDb();
    //connection.flushAll();

    redisTemplate.opsForValue().set(&quot;mykey&quot;,&quot;kuangshen&quot;);
    System.out.println(redisTemplate.opsForValue().get(&quot;mykey&quot;));
}
}
```

> 在企业中,大部分情况下不会使用这种原声带方式去编写代码.而是**用RedisUtils去封装**

##### 4.测试结果

此时我们回到Redis查看数据时候，惊奇发现全是乱码，可是程序中可以正常输出。这时候就关系到存储对象的序列化问题，在网络中传输的对象也是一样需要序列化，否者就全是乱码。

RedisTemplate内部的序列化配置是这样的

![](/images/2020-11-18-08-49-50.png)

默认的序列化器是采用JDK序列化器

![](/images/2020-11-18-08-53-34.png)


后续我们定制RedisTemplate就可以对其进行修改。

RedisSerializer提供了多种序列化方案：

![](/images/2020-11-18-08-58-09.png)



我们来编写一个自己的 :

#### RedisTemplete

```java

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
// 固定模板，在企业中拿去就可以直接使用！
// 自己定义了一个 RedisTemplate
@Bean
@SuppressWarnings("all")
 public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
// 我们为了自己开发方便，一般直接使用 <String, Object>
  RedisTemplate<String, Object> template = new RedisTemplate<String,Object>();
	template.setConnectionFactory(factory);
     // Json序列化配置
Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new
Jackson2JsonRedisSerializer(Object.class);
ObjectMapper om = new ObjectMapper();
om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
jackson2JsonRedisSerializer.setObjectMapper(om);
// String 的序列化
StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();

// key采用String的序列化方式
template.setKeySerializer(stringRedisSerializer);
// hash的key也采用String的序列化方式
template.setHashKeySerializer(stringRedisSerializer);
// value序列化方式采用jackson
template.setValueSerializer(jackson2JsonRedisSerializer);
// hash的value序列化方式采用jackson
template.setHashValueSerializer(jackson2JsonRedisSerializer);
template.afterPropertiesSet();

return template;
 }
}
```

所有的redis操作，其实对于java开发人员来说，十分的简单，更重要是要去理解redis的思想和每一种数据结构的用处和作用场景！

## Redis.conf

容量单位不区分大小写，G和GB有区别

![](/images/2020-11-18-09-09-05.png)

1. 配置文件unit单位对大小写不敏感!
2. 可以使用 include 组合多个配置问题

![](/images/2020-11-18-10-33-32.png)

### 网络配置

``` BASH
bind 127.0.0.1 # 绑定的ip
protected-mode yes #保护模式
port 6379 #端口设置
```

![](/images/2020-11-18-10-38-00.png)

### 通用 GENERAL

```BASH
daemonize yes #以守护进程的方式运行,默认是默认关闭,需要开启!
pidfile /var/run/redis-6379pid #如果以后台的方式运行,我们就需要指定一个pid文件
```

### 日志

```bash
# 日志
# Specify the server verbosity level.
# This can be one of:
# debug (a lot of information, useful for development/testing)
# verbose (many rarely useful info, but not a mess like the debug level)
# notice (moderately verbose, what you want in production probably) 生产环境用
# warning (only very important / critical messages are logged)
loglevel notice
logfile "" # 日志的文件位置名
databases 16 # 数据库的数量，默认是 16 个数据库
always-show-logo yes # 是否总是显示LOGO
```

> 日志输出级别
>
> > - debug
> > - verbose
> > - notice
> > - waring

### 快照

**持久化**,在规定的时间内,执行了多少次操作,则会持久化到文件 .rdb .aof

redis是内存数据库,**如果没有持久化,那么数据断电及失!**

由于Redis是基于内存的数据库，需要将数据由内存持久化到文件中

持久化方式：

- RDB
- AOF

```bash
# 如果900s内，如果至少有一个1 key进行了修改，我们及进行持久化操作
save 900 1
# 如果300s内，如果至少10 key进行了修改，我们及进行持久化操作
save 300 10
# 如果60s内，如果至少10000 key进行了修改，我们及进行持久化操作
save 60 10000
# 我们之后学习持久化，会自己定义这个测试！
stop-writes-on-bgsave-error yes # 持久化如果出错，是否还需要继续工作！
rdbcompression yes # 是否压缩 rdb 文件，需要消耗一些cpu资源！
rdbchecksum yes # 保存rdb文件的时候，进行错误的检查校验！
dir ./ # rdb文件保存的目录！
```

### SECURITY 安全

可以在这里设置redis的密码，默认是没有密码！

```bash
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> config get requirepass # 获取redis的密码
1) "requirepass"
2) ""
127.0.0.1:6379> config set requirepass "123456" # 设置redis的密码
OK
127.0.0.1:6379> config get requirepass # 发现所有的命令都没有权限了
(error) NOAUTH Authentication required.
127.0.0.1:6379> ping
(error) NOAUTH Authentication required.
127.0.0.1:6379> auth 123456 # 使用密码进行登录！
OK
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "123456"
```

### 限制 CLIENTS（客户端连接相关）

```bash
maxclients 10000 # 设置能连接上redis的最大客户端的数量
maxmemory <bytes> # redis 配置最大的内存容量
maxmemory-policy noeviction # 内存到达上限之后的处理策略
1、volatile-lru：只对设置了过期时间的key进行LRU（默认值）
2、allkeys-lru ： 删除lru算法的key
3、volatile-random：随机删除即将过期key
4、allkeys-random：随机删除
5、volatile-ttl ： 删除即将过期的
6、noeviction ： 永不过期，返回错误
```

### APPEND ONLY 模式 aof配置

```bash
appendonly no # 默认是不开启aof模式的，默认是使用rdb方式持久化的，在大部分所有的情况下，rdb完全够用！
appendfilename "appendonly.aof" # 持久化的文件的名字
# appendfsync always # 每次修改都会 sync。消耗性能
appendfsync everysec # 每秒执行一次 sync，可能会丢失这1s的数据！
# appendfsync no # 不执行 sync，这个时候操作系统自己同步数据，速度最快！
```

## Redis持久化

> 面试和工作，持久化都是重点！

Redis 是内存数据库，如果不将内存中的数据库状态保存到磁盘，那么一旦服务器进程退出，服务器中的数据库状态也会消失。所以 Redis 提供了持久化功能！

### RDB（Redis DataBase）

> 在主从复制中,RDB就是备用的,在从机上面!

![](/images/2020-11-18-15-55-42.png)

> 在指定时间间隔后，将内存中的数据集快照写入数据库 ；
>
> 在恢复时候，直接读取快照文件，进行数据的恢复 ；
>
> 默认情况下， Redis 将数据库快照保存在名字为 dump.rdb的二进制文件中。文件名可以在配置文件中进行自定义。

在指定的时间间隔内将内存中的数据集快照写入磁盘，也就是行话讲的Snapshot快照，它恢复时是将快照文件直接读到内存里。

Redis会单独创建（fork）一个子进程来进行持久化，会先将数据写入到一个临时文件中，待持久化过程都结束了，再用这个临时文件替换上次持久化好的文件。整个过程中，主进程是不进行任何IO操作的。

这就确保了极高的性能。如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那RDB方式要比AOF方式更加的高效。RDB的缺点是最后一次持久化后的数据可能丢失。我们默认的就是RDB，一般情况下不需要修改这个配置！ 有时候在生产环境我们会将这个文件进行备份！
rdb保存的文件是dump.rdb 都是在我们的配置文件中快照中进行配置的！

#### 工作原理

在进行 RDB 的时候，redis 的主线程是不会做 io 操作的，主线程会 fork 一个子线程来完成该操作；

1. Redis 调用forks。同时拥有父进程和子进程。
2. 子进程将数据集写入到一个临时 RDB 文件中。
3. 当子进程完成对新 RDB 文件的写入时，Redis 用新 RDB 文件替换原来的 RDB 文件，并删除旧的 RDB 文件。

这种工作方式使得 Redis 可以从写时复制（copy-on-write）机制中获益(因为是使用子进程进行写操作，而父进程依然可以接收来自客户端的请求。)

![](/images/2020-11-18-16-15-11.png)

#### 触发机制

1.  save的规则满足的情况下，会自动触发rdb原则
2.  执行flushall命令，也会触发我们的rdb原则
3.  退出redis，也会自动产生rdb文件

备份会自动生成一个dump.rdb

![](/images/2020-11-18-16-16-54.png)

#### save

使用 save 命令，会立刻对当前内存中的数据进行持久化 ,但是会阻塞，也就是不接受其他操作了；

> 由于 save 命令是同步命令，会占用Redis的主进程。若Redis数据非常多时，save命令执行速度会非常慢，阻塞所有客户端的请求。

示意图

![](/images/2020-11-18-16-37-01.png)

#### flushall命令

flushall 命令也会触发持久化 ；

触发持久化规则
满足配置条件中的触发条件 ；

> 可以通过配置文件对 Redis 进行设置， 让它在“ N 秒内数据集至少有 M 个改动”这一条件被满足时， 自动进行数据集保存操作。

```bash
# 持久化规则, 持久化到文件 .db .aof
# 如果了900秒内至少1个key进行了修改,就进行持久化
save 900 1
# 300秒内10个key进行了修改
save 300 10
save 60 10000
```


![](/images/2020-11-18-16-38-37.png)

#### bgsave

bgsave 是异步进行，进行持久化的时候，redis 还可以将继续响应客户端请求 ；

![](/images/2020-11-18-16-42-59.png)

#### bgsave和save对比

| 命令   | save               | bgsave                             |
| :----- | :----------------- | :--------------------------------- |
| IO类型 | 同步               | 异步                               |
| 阻塞？ | 是                 | 是（阻塞发生在fock()，通常非常快） |
| 复杂度 | O(n)               | O(n)                               |
| 优点   | 不会消耗额外的内存 | 不阻塞客户端命令                   |
| 缺点   | 阻塞客户端命令     | 需要fock子进程，消耗内存           |

#### 恢复机制

1. 只需要将rdb文件放置我们redis的启动目录即可,redis启动时会自动检查dump.rdb文件,恢复其中的数据

2. 查看需要存放的位置

   ```bash
   127.0.0.1:6379> config get dir
   1) "dir"
   2) "/usr/local/bin" #如果在该目录存在dump.rdb文件启动就会自动扫描其中的数据
   ```

#### 优缺点

> 优点：

1. 适合大规模的数据恢复
2. 对数据的完整性要求不高

> 缺点：

1. 需要一定的时间间隔进行操作，如果redis意外宕机了，这个最后一次修改的数据就没有了。
2. fork进程的时候，会占用一定的内容空间。

### AOF

> Append Only File

将我们所有的命令都记录下来，history，恢复的时候就把这个文件全部再执行一遍


![](/images/2020-11-18-17-50-09.png)

以日志的形式来记录每个写的操作，将Redis执行过的所有指令记录下来（读操作不记录），只许追加文件但不可以改写文件，redis启动之初会读取该文件重新构建数据，换言之，redis重启的话就根据日志文件的内容**将写指令从前到后执行一次**以完成数据的恢复工作。

> Aof保存的是 appendonly.aof文件

#### 什么是AOF

 快照功能（RDB）并不是非常耐久（durable）： 如果 Redis 因为某些原因而造成故障停机， 那么服务器将丢失最近写入、以及未保存到快照中的那些数据。 从 1.1 版本开始， Redis 增加了一种完全耐久的持久化方式： AOF 持久化。

![](/images/2020-11-18-18-07-45.png)

appendonly no yes则表示启用AOF

默认是不开启的，我们需要手动配置，然后重启redis，就可以生效了！

**记录的文件为**`appendonly.aof`

如果这个aof文件有错位，这时候redis是启动不起来的，我需要修改这个aof文件

redis给我们提供了一个工具redis-check-aof --fix

![](/images/2020-11-18-18-21-58.png)

如果文件正常了,重启就可以恢复了

```bash
appendonly yes  # 默认是不开启aof模式的，默认是使用rdb方式持久化的，在大部分的情况下，rdb完全够用
appendfilename "appendonly.aof"
appendfsync always # 每次修改都会sync 消耗性能
appendfsync everysec # 每秒执行一次 sync 可能会丢失这一秒的数据
appendfsync no # 不执行 sync ,这时候操作系统自己同步数据，速度最快
```

#### 重写规则

> aof默认就是文件的无限追加,文件会越来越大!

![](/images/2020-11-18-18-25-55.png)

如果aof文件大于64MB,fork一个新的进程来将我们的文件进行重写!

#### 优缺点

优点

1. 每一次修改都会同步，文件的完整性会更加好
2. 每秒同步一次，可能会丢失一秒的数据
3. 从不同步，效率最高

缺点

1. 相对于数据文件来说，aof远远大于rdb，修复速度比rdb慢！
2. Aof运行效率也要比rdb慢，所以我们redis默认的配置就是rdb持久化

### 扩展：

1. RDB 持久化方式能够在指定的时间间隔内对你的数据进行快照存储
2. AOF 持久化方式记录每次对服务器写的操作，当服务器重启的时候会重新执行这些命令来恢复原始的数据，AOF命令以Redis 协议追加保存每次写的操作到文件末尾，Redis还能对AOF文件进行后台重写，使得AOF文件的体积不至于过大。
3. **只做缓存，如果你只希望你的数据在服务器运行的时候存在，你也可以不使用任何持久化**
4. 同时开启两种持久化方式

- 在这种情况下，当redis重启的时候会优先载入AOF文件来恢复原始的数据，因为在通常情况下AOF文件保存的数据集要比RDB文件保存的数据集要完整。
- RDB 的数据不实时，同时使用两者时服务器重启也只会找AOF文件，那要不要只使用AOF呢？作者建议不要，因为RDB更适合用于备份数据库（AOF在不断变化不好备份），快速重启，而且不会有AOF可能潜在的Bug，留着作为一个万一的手段。

5. 性能建议

- 因为RDB文件只用作后备用途，建议只在Slave上持久化RDB文件，而且只要15分钟备份一次就够了，**只保留 save 900 1** 这条规则。
- 如果Enable AOF ，好处是在最恶劣情况下也只会丢失不超过两秒数据，启动脚本较简单只load自己的AOF文件就可以了，代价一是带来了持续的IO，二是AOF rewrite 的最后将 rewrite 过程中产生的新数据写到新文件造成的阻塞几乎是不可避免的。只要硬盘许可，应该尽量减少AOF rewrite的频率，AOF重写的基础大小默认值64M太小了，可以设到5G以上，默认超过原大小100%大小重写可以改到适当的数值。
- 如果不Enable AOF ，仅靠 Master-Slave Repllcation 实现高可用性也可以，能省掉一大笔IO，也减少了rewrite时带来的系统波动。代价是如果Master/Slave 同时倒掉，会丢失十几分钟的数据，启动脚本也要比较两个 Master/Slave 中的 RDB文件，载入较新的那个，微博就是这种架构。

### 如何选择使用哪种持久化方式？

一般来说， 如果想达到足以媲美 PostgreSQL 的数据安全性， 你应该同时使用两种持久化功能。

如果你非常关心你的数据， 但仍然可以承受数分钟以内的数据丢失， 那么你可以只使用 RDB 持久化。

有很多用户都只使用 AOF 持久化， 但并不推荐这种方式： 因为定时生成 RDB 快照（snapshot）非常便于进行数据库备份， 并且 RDB 恢复数据集的速度也要比 AOF 恢复的速度要快。

## Redis发布订阅

Redis 发布订阅(pub/sub)是一种消息通信模式：

发送者(pub)发送消息，订阅者(sub)接收消息。

微信、 微博、关注系统！

 Redis 客户端可以订阅任意数量的频道。 

订阅/发布消息图：
![](/images/2020-11-18-18-32-35.png)
 	  第一个：消息发送者

第二个：频道 

第三个：消息订阅者

下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的关系：

![](/images/2020-11-18-18-33-26.png)

当有新消息通过 PUBLISH 命令发送给频道 channel1 时， 这个消息就会被发送给订阅它的三个客户端：

![](/images/2020-11-18-18-35-49.png)


### 命令

- `PSUBSCRIBE pattern [pattern..]` 订阅一个或多个符合给定模式的频道。
- `PUNSUBSCRIBE pattern [pattern..]` 退订一个或多个符合给定模式的频道。
- `PUBSUB subcommand [argument[argument]]` 查看订阅与发布系统状态。
- `PUBLISH channel message` 向指定频道发布消息
- `SUBSCRIBE channel [channel..]` 订阅给定的一个或多个频道。
- `UNSUBSCRIBE channel [channel..]` 退订一个或多个频道

### 代码示例

```bash
------------订阅端----------------------
127.0.0.1:6379> SUBSCRIBE shane # 订阅shane频道
Reading messages... (press Ctrl-C to quit) # 等待接收消息
1) "subscribe" # 订阅成功的消息
2) "shane"
3) (integer) 1
1) "message" # 接收到来自shane频道的消息 "hello world"
2) "shane" 
3) "hello world"
1) "message" # 接收到来自shane频道的消息 "hello i am shane"
2) "shane"
3) "hello i am shane"
--------------消息发布端-------------------
127.0.0.1:6379> PUBLISH shane "hello world" # 发布消息到shane频道
(integer) 1
127.0.0.1:6379> PUBLISH shane "hello i am shane" # 发布消息
(integer) 1
-----------------查看活跃的频道------------
127.0.0.1:6379> PUBSUB channels

"shane"
```

### 原理

Redis是使用C实现的，通过分析 Redis 源码里的 pubsub.c 文件，了解发布和订阅机制的底层实现，籍此加深对 Redis 的理解。

Redis 通过 PUBLISH 、SUBSCRIBE 和 PSUBSCRIBE 等命令实现发布和订阅功能。

每个 Redis 服务器进程都维持着一个表示服务器状态的 redis.h/redisServer 结构， 结构的 pubsub_channels 属性是一个字典， 这个字典就用于保存订阅频道的信息，其中，字典的键为正在被订阅的频道， 而字典的值则是一个链表， 链表中保存了所有订阅这个频道的客户端。

![](/images/2020-11-18-18-45-34.png)

客户端订阅，就被链接到对应频道的链表的尾部，退订则就是将客户端节点从链表中移除。

### 缺点

1. 如果一个客户端订阅了频道，但自己读取消息的速度却不够快的话，那么不断积压的消息会使redis输出缓冲区的体积变得越来越大，这可能使得redis本身的速度变慢，甚至直接崩溃。
2. 这和数据传输可靠性有关，如果在订阅方断线，那么他将会丢失所有在短线期间发布者发布的消息。

### 应用

1. 消息订阅：公众号订阅，微博关注等等（起始更多是使用消息队列来进行实现）
2. 多人在线聊天室。

稍微复杂的场景，我们就会使用消息中间件MQ处理。

## Redis主从复制

### 概念

主从复制，是指将一台Redis服务器的数据，复制到其他的Redis服务器。前者称为主节点（Master/Leader）,后者称为从节点（Slave/Follower）， 数据的复制是单向的！只能由主节点复制到从节点（<u>主节点以写为主、从节点以读为主</u>）。

默认情况下，每台Redis服务器都是主节点，一个主节点可以有0个或者多个从节点，但每个从节点只能由一个主节点。

### 作用

1. 数据冗余：主从复制实现了数据的热备份，是持久化之外的一种数据冗余的方式。
2. 故障恢复：当主节点故障时，从节点可以暂时替代主节点提供服务，是一种服务冗余的方式
3. 负载均衡：在主从复制的基础上，配合读写分离，由主节点进行写操作，从节点进行读操作，分担服务器的负载；尤其是在多读少写的场景下，通过多个从节点分担负载，提高并发量。
4. 高可用基石：主从复制还是哨兵和集群能够实施的基础。

### 为什么使用集群

一般来说，要将Redis运用于工程项目中，只使用一台Redis是万万不能的（宕机），原因如下：

1. 从结构上，单个Redis服务器会发生单点故障，并且一台服务器需要处理所有的请求负载，压力较大；

2. 从容量上，单个Redis服务器内存容量有限，就算一台Redis服务器内存容量为256G，也不能将所有内存用作Redis存储内存，一般来说，单台Redis最大使用内存不应该超过20G。

电商网站上的商品，一般都是一次上传，无数次浏览的，说专业点也就是"多读少写"。

对于这种场景，我们可以使如下这种架构：

![](/images/2020-11-18-18-47-22.png)

主从复制，读写分离！ 80% 的情况下都是在进行读操作！减缓服务器的压力！架构中经常使用！ 一主二从！

只要在公司中，主从复制就是必须要使用的，因为在真实的项目中不可能单机使用Redis！

### 总结

1. 单台服务器难以负载大量的请求
2. 单台服务器故障率高，系统崩坏概率大
3. 单台服务器内存容量有限。

### 环境配置

只配置从库，不用配置主库！

> 因为默认就是主节点

```bash
127.0.0.1:6379> info replication
# Replication
role:master # 角色
connected_slaves:0 # 从机数量
master_replid:3b54deef5b7b7b7f7dd8acefa23be48879b4fcff
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```

复制3个配置文件，然后修改对应的信息

1. 端口
2. pid名字
3. log文件名
4. dump.rdb名字
5. 修改完毕之后,启动我们的三个redis服务器,可通过进程信息查看!

启动单机多服务集群：

![](/images/2020-11-18-22-24-43.png)

### 一主二从

#### 配置

**默认情况下，每台Redis服务器都是主节点**；我们一般情况下只用配置从机就好了！

认老大！一主（79）二从（80，81）

使用`SLAVEOF host port`就可以为从机配置主机了。

![](/images/2020-11-18-22-27-51.png)

**说明**

- `SLAVEOF host 6379` 找谁当自己的老大！
- `role:slave` # 当前角色是从机
- `master_host:127.0.0.1` # 可以的看到主机的信息

然后主机上也能看到从机的状态：

![](/images/2020-11-18-22-31-28.png)

**说明**

- `connected_slaves:1` # 多了从机的配置
- `slave0:ip=127.0.0.1,port=6380,state=online,offset=42,lag=1` # 多了从机的配置

真实的从主配置应该在配置文件中配置，这样的话是永久的，我们这里使用的是命令，暂时的！

#### 使用规则

1. 从机只能读，不能写，主机可读可写但是多用于写。

```bash
127.0.0.1:6381> set name shane # 从机6381写入失败
(error) READONLY You can't write against a read only replica.
127.0.0.1:6380> set name shane # 从机6380写入失败
(error) READONLY You can't write against a read only replica.
127.0.0.1:6379> set name shane
OK
127.0.0.1:6379> get name
"shane"
```



2. 当主机断电宕机后，默认情况下从机的角色不会发生变化 ，集群中只是失去了写操作，当主机恢复以后，又会连接上从机恢复原状。

3. 当从机断电宕机后，若不是使用配置文件配置的从机，再次启动后作为主机是无法获取之前主机的数据的，若此时重新配置称为从机，又可以获取到主机的所有数据。这里就要提到一个同步原理。

4. 第二条中提到，默认情况下，主机故障后，不会出现新的主机，有两种方式可以产生新的主机：

- 从机手动执行命令slaveof no one,这样执行以后从机会独立出来成为一个主机
- 使用哨兵模式（自动选举）

> 如果没有老大了，这个时候能不能选择出来一个老大呢？手动！

如果主机断开了连接，我们可以使用`SLAVEOF no one`让自己变成主机！其他的节点就可以手动连接到最新的主节点（手动）！如果这个时候老大修复了，那么就重新连接！

#### 复制原理

Slave 启动成功连接到 master 后会发送一个sync同步命令

Master 接到命令，启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令，在后台进程执行完毕之后，**master将传送整个数据文件到slave，并完成一次完全同步**。

**全量复制**：而slave服务在接收到数据库文件数据后，将其存盘并加载到内存中。

**增量复制**：Master 继续将新的所有收集到的修改命令依次传给slave，完成同步

但是只要是重新连接master，一次完全同步（全量复制）将被自动执行！ 我们的数据一定可以在从机中看到！

### 层层链路

上一个M链接下一个S,下一个从机的主机一直是上一个节点.

此时只有第一个节点为主机,它的数据会同步给之后的所有从机(之后的节点都会作为从机)

> 主机断了可以使用`SLAVEOF no one`使自己变为主机!其他节点就需要手动连接到这个主节点

## 哨兵模式

> 自动选举老大的模式

### 概述

主从切换技术的方法是：当主服务器宕机后，需要手动把一台从服务器切换为主服务器，这就需要人工干预，费事费力，还会造成一段时间内服务不可用。这不是一种推荐的方式，更多时候，我们优先考虑哨兵模式。Redis从2.8开始正式提供了Sentinel（哨兵） 架构来解决这个问题。**能够后台监控主机是否故障，如果故障了根据投票数自动将从库转换为主库。**

哨兵模式是一种特殊的模式，首先Redis提供了哨兵的命令，哨兵是一个独立的进程，作为进程，它会独立运行。其原理是哨兵通过发送命令，等待Redis服务器响应，从而监控运行的多个Redis实例。

![](/images/2020-11-19-08-51-39.png)

哨兵的作用：

- 通过发送命令，让Redis服务器返回监控其运行状态，包括主服务器和从服务器。
- 当哨兵监测到master宕机，会自动将slave切换成master，然后通过发布订阅模式通知其他的从服务器，修改配置文件，让它们切换主机。

然而一个哨兵进程对Redis服务器进行监控，可能会出现问题，为此，我们可以使用多个哨兵进行监控。各个哨兵之间还会进行监控，这样就形成了**多哨兵模式**。

![](/images/2020-11-19-08-52-49.png)

假设主服务器宕机，哨兵1先检测到这个结果，系统并不会马上进行failover过程，仅仅是哨兵1主观的认为主服务器不可用，这个现象成为主观下线。当后面的哨兵也检测到主服务器不可用，并且数量达到一定值时，那么哨兵之间就会进行一次投票，投票的结果由一个哨兵发起，进行failover[故障转移]操作。切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的从服务器实现切换主机，这个过程称为**客观下线**。

### 测试

1. 配置哨兵配置文件 sentinel.conf

```bash
# sentinel monitor 被监控的名称 host port 1
sentinel monitor myredis 127.0.0.1 6379 1
```

后面的这个数字1，代表主机挂了，slave投票看让谁接替成为主机，票数最多的，就会成为主机！

2. 启动哨兵！

![](/images/2020-11-19-08-55-58.png)

3. 此时哨兵监视着我们的主机6379，当我们断开主机后：

![](/images/2020-11-19-08-56-37.png)

## 哨兵模式优缺点

优点：

1. 哨兵集群，基于主从复制模式，所有主从复制的优点，它都有
2. 主从可以切换，故障可以转移，系统的可用性更好
3. 哨兵模式是主从模式的升级，手动到自动，更加健壮 

缺点：

1. Redis不好在线扩容，集群容量一旦达到上限，在线扩容就十分麻烦
2. 实现哨兵模式的配置其实是很麻烦的，里面有很多配置项

## 哨兵模式的全部配置

完整的哨兵模式配置文件 sentinel.conf

```bash
# Example sentinel.conf
#哨兵sentinel实例运行的端口 默认26379
port 26379
#哨兵sentinel的工作目录
dir /tmp
#哨兵sentinel监控的redis主节点的 ip port
#master-name  可以自己命名的主节点名字 只能由字母A-z、数字0-9 、这三个字符".-_"组成。
#quorum 当这些quorum个数sentinel哨兵认为master主节点失联 那么这时 客观上认为主节点失联了
#sentinel monitor <master-name> <ip> <redis-port> <quorum>
sentinel monitor mymaster 127.0.0.1 6379 1
#当在Redis实例中开启了requirepass foobared 授权密码 这样所有连接Redis实例的客户端都要提供密码
#设置哨兵sentinel 连接主从的密码 注意必须为主从设置一样的验证密码
#sentinel auth-pass <master-name> <password>
sentinel auth-pass mymaster MySUPER--secret-0123passw0rd
#指定多少毫秒之后 主节点没有应答哨兵sentinel 此时 哨兵主观上认为主节点下线 默认30秒
#sentinel down-after-milliseconds <master-name> <milliseconds>
sentinel down-after-milliseconds mymaster 30000
#这个配置项指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行 同步，
#这个数字越小，完成failover所需的时间就越长，
#但是如果这个数字越大，就意味着越 多的slave因为replication而不可用。
#可以通过将这个值设为 1 来保证每次只有一个slave 处于不能处理命令请求的状态。
#sentinel parallel-syncs <master-name> <numslaves>
sentinel parallel-syncs mymaster 1
#故障转移的超时时间 failover-timeout 可以用在以下这些方面：
#1. 同一个sentinel对同一个master两次failover之间的间隔时间。
#2. 当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那里同步数据时。
#3.当想要取消一个正在进行的failover所需要的时间。
#4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来了
#默认三分钟
#sentinel failover-timeout <master-name> <milliseconds>
sentinel failover-timeout mymaster 180000
SCRIPTS EXECUTION
#配置当某一事件发生时所需要执行的脚本，可以通过脚本来通知管理员，例如当系统运行不正常时发邮件通知相关人员。
#对于脚本的运行结果有以下规则：
#若脚本执行后返回1，那么该脚本稍后将会被再次执行，重复次数目前默认为10
#若脚本执行后返回2，或者比2更高的一个返回值，脚本将不会重复执行。
#如果脚本在执行过程中由于收到系统中断信号被终止了，则同返回值为1时的行为相同。
#一个脚本的最大执行时间为60s，如果超过这个时间，脚本将会被一个SIGKILL信号终止，之后重新执行。
#通知型脚本:当sentinel有任何警告级别的事件发生时（比如说redis实例的主观失效和客观失效等等），将会去调用这个脚本，
#这时这个脚本应该通过邮件，SMS等方式去通知系统管理员关于系统不正常运行的信息。调用该脚本时，将传给脚本两个参数，
#一个是事件的类型，
#一个是事件的描述。
#如果sentinel.conf配置文件中配置了这个脚本路径，那么必须保证这个脚本存在于这个路径，并且是可执行的，否则sentinel无法正常启动成功。
#通知脚本
#sentinel notification-script <master-name> <script-path>
sentinel notification-script mymaster /var/redis/notify.sh
#客户端重新配置主节点参数脚本
#当一个master由于failover而发生改变时，这个脚本将会被调用，通知相关的客户端关于master地址已经发生改变的信息。
#以下参数将会在调用脚本时传给脚本:
#<master-name> <role> <state> <from-ip> <from-port> <to-ip> <to-port>
#目前<state>总是“failover”,
#<role>是“leader”或者“observer”中的一个。
#参数 from-ip, from-port, to-ip, to-port是用来和旧的master和新的master(即旧的slave)通信的
#这个脚本应该是通用的，能被多次调用，不是针对性的。
#sentinel client-reconfig-script <master-name> <script-path>
sentinel client-reconfig-script mymaster /var/redis/reconfig.sh
```



## 缓存穿透与雪崩

### 缓存穿透

> 即查询不到

### 概念

在默认情况下，用户请求数据时，会先在缓存(Redis)中查找，若没找到即缓存未命中，再在数据库中进行查找，数量少可能问题不大，可是一旦大量的请求数据（例如秒杀场景）缓存都没有命中的话，就会全部转移到数据库上，造成数据库极大的压力，就有可能导致数据库崩溃。网络安全中也有人恶意使用这种手段进行攻击被称为洪水攻击。

![](/images/2020-11-19-10-10-08.png)

### 解决方案

#### 布隆过滤器

对所有可能查询的参数以Hash的形式存储，以便快速确定是否存在这个值，在控制层先进行拦截校验，校验不通过直接打回，减轻了存储系统的压力。

![](/images/2020-11-19-10-11-08.png)

#### 缓存空对象

一次请求若在缓存和数据库中都没找到，就在缓存中方一个空对象用于处理后续这个请求。

![](/images/2020-11-19-10-11-58.png)

这样做有一个缺陷：存储空对象也需要空间，大量的空对象会耗费一定的空间，存储效率并不高。解决这个缺陷的方式就是设置较短过期时间

即使对空值设置了过期时间，还是会存在缓存层和存储层的数据会有一段时间窗口的不一致，这对于需要保持一致性的业务会有影响。

### 缓存击穿

> 即量太大，缓存过期

### 概念

相较于缓存穿透，缓存击穿的目的性更强，一个存在的key，在缓存过期的一刻，同时有大量的请求，这些请求都会击穿到DB，造成瞬时DB请求量大、压力骤增。这就是缓存被击穿，只是针对其中某个key的缓存不可用而导致击穿，但是其他的key依然可以使用缓存响应。

 比如热搜排行上，一个热点新闻被同时大量访问就可能导致缓存击穿。

### 解决方案

1. 设置热点数据永不过期

这样就不会出现热点数据过期的情况，但是当Redis内存空间满的时候也会清理部分数据，而且此种方案会占用空间，一旦热点数据多了起来，就会占用部分空间。

2. 加互斥锁(分布式锁)

在访问key之前，采用SETNX（set if not exists）来设置另一个短期key来锁住当前key的访问，访问结束再删除该短期key。保证同时刻只有一个线程访问。这样对锁的要求就十分高。

![](/images/2020-11-19-10-16-16.png)

### 缓存雪崩

### 概念

大量的key设置了相同的过期时间，导致在缓存在同一时刻全部失效，造成瞬时DB请求量大、压力骤增，引起雪崩。

缓存雪崩，是指在某一个时间段，缓存集中过期失效。Redis 宕机！

产生雪崩的原因之一，比如在写本文的时候，马上就要到双十二零点，很快就会迎来一波抢购，这波商品时间比较集中的放入了缓存，假设缓存一个小时。那么到了凌晨一点钟的时候，这批商品的缓存就都过期了。而对这批商品的访问查询，都落到了数据库上，对于数据库而言，就会产生周期性的压力波峰。于是所有的请求都会达到存储层，存储层的调用量会暴增，造成存储层也会挂掉的情况。

![](/images/2020-11-19-10-17-48.png)

其实集中过期，倒不是非常致命，比较致命的缓存雪崩，是缓存服务器某个节点宕机或断网。因为自然形成的缓存雪崩，一定是在某个时间段集中创建缓存，这个时候，数据库也是可以顶住压力的。无非就是对数据库产生周期性的压力而已。而缓存服务节点的宕机，对数据库服务器造成的压力是不可预知的，很有可能瞬间就把数据库压垮。

### 解决方案

#### redis高可用

这个思想的含义是，既然redis有可能挂掉，那我多增设几台redis，这样一台挂掉之后其他的还可以继续工作，其实就是搭建的集群.

> 异地多活

#### 限流降级

这个解决方案的思想是，在缓存失效后，通过加锁或者队列来控制读数据库写缓存的线程数量。比如对某个key只允许一个线程查询数据和写缓存，其他线程等待。

#### 数据预热

数据加热的含义就是在正式部署之前，我先把可能的数据先预先访问一遍，这样部分可能大量访问的数据就会加载到缓存中。在即将发生大并发访问前手动触发加载缓存不同的key，设置不同的过期时间，让缓存失效的时间点尽量均匀。

---


整理不易，转载请注明出处。 相关视频教程可参考狂神说