# 注解和反射 

# Annotation and Reflection

> 框架实现基础

## 注解

> Annotation是从JDK5.0开始引入的新技术

### 作用:

  + 不是程序本身,可以对程序作出解释.(这一点和注释(comment)没什么区别)
  + 可以被其他程序(比如:编译器等)读取.

### 格式:

  + 注解是以"@注释名"在代码中存在的,还可以添加一些参数值,例如:@SuppressWarnings(value="unchecked").

### Annotation在哪里使用?

  + 可以附加在package , class , method , field等上面,相当于给他们添加了额外的辅助信息,我们可以通过反射机制编程实现对这些元数据的访问

>注解可以检查和约束<br>

### 内置注解

+ @override :定义在java.lang.Override中,此注释只适用于修辞方法,表示一个方法声明打算重写超类中的另一个方法声明.
+ @Deprecated :定义在java.lang.Deprecated中,此注释可以用于修辞`方法`,`属性`,`类`,表示不鼓励程序员使用这样的元素,通常是因为它很危险或者存在更好的选择.
+ @SuppressWarnings :定义在java.lang.SuppressWarnings中,用来抑制编译时的警告信息.
  + 与前两个注释有所不同,你需要添加一个参数才能正确使用,这些参数都是已经定义好了的,我们选择性的使用就好了
  + @SuppressWarnings("all")
  + @SuppressWarnings("unchecked")  
  + @SuppressWarnings(value=("unchecked", "deprecation")
  + 等等..

### 元注解 
+ 元注解的作用就是负责注解其他注解, Java定义了4个标准的meta-annotation类型,他们被用来提供对其他annotation类型作说明.
+ 这些类型和它们所支持的类在java.lang.annotation包中可以找到.(@Target , @Retention@Documented , @lnherited)
  + @Target :用于描述注解的使用范围(即:被描述的注解可以用在什么地方)
  + @Retention :表示需要在什么级别保存该注释信息,用于描述注解的生命周期(SOURCE < CLASS < RUNTIME)
  + @Document:说明该注解将被包含在javadoc中
  + @lnherited:说明子类可以继承父类中的该注解

```java

//注解目标
@Target(value = {ElemntType.METHOD, ElemntType.TYPE})
//注解有效过程
@Retention(value = Retention.RUNTIME)
//是否生成在JAVAdoc中
@Document
@interrface MyAnnotation{

}
```
### 自定义注解
+ 使用@interface自定义注解时,自动继承了java.lang.annotatlon.Annotation接口
  + 分析:
    + @ interface用来声明一个注解,格式: public @ interface注解名{定义内容}
    + 其中的每一个方法实际上是声明了一个配置参数.
    + 方法的名称就是参数的名称.
    + 返回值类型就是参数的类型(返回值只能是基本类型,Class , String , enum ).
    + 可以通过default来声明参数的默认值.
    + 如果只有一个参数成员,一般参数名为value/注解元素必须要有值,我们定义注解元素时,经常使用空字符串,0作为默认值.

```java
public class test{
  //定义参数使用注解必须带参数,除非注解有默认值
  @MyAnnotationPlus(name = "shane",shool="SAU")
  public void test(){

  }
}
@Target(value = {ElemntType.METHOD, ElemntType.TYPE}) //作用于类和方法上
@Retention(value = Retention.RUNTIME) //运行时
@interface MyAnnotationPlus{
  //主节点参数: 参数类型 + 参数名();!不是方法!
  String name();
  
  int age() default 0;
  int id() default -1;//-1代表不存在

  String[] school();
}
```
> 如果自定义注解只有一个值时，建议设置为value，此时在注解传递参数可省略名字
## 反射
>基于 JDK 1.8
### 回顾：什么是反射？
**反射 (Reflection) 是 Java 的特征之一，它允许运行中的 Java 程序获取自身的信息，并且可以操作类或对象的内部属性。**<br>

Oracle 官方对反射的解释是：<br>
>Reflection enables Java code to discover information about the fields, methods and constructors of loaded classes, and to use reflected fields, methods, and constructors to operate on their underlying counterparts, within security restrictions.<br>The API accommodates applications that need access to either the public members of a target object (based on its runtime class) or the members declared by a given class. It also allows programs to suppress default reflective access control.

&emsp;&emsp;简而言之，通过反射，我们可以在运行时获得程序或程序集中每一个类型的成员和成员的信息。程序中一般的对象的类型都是在编译期就确定下来的，而 Java 反射机制可以动态地创建对象并调用其属性，这样的对象的类型在编译期是未知的。所以我们可以通过反射机制直接创建对象，即使这个对象的类型在编译期是未知的。

&emsp;&emsp;Reflection (反射)是Java被视为动态语言的关键,反射机制允许程序在执行期借助于Reflection API取得任何类的内部信息,并能直接操作任意对象的内部属性及方法<br>
`Class c = Class.forName("java.lang.String")`<br>
&emsp;&emsp;加载完类之后,在堆内存的方法区中就产生了一个Class类型的对象(一个类只有个Class对象,这个对象就包含了完整的类的结构信息 我们可以通过这个对象看到类的结构。这个对象就像一面镜子,透过这个镜子看到类的结构,所以我们形象的称之为:反射<br>

&emsp;&emsp;反射的核心是 JVM 在运行时才动态加载类或调用方法/访问属性，它不需要事先（写代码的时候或编译期）知道运行对象是谁。

### 动态语言

+ 是一类在运行时可以改变其结构的语言:例如新的函数、对象、甚至代码可以被引进,已有的函数可以被删除或是其他结构上的变化。通俗点说就是在运行时代码可以根据某些条件改变自身结构。
+ 主要动态语言: Object-C,C#、JavaScript, PHP,Python等。

### 静态语言

+ 与动态语言相对应的,运行时结构不可变的语言就是静态语言。如Java, C.C++. 
+ Java不是动态语言,但Java可以称之为准动态语言")即Java有一定的动态性,我们可以利用反射机制获得类似动态语言的特性。Java的动态性让编程的时候更加灵活!


Java 反射主要提供以下功能：

+ 在运行时判断任意一个对象所属的类；
+ 在运行时构造任意一个类的对象；
+ 在运行时判断任意一个类所具有的成员变量和方法（通过反射甚至可以调用private方法）；
+ 在运行时调用任意一个对象的方法<br>

重点：**是运行时而不是编译时**

### 反射的主要用途

&emsp;&emsp;很多人都认为反射在实际的 Java 开发应用中并不广泛，其实不然。当我们在使用 IDE(如 Eclipse，IDEA)时，当我们输入一个对象或类并想调用它的属性或方法时，一按点号，编译器就会自动列出它的属性或方法，这里就会用到反射。

&emsp;&emsp;**反射最重要的用途就是开发各种通用框架。** 很多框架（比如 Spring）都是配置化的（比如通过 XML 文件配置 Bean），为了保证框架的通用性，它们可能需要根据配置文件加载不同的对象或类，调用不同的方法，这个时候就必须用到反射，运行时动态加载需要加载的对象。

&emsp;&emsp;举一个例子，在运用 Struts 2 框架的开发中我们一般会在 struts.xml 里去配置 Action，比如：
```xml
<action name="login"
               class="org.ScZyhSoft.test.action.SimpleLoginAction"
               method="execute">
           <result>/shop/shop-index.jsp</result>
           <result name="error">login.jsp</result>
       </action>
```
&emsp;&emsp;配置文件与 Action 建立了一种映射关系，当 View 层发出请求时，请求会被 `StrutsPrepareAndExecuteFilter` 拦截，然后 `StrutsPrepareAndExecuteFilter` 会去动态地创建 Action 实例。比如我们请求 `login.action`，那么 `StrutsPrepareAndExecuteFilter`就会去解析struts.xml文件，检索action中name为login的Action，并根据class属性创建SimpleLoginAction实例，并用invoke方法来调用execute方法，这个过程离不开反射。

&emsp;&emsp;对与框架开发人员来说，反射虽小但作用非常大，它是各种容器实现的核心。而对于一般的开发者来说，不深入框架开发则用反射用的就会少一点，不过了解一下框架的底层机制有助于丰富自己的编程思想，也是很有益的。


### 反射的基本运用
上面我们提到了反射可以用于判断任意对象所属的类，获得 Class 对象，构造任意一个对象以及调用一个对象。这里我们介绍一下基本反射功能的使用和实现(反射相关的类一般都在 java.lang.relfect 包里)。

### API

+ java.lang.Class :代表一个类
+ java.lang.reflect.Method :代表类的方法
+ java.lang.reflect.Field:代表类的成员变量
+ java.lang.reflect.Constructor :代表类的构造器

### Class类（反射的源头）

&emsp;&emsp;对象照镜子后可以到的信息:某个类的属性、方法和构造器、某个类到底实现了哪些接口。对于每个类而言, RE都为其保留一个不变的class类型的对象。一个Class对象包含了特定某个结构(class/interface/enum/annotation/primitive type/void/)的有关信息。
+ Class本身也是一个类Class对象只能由系统建立对象
+ 一个加载的类在JVM中只会有一个Class实例
+ 一个Class对象对应的是一个加载到JVM中的一个.class文件
+ 每个类的实例都会记得自己是由哪个Class实例所生成
+ 通过Class可以完整地得到一个类中的所有被加载的结构
+ Class类是Reflection的根源,针对任何你想动态加载、运行的类,唯有先获得相应的Class对象

### 类加载内存分享

![](/images/2020-09-16-16-26-06.png)

初始化过程：
![](/images/2020-09-17-09-15-19.png)

+ 加载:将class文件字节码内容加载到内存中,并将这些静态数据转换成方法区的运行时数据结构,然后生成一个代表这个类的java.lang.Class对象。
+ 链接:将Java类的二进制代码合并到JVM的运行状态之中的过程。
  + 验证:确保加载的类信息符合JVM规范,没有安全方面的问题。
  + 准备:正式为类变量(static)分配内存并设置类变量默认初始值的阶段,这些内存都将在方法区中进行分配。
  + 解析:虚拟机常量池内的符号引用(常量名)替换为直接引用(地址)的过程。
+ 初始化:
  + 执行类构造器<clinit> ()方法的过程。类构造器<clinit> ()方法是由编译期自动收集类中所有类变量的赋值动作和静态代码块中的语句合并产生的。(类构造器是构造类信息的,不是构造该类对象的构造器)。
  + 当初始化一个类的时候,如果发现其父类还没有进行初始化,则需要先触发其父类的初始化。
  + 虚拟机会保证一个类的<clinit> ()方法在多线程环境中被正确加锁和同步。

### 分析类初始化

+ 类的主动引用(一定会发生类的初始化)
  + 当虚拟机启动, 初始化main方法所在的类
  + new一个类的对象
  + 调用类的静态成员(除了final常量)和静态方法
  + 使用java.lang.reflect包的方法对类进行反射调用
  + 当初始化一个类,如果其父类没有被初始化,则先会初始化它的父类
+ 类的被动引用(不会发生类的初始化)
  + 当访问一个静态域时,只有真正声明这个域的类才会被初始化。如:当通过子类引用父类的静态变量,不会导致子类初始
  + 通过数组定义类引用,不会触发此类的初始化
  + 引用常量不会触发此类的初始化(常量在链接阶段就存入调用类的常量池中了)

### 类加载器

+ 类加载的作用:

  &emsp;&emsp;将class文件字节码内容加载到内存中,并将这些静态数据转换成方法区的运行时数据结构,然后在堆中生成一个代表这个类的java.lang.Class对象,作为方法区中类数据的访问入口。

+ 类缓存:

  &emsp;&emsp;标准的JavaSE类加载器可以按要求查找类,但一旦某个类被加载到类加载器中,它将维持加载(缓存)一段时间。不过JVM垃圾回收机制可以回收这些Class对象

#### 加载器分类

> 引导类>扩展类>系统类

+ 引导类加载器 Bootstap ClassLoader:

&emsp;&emsp;用C++编写的,是JVM自带的类加载器,负责Java平台核心库,用来装载核心类库。该加载器无法直接获取

+ 扩展类加载器 Extension Classloader:

&emsp;&emsp;负责jrelib/ext目录下的jar包或D java.ext.dirs指定目录下的jar包装入工作库

+ 系统类加载器 System Classloader:

&emsp;&emsp;负责java-classpath或-Djava.class.path所指的目录下的类与jar包装入工作,是最常用的加载器

```java
public class Test{
  public static void main(String[] args) throws ClassNotFoundException{ //使用了forName();

    //获取系统类的加载器
    ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
    System.out.println(systemClassLoader);

    //获取系统类加载器父类->扩展类加载器
    ClassLoader parent = systemClassLoader.getParent();
    System.out.println(parent);

    //获取扩展类加载器的父类加载器->根加载器(c/c++)
    ClassLoader grandParent = parent.getParent();
    System.out.println(grandParent)

    //测试当前类是哪个加载器加载
    ClassLoader classLoader = Class.forName("com.shane.reflection.test").getClassLoader();
    System.out.println(classLoader);

    classLoader = Class.forName("java.lang.Object").getClassLoader();
    System.out.println(classLoader);

    //获取系统类加载器可以加载的路径
    System.out.println(System.getProperty("java.class.path));
  }
}
```
结果:
> sun.misc. Launcher$App lassLoader@18b4aac2<br>
sun.misc. Launcher$ExtclassLoader@4554617c <br>
null<br>
sun.misc. LauncherşAppClassLoadera18b4aac2 <br>
null<br><br>
Process finished with exit code o

### 获得 Class 对象

+ 若已知具体的类,通过类的class属性获取,该方法最为安全可靠,程序性能最高。<br>
`Class clazz = Person.class;`
+ 已知某个类的实例,调用该实例的getClass()方法获取Class对象<br>
`Class clazz = person.getClass();`
+ 已知一个类的全类名,且该类在类路径下,可通过Class类的静态方法forName()获取,可能抛出ClassNotFoundException<br>
`Class clazz = Class.forName("demo01.Student");`
+ 内置基本数据类型可以直接用类名.Type
+ 还可以利用ClassLoader

```java
public class test{
  public static void main(String[] args){
    Person person = new Student();
    System.ou.println(person.name);

    //1.通过对象
    class c1 = person.getClass();
    System.out.println(c1.hashCode());

    //2.forname获得
    class c2 = class.forName("com.shane.refelection.Student");
    System.out.println(c2.hashCode());

    //3.通过类名.class获得
    Class c3 = Student.class;
    System.out.println(c3.hashCode());

    //4.内置包装类Type属性
    Class c4 = Integer.TYPE;
    System.out.println(c4.hashCode());
     
     //5.类加载器
     ClassLoader classLoader = this.get.Class().getClassLoader();
     Class c5 = classLoader.loadClass("com.shane.refelection.Student");
     System.out.println(c5.hashCode());
     
    //获得父类类型
    Class c5 = c1.getSuperclass();
    System.out.println(c5);
  }
}

class Person{
  /*
   *
   */
}
class Student extends Person{}
class Teacher extends Person{}
```
> 只要元素类型和维度一样,就是同一个class

### 判断是否为某个类的实例
&emsp;&emsp;一般地，我们用 instanceof 关键字来判断是否为某个类的实例。同时我们也可以借助反射中 Class 对象的 isInstance() 方法来判断是否为某个类的实例，它是一个 native 方法：
```java
public native boolean isInstance(Object obj);
```
### 创建实例
通过反射来生成对象主要有两种方式。

+ 使用Class对象的newInstance()方法来创建Class对象对应类的实例。
```java
Class<?> c = String.class;
Object str = c.newInstance();
```
+ 先通过Class对象获取指定的Constructor对象，再调用Constructor对象的newInstance()方法来创建实例。这种方法可以用指定的构造器构造类的实例。
```java
//获取String所对应的Class对象
Class<?> c = String.class;
//获取String类带一个String参数的构造器
Constructor constructor = c.getConstructor(String.class);
//根据构造器创建实例
Object obj = constructor.newInstance("23333");
System.out.println(obj);
```
### 获取方法
获取某个Class对象的方法集合，主要有以下几个方法：

&emsp;&emsp;getDeclaredMethods 方法返回类或接口声明的所有方法，包括公共、保护、默认（包）访问和私有方法，但*不包括继承的方法*。
```java
public Method[] getDeclaredMethods() throws SecurityException
```
&emsp;&emsp;getMethods 方法返回某个类的所有公用（public）方法，*包括其继承类的公用方法*。
```java
public Method[] getMethods() throws SecurityException
```
&emsp;&emsp;getMethod 方法返回一个特定的方法，其中第一个参数为方法名称，后面的参数为方法的参数*对应Class的对象*。(因为重载需要定位)
```java
public Method getMethod(String name, Class<?>... parameterTypes)
```
只是这样描述的话可能难以理解，我们用例子来理解这三个方法：
```java
package org.ScZyhSoft.common;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
public class test1 {
	public static void test() throws IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
	        Class<?> c = methodClass.class;
	        Object object = c.newInstance();
	        Method[] methods = c.getMethods();
	        Method[] declaredMethods = c.getDeclaredMethods();
	        //获取methodClass类的add方法
	        Method method = c.getMethod("add", int.class, int.class);
	        //getMethods()方法获取的所有方法
	        System.out.println("getMethods获取的方法：");
	        for(Method m:methods)
	            System.out.println(m);
	        //getDeclaredMethods()方法获取的所有方法
	        System.out.println("getDeclaredMethods获取的方法：");
	        for(Method m:declaredMethods)
	            System.out.println(m);
	    }
    }
class methodClass {
    public final int fuck = 3;
    public int add(int a,int b) {
        return a+b;
    }
    public int sub(int a,int b) {
        return a+b;
    }
}
```
程序运行的结果如下:
```
getMethods获取的方法：
public int org.ScZyhSoft.common.methodClass.add(int,int)
public int org.ScZyhSoft.common.methodClass.sub(int,int)
public final void java.lang.Object.wait() throws java.lang.InterruptedException
public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
public boolean java.lang.Object.equals(java.lang.Object)
public java.lang.String java.lang.Object.toString()
public native int java.lang.Object.hashCode()
public final native java.lang.Class java.lang.Object.getClass()
public final native void java.lang.Object.notify()
public final native void java.lang.Object.notifyAll()
getDeclaredMethods获取的方法：
public int org.ScZyhSoft.common.methodClass.add(int,int)
public int org.ScZyhSoft.common.methodClass.sub(int,int)
```
&emsp;&emsp;可以看到，通过 getMethods() 获取的方法可以获取到父类的方法,比如 java.lang.Object 下定义的各个方法。

### 获取构造器信息
&emsp;&emsp;获取类构造器的用法与上述获取方法的用法类似。主要是通过Class类的getConstructor方法得到Constructor类的一个实例，而Constructor类有一个newInstance方法可以创建一个对象实例:
>使用getDeclaredConstructors可以获得所有构造器
```java
public T newInstance(Object ... initargs)
```
此方法可以根据传入的参数来调用对应的Constructor创建对象实例。

### 获取类的成员变量（字段）信息
主要是这几个方法，在此不再赘述：<br>
+ `getFiled：`访问*公有*的成员变量
+ `getDeclaredField：`所有已声明的成员变量，但不能得到其父类的成员变量
>`getFileds` 和 `getDeclaredFields` 方法用法同上（参照 Method）。

### 调用方法
&emsp;&emsp;当我们从类中获取了一个方法后，我们就可以用 invoke() 方法来调用这个方法。invoke 方法的原型为:
```java
public Object invoke(Object obj, Object... args)
        throws IllegalAccessException, IllegalArgumentException,
           InvocationTargetException
```
下面是一个实例：
```java
public class test1 {
    public static void main(String[] args) throws IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        Class<?> klass = methodClass.class;
        //创建methodClass的实例
        Object obj = klass.newInstance();
        //获取methodClass类的add方法
        Method method = klass.getMethod("add",int.class,int.class);
        //调用method对应的方法 => add(1,4)
        Object result = method.invoke(obj,1,4); //方法激活(对象,参数)
        System.out.println(result);
    }
}
class methodClass {
    public final int fuck = 3;
    public int add(int a,int b) {
        return a+b;
    }
    public int sub(int a,int b) {
        return a+b;
    }
}
```

`Object invoke (Object obj, Object ... args)`
+ Object对应原方法的返回值,若原方法无返回值,此时返回null
+ 若原方法若为静态方法,此时形参Object obj可为null
+ 若原方法形参列表为空,则ObjectI] args为null
+ 若原方法声明为private,则需要在调用此invoke()方法前,显式调用方法对象的setAccessible(true)方法,将可访问private的方法。

### 动态创建对象

```java
public class dynamicObjects{
  public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantionException{
    //获取Class对象
    Class c1 = Class.forName("com.shane.reflection.User");
    //构造一个对象
    User user = (User)c1.newInstance(); //调用了无参构造器
    /*class.newInstance();
    *1.需要有无参构造器
    *2.构造器的访问权限足够
    */
    //使用构造器创建对象
    Constructor constructor = c1.getDeclaredConstructor(String.class, int.class, int.class)
    User shane = constructor.newInstance("shane",001,18);

    //通过反射调用普通方法
    User user3 = (User)cl.newInstance();
    //通过反射获取一个方法
    Method setName = c1.getDeclaredMethod ( name: "setName", string.class);
    //invoke :激活的意思
    // (对象, "方法的值")
    setName . invoke (user3, .args: "1shane"); 
    System.out.println(user3. getName());
    //通过反射操作属性
    User user4 = (User)c1.newInstance();
    Field name = cl.getDeclaredField( name: "name");
    
    //不能直接操作私有属性,我们需要关闭程序的安全检测,属性或者方法的setAccessible(true)
    name.setAccessible(true); 
    name.set(user4,"2shane");
    System.out.println(user4. getName());
  }
}

```

### setAccessible

+ Method和Field,Constructor对象都有setAccessible()方法。
+ setAccessible作用是启动和禁用访问安全检查的开关。
+ 参数值为true则指杀反射的对象在使用时应该取消Java语言访问检查。
  + *提高反射的效率。*如果代码中必须用反射,而该句代码需要频繁的被调用,那么请设置为true
  + 使得原本无法访问的私有成员也可以访问
+ 参数值为false则指示反射的对象应该实施Java语言访问检查

### 利用反射创建数组
&emsp;&emsp;数组在Java里是比较特殊的一种类型，它可以赋值给一个Object Reference。下面我们看一看利用反射创建数组的例子：
```java
public static void testArray() throws ClassNotFoundException {
        Class<?> cls = Class.forName("java.lang.String");
        Object array = Array.newInstance(cls,25);
        //往数组里添加内容
        Array.set(array,0,"hello");
        Array.set(array,1,"Java");
        Array.set(array,2,"fuck");
        Array.set(array,3,"Scala");
        Array.set(array,4,"Clojure");
        //获取某一项的内容
        System.out.println(Array.get(array,3));
    }
```
&emsp;&emsp;其中的Array类为java.lang.reflect.Array类。我们通过`Array.newInstance()`创建数组对象，它的原型是:
```java
public static Object newInstance(Class<?> componentType, int length)
        throws NegativeArraySizeException {
        return newArray(componentType, length);
    }
```
&emsp;&emsp;而 `newArray `方法是一个 native 方法，它在 HotSpot JVM 里的具体实现我们后边再研究，这里先把源码贴出来：
```java
private static native Object newArray(Class<?> componentType, int length)
        throws NegativeArraySizeException;
```
源码目录：`openjdk\hotspot\src\share\vm\runtime\reflection.cpp`
```cpp
arrayOop Reflection::reflect_new_array(oop element_mirror, jint length, TRAPS) {
  if (element_mirror == NULL) {
    THROW_0(vmSymbols::java_lang_NullPointerException());
  }
  if (length < 0) {
    THROW_0(vmSymbols::java_lang_NegativeArraySizeException());
  }
  if (java_lang_Class::is_primitive(element_mirror)) {
    Klass* tak = basic_type_mirror_to_arrayklass(element_mirror, CHECK_NULL);
    return TypeArrayKlass::cast(tak)->allocate(length, THREAD);
  } else {
    Klass* k = java_lang_Class::as_Klass(element_mirror);
    if (k->oop_is_array() && ArrayKlass::cast(k)->dimension() >= MAX_DIM) {
      THROW_0(vmSymbols::java_lang_IllegalArgumentException());
    }
    return oopFactory::new_objArray(k, length, THREAD);
  }
}
```
&emsp;&emsp;另外，Array 类的 `set` 和 `get `方法都为 native 方法，在 HotSpot JVM 里分别对应` Reflection::array_set` 和 `Reflection::array_get` 方法，这里就不详细解析了。

### 反射过程

java.lang.Class是反射的源头

1. 我们创建了一个类,通过编译(javac.exe)生成了字节码文件.class文件.
2. 此.class文件加载到内存中去以后,就是一个运行时类,存在缓存区,那么这个运行时类本身就是Class的实例.
3. 每个运行时类只加载一次
4. 有了Class的实例后,我们可以做如下操作:
   - 创建对应的**运行时**类的对象
   - 获取对应的**运行时**类的属性,方法,构造方法,父类,所在的包,异常,接口等
   - 调用对应的**运行时**类的属性,方法,构造方法等

### 性能分析

```java
//分析性能问题
public class BenchMark{
  //普通方式调用
  public static void testl(){
    User user = new User():
    long startTime = System.currentTimeMillis();
    for(int i =0; i < 1000000000; i++) {
      user . getName ();}
    Long endTime = system.currentTimeMillis();
    System.out.println("普通方式执行10亿次:" + (endTime-startTime  +"ms");
    
  //反射方式调用
  public static void test2() throws NoSuchMethodException, InvocationTargetException, IllegalAccessExcept {
    User user =new User();
    Class cl = user.getclass();

    Method getName = cl.getDeclaredMethod( name: "getName",null);Long startTime = system.currentTimeMillis();

    for (int i=o; i< 1000000000; i++) {
    getName. invoke (user, args: null);}
    long endTime =System.currentTimeMillis();
    System.out.println("反射方式执行10亿次:"+ (endTime-startTime)+"ms");

    //反射方式调用 关闭检测
    public static void test3() throws NoSuchMethodException, InvocationTargetException, IllegalAccessExcept {
    User user =new User();
    Class cl = user.getclass();

    Method getName = cl.getDeclaredMethod( name: "getName",null);
    getName.setAccessible(true);
    Long startTime = system.currentTimeMillis();

    for (int i=o; i< 1000000000; i++) {
    getName. invoke (user, args: null);}
    long endTime =System.currentTimeMillis();
    System.out.println("关闭检测执行10亿次:"+ (endTime-startTime)+"ms");
```
结果:
>普通方式执行10亿次:9ms<br>反射方式执行10亿次:5699ms<br>关闭检测执行10亿次: 1959ms

### 反射与泛型

+ 反射操作泛型Java采用泛型擦除的机制来引入泛型, Java中的泛型仅仅是给编译器javac使用的,确保数据的安全性和免去强制类型转换问题,但是,一旦编译完成,所有和泛型有关的类型全部擦除
+ 为了通过反射操作这些类型, Java新增了ParameterizedType , GenericArrayTypeTypeVariable和WildcardType几种类型来代表不能被归一到Class类中的类型但是又和原始类型齐名的类型.
    + ParameterizedType :表示一种参数化类型,比如`Collection<String>`
    + GenericArrayType :表示一种元素类型是参数化类型或者类型变量的数组类型
    + TypeVariable :是各种类型变量的公共父接口
    + WildcardType :代表一种通配符类型表达式

```java
public class Test11 {
  public void test01(Map<string,User> map, List<User> list){
    System.out.printIn("test0l");}

    public Map<string, User> test02() {
    system.out.printIn("test02");
    return null;}

    public statis void main(string[] args) throws NoSuchMethodException {
      Method method = Test11.class.getMethod( name: "test01", Map.class, List.class);
      
      Type[] genericParameterTypes = method.getGenericParameterTypes();
      for (Type genericParameterType : genericParameterTypes){
        //取出真实参数信息
        if (genericParameterType instanceof ParameterizedType){
          Type[] actualTypeArguments = ((ParameterizedType) genericParameterType).getActualTypeArguments();
          for (Type actualTypeArgument : actualTypeArguments) { System.out.printIn(actualTypeArgument);}
        }}

      method = Test11.class.getMethod( name: "test02", null);
      Type genericParameterType = method.getGenericParameterType();
        
      if (genericParameterType instanceof ParameterizedType){
          Type[] actualTypeArguments = ((ParameterizedType) genericParameterType).getActualTypeArguments();
          for (Type actualTypeArgument : actualTypeArguments) { System.out.printIn(actualTypeArgument);}
        }}}
```

### 反射与注解

```java
public class reflectionAnnotation{

public static void main(String[] args) throws ClassNotFoundException{
  Class c1 = Class.forName("com.shane.reflection.Student");

   //通过反射获得注解
   Annotation[] annotations = c1.getAnnotations();
   for(Annotation annotation : annotations){
     System.out.println(annotation);
   }

   //获得注解value的值
   TableShane tableShane = (TableShane)c1.getAnnotation(TableShane.class);
   String value = tableShane.value();
   System.out.println(value);

   //获得类指定的注解
   Field f = c1.getDeclaredField("name");
   FiledShane annotation = f.getAnnotation(FiledShane.class);
   System.out.println(annotation.columnName());
   System.out.println(annotation.type());
   System.out.println(annotation.length());
}
}

@TableShane("db_students")
class Student{

  @FieldShane(columnName = "db_id",type = "int",length = 10)
  private int id;
  @FieldShane(columnName = "db_age",type = "int",length = 10)
  private int age;
  @FieldShane(columnName = "db_name",type = "varchar",length = 3)
  private String name;

  public Student(){
  }

  public Student(int id, int age, String name){
    this.id = id;
    this.age = age;
    this.name = name;
  }
  public int getId(){return id;}
  public void setId(int id){this.id = id;}

  public int getAge(){return age;}
  public void setAge(int age){this age = age;}

  public String getName(){return name;}
  public void setName(String name){this.name = name;}
  @Override
  public String toString(){
    return "Student{"+"id="+id+",age="+age+",name='"+name+'\''+'}';
  }
}

  //类名的注解
  @Target(ElementType.TYPE)
  @Retention(RetentionPolicy.RUNTIME)
  @interface TableShane{
    String value();
  }

  //属性的注解
  @Target(ElementType.FIELD)
  @Retention(RetentionPolicy.RUNTIME)
  @interface FiledShane{
    String columnName();
    String type();
    int length();
  }


```

### 注意事项

&emsp;&emsp;由于反射会额外消耗一定的系统资源，因此如果不需要动态地创建一个对象，那么就不需要用反射。

&emsp;&emsp;另外，反射调用方法时可以忽略权限检查，因此可能会破坏封装性而导致安全问题。

### 部分反射内容转载自

>本文标题:深入解析Java反射（1） - 基础<br>
文章作者:sczyh30<br>
发布时间:2015年06月24日<br>
原始链接:http://www.sczyh30.com/posts/Java/java-reflection-1/<br>
许可协议: "知识共享-保持署名-非商用-相同方式共享 4.0" 转载请保留原文链接及作者。

---

整理不易，转载请注明出处。
相关视频教程可参考狂神说