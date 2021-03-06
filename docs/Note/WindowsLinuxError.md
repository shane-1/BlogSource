# windows文件在linux运行不正常

转载自[moon's Blog](http://www.92csz.com/)

```bash
env: /etc/init.d/nginx: No such file or directory
```

## 原因：

在windows下修改文件的时候换行符出的问题。

windows和linux下的换行符是不同的。一般操作系统上的运行库会自动决定文本文件的换行格式. 如一个程序在windows上运行就生成CR/LF换行格式的文本文件，而在linux上运行就生成LF格式换行的文本文件. 在一个平台上使用另一种换行符的文件文件可能会带来意想不到的问题, 特别是在编辑程序代码时. 有时候代码在编辑器中显示正常, 但在编辑时却会因为换行符问题而出错. 很多文本/代码编辑器带有换行符转换功能, 使用这个功能可以将文本文件中的换行符在不同格式单互换.

在不同平台间使用FTP软件传送文件时, 在ascii文本模式传输模式下, 一些FTP客户端程序会自动对换行格式进行转换. 经过这种传输的文件字节数可能会发生变化. 如果你不想ftp修改原文件, 可以使用bin模式(二进制模式)传输文本.

## 解决：

在linux下用dos2unix filename转换一次之后，成功解决问题。

dos2unix命令用来将DOS格式的文本文件转换成UNIX格式的（DOS/MAC to UNIX text file format converter）。DOS下的文本文件是以\r\n作为断行标志的，表示成十六进制就是0D 0A。而Unix下的文本文件是以\n作为断行标志的，表示成十六进制就是 0A。DOS格式的文本文件在Linux底下，用较低版本的vi打开时行尾会显示^M，而且很多命令都无法很好的处理这种格式的文件，如果是个shell脚本，。而Unix格式的文本文件在Windows下用Notepad打开时会拼在一起显示。因此产生了两种格式文件相互转换的需求，对应的将UNIX格 式文本文件转成成DOS格式的是unix2dos命令。
常用参数：

将DOS格式文本文件转换成Unix格式，最简单的用法就是dos2unix直接跟上文件名。

- 格式：dos2unix file


如果一次转换多个文件，把这些文件名直接跟在dos2unix之后。（注：也可以加上-o参数，也可以不加，效果一样）

- 格式：dos2unix file1 file2 file3


- 格式：dos2unix -o file1 file2 file3


上面在转换时，都会直接在原来的文件上修改，如果想把转换的结果保存在别的文件，而源文件不变，则可以使用-n参数。

- 格式：dos2unix oldfile newfile


如果要保持文件时间戳不变，加上-k参数。所以上面几条命令都是可以加上-k参数来保持文件时间戳的。

- 格式：dos2unix -k file


- 格式：dos2unix -k file1 file2 file3


- 格式：dos2unix -k -o file1 file2 file3


- 格式：dos2unix -k -n oldfile newfile




> 注：unix2dos命令的使用方式与dos2unix命令的类似。

![](/images/2020-11-25-15-25-50.png)

- cat -v可以看到文件中的非打印字符，而不带-v参数的cat命令不行。
  hexdump -C可以看到文件每个字节的十六进制表示。