import React from 'react'

import Divider from 'antd/lib/divider'
import Menu from 'antd/lib/menu'
import Space from 'antd/lib/space'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'

import '../style/CheckFile.css'
import DillPage from "./DillPage"


class CheckFile extends React.Component {

    state = {
        pageName: '我的待办',
        dillKey: 0,
        dill: false,
        currentPage: 1,
        data: [
            {
                key: '1',
                number: '1',
                fileKey: "1111",
                name: '精准营销平台新版升级培训材料',
                uploader: '张天',
                uploadTime: '2020-06-1918:44:01'
            },
            {
                key: '2',
                number: '2',
                fileKey: "2222",
                name: '精准营销平台新版升级培训材料',
                uploader: '张天',
                uploadTime: '2020-06-1918:44:01'
            },
            {
                key: '3',
                number: '3',
                fileKey: "3333",
                name: '精准营销平台新版升级培训材料',
                uploader: '张天',
                uploadTime: '2020-06-1918:44:01'
            },
        ],
    };

    handleClick = e => {
        this.setState({
            pageName: e.key,
            currentPage: 1,
        });
        if (e.key === "我的待办") {
            this.getFileDetails(true, 1)
        } else {
            this.getFileDetails(false, 1);
        }
    };
    toDillPage = key => {
        this.setState({
            dill: true,
            dillKey: key,
        }, () => {
            this.showDillPage();
        });
    };
    showDillPage = () => {
        this.setState({
            dillKey: this.state.dillKey,
        });//重载参数
    };
    toListPage = () => {
        this.setState({
            dill: false,
        })
    };
    getFileDetails = (isDill, page) => {

        let params = {
            ifNeedDill: isDill,
            pageNum: page,
        };

        console.log(params);

        fetch('http://localhost/checkFile/getFileDetails', {
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode: 'cors',
            cache: 'default'
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);

                this.setState({
                    // 这里数据可能需要处理
                    data: data
                });
            })
            .then(error => {
                console.log(error)
            })

    };

    componentDidMount() {
        this.getFileDetails(true, 1);
    }


    // 分页
    changeTablePage = (current, pageName) => {
        this.setState({
            currentPage: current
        });
        if (pageName === "我的待办") {
            this.getFileDetails(true, current)
        } else {
            this.getFileDetails(false, current)
        }
    };
    //跳转到跟踪页面
    toTrackPage = (key) => {


    };

    render() {

        const columns = [
            {
                title: '序号',
                dataIndex: 'number',
                key: 'number',
                align: 'center'
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center'
            },
            {
                title: '上传人',
                dataIndex: 'uploader',
                key: 'uploader',
                align: 'center'
            },
            {
                title: '上传时间',
                key: 'uploadTime',
                dataIndex: 'uploadTime',
                align: 'center'
            },
            {
                title: '操作',
                align: 'center',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a href="#!" onClick={() => this.toDillPage(record.fileKey)}>办理</a>
                        <Divider type="vertical" style={{backgroundColor: "black"}}/>
                        <a href="#!"
                           target={"_blank"}
                           onClick={() => this.toTrackPage(record.fileKey)}
                        >跟踪</a>
                    </Space>
                ),
            },
        ];
        const columns1 = [
            {
                title: '序号',
                dataIndex: 'number',
                key: 'number',
                align: 'center'
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center'
            },
            {
                title: '上传人',
                dataIndex: 'uploader',
                key: 'uploader',
                align: 'center'
            },
            {
                title: '上传时间',
                key: 'uploadTime',
                dataIndex: 'uploadTime',
                align: 'center'
            },
            {
                title: '操作',
                align: 'center',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a href="#!"
                           target={"_blank"}
                           onClick={() => this.toTrackPage(record.fileKey)}
                        >跟踪</a>
                    </Space>
                ),
            },
        ];


        const {pageName, data} = this.state;
        const show = {
            display: "block",
            paddingRight: 10,
            paddingLeft: 10,

        };
        const hide = {
            display: "none",
            paddingRight: 10,
            paddingLeft: 10,
        };
        const dill = {
            display: "block",
            paddingRight: 10,
            paddingLeft: 10,
        };

        const no_dill = {
            display: "block",
            paddingRight: 10,
            paddingLeft: 10,
        };
        if (pageName === "我的已办") {

            show.display = "none";
            hide.display = "block";

        } else {
            show.display = "block";
            hide.display = "none";
        }

        if (this.state.dill) {
            dill.display = "block";
            no_dill.display = "none";
        } else {
            no_dill.display = "block";
            dill.display = "none";
        }

        const paginationProps = {
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1,
            total: 500,
            current: this.state.currentPage,
            onChange: (current) => this.changeTablePage(current, this.state.pageName),
        };


        return (
            <div className={"check_body"}>
                <div id={"list"} style={no_dill}>
                    <br/>
                    <Menu onClick={this.handleClick} selectedKeys={[pageName]} mode="horizontal">
                        <Menu.Item key="我的待办">
                            <span style={{fontSize: 16}}>我的待办</span>
                        </Menu.Item>
                        <Menu.Item key="我的已办">
                            <span style={{fontSize: 16}}>我的已办</span>
                        </Menu.Item>
                    </Menu>
                    <br/>

                    <div style={show}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={paginationProps}
                        />

                    </div>
                    <div style={hide}>
                        <Table
                            columns={columns1}
                            dataSource={data}
                            pagination={paginationProps}
                        />
                    </div>
                </div>
                <div id={"dillFile"} style={dill} className={"dill"}>
                    <div style={{overflow: "hidden"}}>
                        <Button type="primary" style={{float: "right", marginTop: 10}}
                                onClick={this.toListPage}>返回</Button>
                    </div>
                    <div className={"dillPage"}>
                        <DillPage handelKey={this.state.dillKey}/>
                    </div>
                </div>
            </div>


        )
    }
}

export default CheckFile;