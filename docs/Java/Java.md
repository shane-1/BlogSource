# Java基础 

> Less is More!

## 标识符

- 所有标识符都应该以字母(A-Z或a-z),美元符($),或者下划线(_)开始

  > 不允许数字开头

- 不能使用关键字

## 数据类型

### 强类型语言

1. 基本类型(primitive type)

   |  类型   | 字节 |
   | :-----: | :--: |
   |  byte   |  1   |
   |  short  |  2   |
   |   int   |  4   |
   |  long   |  8   |
   |  float  |  4   |
   | double  |  8   |
   |  char   |  2   |
   | boolean | 1位  |

   ```java
   long num = 30L; //需要数字后加个L(最好使用大写,防止误读)
   float f = 0.1f;
   
   //JDK新特性,数字之间可以用下划线分割
   int money = 10_0000_0000;
   ```

   **最好避免使用浮点数去比较大小,需要考虑舍入误差**

   <u>金融使用`BigDecimal`</u>

   

2. 引用类型(reference type)

## 进制

- 二进制 0b数字
- 十进制 数字
- 八进制 0数字
- 十六进制 0x数字

## 类成员

1. 成员变量<br>
*注:生命周期仅在大括号*
2. 成员函数
3. 构造函数
4. 构造代码块
5. 静态代码块
>在类加载过程中调用，只调用一次
6. 内部类

## 对象创建过程
1. 在内存分配内存空间

2. 对成员变量赋默认值

3. 执行构造代码块或赋值语句，如果多个，从上到下按序执行

4. 构造函数

   **如果有有参构造,建议写上无参构造供框架反射调用.**
## static成员
static成员，跟对象无关，访问方式是`Class.XXX()`<br> 
1. 随着类的加载而加载

   > 没赋值默认有初始值
   >
   > 布尔值: 默认false
   >
   > 除了基本类型默认是null
   >
   > 

2. 先优于对象存在

3. 被所有对象共享

4. 可以直接被类名调用

5. 静态的只能访问静态的,非静态的可以访问全部

   > 因为静态对象随类先加载,不能让其访问不存在的东西(例某个对象的属性方法)

- 静态方法只能访问静态成员
- 静态方法不能出现this，super等对象关键字
- 主函数是静态的

## javadoc

使用`/**-----*/`

参数列表:
- @author
- @Version
- @Since
- @param
- @return
- @throws

`javadoc -encoding UTF-8 -charset UTF-8 xx.java`
生成文档

## JavaBean
bean.
getter/setter
## 封装

将相应属性隐藏,使用方法访问,可以**自定义**重写对应的get\set方法

## 继承

1. 抽象共享
2. 多个类是子类，抽象的类是父类（超类）
3. 子类可以访问父类的非private成员
4. 通过extends继承
5. 类只支持单重继承 + 多层继承
>不要为了获取其他类的某种功能去继承<br>
类与类之间要有所属（“is a”）关系，xx1是xx2的一种

- OOP面向对象编程 重要的一点是继承复用
- AOP面向切面编程 也是为了复用

## 多态

> 子类和父类重写的方法实现规则不一样

1. 父类引用指向子类对象

2. 父类.方法()执行的是子类的实现

3. 只能调用父类中声明的方法

   > 编译时
   >
   > overload
   >
   > > xxx.java ---> xxx.class
   >
   > 运行时
   >
   > override

## super | this
&emsp;&emsp;类内置的成员变量，指向的是父类（自己）对象的引用。只能在类的内部使用，类似于this。<br>
&emsp;&emsp;如果当前类有和父类相同的成员，若访问父类成员，需要用到`super.`
## super() | this()
此方法调用的是父类（自己）的构造函数。必须是第一句
## 方法重载
参数不同
## 方法覆盖（重写）
1. 和父类的方法签名相同
2. private方法无法覆盖
3. super可以访问父类方法
4. 注意事项：<br>
    a. 权限要想相同或放大
    b. 静态和非静态必须一致
## final
1. 修饰方法\类\变量
2. 修饰类<br>
final class Dog    //不能继承.终态类
3. 修饰方法<br>
不能重写,是否被继承取决于方法private与否
4. 修饰变量<br>
不能修改,常量
## 内部类
1. 定义在class内部的类
2. 编译产生OuterClass$Innerc.class
3. 内部类访问外部类的局部变量,需要final修饰.
## 抽象类
1. 不能实例化的类
2. abstract修饰的类
3. 抽象方法必须定义在抽象类          
>final  + private 修饰成员变量有意义,为私有常量,修饰方法无意义
## 接口
1. interface
2. 接口中的成员修饰符固定<br>
```java
public static final //成员变量
public abstract //成员函数
```
3. 间接实现多重继承
4. 最低标准
5. 降低耦合
6. 可以多实现
```java
Class Xxx implements Xx,Xx{
//
}
interface Xxx extends Xx,Xx{
//
}
```
### 面向接口的编程

