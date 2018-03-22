/*
*扩展String的方法，用法：
*String.render(context);
*String形如'<div class="{{titleClass}}">{{title}}</div>'，{{titleClass}}、{{title}}为活动数据
*context为包含活动数据的对象，如{title: '标题', titleClass: 'title'}
*'<div class="{{titleClass}}">{{title}}</div>'.render({title: '标题', titleClass: 'title'});
*返回'<div class="title">标题</div>'
**/
String.prototype.render = function ( context ){
  return this.replace( /{{(.*?)}}/g, function( match, key ) { return context[key.trim()] } );
}
