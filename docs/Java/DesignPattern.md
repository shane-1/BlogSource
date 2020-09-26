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

### 简单工厂

```java
public class CarFactory{
   public staitic car createCar(String type){
      if("audi".equals(type)){
         return new Audi();
      }
      else if("BYD".equals(type)){
         return new BYD();
      }
      else{
         return null;
      }
   }
}
```

### 工厂模式

```java
public interface CarFactory{
	public Car createCar(){}
}

public class AudiFactory implements CarFactory{
   @Override
   public Car createCar(){
      return new Audi();
   }
}

```

## 代理模式

角色:

1. 真实角色
2. 代理角色
3. 抽象角色(前两者需要有共同的方法,由该部分完成)

- 真正做事情的是真实角色
- 对于外界来说一定是代理角色,真实角色被隐藏
- 代理要有真实角色的引用
- 代理角色可以附加自己的功能

### 静态代理

```java
public class Proxyee implements share{
   XXXX;
}
public class Proxy implements share{
   private Share share = new Proxyee;
   XXXX;
   share.XXXX;
}
public interface Share{
   XXXX
}
```

### 动态代理

> 解决静态代理带来的高消耗,重复创建不同的代理

通过反射实现,具体实现可参考文章:

[反射和注解](https://shane-1.io/java/AnnotationReflection.html#反射)

## 构建器模式 Builder

setXx()返回对象自身

## 观察者模式 Observer

Observers<br>
Observable<br>