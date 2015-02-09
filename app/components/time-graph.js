import Ember from 'ember';

/* global d3 */

export default Ember.Component.extend({
  classNames: ['chart'],

  didInsertElement: function() {
    Ember.run.once(this, 'renderGraph');
  },

  renderGraph: function() {
    var el = this.$()[0];

    var data = [ { name: "clicks", dates: this.get('times') } ];

    var eventDropsChart = d3.chart.eventDrops()
      .width(320)
      .start(this.get('startAt'))
      .end(this.get('stopAt'))
      .eventLineColor('#00ff0033')
      .eventColor('#ff00ffff')
      .hasDelimiter(false)
      .hasTopAxis(false)
      .hasBottomAxis(false)
      .margin({ top: 20, left: 20, bottom: 20, right: 20 });

    d3.select(el).datum(data).call(eventDropsChart);
  }.observes('times', 'startAt', 'stopAt')

});
