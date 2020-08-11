const express = require('express');
const routes = require('./server/routes/index');
const path = require('path');
const configs = require('./server/config');
const db = require('./server/config/database');

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
     return next();

});

//import routes
app.use('/', routes());

//validar si estamos en desarrollo o produccion

const config = configs[app.get('env')];

///variable para sitio web
app.locals.titulo = config.nomb; //toma el nombre del objeto que esta en config>index

//node index y wualá
app.listen(3000, () => console.log('Servidor iniciado'));