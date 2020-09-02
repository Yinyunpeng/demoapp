import React from 'react';
import "../style/App.css"
import "antd/dist/antd.css";
import Input from 'antd/lib/input/index'
import Upload from 'antd/lib/upload/index'
import message from 'antd/lib/message/index'
import Modal from 'antd/lib/modal/index'
import Button from 'antd/lib/button'


import {AudioOutlined, UploadOutlined, PlusCircleOutlined, SearchOutlined} from '@ant-design/icons';
import ChoseType from "./ChoseType";
import ShareAuth from "./ShareAuth";

const {Search, TextArea} = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const formData = new FormData();

class App extends React.Component {

    state = {
        ModalText: '',
        visible: false,
        confirmLoading: false,
        fileList: [],
        fileName: '',
        fileDescription: '',
        // uploading: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    changeFileName = (e) => {
        this.setState({
            fileName: e.target.value,
        })
    };
    changeType = () => {
        const {value} = this.child1.state;
        return value;
    };

    changeFileAuth = () => {
        const {value} = this.child.state;
        return value;


    };

    handleTextareaChange(e) {
        this.setState({
            fileDescription: e.target.value
        })
    };

    // handleUpload = () => {
    //     const {fileList} = this.state;
    //     console.log(fileList);
    //     fileList.forEach(file => {
    //         formData.append('files', file);
    //     });
    //     this.setState({
    //         uploading: true,
    //     });
    // };

