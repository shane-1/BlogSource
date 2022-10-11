# JDBC

## 数据库驱动

程序通过数据库驱动和数据库交互

## JDBC

SUN公司为了简化开发人员的(对数据库统一的)操作,提供了一个Java操作数据库的规范,俗称JDBC

这些规范的实现由具体的厂商去实现

对于开发人员来说,我们只需要掌握JDBC接口的操作即可

> java.sql
>
> javax.sql

还需要导入一个数据库驱动包 

`mysql-connector-java-5.1.47.jar`

## 第一个JDBC程序

### 代码

```java
public class JDBC{

    public static void main(String[] args) throws ClassNotFoundException, SQLException{
        
        //1.加载驱动
        Class.forName("com.mysql.jdbc.Driver");  //固定写法
        
        //2.用户信息和url
		String url = "jdbc:mysql://localhost:3306/DateBaseName?useUnicode=true&characterEncoding=utf8&useSSL=true";
        String username = "root";
        String password = "123456";
            
        //3.连接成功,数据库对象
        Connection connection = DriverManager.getConnection(url,username,password);
        
        //4.执行sql的对象
        Statement statement = connection.createStatement();
        
        //5.执行sql的对象去执行sql,可能存在结构,查看返回结果
        String sql = "SELECT * FROM users";
        ResultSet resultSet = statement.executeQuery(sql);//返回的结果集,为链表
        
        while(resultSet.next()){
         System.out.println("id=" + resultSet.getObeject(columnLabel:"id"));  
         System.out.println("name=" + resultSet.getObeject(columnLabel:"NAME"));   
         System.out.println("pwd=" + resultSet.getObeject(columnLabel:"PASSWORD"));      
        }
        //6.释放连接
        resultSet.close();
        statement.close();
        connection.close();
    }
}
```

### 注意:

> 时区问题加&serverTimezone=GMT%2B8
>
> ssl报错是因为5.7.28以后的版本才真正支持ssl,但应用服务器没有提供验证出错,可以提供truststore或关闭ssl解决
>
> 8.0的sql驱动为com.mysql.cj.jdbc.driver

### 步骤总结

1. 加载驱动
2. 连接数据库 DriverManage
3. 获取执行sql的对象 Statement
4. 获得返回的结果集
5. 释放连接

## 数据库驱动

```sql
DiverManager.registerDriver(new com.mysql.jdbc.Driver());      
// 不建议这样使用,因为注册相关代码为静态代码块,类被加载就已经注册,这样写等同于注册了两次驱动

//推荐写法(利用反射)
 Class.forName("com.mysql.jdbc.Driver");  //固定写法
```

## URL

`String url = "jdbc:mysql://localhost:3306/DateBaseName?useUnicode=true&characterEncoding=utf8&useSSL=true";`

jdbc:mysql://主机地址:端口号/数据库名?参数1&参数2&参数3

> 默认mysql端口3306,Oracle1521,sqlServer1433;
>
> Oracle:  jdbc:oracle:thin:@localhost:1521:sid

## Connection

`Connection connection = DriverManager.getConnection(url,username,password);`

connection代表数据库

该层可以设置自动提交\事务提交\事务回滚等数据库层能做的事

## Statement&PrepareStatement

**jdbc中的statement对象用于向数据库发送SQL语句,想完成对数据库的增删改查,只需要通过这个对象向狙击发送增删改查语句即可.**

` Statement statement = connection.createStatement();`

- `statement.executeQuery();`查询操作返回ResultSet
- `statement.execute();`执行任何sql
- `statement.executeUpdate();` 更新\插入\删除,都是用这个,返回一个受影响的行数

## ResultSet

ResultSet查询结果集:封装了所有的查询结果

在不知道列类型情况下使用

```java
resultSet.getObject();
```

在知道了列类型时,获得指定的类型

```java
resultSet.getString();
resultSet.getInt();
resultSet.getFloat();
resultSet.getDate();
...
```

注意:结果集结构上为双向链表

1. `resultSet.beforeFirst();`:移动到最前面
2. `resultSet.afterLast();`:移动到最后面
3. `resultSet.next();`:移动到下一个数据
4. `resultSet.previous();`:移动到前一行
5. `resultSet.absolute(row);`:移动到指定行

```java
//一般使用while遍历
while(resultSet.next()){
...
}
```

## 释放资源

`resultSet.close();
     statement.close();
     connection.close();`

先打开的后关闭

## 自定义数据库工具类

将数据库资源配置解耦,单独存放于src目录下的db.properties文件

```
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/DateBaseName?useUnicode=true&characterEncoding=utf8&useSSL=true
username=root
password=123456
```



