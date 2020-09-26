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

### <u>DBMS数据库管理系统</u>

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

5、启动管理员模式下的CMD，并将路径切换至mysql下的bin目录，然后输入`mysqld –install `(安装mysql)

6、再输入  `mysqld --initialize-insecure --user=mysql` 初始化数据文件

7、然后再次启动mysql`net start mysql` 然后用命令 `mysql –u root –p` 进入mysql管理界面（密码可为空）

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

## 连接数据库

打开MySQL命令窗口

- 在DOS命令行窗口进入 **安装目录\mysql\bin**
- 可设置环境变量，设置了环境变量，可以在任意目录打开！

**连接数据库语句 :** mysql -h 服务器主机地址 -u 用户名 -p 用户密码

> 注意 : -p后面不能加空格,否则会被当做密码的内容,导致登录失败 !

```sc delete mysql  //清空mysql服务,不建议轻易使用```

## 基本数据库操作命令 

```sql
update user set password=password('123456')where user='root'; 
update mysql.user set authentication_string=password('123456')where user ='root' and Host = 'localhost';
--修改密码
flush privileges;-- 刷新数据库权限
----------------------------------------------------------
--所有的语句都用;结尾
show databases; --显示所有数据库
use dbname；--打开某个数据库

show tables; --显示数据库mysql中所有的表
describe user; --显示表mysql数据库中user表的列信息

create database name; --创建数据库

exit; --退出Mysql
? 命令关键词 : --寻求帮助

 -- 表示注释
/*
多行注释
*/
```

## 结构化查询语句分类

|                    名称                     |                    解释                     |          命令           |
| :-----------------------------------------: | :-----------------------------------------: | :---------------------: |
|  数据定义语言-DDL:Data Definition Language  |    定义和管理数据对象,如数据库,数据表等     |  CREATE、 DROP, ALTER   |
| 数据操纵语言-DML:Data Manipulation Language |      用于操作数据库对象中所包含的数据       | INSERT, UPDATE, DELETE  |
|    数据查询语言-DQL:Data Query Language     |             用于查询数据库数据              |         SELECT          |
|   数据控制语言-DCL:Data Control Language    | 用于管理数据库的语言,包括管理权限及数据更改 | GRANT, commit. rollback |

## 数据库操作

操作数据库>操作数据库中的表>操作数据库中表的数据

SQL大小写不敏感

### 命令行操作数据库

1. 创建数据库 :  

```sql
create database [if not exists] 数据库名;
```



2. 删除数据库 : 

```sql
drop database [if exists] 数据库名;
```



3. 查看数据库 :

```sql
show databases; --查看所有数据库
```



4. 使用数据库 :

- ```sql
  use `数据库名`;
  ```

> ```sql
> --如果你的表名或者字段名为特殊字段,,需要用**tab**键上的``符号框起来.例如:
> USE `user`
> ```

<u>对比工具操作数据库</u>

**学习方法**：

- 对照SQLyog工具自动生成的语句学习
- 固定语法中的单词需要记忆
- ![](/images/2020-09-26-18-17-22.png)



## 创建数据表

属于DDL的一种，语法 :

```sql
create table [if not exists] `表名`(
   '字段名1' 列类型 [属性][索引][注释],
   '字段名2' 列类型 [属性][索引][注释],
  #...
   '字段名n' 列类型 [属性][索引][注释]
)[表类型][表字符集][注释];
```

**说明 :** 反引号用于区别MySQL保留字与普通字符而引入的 (键盘esc下面的键).



## 数据值和列类型

列类型 : 规定数据库中该列存放的数据类型

### 数值类型

![](/images/2020-09-26-18-57-05.png)

> **金融计算时,一般使用decimal**

### 字符串类型

![](/images/2020-09-26-18-59-33.png)

> - 变量名常用varchar,长文档用text
>
> - int(3): 3表示显示长度,与本身int长度无关,**最大显示宽度为255**
>
> - verchar(3): 3直接影响数据库存储长度

### 日期和时间型数值类型 

![](/images/2020-09-26-19-03-29.png)

### NULL值

- 理解为 "没有值" 或 "未知值"
- **不要用NULL进行算术运算** , 结果仍为NULL



## <u>数据字段属性</u>

### UnSigned

- 无符号的
- 声明该数据列不允许负数 .

### ZEROFILL

- 0填充的
- 不足位数的用0来填充 , 如int(3),   `5--->005`

### Auto_InCrement

