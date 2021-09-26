/*!
 * =====================================================
 * saqqdy.js for mobile v1.0.0 (http://www.saqqdy.com)
 * =====================================================
 */

//常用正则
var pattern = {
  any:/[\w\W]+/,
  number:/^\d+$/,
  string:/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
  postcode:/^[0-9]{6}$/,
  url:/^(\w+:\/\/)?\w+(\.\w+)+.*$/,
  username:/^[a-zA-Z0-9\_\-\.]{3,15}$/,
  float:/^[0-9]+\.{0,1}[0-9]{0,2}$/,
  email:/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
  //mobile:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[6|7|8]|18[0-9])\d{8}$/,
  //mobile:/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
  mobile:/^1[3|4|5|6|7|8|9][0-9]\d{8,8}$/,
  chinese:/^[\u4E00-\u9FA5\uf900-\ufa2d]$/,
  tel:/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
  qq:/^[1-9][0-9]{5,13}$/,
  pass:/^(?![0-9\W\_]+$)(?![a-zA-Z\W\_]+$)[0-9a-zA-Z\W\_]{6,16}$/,
  json:/^\{[\s\S]*\}$/,
  arrjson:/^\[\{[\s\S]*\}\]$/,
  array:/^\[[\s\S]*\]$/,
  getjson:/[\s\S]*(\{[\s\S]*\})[\s\S]*/,
  textarea:/^[\u4e00-\u9fa5_a-zA-Z0-9\s\,\.\/\?\;\:\'\"\[\]\-\*\(\)\（\）\%\$\@\\\!\，\《\》\。\、\？\；\：\‘\’\“\”\…\￥\！]+$/,
  textareaS:/^[\u4e00-\u9fa5_a-zA-Z0-9\s\,\.\?\;\:\'\"\-\(\)\（\）\!\，\《\》\。\、\？\；\：\‘\’\“\”\…\！]+$/,
  repArticleHouse:/([\s\S]*)\{\{\{articleHouse\}\}\}([\s\S]*)/
}
////判断是否IE内核
//if(client.ver.trident){}
////判断是否webKit内核
//if(client.ver.webKit){}
////判断是否移动端
//if(client.ver.mobile||client.ver.android||client.ver.ios){}

//检测浏览器语言
//currentLang = navigator.language;   //判断除IE外其他浏览器使用语言
//if(!currentLang){//判断IE浏览器使用语言
//  currentLang = navigator.browserLanguage;
//}
//alert(currentLang);

/* 客户端判断结束----------------------------------------------------------------------- */

// start JS重要功能扩展================
//获取数组最大值
Array.prototype.max = function(){
  return Math.max.apply({},this);
};
//获取数组最小值
Array.prototype.min = function(){
  return Math.min.apply({},this);
};
//扩展replaceAll功能
String.prototype.replaceAll = function(reallyDo,replaceWith,ignoreCase){
  if (!RegExp.prototype.isPrototypeOf(reallyDo)){
    return this.replace(new RegExp(reallyDo,(ignoreCase ? "gi" : "g")),replaceWith);
  }else{
    return this.replace(reallyDo,replaceWith);
  }
}
//判断屏幕大小

//获取APP版本号
function getAppVersion(appName,withappstr){//console.log(getAppVersion("Chrome"));
  var userAgent = navigator.userAgent;
  var reg = eval("/" + appName + "\\/([\\d\\.]+)/");
  var isApp = userAgent.indexOf(appName) > -1;
  var ver = userAgent.match(reg,"i");
  // console.log(userAgent)
  // console.log(ver)
  // withappstr = typeof(withappstr) != "undefined" ? withappstr : false;
  if(ver){
    if(withappstr){//需要带上app名称，完整输出
      return ver ? ver[0] : "";
    }else{
      return ver ? ver[1] : "";
    }
  }else{
    if(isApp){//是指定客户端但是版本号未知
      console.log(appName + "未知版本号");
      return false;
    }else{//不是指定客户端
      console.log(appName + "不存在");
      return null;
    }
  }
}

//版本号大小对比
function getIsAppVersionLastest(appName,compareVer){//console.log(getIsAppVersionLastest("Chrome","5.1"));
  var basicVer = (appName.indexOf(".") > 0) ? appName : getAppVersion(appName,false);//兼容getIsAppVersionLastest("1.2.2","1.2.3")直接传入版本号的对比
  // var basicVer = "5.1.";
  if(basicVer === null){return null;}//不是指定客户端
  if(basicVer === false){return false;}//是指定客户端但是版本号未知
  basicVer = basicVer + ".";
  compareVer = compareVer + ".";
  var bStr = parseFloat(basicVer);
  var cStr = parseFloat(compareVer);
  var bStrNext =  parseFloat(basicVer.replace(bStr + ".","")) || 0;
  var cStrNext =  parseFloat(compareVer.replace(cStr + ".","")) || 0;
  if(cStr > bStr){
    return false;
  }else if(cStr < bStr){
    return true;
  }else{
    if(bStrNext >= cStrNext){
      return true;
    }else{
      return false;
    }
  }
}

//获取滑动到顶部和底部 返回'top' 'bottom'
var getScrollPosition = function(){
  var innerH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var docScrollTop = document.documentElement.scrollTop;
  var bodyScrollTop = document.body.scrollTop;
  var docScrollHeight = document.documentElement.scrollHeight;
  var bodyScrollHeight = document.body.scrollHeight;
  var scrollT = 0, scrollH = 0;
  if(docScrollTop === 0){
    scrollT = bodyScrollTop;
    scrollH = bodyScrollHeight;
    if(bodyScrollTop === 0){
      return 'top';
    }
  }else{
    scrollT = docScrollTop;
    scrollH = docScrollHeight;
  }
  // if(bodyScrollTop === 0 && docScrollTop === 0){
  //   return 'top';
  // }
  if(innerH + Math.floor(scrollT) === scrollH || innerH + Math.ceil(scrollT) === scrollH){
    return 'bottom';
  }
}

//扩展文件加载完毕方法
/*Object.prototype.saOnload = function(fn){
	this.onload = this.onreadystatechange = function(){
		if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
			return(true);
		}else{return false;}
	};
}*/
function saOnload(obj,fn){
  obj.onload = obj.onreadystatechange = function(){
    if (!obj.readyState || obj.readyState == 'loaded' || obj.readyState == 'complete'){
      fn();
    }
  };
};
//扩展图片自动适应多种分辨率small original
String.prototype.imgadapt = function(str){
  var imgPre = "";
  var urlReg = new RegExp("(.jpg|.png|.gif|.jpeg|.bmp|.webx)$","i");
  var preReg = new RegExp("([.small|.original].jpg|.png|.gif|.jpeg|.bmp|.webx)$","i");//匹配.small.jpg .original.jpg
  switch (str){
    case "s":imgPre = ".small";break;
    case "m":imgPre = "";break;
    case "l":imgPre = ".original";break;
    default:break;
  }
//	return this.replace(preReg,"").replace(urlReg,"$1" + imgPre + "$1");
  return this.replace(urlReg,"$1" + imgPre + "$1");
}
//扩展图片自动适应多种分辨率@2x @3x
String.prototype.imgchoose = function(){
  var width = window.innerWidth,imgPre = "";
  var urlReg = new RegExp("(.jpg|.png|.gif|.jpeg|.bmp)","i");
  var preReg = new RegExp("(@[2|3]x)","i");//匹配@2x @3x
  if(width >= 480){
    imgPre = "@3x";
  }else if(width >= 320){
    imgPre = "@2x";
  }else if(width >= 240){
    imgPre = "";
  };
  return this.replace(preReg,"").replace(urlReg,imgPre + "$1");
}
/* 扩展图片自动适应多种分辨率@2x @3x */
function imgtagadapt(){
  var img = $("img.imgchoose");
  img.each(function(){
    var imgurl = $(this).prop("src");
    var lazyurl = $(this).attr("data-original");
    $(this).prop("src",imgurl.imgchoose());
    if(lazyurl != "" && lazyurl != null){
      $(this).attr("data-original",lazyurl.imgchoose());
    };
  });
}
imgtagadapt();

//扩展trim(),ltrim(),rtrim()去除字符串两端空格
String.prototype.trim=function(){
  return this.replace(/(^\s*)|(\s*$)/g,"");
}
String.prototype.ltrim=function(){
  return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
  return this.replace(/(\s*$)/g,"");
}
//去除字符串中间空格
String.prototype.ctrim=function(){
  return this.replace(/\s/g,'');
}
//扩展delHtmlTag()去除HTML标签及标签里面的文字
String.prototype.delHtmlTag=function(){
  return this.replace(/<[^>]+>/g,"");
}
//去除换行
String.prototype.clearBr=function(){
  return this.replace(/<\/br>/g,"").replace(/<br>/g,"").replace(/[\r\n]/g,"");
  //return this.replace(/<\/?.+?>/g,"").replace(/[\r\n]/g,"");
}
//去除HTML标签
String.prototype.clearHtml=function(){
  //return this.replace(/<\/br>/g,"").replace(/<br>/g,"").replace(/[\r\n]/g,"");
  return this.replace(/<\/?.+?>/g,"").replace(/[\r\n]/g,"");
}
//去除HTML标签及空格、换行
String.prototype.clearHtmlNS = function(){
  return this.replace(/<\/?.+?>|[\r\n\s]|(\ )/g,"");//.replace(/<\/?.+?>|[\r\n\s]|\&nbsp\;/g,"");
}
//去除HTML标签及空格（多个空格合并一个）、换行
String.prototype.clearHtmlNS1 = function(){
  return this.replace(/<\/?.+?>|[\r\n]/g,"").replace(/(\s)|(\&[nbsp]\;){2,}/g," ");//还有点问题没解决-----------------------------------
}
//去除HTML标签及换行
String.prototype.clearHtmlN = function(){
  return this.replace(/<\/?.+?>|[\r\n]/g,"");
}
//去除HTML标签保留空格、换行
String.prototype.clearHtmlExpSN = function(){
  return this.replace(/<\/?[^\/?(br)][^><]*>/ig,"");
}
//去除HTML标签所有属性
String.prototype.clearAttr = function(){
  return this.replace(/<([a-zA-Z1-7]+)\s*[^><]*>/g,"<$1>");
}
//用%26替换&
String.prototype.replacePamCode=function(){
  return this.replace(/[&]/ig,"%26");
}
//用^替换&
String.prototype.replacePamCodeByArr=function(){
  return this.replace(/[&]/ig,"^");
}
//用&替换^
String.prototype.replaceArrByPamCode=function(){
  return this.replace(/[\^]/ig,"&");
}
//用~替换=
String.prototype.replaceEqualByWave=function(){
  return this.replace(/[=]/ig,"~");
}
//用=替换~
String.prototype.replaceWaveByEqual=function(){
  return this.replace(/[~]/ig,"=");
}
//用%3d替换=
String.prototype.replaceEqualCode=function(){
  return this.replace(/[=]/ig,"%3d");
}

//获取字符串中的数字
String.prototype.getNumber=function(){
  return this.replace(/[^0-9.]/ig,"");
}

//是否为由数字组成的字符串
function is_digitals(str){
  var reg=/^[0-9]*$/;//匹配整数
  return reg.test(str);
}

//日期格式化插件
//使用方式：var date1 = new Date().format("yyyy-MM-dd");
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//使用方式：
$.fn.formatTime = function(options){
  var defaults = {
    to: "yyyy-MM-dd",
    attr: "formatTime"
  };
  var opts = $.extend(defaults, options);
  /*var now = new Date().getTime();
if (!old||old<1000){
  return;
}
  var t = now - old*1000;
  var newTimeStr = "";
  if (t<1000*60*2){
      newTimeStr = "刚刚";
  } else if (t < 1000*60*60){
      newTimeStr = parseInt(t/(1000*60))+"分钟前";
  } else if (t < 1000*60*60*24){
      newTimeStr = parseInt(t/(1000*60*60))+"小时前";
  } else if (t < 1000*60*60*24*30){
      newTimeStr = parseInt(t/(1000*60*60*24))+"天前";
  } else {
      newTimeStr = new Date(old*1000).format(opts.to);
  }*/
  return this.each(function () {
    var $this = $(this);
    var old = $this.attr(opts.attr);
    var newTimeStr = formatTime(old);
    $this.html(newTimeStr);
  });
}
//格式化成：刚刚、几分钟前。。。
function formatTime(time,fmt){
  var now = new Date().getTime();
  var format = fmt != "" && fmt != null ? fmt : "MM-dd";
  var old = time;
  if (!old || old < 1){
    return;
  }
  var t = now - old;
  var newTimeStr = "";
  if (t < 60*2){
    newTimeStr = "刚刚";
  } else if (t < 60*60){
    newTimeStr = parseInt(t/(60))+"分钟前";
  } else if (t < 60*60*24){
    newTimeStr = parseInt(t/(60*60))+"小时前";
  } else if (t < 60*60*24*30){
    newTimeStr = parseInt(t/(60*60*24))+"天前";
  } else {
    newTimeStr = new Date(old).format(format);
  }
  return newTimeStr;
}
// end JS重要功能扩展================


function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    //为每一个事件处理函数分派一个唯一的ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++;
    //为元素的事件类型创建一个哈希表
    if (!element.events) element.events = {};
    //为每一个"元素/事件"对创建一个事件处理程序的哈希表
    var handlers = element.events[type];
    if (!handlers) {
      handlers = element.events[type] = {};
      //存储存在的事件处理函数(如果有)
      if (element["on" + type]) {
        handlers[0] = element["on" + type];
      }
    }
    //将事件处理函数存入哈希表
    handlers[handler.$$guid] = handler;
    //指派一个全局的事件处理函数来做所有的工作
    element["on" + type] = handleEvent;
  }
}
// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else {
    //从哈希表中删除事件处理函数
    if (element.events && element.events[type]) {
      delete element.events[type][handler.$$guid];
    }
  }
}

