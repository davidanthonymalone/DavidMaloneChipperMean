var appControllers = angular.module('appControllers', []);

 

  appControllers.controller('PlaceboCtrl', ['$rootScope','$scope'  ,
        function($rootScope,$scope) {
      // a global controller in case needed
          console.log("PlaceboCtrl"); 

      		$rootScope.recaptchaCodeAvailable = false;			
 
 		}]); // PlaceboCtrl
 
appControllers.controller('HomeCtrl', ['$scope' ,'$resource', '$q', 'nrzLightify', 
		function($scope, $resource, $http, $q, nrzLightify) {
			
			$scope.name= "Home";
            $scope.filterData = {};
	 
		}]); // HomeCtrl, '
	
 
	appControllers.controller('OrderCtrl', ['$scope', '$resource', '$http',  '$q', 'nrzLightify',
  function($scope, $resource,  $http, $q, nrzLightify) {
			
		
            
             $scope.loadOrders = function() // load many
		{ // add test data
		    $scope.asynchWait = true;
			$http.post('/api/v1/loadorders', {}).then(function success (response) {  	
			                    // var result = {'errorFlag' : errorFlag , 'insertCount' : insertCount};
								displayOrders({});
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'basket loaded'  }, 3000);
							}, function errorCallback(error) {
								$scope.asynchWait = false;
                               nrzLightify({ type: 'danger', text: 'basket load error'  }, 3000);						 						 
						}); 
          
          
		}
      
        function getOrders()
		{
			
         return $http.post('/api/v1/orders', $scope.filterData); 		        
             
		}
       
      $scope.clearOrders = function() // load many
		{ // add test data
		    $scope.asynchWait = true;		
			$http.delete('/api/v1/deleteorders', {}).then(function success (response) {  	
			                    
								displayOrders({});
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'Your orders have been cleared'  }, 3000);
							}, function errorCallback(error) {
								$scope.asynchWait = false;
                               nrzLightify({ type: 'danger', text: 'Card Declined'  }, 3000);						 						 
						}); 			 
		}
      
      
      function displayOrders(filters)
		{ 		
			aPromise = getOrders(filters);
			
			aPromise.then(function(response) 
						  {
							$scope.orders = response.data;
						  },
						  function error(error)
						  {
							  $scope.orders = [];					  
						  });
            
           
		}
      
      
         
      
            displayOrders({});
            
	 
		}]); 



appControllers.controller('AboutCtrl', ['$scope', 
  function($scope) {
  
  }]); // AboutCtrl		


