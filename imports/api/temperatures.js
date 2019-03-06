import { Mongo }  from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Temperatures = new Mongo.Collection('temperatures')
export const HistTemperatures = new Mongo.Collection('histTemperatures')


const TemperatureList = [
  { "env" : "1", "set" : "0.0", "act" : "0.0", "name": "Studio", "status" : "0"},
  { "env" : "2", "set" : "0.0", "act" : "0.0", "name": "Sala", "status" : "0"},
  { "env" : "3", "set" : "0.0", "act" : "0.0", "name": "Cucina", "status" : "0"},
  { "env" : "4", "set" : "0.0", "act" : "0.0", "name": "Ingresso", "status" : "0"},
  { "env" : "5", "set" : "0.0", "act" : "0.0", "name": "Bagno", "status" : "0"},
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

  Meteor.publish('histTemperaturesData', function () {
    var data = HistTemperatures.find()

    if ( data ) {
      return data
    }

    return this.ready()
  })

  TemperatureList.map(temperature => {
    Temperatures.update(
      { env: temperature.env },
      { $set: { 
          name: temperature.name,
          env : temperature.env,
          set : Number(temperature.set),
          act : Number(temperature.act),
          status : Number(temperature.status)*100
      } },
      { upsert: true }
    )
  })
}

// if (Meteor.isClient) {
//   Meteor.subscribe('temperaturesData')
//   Meteor.subscribe('histTemperaturesData')
// }


Meteor.methods({
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
          { $set: { act : Number(pktsplt[4]/10) } },
          { upsert: true }
        )
      }

      if (frame.what == "14") {
        Temperatures.update(
          { env: frame.where },
          { $set: { set : Number(pktsplt[4]/10) } },
          { upsert: true }
        )
      }

      if (frame.what == "19") {
        Temperatures.update(
          { env: frame.where },
          { $set: { status : Number(pktsplt[5]/1)*100 } },
          { upsert: true }
        )
      }
    }
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