#**Пример таймера обратного отсчета на ES5.**
##Инициализация:##
  html
    `<div class = "timer" data-time= "время до окончания в секундах"></div>`
  js
    `var timer = new Timer()`
    
##Есть возможность вставить callback по окончанию времени##
    ```
    var timer = new Timer({
      stopCb: function(){
        this.t.remove() // удаление таймера
      }
    })
    ```