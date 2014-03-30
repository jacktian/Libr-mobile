// Generated by CoffeeScript 1.7.1
(function() {
  var ScanService, libr;

  libr = angular.module('libr.services.scan', []);

  ScanService = (function() {
    ScanService.$inject = ['Books'];

    function ScanService(Books) {
      this.Books = Books;
    }

    ScanService.prototype.scan = function(callback, errorCallback) {
      setTimeout((function(_this) {
        return function() {
          return cordova.plugins.barcodeScanner.scan(function(result) {
            if (result.cancelled === 1) {
              return;
            }
            if (result.format !== 'EAN_13') {
              errorCallback('条形码类型不匹配，请确认所扫为书籍，并尝试更换角度');
              return;
            }
            return _this.Books.save({
              isbn: result.text
            }, null, function(data) {
              if (data.status === 'error') {
                return errorCallback(data.message);
              } else {
                return callback(data);
              }
            }, function(error) {
              return errorCallback('添加图书失败' + error.toString());
            });
          }, function(error) {
            return errorCallback("Scanning failed:" + error + " ");
          });
        };
      })(this), 600);
      return navigator.notification.vibrate(50);
    };

    ScanService.prototype.save = function() {
      return this.Books.save({
        isbn: '9787550221116'
      }, null, function(result) {
        if (result.status === 'error') {
          return alert('不能找到该书');
        } else {
          return alert('添加图书成功');
        }
      });
    };

    return ScanService;

  })();

  libr.service('ScanService', ScanService);

}).call(this);
