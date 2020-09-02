import React from 'react'
import HeadApp from "./HeadApp";
import Select from "./Select";
import Contentfile from "./Contentfile";
import CheckFile from "./CheckFile";

class Main extends React.Component {

    state = {
        page: "1",
        type: "",
    };

    childValue = (data) => {
        this.setState({
            page: data,
        })
    };
    FileType = (data) => {
        this.setState({
            type: data,
        })
    };

    render() {

        const show = {
            display: "block"
        };
        const hide = {
            display: "none"
        };
        if (this.state.page === "文档审核") {

            show.display = "none";
            hide.display = "block";

        } else {
            show.display = "block";
            hide.display = "none";
        }

        return (
            <div className="body">
                <div className="head">
                    <HeadApp getChildValue={this.childValue}/>
                </div>
                {/*文档分享组件*/}
                <div id="share" className="main" style={show}>
                    <div style={{paddingLeft: 10, paddingRight: 10}} className={"main_mid"}>
                        <div className="main_left">
                            <Select getFileType={this.FileType}/>
                            <div>
                                {/*<FireWorks/>*/}
                            </div>
                        </div>
                        <div className="main_right">
                            <Contentfile type={this.state.type}/>
                        </div>
                    </div>

                </div>
                {/*文档审核组件*/}
                <div id="check" className={"main"} style={hide}>
                    <CheckFile/>
                </div>
            </div>
        )
    }
}

export default Main;