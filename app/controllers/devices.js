import Ember from 'ember';

export default Ember.ArrayController.extend({
  loading: true,
  devices: Ember.computed.alias('model')
});
