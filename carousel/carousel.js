//用到的其他函数
/*
*扩展String的方法，用法：
*String.render(context);
*String形如'<div class="{{titleClass}}">{{title}}</div>'，{{titleClass}}、{{title}}为活动数据
*context为包含活动数据的对象，如{title: '标题', titleClass: 'title'}
*'<div class="{{titleClass}}">{{title}}</div>'.render({title: '标题', titleClass: 'title'});
*返回'<div class="title">标题</div>'
**/
String.prototype.render = function (context) {
    return this.replace(/{{(.*?)}}/g, function (match, key) { return context[key.trim()] });
}

/*处理多个图片函数
**输入可以为','分割的长字符串，也可以是数组，图片类型为jpg和png
**返回两个数组：imgArr 和 videoArr
*/
function classMedia(urls) {
    var urlArr = [],
        imgArr = [],
        videoArr = [];

    var imgReg = /(jpg|png)$/i;

    if (urls instanceof Array) {
        urlArr = urls;
    } else if (urls === '') {

    } else {
        urlArr = urls.split(',');
    }

    for (var i = 0; i < urlArr.length; i++) {
        var element = urlArr[i];
        if (imgReg.test(element)) {
            imgArr.push(element);
        } else {
            videoArr.push(element);
        }
    }
    return {
        imgArr: imgArr,
        videoArr: videoArr
    }
}

/* 
**扩展JQuery的轮播图方法
**$(selector).carousel( option )
option = {
    urlArray: [],       （必传）包含轮播所需要的图片或者视频的url
    duration: 2000,     （可选）轮播的间隔时间，单位毫秒
    speed: 300,         （可选）轮播的切换动画时间，单位毫秒
    slideType: 'infinite' （可选）轮播的类型，'infinite'为无限循环   
}
**配合样式
*/
$.fn.carousel = function (option) {
    var defaultOption = {
        urlArray: [],
        duration: 2000,
        speed: 300,
        slideType: 'infinite'
    };
    option = $.extend({}, defaultOption, option);

    var $this = this;

    $this.addClass('g-carousel');

    //渲染部分=====================================================================
    var fnContainerDom = function () {/*<ul class="g-carousel-inner">
      {{media}}
    </ul>
    <url class="g-carousel-btnGroup">
      {{controler}}
    </url>*/}
    var fnPicDom = function () {/*<li class="g-carousel-inner-item" data-type="img" data-url="{{image}}">
        <img src="{{image}}" alt="" class="g-carousel-inner-media">
      </li>*/};
    var fnVideoDom = function () {/*<li class="g-carousel-inner-item" data-type="video" data-url="{{video}}">
        <video src="{{video}}" alt="" class="g-carousel-inner-media">
      </li>*/};
    var fnControlerDom = function () {/*<li class="g-carousel-btn"></li>*/ }
    var containerDomModel = fnContainerDom.toString().replace('function(){/*', '').replace('function (){/*', '').replace('function () {/*', '').replace('*/}', '');
    var picDomModel = fnPicDom.toString().replace('function(){/*', '').replace('function (){/*', '').replace('function () {/*', '').replace('*/}', '');
    var videoDomModel = fnVideoDom.toString().replace('function(){/*', '').replace('function (){/*', '').replace('function () {/*', '').replace('*/}', '');
    var controlerDomModel = fnControlerDom.toString().replace('function(){/*', '').replace('function (){/*', '').replace('function () {/*', '').replace('*/}', '');

    var containerDom = '';
    var picDom = '';
    var videoDom = '';
    var controlerDom = '';

    var imgArray = classMedia(option.urlArray).imgArr;
    var videoArray = classMedia(option.urlArray).videoArr;
    var carouselLength = imgArray.length + videoArray.length;


    for (key in imgArray) {
        var infoObj = {};
        infoObj.image = imgArray[key];
        picDom += picDomModel.render(infoObj);
    }
    for (key in videoArray) {
        var infoObj = {};
        infoObj.video = videoArray[key];
        videoDom += videoDomModel.render(infoObj);
    }

    for (var i = 0; i < carouselLength; i++) {
        controlerDom += controlerDomModel;
    }

    if (option.slideType === 'infinite') {
        var containerInfo = {
            media: videoDom + picDom + videoDom + picDom,
            controler: controlerDom
        }
    }

    containerDom = containerDomModel.render(containerInfo);
    $this.html(containerDom);

    //控制部分=================================================================================
    var timer = 0;
    var index = 0;

    function slide(index, length, speed) {
        $this.find('.g-carousel-inner').animate({ 'left': '-' + index + '00vw' }, speed, function () {
            if (index === 0) {
                $this.find('.g-carousel-inner').css('left', '0px');
            }
        });
        if (index === length) {
            index = 0;
        }
        $this.find('.g-carousel-btn').removeClass('active').eq(index).addClass('active');

    }

    function start() {
        slide(0, carouselLength, option.speed);
        timer = setInterval(function () {
            index++
            slide(index, carouselLength, option.speed);
            if (index === carouselLength) {
                index = 0;
            }
        }, option.duration);
    }

    function stop() {
        clearInterval(timer);
    }

    function click(target, callback) {
        if (target.play && target.paused) {
            target.play();
        } else if (target.play && !target.paused) {
            target.pause();
        }
        callback(target);
    }

    $this.on('click', '.g-carousel-media', function (evt) {
        var target = evt.target;
        click(target);
    });

    return {
        start: start,
        stop: stop,
        turnTo: function (index) {
            slide(index, carouselLength, option.speed);
        },
        click: click
    }
}