- 自动增长的 , 每添加一条数据 , 自动在上一个记录数上加 1(默认)

- 通常用于设置**主键** , 且为整数类型

- 可定义起始值和步长

- - 当前表设置步长(AUTO_INCREMENT=100) : 只影响当前表
  - SET @@auto_increment_increment=5 ; 影响所有使用自增的表(全局)

### NULL 和 NOT NULL

- 默认为NULL , 即没有插入该列的数值
- 如果设置为NOT NULL , 则该列必须有值

### DEFAULT

- 默认的
- 用于设置默认值
- 例如,性别字段,默认为"男" , 否则为 "女" ; 若无指定该列的值 , 则默认值为"男"的值

>```sql
>/*
>扩展:
>alibaba standard
>*/
>id --主键
>`version` --乐观锁
>is_delete --伪删除
>gmt_create --创建时间
>gmt_update --修改时间
>```

### 示例

```sql
-- 目标 : 创建一个school数据库
-- 创建学生表(列,字段)
-- 学号int 登录密码varchar(20) 姓名,性别varchar(2),出生日期(datatime),家庭住址,email
-- 创建表之前 , 一定要先选择数据库

--主要英文状态(), 表的 名称 和 字段尽量	`` 括起来
--AOTO_INCREMENT 自增
--字符串用单引号括起来
--所有语句后加, 最后一项不加

CREATE TABLE IF NOT EXISTS `student` (
`id` int(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
`name` varchar(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
`pwd` varchar(20) NOT NULL DEFAULT '123456' COMMENT '密码',
`sex` varchar(2) NOT NULL DEFAULT '男' COMMENT '性别',
`birthday` datetime DEFAULT NULL COMMENT '生日',
`address` varchar(100) DEFAULT NULL COMMENT '地址',
`email` varchar(50) DEFAULT NULL COMMENT '邮箱',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

-- 查看数据库的定义
```

> 格式
>
> ```sql
> CREATE TABlE [IF NOT EXISTS] `表名`(
> 	`字段名` 列类型 [属性] [索引] [注释],   
>    `字段名` 列类型 [属性] [索引] [注释],
>    ......
>    `字段名` 列类型 [属性] [索引] [注释]
> )[表的类型][字符集类型][注释]
> ```

### 查看数据库定义

```sql
--查看数据库的定义
SHOW CREATE DATABASE school;

-- 查看数据表的定义
SHOW CREATE TABLE student;

-- 显示表结构
DESC student;  

-- 设置严格检查模式(不能容错了)
SET sql_mode='STRICT_TRANS_TABLES';
```

## 数据表的类型

### 设置数据表的类型

```sql
CREATE TABLE 表名(
   -- 省略一些代码
   -- Mysql注释
   -- 1. # 单行注释
   -- 2. /*...*/ 多行注释
)ENGINE = MyISAM (or InnoDB)

-- 查看mysql所支持的引擎类型 (表类型)
SHOW ENGINES;
```

MySQL的数据表的类型 : **MyISAM** , **InnoDB** , HEAP , BOB , CSV等...

> 默认使用InnoDB,早年使用MyISAM

常见的 MyISAM 与 InnoDB 类型：

![](/images/2020-09-26-21-54-04.png)

经验 ( 适用场合 )  :

- 适用 MyISAM : 节约空间, 速度较快
- 适用 InnoDB : 安全性 , 事务处理及多用户操作数据表

### 数据表的存储位置

- MySQL数据表以文件方式存放在磁盘中

- - 包括表文件 , 数据文件 , 以及数据库的选项文件
  - 位置 : Mysql安装目录\data\下存放数据表 . 目录名对应数据库名 , 该目录下文件名对应数据表 .

- 注意 :

- - \* . frm -- 表结构定义文件

  - \* . MYD -- 数据文件 ( data )

  - \* . MYI -- 索引文件 ( index )

  - InnoDB类型数据表只有一个 *.frm文件 , **以及上一级目录的ibdata1文件**

  - MyISAM类型数据表对应三个文件 :
  
  ![](/images/2020-09-26-21-56-47.png)

### 设置数据表字符集

我们可为数据库,数据表,数据列设定不同的字符集，设定方法 :

- 创建时通过命令来设置 , 如 :` CREATE TABLE 表名()CHARSET = utf8;`

  > 不设置的话,使用默认字符集编码,不支持中文.

- 如无设定 , 则根据MySQL数据库配置文件 my.ini 中的参数设定



### 修改数据库

#### 修改表 ( ALTER TABLE )

