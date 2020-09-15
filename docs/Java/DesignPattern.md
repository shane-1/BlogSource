# 设计模式 Design pattern

## 单例模式 Singleton

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
## 适配器 Adapter

&emsp;&emsp;将一个接口转换成客户希望的另一个接口，使接口不兼容的那些类可以一起工作，其别名为包装器(Wrapper)。适配器模式既可以作为类结构型模式，也可以作为对象结构型模式。<br>
&emsp;&emsp;在适配器模式中，我们通过增加一个新的适配器类来解决接口不兼容的问题，使得原本没有任何关系的类可以协同工作。<br>
&emsp;&emsp;根据适配器类与适配者类的关系不同，适配器模式可分为**对象适配器**和**类适配器**两种，在**对象适配器**模式中，适配器与适配者之间是**关联关系**；在**类适配器**模式中，适配器与适配者之间是**继承**（或实现）关系。

## 装饰模式  Decorate

```java
class A{
    public void aa(){
        ...
    }
}

class B extends A{
    private A a;

    publlic B(A a){
        this.a = a;
    }

    public void aa(){
        ...
        a.aa();
        ...
    }
}
```
## 工厂模式 Factory

通过静态方法创建完整对象 

## 构建器模式 Builder

setXx()返回对象自身

## 观察者模式 Observer

Observers<br>
Observable<br>
