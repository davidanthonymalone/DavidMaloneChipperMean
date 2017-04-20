console.log("This code is designed to present to run on localhost/bluemix/heroku with the relevant hostname:port");
console.log("./routes/server_nodejs/platform.js: to set specific values such as bluemix url etc.");

var host_uri = "localhost"; // 

var express = require('express');
var fs = require('fs'); // for certs
var os = require('os');
var https = require('https');
var http = require('http');
var platform = require('./routes/server_nodejs/platform.js');
var runtime = platform.configure();
var secrets = require('./secrets.js');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;




var myCollection;

var myCollections = {};
var mDB;

 mDB = secrets.mongodb.connectionStr(); // cloud // these two lines can be improved how?

var db = MongoClient.connect(mDB, function(err, db) {
    if(err)
        throw err;
    console.log("connected to the mongoDB at: " + runtime.mongodb);
	
	myCollections.menuCollection = db.collection('menu'); 
    myCollections.orderCollection = db.collection('orders'); 
    myCollections.basketCollection = db.collection('basket'); 
    myCollections.specialsCollection = db.collection('specials'); 
	
	
	
});


 

mDB = secrets.mongodb.connectionStr();

var db = MongoClient.connect(mDB, function (err, db) {
    if (err)
        throw err;
    console.log("connected to the mongoDB at: " + runtime.mongodb);

   

});



var compression = require('compression');

var toobusy = require('toobusy-js');


var bodyParser = require('body-parser');



var helmet = require('helmet');

var connectionListener = false;

var app = express();

app.use(compression()); 
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); 

app.use(helmet()); 

app.use(function (req, res, next) { 
    if (toobusy()) {
        res.status(503).send("<p><p>&nbsp&nbsp<h1>The server is busy, please try later, possibly in about 30 seconds.</h1>");
    } else {
        next();
    }
});

console.log(runtime);

if (runtime.isLocalHost) {
  
    console.log("*** Using temp SSL keys on the nodejs server");
    var privateKey = fs.readFileSync('ssl/test-key.pem');
    var certificate = fs.readFileSync('ssl/test-cert.pem');


    var localCertOptions = {
        key: privateKey,
        cert: certificate,
        requestCert: false,
        rejectUnauthorized: false
    };


    https.createServer(localCertOptions, app).listen(runtime.port, function () {
        console.log(new Date().toISOString());
        console.log(runtime.architecture + ' server startup ok on port: ' + runtime.port);

    });


} else { 

    app.set('port', runtime.port);

    if (runtime.architecture === "bluemix") {
        // cloud loads certs and establish secure connection
        app.listen(runtime.port, function () {

            console.log(runtime.architecture + ' server startup ok on port: ' + runtime.port);
        });
    } else
    if (runtime.architecture === "heroku") {
        app.listen(runtime.port, function () {
            console.log(runtime.architecture + ' server startup ok on port: ' + runtime.port);
        });
    }
}


app.use(bodyParser.json());

app.enable('trust proxy');

