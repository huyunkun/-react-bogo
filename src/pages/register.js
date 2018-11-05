import React, { Component } from 'react';
import Heard from '../componentrs/heard';
import VCode from '../componentrs/vcode';
import { Input, Button, message } from 'antd';
import '../css/login.css';
import { register } from '../api/api';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            passWord: '',
            vcode: '',
            send: false,
            vcodeData: ''
        }
    }

    handleVcode(val) {
        console.log(val);
        this.setState({
            send: val.send,
            vcodeData: val.vcode
        });
        console.log(this.state);
    }

    loginF() {
        this.setState({
            send: true
        })
        let param = {
            name: this.state.name,
            passWord: this.state.passWord,
            vcodeData: this.state.vcodeData,
            vcode: this.state.vcode,
            send: true
        }
        register(param).then(res => {
            if (res.data.code === 10000) {
                message.success('注册成功');
                this.props.history.push('/login');
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        }); 
    }

    toLogin() { //跳转至登录页
        this.props.history.push('/login');
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    changePassWord(e) {
        this.setState({
            passWord: e.target.value
        });
    }
    changeVcode(e) {
        this.setState({
            vcode: e.target.value
        });
    }

    render() {
        return(
            <div className="loginWrap">
                <Heard title="注册"/>
                <div className="contentWrap">
                    <Input placeholder="账号" value={this.state.name} className="loginInput" onChange={this.changeName.bind(this)}/>
                    <Input type="password" placeholder="密码" value={this.state.passWord} className="loginInput" onChange={this.changePassWord.bind(this)}/>
                    <Input placeholder="验证码" value={this.state.vcode} className="loginInput" onChange={this.changeVcode.bind(this)}/>
                    <div className="vcodeWarp">
                        <VCode vcode={this.state.vcode} send={this.state.send} handleVcode={this.handleVcode.bind(this)}/>
                    </div>
                </div>
                <div className="btnWrap">
                    <Button type="primary" className="sure" onClick={ this.loginF.bind(this) }>确定</Button>
                    <Button className="sure" onClick={ this.toLogin.bind(this) }>返回</Button>
                </div>
            </div>
        );
    }
}

export default Register