##### 修改表名 :

> ALTER TABLE 旧表名 RENAME AS 新表名

##### 添加字段 :

> ALTER TABLE 表名 ADD字段名 列属性[属性]

##### 修改字段 :

- ###### 修改约束:

> ALTER TABLE 表名 MODIFY 字段名 列类型[属性]

- ###### 修改字段名:

> ALTER TABLE 表名 CHANGE 旧字段名 新字段名 列属性[属性]

##### 删除字段 :  

ALTER TABLE 表名

DROP 字段名



##### 删除数据表

语法：DROP TABLE [IF EXISTS] 表名

- IF EXISTS为可选 , 判断是否存在该数据表
- 如删除不存在的数据表会抛出错误

> **所有的创建和删除操作尽量加上判断,以免报错~**

### 其他

```
1. 可用反引号（`）为标识符（库名、表名、字段名、索引、别名）包裹，以避免与关键字重名！中文也可以作为标识符！

2. 每个库目录存在一个保存当前数据库的选项文件db.opt。

3. 注释：
  单行注释 # 注释内容
  多行注释 /* 注释内容 */
  单行注释 -- 注释内容      
  (标准SQL注释风格，要求双破折号后加一空格符（空格、TAB、换行等）)
   
4. 模式通配符：
  _   任意单个字符
  %   任意多个字符，甚至包括零字符
  单引号需要进行转义 \'
   
5. CMD命令行内的语句结束符可以为 ";", "\G", "\g"，仅影响显示结果。其他地方还是用分号结束。delimiter 可修改当前对话的语句结束符。

6. SQL对大小写不敏感 （关键字）

7. 清除已有语句：\c
```

### 外键

> 外键概念

如果公共关键字在一个关系中是主关键字，那么这个公共关键字被称为另一个关系的外键。由此可见，外键表示了两个关系之间的相关联系。以另一个关系的外键作主关键字的表被称为**主表**，具有此外键的表被称为主表的**从表**。

在实际操作中，将一个表的值放入第二个表来表示关联，所使用的值是第一个表的主键值(在必要时可包括复合主键值)。此时，第二个表中保存这些值的属性称为外键(**foreign key**)。

**外键作用**

保持数据**一致性**，**完整性**，主要目的是控制存储在外键表中的数据,**约束**。使两张表形成关联，外键只能引用外表中的列的值或使用空值。



> 创建外键

建表时指定外键约束

```
-- 创建外键的方式一 : 创建子表同时创建外键

