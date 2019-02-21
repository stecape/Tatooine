
import axios from 'axios'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import './OWN'

export const Meteo = new Mongo.Collection('meteo')
export const HistMeteo = new Mongo.Collection('histMeteo')

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

  //Start sampling meteor data each 5 minutes: setInterval each 1 minute, if getTime.minute is *5 or *0 add a sample
  Meteor.setInterval(() => {

    //the following condition takes the actual date, generates the actual minute and retrives only the last digit of the minute.
    //If the digit is included in the array of valid values ["4", "9"], then it performs the async req to update the clima.    
    //if (["4", "9"].includes(new Date().getMinutes().toString().substr(new Date().getMinutes().toString().length -1))) {
      // Ask for Clima data refreshing before the sampling activity
      Meteor.call('temperatures.getData')
      //Meteor.call('clima.insert', response.data.stations.ISANSALV27)
    //}

    //the following condition takes the actual date, generates the actual minute and retrives only the last digit of the minute.
    //If the digit is included in the array of valid values ["0", "5"], then it performs the async req to update the meteo. 
  	//if (["0", "5"].includes(new Date().getMinutes().toString().substr(new Date().getMinutes().toString().length -1))) {
    	axios.get("https://stationdata.wunderground.com/cgi-bin/stationlookup?station=ISANSALV27&units=metric&v=2.0&format=json")
    	.then((response) => {
    		//when the data arrives we updates the database:
   			Meteor.call('meteo.set', response.data.stations.ISANSALV27)
    	})
    	.catch((e) => {
    		console.log(e)
    		Meteor.call('meteo.set', [{"wind_dir_degrees":0,"wind_speed":0,"wind_gust_speed":0,"humidity":0,"temperature":0.0,"precip_rate":0,"precip_today":0,"pressure":0.0, "dewpoint":null,"windchill":0.0}])
    	})
      .then(() => {
        //Store temperatures and meteo historical information in the DB -> temperatures.insert, meteo.insert
        Meteor.call('histLights.insert')
      })
      .then(() => {
        //Store temperatures and meteo historical information in the DB -> temperatures.insert, meteo.insert
        Meteor.call('histTemperatures.insert')
      })
      .then(() => {
        //Store temperatures and meteo historical information in the DB -> temperatures.insert, meteo.insert
        Meteor.call('histMeteo.insert')
      })
    //}
  }, 10000)
}

if (Meteor.isClient) {
  Meteor.subscribe('meteoData')
}

Meteor.methods({

  //Aggiorna l'actual del meteo esterno
  'meteo.set'(data) {
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
    console.log("HistMeteo insert")
    //Insert the new pkg
    var data = Meteo.find().fetch()
    console.log(data)
    // HistMeteo.insert({
    //   data: data,
    //   ts: new Date()
    // })
  },
})