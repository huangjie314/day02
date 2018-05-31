import "./footer.scss";
import {h, render, Component} from "preact";

class Footer extends Component {
    constructor(props){
        super(props);
    }
    render(props, state){
        let footerItem = [
            {key:0,val:'普惠加息',url: './index.html'},
            {key:1,val:'集粽兑红包',url: './my.html'},
            {key:2,val:'助力领豪礼',url: ''}
        ];
        return (
            <div className="footer">
                {
                    footerItem.map((item,i) => {
                        return (
                            <div 
                                key={i} 
                                className={props.index == i ? `active item${i+1}`: `item${i+1}`} 
                                onClick={
                                    (e) => {
                                        //console.log(item.url);
                                        if(window.sa){
                                            window.sa.quick('trackHeatMap',e.target);
                                        } else {
                                            location.href = item.url;
                                        }
                                    }
                                }
                            >
                            {item.val}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Footer;