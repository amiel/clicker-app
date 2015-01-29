import Ember from 'ember';
import BackButtonRoute from 'clicker-app/mixins/back-button-route';


export default Ember.Route.extend(BackButtonRoute, {
  model: function(params) {
    return this.store.find('session', params.session_id);
  }
});
