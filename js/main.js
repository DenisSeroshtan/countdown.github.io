function Timer(obj) {
  var
      _this = this,
      timer = 0,
      timerAttr;
  
  this.elem = obj.elem;

  this.stopCb = obj.stopCb || function(){};
  
  var t = document.querySelector(this.elem);
      timerAttr = t.getAttribute('data-time');
  this.time = timerAttr || obj.time;
  
  var arrCreateElem = ['timer-d', 'timer-h', 'timer-m', 'timer-s'];

  for (var i = 0; i<arrCreateElem.length; i++) {
        var div = document.createElement('div');
        div.className = arrCreateElem[i];
        div.innerHTML = '<span>00</span><span>минут</span>'
        t.insertBefore(div,t.children[i]);
    } 
  
   var elems = {
       'd': document.querySelector(this.elem +' .timer-d').children[0],
       'd_s': document.querySelector(this.elem +' .timer-d').children[1],
       'h': document.querySelector(this.elem +' .timer-h ').children[0],
       'h_s': document.querySelector(this.elem +' .timer-h ').children[1],
       'm': document.querySelector(this.elem +' .timer-m ').children[0],
       'm_s': document.querySelector(this.elem +' .timer-m ').children[1],
       's': document.querySelector(this.elem +' .timer-s ').children[0],
       's_s': document.querySelector(this.elem +' .timer-s ').children[1],
     }; 

	
  this.createElem = function (){
    
  }
  
  this.getElems = function() {
   
    return elems;
  }
  

  this.start = function () {
      timer = setInterval(function () {
        _this.tick();       
      }, 1000);

  }
  this.stop = function () {
	if (timer) {
      clearInterval(timer);	  
	  _this.stopCb()
	}

  }
  this.tick = function () {
	 
	if (_this.time == 0) {
          _this.stop();
		  return;
	}  
    _this.time--;
	_this.render();  
  }
  this.getData = function() {
	  var data = {};

        var d_free = _this.time % (3600 * 24);
        var d = (_this.time - d_free) / (3600 * 24);
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
  
  this.render = function() {
	  var data = _this.getData();
      this.createElem();
	  renderer(data); 
	 
  }
   function renderer (data) {
     
     for(k in elems){
		elems[k].innerHTML = ((data[k]<10) ? "0" + data[k] : data[k]);
	  } 
   }
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

window.onload = function () {

	
	
  var timer = new Timer({
	elem: ".timer",  
    time: 10,
	stopCb: function(){
		var img = document.querySelector('.img');
		img.style.display = "none";
	}  
	
  });
  
   var timer1 = new Timer({
	elem: ".timer1",  
    time: 8,
	stopCb: function(){
		var img = document.querySelector('.img');
		img.style.display = "none";
	}  
	
  });
 
  timer.render();     
  timer1.render();     

	
  var btn = document.querySelector('.btn');
  btn.addEventListener('click', function () {
    timer.start();

  })
}
