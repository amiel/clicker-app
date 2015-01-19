import { stringToBytes, bytesToString } from "ember-cli-cordova-test/helpers/string-encoding";

export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');

  console.log("DEFER READINESS");
  application.deferReadiness();

  if (window.cordova) {
    document.addEventListener("deviceready", function() {
      console.log("This looks like cordova, advance the readiness");
      application.advanceReadiness();
    }, false);
  } else {
    console.log("This does not look like cordova; emulate some things");
    var stubDevice = {
      id: 'abcdef-12345',
      name: 'stub-clicker',
      rssi: -66
    };

    window.ble = {
      scan: function(service, timeout, onSuccess, onError) {
        window.setTimeout(function() {
          onSuccess(stubDevice);
        }, 500);
      },
      connect: function(id, onConnect, onError) {
        onConnect(stubDevice);
      },
      notify: function(id, service, characteristic, onData, onError) {
        var callback = onData;
        var doNotify = function() {
          window.ble.notifyTimer = setTimeout(doNotify, Math.random() * 10000);
          callback(stringToBytes("C"));
        };

        doNotify();
      },
      writeWithoutResponse: function(id, service, characteristic, data, success, failure) {
        console.log("writeWithoutResponse", id, service, characteristic, data, success, failure);
      },
      disconnect: function(id, onSuccess, onError) {
        window.clearTimeout(window.ble.notifyTimer);
        onSuccess();
      }
    };

    application.advanceReadiness();
  }
}

export default {
  name: 'cordova',
  initialize: initialize
};
