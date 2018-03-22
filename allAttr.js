/* 扩展JQuery方法
*用法：$(selector).allAttr();
*返回第一个匹配的元素的一个包含属性、属性值键值对集合的对象
*需要注意，HTML元素属性不区分大小写
*/
$.fn.allAttr = function () {
  var attr = this.get(0).attributes;
  var attrArr = [];
  var attrObj = {};
  for ( key in attr ){
      attrArr.push( attr[key] );
  }
  for ( var i = 0; i < attrArr.length; i++ ) {
      if ( attrArr[i].nodeName ) {
          attrObj[attrArr[i].nodeName] = attrArr[i].value;
      }
  }
  return attrObj;
}
