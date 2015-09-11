(function(){

    var app = angular.module('store',[ 'login','products','ngRoute' ]);

    app.run(function($rootScope){
        $rootScope.$on('$routeChangeStart',function(e,route){
            //console.log(route);
        });
    });

    app.config(['$routeProvider',
        function($routeProvider) {

            $routeProvider.when('/home', {
                    templateUrl: 'templates/home.html'
                }).
                when('/login', {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginController'
                }).
                when('/cart',{
                    templateUrl: 'templates/cart.html',
                    controller: 'KartController'
                }).
                when('/category/:id', {
                    templateUrl: 'templates/category.html',
                    controller: 'CategoryController'
                }).
                when('/category/:id1/:id2', {
                    templateUrl: 'templates/product.html',
                    controller: 'ProductController'
                }).
                otherwise({
                    redirectTo: '/home'
                });
    }]);

    app.controller('HeaderController',function($scope,logger){

        this.logger=logger;

    });

})();