import Ember from 'ember';
import DS from 'ember-data';
var attr = DS.attr;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  startAt: attr('date'),
  stopAt: attr('date'),
  clicks: hasMany('clicks'),

  done: Ember.computed.bool('stopAt'),

  numberOfClicks: Ember.computed.alias('clicks.length'),

  durationInSeconds: Ember.computed('duration', function() {
    var duration = this.get('duration');
    return duration ? Math.round(duration / 1000) : undefined;
  }),

  duration: Ember.computed('startAt', 'stopAt', function() {
    var start = this.get('startAt');
    var stop = this.get('stopAt');
    if (!(start && stop)) { return; }

    return (stop - start);
  }),

  stop: function() {
    this.set('stopAt', new Date());
    this.get('clicks').forEach(function(click) { click.save(); });
    this.save();
  },

  addClick: function(time) {
    this.get('clicks').createRecord({ time: time });
  }
});