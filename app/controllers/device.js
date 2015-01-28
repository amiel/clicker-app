import Ember from 'ember';

var C = Ember.computed;

export default Ember.ObjectController.extend({
  needs: 'sessions'.w(),
  currentSession: null,

  running: C.bool('currentSession'),
  standby: C.not('running'),

  sessions: C.alias('controllers.sessions.sessions'),

  backgroundEffect: function() {
    this.set('changed', true);
    Ember.run.later(this, 'resetChanged', 600);
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
        startAt: new Date(),
        name: this.get('sessionName')
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
