const Testimonial = require("../models/Testimoniales");

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    })
  };

exports.agregarTestimoniales = async (req, res) => {
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
  };