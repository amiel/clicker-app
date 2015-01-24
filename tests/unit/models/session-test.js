import {
  moduleForModel,
  test
} from 'ember-qunit';

import Ember from 'ember';


moduleForModel('session', 'Session', {
  needs: ['model:click']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});

test('it can calculate the session duration', function() {
  var model = this.subject({
    startAt: new Date(1422134294208),
    stopAt: new Date(1422134317576)
  });

  equal(model.get('durationInSeconds'), 23);
});

test('it can calculate the session duration even if stop is undefined', function() {
  var model = this.subject({
    startAt: new Date(1422134294208)
  });

  equal(model.get('durationInSeconds'), undefined);
});

test('it has clicks', function() {
  var model = this.subject();
  var time = new Date();

  Ember.run(function() {
    model.addClick(time);
  });

  equal(model.get('clicks.firstObject.time'), time);
});
