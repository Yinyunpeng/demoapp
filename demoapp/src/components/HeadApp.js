import React from "react"
import "../style/HeadApp.css"
import Divider from 'antd/lib/divider'
import {SyncOutlined} from '@ant-design/icons'


class HeadApp extends React.Component {
    state = {
        pageName: "文档分享",
    };

    changePage = () => {
        if (this.state.pageName === "文档分享") {
            this.setState({
                pageName: "文档审核",
            });
            this.props.getChildValue("文档审核")
        } else {
            this.setState({
                pageName: "文档分享",
            });
            this.props.getChildValue("文档分享")
        }
    };


    render() {
        const {pageName} = this.state;
        return (
            <div className="box">
                <Divider type={"vertical"} style={{backgroundColor: "#fcbb22", float: "left", width: 2}}/>
                <span className={"a_left"}>{pageName}</span>
                <a href="#!" onClick={this.changePage} className={"a_right"}><SyncOutlined spin/>切换</a>
            </div>
        );
    }

}

export default HeadApp;