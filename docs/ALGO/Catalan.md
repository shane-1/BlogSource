# 卡特兰数

> 由一次面试算法题带来的巨大数学缺失

## 什么东西？

- 组合数学的计数问题数列
- 神奇的数学规律

## 几何意义

简单来说，卡特兰数就是一个有规律的数列，在坐标图中可以表示为：从原点 `(0,0)` 出发，每次向 x 轴或者 y 轴正方向移动 1 个单位，直到到达`(n,n)`点，且在移动过程中不越过第一象限平分线的移动方案总数。

## 推导

[B 站视频](https://www.bilibili.com/video/BV1m44y1A7aK/)

## 公式

### 通项

![](/images/Catalan/1.jpg)

### 递推

![](/images/Catalan/2.png)

### 取模

![](/images/Catalan/3.png)


### 递推（规律）

![](/images/Catalan/4.png)

## 考点

### 进出栈

设栈 S 的初始状态为空，元素 a,b,c,d,e 依次入栈，以下出栈序列有多少种可能性？

> 注意：这个序列顺序是定的。

重点：归纳法思考，由大及小。

我们这样去想，假设最终的出栈序列可能性用 f(n) 表示，其中 n 就是元素的个数。假设第 k 个数是最后出栈的数，那么：

- 比它小的前 k- 1 个数，肯定已经完成了入栈，出栈操作。因为从逻辑顺序上来讲，它们无法压到下面去吧
- 比它大的后 n-k 个数，肯定已经完成了入栈，出栈操作。它们倒是可以压到 k 下面去，但假设 k 是最后一个出栈的，它们不能破坏掉假设，也必须提出出栈。

现在，k 将原来的问题，划分为两个子问题`f(n-k)`和`　f(k-1)`,根据乘法原理，结果就是`f(n -k)*f(k -1)`。

k 的取值范围是 1 <k<n，再根据加法原理：

`f(n)=∑f(n-k)xf(k-1)k-1`

展开写就是：

`f(n)=f(0)xf(n-1)+f(1)xf(n-2)+...+f(n-1)x f(0)`

### 排队问题

变种 (排队问题):
出栈入栈问题有许多的变种，比如 n 个人拿 5 元、n 个人拿 10 元买物品，物品 5 元，老板没零钱。

问有几种排队方式。熟悉栈的同学很容易就能把这个问题转换为栈。

值得注意的是，由于每个拿 5 元的人排队的次序不是固定的，所以最后求得的答案要 n!。
拿 10 元的人同理，所以还要 n!。
所以这种变种的最后答案为`h(n)*n!。`

### 二叉树构成

[96. n 个二叉搜索树](https://leetcode.cn/problems/unique-binary-search-trees/)

#### 递推解法

可以使用递推，但要注意精度损失！

```java
//由于精度损失导致的计算错误
class Solution {
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= n; i++){
            dp[i] = ((4 * n - 2) / (n+1)) * dp[i-1];
        }
        return dp[n];
    }
}

```

```java
class Solution {
    public int numTrees(int n) {
        double[] dp = new double[n + 1];
        dp[0] = 1.0;
        for (int i = 1; i <= n; i++){
            dp[i] = ((4 * i - 2) * 1.0 / (i + 1)) * dp[i - 1];
        }
        // 将结果四舍五入为整数
        return (int) Math.round(dp[n]);
    }
}

```

#### 动规解法

```jave
class Solution {
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                dp[i] += dp[j] * dp[i - 1 - j];
            }
        }
        return dp[n];
    }
}
```

## 四连击


https://zhuanlan.zhihu.com/p/31317307
https://zhuanlan.zhihu.com/p/31526354
https://zhuanlan.zhihu.com/p/31585260
https://zhuanlan.zhihu.com/p/31050581