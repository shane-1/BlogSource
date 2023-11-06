# 基于 ADS 平台流水线的 Flyway 实践

![](/images/2021-08-03-18-28-48.png)

## 一、前言

随着项目的不断迭代，数据库表结构、数据都在发生着变化。甚至有的业务在多环境版本并行运行。数据为王的时代，管理好数据库的版本也成为了迫切的需要。如何能做到像 **Git** 之类的版本控制工具来管理数据库？

 **Flyway** 是一个敏捷工具，用于数据库的移植。采用 Java 开发，支持所有兼容 JDBC 的数据库。

主要用于在你的应用版本不断升级的同时，升级你的数据库结构和里面的数据。

支持的数据库
>
Oracle、SQL Server、DB2、MySQL、Aurora MySQL、MariaDB、Percona XtraDB 群集、PostgreSQL、Aurora PostgreSQL、Redshift、CockroachDB、SAP HANA、Sybase ASE、Informix、H2、HSQLDB、Derby、SQLite、Firebird

## 二、Flyway 的特点

**Flyway** 大受欢迎是因为它具有以下优点：

- **简单** 非常容易安装和学习，同时迁移的方式也很容易被开发者接受。

- **专一** **Flyway** 专注于搞数据库迁移、版本控制而并没有其它副作用。

- **强大** 专为连续交付而设计。让 Flyway 在应用程序启动时迁移数据库。

## 三、Flyway 的工作机制

**Flyway** 需要在 DB 中先创建一个 metadata 表 (缺省表名为 flyway_schema_history), 在该表中保存着每次 migration（迁移）的记录，记录包含 migration 脚本的版本号和 **SQL** 脚本的 checksum 值。下图表示了多个数据库版本。
![](/images/2021-08-03-18-31-38.png)
对应的 <u>metadata</u> 表记录：

| **installed_rank** | **version** | **description**   | **type** | **script**                | **checksum**   | **installed_by** | **installed_on**           | **execution_time** | **success** |
| ------------------ | ----------- | ----------------- | -------- | ------------------------- | -------------- | ---------------- | -------------------------- | ------------------ | ----------- |
| **1**              | **1**       | **Initial Setup** | **SQL**  | **V1__Initial_Setup.sql** | **1996767037** | **axel**         | **2016-02-04  22:23:00.0** | **546**            | **true**    |
| **2**              | **2**       | **First Changes** | **SQL**  | **V2__First_Changes.sql** | **1279644856** | **axel**         | **2016-02-06  09:18:00.0** | **127**            | **true**    |

**Flyway** 扫描文件系统或应用程序的类路径读取 **DDL** 和 **DML** 以进行迁移。根据<u>metadata</u> 表进行检查迁移。**如果脚本声明的版本号小于或等于标记为当前版本的版本号之一，将忽略它们。其余迁移是待处理迁移：可用，但未应用。最后按版本号对它们进行排序并按顺序执行** **并将执行结果写入** **metadata** **表。**

对应的 <u>metadata</u> 表记录：

| **installed_rank** | **version** | **description**   | **type** | **script**                | **checksum**   | **installed_by** | **installed_on**           | **execution_time** | **success** |
| ------------------ | ----------- | ----------------- | -------- | ------------------------- | -------------- | ---------------- | -------------------------- | ------------------ | ----------- |
| **1**              | **1**       | **Initial Setup** | **SQL**  | **V1__Initial_Setup.sql** | **1996767037** | **axel**         | **2016-02-04  22:23:00.0** | **546**            | **true**    |
| **2**              | **2**       | **First Changes** | **SQL**  | **V2__First_Changes.sql** | **1279644856** | **axel**         | **2016-02-06  09:18:00.0** | **127**            | **true**    |
| **3**              | **2.1**     | **Refactoring**   | **JDBC** | **V2_1__Refactoring**     | **axel**       | **2016-02-10**   | **17:45:05.4**             | **251**            | **true**    |

Flyway 支持命令行（需要下载命令行工具）和 **Java Api** ，也支持构建工具 **Maven** 和 **Gradle** 。这里我们主要介绍和 ADS 流水线的集成

## 四、Flyway 的规则

**Flyway** 是如何比较两个 **SQL** 文件的先后顺序呢？它采用 **采用左对齐原则****,** **缺位用** **0** **代替** 。举几个例子：

1.0.1.1 比 1.0.1 版本高。

1.0.10 比 1.0.9.4 版本高。

1.0.10 和 1.0.010 版本号一样高，每个版本号部分的前导 0 会被忽略。

