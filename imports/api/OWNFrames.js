import { Mongo }  from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const OWNFrames = new Mongo.Collection('ownframes')

//publishing lights data on server
if (Meteor.isServer) {
  Meteor.publish('ownframesData', function () {
    var data = OWNFrames.find()

    if ( data ) {
      return data
    }
    
    return this.ready()
  })
}

if (Meteor.isClient) {
  Meteor.subscribe('ownframesData')
}

Meteor.methods({
  'frames.insert'(pkt) {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }

    //Insert the new pkg
    OWNFrames.insert({
      frame: pkt,
      createdAt: new Date()
    })

    //Remove older package
	  var oneWeekAgo = new Date()
	  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    OWNFrames.remove({
      createdAt: { $lt: oneWeekAgo }
    })
  }
})