```java
import java.io.IOException
import java.io.InputStream;
import java.util.Properties;

public class JdbcUtils throws ClassNotFoundException {
    
    private static String driver = null;
    private static String url = null;
    private static String username = null;
    private static String password = null;
    
    static{
        try{
            InputStream in = JdbcUtils.class.getClassLoader().getResourceAsStream("db.properties");
            Properties properties = new Properties();
            properties.load(in);
            
            driver = properties.getProperty("driver");
            url = properties.getProperty("url");
            username = properties.getProperty("username");
            password = properties.getProperty("password");
            
            //1.加载驱动(只加载一次)
            Class.forName(driver);
        }
        catch(IOException e){
        	e.printStackTrace();
        }
        
    }
    
    //获取连接
    public static Connection getConnection() throws SQLException{
    	return Connection connection = DriverManager.getConnection(url,username,password);
    }
    
    //释放连接资源
    public static void release(Connection connection, Statement statement, ResultSet resultSet){
    	if(resultset != null){
            try{
                resultSet.close();
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
        if(statement != null){
            try{
                statement.close();
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
        if(connection != null){
            try{
                connection.close();
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
}
```

### 测试工具类

```java
import com.shane.utils.JdbcUtils; //导入自定义工具类

import java.sql.*;

public class Test{
	public static void main(String[] args){
    
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        try{
            connection = JdbcUtils.getConnection(); //获取数据库连接
            statement = connection.CreateStatement();//创建SQL执行对象
            String sql = "";
            int i = statement.executeUpdate(sql);//假设sql内容为插入,返回受影响行(删改同理)
            if(i > 0){
                System.out.println("插入成功~");
            }
            resultSet = statement.executeQuery(sql); //假设sql为查询
            	while(resultSet.next()){
        		 System.out.println("id=" + resultSet.getObeject(columnLabel:"id"));  
        		 System.out.println("name=" + resultSet.getObeject(columnLabel:"NAME"));   
       		     System.out.println("pwd=" + resultSet.getObeject(columnLabel:"PASSWORD"));      
      			  }    
        }catch(SQLException e){
            e.printStackTrace();
        }finally{
            JdbcUtils.release(connection,statement,resultSet)
        }
        
    }
    
}
```

## 避免SQL注入

**使用<u>PrepareStatement代替Statement</u>防止SQL注入**

### 本质

将传递来的参数当做字符,不直接拼接.

