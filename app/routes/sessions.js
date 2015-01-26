import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var store = this.store;
    return store.find('click').then(function() { return store.find('session'); });
  }
});