app.use(function (req, res, next) { 
    if (req.secure) {
        
        next();
    } else {
        console.log("redirecting from http to https");
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use( 
    "/", 
    express.static(__dirname + '/_ngClient') 
);
app.use( 
    "/js_thirdparty", 
    express.static(__dirname + '/js_thirdparty')
);

console.log(__dirname + '/_ngClient');

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});




function findMenu(findOptions, cb) {
    myCollections.menuCollection.find(findOptions).toArray(cb);
}

function findSpecials(findOptions, cb) {
    myCollections.specialsCollection.find(findOptions).toArray(cb);
}

function getMenu(req, res, findOptions, cb) {
    findMenu(findOptions, function (err, results) {

        if (err) { // throw err;
            console.log("error:");
            console.log(err.message);
            res.status(404);
            res.json({
                "error": err.message
            });
        }
        // console.log(results);		 
        res.status(200);
        res.json(results);
    });
}
function getSpecials(req, res, findOptions, cb) {
    findSpecials(findOptions, function (err, results) {

        if (err) { // throw err;
            console.log("error:");
            console.log(err.message);
            res.status(404);
            res.json({
                "error": err.message
            });
        }
        // console.log(results);		 
        res.status(200);
        res.json(results);
    });
}









function findBasket(findOptions, cb) {
    myCollections.basketCollection.find(findOptions).toArray(cb);
}

function findOrders(findOptions, cb) {
    myCollections.orderCollection.find(findOptions).toArray(cb);
}

function getOrders(req, res, findOptions, cb) {
    findOrders(findOptions, function (err, results) {

        if (err) { // throw err;
            console.log("error:");
            console.log(err.message);
            res.status(404);
            res.json({
                "error": err.message
            });
        }
        // console.log(results);		 
        res.status(200);
        res.json(results);
    });
}

function getBasket(req, res, findOptions, cb) {
    findBasket(findOptions, function (err, results) {

        if (err) { // throw err;
            console.log("error:");
            console.log(err.message);
            res.status(404);
            res.json({
                "error": err.message
            });
        }
        // console.log(results);		 
        res.status(200);
        res.json(results);
    });
}




app.delete('/api/v1/basketitem/:_id', function (req, res) {
    console.log('DELETE /api/v1/basketitem');
    console.log(req.params._id);
    myCollections.basketCollection.deleteOne({
        _id: ObjectID(req.params._id)
    }, function (err, result) {
        if (err) {
            // throw err;
            console.log("error:");
            console.log(err.message);
            res.status(404);
            res.json({
                "error": err.message
            });
        }

        if (!err)
            console.log("basket item deleted");
        res.status(200);
        console.log(JSON.stringify(result))
        res.json(result);
    });

});

app.put('/api/v1/food', function (req, res) {

    console.log('PUT /api/v1/food');
    console.log(req.body);

    myCollections.menuCollection.insert(req.body, function (err, result) {
        if (err) {
            // throw err;
            console.log("error:");
            console.log(err.message);
            res.status(404);
            res.json({
                "error": err.message
            });
        }

        if (!err)
            console.log("food entry saved");
        res.status(200);
        res.json(result);
    });
});


                            






app.put('/api/v1/order', function (req, res) {

    console.log('PUT /api/v1/order');
    console.log(req.body);

    myCollections.orderCollection.insert(req.body, function (err, result) {
        if (err) {
            // throw err;
            console.log("error:");
            console.log(err.message);
            res.status(404);
            res.json({
                "error": err.message
            });
        }

        if (!err)
            console.log("order entry saved");
        res.status(200);
        res.json(result);
    });
});

app.put('/api/v1/basketitem', function (req, res) {

    console.log('PUT /api/v1/basketitem');
    console.log(req.body);
var _id = req.body._id;
    delete req.body._id;
    myCollections.basketCollection.update({
        "_id": ObjectID(_id)
    }
                            )
   myCollections.basketCollection.insert(req.body, function (err, result) {
        if (err) {
            // throw err;
            console.log("error:");
            console.log(err.message);
            res.status(404);
            res.json({
                "error": err.message
            });
        }

        if (!err)
            console.log("basket item entry saved");
        res.status(200);
        res.json(result);
    });
});


app.post('/api/v1/food', function (req, res) { // update food
    console.log('POST /api/v1/food');
    console.log(req.body);

    var _id = req.body._id;
    delete req.body._id;
    myCollections.menuCollection.update({
        "_id": ObjectID(_id)
    }, req.body, {}, function (err, result) {
        if (err) {
            // throw err;
            console.log("error:");
            console.log(err.message);
            res.status(404);
            res.json({
                "error": err.message
            });
        }

        if (!err)
            console.log("food entry saved");
        res.status(200);
        res.json(result);
    });
});

app.get('/api/v1/menu', function (req, res) { // allows a browser url call

    console.log('GET /api/v1/menu');

    var findOptions = {};

    getMenu(req, res, findOptions);
});


app.get('/api/v1/basket', function (req, res) { // allows a browser url call

    console.log('GET /api/v1/basket');

    var findOptions = {};

    getBasket(req, res, findOptions);
});


app.get('/api/v1/orders', function (req, res) { // allows a browser url call

    console.log('GET /api/v1/orders');

    var findOptions = {};

    getOrders(req, res, findOptions);
});



app.post('/api/v1/menu', function (req, res) { // need the post method to pass filters in the body

    console.log('POST /api/v1/menu');

    var findOptions = {};
    
    // these checks could be normalised to a function
    if (req.body.name) {
        findOptions.name = {
            $eq: req.body.name
        };
    }
    if (req.body.price) {
        findOptions.price = {
            $eq: parseInt(req.body.price)
        };
    }
     if (req.body.category) {
        findOptions.category = {
            $eq: req.body.category
        };
    }

    console.log(findOptions)
    getMenu(req, res, findOptions);
});


app.post('/api/v1/specials', function (req, res) { // need the post method to pass filters in the body

    console.log('POST /api/v1/specials');

    var findOptions = {};
    
    if (req.body.name) {
        findOptions.name = {
            $eq: req.body.name
        };
    }
    if (req.body.name) {
        findOptions.name = {
            $eq: parseInt(req.body.price)
        };
    }
     if (req.body.category) {
        findOptions.category = {
            $eq: req.body.category
        };
    }

    console.log(findOptions)
    getSpecials(req, res, findOptions);
});


app.post('/api/v1/basket', function (req, res) { // need the post method to pass filters in the body

    console.log('POST /api/v1/basket');

    var findOptions = {};

    // these checks could be normalised to a function
    if (req.body.name) {
        findOptions.name = {
            $eq: req.body.name
        };
    }
    if (req.body.price) {
        findOptions.price = {
            $eq: parseInt(req.body.price)
        };
    }
     if (req.body.category) {
        findOptions.category = {
            $eq: req.body.category
        };
    }

    console.log(findOptions)
    getBasket(req, res, findOptions);
});








app.post('/api/v1/orders', function (req, res) { // need the post method to pass filters in the body

    console.log('POST /api/v1/orders');

    var findOptions = {};

    // these checks could be normalised to a function

   

    console.log(findOptions)
    getOrders(req, res, findOptions);
});








app.post('/api/v1/loadspecials', function(req, res) { // API restful semantic issues i.e. loadFoodItemsOnMenu
    console.log('POST /api/v1/loadspecials');
    
   var specials = [{
            "category": "Burgers",
            "name": "1/4 Pounder with Cheese and Chips ",
            "price": 5
		},
        {
             "category": "Chicken",
            "name": "Chicken Fillet Burger and Chips ",
            "price": 5
		},
        {
            
           "category": "Chicken",
            "name": "Snack Box :- 2 Pieces of Chicken and Chips ",
            "price": 5
		},
        {
             "category": "Burgers",
            "name": "Double Cheese Burger and Chips  ",
            "price": 5
		},
        {
             "category": "Fish",
            "name": "Fish Box :- Plaice and Chips ",
            "price": 6
		},
        {
             "category": "Chicken",
            "name": "6 Nuggets, 2 Plain Sausages and Chips ",
            "price": 5
		},
         {
            "category": "Burgers",
            "name": "2 Chips / 2 Plain Burgers / 2 Plain Sausages / Six Nuggets ",
            "price": 10
		}];
		
	 
	var errorFlag = false;  // can use for feedback
	var insertCount = 0;
	
	specials.forEach( function (arrayItem)
	{
		myCollections.specialsCollection.insert( arrayItem, function(err, result) {
			if(err)
			{
				errorFlag = true;
			}
			insertCount++;
		});
	});	 
	var result = {'errorFlag' : errorFlag , 'insertCount' : insertCount};
	console.log(result)
	res.status(200);
	res.json(result); 
});




app.post('/api/v1/loadmenu', function (req, res) { // API restful semantic issues 

    console.log('POST /api/v1/loadmenu');

    var fooditems = [
        {
            "category": "Chips",
            "name": "Small",
            "price": 2.50
		},
        {
            "category": "Chips",
            "name": "Large",
            "price": 3.00
		},
        {
            "category": "Chips",
            "name": "Family Box",
            "price": 7.00
		},
        {
            "category": "Sausages",
            "name": "Plain",
            "price": 0.50
		},
        {
            "category": "Sausages",
            "name": "Large",
            "price": 1.00
		},
        {
            "category": "Sausages",
            "name": "Battered",
            "price": 1.50
		},
        {
            "category": "Burgers",
            "name": "Plain Burger",
            "price": 2.50
		},
        {
            "category": "Burgers",
            "name": "Cheese Burger",
            "price": 3.00
		},
        {
            "category": "Burgers",
            "name": "Double Cheese Burger",
            "price": 3.50
		},
        {
            "category": "Burgers",
            "name": "1/4 Pounder",
            "price": 4.00
		},
        {
            "category": "Burgers",
            "name": "1/4 Pounder with Chesse",
            "price": 4.50
		},
        {
            "category": "Chicken",
            "name": "Chicken Piece",
            "price": 2.00
		},
        {
            "category": "Chicken",
            "name": "6 Nuggets",
            "price": 3.00
		},
        {
            "category": "Chicken",
            "name": "8 Nuggets",
            "price": 3.50
		},
        {
            "category": "Chicken",
            "name": "10 Nuggets",
            "price": 4.00
		},
        {
            "category": "Chicken",
            "name": "Chicken Fillet Burger",
            "price": 4.00
		},
        {
            "category": "Chicken",
            "name": "Snack Box",
            "price": 6.00
		},
        {
            "category": "Fish",
            "name": "Cod",
            "price": 3.00
		},
        {
            "category": "Fish",
            "name": "Haddock",
            "price": 3.50
		},
        {
            "category": "Fish",
            "name": "Plaice",
            "price": 4.00
		},
         {
            "category": "Fish",
            "name": "Fish Box (Plaice)",
            "price": 7.00
		}
	];


    var errorFlag = false; // can use for feedback
    var insertCount = 0;

    fooditems.forEach(function (arrayItem) {
        myCollections.menuCollection.insert(arrayItem, function (err, result) {
            if (err) {
                errorFlag = true;
            }
            insertCount++;
        });
    });
    var result = {
        'errorFlag': errorFlag,
        'insertCount': insertCount
    };
    console.log(result)
    res.status(200);
    res.json(result);

});




app.post('/api/v1/loadbasket', function (req, res) { // API restful semantic issues 

    console.log('POST /api/v1/loadbasket');

    var basketitems = [];


    var errorFlag = false; // can use for feedback
    var insertCount = 0;

    basketitems.forEach(function (arrayItem) {
        myCollections.basketCollection.insert(arrayItem, function (err, result) {
            if (err) {
                errorFlag = true;
            }
            insertCount++;
        });
    });
    var result = {
        'errorFlag': errorFlag,
        'insertCount': insertCount
    };
    console.log(result)
    res.status(200);
    res.json(result);

});



app.post('/api/v1/loadorders', function (req, res) { // API restful semantic issues 

    console.log('POST /api/v1/loadorders');

    var orderitems = [];


    var errorFlag = false; // can use for feedback
    var insertCount = 0;

    orderitems.forEach(function (arrayItem) {
        myCollections.orderCollection.insert(arrayItem, function (err, result) {
            if (err) {
                errorFlag = true;
            }
            insertCount++;
        });
    });
    var result = {
        'errorFlag': errorFlag,
        'insertCount': insertCount
    };
    console.log(result)
    res.status(200);
    res.json(result);

});


app.delete('/api/v1/deletemenu', function (req, res) {
    console.log('DELETE /api/v1/loadmenu');
    var errorFlag = false; // can use for feedback
    try {
        myCollections.menuCollection.deleteMany({}, function (err, result) {
            var resJSON = JSON.stringify(result);
            console.log(resJSON);
            console.log(result.result.n);
            res.status(200);
            res.json(resJSON);
        });
    } catch (e) {
        console.log(e);
        res.status(404);
        res.json({});
    }
});

app.delete('/api/v1/deletebasket', function (req, res) {
    console.log('DELETE /api/v1/loadbasket');
    var errorFlag = false; // can use for feedback
    try {
        myCollections.basketCollection.deleteMany({}, function (err, result) {
            var resJSON = JSON.stringify(result);
            console.log(resJSON);
            console.log(result.result.n);
            res.status(200);
            res.json(resJSON);
        });
    } catch (e) {
        console.log(e);
        res.status(404);
        res.json({});
    }
});


app.use(function (req, res, next) {
    console.log("Oops 404");

    var err = new Error('Route Not Found, are you using the correct http verb / is it defined?');
    err.status = 404;

    next(err);
});
