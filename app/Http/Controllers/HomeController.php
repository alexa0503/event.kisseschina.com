<?php

namespace App\Http\Controllers;

use App\Helper;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('web');
        $this->middleware('wechat.auth');
    }

    public function index()
    {
        $wechat_user = \App\WechatUser::where('open_id', \Request::session()->get('wechat.openid'))->first();
        $start_time = strtotime(date('2016-07-15'));
        $n = ceil((time() - $start_time) / (3600 * 24));
        $data = [];
        for ($i = 0; $i < $n; ++$i) {
            $num = [];
            $timestamp = $start_time + $i * 24 * 3600;
            $date1 = date('Y-m-d', $timestamp);
            $date2 = date('Y-m-d 23:59:59', $timestamp);
            $date = date('Y年m月d日',$timestamp);
            $lotteries = \App\Lottery::where('lottery_time', '>=', $date1)
                ->where('lottery_time', '<=', $date2)
                ->whereNotNull('prize_id')
                ->get();
            $data[$date] = $lotteries;
        }

        return view('index', ['data'=>$data]);
    }
    public function game()
    {
        return view('game');
    }
    public function lottery()
    {
        $result = ['ret' => 0, 'prize' => [], 'msg' => ''];
        $lottery = new Helper\Lottery();
        $lottery->run();
        $prize_code = $lottery->getCode();
        $prize_id = $lottery->getPrizeId();
        $result['prize']['id'] = $prize_id;
        $result['prize']['code'] = $prize_code;

        return json_encode($result);
    }
}
