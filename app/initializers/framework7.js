var Framework7 = window.Framework7;

export function initialize(container, application) {

  // initialize Framework7, turning off most features as we are using ember for
  // this stuff
  var framework7App = new Framework7({
    cache: false,
    fastClicks: false,
    router: false,
    ajaxLinks: false,
    sortable: false,
    modalTitle: 'Clicker App',
  });

  application.register('service:framework7App', framework7App, { instantiate: false });
  // application.inject('route', 'framework7', 'service:framework7');
  application.inject('controller', 'framework7App', 'service:framework7App');
}

export default {
  name: 'framework7',
  initialize: initialize
};
