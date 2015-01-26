import Ember from 'ember';

export default Ember.ArrayController.extend({
  sessions: Ember.computed.alias('model')
});
