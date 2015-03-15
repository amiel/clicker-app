export default function() {
  this.transition(
    this.fromRoute('sessions'),
    this.toRoute('session'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('device'),
    this.toRoute('session'),
    this.use('toLeft'),
    this.reverse('toRight')
  );


  this.transition(
    this.fromRoute('sessions'),
    this.toRoute('devices'),
    this.use('toLeft'),
    this.reverse('toRight')
  );


  this.transition(
    this.fromRoute('devices'),
    this.toRoute('loading'),
    this.use('toLeft'),
    this.reverse('toRight')
  );


  this.transition(
    this.fromRoute('loading'),
    this.toRoute('device'),
    this.use('crossFade')
  );

  this.transition(
    this.fromRoute('device'),
    this.toRoute('sessions'),
    this.use('crossFade')
  );

}
