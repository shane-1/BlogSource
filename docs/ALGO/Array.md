# 数组

>最基础的数据结构之一

需要两点注意的是：

- 数组下标都是从0开始的。
- 数组内存空间的地址一般是连续的

>Java是没有指针的，同时也不对程序员暴露其元素的地址，寻址操作完全交给虚拟机。故Java地址并非连续

---
> 💚 简单 🧡中等 ❤️困难


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

[283.移动零 💚](https://leetcode.cn/problems/move-zeroes/)

[844.比较含退格的字符串 💚](https://leetcode.cn/problems/backspace-string-compare/)

>可以使用堆栈解题或者使用双指针法，使用双指针需要从尾到首且注意记录退格数

[977.有序数组的平方 💚](https://leetcode.cn/problems/squares-of-a-sorted-array/)

## 双指针

使用两个首尾指针或者两个快慢指针解决数组问题的方法

### [有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/)

1. 使用两个指针分别指向当前数组首位

因为当前的平方最大值必然出现在首位
>如果负值平方最大比如必然出现在首部，正值平方最大比必然在尾部

2. 使用一个新数组来存放当前平方和

不在原地处理，主要是因为当前结果需要放置在尾部。
当正值最大时不受影响；但当负值最大时吗，需要把当前负值平方和放于尾数，
次数需要数组依次前移一位。这种操作带来O(n)的时间复杂度是不可接受的。

> 当然这是有人已经想到把当前正值调整到首位（比如我），但是这样不能保证首位的平方一定大于其后负值的平方和，需要再添加逻辑处理。如果采用调整位序，在最差情况即后面均是平方大于其的负值，该操作仍会是O(n)的时间复杂度且代码逻辑过于复杂

简而言之，我认为这里的最优方案就是空间换时间，这样代码可读性也最高。

3. 按照当前指针指向元素平方和较大值依次处理数组

### 参考代码


> 时间复杂度：O(n)

> 空间复杂度：O(n)

代码：

```java
class Solution {
    public int[] sortedSquares(int[] nums) {
        
        int start = 0;
        int end = nums.length-1;
        
        int[] result = new int[nums.length];
        int index = end;

        
        while(start <= end){

            //use Math.pow result cant be int
            int startPow = nums[start] * nums[start];
            int endPow = nums[end] * nums[end];
            
            if(startPow > endPow){
                result[index--] = startPow;
                start++;
            }else{
                result[index--] = endPow;
                end--;
            }
        }
        
        return result;
    }
}
```


## 滑动窗口

不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果。

**其实滑动窗口可以看成双指针的延伸**


###  [最小子序列 🧡](https://leetcode.cn/problems/minimum-size-subarray-sum/)

>暴力解法是使用双层遍历，而滑动窗口基于此延伸

1. 由于序列顺序一定不变，可以用一个可变指针作为左侧

> while(当前结果 > target){
                添加解;
                当前结果 -= nums[左指针++];
            }

2. 然后将右侧作为遍历变量不断遍历，就可以获得可用解

3. 由于存在多个解，需要最小的结果。故需要一个result存放当前长度，且不断和之后的结果比较取最短。

>  int result = Integer.MAX_VALUE;

>   result = Math.min(result, end-start+1);



### 参考代码


> 时间复杂度：O(n)

> 空间复杂度：O(1)

代码：

```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        
        if(nums.length == 0)
           return 0;
           
        if(nums[0] == target)
           return 1;
        
        int start = 0,count = 0;
        int result = Integer.MAX_VALUE;
        
        
        for(int end = 0; end < nums.length; end++){
            
            count += nums[end];
            
            //left side  
            while(count >= target){
                result = Math.min(result, end-start+1);
                count -= nums[start++];
            }
            
        }
        
        return result ==  Integer.MAX_VALUE ? 0 : result;
    }
}
```

### 相关题目推荐

[76.最小覆盖子串 ❤️](https://leetcode.cn/classic/problems/minimum-window-substring/description/)

### 参考代码


> 时间复杂度：O(n)

> 空间复杂度：O(n)

代码：

```
java
class Solution {
    public String minWindow(String s, String t) {
         
         int start = 0;
         int rest = t.length();
         
         //字母记录
         int[] need = new int[123];

         //结果储存，当前可以只储存起始位置算偏移
         int[] result = new int[2];
         int length = Integer.MAX_VALUE;
         
         int index = 0;
         
         //标记目标字符
         for(char each : t.toCharArray()){
             need[each]++;
         }
         
         //开始匹配
         for(int end = 0; end < s.length(); end++){
             
             char now = s.charAt(end);
             
             //如果当前串必需，则所需字符总数减一
             if(need[now] > 0){
                 rest--;
             }
             
             need[now]--;        
             
             //所需字符为，即匹配成功
             if(rest== 0){
                 
             //当左边界字符不是所需字符则不断右移直到必需字符(因为非必需字符已经被need[now]--减为负数)
              while(start<end&&need[s.charAt(start)] < 0){
                    need[s.charAt(start)]++; 
                    start++;
                       
              }

              //当前结果比记录结果更短则更新
              if(length > end-start+1){
                    result[1] = end;
                    result[0] = start;
                    length = end - start+1;
              }
                //继续移动左边界一位，同时将必需字符+1
                 need[s.charAt(start)]++; 
                 start++; 
                 rest++;   
                                
             }
             }
             
             return length == Integer.MAX_VALUE ? "":s.substring(result[0],result[1]+1);

         }
         

    
}
```

[904.水果成篮 🧡](https://leetcode.cn/problems/fruit-into-baskets/)


## [螺旋矩阵II 🧡](https://leetcode.cn/problems/spiral-matrix-ii/)


可以直接按照要求逻辑处理字符串，但是特别注意：

1. 是否按照统一方式处理边界值？
2. 是否正确对应行或者列？
3. 是否在遍历完一条边后缩小边界
4. 是否正确使用退出条件

> 解题

```java
class Solution {
    public int[][] generateMatrix(int n) {

        int[][] result = new int[n][n];

        int left = 0, top = 0;
        int right = n-1, bottom = n-1;
        int count = 1;
        
        //只有到达中心点后退出循环
        while (left <= right && top <= bottom) {

            //边界值统一采用左闭右闭

            for(int j = left; j <= right; j++)

            //使用行i列j区分当然位置
                result[top][j] = count++;
            //缩小边界
            top++;

            for(int i = top; i <= bottom; i++)
                result[i][right] = count++;
            right--;

            for(int j = right; j >= left; j--)
                result[bottom][j]= count++;
            bottom--;

            for(int i = bottom; i >= top; i--)
                result[i][left] = count++;
            
            left++;
        }

        return result;

    }
}
```

### 相关题目推荐

[螺旋矩阵I 🧡](https://leetcode.cn/problems/spiral-matrix/)

> 解题

```java
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        int left = 0, up = 0;
        int right = matrix[0].length-1,down = matrix.length-1;

        while(left <= right&&up<=down){
                for(int j = left; j <= right; j++)
                    result.add(matrix[up][j]);
                up++;

                for(int i = up; i <= down; i++)
                    result.add(matrix[i][right]);
                right--;


                /**这里需要增加额外判断条件up<=down
                因为当输入矩阵为非正方形时，可能仅满足当前长未遍历完，导致宽被重复添加
                    例如在[[1,2,3,4],[5,6,7,8],[9,10,11,12]]矩阵
                        注：不能直接在while循环修改结束条件为||,是因为可能重复添加，
                            例如在[[1,2,3,4],[5,6,7,8],[9,10,11,12]]矩阵
                 **/
                for(int j = right; j >= left&&up<=down; j--)
                    result.add(matrix[down][j]);
                down--;

                /**这里的left<=right
                因为当输入矩阵为非正方形时，当前矩阵已经被前三条边完全添加
                     例如在[[7],[9],[6]]矩阵
                **/
                for(int i = down; i >= up&&left<=right; i--)
                    result.add(matrix[i][left]);
                left++;
        }
        return result;
    }
}
```