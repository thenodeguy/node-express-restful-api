# node-express-restful-api
A basic and lean recipe for implementing a RESTful API in a node express server.

This application will connect to the local mongo server and create a new table 
inside <strong><code>local</code></strong> called <strong><code>product</code></strong>, 
which will be used for testing purposes.

The API is hardened against both client- and server-side errors, and will always
return the appropriate headers and response.


Dependencies
-
git  
node.js 4.2.4+  
MongoDB


To install
-
```
$ mkdir -vp node-express-restful-api  
$ cd node-express-restful-api  
$ git clone https://github.com/benjaminvickers/node-express-restful-api.git .  
$ npm install
```
Check to ensure the default database connection details will work. These are held
in <strong><code>configs/db.js</code></strong>. Modify them as necessary.


To run in dev mode
-
```
$ sudo npm start
```


To test using cURL
-
Experiment with the cURLs below, all of which will work. Attempt to break the
API by omiting data, omitting request headers, providing invalid links etc.

#### Populate the database:
```
$ curl -i -X POST -H "accept: application/json" -H "content-type: application/json" --data '{"name":"product1", "price":"299", "description":"desc1"}' http://localhost:80/api/v1/products/  
$ curl -i -X POST -H "accept: application/json" -H "content-type: application/json" --data '{"name":"product2", "price":"399", "description":"desc2"}' http://localhost:80/api/v1/products/  
$ curl -i -X POST -H "accept: application/json" -H "content-type: application/json" --data '{"name":"product3", "price":"499", "description":"desc3"}' http://localhost:80/api/v1/products/  
```

#### Get data:
```
$ curl -i -X GET -H "accept: application/json" http://localhost:80/api/v1/products/  
$ curl -i -X GET -H "accept: application/json" http://localhost:80/api/v1/products/1    
```

#### Update data:
```
$ curl -i -X PUT -H "accept: application/json" -H "content-type: application/json" --data '{"price":"1299"}' http://localhost:80/api/v1/products/1  
$ curl -i -X PUT -H "accept: application/json" -H "content-type: application/json" --data '{"name":"PRODUCT2"}' http://localhost:80/api/v1/products/2  
$ curl -i -X PUT -H "accept: application/json" -H "content-type: application/json" --data '{"description":"reallygood"}' http://localhost:80/api/v1/products/3
```

#### Delete data:
```
$ curl -i -X DELETE -H "accept: application/json" http://localhost:80/api/v1/products/1  
$ curl -i -X DELETE -H "accept: application/json" http://localhost:80/api/v1/products/2  
$ curl -i -X DELETE -H "accept: application/json" http://localhost:80/api/v1/products/3
```
