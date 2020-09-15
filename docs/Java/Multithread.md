# 多线程 Multithread
进程:运行的应用程序<br>
线程:应用程序内部并发执行的代码段<br> 
## Thread类
三种创建线程方式：
### 继承thread类
```java
class MyThread1 extends Thread{
    @Override
    public void run(){
        System.out.println("MyThread1");
    }
}
//start
new Mythread1().start();
```
> 不建议使用:避免oop单继承局限性
### 实现runnable接口
```java
class MyThread2 implements Runnable{
    @Override
    public void run(){
        System.out.println("MyThread2");
    }
}
//start
new Thread(new Mythread2()).start();
```
> 建议使用:避免单继承局限性,灵活方便,方便同一对象被多个线程使用
### 实现Callable接口
```java
class MyThread3 implements Callable<Integer>{

    @Override
    public Integer call() throws Exception{
        System.out.println("MyThread3");
        Return 100;
    }
}
//start
FutureTask<Integer> futureTask = new FutureTask<Integer>(new Mythread3());
new Thread(futureTask).start();

try{
    Integer integer = futureTask.get();
} catch(InterruptedException e){
    e.printStackTrace();
}catch(ExecutionException e){
    e.printStackTrace();
}

```
## 并发

并发是主栈(主函数)同时开辟多个分栈实现<br>

## 同步

yield:放弃CPU抢占权,谦让<br>
sleep:让线程休眠毫米数<br>
join:等待指定线程执行完后继续运行
```java
public class ThreaDemo{
    public static void main(String[] args) {
        Player p1 = new Player("jack", 3000);
        Player p2 = new Player("luke",200);

        p1.start();
        p2.start();
        try{
            p1.join();
            p2.join();
        }
        catch (Exception e){

        }
         System.out.println("都到了~");
    }
}

class Player extends Thread{
    private String name;
    private int time;
    public Player(String name,int time){
        this.name = name;
        this.time = time;
    }

    public void run(){
        System.out.println("玩家:"+name+"出发了~");
        try{
            Thread.sleep(time);
        }
        catch (Exception e){

        }
        System.out.println("玩家:"+name+"到了~");
    }

}

```
## 守护线程 daemon 

+ 线程分为用户线程和守护线程
+ 虚拟机必须确保用户线程执行完毕
+ 虚拟机不用等待守护线程执行完毕
+ 如，后台记录操作日志，监控内存，垃圾回收
+ 如果应用程序剩余的线程都是守护线程,则程序结束<br>
+ 守护线程守护所有的非守护线程（用户线程）<br>
```java
class God implements Runnable{

    @Override
    public void run(){
        while(true){
            System.out.println("God bless you!");
        }
    }    
}

class People implements Runnable{
    @Override
    public void run(){
        for(int i = 0; i <36500; i++){
            System.out.println("free living!");
        }
        System.out.println("===bye lovely world!===");
    }
}

public static void main (String[] args){
    God god = new God();
    People shane = new People();

    Thread thread = new Thread(god);
    thread.setDaemon(true);

    thread.start();
    new Thread(shane).start();
}
```
## 锁
任何一个对象都可以是锁\信号灯\参照物<br>
`static Object lock = new Object();`
```java
   public int getTickets() {     //对票加锁
   //同步代码块
        synchronized (lock) {
            tickets--;
            return tickets;
        }
```
> 同步块`synchronized(obj){}`<br>
> + obj称为同步监视器
> + obj可以是任何对象,但推荐使用共享资源作为同步监视器<br>
```java
//同步方法
   public static synchronized int getTickets() {     //对票加锁
            tickets--;
            return tickets;
        }
```
> + 同步方法最好加static,只和方法有关(否则出现多个对象多把锁)<br>
注意：静态方法只有有静态变量，因为静态变量和类绑定，而变量和对象绑定。
> + 同步方法中无需指定同步监视器,因为同步方法的同步监视器就是this,这个对象本身,或者是class.

## 死锁

### 产生条件

1. 互斥条件<br>
    指进程对所分配到的资源进行排它性使用，即在一段时间内某资源只由一个进程占用。如果此时还有其它进程请求资源，则请求者只能等待，直至占有资源的进程用毕释放。
2. 请求和保持条件<br>
    指进程已经保持至少一个资源，但又提出了新的资源请求，而该资源已被其它进程占有，此时请求进程阻塞，但又对自己已获得的其它资源保持不放。
3. 不剥夺条件<br>
    指进程已获得的资源，在未使用完之前，不能被剥夺，只能在使用完时由自己释放。
4. 循环等待条件<br>
    指在发生死锁时，必然存在一个进程——资源的环形链，即进程集合{P0，P1，P2，···，Pn}中的P0正在等待一个P1占用的资源；P1正在等待P2占用的资源，……，Pn正在等待已被P0占用的资源。

## GUC

### CopyOnWriteArrayList

```java
Import java.util.concurrent.CopyOnwriteArrayList;

//test JUC safe class
public class TestJUC{
    public static void main(String[] args){
        CopyOnWriteArrayList<string> list = new CopyOnWriteArrayList<String>();
        for(int i = 0; i < 10000; i++){
            new Thread(()->{
                list.add(Thread.currentThread().getName());
            }).start();//lamada表达式的匿名内部类
        }
        try{
            Thread.sleep(3000);
        } catch (InterruptedException e){
            e.printStackTrace();
        }
        System.out.println(list.size());
    }
}
```

### Lock锁

> 更强大的线程同步机制——通过显式定义同步锁对象来实现同步。同步锁使用Lock对象充当.
> ReentrantLock类实现了Lock，它拥有与synchronized相同的并发性和内存语义，在实现线程安全的控制中，比较常用的是ReentrantLock,可以显式加锁、释放锁。

```java
//Test Lock锁
public class TestLock{
    public static void main(String[] args){
        TestLock2 testlock2 = new TestLock2();

        new Thread(testlock2).start();
        new Thread(testlock2).start();

    }
}

class TestLock2 implements Runnable{

    int ticketNums = 10;
    //lock
    private final ReentrantLock lock = new ReentrantLock();
    @Override
    public void run(){
        while(true){

            try{
                lock.lock();    //加锁
                if(ticketNums > 0){
                try{
                Thread.sleep(1000);
                } catch(InterruptedException e){
                    e.printStackTrace();
                }
                System.out.println(ticketNums--);
            }else{
                break;
            }
            }finally{   //如果同步代码有异常，要将unlock()写入finally语句块
                // unlock
                lock.unlock();
            }                    
        }
    }
}
```

### 对比synchronized

+ Lock是显式锁(手动开启关闭),synchronized是隐式锁,除了作用域自动释放
+ Lock只有代码块锁,synchronized有代码块锁和方法锁
+ 使用Lock锁,JVM将花费较少时间来调度线程,性能更好,并且具有更好的扩展性
+ 优先使用顺序: 
> Lock > 同步代码块(已经进入了方法体,分配了相应资源) > 同步方法(在方法体外)
## 生产消费
&emsp;&emsp;每个锁都有一个等待队列(每个对象都可以是锁)<br>
```java
sleep();    //放弃CPU抢占权,与锁旗标无关
wait();     //当前对象加入锁等待队列,同时释放锁旗标,唤醒后继续执行
notify();   //通知等待队列对象
```