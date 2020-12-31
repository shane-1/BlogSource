# Shell 脚本传参方法总结

> 平时会遇到很多脚本都有参数选项，类似：



```swift
./test.sh -f config.conf -v --prefix=/home
```

这种脚本怎么写呢？

------

## Shell 特殊参数解释

首先来看几个特殊变量：$0, $#, $*, $@, $?, $$, $_



```bash
#!/bin/bash
echo $0    # 当前脚本的文件名（间接运行时还包括绝对路径）。
echo $n    # 传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是 $1 。
echo $#    # 传递给脚本或函数的参数个数。
echo $*    # 传递给脚本或函数的所有参数。
echo $@    # 传递给脚本或函数的所有参数。被双引号 (" ") 包含时，与 $* 不同，下面将会讲到。
echo $?    # 上个命令的退出状态，或函数的返回值。
echo $$    # 当前 Shell 进程 ID。对于 Shell 脚本，就是这些脚本所在的进程 ID。
echo $_    # 上一个命令的最后一个参数
echo $!    # 后台运行的最后一个进程的 ID 号
```

现在保存为一个脚本，然后加上几个参数运行：



```bash
$ ./test.sh test test1 test2 test3 test4
```

返回如下：



```bash
./test.sh                      # $0
                               # $n
5                              # $#
test test1 test2 test3 test4   # $*
test test1 test2 test3 test4   # $@
0                              # $?
12305                          # $$
12305                          # $_
                               # $!
```

> $* 和 $@ 都表示传递给函数或脚本的所有参数，不被双引号 ("") 包含时，都以"$1""$2" … "$n" 的形式输出所有参数。

> 但是当它们被双引号 ("") 包含时，"$*"会将所有的参数作为一个整体，以"$1 $2 … $n"的形式输出所有参数；"$@"会将各个参数分开，以"$1""$2" … "$n" 的形式输出所有参数。

例如：



```bash
#!/bin/bash
echo "\$*=" $*
echo "\"\$*\"=" "$*"

echo "\$@=" $@
echo "\"\$@\"=" "$@"

echo "print each param from \$*"
for var in $*
do
    echo "$var"
done

echo "print each param from \$@"
for var in $@
do
    echo "$var"
done

echo "从 \"\$*\" 获取并打印每一个参数"
for var in "$*"
do
    echo "$var"
done

echo "从 \"\$@\" 获取并打印每一个参数"
for var in "$@"
do
    echo "$var"
done
```

返回结果：



```bash
$*= test test1 test2
"$*"= test test1 test2
$@= test test1 test2
"$@"= test test1 test2
print each param from $*
test
test1
test2
print each param from $@
test
test1
test2
从 "$*" 获取并打印每一个参数
test test1 test2
从 "$@" 获取并打印每一个参数
test
test1
test2
```

## 1. 手工处理参数



```bash
while [ -n "$1" ]  
do  
  case "$1" in   
    -a)  
        echo "发现 -a 选项"  
        ;;  
    -b)  
        echo "发现 -b 选项"  
        echo "-b 选项的参数值是：$2"   
        shift  
        ;;  
    -c)  
        echo "发现 -c 选项"  
        echo "-c 选项的参数值是：$2"  
        shift  
        ;;  
    -d)  
        echo "发现 -d 选项"  
        ;;  
    *)  
        echo "$1 is not an option"  
        ;;  
  esac  
  shift  
done
```

运行：



```swift
./test.sh -a -b t2 -c t3 -d
```

返回：



```swift
发现 -a 选项
发现 -b 选项
-b 选项的参数值是：t2
发现 -c 选项
-c 选项的参数值是：t3
发现 -d 选项
```

## 2. getopt 处理参数

下面 `getopt ab:c:d "$@"` 中的 abcd 分别代表四个选项，后面带有冒号的表示选项需要参数值。



```bash
GETOPTOUT=`getopt ab:c:d "$@"`  
    set -- $GETOPTOUT   
    while [ -n "$1" ]   
    do  
    case $1 in   
        -a)  
            echo "发现 -a 选项"
            ;;  
        -b)  
            echo "发现 -b 选项"
            echo "-b 选项的参数值是：$2"
            shift  
            ;;  
        -c)  
            echo "发现 -c 选项"
            echo "-c 选项的参数值是：$2"
            shift  
            ;;  
        -d)  
            echo "发现 -d 选项"
            ;;  
        --)  
            shift  
            break  
            ;;  
         *)  
             echo "未知选项:"$1""  
            ;;  
    esac  
    shift  
    done  
```

运行：



```swift
./proxychains4.sh -a -b t2 -c t3 -d
```

返回：



```swift
发现 -a 选项
发现 -b 选项
-b 选项的参数值是：t2
发现 -c 选项
-c 选项的参数值是：t3
发现 -d 选项
```

这个工具很强大，给个完整模板参考一下：



```bash
ARGV=($(getopt -o 短选项1[:]短选项2[:]...[:]短选项n -l 长选项1,长选项2,...,长选项n -- "$@"))
eval set -- "$ARGV"
while true
do
case "$1" in
    -短选项1|--长选项1)
        process
        shift
        ;;
    -短选项2|--长选项2)
        # 获取选项
        opt = $2
        process
        shift 2
        ;;
    
    ... ...

    -短选项3|--长选项3)
        process
        ;;
    --)
        break
        ;;
esac
done
```

> 关于 eval 这个命令，用一个小例子解释：



```bash
foo=10
x=foo
y='$'$x
echo $y
echo $foo
eval y='$'$x
echo $y
```

返回：



```bash
$foo
10
10
```

因为我一般用这个命令连接构建命令参数，所以你可以简单理解为执行两次（虽然不太对）。通过添加 eval 可以把参数解析后再执行。

## 3. getopts 处理参数



```bash
while getopts :ab:c:d ARGS  
do  
case $ARGS in   
    a)  
        echo "发现 -a 选项"  
        ;;  
    b)  
        echo "发现 -b 选项"  
        echo "-b 选项的值是：$OPTARG"  
        ;;  
    c)  
        echo "发现 -c 选项"  
        echo "-c 选项的值是：$OPTARG"  
        ;;  
    d)  
        echo "发现 -d 参数"  
        ;;  
    *)  
        echo "未知选项：$ARGS"
        ;;
esac
done
```

这种方法最方便简单。接下来基于这种方法深入讲解。

## 4. 传参意外处理



```bash
      "?")
        echo "未知选项 $OPTARG"
        ;;
      ":")
        echo "没有输入任何选项 $OPTARG"
        ;;
      *)
        # 发生不能预料的错误时。
        echo "处理选项时出现未知错误"
        ;;
```

## 参考资料

- [https://www.ibm.com/developerworks/cn/linux/l-bash-parameters.html](https://link.jianshu.com/?t=https://www.ibm.com/developerworks/cn/linux/l-bash-parameters.html)
- [http://www.361way.com/shell-getopt/4981.html](https://link.jianshu.com/?t=http://www.361way.com/shell-getopt/4981.html)

------