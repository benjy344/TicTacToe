import React, { Component } from 'react'
import jwt                  from 'jsonwebtoken'
import { APP_IP, APP_PORT } from '../path/Conf'

// CHARTS
import ReactEchartsCore     from 'echarts-for-react/lib/core'
import echarts              from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import {dataStyle,
        theme,
        placeHolderStyle }  from './statsConfig'

class Stats extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      account: jwt.verify(localStorage.getItem('id_token'), 'patate'),
      stats: {}

    }
  }

  componentWillMount() {
    const config = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') }
    }
    fetch(`http://${APP_IP}:${APP_PORT}/users/${jwt.verify(localStorage.getItem('id_token'), 'patate').id}/getStats`, config)
    .then((response) => response.json())
    .then((stats)=>{
      this.setState({
        stats,
        loading:false
      })
    })
  }

  calculPercent(value, ofValue) {
    return (value*100)/ofValue
  }


  render() {
    let option = {
      title: {
        text: this.state.account.pseudo,
        subtext: this.state.stats.total+' game'+(this.state.stats.total>1?'s':''),
        x: 'center',
        y: 'center',
        itemGap: 20,
        textStyle : {
          color : 'rgba(255,255,255,0.8)',
          fontFamily : 'Helvetica',
          fontSize : 35,
          fontWeight : '100',
          textTransform: "uppercase"
        }
      },
      tooltip : {
        show: true,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient : 'vertical',
        x : document.getElementsByClassName('game')[0].offsetWidth / 2,
        y : 45,
        itemGap:12,
        data:['wins','loses','equality']
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      series : [
      {
        name:'WIN',
        type:'pie',
        clockWise:false,
        radius : [125, 150],
        itemStyle : dataStyle,
        data:[
        {
          value: this.state.stats.win,
          name: "wins"
        },
        {
          value:this.state.stats.total-this.state.stats.win,
          name:'games',
          itemStyle : placeHolderStyle
        }
        ]
      },
      {
        name:'LOSE',
        type:'pie',
        clockWise:false,
        radius : [100, 125],
        itemStyle : dataStyle,
        data:[
        {
          value:this.state.stats.lose,
          name:'loses'
        },
        {
          value:this.state.stats.total-this.state.stats.lose,
          name:'games',
          itemStyle : placeHolderStyle
        }
        ]
      },
      {
        name:'EQUALITY',
        type:'pie',
        clockWise:false,
        radius : [75, 100],
        itemStyle : dataStyle,
        data:[
        {
          value:this.state.stats.equality,
          name:'equality'
        },
        {
          value:this.state.stats.total-this.state.stats.equality,
          name:'games',
          itemStyle : placeHolderStyle
        }
        ]
      }
      ]
    }
    echarts.registerTheme('dark', theme)

    return (
      <div>
        {this.state.loading &&
          <span className="loading">
            <svg id="load" x="0px" y="0px" viewBox="0 0 75 75">
              <circle id="loading-inner" cx="37" cy="37" r="30"/>
            </svg>
          </span>
        }
        {!this.state.loading &&
          <ReactEchartsCore
          echarts={echarts}
          option={option}
          style={{height:'400px', fontFamily:'Open Sans'}}
          notMerge={true}
          lazyUpdate={true}
          theme={"dark"} />}
      </div>

      )

  }

}

export default Stats