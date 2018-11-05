import React, { Component } from 'react';
import { commentSave, getDetails } from '../api/api';
import '../css/review.css';
import { Button, message } from 'antd';

class Review extends Component{
    constructor(props) {
        super(props);
        this.state = {
            reviewData: {},
            showReviewText: false,
            nowIndex: '', //当前回复的第几条
            contentReview: '' //回复的内容
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            reviewData: nextProps.reviewData
        });
    }

    formatTime(time) {
        var d = new Date(time);
        var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return times
    }

    calReview() {
        this.setState({
            showReviewText: false
        });
    };

    showReply(index) {
        this.setState({showReviewText: true, nowIndex: index})
    }

    saveReview() {
        let replier = sessionStorage.getItem('userName');
        let Index = this.state.nowIndex;
        let params = {
            replier: replier, //回复的人
            byReplier: this.state.reviewData.reply[Index].replier, //被回复的人
            content: this.state.contentReview, //回复的内容
            byContentTitle: this.state.reviewData.title, //被回复内容的标题
            id: this.state.reviewData.id, //bogo id
            replyTime: Date.parse(new Date())
        }
        commentSave(params)
        .then(res => {
            if (res.data.code === 10000) {
                let id = this.state.reviewData.id;
                this.getData(id);
                this.setState({
                    showReviewText: false
                });
            }
        })
        .catch(e => {
            message.error(e);
        });
    };

    getData(id) {
        getDetails(id)
        .then(res => {
            if (res.data.code === 10000) {
                //改变detailsData
                this.setState({
                    reviewData: res.data.data
                });
            } else {
                message.error(res.data.msg);
            }
        })
        .catch(e => {
            message.error(e);
        });
    }

    render() {
        return(
            <div>
                {
                    (this.state.reviewData.reply !== undefined && this.state.reviewData.reply.length !== 0) ?
                    <ul className="reviewComponentWrap">
                        {
                            this.state.reviewData.reply.map((item, index) => {
                                return (
                                    <li className="reviewComponentLi" key={index}>
                                        <div>
                                            <span>{ item.replier } </span>
                                            {
                                                item.byReplier !== '' ? 
                                                <span>
                                                    <span className="huifuText">回复：</span>
                                                    <span>{ item.byReplier }</span> 
                                                </span> : null
                                            }
                                            
                                        </div>
                                        <p>  { item.content }</p>
                                        <div className="timeBottom">
                                            <a href="javascript:void(0)" onClick={this.showReply.bind(this, index)}>回复</a>
                                            <p className="timeP">{ this.formatTime(item.replyTime) }</p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul> : null
                }
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
        );
    }
}

export default Review