@extends('layouts.app')
@section('content')<div class="pageOut">
	<div class="innerDiv">
    	<div class="page page0">
            <div class="innerDiv">
                <div class="abs loadingBlock">
                	<div class="loadingBg"></div>
                    <div class="loadingBar" style="width:0;"></div>
                    <img src="{{asset('assets/images/loadingImg1.png')}}" class="abs loadingImg1">
                    <img src="{{asset('assets/images/loadingImg4.png')}}" class="abs loadingImg4">
                    <p class="abs loadingTxt"><span>0</span>%</p>
                </div>
            </div>
        </div>

        <div class="page page1" style="display:none;">
            <div class="innerDiv">
            	<div class="abs page1Btn">
                	<div class="innerDiv">
                    	<a href="javascript:void(0);" class="abs page1Btn1" onClick="showRule();ga('send','event','click','首页详情');"><img src="{{asset('assets/images/page1Btn1.png')}}"></a>
                        <a href="javascript:void(0);" class="abs page1Btn2" onClick="goPage2();ga('send','event','click','首页抢票');"><img src="{{asset('assets/images/page1Btn2.png')}}"></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="page page2" ontouchend="shot();" style="display:none;">
            <div class="innerDiv">
            	<div class="abs cImg c01"></div>
                <div class="abs cImg c02"></div>
                <div class="abs cImg c03"></div>
            	<div class="abs hander"></div>
            	<div class="abs man"></div>
                <img src="{{asset('assets/images/choImg.png')}}" class="abs choImg" style="display:none;">
                <div class="abs creamOpen" style="display:none;"></div>
                <img src="{{asset('assets/images/bullet.png')}}" class="abs buttlet" style="display:none;">
                <div class="abs shotBtn"></div>
            </div>
        </div>

        <div class="page page3" style="display:none;">
            <div class="innerDiv">
            	<div class="abs page3Btn">
                	<div class="innerDiv">
                    	<a href="javascript:void(0);" class="abs page3Btn1" onClick="showList();ga('send','event','click','好运页获奖');"><img src="{{asset('assets/images/space.gif')}}" width="93" height="162"></a>
                        <a href="http://h5.m.jd.com/active/42vQAJ2LET8qi6MXCKmYyjd87ZjF/index.html" class="abs page3Btn2" onClick="ga('send','event','click','好运页下单');"><img src="{{asset('assets/images/space.gif')}}" width="211" height="162"></a>
                        <a href="javascript:void(0);" class="abs page3Btn3" onClick="showNote();ga('send','event','click','好运页分享');"><img src="{{asset('assets/images/space.gif')}}" width="211" height="162"></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="page page4" style="display:none;">
            <div class="innerDiv">
            	<p class="abs code" id="prize_code"></p>
                <a href="http://m.gewara.com/movie/m/detail.xhtml?movieId=272523686" class="abs page4Btn1" onClick="ga('send','event','click','电影票页兑换');"><img src="{{asset('assets/images/page4Btn1.png')}}"></a>
                <a href="javascript:void(0);" class="abs page4Btn2" onClick="showNote();ga('send','event','click','电影票页分享');"><img src="{{asset('assets/images/page4Btn2.png')}}"></a>
            </div>
        </div>
    </div>
</div>

<div class="popBg" style="display:none;"></div>

<img src="{{asset('assets/images/cr.png')}}" class="cr">
<img src="{{asset('assets/images/logo1.png')}}" class="logo1">
<img src="{{asset('assets/images/logo2.png')}}" class="logo2">

<div class="popRule" style="display:none;">
	<div class="innerDiv">
    	<div class="ruleBlock"><img src="{{asset('assets/images/rule.png')}}"></div>
    	<a href="javascript:void(0);" class="abs ruleCloseBtn" onClick="closeRule();ga('send','event','click','活动详情关闭');"><img src="{{asset('assets/images/closeBtn.png')}}"></a>
    </div>
</div>

<div class="popList" style="display:none;">
	<div class="innerDiv">
    	<div class="listBlock">
			@foreach ($data as $date => $row)
			<div class="listTime">{{$date}}</div>
			<div class="listName">
            	<ul>
					@foreach ($row as $lottery)
                	<li>{{$lottery->user->nick_name}}</li>
					@endforeach
                </ul>
                <div class="clear"></div>
            </div>
			@endforeach
        </div>
    	<a href="javascript:void(0);" class="abs ruleCloseBtn" onClick="closeList();ga('send','event','click','获奖名单关闭');"><img src="{{asset('assets/images/closeBtn.png')}}"></a>
    </div>
</div>

<img src="{{asset('assets/images/shareNote.png')}}" class="shareNote" style="display:none;" onClick="closeNote();">
@endsection
@section('scripts')
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78084715-1', 'auto');
  ga('send', 'pageview');

</script>
@endsection
