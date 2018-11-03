# node-express-restful-api

[![Greenkeeper badge](https://badges.greenkeeper.io/bjvickers/node-express-restful-api.svg)](https://greenkeeper.io/)

A basic and lean recipe for implementing a RESTful API in a node express server. <strong>Does not yet implement HATEOAS, so cannot be described as RESTful yet</strong>.

This application will connect to the local mongo server and create a new collection 
inside <strong><code>local</code></strong> called <strong><code>product</code></strong>, 
which will be used for testing purposes. It will also create and populate a
<strong><code>users</code></strong> collection, which will be used for the purpose
of authentication.

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


To setup
-
This script will install the test user (root, Password1), so that an authentication
token can later be obtained from the <strong><code>authenticate</code></strong> resource.
```
$ npm run-script setup
```


To run in dev mode
-
```
$ sudo npm start
```


To test using cURL
-
Experiment with the cURLs below, all of which will work. Attempt to break the
API by omiting data, omitting request headers, providing invalid links, omitting
the JSON web token etc.

#### Authenticate:
```
$ curl -i -X POST -H "accept: application/json" -H "content-type: application/json" --data '{"username":"root", "password":"Password1"}' http://localhost:80/api/v1/authenticate  
```

#### Populate the database:
```
$ curl -i -X POST -H "accept: application/json" -H "authorization: Bearer <token>" -H "content-type: application/json" --data '{"name":"product1", "price":"299", "description":"desc1"}' http://localhost:80/api/v1/products/  
$ curl -i -X POST -H "accept: application/json" -H "authorization: Bearer <token>" -H "content-type: application/json" --data '{"name":"product2", "price":"399", "description":"desc2"}' http://localhost:80/api/v1/products/  
$ curl -i -X POST -H "accept: application/json" -H "authorization: Bearer <token>" -H "content-type: application/json" --data '{"name":"product3", "price":"499", "description":"desc3"}' http://localhost:80/api/v1/products/  
```

#### Get data:
```
$ curl -i -X GET -H "accept: application/json" -H "authorization: Bearer <token>" http://localhost:80/api/v1/products/  
$ curl -i -X GET -H "accept: application/json" -H "authorization: Bearer <token>" http://localhost:80/api/v1/products/1    
```

#### Update data:
```
$ curl -i -X PUT -H "accept: application/json" -H "authorization: Bearer <token>" -H "content-type: application/json" --data '{"price":"1299"}' http://localhost:80/api/v1/products/1  
$ curl -i -X PUT -H "accept: application/json" -H "authorization: Bearer <token>" -H "content-type: application/json" --data '{"name":"PRODUCT2"}' http://localhost:80/api/v1/products/2  
$ curl -i -X PUT -H "accept: application/json" -H "authorization: Bearer <token>" -H "content-type: application/json" --data '{"description":"reallygood"}' http://localhost:80/api/v1/products/3
```

#### Delete data:
```
$ curl -i -X DELETE -H "accept: application/json" -H "authorization: Bearer <token>" http://localhost:80/api/v1/products/1  
$ curl -i -X DELETE -H "accept: application/json" -H "authorization: Bearer <token>" http://localhost:80/api/v1/products/2  
$ curl -i -X DELETE -H "accept: application/json" -H "authorization: Bearer <token>" http://localhost:80/api/v1/products/3
```
