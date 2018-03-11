/**
 * [longPress用法]
 * @ 依赖JQuery
 * @ $(selector).longPress([selector], callback);
 * @augments {selector} JQuery选择器
 * @augments {[selector]} 可选，增加一个子选择器作为筛选
 * @augments {callback(evt1,evt2)} 回调函数,可以接受两个参数
 * @evt1 为事件本身对象，包含标准事件信息
 * @evt2 为touchstart的事件对象，包含触摸开始时的事件信息
 */
$.fn.longPress = function( selector, callback ) {
    if ( typeof selector === 'function' ) {

        var longPress = null;

        $(this).on('touchstart', function(evt){
            evt.stopPropagation();
            var $this = $(this);
            longPress = setTimeout(function(){
                $this.trigger('longPress', evt);
            }, 1500);
        });

        $(this).on('touchend', function(){
            clearTimeout(longPress);
        });
        $(this).on('touchmove', function(){
            clearTimeout(longPress);
        })

        $(this).on( 'longPress', selector );    
    } else if ( typeof selector === 'string' ) {

        var longPress = null;

        $(this).on('touchstart', selector, function(evt){
            evt.stopPropagation();
            var $this = $(this);
            longPress = setTimeout(function(){
                $this.trigger('longPress', evt);
            }, 1500);
        });

        $(this).on('touchend', selector, function(){
            clearTimeout(longPress);
        });
        $(this).on('touchmove', selector, function(){
            clearTimeout(longPress);
        })

        $(this).on('longPress', selector, callback);
    }
}
