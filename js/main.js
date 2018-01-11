window.onload = function () {

  var timer = new Timer();

  var timer1 = new Timer({
    elem: ".timer1",
    stopCb: function () {
      this.t.innerHTML = "время вышло!"
    }
  });

  var timer2 = new Timer({
    elem: ".timer2",
    autoStart: false,
    loop: "3600"
  });


  var btnStart = document.querySelector('.btn__start');
  btnStart.addEventListener('click', function () {
    timer2.start();

  });

  var btnStop = document.querySelector('.btn__stop');
  btnStop.addEventListener('click', function () {
    timer2.stop();
  })

}
