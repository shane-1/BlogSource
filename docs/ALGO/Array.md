# 数组

>最基础的数据结构之一

需要两点注意的是：

- 数组下标都是从0开始的。
- 数组内存空间的地址一般是连续的

>Java是没有指针的，同时也不对程序员暴露其元素的地址，寻址操作完全交给虚拟机。故Java地址并非连续

---

## 二分查找

[704.二分查找 💚](https://leetcode.cn/problems/binary-search/)

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



---

## 移除元素

[27.移除元素💚](https://leetcode.cn/classic/problems/remove-element/)

### 要点

数组的元素在内存地址中是连续的，不能单独删除数组中的某个元素，只能覆盖。


###  暴力方案

 每遇到一个相等值就批量从后向前移动元素

> 时间复杂度：O(n^2)

> 空间复杂度：O(1)


代码：

```java
class Solution {
 public int removeElement(int[] nums, int val) {
        int size = nums.size();
        for (int i = 0; i < size; i++) {
            if (nums[i] == val) { // 发现需要移除的元素，就将数组集体向前移动一位
                for (int j = i + 1; j < size; j++) {
                    nums[j - 1] = nums[j];
                }
                i--; // 因为下标i以后的数值都向前移动了一位，所以i也向前移动一位
                size--; // 此时数组的大小-1
            }
        }
        return size;

    }
}
```

###  优化方案

使用指针，每次用不等于当前值的元素覆盖指针值（简称-快慢指针）


> 时间复杂度：O(n)

> 空间复杂度：O(1)

代码：

```java
class Solution {
    public int removeElement(int[] nums, int val) {
        
        int index = 0;
        
        for(int i = 0; i < nums.length; i++){
            if(nums[i] != val){
                nums[index++] = nums[i];
            }  
        }
        
        return index;
    }
}
```

### 相关题目推荐

[26.删除排序数组中的重复项 💚](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

[283.移动零 🧡](https://leetcode.cn/classic/problems/search-insert-position/description/)

[844.比较含退格的字符串](https://leetcode.cn/classic/problems/sqrtx/description/)

[977.有序数组的平方 💚](https://leetcode.cn/classic/problems/valid-perfect-square/description/)

