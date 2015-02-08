import Ember from 'ember';

import groupBy from 'clicker-app/utils/group-by';

export default Ember.ArrayController.extend({
  sessions: Ember.computed('model.@each.stopAt', function() {
    return this.get('model').filterBy('stopAt').sortBy('stopAt').reverse();
  }),

  sessionsGroupedByDay: groupBy('model', 'date')
});
