import Ember from 'ember';
import BackButtonRoute from 'clicker-app/mixins/back-button-route';

/* global ble */

// this is digispark UART service
var digispark = {
    serviceUUID: "ffe0",
    txCharacteristic: "ffe1",
    rxCharacteristic: "ffe1"
};

var scanTimeout = 2;

export default Ember.Route.extend(BackButtonRoute, {

  model: function() {
    var devices = [];
    this.loadDevices(devices);
    return devices;
  },

  loadDevices: function(devices) {
    var self = this;

    return new Ember.RSVP.Promise(function(resolve) {
      console.log("loading devices promise");
      var onSuccess = function(device) {
        console.log("HI onDiscoverDevice: name=" + device.name + " rssi=" + device.rssi + " id=" + device.id);
        devices.addObject(Ember.Object.create(device));
      };

      var onError = function(error) { console.log("onError: " + Ember.inspect(error)); };

      ble.scan([digispark.serviceUUID], scanTimeout, onSuccess, onError);
      Ember.run.later(function() { self.set('controller.loading', false); }, scanTimeout * 1000);
      resolve(devices);
      console.log("end of loadDevices");
    });
  },

  actions: {
    refresh: function() {
      console.log("REFRESH: devices was=", Ember.inspect(this.get('controller.model')));
      var devices = [];
      this.set('controller.model', devices);
      this.set('controller.loading', true);
      this.loadDevices(devices);
    }
  }

});
