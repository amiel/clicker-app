import Ember from 'ember';

function zeroPad(input) {
  return (input < 10) ? "0" + input : '' + input;
}

export function formatDuration(input) {
  var totalSeconds = input / 1000;

  var seconds = zeroPad(Math.round(totalSeconds % 60));
  var minutes = Math.floor(totalSeconds / 60);

  return minutes + ":" + seconds;
}

export default Ember.Handlebars.makeBoundHelper(formatDuration);
