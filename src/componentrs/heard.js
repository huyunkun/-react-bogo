import React, { Component } from 'react';
import { Icon } from 'antd';
import '../css/heard.css';

class Heard extends Component {
    render() {
        return(
            <div className="heardWrap">
                <div className="textWrap">
                    <Icon type="bars" className="icon"/>
                    <span className="heardSpan">{ this.props.title }</span>
                </div>
            </div>
        );
    }
}

export default Heard