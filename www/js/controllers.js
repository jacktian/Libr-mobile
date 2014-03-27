// Generated by CoffeeScript 1.7.1
(function() {
  var BookDetailController, libr,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  libr = angular.module('libr.controllers', ['ionic']);

  BookDetailController = (function() {
    BookDetailController.$inject = ['$scope', '$stateParams', 'BookService', '$window', '$ionicModal', 'Comments'];

    function BookDetailController($scope, $stateParams, BookService, $window, $ionicModal, Comments) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.BookService = BookService;
      this.$window = $window;
      this.$ionicModal = $ionicModal;
      this.Comments = Comments;
      this.back = __bind(this.back, this);
      this.doComment = __bind(this.doComment, this);
      this.closeCommentDialog = __bind(this.closeCommentDialog, this);
      this.openCommentDialog = __bind(this.openCommentDialog, this);
      this.$scope.openDialog = this.openCommentDialog;
      this.$scope.closeDialog = this.closeCommentDialog;
      this.$scope.doComment = this.doComment;
      this.$scope.back = this.back;
      this.$ionicModal.fromTemplateUrl('templates/modal/comment.html', (function(_this) {
        return function(modal) {
          return _this.$scope.modal = modal;
        };
      })(this), {
        scope: this.$scope,
        animation: 'slide-in-up'
      });
      BookService.getBook(this.$stateParams.isbn).success((function(_this) {
        return function(result) {
          _this.$scope.book = result;
          _this.$scope.usersAccount = result.users.length;
          _this.$scope.bookName = _this.$scope.book.name;
          return _this.Comments.query({
            book_id: result.id
          }, function(data) {
            console.log(data);
            return _this.$scope.comments = data;
          });
        };
      })(this));
      this.$scope.$on('$destroy', (function(_this) {
        return function() {
          return _this.$scope.modal.remove();
        };
      })(this));
    }

    BookDetailController.prototype.openCommentDialog = function() {
      return this.$scope.modal.show();
    };

    BookDetailController.prototype.closeCommentDialog = function() {
      return this.$scope.modal.hide();
    };

    BookDetailController.prototype.doComment = function() {
      var text;
      text = angular.element(document.getElementById('comment')).val();
      if (text.trim() === '') {
        alert('请输入有效字符');
        return false;
      } else {
        return this.Comments.save({
          book_id: this.$scope.book.id,
          content: text
        }, null, (function(_this) {
          return function(data) {
            if (data.id === null) {
              return alert('添加图书失败');
            } else {
              console.log('成功。。。。。。。');
              _this.$scope.comments.push(data);
              return _this.closeCommentDialog();
            }
          };
        })(this));
      }
    };

    BookDetailController.prototype.back = function() {
      return this.$window.history.back();
    };

    return BookDetailController;

  })();

  libr.controller('BookDetailController', BookDetailController);

}).call(this);
