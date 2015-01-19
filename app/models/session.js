import Ember from 'ember';

export default Ember.Object.extend({
  startAt: null,
  stopAt: null,
  clicks: null,

  numberOfClicks: Ember.computed.alias('clicks.length'),
  durationInSeconds: Ember.computed('startAt', 'stopAt', function() {
    var start = this.get('startAt');
    var stop = this.get('stopAt');
    if (!(start && stop)) return;

    return (stop - start) / 1000;
  }),

  setup: function() {
    this.set('clicks', []);
    this.set('startAt', new Date());
  }.on('init'),

  stop: function() {
    this.set('stopAt', new Date());
  },

  addMessage: function(message) {
    this.get('clicks').pushObject(message);
  }

});
