# KMP算法详讲
## 正文
角色：<br> 

甲：abbaabbaaba <br>
乙：abbaaba<br>

乙对甲说：「帮忙找一下我在你的哪个位置。」<br>
甲从头开始与乙一一比较，发现第 7 个字符不匹配。<br>
要是在往常，甲会回退到自己的第 2 个字符，乙则回退到自己的开头，然后两人开始重新比较。<br>
这样的事情在字符串王国中每天都在上演：不匹配，回退，不匹配，回退，……<br>
但总有一些妖艳字符串要花自己不少的时间。<br>
上了年纪的甲想做出一些改变。于是乎定了个小目标：**发生不匹配，自身不回退。** <br>
甲发现，若要成功与乙匹配，必须要匹配 7 个长度的字符。所以就算自己回退到第 2 个字符，在后续的匹配流程中，肯定还会重新匹配到自己的第 7 个字符上。<br>
**当在甲的某个字符 c 上发生不匹配时，甲即使回退，最终还是会重新匹配到字符 c 上。**<br>
那干脆不回退，岂不美哉！<br>
**甲不回退，乙必须回退地尽可能少，并且乙回退位置的前面那段已经和甲匹配，这样甲才能不用回退。**<br>
如何找到乙回退的位置？<br>
「不匹配发生时，前面匹配的那一小段 abbaab 于我俩是相同的」，甲想，「这样的话，用 abbaab 的头部去匹配 abbaab 的尾部，最长的那段就是答案。」<br>
abbaab 的头部有 a,`ab`, abb, abba, abbaa（不包含最后一个字符。下文称之为「真前缀」）<br>
abbaab 的尾部有 b, `ab`, aab, baab, bbaab（不包含第一个字符。下文称之为「真后缀」）<br>
这样最长匹配是 ab。也就是说甲不回退时，乙需要回退到第三个字符去和甲继续匹配。<br><br>

「要计算的内容只和乙有关」，甲想，「那就假设乙在其所有位置上都发生了不匹配，乙在和我匹配前把其所有位置的最长匹配都算出来（算个长度就行），生成一张表，之后我俩发生不匹配时直接查这张表就行。」<br>
据此，甲总结出了一条规则并告诉了乙：<br>
** 所有要与甲匹配的字符串（称之为模式串），必须先自身匹配 ：对每个子字符串 [0...i]，算出其「相匹配的真前缀与真后缀中，最长的字符串的长度」。** <br>
「小 case，我对自己还不了解吗」，乙眨了一下眼睛，「那我回退到第三个字符和你继续匹配吧~」
---
新的规则很快传遍了字符串王国。现在来看看如何高效地计算这条规则。<br>
这里有个很好的例子：abababzabababa。列个表手算一下：（最大匹配数为子字符串 [0...i] 的最长匹配的长度）<br>
>子字符串　 a b a b a b z a b a b a b a<br>
最大匹配数  0 0 1 2 3 4 0 1 2 3 4 5 6 ?<br>

一直算到 6 都很容易。在往下算之前，先回顾下我们所做的工作：<br>
对子字符串 abababzababab 来说，<br>
真前缀有 a, ab, aba, abab, ababa, ababab, abababz, ...<br>
真后缀有 b, ab, bab, abab, babab, ababab, zababab, ...<br>
所以子字符串 abababzababab 的真前缀和真后缀最大匹配了 6 个（ababab），那**次大**匹配了多少呢？<br>
容易看出次大匹配了 4 个（abab），更仔细地观察可以发现，次大匹配必定在最大匹配 ababab 中，所以**次大匹配数就是 ababab 的最大匹配数！**<br>
直接去查算出的表，可以得出该值为 4。<br>
第三大的匹配数同理，它既然比 4 要小，那真前缀和真后缀也只能在 abab 中找，即 abab 的最大匹配数，查表可得该值为 2。<br>
再往下就没有更短的匹配了。<br>
&emsp;&emsp;回顾完毕，来计算 ? 的值：既然末尾字母不是 z，那么就不能直接 6+1=7 了，我们回退到次大匹配 abab，刚好 abab 之后的 a 与末尾的 a 匹配，所以 ? 处的最大匹配数为 5。<br><br>

上 Java 代码，它已经呼之欲出了：
```java
// 构造模式串 pattern 的最大匹配数表

int[] calculateMaxMatchLengths(String pattern) {
    int[] maxMatchLengths = new int[pattern.length()];
    int maxLength = 0;
    for (int i = 1; i < pattern.length(); i++) {
        while (maxLength > 0 && pattern.charAt(maxLength) != pattern.charAt(i)) {
            maxLength = maxMatchLengths[maxLength - 1]; // ①
        }
        if (pattern.charAt(maxLength) == pattern.charAt(i)) {
            maxLength++; // ②
        }
        maxMatchLengths[i] = maxLength;
    }
    return maxMatchLengths;
}
```
&emsp;&emsp;有了代码后，容易证明它的复杂度是线性的（即运算时间与模式串 pattern 的长度是线性关系）：由 ② 可以看出 maxLength 在整个 for 循环中最多增加 pattern.length() - 1 次，所以让 maxLength 减少的 ① 在整个 for 循环中最多会执行 pattern.length() - 1 次，从而 calculateMaxMatchLengths 的复杂度是线性的。<br><br>
&emsp;&emsp;KMP 匹配的过程和求最大匹配数的过程类似，从 count 值的增减容易看出它也是线性复杂度的：// 在文本 text 中寻找模式串 pattern，返回所有匹配的位置开头
```java
List<Integer> search(String text, String pattern) {
    List<Integer> positions = new ArrayList<>();
    int[] maxMatchLengths = calculateMaxMatchLengths(pattern);
    int count = 0;
    for (int i = 0; i < text.length(); i++) {
        while (count > 0 && pattern.charAt(count) != text.charAt(i)) {
            count = maxMatchLengths[count - 1];
        }
        if (pattern.charAt(count) == text.charAt(i)) {
            count++;
        }
        if (count == pattern.length()) {
            positions.add(i - pattern.length() + 1);
            count = maxMatchLengths[count - 1];
        }
    }
    return positions;
}
```
&emsp;&emsp;最后总结下这个算法：
1. 匹配失败时，总是能够让模式串回退到某个位置，使文本不用回退。
2. 在字符串比较时，模式串提供的信息越多，计算复杂度越低。
>（有兴趣的可以了解一下 Trie 树，这是文本提供的信息越多，计算复杂度越低的一个例子。）
## 转载:
>作者：灵茶山艾府<br>
>链接：https://www.zhihu.com/question/21923021/answer/37475572<br>
>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。