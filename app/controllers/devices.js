import Ember from 'ember';

export default Ember.ArrayController.extend({
  loading: true,
  backButton: true,
  devices: Ember.computed.alias('model')
});
