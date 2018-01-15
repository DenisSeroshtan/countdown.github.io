
## Пример таймера обратного отсчета на ES5.

[DEMO](https://denisseroshtan.github.io/countdown.github.io/)

### Инициализация:
  ``` html
    <div class = "timer" data-time= "2019-1-1"></div>
  ``` 
  ```js
    var timer = new Timer()
  ```  
### data-attribute html
  1. data-time - время до конца отсчета в формате "год-месяц-число часы:минуты:секунды"
  пример data-time="2019-1-1"
  2. data-loop - время до конца отсчета в секундах
  пример data-loop="3600"
  
### callback по окончанию времени
  ```js
  var timer = new Timer({
    stopCb: function(){
      this.t.remove() // удаление таймера
    }
  })
  ```
### API    

  * elem - string (селектор для инициализации таймер) // default - ".timer"
  * time - string (время до конца отсчета "год-месяц-число часы:минуты:секунды") // приоритет над loop 
  * loop - number (время до конца отсчета в секундах) // вместо time
  * formatData - string (формат вывода даты "d-h-m-s") // default - "d-h-m-s" 
  * autoStart - boolean (автозапуск) // default - true 
  * autoRender - boolean (авторендер даты) // default - true
  
### Пример  
  ```html
    <div id = "countdown"></div>
  ```
  ```js
    var countdown = new Timer({
      elem : "#countdown",
      time : "2018-5-12 12:33:12",
      formatData : "d-h-m-s", // default
      stopCb : function() {
        this.t.innerHTML = "some text"      
      }
    })
    
  ```  
OR

```js
    var countdown = new Timer({
      elem : "#countdown",
      loop : "7200",
      formatData : "h-m-s", // часы-минуты-секунды
      stopCb : function() {
        this.t.innerHTML = "time over"      
      }
    })
    
  