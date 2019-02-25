import { Meteor } from 'meteor/meteor'
import { meteoEmitter } from './meteo'
import './OWNFrames'
import './lights'
import './temperatures'

if (Meteor.isServer) {




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
      Meteor.call('meteo.getData')
    //}
  }, 20000)




  meteoEmitter.on('meteoCallback', () => {
    console.log('meteoCallback event occurred!')
  })

}