function handleEvent(event) {
  var returnValue = true;
  //抓获事件对象(IE使用全局事件对象)
  event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
  //取得事件处理函数的哈希表的引用
  var handlers = this.events[event.type];
  //执行每一个处理函数
  for (var i in handlers) {
    this.$$handleEvent = handlers[i];
    if (this.$$handleEvent(event) === false) {
      returnValue = false;
    }
  }
  return returnValue;
}

//为IE的事件对象添加一些“缺失的”函数
function fixEvent(event) {
  //添加标准的W3C方法
  event.preventDefault = fixEvent.preventDefault;
  event.stopPropagation = fixEvent.stopPropagation;
  return event;
};
fixEvent.preventDefault = function() {
  this.returnValue = false;
};
fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
};

/* 阻止默认事件 */
function stopDefault(e){
  if(e && e.preventDefault){
    e.preventDefault();
  }else{
    window.event.returnValue = false;
  };
  return false;
};

/* 阻止冒泡 */
function stopBubble(e){
  if(e && e.preventDefault){// Firefox
    e.stopPropagation();//e.preventDefault();
  }else{// IE
    evt.cancelBubble = true;//evt.returnValue = false;
  };
  return false;
};

/* 获取URL参数 */
/*function getUrlParam(url){
	var urlStr = url != "" && url != null ? url.substr(url.indexOf("?")) : location.search;//获取url中"?"符后的字串
	var urlParam = [];
	if(urlStr.indexOf("?") != -1){
		var str = urlStr.substr(1);
		var strs = str.split("&");
		for(var i = 0;i < strs.length;i++){
			//urlParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			urlParam[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		};
	};
	return urlParam;
}*/



