import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { getDataSeries, getDataRange } from './dataTools'
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
HighchartsMore(Highcharts)
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Tooltip, Legend, LineSeries, SplineSeries, AreaSplineRangeSeries, ColumnSeries } from 'react-jsx-highcharts'
import "./ChartComponent.css"
import { HistTemperatures } from '../../../api/temperatures'
import { HistMeteo } from '../../../api/meteo'


class ChartComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tempRange: [],
      temp:      [],
      tempSet:   [],
      tempAct:   [],
      valve:     [],
      detail:    this.props.detail
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){

/*    var tempRange = getDataRange(
      nextProps.histMeteo,
      "Esterno",
      nextProps.detail
    )*/
    var temp = getDataSeries(
      nextProps.histMeteo,
      "Esterno",
      "temperature",
      nextProps.detail
    )
    var tempSet = getDataSeries(
      nextProps.histTemperatures,
      nextProps.room,
      "set",
      nextProps.detail
    )
    var tempAct = getDataSeries(
      nextProps.histTemperatures,
      nextProps.room,
      "act",
      nextProps.detail
    )
    var valve = getDataSeries(
      nextProps.histTemperatures,
      nextProps.room,
      "status",
      nextProps.detail
    )

    var series = {
      // tempRange: tempRange,
      temp:      temp,
      tempSet:   tempSet,
      tempAct:   tempAct,
      valve:     valve,
      // detail:    nextProps.detail
    }
    return series
    
  }

  render () {
    return(
      <HighchartsChart time={{useUTC: false}} className="chart" id="chartComponent" >
        <Chart />

        <Title>{this.props.room}</Title>

        <Tooltip 
          distance={30}
          padding={5}
          backgroundColor='rgba(0,0,0,0.05)'
          lineWidth={0}
          shared={true}
        />

        <Legend>
          <Legend.Title>Legend</Legend.Title>
        </Legend>

        <XAxis
          type="datetime"
          crosshair={{enabled: true}}
        >
          <XAxis.Title>Time</XAxis.Title>
        </XAxis>
        <YAxis
          id="valveOpening" 
          min={0}
          max={100}
          opposite
        >
          <YAxis.Title>Valve Opening Time (%)</YAxis.Title>
          <ColumnSeries
            id="valve"
            name="Valve State"
            data={this.state.valve}
            step
            marker={{enabled: false}}
            color='rgba(128, 128, 128, 0.2)'
          />
        </YAxis>
        <YAxis id="temperature">
          <YAxis.Title>Temperature (°C)</YAxis.Title>
          {
            this.state.detail != "highest" && 
            <AreaSplineRangeSeries
              id="tempRange"
              name="External Temperature Range"
              data={this.state.tempRange}
              step
              marker={{enabled: false}}
              color='#c10825'
              lineWidth={0}
              fillOpacity={0.2}
            />
          }

          <SplineSeries
            id="temp"
            name= {this.state.detail != "highest" ? "External Temperature Average" : "External Temperature"}
            data= {this.state.temp}
            step
            marker= {{enabled: false}}
            color='#c10825'
          />
          <LineSeries
            id="tempSet"
            name="Temperature Set"
            data={this.state.tempSet}
            step
            marker={{enabled: false}}
            color='#cccccc'
          />
          <SplineSeries
            id="tempAct"
            name="Temperature Actual"
            data={this.state.tempAct}
            step
            marker={{enabled: false}}
            color='#808080'
          />
        </YAxis>
      </HighchartsChart>
    )
  }
}

ChartComponentContainer = withHighcharts(ChartComponent, Highcharts)

export default HighChartsContainer = withTracker((props) => {
  Meteor.subscribe('histTemperaturesData')
  Meteor.subscribe('histMeteoData')
  return {
    histTemperatures: HistTemperatures.find({ts: {$gte: props.from, $lte: props.to}}).fetch(),
    histMeteo: HistMeteo.find({ts: {$gte: props.from, $lte: props.to}}).fetch()
  }
})(ChartComponentContainer)