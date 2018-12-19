import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const OWNFrames = new Mongo.Collection('ownframes')
export const Lights = new Mongo.Collection('lights')


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
  },

  'lights.update'(pkt) {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
    var pktsplt = pkt.replace(/#/g,"").split("*")
    var frame = {
    	who: pktsplt[1],
    	what: pktsplt[2],
    	where: pktsplt[3]
    }
    if (frame.who == "1") {
	    Lights.update(
		    {
		      light: frame.where
		    },
		    {
		      $set: {
		        status: frame.what
		      }
		    },
		    {
		      upsert: true
		    }
	    )
	  }
  }
})