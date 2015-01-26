import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("devices");
  this.route("device", { path: ":id" });

  this.route("session");
  this.route("sessions");
});

export default Router;
