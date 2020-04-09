#Spring框架
>4.0
## 第1章  Spring概述 
### 1.1 Spring概述
1. Spring是一个开源框架 
2. Spring为简化企业级开发而生，使用Spring，JavaBean就可以实现很多以前要靠EJB才能实现的功能。同样的功能，在EJB中要通过繁琐的配置和复杂的代码才能够实现，而在Spring中却非常的优雅和简洁。 
3. Spring是一个`IOC(DI)`和`AOP`容器框架。
4. Spring的优良特性<br>
 ①	 非侵入式：基于Spring开发的应用中的对象可以不依赖于Spring的API<br>
 ②  依赖注入：DI——Dependency Injection，反转控制(IOC)最经典的实现。<br>
 ③  面向切面编程：Aspect Oriented Programming——AOP<br>
 ④  容器：Spring是一个容器，因为它包含并且管理应用对象的生命周期<br>
 ⑤  组件化：Spring实现了使用简单的组件配置组合成一个复杂的应用。在 Spring 中可以使用XML和Java注解组合这些对象。<br>
5. 一站式：在IOC和AOP的基础上可以整合各种企业应用的开源框架和优秀的第三方类库（实际上Spring 自身也提供了表述层的SpringMVC和持久层的Spring JDBC）。<br>

6. Spring模块
![](/images/2020-04-09-16-55-24.png)
### 1.2 安装Spring插件
1. 插件包：springsource-tool-suite-3.4.0.RELEASE-e4.3.1-updatesite.zip
2. 操作步骤：参照《[尚硅谷]_参考资料：安装Springtools插件.doc
### 1.3搭建Spring运行时环境
1. 加入JAR包
① Spring自身JAR包：<br>`spring-framework-4.0.0.RELEASE\libs`目录下<br>
```
spring-beans-4.0.0.RELEASE.jar
spring-context-4.0.0.RELEASE.jar
spring-core-4.0.0.RELEASE.jar
spring-expression-4.0.0.RELEASE.jar
```
② `commons-logging-1.1.1.jar`
2. 在Spring Tool Suite工具中通过如下步骤创建Spring的配置文件<br>
	① File->New->Spring Bean Configuration File<br>
	② 为文件取名字 例如：applicationContext.xml<br>
### 1.4 HelloWorld
1. 目标：使用Spring创建对象，为属性赋值
2. 创建Student类
![](/images/2020-04-09-18-40-10.png)
3. 创建Spring配置文件
```XML
<!-- 使用bean元素定义一个由IOC容器创建的对象 -->
	<!-- class属性指定用于创建bean的全类名 -->
	<!-- id属性指定用于引用bean实例的标识 -->
	<bean id="student" class="com.atguigu.helloworld.bean.Student">
		<!-- 使用property子元素为bean的属性赋值 -->
		<property name="studentId" value="1001"/>
		<property name="stuName" value="Tom2015"/>
		<property name="age" value="20"/>
	</bean>
```
4. 测试：通过Spring的IOC容器创建Student类实例
```JAVA
//1.创建IOC容器对象
ApplicationContext iocContainer = 
		new ClassPathXmlApplicationContext("helloworld.xml");
//2.根据id值获取bean实例对象
Student student = (Student) iocContainer.getBean("student");
//3.打印bean
System.out.println(student);
```
## 第2章  IOC容器和Bean的配置
### 2.1 IOC和DI
#### 2.1.1 IOC(Inversion of Control)：反转控制
&emsp;&emsp;在应用程序中的组件需要获取资源时，传统的方式是组件主动的从容器中获取所需要的资源，在这样的模式下开发人员往往需要知道在具体容器中特定资源的获取方式，增加了学习成本，同时降低了开发效率。<br>
&emsp;&emsp;反转控制的思想完全颠覆了应用程序组件获取资源的传统方式：反转了资源的获取方向——改由容器主动的将资源推送给需要的组件，开发人员不需要知道容器是如何创建资源对象的，只需要提供接收资源的方式即可，极大的降低了学习成本，提高了开发的效率。这种行为也称为查找的**被动形式**。
#### 2.1.2 DI(Dependency Injection)：依赖注入
&emsp;&emsp;IOC的另一种表述方式：即组件以一些预先定义好的方式(例如：setter 方法)接受来自于容器的资源注入。相对于IOC而言，这种表述更直接。<br>
&emsp;&emsp;IOC 描述的是一种思想，而DI 是对IOC思想的具体实现. 
#### 2.1.3 IOC容器在Spring中的实现
1. 在通过IOC容器读取Bean的实例之前，需要先将IOC容器本身实例化。
2. Spring提供了IOC容器的两种实现方式<br>
① BeanFactory：IOC容器的基本实现，是Spring内部的基础设施，是面向Spring本身的，不是提供给开发人员使用的。<br>
② ApplicationContext：BeanFactory的子接口，提供了更多高级特性。面向Spring的使用者，几乎所有场合都使用ApplicationContext而不是底层的BeanFactory
![](/images/2020-04-09-18-49-39.png)
#### 2.1.4 ApplicationContext的主要实现类
1.	ClassPathXmlApplicationContext：对应类路径下的XML格式的配置文件
2.	FileSystemXmlApplicationContext：对应文件系统中的XML格式的配置文件
3.	在初始化时就创建单例的bean，也可以通过配置的方式指定创建的Bean是多实例的。
#### 2.1.5 ConfigurableApplicationContext
1.	是ApplicationContext的子接口，包含一些扩展方法
2.	refresh()和close()让ApplicationContext具有启动、关闭和刷新上下文的能力。