appControllers.controller('BasketCtrl', ['$scope', '$resource', '$http',  '$q', 'nrzLightify',
  function($scope, $resource,  $http, $q, nrzLightify) {
      		$scope.filterData = {};

      
      		$scope.requeryBasket = function(filters)
		{	 
			showBasket(filters);
		}

		$scope.reset = function()
		{
			$scope.filterData = {};
			showBasket({});
		}
    $scope.sum = function() {
        var total = 0;
        angular.forEach($scope.basket, function(key, value) {
          total += key.price;
    });
    return total;
  }
	  $scope.sumMenu = function() {
        var total = 0;
        angular.forEach($scope.menu, function(key, value) {
          total += key.price;
    });
    return total;
  }
	
	$scope.payForMeal = function() // load many
		{ // add test data
		    $scope.asynchWait = true;		
			$http.delete('/api/v1/deletebasket', {}).then(function success (response) {  	
			                    // var result = {'errorFlag' : errorFlag , 'insertCount' : insertCount};
								showBasket({});
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'Your basket has been cleared.'  }, 3000);
							}, function errorCallback(error) {
								$scope.asynchWait = false;
                               nrzLightify({ type: 'danger', text: 'Card Declined'  }, 3000);						 						 
						}); 			 
		}	
	
      $scope.loadBasket = function() // load many
		{ // add test data
		    $scope.asynchWait = true;
			$http.post('/api/v1/loadbasket', {}).then(function success (response) {  	
			                    // var result = {'errorFlag' : errorFlag , 'insertCount' : insertCount};
								showBasket({});
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'basket loaded'  }, 3000);
							}, function errorCallback(error) {
								$scope.asynchWait = false;
                               nrzLightify({ type: 'danger', text: 'basket load error'  }, 3000);						 						 
						}); 
          
          
		}
      
        function getBasket()
		{
			
         return $http.post('/api/v1/basket', $scope.filterData); 		        
             
		}
      
      function showBasket(filters)
		{ 		
			aPromise = getBasket(filters);
			
			aPromise.then(function(response) 
						  {
							$scope.basket = response.data;
						  },
						  function error(error)
						  {
							  $scope.basket = [];					  
						  });
            
           
		}
      


     
      
      	
        
     

    $scope.subtotal = function() {
    var total = 0;
    angular.forEach($scope.basket, function(key, value) {
      total += key.price;
    });
    return total;
  }
    
    
           $scope.removeFromBasket = function(index,id,food)
		{
			correctIndex =   $scope.basket.indexOf(food);
			$http.delete('/api/v1/basketitem/'+ id).then(function success (response) {  	
			                    $scope.basket.splice(correctIndex, 1);
								nrzLightify({ type: 'success', text: 'basket item deleted'  }, 3000);	
							}, function errorCallback(error) {
                               	nrzLightify({ type: 'danger', text: 'basket  deletion error'  }, 3000);				 						 
						}); 				
		}
           
          
           
           
                $scope.addingToBasket = function(index,id,food)
		{
            console.log(food);
                $http.put('/api/v1/basketitem', food).then(function success (response) {  									
								$scope.newBasketItemRaw = {"json" : ""};										
								nrzLightify({ type: 'success', text: 'item inserted to basket'  }, 3000);	
							}, function errorCallback(error) {
                               nrzLightify({ type: 'danger', text: 'basket item insertion error'  }, 3000);							 						 
						}); 
            showBasket({});
		}
                
                
                
            $scope.addingToOrder = function(basket, firstname, total)
		{
            console.log(basket, firstname, total);
                $http.put('/api/v1/order', {orderdetails: basket,  firstname, total}).then(function success (response) {  									
								$scope.newOrderItemRaw = {"json" : ""};										
								nrzLightify({ type: 'success', text: 'order accepted'  }, 3000);	
							}, function errorCallback(error) {
                               nrzLightify({ type: 'danger', text: 'didnt work'  }, 3000);							 						 
						}); 
            showBasket({});
                 $scope.firstname = null;
		}
                
            
	
        
   
      showBasket({}); // load the basket at the start
    
		nrzLightify({ type: 'success', text: 'Basket loaded'  }, 6000);	

    
 		

  }]); // BasketCtrl	
	
	
