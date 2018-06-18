import React, { Component } from 'react';
import GraphView from 'components/view/GraphView'
import moment from 'moment'
import { Map, List } from 'immutable' // 불변 내부객체 문제 때문에 facebook 라이브러리를 사용했습니다.

import data from 'data/users.json';

class GraphContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      chartData: Map({
        labels: null,
        datasets: List([])
      }),
      userSetting: Map({
        xAxisStart: 60,
        xAxisEnd: 228
        // all_Data index 60번~228번이 20일 00시~ 27일 00시 사이.
        // 제한범위: from 0 to 168 ~ from 72~240 (7일치 데이터)
      })
    }
  }

  increaseXAxis = () => {
    const { userSetting } = this.state
    const xAxisStart = userSetting.get('xAxisStart')
    const xAxisEnd = userSetting.get('xAxisEnd')

    if(!(xAxisStart >= 72)){
      this.setState({
        userSetting:
        userSetting
          .set('xAxisStart', xAxisStart+4)
          .set('xAxisEnd',xAxisEnd+4)
      })
    }
    this.forceUpdate()
  }

  decreaseXAxis = () => {
    const { userSetting } = this.state
    const xAxisStart = userSetting.get('xAxisStart')
    const xAxisEnd = userSetting.get('xAxisEnd')

    if(!(xAxisStart <= 0)){
      this.setState({
        userSetting:
        userSetting
          .set('xAxisStart',xAxisStart-4)
          .set('xAxisEnd',xAxisEnd-4)
      })
    }
    this.forceUpdate()
  }

  changeState = () => {
    const { userSetting, chartData } = this.state
    const xAxisStart = userSetting.get('xAxisStart')
    const xAxisEnd = userSetting.get('xAxisEnd')

    const ALL_Data = JSON.parse(localStorage.getItem('ALL_Data'))
    const Android_Data = JSON.parse(localStorage.getItem('Android_Data'))
    const IOS_Data = JSON.parse(localStorage.getItem('IOS_Data'))
    this.setState({
      chartData:
        chartData
        .set('labels',(Object.keys(ALL_Data)).slice(xAxisStart,xAxisEnd+1))

        .setIn(['datasets',0,'label'],'전체')
        .setIn(['datasets',0,'data'], Object.values(ALL_Data).slice(xAxisStart,xAxisEnd+1))
        .setIn(['datasets',0,'borderColor'],'#1864ab')
        .setIn(['datasets',0,'backgroundColor'],'rgba(220,220,220,0)')
        .setIn(['datasets',0,'poitBackgroundColor'],'#1864ab')
        .setIn(['datasets',0,'borderWidth'],1)
        .setIn(['datasets',0,'pointRadius'],0)

        .setIn(['datasets',1,'label'],'안드로이드')
        .setIn(['datasets',1,'data'], Object.values(Android_Data).slice(xAxisStart,xAxisEnd+1))
        .setIn(['datasets',1,'borderColor'],'#c92a2a')
        .setIn(['datasets',1,'backgroundColor'],'rgba(220,220,220,0)')
        .setIn(['datasets',1,'poitBackgroundColor'],'#c92a2a')
        .setIn(['datasets',1,'borderWidth'],1)
        .setIn(['datasets',1,'pointRadius'],0)

        .setIn(['datasets',2,'label'],'IOS')
        .setIn(['datasets',2,'data'], Object.values(IOS_Data).slice(xAxisStart,xAxisEnd+1))
        .setIn(['datasets',2,'borderColor'],'#fab005')
        .setIn(['datasets',2,'backgroundColor'],'rgba(220,220,220,0)')
        .setIn(['datasets',2,'poitBackgroundColor'],'#fab005')
        .setIn(['datasets',2,'borderWidth'],1)
        .setIn(['datasets',2,'pointRadius'],0)
    })
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

    this.changeState()
  }

  shouldComponentUpdate(nextProps,nextState){
    return (this.state.userSetting !== nextState.userSetting)
  }

  componentWillUpdate(nextProps,nextState){
    this.changeState()
  }

  render() {
    return (
      <GraphView
        chartData={this.state.chartData.toJS()}
        increaseXAxis={this.increaseXAxis}
        decreaseXAxis={this.decreaseXAxis}
        userSetting={this.state.userSetting.toJS()}
      />
    )
  }
}

export default GraphContainer;
