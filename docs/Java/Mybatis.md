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
    //查询全部用户
    List<User> getUserList();
    //根据ID查询用户
    User getUserById(int id);
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
  <select id="getUserList" resultType="com.shane.pojo.User">
    select * from mybatis.user 
  </select>
    <select id="getUserById" parameterType="int" resultType="com.shane.pojo.User">
    select * from mybatis.user where id = #{id}
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

 关闭操作很重要，为了确保每次都能执行关闭操作，你应该把这个关闭操作放到 finally 块中。 下面的示例就是一个确保 SqlSession 关闭的**标准模式**：

```java
try (SqlSession session = sqlSessionFactory.openSession()) {
  // 你的应用逻辑代码
}
```

在所有代码中都遵循这种使用模式，可以保证所有数据库资源都能被正确地关闭。

## 3. CRUD

### 3.1 namespace

namespace中的包名要和Dao/mapper接口的包名一致!

### 3.2 select

选择, 查询语句;

- id: 就是对应的namespace中的方法名
- resultType:sql语句执行的返回值!
- parameterType:参数类型

1. 编写接口

   ```java
   USer getUserById(int id);
   ```

   

2. 编写对应Mapper中sql语句

   ```xml
    <select id="getUserById" parameterType="int" resultType="com.shane.pojo.User">
       select * from mybatis.user where id = #{id}
     </select>
   ```

3. 配置config.xml

   ```xml
    <mappers>
       <mapper resource="com/shane/dao/UserMapper.xml"/>
     </mappers>
   ```

   

4. 测试

   

### 3.3 insert

> **增删改必须提交事务**
>
> sqlSession.commit();

mybatis-config.xml

```xml
<insert id="addUser" parameterType="com.shane.pojo.User">
	insert into mybatis.user(id, name, pwd) values (#{id},#{name},#{pwd});    
</insert>
```

test.java

```java
@Test
public void test(){
	//获取Session对象
    SqlSession sqlSession = MybatisUtils.getSqlsession();
    //执行
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    
    int res = userMapper.addUser(new(id:4, name:"jack", pwd:"12345"));
    if(res>0){
        System.out.println("插入成功!");
    }
    //提交事务
    sqlSession.commit();
    sqlSession.close();
}
```

### 3.4  update

mybatis-config.xml

```xml
<insert id="updateUser" parameterType="com.shane.pojo.User">
	update mybatis.user set name = #{id} where id = #{id};   
</insert>
```

test.java同上,记得**提交事务**

```java
sqlSession.commit();
sqlSession.close();
```

### 	 3.5 delete

```xml
<delete id ="deletUser" parameterType="int">
	delete from mybatis.user where id = #{id};
</delete>
```

test.java同上,记得**提交事务**

### 3.6 万能的Mapper

Mapper.java

```java
int addUser(Map<String, Obeject> map);
```

Mapper.xml

```xml
<insert id="addUser" parameterType="map">
    insert into mybatis.user (id, name, pwd) values (#{userId},#{userName},#{password});
</insert>
```

test.java

```java
@Test
public void test(){
	//获取Session对象
    SqlSession sqlSession = MybatisUtils.getSqlsession();
    //执行
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    Map<String, Obeject> map = new HashMap<String, Obeject>();
    map.put("userId", 5);
    map.put("userName", "luck");
    map.put("password", "1234");
    userMapper.addUSer(map);
    sqlSession.commit();
	sqlSession.close();
```



假设实体类或数据库表的**字段和参数过多**,可以考虑使用Mapper

> 其他未填字段要允许为空

- Map传递参数,直接在sql取出key即可~`parameterType="map"`
- 对象传递参数,直接在sql取出对象的属性即可~`parameterType="Object"`
- 如果只传递一个参数,可直接在sql中取出
- 多个参数用Map或者**注解**

### 3.7 模糊查询

1. 在Java代码传入通配符%_%

   ```java
   List<User> userList = mapper.getUserList("%李%");
   ```

   > 这种方式并不能防sql注入,所以有了方式二

2. 在sql拼接中使用通配符

   ```xml
   select * from mybatis.user where name like "%"#{value}"%";
   ```

## 4. 配置解析

### 4.1 核心配置文件

- mybatis-config.xml
- Mybatis的配置文件包含了对Mybatis行为的设置和属性信息

具体属性:

1. [properties（属性）](https://mybatis.org/mybatis-3/zh/configuration.html#properties)
2. [settings（设置）](https://mybatis.org/mybatis-3/zh/configuration.html#settings)
3. [typeAliases（类型别名）](https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases)
4. [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)
5. [objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory)
6. [plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)
7. [environments（环境配置）](https://mybatis.org/mybatis-3/zh/configuration.html#environments)
   - environment（环境变量）
     - transactionManager（事务管理器）
     - dataSource（数据源）
8. [databaseIdProvider（数据库厂商标识）](https://mybatis.org/mybatis-3/zh/configuration.html#databaseIdProvider)
9. [mappers（映射器）](https://mybatis.org/mybatis-3/zh/configuration.html#mappers)

### 4.2 环境配置(environments)

Mybatis可以配置成适应多种环境

**尽管可以配置多个环境,但每个SqlSessionFactory实例只能选择一种环境**

学会配置多套运行环境

Mybatis默认的事务管理器就是JDBC, 连接池:POOLED

### 4.3  属性(properties)

可以通过properties属性来实现引用配置文件

这些属性都是可外部配置且动态替换的,既可以在典型的Java属性文件中配置,亦可通过properties元素的子元素来传递.[db.properties]

1. 编写一个配置文件

   db.properties

   ```properties
   driver=com.shane.jdbc.Driver
   url=jdbc:mysql://localhost:3306/mybatis?useSSL=true&useUnicode=true&characterEncoding=UTF-8
   username=root
   password=123456
   ```

2. 在核心配置文件引入

   ```xml
   <configuration>
       <!--引入外部配置文件-->
       <properties resource="db.properties">
           <property name="username" value="shane"/>
       </properties >
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
   </configuration>
   ```

   - 可以引入外部文件

   - 可以在其中增加一些属性配置

   - 如果外部配置文件和properties都有同一字段,优先使用外部配置文件!

     >如上面例子的username字段会使用root

### 4.4 typeAliases(类型别名)

- 类型别名可为 Java 类型设置一个缩写名字。
-  它仅用于 XML 配置，意在降低冗余的全限定类名书写。

```xml
<!--可以给实体类取别名-->
<typeAliases>
    <typeAlias type="com.shane.pojo.USer" alias = "User"/>
</typeAliases>
```

也可以指定一个包名,Mybatis会在包名下面搜索需要的java Bean,比如:扫描实体类的包,它的默认别名就是这个类的类名,首字母小写!(其实大写亦可,但不规范)

```xml
<!--可以给实体类起别名-->
<typeAliases>
    <package name="com.shane.pojo"/>
</typeAliases>
```

1. 在实体比较少时,采用第一种方式

2. 在实体类十分多时,建议使用第二种

3. 第一张可以自定义别名,第二种只能通过在实体类上加注解实现:

   ```java
   @Alia("user")
   public class user{}
   ```

   

## 5. 设置

这是Mybatis中极其重要的调整设置,它们会改变Mybatis的运行时行为

![](/images/2020-10-19-08-59-12.png)

![](/images/2020-10-19-09-01-02.png)

### 5.1. 映射器(mappers)

MapperRegister: 注册绑定我们的Mapper文件;

方式一:

```xml
<!-- 使用相对于类路径的资源引用 -->
<mappers>
  <mapper resource="org/mybatis/builder/AuthorMapper.xml"/>
  <mapper resource="org/mybatis/builder/BlogMapper.xml"/>
  <mapper resource="org/mybatis/builder/PostMapper.xml"/>
</mappers>
```

方式二:

```xml
<!-- 使用映射器接口实现类的完全限定类名 -->
<mappers>
  <mapper class="org.mybatis.builder.AuthorMapper"/>
  <mapper class="org.mybatis.builder.BlogMapper"/>
  <mapper class="org.mybatis.builder.PostMapper"/>
</mappers>
```

**注意:**

- 接口和它的Mapper配置文件必须同名
- 接口和它的Mapper配置文件必须在同一个包下

方式三:

```xml
<!-- 将包内的映射器接口实现全部注册为映射器 -->
<mappers>
  <package name="org.mybatis.builder"/>
</mappers>
```

- 接口和它的Mapper配置文件必须同名
- 接口和它的Mapper配置文件必须在同一个包下

> 附(不推荐方式):
>
> ```xml
> <!-- 使用完全限定资源定位符（URL） -->
> <mappers>
>   <mapper url="file:///var/mappers/AuthorMapper.xml"/>
>   <mapper url="file:///var/mappers/BlogMapper.xml"/>
>   <mapper url="file:///var/mappers/PostMapper.xml"/>
> </mappers>
> ```

### 5.2 生命周期和作用域

![](/images/2020-10-19-09-35-54.png)

作用域和生命周期是至关重要的,因为错误的使用会导致非常严重的**并发问题**

### SqlSessionFactoryBuilder

这个类可以被实例化、使用和丢弃，**一旦创建了 SqlSessionFactory，就不再需要它了**。 因此 SqlSessionFactoryBuilder 实例的最佳作用域是**方法作用域**（也就是局部方法变量）。 你可以重用 SqlSessionFactoryBuilder 来创建多个 SqlSessionFactory 实例，但最好还是不要一直保留着它，以保证所有的 XML 解析资源可以被释放给更重要的事情。

### SqlSessionFactory

SqlSessionFactory 一旦被创建就应该在应用的运行期间一直存在，**没有任何理由丢弃它或重新创建另一个实例**。 使用 SqlSessionFactory 的最佳实践是在应用运行期间不要重复创建多次，多次重建 SqlSessionFactory 被视为一种代码“坏习惯”。因此 SqlSessionFactory 的最佳作用域是应用作用域。 有很多方法可以做到，最简单的就是使用**单例模式或者静态单例模式**。

### SqlSession

每个线程都应该有它自己的 SqlSession 实例。**SqlSession 的实例不是线程安全的，因此是不能被共享的**，所以它的最佳的作用域是请求或方法作用域。 绝对不能将 SqlSession 实例的引用放在一个类的静态域，甚至一个类的实例变量也不行。 也绝不能将 SqlSession 实例的引用放在任何类型的托管作用域中，比如 Servlet 框架中的 HttpSession。 如果你现在正在使用一种 Web 框架，考虑将 SqlSession 放在一个和 HTTP 请求相似的作用域中。 换句话说，每次收到 HTTP 请求，就可以打开一个 SqlSession，返回一个响应后，就关闭它。 **这个关闭操作很重要**，为了确保每次都能执行关闭操作，你应该把这个关闭操作放到 finally 块中。 

![](/images/2020-10-19-13-30-26.png)

> 这里面的每一个Mapper代表一个具体的业务!

### 5.3 结果集映射ResultMap

```
id  name  pwd
id  name  password
```

```xml
<resultMap id="UserMap" type="User">
    <result column="id" property="id"/>
    <result column="name" property="name"/>
    <result column="pwd" property="password"/>
</resultMap>
<select id = "getUserById" resultMap="UserMap">
	...    
</select>
    
```

- `resultMap`元素是Mybatis中最重大最强大的元素
- ResultMap的设计思想:对于简单的语句根本不需要配置显式的结果映射,对于复杂一点的语句只需要描述它们的关系就行了
- ResultMap最优秀的地方在于,虽然你已经对它相当了解,但根本就不需要显式地用到他们

### 5.4 其他配置

- [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)
- [objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory)
- [plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)
  - Mybatis-generator-core
  - Mybatis-plus
  - 通用mapper

## 6. 日志

### 6.1 日志工厂

如果一个数据库操作出现了异常,我们需要借用日志拍错

曾经: sout. debug

现在: 日志工厂

- SLF4J 
-  **LOG4J** 
-  LOG4J2 
-  JDK_LOGGING 
-  COMMONS_LOGGING 
-  **STDOUT_LOGGING** 
-  NO_LOGGING

在Mybatis中具体使用哪个日志实现,在设置中设定!

- **STDOUT_LOGGING标准日志输出**

在Mybatis核心配置文件中,配置我们的日志

```xml
<settings>
	<setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
```
效果
![](/images/2020-10-21-09-05-03.png)

### 6.2 Log4j

**什么是Log4j?**

Log4j是[Apache](https://baike.baidu.com/item/Apache/8512995)的一个开源项目，通过使用Log4j，我们可以控制日志信息输送的目的地是[控制台](https://baike.baidu.com/item/控制台/2438626)、文件、[GUI](https://baike.baidu.com/item/GUI)组件，甚至是套接口服务器、[NT](https://baike.baidu.com/item/NT/3443842)的事件记录器、[UNIX](https://baike.baidu.com/item/UNIX) [Syslog](https://baike.baidu.com/item/Syslog)[守护进程](https://baike.baidu.com/item/守护进程/966835)等；

- 我们也可以控制每一条日志的输出格式；
- 通过定义每一条日志信息的级别，我们能够更加细致地控制日志的生成过程。
- 通过一个[配置文件](https://baike.baidu.com/item/配置文件/286550)来灵活地进行配置，而不需要修改应用的代码。

**如何配置**

1. 先导入log4j的依赖

   ```xml
   <!-- https://mvnrepository.com/artifact/log4j/log4j -->
   <dependency>
       <groupId>log4j</groupId>
       <artifactId>log4j</artifactId>
       <version>1.2.17</version>
   </dependency>
   
   ```

2. 在CLASSPATH下建立log4j.properties。内容如下(数字为行号)：

   ```properties
   ### 配置根 ###
   log4j.rootLogger = debug,console ,fileAppender,dailyRollingFile,ROLLING_FILE,MAIL,DATABASE
   
   ### 设置输出sql的级别，其中logger后面的内容全部为jar包中所包含的包名 ###
   log4j.logger.org.apache=dubug
   log4j.logger.java.sql.Connection=dubug
   log4j.logger.java.sql.Statement=dubug
   log4j.logger.java.sql.PreparedStatement=dubug
   log4j.logger.java.sql.ResultSet=dubug
   ### 配置输出到控制台 ###
   log4j.appender.console = org.apache.log4j.ConsoleAppender
   log4j.appender.console.Target = System.out
   log4j.appender.console.layout = org.apache.log4j.PatternLayout
   log4j.appender.console.layout.ConversionPattern =  %d{ABSOLUTE} %5p %c{ 1 }:%L - %m%n
   
   ### 配置输出到文件 ###
   log4j.appender.fileAppender = org.apache.log4j.FileAppender
   log4j.appender.fileAppender.File = logs/log.log
   log4j.appender.fileAppender.Append = true
   log4j.appender.fileAppender.Threshold = DEBUG
   log4j.appender.fileAppender.layout = org.apache.log4j.PatternLayout
   log4j.appender.fileAppender.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
   
   ### 配置输出到文件，并且每天都创建一个文件 ###
   log4j.appender.dailyRollingFile = org.apache.log4j.DailyRollingFileAppender
   log4j.appender.dailyRollingFile.File = logs/log.log
   log4j.appender.dailyRollingFile.Append = true
   log4j.appender.dailyRollingFile.Threshold = DEBUG
   log4j.appender.dailyRollingFile.layout = org.apache.log4j.PatternLayout
   log4j.appender.dailyRollingFile.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n### 配置输出到文件，且大小到达指定尺寸的时候产生一个新的文件 ###log4j.appender.ROLLING_FILE=org.apache.log4j.RollingFileAppender log4j.appender.ROLLING_FILE.Threshold=ERROR log4j.appender.ROLLING_FILE.File=rolling.log log4j.appender.ROLLING_FILE.Append=true log4j.appender.ROLLING_FILE.MaxFileSize=10KB log4j.appender.ROLLING_FILE.MaxBackupIndex=1 log4j.appender.ROLLING_FILE.layout=org.apache.log4j.PatternLayout log4j.appender.ROLLING_FILE.layout.ConversionPattern=[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n
   
   ### 配置输出到邮件 ###
   log4j.appender.MAIL=org.apache.log4j.net.SMTPAppender
   log4j.appender.MAIL.Threshold=FATAL
   log4j.appender.MAIL.BufferSize=10
   log4j.appender.MAIL.From=chenyl@yeqiangwei.com
   log4j.appender.MAIL.SMTPHost=mail.hollycrm.com
   log4j.appender.MAIL.Subject=Log4J Message
   log4j.appender.MAIL.To=chenyl@yeqiangwei.com
   log4j.appender.MAIL.layout=org.apache.log4j.PatternLayout
   log4j.appender.MAIL.layout.ConversionPattern=[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n
   
   ### 配置输出到数据库 ###
   log4j.appender.DATABASE=org.apache.log4j.jdbc.JDBCAppender
   log4j.appender.DATABASE.URL=jdbc:mysql://localhost:3306/test
   log4j.appender.DATABASE.driver=com.mysql.jdbc.Driver
   log4j.appender.DATABASE.user=root
   log4j.appender.DATABASE.password=
   log4j.appender.DATABASE.sql=INSERT INTO LOG4J (Message) VALUES ('[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n')
   log4j.appender.DATABASE.layout=org.apache.log4j.PatternLayout
   log4j.appender.DATABASE.layout.ConversionPattern=[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n
   log4j.appender.A1=org.apache.log4j.DailyRollingFileAppender
   log4j.appender.A1.File=SampleMessages.log4j
   log4j.appender.A1.DatePattern=yyyyMMdd-HH'.log4j'
   log4j.appender.A1.layout=org.apache.log4j.xml.XMLLayout
   ```

3. 配置log4j为日志的实现

   ```xml
   <settings>
       <setting name="logImpl" value="LOG4J"/>
   </settings>
   ```

   

4. 在要输出日志的类中加入相关语句：

   定义属性：`static Logger logger = Logger.getLogger(LogDemo.class); //LogDemo为相关的类`

   在相应的方法中：

   ```java
   if(logger.isDebugEnabled()){
   
   logger.debug(“System …..”);
   
   }
   ```

**简单使用**

1. 在要使用Log4j的类中,导入包`import org.apache.log4j.Logger;`

2. 日志对象,参数为当前类的class

   ```java
   static Logger logger = Logger.getLogger(userDaoTest.class);
   ```

3. 日志级别

   ```java
   logger.info("info:进入了testLog4j");
   logger.debug("debug:进入了testLog4j");
   logger.error("error:进入了testLog4j");
   ```

## 7. 分页

> 减少数据的处理量

### 7.1 使用Limit分页

语法:

```sql
select * from user limit startIndex, pageSize;
SELECT * from user limit 3; #[0, 3]
```

### 7.2 使用Mybatis实现

1. 修改Mapper文件

```xml
<select id="selectUser" parameterType="map" resultType="user">
  select * from user limit #{startIndex},#{pageSize}
</select>
```

2. Mapper接口，参数为map

```java
//选择全部用户实现分页
List<User> selectUser(Map<String,Integer> map);
```

3. 在测试类中传入参数测试

- 推断：起始位置 =  （当前页面 - 1 ） * 页面大小

```java
//分页查询 , 两个参数startIndex , pageSize
@Test
public void testSelectUser() {
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   int currentPage = 1;  //第几页
   int pageSize = 2;  //每页显示几个
   Map<String,Integer> map = new HashMap<String,Integer>();
   map.put("startIndex",(currentPage-1)*pageSize);
   map.put("pageSize",pageSize);

   List<User> users = mapper.selectUser(map);

   for (User user: users){
       System.out.println(user);
  }

   session.close();
}
```

### 7.3 RowBounds分页

不再使用SQL分页

1. mapper接口

```java
//选择全部用户RowBounds实现分页
List<User> getUserByRowBounds();
```

2. mapper文件

```xml
<select id="getUserByRowBounds" resultType="user">
select * from user
</select>
```

3. 测试类

在这里，我们需要使用RowBounds类

```java
@Test
public void testUserByRowBounds() {
   SqlSession session = MybatisUtils.getSession();

   int currentPage = 2;  //第几页
   int pageSize = 2;  //每页显示几个
   RowBounds rowBounds = new RowBounds((currentPage-1)*pageSize,pageSize);

   //通过session.**方法进行传递rowBounds，[此种方式现在已经不推荐使用了]
   List<User> users =session.selectList("com.shane.mapper.UserMapper.getUserByRowBounds", null,rowBounds);

   for (User user: users){
       System.out.println(user);
  }
   session.close();
}
```

### 7.4 扩展

PageHelper

了解即可，可以自己尝试使用

官方文档：https://pagehelper.github.io/

## 8. 使用注解开发

### 8.1 面向接口编程

- 大家之前都学过面向对象编程，也学习过接口，但在真正的开发中，很多时候我们会选择面向接口编程
- **根本原因 :  解耦 , 可拓展 , 提高复用 , 分层开发中 , 上层不用管具体的实现 , 大家都遵守共同的标准 , 使得开发变得容易 , 规范性更好**
- 在一个面向对象的系统中，系统的各种功能是由许许多多的不同对象协作完成的。在这种情况下，各个对象内部是如何实现自己的,对系统设计人员来讲就不那么重要了；
- 而各个对象之间的协作关系则成为系统设计的关键。小到不同类之间的通信，大到各模块之间的交互，在系统设计之初都是要着重考虑的，这也是系统设计的主要工作内容。面向接口编程就是指按照这种思想来编程。



**关于接口的理解**

- 接口从更深层次的理解，应是定义（规范，约束）与实现（名实分离的原则）的分离。

- 接口的本身反映了系统设计人员对系统的抽象理解。

- 接口应有两类：

- - 第一类是对一个个体的抽象，它可对应为一个抽象体(abstract class)；
  - 第二类是对一个个体某一方面的抽象，即形成一个抽象面（interface）；

- 一个体有可能有多个抽象面。抽象体与抽象面是有区别的。



**三个面向区别**

- 面向对象是指，我们考虑问题时，以对象为单位，考虑它的属性及方法 .

- 面向过程是指，我们考虑问题时，以一个具体的流程（事务过程）为单位，考虑它的实现 .

- 接口设计与非接口设计是针对复用技术而言的，与面向对象（过程）不是一个问题.更多的体现就是对系统整体的架构

  

### 8.2 利用注解开发

- **mybatis最初配置信息是基于 XML ,映射语句(SQL)也是定义在 XML 中的。而到MyBatis 3提供了新的基于注解的配置。不幸的是，Java 注解的的表达力和灵活性十分有限。最强大的 MyBatis 映射并不能用注解来构建**

- sql 类型主要分成 :
  1. @select ()
  2. @update ()
  3. @Insert ()
  4. @delete ()


**注意：**利用注解开发就不需要mapper.xml映射文件了 .

1. 我们在我们的接口中添加注解

```java
//查询全部用户
@Select("select id,name,pwd password from user")
public List<User> getAllUser();
```

2. 在mybatis的核心配置文件中注入

```xml
<!--使用class绑定接口-->
<mappers>
   <mapper class="com.shane.mapper.UserMapper"/>
</mappers>
```

3. 我们去进行测试

```java
@Test
public void testGetAllUser() {
   SqlSession session = MybatisUtils.getSession();
   //本质上利用了jvm的动态代理机制
   UserMapper mapper = session.getMapper(UserMapper.class);

   List<User> users = mapper.getAllUser();
   for (User user : users){
       System.out.println(user);
  }

   session.close();
}
```

4. 利用Debug查看本质

![](/images/2020-10-29-09-31-00.png)

5. 本质上利用了jvm的动态代理机制

![](/images/2020-10-29-09-32-43.png)

6. Mybatis详细的执行流程

![](/images/2020-10-29-09-33-52.png)

### 8.3 注解增删改

改造MybatisUtils工具类的getSession( ) 方法，重载实现。

```java
  //获取SqlSession连接
  public static SqlSession getSession(){
      return getSession(true); //事务自动提交
  }
 
  public static SqlSession getSession(boolean flag){
      return sqlSessionFactory.openSession(flag);
  }
```

【注意】确保实体类和数据库字段对应

#### 查询：

1. 编写接口方法注解

```java
//根据id查询用户
@Select("select * from user where id = #{id}")
User selectUserById(@Param("id") int id);
```

> 方法存在多个参数,一定要使用@Param注解

2. 测试

```java
@Test
public void testSelectUserById() {
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   User user = mapper.selectUserById(1);
   System.out.println(user);

   session.close();
}
```

#### 新增：

1. 编写接口方法注解

```java
//添加一个用户
@Insert("insert into user (id,name,pwd) values (#{id},#{name},#{pwd})")
int addUser(User user);
```

2. 测试

```java
@Test
public void testAddUser() {
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   User user = new User(6, "秦疆", "123456");
   mapper.addUser(user);

   session.close();
}
```

#### 修改：

1. 编写接口方法注解

```java
//修改一个用户
@Update("update user set name=#{name},pwd=#{pwd} where id = #{id}")
int updateUser(User user);
```

2. 测试

```java
@Test
public void testUpdateUser() {
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   User user = new User(6, "秦疆", "zxcvbn");
   mapper.updateUser(user);

   session.close();
}
```

#### 删除：

1. 编写接口方法注解

```java
//根据id删除用
@Delete("delete from user where id = #{id}")
int deleteUser(@Param("id")int id);
```

2. 测试

```java
@Test
public void testDeleteUser() {
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   mapper.deleteUser(6);
   
   session.close();
}
```

**【注意点：增删改一定记得对事务的处理】**



### 8.4 关于@Param

@Param注解用于给方法参数起一个名字。以下是总结的使用原则：

- 基本类型的参数或者String类型,需要加上;应用类型不需要加
- 在方法只接受一个参数的情况下，可以不使用@Param。
- 在方法接受多个参数的情况下，建议一定要使用@Param注解给参数命名。
- 如果参数是 JavaBean ， 则不能使用@Param。
- 不使用@Param注解时，参数只能有一个，并且是Javabean。

### 8.5  #与$的区别

- \#{} 的作用主要是替换预编译语句(PrepareStatement)中的占位符? **【推荐使用】**

  ```sql
  INSERT INTO user (name) VALUES (#{name});
  INSERT INTO user (name) VALUES (?);
  ```

- ${} 的作用是直接进行字符串替换**【不推荐】**

  ```sql
  INSERT INTO user (name) VALUES ('${name}');
  INSERT INTO user (name) VALUES ('shane');
  ```

> 使用注解和配置文件协同开发，才是MyBatis的最佳实践！

## 9. Lombok

### 9.1 使用步骤

1. 在IDEA安装LomBok插件
2. 在项目中maven导入依赖

```xml
 <dependency>

          <groupId>org.projectlombok</groupId>

          <artifactId>lombok</artifactId>

          <version>1.16.18</version>

          <scope>provided</scope>

    </dependency>
```

3. 使用注解

### 9.2 常用注解

#### 1. @Getter/@Setter

自动产生 getter/setter

![](/images/2020-10-29-10-41-08.png)

#### 2. @ToString

自动重写 `toString()` 方法，会印出所有变量

![](/images/2020-10-29-10-41-30.png)

 

#### 3.@EqualsAndHashCode

自动生成 `equals(Object other)` 和 `hashcode()` 方法，包括所有非静态变量和非 transient 的变量

![](/images/2020-10-29-10-42-00.png)


 如果某些变量不想要加进判断，可以透过 exclude 排除，也可以使用 of 指定某些字段

![](/images/2020-10-29-10-42-21.png)

- 
  Q : 为什么只有一个整体的 `@EqualsAndHashCode` 注解，而不是分开的两个 `@Equals` 和 `@HashCode`？


- A : 在 Java 中有规定，当两个对象 equals 时，他们的 hashcode 一定要相同，反之，当 hashcode 相同时，对象不一定 equals。所以 equals 和 hashcode 要一起实现，免得发生违反 Java 规定的情形发生



#### 4. @NoArgsConstructor, @AllArgsConstructor, @RequiredArgsConstructor

这三个很像，都是在自动生成该类的构造器，差别只在生成的构造器的参数不一样而已

**@NoArgsConstructor** : 生成一个没有参数的构造器

![](/images/2020-10-29-10-55-22.png)

 **@AllArgsConstructor** : 生成一个包含所有参数的构造器

![](/images/2020-10-29-10-55-56.png)

这里注意一个 Java 的小坑，当我们没有指定构造器时，Java 编译器会帮我们自动生成一个没有任何参数的构造器给该类，但是如果我们自己写了构造器之后，Java 就不会自动帮我们补上那个无参数的构造器了

然而很多地方（像是 Spring Data JPA），会需要每个类都一定要有一个无参数的构造器，所以你在加上 `@AllArgsConstructor` 时，一定要补上 `@NoArgsConstrcutor`，不然会有各种坑等着你

**@RequiredArgsConstructor** : 生成一个包含 "特定参数" 的构造器，特定参数指的是那些有加上 final 修饰词的变量们

![](/images/2020-10-29-10-56-27.png)

补充一下，如果所有的变量都是正常的，都没有用 final 修饰的话，那就会生成一个没有参数的构造器



#### 5. @Data

整合包，只要加了 @Data 这个注解，等于同时加了以下注解

- @Getter/@Setter
- @ToString
- @EqualsAndHashCode
- @RequiredArgsConstructor

![](/images/2020-10-29-10-57-13.png)

@Data 是使用频率最高的 lombok 注解，通常 @Data 会加在一个值可以被更新的对象上，像是日常使用的 DTO 们、或是 JPA 裡的 Entity 们，就很适合加上 @Data 注解，也就是 @Data for mutable class

####  

#### 6. @Value

也是整合包，但是他会把所有的变量都设成 final 的，其他的就跟 @Data 一样，等于同时加了以下注解

- @Getter (注意没有setter)
- @ToString
- @EqualsAndHashCode
- @RequiredArgsConstructor

![](/images/2020-10-29-10-57-57.png)


上面那个 @Data 适合用在 POJO 或 DTO 上，而这个 @Value 注解，则是适合加在值不希望被改变的类上，像是某个类的值当创建后就不希望被更改，只希望我们读它而已，就适合加上 @Value 注解，也就是 @Value for immutable class

另外注意一下，此 lombok 的注解 @Value 和另一个 Spring 的注解 @Value 撞名，在 import 时不要 import 错了

####  

#### 7. @Builder

自动生成流式 set 值写法，从此之后再也不用写一堆 setter 了

![](/images/2020-10-29-10-58-17.png)


注意，虽然只要加上 @Builder 注解，我们就能够用流式写法快速设定对象的值，但是 setter 还是必须要写不能省略的，因为 Spring 或是其他框架有很多地方都会用到对象的 getter/setter 对他们取值/赋值

所以通常是 @Data 和 @Builder 会一起用在同个类上，既方便我们流式写代码，也方便框架做事

####  

#### 8. @Slf4j

自动生成该类的 log 静态常量，要打日志就可以直接打，不用再手动 new log 静态常量了

![](/images/2020-10-29-10-58-36.png)


 除了 @Slf4j 之外，lombok 也提供其他日志框架的变种注解可以用，像是 @Log、@Log4j...等，他们都是帮我们创建一个静态常量 log，只是使用的库不一样而已

```java
@Log //对应的log语句如下
private static final java.util.logging.Logger log = java.util.logging.Logger.getLogger(LogExample.class.getName());

@Log4j //对应的log语句如下
private static final org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(LogExample.class);
```

SpringBoot默认支持的就是 slf4j + logback 的日志框架，所以也不用再多做啥设定，直接就可以用在 SpringBoot project上，log 系列注解最常用的就是 @Slf4j

> 缺点:
>
> 1. 不支持多种参数构造器的重载
> 2. 虽然省去手动getter/setter方法的麻烦,但大大降低了源代码的可读性和完整性

## 10. 多对一的处理

多对一的理解：

- 多个学生对应一个老师
- 如果对于学生这边，就是一个多对一的现象，即从学生这边关联一个老师！

### 10.1 按查询嵌套处理

1. 给StudentMapper接口增加方法

```java
//获取所有学生及对应老师的信息
public List<Student> getStudents();
```

2. 编写对应的Mapper文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
       PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.shane.mapper.StudentMapper">

   <!--
   需求：获取所有学生及对应老师的信息
   思路：
       1. 获取所有学生的信息
       2. 根据获取的学生信息的老师ID->获取该老师的信息
       3. 思考问题，这样学生的结果集中应该包含老师，该如何处理呢，数据库中我们一般使用关联查询？
           1. 做一个结果集映射：StudentTeacher
           2. StudentTeacher结果集的类型为 Student
           3. 学生中老师的属性为teacher，对应数据库中为tid。
              多个 [1,...）学生关联一个老师=> 一对一，一对多
           4. 查看官网找到：association – 一个复杂类型的关联；使用它来处理关联查询
   -->
   <select id="getStudents" resultMap="StudentTeacher">
    select * from student
   </select>
   <resultMap id="StudentTeacher" type="Student">
       <!--association关联属性 property属性名 javaType属性类型 column在多的一方的表中的列名-->
       <association property="teacher"  column="tid"javaType="Teacher" select="getTeacher"/>
   </resultMap>
   <!--
   这里传递过来的id，只有一个属性的时候，下面可以写任何值
   association中column多参数配置：
       column="{key=value,key=value}"
       其实就是键值对的形式，key是传给下个sql的取值名称，value是片段一中sql查询的字段名。
   -->
   <select id="getTeacher" resultType="teacher">
      select * from teacher where id = #{id}
   </select>

</mapper>
```

3、编写完毕去Mybatis配置文件中，注册Mapper！

4、注意点说明：

```xml
<resultMap id="StudentTeacher" type="Student">
   <!--association关联属性 property属性名 javaType属性类型 column在多的一方的表中的列名-->
   <association property="teacher"  column="{id=tid,name=tid}"javaType="Teacher" select="getTeacher"/>
</resultMap>
<!--
这里传递过来的id，只有一个属性的时候，下面可以写任何值
association中column多参数配置：
   column="{key=value,key=value}"
   其实就是键值对的形式，key是传给下个sql的取值名称，value是片段一中sql查询的字段名。
-->
<select id="getTeacher" resultType="teacher">
  select * from teacher where id = #{id} and name = #{name}
</select>
```

5、测试

```java
@Test
public void testGetStudents(){
   SqlSession session = MybatisUtils.getSession();
   StudentMapper mapper =session.getMapper(StudentMapper.class);

   List<Student> students = mapper.getStudents();

   for (Student student : students){
       System.out.println(
               "学生名:"+ student.getName()
                       +"\t老师:"+student.getTeacher().getName());
  }
}
```



### 10.2 按结果嵌套处理

除了上面这种方式，

我们还可以按照结果进行嵌套处理；

1. 接口方法编写

```java
public List<Student> getStudents2();
```

2. 编写对应的mapper文件

```xml
<!--
按查询结果嵌套处理
思路：
   1. 直接查询出结果，进行结果集的映射
-->
<select id="getStudents2" resultMap="StudentTeacher2" >
  select s.id sid, s.name sname , t.name tname
  from student s,teacher t
  where s.tid = t.id
</select>

<resultMap id="StudentTeacher2" type="Student">
   <id property="id" column="sid"/>
   <result property="name" column="sname"/>
   <!--关联对象property 关联对象在Student实体类中的属性-->
   <association property="teacher" javaType="Teacher">
       <result property="name" column="tname"/>
   </association>
</resultMap>
```

3. 去mybatis-config文件中注入【此处应该处理过了】

4. 测试

```java
@Test
public void testGetStudents2(){
   SqlSession session = MybatisUtils.getSession();
   StudentMapper mapper =session.getMapper(StudentMapper.class);

   List<Student> students = mapper.getStudents2();

   for (Student student : students){
       System.out.println(
               "学生名:"+ student.getName()
                       +"\t老师:"+student.getTeacher().getName());
  }
}
```

### 10.3 小结

按照查询进行嵌套处理就像SQL中的子查询

按照结果进行嵌套处理就像SQL中的联表查询

## 11. 一对多的处理

一对多的理解：

- 一个老师拥有多个学生
- 如果对于老师这边，就是一个一对多的现象，即从一个老师下面拥有一群学生（集合）！

### 11.1 按结果嵌套处理

1. TeacherMapper接口编写方法

```java
//获取指定老师，及老师下的所有学生
public Teacher getTeacher(int id);
```

2. 编写接口对应的Mapper配置文件

```xml
<mapper namespace="com.shane.mapper.TeacherMapper">

   <!--
   思路:
       1. 从学生表和老师表中查出学生id，学生姓名，老师姓名
       2. 对查询出来的操作做结果集映射
           1. 集合的话，使用collection！
               JavaType和ofType都是用来指定对象类型的
               JavaType是用来指定pojo中属性的类型
               ofType指定的是映射到list集合属性中pojo的类型。
   -->
   <select id="getTeacher" resultMap="TeacherStudent">
      select s.id sid, s.name sname , t.name tname, t.id tid
      from student s,teacher t
      where s.tid = t.id and t.id=#{id}
   </select>

   <resultMap id="TeacherStudent" type="Teacher">
       <result  property="name" column="tname"/>
       <collection property="students" ofType="Student">
<!-- 集合中的泛型信息,我们使用ofType获取-->
           <result property="id" column="sid" />
           <result property="name" column="sname" />
           <result property="tid" column="tid" />
       </collection>
   </resultMap>
</mapper>
```

> 复杂的属性,我们需要单独处理 对象:association 集合: collection javaType=""指定属性的类型!

3. 将Mapper文件注册到MyBatis-config文件中

```xml
<mappers>
   <mapper resource="mapper/TeacherMapper.xml"/>
</mappers>
```

4. 测试

```java
@Test
public void testGetTeacher(){
   SqlSession session = MybatisUtils.getSession();
   TeacherMapper mapper =session.getMapper(TeacherMapper.class);
   Teacher teacher = mapper.getTeacher(1);
   System.out.println(teacher.getName());
   System.out.println(teacher.getStudents());
}
```



### 11.2 按查询嵌套处理

1. TeacherMapper接口编写方法

```java
public Teacher getTeacher2(int id);
```

2. 编写接口对应的Mapper配置文件

```xml
<select id="getTeacher2" resultMap="TeacherStudent2">
select * from teacher where id = #{id}
</select>
<resultMap id="TeacherStudent2" type="Teacher">
   <!--column是一对多的外键 , 写的是一的主键的列名-->
   <collection property="students" javaType="ArrayList"ofType="Student" column="id" select="getStudentByTeacherId"/>
</resultMap>
<select id="getStudentByTeacherId" resultType="Student">
  select * from student where tid = #{id}
</select>
```

3. 将Mapper文件注册到MyBatis-config文件中

4. 测试

```java
@Test
public void testGetTeacher2(){
   SqlSession session = MybatisUtils.getSession();
   TeacherMapper mapper =session.getMapper(TeacherMapper.class);
   Teacher teacher = mapper.getTeacher2(1);
   System.out.println(teacher.getName());
   System.out.println(teacher.getStudents());
}
```

### 11.3 小结

1. 关联-association
2. 集合-collection
3. 所以association是用于一对一和多对一，而collection是用于一对多的关系
4. JavaType和ofType都是用来指定对象类型的

- JavaType是用来指定pojo中属性的类型
- ofType指定的是映射到list集合属性中pojo的类型。

**注意说明：**

1. 保证SQL的可读性，尽量通俗易懂
2. 根据实际要求，尽量编写性能更高的SQL语句
3. 注意属性名和字段不一致的问题
4. 注意一对多和多对一 中：字段和属性对应的问题
5. 尽量使用Log4j，通过日志来查看自己的错误

## 12 动态SQl

### 12.1 介绍

什么是动态SQL：**动态SQL指的是根据不同的查询条件 , 生成不同的Sql语句.**

```
官网描述：
MyBatis 的强大特性之一便是它的动态 SQL。如果你有使用 JDBC 或其它类似框架的经验，你就能体会到根据不同条件拼接 SQL 语句的痛苦。例如拼接时要确保不能忘记添加必要的空格，还要注意去掉列表最后一个列名的逗号。利用动态 SQL 这一特性可以彻底摆脱这种痛苦。
虽然在以前使用动态 SQL 并非一件易事，但正是 MyBatis 提供了可以被用在任意 SQL 映射语句中的强大的动态 SQL 语言得以改进这种情形。
动态 SQL 元素和 JSTL 或基于类似 XML 的文本处理器相似。在 MyBatis 之前的版本中，有很多元素需要花时间了解。MyBatis 3 大大精简了元素种类，现在只需学习原来一半的元素便可。MyBatis 采用功能强大的基于 OGNL 的表达式来淘汰其它大部分元素。
```

```sql
  -------------------------------
  - if
  - choose (when, otherwise)
  - trim (where, set)
  - foreach
  -------------------------------
```



我们之前写的 SQL 语句都比较简单，如果有比较复杂的业务，我们需要写复杂的 SQL 语句，往往需要拼接，而拼接 SQL ，稍微不注意，由于引号，空格等缺失可能都会导致错误。

那么怎么去解决这个问题呢？这就要使用 mybatis 动态SQL，通过 if, choose, when, otherwise, trim, where, set, foreach等标签，可组合成非常灵活的SQL语句，从而在提高 SQL 语句的准确性的同时，也大大提高了开发人员的效率。

### 12.2 搭建环境

1. 新建一个数据库表：blog

字段：id，title，author，create_time，views

```sql
CREATE TABLE `blog` (
`id` varchar(50) NOT NULL COMMENT '博客id',
`title` varchar(100) NOT NULL COMMENT '博客标题',
`author` varchar(30) NOT NULL COMMENT '博客作者',
`create_time` datetime NOT NULL COMMENT '创建时间',
`views` int(30) NOT NULL COMMENT '浏览量'
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```

2. 创建Mybatis基础工程

![](/images/2020-10-29-14-09-16.png)

3. IDutil工具类

```java
public class IDUtil {

   public static String genId(){
       return UUID.randomUUID().toString().replaceAll("-","");
  }

}
```

4. 实体类编写  【注意set方法作用】

```java
import java.util.Date;

public class Blog {

   private String id;
   private String title;
   private String author;
   private Date createTime;
   private int views;
   //set，get....
}
```

5. 编写Mapper接口及xml文件

   ```java
   public interface BlogMapper {
   }
   ```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
       PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.shane.mapper.BlogMapper">

</mapper>
```

6. mybatis核心配置文件，下划线驼峰自动转换

```xml
<settings>
   <setting name="mapUnderscoreToCamelCase" value="true"/>
   <setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
<!--注册Mapper.xml-->
<mappers>
 <mapper resource="mapper/BlogMapper.xml"/>
</mappers>
```

7. 插入初始数据

   

   编写接口

```java
//新增一个博客
int addBlog(Blog blog);
```

​	sql配置文件

```xml
<insert id="addBlog" parameterType="blog">
  insert into blog (id, title, author, create_time, views)
  values (#{id},#{title},#{author},#{createTime},#{views});
</insert>
```

初始化博客方法

```java
@Test
public void addInitBlog(){
   SqlSession session = MybatisUtils.getSession();
   BlogMapper mapper = session.getMapper(BlogMapper.class);

   Blog blog = new Blog();
   blog.setId(IDUtil.genId());
   blog.setTitle("Mybatis如此简单");
   blog.setAuthor("shane说");
   blog.setCreateTime(new Date());
   blog.setViews(9999);

   mapper.addBlog(blog);

   blog.setId(IDUtil.genId());
   blog.setTitle("Java如此简单");
   mapper.addBlog(blog);

   blog.setId(IDUtil.genId());
   blog.setTitle("Spring如此简单");
   mapper.addBlog(blog);

   blog.setId(IDUtil.genId());
   blog.setTitle("微服务如此简单");
   mapper.addBlog(blog);

   session.close();
}
```

初始化数据完毕！



### 12.3 if 语句

**需求：根据作者名字和博客名字来查询博客！如果作者名字为空，那么只根据博客名字查询，反之，则根据作者名来查询**

1. 编写接口类

```java
//需求1
List<Blog> queryBlogIf(Map map);
```

2. 编写SQL语句

```xml
<!--需求1：
根据作者名字和博客名字来查询博客！
如果作者名字为空，那么只根据博客名字查询，反之，则根据作者名来查询
select * from blog where title = #{title} and author = #{author}
-->
<select id="queryBlogIf" parameterType="map"resultType="blog">
  select * from blog where
   <if test="title != null">
      title = #{title}
   </if>
   <if test="author != null">
      and author = #{author}
   </if>
</select>
```

3. 测试

```java
@Test
public void testQueryBlogIf(){
   SqlSession session = MybatisUtils.getSession();
   BlogMapper mapper = session.getMapper(BlogMapper.class);

   HashMap<String, String> map = new HashMap<String, String>();
   map.put("title","Mybatis如此简单");
   map.put("author","shane");
   List<Blog> blogs = mapper.queryBlogIf(map);

   System.out.println(blogs);

   session.close();
}
```

这样写我们可以看到，如果 author 等于 null，那么查询语句为 select * from user where title=#{title},但是如果title为空呢？那么查询语句为 select * from user where and author=#{author}，这是错误的 SQL 语句，如何解决呢？请看下面的 where 语句！



### 12.4 Where

针对出现前面的条件未匹配出现`where and sql`  的情况

修改上面的SQL语句；

```xml
<select id="queryBlogIf" parameterType="map"resultType="blog">
  select * from blog
   <where>
       <if test="title != null">
          title = #{title}
       </if>
       <if test="author != null">
          and author = #{author}
       </if>
   </where>
</select>
```

这个“where”标签会知道如果它包含的标签中有返回值的话，它就插入一个‘where’。此外，如果标签返回的内容是以AND 或OR 开头的，则它会剔除掉。

### 12.5 Set

同理，上面的对于查询 SQL 语句包含 where 关键字，如果在进行更新操作的时候，含有 set 关键词，我们怎么处理呢？

1. 编写接口方法

```java
int updateBlog(Map map);
```

2. sql配置文件

```xml
<!--注意set是用的逗号隔开-->
<update id="updateBlog" parameterType="map">
  update blog
     <set>
         <if test="title != null">
            title = #{title},
         </if>
         <if test="author != null">
            author = #{author}
         </if>
     </set>
  where id = #{id};
</update>
```

3. 测试

```java
@Test
public void testUpdateBlog(){
   SqlSession session = MybatisUtils.getSession();
   BlogMapper mapper = session.getMapper(BlogMapper.class);

   HashMap<String, String> map = new HashMap<String, String>();
   map.put("title","动态SQL");
   map.put("author","秦疆");
   map.put("id","9d6a763f5e1347cebda43e2a32687a77");

   mapper.updateBlog(map);


   session.close();
}
```



### 扩展

where和set本质上都是trim

```xml
<!--WHERE实现-->
<trim prefix="WHERE" prefixOverrides="AND|OR">
...
</trim>
```



```xml
<!--SET实现-->
<trim prefix="SET" suffixOverrides=",">
...
</trim>
```



### 12.6 choose语句

有时候，我们不想用到所有的查询条件，只想选择其中的一个，查询条件有一个满足即可，使用 choose 标签可以解决此类问题，类似于 Java 的 switch 语句

1. 编写接口方法

```java
List<Blog> queryBlogChoose(Map map);
```

2. sql配置文件

```xml
<select id="queryBlogChoose" parameterType="map"resultType="blog">
  select * from blog
   <where>
       <choose>
           <when test="title != null">
                title = #{title}
           </when>
           <when test="author != null">
              and author = #{author}
           </when>
           <otherwise>
              and views = #{views}
           </otherwise>
       </choose>
   </where>
</select>
```

3. 测试类

```java
@Test
public void testQueryBlogChoose(){
   SqlSession session = MybatisUtils.getSession();
   BlogMapper mapper = session.getMapper(BlogMapper.class);

   HashMap<String, Object> map = new HashMap<String, Object>();
   map.put("title","Java如此简单");
   map.put("author","shane");
   map.put("views",9999);
   List<Blog> blogs = mapper.queryBlogChoose(map);

   System.out.println(blogs);

   session.close();
}
```



### 12.7 SQL片段

有时候可能某个 sql 语句我们用的特别多，为了增加代码的重用性，简化代码，我们需要将这些代码抽取出来，然后使用时直接调用。

**提取SQL片段：**

```xml
<sql id="if-title-author">
   <if test="title != null">
      title = #{title}
   </if>
   <if test="author != null">
      and author = #{author}
   </if>
</sql>
```

**引用SQL片段：**

```xml
<select id="queryBlogIf" parameterType="map"resultType="blog">
  select * from blog
   <where>
       <!-- 引用 sql 片段，如果refid 指定的不在本文件中，那么需要在前面加上 namespace -->
       <include refid="if-title-author"></include>
       <!-- 在这里还可以引用其他的 sql 片段 -->
   </where>
</select>
```

注意：

① 最好基于 单表来定义 sql 片段，提高片段的可重用性

② **在 sql 片段中不要包括 where**



### 12.8 Foreach

将数据库中前三个数据的id修改为1,2,3；

需求：我们需要查询 blog 表中 id 分别为1,2,3的博客信息

1. 编写接口

```java
List<Blog> queryBlogForeach(Map map);
```

2. 编写SQL语句

```xml
<select id="queryBlogForeach" parameterType="map"resultType="blog">
  select * from blog
   <where>
       <!--
       collection:指定输入对象中的集合属性
       item:每次遍历生成的对象
       open:开始遍历时的拼接字符串
       close:结束时拼接的字符串
       separator:遍历对象之间需要拼接的字符串
       select * from blog where 1=1 and (id=1 or id=2 or id=3)
     -->
       <foreach collection="ids"  item="id" open="and (" close=")"separator="or">
          id=#{id}
       </foreach>
   </where>
</select>
```

3. 测试

```java
@Test
public void testQueryBlogForeach(){
   SqlSession session = MybatisUtils.getSession();
   BlogMapper mapper = session.getMapper(BlogMapper.class);

   HashMap map = new HashMap();
   List<Integer> ids = new ArrayList<Integer>();
   ids.add(1);
   ids.add(2);
   ids.add(3);
   map.put("ids",ids);

   List<Blog> blogs = mapper.queryBlogForeach(map);

   System.out.println(blogs);

   session.close();
}
```

小结：其实动态 sql 语句的编写往往就是一个拼接的问题，为了保证拼接准确，我们最好首先要写原生的 sql 语句出来，然后在通过 mybatis 动态sql 对照着改，防止出错。多在实践中使用才是熟练掌握它的技巧。

## 13. 缓存

> 减小数据库的压力

### 13.1 简介

#### 什么是缓存 [ Cache ]？

- 存在内存中的临时数据。
- 将用户经常查询的数据放在缓存（内存）中，用户去查询数据就不用从磁盘上(关系型数据库数据文件)查询，从缓存中查询，从而提高查询效率，解决了高并发系统的性能问题。

#### 为什么使用缓存？

- 减少和数据库的交互次数，减少系统开销，提高系统效率。

#### 什么样的数据能使用缓存？

- 经常查询并且**不经常改变**的数据。



### 13.2 Mybatis缓存

- MyBatis包含一个非常强大的查询缓存特性，它可以非常方便地定制和配置缓存。缓存可以极大的提升查询效率。

- MyBatis系统中默认定义了两级缓存：**一级缓存**和**二级缓存**

- - 默认情况下，只有一级缓存开启。（SqlSession级别的缓存，也称为本地缓存）
  - 二级缓存需要手动开启和配置，他是基于namespace级别的缓存。
  - 为了提高扩展性，MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来自定义二级缓存



### 13.3 一级缓存

一级缓存也叫本地缓存：

- 与数据库同一次会话期间查询到的数据会放在本地缓存中。
- 以后如果需要获取相同的数据，直接从缓存中拿，没必须再去查询数据库；



#### 测试

1、在mybatis中加入日志，方便测试结果

2、编写接口方法

```java
//根据id查询用户
User queryUserById(@Param("id") int id);
```

3、接口对应的Mapper文件

```XML
<select id="queryUserById" resultType="user">
  select * from user where id = #{id}
</select>
```

4、测试

```JAVA
@Test
public void testQueryUserById(){
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   User user = mapper.queryUserById(1);
   System.out.println(user);
   User user2 = mapper.queryUserById(1);
   System.out.println(user2);
   System.out.println(user==user2);

   session.close();
}
```

5、结果分析

![](/images/2020-10-29-18-34-54.png)




### 12.4 一级缓存失效的四种情况

一级缓存是SqlSession级别的缓存，是一直开启的，我们关闭不了它；

一级缓存失效情况：没有使用到当前的一级缓存，效果就是，还需要再向数据库中发起一次查询请求！

1、sqlSession不同

```java
@Test
public void testQueryUserById(){
   SqlSession session = MybatisUtils.getSession();
   SqlSession session2 = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);
   UserMapper mapper2 = session2.getMapper(UserMapper.class);

   User user = mapper.queryUserById(1);
   System.out.println(user);
   User user2 = mapper2.queryUserById(1);
   System.out.println(user2);
   System.out.println(user==user2);

   session.close();
   session2.close();
}
```

观察结果：发现发送了两条SQL语句！

结论：**每个sqlSession中的缓存相互独立**

2、sqlSession相同，查询条件不同

```java
@Test
public void testQueryUserById(){
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);
   UserMapper mapper2 = session.getMapper(UserMapper.class);

   User user = mapper.queryUserById(1);
   System.out.println(user);
   User user2 = mapper2.queryUserById(2);
   System.out.println(user2);
   System.out.println(user==user2);

   session.close();
}
```

观察结果：发现发送了两条SQL语句！很正常的理解

结论：**当前缓存中，不存在这个数据**

3、sqlSession相同，两次查询之间执行了增删改操作！

增加方法

```java
//修改用户
int updateUser(Map map);
```

编写SQL

```xml
<update id="updateUser" parameterType="map">
  update user set name = #{name} where id = #{id}
</update>
```

测试

```java
@Test
public void testQueryUserById(){
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   User user = mapper.queryUserById(1);
   System.out.println(user);

   HashMap map = new HashMap();
   map.put("name","kuangshen");
   map.put("id",4);
   mapper.updateUser(map);

   User user2 = mapper.queryUserById(1);
   System.out.println(user2);

   System.out.println(user==user2);

   session.close();
}
```

观察结果：查询在中间执行了增删改操作后，重新执行了

结论：**因为增删改操作可能会对当前数据产生影响**

4、sqlSession相同，手动清除一级缓存

```java
@Test
public void testQueryUserById(){
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);

   User user = mapper.queryUserById(1);
   System.out.println(user);

   session.clearCache();//手动清除缓存

   User user2 = mapper.queryUserById(1);
   System.out.println(user2);

   System.out.println(user==user2);

   session.close();
}
```

**一级缓存就是一个map,默认开启,拿到连接和关闭同一sqlSession有效**



### 12.5 二级缓存

- 二级缓存也叫全局缓存，一级缓存作用域太低了，所以诞生了二级缓存

- 基于namespace级别的缓存，一个名称空间，对应一个二级缓存；

- 工作机制

  - 一个会话查询一条数据，这个数据就会被放在当前会话的一级缓存中；

  - 如果当前会话关闭了，这个会话对应的一级缓存就没了；但是我们想要的是，会话关闭了，一级缓存中的数据被保存到二级缓存中；
  - 新的会话查询信息，就可以从二级缓存中获取内容；
  - 不同的mapper查出的数据会放在自己对应的缓存（map）中；




#### 使用步骤

1、开启全局缓存 【mybatis-config.xml】

```xml
<setting name="cacheEnabled" value="true"/>
```

2、去每个mapper.xml中配置使用二级缓存，这个配置非常简单；【xxxMapper.xml】

```xml
<cache/>

<!--官方示例=====>查看官方文档-->
<cache
 eviction="FIFO"
 flushInterval="60000"
 size="512"
 readOnly="true"/>
<!--
这个更高级的配置创建了一个 FIFO 缓存，每隔 60 秒刷新，最多可以存储结果对象或列表的 512 个引用，而且返回的对象被认为是只读的，因此对它们进行修改可能会在不同线程中的调用者产生冲突。
-->
```

> 对于频繁查询的东西,可以在select标签属性使用`useCache="false"`禁用缓存

3、代码测试

- 所有的实体类先实现序列化接口
- 测试代码

```java
@Test
public void testQueryUserById(){
   SqlSession session = MybatisUtils.getSession();
   SqlSession session2 = MybatisUtils.getSession();

   UserMapper mapper = session.getMapper(UserMapper.class);
   UserMapper mapper2 = session2.getMapper(UserMapper.class);

   User user = mapper.queryUserById(1);
   System.out.println(user);
   session.close();

   User user2 = mapper2.queryUserById(1);
   System.out.println(user2);
   System.out.println(user==user2);

   session2.close();
}
```

> 在策略为FIFO是需要将实体类序列化. 否则会出现:
>
> `Caused by: java.io.NotSerializableException:com kuang.pojo.User`

#### 结论

- 只要开启了二级缓存，我们在同一个Mapper中的查询，可以在二级缓存中拿到数据
- 查出的数据都会被默认先放在一级缓存中
- 只有会话提交或者关闭以后，一级缓存中的数据才会转到二级缓存中



#### 缓存原理图

![](/images/2020-10-29-18-51-12.png)



### 12.6 EhCache


![](/images/2020-10-29-18-53-30.png)


第三方缓存实现--EhCache: 查看百度百科

Ehcache是一种广泛使用的java分布式缓存，用于通用缓存；

要在应用程序中使用Ehcache，需要引入依赖的jar包

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis.caches/mybatis-ehcache -->
<dependency>
   <groupId>org.mybatis.caches</groupId>
   <artifactId>mybatis-ehcache</artifactId>
   <version>1.1.0</version>
</dependency>
```

在mapper.xml中使用对应的缓存即可

```xml
<mapper namespace = “org.acme.FooMapper” > 
   <cache type = “org.mybatis.caches.ehcache.EhcacheCache” /> 
</mapper>
```

编写ehcache.xml文件，如果在加载时未找到/ehcache.xml资源或出现问题，则将使用默认配置。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
        updateCheck="false">
   <!--
      diskStore：为缓存路径，ehcache分为内存和磁盘两级，此属性定义磁盘的缓存位置。参数解释如下：
      user.home – 用户主目录
      user.dir – 用户当前工作目录
      java.io.tmpdir – 默认临时文件路径
    -->
   <diskStore path="./tmpdir/Tmp_EhCache"/>
   
   <defaultCache
           eternal="false"
           maxElementsInMemory="10000"
           overflowToDisk="false"
           diskPersistent="false"
           timeToIdleSeconds="1800"
           timeToLiveSeconds="259200"
           memoryStoreEvictionPolicy="LRU"/>

   <cache
           name="cloud_user"
           eternal="false"
           maxElementsInMemory="5000"
           overflowToDisk="false"
           diskPersistent="false"
           timeToIdleSeconds="1800"
           timeToLiveSeconds="1800"
           memoryStoreEvictionPolicy="LRU"/>
   <!--
      defaultCache：默认缓存策略，当ehcache找不到定义的缓存时，则使用这个缓存策略。只能定义一个。
    -->
   <!--
     name:缓存名称。
     maxElementsInMemory:缓存最大数目
     maxElementsOnDisk：硬盘最大缓存个数。
     eternal:对象是否永久有效，一但设置了，timeout将不起作用。
     overflowToDisk:是否保存到磁盘，当系统当机时
     timeToIdleSeconds:设置对象在失效前的允许闲置时间（单位：秒）。仅当eternal=false对象不是永久有效时使用，可选属性，默认值是0，也就是可闲置时间无穷大。
     timeToLiveSeconds:设置对象在失效前允许存活时间（单位：秒）。最大时间介于创建时间和失效时间之间。仅当eternal=false对象不是永久有效时使用，默认是0.，也就是对象存活时间无穷大。
     diskPersistent：是否缓存虚拟机重启期数据 Whether the disk store persists between restarts of the Virtual Machine. The default value is false.
     diskSpoolBufferSizeMB：这个参数设置DiskStore（磁盘缓存）的缓存区大小。默认是30MB。每个Cache都应该有自己的一个缓冲区。
     diskExpiryThreadIntervalSeconds：磁盘失效线程运行时间间隔，默认是120秒。
     memoryStoreEvictionPolicy：当达到maxElementsInMemory限制时，Ehcache将会根据指定的策略去清理内存。默认策略是LRU（最近最少使用）。你可以设置为FIFO（先进先出）或是LFU（较少使用）。
     clearOnFlush：内存数量最大时是否清除。
     memoryStoreEvictionPolicy:可选策略有：LRU（最近最少使用，默认策略）、FIFO（先进先出）、LFU（最少访问次数）。
     FIFO，first in first out，这个是大家最熟的，先进先出。
     LFU， Less Frequently Used，就是上面例子中使用的策略，直白一点就是讲一直以来最少被使用的。如上面所讲，缓存的元素有一个hit属性，hit值最小的将会被清出缓存。
     LRU，Least Recently Used，最近最少使用的，缓存的元素有一个时间戳，当缓存容量满了，而又需要腾出地方来缓存新的元素的时候，那么现有缓存元素中时间戳离当前时间最远的元素将被清出缓存。
  -->

</ehcache>
```

---

整理不易，转载请注明出处。

相关视频教程可参考狂神说


