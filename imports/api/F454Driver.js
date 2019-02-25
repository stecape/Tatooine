import { Meteor } from 'meteor/meteor'
import axios from 'axios'

// creating OWN connection to the F454
var myhome = require('myhome')
var mhengine = new myhome.engine({ 
  "host": "192.168.0.35",
  "port": "20000",
  "pass": "12345"
})

//When the "monitoring" is emitted, log it
mhengine.on ('monitoring', Meteor.bindEnvironment((pkt)=>{
  //console.log ('successfully connected, started monitoring') 
  //When the OWN starts to monitor, sends one packet to update the status of the lights and the temperatures

  // Aggiorna il DB delle luci all'avvio della sessione
  Meteor.call('lights.getData')

  // Aggiorna il DB delle temperature all'avvio della sessione
  Meteor.call('temperatures.getData')

  // Aggiorna il DB del meteo all'avvio della sessione
  Meteor.call('meteo.getData')
}))

//intercepting packets
mhengine.on ('packet', Meteor.bindEnvironment((pkt)=>{

  // Se non è il pacchetto di alive ("*1*0*23##") aggiungi il pacchetto allo stream, rimuovi quelli più vecchi di una settimana
  Meteor.call('frames.insert', pkt)

  // Se è luci aggiorna gli stati
  Meteor.call('lights.update', pkt)

  // Se è temperatura aggiorna le temperature
  Meteor.call('temperatures.update', pkt)


  // Se è energia aggiorna i valori

}))

Meteor.methods({

	//Method that sends a command 
  'SendOWNCommand': (pkg) => {
  	console.log("CMD >", pkg)
    mhengine.sendCommand({command: pkg})
  }

})