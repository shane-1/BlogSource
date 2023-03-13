# Domain Drive Desingn 领域驱动设计

## 概览

### What?Why?

- DDD是完整系统的**设计方法**，一个从战略设计到战术设计的规范。
- DDD适于处理与领域相关的高复杂度业务的产品研发，其能够为产品建立**稳定的领域模型内核**，有利于领域知识的传递与传承。
- DDD思想有利于提高**面向对象设计能力与架构设计能力**。
- DDD强调团队与领域专家的合作，能够帮助建立**沟通良好的团队组织**，构建一致的架构体系。
- DDD与**微服务架构匹配**，新的微服务架构，还是将系统从单体架构演进到微服务架构设计，都可以遵循领域驱动设计的架构原则。

### 简述

- DDD是一个开放的设计方法体系

> 可以引入：用例，敏捷，整洁架构，函数式编程范式等

-- 转变

基于数据建模 --> 基于领域建模
基于技术设计 --> 面向对象设计

![图片1](/images/DDD/1.jpg)

### 步骤

1. 定问题: 
识別出核心领域 (Core Domain) 与子领域 (SubDomain)
并确定领域的边界以及它们之间的关系

2. 划范围: 针对问题域, 引入界限上下文 (Bounded Context) 和上下
文映射 (Context Map) 对问题域进行合理的分解 -> 微服务, 分治
可在不同的界限上下文选择不同的架构模式与实现技术栈

3. 做方案: 在界限上下文內, 通过分层架构来隔离关注点, 尤其是将领域
实现独立出来, 能够更利于领域模型的单一性与稳定性
领域模型可适配不同的架构模式: 六边形, CQRS等

## DDD None

DDD 不是设计准则或规范，更不是架构设计的脚手架

>什么内容才是高内聚的, 如何抽象才能做到低耦合?

>职责如何划分? 为了重用还是独立进化以应对未来的变化?

>如何分层? 各层之间该如何协作? 各层的依赖该如何解耦?

对设计本质进行思考！

## Diff [微服务](/Cloud/Microservices.html)

- 领域驱动设计是针对复杂系统设计的一套软件工程方法
而微服务是一种架构风格

- 两者之间更深入的关系, 主要体现在领域驱动设计中界限上下文与
微服务之间的映射关系

- 假如界限上下文之间需要跨进程通信, 并形成一种零共享架构
则每个界限上下文就成为了一个微服务

- 如何识别和设计微服务?
领域驱动的战略设计恰好可以在一定程度上解决此问题

## 软件复杂度

>领域驱动设计的定位就是应对软件开发的复杂度

### 成因

1. 规模
2. 结构
3. 变化

结构是决定系统复杂度的关键因素：高性能、高并发、分布式

### 解决

1. 规模

> 分而治之, 小既是美 (KISS)
> Unix 设计的哲学 -单一职责, 团结合作.


2. 结构

> 清晰直观且易于理解的分层 DIP
> 隔离业务与技术复杂度

3. 变化

> 拥抱变化
> 只被第一颗子弹击中

### 隔离

>隔离业务复杂度与技术复杂度

首要任务就是确认业务逻辑与技术实现1的边界，从而隔离各自的复杂度

![图片2](/images/DDD/2.jpg)

基础设施层-资源库样例

```java
public interface OrderRepository{
    List<order> forBuyerId(Identity buyerId);
    void add(Order order);
}
public class PlaceOrderService{
    @Repository
    private OrderRepository orderRepository;
    @service
    private OrderValidator orderValidator;

public void execute(Identity buyerId, List<orderItem> items,ShippingAddress shipping, BillingAddress billing) {
    Order order = Order.create(buyerId, items, shipping, billing);
    
    if (orderValidator.isValid(order)) {
        orderRepository.add(order); 
    }

    else {
        throw new OrderException(String.format("Invalid", buyerId));
}
}
}

```

### 切割

#### 横切

>流程切割

![图片3](/images/DDD/3.jpg)

微观建模

#### 纵切 

>业务切割

![图片4](/images/DDD/4.jpg)

宏观建模

## SOLID原则

>面向对象设计五大原则

### SRP 单一职责

> 就一个软件实体而言，应该仅有一个引起它变化的原因

业务模型应该有行为，否则会造成Service泄露

- 判断标准：

是否一直重复对业务模型的某些属性做重复的操作，这些行为本身是否就应该属于该业务模型，如订单类对总价的计算。



![图片6](/images/DDD/6.jpg)

<big>变化永远向着依赖的反方向传递</big>

![图片5](/images/DDD/5.jpg)

接口耦合，实现解耦。

> 面向接口编程：永远依靠于更稳定的东西，所以不面向实现。

#### 示例

![图片7](/images/DDD/7.jpg)

>违背SRP原则


![图片8](/images/DDD/8.jpg)

>proxy模式

![图片9](/images/DDD/9.jpg)
![图片10](/images/DDD/10.jpg)

### OCP 开放封闭

