import React from 'react'
import Menu from 'antd/lib/menu'
import Divider from 'antd/lib/divider'
import "../style/Select.css"

class Select extends React.Component {

    handleClick = e => {
        switch (e.key) {
            case "1":
                this.props.getFileType("平台宣传");
                break;
            case "2":
                this.props.getFileType("优秀案例");
                break;
            case "3":
                this.props.getFileType("应用规范");
                break;
            case "4":
                this.props.getFileType("其他");
                break;
            default:
                console.log("未知错误！");
                break;
        }
    };

    render() {
        return (

            <div className={"box_select"}>
                <span className={"span_l"}>文档类型</span>

                <Divider/>

                <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <Menu.Item key="1">平台宣传</Menu.Item>
                    <Menu.Item key="2">优秀案例</Menu.Item>
                    <Menu.Item key="3">应用规范</Menu.Item>
                    <Menu.Item key="4">其他</Menu.Item>
                </Menu>
            </div>
        )
    }

}

export default Select;