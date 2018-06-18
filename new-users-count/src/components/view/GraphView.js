import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import styles from './GraphView.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class GraphView extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'top'
  }

  render(){
    const { increaseXAxis,decreaseXAxis } = this.props
    return (
    <div className={cx('graph')}>
      <div className={cx('graph-container')}>
        <Line
          className={cx('Line')}
          data={this.state.chartData}
          width={150}
          height={50}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title:{
              display: this.props.displayTitle,
              text: '신규 유저 유입 시간 분포도',
              fontSize:15
            },
            legend:{
              display: this.props.displayLegend,
              position: this.props.legendPosition
            },
            scales: {
              xAxes: [{
                style:{
                  stacked: true
                },
                scaleLabel: {
                  display: true,
                  labelString: '시간',
                  fontSize: 10
                },
                ticks: {
                  fontSize: 7
                }
              }],
              yAxes:[{
                scaleLabel:{
                  display: true,
                  labelString: '신규 유저',
                  fontSize: 10
                }
              }]
            },
          }}
        />
      </div>
      <button onClick={increaseXAxis}>hihi</button>
      <button onClick={decreaseXAxis}>hihihi</button>
    </div>
    )
  }
}

export default GraphView;