import React, { Component } from 'react';
import GraphView from 'components/view/GraphView'
import moment from 'moment'

import data from 'data/users.json';

class GraphContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      userSetting: {
        xAxisStart: 60,
        xAxisEnd: 228
        // all_Data index 60번~228번이 20일 00시~ 27일 00시 사이.
        // 제한범위: from 0 to 168 ~ from 72~240
      }
    }
  }

  increaseXAxis = () => {
    const { xAxisStart, xAxisEnd } = this.state.userSetting
    if(!(xAxisStart >= 72)){
      this.setState({
        userSetting:{
          xAxisStart: xAxisStart+4,
          xAxisEnd: xAxisEnd+4
        }
      })
    }
  }
  decreaseXAxis = () => {
    const { xAxisStart, xAxisEnd } = this.state.userSetting
    if(!(xAxisStart <= 0)){
      this.setState({
        userSetting:{
          xAxisStart: xAxisStart-4,
          xAxisEnd: xAxisEnd-4
        }
      })
    }
  }

  componentWillMount(){
    let ALL_Data = {} // object 형태로 다시 파싱합니다. key: "MM/DD/HH시" 꼴의 string, value: 출현빈도수
    let IOS_Data = {}
    let Android_Data = {}

    data.map(datum => {
      return datum.date
    }).forEach(x => {
      let key = ALL_Data[moment(x).format('MM/DD/HH시')]
      if(!key) {
        ALL_Data[moment(x).format("MM/DD/HH시")] = 1
        IOS_Data[moment(x).format('MM/DD/HH시')] = 0
        Android_Data[moment(x).format('MM/DD/HH시')] = 0
      }
      else ALL_Data[moment(x).format("MM/DD/HH시")]++
    })

    data.filter(datum => {
      return datum.device === "iOS 10.0" || datum.device === "iOS 9.1"
    }).map(datum => {
      return datum.date
    }).forEach(x => {
      IOS_Data[moment(x).format("MM/DD/HH시")]++
    })

    data.filter(datum => {
      return datum.device === "Android 4.4" || datum.device === "Android 5.0"
    }).map(datum => {
      return datum.date
    }).forEach(x => {
      Android_Data[moment(x).format("MM/DD/HH시")]++
    })

    localStorage.setItem('ALL_Data',JSON.stringify(ALL_Data))
    localStorage.setItem('IOS_Data',JSON.stringify(IOS_Data))
    localStorage.setItem('Android_Data',JSON.stringify(Android_Data))

    let { xAxisStart,xAxisEnd } = this.state.userSetting

    this.setState({
      chartData:{
        labels: (Object.keys(ALL_Data)).slice(xAxisStart,xAxisEnd+1),
        datasets:[
          {
            label:'전체',
            data:Object.values(ALL_Data).slice(xAxisStart,xAxisEnd+1),
            borderColor:'#1864ab',
            backgroundColor: "rgba(220,220,220,0)",
            pointBackgroundColor: '#1864ab',
            borderWidth: 1,
            pointRadius: 0
          },
          {
            label:'안드로이드',
            data:Object.values(Android_Data).slice(xAxisStart,xAxisEnd+1),
            borderColor:'#c92a2a',
            backgroundColor:  "rgba(220,220,220,0)",
            pointBackgroundColor: '#c92a2a',
            borderWidth: 1,
            pointRadius: 0
          },

          {
            label:'IOS',
            data:Object.values(IOS_Data).slice(xAxisStart,xAxisEnd+1),
            borderColor:'#fab005',
            backgroundColor: "rgba(220,220,220,0)",
            pointBackgroundColor: '#fab005',
            borderWidth: 1,
            pointRadius: 0
          }
        ]
      }
    });
  }

  shouldComponentUpdate(nextProps,nextState){
    return this.state.userSetting !== nextState.userSetting
  }

  componentWillUpdate(nextProps,nextState){
    const ALL_Data = JSON.parse(localStorage.getItem('ALL_Data'))
    const Android_Data = JSON.parse(localStorage.getItem('Android_Data'))
    const IOS_Data = JSON.parse(localStorage.getItem('IOS_Data'))

    const { xAxisStart, xAxisEnd } = this.state.userSetting
    this.setState({
      chartData:{
        labels: (Object.keys(ALL_Data)).slice(xAxisStart,xAxisEnd+1),
        datasets:[
          {
            label:'전체',
            data:Object.values(ALL_Data).slice(xAxisStart,xAxisEnd+1),
            borderColor:'#1864ab',
            backgroundColor: "rgba(220,220,220,0)",
            pointBackgroundColor: '#1864ab',
            borderWidth: 1,
            pointRadius: 0
          },
          {
            label:'안드로이드',
            data:Object.values(Android_Data).slice(xAxisStart,xAxisEnd+1),
            borderColor:'#c92a2a',
            backgroundColor:  "rgba(220,220,220,0)",
            pointBackgroundColor: '#c92a2a',
            borderWidth: 1,
            pointRadius: 0
          },

          {
            label:'IOS',
            data:Object.values(IOS_Data).slice(xAxisStart,xAxisEnd+1),
            borderColor:'#fab005',
            backgroundColor: "rgba(220,220,220,0)",
            pointBackgroundColor: '#fab005',
            borderWidth: 1,
            pointRadius: 0
          }
        ]
      }
    })
  }

  render() {

    return (
      <GraphView
        chartData={this.state.chartData}
        increaseXAxis={this.increaseXAxis}
        decreaseXAxis={this.decreaseXAxis}
      />
    )
  }
}

export default GraphContainer;