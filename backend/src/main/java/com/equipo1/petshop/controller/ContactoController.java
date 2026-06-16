package com.equipo1.petshop.controller;

import com.equipo1.petshop.entity.Contacto;
import com.equipo1.petshop.repository.ContactoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacto")
@CrossOrigin(origins = "http://localhost:4200") // Permiso para que Angular conecte
public class ContactoController {

    // REQ10: Logger oficial configurado para registrar las acciones
    private static final Logger logger = LoggerFactory.getLogger(ContactoController.class);

    @Autowired
    private ContactoRepository contactoRepository;

    @PostMapping("/enviar")
    public Contacto enviarMensaje(@RequestBody Contacto contacto) {
        // REQ10: Grabamos en consola/archivo que un cliente intenta escribir
        logger.info("REQ10 - Intento de registro de mensaje de contacto desde: {}", contacto.getCorreo());
        
        Contacto nuevoMensaje = contactoRepository.save(contacto);
        
        // REQ10: Grabamos que se guardó con éxito en MySQL
        logger.info("REQ10 - Mensaje guardado exitosamente en MySQL con ID: {}", nuevoMensaje.getId());
        
        return nuevoMensaje;
    }
}