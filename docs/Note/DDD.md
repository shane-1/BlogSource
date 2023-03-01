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

![图片1]()

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

![图片2]()

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

![图片3]()

微观建模

#### 纵切 

>业务切割

![图片4]()

宏观建模

## SOLID原则

>面向对象设计五大原则

### SRP 单一职责

就一个软件实体而言，应该仅有一个引起它变化的原因

### OCP 开放封闭

### LSP 里氏替换

### ISP 接口隔离

### DIP 依赖倒置

## 通用语言

### 宏观-战略建模

> 使用通用语言，精准地划分领域以及处理各个领域之间的关系

## 领域

## 界限上下文/上下文映射

## 架构

## 实体/值对象

## 应用服务/领域服务

## 领域时间 聚合资源库

>本文基于Owen Dai讲解整理，整理不易，转载请注明出处。