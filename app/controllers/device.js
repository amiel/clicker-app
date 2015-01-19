import Ember from 'ember';

export default Ember.ObjectController.extend({
  messages: [],


  backgroundEffect: function() {
    console.log('NEW MESSAGE');
    this.set('changed', true);
    Ember.run.later(this, 'resetChanged', 900);
  }.observes('messages.length'),
  resetChanged: function() {
    this.set('changed', false);
  },

  actions: {
    startSession: function() {
      this.set('sessionStartedAt', new Date());
    },
    stopSession: function() {
      this.set('sessionStartedAt', null);
      this.set('messages', []);
    }
  }
});
