/*
 * ============================================================
 * 正则校验
 */

const check = {
  phone: function(phone){ // 手机号码校验
      var reg=/^1[3456789]\d{9}$/;
      var reg2=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{11}$/;
      if(phone !== '' && (reg.test(phone) || reg2.test(phone)))
      {
          return true;
      }
      return false;
  },
  password: function(pwd){ // 密码的强度必须包含大小写字母和数字的组合，不能使用特殊字符，长度最少8位
      let str = '';
      let reg = /[^]{6,}$/;
      if(!reg.test(pwd)){
          str = str + '最少6个字符;'
      }
      reg = /^[^]{0,12}$/;
      if(!reg.test(pwd)){
          str = str + '最多12个字符;'
      }
      // reg = /(?=[a-zA-z])/;
      // if(!reg.test(pwd)){
      //     str = str + '必须包含字母;'
      // }
      reg = /^[a-zA-Z0-9]+$/;
      if(!reg.test(pwd)){
          str = str + '只能使用字母和数字;'
      }
      return str;
  },
  idcard: function(idcard){ // 身份证校验
      var reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(idcard!=''&&reg.test(idcard))
      {
          return true;
      }
      return false;
  },
  price: function(price, miuns = false){ // 金额校验,是否可带负值
      var reg = miuns ? /(^-?[1-9]\d*(\.\d{1,2})?$)|(^-?0(\.\d{1,2})?$)/ : /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      if(price!=''&&reg.test(price)){
          return true;
      }
      return false;
  },
  price_input: function(price_now, price_old){ // 金额输入校验，配合watch监听是否回退
      if(price_now == '-') return true;
      if(price_now == '.') return '0.';
      if(price_now.slice(-2) == '..') return price_old
      if(price_now.slice(-1) == '.') return true // 多个'.'错误排除没做
      var reg=/(^-?[1-9]\d*(\.\d{1,2})?$)|(^-?0(\.\d{1,2})?$)/;
      if(price_now!=''&&reg.test(price_now)){
          return true;
      }
      return price_old.slice(0, -2);
  },
  email: function(email) {
      var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(email != '' && reg.test(email)){
          return true;
      }
      return false;
  }
}


