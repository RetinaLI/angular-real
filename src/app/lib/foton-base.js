(function(){
  var BASE = {};

  BASE.Date = {
    /*
    	para:
    		_date: date string, e.g. 2010-01-01 9:20:30 or 2010/01/01 9:20:30
    		_format: format string, e.g. "yyyy-MM-dd HH:mm:ss"
    	return
    		string
    */
    getDateByFormat: function(_dateStr, _formatType, _ifSupplyZero) {
      _ifSupplyZero = _ifSupplyZero == undefined ? true : _ifSupplyZero;
      try {
        if (_dateStr == null || _dateStr === "") return "";
        var _dateObj = typeof _dateStr == "number" ? new Date(_dateStr) : typeof _dateStr == "string" ? new Date((_dateStr + "").replace(/(-|\.)/g, "/")) : _dateStr,
          dateFormat = _formatType || "yyyy-MM-dd HH:mm:ss";

        dateFormat = dateFormat.replace("yyyy", _dateObj.getFullYear());
        var _month = _dateObj.getMonth() + 1,
          _day = _dateObj.getDate(),
          _hour = _dateObj.getHours(),
          _minute = _dateObj.getMinutes(),
          _second = _dateObj.getSeconds();
        dateFormat = dateFormat.replace("MM", _month > 9 ? _month : ((_ifSupplyZero ? "0" : "") + _month));
        dateFormat = dateFormat.replace("dd", _day > 9 ? _day : ((_ifSupplyZero ? "0" : "") + _day));
        dateFormat = dateFormat.replace("HH", _hour > 9 ? _hour : ((_ifSupplyZero ? "0" : "") + _hour));
        dateFormat = dateFormat.replace("mm", _minute > 9 ? _minute : ("0" + _minute));
        dateFormat = dateFormat.replace("ss", _second > 9 ? _second : ("0" + _second));

        return dateFormat;
      } catch (ex) {
        return _dateStr;
      }
    }
  };

  BASE.String = {
    getRealLength: function(_str) {
      var realLength = 0,
        len = _str.length,
        charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = _str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
      }
      return realLength;
    }
  };

  BASE.Number = {
    getNewNumWithUnit: function(_num, _unit){
      var num = _num,
        unit = _unit;

      if (num < 10000) {

      } else if (num >= 10000 && num < 100000000) {
        num = Math.round(num / 10000);
        unit = "万" + _unit;
      } else {
        num = Math.round(num / 100000000);
        unit = "亿" + _unit;
      }
      return {
        num: num,
        unit: unit
      };
    }
  };

  BASE.uuid = (function(){
    var id = (new Date()).getTime();
    return function(){
      id ++;
      return id;
    };
  })();



  if(!window.FOTON_GLOBAL){
    window.FOTON_GLOBAL = {};
  }

  for(var k in BASE) window.FOTON_GLOBAL[k] = BASE[k];

})();