+ 开闭原则
  + 对扩展开放
  + 对修改关闭

## 多态

&emsp;&emsp;指向同一个对象,但某种状态下只能访问该状态下的属性和方法<br>
&emsp;&emsp;接口同样具有多态<br>
&emsp;&emsp;更加抽象`父类=子类`可以直接赋值,更加具体`子类=父类`需要强制转换<br>
&emsp;&emsp;接口 = 类`隐式转换`,类 = 接口`强制转换`

```java
//Animal < Dog < Husky
Husty hope = new Husty();
Dog hope1 = hope;
Animal hope2 = hope1;
hope1 = (hope1)hope2;
```
&emsp;&emsp;使用父类引用子类的对象<br>
&emsp;&emsp;使用接口引用实现类的对象<br>
>注意:方法继承会覆盖,但成员变量(字段\数据)不会被覆盖
## 异常和错误

- 异常:在Java语言中,将程序执行中发生的不正常情况称为“异常”。(开发过程中的语法错误和逻辑错误不是异常)

- Java程序在执行过程中所发生的异常事件分为两类:

  - Error错误: Java虚拟机无法解决的严重问题。如: JVM系统内部错误、资源耗尽等严重情况。

    > 比如: 
    >
    > StackOverflowError和OOM,一般不编写针对性的代码进行处理。

  - Exception异常:其它因编程错误或偶然的外在因素导致的一般性问题,可以使用针对性的代码进行处理。

    > 例如:
    >
    > 空指针访问
    >
    > 试图读取不存在的文件
    >
    > 网络连接中断
    >
    > 数组角标越界

- 对于这些错误,一般有两种解决方法:

  - 一是遇到错误就终止程序的运行。
  - 另一种方法是由程序员在编写程序时,就考虑到错误的检测、错误消息的提示,以及错误的处理。

- 捕获错误最理想的是在编译期间,但有的错误只有在运行时才会发生。比如:除数为0,数组下标越界等

- 分类:编译时异常和运行时异常

![](/images/2020-09-27-13-28-37.png)

> 蓝色:非受检(unchecked)异常

### 异常分类

1. 运行时异常
   - 是指编译器不要求强制处置的异常。一般是指编程时的逻辑错误,是程序员应该积极避免其出现的异常。`java.lang.RuntimeException`类及它的子类都是运行时异常。
   - 对于这类异常,可以不作处理,因为这类异常很普遍,若全处理可能会对程序的可读性和运行效率产生影响。
2. 编译时异常
   - 是指编译器要求必须处置的异常。即程序在运行时由于外界因素造成的一般性异常。
   - 编译器要求Java程序必须捕获或声明所有编译时异常。对于这类异常,如果程序不处理,可能会带来意想不到的结果。

```java
try{

}
catch(Exception e){

}
[finally{
   ...
}]
//除了system.exit(0),finally的语句在返回等情况下都会执行
```
### throw&throws

- throws：用来声明一个方法可能产生的所有异常，不做任何处理而是将异常往上传，谁调用我我就抛给谁。
  -  用在方法声明后面，跟的是异常类名
  -  可以跟多个异常类名，用逗号隔开
  - 表示抛出异常，由该方法的调用者来处理
  - throws表示出现异常的一种可能性，并不一定会发生这些异常

- throw：则是用来抛出一个具体的异常类型。
  -  用在方法体内，跟的是异常对象名
  - 只能抛出一个异常对象名
  - 表示抛出异常，由方法体内的语句处理
  - throw则是抛出了异常，执行throw则一定抛出了某种异常

---
异常的子类catch应在异常父类catch之前<br>

```java
CheckedException   //待检异常,非运行时异常,必须声明抛出语句
RuntimeException   //运行异常,不需要在方法声明抛出语句,也不需要必须使用try/catch语句处理
```

一个方法被覆盖是,覆盖它的方法必须抛出相同的异常或异常的子类,范围可以缩小,不能放大<br>

### 自定义异常

- 一般地,用户自定义异常类都是RuntimeException的子类。
- 自定义异常类通常需要编写几个重载的构造器。
- 自定义异常需要提供serialVersionUID自定义的异常通过throw抛出。
- 自定义异常最重要的是异常类的名字,当异常出现时,可以根据名字判断异常类型。

