# 闭关算法修炼

## [字符唯一最小删除数](https://leetcode.cn/problems/minimum-deletions-to-make-character-frequencies-unique/submissions/)

### 初试

```java
class Solution {
    public int minDeletions(String s) {
        int[] frequency = new int[26];

        for(char each:s.toCharArray()){
            frequency[each-'a']++;
        }
        
        Arrays.sort(frequency);

        for(int i = 1; i < 26; i++){
            if(frequency[i] == 0)
                continue;
            
            if(frequency[i-1]==frequency[i]){
                
            }
        }


    }
}

```

>思路解析：

1. 尝试使用一个辅助数组完成对现有字符频率的遍历
2. 然后使用数组排序当前字符频率辅助数组
3. 通过对排序后数组的前后元素对比，找出相等频率的字符然后进行操作
**该步骤发现无法对当前已经发现的元素合理的进行删除，因为需要回溯之前已经遍历的频率寻找合适的位置**

### 答案

```java

class Solution {
    public int minDeletions(String s) {
    Map<Character, Integer> freq = new HashMap<>();
    for (char c : s.toCharArray()) {
        freq.put(c, freq.getOrDefault(c,0) + 1);
    }
    
    Set<Integer> usedFreq = new HashSet<>();
    int deletions = 0;
    
    for (int f : freq.values()) {
        while (usedFreq.contains(f)) {
            f--;
            deletions++;
        }
        if (f > 0) {
            usedFreq.add(f);
        }
    }
    
    return deletions;
    }
}
```

1. 使用一个辅助 Map 完成对现有字符频率的遍历
>这里特别采用了 getOrDefault(c,0) 方法，当前可以使用`containsKey`+`if-else`判断，但没有该方案优雅
2. 然后通过一个 set 存储频率，一旦发现某个频率存在就不断自减（while）尝试加入该 set，最终值大于 1 就加入
3. 记录过程 2 中的自减量，也就是删除量

### 反思

1. 其实初试的辅助数组比 map 更优
2. 在进行删除时，与其使用数组排序 - 遍历 - 回溯，未使用数据结构 set 处理

```java
class Solution {
    public int minDeletions(String s) {
        int[] frequency = new int[26];

        for(char each:s.toCharArray()){
            frequency[each-'a']++;
        }
        
        Set<Integer> usedFrequency = new HashSet<>();
        int deletion = 0;

        for(int each:frequency){
            if(each == 0)
            continue;
        while(usedFrequency.contains(each)){
            each--;
            deletion++;
        }
        if(each > 0)
            usedFrequency.add(each);
    }

    return deletion;
    }
}
```

## [下标对中的最大距离](https://leetcode.cn/problems/maximum-distance-between-a-pair-of-values/description/)

### 初试

使用两个循环分别处理`nums1`和`nums2`,然后取满足
`i <= j` 且 `nums1[i] <= nums2[j]`的差值，和当前结果做比较，如果更大则替换。

>结果：数据量过大时超时

### 答案

1. 采用双指针处理

```java
class Solution {
    public int maxDistance(int[] nums1, int[] nums2) {

        int i = 0, j = 0;
        while(i < nums1.length && j < nums2.length){
            if(nums1[i] > nums2[j])
            i++;
            j++;
            
        }

        return j-i-1 >= 0? j-i-1: 0;
    }
}


```

## [同积元组](https://leetcode.cn/problems/tuple-with-same-product/)

### 初试

采用回溯法遍历所有