+ 假设其中存在转义字符(例如符号`),就直接忽略了

> 效率更高

```java
import com.shane.utils.JdbcUtils; //导入自定义工具类

import java.sql.*;
import java.util.Date;

public class Test{
	public static void main(String[] args){
    
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try{
            connection = JdbcUtils.getConnection(); //获取数据库连接
            //区别于Statement
            /*插入例子~增删同理*/
            //使用占位符代替参数
            String sql = "insert into users(id, `name`, `password`, 'birthday') values (?, ?, ?, ?)";
            //预编译,先写sql,不执行
            preparedStatement = connection.prepareStatement(sql);
            
            //手动赋值
            preparedStatement.setInt(1,4); //id赋值
            preparedStatement.setString(2,"shane"); //名字赋值
            preparedStatement.setInt(3,"12222"); //密码赋值
            //注意这里是哪个包的时间
            preparedStatement.setDate(4,new java.sql.Date(new java.util.Date().getTime())); 
     
            int i = preparedStatement.executeUpdate();
            if(i > 0){
                System.out.println("插入成功~");
            }
            /*查询例子*/
            sql = "select * from users where id = ?";
            preparedStatement = connection.prepareStatement(sql);//预编译
            preparedStatement.setInt(1,1);//传递参数
            resultSet = preparedStatement.executeQuery(); //执行查询
            	while(resultSet.next()){
        		 System.out.println("id=" + resultSet.getObeject(columnLabel:"id"));  
        		 System.out.println("name=" + resultSet.getObeject(columnLabel:"NAME"));   
       		     System.out.println("pwd=" + resultSet.getObeject(columnLabel:"PASSWORD"));      
      			  }    
        }catch(SQLException e){
            e.printStackTrace();
        }finally{
            JdbcUtils.release(connection,statement,resultSet)
        }
        
    }
    
}
```

## 事务

```java
import com.shane.utils.JdbcUtils; //导入自定义工具类

import java.sql.*;

public class Test{
	public static void main(String[] args){
    
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        try{
            connection = JdbcUtils.getConnection(); //获取数据库连接
            //关闭数据库自动提交,自动开启事务
            connection.setAutoCommit(false);
            
            String sql1 = "update account set money = money - 100 where name = ?";
            
            //预编译,先写sql,不执行
            preparedStatement = connection.prepareStatement(sql1);
            preparedStatement.setString(1,"A"); //名字赋值
            preparedStatement.excuteUpdate();
            String sql2 = "update account set money = money + 100 where name = ?";
            
            //预编译,先写sql,不执行
            preparedStatement = connection.prepareStatement(sql2);
            preparedStatement.setString(1,"B"); //名字赋值
            preparedStatement.excuteUpdate();
            
            //业务执行成功,提交事务
            connection.commit();
     
        }catch(SQLException e){
            try{
                connection.rollback(); //失败回滚
            }catch(SQLException e1){
                 e1.printStackTrace();
            }
            e.printStackTrace();
        }finally{
            JdbcUtils.release(connection,statement,resultSet)
        }
        
    }
    
}
```



- 开启事务` connection.setAutoCommit(false);`
- 一组业务执行完毕,提交事务
- 可以在catch语句中显示的定义回滚语句,但**默认失败就会回滚**

## 数据库连接池

数据库连接-执行完毕-释放十分浪费系统资源

### 池化技术

准备一些预先的资源,过来就连接预先准备好的

**编写连接池,实现了一个借口DataSource**

### 最小连接数

一般设置为常用连接数

### 最大连接数

业务最高承载上限

### 等待超时

如果超时到达该限度,就返回

### 开源数据源实现

- DBCP
- C3P0
- Druid

使用这些数据库连接池后,在项目开发中就不需要编写连接数据库的代码了!

### DBCP

需要的jar包

`commons-dbcp-1.4`/`commons-pool-1.6`

src目录下建立dbcpconfig.properties配置文件

```properties
#连接设置
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/bank
username=root
password=root

#初始化连接
initialSize=10

#最大连接数量
maxActive=50

#最大空闲连接
maxIdle=20

#最小空闲连接
minIdle=5

#超时,单位为毫秒
maxWait=60000

#JDBC驱动建立连接时附带的连接属性属性的格式必须为这样：[属性名=property;]
#注意：“user” 与 “password” 两个属性会被明确地传递，因此这里不需要包含他们。
connectionProperties=useUnicode=true;characterEncoding=gbk

#指定由连接池所创建的连接的自动提交（auto-commit）状态。
defaultAutoCommit=true

#driver default 指定由连接池所创建的连接的事务级别（TransactionIsolation）。
#可用值为下列之一：（详情可见javadoc。）NONE,READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE
defaultTransactionIsolation=READ_UNCOMMITTED
```

代码

```java
import org.apache.commons.dbcp.BasicDataSource
import java.io.IOException
import java.io.InputStream;
import java.util.Properties;

public class JdbcUtils_DBCP throws ClassNotFoundException {
    
    private static DateSource dataSource = null;
    
    static{
        try{
            InputStream in = JdbcUtils_DBCP.getClassLoader().getResourceAsStream("dbcpconfig.properties");
            Properties properties = new Properties();
            properties.load(in);
            //创建数据源
            dataSource = BasicDataSourceFactory.createDataSource(properties);
            
        }catch(IOException e){
        	e.printStackTrace();
        }
        
    }
    
    //获取连接
    public static Connection getConnection() throws SQLException{
    	return dataSource.getConnection(); //从数据源获取连接
    }
    
    //释放连接资源
    public static void release(Connection connection, Statement statement, ResultSet resultSet){
    	if(resultset != null){
            try{
                resultSet.close();
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
        if(statement != null){
            try{
                statement.close();
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
        if(connection != null){
            try{
                connection.close();
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
}
            
```



### C3P0

需要的jar包

`c3p0-0.9.5.5`\\`mchange-commons-java-0.2.19`

```xml
<c3p0-config>
  <default-config>
    <property name="driverClass">com.mysql.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql://localhost/std</property>
    <property name="user">root</property>
    <property name="password">root</property>
    
    <property name="initialPoolSize">10</property>
    <property name="maxIdleTime">30</property>
    <property name="maxPoolSize">100</property>
    <property name="minPoolSize">10</property>
    <property name="maxStatements">200</property>
  </default-config>

  <!-- This app is massive! -->
  <named-config name="intergalactoApp"> 
    <property name="acquireIncrement">50</property>
    <property name="initialPoolSize">100</property>
    <property name="minPoolSize">50</property>
    <property name="maxPoolSize">1000</property>

    <!-- intergalactoApp adopts a different approach to configuring statement caching -->
    <property name="maxStatements">0</property> 
    <property name="maxStatementsPerConnection">5</property>

    <!-- he's important, but there's only one of him -->
    <user-overrides user="master-of-the-universe"> 
      <property name="acquireIncrement">1</property>
      <property name="initialPoolSize">1</property>
      <property name="minPoolSize">1</property>
      <property name="maxPoolSize">5</property>
      <property name="maxStatementsPerConnection">50</property>
    </user-overrides>
  </named-config>
</c3p0-config>
```

代码

```java
import org.apache.commons.dbcp.BasicDataSource
import java.io.IOException
import java.io.InputStream;
import java.util.Properties;

public class JdbcUtils_C3P0 throws ClassNotFoundException {
    
    private static DateSource dataSource = null;
    
    static{
        try{
                   //配置
            dataSource = new ComboPooledDataSource(configName:"default-config");
            
        }catch(IOException e){
        	e.printStackTrace();
        }
        
    }
    
    //获取连接
    public static Connection getConnection() throws SQLException{
    	return dataSource.getConnection(); //从数据源获取连接
    }
    
    //释放连接资源
    public static void release(Connection connection, Statement statement, ResultSet resultSet){
    	if(resultset != null){
            try{
                resultSet.close();
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
        if(statement != null){
            try{
                statement.close();
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
        if(connection != null){
            try{
                connection.close();
            }catch(SQLException e){
                e.printStackTrace();
            }
        }
}
            
```


---

整理不易，转载请注明出处。

