

    <div class="container">

      <div class="blog-header">
        <h1 class="blog-title">The Bootstrap Blog</h1>
        <p class="lead blog-description">The official example template of creating a blog with Bootstrap.</p>
      </div>

      <div class="row">

        <div class="col-sm-8 blog-main">
            

    <div class="container">

      <div class="blog-header">
        <h1 class="blog-title">The Bootstrap Blog</h1>
        <p class="lead blog-description">The official example template of creating a blog with Bootstrap.</p>
      </div>

      <div class="row">

        <div class="col-sm-8 blog-main">

          <div class="blog-post">
                   <div class= "container">
<div class="row">
<div class="col-md-10" >
<h1>Menu ChipperMEAN</h1>
{{ sum() }}
<hr>
 
	<div class="row">
		<div class="col-md-3">
		  <button type="button" class="btn btn-primary btn-m" ng-click="loadMenu()" ng-disabled="asynchWait" >Load Mnus</button>	   
		</div>
		<div class="col-md-3">
		  <button type="button" class="btn btn-primary btn-m" ng-click="deleteMenu()" ng-disabled="asynchWait">Delete Menu</button>	   
		</div>		
		<!--<div class="col-md-3">
		  <button type="button" ng-click="newFood()" ng-disabled="asynchWait">New </button>	   
		</div>-->			
	</div>
<hr> 

  <form name="myForm">
  
  <div class="row">
    <div class="col-md-3">
		<label for="singleSelect1">category: </label><br>
		<select name="singleSelect1" ng-model="filterData.category">
		
		  <option value="">All</option>
            
		  <option value="Burgers">Burgers</option>
            
          <option value="Chicken">Chicken</option>
		  <option value="Chips">Chips</option>
          <option value="Fish">Fish</option>
		  <option value="Sausages">Sausages</option>
		  <option value="Specials">Specials</option>

	   
		</select>    
	</div>
    <div class="col-md-3">
		<label for="singleSelect">Price: </label><br>
		<select name="singleSelect" ng-model="filterData.price">
		  <option value="">All</option>
		  <option value="1">1</option>
		  <option value="2">2</option>
		  <option value="3">3</option>
		  <option value="4">4</option>	  
		</select>    
	</div>  
    <div class="col-md-3">
		<button type="button" class="btn btn-primary btn-sm" ng-click="requeryMenu(filterData)">Search</button>	   
	</div>	
    <div class="col-md-3">
		<button type="button" class="btn btn-primary btn-sm" ng-click="reset({})">Reset Search</button>
	</div>	
  </div>
 
  </form>
  <br>
 
   {{newFoodRaw | json}} -- {{newFoodRaw.json.length}}
<hr>
<p>
 Menu Size: {{menu.length}} <p>
 
 <hr>
 
 <div class="row">
 <div class="col-md-1">
	Item Num
 </div>
  <div class="col-md-1">
    category
 </div>
  <div class="col-md-3">
    Name
 </div>
  <div class="col-md-1">
    Price
 </div>

</div>    
                
          </div><!-- /.blog-post -->

          

          

          <nav>
            <ul class="pager">
              <li><a href="#">Previous</a></li>
              <li><a href="#">Next</a></li>
            </ul>
          </nav>

        </div><!-- /.blog-main -->

        <div class="col-sm-3 col-sm-offset-1 blog-sidebar">
          <div class="sidebar-module sidebar-module-inset">
            <h4>About</h4>
            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
          </div>

          <div class="blog-post">
                      
                
          </div><!-- /.blog-post -->

          

          

          <nav>
            <ul class="pager">
              <li><a href="#">Previous</a></li>
              <li><a href="#">Next</a></li>
            </ul>
          </nav>

        </div><!-- /.blog-main -->

        <div class="col-sm-3 col-sm-offset-1 blog-sidebar">
          <div class="sidebar-module sidebar-module-inset">
            <h4>About</h4>
            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
          </div>
          <div class="sidebar-module">
              <div class="right">
 <div id="showBasket" >
 <div id="{{b._id}}" class="row" ng-repeat="b in basket  | orderBy:['category',' name', 'price'] track by b._id">
 <div class="col-md-1">
		 {{$index+1}}
		 </div>
		  <div class="col-md-1"   >
			{{b.category}}
		 </div>
		  <div class="col-md-3">
			{{b.name}}
		 </div>
		  <div class="col-md-1">
			{{b.price}}
		 </div>
    
		   <!--<div class="col-md-1">
			 <button type="button" ng-click="editFood($index,m._id,m)">Edit</button>	 		   
		 </div>
		   <div class="col-md-1">
			 <button type="button" ng-click="deleteFood($index,m._id,m)">Remove</button>	 
		 </div>-->
<div class="col-md-1">
			 <button type="button" class="btn btn-primary btn-xs" ng-click="RemoveFromBasket($index,b._id,b)">Remove from Basket</button>
    &nbsp;
		 </div>	
		  <div class="col-md-1">
			{{b._id}}
		 </div>
</div>
</div> 
</div> 
            
          </div>
          <div class="sidebar-module">
            
          </div>
        </div><!-- /.blog-sidebar -->

      </div><!-- /.row -->

    </div><!-- /.container -->

    <footer class="blog-footer">
      
      <p>
        <a href="#">Back to top</a>
      </p>
    </footer>


   