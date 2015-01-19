import Ember from 'ember';
import Session from "clicker-app/models/session";

export default Ember.ObjectController.extend({
  sessions: [],
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
    if (this.get('standby')) return;

    this.get('currentSession').addMessage(message);
  },

  actions: {
    startSession: function() {
      var session = Session.create();
      this.set('currentSession', session);
    },
    stopSession: function() {
      var session = this.get('currentSession');
      session.stop();
      this.get('sessions').pushObject(session);
      this.set('currentSession', null);
    }
  }
});
