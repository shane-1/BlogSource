# Markdown手册
------------
## Markdown是什么 
程序员必备
Markdown是一种轻量级的「标记语言」

Markdown可以使用普通文本编辑器编写，通过简单的标记语法，它可以使普通文本内容具有一定的格式。它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面，Markdown文件的后缀名便是“.md”

## 为什么选择 Markdown 
选择 Markdown 理由只有一个：方便，节省时间
+ 语法简洁，没有任何编程基础的人10分钟语言即可上手
+ 注重内容，专注于内容编写，不再因为格式排版而苦恼
+ 易阅读性，即便没有经过转换，大部分内容仍可阅读
+ 易编辑性，任何文本编辑器都能编辑 Markdown 文件
+ 跨平台性，由于是纯文本文件，不存在格式兼容的问题
+ 导出方便，支持导出为 HTML，PDF等常见格式

## 如何使用 Markdown
### 1.标题
---

Markdown支持6种级别的标题，对应html标签 h1 ~ h6
```markdown
# h1 
## h2
### h3
#### h4
##### h5
###### h6
```
### 2.段落及区块引用
---
```markdown
Markdown 引用：
> 引用内容
注：输入多个>可以实现嵌套

Markdown 分割线：
---
***

Markdown 换行：
<br>

Markdown 段首缩进：
&ensp; or &#8194; 表示一个半角的空格
&emsp; or &#8195;  表示一个全角的空格
&emsp; or &emsp; 两个全角的空格（用的比较多）
&nbsp; or &#160; 不断行的空白格
```


### 3.字体样式
----

