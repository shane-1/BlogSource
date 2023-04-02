# 链表

>链表是一种通过指针串联在一起的**线性结构**

每一个节点由两部分组成：

- 一部分是数据域
- 一部分是指针域

>单链表最后一个节点的指针域指向null（空指针的意思）

## 基础

### 分类

根据链表的指针一般分为：

- 单链表

>指针域部分仅有一个指针，指向下一个节点

- 双链表

>指针域部分有两个指针，头指针指向上一个节点，尾指针指向下一个节点

- 循环链表

>和双指针一样由头指针和尾指针，但是首尾相接，形成环

注：循环链表可以用来解决约瑟夫环问题。

#### 约瑟夫环

N个人围成一圈，第一个人从1开始报数，报M的将被杀掉，下一个人接着从1开始报。如此反复，最后剩下一个，求最后的胜利者。
例如只有三个人，把他们叫做A、B、C，他们围成一圈，从A开始报数，假设报2的人被杀掉。

>可以使用循环链表来处理，但是由于设计大量的链表移除节点操作，在大数量级下，往往超时。

所以一般通过下面的公式处理：

`f(N,M)=(f(N−1,M)+M)%N`

```java

//迭代
class Solution {
    public int circle(int N, int M) {
            int result = 0;
            for(int i = 2; i <= N; i++){
                result = （resulr + M）% N;
            }

            //下标从0开始，故返回需要加一
            return result+1;
        }
        
//递归        

```
### 存储方式

数组是在内存中是连续分布的（很多语言中，例如C），但是链表在内存中可不是连续分布的。

### 定义

在 C++ 中链表定义如下：

```c++
// 单链表
struct ListNode {
    int val;  // 节点上存储的元素
    ListNode *next;  // 指向下一个节点的指针
    ListNode(int x) : val(x), next(NULL) {}  // 节点的构造函数
};
```

在 Java 中链表定义如下：

```java
// 单链表
public class ListNode {
    // 结点的值
    int val;

    // 下一个结点
    ListNode next;

    // 节点的构造函数(无参)
    public ListNode() {
    }

    // 节点的构造函数(有一个参数)
    public ListNode(int val) {
        this.val = val;
    }

    // 节点的构造函数(有两个参数)
    public ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}

```

### 操作

>添加和删除是链表的核心操作

#### 删除节点

![](/images/LinkedList/2023-03-22-10-24-22.png)

只要将C节点的next指针 指向E节点就可以了。

#### 添加节点

![](/images/LinkedList/2023-03-22-10-24-42.png)

>链表的增添和删除都是O(1)操作，也不会影响到其他节点。

> 但是要是删除第N个节点，需要从头节点查找到第N-1个节点通过next指针进行删除操作，查找的时间复杂度是O(n)。

### 性能分析

||删除/添加时间复杂度|查询时间复杂度|使用场景|
|:-:|:-:|:-:|:-:|
|数组|O(n)|O(1)|数据量固定,少增删,频繁查询|
|链表|O(1)|O(n)|数据量变化,少查询,频繁增删|

>数组在定义的时候，长度就是固定的，如果想改动数组的长度，就需要重新定义一个新的数组

>链表的长度可以是不固定的，并且可以动态增删， 适合数据量不固定，频繁增删，较少查询的场景

## [移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)


### 思路

使用两个指针,一个指针指向当前节点,另一个指针指向当前节点的前置节点.

设置一个虚拟头节点指向当前链表头,前置节点初始化指向头节点.

最终结果节点指向该初始化虚拟头节点,因为可能首个节点满足等于val需要移除,结果返回头节点的next

### 代码

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeElements(ListNode head, int val) {

        ListNode point = head;

        //虚拟头
        ListNode pre = new ListNode();
        pre.next = point;
        head = pre;

        while(pre.next != null){
            if(point.val == val){
                pre.next = point.next;
            }
            else{
                pre = pre.next;
            }
            
            point = point.next;
        }

        return head.next;
    }
}

```

## [设计链表](https://leetcode.cn/problems/design-linked-list/)


### 代码

#### 错误思路

>未使用int记录当前链表长度导致每次需要单独处理索引为空

>内定义内部类ListNode

```java
class MyLinkedList {

        int val;
        MyLinkedList next;
        
        public MyLinkedList(){}

        public MyLinkedList(int val){
            this.val = val;
        }

        MyLinkedList(int val, MyLinkedList next){
            this.val = val;
            this.next = next;
        }
    
    
    public int get(int index) {
        MyLinkedList point = this;
        while(index > 0&&point==null){
            point = point.next; 
            index --;
        }
        return point == null?-1:point.val;
    }
    
    public void addAtHead(int val) {
        MyLinkedList point = new MyLinkedList(val);
        point.next = this;

    }
    
    public void addAtTail(int val) {
        MyLinkedList point = this;
        while(point.next!=null)
            point = point.next;
        
        point.next = new MyLinkedList(val);

    }
    
    public void addAtIndex(int index, int val) {

        MyLinkedList point = new MyLinkedList();
        point.next = this;
        while(index > 0 && point!=null){
            point = point.next;
        }
        if(point == null)
        return;
        MyLinkedList newNode = new MyLinkedList(val);
        newNode.next = point.next;
        point.next = newNode;
    }
    