#### 2.1.6 WebApplicationContext
1.	专门为WEB应用而准备的，它允许从相对于WEB根目录的路径中完成初始化工作

### 2.2 通过类型获取bean
1.	从IOC容器中获取bean时，除了通过id值获取，还可以通过bean的类型获取。但如果同一个类型的bean在XML文件中配置了多个，则获取时会抛出异常，所以同一个类型的bean在容器中必须是唯一的。
`HelloWorld helloWorld = cxt.getBean(HelloWorld. class);`

2.	 或者可以使用另外一个重载的方法，同时指定bean的id值和类型
`HelloWorld helloWorld = cxt.getBean(“helloWorld”,HelloWorld. class);`

### 2.3 给bean的属性赋值
#### 2.3.1 依赖注入的方式
1. 通过bean的setXxx()方法赋值
Hello World中使用的就是这种方式
![](/images/2020-04-09-18-52-12.png)
2. 通过bean的构造器赋值<br>
1)	Spring自动匹配合适的构造器<br>
```XML
     <bean id="book" class="com.atguigu.spring.bean.Book" >
           <constructor-arg value= "10010"/>
           <constructor-arg value= "Book01"/>
           <constructor-arg value= "Author01"/>
           <constructor-arg value= "20.2"/>
     </bean >
```

通过索引值指定参数位置
```XML
     <bean id="book" class="com.atguigu.spring.bean.Book" >
           <constructor-arg value= "10010" index ="0"/>
           <constructor-arg value= "Book01" index ="1"/>
           <constructor-arg value= "Author01" index ="2"/>
           <constructor-arg value= "20.2" index ="3"/>
     </bean >
```

2)	通过类型区分重载的构造器
```xml
<bean id="book" class="com.atguigu.spring.bean.Book" >
      <constructor-arg value= "10010" index ="0" type="java.lang.Integer" />
      <constructor-arg value= "Book01" index ="1" type="java.lang.String" />
      <constructor-arg value= "Author01" index ="2" type="java.lang.String" />
      <constructor-arg value= "20.2" index ="3" type="java.lang.Double" />
</bean >
```
#### 2.3.2  p名称空间
&emsp;&emsp;为了简化XML文件的配置，越来越多的XML文件采用属性而非子元素配置信息。Spring从2.5版本开始引入了一个新的p命名空间，可以通过<bean>元素属性的方式配置Bean	的属性。<br>
&emsp;&emsp;使用p命名空间后，基于XML的配置方式将进一步简化。
```xml
<bean 
	id="studentSuper" 
	class="com.atguigu.helloworld.bean.Student"
	p:studentId="2002" p:stuName="Jerry2016" p:age="18" />
```
#### 2.3.3 可以使用的值
1. 字面量      
1)	可以使用字符串表示的值，可以通过value属性或value子节点的方式指定<br>
2)	基本数据类型及其封装类、String等类型都可以采取字面值注入的方式<br>
3)	若字面值中包含特殊字符，可以使用`<![CDATA[]]>`把字面值包裹起来
2. null值
```xml
     <bean class="com.atguigu.spring.bean.Book" id="bookNull" >
           <property name= "bookId" value ="2000"/>
           <property name= "bookName">
               <null/>
           </property>
           <property name= "author" value ="nullAuthor"/>
           <property name= "price" value ="50"/>
     </bean >
```
3. 给bean的级联属性赋值
```xml
     <bean id="action" class="com.atguigu.spring.ref.Action">
          <property name="service" ref="service"/>
          <!-- 设置级联属性(了解) -->
          <property name="service.dao.dataSource" value="DBCP"/>
     </bean>
```

