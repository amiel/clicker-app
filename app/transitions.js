export default function() {
  this.transition(
    this.fromRoute('index'),
    this.toRoute('start'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
