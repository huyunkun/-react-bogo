import React, { Component } from 'react';
import { allbogo } from '../api/api';
import { message, Icon } from 'antd';
import '../css/allBogo.css';

import Heard from '../componentrs/heard'

class allBogo extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            showPersonal: false,
            showBogo: false, //无bogo
            allBogosData: [] //所有bogo数据
        };
    }

    componentDidMount() {
        let userName = sessionStorage.getItem('userName');
        if (userName !== null) {
            this.setState({
                userName: userName,
                showPersonal: true
            });
        }
        allbogo()
        .then(res => {
            if (res.data.code === 10000) {
                if (res.data.data.length !== 0) {
                    this.setState({
                        showBogo: true,
                        allBogosData: res.data.data
                    });
                } else {
                    this.setState({
                        showBogo: false
                    });
                }
            } else {
                message.error(res.data.msg);
            }
        })
        .catch( e => {
            message.error('请求出错');
        })
    }

    toHome() {
        this.props.history.push('/home');
    }

    toIndex() {
        this.props.history.push('/');
    }

    formatTime(time) {
        var d = new Date(time);
        var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return times
    }

    toDetails(id) {
        this.props.history.push('/details', {id:id});
    }

    render() {
        return(
            <div className="allBogosWrap">
                <Heard title="全部bogo"/>
                {
                    this.state.showPersonal ? 
                    <div className="allWrap" >
                        <div >
                            <span className="userText" onClick={this.toHome.bind(this)}>{this.state.userName}</span>
                            <Icon type="user" className="userIcon" onClick={this.toHome.bind(this)} />
                            <Icon type="home" className="allBogoToHome" onClick={this.toIndex.bind(this)} />
                        </div>
                    </div> : null
                }
                {
                    this.state.showBogo ? 
                    <div>
                        <ul className="bogosUl">
                            {
                                this.state.allBogosData.map((item, index) => {
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
                    </div> : 
                    <div className="noAllBogo">
                        暂无bogo
                    </div>
                }
            </div>
        );
    }
}

export default allBogo
