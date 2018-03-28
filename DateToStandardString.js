//输出和ISO标准一样格式的时间，然而时区调整为当前时区

(function(){
  function pad(number) {
      if (number < 10) {
          return '0' + number;
      }
      return number;
  }
  Date.prototype.toStandardString = function () {
      return this.getFullYear() +
          '-' + pad(this.getMonth() + 1) +
          '-' + pad(this.getDate()) +
          'T' + pad(this.getHours()) +
          ':' + pad(this.getMinutes()) +
          ':' + pad(this.getSeconds()) +
          '.' + (this.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
          'Z';
  };
})()
