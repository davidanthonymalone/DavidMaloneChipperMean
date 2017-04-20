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
			
			$scope.name= "Order";
            
            
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
			displayBasket(filters);
		}

		$scope.reset = function()
		{
			$scope.filterData = {};
			displayBasket({});
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
								displayBasket({});
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'Your Meal has been paid for and is on its way'  }, 3000);
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
								displayBasket({});
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
      
      function displayBasket(filters)
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
           
           
           $scope.deleteBasket = function() // load many
		{ // add test data
		    $scope.asynchWait = true;		
			$http.delete('/api/v1/deletebasket', {}).then(function success (response) {  	
			                    // var result = {'errorFlag' : errorFlag , 'insertCount' : insertCount};
								displayBasket({});
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'basket deleted'  }, 3000);
							}, function errorCallback(error) {
								$scope.asynchWait = false;
                               nrzLightify({ type: 'danger', text: 'basket deletion error'  }, 3000);						 						 
						}); 			 
		}	 
           
           
                $scope.add2Basket = function(index,id,food)
		{
            console.log(food);
                $http.put('/api/v1/basketitem', food).then(function success (response) {  									
								$scope.newBasketItemRaw = {"json" : ""};										
								nrzLightify({ type: 'success', text: 'item inserted to basket'  }, 3000);	
							}, function errorCallback(error) {
                               nrzLightify({ type: 'danger', text: 'basket item insertion error'  }, 3000);							 						 
						}); 
            displayBasket({});
		}
                
                
                
            $scope.add2Order = function(basket,total)
		{
            console.log(basket, total);
                $http.put('/api/v1/order', {orderdetails: basket, total}).then(function success (response) {  									
								$scope.newOrderItemRaw = {"json" : ""};										
								nrzLightify({ type: 'success', text: 'item inserted to basket'  }, 3000);	
							}, function errorCallback(error) {
                               nrzLightify({ type: 'danger', text: 'basket item insertion error'  }, 3000);							 						 
						}); 
            displayBasket({});
		}
                
            
	
        
   
      displayBasket({}); // load the basket at the start
    
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
			displayMenu(filters);
		}

		$scope.reset = function()
		{
			$scope.filterData = {};
			displayMenu({});
		}
        
        
        $scope.add2Basket = function(index,id,food)
		{
            console.log(food);
                $http.put('/api/v1/basketitem', food).then(function success (response) {  									
								$scope.newBasketItemRaw = {"json" : ""};										
								nrzLightify({ type: 'success', text: 'item inserted to basket'  }, 3000);	
							}, function errorCallback(error) {
                               nrzLightify({ type: 'danger', text: 'basket item insertion error'  }, 3000);							 						 
						}); 
            displayBasket({});
		}
	
   
        $scope.deleteFood = function(index,id, food)
		{
			correctIndex =   $scope.menu.indexOf(food);
			$http.delete('/api/v1/food/'+ id).then(function success (response) {  	
			                    $scope.menu.splice(correctIndex, 1);
								nrzLightify({ type: 'success', text: 'food deleted'  }, 3000);	
							}, function errorCallback(error) {
                               	nrzLightify({ type: 'danger', text: 'food deletion error'  }, 3000);				 						 
						}); 				
		}
        
		
	
		$scope.insertFood2 = function() // v2
		{
			$http.put('/api/v1/food', $scope.newFoodRaw.json).then(function success (response) {  									
								$scope.newFoodRaw = {"json" : ""};										
								nrzLightify({ type: 'success', text: 'food inserted'  }, 3000);	
							}, function errorCallback(error) {
                               	nrzLightify({ type: 'danger', text: 'food insertion error'  }, 3000);						 						 
						}); 		
		}	

		$scope.insertFood = function(newFood) // v1
		{
			$http.put('/api/v1/food', newFood).then(function success (response) {  									
								$scope.newFoodRaw = {"json" : ""};										
								nrzLightify({ type: 'success', text: 'food inserted'  }, 3000);	
							}, function errorCallback(error) {
                               nrzLightify({ type: 'danger', text: 'food insertion error'  }, 3000);							 						 
						}); 		
		}
		
		
		
		$scope.bcategory = function() {
    	var total = "";
		angular.forEach($scope.basket, function(key, value) {
      	total += key.category;
    });
    return total;
  }
		
		
		
		
		$scope.loadMenu = function() // load many
		{ // add test data
		    $scope.asynchWait = true;
			$http.post('/api/v1/loadmenu', {}).then(function success (response) {  	
			                    // var result = {'errorFlag' : errorFlag , 'insertCount' : insertCount};
								displayMenu({});
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
								displayMenu({});
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
		
		
		function displayMenu(filters)
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
        
        function displaySpecials(filters)
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

		$scope.saveFood = function()
		{
			$scope.edittingFood = false;
			
			if (editMode === "existing")
			{
			var dataToSave = angular.copy($scope.editData);
			delete dataToSave.index;
			$http.post('/api/v1/food', dataToSave).then(function success (response) {  	
			                    $scope.menu[correctIndex] = $scope.editData;
								$scope.asynchWait = false;
								nrzLightify({ type: 'success', text: 'food saved'  }, 3000);
							}, function errorCallback(error) {
								$scope.asynchWait = false;
                               nrzLightify({ type: 'danger', text: 'food save error'  }, 3000);					 						 
						}); 
            }		
            else
			{
				delete $scope.editData.index;
				$scope.insertFood($scope.editData); // put operation
			}				
		}		
		
		
		
		
		
		
		$scope.newFood = function()
		{
			$scope.editTitle = "New Food";
			editMode = "new";
			$scope.edittingFood = true;
			correctIndex =   -1;
			$scope.editData = {};
			$scope.editData.index = -1;
			$scope.editData._id = null;			
		}
        
        
        
      
        
        
        
         $scope.loadBasket = function() // load many
		{ // add test data
		    $scope.asynchWait = true;
			$http.post('/api/v1/loadbasket', {}).then(function success (response) {  	
			                    // var result = {'errorFlag' : errorFlag , 'insertCount' : insertCount};
								displayBasket({});
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
		
		
        
        
           function displayBasket(filters)
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
 
        displaySpecials({});
		displayMenu({}); // load the menu at the start
        displayBasket({}); // load the menu at the start
		//

		nrzLightify({ type: 'success', text: 'Menu loaded'  }, 6000);	
 
		}]); // MenuCtrl
 