## package
完整类名:包名.类名(全限定名 full qualified name)<br>
命名规则:com
```
jar  //java archive
ear  //enterprise archive
war  //web
har  //hadoop 
tar  
```
相对路径
---
>.   //当前目录<br>
..  // 上级目录<br>

绝对路径
---
C:\xx\xx
## 权限访问
private     //私有,不能继承<br>
public      //公有<br>
protected   //受保护,针对其他包中的子类<br>
default       //默认,不写.不同包不能继承<br>
一个java源文件只能有一个public类<br>
|范围|public|protected|default|private|
|:---:|:---:|:---:|:---:|:---:|
|同类|✓|✓|✓|✓|
|同包|✓|✓|✓| |
|子类|✓|✓| | |
|不同包|✓| | | |
## jar
1. 打包方式一<br>
`jar cvf  xxx.jar Xxx.class Yyy.class` //指定class
2. 打包方式二<br>
`jar cvf xxx.jar -C xxx/.`//指定目录
3. 查看jar文件<br>
`jar -tf xxx.jar`
4. 运行jar中的类<br>
`java -cp xxx.jar xx.xx.xx;`//后面跟完整类名
5. 指定清单文件(xxx.jar/META-INF/MENIFEST.MF)的入口类<br>
`jar {ctxui}[vfmn0PMe] [jar-file] [manifest-file] [entry-point] [-C dir] files ...`<br>
`jar -cvfe classes.jar com.day01.java.PagDemo classes/ .`
6. 如果jar中的清单文件含有入口点(Main-Class),''可以直接使用以下命令执行<br>
`java -jar classes.jar`

## eclipse快捷键
```java
    alt + / //内容辅助
    ctl + alt + down //向下复制一行
    ctl + alt + up //向上复制一行

    alt + down //向下移动一行
    alt + up //向上移动一行
    ctl + d //删除一整行
    ctl + shift + f //代码格式化

    shift + enter //中途回车,不换行
    ctrl + / //切换注释
    ctrl + shift + / //块注释
    ctrl + shift + \ //解除块注释 
```
## java单元测试
```java
import org.junit.Test; //rember to import related jar
@Test
public void test1 (){

}
```
>@Test只能加到非静态方法上

```jave
@Before
//非静态方法前

@Before Class
//静态方法前
```

## Lambda表达式

+ 避免匿名内部类定义过多
+ 实质属于函数式编程的概念
> (params)->expression[表达式]<br>(params)->statement[语句]<br>(params)->{statements}

`a-> System.out.println("Test lambda");`<br>
`new Thread (()->System.out.println("new thread")).start();`<br>