    public void deleteAtIndex(int index) {
        MyLinkedList point = new MyLinkedList();
        point.next = this;
        while(index > 0&&point!=null){
            point = point.next;
        }
        if(point == null)
        return;
        point.next = point.next.next;

    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */

```

#### 正确思路

```java

class MyLinkedList {
    
    ListNode head;
    
    int length;
    
    class ListNode{
        int val;
        ListNode next;
        public ListNode(int val){
            this.val = val;
        }
    }
    
    
    public MyLinkedList() {
        this.length = 0;  
    }
    
    public int get(int index) {
        if(index > length-1) 
            return -1;
               
        ListNode point = head;
        while(index-- > 0){
           point = point.next;
        }
        return point.val;        
    }
    
    public void addAtHead(int val) {
        ListNode newNode = new ListNode(val);
        newNode.next = head;
        this.head = newNode;
        this.length++;
    }
    
    private ListNode newDummyHead(ListNode head){
        ListNode dummyHead = new ListNode(-1);
        dummyHead.next = head;
        return dummmyHead;

    }
    public void addAtTail(int val) {
        
        ListNode dummyHead = newDummyHead(this.head);
        ListNode point = dummyHead;
        
        while(point.next != null){
            point = point.next;
        }
        
        point.next =  new ListNode(val);
        this.head = dummyHead.next;
        this.length++;

    }
    
    public void addAtIndex(int index, int val) {
        
        if(index > length) 
            return;
            
        ListNode dummyHead = newDummyHead(this.head);
        ListNode point = dummyHead;
        
         while(index-- > 0){
            point = point.next;
         }
         
         ListNode newNode = new ListNode(val);
         newNode.next = point.next;
         point.next = newNode;
         
         this.head = dummyHead.next;   
         this.length++;
         
    }
    
    public void deleteAtIndex(int index) {
        if(index > length-1) 
            return;
            
        ListNode dummyHead = newDummyHead(this.head);
        ListNode point = dummyHead;
        
         while(index-- > 0){
             
           point = point.next;
         }
         point.next = point.next.next;
         this.head = dummyHead.next;
         
         this.length--;

    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */
```

## [反转链表](https://leetcode.cn/problems/reverse-linked-list/)


### 代码

#### 双指针

>从前到后逐渐转向

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {

        ListNode pre = null;

        while(head!= null){
            ListNode temp = head.next;
            head.next = pre;
            pre = head;
            head = temp;
        }
        return pre;
         
    }
}
```


#### 递归

>从前到后逐渐转向

```java
class Solution {
    public ListNode reverseList(ListNode head) {

        return reverse(null, head);
         
    }
    private ListNode reverse(ListNode pre, ListNode head){
        if(head == null){
            return pre;
        }
        ListNode temp = head.next;
        head.next = pre;
        return reverse(head, temp);

    }
}
```

>从后到前逐渐转向

```java
class Solution {
    ListNode reverseList(ListNode head) {
        // 边缘条件判断
        if(head == null) return null;
        if (head.next == null) return head;
        
        // 递归调用，翻转第二个节点开始往后的链表
        ListNode last = reverseList(head.next);
        // 翻转头节点与第二个节点的指向
        head.next.next = head;
        // 此时的 head 节点为尾节点，next 需要指向 NULL
        head.next = null;
        return last;
    } 
}

## [两两交换链表](https://leetcode.cn/problems/swap-nodes-in-pairs)

### 代码

> 直接通过双指针遍历处理

```java
class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummyHead = new ListNode(-1);
        dummyHead.next = head;
        ListNode point = dummyHead;

        while(point.next!=null&&point.next.next!=null){
            ListNode temp1 = point.next.next;
            ListNode temp2 = point.next.next.next;
            point.next = temp1;
            temp1.next = head;
            head.next = temp2;
            point = head;
            head = head.next;
        }

        return dummyHead.next;
    }
}
```

## [删除链表的倒数第N个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/submissions/)

### 代码

> 通过双指针可以轻松处理回退


```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummyHead = new ListNode(-1);
        dummyHead.next = head;    
        ListNode point = dummyHead;
        while( n-- > 0){
            head = head.next;
        }

        while(head != null){
            head = head.next;
            point = point.next;

        }
        point.next = point.next.next;
        return dummyHead.next;
    }
}
```

## [交叉链表相交点](https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/)

### 思路

获取链表A和链表B的长度，获取两个链表的差值，通过差值**对其两个链表尾部**。

因为当前交叉链表的交点一定在两个链表对其尾部之后，可以将两边的指针同时后移，此时相交点是两个**指针相等**的点（不是值相等）。

### 代码


```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        int lengthA = getLength(headA);
        int lengthB = getLength(headB);

        int size = Math.abs(lengthA - lengthB);
        if(lengthA > lengthB){
            while(size-- > 0){
                headA = headA.next;
            }

        }else{
            while(size-- > 0){
                headB = headB.next;
            }

        }
        
        while(headA != null && headB != null && headA != headB){
                headA = headA.next;
                headB = headB.next;
        }

        return (headA == null || headB == null)? null : headA;
        


        
    }

    private int  getLength(ListNode head){
        int count = 1;
        while(head != null){
            head = head.next;
            count++;
        }
        return count;
    }
}
```