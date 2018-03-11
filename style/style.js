function switchTab() {
	var index = $('.tab-nav').find('.active').index();
	var target = $('.tab-nav').find('.active').data('target');
	var childrenLength = $('.tab-nav').children().length;

	$('.pannel').filter(target).addClass('active').siblings().removeClass('active');
	$('body').find('#style-tab').html('.tab-nav:before{left:' + (index * 100 / childrenLength) + '%;}');
}
$('body').on('click', '.tab-item', function(evt){
	evt.preventDefault();
	if ( $(this).hasClass('active') ) {
		return
	} else {
		$(this).addClass('active').siblings().removeClass('active');
		switchTab();
	}
})
$('body').append('<style>.tab-nav:before{width: ' + (100 / $('.tab-nav').children().length) + '%;}</style>');
$('body').append('<style id="style-tab">.tab-nav:before{left:0;}</style>');
switchTab();