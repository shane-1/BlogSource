# Mybatis

![](/images/2020-09-18-10-30-16.png)

>基于<br>JDK1.8<br> Mysql5.7<br>maven3.6.1<br>IDEA

## 1. 简介

### 1.1 什么是Mybatis

+ MyBatisMyBatis是一款优秀的"持久层框架
+ 它支持定制化SQL、存储过程以及高级映射。
+ MyBatis避免了几乎所有的JDBC代码和手动设置参数以及获取结果集。
+ MyBatis可以使用简单的XML或注解来配置和映射原生类型、接口和Java的PoJo (Plain Old JavaObjects,普通老式Java对象)为数据库中的记录。

### 1.2 如何获得Mybatis?

+ maven仓库:

```xml
1 <!--https://mvnrepository.com/artifact/org.mybatis/mybatis-->
<dependency>
    <groupId>org. mybatis</groupId>
    <artifactid>mybatiss/artifactid>
    <version>3.5.2s/version> 
</dependency>
```

+ [Github](https://github.com/mybatis/mybatis-3/releases)
+ [中文文档](https://mybatis.org/mybatis-3/zh/index.html)

### 1.3 持久化

#### 数据持久化

+ 持久化就是将程序的数据在持久状态和瞬时状态转化的过程
+ 内存:*断电即失*
+ 数据库(JDBC), io文件持久化

### 1.4 持久层

- 完成持久化工作的代码块
- 层界限十分明显

### 1.5 为什么需要Mybatis

- 帮助程序猿将数据存入数据库
- 方便
- 传统JDBC代码太复杂.简化. 框架. 自动化
- 不用Mybatis也可以. 更容易上手. **技术没有高低之分**
- 优点
  - 简单易学
  - 灵活
  - sql和代码分离, 提高了可维护性
  - 提供映射标签,支持对象与数据库的orm字段关系映射
  - 提供对象关系映射标签, 支持对象关系组建维护
  - 提供xml标签,支持动态sql

## 2. 第一个Mybatis程序

### 2.1 搭建环境

搭建数据库

```mysql
CREATE DATABASE 'mybatis';
USE 'mybatis';

CREATE TABLE 'user'{
	'id' INT(20) NOT NULL PRIMARY KEY,
	'name' VARCHAR(30) DEFAULT NULL,
	'pwd' VARCHAR(30) DEFAULT NULL
} ENGINE = INNODB DEFAULT CHARSET = utf8;

INSERT INTO 'user'{'id', 'name', 'pwd'} VALUES
{1, '张三', '12345'},
{2, '李四', '12346'}
```

新建项目

1. 新建一个普通的maven项目
2. 删除src目录
3. 导入maven依赖
4. 



---

整理不易，转载请注明出处。


