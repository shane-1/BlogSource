# AWS DevOps

>微服务
>
>敏捷

## 任务拆分

- 拆分单元尽可能小
- 划分数据域
- 根据scaling factors而不是职能部门来解耦
- 服务间独立运行
- 服务间通过api直接调用

**这将使组织结果发生变化**

## 整体开发生命周期

```
开发者 --->  服务  ---> 交付流水线(build ---> test ---> release --> monitor)
```

> 每个server独立部署

## Amazon DevOps的三大定律

1. 拆分任务
2. 团队自主运行
3. 技术规范化

## why DevOps

1. 快速发布
2. 反脆弱
3. 消除技术债务

> 灰度部署:先进行部分试部署上线

## DevOps构成

### 持续规划

1. 考虑运维
2. 需求
3. 共创合作

### 持续开发

1. 版本管理 `codecommit`
2. 分支管理

### 持续测试

- 自动化测试

1. 静态代码检查
2. 单元测试
3. 接口测试
4. UI测试
5. 压力测试
6. 安全测试

### 持续集成

1. Trunk提交
2. 触发job
   1. pull
   2. 冲突
   3. 静态代码检查
   4. 编译
   5. 单元测试
   6. 打包
   7. 部署dev
   8. 测试

### 持续部署

1. 部署test

2. 测试

3. 部署production

   - 部署自动化

   - 参数配置->配置管理

     >1. 部署过程自动化,减少高频部署人为错误
     >2. 所有对环境的改动经统一入口
     >3. Dev\Test\Pro环境尽量保持一致

   - 容器化

   - 部署方式

     - 蓝绿部署
     - 灰度部署(金丝雀)

### 持续监控

1. `ELK` 收集日志
2. `elasticsearch` 搜索引擎
3. `kibana` 界面展示

## 部署vs发布

### 部署:

 又称交付,IT部门操作,技术能力

### 发布:

业务部门,业务决定

## 部署流水线

> 评估所有对系统的改动,能够侦测对高风险或对质量有影响的改动拒绝集成,持续给团队提供相关改动反馈,让团队有能力快速经济的修复问题

## 案例分析



## 单体式应用  Monolithic

- 软件高度耦合
- 构建/测试/发布 周期长

### 问题

- 扩展性差

- 缺乏灵活性

- 系统运维十分困难

- 软件架构难以维护和发展

- 缺乏创新

- 开发速度慢

  ...

## 微服务 MicroService

- 服务注册\发现
- 网关
- 配置中心
- 链路追踪

### 定义

<u>微服务= Service-oriented architecture + "小" public API</u>

> 没有总线,会导致复杂的互相调用的链路

### 注意事项

#### 身份验证

#### 授权(权限管理)

#### 根据需要自动扩展服务

(CPU\TPS访问量)

#### API向后兼容

#### 隐藏你的数据

## 敏捷 Scrum

**个体和交互高于工具和流程**

- 自管理团队
- T型人才
- 引导团队自主解决问题
- 跨职能

### 每日站会

同步信息

~~非签到会\成果会~~

> 看板\燃尽图:信息辐射源

### Scrum Master

角色:确保团队遵循Scrum

~~团队的直接领导~~

### Product Owner

角色:梳理product backlog,排序\解释\验收

- 具有对产品的构想

- 管理产品代办事项列表

- 在产品待办事项类别中按照优先级安排用户故事

### Develop Team

角色:构建\交付\并监控高质量的软件

### 高带宽沟通

推荐面对面沟通

### 335

3个角色3个中间产物

> - Product backlog
> - Sprint backlog
> - Product Increment

5个活动

1. Product backlog grooming:

   - 排优先级

   - 讨论用户故事必要性

   - 增删改

   - 具备独立性

     > (PO主导)

2. Sprint Planning meeting

   - 决定迭代目标(承诺)
   - 输入:初始迭代目标\团队速率\团队情况
   - 输出:Sprint Backlog
   - 全员参加(一次迭代1-4周)
   - 估算:功能点估算

   > 迭代推荐2-3周,合理解冻客服需求时间.可以交付较大\较重要的stories.

   故事点:

   1. 可以计算出相对数字
   2. 可以屏蔽噪音

   

3. Daily Standup

   ​	3个问题

   1. 昨天做了什么
   2. 今天要做什么
   3. 遇到了什么问题

4. Review

   - 输入:迭代需求列表\潜在的可交付产品增量
   - 输出:经过梳理的需求

5. **Retrospective**

### 三大支柱

- 透明
- 检查
- 适应

### Sprint Board

- 任务看板
- 故事看板

> WIP:限制某列的数量
>
> 解决项目推进的瓶颈

## AWS CloudFormation

- 基础架构即代码
- 集成版本控制
- JSON/YAML格式
- 模板-Template
- 堆栈-Stack
- 支持所有AWS资源类型

![](/images/2020-10-26-16-15-59.png)

## 容器

- 恰到好处的隔离
- 通过control group

### 优势

- only one kernel runs on the machine
- No Hypervisor overhead
- run different os
- process isolation&security 

### 建议

- 不要创建大型镜像
- 不要使用单层镜像

> 单层不要太大,一个功能打一层

- 不要在单个容器运行多个进程
- 不要在容器保存凭据,不要依赖IP地址
- 以非root用户运行进程
- 不要使用"最新"标签

> lasted tag

- 不要利用运行中的容器创建镜像
- 不要将数据存放在容器内

### K8S

#### CLI

#### Master

- APIserver

交互

- Controller

容器调度

- Scheduler
- ETCD

服务发现,分布式存储系统

#### Node

- pod

> pause负责管理pod

- kubelet

#### 发布方式

1. deployment

   不区分状态

2. StatefulSet

   区分状态

3. DaemonSst

   守护

   > 子集ReplicaSet

#### 不同Node通讯

- IPTAble

> 集群少

## AWS Developer Tools for CI/CD

> Souce -> Build-> Test -> Deploy -> Monitor

- AWS CodeStar
- AWS CodeBuild
- AWS CodeCommit
- AWS CodeDeploy
- AWS CodePipline

## AWS Cloud9

用于编写\运行和调试代码的云IDE

## AWS CodeCommit

- 安全的\可扩展的\可管理的Git源代码管理
- 使用标准的Git工具

## AWS CodeBuild

- 易于管库的编译源代码\运行测试和软件打包的构建服务
- 可持续扩展并同时处理多个构建
- 用户不用管理build服务器
- 按分钟付费,只为您使用的计算资源付费
- 通过CloudWatch事件监控构建

>
>
>- 每次构建都在新的容器运行,以保证一致的\不变的环境
>- 每个官方的CodeBuild镜像都安装了Docker和AWS CLI
>- 通过使用Docker镜像自定义环境

## AWS CodeDeploy

- 将代码自动部署到任何实体和lambda中
- 处理更新应用程序的福扎心
- 避免应用部署期间的停机时间
- 检测到事故自动回滚

## Code Pipeline

1. EC2
2. 容器
3. 无服务Lambda

## AWS CodeStar

Preconfigured 持续交付工具链

## AWS CodeGuru

> 内置的代码审查和可操作并提供有用的建议->上线前检测并优化代码->轻松识别程序缺陷

## EKS

> Elastic Kubernetes Server

### 概览

全托管开源Kubernetes控制平台

 














