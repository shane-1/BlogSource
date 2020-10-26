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

3. 

---

整理不易，转载请注明出处。


