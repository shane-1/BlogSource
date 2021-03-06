# DevOps 思想

![](/images/2020-09-22-10-16-51.png)

+ DevOps是一种思想或方法论,它涵盖开发-测试-运维整个过程
+ DevOps强调软件开发与软件测试/软件运维\质量保证QA部门之间有效的沟通与协作
+ 强调通过自动化的方法管理软件变更\软件集成
+ 使软件从构建到测试发布更加快捷和可靠,最终按时交付软件

## 项目开发流程

![](/images/2020-09-22-10-23-02.png)

> Produce Backlog源自于Scrum方法,是指产品待办事项的合集,其中事务有优先级判断,先处理优先级高的事项

## 如何落地实现DevOps理念

&emsp;&emsp;DevOps兴起与2009年,近年来由于云计算\互联网发展.促进了DevOps的基础设置及工具链的发展,涌现了一大批优秀的工具,这些工具包括开发\测试\运维的各个领域.例如GItHub, GIt/svn, Docker, Jenkins, HudSon, Ant/Maven/Gradle,QUnit, JMeter等

![](/images/2020-09-22-10-58-19.png)<br>
![](/images/2020-09-22-11-34-20.png)

## 持续继承Continuous Integration

持续集成(CI)是**自动构建**和**测试代码**的过程。
- 在项目早期发现Bug,降低Bug修复成本
- 自动执行测试(单元测试\静态代码扫描)
- 创建可用于部署的交付件(artifacts)

### 持续集成的好处

- 基于快速反馈提高代码质量

- 触发每个代码更改的自动化测试

- 更好地管理技术债务和代码分析

- 减少长期、困难和引发错误的合并

- 有利于在生产部署之前增加了对代码库健康运行的信心

  > 关键价值快速反馈给开发人员,降低修复成本

## Azure Pipeline

![](/images/2020-10-09-09-15-28.png)

- 通过管道创建可重复,可靠且逐步改进的流程
- 支持任何语言或平合.Net,Java, Python, PHP, Ruby, C# 和Go
- 支持不同类型的部署目标- Windows, Linux, MacOS

### 持续集成环境技术架构

- 代理池 Agent Pool
  服务器或组织级别
- 代理队列 Agent Queue
  团队项目级别
- 代理 Agent
  部署在用于执行持续集成的PC(服务
  器/客戶端电脑均可)
  一个机器可以运行多个 Agent
  - Windows
  - Linux
  - Unⅸ
  - macOS
![](/images/2020-10-09-09-25-48.png)

## Azure Devops持续部署

- Azure Pipeline发布管理功能概述
  - 服务终结点 Service Endpoint
  - 发布定义,环境,任务,环境变量,触发器和审批
  - 常用远程操作任务, Windows和 Linux
  - 运行部署和查看部署结果,仪表盘集成
  - 使用环境变量处理环境差异

### 持续部署(Continuous delivery CD)

- 允许代码被构建,测试并部署到一个或多个
  测试和生产环境
- 在多个环境中持续部署应用有助于提升质量
  控制能力
- 持续集成(C)产生的交付件( artifact)被持续部
  署(CD使用
- 多个测试和生产环境按照部署顺序/逻辑关
  系组合形成流水线( Pipeline),交付件 artifact)
  在这个流水线中按照团队需要的方式流动
  并使用构建ID和部署|D进行跟踪。