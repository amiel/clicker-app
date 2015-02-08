import Ember from 'ember';

/* global moment */

export function formatDate(input) {
  return moment(input).format('ddd, MMMM D');
}

export default Ember.Handlebars.makeBoundHelper(formatDate);
