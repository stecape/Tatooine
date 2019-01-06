
import axios from 'axios'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Meteo = new Mongo.Collection('meteo')

//publishing meteo data on server
if (Meteor.isServer) {
  Meteor.publish('meteoData', function () {
    var data = Meteo.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })

  //Start sampling meteor data each 5 minutes: setInterval each 1 minute, if getTime.minute is *5 or *0 add a sample
  setInterval(() => { 
  	//the following condition takes the actual date, generates the actual minute and retrives only the last digit of the minute.
  	//If the digit is included in the array of valid values ["0", "5"], then it performs the async req to update the meteo. 
  	["0", "5"].includes(new Date().getMinutes().toString().substr(new Date().getMinutes().toString().length -1)) &&
  	axios.get("https://stationdata.wunderground.com/cgi-bin/stationlookup?station=ISANSALV27&units=metric&v=2.0&format=json")
  	.then((response) => {
  		//when the data arrives we updates the database:
 			Meteor.call('meteo.insert', response.data.stations.ISANSALV27)
  	})
  	.catch((e) => {
  		console.log(e)
  		Meteor.call('meteo.insert', {"updated":Math.trunc(new Date().getTime()/1000),"ageh":0,"agem":0,"ages":2,"type":"PWS","wind_dir_degrees":0,"wind_speed":0,"wind_gust_speed":0,"humidity":0,"temperature":0.0,"precip_rate":0,"precip_today":0,"pressure":0.0, "dewpoint":null,"windchill":0.0})
  	})
  }, 1000*60)
}

if (Meteor.isClient) {
  Meteor.subscribe('meteoData')
}

Meteor.methods({
  'meteo.insert'(data) {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }

    //Format the new sample
	  const formattedData = { 
	  	ts: data.updated,
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
	  }
    //Insert the new sample
    Meteo.insert(formattedData)
  },
})