const express = require("express");
const router = express.Router();
const Viaje = require("../models/Viajes");
const Testimonial = require("../models/Testimoniales");

const nosotrosController = require('../controlers/nosotrosControllers');
const homeController = require('../controlers/homeController');
const viajeController = require("../controlers/viajesControlloer");
const testimonialesController = require("../controlers/testimonialesController");

module.exports = function () {
 
  router.get("/", homeController.homeInfo);
  router.get("/nosotros", nosotrosController.infoNosotros);
  router.get("/viajes", viajeController.mostrarViajes);
  router.get("/viajes/:id", viajeController.mostrarViaje);
  router.get("/testimoniales", testimonialesController.mostrarTestimoniales);
  router.post("/testimoniales", testimonialesController.agregarTestimoniales);

  return router;
};