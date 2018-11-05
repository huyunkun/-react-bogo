import React, { Component } from 'react';
import { vcode } from '../api/api';
import '../css/vcode.css'

class VCode extends Component {
    constructor(props) {
      super(props)
      this.state = {
        color: [],
        data: [],
        fz: [],
        rotate: [],
        refresh: false
      }
    }

    // componentWillReceiveProps(nextProps) {
    //     const newdata = nextProps.vcode.toString();
    //     const newSend = nextProps.send;
    //     let _this = this;
    //     if (vcode.toString() !== newdata) {
    //         this.setState({
    //             vcode: newdata,
    //         })
    //     }
    //     if (newSend) {
    //         let dataArr = newdata.split('');
    //         let sendData = [];
    //         dataArr.map((item, index) => {
    //             item = Number(item.charCodeAt());
    //             item = item > 64 && item < 91 ? item - 7 : ( item < 64 ? item : item - 13 );
    //             sendData.push(item);
    //         });
    //         let param = {
    //             vcode: sendData,
    //             send: newSend,
    //             vcodeData: this.state.data
    //         }
    //         vcode(param).then(res => {
    //             console.log(res);
    //             _this.props.handleVcode(false);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     }
    // }

    componentDidMount() {
      this.initState();
      this.canvas()
    }

    initState() {
        let param = {
            vcode: '',
            send: false
        }
        vcode(param).then(res => {
            this.setState({
                color: res.data.data.vcode.color,
                data: res.data.data.vcode.data,
                fz: res.data.data.vcode.fz,
                rotate: res.data.data.vcode.rotate,
            });
            this.props.handleVcode({vcode: this.state.data, send: false});
        })
        .catch(err => {
            console.log(err);
        });
    }
  
    getRandom(max, min, num) {
      const asciiNum = ~~(Math.random()*(max-min+1)+min)
      if(!Boolean(num)){
        return asciiNum
      }
      const arr = []
      for(let i = 0; i < num; i++){
        arr.push(this.getRandom(max, min))
      }
      return arr
    }
  
    canvas() {
      const { getRandom } = this
      const canvas = document.getElementById('bgi')
      let ctx = canvas.getContext('2d')
      canvas.height = canvas.height
      // ctx.clearRect(0, 0, canvas.width(), canvas.height())
      ctx.strokeStyle = `rgb(${this.getRandom(100,10,3).toString()})`
      for( let i = 0; i< 7; i++ ) {
        ctx.lineTo(getRandom(200,0),getRandom(200,10))
        ctx.moveTo(getRandom(200,0),getRandom(200,0))
        ctx.stroke();
      }
    }
  
    render() {
      const { rotate, fz, color } = this.state
      return (
        <div className='vcodewrap' >
          <canvas id="bgi" width="200" height="200"></canvas>
          {this.state.data.map((v,i) => 
            <div
              key={i}
              className='itemStr'
              style={{
                transform:`rotate(${rotate[i]}deg)`,
                fontSize: `${fz[i]}px`,
                color: `rgb(${color[i].toString()})`
              }}
              onMouseEnter={() => this.setState({refresh:true})}
            >
              {String.fromCharCode(v > 57 && v < 84 ? v + 7 : ( v < 57 ? v : v + 13 ))}
            </div>  
          )}
        {
          this.state.refresh
          ? <div 
              className='mask'
              onClick={() => {
                this.setState({...this.initState(),refresh: false})
                this.canvas()
              }}
              onMouseLeave={() => {this.setState({refresh: false})}}
            > 看不清？点击刷新  
            </div> 
          : null}
        </div>
      )
    }
  }
  
  export default VCode;