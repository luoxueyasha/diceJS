var toClip = "";

function getDiceElement() {
  //和html对接
  //update：加入时间戳
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
  if (result.length <= 20) {
    //骰子详细数值的显示
    str += "=" + arrayToPlus(result);

    if (addon != 0) {
      str += "+" + addon;
    }
  }
  str += "=" + (eval(result.join("+")) + addon);
  str += "\n本次随机的时间为：";
  let d = +new Date(); //get minsec - plus/minus deal to values not number
  d = timestampToTime(d);
  str += d;
  console.log(str);
  document.getElementById("result").innerText = str;
  toClip = str;
}

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
  if (nums > 100) {
    alert("一次投掷的骰子太多了");
    return 0;
  }
  if (maxval > 3000) {
    alert("单个骰子的数值太大了");
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
  if (nums.length <= 20) {
    for (i = 0; i < nums.length; i++) {
      //逐个增加
      str += nums[i];
      if (i != nums.length - 1) {
        str += "+";
      }
    }
  }
  return str;
}

function toPasteBoard() {
  //输出到剪贴板
  document.getElementById("result").innerText = toClip;
  //let text = document.getElementById("result").innerText;
  let input = document.createElement("textarea"); // 新增一个input
  //input无法换行 换为textarea
  input.style.position = "relative"; // 将它隐藏（注意不能使用display或者visibility，否则粘贴不上）
  input.style.zIndex = "-900px";
  document.body.appendChild(input); // 追加
  input.value = toClip; // 设置文本框的内容
  input.select(); // 选中文本
  document.execCommand("Copy");
  input.remove();
  //alert("已复制到剪贴板");
  document.getElementById("result").innerText =
    "已复制到剪贴板！\n" + document.getElementById("result").innerText;
}

//from https://www.cnblogs.com/lyxzxp/p/11280776.html
//if the original author declares this as not suitable to GPLv2, please contact me
var strDate = "";

function timestampToTime(timestamp) {
  var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s =
    (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()) +
    ".";
    //millisec
  var ms =
    date.getMilliseconds() < 100
      ? date.getMilliseconds() < 10
        ? "00" + date.getMilliseconds()
        : "0" + date.getMilliseconds()
      : date.getMilliseconds();
  strDate = Y + M + D + h + m + s + ms;
  return strDate;
}