> 软件实体(类，模块，函数等)应对扩展开放，对修改封闭

- 对扩展开放
   - 模块的行为可扩展, 可复用性好

- 对修改封闭
   - 模块的源代码不可被修改, 可维护性好

通过抽象和多态可以很好的实现即开放，又封闭的OCP原则。

![图片11](/images/DDD/11.jpg)

❤️ **注意：OCP不是免费的午餐！**

    OCP 可以带来
    - 灵活性, 可重用性, 以及可维护性

    但是 OCP 的成本也很高
    - 对应用中的每个部分进行抽象不是一个好主意
    - 只对会频繁交化的部分做出抽象

>可以灵活使用抽象和多态避免if地狱和switch语句

扩展：复杂度守恒：实现功能的复杂度只和功能本身相关

>例如反射消除了switch复杂度且带来了反射本身的复杂度


### LSP 里氏替换

> 所有引用基类的地方必须能透明地使用其子类的对象

> 继承必须保证超类所拥有的性质(property-行为即函数)在子类中仍然成立

property  ->  行为
attribute ->  属性

- 白盒复用

    有任何接口和行为变化都会影响

- 黑盒复用
    有任何借口变化才会影响

>继承不是好的复用代码的方式，优先使用组合而不是继承

#### IS-A

继承应该是行为一致，而不是属性

从行为的角度看，正方形在<u>特定实现</u>不是矩形

#### 契约式设计

- 前置条件 (Pre-Condition):

    - 前置条件必须为 "true" 方法才能执行

- 后置条件 (Post-Condition):

    - 方法执行完成之后, 后置条件必须为 "true"

- 正确使用继承的标准
    - Pre-Conditions: Derived Class <= Base Class

(子类前提条件不强于基类

    - Post-Conditions: Derived Class => Base Class

(子类后置条件不弱于量类

![图片12](/images/DDD/12.jpg)

绿色-子类 红色-子类

![图片13](/images/DDD/13.jpg)

### ISP 接口隔离

#### 接口污染
  
  一个类实现一个接口却不得不实现一个对其无关的方法

    - 原因：接口中存在部分子类（不是所有子类）需要的方法

    - 解决方案：适配器模式


如何分离接口（委托）？

#### 类适配器

> 通过多继承，多接口实现（Java），在编译确认的适配器模式

![](/images/DDD/2023-03-13-11-03-51.png)

#### 对象适配器

> 运行时对象的组合

![](/images/DDD/2023-03-13-11-05-17.png)


> 在使用类适配器解决ISP时，往往会引发LSP问题

#### 测试驱动开发 TDD

>由一个失败的单测开始编写业务代码

![](/images/DDD/2023-03-13-15-24-10.png)

![](/images/DDD/2023-03-13-15-27-08.png)

![](/images/DDD/2023-03-13-15-40-38.png)

### DIP 依赖倒置

- 高层模块不应该依赖于低层模块，它们都应该依赖于抽象
  
> High-level modules should not depend on low-level modules.

> Both should depend on abstractions.

- 抽象不应该依赖于细节，细节应该依赖于抽象

>Abstractions should not depend upon defails. 

>Details should depend upon abstractions.

- 实施前
  
![](/images/DDD/2023-03-13-15-49-01.png)

- 实施后

![](/images/DDD/2023-03-13-15-52-11.png)

#### 示例

![](/images/DDD/2023-03-13-15-53-15.png)

![](/images/DDD/2023-03-13-15-53-38.png)

#### 分层


- All well structured object-oriented architectures
have clearly-defined layers,with each layer
providing some coherent set of services though a
well-defined and controlled interface.   
        
     -Grady Booch
  
>所有结构良好的面向对象架构拥有清晰的分层，每个分层
通过良好定义的接口提供条理分明的一系列服务

分层应该是隔离的！

![](/images/DDD/2023-03-13-15-59-38.png)

上图所示的依赖关系是传递的!没有隔离!

![](/images/DDD/2023-03-13-16-00-26.png)

#### 架构演进

- 传统架构
  
![](/images/DDD/2023-03-13-16-01-38.png)

- 领域架构演进
  
![](/images/DDD/2023-03-13-16-10-47.png)

![](/images/DDD/2023-03-13-16-12-39.png)

抽象的接口应该属于高层

![](/images/DDD/2023-03-13-16-14-09.png)

![](/images/DDD/2023-03-13-16-15-28.png)

高层拥有接口，底层实现接口

#### DependencyResolver

1. Service Locating
   
2. 依赖注入器

![](/images/DDD/2023-03-13-18-14-56.png)

## 通用语言

### 宏观-战略建模

> 使用通用语言，精准地划分领域以及处理各个领域之间的关系

需求划分为微服务

## 领域

## 界限上下文/上下文映射

## 架构

## 实体/值对象

## 应用服务/领域服务

## 领域时间 聚合资源库

>本文基于Owen Dai讲解整理，整理不易，转载请注明出处。