function Dice(nums, maxval, addon) {
  //随机数
  let ret = new Array();
  if (nums <= 0) {
    alert("骰子个数不能小于等于0");
    return 0;
  }
  if (maxval <= 0) {
    alert("最大值不能小于等于0");
    return 0;
  }
  //如果多于一个骰子，则输出所有的骰子数目
  //所以ret需要重新定义，还需要接入对应的格式显示函数
  for (i = 0; i < nums; i++) {
    let t = Math.round(1 + Math.random() * (maxval - 1));
    ret.push(t);
  }
  //ret.push(addon);
  return ret;
}

function arrayToPlus(nums) {
  //将Dice返回的内容转化为a+b+c的形式
  if (nums[0] == 0) {
    return 0;
  }
  let str = "";
  for (i = 0; i < nums.length; i++) {
    str += nums[i];
    if (i != nums.length - 1) {
      str += "+";
    }
  }
  return str;
}

function getDiceElement() {
  //和html对接
  let nums = document.getElementById("num").value;
  let maxval = document.getElementById("maxval").value;
  let addon = document.getElementById("addon").value;
  nums = Math.round(nums);
  maxval = Math.round(maxval);
  addon = Math.round(addon);
  let result = Dice(nums, maxval, addon); //结果数组
  //字符串拼接
  let str = nums + "d" + maxval;
  if (addon != 0) {
    str += "+" + addon;
  }
  str += "=" + arrayToPlus(result);
  if (addon != 0) {
    str += "+" + addon;
  }
  str += "=" + (eval(result.join("+")) + addon);

  document.getElementById("result").innerText = str;
}

function toPasteBoard() {
  //输出到剪贴板
  let text = document.getElementById("result").innerText;
  let input = document.createElement("input"); // 新增一个input
  input.style.position = "relative"; // 将它隐藏（注意不能使用display或者visibility，否则粘贴不上）
  input.style.zIndex = "-900px";
  document.body.appendChild(input); // 追加
  input.value = text; // 设置文本框的内容
  input.select(); // 选中文本
  document.execCommand("Copy");
  input.remove();
  alert("已复制到剪贴板");

}
