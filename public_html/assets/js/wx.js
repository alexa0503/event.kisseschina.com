$('document').ready(function () {
    $.ajax({
        url: wxShareUrl,
        dataType: 'json',
        jsonp: 'callback',
        data: {url: location.href},
        success: function (json) {
            wxData = $.extend(wxData,json);
            wx.config({
                debug: wxData.debug || false,
                appId: wxData.appId,
                timestamp: wxData.timestamp,
                nonceStr: wxData.nonceStr,
                signature: wxData.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ]
            });
        },
        error: function () {
            if( data.debug ){
                alert('请求微信分享接口失败~');
            }
            console.log('请求微信分享接口失败~');
        }
    })
})
function wxShare(data){
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: data.title || wxData.title,
            desc: data.desc || wxData.desc,
            link: data.link || wxData.link,
            imgUrl: data.imgUrl || wxData.imgUrl,
            trigger: function (res) {},
            success: function (res) {},
            cancel: function (res) {},
            fail: function (res) {}
        });
        wx.onMenuShareTimeline({
            title: data.desc || wxData.desc,
            link: data.link || wxData.link,
            imgUrl: data.imgUrl || wxData.imgUrl,
            trigger: function (res) {},
            success: function (res) {
                ga('send','event','share','微信分享');
            },
            cancel: function (res) {},
            fail: function (res) {}
        });
        wx.onMenuShareQQ({
            title: wxData.title,
            desc: wxData.desc,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            success: function () {
                ga('send','event','share','微信分享');
            },
            cancel: function () {}
        });
    });
}
