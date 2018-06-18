import React  from 'react'
import { Line } from 'react-chartjs-2'
import styles from './GraphView.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const GraphView = ({
    displayTitle = true,
    displayLegend = true,
    legendPosition = 'top',
    increaseXAxis,
    decreaseXAxis,
    chartData,
    userSetting
}) => (
    <div className={cx('graph')}>
      <div className={cx('graph-container')}>
        <Line
          className={cx('Line')}
          data={chartData}
          width={150}
          height={50}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title:{
              display: displayTitle,
              text: '신규 유저 유입 시간 분포도',
              fontSize:15
            },
            legend:{
              display: displayLegend,
              position: legendPosition
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
      <div className={cx('buttons')}>
        <span className={cx('button')}>
          <button onClick={decreaseXAxis}>Prev</button>
        </span>
        <span className={cx('button')}>
          <button onClick={increaseXAxis}>Next</button>
        </span>
      </div>
    </div>
)

export default GraphView;