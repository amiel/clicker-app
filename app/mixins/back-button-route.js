import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    didTransition: function() {
      this.controllerFor('application').set('backButton', this.controller.get('backButton'));
    }
  }
});
