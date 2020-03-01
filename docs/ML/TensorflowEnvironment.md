# 关于Tensorflow环境搭建指南
## 前言
>推荐 Anaconda Navigator +  pycharm`其他ide自行选择`<br>
首先安装python，推荐新版本64位，我以3.7为例。因为现在python可以自己配置环境变量，安装直接官网下载。

## Anaconda的适用平台及安装条件
1. 适用平台
Anaconda可以在以下系统平台中安装和使用：<br>
▪ Windows<br>
▪ macOS<br>
▪ Linux（x86 / Power8）

2. 安装条件
▪ 系统要求：32位或64位系统均可<br>
▪ 下载文件大小：约500MB<br>
▪ 所需空间大小：3GB空间大小
>（Miniconda仅需400MB空间即可）

## Anaconda的安装步骤
## macOS系统安装Anaconda
### ① 图形界面安装
1. 前往[官方下载页面](https://www.anaconda.com/distribution/#macos)下载。有两个版本可供选择：Python 3.7 和 Python 2.7，我下载的是前者。选择版之后点击“64-Bit Graphical Installer”进行下载。
3. 完成下载之后，双击下载文件，在对话框中“Introduction”、“Read Me”、“License”部分可直接点击下一步
4. “Destination Select”部分选择“Install for me only”并点击下一步。
>注意：若有错误提示信息“You cannot install Anaconda in this location”则重新选择“Install for me only”并点击下一步。
![](/images/2020-03-01-15-10-05.png)
4. “Installation Type”部分，可以点击“Change Install Location”来改变安装位置。标准的安装路径是在用户的家目录下。在这一步我没有改变安装位置。若选择默认安装路径，则直接点击“Install”进行安装。
![](/images/2020-03-01-15-10-29.png)
6. 等待“Installation”部分结束，在“Summary”部分若看到“The installation was completed successfully.”则安装成功，直接点击“Close”关闭对话框。
![](/images/2020-03-01-15-10-43.png)
7. 在mac的Launchpad中可以找到名为“Anaconda-Navigator”的图标，点击打开。
![](/images/2020-03-01-15-10-57.png)
7. 若“Anaconda-Navigator”成功启动，则说明真正成功地安装了Anaconda；如果未成功，请务必仔细检查以上安装步骤。
>•	提示：“Anaconda-Navigator”中已经包含“Jupyter Notebook”、“Jupyterlab”、“Qtconsole”和“Spyder”。（图中的“Rstudio”是我后来安装的，但它默认出现在“Anaconda-Navigator”的启动界面，只需要点击“Install”便可安装。）<br>
•	Jupyter Notebook有助于我们编写代码、运行代码以及获取代码的运行结果，特点是可以令我们便捷地为代码及其运行结果添加文档的描述、解释和说明。无论是学习还是工作，Jupyter Notebook都是提高效率和学习、工作质量的利器。
![](/images/2020-03-01-15-11-28.png)
8. 完成安装
### ② 命令行安装
1. 前往[官方下载页面](https://www.anaconda.com/distribution/#macos)下载。有两个版本可供选择：Python 3.7 和 Python 2.7，我下载的是前者。选择版之后点击“64-Bit Graphical Installer”进行下载。
2. 完成下载之后，在mac的Launchpad中找到“其他”并打开“终端”。<br>
▫ 安装Python 3.7： *bash ~/Downloads/Anaconda3-5.0.1-MacOSX-x86_64.sh*<br>
▫ 安装Python 2.7：*bash ~/Downloads/Anaconda2-5.0.1-MacOSX-x86_64.sh*
>•	注意：
>1.	首词bash也需要输入，无论是否用的Bash shell。
>2.	如果你的下载路径是自定义的，那么把该步骤路径中的 ~/Downloads 替换成你自己的下载路径。
>3.	如果你将第1步下载的 .sh 文件重命名了，那么把该步骤路径中的 Anaconda3-5.0.1-MacOSX-x86_64.sh 或 Anaconda2-5.0.1-MacOSX-x86_64.sh 替换成你重命名后的文件名。
▫ 强烈建议：不要修改文件名。如果重命名，使用英文进行命名。
3. 安装过程中，看到提示`In order to continue the installation process, please review the license agreement.`（“请浏览许可证协议以便继续安装。”），点击“Enter”查看“许可证协议”。
4. 在“许可证协议”界面将屏幕滚动至底，输入“yes”表示同意许可证协议内容。然后进行下一步。
5. 安装过程中，提示`Press Enter to confirm the location, Press CTRL-C to cancel the installation or specify an alternate installation directory.`（“按回车键确认安装路径，按'CTRL-C'取消安装或者指定安装目录。”）如果接受默认安装路径，则会显示`PREFIX=/home/<user>/anaconda<2 or 3> `并且继续安装。安装过程大约需要几分钟的时间。
>•	建议：直接接受默认安装路径。
6. 安装器若提示`Do you wish the installer to prepend the Anaconda install location to PATH in your /home/<user>/.bash_profile ?`（“你希望安装器添加Anaconda安装路径在/home/<user>/.bash_profile 文件中吗？”），建议输入“yes”。
>•	注意：<br>
>① 路径 /home/<user>/.bash_profile 中 <user> 即进入到家目录后你的目录名。<br>
>② 如果输入“no”，则需要手动添加路径。添加 export PATH="/<path to anaconda>/bin:$PATH" 在 .bashrc 或者 .bash_profile 中。其中， <path to anaconda>替换为你真实的Anaconda安装路径。
7. 当看到`Thank you for installing Anaconda!`则说明已经成功完成安装。
8. 关闭终端，然后再打开终端以使安装后的Anaconda启动。
9. 验证安装结果。可选用以下任意一种方法：<br>
① 在终端中输入命令 condal list ，如果Anaconda被成功安装，则会显示已经安装的包名和版本号。<br>
![](/images/2020-03-01-15-20-37.png)
② 在终端中输入 python 。这条命令将会启动Python交互界面，如果Anaconda被成功安装并且可以运行，则将会在Python版本号的右边显示“Anaconda custom (64-bit)”。退出Python交互界面则输入 exit() 或 quit() 即可。<br>
![](/images/2020-03-01-15-20-57.png)
③ 在终端中输入 anaconda-navigator 。如果Anaconda被成功安装，则Anaconda Navigator的图形界面将会被启动。

## Windows系统安装Anaconda
1. 前往[官方下载页面](https://www.anaconda.com/distribution/#Windows)下载。有两个版本可供选择：Python 3.7 和 Python 2.7，我下载的是前者。选择版之后点击“64-Bit Graphical Installer”进行下载。
2. 完成下载之后，双击下载文件，启动安装程序。
>•	注意：<br>
① 如果在安装过程中遇到任何问题，那么暂时地关闭杀毒软件，并在安装程序完成之后再打开。<br>
② 如果在安装时选择了“为所有用户安装”，则卸载Anaconda然后重新安装，只为“我这个用户”安装。
3. 选择“Next”。
4. 阅读许可证协议条款，然后勾选“I Agree”并进行下一步。
5. 除非是以管理员身份为所有用户安装，否则仅勾选“Just Me”并点击“Next”。
6. 在“Choose Install Location”界面中选择安装Anaconda的目标路径，然后点击“Next”。
>•	注意：<br>
① 目标路径中不能含有空格，同时不能是“unicode”编码。<br>
② 除非被要求以管理员权限安装，否则不要以管理员身份安装。
![](/images/2020-03-01-15-30-19.png)
7. 在`Advanced Installation Options`中不要勾选`Add Anaconda to my PATH environment variable.`（“添加Anaconda至我的环境变量。”）。因为如果勾选，则将会影响其他程序的使用。如果使用Anaconda，则通过打开Anaconda Navigator或者在开始菜单中的“Anaconda Prompt”（类似macOS中的“终端”）中进行使用。
>除非你打算使用多个版本的Anaconda或者多个版本的Python，否则便勾选“Register Anaconda as my default Python 3.7”。
然后点击“Install”开始安装。如果想要查看安装细节，则可以点击“Show Details”。
![](/images/2020-03-01-15-30-38.png)
8. 点击“Next”。
9. 进入`Thanks for installing Anaconda!`界面则意味着安装成功，点击“Finish”完成安装。
>•	注意：如果你不想了解“Anaconda云”和“Anaconda支持”，则可以不勾选“Learn more about Anaconda Cloud”和“Learn more about Anaconda Support”。
![](/images/2020-03-01-15-30-55.png)
10. 验证安装结果。可选以下任意方法：<br>
① “开始 → Anaconda3（64-bit）→ Anaconda Navigator”，若可以成功启动Anaconda Navigator则说明安装成功。<br>
② “开始 → Anaconda3（64-bit）→ 右键点击Anaconda Prompt → 以管理员身份运行”，在Anaconda Prompt中输入 conda list ，可以查看已经安装的包名和版本号。若结果可以正常显示，则说明安装成功。
## Linux系统安装Anaconda
1. 前往[官方下载页面](https://www.anaconda.com/distribution/#linux)下载。有两个版本可供选择：Python 3.7 和 Python 2.7。
2. 启动终端，在终端中输入命令`md5sum /path/filename`或` sha256sum /path/filename`
>•	注意：将该步骤命令中的 /path/filename 替换为文件的实际下载路径和文件名。其中，path是路径，filename为文件名。<br>
•	强烈建议：<br>
① 路径和文件名中不要出现空格或其他特殊字符。<br>
② 路径和文件名最好以英文命名，不要以中文或其他特殊字符命名。
3. 根据Python版本的不同有选择性地在终端输入命令：<br>
```
▫ Python 3.6： bash ~/Downloads/Anaconda3-5.0.1-Linux-x86_64.sh
▫ Python 2.7： bash ~/Downloads/Anaconda2-5.0.1-Linux-x86_64.sh
```
>•	注意：<br>
① 首词bash也需要输入，无论是否用的Bash shell。<br>
② 如果你的下载路径是自定义的，那么把该步骤路径中的 ~/Downloads 替换成你自己的下载路径。<br>
③ 除非被要求使用root权限，否则均选择“Install Anaconda as a user”。
4. 安装过程中，看到提示`In order to continue the installation process, please review the license agreement.`（“请浏览许可证协议以便继续安装。”），点击“Enter”查看“许可证协议”。
5. 在“许可证协议”界面将屏幕滚动至底，输入“yes”表示同意许可证协议内容。然后进行下一步。
6. 安装过程中，提示`Press Enter to accept the default install location, CTRL-C to cancel the installation or specify an alternate installation directory.`（“按回车键确认安装路径，按'CTRL-C'取消安装或者指定安装目录。”）如果接受默认安装路径，则会显示PREFIX=/home/<user>/anaconda<2 or 3> 并且继续安装。安装过程大约需要几分钟的时间。
>•	建议：直接接受默认安装路径。
7. 安装器若提示`Do you wish the installer to prepend the Anaconda<2 or 3> install location to PATH in your /home/<user>/.bashrc ?`（“你希望安装器添加Anaconda安装路径在 /home/<user>/.bashrc 文件中吗？”），建议输入“yes”。
>•	注意：<br>
① 路径 /home/<user>/.bash_rc 中 “<user>” 即进入到家目录后你的目录名。<br>
② 如果输入“no”，则需要手动添加路径，否则conda将无法正常运行。
8. 当看到`Thank you for installing Anaconda<2 or 3>!`则说明已经成功完成安装。
9. 关闭终端，然后再打开终端以使安装后的Anaconda启动。或者直接在终端中输入 `source ~/.bashrc 也可完成启动。
10. 验证安装结果。可选用以下任意一种方法：<br>
① 在终端中输入命令`condal list`，如果Anaconda被成功安装，则会显示已经安装的包名和版本号。<br>
② 在终端中输入 python 。这条命令将会启动Python交互界面，如果Anaconda被成功安装并且可以运行，则将会在Python版本号的右边显示`Anaconda custom (64-bit)`。退出Python交互界面则输入 exit() 或 quit() 即可。<br>
③ 在终端中输入 anaconda-navigator 。如果Anaconda被成功安装，则Anaconda Navigator将会被启动。

## 管理conda
0. 写在前面
接下来均是以命令行模式进行介绍，Windows用户请打开“Anaconda Prompt”；macOS和Linux用户请打开“Terminal”（“终端”）进行操作。

### 验证conda已被安装<br>
`conda --version`<br>
终端上将会以 conda 版本号 的形式显示当前安装conda的版本号。如： conda 3.11.0<br>
>•	注意：如果出现错误信息，则需核实是否出现以下情况：<br>
① 使用的用户是否是安装Anaconda时的账户。<br>
② 是否在安装Anaconda之后重启了终端。

### 更新conda至最新版本
`conda update conda`<br>
执行命令后，conda将会对版本进行比较并列出可以升级的版本。同时，也会告知用户其他相关包也会升级到相应版本。<br>
当较新的版本可以用于升级时，终端会显示 Proceed ([y]/n)? ，此时输入 y 即可进行升级。

### 查看conda帮助信息
```
conda --help
或
conda -h
```
### 卸载conda
① Linux 或 macOS<br>
```
rm -rf ~/anaconda2
或
rm -rf ~/anaconda3
```
即删除Anaconda的安装目录。根据安装的Anaconda版本选择相应的卸载命令。

② Windows<br>
控制面板 → 添加或删除程序 → 选择“Python X.X (Anaconda)” → 点击“删除程序”
>•	注意：<br>
① Python X.X：即Python的版本，如：Python 3.6。<br>
② Windows 10的删除有所不同。
## Pycharm
然后安装pycharm专业版（社区版应该也行）
安装过程比较简单不深入讲。专业版激活的话，学生可以去官网申请免费账户，其他人直接购买。

## Tensorflow环境搭建
打开Anaconda<br>
![](/images/2020-03-01-15-45-01.png)<br>
进入环境<br>
![](/images/2020-03-01-15-45-17.png)<br>
新建环境<br>
![](/images/2020-03-01-15-45-28.png)<br>
选择python版本（自己取名）<br>
![](/images/2020-03-01-15-45-44.png)<br>
然后安装要用的包，tensorflow和numpy必装，其他随意，用时安装也行<br>
![](/images/2020-03-01-15-45-56.png)<br>
选择all或者没安装的，在搜索栏找要安装的包
勾选要的包，然后apply<br>
![](/images/2020-03-01-15-46-10.png)<br>
接下来pychram配置Anaconda<br>
在界面中选择：<br>
`File->Default settings->Default project->project interpreter`，如图中所示
![](/images/2020-03-01-15-46-29.png)<br>
接着点击 project interpreter 的右边的小齿轮，选择 add local ，选择anaconda文件路径下的python.exe。接着pycharm会更新解释器，导入模块等，要稍等一点时间。<br>
好了，到目前为止，anaconda在pycharm中的配置就基本完成了。
![](/images/2020-03-01-15-48-11.png)<br>
配置好的界面如下：<br>
![](/images/2020-03-01-15-48-31.png)<br>
## tensorboard
最后讲一讲tensorboard使用<br>
先写代码<br>
![](/images/2020-03-01-15-49-08.png)<br>
运行生成logs  <br>
![](/images/2020-03-01-15-49-27.png)<br>
然后打开anaconda里cmd <br>
![](/images/2020-03-01-15-49-46.png)<br>
执行`tensorboard --logdir=      file/logs`
>logs为logs目录<br>
结果：
![](/images/2020-03-01-15-50-32.png)
![](/images/2020-03-01-15-50-43.png)