import React, { Component } from 'react';
import { getDetails, commentSave } from '../api/api';
import { message, Icon, Button } from 'antd';
import '../css/details.css';

import Heard from '../componentrs/heard';
import Review from '../componentrs/review';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            detailsData: {},
            showPersonal: false,
            userName: '',
            showReviewText: false, //展示评论框
            contentReview: '' //评论内容
        };
    }

    componentDidMount() {
        let id = this.props.location.state.id;
        let userName = sessionStorage.getItem('userName');
        if (userName) {
            this.setState({
                userName: userName,
                showPersonal: true
            });
        }
        this.getData(id);
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

    showTextArea() {
        this.setState({
            showReviewText: true
        });
    };

    calReview() {
        this.setState({
            showReviewText: false
        });
    };

    getData(id) {
        getDetails(id)
        .then(res => {
            if (res.data.code === 10000) {
                //改变detailsData
                this.setState({
                    detailsData: res.data.data
                });
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(e => {
            message.error(e);
        });
    }

    saveReview() {
        let replier = sessionStorage.getItem('userName');
        if (replier) {
            let params = {
                replier: replier, //回复的人
                byReplier: '', //被回复的人
                content: this.state.contentReview, //回复的内容
                byContentTitle: this.state.detailsData.title, //被回复内容的标题
                id: this.state.detailsData.id, //bogo id
                replyTime: Date.parse(new Date())
            }
            commentSave(params)
            .then(res => {
                if (res.data.code === 10000) {
                    let id = this.props.location.state.id;
                    this.getData(id);
                    this.setState({
                        showReviewText: false
                    });
                }
            })
            .catch(e => {
                message.error(e);
            });
        } else {
            message.warning('请先登入');
        }
    }

    render() {
        return (
            <div>
                <Heard title="详情"/>
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
                <p className="detailsTitle">{ this.state.detailsData.writeName }: { this.state.detailsData.title }</p>
                <p className="detailsTime">{ this.formatTime(this.state.detailsData.createdAt) }</p>
                <p className="detailsContent">{ this.state.detailsData.content }</p>
                <div className="detailsReviewWrap">
                    <a href="javascript:void(0)" className="detailsReview" onClick={this.showTextArea.bind(this)}>评论</a>
                    {
                        this.state.showReviewText ? 
                        <div className="detailsTextAreaWarp">
                            <textarea className="detailsTextArea" value={this.state.contentReview} onChange={(e) => {this.setState({"contentReview":e.target.value})}}></textarea>
                            <div className="reviewBtnWrap">
                                <Button className="reviewSure" type="primary" onClick={this.saveReview.bind(this)}>确定</Button>
                                <Button className="reviewcal" onClick={this.calReview.bind(this)}>取消</Button>
                            </div>
                        </div> : null
                    }
                </div>
                <Review reviewData={this.state.detailsData}/>
            </div>
        );
    }
}

export default Details;