window.onload = function () {

  var timer = new Timer();

  var timer1 = new Timer({
    elem: ".timer1",
    stopCb: function () {
      this.t.remove();
    }
  });

  var timer2 = new Timer({
    elem: ".timer2",
    autoStart: false,
    time: "2019-1-01"
  });


  var btn = document.querySelector('.btn__start');
  btn.addEventListener('click', function () {
    timer2.start();

  });

  var btn = document.querySelector('.btn__stop');
  btn.addEventListener('click', function () {
    timer2.stop();
  })
}
// конструктор
function Timer(obj) {
  var obj = obj || {};
  var
    _this = this,
    timer = 0,
    timerAttr;

  var autoStart = (obj.autoStart === undefined) ? true : obj.autoStart;
  var autoRender = (obj.autoRender === undefined) ? true : obj.autoRender;

  this.elem = obj.elem || ".timer";
  // колбэк при стопе таймера
  this.stopCb = obj.stopCb || function () {};
  // классы создаваемых элементов
  this.arrCreateElem = ['timer-d', 'timer-h', 'timer-m', 'timer-s'];

  this.t = document.querySelector(this.elem);
  //получаем значение времени в секундах из дата аттрибута
  timerAttr = this.t.getAttribute('data-time');
  this.time = timerAttr || obj.time;

  // создаем элементы для данных
  this.createElem = function () {

    for (var i = 0; i < this.arrCreateElem.length; i++) {
      var div = document.createElement('div');
      div.className = this.arrCreateElem[i];
      div.innerHTML = '<span></span><span></span>';
      this.t.insertBefore(div, this.t.children[i]);
    }

  }
  this.createElem();
  // после создания элементов получаем к ним доступ
  var elems = {
    'd': document.querySelector(this.elem + ' .' + this.arrCreateElem[0]).children[0],
    'd_s': document.querySelector(this.elem + ' .' + this.arrCreateElem[0]).children[1],
    'h': document.querySelector(this.elem + ' .' + this.arrCreateElem[1]).children[0],
    'h_s': document.querySelector(this.elem + ' .' + this.arrCreateElem[1]).children[1],
    'm': document.querySelector(this.elem + ' .' + this.arrCreateElem[2]).children[0],
    'm_s': document.querySelector(this.elem + ' .' + this.arrCreateElem[2]).children[1],
    's': document.querySelector(this.elem + ' .' + this.arrCreateElem[3]).children[0],
    's_s': document.querySelector(this.elem + ' .' + this.arrCreateElem[3]).children[1]
  };

  this.parseTime = function () {
    var currentDate = new Date();
    var parseFuture = Date.parse(_this.time);

    var parseCurrent = Date.parse(currentDate);

    var secondsEnd = (parseFuture - parseCurrent) / 1000;

    if (secondsEnd <= 0) {
      return 0
    }
    return secondsEnd;
  }

  var endingTime = this.parseTime();

  this.start = function () {
    timer = setInterval(function () {
      _this.tick();
    }, 1000);
  }

  if (autoStart) {
    this.start();
  }

  this.stop = function () {
    if (timer) {
      clearInterval(timer);
      _this.stopCb() //callback
    }

  }
  this.tick = function () {
    if (endingTime == 0) {
      _this.stop();
      return;
    }
    endingTime--;
    _this.render();
  }
  // получаем данные со временем и окончаниями
  this.getData = function () {
    var data = {};

    var d_free = endingTime % (3600 * 24);
    var d = (endingTime - d_free) / (3600 * 24);
    data.d = d;
    data.d_s = endings(d, ['дней', 'день', 'дня'])

    var h_free = d_free % 3600;
    var h = (d_free - h_free) / 3600;
    data.h = h;
    data.h_s = endings(h, ['часов', 'час', 'часа']);

    var m_free = h_free % 60;
    var m = (h_free - m_free) / 60;
    data.m = m;
    data.m_s = endings(m, ['минут', 'минута', 'минуты']);

    data.s = m_free;
    data.s_s = endings(m_free, ['секунд', 'секунда', 'секунды']);

    return data;
  }

  this.render = function () {
    var data = _this.getData();
    renderer(data);
  }
  if (autoRender) {
    this.render();
  }

  function renderer(data) {
    // рендерим дату в DOM  
    for (var k in elems) {
      elems[k].innerHTML = ((data[k] < 10) ? "0" + data[k] : data[k]);
    }
  }
  // получаем варианты окончаний
  function endings(t, variants) {
    var t0 = t % 10;

    if (t > 4 && t < 21) {
      return variants[0];
    } else if (t0 == 1) {
      return variants[1];
    } else if (t0 > 1 && t0 < 5) {
      return variants[2];
    } else {
      return variants[0];
    }
  }
}
