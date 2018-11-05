import React, { Component } from 'react';
import '../css/index.css';
import { Icon, message} from 'antd';
import { Link } from 'react-router-dom';

import Heard from '../componentrs/heard'


class Index extends Component {

    constructor(){
        super();
        this.state = {};
    }

    toHome() {
        let userName = sessionStorage.getItem('userName');
        if (userName) {
            this.props.history.push('/home');
        } else {
            message.warning('请先登入');
        }
    }

    render() {
        return (
            <div className="homeWrap">
                <Heard title="首页"/>
                <ul className="homeUl">
                    <li className="homeLi" onClick={this.toHome.bind(this)}><span>我的bogo</span><Icon type="home" /></li>
                    <Link to="/login">
                        <li className="homeLi"><span>登入</span><Icon type="user" /></li>
                    </Link>
                    <Link to="/search">
                        <li className="homeLi"><span>搜索</span><Icon type="search" /></li>
                    </Link>
                    <Link to="/allBogo">
                        <li className="homeLi"><span>全部bogo</span><Icon type="file-text" /></li>
                    </Link>
                </ul>
            </div>
        );
    }
}

export default Index