```java
//推导lambda

//1.函数式接口
interface ILike{
    void lambda();
}
//2.实现
class Like implements ILike{
    @Override
    public void lambda(){
        System.out.println("Lambda~");
    }
}

public class test{
    public static void main(String[] args){
        ILike like = new Like();
        //匿名内部类,没有类名，借助接口或父类
        like = new ILike() {
            @Override
            public void lambda(){
                System.out.println("Lambda~~");
            }
        };
        like.lambda();

        // >>>>>>>>lambda简化
        like = ()->{
            System.out.println("Lambda~~~");
        };
        like.lambda();
    }
}
```
+ lambda表达式只能有一行代码的情况下才能简化成为一行,如果有多行,那么就用代码块包裹
+ 前提是接口为函数式接口
+ 多个参数也可以去掉参数类型,要去的就都去掉,必须加上括号.
## String类
1. 字符串类
final类,无法继承
2. 内部采用char[]数组存储
3. 内部不能改变,属于常量
4. 常见方法<br>
str.length(); //长度<br>
str.trim();   //删除头尾空白符的字符串<br>
srt.split("x");//按照x规则进行切割<br>
## 字符集<br>
>ascii :     美国国家标准交换码,使用一个字节的7
位表示.<br>
iso-8859-1:     欧洲码表,使用8位表示,无法存储汉字.<br>
gb2312:     中文码表,简体中文.两个字节存储.<br>
gbk:    gb2312升级版<br>
big-5:      繁体中文<br>
utf-8:     变长字符表示法,最多使用三个字节表示.<br>
unicode:      两个字节表示字符,java中使用该码
---
Charset.defaultCharset();
### 编码
encode<br>
String --> byte[]<br>
String.getBytes("gbk"); //编码格式
### 解码
decode<br>
byte[] --> String<br>
new String(arr,"gbk")//解码格式
## StringBuffer
线程安全
## StringBuilder
非线程安全
## 包装类
```java
//自动装箱=基本数据类型->包装类对象
Integer i = 1000; 
//自动拆箱=包装类对象->直接提取基本数据类型
System.out.println(i + ii);
```
>基本数据类型没有null的概念<br>
数值类型基本数据类型(成员变量)默认值是0.<br>
----
>包装类的默认是null.<br>
有NullPointerException.*注意初始化*
## 容器
### 数组
1. 类型相同
2. 长度固定
3. 可以存放基本类型
### 集合类
1. 长度不固定
2. 类型可以不同
3. 不能存放基本类型
4. List: 有序,可重复<br>
ArrayList<br>
LinkedList
5. Set:无序,不能重复<br>
&emsp;&emsp;存取无序,判断hash code是否相同,如果不同,可以存放,相同则判断是否为同一对象,同样则重复,否则再使用equals方法判断是否相同
6. Map:key-value,**key有set的特点**.
![](/images/2020-04-11-08-55-07.png)
```java
//迭代器访问,list为ArrayList
Iterator<Cat> it = list.iterator();
while(it.hasNext()){
    Cat cat1 = it.next();
}
```
 `==`判断内存地址<br>
 `equals`默认只判断内存地址,需要进行重写
 ```java
 //equals 重写实例:
 public boolean equals(Object obj){
     //poj为null
     if(obj == null){
         return false;
     }
     //是非为同一对象
     if(this == obj){
         return true;
     }
     //得到obj的类
     Class objClazz = obj.gatClass();
     if(objClazz != Cat.class){
         return flase;
     }
    Cat b = (Cat)obj;
    String bname = b.getName();
    int age = b.getAge();
    boolean nameEqual = false;
    if(name == null){
        if(bname == null){
            nameEqual = true;
        }
    else{
            nameEqual = name.equals(bname);
            }
        }
    
        return nameEqual && (age == bage);
 }
 ```
list使用add添加对象,保存的是引用,相同对象指向相同.
## ArrayList
Object[]<br>
Capacity    //容量<br>
size          //元素个数<br>
index + offset<br>
只判断对象是否存在,只跟equals有关.
## LinkedList
clear方法会移除元素,降低容量,与arraylist不变容量不同.<br>
链表优缺点
## Vector
类似于ArrayList,通过对象数组实现<br>
线程安全的<br>
迭代器在Collection接口中是通用的,它替代了vector的Enumeration(枚举)
## Set
元素是唯一的<br>
无序的<br>
通过迭代器访问<br>
```java
Iterator<Integer> it = set.iterator();
while(it.hasNext()){
    System.out.println(it.next());
}
```
HashSet和HashMap没有本质区别.底层用Dummy当Key

## Map
映射<br>
Key ---> value  //Entry,条目<br>
put(k,v);         
>1.判断hashcode是否相同<br>
2.相同则判断是否同一对象,满足则不添加<br>
3.如果调用equals方法为真,满足则不添加<br>
`key.hash == p.hash && (key == p || key.equals(p));`
## HashSet vs HashMap
1. 底层无最本质区别,Set采用Map实现.
2. 哈希本质是打散元素(散列),在容器中均匀存放.
3. map为数组和链表的组合.
4. HashCode默认返回对象内存地址,故一般需要重写方法,根据元素特征值生成.
## Hash的方式
`h = key.hasCode() ^ (h >>>16) //^ 异或`<br>
^会使数更加散列,更多特征值决定哈希值<br>
hashSet线程不安全<br>
1. new hash<br>
h = e.hashCode;<br>
h ^(h >>> 16)                                                                          
2. 定位桶<br>
newhash & (n-1) // n为桶个数
3. 判断桶元素 == null<br>
 为null,直接放入<br>
