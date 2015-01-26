import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("devices");
  this.route("device", { path: "/devices/:device_id" });

  this.route("sessions");
  this.route("session", { path: "/sessions/:session_id" });
});

export default Router;
