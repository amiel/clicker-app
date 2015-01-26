import Ember from 'ember';

export default Ember.ArrayController.extend({
  sessions: Ember.computed('model.@each.stopAt', function() {
    return this.get('model').filterBy('stopAt').sortBy('stopAt').reverse();
  })
});