**Flyway** 将 **SQL** 文件分为 **Versioned** 、**Repeatable** 和 **Undo** 三种：

-  **Versioned** 用于版本升级，每个版本有唯一的版本号并只能执行一次。

-    **Repeatable** 可重复执行，当 **Flyway**检测到 **Repeatable** 类型的 **SQL** 脚本的 checksum 有变动，**Flyway** 就会重新应用该脚本。它并不用于版本更新，这类的 migration 总是在 **Versioned** 执行之后才被执行。

- **Undo** 用于撤销具有相同版本的版本化迁移带来的影响。但是该回滚过于粗暴，过于机械化，一般不推荐使用。一般建议使用 **Versioned** 模式来解决。

这三种的命名规则如下图：

![](/images/2021-08-03-18-44-09.png)

- **Prefix** 可配置，前缀标识，默认值 V 表示 **Versioned**, R 表示 **Repeatable**, U 表示 **Undo**

- **Version** 标识版本号，由一个或多个数字构成，数字之间的分隔符可用点 . 或下划线 _

- **Separator** 可配置，用于分隔版本标识与描述信息，默认为两个下划线 __

- **Description** 描述信息，文字之间可以用下划线 _ 或空格 分隔

- **Suffix** 可配置，后续标识，默认为 .sql

## 五、Flyway ADS 代理配置

1. 下载`flyway-commandline-7.9.1-linux-x64.tar`包到安装目录
2. 使用`tar zxvf flyway-commandline-7.9.1-linux-x64.tar` 解压文件
3. 使用`vi /etc/profile` 编辑环境变量
4. 添加 flyway 安装路径到环境变量
    ![](/images/2021-08-03-18-51-17.png)
5. 使用`source /etc/profile `更新环境变量
6. 配置 ADS 代理机

## 六、ADS 流水线配置

1. Spring 后端项目建议在代码库的`src\main\resources`下的`DB\migration`存放 Sql 脚本文件

![](/images/2021-08-03-18-53-21.png)

**三级目录命名规则**

- 版本号命名的目录：如 V1.0.0，存放该版本中的数据库升级脚本（包含需要手工处理和自动处理的脚本）和 check 脚本；
- Views：存放 R 开头脚本及一些回调脚本，该目录下的脚本为每次执行完 V 目录下的脚本后均会重复执行的脚本；

2. 将要执行的 Sql 脚本按照命名规则放到对应文件夹中

![](/images/2021-08-03-18-55-35.png)   

3. 打开 ADS-Piplines-发布 配置 ADS 部署流水线

![](/images/2021-08-03-18-56-37.png)   

4. 选择对应发布管道，点击编辑

![](/images/2021-08-03-18-57-19.png)   

5. 选择对应阶段编辑，选择添加，输入<u>flyway</u>搜索，添加`Flyway CLI`

![](/images/2021-08-03-18-58-54.png)

6. Command 选择 baseline

![](/images/2021-08-03-18-59-33.png)

7. 选择输入框后面小点指定脚本目录

![](/images/2021-08-03-19-00-20.png)

8. 选择 sql 脚本存储的`src\main\resources`下的`DB\migration`目录

![](/images/2021-08-03-19-02-15.png)

9.  配置好对应数据库的 url 和账户密码  

![](/images/2021-08-03-19-02-55.png)

10. 再次选择添加，输入“flyway“搜索，再添加 Flyway CLI

11. 将 Command 选择为 migrate，其他配置与之前相同

![](/images/2021-08-03-19-03-45.png)

12. 保存流水线

    > 注意：首次执行CD后会在数据库生成flyway_schema_history表

**建议首次执行后再次编辑流水线，禁用 flyway baseline 任务**

![](/images/2021-08-03-19-05-52.png)

## 六、Flyway 基础命令

### **Migrate**

Migrate 命令将模式迁移到最新版本。如果模式历史表不存在，Flyway 会自动创建它。

![](/images/2021-08-03-19-07-04.png)

Migrate 是 Flyway 工作流的核心。它会扫描文件系统或类路径，寻找可用的迁移，然后和数据库已经应用的迁移进行比较。如果发现有什么不同，就会迁移数据库以缩小差距。

Migrate 最好在应用程序启动时执行，从而避免数据库和期望代码之间出现不兼容的情况。

### **Clean**

Clean 命令删除已配置模式中的所有对象。

![](/images/2021-08-03-19-10-09.png)

Clean 对开发测试有很大帮助。它能将你已配置的模式完全清除，从而有效地提供一个全新的开始。所有对象（表、视图、过程……）都会被删除。

### **Info**

Info 命令打印所有迁移的详细信息和状态信息。
