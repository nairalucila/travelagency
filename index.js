const express = require('express');
const routes = require('./server/routes/index');
const path = require('path');
const bodyParser = require('body-parser');
const configs = require('./server/config');
const db = require('./server/config/database');
require("dotenv").config({path: 'variables.env' })

db.authenticate()
     .then(()=> console.log('db conectadaaaa'))
     .catch((err)=> console.log('ERROR -->', err));

//config. express
const app = express();

//pug
app.set('view engine', 'pug');

//add views
app.set('views', path.join(__dirname, './server/views'));

//cargar carpeta statica
app.use(express.static('public'));

app.use((req, res, next)=>{
     const fecha = new Date();
     res.locals.fechaActual = fecha.getFullYear();
     res.locals.ruta = req.path;
     return next();

});

//cargar bodyparser
app.use(bodyParser.urlencoded({extended: true}))

//import routes
app.use('/', routes());

//validar si estamos en desarrollo o produccion

const config = configs[app.get('env')];

///variable para sitio web
app.locals.titulo = config.nomb; //toma el nombre del objeto que esta en config>index

//node index y wualá

//puerto y host para app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, ()=>{ console.log('Servidor iniciado')});