libr = angular.module 'libr.controllers.home', ['ionic']

class HomeController
  @$inject: ['$scope', '$location', 'BookService', 'ScanService', '$ionicLoading', '$ionicActionSheet',
             'RecommendService']
  constructor: (@$scope, @$location, BookService, ScanService, @$ionicLoading, @$ionicActionSheet, @RecommendService)->
    if isUserLogedIn()
      showLoading(@$scope, @$ionicLoading)
      @$scope.title = 'Libr - 你可能喜欢的书'
      @$scope.enableBackButton = false
      @$scope.rightButtons = [
        {
          type: 'button  icon ion-shuffle'
          tap: (e) =>
            @showRecommendActionSheet()
        }
      ]
      @RecommendService.popularBooksForMe (result)=>
        if result.length is 0
          alert '请先添加一些你阅读的书，再来查看推荐吧'
          return
        else
          @$scope.books = result
          @$scope.loading.hide();
    else
      @$location.path '/tab/settings'
      return

  showLoading = ($scope, $ionicLoading)->
    $scope.loading = $ionicLoading.show {
      content: '加载中',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 500
    }
  isUserLogedIn = ()->
    if localStorage.getItem('token') isnt null and localStorage.getItem('email') isnt null
      true
    else
      false
  showRecommendActionSheet: =>
    @$ionicActionSheet.show {
      titleText: '推荐'
      buttons: @RecommendService.getActionSheetList()
      destructiveText: '删除'
      cancelText: '取消'
      cancel: ()->
        console.log('CANCELLED')
      buttonClicked: (index)=>
        console.log "#{index} has been taped"
        @changeRecommend index
        true
      destructiveButtonClicked: ()->
        true
    }
  changeRecommend: (index)=>
    @RecommendService.changeRecommendAction index, (result)=>
      if result.length is 0
        alert '喔，看来附近还没有好书推荐，快去推荐你的朋友也来使用吧！'
      else
        @$scope.books = result
        listArray = JSON.parse(localStorage.getItem 'recommend_action_sheet_full_arr')
        @$scope.title = 'Libr-' + listArray[index].text
libr.controller 'HomeCtrl', HomeController