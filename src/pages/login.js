import React, { Component } from 'react';
import Heard from '../componentrs/heard';
import { Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { login } from '../api/api';
import '../css/login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            passWord: ''
        }
    }

    nameChange(e) {
        this.setState({
            userName: e.target.value
        });
    }

    passWordChange(e) {
        this.setState({
            passWord: e.target.value
        });
    }

    toIndex() {
        this.props.history.push('/');
    }

    loginBtn() {
        let param = {
            userName: this.state.userName,
            passWord: this.state.passWord
        }
        login(param)
        .then(res => {
            if (res.data.code === 10000) {
                sessionStorage.setItem('userName', this.state.userName);
                this.props.history.push('/home');
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(e => {
            message.error(e.data.msg);
        });
    }

    render() {
        return(
            <div className="loginWrap">
                <Heard title="登入"/>
                <div className="contentWrap">
                    <Input placeholder="账号" className="loginInput" value={this.state.userName} onChange={this.nameChange.bind(this)}/>
                    <Input placeholder="密码" type="password" className="loginInput" value={this.state.passWord} onChange={this.passWordChange.bind(this)}/>
                </div>
                <div className="btnWrap">
                    <Button type="primary" className="register"><Link to="/register" >注册</Link></Button>
                    <Button type="primary" className="enter" onClick={this.loginBtn.bind(this)}>登入</Button>
                    <Button className="enter" onClick={this.toIndex.bind(this)}>返回</Button>
                </div>
            </div>
        );
    }
}

export default Login