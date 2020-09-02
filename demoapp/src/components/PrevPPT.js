import React from 'react' ;

import {LeftCircleFilled, RightCircleFilled} from '@ant-design/icons'
import message from "antd/lib/message/index";
import "../style/index.css"

class PrevPPT extends React.Component {

    state = {
        currentPage: 1
    };

    PageUp = (pagePrev) => {//参数为当前页面以及接下来需要显示的页面

        if (pagePrev > 1) {
            this.setState({
                currentPage: pagePrev - 1,
            });
            let pageNext = pagePrev - 1;
            this.changeCSS(pagePrev, pageNext);
        } else {
            message.warn("当前页为第一页！", 1)
        }

    };

    PageDown = (pagePrev, pageMax) => {//参数为当前页面以及接下来需要显示的页面
        if (pagePrev < pageMax) {
            this.setState({
                currentPage: pagePrev + 1,
            });
            let pageNext = pagePrev + 1;
            this.changeCSS(pagePrev, pageNext);
        } else {
            message.warn("当前页为末尾页！", 1)
        }
    };
    toPPTPage = (key) => {
        console.log(key);
        this.setState({
            currentPage: key,
        });
        let pageNext = key;
        let pagePrev = this.state.currentPage;
        this.changeCSS(pagePrev, pageNext);
    };

    //精简代码（修改样式）
    changeCSS = (pagePrev, pageNext) => {
        document.getElementById("data-pic-" + pagePrev).style.display = "none";
        document.getElementById("data-pic-" + pageNext).style.display = "block";
        document.getElementById("span-" + pagePrev).style.backgroundColor = "rgba(199,199,199,0.81)";
        document.getElementById("span-" + pageNext).style.backgroundColor = "rgba(16,142,233,0.81)";
    };


    render() {

        const data = this.props.dataPic;

        const currentPage = this.state.currentPage;

        const items = [];
        const span = [];
        for (let i = 0; i <= data.length - 1; i++) {
            let wid = 90 / (data.length) + "%";
            let space = 10 / (data.length) + "%";
            if (i === 0) {
                items.push(<img key={data[i].key} id={"data-pic-" + data[i].key}
                                src={require("../" + data[i].pic)}//本地测试环境写法
                    // src={data[i].pic}//生产环境
                                alt={"第" + data[i].key + "页"} title={"第" + data[i].key + "页"}
                                style={{display: "block", margin: "auto", float: "left", width: "80%"}}/>);
                span.push(
                    <span id={"span-" + data[i].key} className={"pptSpan"} title={"第" + data[i].key + "页"} style={{
                        width: wid,
                        marginLeft: space,
                        backgroundColor: "rgba(16,142,233,0.81)",
                    }}
                          onClick={() => this.toPPTPage(data[i].key)}
                    >   </span>
                )
            } else {
                items.push(<img key={data[i].key} id={"data-pic-" + data[i].key}
                                src={require("../" + data[i].pic)}//本地测试环境写法
                    // src={data[i].pic}//生产环境
                                alt={"第" + data[i].key + "页"} title={"第" + data[i].key + "页"}
                                style={{display: "none", margin: "auto", float: "left", width: "80%"}}/>);
                span.push(
                    <span id={"span-" + data[i].key} className={"pptSpan"} title={"第" + data[i].key + "页"} style={{
                        width: wid,
                        marginLeft: space,
                    }}
                          onClick={() => this.toPPTPage(data[i].key)}
                    >   </span>
                )
            }
        }

        return (
            <div style={{
                float: "left",
                margin: "auto",
                width: "100%",
            }}>
                <div style={{
                    float: "left",
                    margin: "auto",
                    width: "10%",
                    paddingTop: "20%",
                }}>
                    <a href="#!" title={"上一页"}
                       onClick={() => this.PageUp(currentPage)}
                    >
                        <LeftCircleFilled
                            style={{
                                fontSize: "36px",
                            }}
                        />
                    </a>
                </div>
                {items}
                <div style={{
                    float: "right",
                    margin: "auto",
                    width: "10%",
                    paddingTop: "20%",
                }}>
                    <a href="#!" title={"下一页"}
                       onClick={() => this.PageDown(currentPage, items.length)}
                    >
                        <RightCircleFilled
                            style={{
                                fontSize: "36px",
                                float: "right",
                            }}
                        />
                    </a>
                </div>
                <div style={{
                    width: "100%",
                    float: "left",
                    marginTop: 10,
                    padding: " 0 12% ",
                }}>
                    {span}
                </div>

            </div>
        )
    }

}

export default PrevPPT;