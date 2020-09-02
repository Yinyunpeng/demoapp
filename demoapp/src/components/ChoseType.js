import React from 'react';
import TreeSelect from 'antd/lib/tree-select';

const {TreeNode} = TreeSelect;


class ChoseType extends React.Component {

    state = {
        value: undefined,
    };

    onChange = value => {
        this.setState({
            value: value,
        });
    };
    componentDidMount = () => {
        const {onRef1} = this.props;
        onRef1(this) //将子组件的this回传
    };

    render() {
        return (
            <div>
                <TreeSelect
                    showSearch
                    style={{width: '100%'}}
                    value={this.state.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="请选择......"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onChange}
                >
                    <TreeNode value="平台宣传" title="平台宣传">
                    </TreeNode>
                    <TreeNode value="优秀案例" title="优秀案例">
                    </TreeNode>
                    <TreeNode value="应用规范" title="应用规范">
                    </TreeNode>
                    <TreeNode value="其他" title="其他">
                    </TreeNode>
                </TreeSelect>
            </div>
        )
    }

}

export default ChoseType;