4. 外部已声明的bean
```xml
     <bean id="shop" class="com.atguigu.spring.bean.Shop" >
           <property name= "book" ref ="book"/>
     </bean >
```

5. 内部bean
当bean实例仅仅给一个特定的属性使用时，可以将其声明为内部bean。内部bean声明直接包含在`<property>`或`<constructor-arg>`元素里，不需要设置任何id或name属性<br>
内部bean不能使用在任何其他地方
```xml
<bean id="shop2" class="com.atguigu.spring.bean.Shop" >
    <property name= "book">
        <bean class= "com.atguigu.spring.bean.Book" >
           <property name= "bookId" value ="1000"/>
           <property name= "bookName" value="innerBook" />
           <property name= "author" value="innerAuthor" />
           <property name= "price" value ="50"/>
        </bean>
    </property>
</bean >
```
### 2.4 集合属性
在Spring中可以通过一组内置的XML标签来配置集合属性，例如：<list>，<set>或<map>。
#### 2.4.1 数组和List
&emsp;&emsp;配置java.util.List类型的属性，需要指定<list>标签，在标签里包含一些元素。这些标签可以通过<value>指定简单的常量值，通过<ref>指定对其他Bean的引用。通过<bean>	指定内置bean定义。通过<null/>指定空元素。甚至可以内嵌其他集合。<br>
&emsp;&emsp;数组的定义和List一样，都使用<list>元素。配置java.util.Set需要使用<set>标签，定义的方法与List一样。
```xml
     <bean id="shop" class="com.atguigu.spring.bean.Shop" >
           <property name= "categoryList">
               <!-- 以字面量为值的List集合 -->
               <list>
                    <value> 历史</value >
                    <value> 军事</value >
               </list>
           </property>
           <property name= "bookList">
               <!-- 以bean的引用为值的List集合 -->
               <list>
                    <ref bean= "book01"/>
                    <ref bean= "book02"/>
               </list>
           </property>
     </bean >
```
#### 2.4.2 Map
&emsp;&emsp;Java.util.Map通过<map>标签定义，<map>标签里可以使用多个<entry>作为子标签。每个条目包含一个键和一个值。<br>
&emsp;&emsp;必须在<key>标签里定义键。<br>
&emsp;&emsp;因为键和值的类型没有限制，所以可以自由地为它们指定<value>、<ref>、<bean>或<null/>元素。<br>
&emsp;&emsp;可以将Map的键和值作为<entry>的属性定义：简单常量使用key和value来定义；bean引用通过key-ref和value-ref属性定义。<br>
```xml
<bean id="cup" class="com.atguigu.spring.bean.Cup">
	<property name="bookMap">
		<map>
			<entry>
				<key>
					<value>bookKey01</value>
				</key>
				<ref bean="book01"/>
			</entry>
			<entry>
				<key>
					<value>bookKey02</value>
				</key>
				<ref bean="book02"/>
			</entry>
		</map>
	</property>
</bean>
```

2.4.3 集合类型的bean
&emsp;&emsp;如果只能将集合对象配置在某个bean内部，则这个集合的配置将不能重用。我们需要将集合bean的配置拿到外面，供其他bean引用。<br>
&emsp;&emsp;配置集合类型的bean需要引入util名称空间
```xml
<util:list id="bookList">
	<ref bean="book01"/>
	<ref bean="book02"/>
	<ref bean="book03"/>
	<ref bean="book04"/>
	<ref bean="book05"/>
</util:list>

<util:list id="categoryList">
	<value>编程</value>
	<value>极客</value>
	<value>相声</value>
	<value>评书</value>
</util:list>
```
### 2.5  FactoryBean
#### 2.5.1 FactoryBean
&emsp;&emsp;Spring中有两种类型的bean，一种是普通bean，另一种是工厂bean，即FactoryBean。<br>
&emsp;&emsp;工厂bean跟普通bean不同，其返回的对象不是指定类的一个实例，其返回的是该工厂bean的getObject方法所返回的对象。<br>
&emsp;&emsp;工厂bean必须实现org.springframework.beans.factory.
```xml
![](/images/2020-04-09-19-01-05.png)
<bean id="product" class="com.atguigu.spring.bean.ProductFactory">
	<property name="productName" value="Mp3" />
</bean>
```
### 2.6 bean的高级配置
#### 2.6.1 配置信息的继承
1. 背景
	查看下面两个Employee的配置，其中dept属性是重复的。
