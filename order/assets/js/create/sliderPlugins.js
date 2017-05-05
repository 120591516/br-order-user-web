$(function() {
	var i = 0;
	var leng = $('ul.pic_list li').length;

	//			手动部分
	$('a.next').click(function() {
		clickNext();
	})
	$('a.prev').click(function() {
		i--;
		if(i < 0) {
			i = leng - 1;
		}
		$('ul.pic_list li').stop().eq(i).fadeIn().siblings().stop().hide();
		$('ul.btn_list li').eq(i).addClass('checked').siblings().removeClass('checked');
	})

	//			鼠标悬浮停止轮播、鼠标离开继续
	$('.banner').hover(function() {
		set = clearInterval(set);
		$('.banner a.next,.banner a.prev').css('display', 'block');
	}, function() {
		$('.banner a.next,.banner a.prev').css('display', 'none');
		set = setInterval(clickNext, 5000)
	})

	//			点击下面圆点实现切换跳转
	$('ul.btn_list li').click(function() {
		i = $(this).index();
		$('ul.pic_list li').stop().eq(i).fadeIn().siblings().stop().hide();
		$(this).addClass('checked').siblings().removeClass('checked');
	});
	var set = setInterval(clickNext, 5000)

	//			图片切换部分
	function clickNext() {
		i++;
		if(i > leng - 1) {
			i = 0;
		}
		$('ul.pic_list li').eq(i).fadeIn(1000).siblings().hide();
		$('ul.btn_list li').eq(i).addClass('checked').siblings().removeClass('checked');
	}
})