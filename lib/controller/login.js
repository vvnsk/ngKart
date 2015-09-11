(function(){

    var app = angular.module('login',[ ]);

    app.controller('LoginController',[ '$scope','logger','filterFilter',function($scope,logger,filterFilter){

        $scope.login=function(){
            logger.isValidUser().success(function(data){
                if(filterFilter(data,{username:$scope.username,password:$scope.password}).length>0) {
                    logger.currUser = $scope.username;
                    $scope.username='';$scope.password='';
                    window.location = "#/home";
                }
            })
        };

    }]);

    app.service('logger', function($http) {

        this.isValidUser = function(){
            return $http.get('lib/controller/data/users.json');
        }

        this.currUser = "";
    });

})();