const express = require("express");
const router = express.Router();
const Viaje = require("../models/Viajes");

module.exports = function () {
  router.get("/", (req, res) => {
    res.render("index");
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
          viajes //esto es una propiedad, es como si pasaras como arriba en pag
         })
      )
      .catch((error) => console.log("errorCatch -->", error));
  });

  return router;
};
