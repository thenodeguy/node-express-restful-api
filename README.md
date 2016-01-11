# node-express-restful-api
A basic and lean recipe for implementing a RESTful API in a node express server.

Requirements
-
You will need a running MongoDB daemon.

To install
-
npm install

To run
-
sudo npm start

To test using cURL
-
#### Create users
curl -X POST -d username=Adam -H "accept: application/json" http://localhost/api/v1/users  
curl -X POST -d username=Barry -H "accept: application/json" http://localhost/api/v1/users

#### Get all users
curl -X GET -H "accept: application/json" http://localhost/api/v1/users

#### Get specific users
curl -X GET -H "accept: application/json" http://localhost/api/v1/users/Adam  
curl -X GET -H "accept: application/json" http://localhost/api/v1/users/Barry

#### Update user
curl -X PUT -d username=Benjamin http://localhost/api/v1/users/Barry

#### Delete user
curl -X DELETE http://localhost/api/v1/users/Benjamin
