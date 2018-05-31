import "../sass/index.scss";
import {h,render,Component} from "preact";
import Foo from "../js/components/footer/footer"

class Page extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div class="pre_index">
                111111
            </div>
        )
    }
}

render(
    <Page/>,
    document.body
)
render(
    <Foo index="0"/>,
    document.body
)