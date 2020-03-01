# Octave与MatLab的区别
-------------
MatLab用户转而使用octave几乎不需要什么培训，只是要一些小细节上注意一下。下面我们罗列一些octave和MatLab的区别。
## 布尔值的乘积
```matlab
X = ones(2,2) ;
prod(size(X)==1)
```
MatLab和octave的输出是不同的：<br>
```
Matlab: ??? Function 'prod' is not defined for values of class 'logical'.
Octave: ans = 0
```
>octave输出为0的原因是 size(X) 为
ans =
2   2
## 逻辑运算符、算术运算符
Octave与MatLab兼容，甚至更为宽松。
![](/images/2020-02-28-16-40-17.png)<br>
```
MatLab用 x^2，octave用 x^2 或者 x**2 表示 “x的平方”。Octave用 x**2 是为了照顾GnuPlot的用户。
```
 总而言之，octave在运算符方面彻底兼容MatLab，MatLab用户放心大胆地用octave吧，但octave用户用MatLab的时候就要小心了。
## C-风格的自动增量、赋值、屏幕打印
Octave允许C-风格的
```c
i++ ; ++i ; i+=1 ;
printf('My result is: %d\n', 4)
```
而MatLab不认它们。MatLab打印至屏幕和文件都用 `fprintf` 函数。
## 注意空格
octave对空格是作为一个符号识别的，在列合并中短的列自然扩充，例如
```
A = ['123 ';'123'] ;
size(A)
```
结果是 2 4，<br>
而MatLab则返回列合并有问题：<br>
?? Error using ==> vertcat

>另外，转置符号与矩阵之间如果有空格
[0 1] '
在MatLab里不允许，octave则允许，且与 [0 1]' 的结果是一样的。<br>
## 直方图内置函数hist
octave的hist为<br>
`hist (Y, X, NORM)`<br>
其中NORM为所有柱高之和。
## 导入空文件
MatLab允许导入空文件，老版本的octave不允许，新版本的octave-3.0.3则允许。
## 行续符
MatLab中用 `...' 做行续符，如用
```
A = rand (1, ...
         2) ;
```
表达
```
A = rand (1,2) ;
```
###### Octave与MatLab兼容，除此之外，octave还允许如下两种表示方法。
---
```
A = rand (1,
        2) ;
```
和
```
A = rand (1, \
        2) ;
```
## if、for等环境的结束符
Octave用
`end{if,for, ...}`<br>
而MatLab则统一用 `end`。
---
整理不易，转载请注明出处。