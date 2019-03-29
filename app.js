// Módulos
var express = require('express');
var app = express();
var mongo = require('mongodb');
var swig = require('swig');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var gestorBD = require("./modules/gestorBD.js");
var expressSession = require('express-session');
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
var fileUpload = require('express-fileupload');
app.use(fileUpload());
gestorBD.init(app,mongo);

// Variables
app.set('port', 8081);
app.set('db','mongodb://admin:admin@tiendamusical-shard-00-00-wvvdk.mongodb.net:27017,tiendamusical-shard-00-01-wvvdk.mongodb.net:27017,tiendamusical-shard-00-02-wvvdk.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusical-shard-0&authSource=admin&retryWrites=true');
app.set('clave','abcdefg');
app.set('crypto',crypto);

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig, gestorBD); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, gestorBD); // (app, param1, param2, etc.)

// lanzar el servidor
app.listen(app.get('port'), function() {
    console.log("Servidor activo");
});
