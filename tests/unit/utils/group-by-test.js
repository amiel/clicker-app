import groupBy from 'clicker-app/utils/group-by';
import Ember from 'ember';

module('groupBy');

var MyCollectionModel = Ember.Object.extend({});

var categories = ['A', 'B', 'A', 'C'];

var collection = categories.map(function(c, i) {
  return MyCollectionModel.create({ category: c, name: "Thing " + i });
});


var ArrayController = Ember.Object.extend({
  grouped: groupBy('model', 'category')
});

test('it works', function() {
  var object = ArrayController.create({ model: collection });
  var grouped = object.get('grouped');

  var a_group = grouped.findBy('key', 'A');
  var names = a_group.get('content').map(function(object) {
    return object.get('name');
  });


  equal(names[0], 'Thing 0');
  equal(names[1], 'Thing 2');
});