-- 年级表 (id\年级名称)
CREATE TABLE `grade` (
`gradeid` INT(10) NOT NULL AUTO_INCREMENT COMMENT '年级ID',
`gradename` VARCHAR(50) NOT NULL COMMENT '年级名称',
PRIMARY KEY (`gradeid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

-- 学生信息表 (学号,姓名,性别,年级,手机,地址,出生日期,邮箱,身份证号)
CREATE TABLE `student` (
`studentno` INT(4) NOT NULL COMMENT '学号',
`studentname` VARCHAR(20) NOT NULL DEFAULT '匿名' COMMENT'姓名',
`sex` TINYINT(1) DEFAULT '1' COMMENT '性别',
`gradeid` INT(10) DEFAULT NULL COMMENT '年级',
`phoneNum` VARCHAR(50) NOT NULL COMMENT '手机',
`address` VARCHAR(255) DEFAULT NULL COMMENT '地址',
`borndate` DATETIME DEFAULT NULL COMMENT '生日',
`email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
`idCard` VARCHAR(18) DEFAULT NULL COMMENT '身份证号',
PRIMARY KEY (`studentno`),
KEY `FK_gradeid` (`gradeid`),
CONSTRAINT `FK_gradeid` FOREIGN KEY (`gradeid`) REFERENCES `grade` (`gradeid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8
```

建表后修改

```
-- 创建外键方式二 : 创建子表完毕后,修改子表添加外键
ALTER TABLE `student`
ADD CONSTRAINT `FK_gradeid` FOREIGN KEY (`gradeid`) REFERENCES `grade` (`gradeid`);
```



> 删除外键

操作：删除 grade 表，发现报错

![img](https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7LCI6xGKJ7bKiaBudOSBHd9dAFiaLn6yfOjQtCB0o2bo5uaJH6GKpmGXVCbrFKSzQOeMKpPbG57dIgA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**注意** : 删除具有主外键关系的表时 , 要先删子表 , 后删主表

```
-- 删除外键
ALTER TABLE student DROP FOREIGN KEY FK_gradeid;
-- 发现执行完上面的,索引还在,所以还要删除索引
-- 注:这个索引是建立外键的时候默认生成的
ALTER TABLE student DROP INDEX FK_gradeid;
```



### DML语言

**数据库意义** ： 数据存储、数据管理

**管理数据库数据方法：**

- 通过SQLyog等管理工具管理数据库数据
- 通过**DML语句**管理数据库数据

**DML语言**  ：数据操作语言

- 用于操作数据库对象中所包含的数据

- 包括 :

- - INSERT (添加数据语句)
  - UPDATE (更新数据语句)
  - DELETE (删除数据语句)



### 添加数据

> INSERT命令

**语法：**

```
INSERT INTO 表名[(字段1,字段2,字段3,...)] VALUES('值1','值2','值3')
```

**注意 :** 

- 字段或值之间用英文逗号隔开 .
- ' 字段1,字段2...' 该部分可省略 , 但添加的值务必与表结构,数据列,顺序相对应,且数量一致 .
- 可同时插入多条数据 , values 后用英文逗号隔开 .

```
-- 使用语句如何增加语句?
-- 语法 : INSERT INTO 表名[(字段1,字段2,字段3,...)] VALUES('值1','值2','值3')
INSERT INTO grade(gradename) VALUES ('大一');

-- 主键自增,那能否省略呢?
INSERT INTO grade VALUES ('大二');

-- 查询:INSERT INTO grade VALUE ('大二')错误代码：1136
Column count doesn`t match value count at row 1

-- 结论:'字段1,字段2...'该部分可省略 , 但添加的值务必与表结构,数据列,顺序相对应,且数量一致.

-- 一次插入多条数据
INSERT INTO grade(gradename) VALUES ('大三'),('大四');
```

**练习题目** 

自己使用INSERT语句为课程表subject添加数据 . 使用到外键.



### 修改数据

> update命令

语法：

```
UPDATE 表名 SET column_name=value [,column_name2=value2,...] [WHERE condition];
```

**注意 :** 

- column_name 为要更改的数据列
- value 为修改后的数据 , 可以为变量 , 具体指 , 表达式或者嵌套的SELECT结果
- condition 为筛选条件 , 如不指定则修改该表的所有列数据



> where条件子句

可以简单的理解为 : 有条件地从表中筛选数据

![img](https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7LCI6xGKJ7bKiaBudOSBHd9dyJWPxp3H9GicphPXMEvCwtUyKX3vibUCESqSaDnKnLzlwYpcRTJsdUIg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)测试：

```
-- 修改年级信息
UPDATE grade SET gradename = '高中' WHERE gradeid = 1;
```



### 删除数据

> DELETE命令

语法：

```
DELETE FROM 表名 [WHERE condition];
```

注意：condition为筛选条件 , 如不指定则删除该表的所有列数据

```
-- 删除最后一个数据
DELETE FROM grade WHERE gradeid = 5
```



> TRUNCATE命令

作用：用于完全清空表数据 , 但表结构 , 索引 , 约束等不变 ;

语法：

```
TRUNCATE [TABLE] table_name;

-- 清空年级表
TRUNCATE grade
```

**注意：区别于DELETE命令**

- 相同 : 都能删除数据 , 不删除表结构 , 但TRUNCATE速度更快

- 不同 :

- - 使用TRUNCATE TABLE 重新设置AUTO_INCREMENT计数器
  - 使用TRUNCATE TABLE不会对事务有影响 （事务后面会说）

测试：

```
-- 创建一个测试表
CREATE TABLE `test` (
`id` INT(4) NOT NULL AUTO_INCREMENT,
`coll` VARCHAR(20) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

-- 插入几个测试数据
INSERT INTO test(coll) VALUES('row1'),('row2'),('row3');

-- 删除表数据(不带where条件的delete)
DELETE FROM test;
-- 结论:如不指定Where则删除该表的所有列数据,自增当前值依然从原来基础上进行,会记录日志.

-- 删除表数据(truncate)
TRUNCATE TABLE test;
-- 结论:truncate删除数据,自增当前值会恢复到初始值重新开始;不会记录日志.

-- 同样使用DELETE清空不同引擎的数据库表数据.重启数据库服务后
-- InnoDB : 自增列从初始值重新开始 (因为是存储在内存中,断电即失)
-- MyISAM : 自增列依然从上一个自增数据基础上开始 (存在文件中,不会丢失)
```