import { Meteor } from 'meteor/meteor'
import { meteoEmitter } from './meteo'

if (Meteor.isServer) {
  
  Meteor.setInterval(() => {
    Meteor.call('temperatures.getData')
    Meteor.call('meteo.getData')
  }, 60000)

  meteoEmitter.on('meteoCallback', () => {
    Meteor.setTimeout(() => {
      Meteor.call('histLights.insert')
      Meteor.call('histTemperatures.insert')
      Meteor.call('histMeteo.insert')
    }, 10000)
  })

}