appControllers.controller('MenuCtrl', [  '$scope',  '$resource', '$http',  '$q', 'nrzLightify',
    function( $scope, $resource,  $http, $q, nrzLightify) {
		
		var correctIndex; // ng-repeat orderBy order different to the underlying source array
		var editMode;		
		
		$scope.edittingFood = false;		
		$scope.asynchWait = false;
		$scope.filterData = {};
		$scope.newFoodRaw = {"json" : ""};
        $scope.newBasketItemRaw = {json: ""};
		$scope.newSpecialsItemRaw = {json: ""};
        $scope.newOrderItemRaw = {json: ""};
		$scope.editId = null;
				 
           $scope.sum = function() {
        var total = 0;
        angular.forEach($scope.basket, function(key, value) {
          total += key.price;
    });
    return total;
  }
		$scope.requeryMenu = function(filters)
		{	 
			showMenu(filters);
		}

		$scope.reset = function()
		{
			$scope.filterData = {};
			showMenu({});
		}
        
        
        $scope.addingToBasket = function(index,id,food)
		{
            console.log(food);
                $http.put('/api/v1/basketitem', food).then(function success (response) {  									
								$scope.newBasketItemRaw = {"json" : ""};										
								nrzLightify({ type: 'success', text: 'item inserted to basket'  }, 3000);	
							}, function errorCallback(error) {
                               nrzLightify({ type: 'danger', text: 'basket item insertion error'  }, 3000);							 						 
						}); 
            showBasket({});
		}
	
   
       
        
		
	
		
		
		
		
		$scope.basketCategoryCheck = function() {
    	var total = "";
		angular.forEach($scope.basket, function(key, value) {
      	total += key.category;
    });
    return total;
  }
		
		
		
		
		$scope.loadMenu = function() 
		{ 
		    $scope.asynchWait = true;
			$http.post('/api/v1/loadmenu', {}).then(function success (response) {  	

								showMenu({});
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'menu loaded'  }, 3000);
							}, function errorCallback(error) {
								$scope.asynchWait = false;
                               nrzLightify({ type: 'danger', text: 'food load error'  }, 3000);						 						 
						}); 			 
		}	

		$scope.deleteMenu = function() // load many
		{ // add test data
		    $scope.asynchWait = true;		
			$http.delete('/api/v1/deletemenu', {}).then(function success (response) {  	
			                    // var result = {'errorFlag' : errorFlag , 'insertCount' : insertCount};
								showMenu({});
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'menu deleted'  }, 3000);
							}, function errorCallback(error) {
								$scope.asynchWait = false;
                               nrzLightify({ type: 'danger', text: 'menu deletion error'  }, 3000);						 						 
						}); 			 
		}	 
        
         $scope.removeFromBasket = function(index,id,food)
		{
			correctIndex =   $scope.basket.indexOf(food);
			$http.delete('/api/v1/basketitem/'+ id).then(function success (response) {  	
			                    $scope.basket.splice(correctIndex, 1);
								nrzLightify({ type: 'success', text: 'basket item deleted'  }, 3000);	
							}, function errorCallback(error) {
                               	nrzLightify({ type: 'danger', text: 'basket  deletion error'  }, 3000);				 						 
						}); 				
		}
		
		function getMenu()
		{
         return $http.post('/api/v1/menu', $scope.filterData); 			
		}	
    
      function getSpecials()
		{
         return $http.post('/api/v1/specials', $scope.filterData); 			
		}	
    
		var aPromise;
		
		
		function showMenu(filters)
		{ 		
			aPromise = getMenu(filters);
			
			aPromise.then(function(response) 
						  {
							$scope.menu = response.data;
						  },
						  function error(error)
						  {
							  $scope.menu = [];					  
						  });
		}
        
        function showSpecials(filters)
		{ 		
			aPromise = getSpecials(filters);
			
			aPromise.then(function(response) 
						  {
							$scope.specials = response.data;
						  },
						  function error(error)
						  {
							  $scope.specials = [];					  
						  });
		}
			
		$scope.getTemplate = function (food) {
			
			return 'displayfood';
		};		
		
		$scope.cancelFoodEdit = function()
		{
			$scope.edittingFood = false;
		}
 		
		$scope.editFood = function(index,id,food)
		{
			$scope.editTitle = "Edit Food";
			editMode = "existing";
			$scope.edittingFood = true;
			correctIndex =   $scope.menu.indexOf(food);
			$scope.editData = angular.copy($scope.menu[correctIndex]);
			$scope.editData.index = index + 1;
			$scope.editData._id = id;
		}	

        
        
        
         $scope.loadBasket = function() // load many
		{ // add test data
		    $scope.asynchWait = true;
			$http.post('/api/v1/loadbasket', {}).then(function success (response) {  	
			                    // var result = {'errorFlag' : errorFlag , 'insertCount' : insertCount};
								showBasket({});
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'basket loaded'  }, 3000);
							}, function errorCallback(error) {
								$scope.asynchWait = false;
                               nrzLightify({ type: 'danger', text: 'basket load error'  }, 3000);						 						 
						}); 
          
          
		}
      
        function getBasket()
		{
			
         return $http.post('/api/v1/basket', $scope.filterData); 		        
             
		}
		
		
        
        
           function showBasket(filters)
		{ 		
			aPromise = getBasket(filters);
			
			aPromise.then(function(response) 
						  {
							$scope.basket = response.data;
						  },
						  function error(error)
						  {
							  $scope.basket = [];					  
						  });
            
           
		}
        
      $scope.sumMenu = function() {
        var total = 0;
        angular.forEach($scope.menu, function(key, value) {
          total += key.price;
    });
    return total;
      }
      
            $scope.sumSpecials = function() {
        var total = 0;
        angular.forEach($scope.specials, function(key, value) {
          total += key.price;
    });
    return total;
      }
 
        showSpecials({});
		showMenu({}); // load the menu at the start
        showBasket({}); // load the menu at the start
		//

		nrzLightify({ type: 'success', text: 'Menu loaded'  }, 6000);	
 
		}]); // MenuCtrl
 