```xml
<bean id="dept" class="com.atguigu.parent.bean.Department">
	<property name="deptId" value="100"/>
	<property name="deptName" value="IT"/>
</bean>

<bean id="emp01" class="com.atguigu.parent.bean.Employee">
	<property name="empId" value="1001"/>
	<property name="empName" value="Tom"/>
	<property name="age" value="20"/>

	<!-- 重复的属性值 -->	
	<property name="dept" ref="dept"/>
</bean>

<bean id="emp02" class="com.atguigu.parent.bean.Employee">
	<property name="empId" value="1002"/>
	<property name="empName" value="Jerry"/>
	<property name="age" value="25"/>

	<!-- 重复的属性值 -->
	<property name="dept" ref="dept"/>
</bean>
```

2. 配置信息的继承
```xml
<!-- 以emp01作为父bean，继承后可以省略公共属性值的配置 -->
<bean id="emp02" parent="emp01">
	<property name="empId" value="1002"/>
	<property name="empName" value="Jerry"/>
	<property name="age" value="25"/>
</bean>
```
&emsp;&emsp;Spring允许继承bean的配置，被继承的bean称为父bean。继承这个父bean的bean	称为子bean<br>
&emsp;&emsp;子bean从父bean中继承配置，包括bean的属性配置<br>
&emsp;&emsp;子bean也可以覆盖从父bean继承过来的配置

3. 补充说明
&emsp;&emsp;父bean可以作为配置模板，也可以作为bean实例。若只想把父bean作为模板，可以设置<bean>的abstract 属性为true，这样Spring将不会实例化这个bean<br>
&emsp;&emsp;如果一个bean的class属性没有指定，则必须是抽象bean
&emsp;&emsp;并不是<bean>元素里的所有属性都会被继承。比如：autowire，abstract等。<br>
&emsp;&emsp;也可以忽略父bean的class属性，让子bean指定自己的类，而共享相同的属性配置。但此时abstract必须设为true。

#### 2.6.2 bean之间的依赖
&emsp;&emsp;有的时候创建一个bean的时候需要保证另外一个bean也被创建，这时我们称前面的bean对后面的bean有依赖。例如：要求创建Employee对象的时候必须创建Department。	这里需要注意的是依赖关系不等于引用关系，Employee即使依赖Department也可以不引用它。<br>
```xml
<bean id="emp03" class="com.atguigu.parent.bean.Employee" depends-on="dept ">
	<property name="empId" value="1003"/>
	<property name="empName" value="Kate"/>
	<property name="age" value="21"/>
</bean>
```

### 2.7  bean的作用域★
&emsp;&emsp;在Spring中，可以在<bean>元素的scope属性里设置bean的作用域，以决定这个bean是单实例的还是多实例的。<br>
&emsp;&emsp;默认情况下，Spring只为每个在IOC容器里声明的bean创建唯一一个实例，整个IOC容器范围内都能共享该实例：所有后续的getBean()调用和bean引用都将返回这个唯一的bean实例。该作用域被称为singleton，它是所有bean的默认作用域。
![](/images/2020-04-09-19-04-25.png)
&emsp;&emsp;当bean的作用域为单例时，Spring会在IOC容器对象创建时就创建bean的对象实例。而当bean的作用域为prototype时，IOC容器在获取bean的实例时创建bean的实例对象。
### 2.8  bean的生命周期
1.	Spring IOC容器可以管理bean的生命周期，Spring允许在bean生命周期内特定的时间点执行指定的任务。
2.	Spring IOC容器对bean的生命周期进行管理的过程：<br>
	① 通过构造器或工厂方法创建bean实例<br>
	② 为bean的属性设置值和对其他bean的引用<br>
	③ 调用bean的初始化方法<br>
	④ bean可以使用了<br>
	⑤ 当容器关闭时，调用bean的销毁方法
3.	在配置bean时，通过init-method和destroy-method 属性为bean指定初始化和销毁方法
4.	bean的后置处理器
	① bean后置处理器允许在调用**初始化方法前后**对bean进行额外的处理<br>
	② bean后置处理器对IOC容器里的所有bean实例逐一处理，而非单一实例。其典型应用是：检查bean属性的正确性或根据特定的标准更改bean的属性。<br>
	③ bean后置处理器时需要实现接口：<br>
