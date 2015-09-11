(function(){

    var app = angular.module('kart',[ ]);

    app.controller('KartController',[ '$scope','logger','cartService',function($scope,logger,cartService){

        $scope.removeItem=function(index){
            cartService.removeFkart(index);
            $scope.total=$scope.calTotal();
        };

        $scope.products=cartService.kart;

        $scope.calTotal=function(){
            var temp=0;
            $scope.products.forEach(function(ele,index){
                temp+=ele.total;
            });
            return temp;
        }

        $scope.total=$scope.calTotal();

    }]);

    app.service('cartService', ['filterFilter',function(filterFilter) {

        this.kart=[];

        this.add2kart = function(product){

            var temp = filterFilter(this.kart,{name:product.name});
            if(temp.length>0) {
                temp[0].quantity+=product.quantity;
                temp[0].total+=product.total;
            }
            else{
                this.kart.push(product);
            }

            console.log(this.kart);

        }


        this.removeFkart = function(ind){
            this.kart.splice(ind,1);
        }

    }]);


})();