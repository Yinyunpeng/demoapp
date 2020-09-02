import React from 'react'
import Radio from 'antd/lib/radio'

class ShareAuth extends React.Component {

    state = {
        value: "仅可查看",
    };

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    componentDidMount = () => {
        const {onRef} = this.props;
        onRef(this) //将子组件的this回传
    };

    render() {

        return (
            <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio value={"仅可查看"}>仅可查看</Radio>
                <Radio value={"可下载、可分享"}>可下载、可分享</Radio>
            </Radio.Group>
        )

    }

}

export default ShareAuth;