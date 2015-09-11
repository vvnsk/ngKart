(function(){

    var app = angular.module('products',[ "kart","login" ]);

    app.controller('ProductController',["$scope","$routeParams","productServ","cartService","logger",function($scope,$routeParams,productServ,cartService,logger){

        $scope.categoryid = $routeParams.id1;
        $scope.productid = $routeParams.id2;

        $scope.getProduct = function(){
            productServ.fetchProducts().success(function(data){
                for(var i=0;i<data[$scope.categoryid].length;i++){
                    if(data[$scope.categoryid][i].name==$scope.productid){
                        $scope.product=data[$scope.categoryid][i];
                        $scope.product.quantity=1;
                    }
                }
            });
        };

        $scope.review={};
        $scope.addReview = function(){
            if(logger.currUser==""){
                alert("Please Login to Post a review");
                window.location = "#/login";
            }
            else{
                $scope.review.author=logger.currUser;
                $scope.product.reviews.push($scope.review);
                $scope.review={};
            }
        }

        $scope.product=$scope.getProduct();

        $scope.a2c=function(product){
            if(product.quantity<1){
                alert("Cant buy Zero!");
            }
            else{
                product.total=parseInt(product.quantity)*parseInt(product.price.split(".")[1]);
                cartService.add2kart(product);
            }
        }


    }]);

    app.controller('CategoryController',["$scope","$routeParams","productServ",function($scope,$routeParams,productServ){

        $scope.categoryid = $routeParams.id;

        $scope.getCategory = function(){
                            productServ.fetchProducts().success(function(data){
                                if(!!data[$scope.categoryid]) {
                                    $scope.category = data[$scope.categoryid];
                                }
                            });
        };

        $scope.category=$scope.getCategory();

    }]);

    app.service('productServ', function($http) {

        this.fetchProducts = function(){
            return $http.get('lib/controller/data/products.json');
        }

    });

})();