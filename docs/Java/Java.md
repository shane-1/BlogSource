# Java基础
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
## static成员
static成员，跟对象无关，访问方式是`Class.XXX()`<br>
1. 随着类的加载而加载
2. 先优于对象存在
3. 被所有对象共享
4. 可以直接被类名调用
>
1. 静态方法只能访问静态成员<br>
2. 静态方法不能出现this，super等对象关键字<br> 
3. 主函数是静态的
## javaBean
bean.
getter/setter
## 继承
1. 抽象共享
2. 多个类是子类，抽象的类是父类（超类）
3. 子类可以访问父类的非private成员
4. 通过extends继承
5. 类只支持单重继承 + 多层继承
>不要为了获取其他类的某种功能去继承<br>
类与类之间要有所属（“is a”）关系，xx1是xx2的一种
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
4. 修饰字段<br>
不能修改
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
## 异常
Throwable
>1. Error  //错误<br>
>2. Exception  //异常
```java
try{

}
catch(eException e){

}
finally:{}
```
throws用于标识函数暴露的异常<br>
throw用于抛出异常对象
>区别:<br>
throws用在函数上,后面跟异常类名<br>
throw用在函数内,后面跟异常对象
---
异常的子类catch应在异常父类catch之前<br>
CheckedException   //待检异常,非运行时异常,必须声明抛出语句<br>
RuntimeException   //运行异常,不需要在方法声明抛出语句,也不需要必须使用try/catch语句处理<br>
一个方法被覆盖是,覆盖它的方法必须抛出相同的异常或异常的子类,范围可以缩小,不能放大<br>
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
## 多线程
进程:运行的应用程序<br>
线程:应用程序内部并发执行的代码段<br>
### Thread
并发是主栈(主函数)同时开辟多个分栈实现<br>
yield:放弃CPU抢占权,谦让<br>
sleep:让线程休眠毫米数<br>
join:等待指定线程执行完后继续运行
```java
public class ThreaDemo{
    public static void main(String[] args) {
        Player p1 = new Player("jack", 3000);
        Player p2 = new Player("luke",200);

        p1.start();
        p2.start();
        try{
            p1.join();
            p2.join();
        }
        catch (Exception e){

        }
         System.out.println("都到了~");
    }
}

class Player extends Thread{
    private String name;
    private int time;
    public Player(String name,int time){
        this.name = name;
        this.time = time;
    }

    public void run(){
        System.out.println("玩家:"+name+"出发了~");
        try{
            Thread.sleep(time);
        }
        catch (Exception e){

        }
        System.out.println("玩家:"+name+"到了~");
    }

}

```
daemon :守护线程,如果应用程序剩余的线程都是守护线程,则程序结束<br>
守护线程守护所有的非守护线程<br>
## 锁
任何一个对象都可以是锁.信号灯\参照物<br>
`static Object lock = new Object();`
```java
   public int getTickets() {     //对票加锁
   //同步代码块
        synchronized (lock) {
            tickets--;
            return tickets;
        }
```
```java
//同步方法
   public static synchronized int getTickets() {     //对票加锁
            tickets--;
            return tickets;
        }
```
>同步方法最好加static,只和方法有关(否则出现多个对象多把锁)<br>
注意：静态方法只有有静态变量，因为静态变量和类绑定，而变量和对象绑定。
## 生产消费
&emsp;&emsp;int _对象_>>Integer<br>
&emsp;&emsp;每个锁都有一个等待队列(每个对象都可以是锁)<br>
```java
sleep();    //放弃CPU抢占权,与锁旗标无关
wait();     //当前对象加入锁等待队列,同时释放锁旗标,唤醒后继续执行
notify();   //通知等待队列对象
```
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
只能加到非静态方法上 
```jave
@Before
//非静态方法前

@Before Class
//静态方法前
```
## String类
1. 字符串类
final类,无法继承
2. 内部采用char[]数组存储
3. 内部不能改变,属于常量
4. 常见方法
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
utf-8:     变长支付表示法,最多使用三个字节表示.<br>
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
//自动装箱-基本数据类型->包装类对象
Integer i = 1000; 
//自动拆箱-包装类对象->直接提取基本数据类型
System.out.println(i + ii);
```
>基本数据类型没有null的概念<br>
数值类型基本数据类型(成员变量)默认值是0.<br>
----
>包装类的默认是null.<br>
有NullPointerException.注意初始化
## 容器
### 数组
1. 类型相同
2. 长度固定
3. 可以存放基本类型
### 集合类
1. 长度不固定
2. 类型可以不同
3. 不能存放基本类型
4. List: 有序,可重复
ArrayList<br>
LinkedList
5. Set:无序,不能重复
存取无序,判断hashcode是否相同,如果不同,可以存放,相同则判断是很欧为同一对象,同样则重复,否则再使用equals方法判断是否相同
6. Map:key-value,key有set的特点.
![](/images/2020-04-11-08-55-07.png)
```java
//迭代器访问,list为ArrayList
Iterator<Cat> it = list.iterator();
while(it.hasNext()){
    Cat cat1 = it.next();
}
```
 ==判断内存地址<br>
 equals默认只判断内存地址,需要进行重写
 ```java
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
类似于ArrayList,x通过对象数组实现<br>
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
1. 数据类<br>
>字节流<br>
字符流<br>
>>处理文本,防止乱码
2. 流向<br>
>输入流<br>
输出流<br>
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
## 文件归档
1. 文件名字节数 
2. 文件名
3. 文件字节数
4. 文件
## 设计模式
### 单例模式 singleton
类有且只有一个对象<br>
1.  懒汉式
```java
//单例模式,垃圾桶
public class GarbageBox{
    //实例
    private static GarbageBox  instance;
    /**
    *构造私有
    */
    private GarbageBox(){
    }

    public static GarbageBox  getInstance(){
        if(intsant  ==  null){
            instance  = new GarbageBox();   
        }
        return  instance;
    }
}
```
多线程优化
```java
//单例模式,垃圾桶
public class GarbageBox{
    //实例
    private static GarbageBox  instance;
    private static Object lock = new Obeject();//锁
    /**
    *构造私有
    */
    private GarbageBox(){
    }
    if
    public static GarbageBox  getInstance(){
        //为空情况下才锁住
        if(intsant  ==  null){
            Synchronized (lock){
                if(instance == null){
                    instance  = new GarbageBox();   
                }
                return instance;
            }
        }
        return  instance;
}
```

2.  饿汉式                              
```java
//单例模式,垃圾桶
public class GarbageBox{
    //实例
    private static GarbageBox  instance = new GarbageBox();
    /**
    *构造私有
    */
    private GarbageBox(){
    }

    public static GarbageBox  getInstance(){
        return  instance;
    }
}
```
### 适配器 Adapter
&emsp;&emsp;将一个接口转换成客户希望的另一个接口，使接口不兼容的那些类可以一起工作，其别名为包装器(Wrapper)。适配器模式既可以作为类结构型模式，也可以作为对象结构型模式。<br>
&emsp;&emsp;在适配器模式中，我们通过增加一个新的适配器类来解决接口不兼容的问题，使得原本没有任何关系的类可以协同工作。<br>
&emsp;&emsp;根据适配器类与适配者类的关系不同，适配器模式可分为**对象适配器**和**类适配器**两种，在**对象适配器**模式中，适配器与适配者之间是**关联关系**；在**类适配器**模式中，适配器与适配者之间是**继承**（或实现）关系。
### 装饰模式
