import Ember from 'ember';

export default Ember.ObjectController.extend({
  currentSession: null,

  running: Ember.computed.bool('currentSession'),
  standby: Ember.computed.not('running'),

  backgroundEffect: function() {
    this.set('changed', true);
    Ember.run.later(this, 'resetChanged', 900);
  }.observes('currentSession.numberOfClicks'),
  resetChanged: function() {
    this.set('changed', false);
  },

  receivedMessage: function(message) {
    if (this.get('standby')) { return; }

    this.get('currentSession').addClick(message.time);
  },

  actions: {
    startSession: function() {
      var session = this.store.createRecord('session', {
        startAt: new Date()
      });
      this.set('currentSession', session);
    },
    stopSession: function() {
      var session = this.get('currentSession');
      session.stop();
      this.set('currentSession', null);
    }
  }
});
