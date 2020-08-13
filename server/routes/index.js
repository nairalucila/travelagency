const express = require("express");
const router = express.Router();
const Viaje = require("../models/Viajes");
const Testimonial = require("../models/Testimoniales");

module.exports = function () {
  router.get("/", (req, res) => {
    
    const promesas = [];
    
    promesas.push(
      Viaje.findAll({
        limit: 3,
      })
    );

    promesas.push(
      Testimonial.findAll({
        limit: 3,
      })
    );

    //pasar promesas y ejecutarlo
    const resultado = Promise.all(promesas);

    resultado
      .then((resultado) =>
        
      res.render("index", {
          pagina: "Próximos Viajes",
          viajes: resultado[0], //esto es una propiedad, es como si pasaras como arriba en pag
          clase: "home",
          testimoniales: resultado[1]
        })
      )
      .catch((error) => console.log("errorCatch -->", error));
  });

  router.get("/nosotros", (req, res) => {
    res.render("about", {
      pagina: "Sobre Nosotros",
    });
  });

  router.get("/viajes", (req, res) => {
    Viaje.findAll()
      .then((viajes) =>
        res.render("viajes", {
          pagina: "Próximos Viajes",
          viajes, //esto es una propiedad, es como si pasaras como arriba en pag
        })
      )
      .catch((error) => console.log("errorCatch -->", error));
  });

  router.get("/viajes/:id", (req, res) => {
    Viaje.findByPk(req.params.id)
      .then((viaje) =>
        res.render("viaje", {
          viaje,
        })
      )
      .catch((error) => console.log(error, "Errorerror"));
  });

  router.get("/testimoniales", (req, res) => {
    Testimonial.findAll().then((testimoniales) =>
      res.render("testimoniales", {
        pagina: "Testimoniales",
        testimoniales,
      })
    );
  });

  router.post("/testimoniales", (req, res) => {
    let { nombre, correo, mensaje } = req.body;
    let errores = [];

    if (!nombre) {
      errores.push({ mensaje: "Agrega tu Nombre" });
    }

    if (!correo) {
      errores.push({ mensaje: "Agrega tu Correo" });
    }

    if (!mensaje) {
      errores.push({ mensaje: "Agrega tu Mensaje" });
    }

    if (errores.length > 0) {
      //mostrar errores
      res.render("testimoniales", {
        errores,
        nombre,
        correo,
        mensaje,
      });
    } else {
      //almacenar en bd
      Testimonial.create({
        nombre,
        correo,
        mensaje,
      })
        .then((testimonial) => res.redirect("/testimoniales"))
        .catch((error) => console.log(error));
    }
  });

  return router;
};
