import "./rule.scss";
import { h, render, Component } from "preact";
import Swiper from 'swiper';

window.prc = window.prc || {};
class Rule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            index: 0
        }
        window.prc.run = this;
        this.ruleSwiper = null;
        this.renderRule();
    }
    renderRule() {
        $(".rule-btn").on("click", (e) => {
            if (window.sa) {
                window.sa.quick('trackHeatMap', e.target);
            }
            this.show(this.initSwiper);
        });
    }
    show(callback){
        this.setState({
            isShow: true
        }, ()=>{
            callback && callback.call(this);
            console.log(111);
        })
    }

    initSwiper() {
        let _this = this;
        this.ruleSwiper = new Swiper('.rule-swiper',{
            direction : 'vertical',
            on: {
             slideChangeTransitionStart: function() {
                _this.setState({
                    index: this.activeIndex
                })
             }   
            }
        })
        let ruleTxtSwiper1 = new Swiper('.ruletxt-swiper1', {
            direction: 'vertical',
            freeMode: true,
            slidesPerView: 'auto',
            scrollbar: {
                el: '#scrollBar1',
                hide: false
            },
            on:{
                touchEnd: function(swiper){
                    
                    let {realIndex, translate, isEnd} = this;
                    if(realIndex === 0 && translate > 50){
                        _this.ruleSwiper.slideTo(0);
                    } else if(isEnd){
                        _this.ruleSwiper.slideTo(2);
                    }
                   
                }
            }
         });
         let ruleTxtSwiper2 = new Swiper('.ruletxt-swiper2', {
             direction: 'vertical',
             freeMode: true,
             slidesPerView: 'auto',
             scrollbar: {
                 el: '#scrollBar2',
                 hide: false
             },
             on: {
                 touchEnd: function(){
                    console.log('this', this);
                    let {realIndex, translate, isEnd} = this;
                    if(realIndex === 0 && translate > 50){
                        _this.ruleSwiper.slideTo(1);
                    }
                 }
             }
          });
    }
    handleMaskClick(e) {
        alert('1')
        this.setState({
            isShow: false
        });
    }
    handleTouchMove(e) {
        e.preventDefault();
    }

    render(props, state) {
        let ruleObj = [
            { key: 0, val: '惠普加息' },
            { key: 1, val: '集棕兑红包' },
            { key: 2, val: '助力领豪礼' }
        ]
        return (
            <div className="rule" style={{ display: state.isShow ? '' : 'none' }}>
                <Mask onClickMask={(e) => this.handleMaskClick(e)}
                    onTouchMove={(e) => this.handleTouchMove(e)}
                />
                <div className="mask-body">
                    <div class="mask-title">活动规则</div>
                    <div class="mask-content">
                        <div class="rule-nav">
                            {
                                ruleObj.map((item, i) => {
                                    return (
                                        <span key={item.key} className={state.index == i ? `cur` : ``} 
                                            onClick={
                                                () => {
                                                    this.setState({
                                                        index: i
                                                    }, ()=>{
                                                        this.ruleSwiper.slideTo(i);
                                                    });
                                                }
                                            }>{item.val}</span>
                                    )
                                })
                            }
                        </div>
                        <SwiperComponent/>
                    </div>
                    <p className="rule-tips">
                        { /*Jsbridge.isApp()&&*/mobileUtils.isIos ? '本活动与苹果公司无关，活动规则最终解释权归团贷网所有' : '本活动规则最终解释权归团贷网所有'}}
                    </p>
                    <div class="close" onClick={(e) => {
                        this.setState({
                            isShow: false
                        })
                    }}></div>
                </div>
            </div>
        )
    }
}

function Mask(props) {
    return (
        <div className="mask-bg" onClick={props.onClickMask} onTouchMove={props.onTouchMove}></div>
    )
}
function SwiperComponent(props) {
    return (
        <div class="swiper-container rule-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <ul class="txt1">
                        <li>
                            活动期间，用户成功加入（且匹配成功）We自动服务、We+自动服务（新手专享类除外）的金额均可享受0.8%的加息奖励；若活动期间开放的We自动服务、We+自动服务未能在活动期内满额，则该加息可延续至其满额为止。
                                        </li>
                    </ul>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-container ruletxt-swiper ruletxt-swiper1">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <ul class="txt2">
                                    <li>
                                        <span>①</span>登录团贷网可获得1个粽子，每天可获得1个；
                                                    </li>
                                    <li>
                                        <span>②</span>分享活动到微信/朋友圈可获得1个粽子，每天可获得1个；
                                                    </li>
                                    <li>
                                        <span>③</span>使用58团币兑换1个粽子，每天最多可兑换10个；
                                                    </li>
                                    <li>
                                        <span>④</span>用户累计加入满1000元即可获得1个粽子，最多可获得50个；
                                                    </li>
                                    <li>
                                        <span>⑤</span>兑换的红包或加息券每日0点会限量放出，所兑换的红包使用规则请参考团宝箱；
                                                    </li>
                                    <li>
                                        <span>⑥</span>活动期间所获得的粽子为虚拟物品，仅限本次活动中兑换红包、加息券及抵扣助力商品使用，活动结束后剩余的粽子数将失效。
                                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="swiper-scrollbar" id="scrollBar1"></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-container ruletxt-swiper ruletxt-swiper2">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <ul class="txt2">
                                    <li>
                                        <span>①</span>用户进入助力活动专区，可任选一款礼品发起助力，通过本次活动链接成功邀请指定数量新用户注册，并通过APP完成首次投资（投资金额无限制、债权转让除外），则可免费获得该奖品。
                                                    </li>
                                    <li>
                                        <span>②</span>每位用户最多可同时发起一款礼品助力，超过活动时间还未达到助力人数或已被其他用户领取均视为助力失败；
                                                    </li>
                                    <li>
                                        <span>③</span>助力失败或自动放弃，所抵扣的粽子不予退还，再次发起助力需按照要求重新抵扣粽子数，助力人数也将重新计算；
                                                    </li>
                                    <li>
                                        <span>④</span>邀请好友助力，仅限通过本次活动链接进行邀请，通过其它方式邀请注册的将不会统计在助力名单内。邀请人可享受邀请有礼四重好礼中前三重，助力好友必须是未在团贷网注册的用户，且只能助力1次，参与的助力发起成功/失败，都视作已参与助力；
                                                    </li>
                                    <li>
                                        <span>⑤</span>获得奖品将于活动结束后15个工作日内发放，请注意到团宝箱-精美礼品中查收，过期未填写地址，视为放弃，不予补发且不支持退换货、兑现、发票等；
                                                    </li>
                                    <li>
                                        <span>⑥</span>因投资数据统计延迟影响，活动于19日23点59分59秒结束后，页面展示也将会有30分左右延迟；
                                                    </li>
                                    <li>
                                        <span>⑦</span>本活动最终解释权归团贷网所有。
                                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="swiper-scrollbar" id="scrollBar2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Rule;