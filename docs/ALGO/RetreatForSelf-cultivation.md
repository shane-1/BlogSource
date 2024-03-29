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

### 参考

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

### 参考

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

采用回溯法遍历所有可能情况，但是该方案可能超时，所以理论上应该有更优解。

### 参考

采用 HashMap 记录所有乘积的出现频度，将频度所有大于 2 的取出.
然后通过当前频度去 C22，每次有八种排列组合

> Input:  [2,3,4,6] 
>
> Output:  (2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3) (3,4,2,6) , (4,3,2,6) , (3,4,6,2) , (4,3,6,2)


```java
class Solution {
    public int tupleSameProduct(int[] nums) {

        Map<Integer, Integer> resultMap = new HashMap<>();

        int len = nums.length;
        for(int i = 0; i < len - 1; i++){
            for(int j = i + 1; j < len; j++){
                int temp = nums[i] * nums[j];
                if(resultMap.containsKey(temp)){
                    resultMap.put(temp, resultMap.get(temp) + 1);
                }else {
                    resultMap.put(temp, 1);
                }
            }
        }
        int result = 0;
        for(int each : resultMap.values()){
            if(each > 1){
                result += (each - 1) * each * 4;
            }

        }

        return result;
    }
}
```

## [反转链表](https://leetcode.cn/problems/reverse-linked-list/)

### 初试


使用递归处理，一层一层反转


```java
class Solution {
    public ListNode reverseList(ListNode head) {
        if(head.next == null)
            return head;
    
        ListNode now = reverseList(head.next);
        //使用当前节点下一个节点作为头，最大的问题是 head 的 next 没有进行处理
        now.next = head;
        return now;

    }
}

```
>code_output: Error - Found cycle in the ListNode

当前节点直接插入反转，未处理其后续指针

```java
class Solution {
    public ListNode reverseList(ListNode head) {

        if(head.next == null)
            return head;

        ListNode now = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return now;
    }
}

```

>runtime_error:java.lang.NullPointerException: Cannot read field "next" because parameter1 is null

这里在使用 head.next 时未判断空


### 参考

```java
class Solution {
    public ListNode reverseList(ListNode head) {

        if(head == null||head.next == null)
            return head;

        ListNode now = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return now;
    }
}
```
