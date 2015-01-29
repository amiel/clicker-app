import Ember from 'ember';
import BackButtonRouteMixin from 'clicker-app/mixins/back-button-route';

module('BackButtonRouteMixin');

// Replace this with your real tests.
test('it works', function() {
  var BackButtonRouteObject = Ember.Object.extend(BackButtonRouteMixin);
  var subject = BackButtonRouteObject.create();
  ok(subject);
});
