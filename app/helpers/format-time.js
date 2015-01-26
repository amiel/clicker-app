import Ember from 'ember';

/* global moment */

export function formatTime(input) {
  return moment(input).format('MMM D h:mm a');
}

export default Ember.Handlebars.makeBoundHelper(formatTime);