4. 不为空<br>
(hash == p.hash&&())<br>
5. 继续此过程
## TreeSet
&emsp;&emsp;通过Comparator.compareTo或者comparable.compare()方法来保证元素是否相等.元素是以二叉树形式存放的.<br>
&emsp;&emsp;实现**Comparator接口**或**传入对比器**都可以实现对象的树集合<br>
TreeSet同样通过TreeMap实现<br>
&emsp;&emsp;字符的compareTo通过较短字符串的长度逐个比较存储对应码值,返回差值<br>
>注:中文码值与笔画有关
## 泛型
1. 提高了程序的安全性
2. 将运行期遇到的问题转移到编码期
3. 省去了类型强转的麻烦
4. 泛型类的出现优化了程序设计
## 遍历方式
1. for
```java
for(int i = 0; i < list.size(); i++){

}
```
2. iteterator
```java
Iterator<String> it = list.iterator();
while(it.hasNext()){
    it.next();
}
```
3. for+
```java
//for(数据类型 变量名:数组或Collection集合)
for(String s : list){

}
```
>增强for循环可用于多种迭代过程,类似Python的for each in.<br>例:
```java
Map<String, String> map = new HashMap<String, String>();
Set<Entry<String, String>> set = map.entrySet();
for(Entry<String, String> e: set){
    String key = e.getKey();
    String value = e.getValue();
}

//可变参数-可允许出现一个且必须为最后一个参数
//不会产生空指针异常,默认为空数组
private void add(List list, String...x){
    for(String s:x){
        list.add(s);
    }
    }
```
## IO
Stream -> byte[]
1. 数据类型<br>
>字节流<br>
>字符流<br>
>
>>处理文本,防止乱码
2. 流向<br>
>输入流<br>
输出流<br>
3. 性能<br>
>缓冲区流<br>
4. 性能<br>
>转换流<br>
>
>>InputStream/OutputStream -> Reader/Writer
### 流的超类
InputStream<br>
OutputStream
### 字符流
Reader<br>
Writer<br>
文本首选
### 字节流
```java
FileInputStream fis = newFileInputStream("d:/xx/x.txt");
byte[] buf = new byte[fis.available()];
fis.read(buf);
fis.close();
```
```java
//编码
FileInputStream fis = new FileInputStream("d:/xx/x.txt");
InputStreamReader isr = new InputStreamReader(fis, "utf-8");
char[] buf = new char[5];
int len = 0;
while((len = isr.read(buf) )!= -1){
    System.out.println(new String(buf, 0, len));
}
isr.close();
```
## 缓冲区字符流
默认缓冲区:8K<br>
*先关缓冲区，后关文件流*
## 输入输出流
改变System.out.print到文件
```java
System.setOut(new PrintStream(new FileOutputStream("x:/xx/x.txt")));
System.out.println("XXXXXXX");
```
读取控制台输入
```java
InputStream in = System.in;
BufferedReader br = new BufferedReader(new InputStreamReader(in));//转换流
String line  = null;
while((line = br.readLine()) != null){
    if(line.equals("quit")){
            System.exit(-1);        //退出
    }
    System.out.println(line);
}
```
## 文件归档
1. 文件名字节数 
2. 文件名
3. 文件字节数
4. 文件
## 文件
包名:java.io.File<br>
类名:File<br>
方法:<br>
+ File.exists(); 
+ File.isDirectory(); 
+ File.isFile();
+ File.mkdirs(); //创建目录
+ File.createNewFile();
+ File.listFiles();
+ File.getAbsolutePath();
+ File.getName();
+ File.getCanonicalPath(); //得到正规路径名<br>

打印输出目录结构:
```java
private void printDir(String file){
    File f = new File(file);
    if(f.exists()){
        System.out.println(f.getAbsolutePath());
        is(f.isDirectory()){
            File[] fileList = f.listFiles();
            if(fileList != null && fileList.length > 0){
                for(File singelFile : fileList){
                    printDir(singelFile.getAbsolutePath());
                }
            }
        }
    }
}
```
递归复制到指定文件夹:
```java
public void copyDir(String file,String destDir){
    File f = new File(file);
    if(f.exists()){
        is(f.isDirectory()){
            //创建目录
            File newFile = new File(destDir,f.getName());
            newFile.mkdirs();

            File[] fileList = f.listFiles();
            if(fileList != null && fileList.length > 0){
                for(File singelFile : fileList){
                    copyDir(singleFile.getAbsolutePath(), newFile.getAbsolutePath());
                }
            }
        }
        else{
            copyFile(file,destDir);
        }
}
public void copyFile(String srcFile,String destDir){
    try{
        File file = new File(srcFile);
        File newFile = new File(destDir,file.getName());
        FileInputStream fis = new FileInputStream(file);
        FileOutputStream fos = new FileOutputStream(newFile);
        int len = 0;
        byte[] buf = new byte[1024];
        while((len = fis.read(buf) != -1){
            fos.write(buf, 0, len);
        }
        fos.close();
        fis.close();
    }
    catch(Exception e){     //不推荐捕获类型,这里旨在简化代码
        e.printStackTrace();
    }
}
```

---

整理不易，转载请注明出处。