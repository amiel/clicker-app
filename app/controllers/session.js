import Ember from 'ember';

export default Ember.ObjectController.extend({
  backButton: true,

  times: Ember.computed('model', function() {
    return this.get('model.clicks').mapBy('time').map(function(string) {
      return new Date(string);
    });
  }),

  observeNotes: Ember.observer('model.notes', function() {
    Ember.run.debounce(this, this.saveNotes, 1000);
  }),

  saveNotes: function() {
    this.get('model').save();
  }
});