/*
* ============================================================
* 格式化
*/
const format = {
  mobileHide: function(mobile) { // 手机号中间隐藏*
      return mobile.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
  },
  location: function(longitude, latitude) { // 经纬度转XX°XX′
      if (typeof longitude === 'string' && typeof latitude === 'string') {
          longitude = parseFloat(longitude)
          latitude = parseFloat(latitude)
      }
  
      longitude = longitude.toFixed(2)
      latitude = latitude.toFixed(2)
  
      return {
          longitude: longitude.toString().split('.'),
          latitude: latitude.toString().split('.')
      }
  },
  timing: function(time) { // 计时秒转00：00：00形态
      if (typeof time !== 'number' || time < 0) {
          return time;
      }
  
      let hour = parseInt(time / 3600);
      time = time % 3600;
      let minute = parseInt(time / 60);
      time = time % 60;
      let second = time;
  
      return ([hour, minute, second]).map(function (n) {
          n = n.toString();
          return n[1] ? n : '0' + n;
      }).join(':');
  },
  money: function (number, places, symbol = false, symstr = '￥', thousand, decimal) {
      number = number || 0;
      //保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数，否则默 认保留两位
      places = !isNaN(places = Math.abs(places)) ? places : 2;
      //symstr表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")
      symstr = symbol ? symstr : "";
      //thousand表示每几位用,隔开,是货币标识
      thousand = thousand || ",";
      //decimal表示小数点
      decimal = decimal || ".";
      //negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
      //i表示处理过的纯数字
      var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
      return symstr + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "￥1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
  },
  replace: function (text, imgBaseURL = null) {
      text = text.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, `<img$1`)
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, `<img$1`)
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, `<img$1`)
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, `<img$1`)
          .replace(/<img/ig, `<img class="article__img"`)
          
          .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, `<p`)
          .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, `<p`)
          .replace(/<p/ig, `<p class="article__p"`);
      if(imgBaseURL){
          text = text.replace(/(<img.*?src=['"])((?!http)(.*?['"]))/ig, `$1` + imgBaseURL + `$2`);
      }
      return text;
  },
  replaceFull: function (text, imgBaseURL = null) {
      text = text.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, `<img$1`)
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, `<img$1`)
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, `<img$1`)
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, `<img$1`)
          .replace(/<img/ig, `<img class="article__full"`)
          
          .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, `<p`)
          .replace(/<p([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, `<p`)
          .replace(/<p/ig, `<p class="article__p"`);
      if(imgBaseURL){
          text = text.replace(/(<img.*?src=['"])((?!http)(.*?['"]))/ig, `$1` + imgBaseURL + `$2`);
      }
      return text;
  }
}

const dateUtils = { // 时间转换xx天前、xx小时前、刚刚
  UNITS: {
      '年': 31557600000,
      '月': 2629800000,
      '天': 86400000,
      '小时': 3600000,
      '分钟': 60000,
      '秒': 1000
  },
  humanize: function (milliseconds) { // 需优化：从秒开始对比
      let humanize = '';
      for (let key in this.UNITS) {
          if (milliseconds >= this.UNITS[key]) {
              humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
              break;
          }
      }
      return humanize || '刚刚';
  },
  parse: function (str) { // 将"yyyy-MM-dd HH:mm:ss"格式的字符串，转化为一个Date对象
      let a = str.split(/[^0-9]/);
      return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  },
  formatYear: function (dateStr) { // 转换XX时间前、去除秒（通知使用）
      let date = this.parse(dateStr)
      let diff = Date.now() - date.getTime();
      return this.humanize(diff);
  },
  format: function (dateStr) { // 转换XX时间前，天以内转换、去除秒(文章使用)
      let date = this.parse(dateStr)
      let diff = Date.now() - date.getTime();
      if (diff < this.UNITS['天']) {
          return this.humanize(diff);
      }
      let _format = function (number) {
          return (number < 10 ? ('0' + number) : number);
      };
      return date.getFullYear() + '/' + 
          _format(date.getMonth() + 1) + '/' + 
          _format(date.getDate()) + ' ' +
          _format(date.getHours()) + ':' + 
          _format(date.getMinutes());
  },
  formatStr: function (format = 'yyyy/MM/dd HH:mm:ss') { // 当前时间转化为参数（"yyyy/MM/dd HH:mm:ss"）格式的字符串
      let date = new Date();
      let o = {
          "M+": date.getMonth() + 1, //月份 
          "d+": date.getDate(), //日 
          "H+": date.getHours(), //小时 
          "m+": date.getMinutes(), //分 
          "s+": date.getSeconds(), //秒 
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
          "S": date.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      } 
      for (let k in o){
          if(new RegExp("(" + k + ")").test(format)){
              format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
      }   
      return format;
  }
};


/**
* ============================================================
* @desc 函数防抖
* @param func 函数
* @param wait 延迟执行毫秒数
* @param delay true 表立即执行，false 表非立即执行
*/

function debounce(fn, wait = 300, delay = false) {
  let timer;

  return function () {
      var that = this;
      var args = arguments;
      if (timer) clearTimeout(timer);
      if (delay) {
          var callNow = !timer;
          timer = setTimeout(() => {
              timer = null;
          }, wait)
          if (callNow) fn.apply(that, args)
      }
      else {
          timer = setTimeout(function(){
              fn.apply(that, args)
          }, wait);
      }
  }
}

/**
* ============================================================
* @desc 函数节流
* @param func 函数
* @param wait 延迟执行毫秒数
* @param type 1 表时间戳版，2 表定时器版
* 时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。
*/

function throttle(func, wait ,type) {
  if(type===1){
      let previous = 0;
  }else if(type===2){
      let timeout;
  }
  return function() {
      let context = this;
      let args = arguments;
      if(type===1){
          let now = Date.now();

          if (now - previous > wait) {
              func.apply(context, args);
              previous = now;
          }
      }else if(type===2){
          if (!timeout) {
              timeout = setTimeout(() => {
                  timeout = null;
                  func.apply(context, args)
              }, wait)
          }
      }
  }
}

/**
* ============================================================
* @desc 对象深拷贝
*/
function deepClone(source){
const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
for(let keys in source){ // 遍历目标
  if(source.hasOwnProperty(keys)){
    if(source[keys] && typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    }else{ // 如果不是，就直接赋值
      targetObj[keys] = source[keys];
    }
  }
}
return targetObj;
}

function writeFile(filename,filecontent){
  var fso, f, s ;
  fso = new ActiveXObject('Scripting.FileSystemObject');
  f = fso.OpenTextFile(filename, 8, true);
  f.WriteLine(filecontent);
  f.Close();
}


module.exports = {
  check: check,
  format: format,
  dateUtils: dateUtils,
  debounce: debounce,
  throttle: throttle,
  deepClone: deepClone,
  writeFile: writeFile
}