/* 获取URL参数 */
function getUrlParam(url){
  var urlStr = (url != "" && typeof(url) != "undefined") ? url.substr(url.indexOf("?")) : location.search;//获取url中"?"符后的字串
  var urlParam = [];
  if(urlStr.indexOf("?") != -1){
    var str = urlStr.substr(1);
    var strs = str.split("&");
    for(var i = 0;i < strs.length;i++){
      //urlParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      urlParam[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    };
  };
  return urlParam;
}
//console.log(getUrlParam(location.href))

/* 获取单个URL参数 */
function getParameter(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null) return unescape(r[2]); return null;
}
//console.log(getParameter("pon"))

/* 获取目录形式URL参数 */
function getDirParam(url){
  var patt = new RegExp(/^http[s]?:\/\/[^\/]+([\s\S]*)/);
  var urlStr = (url != "" && typeof(url) != "undefined") ? url.replace(patt,"$1") : location.pathname;//获取url中域名后的字串:/post/0703/a1.html
  urlStr = urlStr.replace(/^\//,"");
  var dirParam = {};
  dirParam.host = (url != "" && typeof(url) != "undefined") ? url.match(/^http[s]?:\/\/[^\/]+/)[0] : location.host;//获取域名，包含http://
  if(urlStr.indexOf("/") != -1){
    //dirParam = unescape(urlStr).split("/");
    dirParam.path = decodeURI(urlStr).split("/");
  };
  //console.log(JSON.stringify(dirParam))
  return dirParam;//{"host":"http://192.168.2.243:7004","path":["media","video","chidaoyan.mp4"]}
}
//console.log(getDirParam("http://192.168.2.243:7004/post/0703/a1.html"))

/* 获取字符串形式URL参数 /post-07-03-a1.html*/
function getStrParam(url,chr){
  chr = chr || "-";
  var patt = new RegExp(/^http[s]?:\/\/[^\/]+[\s\S]*(\/[\s\S]*)\.[\s\S]*/);
  var urlStr = (url != "" && typeof(url) != "undefined") ? url.replace(patt,"$1") : location.pathname;//获取url中域名后的字串:/post/0703/a1.html
  urlStr = urlStr.replace(/^\//,"");
  //console.log(urlStr)
  var dirParam = {};
  dirParam.host = (url != "" && typeof(url) != "undefined") ? url.match(/^http[s]?:\/\/[^\/]+/)[0] : location.host;//获取域名，包含http://
  if(urlStr.indexOf(chr) != -1){
    //dirParam = unescape(urlStr).split("/");
    dirParam.path = decodeURI(urlStr).split(chr);
  }
  //console.log(JSON.stringify(dirParam))
  return dirParam;//{"host":"http://192.168.2.243:7004","path":["media","video","chidaoyan.mp4"]}
}
//console.log(getStrParam("http://192.168.2.243:7004/post/0703/a1-66_778-gfgf.html"))

/* 文件后缀名 */
function getFileType(url){
  if(typeof(url) != "string" || url == ""){return false;}
  var type = /\.[^\.]+$/.exec(url);//[".docx", index: 31, input: "http://192.168.2.243:7005/doc/2.docx"]
  return type[0].toLowerCase();
}

/* 获取文本长度，中文算2个字节 */
function getCHSLength(str){
  var chineseRegex = /[^\x00-\xff]/g;
  var strLength = str.replace(chineseRegex, "**").length;
  return strLength;
}
/* 截取字符串，中文算2个字节 */
function cutCHSString(str, len, hasDot) {
  if(str == "" || !str){
    return "";
  }else{
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for(var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if(singleChar.match(chineseRegex) != null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if(newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if(hasDot && strLength > len) {
      newStr += "...";
    }
    return newStr;
  }
}

//是否存在指定函数
function isExitsFunction(funcName) {
  try {
    if(typeof(eval(funcName)) == "function") {
      return true;
    }
  } catch(e) {}
  return false;
}

//是否存在指定变量
function isExitsVariable(variableName) {
  try {
    if(typeof(variableName) == "undefined") {
      //alert("value is undefined");
      return false;
    } else {
      //alert("value is true");
      return true;
    }
  } catch(e) {}
  return false;
}

function hasClass(dom,className){//模仿jquery的hasClass方法，判断是否有某个样式
  className = className.replace(/^\s|\s$/g, "");
  return(
    " " + ((dom || {}).className || "").replace(/\s/g, " ") + " "
  ).indexOf(" " + className + " ") >= 0
}








//获取浏览器窗口大小------------------------------------------------------
function saWindowHeight(){
  var screen_height = 0;//获取窗口高度
  if(window.innerHeight){
    screen_height = window.innerHeight;
  }else if((document.body) && (document.body.clientHeight)){
    screen_height = document.body.clientHeight;
  };//通过深入Document内部对body进行检测，获取窗口大小
  if(document.documentElement && document.documentElement.clientHeight){
    screen_height = document.documentElement.clientHeight;
  };//var screen_height = document.documentElement.clientHeight;
  return screen_height;
};
function saWindowWidth(){
  var screen_width = 0;//获取窗口宽度
  if(window.innerWidth){
    screen_width = window.innerWidth;
  }else if((document.body) && (document.body.clientWidth)){
    screen_width = document.body.clientWidth;
  };//通过深入Document内部对body进行检测，获取窗口大小
  if(document.documentElement && document.documentElement.clientWidth){
    screen_width = document.documentElement.clientWidth;
  };//var screen_width = document.documentElement.clientWidth;
  return screen_width;
};
//end获取浏览器窗口大小=================


//start cookis操作------------------------------------------------------
//写sessionStorage
function setSessionStorage(name,value,time){
  var strsec = getsec(time);
  var exp = new Date();
  var expires = strsec ? (exp.getTime() + strsec) : "";
  var obj = {};
  obj.value = value;
  obj.expires = expires;
  obj = encodeURIComponent(JSON.stringify(obj));
  sessionStorage.setItem(name,obj);
};
//读取sessionStorage
function getSessionStorage(name){
  var str = sessionStorage.getItem(name);
  var exp = new Date();
  if(str){
    var obj = JSON.parse(decodeURIComponent(str));
    if(!obj.hasOwnProperty("value") || !obj.hasOwnProperty("expires")){
      return null;
    }else{
      if(!obj.expires || obj.expires > exp.getTime()){
        return obj.value;
      }else{
        sessionStorage.removeItem(name);
        return null;
      }
    }
    //return (obj.expires > exp.getTime() ? obj.value : null);
  }else{
    return null;
  };
};
//删除sessionStorage
function delSessionStorage(name){
  sessionStorage.removeItem(name);
};
//写localStorage
function setLocalStorage(name,value,time){
  var strsec = getsec(time);
  var exp = new Date();
  var expires = strsec ? (exp.getTime() + strsec) : "";
  var obj = {};
  obj.value = value;
  obj.expires = expires;
  obj = encodeURIComponent(JSON.stringify(obj));
  localStorage.setItem(name,obj);
};
//读取localStorage
function getLocalStorage(name){
  var str = localStorage.getItem(name);
  var exp = new Date();
  if(str){
    var obj = JSON.parse(decodeURIComponent(str));
    if(!obj.hasOwnProperty("value") || !obj.hasOwnProperty("expires")){
      return null;
    }else{
      if(!obj.expires || obj.expires > exp.getTime()){
        return obj.value;
      }else{
        localStorage.removeItem(name);
        return null;
      }
    }
    //return (obj.expires > exp.getTime() ? obj.value : null);
  }else{
    return null;
  };
};
//删除localStorage
function delLocalStorage(name){
  localStorage.removeItem(name);
};


//写cookies
function setCookie(name,value,time){
  var strsec = getsec(time);
  var exp = new Date();
  var expires = strsec ? (exp.getTime() + strsec) : "";
  var obj = {};
  obj.value = value;
  obj.expires = expires;
  obj = encodeURIComponent(JSON.stringify(obj));
  if(window.localStorage){
    localStorage.setItem(name,obj);
  }else{
    strsec = (strsec ? strsec : 2592000);//没有设定时间的默认30天
    // var strsec = getsec(time);
    // var exp = new Date();
    // value = (typeof(value) == "object" ? JSON.stringify(value) : value);
    exp.setTime(exp.getTime() + strsec*1000);
    document.cookie = name + "="+ obj + ";expires=" + exp.toGMTString() + ";path=/";
  }
};
//读取cookies
function getCookie(name){
  if(window.localStorage){
    var str = localStorage.getItem(name);
    var exp = new Date();
    if(str){
      var obj = JSON.parse(decodeURIComponent(str));
      if(!obj.hasOwnProperty("value") || !obj.hasOwnProperty("expires")){
        return null;
      }else{
        if(!obj.expires || obj.expires > exp.getTime()){
          return obj.value;
        }else{
          localStorage.removeItem(name);
          return null;
        }
      }
      //return (obj.expires > exp.getTime() ? obj.value : null);
    }else{
      return null;
    };
  }else{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
      var obj = JSON.parse(decodeURIComponent(arr[2]));
      if(!obj.hasOwnProperty("value") || !obj.hasOwnProperty("expires")){
        return null;
      }else{
        return obj.value;
      }
    }else{
      return null;
    };
  }
};
//删除cookies
function delCookie(name){
  if(window.localStorage){
    localStorage.removeItem(name);
  }else{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1000);
    var cval=getCookie(name);
    if(cval!=null){
      document.cookie= name + "="+cval+";expires="+exp.toGMTString() + ";path=/";
    }
  }
};
//程序代码
function getsec(str){
  if(!str){
    return "";
  }else{
    var str1 = str.substring(1,str.length)*1;
    var str2 = str.substring(0,1);
    if(str2 == "s"){
      return str1*1000;
    }else if(str2 == "h"){
      return str1*60*60*1000;
    }else if(str2 == "d"){
      return str1*24*60*60*1000;
    };
  }
};
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//end cookis操作------------------------------------------------------


/* 重置alert方法 */
function sa_alert(msg){
  var iframe = document.createElement("IFRAME");
  iframe.style.display="none";
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(msg);
  iframe.parentNode.removeChild(iframe);
};



//图片加载
/*var imgdefereds = [];
$('img').each(function(){
	var dfd = $.Deferred();
	$(this).bind('load',function(){
		dfd.resolve();
	}).bind('error',function(){
	//图片加载错误，加入错误处理
	// dfd.resolve();
	})
	if(this.complete) setTimeout(function(){
		dfd.resolve();
	},1000);
	imgdefereds.push(dfd);
})
$.when.apply(null,imgdefereds).done(function(){
	callback();
});*/


/*var t_img; // 定时器
var isLoad = true; // 控制变量
// 判断图片加载状况，加载完成后回调
isImgLoad(function(){
    // 加载完成

});

// 判断图片加载的函数
function isImgLoad(callback){
	// 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
	// 查找所有封面图，迭代处理
	$('.lazy').each(function(){
	// 找到为0就将isLoad设为false，并退出each
		if(this.height === 0){
			isLoad = false;
			return false;
		}
	});
	// 为true，没有发现为0的。加载完毕
	if(isLoad){
		clearTimeout(t_img); // 清除定时器
		// 回调函数
		callback();
		// 为false，因为找到了没有加载完成的图，将调用定时器递归
	}else{
		isLoad = true;
		t_img = setTimeout(function(){
		isImgLoad(callback); // 递归扫描
		},500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
	}
}*/


(function($){
  $.fn.extend({
    //重置alert方法v1.0.2015.12.31-----------------------------------------------------------
    sa_alert:function(opt,callback){
      if(!opt)opt = {};

    }
  })
})(jQuery)


//获取字符串长度，中文算2个字符
var getStrLen = function(str){
  var realLength = 0,len = str.length,charCode = -1;
  for (var i = 0;i < len; i++){
    charCode = str.charCodeAt(i);
    if(charCode >= 0 && charCode <= 128){
      realLength += 1;
    }else{
      realLength += 2;
    }
  };
  return realLength;
};
/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
function cutStrLen(str,len){
  var str_length = 0;
  //var a = 0;
  var str_len = str.length;
  var str_cut = new String();
  for(var i = 0;i < str_len;i++){
    a = str.charAt(i);
    str_length++;
    if(escape(a).length > 4){//中文字符的长度经编码之后大于4
      str_length++;
    }
    str_cut = str_cut.concat(a);
    if (str_length >= len){
      str_cut = str_cut.concat("...");
      return str_cut;
    }
  }
  //如果给定字符串小于指定长度，则返回源字符串；
  if (str_length < len){
    return str;
  }
}


$(document).ready(function(e){
  //解决tap穿透的问题
  //FastClick.attach(document.body);
  //var attachFastClick = Origami.fastclick;
  //attachFastClick(document.body);
  //设置artDialog最大宽度
  // $(".ui-dialog-grid").css({"maxWidth":300+"px"});

});




//label标签加for
//ios系统有问题
/*$(".mui-input-row").each(function(index,element){
	var label = $(this).find("label");
	var ipt = $(this).find("input").eq(0);
	if(label.prop("for") != "" || client.ver.ios){return false;}
	if(ipt.prop("id") != "" && ipt.prop("id") != null){
		label.prop("for",ipt.prop("id"));
	}else{
		ipt.prop("id","sa-" + ipt.prop("type") + "-" + index);
		label.prop("for","sa-" + ipt.prop("type") + "-" + index);
	};
//	if(ipt.prop("placeholder") != "" && ipt.prop("placeholder") != null && ipt.prop("readonly") != null){
//
//	}else{
//		ipt.prop("placeholder",label.text());
//	};
});*/















