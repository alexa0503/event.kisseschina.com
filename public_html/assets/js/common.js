//找到url中匹配的字符串
function findInUrl(str) {
    url = location.href;
    return url.indexOf(str) == -1 ? false : true;
}
//获取url参数
function queryString(key) {
    return (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1];
}

//产生指定范围的随机数
function randomNumb(minNumb, maxNumb) {
    var rn = Math.round(Math.random() * (maxNumb - minNumb) + minNumb);
    return rn;
}

var wHeight;
$(document).ready(function() {
    wHeight = $(window).height();
    if (wHeight < 832) {
        wHeight = 832;
    } else {

    }
    $('.pageOut').height(wHeight);
    $('.page').css('margin-top', wHeight - 1039 + 'px');

    loadingImg();
});

var loadingTranWidth = 270;
var loadingBarWidth = 400;

function loadingImg() {
    ga('send', 'pageview', 'loading');
    var images = [];
    images.push("/assets/images/creamOpen.png");
    images.push("/assets/images/hander.png");
    images.push("/assets/images/man.png");
    images.push("/assets/images/page1Img1.jpg");
    images.push("/assets/images/page1Img2.png");
    images.push("/assets/images/page2Img1.jpg");
    images.push("/assets/images/page2Img2.png");
    images.push("/assets/images/page3Img1.jpg");
    images.push("/assets/images/page3Img2.png");
    images.push("/assets/images/page4Img1.jpg");
    images.push("/assets/images/listBg.png");
    images.push("/assets/images/ruleBg.png");



    /*图片预加载*/
    var imgNum = 0;
    $.imgpreload(images, {
        each: function() {
            var status = $(this).data('loaded') ? 'success' : 'error';
            if (status == "success") {
                var v = (parseFloat(++imgNum) / images.length).toFixed(2);
                var lw = loadingTranWidth * v;
                $('.loadingImg1').css('-webkit-transform', 'translate(' + lw + 'px,0)');
                $('.loadingBar').width(loadingBarWidth * v);
                $(".loadingTxt span").html(Math.round(v * 100));
            }
        },
        all: function() {
            $('.loadingBar').width(400);
            $(".loadingTxt span").html('100');

            //图片加载完成 加载动画
            goPage1();

        }
    });
}

function goPage1() {
    $('.page0').fadeOut(500);
    $('.page1').fadeIn(500);
    ga('send', 'pageview', '首页');
}

function closeRule() {
    $('.popBg').fadeOut(500);
    $('.popRule').fadeOut(500);
}

function showRule() {
    $('.popBg').fadeIn(500);
    $('.popRule').fadeIn(500);
    ga('send', 'pageview', '活动详情');
}

function goPage2() {
    $('.page1').fadeOut(500);
    $('.page2').fadeIn(500);
    ga('send', 'pageview', '互动页');
    startGo();
}

var shotTime;
var showNumb = 1;
var isGet = false;
var shotStep = 0;
var shotDir = 0; //0右 1左
function startGo() {
    shotTime = setInterval(function() {
        handerAct();
    }, 10);
}

function handerAct() {
    if (shotDir == 0) {
        shotStep++;
        if (shotStep >= 45) {
            shotDir = 1;
        }
        $('.hander').css('-webkit-transform', 'rotate(' + showNumb * shotStep + 'deg)');
    } else {
        shotStep = shotStep - 1;
        if (shotStep <= -45) {
            shotDir = 0;
        }
        $('.hander').css('-webkit-transform', 'rotate(' + showNumb * shotStep + 'deg)');
    }
}

var canShot = true;

function shot() {
    if (canShot) {
        canShot = false;
        if (shotStep >= -45 && shotStep < -30) {
            $('.shotBtn').hide();
            clearInterval(shotTime);
            $('.buttlet').addClass('buttlet2Act').show();
            setTimeout(function() {
                $('.buttlet').fadeOut(100);
                $('.creamOpen').addClass('creamOpen2').show();
            }, 500);
            setTimeout(function() {
                goEnd();
            }, 1500);
        } else if (shotStep >= -10 && shotStep <= 10) {
            $('.shotBtn').hide();
            clearInterval(shotTime);
            $('.buttlet').addClass('buttletAct').show();
            setTimeout(function() {
                $('.buttlet').fadeOut(100);
                $('.creamOpen').show();
            }, 500);
            setTimeout(function() {
                goEnd();
            }, 1500);
        } else if (shotStep >= 30 && shotStep <= 45) {
            $('.shotBtn').hide();
            clearInterval(shotTime);
            $('.buttlet').addClass('buttlet3Act').show();
            setTimeout(function() {
                $('.buttlet').fadeOut(100);
                $('.creamOpen').addClass('creamOpen3').show();
            }, 500);
            setTimeout(function() {
                goEnd();
            }, 1500);
        } else {
            if (shotStep >= 0) {
                $('.buttlet').css('-webkit-transform', 'rotate(' + shotStep + 'deg)').animate({
                    'left': 265 + 910 * Math.tan(shotStep * 0.017453293) + 'px',
                    'top': '-300px'
                }, 1000, 'linear', function() {
                    $('.buttlet').css({
                        'left': '265px',
                        'top': '610px',
                        'display': 'none',
                        '-webkit-transform': ''
                    });
                    canShot = true;
                }).show();
            } else {
                $('.buttlet').css('-webkit-transform', 'rotate(' + shotStep + 'deg)').animate({
                    'left': 265 + 910 * Math.tan(shotStep * 0.017453293) + 'px',
                    'top': '-300px'
                }, 1000, 'linear', function() {
                    $('.buttlet').css({
                        'left': '265px',
                        'top': '610px',
                        'display': 'none',
                        '-webkit-transform': ''
                    });
                    canShot = true;
                }).show();
            }
        }
        ga('send', 'event', 'click', '互动页开撞');
    }
}

function goEnd() {
	$.ajax(lottery_url,{
		method: 'POST',
        dataType: 'JSON',
		success: function(json){
			$('.page2').fadeOut(500);
			if(json && json.ret == 0 && json.prize.id == 1){
                wxShare({'desc':'你有一张《冰川时代5：星际碰撞》电影票未领取！'})
                $('#prize_code').text(json.prize.code);
				$('.page4').fadeIn(500);
		        ga('send', 'pageview', '电影票页');
			}
			else{
				$('.page3').fadeIn(500);
		        ga('send', 'pageview', '好运页');
			}
		},
		error: function(){
			$('.page2').fadeOut(500);
			$('.page3').fadeIn(500);
			ga('send', 'pageview', '好运页');
		}
	})
	/*
    $('.page2').fadeOut(500);
    if (isGet) { //true 中电影票 false 不中 随机
        $('.page4').fadeIn(500);
        ga('send', 'pageview', '电影票页');
    } else {
        $('.page3').fadeIn(500);
        ga('send', 'pageview', '好运页');
    }
	*/
}

function closeList() {
    $('.popBg').fadeOut(500);
    $('.popList').fadeOut(500);
}

function showList() {
    $('.popBg').fadeIn(500);
    $('.popList').fadeIn(500);
    ga('send', 'pageview', '获奖名单');
}

function closeNote() {
    $('.popBg').fadeOut(500);
    $('.shareNote').fadeOut(500);
}

function showNote() {
    $('.popBg').fadeIn(500);
    $('.shareNote').fadeIn(500);
    ga('send', 'pageview', '分享页');
}
