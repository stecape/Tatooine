
// creating OWN connection to the F454
var myhome = require('myhome')
var mhengine = new myhome.engine({ 
  "host": "192.168.0.35",
  "port": "20000",
  "pass": "12345"
})

//When the "monitoring" is emitted, log it
mhengine.on ('monitoring', function () { 
  console.log ('successfully connected, started monitoring') 
})

//how to intercept a packet:
mhengine.on ('packet', function (pkt) {
  if (pkt == "*1*0*23##") console.log ('Luce 23 OFF') 
  if (pkt == "*1*1*23##") console.log ('Luce 23 ON') 
  if (pkt == "*1*0*17##") console.log ('Luce 17 OFF') 
  if (pkt == "*1*1*17##") console.log ('Luce 17 ON') 
})

Meteor.methods({

	//Method that sends a command 
  'SendOWNCommand': (pkg) => {
  	console.log("CMD >", pkg)
    mhengine.sendCommand({command: pkg})
  }

})