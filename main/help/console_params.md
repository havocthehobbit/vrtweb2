
#### add user
cd node_serv

* cmd :
node app.js --useradd "{ \"userid\" : \"rob\", \"password\" : \"123\" }"

#### reset passwprd
cd node_serv

* cmd :
node app.js --userreset "{ \"userid\" : \"rob\", \"password\" : \"1234\" }"

* bash:
node app.js --userreset '{ "userid" : "rob", "password" : "1234" }'