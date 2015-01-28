import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Index', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /', function() {
  visit('/');

  andThen(function() {
    equal(currentPath(), 'sessions');
  });
});
