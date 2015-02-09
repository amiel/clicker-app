import Ember from 'ember';

import { formatDate } from 'clicker-app/helpers/format-date';

var C = Ember.computed;

export default Ember.ObjectController.extend({
  needs: 'sessions'.w(),
  currentSession: null,

  running: C.bool('currentSession'),
  standby: C.not('running'),

  sessions: Ember.computed('controllers.sessions.sessionsGroupedByDay.length', function() {
    var groups = this.get('controllers.sessions.sessionsGroupedByDay');
    var todayString = formatDate(new Date());
    var todayGroup = groups.findBy('key', todayString);
    return todayGroup ? todayGroup.get('content') : [];
  }),

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
    },

    disconnect: function() {
      if (window.confirm("Are you sure you want to disconnect?")) {
        Ember.run(this.get('target'), 'send', 'disconnect');
      }
    }
  }
});
