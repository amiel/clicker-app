import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

Ember.onerror = function(error) {
  console.error("Ember.onerror hook. error=" + Ember.inspect(error));
};

Ember.RSVP.on('error', function(error) {
  console.error("Ember.RSVP.on('error') hook. error=" + Ember.inspect(error));
});

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
