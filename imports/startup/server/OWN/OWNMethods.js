import '../../../api/OWN'
import { Meteor } from 'meteor/meteor'

// creating OWN connection to the F454
var myhome = require('myhome')
var mhengine = new myhome.engine({ 
  "host": "192.168.0.35",
  "port": "20000",
  "pass": "12345"
})

//When the "monitoring" is emitted, log it
mhengine.on ('monitoring', function () { 
  //console.log ('successfully connected, started monitoring') 
  //When the OWN starts to monitor, sends one packet to update the status of the lights
  mhengine.sendCommand({command: "*#1*0##"})
})

//intercepting packets
mhengine.on ('packet', Meteor.bindEnvironment((pkt)=>{

  // Aggiungere il pacchetto allo stream, rimuovere quelli più vecchi di una settimana
  Meteor.call('frames.insert', pkt)

  // Se è luci aggiorna gli stati
  Meteor.call('lights.update', pkt)

  // Se è temperatura aggiorna le temperature
  // Se è energia aggiorna i valori

}))

Meteor.methods({

	//Method that sends a command 
  'SendOWNCommand': (pkg) => {
  	console.log("CMD >", pkg)
    mhengine.sendCommand({command: pkg})
  }

})