import {
  formatDate
} from 'clicker-app/helpers/format-date';

module('FormatDateHelper');

test('it works', function() {
  var time = new Date(1422235620523);
  var result = formatDate(time);

  equal(result, 'Sun, January 25');
});

test('formats another date too', function() {
  var time = new Date(978364800000);
  var result = formatDate(time);

  equal(result, 'Mon, January 1');
});
