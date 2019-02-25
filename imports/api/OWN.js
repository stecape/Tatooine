import { Mongo }  from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const OWNFrames = new Mongo.Collection('ownframes')
export const Lights = new Mongo.Collection('lights')
export const Temperatures = new Mongo.Collection('temperatures')
export const HistLights = new Mongo.Collection('histLights')
export const HistTemperatures = new Mongo.Collection('histTemperatures')

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
  { "env" : "1", "set" : "0.0", "act" : "0.0", "name": "Studio", "status" : "0"},
  { "env" : "2", "set" : "0.0", "act" : "0.0", "name": "Ingresso", "status" : "0"},
  { "env" : "3", "set" : "0.0", "act" : "0.0", "name": "Bagno", "status" : "0"},
  { "env" : "4", "set" : "0.0", "act" : "0.0", "name": "Cucina", "status" : "0"},
  { "env" : "5", "set" : "0.0", "act" : "0.0", "name": "Sala", "status" : "0"},
  { "env" : "6", "set" : "0.0", "act" : "0.0", "name": "1P", "status" : "0"}
]

//publishing lights data on server
if (Meteor.isServer) {
  Meteor.publish('temperaturesData', function () {
    var data = Temperatures.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })
  Meteor.publish('lightsData', function () {
    var data = Lights.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })
  Meteor.publish('histTemperaturesData', function () {
    var data = HistTemperatures.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })
  Meteor.publish('histLightsData', function () {
    var data = HistLights.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })

  //Questo va modificato in modo che se esiste già qualcosa non deve fare l'update
  LightList.map(light => {
    Lights.update(
      { env: light.env, light: light.light },
      { $set: { 
          env : light.env,
          light : light.light,
          name: light.name,
          status : light.status,
          type : light.type
      } },
      { upsert: true }
    )
  })

  TemperatureList.map(temperature => {
    Temperatures.update(
      { env: temperature.env },
      { $set: { 
          name: temperature.name,
          env : temperature.env,
          set : temperature.set,
          act : temperature.act,
          status : temperature.status
      } },
      { upsert: true }
    )
  })
}

if (Meteor.isClient) {
  Meteor.subscribe('temperaturesData')
  Meteor.subscribe('lightsData')
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
        { env: env, light: light },
        { $set: { 
            status : frame.what
        } },
        { upsert: true }
      )

    }
  },

  'lights.getData' () {
    var cmds = [
      "*#1*0##"       //ALL_LIGHTS_DATA 
    ]
    cmds.map((cmd) => Meteor.call("SendOWNCommand", cmd))

  },

  'temperatures.getData' () {
    var cmds = [
      "*#4*1*14##",    //SET_PROBE1   *#4*where*14*T*3##
      "*#4*2*14##",    //SET_PROBE2   
      "*#4*3*14##",    //SET_PROBE3   
      "*#4*4*14##",    //SET_PROBE4   
      "*#4*5*14##",    //SET_PROBE5   
      "*#4*1*0##",     //ACT_PROBE1   *#4*where*0*T##
      "*#4*2*0##",     //ACT_PROBE2   
      "*#4*3*0##",     //ACT_PROBE3   
      "*#4*4*0##",     //ACT_PROBE4   
      "*#4*5*0##",     //ACT_PROBE5   
      "*#4*1*19##",    //VALVE_PROBE1 *#4*where*19*CV*HV##
      "*#4*2*19##",    //VALVE_PROBE2 
      "*#4*3*19##",    //VALVE_PROBE3 
      "*#4*4*19##",    //VALVE_PROBE4 
      "*#4*5*19##"     //VALVE_PROBE5 
    ]
    cmds.map((cmd) => Meteor.call("SendOWNCommand", cmd))

  },

  'temperatures.update'(pkt) {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
    var pktsplt = pkt.replace(/#/g,"").split("*")
    if (pktsplt[1] == "4") {
  
      var frame = {
        who: pktsplt[1],
        where: pktsplt[2],
        what: pktsplt[3] 
      }
  
      if (frame.what == "0") {
        Temperatures.update(
          { env: frame.where },
          { $set: { act : pktsplt[4]/10 } },
          { upsert: true }
        )
      }

      if (frame.what == "14") {
        Temperatures.update(
          { env: frame.where },
          { $set: { set : pktsplt[4]/10 } },
          { upsert: true }
        )
      }

      if (frame.what == "19") {
        Temperatures.update(
          { env: frame.where },
          { $set: { status : pktsplt[5]/1 } },
          { upsert: true }
        )
      }
    }
  },

  'histLights.insert'() {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
    //console.log("HistLights insert")
    //Insert the new pkg
    var data = {
      ts: new Date(),
      data: Lights.find().fetch()
    }
    //console.log(data)
    HistLights.insert(data)    
  },

  'histTemperatures.insert'() {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
    //console.log("HistTemperatures insert")
    //Insert the new pkg
    var data = {
      ts: new Date(),
      data: Temperatures.find().fetch()
    }
    //console.log(data)
    HistTemperatures.insert(data)   
  }
})