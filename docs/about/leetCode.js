
// 两数之和 
var twoSum = function(nums, target) {
  // 定义哈希表存储 value:nums[i] key:i
  const map = {}
  // 遍历数组 将数组下标 值,push进哈希表 检索哈希表，如果存在 taget-nums[i]这个value就直接返回结果
  for (let i = 0;i < nums.length;i++){
      if(map[target-nums[i]] !== undefined){
          return [map[target-nums[i]],i]
      }
      map[nums[i]]=i
  }
  
};


// 最大字符串
var lengthOfLongestSubstring = function(s) {
  // map记录每个字母出现的最后位置
  const map = {};
  let max = 0;
  let cur = 0;
  for(let i=0;i<s.length;i++){
      // i-cur是当前子串的起始位置
      if(map[s[i]] !== undefined && map[s[i]]>i-cur-1 ){
          cur = i-map[s[i]];
      }else{
          cur++;
          if(cur>max){
              max = cur;
          }
      }
      map[s[i]] = i;
  }
  return max;
};
