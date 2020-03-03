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
类内置的成员变量，指向的是父类（自己）对象的引用。只能在类的内部使用，类似于this。<br>
如果当前类有和父类相同的成员，若访问父类成员，需要用到`super.`
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
指向同一个对象,但某种状态下只能访问该状态下的属性和方法<br>
接口同样具有多态<br>
范围变小`父类=子类`可以直接赋值,但范围变大`子类=父类`需要强制转换<br>
接口 = 类`隐式转换`,类 = 接口`强制转换`
```java
//Animal < Dog < Husky
Husty hope = new Husty();
Dog hope1 = hope;
Animal hope2 = hope1;
hope1 = (hope1)hope2;
```
使用父类引用子类的对象<br>
使用接口引用实现类的对象<br>
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
