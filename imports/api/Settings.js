import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

// App settings definition
export const Settings = new Mongo.Collection('settings')

if (Meteor.isServer) {
  Meteor.publish('settingsData', function () {
    var data = Settings.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })
}

if (Meteor.isClient) {
  Meteor.subscribe('settingsData')
}