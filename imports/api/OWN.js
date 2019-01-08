import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const OWNFrames = new Mongo.Collection('ownframes')
export const Lights = new Mongo.Collection('lights')
export const Temperatures = new Mongo.Collection('temperatures')


const LightList = [
  { "env" : "0", "light" : "1", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "0", "light" : "5", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "0", "light" : "6", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "00", "light" : "10", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "00", "light" : "11", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "1", "light" : "1", "name": "Aspiratore bagno vel. 1", "status" : "0", "type" : "switch" },
  { "env" : "1", "light" : "2", "name": "Aspiratore bagno vel. 2", "status" : "0", "type" : "switch" },
  { "env" : "1", "light" : "3", "name": "Segnapasso scala 1, 2, 3", "status" : "0", "type" : "switch" },
  { "env" : "1", "light" : "6", "name": "Applique scala", "status" : "0", "type" : "switch" },
  { "env" : "1", "light" : "7", "name": "Faretti ingresso", "status" : "0", "type" : "switch" },
  { "env" : "1", "light" : "8", "name": "Specchio bagno", "status" : "0", "type" : "switch" },
  { "env" : "1", "light" : "9", "name": "Luce bagno", "status" : "0", "type" : "switch" },
  { "env" : "01", "light" : "10", "name": "Luce WC bagno", "status" : "0", "type" : "switch" },
  { "env" : "01", "light" : "11", "name": "Luce specchio bagno", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "1", "name": "Aspiratore cappa vel. 1", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "2", "name": "Sottopensili cucina", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "3", "name": "Applique studio", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "4", "name": "Veletta cucina lato bagno", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "5", "name": "Veletta cucina lato sala", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "6", "name": "Veletta sala lato cortile", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "7", "name": "Veletta sala lato chiesa", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "8", "name": "Veletta studio", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "9", "name": "Gestione luci sala", "status" : "0", "type" : "switch" },
  { "env" : "02", "light" : "12", "name": "Aspiratore cappa vel. 2", "status" : "0", "type" : "switch" },
  { "env" : "02", "light" : "13", "name": "Corridoio cucina", "status" : "0", "type" : "switch" },
  { "env" : "3", "light" : "1", "name": "Lampione cortile lato est", "status" : "0", "type" : "switch" },
  { "env" : "3", "light" : "2", "name": "Segnapasso cortile", "status" : "0", "type" : "switch" },
  { "env" : "3", "light" : "3", "name": "Luce cortile interno", "status" : "0", "type" : "switch" },
  { "env" : "3", "light" : "4", "name": "Luce androne cantina", "status" : "0", "type" : "switch" },
  { "env" : "3", "light" : "5", "name": "Luce cantina grossa", "status" : "0", "type" : "switch" },
  { "env" : "3", "light" : "6", "name": "Luce centrale termica", "status" : "0", "type" : "switch" },
  { "env" : "3", "light" : "7", "name": "Luce scale cantina", "status" : "0", "type" : "switch" },
  { "env" : "3", "light" : "8", "name": "Apri Cancelletto", "status" : "0", "type" : "pulse" },
  { "env" : "3", "light" : "9", "name": "Apri Cancello", "status" : "0", "type" : "pulse" },
]

const TemperatureList = [
  { "env" : "1", "light" : "5", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "2", "light" : "6", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "3", "light" : "10", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "4", "light" : "11", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "5", "light" : "11", "name": "unknown", "status" : "0", "type" : "switch" },
  { "env" : "6", "light" : "11", "name": "unknown", "status" : "0", "type" : "switch" }
]

//publishing lights data on server
if (Meteor.isServer) {
  Meteor.publish('lightsData', function () {
    var data = Lights.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })

  Meteor.publish('temperaturesData', function () {
    var data = Temperatures.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })

  LightList.map(light => {
    Lights.update(
      {
        env: light.env,
        light: light.light
      },
      {
        $set: light
      },
      {
        upsert: true
      }
    )
  })

  TemperatureList.map(temperature => {
    Temperatures.update(
      {
        env: temperature.env,
        light: temperature.light
      },
      {
        $set: temperature
      },
      {
        upsert: true
      }
    )
  })
}

if (Meteor.isClient) {
  Meteor.subscribe('lightsData')
  Meteor.subscribe('temperaturesData')
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
      if (frame.where.length == 2){
        var env = frame.where[0]
        var light = frame.where[1]  
      } 
      if (frame.where.length == 4) {
        var env = frame.where.substring(0, 2)
        var light = frame.where.substring(2, 4)
      }

      Lights.update(
        {
          env: env,
          light: light
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
  },

  'temperatures.update'(pkt) {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
    var pktsplt = pkt.replace(/#/g,"").split("*")
    var frame = {
      who: pktsplt[1],
      what: pktsplt[2],
      where: pktsplt[3]
    }
    if (frame.who == "4") {
      if (frame.where.length == 2){
        var env = frame.where[0]
        var light = frame.where[1]  
      } 
      if (frame.where.length == 4) {
        var env = frame.where.substring(0, 2)
        var light = frame.where.substring(2, 4)
      }

      Lights.update(
        {
          env: env,
          light: light
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