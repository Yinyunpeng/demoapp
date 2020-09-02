import React from "react"
import Space from 'antd/lib/space'
import Divider from 'antd/lib/divider'
import Input from 'antd/lib/input/index'
import message from 'antd/lib/message/index'
import  Button from 'antd/lib/button'
import Descriptions from 'antd/lib/descriptions'
import "../style/DillPage.css"
import FileViewer from "react-file-viewer"
import PrevPPT from "./PrevPPT";


const {TextArea} = Input;


class DillPage extends React.Component {
    state = {
        value: "",
        advice: "",
        ifPPT: false,
        prevFileType: "",
        wo: "",
        pptContent: [
            {
                index: "",
                pic: "",
            },
        ],
        dillKey: "",
        data:
            {
                fileName: "精准营销创兴孵化版本推广宣传材料",
                fileType: "平台宣传",
                fileAuth: "可分享、下载",
                fileDes: "精准营销创兴孵化版本推广宣传材料",
                file: {
                    name: "精准营销平台测试.mp4",
                    // name:"精准营销平台测试.docx",
                    source: {},
                    content: [],
                },
            },
    };
    //同意
    passFile = () => {
        fetch('http://localhost/checkFile/passFile', {
            method: 'post',
            data: {
                ifPass: true,
                fileKey: this.state.dillKey,
                advice: this.state.advice,
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode: 'cors',
            cache: 'default'
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .then(error => {
                console.log(error)
            })

    };

    // 不同意
    refFile = () => {
        fetch('http://localhost/checkFile/refFile', {
            method: 'post',
            data: {
                ifPass: false,
                fileKey: this.state.dillKey,
                advice: this.state.advice,
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            mode: 'cors',
            cache: 'default'
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .then(error => {
                console.log(error)
            })
    };

    reSetPPT = () => {
        this.setState({
            ifPPT: true,
        });
    };
    reSetFile = () => {
        this.setState({
            ifPPT: false,
        })
    };

    PreviewFile = (data) => {
        console.log(data);
        switch (data.file.name.split(".")[1]) {
            case "mp4":
                this.setState({
                    prevFileType: "mp4",
                    ifPPT: false,
                    wo: data.file.url,
                    data: data,
                }, () => {
                    this.reSetFile();
                });
                message.info("mp4格式文件");//采用视频播放的插件
                break;
            case "ppt":
                this.setState({
                    prevFileType: "ppt",
                    ifPPT: true,
                    data: data,
                    pptContent: data.file.content//这里是获取到ppt的图片数组；content的形式应该为[{index:1-x,pic:二进制文件流}]
                }, () => {
                    this.reSetPPT();
                });
                message.info("ppt格式文件");//采用图片预览插件
                break;
            case "pdf":
                this.setState({
                    prevFileType: "pdf",
                    data: data,
                    ifPPT: false,
                    wo: data.file.url,
                },() => {
                    this.reSetFile();
                });
                message.info("pdf格式文件");//图片预览
                break;
            case "doc":
                this.setState({
                    prevFileType: "doc",
                    ifPPT: false,
                    data: data,
                    wo: data.file.url,
                },() => {
                    this.reSetFile();
                });
                message.info("word文档");//文档预览
                break;
            case "docx":
                this.setState({
                    prevFileType: "docx",
                    ifPPT: false,
                    data: data,
                    wo: data.file.url,
                },() => {
                    this.reSetFile();
                });
                message.info("word文档");//文档预览
                break;
            case "xlsx":
                this.setState({
                    prevFileType: "xlsx",
                    ifPPT: false,
                    data: data,
                    wo: data.file.url,
                },() => {
                    this.reSetFile();
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

    getAdvice = (e) => {

        this.setState({
            advice: e.target.value
        })

    };

    getFileInfos = (key) => {

        //测试用例
        let data = {};
        if (key === "1111") {
            data =
                {
                    fileName: "精准营销创兴孵化版本推广宣传材料",
                    fileType: "平台宣传",
                    fileAuth: "可分享、下载",
                    fileDes: "精准营销创兴孵化版本推广宣传材料",
                    file: {
                        name: "精准营销平台测试.mp4",
                        source: {},
                        url: "ceshi/Ink Style Parallax Slideshow.mp4"
                    },
                }
        } else {
            data =
                {
                    fileName: "精准营销创兴孵化版本推广宣传材料",
                    fileType: "平台宣传",
                    fileAuth: "可分享、下载",
                    fileDes: "精准营销创兴孵化版本推广宣传材料",
                    file: {
                        name: "精准营销平台测试.ppt",
                        source: {},
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
                        ],
                    },
                }

        }

        this.PreviewFile(data);

        fetch('http://localhost/checkFile/dillFile', {
            method: 'post',
            data: {
                fileKey: key,

            },
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
                this.PreviewFile(data);
            })
            .then(error => {
                console.log(error)
            })
    };


    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.handelKey !== 0) {
            if (document.getElementById("judgeK").value !== this.props.handelKey) {
                this.setState({
                    dillKey: this.props.handelKey
                });
                this.getFileInfos(this.props.handelKey);
                document.getElementById("judgeK").value = this.props.handelKey;
            }
        }
    }


    render() {
        const {data, prevFileType, ifPPT, pptContent, wo, advice} = this.state;
        
        if (!ifPPT) {
            return (
                <div className={"first"}>
                    <span id={"judgeK"} style={{display: "none"}}>judge</span>
                    <div className={"first_left"}>
                        <p style={{float: "right"}}>审核意见</p>
                    </div>
                    <div className={"first_mid"}>
                        <TextArea
                            rows={5}
                            allowClear={true}
                            value={advice}
                            onChange={this.getAdvice.bind(this)}
                        />
                    </div>
                    <div className={"first_right"}>
                        <Space style={{float: "right"}}>
                            <Button type={"primary"} onClick={this.passFile}> 同意 </Button>
                            <Button type={"default"} onClick={this.refFile}> 不同意</Button>
                        </Space>
                    </div>
                    <Divider/>

                    <div style={{padding: 10}}>
                        <Descriptions
                            title="文档详情"
                        >
                            <Descriptions.Item label="文档名称">{data.fileName}</Descriptions.Item>
                            <Descriptions.Item label="文档分类">{data.fileType}</Descriptions.Item>
                            <Descriptions.Item label="权限限制">{data.fileAuth}</Descriptions.Item>
                            <Descriptions.Item label="文档描述">{data.fileDes}</Descriptions.Item>
                        </Descriptions>

                    </div>
                    <Divider/>
                    <div style={{
                        overflow: "hidden",
                    }}>
                        <h1>{data.file.name}</h1>
                        <div style={{
                            float: "left",
                            overflow: "auto",
                            maxHeight: 700,
                        }}>
                            <FileViewer
                                fileType={prevFileType}
                                filePath={require("../" + wo)}
                                // filePath={wo}
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={"first"}>
                    <span id={"judgeK"} style={{display: "none"}}>judge</span>
                    <div className={"first_left"}>
                        <p style={{float: "right"}}>审核意见</p>
                    </div>
                    <div className={"first_mid"}>
                        <TextArea
                            rows={5}
                            allowClear={true}
                        />
                    </div>
                    <div className={"first_right"}>
                        <Space style={{float: "right"}}>
                            <Button type={"primary"} onClick={this.passFile}> 同意 </Button>
                            <Button type={"default"} onClick={this.refFile}> 不同意</Button>
                        </Space>
                    </div>
                    <Divider/>

                    <div style={{padding: 10}}>
                        <Descriptions
                            title="文档详情"
                        >
                            <Descriptions.Item label="文档名称">{data.fileName}</Descriptions.Item>
                            <Descriptions.Item label="文档分类">{data.fileType}</Descriptions.Item>
                            <Descriptions.Item label="权限限制">{data.fileAuth}</Descriptions.Item>
                            <Descriptions.Item label="文档描述">{data.fileDes}</Descriptions.Item>
                        </Descriptions>

                    </div>
                    <Divider/>
                    <div>
                        <h1>{data.file.name}</h1>
                        <div style={{
                            float: "left",
                            margin: "auto",
                            width: 900,
                        }}>
                            <PrevPPT dataPic={pptContent}/>
                        </div>
                    </div>
                </div>
            )
        }


    }

}

export default DillPage;