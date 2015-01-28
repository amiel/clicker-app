import Ember from 'ember';

import { bytesToString } from "clicker-app/helpers/string-encoding";

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
    var store = this.store;
    return Ember.RSVP.hash({
      device: this.connectBLE(params.device_id),
      sessions: store.find('click').then(function() { return store.find('session'); })
    });
  },

  setupController: function(controller, model, transition) {
    this._super(controller, model.device, transition);
    this.controllerFor('sessions').set('model', model.sessions);
  },

  // afterModel: function(device, transition, params) {
  //   var self = this;
  //   console.log("This is afterModel and id is:" + this.get('deviceId'));
  // },

  connectBLE: function(deviceId) {
    var self = this;
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
  received: function(string) {
    console.log("received BLE message=", Ember.inspect(string));
    if (this.get('controller')) {
      this.get('controller').receivedMessage({ time: new Date() });
    }
  },

  actions: {
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
