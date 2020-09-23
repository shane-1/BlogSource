# MySQL

## 初识MySQL

JavaEE: 企业级java开发 web

前端(页面: 展示,数据!)

后台(连接点: 连接数据库JDBC, 链接前端(控制,控制视图调转和给前端传递数据))

数据库(存数据, Txt, Excel, Word)

## 数据库简介

数据库(DB, DataBase)

概念:数据仓库, **软件**, 安装在操作系统之上! SQL, 可以存储大量的数据

作用: 存储数据,管理数据

## 数据库分类

### 关系型数据库(SQL)

- MySQL, Oracle, Sql Server, DB2, SQLlite
- 通过表与表之间,行和列之间的关系进行数据的存储, 学员信息表, 考勤表, ....

### 非关系型数据库(NoSQL- Not Only)

- Redis, MongDB
- 非关系型数据库, 对象储存, 通过对象的自身的属性来决定

## <u>DBMS</u><u>数据库管理系统</u>

- 数据库的管理软件, 科学有效的管理我们的数据.维护和获取数据;
- MySQL,数据库管理系统

## MySQL简介

> SQL + NoSQL

MySQL是一个**关系型数据库管理系统**

前世:瑞典MySQL AB公司

今生:属于Oracle旗下产品

MySQL是最好的RDBMS(Relational Database Management System)应用软件之一

开源的数据库软件

体积小, 速度快, 总体拥有成本低, 招人成本低

中小型网站, 或大型网站,集群.

[官网](https://www.mysql.com)

- 安装建议:
  1. 尽量不要安装exe(注册表难以清理)
  2. 尽可能压缩包安装~

## 安装MySQL

**这里建议大家使用压缩版,安装快,方便.不复杂.**

### 软件下载

mysql5.7 64位下载地址:

https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.19-winx64.zip

电脑是64位的就下载使用64位版本的！



### 安装步骤

1、下载后得到zip压缩包.

2、解压到自己想要安装到的目录，本人解压到的是D:\Environment\mysql-5.7.19

3、添加环境变量：我的电脑->属性->高级->环境变量

```
选择PATH,在其后面添加: 你的mysql 安装文件下面的bin文件夹
```

4、编辑 my.ini 文件 ,注意替换路径位置

```
[mysqld]
basedir=D:\Program Files\mysql-5.7\
datadir=D:\Program Files\mysql-5.7\data\
port=3306
skip-grant-tables
```

5、启动管理员模式下的CMD，并将路径切换至mysql下的bin目录，然后输入mysqld –install (安装mysql)

6、再输入  mysqld --initialize-insecure --user=mysql 初始化数据文件

7、然后再次启动mysql 然后用命令 mysql –u root –p 进入mysql管理界面（密码可为空）

8、进入界面后更改root密码

```
update mysql.user set authentication_string=password('123456') where user='root' and Host = 'localhost';
```

9、刷新权限

```
flush privileges;
```

10、修改 my.ini文件删除最后一句skip-grant-tables

11、重启mysql即可正常使用

```
net stop mysql
net start mysql
```

12、连接上测试出现以下结果就安装好了

![](/images/2020-09-23-23-22-27.png)

一步步去做 , 理论上是没有任何问题的 .

如果您以前装过,现在需要重装,一定要将环境清理干净 .

好了,到这里大家都装好了,因为刚接触,所以我们先不学习命令.



## 推荐工具 : **SQLyog** 

即便有了可视化工具,可是基本的DOS命名大家还是要记住!

可手动操作,管理MySQL数据库的软件工具

特点 : 简洁 , 易用 , 图形化

![](/images/2020-09-23-23-24-23.png)

![](/images/2020-09-23-23-25-07.png)

使用SQLyog管理工具自己完成以下操作 :

- 连接本地MySQL数据库

- 新建MySchool数据库

- - 字段
  - GradeID : int(11) , Primary Key (pk)
  - GradeName : varchar(50)
  - 数据库名称MySchool
  - 新建数据库表(grade)

在历史记录中可以看到相对应的数据库操作的语句 .

> 连接数据库

打开MySQL命令窗口

- 在DOS命令行窗口进入 **安装目录\mysql\bin**
- 可设置环境变量，设置了环境变量，可以在任意目录打开！

**连接数据库语句 :** mysql -h 服务器主机地址 -u 用户名 -p 用户密码

注意 : -p后面不能加空格,否则会被当做密码的内容,导致登录失败 !

**几个基本的数据库操作命令 :**

```
update user set password=password('123456')where user='root'; 修改密码
flush privileges; 刷新数据库
show databases; 显示所有数据库
use dbname；打开某个数据库
show tables; 显示数据库mysql中所有的表
describe user; 显示表mysql数据库中user表的列信息
create database name; 创建数据库
use databasename; 选择数据库

exit; 退出Mysql
? 命令关键词 : 寻求帮助
-- 表示注释
```