`org.springframework.beans.factory.config.BeanPostProcessor。`在初始化方法被调用前后，Spring将把每个bean实例分别传递给上述接口的以下两个方法：
●`postProcessBeforeInitialization(Object, String)`
●`postProcessAfterInitialization(Object, String)`
5.	添加bean后置处理器后bean的生命周期
	①通过构造器或工厂方法**创建bean实例**<br>
	②为bean的**属性设置值***和对其他bean的引用<br>
	③将bean实例传递给bean后置处理器的postProcessBeforeInitialization()方法<br>
	④调用bean的初始化方法<br>
	⑤将bean实例传递给bean后置处理器的postProcessAfterInitialization()方法<br>
	⑥bean可以使用了<br>
	⑦当容器关闭时调用bean的销毁方法
### 2.9 引用外部属性文件
&emsp;&emsp;当bean的配置信息逐渐增多时，查找和修改一些bean的配置信息就变得愈加困难。这时可以将一部分信息提取到bean配置文件的外部，以properties格式的属性文件保存起来，同时在bean的配置文件中引用properties属性文件中的内容，从而实现一部分属性值在发生变化时仅修改properties属性文件即可。这种技术多用于连接数据库的基本信息的配置。
#### 2.9.1 直接配置
```xml
<!-- 直接配置 -->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
	<property name="user" value="root"/>
	<property name="password" value="root"/>
	<property name="jdbcUrl" value="jdbc:mysql:///test"/>
	<property name="driverClass" value="com.mysql.jdbc.Driver"/>
</bean>
```
#### 2.9.2 使用外部的属性文件
1. 创建properties属性文件
```xml
prop.userName=root
prop.password=root
prop.url=jdbc:mysql:///test
prop.driverClass=com.mysql.jdbc.Driver
```
2. 引入context名称空间
![](/images/2020-04-09-19-11-34.png)	 

3. 指定properties属性文件的位置
```xml
<!-- 指定properties属性文件的位置 -->
<!-- classpath:xxx 表示属性文件位于类路径下 -->
<context:property-placeholder location="classpath:jdbc.properties"/>
```
4. 从properties属性文件中引入属性值
```xml
<!-- 从properties属性文件中引入属性值 -->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
	<property name="user" value="${prop.userName}"/>
	<property name="password" value="${prop.password}"/>
	<property name="jdbcUrl" value="${prop.url}"/>
	<property name="driverClass" value="${prop.driverClass}"/>
</bean>
```
### 2.10 自动装配
#### 2.10.1 自动装配的概念
1.	手动装配：以value或ref的方式明确指定属性值都是手动装配。
2.	自动装配：根据指定的装配规则，不需要明确指定，Spring自动将匹配的属性值注入bean中。
#### 2.10.2 装配模式
1.	根据类型自动装配：将类型匹配的bean作为属性注入到另一个bean中。若IOC容器中有多个与目标bean类型一致的bean，Spring将无法判定哪个bean最合适该属性，所以不能执行自动装配
2.	根据名称自动装配：必须将目标bean的名称和属性名设置的完全相同
3.	通过构造器自动装配：当bean中存在多个构造器时，此种自动装配方式将会很复杂。不推荐使用。
#### 2.10.3 选用建议	
&emsp;&emsp;相对于使用注解的方式实现的自动装配，在XML文档中进行的自动装配略显笨拙，在项目中更多的使用注解的方式实现。
### 2.11 通过注解配置bean
#### 2.11.1 概述
&emsp;&emsp;相对于XML方式而言，通过注解的方式配置bean更加简洁和优雅，而且和MVC组件化开发的理念十分契合，是开发中常用的使用方式。

#### 2.11.2 使用注解标识组件
1.	普通组件：@Component
		标识一个受Spring IOC容器管理的组件
2.	持久化层组件：@Repository
标识一个受Spring IOC容器管理的持久化层组件
3.	业务逻辑层组件：@Service
标识一个受Spring IOC容器管理的业务逻辑层组件
4.	表述层控制器组件：@Controller
标识一个受Spring IOC容器管理的表述层控制器组件
5.	组件命名规则
	①默认情况：使用组件的简单类名首字母小写后得到的字符串作为bean的id<br>
	②使用组件注解的value属性指定bean的id
	注意：事实上Spring并没有能力识别一个组件到底是不是它所标记的类型，即使将@Respository注解用在一个表述层控制器组件上面也不会产生任何错误，所以@Respository、@Service、@Controller这几个注解仅仅是为了让开发人员自己明确当前的组件扮演的角色。

