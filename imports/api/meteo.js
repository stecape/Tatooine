import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import axios from 'axios' 
var events = require('events')

export const Meteo = new Mongo.Collection('meteo')
export const HistMeteo = new Mongo.Collection('histMeteo')
export const meteoEmitter = new events

if (Meteor.isServer) {
  Meteor.publish('meteoData', function () {
    var data = Meteo.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })
  Meteor.publish('histMeteoData', function () {
    var data = HistMeteo.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })
}

if (Meteor.isClient) {
  Meteor.subscribe('meteoData')
  Meteor.subscribe('histMeteoData')
}

Meteor.methods({


  'meteo.getData' () {
    axios.get("https://stationdata.wunderground.com/cgi-bin/stationlookup?station=ISANSALV27&units=metric&v=2.0&format=json")
      .then((response) => {
        //when the data arrives we updates the database:
        Meteor.call('meteo.update', response.data.stations.ISANSALV27)
      })
      .catch((e) => {
        console.log(e)
        Meteor.call('meteo.update', [{"wind_dir_degrees":0,"wind_speed":0,"wind_gust_speed":0,"humidity":0,"temperature":0.0,"precip_rate":0,"precip_today":0,"pressure":0.0, "dewpoint":null,"windchill":0.0}])
      })
      .then(() => {
        //Store lights, temperatures and meteo historical information in the DB -> temperatures.insert, meteo.insert
        meteoEmitter.emit('meteoCallback')
        Meteor.call('histLights.insert')
        Meteor.call('histTemperatures.insert')
        Meteor.call('histMeteo.insert')
      })
  },

  //Aggiorna l'actual del meteo esterno
  'meteo.update'(data) {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }

    //Insert the new sample
    Meteo.update(
      {name: "Esterno"},
      { $set: { 
        wind_dir_degrees: data.wind_dir_degrees,
        wind_speed: data.wind_speed,
        wind_gust_speed: data.wind_gust_speed,
        humidity: data.humidity,
        temperature: data.temperature,
        precip_rate: data.precip_rate,
        precip_today: data.precip_today,
        pressure: data.pressure,
        dewpoint: data.dewpoint,
        windchill: data.windchill
      } },
      { upsert: true }
    )
  },

  'histMeteo.insert'(data) {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
    //console.log("HistMeteo insert")
    //Insert the new pkg
    var data = {
      ts: new Date(),
      data: Meteo.find().fetch()
    }
    //console.log(data)
    HistMeteo.insert(data)
  },
})