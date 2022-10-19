# 数组

>最基础的数据结构之一

需要两点注意的是：
- 数组下标都是从0开始的。
- 数组内存空间的地址一般是连续的

>Java是没有指针的，同时也不对程序员暴露其元素的地址，寻址操作完全交给虚拟机。故Java地址并非连续

## 二分查找

### 前提
- 有序数组
> 根本条件，有序的数组应优先考虑二分
- 无重复元素
> 如果结果接受不唯一仍可使用
### 边界条件下的处理
一般的边界条件处理有以下两种情况：
1. 左闭右开
> 大多数框架函数的默认处理方式

代码模板：
```java
left = 0;
right = num.size -1;
while(left <  right){
    middle = (left + right)/2;
    if(nums[middle] > target)
        right = middle ;
    else if(nums[middle] < target)
        left = middle +1;
    else return middle;
}
return -1;
```

2. 左闭右闭

代码模板：
```java
left = 0;
right = num.size -1;
while(left <=  right){
    middle = (left + right)/2;
    if(nums[middle] > target)
        right = middle -1;
    else if(nums[middle] < target)
        left = middle +1;
    else return middle;
}
return -1;
```

### 相关题目推荐

[34.在排序数组中查找元素的第一个和最后一个位置 🧡](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

[35.搜索插入位置 💚](https://leetcode.cn/classic/problems/search-insert-position/description/)

[69.x的平方根 💚](https://leetcode.cn/classic/problems/sqrtx/description/)

[367.有效的完全平方数 💚](https://leetcode.cn/classic/problems/valid-perfect-square/description/)

[704.二分查找 💚](https://leetcode.cn/problems/binary-search/)

---
待续
❤