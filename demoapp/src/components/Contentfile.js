import React from 'react'
import App from "./App";
import Space from 'antd/lib/space'
import Table from 'antd/lib/table'
import Popconfirm from 'antd/lib/popconfirm'
import Divider from 'antd/lib/divider'
import message from 'antd/lib/message/index'
import Modal from 'antd/lib/modal/index'
import {QuestionCircleOutlined} from '@ant-design/icons';
import copy from "copy-to-clipboard";
import PrevPPT from './PrevPPT'
import FileViewer from 'react-file-viewer';


class Contentfile extends React.Component {

    state = {
        isPPT: false,
        total: 494,
        currentPage: 1,
        pptContent: [],
        visible: false,
        wo: "ceshi/工单数据库连接信息.xlsx",
        prevFileType: "xlsx",
        data: [
            {
                key: '1',
                number: '1',
                name: '精准营销平台react文档测试',
                uploader: '张天',
                uploadTime: '2020-06-1918:44:01',
                url: "ceshi/黑龙江弹窗需求本地测试说明文档.docx",
                fileKey: "0000",
                file: {
                    name: "黑龙江弹窗需求本地测试说明文档.docx",
                    url: "ceshi/黑龙江弹窗需求本地测试说明文档.docx",
                    content: "",//如果传输的是二进制文件流，在此处做处理
                },
            },
            {
                key: '2',
                number: '2',
                name: '精准营销平台reactPDF测试',
                uploader: '张天',
                fileKey: "0000",
                uploadTime: '2020-06-1918:44:01',
                url: "ceshi/殷云鹏的简历 .pdf",
                file: {
                    name: "殷云鹏的简历 .pdf",
                    url: "ceshi/殷云鹏的简历 .pdf",
                },
            }, {
                key: '3',
                number: '3',
                name: '精准营销平台react表格测试',
                uploader: '张天',
                fileKey: "0000",
                uploadTime: '2020-06-1918:44:01',
                url: "ceshi/工单数据库连接信息.xlsx",
                file: {
                    name: "工单数据库连接信息.xlsx",
                    url: "ceshi/工单数据库连接信息.xlsx",
                },
            },
            {
                key: '4',
                number: '4',
                name: '精准营销平台reactMP4测试',
                uploader: '张天',
                fileKey: "0000",
                uploadTime: '2020-06-1918:44:01',
                url: "ceshi/Ink Style Parallax Slideshow.mp4",
                file: {
                    name: "Ink Style Parallax Slideshow.mp4",
                    url: "ceshi/Ink Style Parallax Slideshow.mp4",
                },
            },
            {
                key: '5',
                number: '5',
                name: '精准营销平台reactPPT测试',
                uploader: '张天',
                fileKey: "0000",
                uploadTime: '2020-06-1918:44:01',
                url: "https://www.baidu.com",
                file: {
                    name: "《梦界》毕业答辩演示——答辩版.ppt",
                    content: [
                        {key: 1, pic: "ceshi/pptCeShi/u105.png"},
                        {key: 2, pic: "ceshi/pptCeShi/u106.png"},
                        {key: 3, pic: "ceshi/pptCeShi/u107.png"},
                        {key: 4, pic: "ceshi/pptCeShi/u108.png"},
                        {key: 5, pic: "ceshi/pptCeShi/u109.png"},
                        {key: 6, pic: "ceshi/pptCeShi/u110.png"},
                        {key: 7, pic: "ceshi/pptCeShi/u111.png"},
                        {key: 8, pic: "ceshi/pptCeShi/u112.png"},
                        {key: 9, pic: "ceshi/pptCeShi/u113.png"},
                        {key: 10, pic: "ceshi/pptCeShi/u114.png"},
                        {key: 11, pic: "ceshi/pptCeShi/u115.png"},
                        {key: 12, pic: "ceshi/pptCeShi/u116.png"},
                        {key: 13, pic: "ceshi/pptCeShi/u117.png"},
                        {key: 14, pic: "ceshi/pptCeShi/u118.png"},
                        {key: 15, pic: "ceshi/pptCeShi/u119.png"},
                        {key: 16, pic: "ceshi/pptCeShi/u120.png"},
                    ]
                },
            },

        ],
        type: "平台宣传",
        fileName: "",
        uploader: "",

    };
    PreviewFile = (file) => {
        console.log(file);
        switch (file.name.split(".")[1]) {
            case "mp4":
                this.setState({
                    prevFileType: "mp4",
                    wo: file.url
                });
                message.info("mp4格式文件");//采用视频播放的插件
                break;
            case "ppt":
                this.setState({
                    prevFileType: "ppt",
                    isPPT: true,
                    pptContent: file.content//这里是获取到ppt的图片数组；content的形式应该为[{index:1-x,pic:二进制文件流}]
                });
                message.info("ppt格式文件");//采用图片预览插件
                break;
            case "pdf":
                this.setState({
                    prevFileType: "pdf",
                    wo: file.url
                });
                message.info("pdf格式文件");//图片预览
                break;
            case "doc":
                this.setState({
                    prevFileType: "doc",
                    wo: file.url
                });
                message.info("word文档");//文档预览
                break;
            case "docx":
                this.setState({
                    prevFileType: "docx",
                    wo: file.url
                });
                message.info("word文档");//文档预览
                break;
            case "xlsx":
                this.setState({
                    prevFileType: "xlsx",
                    wo: file.url
                });
                message.info("excel文档");//文档预览
                break;
            default:
                message.warn("未知文件类型！");
                break;
        }


        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
            isPPT: false,
        });
    };
    DeleteFile = (key, fileKey) => {
        const dataSource = [...this.state.data];
        // 从数据库删除
        fetch('http://localhost/sharFile/deleteFile', {
            method: 'post',
            data: {
                fileKey: fileKey
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode: 'cors',
            cache: 'default'
        })
            .then(res => res.json())
            .then((response) => {
                console.log(response);
            })
            .then(error => {
                console.log(error)
            });
        this.setState({
            data: dataSource.filter(item => item.key !== key),
        }, () => {
            console.log(this.state.data)
        });
    };

    getFileInfo = (fileData, page) => {
        let params = {};
        if (this.props.type !== "" || fileData.fileName !== "" || fileData.uploader !== "") {

            if (this.props.type !== "") {
                console.log(this.props.type);
                params = {
                    type: this.props.type,
                    fileName: fileData.fileName,
                    uploader: fileData.uploader,
                    page: page,
                };
            } else {
                params = {
                    type: "平台宣传",
                    fileName: fileData.fileName,
                    uploader: fileData.uploader,
                    page: page,
                };
            }
        } else {
            if (this.state.type === "") {
                params = {
                    type: "平台宣传",
                    fileName: this.state.fileName,
                    uploader: this.state.uploader,
                    page: page,
                };
            } else {
                params = {
                    type: this.state.type,
                    fileName: this.state.fileName,
                    uploader: this.state.uploader,
                    page: page,
                };
            }

        }
        console.log(params);

        fetch('http://localhost/sharFile/getFileInfo', {
            method: 'post',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode: 'cors',
            cache: 'default'
        })
            .then(res => res.json())
            .then((data) => {//data的数据格式应该为{code:"0000",source:[{},{},...,{}],total:xxx,....(其他参数)}
                console.log(data);
                this.setState({
                    // 这里数据可能需要处理
                    data: data.source,
                    total: data.total,
                });
            })
            .then(error => {
                console.log(error)
            })
    };
    CopyUrl = (url) => {
        copy(url);
        message.success("链接已复制到剪切板！" + url, 1);
    };
    SelectByName = (data) => {

        this.setState({
            currentPage: 1
        });
        this.getFileInfo(data, 1);
    };

    componentDidMount() {
        let data = {
            fileName: "",
            uploader: "",
        };
        this.getFileInfo(data, 1);
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            type: this.props.type,
            currentPage: 1
        });
        this.SelectByType = () => {
            let data = {
                type: this.state.type,
                fileName: "",
                uploader: "",
            };
            this.getFileInfo(data, 1);
        };
    }

    //文件下载操作
    handleDownFile = (event, key) => {
        event.preventDefault();
        event.stopPropagation();
        fetch("http://localhost/sharFile/downloadFile", {
            method: 'post',
            credentials: 'include',
            data: {
                fileKey: key
            },
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then((response) => {
            response.blob().then(blob => {
                let blobUrl = window.URL.createObjectURL(blob);
                const data = new Date();
                const filename = data.toLocaleDateString() + ".zip";
                const aElement = document.createElement('a');
                document.body.appendChild(aElement);
                aElement.style.display = 'none';
                aElement.href = blobUrl;
                aElement.download = filename;
                aElement.click();
                document.body.removeChild(aElement);
            });
            message.success("文件下载成功！", 1)
        }).catch((error) => {
            //关闭loading 按钮恢复正常
            this.setState({
                percent: 0,
            });
            message.warn("文件下载失败", 1);
            console.log('文件下载失败', error);
        });
    };


    // 分页
    changeTablePage = (current) => {
        console.log(current);
        let data = {
            fileName: "",
            uploader: "",
        };
        this.setState({
            currentPage: current
        });
        this.getFileInfo(data, current);
    };


    render() {
        if (this.props.type !== "") {
            if (document.getElementById("judge").value !== this.props.type) {
                this.SelectByType();
                document.getElementById("judge").value = this.props.type;
            }
        }
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
                render: (text, record) => this.state.data.length >= 1 ? (
                    <Space size="middle">
                        <a href="#!" onClick={() => this.PreviewFile(record.file)}>查看</a>
                        <Divider type="vertical" style={{backgroundColor: "black"}}/>
                        <Popconfirm
                            title="确定删除此文档?"
                            onConfirm={() => this.DeleteFile(record.key, record.fileKey)}
                            okText={"确定"}
                            cancelText={"取消"}
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                        >
                            <a href="#!">删除</a>
                        </Popconfirm>
                        <Divider type="vertical" style={{backgroundColor: "black"}}/>
                        <a href="#!" onClick={() => this.CopyUrl(record.url)}>分享</a>
                        <Divider type="vertical" style={{backgroundColor: "black"}}/>
                        <a href="#!" onClick={(event) => this.handleDownFile(event, record.fileKey)}>下载</a>
                    </Space>
                ) : null,
            },
        ];
        // const wo = this.state.wo;
        const {data, prevFileType, isPPT, pptContent, total, wo} = this.state;


        const paginationProps = {
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1,
            total: total,
            current: this.state.currentPage,
            onChange: (current) => this.changeTablePage(current),
        };

        if (!isPPT) {
            return (
                <div style={{backgroundColor: "white", borderRadius: 5}}>
                    <span id={"judge"} style={{display: "none"}}
                          onChange={this.SelectByType}>judge</span>
                    <App getSelectParams={this.SelectByName}/>
                    <Divider/>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={paginationProps}
                    />
                    <Modal
                        title="预览"
                        visible={this.state.visible}
                        footer={null}
                        onCancel={this.handleCancel}
                        centered={true}
                        width={900}
                        bodyStyle={
                            {
                                overflow: "hidden",
                                height: 590,
                            }
                        }
                    >
                        {/*<div style={{*/}
                        {/*    float:"left",*/}
                        {/*    margin:"auto",*/}
                        {/*    width:"100%",*/}
                        {/*}}>*/}
                        <FileViewer
                            fileType={prevFileType}
                            filePath={require("../" + wo)}
                            // filePath={wo}
                        />
                        {/*</div>*/}
                    </Modal>
                </div>
            );
        } else {
            return (
                <div style={{backgroundColor: "white", borderRadius: 5}}>
                    <span id={"judge"} style={{display: "none"}}>judge</span>
                    <App getSelectParams={this.SelectByName}/>
                    <Divider/>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={paginationProps}
                    />
                    <Modal
                        title="预览"
                        visible={this.state.visible}
                        footer={null}
                        onCancel={this.handleCancel}
                        centered={true}
                        width={900}
                        bodyStyle={
                            {
                                overflow: "hidden",
                            }
                        }
                    >
                        <div style={{
                            float: "left",
                            margin: "auto",
                            width: "100%",
                        }}>
                            <PrevPPT dataPic={pptContent}/>
                        </div>
                    </Modal>
                </div>
            )

        }


    }
}

export default Contentfile;