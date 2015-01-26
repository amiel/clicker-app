import {
  formatDuration
} from 'clicker-app/helpers/format-duration';

module('FormatDurationHelper');

test('it works', function() {
  var result = formatDuration(42000);
  equal(result, '0:42');
});

test('pads single digit seconds', function() {
  var result = formatDuration(4000);
  equal(result, '0:04');
});

test('can format with minutes', function() {
  var result = formatDuration(129000);
  equal(result, '2:09');
});

test('rounds seconds', function() {
  var result = formatDuration(14556);
  equal(result, '0:15');
});