    handleOk = () => {

        let flag = true;
        let fileName = this.state.fileName;
        let fileType = this.changeType();
        let fileList = this.state.fileList;

        if (fileName === "") {
            message.warn("文件名字不能为空,请输入文件名！", 1);
            flag = false;
        } else {
            formData.append("fileName", this.state.fileName);
            if (fileType === undefined) {
                message.warn("请选择文档的分类！", 1);
                flag = false;
            } else {
                formData.append("fileType", this.changeType());
                if (fileList.length === 0) {
                    message.warn("请选择要上传的文件！", 1);
                    flag = false;
                } else {
                    if (!formData.has("files")) {
                        message.warn("请点击准备上传按钮....");
                        flag = false;
                    }
                }
            }
        }
        formData.append("fileAuth", this.changeFileAuth());

        formData.append("fileDesc", this.state.fileDescription);

        if (flag) {
            console.log(formData);
            this.setState({
                ModalText: '正在提交请稍等......',
                confirmLoading: true,
            });
            const hide = message.loading("正在提交，请勿点击......");

            fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
                method: "post",
                body: formData,
            })
                .then(response => {

                    this.setState({
                        fileList: [],
                        uploading: false,
                        confirmLoading: false,
                        fileName: '',
                        fileDescription: '',
                        ModalText: '',
                    });
                    setTimeout(hide, 0);
                    message.success('upload successfully.', 2);
                    return response.json()
                })
                .catch(error => {
                    this.setState({
                        uploading: false,
                        confirmLoading: false,
                        ModalText: '提交失败，请检查文件大小...',
                    });
                    setTimeout(hide, 0);
                    message.error('upload failed.', 2);
                    console.error('Error:', error)
                })
                .then(response => console.log('Success:', response));
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            confirmLoading: false,
            uploading: false,
            ModalText: '',
        });
    };
    SelectByFileName = (name) => {

        let data = {
            fileName: name,
            uploader: "",
        };
        this.props.getSelectParams(data);
    };
    SelectByUp = (uploader) => {
        let data = {
            fileName: "",
            uploader: uploader,
        };
        this.props.getSelectParams(data);
    };
    SelectByAll = () => {
        let data = {
            fileName: document.getElementById("searchName").value,
            uploader: document.getElementById("searchUp").value,
        };
        this.props.getSelectParams(data);
    };

    render() {
        const {visible, confirmLoading, ModalText, fileList, fileDescription, fileName} = this.state;

        const props = {
            listType: "picture",
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                console.log(file);
                if (file.name.split(".")[1] === 'mp4'
                    || file.name.split(".")[1] === 'doc'
                    || file.name.split(".")[1] === 'docx'
                    || file.name.split(".")[1] === 'ppt'
                    || file.name.split(".")[1] === 'xlsx'
                    || file.name.split(".")[1] === 'pptx'
                    || file.name.split(".")[1] === 'pdf'
                ) {
                    this.setState(state => ({
                        fileList: [...state.fileList, file],
                    }), () => formData.append("files", this.state.fileList));
                } else {
                    message.error("不支持该类型文件上传！")
                }
                return false;
            },
            fileList,
        };

        return (
            <div className={"box"}>
                <span>名称</span>
                <Search
                    placeholder="—— 请输入 ——"
                    onSearch={value => this.SelectByFileName(value)}//钩子
                    style={{width: 250, textAlign: "center"}}
                    suffix={suffix}
                    id={"searchName"}
                    title={"只根据类型和名称进行查询"}
                />
                <span>上传人</span>
                <Search
                    placeholder="—— 请输入 ——"
                    onSearch={value => this.SelectByUp(value)}//钩子
                    style={{width: 250}}
                    suffix={suffix}
                    id={"searchUp"}
                    title={"只根据类型和上传人进行查询"}
                />
                <Button
                    type={"primary"}
                    style={{float: "right", padding: "4px 8px"}}
                    onClick={this.SelectByAll}
                    title={"根据所填的所有参数进行查询"}
                >
                    <SearchOutlined
                        style={{
                            fontSize: 16,
                            margin: 0,
                        }}
                    />
                    查询
                </Button>

                <Button type="primary" onClick={this.showModal} style={{float: "right", padding: "4px 8px"}}
                        title={"新增文档"}>
                    <PlusCircleOutlined
                        style={{
                            fontSize: 16,
                            margin: 0,
                        }}
                    />
                    新增
                </Button>
                <Modal
                    title="新增文档"
                    style={{width: 600}}
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    okText={"提交"}
                    cancelText={"取消"}
                    width={600}

                >

                    <div>
                        <span>文档名称：</span><Input
                        onChange={this.changeFileName.bind(this)}
                        allowClear={true}
                        value={fileName}
                    />
                    </div>
                    <br/>
                    <div>
                        <span>文档分类</span><ChoseType onRef1={l => (this.child1 = l)}/>
                    </div>
                    <br/>
                    <div>
                        <span>权限限制：</span><ShareAuth onRef={r => (this.child = r)}/>
                    </div>
                    <br/>
                    <div>
                        <span>文档描述</span>
                        <TextArea
                            rows={4}
                            allowClear={true}
                            value={fileDescription}
                            onChange={this.handleTextareaChange.bind(this)}
                        />
                    </div>
                    <br/>
                    <div>
                        <span>上传文件</span><br/>
                        <Upload {...props}>
                            <Button>
                                <UploadOutlined/> 选择
                            </Button>
                        </Upload>
                        {/*<Button*/}
                        {/*    type="primary"*/}
                        {/*    onClick={this.handleUpload}*/}
                        {/*    disabled={fileList.length === 0}*/}
                        {/*    loading={uploading}*/}
                        {/*    style={{marginTop: 16}}*/}
                        {/*>*/}
                        {/*    {uploading ? '请提交...' : '准备上传'}*/}
                        {/*</Button>*/}
                    </div>
                    <div style={{overflow: "hidden"}}>
                        <span style={{color: "gray", float: "left"}}>注：支持Word\Excel\PDF\PPT文件和MP4上传，文件大小不超过300M。</span>
                        <span style={{color: "red", float: "left"}}>提示：不得上传违法违禁内容。</span>
                    </div>
                    <br/>
                    <span style={{color: "blue"}}>{ModalText}</span>
                    <br/>
                </Modal>


            </div>
        );
    }


}

export default App;