#### 2.11.3  扫描组件
&emsp;&emsp;组件被上述注解标识后还需要通过Spring进行扫描才能够侦测到。
1.	指定被扫描的package
```xml
<context:component-scan base-package="com.atguigu.component"/>
```
2.	详细说明
	①**base-package**属性指定一个需要扫描的基类包，Spring容器将会扫描这个基类包及其子包中的所有类。<br>
	②当需要扫描多个包时可以使用逗号分隔。<br>
	③如果仅希望扫描特定的类而非基包下的所有类，可使用resource-pattern属性过滤特定的类，示例：
```xml
<context:component-scan 
	base-package="com.atguigu.component" 
	resource-pattern="autowire/*.class"/>
```
	④包含与排除<br>
		●<context:include-filter>子节点表示要包含的目标类<br>
注意：通常需要与use-default-filters属性配合使用才能够达到“仅包含某些组件”这样的效果。即：通过将use-default-filters属性设置为false，	禁用默认过滤器，然后扫描的就只是include-filter中的规则指定的组件了。<br>
		●<context:exclude-filter>子节点表示要排除在外的目标类<br>
		●component-scan下可以拥有若干个include-filter和exclude-filter子节点<br>
		●过滤表达式
|类别|  示例|说明|     
|:--:|:--:|:--:|		
|annotation|	com.atguigu.XxxAnnotation|过滤所有标注了XxxAnnotation的类。这个规则根据目标组件是否标注了指定类型的注解进行过滤。|
|assignable|com.atguigu.BaseXxx|过滤所有BaseXxx类的子类。这个规则根据目标组件是否是指定类型的子类的方式进行过滤。|
|aspectj|com.atguigu.*Service+|所有类名是以Service结束的，或这样的类的子类。这个规则根据AspectJ表达式进行过滤。|
|regex|com\.atguigu\.anno\.*|所有com.atguigu.anno包下的类。这个规则根据正则表达式匹配到的类名进行过滤。|
|custom|com.atguigu.XxxTypeFilter|使用XxxTypeFilter类通过编码的方式自定义过滤规则。该类必须实现org.springframework.core.type.filter.TypeFilter接口|
3.	JAR包
必须在原有JAR包组合的基础上再导入一个：spring-aop-4.0.0.RELEASE.jar
#### 2.11.4 组件装配
1.	需求
	Controller组件中往往需要用到Service组件的实例，Service组件中往往需要用到Repository组件的实例。Spring可以通过注解的方式帮我们实现属性的装配。
2.	实现依据
	在指定要扫描的包时，<context:component-scan> 元素会自动注册一个bean的后置处	理器：AutowiredAnnotationBeanPostProcessor的实例。该后置处理器可以 自动装配标记	了@Autowired、@Resource或@Inject注解的属性。
3.	@Autowired注解
	①根据类型实现自动装配。<br>
	②构造器、普通字段(即使是非public)、一切具有参数的方法都可以应用@Autowired注解<br>
	③默认情况下，所有使用@Autowired注解的属性都需要被设置。当Spring找不到匹配的bean装配属性时，会抛出异常。<br>
	④若某一属性允许不被设置，可以设置@Autowired注解的required属性为 false<br>
	⑤默认情况下，当IOC容器里存在多个类型兼容的bean时，Spring会尝试匹配bean 的id值是否与变量名相同，如果相同则进行装配。如果bean的id值不相同，通过类型的自动装配将无法工作。此时可以在@Qualifier注解里提供bean的名称。Spring甚至允许在方法的形参上标注@Qualifiter注解以指定注入bean的名称。<br>	
    ⑥@Autowired注解也可以应用在数组类型的属性上，此时Spring将会把所有匹配的bean进行自动装配。<br>
	⑦@Autowired注解也可以应用在集合属性上，此时Spring读取该集合的类型信息，然后自动装配所有与之兼容的bean。<br>
	⑧@Autowired注解用在java.util.Map上时，若该Map的键值为String，那么 Spring将自动装配与值类型兼容的bean作为值，并以bean的id值作为键。
		
4.	@Resource
	@Resource注解要求提供一个bean名称的属性，若该属性为空，则自动采用标注处的变量或方法名作为bean的名称。
5.	@Inject
	@Inject和@Autowired注解一样也是按类型注入匹配的bean，但没有reqired属性。
