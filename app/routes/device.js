import Ember from 'ember';

import { stringToBytes, bytesToString } from "ember-cli-cordova-test/helpers/string-encoding";

/* global ble */

// this is digispark UART service
var digispark = {
    serviceUUID: "ffe0",
    txCharacteristic: "ffe1",
    rxCharacteristic: "ffe1"
};

var genericError = function(error) {
  console.log("OMG ERROR: " + Ember.inspect(error));
};

export default Ember.Route.extend({
  model: function(params) {
    var self = this;
    var deviceId = params.id;
    this.set('deviceId', deviceId);
    console.log("MODEL id=" + deviceId);

    return new Ember.RSVP.Promise(function(resolve) {
      var onData = function(data) {
        console.log('onData data=' + bytesToString(data));
        self.received(bytesToString(data));
      };

      var onConnect = function(device) {
        console.log("DID CONNECT device=" + Ember.inspect(device));
        ble.notify(deviceId, digispark.serviceUUID, digispark.rxCharacteristic, onData, genericError);
        console.log("did call notify");
        resolve(Ember.Object.create(device));
      };

      ble.connect(deviceId, onConnect, genericError);
      console.log("did call connect");
    });
  },

  // afterModel: function(device, transition, params) {
  //   var self = this;
  //   console.log("This is afterModel and id is:" + this.get('deviceId'));
  // },

  received: function(string) {
    if (this.get('controller')) {
      this.get('controller.messages').pushObject({
        string: string,
        time: new Date()
      });
    }
  },

  actions: {
    sendData: function() {
      var failure = function() { console.log("Failed writing data to the digispark hardware"); };
      var success = function() { console.log("WE SENT SOME DATATATATAS"); };

      var data = stringToBytes("OH HAI");
      ble.writeWithoutResponse(this.get('deviceId'), digispark.serviceUUID, digispark.txCharacteristic, data, success, failure);
    },
    clear: function() {
      this.set('controller.messages', []);
    },
    disconnect: function() {
      var self = this;
      var id = this.get('deviceId');
      console.log("This is disconnect and id is:" + this.get('deviceId'));

      ble.disconnect(id, function() {
        self.transitionTo('index');
      }, function(error) { console.log("OMG ERROR" + Ember.inspect(error)); });
    }
  }
});
