# Mybatis

![](/images/2020-09-18-10-30-16.png)

>基于
>
>- JDK1.8
>- Mysql5.7
>- maven3.6.1
>- IDEA

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

### maven配置

#### 环境变量配置

系统环境变量配置

- `M2_HOME` maven bin解压后目录下的bin目录
>spring默认
- `MAVEN_HOME` maven的目录
- 在path中增加配置`%MAVEN_HOME%\bin

#### maven阿里云镜像

setting.xml

```xml
<mirrors>
  <mirror>
    <id>alimaven</id>
    <mirrorOf>*,!jeecg,!jeecg-snapshots</mirrorOf>
    <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  </mirror>
</mirrors>
```

#### 本地仓库

localRepository

```xml
<localRepository>D:\Environment\apache-maven-3.6.2\maven-repo</localRepository>
```

#### pom.xml文件

maven核心配置文件

`dependencies`标签中可以用`dependency`导入相关依赖

#### 资源导出问题

```xml
	 <!--在build中配置resources，来防止我们资源导出失败的问题-->
    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
            </resource>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
```



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
2. 删除src目录(父工程)
3. 导入maven依赖

### 2.2 创建一个模板

#### 编写Mybatis核心配置文件

- mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
  </environments>
  <mappers>
    <mapper resource="org/mybatis/example/BlogMapper.xml"/>
  </mappers>
</configuration>
```

> XML 配置文件中包含了对 MyBatis 系统的核心设置，包括获取数据库连接实例的数据源（DataSource）以及决定事务作用域和控制方式的事务管理器

#### 编写Mybatis工具类

每个基于 MyBatis 的应用都是以一个 SqlSessionFactory 的实例为核心的。SqlSessionFactory 的实例可以通过 SqlSessionFactoryBuilder 获得。而 SqlSessionFactoryBuilder 则可以从 XML 配置文件或一个预先配置的 Configuration 实例来构建出 SqlSessionFactory 实例。

从 XML 文件中构建 SqlSessionFactory 的实例非常简单，建议使用类路径下的资源文件进行配置。 但也可以使用任意的输入流（InputStream）实例，比如用文件路径字符串或 file:// URL 构造的输入流。MyBatis 包含一个名叫 Resources 的工具类，它包含一些实用方法，使得从类路径或其它位置加载资源文件更加容易。

```java
String resource = "com/shane/example/mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```

工具类

MybatisUtils

```java
//sqISessionFactory -->sqlSession
public class Mybatisutils{
	
    private static SqlSessionFactory sqlSessionFactory;

    static{
        try{
//使用mybatis第一步:获取 sql sessionFactory对象
			String resource = "mybatis-config.xml";
			Inputstream inputstream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputstream);
       }catch(IoEXception e){
			e.printstackTrace();
        	}
    }
//有了SqlSessionFactor,我们就可以从中获得 sqlSession的实例
//SqlSession完全包含了面向数据库执行QL命令所需的所有方法
public static SqlSession getSqlSession(){
    return sqlSessionFactory.openSession();
}
}
```



### 2.3 编写代码

接口

UserMapper

```java
public interface UserMapper{
    List<User> getUserList();
}
```

Mapper配置文件

UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--绑定一个对应的dao.Mapper接口-->
<mapper namespace="com.shane.dao.UserMapper">
    <!--查询语句-->
  <select id="select" resultType="com.shane.pojo.User">
    select * from mybatis.user 
  </select>
</mapper>
```

Mybatis.config.xml注册

```xml
 <mappers>
    <mapper resource="com/shane/dao/UserMapper.xml"/>
  </mappers>
```



### 2.4 测试

```java
@Test
public void test(){
	//获取Session对象
    SqlSession sqlSession = MybatisUtils.getSqlsession();
    //执行
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    List<User> userList = userMapper.getUserList();
    
     /*不推荐方式
    List<User> userList = sqlSession.selectList("com.shane.dao.UserMapper.getUserList");
    */
    
    for(User user:userList){
        System.out.print(user);
    }
    
    //关闭
    sqlSession.close();
}
```

<u>注意maven可能因为无法导出配置文件而导致报错</u>

![](/images/2020-10-15-16-49-26.png)

**解决见maven上文资源导出问题**

#### SqlSessionFactoryBuilder

这个类可以被实例化、使用和丢弃，一旦创建了 SqlSessionFactory，就不再需要它了。 因此 SqlSessionFactoryBuilder 实例的最佳作用域是方法作用域（也就是局部方法变量）。 你可以重用 SqlSessionFactoryBuilder 来创建多个 SqlSessionFactory 实例，但最好还是不要一直保留着它，以保证所有的 XML 解析资源可以被释放给更重要的事情。

#### SqlSessionFactory

SqlSessionFactory 一旦被创建就应该在应用的运行期间一直存在，没有任何理由丢弃它或重新创建另一个实例。 使用 SqlSessionFactory 的最佳实践是在应用运行期间不要重复创建多次，多次重建 SqlSessionFactory 被视为一种代码“坏习惯”。因此 SqlSessionFactory 的最佳作用域是应用作用域。 有很多方法可以做到，最简单的就是使用单例模式或者静态单例模式。

#### SqlSession

每个线程都应该有它自己的 SqlSession 实例。SqlSession 的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域。 绝对不能将 SqlSession 实例的引用放在一个类的静态域，甚至一个类的实例变量也不行。 也绝不能将 SqlSession 实例的引用放在任何类型的托管作用域中，比如 Servlet 框架中的 HttpSession。 如果你现在正在使用一种 Web 框架，考虑将 SqlSession 放在一个和 HTTP 请求相似的作用域中。 换句话说，每次收到 HTTP 请求，就可以打开一个 SqlSession，返回一个响应后，就关闭它。 这个关闭操作很重要，为了确保每次都能执行关闭操作，你应该把这个关闭操作放到 finally 块中。 下面的示例就是一个确保 SqlSession 关闭的标准模式：

```java
try (SqlSession session = sqlSessionFactory.openSession()) {
  // 你的应用逻辑代码
}
```

在所有代码中都遵循这种使用模式，可以保证所有数据库资源都能被正确地关闭。



---

整理不易，转载请注明出处。


