import {
  formatTime
} from 'clicker-app/helpers/format-time';

module('FormatTimeHelper');

test('it works', function() {
  var time = new Date(1422235620523);
  var result = formatTime(time);

  equal(result, 'Jan 25 5:27 pm');
});


test('it works', function() {
  var time = new Date(978364800000);
  var result = formatTime(time);

  equal(result, 'Jan 1 8:00 am');
});