|序号|源代码|效果|
|:--:|:--:|:--:|
|1	|`~~删除线~~`|	~~删除线~~|
|2	|`*斜体字*`|*斜体字*|
|3	|`**粗体**`|**粗体**|
|4	|`***粗斜体***` |***粗斜体***|
|5	|`上标：O<sup>2`|O<sup>2|
|6	|`下标：H<sub>2</sub>O`|H<sub>2</sub>O|
---	
### 4.图片和链接
---
```markdown
[普通链接](https://shane-1.github.io)
```
[普通链接](https://shane-1.github.io)
```markdown
直接链接：<https://shane-1.github.io>
```
直接链接：<https://shane-1.github.io>
```markdown
邮箱地址自动链接 qq1217232433@outlook.com
```
邮箱地址自动链接 qq1217234233@outlook.com
```markdown
![图片链接，可以添加备注](https://shane-1.github.io/rick.png "备注")
```
![图片链接，可以添加备注](https://shane-1.github.io/rick.png "rick")
###### 注：可以用非url的本地路径
---
### 5.代码高亮
---
```markdown
行内高亮 ： `npm install marked `
(部分支持==高亮==)
```
行内高亮 ： `npm install marked`

实现代码块适配合适的高亮方法，可以用 ``` 包裹一段代码，并指定一种语言。

    ```javascript
        function test() {
            console.log("后面跟语言有一定效果");
        }
    ```
---
###### 支持的语言： bash, basic,cmake, css, delphi, django, dockerfile, go, http,,ini, java, javascript, json, leaf, less, matlab, perl, php, python, ruby, rust, scss, sql, stylus, swift, typescript, vbscript, xml, yaml等
---
### 6.表格
---
```markdown
|:在左靠左 |:在两端居中|:在右靠右|
|:--|:--:|--:|
| A | A | A |
| B | B | B |
| C | C | C |
```
|:在左靠左 |:在两端居中|:在右靠右|
|:--|:--:|--:|
| A | A | A |
| B | B | B |
| C | C | C |
##### :在左靠左	:在两端居中	:在右靠右
---
### 7.无序列表
---
*/-/+/>/#通用，后面跟空格即可，另外再输入1个TAB或2 ~ 4个空格可实现层级关系

```markdown
 + 一级列表
      + 二级列表
          + 三级列表
```
 + 一级列表
   + 二级列表
        + 三级列表
---
### 8.有序列表
---
注意数字后面有空格，序号递增排列，即便输错也会自动纠正
```markdown
1. 第一行
2. 第二行
5. 第三行
```
1. 第一行
2. 第二行
5. 第三行
---
### 9.转义字符
---
```markdown
\`
\>
\<br>
```
>\`
<br>
>\>  
>\<br>
---
### 10.脚注
---
```
生成一个脚注[^footnote].
  [^footnote]: 这里是 **脚注** 的 *内容*.
```
##### 注：某些版本不支持
---
### 11.特殊符号 [文本通用，非MD独有]

>常用排版 : ▌▍◆★☆☁➤➜❤➊➋➌<br>
TodoList : ✅☑✓✔√☓☒✘ㄨ✕✖✗❌❎<br>
emoji : 🌹🍀🌙🍂🍃🌷💎🔥⭐🍄🏆<br>
---

### 12.Markdown编辑器
---

+ 在线版:

印象笔记
马克飞象
作业部落

+ 浏览器插件：

马克飞象
Markdown-here

+ 应用：

Mac：MacDown<br>
Win10：Acrylic Markdown、MarkdownPad、MarkPad、Vscode

## 流程图
>如何在Markdown中画流程图呢？当然是用mermaid了，mermaid支持三种图形的绘制, 分别是流程图, 时序图和甘特图。<br>
>>流程图方向有下面几个值
------
>TB 从上到下<br>
BT 从下到上<br>
RL 从右到左<br>
LR 从左到右<br>
TD 同TB
```
mermaid
graph TD
   A --> B
```
![](/images/2020-02-27-15-05-13.png)
```
graph LR
   A --> B 
```
![](/images/2020-02-27-15-07-12.png)
+ 基本图形
---
>id + [文字描述]矩形<br>
id + (文字描述)圆角矩形<br>
id + >文字描述]不对称的矩形<br>
id + {文字描述}菱形<br>
id + ((文字描述))圆形
```
mermaid
graph TD
    id[带文本的矩形]
    id4(带文本的圆角矩形)
    id3>带文本的不对称的矩形]
    id1{带文本的菱形}
    id2((带文本的圆形))
```
![](/images/2020-02-27-15-08-09.png)
+ 节点之间的连接
---
A --> B A带箭头指向B<br>
A --- B A不带箭头指向B<br>
A -.- B A用虚线指向B<br>
A -.-> B A用带箭头的虚线指向B<br>
A ==> B A用加粗的箭头指向B<br>
A -- 描述 --- B A不带箭头指向B并在中间加上文字描述<br>
A -- 描述 --> B A带箭头指向B并在中间加上文字描述<br>
A -. 描述 .-> B A用带箭头的虚线指向B并在中间加上文字描述<br>
A == 描述 ==> B A用加粗的箭头指向B并在中间加上文字描述<br>
```
mermaid
graph LR
    A[A] --> B[B] 
    A1[A] --- B1[B] 
    A4[A] -.- B4[B] 
    A5[A] -.-> B5[B] 
    A7[A] ==> B7[B] 
    A2[A] -- 描述 --- B2[B] 
    A3[A] -- 描述 --> B3[B] 
    A6[A] -. 描述 .-> B6[B] 
    A8[A] == 描述 ==> B8[B] 
```
![](/images/2020-02-27-15-09-15.png)
+ 子流程图
---
```
示例
mermaid
graph TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
```
![](/images/2020-02-27-15-10-33.png)
+ 自定义样式
---
语法：style id 具体样式
```
mermaid
graph LR
    id1(Start)-->id2(Stop)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px,fill-opacity:0.5
    style id2 fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 10,5
```
![](/images/2020-02-27-15-12-11.png)
+ demo
---
绘制一个流程图,找出 A、 B、 C 三个数中最大的一个数。

```
mermaid
graph LR
    start[开始] --> input[输入A,B,C]
    input --> conditionA{A是否大于B}
    conditionA -- YES --> conditionC{A是否大于C}
    conditionA -- NO --> conditionB{B是否大于C}
    conditionC -- YES --> printA[输出A]
    conditionC -- NO --> printC[输出C]
    conditionB -- YES --> printB[输出B]
    conditionB -- NO --> printC[输出C]
    printA --> stop[结束]
    printC --> stop
    printB --> stop
```
![](/images/2020-02-27-15-12-30.png)
---
整理不易，转载请注明出处。