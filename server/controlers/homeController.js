const Viaje = require("../models/Viajes");
const Testimonial = require("../models/Testimoniales");

exports.homeInfo = async (req, res) => {
    
    const viajes = await Viaje.findAll({ limit: 3 })
    const testimoniales = await Testimonial.findAll({ limit: 3 })
  
    //pasar promesas y ejecutarlo
    
    res.render("index", {
      pagina: "Próximos Viajes",
      viajes, //esto es una propiedad, es como si pasaras como arriba en pag
      clase: "home",
      testimoniales
    })

  };