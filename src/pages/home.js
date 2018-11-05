import React, { Component } from 'react';
import '../css/home.css';
import { Icon, message, Button, Input } from 'antd';
import { personalBogo, createBogo } from '../api/api'; 

import Heard from '../componentrs/heard'


class Index extends Component {
    constructor() {
        super();
        this.state = {
            createTitle: '', //创建的标题
            createContent: '', //创建的内容
            userName: '',
            showPersonal: false,
            showPersonalBogo: false, //是否有个人bogo
            showNoPersonalBogo: false, //展示没有bogo的模块
            createBogo: false, //新建bogo展示
            bogoData: [] //bogo数据
        }
    }

    componentDidMount() {
        let userName = sessionStorage.getItem('userName');
        if (userName) {
            this.setState({
                userName: userName,
                showPersonal: true
            },() => {
                this.getMyBogo();
            });
        }
    }

    getMyBogo() {
        personalBogo(this.state.userName)
        .then(res => {
            console.log(res.data);
            if (res.data.code === 10000) {
                this.setState({
                    showPersonalBogo: true,
                    bogoData: res.data.data
                });
            } else if (res.data.code === 10002) { //暂无bogo
                this.setState({
                    showNoPersonalBogo: true,
                    showCreateBtn: true
                });
            }
        })
        .catch(e => {
            message.error('调用接口失败');
        });
    }

    showCreate() {
        this.setState({
            createBogo: true,
        });
        if (this.state.bogoData.length === 0) {
            this.setState({
                showCreateBtn: false,
                showNoPersonalBogo: false
            });
        } else {
            this.setState({
                showPersonalBogo: false
            });
        }
    }

    create() {
        let params = {
            title: this.state.createTitle,
            content: this.state.createContent,
            userName: this.state.userName
        }
        createBogo(params)
        .then(res => {
            if (res.data.code === 10000) {
                this.setState({
                    createBogo: false,
                    showPersonalBogo: true
                },() => {
                    this.getMyBogo();
                });
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(e => {
            message.error('接口调用失败');
        });
    }

    cancelCreate() { //取消创建
        this.setState({
            createBogo: false
        }, () => {
            if (this.state.bogoData.length === 0) { //没有bogo的情况
                this.setState({
                    showNoPersonalBogo: true
                });
            } else {
                this.setState({ //有bogo的情况
                    createBogo: false,
                    showPersonalBogo: true
                });
            }
        });
    }

    toDetails(id) {
        this.props.history.push(`/details`, {id:id});
    }

    back() {
        window.history.back();
    }

    formatTime(time) {
        var d = new Date(time);
        var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return times
    }

    toIndex() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="homeWrap">
                <Heard title="我的bogo"/>
                {
                    this.state.showPersonal ? 
                    <div className="personalWrap" >
                        <div>
                            <Icon onClick={this.back.bind(this)} type="arrow-left" className="arrowIcon"/>
                            <Button className="heardBtn" onClick={this.showCreate.bind(this)}>新建bogo</Button>
                        </div>
                        <div>
                            <span className="userText">{this.state.userName}</span>
                            <Icon type="user" className="userIcon"/>
                            <Icon type="home" className="allBogoToHome" onClick={this.toIndex.bind(this)} />
                        </div>
                    </div> : null
                }
                {
                    this.state.showPersonalBogo ?
                    <div>
                        <ul className="bogosUl">
                            {
                                this.state.bogoData.map((item, index) => {
                                    return (
                                        <li className="bogosLi" key={item.id} onClick={this.toDetails.bind(this, item.id)}>
                                            <span className="allbogosTitle">{ item.title } （作者：{item.writeName}）</span>
                                            <p className="allbogosContent">{ item.content }</p>
                                            <span className="allbogosTime">{ this.formatTime(item.createdAt) }</span>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div> : null
                }
                {
                    this.state.showNoPersonalBogo ? 
                    <div className="noAllBogo">
                        <Button onClick={this.showCreate.bind(this)}>新建bogo</Button>
                    </div> : null
                }
                {
                    this.state.createBogo ? 
                    <div className="createWrap">
                        <span className="titleText">标题： </span>
                        <Input className="title" placeholder="标题" value={this.state.createTitle} onChange={(e) => {this.setState({createTitle:e.target.value})}}/>
                        <textarea className="createText" value={this.state.createContent} onChange={(e) => {this.setState({createContent:e.target.value})}}></textarea>
                        <Button className="createBtn" type="primary" onClick={this.create.bind(this)}>确定</Button>
                        <Button onClick={this.cancelCreate.bind(this)}>取消</Button>
                    </div> : null
                }
            </div>
        );
    }
}

export default Index